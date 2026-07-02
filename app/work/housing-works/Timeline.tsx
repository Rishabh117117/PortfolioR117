import styles from "./Timeline.module.css";

/**
 * Deck-style project timeline (the Healthy Materials mechanic, copy-adapted per
 * the page-local convention). Entries are the studio's real beats — partner
 * visit, site visits, the two participatory workshops, the final strategy —
 * placed on a 15-week spring-2025 axis as `at` ∈ [0,1] fractions, so re-dating
 * is a data edit, not SVG math. Week numbers are approximate by design (the
 * footnote says so). Pure render (no client JS); the chart sits on the shared
 * full-bleed glass band and horizontal-scrolls on narrow screens.
 */

type Marker = "field" | "workshop" | "milestone";
type Entry = {
  at: number;
  side: "above" | "below";
  marker: Marker;
  title: string;
  sub: string;
};

// at = (week − 1) / 14 — a fifteen-week studio
const wk = (n: number) => (n - 1) / 14;

const ENTRIES: Entry[] = [
  {
    at: wk(2),
    side: "below",
    marker: "field",
    title: "Partner visit",
    sub: "Housing Works · the People brief",
  },
  {
    at: wk(4.5),
    side: "above",
    marker: "field",
    title: "Site visits",
    sub: "thrift · dispensary · clinic · bookstore",
  },
  {
    at: wk(9),
    side: "below",
    marker: "workshop",
    title: "Poster survey",
    sub: "127 responses · 3 campuses",
  },
  {
    at: wk(12.5),
    side: "above",
    marker: "workshop",
    title: "Bridges & Barriers",
    sub: "workshop · 6 participants",
  },
  {
    at: wk(15),
    side: "below",
    marker: "milestone",
    title: "Final presentation",
    sub: "3 frameworks · under $2,700 a year",
  },
];

const TICKS = [
  { at: wk(1), label: "WK 1" },
  { at: wk(5), label: "WK 5" },
  { at: wk(10), label: "WK 10" },
  { at: wk(15), label: "WK 15" },
];

// axis geometry (viewBox 0 0 1120 300)
const AX0 = 90;
const AX1 = 1030;
const AY = 150;
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const xAt = (at: number) => AX0 + clamp01(at) * (AX1 - AX0);

function markerFill(m: Marker) {
  if (m === "field") return { fill: "var(--ink)" };
  if (m === "workshop") return { fill: "var(--accent)" };
  return { fill: "var(--paper)", stroke: "var(--ink)", strokeWidth: 2.5 }; // milestone = hollow
}

function anchorFor(at: number): "start" | "middle" | "end" {
  if (at < 0.04) return "start";
  if (at > 0.96) return "end";
  return "middle";
}

export default function Timeline() {
  const aria =
    "Project timeline, a fifteen-week studio in spring 2025: " +
    ENTRIES.map((e) => `${e.title} (${e.sub})`).join(", ") +
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
              <span className={`${styles.sw} ${styles.acc}`} /> Participatory
              workshop
            </span>
            <span className={styles.it}>
              <span className={`${styles.sw} ${styles.holo}`} /> Milestone
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
              <line
                x1={AX0 - 20}
                y1={AY}
                x2={AX1 + 20}
                y2={AY}
                stroke="var(--ink)"
                strokeWidth="2"
              />

              {/* week ticks */}
              <g
                fontFamily="IBM Plex Mono,monospace"
                fontSize="10"
                fill="var(--soft)"
                letterSpacing="1"
              >
                {TICKS.map((tk) => {
                  const x = xAt(tk.at);
                  return (
                    <g key={tk.label}>
                      <line x1={x} y1={AY} x2={x} y2={AY + 6} stroke="var(--soft)" />
                      <text x={x} y={AY + 22} textAnchor={anchorFor(tk.at)}>
                        {tk.label}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* entries */}
              {ENTRIES.map((e) => {
                const x = xAt(e.at);
                const anchor = anchorFor(e.at);
                const above = e.side === "above";
                const yConn = above ? 108 : 196;
                const yTitle = above ? 98 : 214;
                const ySub = above ? 82 : 230;
                const subFill =
                  e.marker === "workshop" ? "var(--accent)" : "var(--soft)";
                return (
                  <g key={`${e.title}-${e.at}`}>
                    <line
                      x1={x}
                      y1={AY}
                      x2={x}
                      y2={yConn}
                      stroke="var(--soft)"
                      strokeDasharray="2 3"
                    />
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
        Week numbers are approximate — the studio ran fifteen weeks, spring
        2025, from the partner brief to the final strategy.
      </p>
    </div>
  );
}
