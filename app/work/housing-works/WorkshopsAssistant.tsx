"use client";

import { useEffect, useRef, useState } from "react";
import { HW_ASSISTANT_PROMPTS } from "@/lib/hwWorkshops";
import s from "./WorkshopsApp.module.css";

/**
 * "Ask the archive" — the tool's assistant dock. Wired to /api/ask
 * (demo "hw-workshops") with the live program state — bench, queue, open
 * needs, and every archived session summary — as bounded grounding context.
 * Degrades to a labeled offline state when no key is configured server-side.
 */

type Msg = { role: "user" | "assistant"; text: string; error?: boolean };

const GREETING: Msg = {
  role: "assistant",
  text: "Hi — I can see the whole program: the bench, the needs queue, and every archived session. Ask me who should teach something, or what a past session covered.",
};

export default function WorkshopsAssistant({ context }: { context: string }) {
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
        body: JSON.stringify({ demo: "hw-workshops", context, messages: history }),
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
                ? "The assistant backend isn't configured in this environment — the matcher, sessions, and archive all still work."
                : data?.error || "(the assistant couldn't reach the model.)",
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
        { role: "assistant", text: "(connection error — the assistant couldn't reach the API.)", error: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showChips = messages.length <= 2 && !loading;

  return (
    <aside className={s.assist} aria-label="Ask the archive">
      <header className={s.assistHead}>
        <span className={s.assistTitle}>
          <span className={`${s.assistDot} ${offline ? s.assistDotOff : ""}`} aria-hidden="true" />
          Ask the archive
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
        {loading && <div className={s.typing}>Reading the archive…</div>}
        {showChips && (
          <div className={s.chips}>
            {HW_ASSISTANT_PROMPTS.map((p) => (
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
          placeholder="Ask the program anything…"
          aria-label="Ask the archive"
          disabled={loading}
        />
        <button className={s.assistSend} type="submit" disabled={loading || !input.trim()} aria-label="Send">
          ↑
        </button>
      </form>
    </aside>
  );
}
