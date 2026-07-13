/* =========================================================================
   Healthy Materials — page data (single source of truth for the bespoke
   /work/healthy-materials route). Photos live in
   /public/images/healthy-materials/ (see CREDITS.md for provenance/licensing).

   Honesty: descriptors stay qualitative — no invented or measured numbers.
   ========================================================================= */

/* ---- Field-visit carousel (the Housing-Works moving-card pattern) ---- */
export type FieldCard = {
  id: string;
  img: string; // file in /images/healthy-materials/
  caption: string; // the headline on the card
  detail: string; // a pulled detail / quote
};

export const FIELD_DECK: FieldCard[] = [
  {
    id: "wall",
    img: "library-wall.jpg",
    caption: "The library wall",
    detail: "“…for a healthier material library.”",
  },
  {
    id: "taxonomy",
    img: "taxonomy-drawers.jpg",
    caption: "A hardware store for health",
    detail: "Wall Assemblies · Flooring · Insulation · Acoustic.",
  },
  {
    id: "categories",
    img: "categories.jpg",
    caption: "Every category, openable",
    detail: "Flooring · Dimensional Surfaces · Wall Coverings · Paints · Special Collections.",
  },
  {
    id: "cladding",
    img: "cladding-structural.jpg",
    caption: "From cladding to ceilings",
    detail: "Exterior & Cladding · Structural · Wall Assemblies.",
  },
  {
    id: "bloom",
    img: "bloom-foam-card.jpg",
    caption: "A sample you can hold",
    detail: "“Bloom Foam — microalgae.” Catalogued, barcoded, non-circulating.",
  },
  {
    id: "overhead",
    img: "samples-overhead.jpg",
    caption: "Hundreds of catalogued samples",
    detail: "Every jar tagged, classified, traceable.",
  },
  {
    id: "biofabricate",
    img: "biofabricate-poster.jpg",
    caption: "The vocabulary of biomaterials",
    detail: "Biobased · Biosynthetic · Biofabricated · Bioassembled.",
  },
  {
    id: "plastics",
    img: "plastics-poster.jpg",
    caption: "Your choices matter",
    detail: "Plastics, ranked from avoid to better.",
  },
  {
    id: "wheel",
    img: "sustainability-wheel.jpg",
    caption: "What “healthy” actually measures",
    detail: "Waste · Water · Circularity · Carbon · Health · Social.",
  },
];

export const FIELD_FOOTNOTE =
  "Field visit · Donghia Healthy Materials Lab, Parsons School of Design · Oct 2025.";

/* ---- Meet the materials (compact parallax cards) ---- */
export type MaterialCard = {
  id: string;
  img: string;
  name: string;
  line: string; // keep SHORT — one phrase
  depth: number; // px of scroll-parallax travel (alternate sign for a stagger)
};

export const MATERIAL_GRID: MaterialCard[] = [
  { id: "mycelium", img: "material-mycelium.jpg", name: "Mycelium composite", line: "Grown, not extracted.", depth: -30 },
  { id: "hempcrete", img: "material-hempcrete.jpg", name: "Hempcrete", line: "Carbon-storing, breathable.", depth: 18 },
  { id: "straw", img: "material-straw.jpg", name: "Straw panel", line: "Ag by-product → insulation.", depth: -14 },
];

/* ---- Project timeline (data-driven; Follow's deck-style chart) ----
   `at` ∈ [0,1] places a node along the axis. Marker → dot style + meaning:
     field      solid ink dot     · field research
     expert     solid sage dot    · expert interview
     synthesis  hollow dot        · synthesis / mapping
     milestone  solid clay dot    · a project milestone
   DATES ARE PLACEHOLDERS (season labels) until the real dates land — edit the
   `sub` lines + TL_TICKS here; the chart re-spaces itself, no SVG math. */
export type TLMarker = "field" | "expert" | "synthesis" | "milestone";
export type TLEntry = {
  at: number;
  side: "above" | "below";
  marker: TLMarker;
  title: string;
  sub: string;
};
export type TLTick = { at: number; label: string };

// Capstone research ran ONE semester — Fall 2025 (field visit Oct 2025).
export const TL_TICKS: TLTick[] = [
  { at: 0, label: "SEP ’25" },
  { at: 0.34, label: "OCT ’25" },
  { at: 0.67, label: "NOV ’25" },
  { at: 1, label: "DEC ’25" },
];

export const TL_ENTRIES: TLEntry[] = [
  { at: 0.0, side: "below", marker: "field", title: "Literature scan", sub: "innovation · process · policy" },
  { at: 0.125, side: "above", marker: "field", title: "HML library access", sub: "Parsons · the field visit" },
  { at: 0.25, side: "below", marker: "expert", title: "Alison Mears", sub: "Director, HML" },
  { at: 0.375, side: "above", marker: "expert", title: "Omir Majeed", sub: "project manager, CBRE" },
  { at: 0.5, side: "below", marker: "expert", title: "Ricardo Ortiz", sub: "regenerative architect" },
  { at: 0.625, side: "above", marker: "synthesis", title: "Affinity mapping", sub: "fragments → themes" },
  { at: 0.75, side: "below", marker: "synthesis", title: "Ecosystem mapping", sub: "actors + decision flow" },
  { at: 0.875, side: "above", marker: "milestone", title: "Leverage points", sub: "where adoption stalls" },
  { at: 1.0, side: "below", marker: "milestone", title: "3 interventions", sub: "Packages first" },
];

export const TL_FOOT =
  "What this is not: a longitudinal field study. One field visit and three practitioner interviews point to where adoption stalls; the contractor and manufacturer interviews are still ahead.";
