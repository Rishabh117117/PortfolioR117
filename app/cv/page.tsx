import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV — Rishabh Salian",
};

export default function CvPage() {
  // Content pending decision D-05 (current CV file).
  return (
    <>
      <header className="container pageHeader">
        <p className="pageEyebrow">CV</p>
        <h1 className="pageTitle">Curriculum vitae</h1>
        <p className="lede">
          An inline, typeset CV with a PDF download arrives once the current file
          is chosen.
        </p>
      </header>

      <section className="container section">
        {/* pending D-05 — inline CV */}
        <div className="placeholder">
          <strong>Inline CV</strong> — typeset content placeholder (pending D-05).
        </div>

        <p style={{ marginTop: "var(--space-5)" }}>
          {/* Disabled until the CV file is finalized (D-05). */}
          <button type="button" className="btn" disabled aria-disabled="true">
            Download PDF (coming soon)
          </button>
        </p>
      </section>
    </>
  );
}
