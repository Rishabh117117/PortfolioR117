"use client";

import { useEffect, useState } from "react";

/**
 * Dev-only trial chip for the UNFOLD-POLISH label-face decision: cycles the
 * portfolio-chrome label family by stamping data-labelface on <html> (the
 * trial scopes in globals.css repoint --font-label), so the candidates can
 * be compared live on real pages. The chip renders itself in the active
 * face. layout.tsx only mounts this outside production builds.
 *
 * DELETE at lock-in, together with the trial scopes in globals.css and the
 * trial Fraunces load in layout.tsx.
 */
const FACES = [
  { key: "bricolage", label: "Aa · Bricolage" },
  { key: "fraunces", label: "Aa · Fraunces" },
  { key: "inter", label: "Aa · Inter" },
] as const;

export default function LabelFaceSwitcher() {
  const [i, setI] = useState(0);

  // restore the last-compared face across page loads (dev only)
  useEffect(() => {
    const saved = window.localStorage.getItem("labelface");
    const idx = FACES.findIndex((f) => f.key === saved);
    if (idx > 0) setI(idx);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.labelface = FACES[i].key;
    window.localStorage.setItem("labelface", FACES[i].key);
  }, [i]);

  return (
    <button
      type="button"
      onClick={() => setI((v) => (v + 1) % FACES.length)}
      title="Label typeface trial — click to cycle the chrome label face (dev only)"
      style={{
        position: "fixed",
        left: 14,
        bottom: 14,
        zIndex: 2000,
        padding: "8px 13px",
        border: "1px solid var(--line)",
        borderRadius: 999,
        background: "var(--glass-bg)",
        WebkitBackdropFilter: "var(--glass-blur)",
        backdropFilter: "var(--glass-blur)",
        boxShadow: "var(--shadow-rest)",
        fontFamily: "var(--font-label)",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--ink)",
        cursor: "pointer",
      }}
    >
      {FACES[i].label}
    </button>
  );
}
