import Link from "next/link";
import { projects, TOTAL } from "@/lib/projects";
import CinematicVideo from "@/components/CinematicVideo";

export const metadata = {
  title: "Work",
  description:
    "The full reel — advertising films, brand films, editorial and behind-the-scenes work from Social Whistles Studio.",
};

/**
 * The whole verified catalog, flat. The homepage curates six; this is every
 * project confirmed against the client's R2 bucket. Every card is its own
 * CinematicVideo instance, so nothing here downloads until it's scrolled
 * into view — this page can list dozens of projects without ever loading
 * more than a couple of videos at once.
 */
export default function WorkIndexPage() {
  return (
    <main>
      <header className="page-head">
        <p className="slate">
          <span>The Reel</span>
          <span>{TOTAL} projects</span>
        </p>
        <h1>Selected work</h1>
      </header>

      <div className="work-list">
        {projects.map((p) => (
          <article key={p.slug} className="work-entry">
            <Link
              href={`/work/${p.slug}`}
              className="work-entry__figure"
              aria-label={`${p.title} — open project`}
            >
              <CinematicVideo
                src={p.hero.src}
                poster={p.hero.poster}
                aspectRatio={p.hero.aspectRatio}
                sizes="(min-width: 980px) 48vw, 100vw"
                allowControls={false}
              />
            </Link>

            <div className="work-entry__body">
              <h2 className="work-entry__name">{p.title}</h2>
              <span className="notation">{p.category}</span>
              <Link href={`/work/${p.slug}`} className="link-quiet">
                Open project
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
