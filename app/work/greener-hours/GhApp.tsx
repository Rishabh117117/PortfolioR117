"use client";

import { useEffect, useRef, useState } from "react";
import {
  TIERS,
  TIER1_PRINCIPLES,
  TIER2_PRINCIPLES,
  TIER3_PRINCIPLES,
  PRINCIPLE_TITLES,
  type Principle,
} from "@/lib/greenerHours";
import ComputeWindowMock from "./ComputeWindowMock";
import SchedulerMock from "./SchedulerMock";
import DashboardMock from "./DashboardMock";
import { GhSimProvider } from "./GhSim";
import s from "./GhApp.module.css";

/**
 * GH-ONE-1 — the three Greener Hours surfaces as ONE product artifact.
 * Layout: on the LEFT, the three tiers as standalone glass cards (each with its
 * own principle chips beneath the header) — the switcher, sitting OUTSIDE the
 * browser window. On the RIGHT, the "web window": chrome + a toolbar carrying
 * the ONE shared clock / pause / live carbon pill, then the active surface. All
 * three surfaces stay MOUNTED (display-swapped) so the shared sim AND each
 * surface's own UI state survive switching. On mobile the left cards give way to
 * a top tab strip + a horizontal scroll-snap swipe pager. Used full-screen on
 * /prototype and compact inline in the case study §08.
 */

const PRINCIPLES: Principle[][] = [TIER1_PRINCIPLES, TIER2_PRINCIPLES, TIER3_PRINCIPLES];
const MOCKS = [ComputeWindowMock, SchedulerMock, DashboardMock];
// Each surface keeps its audience/context label so the deck's "three users"
// point (legibility / behavior / institutional) survives the merge into one
// window instead of three separate browser frames.
const CONTEXTS = [
  { view: "End-user view", url: "chat.ai" },
  { view: "Dev-team view", url: "console.ai/scheduler" },
  { view: "Procurement view", url: "console.ai/footprint" },
];

export default function GhApp({ compact = false }: { compact?: boolean }) {
  return (
    <GhSimProvider>
      <GhAppInner compact={compact} />
    </GhSimProvider>
  );
}

function GhAppInner({ compact }: { compact: boolean }) {
  const [active, setActive] = useState(0);
  const [hoveredP, setHoveredP] = useState<Principle | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Move to a surface. On the mobile swipe track (a real horizontal scroller)
  // this scrolls the panel into view; on desktop the track isn't scrollable so
  // the display-swap alone applies. Instant jump = snappy tap switching.
  const go = (i: number) => {
    setActive(i);
    const track = trackRef.current;
    if (track && track.scrollWidth > track.clientWidth + 4) {
      track.scrollTo({ left: i * track.clientWidth, behavior: "auto" });
    }
  };

  // Keep the active tier in sync with a manual swipe (mobile). Harmless on
  // desktop (only the display:block panel intersects). document.hidden-guarded
  // per the page-wide convention; no animation, so reduced-motion is fine.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const panels = Array.from(track.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        if (typeof document !== "undefined" && document.hidden) return;
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.6) {
            const idx = panels.indexOf(e.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        }
      },
      { root: track, threshold: [0.6] },
    );
    panels.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, []);

  const onTiersKey = (e: React.KeyboardEvent<HTMLElement>) => {
    const last = TIERS.length - 1;
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    go(next);
    e.currentTarget.querySelectorAll<HTMLButtonElement>("[data-tier]")[next]?.focus();
  };

  return (
    <div className={`${s.wrap} ${compact ? s.compact : ""}`}>
      {/* LEFT — the three tiers as standalone cards, separate from the window */}
      <nav className={s.tiers} aria-label="Greener Hours surfaces" onKeyDown={onTiersKey}>
        <p className={s.tiersLabel}>Surfaces</p>
        {TIERS.map((t, i) => (
          <div key={t.n} className={`${s.tierCard} ${active === i ? s.tierOn : ""}`}>
            <button
              type="button"
              data-tier
              className={s.tierMain}
              aria-current={active === i ? "true" : undefined}
              onClick={() => go(i)}
            >
              <span className={s.tierTop}>
                TIER {t.n} · {t.role.toUpperCase()}
              </span>
              <span className={s.tierName}>{t.name}</span>
              <span className={s.tierBlurb}>{t.blurb}</span>
            </button>

            {/* this tier's principle chips, under its header */}
            <div className={s.tierPrinciples}>
              {hoveredP && PRINCIPLES[i].includes(hoveredP) && (
                <div className={s.pTip} role="tooltip">
                  <div className={s.pTipHead}>
                    <b>{hoveredP.code}</b>
                    <span className={s.pTipKind}>{hoveredP.kind}</span>
                  </div>
                  <div className={s.pTipTitle}>{PRINCIPLE_TITLES[hoveredP.code] ?? hoveredP.name}</div>
                  <div className={s.pTipNote}>{hoveredP.insight}</div>
                </div>
              )}
              {PRINCIPLES[i].map((p) => (
                <span
                  key={p.code}
                  className={`${s.pchip} ${p.kind === "anchor" ? s.anchor : ""}`}
                  tabIndex={0}
                  aria-label={`Principle ${p.code}: ${PRINCIPLE_TITLES[p.code] ?? p.name}. ${p.insight}`}
                  onMouseEnter={() => setHoveredP(p)}
                  onMouseLeave={() => setHoveredP((cur) => (cur === p ? null : cur))}
                  onFocus={() => setHoveredP(p)}
                  onBlur={() => setHoveredP((cur) => (cur === p ? null : cur))}
                >
                  <b>{p.code}</b> {p.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* RIGHT — the web window */}
      <div className={s.frame}>
        <div className={s.chrome}>
          <span className={s.dot} />
          <span className={s.dot} />
          <span className={s.dot} />
          <span className={s.url}>↻ greenerhours.dev/console</span>
        </div>

        {/* mobile tier tabs — shown at the top on mobile (left cards hidden) */}
        <div className={s.tabStrip} role="group" aria-label="Choose a surface">
          {TIERS.map((t, i) => (
            <button
              key={t.n}
              type="button"
              aria-current={active === i ? "true" : undefined}
              className={`${s.stripTab} ${active === i ? s.stripOn : ""}`}
              onClick={() => go(i)}
            >
              <span className={s.stripNum}>Tier {t.n}</span>
              <span className={s.stripName}>{t.short}</span>
            </button>
          ))}
        </div>

        {/* main pane — all three surfaces mounted; display-swap (desktop) /
            horizontal snap track (mobile) */}
        <div className={s.main} ref={trackRef}>
          {MOCKS.map((Mock, i) => (
            <section
              key={i}
              className={`${s.panel} ${active === i ? s.panelActive : ""}`}
              aria-label={TIERS[i].name}
            >
              <div className={s.context}>
                <span className={s.ctxView}>{CONTEXTS[i].view}</span>
                <span className={s.ctxUrl}>{CONTEXTS[i].url}</span>
              </div>
              <Mock />
            </section>
          ))}
        </div>

        <p className={s.honesty}>
          Concept prototype · illustrative data — one shared simulation; grid &amp;
          dashboard figures are invented · chat runs on a live model API via a
          server-side proxy
        </p>
      </div>
    </div>
  );
}
