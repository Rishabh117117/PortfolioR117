"use client";

import { useEffect, useRef } from "react";
import "./AmbientField.css";

/**
 * Housing Works — page-wide ambient backdrop (own copy; Follow/HM untouched).
 *
 * Four soft orbs in the page's World AIDS Day palette — ribbon crimson + WAD
 * pink (warm) and WAD teal + orange (cool) — a living version of the page's
 * signature gradient:
 *   • SCROLL drives position — each orb traces its own Lissajous path (different
 *     X/Y frequencies + scroll-loop counts), so they swirl and travel across the
 *     viewport rather than sitting fixed. A slow time term keeps them drifting at
 *     rest; the pointer adds a lean.
 *   • SCROLL cross-fades the weighting — warm leads through the research arc; the
 *     cool teal/orange rises in toward the proposals.
 *   • They FADE back over text-heavy sections (any `[data-ambient-dim]` block) so
 *     dense reading stays legible.
 * Decorative (`aria-hidden`), fixed, z-index 0. One rAF loop, paused while hidden.
 * Under `prefers-reduced-motion` no loop attaches (orbs rest at their CSS opacity).
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

    const orbs = Array.from(el.querySelectorAll<HTMLElement>(".hw-orb"));
    const factors = orbs.map((o) => parseFloat(o.dataset.f || "12"));
    const isCool = orbs.map((o) => o.dataset.c === "cool");
    // per-orb path params — divergent freqs/amplitudes/scroll-loops so the two
    // colour groups never move in lockstep.
    const P = orbs.map((_, i) => ({
      ampX: 140 + i * 38, // horizontal travel (px)
      ampY: 86 + i * 24, // vertical travel (px)
      fx: 0.5 + i * 0.13, // time frequency — keeps them alive at rest
      fy: 0.42 + i * 0.11,
      sx: 1.6 + i * 0.7, // X oscillations across one full-page scroll
      sy: 2.2 + i * 0.6, // Y oscillations across one full-page scroll
      ph: i * 1.7, // phase offset
    }));

    let px = 0,
      py = 0,
      tx = 0,
      ty = 0,
      t = 0,
      raf = 0,
      dim = 1; // eased fade factor over text-heavy zones
    let max = document.documentElement.scrollHeight - window.innerHeight || 1;
    let dimZones: { top: number; bottom: number }[] = [];
    // cache layout-dependent values; refresh on resize (+ once after fonts settle)
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight || 1;
      dimZones = Array.from(
        document.querySelectorAll<HTMLElement>("[data-ambient-dim]")
      ).map((s) => {
        const r = s.getBoundingClientRect();
        const top = r.top + window.scrollY;
        return { top, bottom: top + r.height };
      });
    };
    measure();

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };

    const TAU = Math.PI * 2;
    const loop = () => {
      if (document.hidden) {
        raf = requestAnimationFrame(loop);
        return;
      }
      t += 0.006;
      px += (tx - px) * 0.05;
      py += (ty - py) * 0.05;

      const s = clamp01(window.scrollY / max); // scroll progress 0..1

      // colour weighting — warm (crimson/pink) leads through the research arc;
      // the cool teal/orange rises in toward the proposals near the end.
      const a = clamp01((s - 0.1) / 0.3);
      const b = clamp01((s - 0.62) / 0.3);
      let warmW = 0.82 + 0.1 * a;
      warmW = warmW * (1 - 0.32 * b);
      let coolW = 0.6 + 0.12 * a;
      coolW = coolW + (1.0 - coolW) * b;

      // fade back over text-heavy sections (viewport-centre inside a dim zone)
      const center = window.scrollY + window.innerHeight * 0.5;
      let inDim = false;
      for (let z = 0; z < dimZones.length; z++) {
        if (center > dimZones[z].top && center < dimZones[z].bottom) {
          inDim = true;
          break;
        }
      }
      dim += ((inDim ? 0.42 : 1) - dim) * 0.05;

      for (let i = 0; i < orbs.length; i++) {
        const p = P[i];
        // scroll advances the path phase → the orb swirls/travels as you scroll
        const driftX = Math.sin(t * p.fx + s * TAU * p.sx + p.ph) * p.ampX;
        const driftY = Math.cos(t * p.fy + s * TAU * p.sy + p.ph) * p.ampY;
        orbs[i].style.transform =
          "translate3d(" +
          (px * factors[i] + driftX).toFixed(1) +
          "px," +
          (py * factors[i] * 0.5 + driftY).toFixed(1) +
          "px,0)";
        orbs[i].style.opacity = ((isCool[i] ? coolW : warmW) * dim).toFixed(3);
      }
      raf = requestAnimationFrame(loop);
    };

    orbs.forEach((o) => (o.style.willChange = "transform, opacity"));
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    const settle = window.setTimeout(measure, 700); // re-measure after font reflow
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", measure);
      window.clearTimeout(settle);
      cancelAnimationFrame(raf);
      orbs.forEach((o) => {
        o.style.willChange = "";
      });
    };
  }, []);

  return (
    <div className="hw-ambient" ref={ref} aria-hidden="true">
      <span className="hw-orb hw-w1" data-c="warm" data-f="40" />
      <span className="hw-orb hw-c1" data-c="cool" data-f="-48" />
      <span className="hw-orb hw-w2" data-c="warm" data-f="34" />
      <span className="hw-orb hw-c2" data-c="cool" data-f="-40" />
    </div>
  );
}
