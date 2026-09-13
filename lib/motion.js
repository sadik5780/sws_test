"use client";

/**
 * Shared, framework-agnostic motion helpers. The scroll/timeline system
 * itself lives in lib/filmProgress.js — this file only holds the small
 * environment checks every component needs.
 */

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Fine pointer + real hover — gates the custom cursor and hover-only detail. */
export function hasFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function isDesktopViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 860px)").matches;
}
