"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const ITEMS = [
  { title: "Kadence", tag: "Brand Film", img: "/images/artStills/6.jpg", span: "tall" },
  { title: "Northbound", tag: "Campaign", img: "/images/artStills/7.jpg", span: "wide" },
  { title: "Echo", tag: "Music Video", img: "/images/artStills/9.jpg", span: "normal" },
  { title: "Arc", tag: "Short Film", img: "/images/artStills/12.jpg", span: "normal" },
  { title: "Hinterland", tag: "Documentary", img: "/images/artStills/1.jpg", span: "tall" },
  { title: "Solace", tag: "Commercial", img: "/images/artStills/8.jpg", span: "wide" },
];

export default function Portfolio() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".portfolio-heading .heading-line", {
        yPercent: 110,
        duration: 1,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".portfolio-heading",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".portfolio-item", {
        y: 80,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: { each: 0.09, from: "start" },
        scrollTrigger: {
          trigger: ".portfolio-grid",
          start: "top 85%",
          once: true,
        },
      });

      gsap.utils.toArray(".portfolio-item").forEach((item) => {
        const img = item.querySelector(".portfolio-img");
        gsap.fromTo(
          img,
          { yPercent: 8 },
          {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="portfolio">
      <header className="portfolio-heading">
        <span className="portfolio-eyebrow">Selected work</span>
        <h2>
          <span className="heading-line-mask">
            <span className="heading-line">Recent</span>
          </span>
          <span className="heading-line-mask">
            <span className="heading-line">projects.</span>
          </span>
        </h2>
      </header>

      <div className="portfolio-grid">
        {ITEMS.map((item) => (
          <article
            key={item.title}
            className={`portfolio-item portfolio-item--${item.span}`}
          >
            <div className="portfolio-media">
              <Image
                className="portfolio-img"
                src={item.img}
                alt={item.title}
                fill
                quality={90}
                sizes="(min-width: 1200px) 25vw, (min-width: 720px) 40vw, 90vw"
                draggable={false}
              />
              <div className="portfolio-hover" aria-hidden="true">
                <span>View case</span>
              </div>
            </div>
            <div className="portfolio-meta">
              <h3>{item.title}</h3>
              <span>{item.tag}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
