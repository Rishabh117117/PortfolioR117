"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export type ParallaxProps = {
  children: React.ReactNode;
  /**
   * Vertical drift in px across the element's travel through the viewport.
   * Positive = drifts down (reads as "further back / slower"); negative =
   * drifts up (foreground / faster). Keep the spread subtle — depth, not a
   * carousel. Ignored under prefers-reduced-motion.
   */
  offset?: number;
  className?: string;
};

/**
 * Subtle scroll parallax for a single block. Drives translateY only (no layout
 * props). Fully static and readable under reduced motion.
 */
export default function Parallax({
  children,
  offset = 0,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [offset, -offset],
  );

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
