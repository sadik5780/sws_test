"use client";

import { useRef } from "react";
import Link from "next/link";
import CinematicVideo from "@/components/CinematicVideo";
import { CREDIT_ORDER, HOUSE_CREDITS } from "@/lib/projects";
import { useReveal } from "@/lib/useReveal";

/**
 * A PROJECT.
 *
 * The film is the page. No invented case-study prose — no fabricated brief,
 * objective or result — because none of that is known. What's known is the
 * project, its cuts and who made it, so that's what the page sets.
 *
 * Every cut past the first loads and plays only once scrolled into view —
 * this page can hold a dozen cuts (Tommy Hilfiger × Shahid has ten) without
 * ever downloading more than one at a time.
 */
export default function ProjectView({ project, next }) {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <main ref={ref} className="case">
      <header className="case-hero">
        <p className="notation case-eyebrow reveal">
          <span>Project</span>
          <span>{project.category}</span>
        </p>
        <h1 className="case-title reveal">{project.title}</h1>
      </header>

      <section className="case-cuts">
        {project.videos.map((video, i) => (
          <figure key={video.src} className="case-cut reveal">
            <CinematicVideo
              src={video.src}
              poster={video.poster}
              aspectRatio={video.aspectRatio}
              priority={i === 0}
              sizes="(min-width: 980px) 80vw, 100vw"
            />
            {video.label && <figcaption className="notation case-cut-label">{video.label}</figcaption>}
          </figure>
        ))}
      </section>

      <section className="case-block reveal">
        <h2 className="notation">Credits</h2>
        <dl className="case-details">
          {CREDIT_ORDER.map((role) => (
            <div key={role} className="case-detail">
              <dt className="notation">{role}</dt>
              <dd>{HOUSE_CREDITS[role] || "—"}</dd>
            </div>
          ))}
        </dl>
      </section>

      {next && (
        <nav className="case-next reveal">
          <span className="notation">Next project</span>
          <Link href={`/work/${next.slug}`} className="case-next-name">
            {next.title}
          </Link>
        </nav>
      )}
    </main>
  );
}
