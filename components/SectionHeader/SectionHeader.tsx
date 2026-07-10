import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

type Props = {
  /**
   * Section index — rendered zero-padded as the chaptered mark, e.g.
   * n={1} → "§ 01 · ". Omit for an unnumbered eyebrow (sub-heads).
   */
  n?: number;
  children: ReactNode;
  /**
   * Heading tag, to preserve each page's document outline. Defaults to a
   * non-heading <p> (the eyebrow role — the real heading is the title below).
   */
  as?: "p" | "h2" | "h3";
  /** Center the eyebrow (the Greener Hours "reframe" spine). */
  center?: boolean;
  className?: string;
};

/**
 * SectionHeader — the shared numbered section eyebrow.
 *
 * The Greener Hours "§ 01 · The problem" treatment, promoted to one source of
 * truth for all four flagship case studies. Mono, uppercase, per-project accent
 * (via --accent). Color is driven by --sh-color (defaults to --accent), so a
 * dark band only has to set that one custom property to switch to a legible
 * tint — custom properties cascade across CSS-module boundaries, class names
 * don't. See each page's dark-band rule (.navy / .teal / …).
 */
export default function SectionHeader({
  n,
  children,
  as: Tag = "p",
  center = false,
  className,
}: Props) {
  return (
    <Tag
      className={[styles.head, center ? styles.center : null, className]
        .filter(Boolean)
        .join(" ")}
    >
      {n != null ? `§ ${String(n).padStart(2, "0")} · ` : null}
      {children}
    </Tag>
  );
}
