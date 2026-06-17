"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import styles from "./StunGunStage.module.css";

/**
 * One render angle in the rotation sequence. The PNGs must be registered to a
 * common bounding box (same canvas, model centred) or the crossfade will jump.
 */
export type StageFrame = {
  /** transparent PNG of this angle, floating on the paper shell */
  src: string;
  /** descriptive alt text for the angle */
  alt: string;
  /** Plex Mono caption shown under the frame, e.g. "02 · INTERFACE" */
  caption: string;
  /** stable id for the angle (keys + debugging) */
  angleId: string;
};

export type StunGunStageProps = {
  /** ordered angle frames; index 0 shows at scroll start, last at scroll end */
  frames: StageFrame[];
  /**
   * The scroll track to map progress against — the tall element the render
   * pins within (the page's pin section). Progress runs 0→1 as the track
   * travels through the viewport. If omitted, the stage measures its own outer
   * element (works when a grid stretches it to the content's full height).
   */
  trackRef?: React.RefObject<HTMLElement | null>;
  /** desktop-only ambient bob on the render (off by default) */
  idleBob?: boolean;
  /** extra class on the sticky frame (e.g. to tune height per project) */
  className?: string;
};

/**
 * StunGunStage — the signature scroll component.
 *
 * A single product render floats in a `position: sticky` frame and eases
 * between a handful of real render angles as the visitor scrolls the
 * surrounding track. Angles are keyframe poses crossfaded (opacity) between
 * section thresholds — NOT a real-time 3D model and NOT a 60fps flipbook.
 *
 * Generic by design: it takes an ordered `frames` array and nothing
 * project-specific, so the Lotus Room Heater reuses it unchanged.
 *
 * Progress is read from this component's own outer element, which a CSS grid
 * stretches to the full height of the scrolling content column beside it — so
 * `0→1` maps to "content column scrolled from top to bottom".
 *
 * Degradation (honest, like the rest of the site):
 *  - No JS / pre-hydration  → a static, readable gallery of every angle.
 *  - prefers-reduced-motion → the same static gallery, zero motion.
 *  - JS + motion ok         → the pinned crossfade engine takes over.
 */
export default function StunGunStage({
  frames,
  trackRef,
  idleBob = false,
  className,
}: StunGunStageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => setMounted(true), []);

  const n = frames.length;
  // centres of each angle's "beat" along scroll progress (0 → 1), ascending.
  const centers = n > 1 ? frames.map((_, i) => i / (n - 1)) : [0, 1];

  const { scrollYProgress } = useScroll({
    target: trackRef ?? rootRef,
    offset: ["start start", "end end"],
  });

  // Per-frame opacity: a triangular crossfade peaking at the frame's own centre
  // and falling to 0 at its neighbours' centres. Frame count is stable for a
  // given usage, so these hooks-in-a-map are safe.
  const opacities = frames.map((_, i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(
      scrollYProgress,
      n > 1 ? centers : [0, 1],
      n > 1 ? centers.map((_, j) => (j === i ? 1 : 0)) : [1, 1],
    ),
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))));
    if (idx !== active) setActive(idx);
  });

  // ---- fallback: static, fully-readable gallery (no JS / reduced motion) ----
  if (!mounted || reduceMotion) {
    return (
      <div className={styles.staticGallery}>
        {frames.map((f) => (
          <figure key={f.angleId} className={styles.staticItem}>
            <div className={styles.staticFrame}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={f.alt} loading="lazy" />
            </div>
            <figcaption className={`mono ${styles.caption}`}>
              {f.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  // ---- interactive: pinned crossfade engine ----
  // The outer element IS the sticky frame and is meant to sit directly inside
  // the scroll track (so it pins within the full track height — as a sticky
  // grid item on desktop, a sticky block child on mobile). Scroll progress is
  // read from `trackRef`, never from this (pinned) element.
  return (
    <div ref={rootRef} className={`${styles.sticky} ${className ?? ""}`}>
      <div
        className={`${styles.frameBox} ${idleBob ? styles.bob : ""}`}
        aria-label={frames[active]?.alt}
        role="img"
      >
        {frames.map((f, i) => (
          <motion.img
            key={f.angleId}
            src={f.src}
            alt=""
            aria-hidden="true"
            draggable={false}
            className={styles.layer}
            style={{ opacity: opacities[i] }}
          />
        ))}
      </div>
      <p className={`mono ${styles.caption}`} aria-live="off">
        {frames[active]?.caption}
      </p>
    </div>
  );
}
