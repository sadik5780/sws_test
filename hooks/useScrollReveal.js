"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

export function useScrollReveal(
  scopeRef,
  selector,
  {
    y = 40,
    opacity = 0,
    stagger = 0.12,
    duration = 0.9,
    ease = "power3.out",
    start = "top 85%",
    once = true,
  } = {}
) {
  useEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(selector, {
        y,
        opacity,
        stagger,
        duration,
        ease,
        scrollTrigger: {
          trigger: scopeRef.current,
          start,
          once,
        },
      });
    }, scopeRef);

    return () => ctx.revert();
  }, [scopeRef, selector, y, opacity, stagger, duration, ease, start, once]);
}
