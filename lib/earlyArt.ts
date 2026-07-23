import type { ArchiveProject } from "@/lib/archive";

/* /archive/early-art — CIE A Level fine arts (pre-design work).
   Hand-maintained (NOT part of the auto-generated lib/archive.ts deck export).
   Images land via `node _asset-tools/early_art_prep.mjs` from Rishabh's
   originals; until then the paths hold generated flat-tone stand-ins.
   STUB CAPTIONS: titles/medium/year below are placeholders except board 01
   (named by Rishabh) — his caption list replaces them wholesale. */

export type EarlyArtPiece = {
  n: number;
  src: string;
  w: number;
  h: number;
  title: string;
  medium: string;
  year: string;
};

const BOARD_TITLES: Record<number, string> = {
  1: "Robot among leaves",
};

export const EARLY_ART_BOARDS: EarlyArtPiece[] = Array.from(
  { length: 7 },
  (_, i) => {
    const n = i + 1;
    const nn = String(n).padStart(2, "0");
    return {
      n,
      src: `/images/archive/early-art/early-art-board-${nn}.jpg`,
      w: 1600,
      h: 1200,
      title: BOARD_TITLES[n] ?? `Analogies board ${nn}`,
      medium: "Mixed media on board",
      year: "2016",
    };
  },
);

export const EARLY_ART_CHARCOAL: EarlyArtPiece[] = Array.from(
  { length: 9 },
  (_, i) => {
    const n = i + 1;
    const nn = String(n).padStart(2, "0");
    return {
      n,
      src: `/images/archive/early-art/early-art-charcoal-${nn}.jpg`,
      w: 1200,
      h: 1600,
      title: `Charcoal study ${nn}`,
      medium: "Charcoal on paper",
      year: "2016",
    };
  },
);

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
