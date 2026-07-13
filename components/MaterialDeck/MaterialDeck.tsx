"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FIELD_DECK } from "@/lib/healthyMaterials";
import { useDraggableMarquee } from "@/lib/useDraggableMarquee";
import { useModalA11y } from "@/lib/useModalA11y";
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
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const stripRef = useDraggableMarquee<HTMLDivElement>({ sets: 2, durationSec: 56 });

  // The lightbox portals to <body> so its position:fixed / z-index:1000 escapes
  // the page's .pageContent (z-index:1) stacking context and covers the sticky
  // nav instead of rendering behind it — mirrors WorkshopDeck.
  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setExpanded(null), []);
  useModalA11y(expanded !== null, close, dialogRef);

  const loop = [...cards, ...cards]; // 2 sets → seamless -50% marquee
  const ex = expanded !== null ? cards[expanded] : null;

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
                  aria-label={`Enlarge photo: ${card.caption}`}
                  onClick={() => setExpanded(realIndex)}
                >
                  <span className={styles.cardFrame}>
                    <img
                      className={styles.cardImg}
                      src={`${IMG}/${card.img}`}
                      alt={`Field visit: ${card.caption}.`}
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

      <p className={`mono ${styles.hint}`}>Drag or swipe · tap a photo to enlarge</p>

      {/* lightbox — full photo detail (portaled to <body> to clear the nav) */}
      {mounted &&
        ex &&
        createPortal(
          <div
            ref={dialogRef}
            className={styles.lightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo: ${ex.caption}`}
            onClick={close}
          >
            <button
              type="button"
              className={styles.lbClose}
              aria-label="Close photo"
              onClick={close}
            >
              ×
            </button>
            <figure className={styles.lbFig} onClick={(e) => e.stopPropagation()}>
              <img className={styles.lbImg} src={`${IMG}/${ex.img}`} alt={`Field visit: ${ex.caption}.`} />
              <figcaption className={styles.lbCap}>
                <span className={styles.lbTitle}>{ex.caption}</span>
                <span className={`mono ${styles.lbDetail}`}>{ex.detail}</span>
              </figcaption>
            </figure>
          </div>,
          document.body,
        )}
    </div>
  );
}
