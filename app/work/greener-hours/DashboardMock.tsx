"use client";

import { useEffect, useState } from "react";
import { gridAt, hh, gridSplit, useGhSim } from "./GhSim";
import "./diagrams.css";
import s from "./TierMocks.module.css";

/**
 * §Tier 3 — Compute Footprint Dashboard (deck slide 10), LIVE on the shared
 * sim (GH-SIM-1). The request counter ticks while LIVE is on; AVG INTENSITY
 * follows the same sim clock as the T1 pill and T2 scheduler; the flex strip
 * reflects the actual Tier-2 queue — submit a job there and this moves.
 */

// 24 days · [volume 0-1 (rising), intensity 0-1 (falling)] — deterministic
const DAYS: [number, number][] = [
  [0.40, 0.85], [0.43, 0.96], [0.38, 0.80], [0.50, 0.79], [0.46, 0.92], [0.22, 0.90],
  [0.26, 0.73], [0.43, 0.84], [0.55, 0.71], [0.50, 0.70], [0.62, 0.80], [0.47, 0.83],
  [0.28, 0.71], [0.38, 0.82], [0.68, 0.62], [0.69, 0.78], [0.64, 0.58], [0.61, 0.57],
  [0.72, 0.58], [0.37, 0.67], [0.62, 0.66], [0.70, 0.58], [0.78, 0.53], [0.74, 0.50],
];
const BASE = 150, TOP = 12, MAXH = BASE - TOP, STEP = 39, X0 = 8;

// GH-T3-2 — green-window use per period: [green%, mixed%, fossil%, potential%].
// Illustrative + deterministic; "potential" = if every deferrable job shifted
// to a green window (system-inferred). The improving day > week > month trend
// is the story: adoption of the scheduler is pulling the share up.
const GREEN_USE: Record<"day" | "week" | "month", { green: number; mixed: number; fossil: number; potential: number; requests: string }> = {
  day: { green: 46, mixed: 36, fossil: 18, potential: 71, requests: "84k" },
  week: { green: 42, mixed: 38, fossil: 20, potential: 68, requests: "590k" },
  month: { green: 38, mixed: 41, fossil: 21, potential: 64, requests: "2.4M" },
};

const BY_TEAM: [string, number, string][] = [
  ["R&D", 78, "782k"], ["Eng", 64, "621k"], ["Mktg", 44, "428k"], ["Ops", 28, "275k"],
];
const BY_MODEL: [string, number, string][] = [
  ["Sonnet 4.7", 62, "1.5M"], ["Haiku 4.5", 31, "744k"], ["Opus 4.7", 9, "211k"],
];

export default function DashboardMock() {
  const { simT, hour, jobs, flex, auto } = useGhSim();
  const [live, setLive] = useState(true);
  const [calls, setCalls] = useState(2_400_000);
  const [jitter, setJitter] = useState(0);
  // GH-T3-2 — green-window use, switchable period (illustrative datasets;
  // the jobs line underneath is the live Tier-2 queue)
  const [period, setPeriod] = useState<"day" | "week" | "month">("day");

  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => {
      // same hidden-tab convention as the sim clock
      if (typeof document !== "undefined" && document.hidden) return;
      setCalls((c) => c + Math.floor(40 + Math.random() * 120));
      setJitter(Math.round((Math.random() - 0.5) * 8));
    }, 900);
    return () => clearInterval(t);
  }, [live]);

  const callsLabel = (calls / 1_000_000).toFixed(2) + "M";
  // avg intensity tracks the SAME sim clock as the T1 pill. The small live
  // jitter only applies while the shared sim is running — when the T2 scheduler
  // is paused (auto=false) the pill freezes, so this must freeze to match it.
  const avg = gridAt(simT) + (live && auto ? jitter : 0);
  // "hours on green power" — a straight tally over the 24h GRID using the same
  // thresholds as the T1 indicator pill (classify() in GhSim.tsx).
  const split = gridSplit();

  return (
    <>
      <div className={s.orgBar}>
        <div className={s.orgLeft}>
          <span className={s.orgMark} />
          <span className={s.orgName}>AcmeCorp</span>
          <span className={s.orgTag}>COMPUTE FOOTPRINT</span>
        </div>
        <div className={s.orgRight}>
          <button
            className={`${s.liveBtn} ${live ? "" : s.off}`}
            onClick={() => setLive((v) => !v)}
            type="button"
            aria-pressed={live}
          >
            <span className={s.liveDot} />
            {live ? "Live" : "Paused"}
          </button>
          <span className={s.chip}>May 2026 ▾</span>
        </div>
      </div>

      <div className={s.dtitle}>Operational efficiency</div>

      <div className={s.kpiRow}>
        <div className={s.kpiCard}>
          <div className={s.kLab}>TOTAL REQUESTS</div>
          <div className={s.kFig} style={{ fontVariantNumeric: "tabular-nums" }}>{callsLabel}</div>
          <div className={`${s.kDelta} ${s.up}`}>+18% vs Apr</div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kLab}>AVG INTENSITY</div>
          <div className={s.kFig} style={{ fontVariantNumeric: "tabular-nums" }}>{avg}<span className={s.u}>g/kWh</span></div>
          <div className={`${s.kDelta} ${s.down}`}>−24% vs Apr</div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kLab}>HOURS ON GREEN POWER</div>
          <div className={s.kFig}>{split.green}<span className={s.u}>of 24h</span></div>
          <div className={s.splitBar}>
            <span className={s.splitGreen} style={{ width: `${(split.green / 24) * 100}%` }} />
            <span className={s.splitMixed} style={{ width: `${(split.mixed / 24) * 100}%` }} />
            <span className={s.splitFossil} style={{ width: `${(split.fossil / 24) * 100}%` }} />
          </div>
          <div className={`${s.kDelta} ${s.mut}`}>
            {split.green}h green · {split.mixed}h mixed · {split.fossil}h fossil-heavy
          </div>
          <div className={`${s.kDelta} ${s.mut}`}>May: 62% of compute-hours on green power · 38% not</div>
        </div>
        <div className={`${s.kpiCard} ${s.dark}`}>
          <div className={s.kLab}>EST. SCOPE 3 · MAY</div>
          <div className={s.kFig}>847<span className={s.u}>tCO₂eq</span></div>
          <div className={s.kDelta}>audit-ready · CSRD</div>
        </div>
      </div>

      {/* the cross-tier read: this is the actual Tier-2 queue, live */}
      <div className={s.flexStrip}>
        <span className={s.flexLbl}>
          FLEX SCHEDULER · {hh(hour)}:00
        </span>
        {jobs.length > 0 ? (
          <span className={s.flexVals}>
            {flex.count} job{flex.count === 1 ? "" : "s"} routed ({flex.complete} complete) · avg −{flex.avgSavePct}%
            intensity · ~{flex.gramsAvoided} g CO₂eq avoided <i>(sim)</i>
          </span>
        ) : (
          <span className={s.flexVals}>no flexible jobs in the queue; submit one on the Tier-2 scheduler</span>
        )}
      </div>

      <div className={s.chartBlock}>
        <div className={s.chartHead}>
          <span className={s.chartTitle}>CARBON INTENSITY &amp; REQUEST VOLUME · DAILY · MAY 2026</span>
          <span className={s.legend}>
            <span><span className={s.swA}>▮</span> intensity</span>
            <span><span className={s.swV}>▮</span> volume</span>
          </span>
        </div>
        <svg viewBox="0 0 960 165" style={{ width: "100%", height: "138px", display: "block" }} aria-hidden="true">
          {[150, 110, 70, 30].map((y) => (
            <line key={y} className="ghs-line" x1="0" y1={y} x2="960" y2={y} strokeWidth="0.5" strokeDasharray={y === 150 ? undefined : "2 4"} />
          ))}
          {DAYS.map(([v, inten], i) => {
            const x = X0 + i * STEP;
            const vh = v * MAXH;
            const ih = inten * MAXH;
            return (
              <g key={i}>
                <rect className="ghd-navy" x={x} y={BASE - vh} width="22" height={vh} opacity="0.32" />
                <rect className="ghd-amber" x={x + 7} y={BASE - ih} width="9" height={ih} opacity="0.92" />
              </g>
            );
          })}
          <text className="ghf-mono ghd-soft" x="8" y="163" fontSize="8">may 1</text>
          <text className="ghf-mono ghd-soft" x="952" y="163" textAnchor="end" fontSize="8">may 31</text>
        </svg>
        <div className={s.antirebound}>
          <b>Anti-rebound view:</b> intensity is falling, but volume is rising. Both
          are surfaced so efficiency cannot disguise growth.
        </div>
      </div>

      {/* GH-T3-2 — how much of the load actually ran while the grid was green,
          switchable day/week/month, plus used-vs-potential (system-inferred) */}
      <div className={s.chartBlock}>
        <div className={s.chartHead}>
          <span className={s.chartTitle}>GREEN WINDOW USE · {period.toUpperCase()}</span>
          <span className={s.perBtns} role="group" aria-label="Green window use period">
            {(["day", "week", "month"] as const).map((p) => (
              <button
                key={p}
                type="button"
                className={`${s.perBtn} ${period === p ? s.perOn : ""}`}
                aria-pressed={period === p}
                onClick={() => setPeriod(p)}
              >
                {p === "day" ? "Daily" : p === "week" ? "Weekly" : "Monthly"}
              </button>
            ))}
          </span>
        </div>
        <div className={s.gwHead}>
          <b>{GREEN_USE[period].green}%</b> of {GREEN_USE[period].requests} requests ran while
          the grid was green
        </div>
        <div className={`${s.splitBar} ${s.gwBar}`}>
          <span className={s.splitGreen} style={{ width: `${GREEN_USE[period].green}%` }} />
          <span className={s.splitMixed} style={{ width: `${GREEN_USE[period].mixed}%` }} />
          <span className={s.splitFossil} style={{ width: `${GREEN_USE[period].fossil}%` }} />
        </div>
        <div className={`${s.kDelta} ${s.mut}`}>
          {GREEN_USE[period].green}% green · {GREEN_USE[period].mixed}% mixed ·{" "}
          {GREEN_USE[period].fossil}% fossil-heavy
        </div>
        <div className={s.gwLive}>
          {flex.count > 0
            ? `${flex.count} flexible job${flex.count === 1 ? "" : "s"} routed to green windows · ${flex.complete} complete (sim)`
            : "no flexible jobs yet; the Tier-2 scheduler feeds this number"}
        </div>
        <div className={s.vsBlock}>
          <div className={s.vsRow}>
            <span className={s.vsLbl}>ran in green windows</span>
            <span className={s.vsTrack}>
              <span className={s.vsFill} style={{ width: `${GREEN_USE[period].green}%` }} />
            </span>
            <span className={s.vsVal}>{GREEN_USE[period].green}%</span>
          </div>
          <div className={s.vsRow}>
            <span className={s.vsLbl}>potential</span>
            <span className={s.vsTrack}>
              <span className={`${s.vsFill} ${s.vsPot}`} style={{ width: `${GREEN_USE[period].potential}%` }} />
            </span>
            <span className={s.vsVal}>{GREEN_USE[period].potential}%</span>
          </div>
          <div className={`${s.kDelta} ${s.mut}`}>
            potential = every deferrable job shifted to a green window, inferred by the
            system <i>(sim · illustrative)</i>
          </div>
        </div>
      </div>

      <div className={s.breakdown}>
        <div>
          <div className={s.bdLbl}>BY TEAM</div>
          {BY_TEAM.map(([name, pct, val]) => (
            <div key={name} className={s.bdRow}>
              <span>{name}</span>
              <span className={s.track}><span className={s.fillA} style={{ width: `${pct}%` }} /></span>
              <span className={s.val}>{val}</span>
            </div>
          ))}
        </div>
        <div>
          <div className={s.bdLbl}>BY MODEL</div>
          {BY_MODEL.map(([name, pct, val]) => (
            <div key={name} className={s.bdRow}>
              <span>{name}</span>
              <span className={s.track}><span className={s.fillV} style={{ width: `${pct}%` }} /></span>
              <span className={s.val}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
