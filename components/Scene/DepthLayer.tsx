"use client";

import { motion, useTransform, useMotionValue } from "motion/react";
import { useScene } from "./SceneContext";
import { useIsMobile } from "./useIsMobile";

type Depth = "back" | "mid" | "front";

// The depth ladder — SIGN IS LAW (this is what reads as one camera, not jitter):
// back ALWAYS drifts down (+ at exit), mid/front ALWAYS drift up (− at exit).
const AMP: Record<Depth, number> = { back: 20, mid: 14, front: 18 };

type Props = {
  depth: Depth;
  /** override the layer's amplitude (px); e.g. calmer secondary imagery */
  amount?: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * A single plane of the scene camera. Reads the shared progress from context and
 * maps it to a translateY whose direction is fixed by `depth`, magnitude by
 * `amount`. No own scroll source; transforms apply only after mount.
 */
export default function DepthLayer({
  depth,
  amount,
  className,
  children,
}: Props) {
  const scene = useScene();
  const mobile = useIsMobile();
  const fallback = useMotionValue(0.5);

  const progress = scene?.progress ?? fallback;
  const reduce = scene?.reduce ?? true;
  const ready = (scene?.mounted ?? false) && !reduce;

  const a = (amount ?? AMP[depth]) * (mobile ? 0.5 : 1);
  const range = depth === "back" ? [-a, a] : [a, -a];
  const y = useTransform(progress, [0, 1], range);

  return (
    <motion.div className={className} style={{ y: ready ? y : 0 }}>
      {children}
    </motion.div>
  );
}
