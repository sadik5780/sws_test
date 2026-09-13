"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Scene from "@/components/Scene";
import CinematicVideo from "@/components/CinematicVideo";
import PlayButton from "@/components/PlayButton";
import { editorialProjects, talent, getProject } from "@/lib/projects";
import { useReveal } from "@/lib/useReveal";

/**
 * SC 04 — EDITORIAL / PEOPLE.
 *
 * A fashion-magazine register (large serif type, a single portrait film, a
 * lot of air) folded together with a plain typographic name index — no
 * video loads per name, only a hover-revealed poster still for names with a
 * verified linked project.
 */
export default function EditorialScene() {
  const ref = useRef(null);
  useReveal(ref);
  // Nothing here plays on its own; one spread at a time, started by hand.
  const [playing, setPlaying] = useState(null);

  return (
    <Scene id="editorial" number="04" title="Editorial / People" take="Take 01 · Magazines">
      <div ref={ref}>
        {editorialProjects.map((project) => {
          const words = project.title.split(" × ");
          const isPlaying = playing === project.slug;
          return (
            <article key={project.slug} className="ed-spread reveal">
              <div className="ed-spread__figure media-hold">
                <CinematicVideo
                  src={project.hero.src}
                  poster={project.hero.poster}
                  aspectRatio={project.hero.aspectRatio}
                  forceActive={isPlaying}
                  sizes="(min-width: 980px) 30vw, 80vw"
                />
                <PlayButton
                  playing={isPlaying}
                  onClick={() => setPlaying(isPlaying ? null : project.slug)}
                  label={project.title}
                />
              </div>
              <h3 className="ed-spread__title">
                <Link href={`/work/${project.slug}`}>
                  {words.map((w, i) => (
                    <span key={i}>{i > 0 ? <em> × {w}</em> : w}</span>
                  ))}
                </Link>
              </h3>
            </article>
          );
        })}

        <div className="people reveal">
          <p className="people__eyebrow notation">Talent worked with</p>
          <ul className="people__list">
            {talent.map((person) => {
              const project = person.slug ? getProject(person.slug) : null;
              return (
                <li key={person.name} className="people__item">
                  {project ? (
                    <Link href={`/work/${project.slug}`} className="people__name people__name--linked">
                      {person.name}
                      <span className="people__preview" aria-hidden="true">
                        <Image
                          src={project.hero.poster}
                          alt=""
                          fill
                          quality={70}
                          sizes="200px"
                          draggable={false}
                        />
                      </span>
                    </Link>
                  ) : (
                    <span className="people__name">{person.name}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Scene>
  );
}
