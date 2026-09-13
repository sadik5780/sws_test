#!/usr/bin/env node
/**
 * Build-time asset pipeline. Run manually whenever a video is added:
 *
 *   node scripts/generate-asset-meta.mjs
 *
 * Walks the local `video_assets_compressed/` mirror (gitignored, byte-for-byte
 * identical to what's already live in the client's R2 bucket — see README).
 * For every .mp4 it shells out to ffprobe/ffmpeg to get real dimensions and a
 * poster frame, and writes `data/asset-meta.json` keyed by the R2-relative
 * path so `lib/projects.js` can look up `{ width, height, aspectRatio,
 * duration, poster }` for any video without hand-typing any of it.
 *
 * This never talks to R2 — it only reads local files and writes to
 * public/images/posters/ and data/asset-meta.json. Nothing in the bucket is
 * touched, renamed or reorganized.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const run = promisify(execFile);

const FORCE = process.argv.includes("--force");
const ROOT = path.resolve(process.cwd(), "video_assets_compressed");
const POSTER_DIR = path.resolve(process.cwd(), "public/images/posters");
const OUT_FILE = path.resolve(process.cwd(), "data/asset-meta.json");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(await walk(full));
    else if (/\.mp4$/i.test(e.name)) files.push(full);
  }
  return files;
}

// Deterministic, filesystem-safe, human-traceable-enough poster filename.
function posterName(relPath) {
  const slug = relPath
    .toLowerCase()
    .replace(/\.mp4$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug}.jpg`;
}

async function probe(file) {
  const { stdout } = await run("ffprobe", [
    "-v", "error",
    "-select_streams", "v:0",
    "-show_entries", "stream=width,height",
    "-show_entries", "format=duration",
    "-of", "json",
    file,
  ]);
  const data = JSON.parse(stdout);
  const stream = data.streams?.[0] || {};
  const duration = parseFloat(data.format?.duration || "0");
  return {
    width: stream.width || null,
    height: stream.height || null,
    duration: Number.isFinite(duration) ? Math.round(duration * 10) / 10 : null,
  };
}

/**
 * Mean brightness of an image, 0–255. Scaling to a single pixel makes ffmpeg
 * average the whole frame for us, so one raw grey byte comes back.
 */
async function meanLuma(imgPath) {
  const { stdout } = await run(
    "ffmpeg",
    ["-v", "error", "-i", imgPath, "-vf", "scale=1:1", "-f", "rawvideo", "-pix_fmt", "gray", "-"],
    { encoding: "buffer", maxBuffer: 1024 }
  );
  return stdout.length ? stdout[0] : 0;
}

/** Below this the frame is a fade, a black slug or a blown-out flash frame. */
const MIN_LUMA = 20;
/** Fractions of the clip to try, in order of preference. */
const SEEK_POINTS = [0.2, 0.35, 0.5, 0.65, 0.1];

/**
 * Pick a poster that is actually a picture of something.
 *
 * Two things were wrong with grabbing one frame at a fixed offset. The offset
 * was effectively "one second in" (a `Math.min(1, …)` that contradicted its own
 * comment), which on a graded film is usually still inside the fade from black;
 * and a single exact frame can land on a cut, a flash or a slug even mid-clip.
 * So: seek to a real fraction of the running time, let ffmpeg's `thumbnail`
 * filter choose the most representative frame out of the next ~60, and measure
 * the result — anything still essentially black gets another offset, and if a
 * clip really is that dark throughout we keep its brightest candidate rather
 * than shipping a black rectangle.
 */
async function extractPoster(file, outPath, duration) {
  const len = duration || 2;
  let best = null;

  for (const fraction of SEEK_POINTS) {
    const seek = Math.max(0, Math.min(len - 0.1, len * fraction)).toFixed(2);
    await run("ffmpeg", [
      "-y",
      "-ss", seek,
      "-i", file,
      "-vf", "thumbnail=n=60",
      "-frames:v", "1",
      "-q:v", "3",
      outPath,
    ]);

    const luma = await meanLuma(outPath).catch(() => 0);
    if (luma >= MIN_LUMA) return { seek, luma };
    if (!best || luma > best.luma) best = { seek, luma };
  }

  // Nothing cleared the bar — re-extract the brightest candidate we saw.
  await run("ffmpeg", [
    "-y",
    "-ss", best.seek,
    "-i", file,
    "-vf", "thumbnail=n=60",
    "-frames:v", "1",
    "-q:v", "3",
    outPath,
  ]);
  return best;
}

async function main() {
  await mkdir(POSTER_DIR, { recursive: true });
  await mkdir(path.dirname(OUT_FILE), { recursive: true });

  const files = await walk(ROOT);
  console.log(`Found ${files.length} .mp4 files under video_assets_compressed/`);

  const meta = {};
  const usedNames = new Set();
  let ok = 0;
  let failed = 0;

  for (const file of files) {
    const relPath = path.relative(ROOT, file).split(path.sep).join("/");
    try {
      const { width, height, duration } = await probe(file);
      // Two filenames that differ only by case/trailing-space collapse to the
      // same slug (e.g. "...Final .mp4" vs "...final.mp4") — disambiguate
      // rather than let the second silently overwrite the first's poster.
      let poster = posterName(relPath);
      let n = 2;
      while (usedNames.has(poster)) {
        poster = posterName(relPath).replace(/\.jpg$/, `-${n}.jpg`);
        n++;
      }
      usedNames.add(poster);
      const posterFsPath = path.join(POSTER_DIR, poster);

      // Skip re-extracting if it already exists and is non-empty (fast reruns).
      // `--force` re-cuts every poster, which is what you want after changing
      // how frames are chosen — otherwise the old ones silently survive.
      let needsExtract = FORCE;
      if (!needsExtract) {
        try {
          const s = await stat(posterFsPath);
          needsExtract = s.size === 0;
        } catch {
          needsExtract = true;
        }
      }
      if (needsExtract) await extractPoster(file, posterFsPath, duration);

      meta[relPath] = {
        width,
        height,
        aspectRatio: width && height ? `${width}/${height}` : null,
        duration,
        poster: `/images/posters/${poster}`,
      };
      ok++;
      process.stdout.write(".");
    } catch (err) {
      failed++;
      console.error(`\nFailed: ${relPath}\n  ${err.message}`);
    }
  }

  await writeFile(OUT_FILE, JSON.stringify(meta, null, 2) + "\n");
  console.log(`\nDone. ${ok} ok, ${failed} failed. Wrote ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
