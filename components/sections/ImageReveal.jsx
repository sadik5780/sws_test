"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function ImageReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal",
        { clipPath: "inset(20% 15% 20% 15% round 12px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 12px)",
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".reveal-img",
        { scale: 1.25 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.from(".reveal-caption > *", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 60%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="image-reveal-section">
      <div className="reveal">
        <Image
          className="reveal-img"
          src="/images/artStills/8.jpg"
          alt=""
          fill
          quality={95}
          sizes="100vw"
          draggable={false}
        />
        <div className="reveal-caption">
          <span>Case study</span>
          <h3>A single frame, perfectly timed.</h3>
        </div>
      </div>
    </section>
  );
}
