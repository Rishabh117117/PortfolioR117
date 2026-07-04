// Shared project metadata (§8 accent map). Single source of truth for the
// home grid and the work index. Demo status tags are placeholders pending D-03.

export type Project = {
  name: string;
  slug: string;
  year: string;
  discipline: string;
  accent: string;
  status?: string;
  /** One-line value prop for cards — what the project IS, no click needed. */
  tagline?: string;
  featured?: boolean;
};

export const FLAGSHIPS: Project[] = [
  {
    name: "Follow",
    slug: "follow",
    year: "Spring 2026",
    discipline: "Systems · AI",
    // §4.4 — burnt orange, matching the bespoke /work/follow page + capstone deck
    // (was Persian Blue #1C39BB). FOLLOW-DEMO-1: the team-memory sandbox is built
    // and live, so the old SIMULATED demo-status tag became a framing badge like
    // the other flagships; demo status (WORKING) lives on the page's DemoCallout.
    // (No `featured` flag: the home grid is an equal 2×2 per Rishabh 2026-07-02.)
    accent: "#C2410C",
    status: "CAPSTONE · WORKING DEMO",
    tagline: "A shared, trackable memory layer between your team's AI tools.",
  },
  {
    name: "Greener Hours",
    slug: "greener-hours",
    year: "Spring 2026",
    discipline: "Climate · AI",
    accent: "#1C3B36",
    // GH-PAGE-1: bespoke narrative case study (deck-as-page retired). Honest
    // badge for a speculative open-standard course project; propagates to the
    // home grid + /work chips via ProjectCard.
    status: "COURSE PROJECT · CONCEPT",
    tagline: "An open carbon-disclosure standard for AI compute — one indicator, three surfaces.",
  },
  {
    name: "Healthy Materials",
    slug: "healthy-materials",
    year: "Fall 2025",
    discipline: "Materials · Research",
    accent: "#5C7A3A",
    // §2 — the page badge; the card on /work + the home grid must match it.
    status: "GRADUATE RESEARCH · CONCEPT",
    tagline: "Healthier-material spec packages priced to survive value engineering.",
  },
  {
    name: "Housing Works",
    slug: "housing-works",
    year: "Spring 2025",
    discipline: "Service · AI",
    accent: "#C0263B",
    // HW-PROTO-1: framing badge like GH/HM (the old SIMULATED demo-status tag
    // became wrong once the Trustee Workshops prototype went WORKING — demo
    // status now lives on the page's DemoCallout, per the D-03 axes split).
    status: "STUDIO PROJECT · CONCEPT",
    tagline: "Trustee-taught micro-workshops that keep learning in-house.",
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
