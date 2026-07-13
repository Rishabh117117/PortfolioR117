"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import DriftGroup from "@/components/DriftGroup/DriftGroup";
import { useModalA11y } from "@/lib/useModalA11y";
import styles from "./about.module.css";

/**
 * ABOUT photo cluster + click-to-zoom lightbox. Client component (the tiles are
 * buttons; the enlarged view is portaled to <body> so the fixed overlay escapes
 * the `.pageContent { z-index:1 }` stacking context — the recurring lightbox
 * gotcha). Tiles load the small assets; the -lg zoom source loads on click.
 */
type Shot = {
  src: string; // cluster tile
  full: string; // enlarged (zoom) view — loaded on click
  alt: string;
  caption: string;
  w: number;
  h: number;
};

const MAIN: Shot = {
  src: "/images/about/grad-nyc.jpg",
  full: "/images/about/grad-nyc-lg.jpg",
  alt: "Rishabh at his New School commencement on Fifth Avenue, the Empire State Building up the avenue behind him.",
  caption: "The New School · NYC",
  w: 900,
  h: 1200,
};
const STUDIO: Shot = {
  src: "/images/about/studio-nyc.jpg",
  full: "/images/about/studio-nyc-lg.jpg",
  alt: "Rishabh with his Parsons studio cohort at a crit installation strung with red thread.",
  caption: "Studio · NYC",
  w: 760,
  h: 1013,
};
const MUMBAI: Shot = {
  src: "/images/about/mumbai.jpg",
  full: "/images/about/mumbai-lg.jpg",
  alt: "Rishabh with friends and colleagues in Mumbai, before the move to New York.",
  caption: "Mumbai",
  w: 760,
  h: 1013,
};

function ZoomGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="7" />
      <line x1="21" y1="21" x2="16.2" y2="16.2" />
      <line x1="10.5" y1="7.5" x2="10.5" y2="13.5" />
      <line x1="7.5" y1="10.5" x2="13.5" y2="10.5" />
    </svg>
  );
}

export default function AboutPhotos() {
  const [active, setActive] = useState<Shot | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const open = useCallback((shot: Shot, e: MouseEvent<HTMLButtonElement>) => {
    openerRef.current = e.currentTarget;
    setActive(shot);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    openerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close]);

  // add just the Tab focus-trap; the effect above already locks scroll, handles
  // Escape, and restores focus to the opener.
  useModalA11y(active !== null, close, dialogRef, {
    lockScroll: false,
    handleEscape: false,
    restoreFocus: false,
    autoFocus: false,
  });

  return (
    <>
      <DriftGroup className={styles.cluster}>
        <div className={styles.mainSlot} data-depth="7">
          <figure className={`${styles.frame} ${styles.frameMain}`}>
            <button type="button" className={styles.zoomBtn} onClick={(e) => open(MAIN, e)} aria-label={`Enlarge photo: ${MAIN.caption}`}>
              <img className={styles.photo} src={MAIN.src} alt={MAIN.alt} width={MAIN.w} height={MAIN.h} loading="eager" decoding="async" />
              <span className={styles.zoomHint} aria-hidden="true">
                <ZoomGlyph />
              </span>
            </button>
            <figcaption className={`${styles.frameLabel} ${styles.frameLabelMain}`}>{MAIN.caption}</figcaption>
          </figure>
        </div>

        <div className={`${styles.smSlot} ${styles.smA}`} data-depth="-16">
          <figure className={`${styles.frame} ${styles.frameSm} ${styles.rotA}`}>
            <button type="button" className={styles.zoomBtn} onClick={(e) => open(STUDIO, e)} aria-label={`Enlarge photo: ${STUDIO.caption}`}>
              <img className={styles.photo} src={STUDIO.src} alt={STUDIO.alt} width={STUDIO.w} height={STUDIO.h} loading="lazy" decoding="async" />
              <span className={styles.zoomHint} aria-hidden="true">
                <ZoomGlyph />
              </span>
            </button>
            <figcaption className={styles.frameLabel}>{STUDIO.caption}</figcaption>
          </figure>
        </div>

        <div className={`${styles.smSlot} ${styles.smB}`} data-depth="12">
          <figure className={`${styles.frame} ${styles.frameSm} ${styles.rotB}`}>
            <button type="button" className={styles.zoomBtn} onClick={(e) => open(MUMBAI, e)} aria-label={`Enlarge photo: ${MUMBAI.caption}`}>
              <img className={styles.photo} src={MUMBAI.src} alt={MUMBAI.alt} width={MUMBAI.w} height={MUMBAI.h} loading="lazy" decoding="async" />
              <span className={styles.zoomHint} aria-hidden="true">
                <ZoomGlyph />
              </span>
            </button>
            <figcaption className={styles.frameLabel}>Mumbai</figcaption>
          </figure>
        </div>
      </DriftGroup>

      {active !== null &&
        createPortal(
          <div ref={dialogRef} className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`${active.caption}, enlarged photo`} onClick={close}>
            <button ref={closeRef} type="button" className={styles.lightboxClose} onClick={close} aria-label="Close enlarged photo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
            <figure className={styles.lightboxFig} onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.lightboxImg} src={active.full} alt={active.alt} />
              <figcaption className={styles.lightboxCap}>{active.caption}</figcaption>
            </figure>
          </div>,
          document.body,
        )}
    </>
  );
}
