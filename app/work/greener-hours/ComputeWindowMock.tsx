"use client";

import { useEffect, useRef, useState } from "react";
import s from "./ComputeWindowMock.module.css";

/**
 * §Tier 1 — Compute Window Indicator (deck slide 8), now LIVE. The carbon
 * indicator cycles through a simulated 24h grid; the chat is wired to the
 * server-side /api/ask proxy (the API key stays server-side). Falls back
 * gracefully when the backend isn't configured.
 */

// simulated 24h grid intensity (gCO₂/kWh)
const GRID = Array.from({ length: 24 }, (_, h) => {
  const base = 320;
  const peak = Math.sin(((h - 8) / 24) * Math.PI * 2) * 140;
  const noise = ((h * 17) % 11) - 5;
  return Math.max(140, Math.round(base + peak + noise));
});

function classify(i: number) {
  if (i < 220) return { label: "Low intensity", varc: "var(--navy-soft)" };
  if (i < 340) return { label: "Mixed", varc: "var(--amber-soft)" };
  return { label: "High intensity", varc: "var(--amber)" };
}

const RECENT = [
  "Data-center water usage",
  "Q3 product strategy",
  "Draft email · supplier",
  "Calendar conflict",
  "SQL — quarterly forecast",
];

type Msg = { role: "user" | "assistant"; text: string; hour: number; error?: boolean };

export default function ComputeWindowMock() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hi — this chat is wired to a live model API through a server-side proxy. Ask me anything; the indicator above shows the live carbon state for each response.",
      hour: 14,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [simHour, setSimHour] = useState(14);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setSimHour((h) => (h + 1) % 24), 8000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const intensity = GRID[simHour];
  const ind = classify(intensity);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const hour = simHour;
    const next: Msg[] = [...messages, { role: "user", text, hour }];
    setMessages(next);
    setLoading(true);
    try {
      const history = next.map((m) => ({ role: m.role, content: m.text }));
      const r = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
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

  return (
    <div className={s.frame}>
      <div className={s.chrome}>
        <span className={s.dot} />
        <span className={s.dot} />
        <span className={s.dot} />
        <span className={s.url}>↻ chat.ai/conversation/8e2f4a</span>
      </div>

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
              <span className={s.modelName}>Sonnet 4.6 ▾</span>
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

          <div className={s.thread} ref={scrollRef}>
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
                onClick={send}
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
    </div>
  );
}
