"use client";

import { useEffect, useState } from "react";
import Scene from "@/components/Scene";
import { prefersReducedMotion } from "@/lib/motion";

const KICKER = [
  "Advertising films",
  "Brand films & TVCs",
  "Digital campaigns",
  "Behind-the-scenes",
];

/**
 * SC 00 — OPENING.
 *
 * Type alone, on the void — no opening film. The rotating kicker line, the
 * two-line serif headline with a mint emphasis and the scroll hint carry the
 * whole screen, which is also why nothing on this page loads a video until
 * it is scrolled towards: the opening has none to load.
 */
export default function OpeningScene() {
  const [kickerIndex, setKickerIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const id = setInterval(() => setKickerIndex((i) => (i + 1) % KICKER.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <Scene id="hero" number="00" title="Opening" bare className="opening">
      <div className="opening__inner">
        <div className="opening__kicker">
          <span className="notation">Social Whistles Studio</span>
          <span className="opening__rot" aria-live="off">
            <span key={kickerIndex} className="opening__rot-line">
              {KICKER[kickerIndex]}
            </span>
          </span>
        </div>

        <h1 className="opening__title">
          We make
          <br />
          brands <em>move.</em>
        </h1>

        <div className="opening__foot">
          <p className="opening__sub">
            Advertising films, TVCs, brand films and platform-first digital video — shot and
            cut by Social Whistles Studio, Mumbai.
          </p>
          <div className="opening__scroll notation">
            <span className="opening__scroll-ln" />
            Roll picture — scroll
          </div>
        </div>
      </div>
    </Scene>
  );
}
