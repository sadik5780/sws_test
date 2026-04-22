"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const WORDS =
  "We are a creative studio crafting films, brands and digital stories that move people.".split(
    " "
  );

export default function IntroStatement() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".intro-word", {
        opacity: 0.15,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          end: "bottom 60%",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="intro">
      <p className="intro-copy">
        {WORDS.map((w, i) => (
          <span key={i} className="intro-word">
            {w}
            {i < WORDS.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </section>
  );
}
