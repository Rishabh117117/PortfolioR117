"use client";

import { useEffect, useState } from "react";
import "./diagrams.css";
import s from "./TierMocks.module.css";

/**
 * §Tier 3 — Compute Footprint Dashboard (deck slide 10), now LIVE. The KPI
 * counters tick while LIVE is on; the anti-rebound chart pairs falling intensity
 * (amber) with rising volume (navy) so efficiency can't disguise growth.
 */

// 24 days · [volume 0-1 (rising), intensity 0-1 (falling)] — deterministic
const DAYS: [number, number][] = [
  [0.40, 0.85], [0.43, 0.96], [0.38, 0.80], [0.50, 0.79], [0.46, 0.92], [0.22, 0.90],
  [0.26, 0.73], [0.43, 0.84], [0.55, 0.71], [0.50, 0.70], [0.62, 0.80], [0.47, 0.83],
  [0.28, 0.71], [0.38, 0.82], [0.68, 0.62], [0.69, 0.78], [0.64, 0.58], [0.61, 0.57],
  [0.72, 0.58], [0.37, 0.67], [0.62, 0.66], [0.70, 0.58], [0.78, 0.53], [0.74, 0.50],
];
const BASE = 150, TOP = 12, MAXH = BASE - TOP, STEP = 39, X0 = 8;

const TABS = ["Operational efficiency", "Supply chain", "Cost-of-compute", "Teams"];
const BY_TEAM: [string, number, string][] = [
  ["R&D", 78, "782k"], ["Eng", 64, "621k"], ["Mktg", 44, "428k"], ["Ops", 28, "275k"],
];
const BY_MODEL: [string, number, string][] = [
  ["Sonnet 4.7", 62, "1.5M"], ["Haiku 4.5", 31, "744k"], ["Opus 4.7", 9, "211k"],
];

export default function DashboardMock() {
  const [live, setLive] = useState(true);
  const [calls, setCalls] = useState(2_400_000);
  const [avg, setAvg] = useState(312);

  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => {
      setCalls((c) => c + Math.floor(40 + Math.random() * 120));
      setAvg((a) => Math.max(180, Math.min(340, Math.round(a + (Math.random() - 0.5) * 6))));
    }, 900);
    return () => clearInterval(t);
  }, [live]);

  const callsLabel = (calls / 1_000_000).toFixed(2) + "M";

  return (
    <div className={s.frame}>
      <div className={s.chrome}>
        <span className={s.dot} />
        <span className={s.dot} />
        <span className={s.dot} />
        <span className={s.url}>↻ console.ai/footprint/acmecorp</span>
      </div>

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

      <div className={s.dtabs}>
        {TABS.map((t, i) => (
          <span key={t} className={`${s.dtab} ${i === 0 ? s.on : ""}`}>{t}</span>
        ))}
      </div>

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
          <div className={s.kLab}>PEAK INTENSITY</div>
          <div className={s.kFig}>578<span className={s.u}>g/kWh</span></div>
          <div className={`${s.kDelta} ${s.mut}`}>May 14 · 14:00 ET</div>
        </div>
        <div className={`${s.kpiCard} ${s.dark}`}>
          <div className={s.kLab}>EST. SCOPE 3 · MAY</div>
          <div className={s.kFig}>847<span className={s.u}>tCO₂eq</span></div>
          <div className={s.kDelta}>audit-ready · CSRD</div>
        </div>
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
          <b>Anti-rebound view:</b> intensity is falling, but volume is rising — both
          surfaced so efficiency cannot disguise growth.
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
    </div>
  );
}
