"use client";

import { useEffect } from "react";
import styles from "./ThemeToggle.module.css";

/* the browser-chrome color each theme paints (mirrors --paper) */
const THEME_COLOR: Record<string, string> = {
  light: "#f4f2ec",
  dark: "#171410",
};

function apply(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((m) => m.setAttribute("content", THEME_COLOR[theme]));
}

/* Stateless on purpose: which glyph shows is decided by CSS off
   [data-theme], so SSR and the first client paint always agree; the click
   handler reads the live attribute instead of mirroring it in state. */
export default function ThemeToggle() {
  // no stored choice → keep following the OS while the tab is open
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {}
      apply(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const flip = () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", next);
    } catch {}
    apply(next);
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={flip}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      {/* moon shows in light (the offer), sun in dark — CSS flips them */}
      <svg
        className={styles.moon}
        viewBox="0 0 24 24"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className={styles.sun}
        viewBox="0 0 24 24"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="4.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M12 2.2v2.1M12 19.7v2.1M2.2 12h2.1M19.7 12h2.1M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M19.1 4.9l-1.5 1.5M6.4 17.6l-1.5 1.5" />
        </g>
      </svg>
    </button>
  );
}
