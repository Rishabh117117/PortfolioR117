import Link from "next/link";
import styles from "./DemoCallout.module.css";

/** Honesty is designed in (§0.3): the status badge is mandatory and must be accurate. */
export type DemoStatus = "WORKING" | "SIMULATED" | "LIVE API";

export type DemoCalloutProps = {
  /** Project / demo name shown in the header label. */
  name: string;
  /** Mandatory, accurate status badge. */
  status: DemoStatus;
  title: string;
  body: string;
  buttonLabel: string;
  href: string;
  /** Accent color for the header bar/border (defaults to inherited --accent). */
  accent?: string;
  /** Render the CTA as a plain external link (new tab) instead of next/link —
      for static assets or off-site URLs (e.g. the vendored deck). */
  external?: boolean;
};

export default function DemoCallout({
  name,
  status,
  title,
  body,
  buttonLabel,
  href,
  accent,
  external,
}: DemoCalloutProps) {
  const style = accent
    ? ({ "--accent": accent } as React.CSSProperties)
    : undefined;

  return (
    <section className={styles.callout} style={style} aria-label={`Live demo: ${name}`}>
      <header className={styles.bar}>
        <span className={styles.label}>
          <span className="pulseDot" aria-hidden="true" />
          LIVE DEMO · {name}
        </span>
        <span className={styles.badge}>★ {status}</span>
      </header>

      <div className={styles.bodyWrap}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{body}</p>
        {external ? (
          <a
            href={href}
            className="btn primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="pulseDot" aria-hidden="true" />
            {buttonLabel}
          </a>
        ) : (
          <Link href={href} className="btn primary">
            <span className="pulseDot" aria-hidden="true" />
            {buttonLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
