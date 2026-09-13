"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Scene from "@/components/Scene";
import MediaFrame from "@/components/MediaFrame";
import { featuredProjects } from "@/lib/projects";
import { onSceneProgress } from "@/lib/filmProgress";
import { prefersReducedMotion } from "@/lib/motion";

const RATIO_TAG = { landscape: "16:9", portrait: "9:16", square: "1:1" };

/**
 * SC 01 — SELECTED WORK.
 *
 * The reference's signature move: a `position:sticky` pin holding the
 * viewport still while an inner track is translated horizontally, driven by
 * the *same* central scroll-progress controller as the timeline (not a
 * separate ScrollTrigger or scroll-jacking library) — see
 * lib/filmProgress.js's `onSceneProgress`. Exactly one board is nominated
 * "active" by horizontal position and is the only one CinematicVideo will
 * actually autoplay (`forceActive`) — every board is simultaneously "on
 * screen" vertically in this layout, so the usual IntersectionObserver
 * heuristic can't be the one deciding what plays.
 *
 * Every board fixes a shared row HEIGHT (`--board-h`, in CSS) and lets width
 * fall out of each clip's real aspect ratio — a portrait board reads as a
 * narrow tall frame, a landscape one as a wide short frame, at the same eye
 * level, the way a contact sheet lines up frames of differing width on one
 * strip. Two projects in the catalog (Tommy Hilfiger, Pokerbaazi) were shot
 * and delivered in more than one native orientation — their boards render
 * every one of those cuts side by side instead of collapsing to one hero.
 */
/** The beat the pin keeps holding after the last board lands, so the closing
    statement is readable before the scene releases — the reference holds the
    same way rather than cutting straight into the next scene. */
const TAIL_VH = 55;

export default function SelectedWorkScene() {
  const pinRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const scrubRef = useRef(null);
  const smoothX = useRef(0);
  const travelRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // The outer <section> (registered with the timeline by <Scene>) is only as
  // tall as the sticky pin inside it, so on its own the pin never actually
  // holds — there is no scroll distance for it to hold THROUGH. This gives
  // the section the exact distance the track needs to travel (one vertical
  // pixel scrolled ≈ one horizontal pixel panned) plus a tail, and records
  // that travel distance for the progress remap below.
  useEffect(() => {
    const pin = pinRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const section = pin?.closest(".scene");
    if (!pin || !stage || !track || !section) return undefined;
    const measure = () => {
      const travel = Math.max(0, track.scrollWidth - stage.clientWidth);
      travelRef.current = travel;
      section.style.height = `calc(100svh + ${travel}px + ${TAIL_VH}svh)`;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      section.style.height = "";
    };
  }, []);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    return onSceneProgress("selected-work", (progress) => {
      const track = trackRef.current;
      const stage = stageRef.current;
      const pin = pinRef.current;
      const section = pin?.closest(".scene");
      if (!track || !stage || !pin || !section) return;

      // `progress` runs 0..1 across the WHOLE section, but the pin only holds
      // for (sectionHeight - pinHeight) of it — mapping the pan onto the raw
      // progress would leave the last boards still travelling after the pin
      // had already released and slid the strip off screen. Remapping onto
      // the travel distance alone lands the final board exactly as the hold
      // begins, so every board is seen pinned, and the tail is the hold.
      const travel = travelRef.current;
      const scrolled = progress * section.offsetHeight;
      const p = travel > 0 ? Math.min(1, scrolled / travel) : 0;

      const maxX = Math.max(0, track.scrollWidth - stage.clientWidth);
      const target = -p * maxX;
      smoothX.current += (target - smoothX.current) * (reduced ? 1 : 0.14);
      track.style.transform = `translate3d(${smoothX.current}px,0,0)`;

      if (scrubRef.current) scrubRef.current.style.transform = `scaleX(${p})`;

      const idx = Math.min(
        featuredProjects.length - 1,
        Math.round(p * (featuredProjects.length - 1))
      );
      setActiveIndex((prev) => (prev === idx ? prev : idx));
    });
  }, []);

  return (
    <Scene id="selected-work" number="01" title="Selected Work" bare className="sw">
      {/* `bare`, so the slate can live INSIDE the pin — the reference keeps
          its scene slate fixed at the top of the viewport for the whole
          horizontal run rather than letting it scroll away with the page. */}
      <div ref={pinRef} className="sw-pin">
        <header className="scene-slate sw-slate">
          <span className="slate-no notation">SC 01</span>
          <span className="slate-name notation">Selected Work</span>
          <span className="slate-take notation">
            Take 01 · {featuredProjects.length} boards
          </span>
        </header>

        <div ref={stageRef} className="sw-stage">
        <div ref={trackRef} className="sw-track">
          {featuredProjects.map((p, i) => {
            const board = p.board || [{ media: p.hero, role: "hero" }];
            return (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className={`board ${board.length > 1 ? "board--mixed" : "board--single"}`}
                aria-label={`${p.title} — view project`}
              >
                <span className="board__no">№ {String(i + 1).padStart(2, "0")}</span>
                <div className="board__media">
                  {board.map((b, bi) => (
                    <div className="board__frame" key={bi}>
                      <MediaFrame
                        media={b.media}
                        role={b.role}
                        sizes="(min-width: 980px) 44vw, 80vw"
                        allowControls={false}
                        forceActive={i === activeIndex}
                      />
                      {board.length > 1 && (
                        <span className="board__tag notation">{RATIO_TAG[b.media.orientation]}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="board__meta">
                  <span className="board__title">{p.title}</span>
                  <span className="board__cat notation">{p.category}</span>
                </div>
              </Link>
            );
          })}
          <div className="sw-end">
            <p className="sw-end__line">
              Every campaign starts with a brief.
              <br />
              It ends with a <em>launch.</em>
            </p>
          </div>
        </div>
        </div>

        <div className="sw-scrub" aria-hidden="true">
          <span ref={scrubRef} className="sw-scrub__fill" />
        </div>
      </div>
    </Scene>
  );
}
