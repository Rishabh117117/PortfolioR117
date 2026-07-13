"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  PKG_PROJECT,
  PKG_SCOPES,
  PKG_HONESTY,
  packageTotals,
  assistantContext,
  matchSpecText,
  SAMPLE_SPEC,
  fmtUSD,
  fmtCarbon,
  type PackageLine,
  type PackageScope,
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
 * sheet, and ask the built-in assistant (live model via /api/ask). "Start
 * from your spec" runs a pasted finish schedule through the same 20-line
 * library via lib/hmPackages' keyword matcher, producing a synthetic
 * "Your spec" scope that flows through every existing mechanism unchanged.
 *
 * All figures are illustrative — the honesty strip below the app says so.
 */

const CUSTOM_SCOPE_ID = "custom";

/** Which of the 4-step process the app is currently on, derived from state
 * rather than tracked separately — the strip narrates the flow, it doesn't
 * drive it. */
type ProcessStep = 1 | 2 | 3 | 4;

const PROCESS_STEPS: { n: ProcessStep; label: string }[] = [
  { n: 1, label: "Add your spec" },
  { n: 2, label: "Review the swaps" },
  { n: 3, label: "Stress-test cost" },
  { n: 4, label: "Export" },
];

const VOC_LABEL: Record<VocClass, string> = {
  high: "high VOC",
  moderate: "mod VOC",
  low: "low VOC",
  none: "zero VOC",
};

/* ---- mobile app-shell icons (≤719px bottom tab bar) ---- */
const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
function IconLines() {
  return (
    <svg {...svgProps} aria-hidden="true">
      <path d="M8 6h12M8 12h12M8 18h12" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" />
    </svg>
  );
}
function IconSummary() {
  return (
    <svg {...svgProps} aria-hidden="true">
      <path d="M6 20V10M12 20V5M18 20v-8" />
      <path d="M3.5 20h17" />
    </svg>
  );
}
function IconAsk() {
  return (
    <svg {...svgProps} aria-hidden="true">
      <path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3.5V6a1 1 0 0 1 1-1Z" />
      <path d="M9 10h6M9 12.5h4" />
    </svg>
  );
}

/** Compact mono strip narrating the full "spec in, healthier spec out"
 * process — subtle by design, current step picked out in the accent. */
function ProcessStrip({ current }: { current: ProcessStep }) {
  return (
    <ol className={s.process} aria-label="Process">
      {PROCESS_STEPS.map((step, i) => (
        <li key={step.n} className={`${s.processStep} ${step.n === current ? s.processOn : ""}`}>
          {i > 0 && (
            <span className={s.processArrow} aria-hidden="true">
              →
            </span>
          )}
          <span className={s.processNo}>{String(step.n).padStart(2, "0")}</span>
          <span className={s.processLabel}>{step.label}</span>
        </li>
      ))}
    </ol>
  );
}

/**
 * "Start from your spec" intake — a view, not a modal (Esc is deliberately
 * not wired to close it; the parent's process strip, the mobile Lines tab,
 * and the intake's own skip link are the way in/out). Replaces the lines
 * list in the main region while open — including on mount, since the app
 * now opens here by default. Focus moves to the heading on open, matching
 * the app's other a11y conventions (useModalA11y's autoFocus behavior,
 * applied manually here since this surface isn't a dialog); scroll is left
 * alone so mounting on page load can't yank the viewport down to the app.
 */
function SpecIntake({
  onSubmit,
  onSkip,
}: {
  /** Runs the match; returns the count of unmatched rows if the app should
   * stay on intake (zero matches — nothing to route to), or null if it
   * matched at least one line and the parent has switched to the lines view. */
  onSubmit: (text: string) => { unmatchedRows: string[]; totalRows: number } | null;
  /** Closes the intake without submitting anything — the escape hatch to the
   * pre-built packages for anyone who doesn't want to paste a spec. */
  onSkip: () => void;
}) {
  const [text, setText] = useState("");
  const [zeroMatch, setZeroMatch] = useState<{ unmatchedRows: string[]; totalRows: number } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  function submit() {
    const stillHere = onSubmit(text);
    // a non-null result means zero lines matched — the parent didn't switch
    // scopes, so stay on intake and show why (the honest no-match path).
    setZeroMatch(stillHere);
  }

  return (
    <section className={s.intake} aria-label="Start from your spec">
      <h3 className={s.intakeTitle} tabIndex={-1} ref={headingRef}>
        Start from your spec
      </h3>
      <p className={s.intakeIntro}>
        Paste your current finish schedule, one material per line. The
        system matches each line against its library of tried-and-tested
        healthier swaps.
      </p>

      <label className={s.intakeLabel} htmlFor="hm-spec-intake">
        Your finish schedule
      </label>
      <textarea
        id="hm-spec-intake"
        className={s.intakeArea}
        rows={8}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setZeroMatch(null);
        }}
        placeholder={"Flooring: luxury vinyl plank, 6mil wear layer\nPaint: conventional interior acrylic\n…"}
      />

      <div className={s.intakeActions}>
        <button
          type="button"
          className={s.intakeGhost}
          onClick={() => {
            setText(SAMPLE_SPEC);
            setZeroMatch(null);
          }}
        >
          Use a sample spec
        </button>
        <button type="button" className={s.intakePrimary} onClick={submit} disabled={!text.trim()}>
          Match against the library ▸
        </button>
        <button type="button" className={s.intakeSkip} onClick={onSkip}>
          or skip to a pre-built package ▸
        </button>
      </div>
      <p className={s.intakeHonesty}>
        Keyword matching over a 20-line illustrative library; a real system
        would parse full spec documents.
      </p>

      {zeroMatch && (
        <div className={s.intakeBanner} role="status">
          <p className={s.intakeBannerHead}>0 of {zeroMatch.totalRows} lines have a tried-and-tested healthier swap</p>
          <p className={s.intakeBannerSub}>No match yet: {zeroMatch.unmatchedRows.join(" · ")}</p>
        </div>
      )}
    </section>
  );
}

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
      aria-label={`${line.category}: ${on ? "healthy swap active" : "business as usual kept"}`}
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

      <div className={s.opts} role="group" aria-label={`${line.category}: choose specification`}>
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

  // "Start from your spec": a matched paste becomes a synthetic PackageScope
  // that flows through every mechanism below (totals/lens/export/assistant)
  // exactly like a PKG_SCOPES entry — resolveScope() is the only place that
  // needs to know it isn't one.
  const [customScope, setCustomScope] = useState<PackageScope | null>(null);
  // starts true: the app opens on "Add your spec" (the intake) rather than a
  // pre-selected package — the intake's own skip link is the way past it.
  const [intakeOpen, setIntakeOpen] = useState(true);
  const [matchBanner, setMatchBanner] = useState<{ matchedCount: number; unmatchedRows: string[]; totalRows: number } | null>(
    null,
  );

  // mobile app-shell (≤719px): a Lines/Summary view stage + a full-screen
  // "Ask" overlay. On desktop these never change — the controls that set them
  // are CSS-hidden — so the 3-region layout is untouched.
  const [mView, setMView] = useState<"lines" | "summary">("lines");
  const [askOpen, setAskOpen] = useState(false);

  // esc closes the Ask overlay (the spec-sheet modal handles its own Esc;
  // the spec intake is a view, not a modal, so Esc deliberately doesn't touch it)
  useEffect(() => {
    if (!askOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAskOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [askOpen]);

  // deep-link: /work/healthy-materials/prototype#summary opens straight to a view
  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    if (raw === "ask") setAskOpen(true);
    else if (raw === "summary") setMView("summary");
    else if (raw === "sheet") setSheetOpen(true);
  }, []);

  /** Resolves a scope id to its scope object — PKG_SCOPES for the 4 built-in
   * scopes, or the synthetic "Your spec" scope for CUSTOM_SCOPE_ID. Every
   * consumer below (totals, lens sort, <Line> rendering, export, assistant
   * context) reads the resolved object, never PKG_SCOPES directly, so a
   * custom scope needs zero special-casing past this one function. */
  const resolveScope = (id: string): PackageScope => {
    if (id === CUSTOM_SCOPE_ID && customScope) return customScope;
    return PKG_SCOPES.find((x) => x.id === id) ?? PKG_SCOPES[0];
  };

  const scope = resolveScope(scopeId);
  const totals = useMemo(() => packageTotals(scope, active), [scope, active]);
  const context = useMemo(() => assistantContext(scope, active), [scope, active]);

  const setChoice = (id: string, on: boolean) => setActive((a) => ({ ...a, [id]: on }));

  /** Scope-rail selection: switching away from "Your spec" clears the match
   * banner (it only makes sense while that scope is showing). */
  const pickScope = (id: string) => {
    setScopeId(id);
    if (id !== CUSTOM_SCOPE_ID) setMatchBanner(null);
  };

  const lines = lens
    ? [...scope.lines].sort((a, b) => (a.ve === b.ve ? 0 : a.ve === "watch" ? -1 : 1))
    : scope.lines;

  // bar widths share one denominator so BAU vs package read proportionally
  const costDen = Math.max(totals.bauCost, totals.pkgCost);
  const carbonDen = Math.max(totals.bauCarbon, totals.pkgCarbon);

  /** Runs the matcher on pasted text. Returns a "stay on intake" summary when
   * nothing matched; otherwise builds the "Your spec" scope, switches to it,
   * closes the intake, and surfaces the match banner above the lines list. */
  function handleSpecSubmit(text: string): { unmatchedRows: string[]; totalRows: number } | null {
    const { matches, unmatched } = matchSpecText(text);
    const totalRows = matches.length + unmatched.length;
    if (matches.length === 0) {
      return { unmatchedRows: unmatched, totalRows };
    }
    const next: PackageScope = {
      id: CUSTOM_SCOPE_ID,
      label: "Your spec",
      areaNote: "matched from your input",
      blurb: `${matches.length} of ${totalRows} pasted lines matched a tried-and-tested healthier swap from the library.`,
      lines: matches.map((m) => m.line),
    };
    setCustomScope(next);
    setScopeId(CUSTOM_SCOPE_ID);
    setActive({});
    setLens(false);
    setIntakeOpen(false);
    setMatchBanner({ matchedCount: matches.length, unmatchedRows: unmatched, totalRows });
    return null;
  }

  // process strip: narrates the 4-step flow from wherever state currently is
  const processStep: ProcessStep = intakeOpen ? 1 : sheetOpen ? 4 : lens ? 3 : 2;

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
          <button
            type="button"
            className={s.intakeOpenBtn}
            onClick={() => {
              setIntakeOpen(true);
              setMView("lines");
              setAskOpen(false);
            }}
          >
            ＋ Start from your spec
          </button>
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

      <ProcessStrip current={processStep} />

      <div className={s.body} data-mview={mView}>
        {/* ---------------- rail: scopes + live totals ---------------- */}
        <aside className={s.rail}>
          <nav aria-label="Package scopes">
            <p className={s.railLabel}>scopes</p>
            <ul className={s.scopeList}>
              {customScope && (
                <li key={customScope.id}>
                  <button
                    type="button"
                    className={`${s.scopeBtn} ${s.scopeCustom} ${scope.id === customScope.id ? s.scopeOn : ""}`}
                    aria-current={scope.id === customScope.id ? "true" : undefined}
                    onClick={() => pickScope(customScope.id)}
                  >
                    <span className={s.scopeName}>Your spec · {customScope.lines.length} lines</span>
                    <span className={s.scopeMeta}>{customScope.areaNote}</span>
                  </button>
                </li>
              )}
              {PKG_SCOPES.map((sc) => (
                <li key={sc.id}>
                  <button
                    type="button"
                    className={`${s.scopeBtn} ${sc.id === scope.id ? s.scopeOn : ""}`}
                    aria-current={sc.id === scope.id ? "true" : undefined}
                    onClick={() => pickScope(sc.id)}
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
            <p className={s.summaryScope}>{scope.label}</p>
            <p className={s.railLabel}>package vs BAU</p>

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
                ? "Sorted by VE exposure; defenses shown on at-risk lines."
                : "Simulate a value-engineering pass on this package."}
            </p>
          </div>
        </aside>

        {/* ---------------- main: intake OR the package lines ---------------- */}
        <section className={s.main} aria-label={intakeOpen ? "Start from your spec" : `${scope.label} package lines`}>
          {intakeOpen ? (
            <SpecIntake onSubmit={handleSpecSubmit} onSkip={() => setIntakeOpen(false)} />
          ) : (
            <>
              {/* mobile-only entry point atop the Lines tab (the topbar button
                  above works on every viewport; this is the extra affordance
                  the task calls for specifically inside the Lines view) */}
              <button type="button" className={s.mobileIntakeBtn} onClick={() => setIntakeOpen(true)}>
                ＋ Start from your spec
              </button>

              <header className={s.mainHead}>
                <h3 className={s.mainTitle}>{scope.label}</h3>
                <p className={s.mainBlurb}>{scope.blurb}</p>
              </header>

              {matchBanner && (
                <div className={s.matchBanner} role="status">
                  <p className={s.matchBannerHead}>
                    {matchBanner.matchedCount} of {matchBanner.totalRows} lines have a tried-and-tested healthier swap
                  </p>
                  {matchBanner.unmatchedRows.length > 0 && (
                    <p className={s.matchBannerSub}>No match yet: {matchBanner.unmatchedRows.join(" · ")}</p>
                  )}
                  <button type="button" className={s.matchBannerDismiss} onClick={() => setMatchBanner(null)} aria-label="Dismiss">
                    ✕
                  </button>
                </div>
              )}

              {lines.map((line) => (
                <Line key={line.id} line={line} on={active[line.id] !== false} lens={lens} setChoice={setChoice} />
              ))}
            </>
          )}
        </section>

        {/* ---------------- assistant dock ---------------- */}
        <PackagesAssistant
          context={context}
          scopeLabel={scope.label}
          className={askOpen ? s.assistMobileOpen : undefined}
        />
      </div>

      <div className={s.honesty}>
        <span>{PKG_HONESTY}</span>
        <span className={s.honestyRight}>assistant runs on a live model API via a server-side proxy</span>
      </div>

      {/* ---------------- mobile app-shell: bottom tab bar ---------------- */}
      <nav className={s.mobileTabBar} aria-label="Package views">
        <button
          type="button"
          className={`${s.mobileTab} ${!askOpen && mView === "lines" ? s.mobileTabOn : ""}`}
          aria-current={!askOpen && mView === "lines" ? "page" : undefined}
          onClick={() => {
            setMView("lines");
            setAskOpen(false);
          }}
        >
          <IconLines />
          <span className={s.mobileTabLabel}>Lines</span>
        </button>
        <button
          type="button"
          className={`${s.mobileTab} ${!askOpen && mView === "summary" ? s.mobileTabOn : ""}`}
          aria-current={!askOpen && mView === "summary" ? "page" : undefined}
          onClick={() => {
            setMView("summary");
            setAskOpen(false);
          }}
        >
          <IconSummary />
          <span className={s.mobileTabLabel}>Summary</span>
        </button>
        <button
          type="button"
          className={`${s.mobileTab} ${askOpen ? s.mobileTabOn : ""}`}
          aria-current={askOpen ? "page" : undefined}
          onClick={() => setAskOpen((o) => !o)}
        >
          <IconAsk />
          <span className={s.mobileTabLabel}>Ask</span>
        </button>
      </nav>

      {sheetOpen && <SpecSheetModal scope={scope} active={active} totals={totals} onClose={() => setSheetOpen(false)} />}
    </div>
  );
}
