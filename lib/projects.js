/**
 * THE MANIFEST.
 *
 * Every path below is verified against the client's Cloudflare R2 bucket
 * (`socialwhistle`, asset root `video_assets_compressed/`, see `lib/r2.js`) —
 * spot-checked with real HTTP requests, not guessed. Nothing here renames,
 * moves, or reorganizes anything in the bucket; this file only maps existing
 * paths onto the site's content.
 *
 * `data/asset-meta.json` (built by `scripts/generate-asset-meta.mjs` from the
 * local, gitignored `video_assets_compressed/` mirror — byte-identical to
 * what's live on R2) supplies real width/height/duration/poster for every
 * clip, so nothing here is hand-guessed either.
 *
 * House rule, carried over from the previous pass at this file: nothing is
 * invented. No fabricated years, budgets, briefs or credits. A few folders
 * named in the studio's brief aren't present in the verified asset list yet
 * (Hello × Deepika, WOW × Kartik, two Personal folders) — they're left out
 * entirely rather than shipped with guessed filenames. Add them the moment
 * real filenames are confirmed; everything downstream (Editorial, /work,
 * generateStaticParams) picks them up automatically.
 */
import assetMeta from "@/data/asset-meta.json";
import { r2Url } from "@/lib/r2";

/**
 * ORIENTATION — classified from the real width/height in data/asset-meta.json,
 * never from a filename guess. `landscape` and `portrait` use a small dead
 * zone around 1:1 so a 4:5 or 5:4 export still reads as its visual intent
 * rather than flip-flopping on rounding.
 */
function classifyOrientation(width, height) {
  const ratio = width / height;
  if (ratio > 1.15) return "landscape";
  if (ratio < 0.87) return "portrait";
  return "square";
}

function clip(relPath, label) {
  const meta = assetMeta[relPath];
  if (!meta) {
    throw new Error(`lib/projects.js: no asset-meta entry for "${relPath}" — run scripts/generate-asset-meta.mjs`);
  }
  return {
    src: r2Url(relPath),
    poster: meta.poster,
    width: meta.width,
    height: meta.height,
    aspectRatio: meta.aspectRatio || "16/9",
    orientation: classifyOrientation(meta.width, meta.height),
    duration: meta.duration,
    label: label || null,
  };
}

/**
 * PROJECTS — one entry per client project folder in the bucket. Folders that
 * hold the exact same underlying file under two different bucket paths (the
 * studio's own WGC curation duplicates a handful of Brands campaigns) are
 * kept as ONE entry here, under whichever path reads as the primary client
 * categorization — the site never shows the same film twice as if it were
 * two different takes.
 */
export const projects = [
  // ---------------------------------------------------------------- Brands1
  {
    slug: "ajio-attico-ananya",
    title: "AJIO × ATTICO × ANANYA PANDAY",
    category: "Fashion / Campaign",
    group: "brands",
    featured: true,
    hero: clip("Brands1/Brands/Ajio x Attico x Ananya Panday/Ajio x Attico x AP.mp4"),
    videos: [
      clip("Brands1/Brands/Ajio x Attico x Ananya Panday/Ajio x Attico x AP.mp4"),
    ],
  },
  {
    slug: "ajio-zimmerman-kareena",
    title: "AJIO × ZIMMERMANN × KAREENA",
    category: "Fashion / Campaign",
    group: "brands",
    featured: true,
    hero: clip("Brands1/Brands/Ajio x Zimmerman x Kareena/Reel 1.mp4"),
    videos: [
      clip("Brands1/Brands/Ajio x Zimmerman x Kareena/Reel 1.mp4", "Reel 1"),
      clip("Brands1/Brands/Ajio x Zimmerman x Kareena/Reel 2.mp4", "Reel 2"),
      clip("Brands1/Brands/Ajio x Zimmerman x Kareena/Reel 3.mp4", "Reel 3"),
    ],
  },
  {
    slug: "vauthier-janhvi",
    title: "ALEXANDER VAUTHIER × JANHVI KAPOOR",
    category: "Campaign Film",
    group: "brands",
    featured: true,
    hero: clip("Brands1/Brands/Alexander Vauthier x Janhvi/Vauthier x JK Reel 1.mp4"),
    videos: [
      clip("Brands1/Brands/Alexander Vauthier x Janhvi/Vauthier x JK Reel 1.mp4", "Reel 1"),
      clip("Brands1/Brands/Alexander Vauthier x Janhvi/Vauthier x JK Reel 2.mp4", "Reel 2"),
    ],
  },
  {
    slug: "laneige-athiya",
    title: "LANEIGE × ATHIYA SHETTY",
    category: "Beauty / Digital Film",
    group: "brands",
    featured: false,
    hero: clip("Brands1/Brands/Athiya Shetty X Laneige/Video 1- Water bank HQ.mp4"),
    videos: [
      clip("Brands1/Brands/Athiya Shetty X Laneige/Video 1- Water bank HQ.mp4"),
    ],
  },
  {
    slug: "birds-eye-ridhima",
    title: "BIRD'S EYE BY RIDHIMA",
    category: "Teaser",
    group: "brands",
    featured: false,
    hero: clip("Brands1/Brands/Bird Eye by Ridhima/Bird Eye Teaser 1.mp4"),
    videos: [
      clip("Brands1/Brands/Bird Eye by Ridhima/Bird Eye Teaser 1.mp4", "Teaser 1"),
      clip("Brands1/Brands/Bird Eye by Ridhima/Bird Eye Teaser 2.mp4", "Teaser 2"),
    ],
  },
  {
    slug: "lyne-ananya",
    title: "LYNE × ANANYA PANDAY",
    category: "Brand Film",
    group: "brands",
    featured: false,
    hero: clip("Brands1/Brands/Lyne x Ananya/Lyne x Ananya Reel 1.mp4"),
    videos: [
      clip("Brands1/Brands/Lyne x Ananya/Lyne x Ananya Reel 1.mp4", "Reel 1"),
      clip("Brands1/Brands/Lyne x Ananya/Lyne x Ananya Teaser.mp4", "Teaser"),
      clip("Brands1/Brands/Lyne x Ananya/Lyne x Ananya BTS.mp4", "BTS"),
    ],
  },
  {
    slug: "nykaa-navratri",
    title: "NYKAA NAVRATRI",
    category: "Digital Campaign",
    group: "brands",
    featured: false,
    hero: clip("Brands1/Brands/Nykaa Navratri/Anjali Reel.mp4"),
    videos: [
      clip("Brands1/Brands/Nykaa Navratri/Anjali Reel.mp4", "Anjali"),
      clip("Brands1/Brands/Nykaa Navratri/Rytasha Reel.mp4", "Rytasha"),
    ],
  },
  {
    slug: "pokerbaazi-shahid",
    title: "POKERBAAZI × SHAHID KAPOOR",
    category: "Fashion / Campaign",
    group: "brands",
    featured: true,
    // Native vertical cut, not the pillarboxed 16:9 export — see project notes.
    hero: clip("Brands1/Brands/Pokerbaazi x Shahid/9_16/Fashion Reel 9_16.mp4"),
    // SC01's mixed-orientation demonstration case #2 — the client cut the
    // same fashion reel natively in both 9:16 and 1:1, no landscape export
    // exists in the bucket for this project, so the board shows exactly the
    // two real orientations rather than inventing a third.
    board: [
      { media: clip("Brands1/Brands/Pokerbaazi x Shahid/9_16/Fashion Reel 9_16.mp4"), role: "hero" },
      { media: clip("Brands1/Brands/Pokerbaazi x Shahid/1_1/Fashion Reel 1_1.mp4"), role: "detail" },
    ],
    videos: [
      clip("Brands1/Brands/Pokerbaazi x Shahid/9_16/Fashion Reel 9_16.mp4", "Fashion reel — 9:16"),
      clip("Brands1/Brands/Pokerbaazi x Shahid/1_1/Fashion Reel 1_1.mp4", "Fashion reel — 1:1"),
      clip("Brands1/Brands/Pokerbaazi x Shahid/9_16/Coming Soon Asset 9_16.mp4", "Coming soon — 9:16"),
      clip("Brands1/Brands/Pokerbaazi x Shahid/1_1/Coming Soon Asset  1_1.mp4", "Coming soon — 1:1"),
      clip("Brands1/Brands/Pokerbaazi x Shahid/9_16/Playing with Cards 9_16.mp4", "Playing with cards — 9:16"),
      clip("Brands1/Brands/Pokerbaazi x Shahid/1_1/Playing with Cards gif 1_1.mp4", "Playing with cards — 1:1"),
      clip("Brands1/Brands/Pokerbaazi x Shahid/9_16/Poker Chip GIF 9_16.mp4", "Poker chip — 9:16"),
      clip("Brands1/Brands/Pokerbaazi x Shahid/1_1/Poker chip GIF 1_1.mp4", "Poker chip — 1:1"),
      clip("Brands1/Brands/Pokerbaazi x Shahid/1_1/BTS 1_1.mp4", "BTS — 1:1"),
      clip("Brands2/Brands/Pokerbaazi x Shahid/9_16/BTS 9_16.mp4", "BTS — 9:16"),
      clip("Brands2/Brands/Pokerbaazi x Shahid/9_16/Fun on set 9_16.mp4", "Fun on set — 9:16"),
      clip("Brands2/Brands/Pokerbaazi x Shahid/1_1/Fun on set  1_1.mp4", "Fun on set — 1:1"),
    ],
  },
  {
    slug: "sherox-jacqueline",
    title: "SHEROX × JACQUELINE FERNANDEZ",
    category: "Digital Campaign",
    group: "brands",
    featured: false,
    hero: clip("Brands1/Brands/Sherox X Jacky/Sherox CTA V2.mp4"),
    videos: [clip("Brands1/Brands/Sherox X Jacky/Sherox CTA V2.mp4")],
  },
  {
    slug: "tommy-hilfiger-shahid",
    title: "TOMMY HILFIGER × SHAHID KAPOOR",
    category: "Watches / Campaign",
    group: "brands",
    featured: true,
    // The 16:9 export is pillarboxed with the brand lockup baked into both
    // margins — the native vertical cut is the true frame for the card.
    hero: clip("Brands1/Brands/Tommy Hilfiger x Shahid/Dancing Playfully 15 seconder 9-16.mp4"),
    // SC01's mixed-orientation test case — this is the one project in the
    // bucket shot and delivered natively in all three orientations, so its
    // board shows all three side by side instead of picking just one hero.
    board: [
      { media: clip("Brands1/Brands/Tommy Hilfiger x Shahid/Dancing Playfully 15 seconder 16-9.mp4"), role: "hero" },
      { media: clip("Brands1/Brands/Tommy Hilfiger x Shahid/Dancing Playfully 15 seconder 9-16.mp4"), role: "secondary" },
      { media: clip("Brands1/Brands/Tommy Hilfiger x Shahid/Wave Asset.mp4"), role: "detail" },
    ],
    videos: [
      clip("Brands1/Brands/Tommy Hilfiger x Shahid/Dancing Playfully 15 seconder 9-16.mp4", "Dancing playfully — 9:16"),
      clip("Brands1/Brands/Tommy Hilfiger x Shahid/Dancing Playfully 15 seconder 1-1 final.mp4", "Dancing playfully — 1:1"),
      clip("Brands1/Brands/Tommy Hilfiger x Shahid/Dancing Playfully 15 seconder 16-9.mp4", "Dancing playfully — 16:9"),
      clip("Brands1/Brands/Tommy Hilfiger x Shahid/Q&A Part 1.mp4", "Q&A — part 1"),
      clip("Brands1/Brands/Tommy Hilfiger x Shahid/Q&A Part 2.mp4", "Q&A — part 2"),
      clip("Brands1/Brands/Tommy Hilfiger x Shahid/Q&A Part 3.mp4", "Q&A — part 3"),
      clip("Brands1/Brands/Tommy Hilfiger x Shahid/BTS Full.mp4", "BTS"),
      clip("Brands1/Brands/Tommy Hilfiger x Shahid/Wave Asset.mp4", "Wave asset"),
      clip("Brands1/Brands/Tommy Hilfiger x Shahid/Confetti Boomerang.mp4", "Confetti boomerang"),
      clip("Brands1/Brands/Tommy Hilfiger x Shahid/Intercut Arm Asset 1-1 2SK.mp4", "Intercut arm asset"),
    ],
  },
  {
    slug: "tumi-adarsh-gaurav",
    title: "TUMI × ADARSH GOURAV",
    category: "Brand Film",
    group: "brands",
    featured: true,
    hero: clip("Brands1/Brands/Tumi x Adarsh Gaurav/Tumi x Adarsh Gaurav.mp4"),
    videos: [
      clip("Brands1/Brands/Tumi x Adarsh Gaurav/Tumi x Adarsh Gaurav.mp4", "Film"),
      clip("Brands1/Brands/Tumi x Adarsh Gaurav/Hyperlapse.mp4", "Hyperlapse"),
    ],
  },
  {
    slug: "ui-mouni-roy",
    title: "U&I × MOUNI ROY",
    category: "Brand Reel",
    group: "brands",
    featured: false,
    hero: clip("Brands1/Brands/U&I x Mouni Roy/U&I x Mouni Reel 1.mp4"),
    videos: [
      clip("Brands1/Brands/U&I x Mouni Roy/U&I x Mouni Reel 1.mp4", "Reel 1"),
      clip("Brands1/Brands/U&I x Mouni Roy/U&I x Mouni Reel 2.mp4", "Reel 2"),
    ],
  },

  // ---------------------------------------------------------------- Brands2
  {
    slug: "bodyshop-shraddha",
    title: "THE BODY SHOP × SHRADDHA KAPOOR",
    category: "Beauty / Digital Film",
    group: "brands",
    featured: false,
    hero: clip("Brands2/Brands/BodyshopXShraddha Kappor/Bodyshop.mp4"),
    videos: [clip("Brands2/Brands/BodyshopXShraddha Kappor/Bodyshop.mp4")],
  },
  {
    slug: "pintola-rashmika",
    title: "PINTOLA × RASHMIKA MANDANNA",
    category: "Digital Campaign",
    group: "brands",
    featured: false,
    hero: clip("Brands2/Brands/Pintola x Rashmika/Asset 1.mp4"),
    videos: [
      clip("Brands2/Brands/Pintola x Rashmika/Asset 1.mp4", "Asset 1"),
      clip("Brands2/Brands/Pintola x Rashmika/Asset 2.mp4", "Asset 2"),
      clip("Brands2/Brands/Pintola x Rashmika/Asset 3.mp4", "Asset 3"),
    ],
  },

  // -------------------------------------------------------------------- BTS
  {
    slug: "dhamaka-kartik",
    title: "DHAMAKA × KARTIK AARYAN",
    category: "Behind the Scenes",
    group: "bts",
    featured: false,
    hero: clip("BTS/Films - BTS/Dhamaka x Kartik/Assets11.mp4"),
    videos: [
      clip("BTS/Films - BTS/Dhamaka x Kartik/Assets11.mp4"),
      clip("BTS/Films - BTS/Dhamaka x Kartik/Assets_10v3.mp4"),
      clip("BTS/Films - BTS/Dhamaka x Kartik/Asseets9_1.mp4"),
    ],
  },
  {
    slug: "freddy-kartik",
    title: "FREDDY × KARTIK AARYAN",
    category: "Behind the Scenes",
    group: "bts",
    featured: false,
    hero: clip("BTS/Films - BTS/Freddy x Kartik/Becoming Freddy v7.mp4"),
    videos: [
      clip("BTS/Films - BTS/Freddy x Kartik/Becoming Freddy v7.mp4", "Becoming Freddy"),
      clip("BTS/Films - BTS/Freddy x Kartik/FREDDY body language & psychology v1.mp4", "Body language & psychology"),
      clip("BTS/Films - BTS/Freddy x Kartik/Dentist Training v1.mp4", "Dentist training"),
      clip("BTS/Films - BTS/Freddy x Kartik/KA x ALAYA v1.mp4", "KA x Alaya"),
      clip("BTS/Films - BTS/Freddy x Kartik/Poster Review Final.mp4", "Poster review"),
    ],
  },
  {
    slug: "mans-world-kartik",
    title: "MAN'S WORLD × KARTIK AARYAN",
    category: "Behind the Scenes",
    group: "bts",
    featured: false,
    hero: clip("BTS/Films - BTS/Man_s World x Kartik/Man_s magazine v2 opt 2.mp4"),
    videos: [clip("BTS/Films - BTS/Man_s World x Kartik/Man_s magazine v2 opt 2.mp4")],
  },
  {
    slug: "munch-kartik",
    title: "MUNCH × KARTIK AARYAN",
    category: "Behind the Scenes",
    group: "bts",
    featured: false,
    hero: clip("BTS/Films - BTS/Munch x Kartik/Munch x Kartik Reel 1.mp4"),
    videos: [clip("BTS/Films - BTS/Munch x Kartik/Munch x Kartik Reel 1.mp4")],
  },
  {
    slug: "supercell-kartik",
    title: "SUPERCELL × KARTIK AARYAN",
    category: "Behind the Scenes",
    group: "bts",
    featured: false,
    // "REEL v4 opt2" is held for the homepage Final Reel section — the vlog
    // cut is this project's own BTS representative so neither is shown twice.
    hero: clip("BTS/Films - BTS/Supercell x Kartik/Supercell vlog v2.mp4"),
    videos: [
      clip("BTS/Films - BTS/Supercell x Kartik/Supercell vlog v2.mp4", "Vlog"),
      clip("BTS/Films - BTS/Supercell x Kartik/REEL v4 opt2.mp4", "Reel"),
    ],
  },

  // -------------------------------------------------------------- Magazines
  {
    slug: "elle-janhvi",
    title: "ELLE × JANHVI KAPOOR",
    category: "Editorial",
    group: "editorial",
    featured: false,
    hero: clip("Magazines/Editorial - Magazines/Elle x Janhvi/Elle x Janhvi Reel 1.mp4"),
    videos: [
      clip("Magazines/Editorial - Magazines/Elle x Janhvi/Elle x Janhvi Reel 1.mp4", "Reel 1"),
      clip("Magazines/Editorial - Magazines/Elle x Janhvi/Elle x Janhvi Q&A.mp4", "Q&A"),
    ],
  },
  {
    slug: "elle-shobhita",
    title: "ELLE × SHOBHITA DHULIPALA",
    category: "Editorial",
    group: "editorial",
    featured: false,
    hero: clip("Magazines/Editorial - Magazines/Elle x Shobhita/Elle x Shobhita Reel 1.mp4"),
    videos: [clip("Magazines/Editorial - Magazines/Elle x Shobhita/Elle x Shobhita Reel 1.mp4")],
  },
  {
    slug: "elle-siddhant",
    title: "ELLE × SIDDHANT CHATURVEDI",
    category: "Editorial",
    group: "editorial",
    featured: false,
    hero: clip("Magazines/Editorial - Magazines/Elle x Siddhant/Elle x Sid Reel 1.mp4"),
    videos: [clip("Magazines/Editorial - Magazines/Elle x Siddhant/Elle x Sid Reel 1.mp4")],
  },

  // --------------------------------------------------------------- Personal
  {
    slug: "ishaan-khattar",
    title: "ISHAAN KHATTAR",
    category: "Personal Project",
    group: "personal",
    featured: false,
    hero: clip("Personal/Personal/Ishaan Khattar/Ishaan Reel 1.mp4"),
    videos: [
      clip("Personal/Personal/Ishaan Khattar/Ishaan Reel 1.mp4", "Reel 1"),
      clip("Personal/Personal/Ishaan Khattar/Ishaan Reel 2.mp4", "Reel 2"),
    ],
  },
  {
    slug: "khushi-kapoor",
    title: "KHUSHI KAPOOR",
    category: "Personal Project",
    group: "personal",
    featured: false,
    hero: clip("Personal/Personal/Khushi Kapoor/Khushi Reel 1.mp4"),
    videos: [clip("Personal/Personal/Khushi Kapoor/Khushi Reel 1.mp4")],
  },
  {
    slug: "sharvari",
    title: "SHARVARI",
    category: "Personal Project",
    group: "personal",
    featured: false,
    hero: clip("Personal/Personal/Sharvari/Sharvari Reel 1.mp4"),
    videos: [clip("Personal/Personal/Sharvari/Sharvari Reel 1.mp4")],
  },

  // -------------------------------------------------------------------- WGC
  {
    slug: "ajio-luxe-jacqueline",
    title: "AJIO LUXE × JACQUELINE FERNANDEZ",
    category: "Fashion / Campaign",
    group: "wgc",
    featured: false,
    hero: clip("WGC/WGC/Ajio Luxe X Jacquline Fernandes/Aquazzura x JF Reel 1.mp4"),
    videos: [clip("WGC/WGC/Ajio Luxe X Jacquline Fernandes/Aquazzura x JF Reel 1.mp4")],
  },
  {
    slug: "armani-exchange-kartik",
    title: "ARMANI EXCHANGE × KARTIK AARYAN",
    category: "Fashion / Campaign",
    group: "wgc",
    featured: false,
    hero: clip("WGC/WGC/Armaani Exchange X Kartik Aryan/Armani 29th May (1).mp4"),
    videos: [clip("WGC/WGC/Armaani Exchange X Kartik Aryan/Armani 29th May (1).mp4")],
  },
  {
    slug: "madame-shanaya",
    title: "MADAME × SHANAYA KAPOOR",
    category: "Fashion / Campaign",
    group: "wgc",
    featured: false,
    hero: clip("WGC/WGC/MadameX Shanaya Kapoor/REEL 1 FINAL 28TH FEB.mp4"),
    videos: [clip("WGC/WGC/MadameX Shanaya Kapoor/REEL 1 FINAL 28TH FEB.mp4")],
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

export function getNextProject(slug) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  return projects[(i + 1) % projects.length];
}

/** Homepage curation — explicit slugs, in the order the studio's brief gave. */
export const featuredProjects = [
  "ajio-attico-ananya",
  "tommy-hilfiger-shahid",
  "tumi-adarsh-gaurav",
  "vauthier-janhvi",
  "ajio-zimmerman-kareena",
  "pokerbaazi-shahid",
].map((slug) => getProject(slug));

const BTS_HOMEPAGE = ["dhamaka-kartik", "freddy-kartik", "munch-kartik", "supercell-kartik"];
export const btsProjects = BTS_HOMEPAGE.map((slug) => getProject(slug));

export const editorialProjects = projects.filter((p) => p.group === "editorial");
/* Hello × Deepika is the brief's fourth Editorial pick. No verified filename
   exists for it yet (see file header) — this slot stays empty rather than
   guessed. Add the project above with group: "editorial" and it appears here
   automatically. */

/** The closing full-bleed reel — the one cut in the whole bucket named
    "REEL", held back from Supercell's own BTS card so it isn't shown twice. */
export const finalReel = clip("BTS/Films - BTS/Supercell x Kartik/REEL v4 opt2.mp4");

/**
 * TALENT — a plain name index for the People section. `slug` links to that
 * person's best representative project for the hover reveal; names with no
 * verified project stay linkless rather than pointing at a guess.
 */
export const talent = [
  { name: "Ananya Panday", slug: "ajio-attico-ananya" },
  { name: "Shahid Kapoor", slug: "tommy-hilfiger-shahid" },
  { name: "Janhvi Kapoor", slug: "vauthier-janhvi" },
  { name: "Kareena Kapoor Khan", slug: "ajio-zimmerman-kareena" },
  { name: "Adarsh Gourav", slug: "tumi-adarsh-gaurav" },
  { name: "Kartik Aaryan", slug: "dhamaka-kartik" },
  { name: "Jacqueline Fernandez", slug: "sherox-jacqueline" },
  { name: "Athiya Shetty", slug: "laneige-athiya" },
  { name: "Mouni Roy", slug: "ui-mouni-roy" },
  { name: "Shraddha Kapoor", slug: "bodyshop-shraddha" },
  { name: "Rashmika Mandanna", slug: "pintola-rashmika" },
  { name: "Shobhita Dhulipala", slug: "elle-shobhita" },
  { name: "Siddhant Chaturvedi", slug: "elle-siddhant" },
  { name: "Ishaan Khattar", slug: "ishaan-khattar" },
  { name: "Khushi Kapoor", slug: "khushi-kapoor" },
  { name: "Sharvari", slug: "sharvari" },
  { name: "Shanaya Kapoor", slug: "madame-shanaya" },
];

export const TOTAL = String(projects.length).padStart(2, "0");

export const CREDIT_ORDER = ["Direction", "Production", "Cinematography", "Edit"];

/** Known for every take. Anything not known is left out, not guessed. */
export const HOUSE_CREDITS = {
  Direction: "Abhishek Sharma",
  Production: "Social Whistles Studio",
  Cinematography: null,
  Edit: "Social Whistles Studio",
};

