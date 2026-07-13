"use client";

import { useEffect, useRef, useState } from "react";
import { PKG_ASSISTANT_PROMPTS } from "@/lib/hmPackages";
import s from "./PackagesApp.module.css";

/**
 * The in-app assistant dock. Wired to /api/ask (server-side LLM proxy —
 * OpenRouter preferred, Anthropic fallback; the key never reaches the
 * browser) with demo="hm-packages" and the CURRENT package state as bounded
 * grounding context. Degrades gracefully to an "offline" state when the
 * backend has no key configured.
 */

type Msg = { role: "user" | "assistant"; text: string; error?: boolean };

const GREETING: Msg = {
  role: "assistant",
  text: "Hi, I can see the package you've configured. Ask why a swap holds, what value engineering would cut, or where the carbon saving comes from.",
};

export default function PackagesAssistant({
  context,
  scopeLabel,
  className,
}: {
  context: string;
  scopeLabel: string;
  className?: string;
}) {
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
        body: JSON.stringify({ demo: "hm-packages", context, messages: history }),
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
                ? "The assistant backend isn't configured in this environment; everything else in the prototype still works."
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
        { role: "assistant", text: "(connection error: the assistant couldn't reach the API.)", error: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showChips = messages.length <= 2 && !loading;

  return (
    <aside className={`${s.assist} ${className ?? ""}`} aria-label="Package assistant">
      <header className={s.assistHead}>
        <span className={s.assistTitle}>
          <span className={`${s.assistDot} ${offline ? s.assistDotOff : ""}`} aria-hidden="true" />
          Package assistant
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
        {loading && <div className={s.typing}>Thinking about the {scopeLabel.toLowerCase()} package…</div>}
        {showChips && (
          <div className={s.chips}>
            {PKG_ASSISTANT_PROMPTS.map((p) => (
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
          placeholder="Ask about this package…"
          aria-label="Ask the package assistant"
          disabled={loading}
        />
        <button className={s.assistSend} type="submit" disabled={loading || !input.trim()} aria-label="Send">
          ↑
        </button>
      </form>
    </aside>
  );
}
