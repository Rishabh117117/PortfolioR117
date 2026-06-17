"use client";

import { motion, useTransform, useMotionValue } from "motion/react";
import { useScene } from "../Scene/SceneContext";
import { useIsMobile } from "../Scene/useIsMobile";
import styles from "./OffsetCard.module.css";

export type OffsetCardProps = {
  src: string;
  alt: string;
  /** sizing / placement, set by the page (max-width, grid area, etc.) */
  className?: string;
  /** scales the gap-dolly swing (larger renders get a touch more) */
  intensity?: number;
  /** slow Ken-Burns zoom on the render (single-subject renders only) */
  kenBurns?: boolean;
  kbOrigin?: string;
};

/**
 * The portfolio's signature device: a render with a flat dusty-rose rectangle
 * behind it, offset down-and-left, no shadow. The render and its rose backing
 * sit on different layers of the SAME shared scene camera, so the diagonal gap
 * opens and closes like a slow dolly as the spread passes — never the desynced
 * per-element jitter of the old build. transform-only; switches on after mount.
 */
export default function OffsetCard({
  src,
  alt,
  className,
  intensity = 1,
  kenBurns,
  kbOrigin = "center",
}: OffsetCardProps) {
  const scene = useScene();
  const mobile = useIsMobile();
  const fallback = useMotionValue(0.5);

  const progress = scene?.progress ?? fallback;
  const reduce = scene?.reduce ?? true;
  const ready = (scene?.mounted ?? false) && !reduce;

  const i = (mobile ? 0.6 : 1) * intensity;
  // rose = back element (always drifts down); render = mid/front (crosses up).
  // gap (imgY − roseY) opens ~30px over the pass → the "breathing dolly".
  const roseY = useTransform(progress, [0, 1], [14 * i, 2 * i]);
  const imgY = useTransform(progress, [0, 1], [2 * i, -16 * i]);
  const scale = useTransform(progress, [0, 0.5, 1], [1.0, 1.04, 1.05]);

  return (
    <div className={`${styles.card} ${className ?? ""}`}>
      <motion.span
        className={styles.rose}
        style={{ y: ready ? roseY : 0 }}
        aria-hidden="true"
      />
      <div className={styles.imgFrame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          className={styles.img}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{
            y: ready ? imgY : 0,
            scale: ready && kenBurns ? scale : 1,
            transformOrigin: kbOrigin,
          }}
        />
      </div>
    </div>
  );
}
