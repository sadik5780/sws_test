/**
 * CLOUDFLARE R2 — the client's bucket, untouched.
 *
 * The bucket's public asset root is `video_assets_compressed/`, one level
 * below the bucket root. Every path passed to `r2Url` is relative to that
 * root and must match the client's existing folder/file names exactly —
 * nothing here renames, moves, or reorganizes anything in the bucket.
 *
 * Each path segment is percent-encoded independently so spaces, `&`, `#` and
 * accidental double-spaces in the client's own filenames survive untouched.
 */
const BASE = process.env.NEXT_PUBLIC_R2_BASE_URL || "";
const ASSET_ROOT = "video_assets_compressed";

if (!BASE && process.env.NODE_ENV !== "test") {
  // Fails loudly at build/runtime rather than silently shipping broken <video>
  // tags — a missing env var should not read as "the film library is dead".
  console.warn(
    "[lib/r2] NEXT_PUBLIC_R2_BASE_URL is not set — R2 asset URLs will be relative and broken."
  );
}

export function r2Url(relativePath) {
  const clean = relativePath.replace(/^\/+/, "");
  const encoded = clean
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  return `${BASE}/${ASSET_ROOT}/${encoded}`;
}
