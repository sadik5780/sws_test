"use client";

import { useEffect } from "react";

/**
 * Ghost-in reveal, shared by every scene. Observes every `.reveal` element
 * inside `containerRef` and toggles `.in` on intersection. `once` mirrors
 * the reference's distinction: chapter slates re-animate on every arrival
 * (once: false), ordinary content plays once and stays (once: true).
 */
export function useReveal(containerRef, { once = true, threshold = 0.15 } = {}) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;
    const targets = root.matches(".reveal")
      ? [root, ...root.querySelectorAll(".reveal")]
      : [...root.querySelectorAll(".reveal")];
    if (!targets.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (once) {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              io.unobserve(en.target);
            }
          } else {
            en.target.classList.toggle("in", en.isIntersecting);
          }
        });
      },
      { threshold }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [containerRef, once, threshold]);
}
