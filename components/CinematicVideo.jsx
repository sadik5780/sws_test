"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "@/lib/useInView";
import { claim, release } from "@/lib/activeVideo";
import { prefersReducedMotion, isDesktopViewport } from "@/lib/motion";

/**
 * THE PLAYER. Every portfolio video on the site goes through this.
 *
 * Loading is two-stage and IntersectionObserver-driven — for every instance
 * EXCEPT `priority` (the hero), which is the one deliberate exception to all
 * of this: it mounts with preload="auto" and starts playing the instant it
 * can, regardless of scroll position, because the brief is explicit that the
 * first screen must already feel alive on load, not after a scroll or an
 * observer fires.
 *
 *   ARMED   a wide rootMargin (the video is merely approaching the viewport)
 *           mounts the <video> tag with preload="metadata" — never "auto".
 *           Nothing is fetched before this; far-off videos stay as a poster
 *           <Image> only, which the browser lazy-loads on its own.
 *   PLAYING a tight threshold (the video is actually on screen) starts
 *           playback and claims the sitewide single-active-video slot
 *           (lib/activeVideo) — claiming pauses whatever played before it, so
 *           at most one portfolio video is ever running at once.
 *
 * Leaving the wide margin unmounts the <video> element entirely (not just
 * pausing it), which drops its buffered source and stops network use.
 *
 * The poster is always in the DOM, sized via `aspectRatio` before anything
 * else loads (zero layout shift), and the video cross-fades over it only
 * once it can actually play — so a slow connection never shows a blank or
 * broken frame even for the hero.
 */
export default function CinematicVideo({
  src,
  mobileSrc,
  poster,
  aspectRatio = "16/9",
  priority = false,
  loop = true,
  className = "",
  sizes = "100vw",
  quality = 82,
  posterAlt = "",
  onLoadingChange,
  // Set to false when this component is nested inside an <a>/<Link> (a
  // project card that navigates on click). Native <video controls> is a
  // nested interactive element inside a link — invalid HTML and broken
  // keyboard/screen-reader behaviour — so under prefers-reduced-motion a
  // non-controllable instance simply shows its poster and skips the video
  // element entirely rather than risk that. Instances that stand alone (the
  // hero, the project page's own cuts, the final reel) keep controls.
  allowControls = true,
  // Override for scenes where vertical IntersectionObserver visibility isn't
  // the right signal — the horizontal filmstrip keeps every board "on
  // screen" vertically at once, so it nominates exactly one active board by
  // horizontal position instead. null (default) leaves the normal
  // IntersectionObserver behaviour in charge.
  forceActive = null,
}) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const reactId = useId();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [desktop, setDesktop] = useState(true);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    setDesktop(isDesktopViewport());
    const mq = window.matchMedia("(min-width: 860px)");
    const sync = () => setDesktop(mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Stage 1 — approaching the viewport: safe to mount <video preload="metadata">.
  const approaching = useInView(wrapRef, { rootMargin: "60% 0px" });
  // Stage 2 — actually on screen: safe to autoplay.
  const onScreen = useInView(wrapRef, { rootMargin: "0px", threshold: 0.4 });

  const armed = priority || approaching || forceActive === true;
  const effectiveSrc = !desktop && mobileSrc ? mobileSrc : src;
  const effectiveOnScreen = forceActive === null ? onScreen : forceActive;
  // The hero doesn't wait to enter the viewport (it's already there on
  // load) or for the IntersectionObserver to confirm it — every other
  // instance only autoplays once actually on screen (or once its parent
  // scene says it's the active board, for forceActive callers).
  const shouldAutoplay = priority
    ? armed && !reduced && !failed
    : armed && effectiveOnScreen && !reduced && !failed;

  useEffect(() => {
    onLoadingChange?.(!ready && !failed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, failed]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (shouldAutoplay) {
      claim(reactId, () => v.pause());
      v.play?.().catch(() => {});
    } else {
      v.pause?.();
      release(reactId);
    }

    return () => release(reactId);
  }, [shouldAutoplay, reactId]);

  // Losing the wide margin drops the element (and its buffered source)
  // entirely, rather than just pausing it — this is what actually stops
  // network use for a video that has scrolled far away. Reduced-motion
  // instances that can't offer controls (nested in a link) stay on the
  // poster permanently instead of mounting an unplayable video element.
  const mountVideo = armed && !failed && !(reduced && !allowControls);

  return (
    <div
      ref={wrapRef}
      className={`cine-video ${className}`}
      style={{ aspectRatio }}
      data-state={failed ? "error" : ready ? "ready" : "loading"}
    >
      <Image
        src={poster}
        alt={posterAlt}
        fill
        quality={quality}
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className="cine-video__poster"
        draggable={false}
      />

      {mountVideo && (
        <video
          ref={videoRef}
          className="cine-video__el"
          // Only reveal the video once it is actually RUNNING. It used to fade
          // in the moment it could play, which meant a paused instance covered
          // its own poster with its first frame — and a first frame is usually
          // the fade from black, so the chosen thumbnail was never the thing
          // anyone saw. Paused instances now stay on the poster.
          data-ready={ready && shouldAutoplay}
          src={effectiveSrc}
          muted
          loop={loop}
          playsInline
          controls={reduced && allowControls}
          preload={priority ? "auto" : "metadata"}
          autoPlay={priority}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
