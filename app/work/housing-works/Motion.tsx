"use client";

import { useEffect } from "react";

/**
 * Scoped scroll-motion for the Housing Works page (§5):
 *  - IntersectionObserver drives scene reveals (.hw-reveal) and line-draws (.hw-draw)
 *  - requestAnimationFrame parallax on full-bleed photo layers (.hw-bg[data-par])
 *
 * Renders nothing. Everything degrades gracefully:
 *  - the `.hw-js` marker is what activates the hidden initial states in hw-motion.css,
 *    so with JS disabled the page is fully visible.
 *  - prefers-reduced-motion disables parallax entirely and the CSS flattens reveals/draws.
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("hw-js");

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ---- reveals + line draws ----
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("hw-in", "hw-show");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 },
    );
    const observed = Array.from(
      document.querySelectorAll<HTMLElement>(".hw-draw, .hw-reveal"),
    );
    observed.forEach((el) => io.observe(el));

    // ---- parallax (skip under reduced motion) ----
    let onScroll: (() => void) | null = null;
    let update: (() => void) | null = null;
    const layers = reduce
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>(".hw-bg[data-par]"));

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
      root.classList.remove("hw-js");
    };
  }, []);

  return null;
}
