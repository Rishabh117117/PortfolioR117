"use client";

/* Branded runtime-error boundary — a crash in any route (including the four
   interactive demo apps) lands here instead of Next's bare default screen.
   Must be a client component per the app-router contract. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="section" style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      <div className="containerText" style={{ textAlign: "center" }}>
        <p className="kicker">Something broke</p>
        <h1 style={{ font: "600 var(--fs-h1)/1.15 var(--font-display)", margin: "12px 0 10px" }}>
          That wasn&rsquo;t supposed to happen.
        </h1>
        <p style={{ color: "var(--soft)", maxWidth: "46ch", marginInline: "auto" }}>
          The rest of the portfolio is fine — you can retry this page or head
          back to the work.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 24,
          }}
        >
          <button type="button" className="btn primary" onClick={() => reset()}>
            Try again
          </button>
          <a href="/" className="btn ghost">
            Back to the work
          </a>
        </div>
        {error?.digest ? (
          <p className="mono" style={{ color: "var(--soft)", fontSize: 11, marginTop: 18 }}>
            error digest: {error.digest}
          </p>
        ) : null}
      </div>
    </div>
  );
}
