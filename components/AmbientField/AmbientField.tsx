"use client";

import { useEffect, useRef } from "react";
import styles from "./AmbientField.module.css";

/**
 * AmbientField — the shared, parameterized version of the flagship pages'
 * ambient orb backdrop (engine = the Housing Works generation: scroll-driven
 * Lissajous paths, `[data-ambient-dim]` fade zones, document.hidden guard).
 * The four flagship pages keep their own tuned copies; this component brings
 * the same background DNA to the shell surfaces (about, home, archive) with
 * per-page colors:
 *   • two "warm" orbs (group A — leads at the top of the page) and two "cool"
 *     orbs (group B — rises as you scroll), each a { color, alpha } spec;
 *   • SCROLL is the clock (ROUND-2026-07-17): position is a function of the
 *     scroll position (per-orb Lissajous phase) and the A→B cross-fade rides
 *     it — at rest, nothing moves. Near a `[data-ambient-live]` band (a demo
 *     artifact) the free-running time term + pointer lean blend back in;
 *   • orbs fade toward `dim` over any `[data-ambient-dim]` block.
 * Decorative (`aria-hidden`), fixed, z-index 0 — mount as the first child of
 * a `position: relative` page root, with content on a z-index 1 sibling.
 * Under `prefers-reduced-motion` no loop attaches (orbs rest at baseline).
 */

export type OrbSpec = {
  /** hex color, e.g. "#9A7B4F" */
  color: string;
  /** gradient core alpha (flagship pages sit around 0.4–0.57) */
  alpha: number;
};

type Props = {
  /** group A — parked high, leads at the top of the page */
  warm: [OrbSpec, OrbSpec];
  /** group B — parked low, rises in toward the end of the scroll */
  cool: [OrbSpec, OrbSpec];
  /** resting opacity of group A (= the motion baseline at scroll 0) */
  restWarm?: number;
  /** resting opacity of group B */
  restCool?: number;
  /** fade target over [data-ambient-dim] sections */
  dim?: number;
};

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

function orbGradient({ color, alpha }: OrbSpec, stop: number): string {
  const n = parseInt(color.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `radial-gradient(circle, rgba(${r}, ${g}, ${b}, ${alpha}), transparent ${stop}%)`;
}

export default function AmbientField({
  warm,
  cool,
  restWarm = 0.85,
  restCool = 0.55,
  dim = 0.83,
}: Props) {
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

    const orbs = Array.from(el.querySelectorAll<HTMLElement>("[data-f]"));
    const factors = orbs.map((o) => parseFloat(o.dataset.f || "12"));
    const isCool = orbs.map((o) => o.dataset.c === "cool");
    // per-orb path params — divergent freqs/amplitudes/scroll-loops so the two
    // colour groups never move in lockstep. (Same constants as the flagships.)
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
      live = 0, // demo-proximity blend: 1 = the free-running mode
      lastY = window.scrollY;
    // per-orb eased fade: each orb dims only while ITS core sits over a
    // [data-ambient-dim] block, so orbs in open space stay solid while one
    // drifting across the text column lightens on its own.
    const dimF = orbs.map(() => 1);
    // last transform applied per orb (px) — lets measure() recover each orb's
    // untransformed viewport-space centre by subtracting it from the live rect.
    const appliedX = orbs.map(() => 0);
    const appliedY = orbs.map(() => 0);
    // base = orb centre in (fixed) viewport space + core radius. Scroll-independent
    // because .ambient is position:fixed; refreshed on resize / font settle.
    const base = orbs.map(() => ({ cx: 0, cy: 0, r: 0 }));
    let max = document.documentElement.scrollHeight - window.innerHeight || 1;
    let dimZones: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    }[] = [];
    let liveZones: { top: number; bottom: number }[] = [];
    // cache layout-dependent values; refresh on resize (+ once after fonts settle)
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight || 1;
      dimZones = Array.from(
        document.querySelectorAll<HTMLElement>("[data-ambient-dim]")
      ).map((s) => {
        const r = s.getBoundingClientRect();
        return {
          top: r.top + window.scrollY,
          bottom: r.bottom + window.scrollY,
          left: r.left + window.scrollX,
          right: r.right + window.scrollX,
        };
      });
      liveZones = Array.from(
        document.querySelectorAll<HTMLElement>("[data-ambient-live]")
      ).map((s) => {
        const r = s.getBoundingClientRect();
        const top = r.top + window.scrollY;
        return { top, bottom: top + r.height };
      });
      for (let i = 0; i < orbs.length; i++) {
        const r = orbs[i].getBoundingClientRect();
        base[i] = {
          cx: r.left + r.width / 2 - appliedX[i],
          cy: r.top + r.height / 2 - appliedY[i],
          r: r.width / 2,
        };
      }
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
      // near a demo band the free-running term + pointer lean blend in.
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

      const s = clamp01(yNow / max); // scroll progress 0..1

      // colour weighting — group A leads, group B rises in near the end
      const a = clamp01((s - 0.1) / 0.3);
      const b = clamp01((s - 0.62) / 0.3);
      let warmW = restWarm + 0.1 * a;
      warmW = warmW * (1 - 0.32 * b);
      let coolW = restCool + 0.12 * a;
      coolW = coolW + (1.0 - coolW) * b;

      // viewport is fixed and the orbs are pinned to it; scroll only shifts the
      // document-space zone tests below.
      const sx = window.scrollX;
      const sy = window.scrollY;

      for (let i = 0; i < orbs.length; i++) {
        const p = P[i];
        // scroll advances the path phase → the orb swirls/travels as you scroll
        const driftX = Math.sin(t * p.fx + s * TAU * p.sx + p.ph) * p.ampX;
        const driftY = Math.cos(t * p.fy + s * TAU * p.sy + p.ph) * p.ampY;
        const tX = px * factors[i] + driftX;
        const tY = py * factors[i] * 0.5 + driftY;
        appliedX[i] = tX;
        appliedY[i] = tY;
        orbs[i].style.transform =
          "translate3d(" + tX.toFixed(1) + "px," + tY.toFixed(1) + "px,0)";

        // per-orb dim: does this orb's core overlap a [data-ambient-dim] block?
        // orb doc-space centre = fixed base centre + live transform + scroll.
        // grow the zone by ~a third of the core radius so the fade begins as the
        // gradient hotspot (not just the exact centre) crosses the text.
        const ocx = base[i].cx + tX + sx;
        const ocy = base[i].cy + tY + sy;
        const m = base[i].r * 0.35;
        let hit = false;
        for (let z = 0; z < dimZones.length; z++) {
          const zn = dimZones[z];
          if (
            ocx > zn.left - m &&
            ocx < zn.right + m &&
            ocy > zn.top - m &&
            ocy < zn.bottom + m
          ) {
            hit = true;
            break;
          }
        }
        dimF[i] += ((hit ? dim : 1) - dimF[i]) * 0.05;
        orbs[i].style.opacity = (
          (isCool[i] ? coolW : warmW) *
          dimF[i]
        ).toFixed(3);
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
  }, [dim, restWarm, restCool]);

  // resting opacity = the motion baseline, so the pre-hydration paint and
  // reduced-motion users match motion mode rather than full-strength orbs.
  return (
    <div className={styles.ambient} ref={ref} aria-hidden="true">
      <span
        className={`${styles.orb} ${styles.w1}`}
        data-c="warm"
        data-f="40"
        style={{ background: orbGradient(warm[0], 70), opacity: restWarm }}
      />
      <span
        className={`${styles.orb} ${styles.c1}`}
        data-c="cool"
        data-f="-48"
        style={{ background: orbGradient(cool[0], 72), opacity: restCool }}
      />
      <span
        className={`${styles.orb} ${styles.w2}`}
        data-c="warm"
        data-f="34"
        style={{ background: orbGradient(warm[1], 72), opacity: restWarm }}
      />
      <span
        className={`${styles.orb} ${styles.c2}`}
        data-c="cool"
        data-f="-40"
        style={{ background: orbGradient(cool[1], 72), opacity: restCool }}
      />
    </div>
  );
}
