"use client";

import { useRef } from "react";
import Scene from "@/components/Scene";
import { CREDIT_ORDER, HOUSE_CREDITS } from "@/lib/projects";
import { useReveal } from "@/lib/useReveal";

/**
 * The client wall — real client names, drawn directly from the project titles
 * in lib/projects.js, set as typographic wordmarks rather than a run of plain
 * text. `mark` picks the lettering each house actually reads in: `couture`
 * for the wide high-contrast serif fashion titles use, `block` for the tight
 * heavy sans of the consumer brands, `wide` for the airy letterspaced sans of
 * the beauty and lifestyle end.
 *
 * These are typeset names, NOT reproductions of the clients' registered
 * logotypes — the studio doesn't own those marks and no logo files exist in
 * this repo, so nothing here imitates one. Drop a real supplied SVG in and
 * swap a cell over the moment a client provides it.
 */
const CLIENTS = [
  { name: "Ajio", mark: "block" },
  { name: "Attico", mark: "couture" },
  { name: "Zimmermann", mark: "couture" },
  { name: "Alexander Vauthier", mark: "couture" },
  { name: "Tommy Hilfiger", mark: "wide" },
  { name: "Tumi", mark: "block" },
  { name: "Pokerbaazi", mark: "block" },
  { name: "The Body Shop", mark: "wide" },
  { name: "Pintola", mark: "block" },
  { name: "Nykaa", mark: "wide" },
  { name: "Laneige", mark: "wide" },
  { name: "Armani Exchange", mark: "couture" },
  { name: "Elle", mark: "couture" },
];

const ROLL = [
  { role: "Production", who: "Social Whistles Studio — Mumbai" },
  { role: "Direction", who: HOUSE_CREDITS.Direction },
  { role: "Territory", who: "Mumbai, India" },
];

/**
 * SC 06 — CREDITS / CONTACT.
 *
 * End titles: real client names in order of appearance, a short credits
 * roll, one closing statement, a film-slate-styled contact card and the
 * actual studio contact details.
 */
export default function CreditsScene() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <Scene id="credits" number="06" title="Credits" take="Roll · End titles">
      <div ref={ref} className="credits-body">
        <p className="notation reveal credits-eyebrow">In order of appearance</p>
        <ul className="logo-wall reveal">
          {CLIENTS.map((c) => (
            <li key={c.name} className="logo-cell">
              <span className="logo-mark" data-mark={c.mark}>
                {c.name}
              </span>
            </li>
          ))}
        </ul>

        <div className="cr-roll reveal">
          {ROLL.map((r) => (
            <div key={r.role} className="cr-row">
              <span className="notation">{r.role}</span>
              <span>{r.who}</span>
            </div>
          ))}
        </div>

        <h2 className="cr-cut reveal">
          Let&rsquo;s make
          <br />
          something <em>move.</em>
        </h2>

        <div className="end-slate reveal">
          <div className="end-slate__row">
            <span>Scene</span>
            <span>Your brief</span>
          </div>
          <div className="end-slate__row">
            <span>Studio</span>
            <span>Social Whistles Studio</span>
          </div>
          {CREDIT_ORDER.map((role) => (
            <div key={role} className="end-slate__row">
              <span>{role}</span>
              <span>{HOUSE_CREDITS[role] || "—"}</span>
            </div>
          ))}
        </div>

        <div className="end-cta reveal">
          <a href="mailto:client@socialwhistles.studio">client@socialwhistles.studio</a>
          <a href="tel:+919867337153">+91 98673 37153</a>
          <a href="https://www.instagram.com/socialwhistlesstudio" target="_blank" rel="noopener noreferrer">
            @socialwhistlesstudio
          </a>
        </div>
      </div>
    </Scene>
  );
}
