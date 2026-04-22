"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const STEPS = [
  {
    label: "01 / Concept",
    title: "Ideas with intent",
    copy: "We start with an insight, not a brief. Every story begins with a point of view worth watching.",
    img: "/images/artStills/2.jpg",
  },
  {
    label: "02 / Shoot",
    title: "Craft on set",
    copy: "Cinematic direction, lean crews, fast decisions. We shoot for the edit, not for the ego.",
    img: "/images/artStills/6.jpg",
  },
  {
    label: "03 / Edit",
    title: "Rhythm & restraint",
    copy: "Pace, cut, score. We treat the edit as the final act of direction — where stories find their pulse.",
    img: "/images/artStills/7.jpg",
  },
  {
    label: "04 / Release",
    title: "Built to travel",
    copy: "From launch film to social cut-downs, every asset is tuned to the platform it lives on.",
    img: "/images/artStills/8.jpg",
  },
];

export default function Storytelling() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".story-panel");
      const images = gsap.utils.toArray(".story-visual-img");

      gsap.set(panels, { opacity: 0, yPercent: 8 });
      gsap.set(panels[0], { opacity: 1, yPercent: 0 });
      gsap.set(images, { opacity: 0, scale: 1.08 });
      gsap.set(images[0], { opacity: 1, scale: 1 });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 720px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${panels.length * 80}%`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        panels.forEach((panel, i) => {
          if (i === 0) return;
          const prev = panels[i - 1];
          const prevImg = images[i - 1];
          const img = images[i];

          tl.to(prev, { opacity: 0, yPercent: -8, ease: "power2.inOut" }, ">")
            .to(prevImg, { opacity: 0, scale: 1.1, ease: "power2.inOut" }, "<")
            .fromTo(
              panel,
              { opacity: 0, yPercent: 8 },
              { opacity: 1, yPercent: 0, ease: "power2.inOut" },
              "<"
            )
            .fromTo(
              img,
              { opacity: 0, scale: 1.1 },
              { opacity: 1, scale: 1, ease: "power2.inOut" },
              "<"
            );
        });

        gsap.to(".story-progress-bar", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${panels.length * 80}%`,
            scrub: true,
          },
        });
      });

      mm.add("(max-width: 719px)", () => {
        gsap.set(panels, { opacity: 1, yPercent: 0 });
        gsap.set(images, { opacity: 1, scale: 1 });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="storytelling">
      <div className="story-visual">
        {STEPS.map((s, i) => (
          <Image
            key={i}
            className="story-visual-img"
            src={s.img}
            alt=""
            fill
            quality={90}
            sizes="100vw"
            draggable={false}
          />
        ))}
        <div className="story-visual-overlay" aria-hidden="true" />
      </div>

      <div className="story-panels">
        {STEPS.map((s, i) => (
          <div key={i} className="story-panel">
            <span className="story-label">{s.label}</span>
            <h2 className="story-title">{s.title}</h2>
            <p className="story-copy">{s.copy}</p>
          </div>
        ))}
      </div>

      <div className="story-progress">
        <div className="story-progress-bar" />
      </div>
    </section>
  );
}
