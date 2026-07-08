// Greener Hours — page data (GH-PAGE-1). Single source of truth for the bespoke
// /work/greener-hours narrative page. Copy is faithful to the final presentation
// deck (public/greener-hours/index.html); diagram GEOMETRY lives in the component
// files, list-like data + section copy live here. Colors are page-scoped tokens
// set on the page root (see app/work/greener-hours/page.tsx rootStyle) — never
// global tokens, never raw hex in components.

// ---- Hero -----------------------------------------------------------------
export const HERO = {
  eyebrow: "A design specification",
  lede:
    "An open accountability standard for AI compute carbon disclosure — three implementation surfaces that turn invisible energy costs into legible procurement infrastructure.",
  meta: [
    { k: "Course", v: "Design for a Warming World" },
    { k: "Program", v: "MS Strategic Design & Management · Parsons" },
    { k: "Term", v: "Spring 2026" },
  ],
};

// ---- §2 The scale (bar chart 2018–2030) -----------------------------------
// twh = value; max axis = 1000. projected = dashed/outlined (vs solid actual).
export type ScaleBar = { year: string; twh: number; label: string; projected: boolean; peak?: boolean };
export const SCALE_BARS: ScaleBar[] = [
  { year: "2018", twh: 200, label: "200", projected: false },
  { year: "2020", twh: 240, label: "240", projected: false },
  { year: "2022", twh: 290, label: "290", projected: false },
  { year: "2024", twh: 415, label: "415", projected: false },
  { year: "2026", twh: 580, label: "~580", projected: true },
  { year: "2028", twh: 760, label: "~760", projected: true },
  { year: "2030", twh: 945, label: "945", projected: true, peak: true },
];
export const SCALE_GIANT = "945";
export const SCALE_UNIT = "TWh";
export const SCALE_LEDE =
  "Projected global data-center electricity demand by 2030 — more than double 2024's 415 TWh, with AI identified by the IEA as the lead driver.";
export const SCALE_SOURCE =
  "IEA, Energy and AI (April 2025); Shehabi et al., 2024 U.S. Data Center Energy Usage Report, LBNL (Dec 2024).";

// ---- §3 The invisibility (dark-matter flow) -------------------------------
export const VIS_HEADLINE_A = "The user sees the AI.";
export const VIS_HEADLINE_B = "They don't see ";
export const VIS_HEADLINE_EM = "any of this.";
export const VIS_BUCKETS = [
  { lbl: "Supply side", txt: "Aggregate, annual, self-reported.", em: "Not per request." },
  { lbl: "Demand side", txt: "Zero signal.", em: "Nothing per request, period." },
  { lbl: "Dev tools", txt: "Voluntary, research-grade, inconsistent.", em: "Not procurement-grade." },
];
export const VIS_SOURCE =
  "Dark-matter framing after Dan Hill, Dark Matter and Trojan Horses (Strelka, 2015); AI energy estimates: IEA, Energy and AI (2025).";

// ---- §4 The insight (quote) -----------------------------------------------
export const INSIGHT = {
  lead: "Visibility doesn't change end-user behavior.",
  turn: "But visibility paired with a standard creates supply-side pressure.",
  attr: "The same pattern as HTTPS, energy labels, SBOM, and cloud-carbon dashboards.",
};

// ---- §5 The opportunity (three forces) ------------------------------------
export type Force = { no: string; title: string; take: string; takeEm: string };
export const FORCES: Force[] = [
  {
    no: "01",
    title: "Regulatory pressure",
    take: "All demand vendor-level emissions data.",
    takeEm: "None specify the technical standard.",
  },
  {
    no: "02",
    title: "Procurement demand",
    take: "Cloud got per-service carbon dashboards.",
    takeEm: "AI didn't.",
  },
  {
    no: "03",
    title: "Reusable infrastructure",
    take: "Three layers already exist.",
    takeEm: "The fourth is the work.",
  },
];

// ---- §6 The solution (one standard, three surfaces) -----------------------
export type Tier = {
  n: string;
  role: string;
  name: string;
  short: string; // one-word label for the compact mobile tab strip
  job: string;
  blurb: string; // short line under the tier label in the product rail
  hero: boolean; // the featured surface in the compact case-study preview
};
export const TIERS: Tier[] = [
  {
    n: "01",
    role: "Legibility",
    name: "Compute Window Indicator",
    short: "Indicator",
    job: "A small glyph that makes invisible energy costs visible — without pretending it changes user behavior.",
    blurb: "A carbon glyph, live inside the chat.",
    hero: true,
  },
  {
    n: "02",
    role: "Behavior",
    name: "Flexible Compute Scheduler",
    short: "Scheduler",
    job: "Set a deadline; the system routes the task to the cleanest grid window. The same UX pattern as EV charging.",
    blurb: "Set a deadline; it runs at the cleanest hour.",
    hero: false,
  },
  {
    n: "03",
    role: "Institutional",
    name: "Compute Footprint Dashboard",
    short: "Dashboard",
    job: "Procurement language, mirroring AWS Cost Explorer. Surfaces total volume alongside timing — the anti-rebound layer.",
    blurb: "A procurement view of the whole footprint.",
    hero: false,
  },
];
export const SUBSTRATE = {
  label: "The substrate",
  body: "Open API standard · per-request carbon disclosure as a response header.",
};

// Per-tier principles (shown beside each tier's mockup in the tabbed product view)
export type Principle = { code: string; kind: "anchor" | "load" | "support"; name: string; insight: string };
export const TIER1_PRINCIPLES: Principle[] = [
  { code: "P3", kind: "anchor", name: "Anchor · Dark matter", insight: "The indicator makes invisible energy costs legible — at the point of use." },
  { code: "P5", kind: "load", name: "Culture", insight: "Procurement language (“g/kWh · region”), not climate framing." },
  { code: "P7", kind: "load", name: "Tech as both", insight: "Treats AI as both an energy sink and a disclosure surface." },
];
export const TIER2_PRINCIPLES: Principle[] = [
  { code: "P4", kind: "load", name: "H2+ on H2−", insight: "Borrows EV-charging UX — set a deadline, the system optimizes timing." },
  { code: "P8", kind: "load", name: "Hack", insight: "Adds a scheduling layer over existing batch infrastructure." },
  { code: "P6", kind: "support", name: "Agency", insight: "Returns timing control to dev teams without climate framing." },
];
export const TIER3_PRINCIPLES: Principle[] = [
  { code: "P9", kind: "anchor", name: "Movable middle", insight: "Targets enterprise procurement teams — not end users." },
  { code: "P2", kind: "load", name: "Sufficiency", insight: "Anti-rebound — efficiency cannot disguise rising volume." },
  { code: "P7", kind: "support", name: "Tech as both", insight: "Surfaces total volume alongside intensity." },
];

// The full principle titles, verbatim from the course syllabus (Design for
// a Warming World, SP26 course outline) — shown when hovering a P-code chip so
// each chip reveals which of the ten principles it is.
export const PRINCIPLE_TITLES: Record<string, string> = {
  P1: "Understand where and how to maximize impact",
  P2: "Prioritize sufficiency over efficiency (the power of less)",
  P3: "Design with dark matter in mind",
  P4: "Design H2+ by building on H2− strengths",
  P5: "Design with culture, not against it",
  P6: "Design for agency at all levels",
  P7: "Treat technology as both a change enabler and a status quo amplifier",
  P8: "Hack systems to expand action spaces",
  P9: "Design for the movable middle, not for the planet",
  P10: "Integrate technical and personal resilience",
};
export const CARBON_PILL = { value: "412", unit: "gCO₂eq/kWh", region: "us-east-1", confidence: "high confidence" };

// ---- §7 How it works (three headers) --------------------------------------
export type ApiHeader = { name: string; value: string };
export const API_HEADERS: ApiHeader[] = [
  { name: "X-Compute-Carbon-Intensity", value: "412 gCO2eq/kWh" },
  { name: "X-Compute-Region", value: "us-east-1" },
  { name: "X-Compute-Confidence", value: "high" },
];
export const HEADER_TIERS = [
  { t: "T1", label: "Chat indicator", surface: "Inline glyph · “current compute window”" },
  { t: "T2", label: "Flexible scheduler", surface: "Deadline · route to cleanest window" },
  { t: "T3", label: "Enterprise dashboard", surface: "Per-team aggregation · procurement view" },
];
export const HEADERS_LEDE =
  "Open-source spec · reference SDK in Python, TypeScript & Go · piggybacks on existing API plumbing. Adoption is three headers.";

// ---- §10 Validation (HTTPS adoption) --------------------------------------
export const HTTPS = {
  eyebrow: "HTTPS adoption · 1994–2025",
  pullA: "End users didn't change.",
  pullB: "Providers did.",
  body:
    "A backend protocol made visible at the UI layer through a tiny glyph. No one wanted their site flagged “Not Secure” in Chrome. Within a decade the entire web shifted.",
  inflection: "2018 · Chrome flags “Not Secure”",
  source:
    "Google Transparency Report; Let's Encrypt annual reports (2017–24). Curve directional. Inflection: Chrome 68 (July 2018) flagged all non-HTTPS pages.",
};

// ---- §11 Validation (precedents) ------------------------------------------
export type Precedent = { name: string; kind: string; note: string };
export const PRECEDENTS: Precedent[] = [
  { name: "EU energy labels", kind: "Regulatory disclosure", note: "The A–G grade reshaped manufacturer behavior more than consumer behavior — appliances were re-engineered to climb the visible scale." },
  { name: "FDA nutrition labels", kind: "Mandatory disclosure", note: "Barely moved consumers; drove reformulation — trans fats, sodium, sugar — because makers competed on what was visible." },
  { name: "Cloud carbon dashboards", kind: "Already happened", note: "AWS, Azure, GCP shipped per-service carbon in 2021–22 on procurement demand. The pattern works; the AI-specific extension is what's missing." },
  { name: "OpenTelemetry", kind: "Standards-driven", note: "An open backend standard spawned a whole UI ecosystem — Datadog, Grafana, Honeycomb. None exist without the substrate." },
  { name: "Software Bill of Materials", kind: "In progress", note: "Federal procurement drives software supply-chain disclosure. Procurement as the adoption mechanism — the same shape as Greener Hours." },
  { name: "Green Software Foundation SCI", kind: "Adjacent, incomplete", note: "The Software Carbon Intensity spec (ISO/IEC 21031) exists as methodology. Productization and the AI-specific extension do not." },
];

// ---- §12 Honest trade-offs -------------------------------------------------
export type Tradeoff = { no: string; title: string; body: string };
export const TRADEOFFS: Tradeoff[] = [
  { no: "01", title: "The structural tension", body: "The biggest lever for AI's footprint is supply-side — siting, PPAs, grid decarbonization. Greener Hours operates on a derivative lever: user-facing legibility pressuring the supply side. The bet is contestable; the HTTPS analog suggests the pattern works, but the timeline is uncertain." },
  { no: "02", title: "Greenwashing capture risk", body: "Open standards get captured. Three guardrails: an open-source reference implementation, third-party verification of disclosure claims, and an anti-rebound layer that surfaces total consumption alongside efficiency. None is sufficient alone." },
  { no: "03", title: "Visibility ≠ behavior change", body: "The sharpest midterm critique, addressed structurally: Tier 1 is not a behavior tool. Behavior change happens at Tier 2 (a one-click default) and Tier 3 (institutional decisions). Tier 1's job is legibility that creates supply-side pressure." },
  { no: "04", title: "The sufficiency limit", body: "Greener Hours is a timing-and-disclosure intervention, not a sufficiency one. It does not advocate using less AI. Tier 3 makes absolute usage visible — but visibility is not advocacy." },
];

// ---- §13 Speculative KPIs --------------------------------------------------
export type Kpi = { figure: string; label: string; sub: string };
export const KPIS: Kpi[] = [
  { figure: "3 of 5", label: "Adoption · 24 mo", sub: "major AI providers implement the spec, on competitive and procurement pressure." },
  { figure: "60%", label: "Coverage", sub: "of enterprise AI API calls return standardized carbon data by default." },
  { figure: "40%", label: "Behavior · Tier 2", sub: "of deferrable batch tasks shift to cleaner grid windows." },
  { figure: "5+", label: "Institutional · Tier 3", sub: "Fortune 100 buyers name the spec in AI RFPs." },
  { figure: "1", label: "Regulatory", sub: "EU AI Act or California SB 253 references the spec — the mandate moment." },
  { figure: "∞", label: "Cultural", sub: "“What's your compute-carbon disclosure?” becomes a normal sales question." },
];
export const KPI_CAVEAT = "Directional, not predictive — what a working wedge could move, not measured outcomes.";

// ---- §14 Close ------------------------------------------------------------
export const CLOSE = {
  line: "Make the invisible legible, and the providers move.",
  meta: [
    { k: "Project", v: "Greener Hours · v0.1 final" },
    { k: "Author", v: "Rishabh Salian" },
    { k: "Course", v: "Design for a Warming World · SP26" },
  ],
};
