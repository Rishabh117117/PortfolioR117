import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false },
};

/* Branded 404 — mistyped URLs stay inside the shell (nav, breadcrumbs, and
   footer render around this via the root layout). */
export default function NotFound() {
  return (
    <div className="section" style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      <div className="containerText" style={{ textAlign: "center" }}>
        <p className="kicker">404</p>
        <h1 style={{ font: "600 var(--fs-h1)/1.15 var(--font-display)", margin: "12px 0 10px" }}>
          This page isn&rsquo;t in the portfolio.
        </h1>
        <p style={{ color: "var(--soft)", maxWidth: "44ch", marginInline: "auto" }}>
          The link may be old, or the address mistyped. The work is all still
          here.
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
          <Link href="/#work" className="btn primary">
            Selected work
          </Link>
          <Link href="/archive" className="btn ghost">
            Earlier work
          </Link>
          <Link href="/about" className="btn ghost">
            About
          </Link>
        </div>
      </div>
    </div>
  );
}
