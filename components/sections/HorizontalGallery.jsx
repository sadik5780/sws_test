"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const ITEMS = [
  { img: "/images/artStills/1.jpg", title: "Vessel", tag: "Brand film", depth: 0.15 },
  { img: "/images/artStills/2.jpg", title: "Nocturne", tag: "Campaign", depth: -0.2 },
  { img: "/images/artStills/6.jpg", title: "Arc", tag: "Short", depth: 0.08 },
  { img: "/images/artStills/7.jpg", title: "Halcyon", tag: "Docu", depth: -0.12 },
  { img: "/images/artStills/8.jpg", title: "Lumen", tag: "Commercial", depth: 0.2 },
  { img: "/images/artStills/9.jpg", title: "Ember", tag: "Music", depth: -0.06 },
];

export default function HorizontalGallery() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 720px)", () => {
        const section = ref.current;
        const track = section.querySelector(".hgallery-track");

        const getScrollAmount = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);

        const tl = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray(".hgallery-item").forEach((item) => {
          const img = item.querySelector(".hgallery-img");
          const depth = parseFloat(item.dataset.depth) || 0;
          gsap.fromTo(
            img,
            { yPercent: depth * 50 },
            {
              yPercent: depth * -50,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                containerAnimation: tl,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });

        return () => tl.kill();
      });

      mm.add("(max-width: 719px)", () => {
        gsap.from(".hgallery-item", {
          y: 60,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            once: true,
          },
        });
      });

      gsap.from(".hgallery-heading > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="hgallery">
      <div className="hgallery-inner">
        <header className="hgallery-heading">
          <span className="hgallery-eyebrow">In frame</span>
          <h2>Scroll the reel.</h2>
        </header>

        <div className="hgallery-track">
          {ITEMS.map((item) => (
            <article
              key={item.title}
              className="hgallery-item"
              data-depth={item.depth}
            >
              <div className="hgallery-media">
                <Image
                  className="hgallery-img"
                  src={item.img}
                  alt={item.title}
                  fill
                  quality={90}
                  sizes="(min-width: 1200px) 28vw, (min-width: 720px) 45vw, 80vw"
                  draggable={false}
                />
              </div>
              <div className="hgallery-meta">
                <h3>{item.title}</h3>
                <span>{item.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
