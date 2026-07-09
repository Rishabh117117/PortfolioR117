"use client";

import { useState } from "react";
import { gridAt, tone, hh, findCleanest, relDay, useGhSim, type GhJob } from "./GhSim";
import s from "./TierMocks.module.css";

/**
 * §Tier 2 — Flexible Compute Scheduler (deck slide 9 + prototype), LIVE on the
 * shared sim (GH-SIM-1 → GH-T2-2). Set a real deadline (day + time), and either
 * take the system's recommended window or tap a forecast bar to pick your own.
 * The demo clock at the foot fast-forwards the day so jobs visibly run — pausing
 * it pauses the T1 indicator and the T3 dashboard too (one clock, one truth),
 * and every job submitted shows up on the dashboard's flex strip.
 */

const SAMPLE_JOBS = [
  "Batch transcription · 412 audio files",
  "Quarterly report generation",
  "Embedding 3.2M product descriptions",
  "Overnight feedback summary",
  "Translation pass · 18,000 entries",
  "Fine-tune evaluation run",
];

const STATUS: Record<GhJob["status"], { label: string; color: string; bg: string }> = {
  queued: { label: "Queued", color: "var(--soft)", bg: "var(--fill)" },
  running: { label: "Running", color: "var(--amber)", bg: "var(--amber-wash)" },
  complete: { label: "Complete", color: "var(--accent)", bg: "var(--accent-tint)" },
};

/* compact day-prefix for job rows: same day = nothing, next day = "tmrw" */
const dayTag = (t: number, nowT: number) => {
  const d = relDay(t, nowT);
  return d <= 0 ? "" : d === 1 ? "tmrw " : `+${d}d `;
};

export default function SchedulerMock() {
  const { simT, hour, advanceHour, auto, setAuto, jobs, submitJob } = useGhSim();
  // deadline = a real day + time, not an hours-count slider
  const [dlDay, setDlDay] = useState<0 | 1>(() => (hour + 8 >= 24 ? 1 : 0));
  const [dlHour, setDlHour] = useState(() => (hour + 8) % 24);
  const [idx, setIdx] = useState(0);

  const dayBase = Math.floor(simT / 24) * 24;
  const deadlineT = dayBase + dlDay * 24 + dlHour;
  const windowH = deadlineT - simT;
  const valid = windowH >= 1;

  // mirrors submitJob's own routing exactly (same findCleanest(simT, window)
  // call) so the preview never promises a window that submission wouldn't pick.
  const rec = valid ? findCleanest(simT, windowH) : null;
  const recIsNow = rec !== null && rec.t === simT;
  const nowInt = gridAt(simT);
  const recSavePct =
    rec && nowInt > 0 ? Math.round(((nowInt - rec.intensity) / nowInt) * 100) : 0;

  const addJob = () => {
    if (!valid) return;
    submitJob(SAMPLE_JOBS[idx % SAMPLE_JOBS.length], deadlineT);
    setIdx((i) => i + 1);
  };
  // the user-picked path: tap a forecast bar inside the deadline
  const pickWindow = (t: number) => {
    if (!valid || t > deadlineT || t < simT) return;
    submitJob(SAMPLE_JOBS[idx % SAMPLE_JOBS.length], deadlineT, t);
    setIdx((i) => i + 1);
  };

  const queued = jobs.filter((j) => j.status === "queued");
  // 48h forecast from NOW — reaches into tomorrow instead of wrapping today
  const HOURS = 48;
  const W = 480, H = 96, STEP = W / HOURS, BASE = H - 12, MAXH = BASE - 6;

  return (
    <div className={s.schedApp}>
        {/* left — submit form (the clock is demoted to the demo strip below) */}
        <div>
          <div className={s.form}>
            <div className={s.kmono}>Submit job</div>
            <div className={s.formJob}>{SAMPLE_JOBS[idx % SAMPLE_JOBS.length]}</div>
            <div className={s.sliderRow}>
              <span>Deadline</span>
              <b>
                by {dlDay === 0 ? "today" : "tomorrow"} · {hh(dlHour)}:00
              </b>
            </div>
            <div className={s.pickerRow}>
              <select
                className={s.pickSel}
                value={dlDay}
                onChange={(e) => setDlDay(Number(e.target.value) as 0 | 1)}
                aria-label="Deadline day"
              >
                <option value={0}>Today</option>
                <option value={1}>Tomorrow</option>
              </select>
              <select
                className={s.pickSel}
                value={dlHour}
                onChange={(e) => setDlHour(parseInt(e.target.value))}
                aria-label="Deadline time"
              >
                {Array.from({ length: 24 }, (_, h) => (
                  <option key={h} value={h} disabled={dlDay === 0 && h <= hour}>
                    {hh(h)}:00
                  </option>
                ))}
              </select>
            </div>
            {!valid && (
              <div className={s.pickWarn}>that time has passed — pick a later hour</div>
            )}
            <div className={s.recRow}>
              <span className={s.recLabel}>Recommended</span>
              {!rec ? (
                <span className={s.recText}>set a deadline ahead of now</span>
              ) : recIsNow ? (
                <span className={s.recText}>Now is the cleanest window before your deadline</span>
              ) : (
                <span className={s.recText}>
                  {dayTag(rec.t, simT) || "today "}
                  {hh(rec.hour)}:00 · {rec.intensity} g <b className={s.recSave}>↓{recSavePct}%</b> vs now
                </span>
              )}
            </div>
            <button className={s.scheduleBtn} onClick={addJob} type="button" disabled={!valid}>
              Schedule into recommended window ▸
            </button>
            <div className={s.pickHint}>
              …or tap a bar on the forecast to pick your own window — the system
              still checks it against your deadline.
            </div>
          </div>

          {/* the demo clock — demoted: it exists so you can fast-forward the
              day and watch jobs run; pausing it freezes T1's pill + T3 too */}
          <div className={s.demoClock}>
            <div className={s.demoClockTop}>
              <span className={s.demoClockLbl}>Demo clock</span>
              <span className={s.demoClockTime}>
                {hh(hour)}:00{Math.floor(simT / 24) > 0 ? ` · day ${Math.floor(simT / 24) + 1}` : ""}
                {" "}· {gridAt(simT)} g
              </span>
            </div>
            <div className={s.demoClockRow}>
              <span className={s.demoClockNote}>fast-forwards the day so you can watch jobs run</span>
              <span className={s.demoClockBtns}>
                <button
                  className={`${s.autoBtnLight} ${auto ? s.onLight : ""}`}
                  onClick={() => setAuto(!auto)}
                  type="button"
                >
                  {auto ? "Pause" : "Auto"}
                </button>
                <button className={s.advBtnLight} onClick={advanceHour} type="button">
                  ▸ +1h
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* right — 48h forecast + queue */}
        <div>
          <div className={s.chartCard}>
            <div className={s.queueHead} style={{ border: 0, padding: "0 0 8px" }}>
              <span>48h grid forecast</span>
              <span>tap a bar to pick · jobs marked ↓</span>
            </div>
            {/* decorative + pointer bonus; the accessible path is the pickers +
                recommended button on the left */}
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "96px", display: "block" }} aria-hidden="true">
              {Array.from({ length: HOURS }, (_, i) => {
                const t = simT + i;
                const v = gridAt(t);
                const bh = (Math.min(v, 480) / 480) * MAXH;
                const pickable = valid && i > 0 && t <= deadlineT;
                return (
                  <rect
                    key={i}
                    x={i * STEP + 0.75}
                    y={BASE - bh}
                    width={STEP - 1.5}
                    height={bh}
                    style={{ fill: tone(v), cursor: pickable ? "pointer" : undefined }}
                    opacity={pickable ? 0.95 : 0.55}
                    onClick={pickable ? () => pickWindow(t) : undefined}
                  >
                    <title>
                      {(relDay(t, simT) === 0 ? "today" : "tomorrow") + ` ${hh(t % 24)}:00 · ${v} g` + (pickable ? " — tap to schedule" : "")}
                    </title>
                  </rect>
                );
              })}
              {/* midnight divider — where today hands over to tomorrow */}
              {Array.from({ length: HOURS }, (_, i) => simT + i)
                .filter((t, i) => i > 0 && t % 24 === 0)
                .map((t) => {
                  const x = (t - simT) * STEP;
                  return (
                    <g key={t}>
                      <line x1={x} y1="2" x2={x} y2={BASE} className="ghs-ink" strokeWidth="1" strokeDasharray="1 3" opacity="0.55" />
                      <text x={x + 3} y="10" fontSize="8" className="ghf-mono ghs-ink" opacity="0.7">
                        tomorrow
                      </text>
                    </g>
                  );
                })}
              {/* now marker */}
              <line x1={STEP / 2} y1="2" x2={STEP / 2} y2={BASE} className="ghs-ink" strokeWidth="1.5" strokeDasharray="3 3" />
              {/* deadline marker */}
              {valid && deadlineT - simT < HOURS && (
                <line x1={(deadlineT - simT) * STEP + STEP / 2} y1="2" x2={(deadlineT - simT) * STEP + STEP / 2} y2={BASE} className="ghs-amber" strokeWidth="1.5" strokeDasharray="4 3" />
              )}
              {/* scheduled job markers (within the visible horizon) */}
              {queued
                .filter((j) => j.scheduled >= simT && j.scheduled < simT + HOURS)
                .map((j) => (
                  <line key={j.id} x1={(j.scheduled - simT) * STEP + STEP / 2} y1="2" x2={(j.scheduled - simT) * STEP + STEP / 2} y2={BASE} className="ghs-forest" strokeWidth="1.5" strokeDasharray="2 4" />
                ))}
              <line x1="0" y1={BASE} x2={W} y2={BASE} className="ghs-line" strokeWidth="0.5" />
            </svg>
          </div>

          <div className={s.queue}>
            <div className={s.queueHead}>
              <span>Job queue · {jobs.length}</span>
              <span>cleanest-window routing</span>
            </div>
            <div className={s.queueList}>
              {jobs.length === 0 && <div className={s.jobEmpty}>No jobs — submit one.</div>}
              {jobs.map((j) => {
                const save = Math.round(((j.immInt - j.schedInt) / j.immInt) * 100);
                const st = STATUS[j.status];
                return (
                  <div key={j.id} className={s.jobRow}>
                    <div>
                      <div className={s.jobName}>{j.name}</div>
                      <div className={s.jobMeta}>
                        sub {hh(j.submitted % 24)}:00 · by {dayTag(j.deadlineT, simT)}{hh(j.deadlineT % 24)}:00
                      </div>
                    </div>
                    <div>
                      <div className={s.jobCell}>{dayTag(j.scheduled, simT)}{hh(j.scheduled % 24)}:00</div>
                      <div className={s.jobCellSub}>{j.schedInt} g</div>
                    </div>
                    <div className={s.jobSave}>↓{save}%</div>
                    <div className={s.jobStatus} style={{ color: st.color, background: st.bg }}>{st.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
  );
}
