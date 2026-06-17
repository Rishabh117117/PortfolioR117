"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import styles from "./OffsetCard.module.css";

export type OffsetCardProps = {
  src: string;
  alt: string;
  /** sizing / placement, set by the page (max-width, grid area, etc.) */
  className?: string;
  /** larger renders can carry a touch more drift; default subtle */
  intensity?: number;
};

/**
 * The portfolio's signature device: an image (render on its studio bg) with a
 * flat dusty-rose rectangle directly behind it, offset down-and-left, no shadow.
 *
 * The mild parallax (§5) drives the render layer and its rose backing at
 * slightly different scroll rates, so the offset gap gently breathes as the
 * card passes through the viewport. transform-only; reduced-motion → static.
 */
export default function OffsetCard({
  src,
  alt,
  className,
  intensity = 1,
}: OffsetCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // small, opposing drifts — the gap opens/closes a few px over the pass
  const roseY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [10 * intensity, -4 * intensity],
  );
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-2 * intensity, -12 * intensity],
  );

  return (
    <div ref={ref} className={`${styles.card} ${className ?? ""}`}>
      <motion.span
        className={styles.rose}
        style={{ y: roseY }}
        aria-hidden="true"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        className={styles.img}
        src={src}
        alt={alt}
        loading="lazy"
        draggable={false}
        style={{ y: imgY }}
      />
    </div>
  );
}
