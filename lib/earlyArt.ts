import type { ArchiveProject } from "@/lib/archive";

/* /archive/early-art — CIE A Level fine arts (pre-design work).
   Hand-maintained (NOT part of the auto-generated lib/archive.ts deck export).
   Images are Rishabh's real boards/studies (2026-07-22 batch, WhatsApp-res
   sources; higher-res rescans can replace them anytime via
   `node _asset-tools/early_art_prep.mjs` — it keeps these exact paths).
   STUB CAPTIONS: titles/medium/year are placeholders except board 01
   (named by Rishabh) — his caption list replaces them wholesale.
   Board order = his contact-sheet sequence with robot-among-leaves promoted
   to 01 per spec; charcoal order is arbitrary until captions land. */

export type EarlyArtPiece = {
  n: number;
  src: string;
  w: number;
  h: number;
  title: string;
  medium: string;
  year: string;
};

const B = "/images/archive/early-art";

export const EARLY_ART_BOARDS: EarlyArtPiece[] = [
  { n: 1, src: `${B}/early-art-board-01.jpg`, w: 720, h: 1280, title: "Robot among leaves", medium: "Mixed media on board", year: "2016" },
  { n: 2, src: `${B}/early-art-board-02.jpg`, w: 720, h: 1280, title: "Analogies board 02", medium: "Mixed media on board", year: "2016" },
  { n: 3, src: `${B}/early-art-board-03.jpg`, w: 900, h: 1600, title: "Analogies board 03", medium: "Mixed media on board", year: "2016" },
  { n: 4, src: `${B}/early-art-board-04.jpg`, w: 720, h: 1280, title: "Analogies board 04", medium: "Mixed media on board", year: "2016" },
  { n: 5, src: `${B}/early-art-board-05.jpg`, w: 900, h: 1600, title: "Analogies board 05", medium: "Mixed media on board", year: "2016" },
  { n: 6, src: `${B}/early-art-board-06.jpg`, w: 720, h: 1280, title: "Analogies board 06", medium: "Mixed media on board", year: "2016" },
  { n: 7, src: `${B}/early-art-board-07.jpg`, w: 720, h: 1280, title: "Analogies board 07", medium: "Mixed media on board", year: "2016" },
];

export const EARLY_ART_CHARCOAL: EarlyArtPiece[] = [
  { n: 1, src: `${B}/early-art-charcoal-01.jpg`, w: 720, h: 1280, title: "Charcoal study 01", medium: "Charcoal on paper", year: "2016" },
  { n: 2, src: `${B}/early-art-charcoal-02.jpg`, w: 720, h: 1280, title: "Charcoal study 02", medium: "Charcoal on paper", year: "2016" },
  { n: 3, src: `${B}/early-art-charcoal-03.jpg`, w: 720, h: 1280, title: "Charcoal study 03", medium: "Charcoal on paper", year: "2016" },
  { n: 4, src: `${B}/early-art-charcoal-04.jpg`, w: 720, h: 1280, title: "Charcoal study 04", medium: "Charcoal on paper", year: "2016" },
  { n: 5, src: `${B}/early-art-charcoal-05.jpg`, w: 720, h: 1280, title: "Charcoal study 05", medium: "Charcoal on paper", year: "2016" },
  { n: 6, src: `${B}/early-art-charcoal-06.jpg`, w: 720, h: 1280, title: "Charcoal study 06", medium: "Charcoal on paper", year: "2016" },
  { n: 7, src: `${B}/early-art-charcoal-07.jpg`, w: 720, h: 1280, title: "Charcoal study 07", medium: "Charcoal on paper", year: "2016" },
  { n: 8, src: `${B}/early-art-charcoal-08.jpg`, w: 720, h: 1280, title: "Charcoal study 08", medium: "Charcoal on paper", year: "2016" },
  { n: 9, src: `${B}/early-art-charcoal-09.jpg`, w: 720, h: 1280, title: "Charcoal study 09", medium: "Charcoal on paper", year: "2016" },
];

/* Card for the /archive index grid only (shaped like an ArchiveProject so it
   drops into ArchiveCard; slides stay empty — /archive/early-art is its own
   page, not the slide-deck reader). Placed last on the index: earliest work. */
export const EARLY_ART_CARD: ArchiveProject = {
  slug: "early-art",
  name: "Early Art",
  year: "2016",
  discipline: "Fine arts",
  accent: "#46536A",
  oneLine:
    "CIE A Level fine arts: Cubism, Surrealism, and the Analogies series, alongside charcoal studies in portraiture, anatomy, and motion.",
  thumb: "/images/archive/early-art/thumb.jpg",
  slideCount: 16,
  slides: [],
};
