"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Scene from "@/components/Scene";
import MediaFrame from "@/components/MediaFrame";
import PlayButton from "@/components/PlayButton";
import { btsProjects } from "@/lib/projects";
import { useReveal } from "@/lib/useReveal";

/**
 * SC 03 — BTS.
 *
 * Deliberately less polished than Selected Work: an asymmetric masonry of
 * real behind-the-scenes footage. Motion only — no production stills. Where
 * a column needs a second tile it takes another real cut from the same
 * shoot's own `videos` list rather than dropping in a photograph.
 */

/** [project index, which cut of that project, caption] — all real footage. */
const TILES = [
  [0, 0, "Take 01 · A-Roll"],
  [1, 0, "Take 02 · B-Roll"],
  [1, 2, "Take 03 · On set"],
  [2, 0, "Take 01 · On set"],
  [3, 0, "Take 01 · Vlog"],
  [0, 2, "Take 02 · A-Roll"],
];

export default function BTSScene() {
  const ref = useRef(null);
  useReveal(ref);
  // Nothing here plays on its own; one tile at a time, started by hand.
  const [playing, setPlaying] = useState(null);

  const tiles = TILES.map(([pi, vi, take]) => {
    const project = btsProjects[pi];
    const media = project?.videos[vi] || project?.hero;
    return project && media ? { project, media, take } : null;
  }).filter(Boolean);

  // Three masonry columns, filled round-robin so adjacent tiles come from
  // different shoots and the column heights stay uneven on purpose.
  const cols = [[], [], []];
  tiles.forEach((t, i) => cols[i % 3].push(t));

  return (
    <Scene id="bts" number="03" title="Behind the Scenes" take="BTS · On set">
      <div ref={ref} className="bts-collage">
        {cols.map((col, ci) => (
          <div className="bts-col" key={ci}>
            {col.map((t, i) => {
              const key = `${t.project.slug}-${i}`;
              const isPlaying = playing === key;
              return (
                <div key={key} className="bts-tile media-hold reveal">
                  <MediaFrame
                    media={t.media}
                    forceActive={isPlaying}
                    sizes="(min-width: 980px) 30vw, 90vw"
                  />
                  <PlayButton
                    playing={isPlaying}
                    onClick={() => setPlaying(isPlaying ? null : key)}
                    label={`${t.project.title} — ${t.take}`}
                  />
                  <Link href={`/work/${t.project.slug}`} className="bts-tile__cap notation">
                    {t.take}
                  </Link>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Scene>
  );
}
