"use client";

import { useEffect, useRef } from "react";

/**
 * DriftGroup — subtle scroll-parallax stagger for a small set of children
 * (the Healthy Materials MaterialRail recipe, generalized). Any descendant
 * carrying `data-depth="<px>"` translates vertically by depth × its distance
 * from the viewport centre (≈ -0.8..0.8), so siblings drift apart as you
 * scroll. Depth is the max offset in px; negative inverts the direction.
 *
 * The drift transform lives on the data-depth element — keep hover
 * transforms on an INNER element so the two never fight.
 * Skips entirely under prefers-reduced-motion; pauses while the tab is
 * hidden. Renders a plain wrapper div (pass className for layout).
 */
export default function DriftGroup({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const els = Array.from(
      root.querySelectorAll<HTMLElement>("[data-depth]")
    );
    if (!els.length) return;
    const depths = els.map((el) => parseFloat(el.dataset.depth || "0"));

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;
      const vh = window.innerHeight || 1;
      for (let i = 0; i < els.length; i++) {
        const rect = els[i].getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const p = (vh / 2 - center) / vh; // ~ -0.8 .. +0.8, 0 at centre
        els[i].style.transform = `translate3d(0,${(p * depths[i]).toFixed(1)}px,0)`;
      }
    };

    els.forEach((el) => (el.style.willChange = "transform"));
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      els.forEach((el) => {
        el.style.willChange = "";
        el.style.transform = "";
      });
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
