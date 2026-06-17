"use client";

import { useEffect, useRef, useState } from "react";
import { SceneContext } from "./SceneContext";
import { useSceneProgress } from "./useSceneProgress";

type Props = {
  className?: string;
  "aria-label"?: string;
  children: React.ReactNode;
};

/**
 * Wraps one portfolio spread. Owns the single scroll source for the scene and
 * shares the spring-smoothed progress + reduced-motion flag via context, so
 * every depth layer inside reads ONE coherent camera. Scroll is never pinned or
 * hijacked — the "settle" emerges from the shared spring easing to rest.
 *
 * `mounted` gates the transforms: the server and first client paint render
 * statically (no transform), so there is no hydration mismatch; the parallax
 * switches on after mount.
 */
export default function SceneStage({ className, children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { progress, reduce } = useSceneProgress(ref);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <SceneContext.Provider value={{ progress, reduce, mounted }}>
      <section ref={ref} className={className} {...rest}>
        {children}
      </section>
    </SceneContext.Provider>
  );
}
