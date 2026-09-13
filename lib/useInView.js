"use client";

import { useEffect, useState } from "react";

/**
 * Thin IntersectionObserver wrapper shared by every lazy-loaded video/image
 * on the site. `rootMargin` lets a caller start loading slightly before a
 * frame is actually on screen ("approaching viewport") without downloading
 * anything for frames that are still far away.
 */
export function useInView(ref, { rootMargin = "0px", threshold = 0, once = false } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (once && inView) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, rootMargin, threshold, once]);

  return inView;
}
