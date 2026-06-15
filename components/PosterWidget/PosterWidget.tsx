"use client";

import { useState } from "react";
import { POSTER_FOOTNOTE } from "@/lib/housingWorks";
import styles from "./PosterWidget.module.css";

type Choice = "Hybrid" | "In-person" | "Remote";

// Real collected result (honest payoff — differs from the headline on purpose).
const REAL_RESULTS: { label: Choice; pct: number; count: number }[] = [
  { label: "Hybrid", pct: 52, count: 16 },
  { label: "In-person", pct: 23, count: 7 },
  { label: "Remote", pct: 6, count: 2 },
];

const REAL_QUOTES = [
  "Hybrid work for life: no micromanagement = freedom to work",
  "I love HYBRID",
  "money is the motivation.",
];

export default function PosterWidget() {
  // Ephemeral only — resets on reload. No datastore, no <form>.
  const [choice, setChoice] = useState<Choice | null>(null);

  return (
    <div className={styles.widget}>
      <div className={styles.poster}>
        <div className={styles.posterTop} aria-hidden="true" />
        <div className={styles.posterBody}>
          <span className={`mono ${styles.kicker}`}>Poster survey · recreation</span>
          <p className={styles.headline}>
            72% of Gen Z<br />prefer <em>hybrid</em>
          </p>
          <p className={`mono ${styles.subStat}`}>vs 16% remote · 12% in-person</p>

          <p className={styles.prompt}>How do you prefer to work?</p>

          <div className={styles.chips} role="group" aria-label="How do you prefer to work?">
            {(["Hybrid", "In-person", "Remote"] as Choice[]).map((c) => (
              <button
                key={c}
                type="button"
                className={`${styles.chip} ${choice === c ? styles.chipActive : ""}`}
                aria-pressed={choice === c}
                onClick={() => setChoice(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {choice && (
            <p className={styles.sticky} role="status">
              <span className={styles.stickyTape} aria-hidden="true" />
              You picked <strong>{choice}</strong>
            </p>
          )}
        </div>
      </div>

      {/* Honest payoff — only after the visitor participates */}
      {choice && (
        <div className={styles.reveal}>
          <p className={`mono ${styles.revealLabel}`}>What people actually wrote</p>
          <p className={styles.revealLede}>
            Of 31 responses on this poster: <strong>52% hybrid, 23% in-person,
            6% remote</strong> (16 / 7 / 2).
          </p>

          <ul className={styles.bars}>
            {REAL_RESULTS.map((r) => (
              <li key={r.label} className={styles.barRow}>
                <span className={`mono ${styles.barLabel}`}>{r.label}</span>
                <span className={styles.barTrack}>
                  <span className={styles.barFill} style={{ width: `${r.pct}%` }} />
                </span>
                <span className={`mono ${styles.barPct}`}>
                  {r.pct}% · {r.count}
                </span>
              </li>
            ))}
          </ul>

          <ul className={styles.quotes}>
            {REAL_QUOTES.map((q) => (
              <li key={q} className={styles.quote}>
                “{q}”
              </li>
            ))}
          </ul>

          <p className={`cap ${styles.gap}`}>
            The claim pulled people in; here&apos;s what they actually wrote — the
            gap is the methods insight, not a number to fudge.
          </p>
        </div>
      )}

      <p className={`cap ${styles.footnote}`}>{POSTER_FOOTNOTE}</p>
    </div>
  );
}
