"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * GH-SIM-1 — the one simulation behind all three Greener Hours surfaces.
 * Previously each tier mock kept its own copy of the 24h grid and its own
 * clock; now the indicator pill (T1), the scheduler (T2), and the dashboard
 * (T3) share a single clock, grid, and flexible-job queue — submit a job in
 * Tier 2 and Tier 3's flex strip moves. Mounted once per product surface, so state
 * survives tab switches.
 */

/* simulated 24h grid intensity (gCO₂/kWh) — the original mock formula */
export const GRID = Array.from({ length: 24 }, (_, h) => {
  const base = 320;
  const peak = Math.sin(((h - 8) / 24) * Math.PI * 2) * 140;
  const noise = ((h * 17) % 11) - 5;
  return Math.max(140, Math.round(base + peak + noise));
});

/* day-2 curve — same generator, shifted phase + slightly different floor, so a
   48h forecast (T2) actually has a tomorrow worth scheduling into. Days
   alternate A/B/A/B as the sim clock runs past midnight. */
export const GRID2 = Array.from({ length: 24 }, (_, h) => {
  const base = 306;
  const peak = Math.sin(((h - 10.5) / 24) * Math.PI * 2) * 128;
  const noise = ((h * 13) % 9) - 4;
  return Math.max(140, Math.round(base + peak + noise));
});

/* grid intensity at an ABSOLUTE sim-hour (t = day*24 + hour, monotonic) */
export const gridAt = (t: number) =>
  (Math.floor(t / 24) % 2 === 0 ? GRID : GRID2)[((t % 24) + 24) % 24];

/* indicator-pill classification (T1 topbar + status strip) */
export function classify(i: number) {
  if (i < 220) return { label: "Low intensity", varc: "var(--navy-soft)" };
  if (i < 340) return { label: "Mixed", varc: "var(--amber-soft)" };
  return { label: "High intensity", varc: "var(--amber)" };
}

/* T3 dashboard — green/mixed/fossil-heavy hour split, same thresholds as
   classify() above (green <220, mixed 220–339, fossil-heavy >=340). Computed
   once over the whole 24h GRID for the "hours on green power" KPI. */
export function gridSplit() {
  let green = 0, mixed = 0, fossil = 0;
  for (const v of GRID) {
    if (v < 220) green++;
    else if (v < 340) mixed++;
    else fossil++;
  }
  return { green, mixed, fossil };
}

/* chart-fill tone (T2 forecast bars): clean = forest, mixed/dirty = ambers */
export function tone(i: number) {
  if (i < 220) return "var(--accent)";
  if (i < 340) return "var(--amber-soft)";
  return "var(--amber)";
}

/* cleanest window in [startT, startT + win) — ABSOLUTE sim-hours, so the scan
   reaches into tomorrow instead of wrapping around the same day. `hour` is the
   wall-clock display value of the winning slot. */
export function findCleanest(startT: number, win: number) {
  let best = startT;
  let bestI = gridAt(startT);
  for (let i = 0; i < win; i++) {
    const t = startT + i;
    if (gridAt(t) < bestI) {
      bestI = gridAt(t);
      best = t;
    }
  }
  return { t: best, hour: ((best % 24) + 24) % 24, intensity: bestI };
}

/* whole days between two absolute sim-hours (0 = same day, 1 = tomorrow…) */
export const relDay = (t: number, nowT: number) =>
  Math.floor(t / 24) - Math.floor(nowT / 24);

export const hh = (i: number) => String(i).padStart(2, "0");

export type GhJob = {
  id: number;
  name: string;
  /* all three are ABSOLUTE sim-hours (day*24 + hour) */
  submitted: number;
  deadlineT: number;
  scheduled: number;
  schedInt: number;
  immInt: number;
  status: "queued" | "running" | "complete";
};

/* illustrative energy per flexible job, for the dashboard's avoided-carbon read */
const KWH_PER_JOB = 2;

type GhSim = {
  /* absolute sim-time in hours (monotonic — never wraps) */
  simT: number;
  /* wall-clock hour derived from simT, for display */
  hour: number;
  advanceHour: () => void;
  auto: boolean;
  setAuto: (b: boolean) => void;
  jobs: GhJob[];
  /* deadlineT is ABSOLUTE; targetT (absolute) = the user picked their own
     window off the forecast instead of taking the recommendation */
  submitJob: (name: string, deadlineT: number, targetT?: number) => void;
  flex: { count: number; queued: number; complete: number; avgSavePct: number; gramsAvoided: number };
};

const SimCtx = createContext<GhSim | null>(null);

const SEED_JOBS: GhJob[] = [
  { id: 1, name: "Batch transcription · 412 audio files", submitted: 13, deadlineT: 21, scheduled: 17, schedInt: 168, immInt: 342, status: "queued" },
  { id: 2, name: "Overnight feedback summary", submitted: 12, deadlineT: 20, scheduled: 16, schedInt: 194, immInt: 360, status: "queued" },
];

export function GhSimProvider({ children }: { children: ReactNode }) {
  // absolute sim-time; the demo opens at 14:00 on day 0
  const [simT, setSimT] = useState(14);
  const hour = ((simT % 24) + 24) % 24;
  // the sim clock runs by default (the T1 pill cycles like it used to);
  // the T2 Pause button stops the whole product's clock — one clock, one truth
  const [auto, setAuto] = useState(true);
  const [jobs, setJobs] = useState<GhJob[]>(SEED_JOBS);
  const [nextId, setNextId] = useState(3);

  useEffect(() => {
    if (!auto) return;
    // reduced-motion users get a still world by default — the T2 controls
    // (Advance hour / Pause) still drive the clock by hand
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const t = setInterval(() => {
      // pause the world while the tab is hidden (page-wide convention)
      if (typeof document !== "undefined" && document.hidden) return;
      setSimT((v) => v + 1);
    }, 8000);
    return () => clearInterval(t);
  }, [auto]);

  useEffect(() => {
    setJobs((js) =>
      js.map((j) => {
        if (j.status === "queued" && simT >= j.scheduled) return { ...j, status: "running" };
        if (j.status === "running" && simT >= j.scheduled + 1) return { ...j, status: "complete" };
        return j;
      }),
    );
  }, [simT]);

  const advanceHour = useCallback(() => setSimT((v) => v + 1), []);

  const submitJob = useCallback(
    (name: string, deadlineT: number, targetT?: number) => {
      const sched =
        targetT != null
          ? { t: targetT, intensity: gridAt(targetT) }
          : findCleanest(simT, Math.max(1, deadlineT - simT));
      setJobs((js) => [
        {
          id: nextId,
          name,
          submitted: simT,
          deadlineT,
          scheduled: sched.t,
          schedInt: sched.intensity,
          immInt: gridAt(simT),
          // when the chosen window IS the current hour, the [simT] status
          // effect has already run for this tick — settle the job to "running"
          // now (it completes on the next tick).
          status: sched.t <= simT ? "running" : "queued",
        },
        ...js,
      ]);
      setNextId((n) => n + 1);
    },
    [simT, nextId],
  );

  const flex = useMemo(() => {
    const count = jobs.length;
    const queued = jobs.filter((j) => j.status === "queued").length;
    const complete = jobs.filter((j) => j.status === "complete").length;
    const avgSavePct = count
      ? Math.round(
          (jobs.reduce((s, j) => s + (j.immInt - j.schedInt) / j.immInt, 0) / count) * 100,
        )
      : 0;
    const gramsAvoided = Math.round(
      jobs.reduce((s, j) => s + (j.immInt - j.schedInt) * KWH_PER_JOB, 0),
    );
    return { count, queued, complete, avgSavePct, gramsAvoided };
  }, [jobs]);

  const value = useMemo(
    () => ({ simT, hour, advanceHour, auto, setAuto, jobs, submitJob, flex }),
    [simT, hour, advanceHour, auto, jobs, submitJob, flex],
  );

  return <SimCtx.Provider value={value}>{children}</SimCtx.Provider>;
}

export function useGhSim(): GhSim {
  const ctx = useContext(SimCtx);
  if (!ctx) throw new Error("useGhSim must be used inside GhSimProvider");
  return ctx;
}
