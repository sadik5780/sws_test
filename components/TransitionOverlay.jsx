"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

export default function TransitionOverlay() {
  const overlayRef = useRef(null);
  const prevPathnameRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (prevPathnameRef.current === null) {
      prevPathnameRef.current = pathname;
      return;
    }
    if (prevPathnameRef.current === pathname) return;
    prevPathnameRef.current = pathname;

    const el = overlayRef.current;
    if (!el) return;

    const tl = gsap.timeline();

    tl.fromTo(
      el,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.5, ease: "power3.inOut" }
    ).to(el, {
      yPercent: -100,
      duration: 0.55,
      delay: 0.15,
      ease: "power3.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return <div ref={overlayRef} className="page-overlay" aria-hidden="true" />;
}
