"use client";

import { useEffect } from "react";
import "./reveal.css";

/**
 * Site-wide scroll-reveal — generalized from the Housing Works page's Motion.
 * Mount ONCE per page (below the hero content). On hydration it marks
 * <html> with `.reveal-on`, which activates the hidden initial state for every
 * `[data-reveal]` element on the page; a single IntersectionObserver then fades
 * + rises each one in as it enters the viewport (once, then unobserves).
 *
 * Renders nothing. Degrades gracefully:
 *  - the `.reveal-on` marker is what activates the hidden states in reveal.css,
 *    so with JS disabled the page is fully visible (never hidden content).
 *  - prefers-reduced-motion flattens reveals to instant + no transform (also
 *    honored by the global reduced-motion rule in globals.css).
 *
 * Mounted per-page rather than in the layout on purpose: the App Router keeps
 * the layout mounted across client navigations, so a layout-level observer
 * would never see the next page's freshly-rendered targets. A per-page mount
 * re-runs the query on every route.
 */
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-on");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        });
      },
      // trigger as an element's top clears the lower edge — robust for blocks
      // both shorter and taller than the viewport (HW used a flat 0.25).
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    targets.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.classList.remove("reveal-on");
    };
  }, []);

  return null;
}
