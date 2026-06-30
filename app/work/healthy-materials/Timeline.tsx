import {
  TL_ENTRIES,
  TL_TICKS,
  TL_FOOT,
  type TLEntry,
} from "@/lib/healthyMaterials";
import styles from "./Timeline.module.css";

/**
 * Deck-style horizontal timeline (data-driven port of Follow's hand-placed SVG).
 * Entries/ticks come from lib/healthyMaterials.ts as `at` ∈ [0,1] fractions, so
 * the chart re-spaces itself — supplying real dates is a data edit, not SVG math.
 * Pure render (no client JS). On narrow screens the SVG keeps its ratio and the
 * wrapper scrolls horizontally.
 */

// axis geometry (viewBox 0 0 1120 300)
const AX0 = 90;
const AX1 = 1030;
const AY = 150;
const xAt = (at: number) => AX0 + clamp01(at) * (AX1 - AX0);
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

function markerFill(m: TLEntry["marker"]) {
  if (m === "field") return { fill: "var(--ink)" };
  if (m === "expert") return { fill: "var(--accent)" };
  if (m === "milestone") return { fill: "var(--clay)" };
  return { fill: "var(--paper)", stroke: "var(--ink)", strokeWidth: 2.5 }; // synthesis = hollow
}

function anchorFor(at: number): "start" | "middle" | "end" {
  if (at < 0.04) return "start";
  if (at > 0.96) return "end";
  return "middle";
}

export default function Timeline() {
  const aria =
    "Project timeline: " +
    TL_ENTRIES.map((e) => `${e.title} (${e.sub})`).join(", ") +
    ".";

  return (
    <div>
      <div className={styles.glass}>
        <div className={styles.glassInner}>
        <div className={styles.legend}>
          <span className={styles.it}>
            <span className={`${styles.sw} ${styles.ink}`} /> Field research
          </span>
          <span className={styles.it}>
            <span className={`${styles.sw} ${styles.acc}`} /> Expert interview
          </span>
          <span className={styles.it}>
            <span className={`${styles.sw} ${styles.holo}`} /> Synthesis
          </span>
          <span className={styles.it}>
            <span className={`${styles.sw} ${styles.clay}`} /> Milestone
          </span>
        </div>

        <div className={styles.scroll}>
        <svg
          viewBox="0 0 1120 300"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={aria}
        >
          {/* axis */}
          <line x1={AX0 - 20} y1={AY} x2={AX1 + 20} y2={AY} stroke="var(--ink)" strokeWidth="2" />

          {/* ticks */}
          <g fontFamily="IBM Plex Mono,monospace" fontSize="10" fill="var(--soft)" letterSpacing="1">
            {TL_TICKS.map((tk) => {
              const x = xAt(tk.at);
              const anchor = anchorFor(tk.at);
              return (
                <g key={tk.label}>
                  <line x1={x} y1={AY} x2={x} y2={AY + 6} stroke="var(--soft)" />
                  <text x={x} y={AY + 22} textAnchor={anchor}>
                    {tk.label}
                  </text>
                </g>
              );
            })}
          </g>

          {/* entries */}
          {TL_ENTRIES.map((e) => {
            const x = xAt(e.at);
            const anchor = anchorFor(e.at);
            const above = e.side === "above";
            const yConn = above ? 108 : 196;
            const yTitle = above ? 98 : 214;
            const ySub = above ? 82 : 230;
            const subFill =
              e.marker === "expert"
                ? "var(--accent)"
                : e.marker === "milestone"
                  ? "var(--clay-deep, var(--clay))"
                  : "var(--soft)";
            return (
              <g key={`${e.title}-${e.at}`}>
                <line x1={x} y1={AY} x2={x} y2={yConn} stroke="var(--soft)" strokeDasharray="2 3" />
                <circle cx={x} cy={AY} r="6" {...markerFill(e.marker)} />
                <text
                  x={x}
                  y={yTitle}
                  textAnchor={anchor}
                  fontFamily="Inter,sans-serif"
                  fontSize="13.5"
                  fontWeight="700"
                  fill="var(--ink)"
                >
                  {e.title}
                </text>
                <text
                  x={x}
                  y={ySub}
                  textAnchor={anchor}
                  fontFamily="Inter,sans-serif"
                  fontSize="11"
                  fontStyle="italic"
                  fill={subFill}
                >
                  {e.sub}
                </text>
              </g>
            );
          })}
        </svg>
        </div>
        </div>
      </div>

      <p className={styles.foot}>
        <strong>What this is not:</strong>{" "}
        {TL_FOOT.replace("What this is not: ", "")}
      </p>
    </div>
  );
}
