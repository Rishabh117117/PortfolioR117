// Shared project metadata (§8 accent map). Single source of truth for the
// home grid and the work index. `status` is framing-only copy; `demo` is the
// separate working-demo axis (WORKING-DEMO-TAG-1), rendered as its own chip.

export type Project = {
  name: string;
  slug: string;
  year: string;
  discipline: string;
  accent: string;
  status?: string;
  /** Working-demo tag (separate axis from `status`, which is framing-only). */
  demo?: boolean;
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
    // WORKING-DEMO-TAG-1: `status` trimmed to framing-only — the WORKING DEMO
    // claim moved to the `demo` flag, rendered as its own card chip.
    accent: "#C2410C",
    status: "CAPSTONE",
    demo: true,
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
    // WORKING-DEMO-TAG-1: `status` trimmed to framing-only — the tier surfaces
    // (Tier-1 chat/Tier-2 scheduler/Tier-3 dashboard) are live, so the demo
    // claim now lives on the `demo` flag, rendered as its own card chip.
    status: "COURSE PROJECT",
    demo: true,
    tagline: "An open standard that puts a carbon label on AI compute.",
  },
  {
    name: "Healthy Materials",
    slug: "healthy-materials",
    year: "Fall 2025",
    discipline: "Materials · Research",
    // sage darkened to clear AA (4.5:1) for the card's accent link/chip text —
    // must match app/work/healthy-materials/theme.ts + app/icon.svg (DECISIONS.md).
    accent: "#4F6B33",
    // §2 — the page badge; the card on /work + the home grid must match it.
    // WORKING-DEMO-TAG-1: `status` trimmed to framing-only — the Packages
    // configurator is live, so the demo claim now lives on the `demo` flag,
    // rendered as its own card chip.
    status: "GRADUATE RESEARCH",
    demo: true,
    tagline: "Healthier-material spec packages priced to survive value engineering.",
  },
  {
    name: "Housing Works",
    slug: "housing-works",
    year: "Spring 2025",
    discipline: "Service design",
    accent: "#C0263B",
    // HW-PROTO-1: framing badge like GH/HM (the old SIMULATED demo-status tag
    // became wrong once the Trustee Workshops prototype went WORKING — demo
    // status now lives on the page's DemoCallout, per the D-03 axes split).
    // WORKING-DEMO-TAG-1: `status` trimmed to framing-only — the Trustee
    // Workshops app is live, so the demo claim now lives on the `demo` flag,
    // rendered as its own card chip.
    status: "STUDIO PROJECT",
    demo: true,
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
