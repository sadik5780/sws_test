"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * PICTURE START.
 *
 * A film countdown leader — the universal "3-2-1" academy leader every reel
 * opens on, decades older than any one studio's brand. Recreated here with
 * Social Whistles' own caption, not copied from any reference site: the
 * pattern (conic-gradient sweep, big serif numeral, a caption underneath) is
 * a generic cinema convention.
 *
 * Locks scroll (`body.locked`, read by CameraFrame to hide the HUD) until it
 * completes, then hands off to a brief focus-pull — the frame racks from a
 * soft blur to sharp, like a lens finding the scene, via `body.rolling`.
 * Skipped instantly under reduced motion so nothing is ever gated behind an
 * animation a visitor has asked not to see.
 */
const STEP_MS = 480;
const START_N = 3;

export default function Leader() {
  const numRef = useRef(null);
  const sweepRef = useRef(null);
  const rootRef = useRef(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (prefersReducedMotion()) {
      setGone(true);
      body.classList.remove("locked");
      return undefined;
    }

    body.classList.add("locked");
    let start = null;
    let raf = 0;
    let lastN = null;

    const run = (ts) => {
      if (start === null) start = ts;
      const el = ts - start;
      const n = START_N - Math.floor(el / STEP_MS);
      const frac = (el % STEP_MS) / STEP_MS;

      if (sweepRef.current) {
        sweepRef.current.style.background = `conic-gradient(rgba(2,223,130,.18) ${frac * 360}deg, transparent ${frac * 360}deg)`;
      }

      if (n >= 1) {
        if (n !== lastN) {
          lastN = n;
          if (numRef.current) numRef.current.textContent = String(n);
        }
        raf = requestAnimationFrame(run);
      } else {
        setGone(true);
        body.classList.remove("locked");
        body.classList.add("rolling");
        // The focus-pull is a fixed full-screen backdrop-filter layer —
        // once its 2s blur-to-sharp animation finishes, drop the class so
        // the layer stops being an active (and, in some renderers,
        // lingering-visible) compositing layer rather than just resting at
        // blur(0).
        setTimeout(() => body.classList.remove("rolling"), 2200);
      }
    };

    raf = requestAnimationFrame(run);
    return () => {
      cancelAnimationFrame(raf);
      html.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div className="focus-pull" aria-hidden="true" />
      <div ref={rootRef} className={`leader ${gone ? "gone" : ""}`} aria-hidden={gone}>
        <div className="leader-x h" />
        <div className="leader-x v" />
        <div className="leader-ring">
          <div ref={sweepRef} className="leader-sweep" />
          <div ref={numRef} className="leader-num">
            {START_N}
          </div>
        </div>
        <div className="leader-cap">Social Whistles Studio — Picture Start</div>
      </div>
    </>
  );
}
