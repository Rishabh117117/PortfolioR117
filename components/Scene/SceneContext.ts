"use client";

import { createContext, useContext } from "react";
import type { MotionValue } from "motion/react";

/**
 * One coherent "camera" per spread. SceneStage creates a single scroll source,
 * spring-smooths it, and shares it here so every depth layer in the scene reads
 * the SAME progress — the fix for the per-element parallax jitter.
 */
export type SceneCtx = {
  /** spring-smoothed scroll progress 0→1 across the scene's viewport pass */
  progress: MotionValue<number>;
  /** prefers-reduced-motion — collapses all motion to static */
  reduce: boolean;
  /** false during SSR + first paint, true after mount. Gates transforms so the
   *  server and first client render are identical (no hydration mismatch). */
  mounted: boolean;
};

export const SceneContext = createContext<SceneCtx | null>(null);

export const useScene = () => useContext(SceneContext);
