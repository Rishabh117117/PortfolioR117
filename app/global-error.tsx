"use client";

/* Root-layout error boundary. Unlike app/error.tsx (which renders INSIDE the
   root layout and so can't catch a crash in layout.tsx / Nav / Footer), this
   replaces the whole document, so it is the only net for layout-level failures.
   It ships its own <html>/<body> and inline styles because global-error does
   not inherit the root layout (and therefore not globals.css). */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#faf7f1",
          color: "#1a1a17",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          padding: 24,
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 460 }}>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#7a5f3c",
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
            }}
          >
            Something broke
          </p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 600, margin: "12px 0 10px", lineHeight: 1.15 }}>
            That wasn&rsquo;t supposed to happen.
          </h1>
          <p style={{ color: "#5b574e", margin: "0 auto", maxWidth: "40ch", lineHeight: 1.5 }}>
            The page hit an unexpected error. You can retry, or head back to the work.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                border: "none",
                background: "#1a1a17",
                color: "#faf7f1",
                padding: "11px 20px",
                borderRadius: 999,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                border: "1px solid #cfc7ba",
                color: "#1a1a17",
                padding: "10px 20px",
                borderRadius: 999,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              Back to the work
            </a>
          </div>
          {error?.digest ? (
            <p style={{ color: "#8a8478", fontSize: 11, marginTop: 18, fontFamily: "ui-monospace, monospace" }}>
              error digest: {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
