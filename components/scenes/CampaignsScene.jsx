"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Scene from "@/components/Scene";
import MediaFrame from "@/components/MediaFrame";
import PlayButton from "@/components/PlayButton";
import { getProject } from "@/lib/projects";
import { useReveal } from "@/lib/useReveal";

/**
 * Rows, not a wrapping list. Each row is justified: every card's flex-grow is
 * its clip's own aspect ratio, so the widths within a row land in exactly the
 * proportion of the footage and together fill the line edge to edge — a wide
 * 16:9 cut takes roughly three times the width of a 9:16 one beside it, and
 * there is no ragged gap left over on the right. Rows deliberately mix
 * orientations so each line has a wide anchor and vertical cuts against it.
 */
const ROWS = [
  ["nykaa-navratri", "sherox-jacqueline", "birds-eye-ridhima"],
  ["lyne-ananya", "bodyshop-shraddha", "ui-mouni-roy"],
  ["pintola-rashmika", "laneige-athiya"],
];

/**
 * SC 02 — CAMPAIGNS.
 *
 * The broader brand roster beyond the six featured boards. This roster's
 * real hero cuts are already a mix of landscape (Sherox, Bodyshop, Pintola)
 * and portrait (the other five) — a uniform grid would force that mix into
 * identical cells. Instead every card fixes a shared row height and wraps
 * like a contact sheet, so the landscape cuts read wide and the portrait
 * cuts read narrow in the same row, and the alternation is the actual
 * catalog's own rhythm rather than a decorative pattern.
 */
export default function CampaignsScene() {
  const ref = useRef(null);
  useReveal(ref);
  // Nothing in this scene plays on its own. `forceActive` overrides
  // CinematicVideo's usual "autoplay once on screen" rule, so a card only
  // runs while it is the one the visitor pressed play on — and because only
  // one slug can be held here, starting one stops the last.
  const [playing, setPlaying] = useState(null);

  const rows = ROWS.map((slugs) => slugs.map(getProject).filter(Boolean));
  const count = rows.reduce((n, r) => n + r.length, 0);
  let n = 0;

  return (
    <Scene id="campaigns" number="02" title="Campaigns" take={`Take 01 · ${count} films`}>
      <div ref={ref} className="camp-rows">
        {rows.map((row, ri) => (
          <div className="camp-line" key={ri}>
            {row.map((p) => {
              n += 1;
              const isPlaying = playing === p.slug;
              return (
                <div
                  key={p.slug}
                  className="camp-card reveal"
                  style={{ flexGrow: p.hero.width / p.hero.height }}
                >
                  <span className="camp-card__no">{String(n).padStart(3, "0")}</span>
                  <div className="camp-card__media media-hold">
                    <MediaFrame
                      media={p.hero}
                      forceActive={isPlaying}
                      sizes="(min-width: 980px) 40vw, 90vw"
                    />
                    <PlayButton
                      playing={isPlaying}
                      onClick={() => setPlaying(isPlaying ? null : p.slug)}
                      label={p.title}
                    />
                  </div>
                  <Link href={`/work/${p.slug}`} className="camp-card__title notation">
                    {p.title}
                  </Link>
                  <span className="camp-card__cat notation">{p.category}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Scene>
  );
}
