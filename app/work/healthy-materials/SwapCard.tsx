"use client";

import { useState } from "react";
import styles from "./SwapCard.module.css";

/**
 * Healthy Materials Packages — the swap card (spec §5).
 * The one interactive element on the page. It proves the thesis physically:
 * pick a room scope, watch a conventional spec swap to a healthier one, and see
 * the trade-off — cost HOLDS while carbon drops and health improves.
 *
 * Honesty is designed in: it shows DIRECTION ONLY, never invented figures, and
 * carries an inline "concept prototype · directional · not measured data" label.
 * The three directional reads are constant across scopes — that's the honest
 * general claim from the research; only the material pair + pitch line change.
 *
 * Default state = `unit` and is pre-rendered, so it is correct before JS runs.
 * Reduced motion is honored globally (globals.css zeroes the swap animation).
 */

type Scope = {
  id: string;
  label: string;
  conventional: string;
  healthy: string;
  /** the pitch the package makes — directional, NOT lab-verified */
  pitch: string;
};

const SCOPES: Scope[] = [
  {
    id: "unit",
    label: "unit renovation",
    conventional: "Vinyl (LVT) flooring",
    healthy: "Linoleum / bio-based resilient floor",
    pitch:
      "Resilient bio-based floors target the same wear and cleanability LVT is chosen for — so the swap can survive value engineering.",
  },
  {
    id: "corridor",
    label: "corridor",
    conventional: "PVC wall protection",
    healthy: "Recycled / bio-based wall panel",
    pitch:
      "High-traffic corridors need durability; recycled and bio-based panels aim for it with far lower embodied carbon.",
  },
  {
    id: "bathroom",
    label: "bathroom",
    conventional: "Standard gypsum + vinyl wrap",
    healthy: "Mineral board + natural finish",
    pitch:
      "Mineral boards handle moisture without the off-gassing of vinyl-wrapped assemblies.",
  },
];

// The three directional reads stay constant across scopes (spec §5).
const READS = [
  { label: "Cost", value: "= comparable", tone: "neutral" as const },
  { label: "Carbon", value: "↓ lower", tone: "good" as const },
  { label: "Health", value: "↑ better", tone: "good" as const },
];

export default function SwapCard() {
  const [activeId, setActiveId] = useState(SCOPES[0].id);
  const scope = SCOPES.find((s) => s.id === activeId) ?? SCOPES[0];

  return (
    <section className={styles.card} aria-label="Healthy Materials Packages — interactive spec swap">
      {/* sr-only running summary, kept in sync for assistive tech */}
      <p className={styles.srOnly}>
        For a {scope.label} scope, the package swaps {scope.conventional} for{" "}
        {scope.healthy}. Cost stays comparable while carbon is lower and health is
        better — directional, not measured.
      </p>

      <header className={styles.head}>
        <span className={styles.headLabel}>scope</span>
        <span className={styles.headHint} aria-hidden="true">
          tap to switch
        </span>
      </header>

      {/* scope chips — single-select toggle */}
      <div className={styles.chips} role="group" aria-label="Choose a room scope">
        {SCOPES.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`${styles.chip} ${s.id === activeId ? styles.chipActive : ""}`}
            aria-pressed={s.id === activeId}
            onClick={() => setActiveId(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* swap block — re-keyed so the smooth enter transition replays on switch */}
      <div className={styles.swap} key={scope.id}>
        <div className={styles.swapRow}>
          <span className={`mono ${styles.swapTag}`}>conventional</span>
          <span className={styles.conventional}>{scope.conventional}</span>
        </div>
        <div className={styles.arrow} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path
              d="M12 4v16M12 20l-6-6M12 20l6-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.swapRow}>
          <span className={`mono ${styles.swapTag}`}>healthy swap</span>
          <span className={styles.healthy}>{scope.healthy}</span>
        </div>

        <p className={styles.pitch}>
          <span className={`mono ${styles.pitchLabel}`}>why it&apos;s defensible</span>
          {scope.pitch}
        </p>
      </div>

      {/* directional indicators — full-width stacked rows (constant) */}
      <ul className={styles.reads}>
        {READS.map((r) => (
          <li key={r.label} className={styles.read}>
            <span className={`mono ${styles.readLabel}`}>{r.label}</span>
            <span
              className={`mono ${styles.readValue} ${
                r.tone === "good" ? styles.readGood : styles.readNeutral
              }`}
            >
              {r.value}
            </span>
          </li>
        ))}
      </ul>

      <p className={`mono ${styles.honesty}`}>
        concept prototype · directional vs business-as-usual · not measured data
      </p>
    </section>
  );
}
