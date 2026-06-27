"use client";

import { useEffect, useRef } from "react";
import "./AmbientField.css";

/**
 * Follow — page-wide ambient backdrop (DESIGN-PHASE-1 motion, v4).
 *
 * The single soft "background layer" behind the WHOLE page (Material-style:
 * every section floats over it). Blue + orange blurred orbs that drift
 * SIDE-TO-SIDE, lean toward the pointer, and — the storytelling bit —
 * cross-fade by scroll position so the page's colour arc matches its content:
 *   intro      → blue + orange both glowing
 *   problem    → orange-dominant (~70/30)
 *   Follow     → blue-dominant (~70/30)
 * Decorative (`aria-hidden`), `position:fixed; z-index:0`. One always-on rAF
 * loop (throttled while the tab is hidden). Under `prefers-reduced-motion` no
 * loop attaches; the orbs sit still at a neutral balance (CSS).
 */

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

export default function AmbientField() {
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

    const orbs = Array.from(el.querySelectorAll<HTMLElement>(".orb"));
    const factors = orbs.map((o) => parseFloat(o.dataset.f || "12"));
    const isBlue = orbs.map((o) => o.dataset.c === "blue");
    let px = 0,
      py = 0,
      tx = 0,
      ty = 0,
      t = 0,
      raf = 0;
    // cache the layout-triggering scrollHeight read; refresh only on resize, not
    // every frame (the loop then reads the cheap window.scrollY against it).
    let max = document.documentElement.scrollHeight - window.innerHeight || 1;
    const recalcMax = () => {
      max = document.documentElement.scrollHeight - window.innerHeight || 1;
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };

    const loop = () => {
      t += 0.005;
      px += (tx - px) * 0.04;
      py += (ty - py) * 0.04;

      // scroll progress → colour weighting (problem=orange, Follow=blue)
      const s = clamp01(window.scrollY / max);
      const a = clamp01((s - 0.12) / 0.26); // ramps into the orange (problem) zone
      const b = clamp01((s - 0.5) / 0.28); // ramps into the blue (Follow) zone
      let orangeW = 0.7 + 0.3 * a;
      orangeW = orangeW * (1 - b) + 0.25 * b;
      let blueW = 0.55 - 0.37 * a;
      blueW = blueW + (1 - blueW) * b;

      for (let i = 0; i < orbs.length; i++) {
        const f = factors[i];
        const driftX = Math.sin(t + i * 1.6) * 30; // side-to-side
        const driftY = Math.cos(t * 0.6 + i) * 5; // slight vertical
        orbs[i].style.transform =
          "translate3d(" +
          (px * f + driftX).toFixed(2) +
          "px," +
          (py * f * 0.35 + driftY).toFixed(2) +
          "px,0)";
        orbs[i].style.opacity = (isBlue[i] ? blueW : orangeW).toFixed(3);
      }
      raf = requestAnimationFrame(loop);
    };

    orbs.forEach((o) => (o.style.willChange = "transform, opacity"));
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", recalcMax, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", recalcMax);
      cancelAnimationFrame(raf);
      orbs.forEach((o) => {
        o.style.willChange = "";
      });
    };
  }, []);

  return (
    <div className="ambient" ref={ref} aria-hidden="true">
      <span className="orb o1" data-c="orange" data-f="26" />
      <span className="orb b1" data-c="blue" data-f="-32" />
      <span className="orb o2" data-c="orange" data-f="20" />
      <span className="orb b2" data-c="blue" data-f="-22" />
    </div>
  );
}
