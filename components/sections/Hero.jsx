"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      gsap.from(".hero-line", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.15,
      });

      gsap.from(".hero-meta > *", {
        opacity: 0,
        y: 16,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        delay: 1,
      });

      mm.add("(min-width: 720px)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: "+=130%",
              scrub: true,
              pin: true,
              anticipatePin: 1,
            },
          })
          .to(".hero-bg", { scale: 1.12, yPercent: -6, ease: "none" }, 0)
          .to(".hero-headline", { yPercent: -35, opacity: 0, ease: "none" }, 0)
          .to(".hero-meta", { opacity: 0, yPercent: -50, ease: "none" }, 0);
      });

      mm.add("(max-width: 719px)", () => {
        gsap.to(".hero-bg", {
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="hero">
      <Image
        className="hero-bg"
        src="/images/artStills/1.jpg"
        alt=""
        fill
        priority
        quality={95}
        sizes="100vw"
        draggable={false}
      />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-eyebrow">
          <span>Social Whistles Studio</span>
          <span>Est. MMXXIV</span>
        </div>

        <h1 className="hero-headline">
          <span className="hero-line-mask">
            <span className="hero-line">Stories built</span>
          </span>
          <span className="hero-line-mask">
            <span className="hero-line">in motion.</span>
          </span>
        </h1>

        <div className="hero-meta">
          <span>Direction</span>
          <span>Design</span>
          <span>Story</span>
        </div>
      </div>
    </section>
  );
}
