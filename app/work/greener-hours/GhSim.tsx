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
 * Tier 2 and Tier 3's flex strip moves. Mounted once by TierTabs, so state
 * survives tab switches.
 */

/* simulated 24h grid intensity (gCO₂/kWh) — the original mock formula */
export const GRID = Array.from({ length: 24 }, (_, h) => {
  const base = 320;
  const peak = Math.sin(((h - 8) / 24) * Math.PI * 2) * 140;
  const noise = ((h * 17) % 11) - 5;
  return Math.max(140, Math.round(base + peak + noise));
});

/* indicator-pill classification (T1 topbar + status strip) */
export function classify(i: number) {
  if (i < 220) return { label: "Low intensity", varc: "var(--navy-soft)" };
  if (i < 340) return { label: "Mixed", varc: "var(--amber-soft)" };
  return { label: "High intensity", varc: "var(--amber)" };
}

/* chart-fill tone (T2 forecast bars): clean = forest, mixed/dirty = ambers */
export function tone(i: number) {
  if (i < 220) return "var(--accent)";
  if (i < 340) return "var(--amber-soft)";
  return "var(--amber)";
}

export function findCleanest(start: number, win: number) {
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
}

export const hh = (i: number) => String(i).padStart(2, "0");

export type GhJob = {
  id: number;
  name: string;
  submitted: number;
  deadlineH: number;
  scheduled: number;
  schedInt: number;
  immInt: number;
  status: "queued" | "running" | "complete";
};

/* illustrative energy per flexible job, for the dashboard's avoided-carbon read */
const KWH_PER_JOB = 2;

type GhSim = {
  hour: number;
  advanceHour: () => void;
  auto: boolean;
  setAuto: (b: boolean) => void;
  jobs: GhJob[];
  submitJob: (name: string, deadlineWindow: number) => void;
  flex: { count: number; queued: number; complete: number; avgSavePct: number; gramsAvoided: number };
};

const SimCtx = createContext<GhSim | null>(null);

const SEED_JOBS: GhJob[] = [
  { id: 1, name: "Batch transcription · 412 audio files", submitted: 13, deadlineH: 21, scheduled: 17, schedInt: 168, immInt: 342, status: "queued" },
  { id: 2, name: "Overnight feedback summary", submitted: 12, deadlineH: 20, scheduled: 16, schedInt: 194, immInt: 360, status: "queued" },
];

export function GhSimProvider({ children }: { children: ReactNode }) {
  const [hour, setHour] = useState(14);
  // the sim clock runs by default (the T1 pill cycles like it used to);
  // the T2 Pause button stops the whole product's clock — one clock, one truth
  const [auto, setAuto] = useState(true);
  const [jobs, setJobs] = useState<GhJob[]>(SEED_JOBS);
  const [nextId, setNextId] = useState(3);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      // pause the world while the tab is hidden (page-wide convention)
      if (typeof document !== "undefined" && document.hidden) return;
      setHour((h) => (h + 1) % 24);
    }, 8000);
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

  const advanceHour = useCallback(() => setHour((h) => (h + 1) % 24), []);

  const submitJob = useCallback(
    (name: string, deadlineWindow: number) => {
      const { hour: sh, intensity } = findCleanest(hour, deadlineWindow);
      setJobs((js) => [
        {
          id: nextId,
          name,
          submitted: hour,
          deadlineH: (hour + deadlineWindow) % 24,
          scheduled: sh,
          schedInt: intensity,
          immInt: GRID[hour],
          status: "queued",
        },
        ...js,
      ]);
      setNextId((n) => n + 1);
    },
    [hour, nextId],
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
    () => ({ hour, advanceHour, auto, setAuto, jobs, submitJob, flex }),
    [hour, advanceHour, auto, jobs, submitJob, flex],
  );

  return <SimCtx.Provider value={value}>{children}</SimCtx.Provider>;
}

export function useGhSim(): GhSim {
  const ctx = useContext(SimCtx);
  if (!ctx) throw new Error("useGhSim must be used inside GhSimProvider");
  return ctx;
}
