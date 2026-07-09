"use client";

import { useEffect, useRef, useState } from "react";
import { classify, findCleanest, gridAt, hh, useGhSim } from "./GhSim";
import s from "./ComputeWindowMock.module.css";

/**
 * §Tier 1 — Compute Window Indicator (deck slide 8), LIVE on the shared sim
 * (GH-SIM-1): the carbon pill reads the same clock as the scheduler and the
 * dashboard. The chat runs through the server-side /api/ask proxy and is
 * grounded with the live sim state, so it can answer "when's the cleanest
 * window?" from the actual forecast it's sitting on.
 */

const RECENT = [
  "Data-center water usage",
  "Q3 product strategy",
  "Draft email · supplier",
  "Calendar conflict",
  "SQL — quarterly forecast",
];

const CHIPS = [
  "When's the cleanest window today?",
  "Why does timing matter for carbon?",
  "What does this indicator change?",
];

type Msg = { role: "user" | "assistant"; text: string; hour: number; error?: boolean };

export default function ComputeWindowMock() {
  const { simT, hour: simHour, jobs } = useGhSim();
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hi — this chat is wired to a live model API through a server-side proxy, and it can see the carbon state in the indicator above. Ask me anything.",
      hour: 14,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const intensity = gridAt(simT);
  const ind = classify(intensity);

  async function send(preset?: string) {
    const text = (preset ?? input).trim();
    if (!text || loading) return;
    setInput("");
    const hour = simHour;
    const next: Msg[] = [...messages, { role: "user", text, hour }];
    setMessages(next);
    setLoading(true);
    try {
      const best = findCleanest(simT, 12);
      const context = `Simulated live grid, region us-east-1: it is ${hh(simHour)}:00; current intensity ${intensity} gCO2e/kWh (${ind.label}). Cleanest window in the next 12h: ${hh(best.hour)}:00 at ${best.intensity} gCO2e/kWh. Tier-2 flexible queue: ${jobs.length} job(s), ${jobs.filter((j) => j.status === "queued").length} queued. The user sees a Compute Window Indicator pill with exactly this state.`;
      const history = next
        .filter((m) => !m.error)
        .slice(1) // drop the canned greeting
        .map((m) => ({ role: m.role, content: m.text }));
      const r = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ demo: "greener-hours", context, messages: history }),
      });
      const data = await r.json();
      if (!r.ok) {
        setMessages((m) => [
          ...m,
          { role: "assistant", text: data?.error || "(the demo couldn't reach the model.)", hour, error: true },
        ]);
      } else {
        setMessages((m) => [...m, { role: "assistant", text: data?.text || "(no response)", hour }]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "(connection error — the demo couldn't reach the API.)", hour, error: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showChips = messages.length <= 1 && !loading;

  return (
    <div className={s.body}>
        <aside className={s.side}>
          <div className={s.brand}>
            <span className={s.brandMark} />
            Chat
          </div>
          <div className={s.newChat}>+ New chat</div>
          <div className={s.recentLbl}>RECENT</div>
          {RECENT.map((r, i) => (
            <div key={r} className={`${s.recent} ${i === 0 ? s.active : ""}`}>
              {r}
            </div>
          ))}
          <div className={s.user}>
            <span className={s.avatarSm} />
            Rishabh S.
          </div>
        </aside>

        <div className={s.main}>
          <div className={s.topbar}>
            <div className={s.model}>
              <span className={s.modelLbl}>MODEL</span>
              <span className={s.modelName}>Sonnet 4.7 ▾</span>
            </div>
            <div
              className={s.pill}
              style={{ borderColor: ind.varc }}
              title="Compute Window Indicator — live"
            >
              <span className={s.pillDot} style={{ background: ind.varc }} />
              <span className={s.pillText} style={{ color: ind.varc }}>
                {ind.label} · {intensity} gCO₂/kWh
              </span>
            </div>
          </div>

          <div className={s.thread} ref={scrollRef} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`${s.msg} ${m.role === "user" ? s.msgUser : ""}`}>
                <span
                  className={`${s.avatar} ${m.role === "user" ? s.u : s.a}`}
                  style={m.error ? { background: "var(--amber)" } : undefined}
                />
                <div className={s.bubble}>{m.text}</div>
              </div>
            ))}
            {loading && <div className={s.typing}>Generating response…</div>}
            {showChips && (
              <div className={s.chips}>
                {CHIPS.map((c) => (
                  <button key={c} type="button" className={s.chip} onClick={() => send(c)}>
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={s.foot}>
            <div className={s.replyRow}>
              <input
                className={s.replyInput}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Send a message…"
                disabled={loading}
                aria-label="Message"
              />
              <button
                className={s.send}
                onClick={() => send()}
                disabled={loading || !input.trim()}
                aria-label="Send"
                type="button"
              >
                ↑
              </button>
            </div>
            <div className={s.statusStrip}>
              <div className={s.statusLbl}>COMPUTE WINDOW · CURRENT</div>
              <div className={s.statusVals}>
                <span>
                  <span style={{ color: ind.varc }}>●</span> {intensity} gCO₂eq/kWh
                </span>
                <span className={s.sep}>|</span>
                <span>us-east-1</span>
                <span className={s.sep}>|</span>
                <span style={{ color: ind.varc }}>high confidence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
