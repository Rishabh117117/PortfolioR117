// Shared project metadata (§8 accent map). Single source of truth for the
// home grid and the work index. `status` is the card's single chip (one chip
// per card since SHIP-FIXES; school context lives in `meta`).

export type Project = {
  name: string;
  slug: string;
  year: string;
  discipline: string;
  accent: string;
  status?: string;
  /** Card meta line — when set, replaces the default `year · discipline`. */
  meta?: string;
  /** One-line value prop for cards — what the project IS, no click needed. */
  tagline?: string;
  featured?: boolean;
};

/* Array order = home-grid order AND ProjectPager prev/next order (the pager
   wraps around this list): Follow → Healthy Materials → Housing Works →
   Greener Hours. */
export const FLAGSHIPS: Project[] = [
  {
    name: "Follow",
    slug: "follow",
    year: "Spring 2026",
    discipline: "Systems · AI",
    // §4.4 — burnt orange, matching the bespoke /work/follow page + capstone deck
    // (was Persian Blue #1C39BB).
    // (No `featured` flag: the home grid is an equal 2×2 per Rishabh 2026-07-02.)
    accent: "#C2410C",
    status: "LIVE SANDBOX · REAL MODEL",
    meta: "Capstone · 2026 · AI",
    tagline: "One memory across your team's AI tools: every fact with receipts.",
  },
  {
    name: "Healthy Materials",
    slug: "healthy-materials",
    year: "Fall 2025",
    discipline: "Materials · Research",
    // sage darkened to clear AA (4.5:1) for the card's accent link/chip text —
    // must match app/work/healthy-materials/theme.ts + app/icon.svg (DECISIONS.md).
    accent: "#4F6B33",
    status: "WORKING CONFIGURATOR",
    meta: "With the Healthy Materials Lab · 2025",
    tagline: "Healthier-material spec packages priced to survive value engineering.",
  },
  {
    name: "Housing Works",
    slug: "housing-works",
    year: "Spring 2025",
    discipline: "Service design",
    accent: "#C0263B",
    status: "REAL CLIENT · NYC NONPROFIT",
    meta: "Studio · 2025 · Service design",
    tagline: "Keeping young talent a nonprofit can't outbid: field research for Housing Works, shipped as a working workshop tool.",
  },
  {
    name: "Greener Hours",
    slug: "greener-hours",
    year: "Spring 2026",
    discipline: "Climate · AI",
    accent: "#1C3B36",
    // GH-PAGE-1: bespoke narrative case study (deck-as-page retired).
    status: "INTERACTIVE SIMULATION",
    meta: "Course project · 2026 · Climate · AI",
    tagline: "An open standard that puts a carbon label on AI compute.",
  },
];

export const ARCHIVE: Project[] = [
  { name: "VSG", slug: "vsg", year: "2019–23", discipline: "Client work", accent: "#7A6A52" },
  { name: "OBC Bank", slug: "obc", year: "2019–23", discipline: "Product design", accent: "#7A6A52" },
  { name: "BEST Bus", slug: "best", year: "2019–23", discipline: "App · transit", accent: "#7A6A52" },
  { name: "Music Rooms", slug: "music-rooms", year: "2019–23", discipline: "Spatial · UX", accent: "#7A6A52" },
  { name: "YAAP", slug: "yaap", year: "2019–23", discipline: "Product design", accent: "#7A6A52" },
  { name: "Stun Gun", slug: "stun-gun", year: "2019–23", discipline: "Industrial design", accent: "#A85F45" },
  { name: "Lotus Heater", slug: "lotus-heater", year: "2019–23", discipline: "Industrial design", accent: "#A85F45" },
];
