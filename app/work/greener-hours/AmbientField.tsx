"use client";

import { useEffect, useRef } from "react";
import "./AmbientField.css";

/**
 * Greener Hours — page-wide ambient backdrop (own copy; Follow's + HM's untouched).
 *
 * Two pairs of soft orbs: amber (carbon/energy) + forest (clean/the standard).
 *   • SCROLL is the clock (ROUND-2026-07-17) — each orb traces its own Lissajous
 *     path (divergent X/Y freqs + scroll-loop counts) so they swirl and travel
 *     as you scroll, and hold still at rest. Near the `[data-ambient-live]`
 *     demo band the free-running drift + pointer lean blend back in.
 *   • SCROLL cross-fades the colour: amber dominates the problem arc (the carbon
 *     scale + invisibility) → forest grows in toward the solution and close.
 *   • They FADE back over `[data-ambient-dim]` reading blocks so dense copy stays
 *     legible.
 * Decorative (aria-hidden), fixed, z-index 0. One rAF loop, paused while hidden.
 * Under prefers-reduced-motion no loop attaches (orbs rest at their CSS opacity).
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

    const orbs = Array.from(el.querySelectorAll<HTMLElement>(".gh-orb"));
    const factors = orbs.map((o) => parseFloat(o.dataset.f || "12"));
    const isAmber = orbs.map((o) => o.dataset.c === "amber");
    const P = orbs.map((_, i) => ({
      ampX: 140 + i * 38,
      ampY: 86 + i * 24,
      fx: 0.5 + i * 0.13,
      fy: 0.42 + i * 0.11,
      sx: 1.6 + i * 0.7,
      sy: 2.2 + i * 0.6,
      ph: i * 1.7,
    }));

    let px = 0,
      py = 0,
      tx = 0,
      ty = 0,
      t = 0,
      raf = 0,
      live = 0, // demo-proximity blend: 1 = the free-running mode
      lastY = window.scrollY,
      dim = 1;
    let max = document.documentElement.scrollHeight - window.innerHeight || 1;
    let dimZones: { top: number; bottom: number }[] = [];
    let liveZones: { top: number; bottom: number }[] = [];
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight || 1;
      dimZones = Array.from(
        document.querySelectorAll<HTMLElement>("[data-ambient-dim]")
      ).map((s) => {
        const r = s.getBoundingClientRect();
        const top = r.top + window.scrollY;
        return { top, bottom: top + r.height };
      });
      liveZones = Array.from(
        document.querySelectorAll<HTMLElement>("[data-ambient-live]")
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
      // scroll is the clock: idle = still; scroll delta advances the phase;
      // near the demo band the free-running term + pointer lean blend in.
      const yNow = window.scrollY;
      const dy = Math.min(Math.abs(yNow - lastY), 160);
      lastY = yNow;
      const lm = window.innerHeight * 0.25;
      let inLive = false;
      for (let z = 0; z < liveZones.length; z++) {
        if (
          liveZones[z].top < yNow + window.innerHeight + lm &&
          liveZones[z].bottom > yNow - lm
        ) {
          inLive = true;
          break;
        }
      }
      live += ((inLive ? 1 : 0) - live) * 0.05;
      t += 0.006 * live + dy * 0.0005;
      px += (tx * live - px) * 0.05;
      py += (ty * live - py) * 0.05;

      const s = clamp01(yNow / max);

      // colour weighting — amber dominates the carbon/problem arc up top; forest
      // grows in toward the solution + close.
      let amberW = 0.9 - 0.45 * s;
      let forestW = 0.5 + 0.45 * s;

      const center = window.scrollY + window.innerHeight * 0.5;
      let inDim = false;
      for (let z = 0; z < dimZones.length; z++) {
        if (center > dimZones[z].top && center < dimZones[z].bottom) {
          inDim = true;
          break;
        }
      }
      dim += ((inDim ? 0.82 : 1) - dim) * 0.05;

      for (let i = 0; i < orbs.length; i++) {
        const p = P[i];
        const driftX = Math.sin(t * p.fx + s * TAU * p.sx + p.ph) * p.ampX;
        const driftY = Math.cos(t * p.fy + s * TAU * p.sy + p.ph) * p.ampY;
        orbs[i].style.transform =
          "translate3d(" +
          (px * factors[i] + driftX).toFixed(1) +
          "px," +
          (py * factors[i] * 0.5 + driftY).toFixed(1) +
          "px,0)";
        orbs[i].style.opacity = ((isAmber[i] ? amberW : forestW) * dim).toFixed(3);
      }
      raf = requestAnimationFrame(loop);
    };

    orbs.forEach((o) => (o.style.willChange = "transform, opacity"));
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    const settle = window.setTimeout(measure, 700);
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
    <div className="gh-ambient" ref={ref} aria-hidden="true">
      <span className="gh-orb a1" data-c="amber" data-f="40" />
      <span className="gh-orb f1" data-c="forest" data-f="-48" />
      <span className="gh-orb a2" data-c="amber" data-f="34" />
      <span className="gh-orb f2" data-c="forest" data-f="-40" />
    </div>
  );
}
