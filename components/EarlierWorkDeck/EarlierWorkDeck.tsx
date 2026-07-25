"use client";

import Link from "next/link";
import Image from "next/image";
import { ARCHIVE_PROJECTS } from "@/lib/archive";
import { EARLY_ART_CARD } from "@/lib/earlyArt";
import { useDraggableMarquee } from "@/lib/useDraggableMarquee";
import styles from "./EarlierWorkDeck.module.css";

/**
 * Earlier-work projects as a continuously floating card strip (marquee) — the
 * Housing Works poster-deck mechanic reused for the archive. Full-bleed and
 * unmasked: cards travel the whole viewport edge to edge instead of fading at
 * the container. Cards are portrait (3/4 crop of each cover), so every cover
 * sets its own focus below. The set is tripled for a seamless -1/3 loop that
 * still covers ultrawide viewports; it pauses on hover/focus and degrades to a
 * manual horizontal scroller under reduced motion. Each card links to its
 * project (the duplicated sets are hidden from AT and tab order). The two
 * early-art cards ride at the end of the set — the pre-design work, linking
 * into /archive/early-art's sections.
 */

// Focus (object-position) of each cover inside the portrait crop — the covers
// compose differently (title left / artwork right / centered), so each card
// centres its own subject. The landscape archive covers move on X; the
// portrait early-art sheets move on Y (their artwork sits high).
const CROP: Record<string, string> = {
  vsg: "20% 50%", // full logo incl. the swoosh tip + title + red team panel
  obc: "95% 50%", // the framed logo box, clear of the title's tail
  best: "22% 50%", // title block + full phone + palette row, no clipped paragraph
  "music-rooms": "62% 50%", // "Music Rooms" title centred, clear of the phone
  yaap: "50% 50%", // the chili IG card framed whole
  "lotus-heater": "62% 50%", // both heaters + the companion phone
};

type DeckCard = {
  key: string;
  href: string;
  name: string;
  meta: string;
  chip: string;
  accent: string;
  src: string;
  alt: string;
  w: number;
  h: number;
  crop: string;
};

export default function EarlierWorkDeck() {
  // Stun Gun stays on /archive but is kept off the homepage strip.
  const cards: DeckCard[] = ARCHIVE_PROJECTS.filter(
    (p) => p.slug !== "stun-gun"
  ).map((p) => ({
    key: p.slug,
    href: `/archive/${p.slug}`,
    name: p.name,
    meta: `${p.year} · ${p.discipline}`,
    chip: `${p.slideCount} slides`,
    accent: p.accent,
    // the full-res cover slide (1600×900), not the 900px thumb — the portrait
    // cover-crop renders the image at ~580 CSS px wide, past what the thumb
    // resolves at retina densities
    src: p.slides.find((s) => s.role === "cover")?.src ?? p.thumb,
    alt: `${p.name} cover slide`,
    w: 1600,
    h: 900,
    crop: CROP[p.slug] ?? "50% 50%",
  }));

  cards.push(
    {
      key: "early-boards",
      href: "/archive/early-art#boards",
      name: "Analogies boards",
      meta: `${EARLY_ART_CARD.year} · ${EARLY_ART_CARD.discipline}`,
      chip: "7 boards",
      accent: EARLY_ART_CARD.accent,
      src: "/images/archive/early-art/early-art-board-02.jpg",
      alt: "Analogies board: mixed-media robot portrait",
      w: 720,
      h: 1280,
      crop: "50% 30%",
    },
    {
      key: "early-charcoal",
      href: "/archive/early-art#charcoal",
      name: "Charcoal works",
      meta: `${EARLY_ART_CARD.year} · ${EARLY_ART_CARD.discipline}`,
      chip: "8 studies",
      accent: EARLY_ART_CARD.accent,
      src: "/images/archive/early-art/early-art-charcoal-05.jpg",
      alt: "Charcoal study of two children",
      w: 720,
      h: 1280,
      crop: "50% 45%",
    }
  );

  const loop = [...cards, ...cards, ...cards];
  // 8 cards per set (was 6) — duration scaled with the pitch so the drift
  // keeps the original px/s pace
  const stripRef = useDraggableMarquee<HTMLDivElement>({ sets: 3, durationSec: 80 });
  return (
    <div className={styles.deck}>
      <div className={styles.strip} ref={stripRef}>
        <ul className={styles.track}>
          {loop.map((c, i) => {
            const isDup = i >= cards.length;
            return (
              <li
                className={`${styles.cell}${isDup ? ` ${styles.dup}` : ""}`}
                key={`${c.key}-${i}`}
                aria-hidden={isDup}
              >
                <Link
                  href={c.href}
                  className={styles.card}
                  tabIndex={isDup ? -1 : undefined}
                  style={
                    {
                      "--accent": c.accent,
                      "--crop": c.crop,
                    } as React.CSSProperties
                  }
                >
                  <span className={styles.frame}>
                    <Image
                      className={styles.img}
                      src={c.src}
                      alt={c.alt}
                      width={c.w}
                      height={c.h}
                      sizes="600px"
                    />
                    <span className={`mono ${styles.count}`}>{c.chip}</span>
                  </span>
                  <span className={styles.cap}>
                    <span className={styles.name}>{c.name}</span>
                    <span className={`mono ${styles.meta}`}>{c.meta}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <p className={`mono ${styles.hint}`}>Drag or swipe · open any project</p>
    </div>
  );
}
