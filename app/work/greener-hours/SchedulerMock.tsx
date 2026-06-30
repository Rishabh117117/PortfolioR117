"use client";

import { useEffect, useState } from "react";
import s from "./TierMocks.module.css";

/**
 * §Tier 2 — Flexible Compute Scheduler (deck slide 9 + prototype), now LIVE.
 * Submit a job → it's scheduled to the cleanest grid window before its deadline.
 * Advance the sim clock (or auto-run) to watch jobs run and complete. Self-
 * contained simulation — no backend.
 */

const GRID = Array.from({ length: 24 }, (_, h) => {
  const base = 320;
  const peak = Math.sin(((h - 8) / 24) * Math.PI * 2) * 140;
  const noise = ((h * 17) % 11) - 5;
  return Math.max(140, Math.round(base + peak + noise));
});

// clean = forest, mixed = amber-soft, dirty = amber
function tone(i: number) {
  if (i < 220) return "var(--accent)";
  if (i < 340) return "var(--amber-soft)";
  return "var(--amber)";
}

const SAMPLE_JOBS = [
  "Batch transcription · 412 audio files",
  "Quarterly report generation",
  "Embedding 3.2M product descriptions",
  "Overnight feedback summary",
  "Translation pass · 18,000 entries",
  "Fine-tune evaluation run",
];

type Job = {
  id: number;
  name: string;
  submitted: number;
  deadlineH: number;
  scheduled: number;
  schedInt: number;
  immInt: number;
  status: "queued" | "running" | "complete";
};

const STATUS: Record<Job["status"], { label: string; color: string; bg: string }> = {
  queued: { label: "Queued", color: "var(--soft)", bg: "var(--fill)" },
  running: { label: "Running", color: "var(--amber)", bg: "var(--amber-wash)" },
  complete: { label: "Complete", color: "var(--accent)", bg: "var(--accent-tint)" },
};

export default function SchedulerMock() {
  const [hour, setHour] = useState(14);
  const [auto, setAuto] = useState(false);
  const [deadline, setDeadline] = useState(8);
  const [idx, setIdx] = useState(0);
  const [jobs, setJobs] = useState<Job[]>([
    { id: 1, name: "Batch transcription · 412 audio files", submitted: 13, deadlineH: 21, scheduled: 17, schedInt: 168, immInt: 342, status: "queued" },
    { id: 2, name: "Overnight feedback summary", submitted: 12, deadlineH: 20, scheduled: 16, schedInt: 194, immInt: 360, status: "queued" },
  ]);
  const [nextId, setNextId] = useState(3);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setHour((h) => (h + 1) % 24), 2200);
    return () => clearInterval(t);
  }, [auto]);

  useEffect(() => {
    setJobs((js) =>
      js.map((j) => {
        if (j.status === "queued" && hour === j.scheduled) return { ...j, status: "running" };
        if (j.status === "running" && hour === (j.scheduled + 1) % 24) return { ...j, status: "complete" };
        return j;
      }),
    );
  }, [hour]);

  const findCleanest = (start: number, win: number) => {
    let best = start;
    let bestI = GRID[start];
    for (let i = 0; i < win; i++) {
      const h = (start + i) % 24;
      if (GRID[h] < bestI) {
        bestI = GRID[h];
        best = h;
      }
    }
    return { hour: best, intensity: bestI };
  };

  const addJob = () => {
    const { hour: sh, intensity } = findCleanest(hour, deadline);
    setJobs((js) => [
      { id: nextId, name: SAMPLE_JOBS[idx % SAMPLE_JOBS.length], submitted: hour, deadlineH: (hour + deadline) % 24, scheduled: sh, schedInt: intensity, immInt: GRID[hour], status: "queued" },
      ...js,
    ]);
    setNextId((n) => n + 1);
    setIdx((i) => i + 1);
  };

  const queued = jobs.filter((j) => j.status === "queued");
  const W = 480, H = 96, STEP = W / 24, BASE = H - 12, MAXH = BASE - 6;
  const hh = (i: number) => String(i).padStart(2, "0");

  return (
    <div className={s.frame}>
      <div className={s.chrome}>
        <span className={s.dot} /><span className={s.dot} /><span className={s.dot} />
        <span className={s.url}>↻ console.ai/scheduler</span>
      </div>
      <div className={s.schedApp}>
        {/* left — clock + form */}
        <div>
          <div className={s.clock}>
            <div className={s.clockTop}>
              <span className={s.clockLbl}>Sim clock</span>
              <button className={`${s.autoBtn} ${auto ? s.on : ""}`} onClick={() => setAuto(!auto)} type="button">
                {auto ? "Pause" : "Auto"}
              </button>
            </div>
            <div className={s.clockBig}>
              {hh(hour)}<span className={s.c}>:</span>00
            </div>
            <div className={s.clockMeta}>{GRID[hour]} gCO₂/kWh</div>
            <button className={s.advBtn} onClick={() => setHour((h) => (h + 1) % 24)} type="button">
              › Advance hour
            </button>
          </div>
          <div className={s.form}>
            <div className={s.kmono}>Submit job</div>
            <div className={s.formJob}>{SAMPLE_JOBS[idx % SAMPLE_JOBS.length]}</div>
            <div className={s.sliderRow}>
              <span>Deadline window</span>
              <b>{deadline}h · by {hh((hour + deadline) % 24)}:00</b>
            </div>
            <input className={s.slider} type="range" min={2} max={24} value={deadline} onChange={(e) => setDeadline(parseInt(e.target.value))} aria-label="Deadline window (hours)" />
            <button className={s.scheduleBtn} onClick={addJob} type="button">+ Schedule flexibly</button>
          </div>
        </div>

        {/* right — forecast + queue */}
        <div>
          <div className={s.chartCard}>
            <div className={s.queueHead} style={{ border: 0, padding: "0 0 8px" }}>
              <span>24h grid intensity</span>
              <span>jobs marked ↓</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "96px", display: "block" }} aria-hidden="true">
              {GRID.map((v, i) => {
                const h = (Math.min(v, 480) / 480) * MAXH;
                return <rect key={i} x={i * STEP + 1} y={BASE - h} width={STEP - 2} height={h} style={{ fill: tone(v) }} opacity={0.85} />;
              })}
              {/* now marker */}
              <line x1={hour * STEP + STEP / 2} y1="2" x2={hour * STEP + STEP / 2} y2={BASE} className="ghs-ink" strokeWidth="1.5" strokeDasharray="3 3" />
              {/* scheduled job markers */}
              {queued.map((j) => (
                <line key={j.id} x1={j.scheduled * STEP + STEP / 2} y1="2" x2={j.scheduled * STEP + STEP / 2} y2={BASE} className="ghs-forest" strokeWidth="1.5" strokeDasharray="2 4" />
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
                      <div className={s.jobMeta}>sub {hh(j.submitted)}:00 · by {hh(j.deadlineH)}:00</div>
                    </div>
                    <div>
                      <div className={s.jobCell}>{hh(j.scheduled)}:00</div>
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
    </div>
  );
}
