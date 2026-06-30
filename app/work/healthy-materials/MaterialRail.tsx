"use client";

import { useEffect, useRef } from "react";
import { MATERIAL_GRID } from "@/lib/healthyMaterials";
import styles from "./MaterialRail.module.css";

const IMG = "/images/healthy-materials";

/**
 * The healthy materials as a compact, staggered set of cards with a gentle
 * scroll PARALLAX — each card drifts vertically at its own rate (per-card
 * `depth`) as the section moves through the viewport. Replaces the old long
 * teal grid. Respects reduced-motion (cards sit static) and pauses while the
 * tab is hidden. Hover-lift on the image only, so it never fights the parallax
 * transform on the card.
 */
export default function MaterialRail() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"));
    const depths = cards.map((c) => parseFloat(c.dataset.depth || "0"));
    let raf = 0;

    const tick = () => {
      if (document.hidden) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const vh = window.innerHeight || 1;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const p = (vh / 2 - center) / vh; // ~ -0.8 (below) .. +0.8 (above), 0 at centre
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.transform = `translate3d(0,${(p * depths[i]).toFixed(1)}px,0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    cards.forEach((c) => (c.style.willChange = "transform"));
    window.addEventListener("scroll", tick, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", tick);
      cancelAnimationFrame(raf);
      cards.forEach((c) => (c.style.willChange = ""));
    };
  }, []);

  return (
    <div className={styles.rail} ref={ref}>
      {MATERIAL_GRID.map((m) => (
        <article className={styles.card} key={m.id} data-depth={m.depth}>
          <span className={styles.frame}>
            <img
              className={styles.img}
              src={`${IMG}/${m.img}`}
              alt={m.name}
              loading="lazy"
              width="1200"
              height="1500"
            />
          </span>
          <h3 className={styles.name}>{m.name}</h3>
          <p className={`mono ${styles.line}`}>{m.line}</p>
        </article>
      ))}
    </div>
  );
}
