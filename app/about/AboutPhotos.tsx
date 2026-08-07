"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import DriftGroup from "@/components/DriftGroup/DriftGroup";
import { useModalA11y } from "@/lib/useModalA11y";
import styles from "./about.module.css";

/**
 * ABOUT portrait + click-to-zoom lightbox. Client component (the tile is a
 * button; the enlarged view is portaled to <body> so the fixed overlay escapes
 * the `.pageContent { z-index:1 }` stacking context — the recurring lightbox
 * gotcha). The tile loads the small asset; the -lg zoom source loads on click.
 * One frame since 2026-08-03: the Studio · NYC and Mumbai group shots were
 * removed at Rishabh's word, leaving just his own portrait — the Chicago
 * skyline shot he sent on 2026-08-06, replacing the East River one.
 */
type Shot = {
  src: string; // the frame's tile
  full: string; // enlarged (zoom) view — loaded on click
  alt: string;
  caption: string;
  w: number;
  h: number;
};

const MAIN: Shot = {
  src: "/images/about/portrait.jpg",
  full: "/images/about/portrait-lg.jpg",
  alt: "Rishabh in a dark jacket high above the Chicago skyline, downtown towers and Lake Michigan behind him.",
  caption: "Chicago",
  w: 682,
  h: 910,
};

/* The tile renders through next/image with `fill`: the crop is the FRAME's, not
   the file's (.frameMain is 4/5, cover-cropped from the 3:4 source). `.cluster`
   caps at 380px wide, which bounds the slot and keeps these `sizes` honest. */
const MAIN_SIZES = "(max-width: 380px) 100vw, 380px";

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
              <Image className={styles.photo} src={MAIN.src} alt={MAIN.alt} fill sizes={MAIN_SIZES} priority />
              <span className={styles.zoomHint} aria-hidden="true">
                <ZoomGlyph />
              </span>
            </button>
            <figcaption className={`${styles.frameLabel} ${styles.frameLabelMain}`}>{MAIN.caption}</figcaption>
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
