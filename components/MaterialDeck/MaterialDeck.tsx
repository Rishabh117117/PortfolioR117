"use client";

import { useEffect, useRef, useState } from "react";
import { FIELD_DECK } from "@/lib/healthyMaterials";
import styles from "./MaterialDeck.module.css";

const IMG = "/images/healthy-materials";

/**
 * Field-visit photo strip — the Housing-Works WorkshopDeck pattern (copy-renamed
 * for this page; the live Housing Works component is untouched). A continuously
 * moving marquee: the set is duplicated for a seamless loop, it pauses on
 * hover/focus, degrades to a manual horizontal scroller under reduced motion, and
 * tapping a card opens the photo full-size in a lightbox.
 */
export default function MaterialDeck() {
  const cards = FIELD_DECK;
  const [expanded, setExpanded] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (expanded === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  const loop = [...cards, ...cards]; // 2 sets → seamless -50% marquee
  const ex = expanded !== null ? cards[expanded] : null;

  return (
    <div className={styles.deck}>
      <div className={styles.strip}>
        <ul className={styles.track}>
          {loop.map((card, i) => {
            const realIndex = i % cards.length;
            const isDup = i >= cards.length;
            return (
              <li className={styles.cell} key={`${card.id}-${i}`} aria-hidden={isDup}>
                <button
                  type="button"
                  className={styles.card}
                  tabIndex={isDup ? -1 : 0}
                  aria-label={`Enlarge photo: ${card.caption}`}
                  onClick={() => setExpanded(realIndex)}
                >
                  <span className={styles.cardFrame}>
                    <img
                      className={styles.cardImg}
                      src={`${IMG}/${card.img}`}
                      alt={`Field visit — ${card.caption}.`}
                      loading="lazy"
                      width="1200"
                      height="1600"
                      draggable={false}
                    />
                  </span>
                  <span className={styles.cardCap}>
                    <span className={styles.cardTitle}>{card.caption}</span>
                    <span className={`mono ${styles.cardDetail}`}>{card.detail}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className={`mono ${styles.hint}`}>Hover to pause · tap a photo to enlarge</p>

      {/* lightbox — full photo detail */}
      {ex && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${ex.caption}`}
          onClick={() => setExpanded(null)}
        >
          <button
            ref={closeRef}
            type="button"
            className={styles.lbClose}
            aria-label="Close photo"
            onClick={() => setExpanded(null)}
          >
            ×
          </button>
          <figure className={styles.lbFig} onClick={(e) => e.stopPropagation()}>
            <img className={styles.lbImg} src={`${IMG}/${ex.img}`} alt={`Field visit — ${ex.caption}.`} />
            <figcaption className={styles.lbCap}>
              <span className={styles.lbTitle}>{ex.caption}</span>
              <span className={`mono ${styles.lbDetail}`}>{ex.detail}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
