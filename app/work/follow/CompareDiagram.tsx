import "./CompareDiagram.css";

/**
 * Follow — the "structural change, today" diagram (the before picture).
 *
 * Adapted from deck slide 13, re-themed: web → each teammate's own AI
 * (private/dashed) → the team → THE MEETING (last, where it's forgotten).
 * Its framed "With Follow" twin is gone — the response section now carries
 * the interactive FollowSystem instead (FOLLOW-SYS-1). Server component,
 * fully static. Namespaced under `.cdHolder`.
 */

const COLS = [140, 320, 500];
const TEAM = ["Maya", "Alex", "Sam"];

const TAG = "Before Follow";
const SUB =
  "Each teammate works with their own AI in a private thread; the only place it all meets is a meeting — which forgets what it doesn’t know.";
const ARIA =
  "Before Follow: a shared web feeds each teammate’s own AI in a private thread, with no shared memory between them; each teammate then brings work to a meeting at the bottom, which forgets.";

export default function CompareDiagram() {
  return (
    <figure className="cdHolder">
      <div className="cdPanel">
        <div className="cdPill">
          <span className="cdDot" />
          <span>{TAG}</span>
        </div>
        <svg
          className="cdCanvas"
          width="100%"
          viewBox="0 0 640 400"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={ARIA}
        >
          {/* web source (shared) */}
          <rect className="web" x="250" y="18" width="140" height="34" rx="17" />
          <text className="t-web" x="320" y="40" textAnchor="middle">
            Web
          </text>
          <line className="hair" x1="300" y1="52" x2="152" y2="96" />
          <line className="hair" x1="320" y1="54" x2="320" y2="96" />
          <line className="hair" x1="340" y1="52" x2="488" y2="96" />

          {/* AI row — plain "AI" plus a tiny possessive sub-label per column,
              read together as "each person's own AI" without AI₁/₂/₃
              subscripts. Both labels sit INSIDE the circle (not above/below
              it): the web hairline above the middle column runs straight down
              its centre-line, and the connector below runs straight down
              every column's centre-line, so an above/below label would sit on
              top of those strokes. Inside the r=28 circle there's no artwork
              at all, so nothing collides. */}
          {COLS.map((x, i) => (
            <g key={"ai" + x}>
              <circle className="ai" cx={x} cy="124" r="28" />
              <text className="t-ai" x={x} y="120" textAnchor="middle">
                AI
              </text>
              <text className="t-aisub" x={x} y="137" textAnchor="middle">
                {TEAM[i]}’s
              </text>
            </g>
          ))}

          {COLS.map((x) => (
            <line key={"au" + x} className="conn" x1={x} y1="152" x2={x} y2="216" />
          ))}
          <g className="noconn">
            <rect className="mask" x="246" y="168" width="148" height="17" rx="3" />
            <text className="t-no" x="320" y="181" textAnchor="middle">
              NO SHARED MEMORY
            </text>
          </g>
          {COLS.map((x, i) => (
            <g key={"u" + x}>
              <circle className="mem" cx={x} cy="228" r="12" />
              <text className="t-mem" x={x} y="251" textAnchor="middle">
                {TEAM[i]}
              </text>
            </g>
          ))}
          {COLS.map((x) => (
            <line key={"um" + x} className="conn" x1={x} y1="262" x2={x} y2="292" />
          ))}
          <rect className="meetbar" x="90" y="292" width="460" height="40" rx="8" />
          <text className="t-meet" x="320" y="317" textAnchor="middle">
            THE MEETING
          </text>
        </svg>
      </div>
      <figcaption className="cdSub">{SUB}</figcaption>
    </figure>
  );
}
