"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function FooterCTA() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-line", {
        yPercent: 110,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".cta-meta > *", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          once: true,
        },
      });

      gsap.to(".cta-bg", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="footer-cta">
      <Image
        className="cta-bg"
        src="/images/artStills/2.jpg"
        alt=""
        fill
        quality={90}
        sizes="100vw"
        draggable={false}
      />
      <div className="cta-overlay" aria-hidden="true" />

      <div className="cta-inner">
        <h2 className="cta-headline">
          <span className="cta-line-mask">
            <span className="cta-line">Let&rsquo;s make</span>
          </span>
          <span className="cta-line-mask">
            <span className="cta-line">something loud.</span>
          </span>
        </h2>

        <div className="cta-meta">
          <a className="cta-button" href="mailto:hello@socialwhistles.studio">
            Start a project
          </a>
          <span>hello@socialwhistles.studio</span>
          <span>&copy; {new Date().getFullYear()} Social Whistles Studio</span>
        </div>
      </div>
    </section>
  );
}
