"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BRIDGES_STEPS } from "@/lib/housingWorks";
import { useModalA11y } from "@/lib/useModalA11y";
import styles from "./BridgesGallery.module.css";

const IMG = "/images/housing-works";

/**
 * The Bridges & Barriers session as a grid of vertical-rectangle cards — all
 * six steps visible at once (no slider). Each card shows the full chart/photo;
 * clicking one opens the same zoomed lightbox used by the poster deck.
 */
export default function BridgesGallery() {
  const steps = BRIDGES_STEPS;
  const [expanded, setExpanded] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // portal the fixed z-1000 lightbox to <body> so it escapes the page's
  // .pageContent (z-index:1) stacking context and covers the sticky nav.
  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setExpanded(null), []);
  useModalA11y(expanded !== null, close, dialogRef);

  const ex = expanded !== null ? steps[expanded] : null;

  return (
    <div className={styles.wrap}>
      <ol className={styles.grid}>
        {steps.map((s, i) => (
          <li className={styles.cell} key={s.img}>
            <button
              type="button"
              className={styles.card}
              aria-label={`Enlarge step ${i + 1}: ${s.title}`}
              onClick={() => setExpanded(i)}
            >
              <span className={styles.frame}>
                <img
                  className={`${styles.img} ${s.fit === "contain" ? styles.contain : ""}`}
                  src={`${IMG}/${s.img}`}
                  alt={s.alt}
                  loading="lazy"
                  width="1200"
                  height="900"
                />
                <span className={`mono ${styles.num}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <span className={styles.title}>{s.title}</span>
              <span className={styles.text}>{s.text}</span>
            </button>
          </li>
        ))}
      </ol>

      {mounted &&
        ex &&
        createPortal(
          <div
            ref={dialogRef}
            className={styles.lightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`${ex.title}: ${ex.alt}`}
            onClick={close}
          >
            <button
              type="button"
              className={styles.lbClose}
              aria-label="Close image"
              onClick={close}
            >
              ×
            </button>
            <figure className={styles.lbFig} onClick={(e) => e.stopPropagation()}>
              <img className={styles.lbImg} src={`${IMG}/${ex.img}`} alt={ex.alt} />
              <figcaption className={styles.lbCap}>
                <span className={styles.lbTitle}>{ex.title}</span>
                <span className={`mono ${styles.lbText}`}>{ex.text}</span>
              </figcaption>
            </figure>
          </div>,
          document.body,
        )}
    </div>
  );
}
