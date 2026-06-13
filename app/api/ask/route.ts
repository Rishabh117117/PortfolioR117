import { NextResponse } from "next/server";

// This route will LATER proxy requests to the Anthropic API so that
// ANTHROPIC_API_KEY never reaches the client. Scaffold only — no logic yet.
// TODO: rate limiting
export async function POST() {
  return NextResponse.json({ status: "not implemented" }, { status: 501 });
}
