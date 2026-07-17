"use client";

import { useId, useState, type ReactNode } from "react";
import styles from "./Unfold.module.css";

/**
 * <Unfold> — the shared expand interaction used across all four project
 * pages (ROUND-2026-07-16). A disclosure widget: the whole header row is a
 * single button; clicking commits the open state; on desktop, hovering a
 * collapsed unfold peeks the first ~2 lines of the body.
 *
 * The open animation is the grid-template-rows 0fr→1fr trick (see the CSS) —
 * it animates height without a magic max-height. Reduced motion is honored by
 * the global kill-switch in globals.css, so there's no motion code here.
 *
 * variant "card" draws the card chrome (bg/border/radius/shadow + hover-lift);
 * "bare" is chrome-less for use inside an existing card or section.
 */
export default function Unfold({
  header,
  children,
  defaultOpen = false,
  peek = true,
  variant = "card",
}: {
  header: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  peek?: boolean;
  variant?: "card" | "bare";
}) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();

  const rootClass = [
    styles.root,
    variant === "card" ? `${styles.card} lift` : styles.bare,
    open ? styles.open : "",
    peek ? styles.peekable : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      <button
        type="button"
        className={styles.header}
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.headerMain}>{header}</span>
        <span className={styles.affordance}>
          <span>{open ? "− less" : "+ more"}</span>
          <svg
            className={styles.chevron}
            viewBox="0 0 12 12"
            width="10"
            height="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2.5 4.5 L6 8 L9.5 4.5" />
          </svg>
        </span>
      </button>
      <div className={styles.body} id={bodyId}>
        <div className={styles.inner}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
}
