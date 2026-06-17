"use client";

import { useEffect, useRef, useState } from "react";
import {
  HARNESS_LIVE,
  HARNESS_BADGE_LIVE,
  HARNESS_BADGE_FALLBACK,
  HARNESS_FOOTNOTE_LIVE,
  HARNESS_FOOTNOTE_FALLBACK,
  STRATEGIC_PRIORITIES,
  TRUSTEE_BENCH,
  STAFF_NEEDS,
  CANNED_WORKSHOP,
  CANNED_SESSION,
  type Workshop,
  type SessionCapture,
  type StaffNeed,
} from "@/lib/housingWorks";
import styles from "./WorkshopHarness.module.css";

type Stage = "setup" | "workshop" | "session";

// ---- live-path helpers (used only when HARNESS_LIVE === true, Phase 4) -------
function benchText() {
  return TRUSTEE_BENCH.map((t) => `- ${t.name} — ${t.skills}`).join("\n");
}
function workshopPrompt(need: StaffNeed) {
  return `You are the engine inside a Trustee-Led Workshop system for Housing Works, a nonprofit running thrift retail to fund HIV and homelessness services. Match a staff development need against the board's skills and the org's strategic priorities, and design ONE short workshop.

STRATEGIC PRIORITIES (FY23–25): retail revenue growth, staff retention, equity & inclusion, hybrid flexibility.
TRUSTEE SKILL INVENTORY:
${benchText()}
STAFF NEED: ${need.label} — ${need.detail}

Pick the single best-matched trustee. Agenda MUST be exactly four blocks — Intro (5), Core Discussion (15), Sprint (15), Q&A (10) — each one concrete sentence, specific to retail/nonprofit work.

Respond with ONLY valid JSON, no fences, no preamble:
{"title":"","trustee":"","objective":"one sentence","agenda":[{"block":"Intro","minutes":5,"content":""},{"block":"Core Discussion","minutes":15,"content":""},{"block":"Sprint","minutes":15,"content":""},{"block":"Q&A","minutes":10,"content":""}],"badge":"","kpi":""}`;
}
function sessionPrompt(w: Workshop, need: StaffNeed) {
  return `A Housing Works trustee just delivered "${w.title}", led by ${w.trustee}, addressing: ${need.label}. Produce a realistic capture as the system would record, transcribe, and auto-summarize it. Brief, believable, first names only.

Respond with ONLY valid JSON, no fences, no preamble:
{"transcript":[{"speaker":"","line":""}],"summary":"40–55 word one-minute readout with the key takeaway","tags":["3–5 short tags"]}
The transcript should have 5 short turns.`;
}
// Parse defensively: strip fences; slice first { .. last }.
function parseJson<T>(text: string): T {
  let t = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  if (!t.startsWith("{")) t = t.slice(t.indexOf("{"), t.lastIndexOf("}") + 1);
  return JSON.parse(t) as T;
}
async function callAsk(prompt: string): Promise<string> {
  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, max_tokens: 1000 }),
  });
  const data = await res.json();
  return data.text as string;
}

export default function WorkshopHarness() {
  const [needId, setNeedId] = useState<string>(STAFF_NEEDS[0].id);
  const [stage, setStage] = useState<Stage>("setup");
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [session, setSession] = useState<SessionCapture | null>(null);
  const [captureStage, setCaptureStage] = useState(0); // 0 none → 1 transcript → 2 summary → 3 archive
  const [busy, setBusy] = useState(false);
  const reduceMotion = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    reduceMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const need = STAFF_NEEDS.find((n) => n.id === needId)!;

  async function generate() {
    setBusy(true);
    try {
      if (HARNESS_LIVE) {
        const text = await callAsk(workshopPrompt(need));
        setWorkshop(parseJson<Workshop>(text));
      } else {
        setWorkshop(CANNED_WORKSHOP[needId]);
      }
      setStage("workshop");
    } finally {
      setBusy(false);
    }
  }

  async function run() {
    setBusy(true);
    try {
      let cap: SessionCapture;
      if (HARNESS_LIVE && workshop) {
        cap = parseJson<SessionCapture>(await callAsk(sessionPrompt(workshop, need)));
      } else {
        cap = CANNED_SESSION[needId];
      }
      setSession(cap);
      setStage("session");
      // staggered capture-loop reveal (the signature moment)
      if (reduceMotion.current) {
        setCaptureStage(3);
      } else {
        setCaptureStage(1);
        timers.current.push(setTimeout(() => setCaptureStage(2), 900));
        timers.current.push(setTimeout(() => setCaptureStage(3), 1800));
      }
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setWorkshop(null);
    setSession(null);
    setCaptureStage(0);
    setStage("setup");
  }

  const badge = HARNESS_LIVE ? HARNESS_BADGE_LIVE : HARNESS_BADGE_FALLBACK;
  const footnote = HARNESS_LIVE ? HARNESS_FOOTNOTE_LIVE : HARNESS_FOOTNOTE_FALLBACK;

  return (
    <section className={styles.harness} aria-label="Workshop Harness">
      <header className={styles.bar}>
        <span className={styles.barLabel}>
          <span className="pulseDot" aria-hidden="true" />
          WORKSHOP HARNESS
        </span>
        <span className={styles.badge}>
          <span className={styles.badgeDot} aria-hidden="true" />
          {badge}
        </span>
      </header>

      <div className={styles.body}>
        <p className={`mono ${styles.formula}`}>
          need × trustee skill × strategy → the right workshop
        </p>

        {/* ---- SETUP ---- */}
        <div className={styles.setup}>
          <div className={styles.col}>
            <span className={`mono ${styles.colLabel}`}>1 · Staff need</span>
            <div className={styles.needChips}>
              {STAFF_NEEDS.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  className={`${styles.needChip} ${needId === n.id ? styles.needActive : ""}`}
                  aria-pressed={needId === n.id}
                  onClick={() => {
                    setNeedId(n.id);
                    reset();
                  }}
                >
                  <span className={styles.needLabel}>{n.label}</span>
                  <span className={`cap ${styles.needDetail}`}>{n.detail}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.col}>
            <span className={`mono ${styles.colLabel}`}>2 · Trustee bench</span>
            <ul className={styles.bench}>
              {TRUSTEE_BENCH.map((t) => (
                <li key={t.name} className={styles.benchItem}>
                  <span className={styles.benchName}>{t.name}</span>
                  <span className={`cap ${styles.benchSkill}`}>{t.skills}</span>
                </li>
              ))}
            </ul>
            <span className={`mono ${styles.colLabel}`} style={{ marginTop: "var(--space-3)" }}>
              3 · Strategic priorities
            </span>
            <div className={styles.priorities}>
              {STRATEGIC_PRIORITIES.map((p) => (
                <span key={p} className={`mono ${styles.priority}`}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {stage === "setup" && (
          <button type="button" className="btn primary" onClick={generate} disabled={busy}>
            {busy ? "Generating…" : "Generate workshop"}
          </button>
        )}

        {/* ---- WORKSHOP ---- */}
        {workshop && stage !== "setup" && (
          <article className={styles.workshop}>
            <h4 className={styles.wsTitle}>{workshop.title}</h4>
            <p className={`mono ${styles.wsMeta}`}>
              Trustee: {workshop.trustee} · matched to {need.label.toLowerCase()}
            </p>
            <p className={styles.wsObjective}>{workshop.objective}</p>
            <ol className={styles.agenda}>
              {workshop.agenda.map((a) => (
                <li key={a.block} className={styles.agendaItem}>
                  <span className={`mono ${styles.agendaHead}`}>
                    {a.block} · {a.minutes} min
                  </span>
                  <span className={styles.agendaBody}>{a.content}</span>
                </li>
              ))}
            </ol>
            <div className={styles.wsFooter}>
              <span className={`mono ${styles.metaTag} ${styles.metaTagAccent}`}>
                BADGE · {workshop.badge}
              </span>
              <span className={`mono ${styles.metaTag}`}>KPI · {workshop.kpi}</span>
              <span className={`mono ${styles.mins}`}>45 MIN</span>
            </div>

            {stage === "workshop" && (
              <button type="button" className="btn primary" onClick={run} disabled={busy}>
                {busy ? "Running…" : "Run the session"}
              </button>
            )}
          </article>
        )}

        {/* ---- SESSION CAPTURE (staggered) ---- */}
        {session && stage === "session" && (
          <div className={styles.capture}>
            {captureStage >= 1 && (
              <div className={styles.captureStep}>
                <span className={`mono ${styles.captureLabel}`}>LIVE TRANSCRIPT</span>
                <ul className={styles.transcript}>
                  {session.transcript.map((turn, i) => (
                    <li key={i} className={styles.turn}>
                      <span className={styles.speaker}>{turn.speaker}</span>
                      <span className={styles.line}>{turn.line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {captureStage >= 2 && (
              <div className={styles.captureStep}>
                <span className={`mono ${styles.captureLabel}`}>↓ 1-MINUTE SUMMARY · AUTO</span>
                <p className={styles.summary}>{session.summary}</p>
              </div>
            )}
            {captureStage >= 3 && (
              <div className={styles.captureStep}>
                <span className={`mono ${styles.captureLabel}`}>↓ ARCHIVED · SEARCHABLE</span>
                <div className={styles.tags}>
                  {session.tags.map((t) => (
                    <span key={t} className={`mono ${styles.tag}`}>
                      #{t}
                    </span>
                  ))}
                </div>
                <p className={`cap ${styles.stored}`}>Stored to the team&apos;s shared memory.</p>
              </div>
            )}

            {captureStage >= 3 && (
              <button type="button" className="btn ghost" onClick={reset}>
                Try another need
              </button>
            )}
          </div>
        )}

        <p className={`cap ${styles.footnote}`}>{footnote}</p>
      </div>
    </section>
  );
}
