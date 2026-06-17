"use client";

import { motion, useTransform, useMotionValue } from "motion/react";
import { useScene } from "./SceneContext";
import { useIsMobile } from "./useIsMobile";
import styles from "./RenderFrame.module.css";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** slow Ken-Burns zoom (the four big single-subject renders only) */
  kenBurns?: boolean;
  /** transform-origin for the zoom, e.g. "52% 46%" to converge on a focal point */
  kbOrigin?: string;
  /** parallax amplitude override */
  amount?: number;
};

/**
 * A clipped, fixed-ratio frame for a standalone render. The image overscans its
 * frame (inset -4%) so the parallax drift + Ken-Burns zoom never reveal an edge,
 * exploiting the renders' studio whitespace. y + scale ride one transform, and
 * only switch on after mount (SSR-safe).
 */
export default function RenderFrame({
  src,
  alt,
  className,
  kenBurns,
  kbOrigin = "center",
  amount,
}: Props) {
  const scene = useScene();
  const mobile = useIsMobile();
  const fallback = useMotionValue(0.5);

  const progress = scene?.progress ?? fallback;
  const reduce = scene?.reduce ?? true;
  const ready = (scene?.mounted ?? false) && !reduce;

  const a = (amount ?? 14) * (mobile ? 0.5 : 1);
  const y = useTransform(progress, [0, 1], [a, -a]);
  const scale = useTransform(progress, [0, 0.5, 1], [1.0, 1.04, 1.05]);

  return (
    <div className={`${styles.frame} ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        className={styles.img}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        style={{
          y: ready ? y : 0,
          scale: ready && kenBurns ? scale : 1,
          transformOrigin: kbOrigin,
        }}
      />
    </div>
  );
}
