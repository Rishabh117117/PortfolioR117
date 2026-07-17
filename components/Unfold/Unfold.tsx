"use client";

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type TransitionEvent,
} from "react";
import styles from "./Unfold.module.css";

/**
 * <Unfold> — the shared expand interaction used across all four project
 * pages (ROUND-2026-07-16; interaction rebuilt in UNFOLD-POLISH). A
 * disclosure widget: the whole header row is a single button; the only
 * affordance is a chevron in the page accent. Hover never changes layout —
 * the cue is elevation (the global .lift on card variant) + the chevron.
 *
 * Open/close is a measured-height transition: CSS owns the settled states
 * (closed 0 / open auto, so defaultOpen and no-JS render correctly) and the
 * component animates between them by pinning inline px heights. This
 * replaced the grid-template-rows 0fr→1fr trick, which proved fragile
 * mid-transition. The fade stays opacity-only: a translateY on measured
 * content is what destabilized the old grid-track animation.
 *
 * variant "card" draws the card chrome (bg/border/radius/shadow + hover
 * lift); "bare" is chrome-less for use inside an existing card or section.
 */
export default function Unfold({
  header,
  children,
  defaultOpen = false,
  variant = "card",
}: {
  header: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  variant?: "card" | "bare";
}) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyRef = useRef<HTMLDivElement>(null);
  // the body's rendered height at the moment of the toggle click — the
  // animation's start value (mid-transition re-clicks start from wherever
  // the body currently is). null = no animation pending (mount).
  const startH = useRef<number | null>(null);
  const bodyId = useId();

  const toggle = () => {
    const body = bodyRef.current;
    startH.current = body ? body.getBoundingClientRect().height : null;
    setOpen((o) => !o);
  };

  // Runs after the .open class flip but before paint, so the CSS state jump
  // (0 ↔ auto) is never visible: pin the pre-toggle height, flush, then set
  // the target and let the height transition carry it.
  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body || startH.current === null) return; // mount (incl. defaultOpen): CSS state, no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      body.style.height = "";
      startH.current = null;
      return;
    }
    body.style.height = `${startH.current}px`;
    void body.offsetHeight; // flush, so the next write transitions
    body.style.height = open ? `${body.scrollHeight}px` : "0px";
    startH.current = null;
  }, [open]);

  // Once settled, hand height back to CSS: open bodies return to auto (so
  // content/viewport changes reflow naturally), closed ones to the 0 rule.
  const onBodyTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target === bodyRef.current && e.propertyName === "height") {
      if (bodyRef.current) bodyRef.current.style.height = "";
    }
  };

  const rootClass = [
    variant === "card" ? `${styles.card} lift` : styles.bare,
    open ? styles.open : "",
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
        onClick={toggle}
      >
        <span className={styles.headerMain}>{header}</span>
        <span className={styles.affordance} aria-hidden="true">
          <svg
            className={styles.chevron}
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5.5 9.25 L12 15.25 L18.5 9.25" />
          </svg>
        </span>
      </button>
      <div
        className={styles.body}
        id={bodyId}
        ref={bodyRef}
        onTransitionEnd={onBodyTransitionEnd}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
