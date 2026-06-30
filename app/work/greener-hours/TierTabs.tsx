"use client";

import { useState } from "react";
import {
  TIERS,
  TIER1_PRINCIPLES,
  TIER2_PRINCIPLES,
  TIER3_PRINCIPLES,
  CARBON_PILL,
  type Principle,
} from "@/lib/greenerHours";
import ComputeWindowMock from "./ComputeWindowMock";
import SchedulerMock from "./SchedulerMock";
import DashboardMock from "./DashboardMock";
import s from "./TierTabs.module.css";

/**
 * §The product — the three surfaces in a tabbed panel. One tab per tier; the
 * active tab shows that tier's brief + principles (left) and its full mockup
 * (right). Client component (tab state); keyboard-navigable tablist.
 */

const PRINCIPLES: Principle[][] = [TIER1_PRINCIPLES, TIER2_PRINCIPLES, TIER3_PRINCIPLES];
const MOCKS = [ComputeWindowMock, SchedulerMock, DashboardMock];
const NOTES = [
  <>
    Two placements — the topbar pill + a persistent status strip. Illustrative
    interface; the {CARBON_PILL.value} {CARBON_PILL.unit} value is sample data.
  </>,
  <>Borrows EV-charging UX — one toggle, deadline-driven. <em>↓ 56% cleaner</em> in the sample run.</>,
  <>Procurement-ready — slots into existing BI workflows. The anti-rebound view is the credibility marker.</>,
];

export default function TierTabs() {
  const [active, setActive] = useState(0);
  const tier = TIERS[active];
  const Mock = MOCKS[active];

  // roving keyboard nav (WAI-ARIA tabs): arrows move + select, Home/End jump.
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = TIERS.length - 1;
    let next = active;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <div>
      <div className={s.tabs} role="tablist" aria-label="The three surfaces" onKeyDown={onKeyDown}>
        {TIERS.map((t, i) => (
          <button
            key={t.n}
            role="tab"
            id={`gh-tab-${i}`}
            aria-selected={active === i}
            aria-controls="gh-panel"
            tabIndex={active === i ? 0 : -1}
            className={s.tab}
            onClick={() => setActive(i)}
            type="button"
          >
            <span className={s.tabNum}>TIER {t.n} · {t.role.toUpperCase()}</span>
            <span className={s.tabName}>{t.name}</span>
          </button>
        ))}
      </div>

      <div
        className={s.panel}
        role="tabpanel"
        id="gh-panel"
        aria-labelledby={`gh-tab-${active}`}
      >
        <div>
          <div className={s.tierNum}>{tier.n}</div>
          <div className={s.tierRole}>{tier.role} layer</div>
          <h3 className={s.tierName}>{tier.name}</h3>
          <p className={s.tierJob}>{tier.job}</p>
          <div className={s.principleList}>
            {PRINCIPLES[active].map((p) => (
              <div key={p.code} className={s.pRow}>
                <span className={`${s.pCode} ${p.kind === "anchor" ? s.anchor : ""}`}>
                  {p.code}
                </span>
                <div>
                  <div className={s.pName}>{p.name}</div>
                  <div className={s.pInsight}>{p.insight}</div>
                </div>
              </div>
            ))}
          </div>
          <p className={s.note}>{NOTES[active]}</p>
        </div>
        <div>
          <Mock />
        </div>
      </div>
    </div>
  );
}
