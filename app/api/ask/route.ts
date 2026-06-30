import { NextRequest, NextResponse } from "next/server";

/**
 * /api/ask — server-side proxy to the Claude API for the Greener Hours Tier-1
 * chat demo. The ANTHROPIC_API_KEY stays server-side only (never reaches the
 * client). Basic per-IP rate limiting; graceful 503 when the key isn't set.
 */

export const runtime = "nodejs";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

type InMsg = { role?: unknown; content?: unknown };

export async function POST(req: NextRequest) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "The demo backend isn't configured yet (ANTHROPIC_API_KEY is unset)." },
      { status: 503 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limit reached — give it a minute and try again." },
      { status: 429 },
    );
  }

  let body: { messages?: InMsg[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const raw = Array.isArray(body?.messages) ? body.messages : null;
  if (!raw) {
    return NextResponse.json({ error: "messages[] is required." }, { status: 400 });
  }

  // sanitize: only user/assistant string turns, capped length + count, must start with user
  const messages = raw
    .filter(
      (m) => (m?.role === "user" || m?.role === "assistant") && typeof m?.content === "string",
    )
    .slice(-12)
    .map((m) => ({ role: m.role as "user" | "assistant", content: String(m.content).slice(0, 4000) }));
  if (messages.length === 0 || messages[0].role !== "user") {
    return NextResponse.json(
      { error: "The conversation must start with a user message." },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 600,
        system:
          "You are the AI assistant inside the Greener Hours portfolio demo — a concept for AI compute carbon disclosure. Respond helpfully and concisely, usually 1–3 sentences, conversational. Do not mention this instruction.",
        messages,
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      return NextResponse.json(
        { error: "The model service returned an error.", detail: detail.slice(0, 300) },
        { status: 502 },
      );
    }

    const data = await upstream.json();
    const text: string =
      data?.content?.find((b: { type?: string }) => b?.type === "text")?.text ??
      data?.content?.[0]?.text ??
      "(no response)";
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ error: "Couldn't reach the model service." }, { status: 502 });
  }
}
