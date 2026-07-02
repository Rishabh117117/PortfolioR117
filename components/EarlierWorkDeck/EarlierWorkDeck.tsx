"use client";

import Link from "next/link";
import Image from "next/image";
import { ARCHIVE_PROJECTS } from "@/lib/archive";
import styles from "./EarlierWorkDeck.module.css";

/**
 * Earlier-work projects as a continuously floating card strip (marquee) — the
 * Housing Works poster-deck mechanic reused for the archive. Full-bleed and
 * unmasked: cards travel the whole viewport edge to edge instead of fading at
 * the container. Cards are portrait (3/4 crop of the landscape cover), so each
 * cover sets its own horizontal focus below. The set is tripled for a seamless
 * -1/3 loop that still covers ultrawide viewports; it pauses on hover/focus and
 * degrades to a manual horizontal scroller under reduced motion. Each card
 * links to its project (the duplicated sets are hidden from AT and tab order).
 */

// Horizontal focus (object-position X) of each landscape cover inside the
// portrait crop — the covers compose differently (title left / artwork right /
// centered), so each card centres its own subject.
const CROP: Record<string, string> = {
  vsg: "15%",
  obc: "80%",
  best: "42%",
  "music-rooms": "60%",
  yaap: "50%",
  "stun-gun": "78%",
  "lotus-heater": "62%",
};

export default function EarlierWorkDeck() {
  const cards = ARCHIVE_PROJECTS;
  const loop = [...cards, ...cards, ...cards];
  return (
    <div className={styles.deck}>
      <div className={styles.strip}>
        <ul className={styles.track}>
          {loop.map((p, i) => {
            const isDup = i >= cards.length;
            return (
              <li
                className={`${styles.cell}${isDup ? ` ${styles.dup}` : ""}`}
                key={`${p.slug}-${i}`}
                aria-hidden={isDup}
              >
                <Link
                  href={`/archive/${p.slug}`}
                  className={styles.card}
                  tabIndex={isDup ? -1 : undefined}
                  style={
                    {
                      "--accent": p.accent,
                      "--crop": CROP[p.slug] ?? "50%",
                    } as React.CSSProperties
                  }
                >
                  <span className={styles.frame}>
                    {/* the full-res cover slide (1600×900), not the 900px
                        thumb — the portrait cover-crop renders the image at
                        ~580 CSS px wide, past what the thumb resolves at
                        retina densities */}
                    <Image
                      className={styles.img}
                      src={
                        p.slides.find((s) => s.role === "cover")?.src ?? p.thumb
                      }
                      alt={`${p.name} — cover slide`}
                      width={1600}
                      height={900}
                      sizes="600px"
                    />
                    <span className={`mono ${styles.count}`}>
                      {p.slideCount} slides
                    </span>
                  </span>
                  <span className={styles.cap}>
                    <span className={styles.name}>{p.name}</span>
                    <span className={`mono ${styles.meta}`}>
                      {p.year} · {p.discipline}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <p className={`mono ${styles.hint}`}>Hover to pause · open any project</p>
    </div>
  );
}
