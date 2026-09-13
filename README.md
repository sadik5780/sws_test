# Social Whistles Studio

Boutique digital video production studio and creative agency, Mumbai.
Next.js 13 (App Router) + GSAP/ScrollTrigger + Lenis.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
```

---

## The film library

Every portfolio video is served directly from the client's Cloudflare R2
bucket (`socialwhistle`) — nothing is copied into this repo or into Vercel.
`lib/r2.js` builds the public URL for any path; `NEXT_PUBLIC_R2_BASE_URL`
in `.env` is the bucket's public base (a `pub-*.r2.dev` URL or custom
domain). The bucket's own folder structure is untouched and is never
renamed, reorganized, or enumerated from the browser — see `lib/projects.js`
for the full explanation and every verified path.

**Adding a video:** confirm the exact filename exists in the bucket (a
`curl -I` against the built URL is the fastest check — R2 is case-sensitive
and any stray space/ampersand in the client's own filenames must survive
URL-encoding untouched), add it to the relevant project in `lib/projects.js`
via the `clip()` helper, then run:

```bash
node scripts/generate-asset-meta.mjs
```

This reads the local, gitignored `video_assets_compressed/` mirror (kept in
sync with the bucket for exactly this purpose — see below) and writes real
width/height/duration and a generated poster frame into
`data/asset-meta.json` / `public/images/posters/`. `clip()` throws at build
time if a path has no matching entry, so a typo'd filename fails loudly
instead of shipping a broken `<video>` tag.

A few folders named in the studio's brief have no verified filename yet
(Hello × Deepika, WOW × Kartik, two Personal folders) and are deliberately
left out of `lib/projects.js` rather than guessed — see that file's header.

## Content lives in one file

`lib/projects.js` is the only place to edit the work:

- `projects[]` — one entry per project. `hero` is the card/thumbnail cut,
  `videos[]` is every cut shown on that project's own page. Adding an entry
  adds it to `/work` and generates `/work/<slug>` automatically.
- `featuredProjects` / `btsProjects` / `editorialProjects` — the homepage's
  curation, by explicit slug list (or `group` filter for Editorial).
- `finalReel` — the closing full-bleed reel (SC 05).
- `talent[]` — the People section's name index.
- `HOUSE_CREDITS` — credits applied to every project.

### The rule this content follows

**Nothing here is invented.** Titles are built from the client's own folder
names; categories are inferred conservatively from what a folder obviously
is (a client's fashion campaign, a magazine editorial, a BTS cut) and
nothing more specific is claimed. Unknown values are left out entirely
rather than guessed — a missing detail reads as absent, not wrong.

## Performance architecture

Every portfolio video goes through `components/CinematicVideo.jsx`. The
short version: a poster `<Image>` is always in the DOM (reserving the
video's *real* aspect ratio — most of this roster is 9:16 or 4:5, never
stretched to a 16:9 template); the `<video>` element itself is only mounted
once the frame is approaching the viewport, only starts playing once it's
actually on screen, and is unmounted again once it scrolls back out — so a
page can list every project in the bucket without ever downloading more
than one or two videos at a time. `lib/activeVideo.js` additionally
guarantees at most one video is *playing* anywhere on the page at once. The
homepage opens on type alone, so nothing loads until the visitor scrolls.
`priority` is the one opt-out (used by the first cut on a project page): it
mounts immediately but still opens on its poster frame, cross-fading to
video only once playable.

## Structure

```
app/
  page.js              running order of the homepage
  layout.js            fonts, metadata, chrome
  work/                the full catalog + /work/[slug]
components/
  CinematicVideo.jsx   the shared video player (see above)
  sections/            one file per homepage section
  SiteHeader/Footer    chrome; header samples the tone underneath it
lib/
  projects.js          all content — the manifest
  r2.js                R2 URL builder
  activeVideo.js       single-active-video singleton
  useInView.js         shared IntersectionObserver hook
  motion.js            reduced-motion + pointer helpers
data/
  asset-meta.json      generated — see scripts/generate-asset-meta.mjs
scripts/
  generate-asset-meta.mjs   local ffmpeg/ffprobe pipeline (posters + dims)
styles/globals.css     the whole visual system
```

`styles/` still contains the pre-redesign stylesheets (`work.css`,
`team.scss`, `testimonial.css`, …) and `components/` still contains the
pre-redesign components (`Header.js`, `Footer.js`, `Loader.js`,
`Testimonial.js`, `team.js`, `logoSlider.js`, `CustomCursor.js`,
`Layout.js`). **Nothing imports them.** They are dead in every sense —
delete them when you are ready.

## Images

`public/images/artStills/` holds the studio's own production stills, used
by the Contact Sheet section — unrelated to the R2 video catalog. See git
history for provenance notes on individual files.

`public/images/posters/` is **generated** (`scripts/generate-asset-meta.mjs`)
— do not hand-edit it. Re-run the script after adding or replacing a video.

## Design notes

- **Paper, not black.** Warm off-white is the ground; near-black is reserved
  for the passages where the page becomes a screen (hero, work, process) and
  the closing frame. Tone is switched per section with `data-tone="dark" |
  "paper-2"`, and every section re-reads the same semantic tokens.
- **No accent colour.** The identity mark is a spotlight on black with no
  colour in it, so the palette has none either — just one warm light tone
  (`--light`) lifted off the cone of that logo, used on a handful of marks.
- **`rem` is 16px.** The reading size is set on `body`, never on `html` —
  moving it to the root silently rescales every `rem` step in the stylesheet.

## The motion system

Everything cinematic on this site is **scroll-position driven and
reversible**. Nothing important is a fire-once entrance: scrolling back
runs the film back. `lib/motion.js` holds the shared pieces — the important
one is **`editPosition`**: given progress across N items it *holds* each one
for ~60% of its slot then moves, so a scrub reads as an edit rather than a
scroll. `lib/useReframe.js` is the one pointer interaction — hovering a
frame nudges `object-position` a few percent; fine pointers only, touch gets
nothing, correctly.

### Rules for changing any of this

- **Never touch the outer ScrollTrigger instance inside `onRefresh`.** It
  fires synchronously from inside `create()`, while `const st` is still in
  its temporal dead zone. Use the `self` argument. This crashed the whole
  page once.
- **Restart `next start` after `next build`.** A server left running from a
  previous build serves a mix of old and new assets, and the symptoms look
  exactly like broken CSS (collapsed grids, zero-height elements).
- **Verify both motion paths after any change.** With
  `prefers-reduced-motion: reduce` the intro is skipped, pinned scenes drop
  to plain stacks, and CinematicVideo never autoplays (it renders native
  `controls` instead so the work is still reachable). Mobile (<860px) takes
  the same stacks.
