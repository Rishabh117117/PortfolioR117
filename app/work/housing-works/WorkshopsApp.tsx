"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  HW_PROJECT,
  HW_HONESTY,
  HW_NEEDS,
  HW_TRUSTEES,
  HW_TEMPLATES,
  HW_CAPTURES,
  HW_ARCHIVE_SEED,
  HW_SESSION_COST,
  HW_YEAR_BUDGET,
  matchTrustees,
  hwAssistantContext,
  type HwArchived,
  type HwNeed,
  type HwTemplate,
} from "@/lib/hwWorkshops";
import WorkshopsAssistant from "./WorkshopsAssistant";
import s from "./WorkshopsApp.module.css";

/**
 * Trustee Workshops — the working prototype (scene 9 of /work/housing-works +
 * the /prototype route). The full loop of Rishabh's framework as an internal
 * People-team tool: a staff-needs queue → explainable trustee matching
 * (skill × strategy × load, scored in the open) → a scheduled 45-minute
 * session → live capture (transcript → auto-summary → badge) → a searchable
 * archive the built-in assistant answers from (/api/ask, demo "hw-workshops").
 *
 * All people and figures are illustrative stand-ins — the honesty strip and
 * the matcher's footnote say so on-product.
 */

type View = "match" | "plan" | "sessions" | "archive";

type Queued = {
  id: string;
  needId: string;
  needLabel: string;
  votes: number;
  trusteeId: string;
  trustee: string;
  template: HwTemplate;
};

type Draft = {
  needId: string;
  needLabel: string;
  votes: number;
  trusteeId: string;
  trustee: string;
};

type RunPhase = "idle" | "transcript" | "summary" | "done";
type PlanPhase = "drafting" | "ready";

/* ---- mobile app-shell icons (≤719px bottom tab bar + Program button) ---- */
const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
function IconMatch() {
  return (
    <svg {...svgProps} aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconSessions() {
  return (
    <svg {...svgProps} aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
      <path d="M3.5 9h17M8 3v3M16 3v3" />
    </svg>
  );
}
function IconArchive() {
  return (
    <svg {...svgProps} aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="4" rx="1" />
      <path d="M5 8.5V19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5M10 12h4" />
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
function IconProgram() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 20V10M12 20V5M18 20v-8M3.5 20h17" />
    </svg>
  );
}

/* deterministic bar heights for the archive's illustrative-recording waveform —
   fixed (not Math.random) so server and client render identically */
const HW_WAVEFORM = [
  6, 10, 16, 9, 20, 13, 7, 22, 15, 11, 18, 8, 14, 21, 10, 6, 17, 12, 19, 9, 15, 23, 11, 7, 16, 20,
  13, 8, 18, 10, 14, 22, 9, 17, 12, 19, 7, 15, 21, 11,
];

/* quiet step-by-step strip for Match + Plan — a guided sequence, not a wizard */
const STEP_LABELS = ["Pick a need", "Match a trustee", "Review the lesson plan", "Schedule"];
function StepTrack({ current }: { current: number }) {
  return (
    <ol className={s.stepTrack} aria-label="Workflow progress">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        return (
          <li
            key={label}
            className={`${s.step} ${n === current ? s.stepOn : ""}`}
            aria-current={n === current ? "step" : undefined}
          >
            <span className={s.stepNo}>{String(n).padStart(2, "0")}</span>
            <span className={s.stepLabel}>{label}</span>
            {n < STEP_LABELS.length && (
              <span className={s.stepArrow} aria-hidden="true">
                →
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function WorkshopsApp() {
  const [view, setView] = useState<View>("match");
  const [selNeedId, setSelNeedId] = useState<string | null>(null);
  const [queue, setQueue] = useState<Queued[]>([]);
  const [archive, setArchive] = useState<HwArchived[]>(HW_ARCHIVE_SEED);
  const [handled, setHandled] = useState<Record<string, boolean>>({});
  const [extraLoad, setExtraLoad] = useState<Record<string, number>>({});
  const [draft, setDraft] = useState<Draft | null>(null);
  const [planPhase, setPlanPhase] = useState<PlanPhase>("drafting");
  const [run, setRun] = useState<{ id: string; phase: RunPhase; turns: number } | null>(null);
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [justArchived, setJustArchived] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduceMotion = useRef(false);

  // mobile app-shell (≤719px): a full-screen "Ask" overlay + a slide-up
  // "Program" sheet. On desktop these never flip true — the controls that set
  // them are CSS-hidden — so the 3-region layout is untouched.
  const [askOpen, setAskOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreSheetRef = useRef<HTMLDivElement>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);
  const prevMoreOpen = useRef(false);

  useEffect(() => {
    reduceMotion.current =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  // one place to change the view — also dismisses the mobile overlays
  const goView = (v: View) => {
    setView(v);
    setAskOpen(false);
    setMoreOpen(false);
  };

  // esc closes either mobile overlay
  useEffect(() => {
    if (!moreOpen && !askOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMoreOpen(false);
        setAskOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moreOpen, askOpen]);

  // Program sheet: inert + focus handoff while it slides (Follow's pattern —
  // preventScroll stops the browser chasing the off-screen sheet)
  useEffect(() => {
    const sheet = moreSheetRef.current;
    if (sheet) sheet.toggleAttribute("inert", !moreOpen);
    if (moreOpen) {
      (sheet?.querySelector<HTMLElement>("button, [href], input") ?? sheet)?.focus({
        preventScroll: true,
      });
    } else if (prevMoreOpen.current) {
      moreBtnRef.current?.focus({ preventScroll: true });
    }
    prevMoreOpen.current = moreOpen;
  }, [moreOpen]);

  // deep-link: /work/housing-works/prototype#sessions opens straight to a view
  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    if (raw === "ask") {
      setAskOpen(true);
      return;
    }
    if (raw === "program") {
      setMoreOpen(true);
      return;
    }
    const valid: View[] = ["match", "sessions", "archive"];
    if (valid.includes(raw as View)) goView(raw as View);
  }, []);

  // the page's guided walkthrough drives the app from outside: plain views
  // via goView; "ask" opens the mobile Ask overlay (the desktop dock is
  // always on screen)
  useEffect(() => {
    const onGoto = (e: Event) => {
      const v = (e as CustomEvent).detail as string;
      if (v === "ask") {
        if (window.matchMedia("(max-width: 719px)").matches) setAskOpen(true);
        return;
      }
      const valid: View[] = ["match", "sessions", "archive"];
      if (valid.includes(v as View)) goView(v as View);
    };
    window.addEventListener("hw:goto", onGoto);
    return () => window.removeEventListener("hw:goto", onGoto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNeeds = useMemo(() => HW_NEEDS.filter((n) => !handled[n.id]), [handled]);
  const selNeed: HwNeed | null = openNeeds.find((n) => n.id === selNeedId) ?? null;
  const matches = useMemo(
    () => (selNeed ? matchTrustees(selNeed, extraLoad) : []),
    [selNeed, extraLoad],
  );

  const context = useMemo(
    () =>
      hwAssistantContext(
        archive,
        queue.map((q) => ({ title: q.template.title, trustee: q.trustee, needLabel: q.needLabel })),
        openNeeds,
      ),
    [archive, queue, openNeeds],
  );

  // Match → "Draft lesson plan" lands here instead of scheduling straight away —
  // the plan view (below) shows a short drafting beat, then the artifact itself.
  function draftPlan(needId: string, needLabel: string, votes: number, trusteeId: string, trusteeName: string) {
    setDraft({ needId, needLabel, votes, trusteeId, trustee: trusteeName });
    goView("plan");
  }

  // drives the plan view's drafting beat — same clear-then-schedule convention as
  // startRun's transcript timers, against the same shared timer list. Timers are
  // cleared before scheduling the new one, so a superseded draft's timer can never
  // fire after it (mirrors startRun's own guarantee, just without startRun's extra
  // id-check, which exists there only because multiple runs can be mid-flight).
  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current.length = 0;
    if (!draft) return;
    if (reduceMotion.current) {
      setPlanPhase("ready");
      return;
    }
    setPlanPhase("drafting");
    timers.current.push(setTimeout(() => setPlanPhase("ready"), 700));
  }, [draft]);

  function schedule(needId: string, trusteeId: string, trusteeName: string) {
    const need = HW_NEEDS.find((n) => n.id === needId);
    const template = HW_TEMPLATES[needId];
    if (!need || !template) return;
    setQueue((q) => [
      ...q,
      {
        id: `${needId}-${trusteeId}`,
        needId,
        needLabel: need.label,
        votes: need.votes,
        trusteeId,
        trustee: trusteeName,
        template,
      },
    ]);
    setHandled((h) => ({ ...h, [needId]: true }));
    setExtraLoad((l) => ({ ...l, [trusteeId]: (l[trusteeId] || 0) + 1 }));
    setSelNeedId(null);
    goView("sessions");
  }

  function startRun(item: Queued) {
    const cap = HW_CAPTURES[item.needId];
    if (!cap) return;
    // A previous run may still be playing (a second queued session keeps its Run
    // button visible). Cancel its pending timers so they can't drive THIS run's
    // state, and empty the handle list IN PLACE (the unmount cleanup captured
    // this same array reference) so it also never grows unbounded.
    timers.current.forEach(clearTimeout);
    timers.current.length = 0;
    if (reduceMotion.current) {
      setRun({ id: item.id, phase: "done", turns: cap.transcript.length });
      return;
    }
    setRun({ id: item.id, phase: "transcript", turns: 1 });
    // every updater is id-guarded so a stray timer from another run is a no-op
    cap.transcript.forEach((_, i) => {
      if (i === 0) return;
      timers.current.push(
        setTimeout(() => setRun((r) => (r && r.id === item.id ? { ...r, turns: i + 1 } : r)), i * 750),
      );
    });
    timers.current.push(
      setTimeout(
        () => setRun((r) => (r && r.id === item.id ? { ...r, phase: "summary" } : r)),
        cap.transcript.length * 750 + 350,
      ),
    );
    timers.current.push(
      setTimeout(
        () => setRun((r) => (r && r.id === item.id ? { ...r, phase: "done" } : r)),
        cap.transcript.length * 750 + 1250,
      ),
    );
  }

  function archiveSession(item: Queued) {
    const cap = HW_CAPTURES[item.needId];
    const attendees = Math.min(12, 5 + Math.floor(item.votes / 2));
    const rating = Math.round((4.4 + (item.votes % 5) * 0.1) * 10) / 10;
    const entry: HwArchived = {
      id: `run-${item.id}`,
      when: "Q2 · this wk",
      title: item.template.title,
      trustee: item.trustee,
      needLabel: item.needLabel,
      attendees,
      rating,
      summary: cap.summary,
      tags: cap.tags,
      badge: item.template.badge,
      duration: "45 min",
      insight: cap.insight,
      transcript: cap.transcript,
    };
    setArchive((a) => [entry, ...a]);
    setQueue((q) => q.filter((x) => x.id !== item.id));
    setRun(null);
    setJustArchived(entry.id);
    // clear the "just archived" emphasis after a beat so it doesn't stick forever
    timers.current.push(setTimeout(() => setJustArchived(null), 2600));
    goView("archive");
  }

  /* -------- archive filtering -------- */
  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    archive.forEach((a) => a.tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
    return [...counts.entries()].sort((x, y) => y[1] - x[1]).slice(0, 8).map(([t]) => t);
  }, [archive]);

  const shownArchive = useMemo(() => {
    const q = query.trim().toLowerCase();
    return archive.filter((a) => {
      if (tagFilter && !a.tags.includes(tagFilter)) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.trustee.toLowerCase().includes(q) ||
        a.needLabel.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tags.some((t) => t.includes(q))
      );
    });
  }, [archive, query, tagFilter]);

  const budgetUsed = archive.length * HW_SESSION_COST;
  const avgRating = archive.length
    ? (archive.reduce((sum, a) => sum + a.rating, 0) / archive.length).toFixed(1)
    : "—";

  // program stats + trustee bench — rendered in the desktop rail AND, on
  // mobile, inside the slide-up Program sheet
  const programOverview = (
    <>
      <div className={s.stats} aria-live="polite">
        <p className={s.railLabel}>program · fy25</p>
        <div className={s.statRow}>
          <span className={s.statName}>Sessions run</span>
          <span className={s.statVal}>{archive.length}</span>
        </div>
        <div className={s.statRow}>
          <span className={s.statName}>Badges issued</span>
          <span className={s.statVal}>{archive.length}</span>
        </div>
        <div className={s.statRow}>
          <span className={s.statName}>Avg session rating</span>
          <span className={s.statVal}>{avgRating}/5</span>
        </div>
        <div className={s.budget}>
          <div className={s.statRow}>
            <span className={s.statName}>Budget used</span>
            <span className={s.statVal}>${budgetUsed}</span>
          </div>
          <div className={s.budgetBar}>
            <span style={{ width: `${Math.min(100, (budgetUsed / HW_YEAR_BUDGET) * 100)}%` }} />
          </div>
          <p className={s.budgetNote}>of ${HW_YEAR_BUDGET}/yr · trustee time volunteered</p>
        </div>
      </div>

      <div className={s.bench}>
        <p className={s.railLabel}>trustee bench</p>
        {HW_TRUSTEES.map((t) => {
          const load = t.load + (extraLoad[t.id] || 0);
          return (
            <div key={t.id} className={s.benchRow}>
              <span className={s.benchName}>{t.name}</span>
              <span className={s.benchLoad} title="Sessions this quarter">
                {load}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );

  const VIEWS: { id: View; label: string; count: number }[] = [
    { id: "match", label: "Match a need", count: openNeeds.length },
    { id: "sessions", label: "Sessions", count: queue.length },
    { id: "archive", label: "Archive", count: archive.length },
  ];

  return (
    <div className={s.frame}>
      <div className={s.chrome} aria-hidden="true">
        <span className={s.dot} />
        <span className={s.dot} />
        <span className={s.dot} />
        <span className={s.url}>↻ {HW_PROJECT.url}</span>
      </div>

      <div className={s.topbar}>
        <div className={s.brand}>
          <span className={s.brandMark} aria-hidden="true" />
          <span className={s.brandName}>
            Trustee Workshops<sup className={s.brandSup}>concept</sup>
          </span>
        </div>
        <div className={s.project}>
          <span className={s.projectName}>{HW_PROJECT.name}</span>
          <span className={s.projectMeta}>{HW_PROJECT.meta}</span>
        </div>
        <span className={s.formula}>need × trustee × strategy → workshop</span>
        <span className={s.budgetChip} title="Program budget used (materials only; trustee time is volunteered)">
          ${budgetUsed} / ${HW_YEAR_BUDGET} yr
        </span>
        <button
          ref={moreBtnRef}
          type="button"
          className={s.progBtn}
          aria-expanded={moreOpen}
          aria-haspopup="dialog"
          onClick={() => {
            setMoreOpen((o) => !o);
            setAskOpen(false);
          }}
        >
          <IconProgram />
          <span>Program</span>
        </button>
      </div>

      <div className={s.body}>
        {/* ---------------- rail ---------------- */}
        <aside className={s.rail}>
          <nav aria-label="Workshop tool views">
            <p className={s.railLabel}>views</p>
            <ul className={s.viewList}>
              {VIEWS.map((v) => (
                <li key={v.id}>
                  <button
                    type="button"
                    className={`${s.viewBtn} ${view === v.id ? s.viewOn : ""}`}
                    aria-current={view === v.id ? "true" : undefined}
                    onClick={() => goView(v.id)}
                  >
                    <span>{v.label}</span>
                    <span className={s.viewCount}>{v.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {programOverview}
        </aside>

        {/* ---------------- main ---------------- */}
        <section className={s.main} aria-label="Workshop tool" data-tour="main">
          {/* ======== MATCH VIEW ======== */}
          {view === "match" && (
            <>
              <StepTrack current={selNeed ? 2 : 1} />
              <header className={s.mainHead}>
                <h3 className={s.mainTitle}>Open staff needs</h3>
                <p className={s.mainBlurb}>
                  From the quarterly pulse survey. Pick one to see the matcher work in the open.
                </p>
              </header>
              <div className={s.needGrid}>
                {openNeeds.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    className={`${s.need} ${selNeedId === n.id ? s.needOn : ""}`}
                    aria-pressed={selNeedId === n.id}
                    onClick={() => setSelNeedId(n.id)}
                  >
                    <span className={s.needTop}>
                      <span className={s.needLabel}>{n.label}</span>
                      <span className={s.needVotes}>▲ {n.votes}</span>
                    </span>
                    <span className={s.needDetail}>{n.detail}</span>
                    <span className={s.needMeta}>
                      {n.dept} · serves <em>{n.priority}</em>
                    </span>
                  </button>
                ))}
                {openNeeds.length === 0 && (
                  <p className={s.empty}>Every open need is scheduled or archived. Quite the quarter.</p>
                )}
              </div>

              {selNeed && (
                <div className={s.matchPanel}>
                  <p className={s.matchHead}>
                    Best trustee for <strong>{selNeed.label.toLowerCase()}</strong>
                    <span className={s.matchNote}>scored on skill fit · strategic fit · load</span>
                  </p>
                  {matches.map((m, i) => (
                    <article key={m.trustee.id} className={`${s.match} ${i === 0 ? s.matchBest : ""}`}>
                      <div className={s.matchWho}>
                        <span className={s.matchName}>
                          {m.trustee.name}
                          {i === 0 && <span className={s.bestTag}>best match</span>}
                        </span>
                        <span className={s.matchRole}>{m.trustee.role}</span>
                        <span className={s.matchWhy}>{m.why}</span>
                      </div>
                      <div className={s.matchScore}>
                        <span className={s.scoreNum}>{m.score}</span>
                        <div className={s.scoreBars}>
                          <span title={`Skill fit ${m.skillPts}/55`} style={{ width: `${(m.skillPts / 55) * 100}%` }} />
                          <span title={`Strategic fit ${m.priorityPts}/25`} style={{ width: `${(m.priorityPts / 25) * 100}%` }} />
                          <span title={`Capacity ${m.loadPts}/20`} style={{ width: `${(m.loadPts / 20) * 100}%` }} />
                        </div>
                        <span className={s.scoreKey}>skill · strategy · capacity</span>
                      </div>
                      <button
                        type="button"
                        className={`${s.schedBtn} ${i === 0 ? s.schedBtnPrimary : ""}`}
                        onClick={() =>
                          draftPlan(selNeed.id, selNeed.label, selNeed.votes, m.trustee.id, m.trustee.name)
                        }
                      >
                        Draft lesson plan ▸
                      </button>
                    </article>
                  ))}
                  <p className={s.matchFoot}>
                    The score is a real computation over illustrative data, not model output.
                  </p>
                </div>
              )}
            </>
          )}

          {/* ======== PLAN VIEW ======== */}
          {view === "plan" && draft && (
            <>
              <StepTrack current={3} />
              <header className={s.mainHead}>
                <h3 className={s.mainTitle}>Lesson plan</h3>
                <p className={s.mainBlurb}>
                  Before this goes on the calendar, a look at the session itself.
                </p>
              </header>

              {planPhase === "drafting" ? (
                <div className={s.planDrafting} aria-live="polite">
                  <p className={s.typing}>
                    Assembling the plan: template library + session archive…
                  </p>
                </div>
              ) : (
                (() => {
                  const template = HW_TEMPLATES[draft.needId];
                  if (!template) return null;
                  return (
                    <div className={s.planCard}>
                      <header className={s.planHead}>
                        <h4 className={s.planTitle}>{template.title}</h4>
                        <p className={s.planLed}>
                          Led by {draft.trustee} · for “{draft.needLabel.toLowerCase()}”
                        </p>
                      </header>
                      <p className={s.sessionObj}>{template.objective}</p>
                      <ol className={s.agenda}>
                        {template.agenda.map((a) => (
                          <li key={a.block}>
                            <span className={s.agendaHead}>
                              {a.block} · {a.minutes}′
                            </span>
                            <span className={s.agendaBody}>{a.content}</span>
                          </li>
                        ))}
                      </ol>
                      <div className={s.sessionTags}>
                        <span className={s.chipCrim}>badge · {template.badge}</span>
                        <span className={s.chipPlain}>kpi · {template.kpi}</span>
                      </div>
                      <p className={s.matchFoot}>
                        Drafted from the workshop template library · illustrative content.
                      </p>
                      <div className={s.planActions}>
                        <button
                          type="button"
                          className={s.linkBtn}
                          onClick={() => {
                            setDraft(null);
                            goView("match");
                          }}
                        >
                          ‹ Back to matches
                        </button>
                        <button
                          type="button"
                          className={`${s.schedBtn} ${s.schedBtnPrimary}`}
                          onClick={() => {
                            const d = draft;
                            setDraft(null);
                            schedule(d.needId, d.trusteeId, d.trustee);
                          }}
                        >
                          Apply for schedule ▸
                        </button>
                      </div>
                    </div>
                  );
                })()
              )}
            </>
          )}

          {/* ======== SESSIONS VIEW ======== */}
          {view === "sessions" && (
            <>
              <header className={s.mainHead}>
                <h3 className={s.mainTitle}>Scheduled sessions</h3>
                <p className={s.mainBlurb}>
                  45 minutes, always the same spine: intro 5 · discussion 15 · sprint 15 · Q&A 10.
                </p>
              </header>
              {queue.length === 0 && (
                <div className={s.emptyBox}>
                  <p className={s.empty}>Nothing scheduled yet.</p>
                  <button type="button" className={s.linkBtn} onClick={() => goView("match")}>
                    ← Match a need first
                  </button>
                </div>
              )}
              {queue.map((item) => {
                const cap = HW_CAPTURES[item.needId];
                const running = run?.id === item.id;
                return (
                  <article key={item.id} className={s.session}>
                    <header className={s.sessionHead}>
                      <div>
                        <h4 className={s.sessionTitle}>{item.template.title}</h4>
                        <p className={s.sessionMeta}>
                          {item.trustee} · for: {item.needLabel.toLowerCase()} · 45 min
                        </p>
                      </div>
                      {!running && (
                        <button type="button" className={s.runBtn} onClick={() => startRun(item)}>
                          ● Run session
                        </button>
                      )}
                    </header>
                    <p className={s.sessionObj}>{item.template.objective}</p>
                    <ol className={s.agenda}>
                      {item.template.agenda.map((a) => (
                        <li key={a.block}>
                          <span className={s.agendaHead}>
                            {a.block} · {a.minutes}′
                          </span>
                          <span className={s.agendaBody}>{a.content}</span>
                        </li>
                      ))}
                    </ol>
                    <div className={s.sessionTags}>
                      <span className={s.chipCrim}>badge · {item.template.badge}</span>
                      <span className={s.chipPlain}>kpi · {item.template.kpi}</span>
                    </div>

                    {running && run && (
                      <div className={s.capture} aria-live="polite">
                        <p className={s.captureLabel}>● live transcript</p>
                        <ul className={s.transcript}>
                          {cap.transcript.slice(0, run.turns).map((t, i) => (
                            <li key={i}>
                              <span className={s.speaker}>{t.speaker}</span>
                              <span className={s.line}>{t.line}</span>
                            </li>
                          ))}
                        </ul>
                        {(run.phase === "summary" || run.phase === "done") && (
                          <div className={s.captureStep}>
                            <p className={s.captureLabel}>↓ 1-minute summary · auto</p>
                            <p className={s.summary}>{cap.summary}</p>
                          </div>
                        )}
                        {run.phase === "done" && (
                          <div className={s.captureStep}>
                            <p className={s.captureLabel}>↓ tagged · badge issued</p>
                            <div className={s.tagRow}>
                              {cap.tags.map((t) => (
                                <span key={t} className={s.tag}>
                                  #{t}
                                </span>
                              ))}
                              <span className={s.chipCrim}>🏅 {item.template.badge}</span>
                            </div>
                            <button type="button" className={s.archiveBtn} onClick={() => archiveSession(item)}>
                              Archive to team memory ▸
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </>
          )}

          {/* ======== ARCHIVE VIEW ======== */}
          {view === "archive" && (
            <>
              <header className={s.mainHead}>
                <h3 className={s.mainTitle}>Session archive</h3>
                <p className={s.mainBlurb}>
                  What&apos;s taught stays with the team: every session recorded, summarized, searchable.
                </p>
              </header>
              <div className={s.searchRow}>
                <input
                  className={s.search}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sessions, trustees, topics…"
                  aria-label="Search the session archive"
                />
              </div>
              <div className={s.tagFilterRow}>
                {allTags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`${s.tagFilter} ${tagFilter === t ? s.tagFilterOn : ""}`}
                    aria-pressed={tagFilter === t}
                    onClick={() => setTagFilter(tagFilter === t ? null : t)}
                  >
                    #{t}
                  </button>
                ))}
              </div>
              {shownArchive.length === 0 && <p className={s.empty}>No sessions match that search.</p>}
              {shownArchive.map((a) => {
                const isOpen = openId === a.id;
                return (
                  <article key={a.id} className={`${s.entry} ${justArchived === a.id ? s.entryNew : ""}`}>
                    <button
                      type="button"
                      className={s.entryToggle}
                      aria-expanded={isOpen}
                      aria-controls={`hw-entry-body-${a.id}`}
                      onClick={() => setOpenId((cur) => (cur === a.id ? null : a.id))}
                    >
                      <header className={s.entryHead}>
                        <div>
                          <h4 className={s.entryTitle}>{a.title}</h4>
                          <p className={s.entryMeta}>
                            {a.trustee} · {a.when} · for: {a.needLabel.toLowerCase()}
                          </p>
                        </div>
                        <div className={s.entryNums}>
                          <span>{a.attendees} attended</span>
                          <span className={s.rating}>★ {a.rating.toFixed(1)}</span>
                        </div>
                      </header>
                      <svg
                        className={`${s.entryChevron} ${isOpen ? s.entryChevronOn : ""}`}
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 6 L8 10 L12 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <p className={s.entrySummary}>{a.summary}</p>
                    <div className={s.tagRow}>
                      {a.tags.map((t) => (
                        <span key={t} className={s.tag}>
                          #{t}
                        </span>
                      ))}
                      <span className={s.chipPlain}>🏅 {a.badge}</span>
                    </div>

                    {isOpen && (
                      <div id={`hw-entry-body-${a.id}`} className={s.entryExpand}>
                        {a.transcript && a.transcript.length > 0 && (
                          <>
                            <div className={s.recording}>
                              <div className={s.recordingRow}>
                                <span className={s.playGlyph} aria-hidden="true">
                                  ▶
                                </span>
                                <svg className={s.waveform} viewBox="0 0 160 28" aria-hidden="true">
                                  {HW_WAVEFORM.map((h, i) => (
                                    <rect key={i} x={i * 4} y={(28 - h) / 2} width="2" height={h} rx="1" />
                                  ))}
                                </svg>
                                <span className={s.recordingDuration}>{a.duration}</span>
                              </div>
                              <p className={s.recordingLabel}>
                                illustrative recording · stand-in · no audio
                              </p>
                            </div>

                            <ul className={s.transcript}>
                              {a.transcript.map((t, i) => (
                                <li key={i}>
                                  <span className={s.speaker}>{t.speaker}</span>
                                  <span className={s.line}>{t.line}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}

                        <div>
                          <p className={s.captureLabel}>insight</p>
                          <p className={s.summary}>{a.insight}</p>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </>
          )}
        </section>

        {/* ---------------- assistant dock ---------------- */}
        <WorkshopsAssistant context={context} className={askOpen ? s.assistMobileOpen : undefined} />
      </div>

      <div className={s.honesty}>
        <span>{HW_HONESTY}</span>
        <span className={s.honestyRight}>assistant runs on a live model API via a server-side proxy</span>
      </div>

      {/* ---------------- mobile app-shell: bottom tab bar + Program sheet ---------------- */}
      <nav className={s.mobileTabBar} aria-label="Workshop views">
        <button
          type="button"
          className={`${s.mobileTab} ${!askOpen && (view === "match" || view === "plan") ? s.mobileTabOn : ""}`}
          aria-current={!askOpen && (view === "match" || view === "plan") ? "page" : undefined}
          onClick={() => goView("match")}
        >
          <IconMatch />
          <span className={s.mobileTabLabel}>Match</span>
        </button>
        <button
          type="button"
          className={`${s.mobileTab} ${!askOpen && view === "sessions" ? s.mobileTabOn : ""}`}
          aria-current={!askOpen && view === "sessions" ? "page" : undefined}
          onClick={() => goView("sessions")}
        >
          <IconSessions />
          <span className={s.mobileTabLabel}>Sessions</span>
        </button>
        <button
          type="button"
          className={`${s.mobileTab} ${!askOpen && view === "archive" ? s.mobileTabOn : ""}`}
          aria-current={!askOpen && view === "archive" ? "page" : undefined}
          onClick={() => goView("archive")}
        >
          <IconArchive />
          <span className={s.mobileTabLabel}>Archive</span>
        </button>
        <button
          type="button"
          className={`${s.mobileTab} ${askOpen ? s.mobileTabOn : ""}`}
          aria-current={askOpen ? "page" : undefined}
          onClick={() => {
            setAskOpen((o) => !o);
            setMoreOpen(false);
          }}
        >
          <IconAsk />
          <span className={s.mobileTabLabel}>Ask</span>
        </button>
      </nav>

      <div
        className={`${s.moreBackdrop} ${moreOpen ? s.moreBackdropOn : ""}`}
        onClick={() => setMoreOpen(false)}
        aria-hidden="true"
      />
      <div
        ref={moreSheetRef}
        className={`${s.moreSheet} ${moreOpen ? s.moreSheetOn : ""}`}
        role="dialog"
        aria-label="Program overview"
        aria-hidden={!moreOpen}
        tabIndex={-1}
      >
        <span className={s.moreGrab} aria-hidden="true" />
        <p className={s.moreTitle}>Program</p>
        <div className={s.moreScroll}>{programOverview}</div>
      </div>
    </div>
  );
}
