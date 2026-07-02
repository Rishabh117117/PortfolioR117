"use client";

import Link from "next/link";
import Image from "next/image";
import { ARCHIVE_PROJECTS } from "@/lib/archive";
import styles from "./EarlierWorkDeck.module.css";

/**
 * Earlier-work projects as a continuously floating card strip (marquee) — the
 * Housing Works poster-deck mechanic reused for the archive. The set is
 * duplicated for a seamless -50% loop; it pauses on hover/focus and degrades to
 * a manual horizontal scroller under reduced motion. Each card links to its
 * project (the duplicated set is hidden from AT and the tab order).
 */
export default function EarlierWorkDeck() {
  const cards = ARCHIVE_PROJECTS;
  const loop = [...cards, ...cards];
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
                  style={{ "--accent": p.accent } as React.CSSProperties}
                >
                  <span className={styles.frame}>
                    <Image
                      className={styles.img}
                      src={p.thumb}
                      alt={`${p.name} — cover slide`}
                      width={900}
                      height={506}
                      sizes="300px"
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
