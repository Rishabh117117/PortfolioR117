"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { POSTER_DECK } from "@/lib/housingWorks";
import { useDraggableMarquee } from "@/lib/useDraggableMarquee";
import styles from "./WorkshopDeck.module.css";

const IMG = "/images/housing-works";

/**
 * A continuously moving poster strip (marquee). The set is duplicated so the
 * scroll loops seamlessly; it pauses on hover/focus, and under reduced motion
 * it stops moving and becomes a normal horizontal scroller. Tapping a poster
 * opens it full-size in a lightbox.
 */
export default function WorkshopDeck({ tone }: { tone?: "onPhoto" }) {
  const cards = POSTER_DECK;
  const [expanded, setExpanded] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stripRef = useDraggableMarquee<HTMLDivElement>({ sets: 2, durationSec: 52 });

  // The lightbox portals to <body> so its position:fixed / z-index:1000 escapes
  // the page's stacking contexts (.pageContent z-1, .posterStudy isolation) and
  // covers the sticky nav instead of rendering behind it.
  useEffect(() => setMounted(true), []);

  // close the lightbox on Escape; move focus to the close button on open
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
  const expandedCard = expanded !== null ? cards[expanded] : null;

  return (
    <div className={styles.deck}>
      <div className={styles.strip} ref={stripRef}>
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
                  aria-label={`Enlarge poster: ${card.stat} ${card.statText}`}
                  onClick={() => setExpanded(realIndex)}
                >
                  <span className={styles.cardFrame}>
                    <img
                      className={styles.cardImg}
                      src={`${IMG}/${card.img}`}
                      alt={`Campus poster: ${card.stat} — ${card.statText}.`}
                      loading="lazy"
                      width="825"
                      height="1100"
                      draggable={false}
                    />
                  </span>
                  <span className={styles.cardCap}>
                    <span className={`mono ${styles.cardQ}`}>{card.question}</span>
                    <span className={styles.cardStat}>
                      <span className={styles.cardStatNum}>{card.stat}</span>{" "}
                      {card.statText}
                    </span>
                    <span className={styles.cardResp}>“{card.response}”</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p
        className={`mono ${styles.hint}${
          tone === "onPhoto" ? ` ${styles.hintOnPhoto}` : ""
        }`}
      >
        Drag or swipe · tap a poster to enlarge
      </p>

      {/* lightbox — full poster detail (portaled to <body> to clear the nav) */}
      {mounted &&
        expandedCard &&
        createPortal(
          <div
            className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Poster: ${expandedCard.stat} ${expandedCard.statText}`}
          onClick={() => setExpanded(null)}
        >
          <button
            ref={closeRef}
            type="button"
            className={styles.lbClose}
            aria-label="Close poster"
            onClick={() => setExpanded(null)}
          >
            ×
          </button>
          <figure className={styles.lbFig} onClick={(e) => e.stopPropagation()}>
            <img
              className={styles.lbImg}
              src={`${IMG}/${expandedCard.img}`}
              alt={`Campus poster: ${expandedCard.stat} — ${expandedCard.statText}.`}
              width="825"
              height="1100"
            />
            <figcaption className={styles.lbCap}>
              <span className={styles.lbStat}>
                {expandedCard.stat} {expandedCard.statText}
              </span>
              <span className={`mono ${styles.lbQ}`}>{expandedCard.question}</span>
            </figcaption>
          </figure>
        </div>,
        document.body,
      )}
    </div>
  );
}
