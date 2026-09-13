"use client";

/**
 * THE CONTROLLER.
 *
 * One requestAnimationFrame loop for the entire page. Scenes register their
 * DOM node on mount; the loop reads scrollY once per frame and writes the
 * result straight onto whatever DOM nodes (playhead, timecode, scene label,
 * a horizontal filmstrip's transform) actually need it — never through React
 * state, so a 60fps scroll never triggers a React re-render. This mirrors
 * how the reference site itself is built (a single vanilla-JS rAF loop, no
 * animation library at all) rather than fighting it with per-component
 * ScrollTrigger instances.
 *
 * `scenes` is ordered by registration, which matches document order because
 * each <Scene> registers from its own top-to-bottom mount effect.
 *
 * @typedef {{ id: string, number: string, title: string, el: HTMLElement }} SceneEntry
 */

const scenes = /** @type {SceneEntry[]} */ ([]);
const listeners = new Set(); // () => void, called once per frame after layout is fresh
const progressSubs = new Map(); // sceneId -> Set<(progress:number)=>void>
const sceneListSubs = new Set(); // () => void, fired whenever a scene (un)registers

let raf = 0;
let reduced = false;

export function setReducedMotion(v) {
  reduced = v;
}

export function registerScene(entry) {
  scenes.push(entry);
  scenes.sort((a, b) => a.el.offsetTop - b.el.offsetTop);
  sceneListSubs.forEach((cb) => cb());
  return () => {
    const i = scenes.indexOf(entry);
    if (i !== -1) scenes.splice(i, 1);
    sceneListSubs.forEach((cb) => cb());
  };
}

/** Fires whenever a scene registers or unregisters — lets the timeline
    re-render its segments as the page's scenes mount in. */
export function onScenesChanged(cb) {
  sceneListSubs.add(cb);
  return () => sceneListSubs.delete(cb);
}

/** Subscribe to a scene's own local scroll progress (0..1 across its height). */
export function onSceneProgress(id, cb) {
  if (!progressSubs.has(id)) progressSubs.set(id, new Set());
  progressSubs.get(id).add(cb);
  return () => progressSubs.get(id)?.delete(cb);
}

/** Subscribe to the global frame tick (fires after scene metrics are read). */
export function onFrame(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getScenes() {
  return scenes;
}

/** 24fps, a 90-second virtual reel per scene count — matches the reference's own math. */
const FPS = 24;
const SECONDS_PER_SCENE = 13;

function formatTimecode(prog, sceneCount) {
  const totalSeconds = SECONDS_PER_SCENE * Math.max(1, sceneCount);
  const frames = Math.round(prog * FPS * totalSeconds);
  const f = frames % FPS;
  const s = Math.floor(frames / FPS) % 60;
  const m = Math.floor(frames / (FPS * 60));
  const pad = (n) => String(n).padStart(2, "0");
  return `TC 00:${pad(m)}:${pad(s)}:${pad(f)}`;
}

function tick() {
  raf = requestAnimationFrame(tick);

  const H = window.innerHeight;
  const docH = document.documentElement.scrollHeight;
  const maxScroll = Math.max(1, docH - H);
  const y = window.scrollY;
  const globalProgress = Math.min(1, Math.max(0, y / maxScroll));

  let currentIndex = 0;
  scenes.forEach((sc, i) => {
    if (sc.el.getBoundingClientRect().top <= H * 0.5) currentIndex = i;
  });

  scenes.forEach((sc, i) => {
    const subs = progressSubs.get(sc.id);
    if (!subs || !subs.size) return;
    const next = scenes[i + 1];
    const start = sc.el.offsetTop;
    const end = next ? next.el.offsetTop : docH;
    const local = Math.min(1, Math.max(0, (y - start) / Math.max(1, end - start)));
    subs.forEach((cb) => cb(local));
  });

  const frame = {
    globalProgress,
    timecode: formatTimecode(globalProgress, scenes.length),
    currentIndex,
    currentScene: scenes[currentIndex] || null,
    sceneCount: scenes.length,
    reduced,
  };
  listeners.forEach((cb) => cb(frame));
}

let started = false;
export function startLoop() {
  if (started) return;
  started = true;
  raf = requestAnimationFrame(tick);
}

export function stopLoop() {
  started = false;
  cancelAnimationFrame(raf);
}
