"use client";

import { useState } from "react";
import {
  TIERS,
  TIER1_PRINCIPLES,
  TIER2_PRINCIPLES,
  TIER3_PRINCIPLES,
  type Principle,
} from "@/lib/greenerHours";
import ComputeWindowMock from "./ComputeWindowMock";
import SchedulerMock from "./SchedulerMock";
import DashboardMock from "./DashboardMock";
import s from "./TierTabs.module.css";

/**
 * §The product — the three surfaces in a tabbed panel. One tab per tier; the
 * active tab shows a compact brief + principle chips and the tier's full-width
 * LIVE surface (chat / scheduler / dashboard). Client component; WAI-ARIA
 * tablist with roving-tabindex keyboard nav.
 */

const PRINCIPLES: Principle[][] = [TIER1_PRINCIPLES, TIER2_PRINCIPLES, TIER3_PRINCIPLES];
const MOCKS = [ComputeWindowMock, SchedulerMock, DashboardMock];

export default function TierTabs() {
  const [active, setActive] = useState(0);
  const tier = TIERS[active];
  const Mock = MOCKS[active];

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

      <div className={s.panel} role="tabpanel" id="gh-panel" aria-labelledby={`gh-tab-${active}`}>
        <div className={s.brief}>
          <span className={s.tierNum}>{tier.n}</span>
          <div className={s.briefText}>
            <div className={s.tierRole}>{tier.role} layer</div>
            <h3 className={s.tierName}>{tier.name}</h3>
            <p className={s.tierJob}>{tier.job}</p>
          </div>
          <div className={s.principles}>
            {PRINCIPLES[active].map((p) => (
              <span
                key={p.code}
                className={`${s.pchip} ${p.kind === "anchor" ? s.anchor : ""}`}
                title={p.insight}
              >
                <b>{p.code}</b> {p.name}
              </span>
            ))}
          </div>
        </div>
        <div className={s.surface}>
          <Mock />
        </div>
      </div>
    </div>
  );
}
