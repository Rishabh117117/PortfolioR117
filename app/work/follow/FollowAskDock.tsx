"use client";

import { useEffect, useRef, useState } from "react";
import { F_ASK_PROMPTS } from "@/lib/followSandbox";
import s from "./FollowSandbox.module.css";

/**
 * "Ask Follow" — the sandbox's query surface. Wired to /api/ask
 * (demo "follow") with the whole pre-loaded team memory as grounding
 * context; the server-side prompt makes answers carry provenance and flag
 * contested entries. Degrades to a labeled offline state without a key.
 */

type Msg = { role: "user" | "assistant"; text: string; error?: boolean };

const GREETING: Msg = {
  role: "assistant",
  text: "Hi — I answer from this workspace's shared memory, with provenance. Ask what's contested, who to ask, or what changed.",
};

export default function FollowAskDock({ context }: { context: string }) {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [offline, setOffline] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", text: q }];
    setMessages(next);
    setLoading(true);
    try {
      const history = next
        .filter((m) => !m.error && m !== GREETING)
        .map((m) => ({ role: m.role, content: m.text }));
      const r = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ demo: "follow", context, messages: history }),
      });
      const data = await r.json().catch(() => null);
      if (!r.ok) {
        if (r.status === 503) setOffline(true);
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            text:
              r.status === 503
                ? "The answer backend isn't configured in this environment — the memory browser and directory still work."
                : data?.error || "(Follow couldn't reach the model.)",
            error: true,
          },
        ]);
      } else {
        setOffline(false);
        setMessages((m) => [...m, { role: "assistant", text: data?.text || "(no response)" }]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "(connection error — Follow couldn't reach the API.)", error: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showChips = messages.length <= 2 && !loading;

  return (
    <aside className={s.assist} aria-label="Ask Follow">
      <header className={s.assistHead}>
        <span className={s.assistTitle}>
          <span className={`${s.assistDot} ${offline ? s.assistDotOff : ""}`} aria-hidden="true" />
          Ask Follow
        </span>
        <span className={s.assistStatus}>{offline ? "offline" : "live model"}</span>
      </header>

      <div className={s.assistThread} ref={scrollRef} aria-live="polite">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`${s.msg} ${m.role === "user" ? s.msgUser : ""} ${m.error ? s.msgErr : ""}`}
          >
            {m.text}
          </div>
        ))}
        {loading && <div className={s.typing}>Consulting the team memory…</div>}
        {showChips && (
          <div className={s.chips}>
            {F_ASK_PROMPTS.map((p) => (
              <button key={p} type="button" className={s.chip} onClick={() => send(p)}>
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        className={s.assistFoot}
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          className={s.assistInput}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your team's memory…"
          aria-label="Ask Follow"
          disabled={loading}
        />
        <button className={s.assistSend} type="submit" disabled={loading || !input.trim()} aria-label="Send">
          ↑
        </button>
      </form>
    </aside>
  );
}
