// Shared project metadata (§8 accent map). Single source of truth for the
// home grid and the work index. Demo status tags are placeholders pending D-03.

export type Project = {
  name: string;
  slug: string;
  year: string;
  discipline: string;
  accent: string;
  status?: string;
  featured?: boolean;
};

export const FLAGSHIPS: Project[] = [
  {
    name: "Follow",
    slug: "follow",
    year: "2025–26",
    discipline: "Systems · AI",
    accent: "#1C39BB",
    status: "WORKING",
    featured: true,
  },
  {
    name: "Greener Hours",
    slug: "greener-hours",
    year: "2025–26",
    discipline: "Climate · AI",
    accent: "#1C3B36",
    status: "SIMULATED",
  },
  {
    name: "Healthy Materials",
    slug: "healthy-materials",
    year: "2025–26",
    discipline: "Materials · Research",
    accent: "#5C7A3A",
    // §2 — the page badge; the card on /work + the home grid must match it.
    status: "GRADUATE RESEARCH · CONCEPT",
  },
  {
    name: "Housing Works",
    slug: "housing-works",
    year: "2025–26",
    discipline: "Service · AI",
    accent: "#C0263B",
    status: "SIMULATED",
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
