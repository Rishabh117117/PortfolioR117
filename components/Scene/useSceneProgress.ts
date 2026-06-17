"use client";

import type { RefObject } from "react";
import {
  useScroll,
  useSpring,
  useReducedMotion,
  useMotionValue,
  type MotionValue,
} from "motion/react";

/**
 * The heart of the depth system: ONE useScroll for a whole scene, spring-
 * smoothed once. The settle is emergent — when scrolling stops near center the
 * spring eases the last px of every layer to rest in lockstep. Under reduced
 * motion it returns a frozen progress pinned at the settled midpoint (0.5).
 */
export function useSceneProgress(ref: RefObject<HTMLElement | null>): {
  progress: MotionValue<number>;
  reduce: boolean;
} {
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.001,
  });
  const frozen = useMotionValue(0.5);
  return { progress: reduce ? frozen : smooth, reduce };
}
