"use client";

import { useRef, useState } from "react";
import Scene from "@/components/Scene";
import CinematicVideo from "@/components/CinematicVideo";
import PlayButton from "@/components/PlayButton";
import { finalReel } from "@/lib/projects";
import { useReveal } from "@/lib/useReveal";

/**
 * SC 05 — THE REEL.
 *
 * The climax: one full-bleed film, loaded only as the visitor approaches
 * (CinematicVideo's default non-priority behaviour already does this — no
 * special-casing needed). This scene's id ("reel") is what CameraFrame
 * watches to flip the HUD from REC to PLAY.
 */
export default function ReelScene() {
  const ref = useRef(null);
  useReveal(ref, { once: false });
  // The closing reel waits to be started too, like every film below the
  // opening — arriving at the scene no longer rolls it on its own.
  const [playing, setPlaying] = useState(false);

  return (
    <Scene id="reel" number="05" title="The Reel" bare className="reel">
      <div ref={ref} className="reel__head">
        <span className="notation reveal">SC 05</span>
        <h2 className="reel__title reveal">The Reel</h2>
      </div>
      <div className="reel__frame media-hold">
        <CinematicVideo
          src={finalReel.src}
          poster={finalReel.poster}
          aspectRatio={finalReel.aspectRatio}
          forceActive={playing}
          sizes="100vw"
          quality={86}
        />
        <PlayButton
          playing={playing}
          onClick={() => setPlaying((v) => !v)}
          label="the reel"
        />
      </div>
    </Scene>
  );
}
