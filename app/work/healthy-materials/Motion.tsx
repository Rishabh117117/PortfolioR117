"use client";

import { useEffect } from "react";

/**
 * Scoped scroll-motion for the Healthy Materials page (spec §7):
 *  - IntersectionObserver drives scene reveals (.hm-reveal) — hybrid easing.
 *  - requestAnimationFrame parallax on full-bleed photo layers (.hm-bg[data-par])
 *    is a DESKTOP (>=1180px) progressive enhancement only; mobile/touch never
 *    runs it, so the page and the swap-card demo work fully without it.
 *
 * Renders nothing. Degrades gracefully:
 *  - the `.hm-js` marker activates the hidden initial states in hm-motion.css,
 *    so with JS disabled the page is fully visible (no hydration mismatch).
 *  - prefers-reduced-motion disables parallax and the CSS flattens reveals.
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("hm-js");

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ---- scene reveals ----
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("hm-show");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    Array.from(document.querySelectorAll<HTMLElement>(".hm-reveal")).forEach(
      (el) => io.observe(el),
    );

    // ---- parallax: desktop only, skipped under reduced motion ----
    const desktop = window.matchMedia("(min-width: 1180px)").matches;
    let onScroll: (() => void) | null = null;
    let update: (() => void) | null = null;
    const layers =
      reduce || !desktop
        ? []
        : Array.from(
            document.querySelectorAll<HTMLElement>(".hm-bg[data-par]"),
          );

    if (layers.length) {
      let ticking = false;
      update = () => {
        const vh = window.innerHeight;
        layers.forEach((l) => {
          const parent = l.parentElement;
          if (!parent) return;
          const r = parent.getBoundingClientRect();
          const center = r.top + r.height / 2 - vh / 2;
          const speed = parseFloat(l.dataset.par || "0");
          l.style.transform = `translate3d(0, ${(center * speed).toFixed(1)}px, 0)`;
        });
        ticking = false;
      };
      onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(update!);
          ticking = true;
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", update);
      update();
    }

    return () => {
      io.disconnect();
      if (onScroll) window.removeEventListener("scroll", onScroll);
      if (update) window.removeEventListener("resize", update);
      root.classList.remove("hm-js");
    };
  }, []);

  return null;
}
