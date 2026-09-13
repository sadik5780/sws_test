"use client";

import { useEffect, useRef } from "react";
import { registerScene } from "@/lib/filmProgress";

/**
 * A SCENE.
 *
 * Registers its bounds with the central controller (lib/filmProgress.js) on
 * mount — that's what lets the timeline size its segments to each scene's
 * real pixel height and know which scene is "current." Renders the reference
 * site's "slate" header (scene number in mint, name, a small take/metadata
 * label) above its content; pass `bare` for the two scenes with their own
 * full-bleed header (Opening, The Reel).
 */
export default function Scene({
  id,
  number,
  title,
  take,
  bare = false,
  className = "",
  children,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return undefined;
    return registerScene({ id, number, title, el: ref.current });
  }, [id, number, title]);

  return (
    <section ref={ref} id={id} data-sc={number} data-name={title} className={`scene ${className}`}>
      {!bare && (
        <header className="scene-slate">
          <span className="slate-no notation">SC {number}</span>
          <span className="slate-name notation">{title}</span>
          {take && <span className="slate-take notation">{take}</span>}
        </header>
      )}
      {children}
    </section>
  );
}
