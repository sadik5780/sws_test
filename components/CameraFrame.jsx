"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  startLoop,
  onFrame,
  onScenesChanged,
  getScenes,
  setReducedMotion,
} from "@/lib/filmProgress";
import { prefersReducedMotion, hasFinePointer } from "@/lib/motion";

const FORMAT = "2.39:1 · DIGITAL · 24 FPS";

/**
 * THE CAMERA FRAME.
 *
 * Persistent chrome, mounted once in app/layout.js: four corner brackets,
 * a top-left REC indicator, a top-right format readout + scene menu button,
 * and the bottom timeline — the site's real navigation and progress display.
 * Everything here is driven by lib/filmProgress.js's single rAF loop; every
 * per-frame write below goes straight to a DOM ref, never through React
 * state, so scrolling never triggers a re-render of this component.
 *
 * On non-homepage routes (no scenes registered) the bottom bar collapses to
 * a simple "back to the reel" link instead of an empty timeline.
 */
export default function CameraFrame() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scenesList, setScenesList] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState(false);

  const tcRef = useRef(null);
  const playheadRef = useRef(null);
  const scNoRef = useRef(null);
  const scNameRef = useRef(null);
  const segRefs = useRef(new Map());

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
    if (hasFinePointer()) document.body.classList.add("fine-pointer");
    startLoop();
  }, []);

  // Re-render the segment list whenever a scene mounts/unmounts, then
  // re-measure so each segment's width matches that scene's real height.
  useEffect(() => {
    const layout = () => {
      const scenes = getScenes();
      setScenesList(scenes.map((s) => ({ id: s.id, number: s.number, title: s.title })));
    };
    layout();
    const off = onScenesChanged(layout);
    window.addEventListener("resize", layout);
    return () => {
      off();
      window.removeEventListener("resize", layout);
    };
  }, []);

  // Segment width proportional to that scene's real pixel height — this can
  // only run once the <button> refs above have actually mounted, so it's a
  // separate effect keyed on the scene list rather than folded into layout().
  useEffect(() => {
    const scenes = getScenes();
    const docH = document.documentElement.scrollHeight;
    scenes.forEach((sc, i) => {
      const el = segRefs.current.get(sc.id);
      if (!el) return;
      const next = scenes[i + 1];
      const h = (next ? next.el.offsetTop : docH) - sc.el.offsetTop;
      el.style.flexGrow = String(Math.max(h, 1));
      el.style.flexBasis = "0px";
    });
  }, [scenesList]);

  // The one central per-frame write — timecode, playhead, current scene.
  useEffect(() => {
    return onFrame(({ globalProgress, currentIndex, timecode }) => {
      if (tcRef.current) tcRef.current.textContent = timecode;
      const scenes = getScenes();
      const cur = scenes[currentIndex];
      if (playheadRef.current) playheadRef.current.style.left = `${globalProgress * 100}%`;
      if (scNoRef.current && cur) {
        scNoRef.current.textContent = `SC ${cur.number} / ${String(scenes.length - 1).padStart(2, "0")}`;
      }
      if (scNameRef.current && cur) scNameRef.current.textContent = cur.title;
      segRefs.current.forEach((el, id) => {
        el.classList.toggle("on", !!cur && id === cur.id);
      });
    });
  }, []);

  // The Reel scene flips the whole HUD from REC to PLAY, same as a camera
  // monitor switching from standby to rolling.
  useEffect(() => {
    const el = document.getElementById("reel");
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [scenesList]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const goTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <span className="corner co-tl" aria-hidden="true" />
      <span className="corner co-tr" aria-hidden="true" />
      <span className="corner co-bl" aria-hidden="true" />
      <span className="corner co-br" aria-hidden="true" />
      <span className="vf-tick t" aria-hidden="true" />
      <span className="vf-tick b" aria-hidden="true" />

      <div className="hud hud-tl">
        <span className="rec-dot" data-playing={playing} aria-hidden="true" />
        <span>
          <b>{playing ? "PLAY" : "REC"}</b>
          <span className="hud-sub"> — SWS Cam · {playing ? "The Reel" : "A-Roll"}</span>
        </span>
      </div>

      <div className="hud hud-tr">
        <span className="fmt">{FORMAT}</span>
        {isHome && (
          <button type="button" onClick={() => setMenuOpen(true)}>
            Scenes
          </button>
        )}
      </div>

      <nav className="tl" aria-label="Timeline">
        <div className="tl-tc" ref={tcRef}>
          TC 00:00:00:00
        </div>

        {isHome ? (
          <>
            <div className="tl-mid">
              <div className="tl-segs">
                {scenesList.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className="seg"
                    ref={(el) => {
                      if (el) segRefs.current.set(s.id, el);
                      else segRefs.current.delete(s.id);
                    }}
                    onClick={() => goTo(s.id)}
                    aria-label={`Jump to SC ${s.number} — ${s.title}`}
                  >
                    <span className="sg-no">{s.number}</span>
                    <span className="sg-tip">
                      SC {s.number} — {s.title}
                    </span>
                  </button>
                ))}
              </div>
              <div className="playhead" ref={playheadRef} aria-hidden="true" />
            </div>
            <div className="tl-sc">
              <span className="no" ref={scNoRef}>
                SC 00 / 06
              </span>
              <span className="nm" ref={scNameRef}>
                Opening
              </span>
            </div>
          </>
        ) : (
          <div className="tl-mid tl-mid--simple">
            <Link href="/#reel" className="back-to-reel">
              ← Back to the reel
            </Link>
          </div>
        )}
      </nav>

      <div className={`scene-menu ${menuOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Scenes">
        <button type="button" className="menu-close" onClick={() => setMenuOpen(false)}>
          Close ✕
        </button>
        {scenesList.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => {
              e.preventDefault();
              goTo(s.id);
            }}
          >
            <span className="m-sc">SC {s.number}</span>
            <span className="m-t">{s.title}</span>
          </a>
        ))}
      </div>
    </>
  );
}
