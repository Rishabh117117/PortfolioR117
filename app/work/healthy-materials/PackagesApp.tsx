"use client";

import { useMemo, useState } from "react";
import {
  PKG_PROJECT,
  PKG_SCOPES,
  PKG_HONESTY,
  packageTotals,
  assistantContext,
  fmtUSD,
  fmtCarbon,
  type PackageLine,
  type VocClass,
} from "@/lib/hmPackages";
import PackagesAssistant from "./PackagesAssistant";
import SpecSheetModal from "./SpecSheetModal";
import s from "./PackagesApp.module.css";

/**
 * Healthy Materials Packages — the working prototype (§9 of the page + the
 * /prototype route). A browser-framed slice of the product: pick a scope,
 * accept or reject each healthy swap, watch cost / carbon / health totals
 * recompute, stress the package with the cost-pressure lens, export the spec
 * sheet, and ask the built-in assistant (live model via /api/ask).
 *
 * All figures are illustrative — the honesty strip below the app says so.
 */

const VOC_LABEL: Record<VocClass, string> = {
  high: "high VOC",
  moderate: "mod VOC",
  low: "low VOC",
  none: "zero VOC",
};

function OptionTile({
  kind,
  line,
  activeSide,
  onPick,
}: {
  kind: "bau" | "swap";
  line: PackageLine;
  activeSide: "bau" | "swap";
  onPick: () => void;
}) {
  const opt = kind === "bau" ? line.bau : line.swap;
  const isOn = activeSide === kind;
  return (
    <button
      type="button"
      className={`${s.opt} ${isOn ? s.optOn : ""} ${kind === "swap" ? s.optSwap : ""}`}
      aria-pressed={isOn}
      onClick={onPick}
    >
      <span className={s.optTag}>
        {kind === "bau" ? "business as usual" : "healthy swap"}
        {isOn && <span className={s.optIn}>✓ in package</span>}
      </span>
      <span className={s.optName}>{opt.name}</span>
      <span className={s.optDetail}>{opt.detail}</span>
      <span className={s.optNums}>
        <span>
          ${opt.unitCost}/{line.unit}
        </span>
        <span className={s.optDot}>·</span>
        <span>
          {opt.carbon} kg/{line.unit}
        </span>
        <span className={`${s.voc} ${s[`voc_${opt.voc}`]}`}>{VOC_LABEL[opt.voc]}</span>
      </span>
    </button>
  );
}

function Line({
  line,
  on,
  lens,
  setChoice,
}: {
  line: PackageLine;
  on: boolean;
  lens: boolean;
  setChoice: (id: string, on: boolean) => void;
}) {
  const costDelta = (line.swap.unitCost - line.bau.unitCost) * line.qty;
  const carbonPct = ((line.swap.carbon - line.bau.carbon) / line.bau.carbon) * 100;
  const watch = line.ve === "watch";
  return (
    <article
      className={`${s.line} ${lens && watch && on ? s.lineWatch : ""}`}
      aria-label={`${line.category} — ${on ? "healthy swap active" : "business as usual kept"}`}
    >
      <header className={s.lineHead}>
        <div>
          <span className={s.lineCat}>{line.category}</span>
          <span className={s.lineNote}>
            {line.scopeNote} · {line.qty.toLocaleString("en-US")} {line.unit}
          </span>
        </div>
        <span className={`${s.veChip} ${watch ? s.veWatch : s.veSafe}`}>
          {watch ? "VE watch" : "VE-safe"}
        </span>
      </header>

      <div className={s.opts} role="group" aria-label={`${line.category} — choose specification`}>
        <OptionTile kind="bau" line={line} activeSide={on ? "swap" : "bau"} onPick={() => setChoice(line.id, false)} />
        <span className={s.optArrow} aria-hidden="true">
          →
        </span>
        <OptionTile kind="swap" line={line} activeSide={on ? "swap" : "bau"} onPick={() => setChoice(line.id, true)} />
      </div>

      <footer className={s.lineFoot}>
        <div className={s.deltas}>
          <span className={`${s.delta} ${costDelta <= 0 ? s.good : s.neutral}`}>
            {costDelta >= 0 ? "+" : "−"}
            {fmtUSD(Math.abs(costDelta))} first cost
          </span>
          <span className={`${s.delta} ${s.good}`}>{Math.round(carbonPct)}% carbon</span>
          <span className={s.meta}>
            {line.suppliers} regional suppliers · lead {line.lead}
          </span>
        </div>
        <div className={s.certs}>
          {line.certs.map((c) => (
            <span key={c} className={s.cert}>
              {c}
            </span>
          ))}
        </div>
        {lens && watch ? (
          <p className={s.defenseOpen}>
            <span className={s.defenseLabel}>why it holds</span>
            {line.defense} <span className={s.egc}>{line.egc}</span>
          </p>
        ) : (
          <details className={s.defense}>
            <summary>Why it holds</summary>
            <p>
              {line.defense} <span className={s.egc}>{line.egc}</span>
            </p>
          </details>
        )}
      </footer>
    </article>
  );
}

export default function PackagesApp() {
  const [scopeId, setScopeId] = useState(PKG_SCOPES[0].id);
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [lens, setLens] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const scope = PKG_SCOPES.find((x) => x.id === scopeId) ?? PKG_SCOPES[0];
  const totals = useMemo(() => packageTotals(scope, active), [scope, active]);
  const context = useMemo(() => assistantContext(scope, active), [scope, active]);

  const setChoice = (id: string, on: boolean) => setActive((a) => ({ ...a, [id]: on }));

  const lines = lens
    ? [...scope.lines].sort((a, b) => (a.ve === b.ve ? 0 : a.ve === "watch" ? -1 : 1))
    : scope.lines;

  // bar widths share one denominator so BAU vs package read proportionally
  const costDen = Math.max(totals.bauCost, totals.pkgCost);
  const carbonDen = Math.max(totals.bauCarbon, totals.pkgCarbon);

  return (
    <div className={s.frame}>
      {/* browser chrome */}
      <div className={s.chrome} aria-hidden="true">
        <span className={s.dot} />
        <span className={s.dot} />
        <span className={s.dot} />
        <span className={s.url}>↻ {PKG_PROJECT.url}</span>
      </div>

      {/* app topbar */}
      <div className={s.topbar}>
        <div className={s.brand}>
          <span className={s.brandMark} aria-hidden="true" />
          <span className={s.brandName}>
            HM Packages<sup className={s.brandSup}>concept</sup>
          </span>
        </div>
        <div className={s.project}>
          <span className={s.projectName}>{PKG_PROJECT.name}</span>
          <span className={s.projectMeta}>{PKG_PROJECT.meta}</span>
        </div>
        <span className={s.egcBadge}>{PKG_PROJECT.standard}</span>
        <div className={s.topActions}>
          <span
            className={`${s.topDelta} ${totals.costDeltaPct <= 3.5 ? s.topDeltaOk : s.topDeltaWarn}`}
            title="Package first cost vs business-as-usual"
          >
            {totals.costDelta >= 0 ? "+" : ""}
            {totals.costDeltaPct.toFixed(1)}% vs BAU
          </span>
          <button type="button" className={s.exportBtn} onClick={() => setSheetOpen(true)}>
            Export spec
          </button>
        </div>
      </div>

      <div className={s.body}>
        {/* ---------------- rail: scopes + live totals ---------------- */}
        <aside className={s.rail}>
          <nav aria-label="Package scopes">
            <p className={s.railLabel}>scopes</p>
            <ul className={s.scopeList}>
              {PKG_SCOPES.map((sc) => (
                <li key={sc.id}>
                  <button
                    type="button"
                    className={`${s.scopeBtn} ${sc.id === scope.id ? s.scopeOn : ""}`}
                    aria-current={sc.id === scope.id ? "true" : undefined}
                    onClick={() => setScopeId(sc.id)}
                  >
                    <span className={s.scopeName}>{sc.label}</span>
                    <span className={s.scopeMeta}>
                      {sc.lines.length} lines · {sc.areaNote}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className={s.totals} aria-live="polite">
            <p className={s.railLabel}>package vs bau</p>

            <div className={s.stat}>
              <div className={s.statTop}>
                <span className={s.statName}>First cost</span>
                <span className={`${s.statVal} ${totals.costDeltaPct <= 3.5 ? s.statOk : s.statWarn}`}>
                  {totals.costDelta >= 0 ? "+" : ""}
                  {totals.costDeltaPct.toFixed(1)}%
                </span>
              </div>
              <div className={s.bars}>
                <span className={s.barBau} style={{ width: `${(totals.bauCost / costDen) * 100}%` }} />
                <span className={s.barPkg} style={{ width: `${(totals.pkgCost / costDen) * 100}%` }} />
              </div>
              <span className={s.statSub}>
                {fmtUSD(totals.pkgCost)} vs {fmtUSD(totals.bauCost)}
              </span>
            </div>

            <div className={s.stat}>
              <div className={s.statTop}>
                <span className={s.statName}>Embodied carbon</span>
                <span className={`${s.statVal} ${s.statOk}`}>{Math.round(totals.carbonDeltaPct)}%</span>
              </div>
              <div className={s.bars}>
                <span className={s.barBau} style={{ width: `${(totals.bauCarbon / carbonDen) * 100}%` }} />
                <span className={s.barPkg} style={{ width: `${(totals.pkgCarbon / carbonDen) * 100}%` }} />
              </div>
              <span className={s.statSub}>
                {fmtCarbon(totals.pkgCarbon)} vs {fmtCarbon(totals.bauCarbon)} CO₂e
              </span>
            </div>

            <div className={s.statRow}>
              <span className={s.statName}>VOC sources cleared</span>
              <span className={s.statVal}>
                {totals.healthCleared}/{totals.healthFlags}
              </span>
            </div>
            <div className={s.statRow}>
              <span className={s.statName}>Swaps active</span>
              <span className={s.statVal}>
                {totals.swapsOn}/{totals.lineCount}
              </span>
            </div>
            <div className={s.statRow}>
              <span className={s.statName}>On VE watch</span>
              <span className={`${s.statVal} ${totals.veWatch ? s.statWarn : ""}`}>{totals.veWatch}</span>
            </div>

            <label className={s.lens}>
              <input type="checkbox" checked={lens} onChange={(e) => setLens(e.target.checked)} />
              <span>Cost-pressure lens</span>
            </label>
            <p className={s.lensHint}>
              {lens
                ? "Sorted by VE exposure — defenses shown on at-risk lines."
                : "Simulate a value-engineering pass on this package."}
            </p>
          </div>
        </aside>

        {/* ---------------- main: the package lines ---------------- */}
        <section className={s.main} aria-label={`${scope.label} package lines`}>
          <header className={s.mainHead}>
            <h3 className={s.mainTitle}>{scope.label}</h3>
            <p className={s.mainBlurb}>{scope.blurb}</p>
          </header>
          {lines.map((line) => (
            <Line key={line.id} line={line} on={active[line.id] !== false} lens={lens} setChoice={setChoice} />
          ))}
        </section>

        {/* ---------------- assistant dock ---------------- */}
        <PackagesAssistant context={context} scopeLabel={scope.label} />
      </div>

      <div className={s.honesty}>
        <span>{PKG_HONESTY}</span>
        <span className={s.honestyRight}>assistant runs on a live model API via a server-side proxy</span>
      </div>

      {sheetOpen && <SpecSheetModal scope={scope} active={active} totals={totals} onClose={() => setSheetOpen(false)} />}
    </div>
  );
}
