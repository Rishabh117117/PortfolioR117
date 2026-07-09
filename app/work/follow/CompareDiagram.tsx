import "./CompareDiagram.css";

/**
 * Follow — the two "structural change" diagrams (DESIGN-PHASE-1 v4).
 *
 * Two variant-specific layouts adapted from deck slide 13, re-themed:
 *   before — web → AI (private/dashed) → user (the team) → THE MEETING (last,
 *            where it's forgotten).
 *   after  — web → AI (connected) → the Follow Index (the shared layer, inserted
 *            between the AIs and the team) → user (in the loop).
 * Server component; the only motion is the read/write packets in the After
 * variant (CSS, disabled under reduced motion). Namespaced under `.cdHolder`.
 */

type Variant = "before" | "after";

const COLS = [140, 320, 500];
const TEAM = ["Maya", "Alex", "Sam"];
const PILLARS = "one memory · sources kept · disagreements flagged · who knows what";

const COPY: Record<Variant, { tag: string; sub: string; aria: string }> = {
  before: {
    tag: "Before Follow",
    sub: "Each teammate works with their own AI in a private thread; the only place it all meets is a meeting — which forgets what it doesn’t know.",
    aria:
      "Before Follow: a shared web feeds each teammate’s own AI in a private thread, with no shared memory between them; each teammate then brings work to a meeting at the bottom, which forgets.",
  },
  after: {
    tag: "With Follow",
    sub: "The Follow Index sits under every AI tool — each reads and writes the same memory, so the whole team shares it, with provenance (who said what, where, when) and contradictions kept visible.",
    aria:
      "With Follow: each teammate’s own AI reads and writes a shared Follow Index — one memory, sources kept, disagreements flagged, and who knows what — that sits between the AIs and the team, so the whole team shares one memory.",
  },
};

export default function CompareDiagram({ variant }: { variant: Variant }) {
  const after = variant === "after";
  return (
    <figure className={"cdHolder" + (after ? " after" : "")}>
      <div className="cdPanel">
        <div className="cdPill">
          <span className="cdDot" />
          <span>{COPY[variant].tag}</span>
        </div>
        <svg
          className="cdCanvas"
          width="100%"
          viewBox="0 0 640 400"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={COPY[variant].aria}
        >
          {/* web source (shared) */}
          <rect className="web" x="250" y="18" width="140" height="34" rx="17" />
          <text className="t-web" x="320" y="40" textAnchor="middle">
            Web
          </text>
          <line className="hair" x1="300" y1="52" x2="152" y2="96" />
          <line className="hair" x1="320" y1="54" x2="320" y2="96" />
          <line className="hair" x1="340" y1="52" x2="488" y2="96" />

          {/* AI row (shared markup; styled per variant) — plain "AI" plus a
              tiny possessive sub-label per column, read together as "each
              person's own AI" without AI₁/₂/₃ subscripts. Both labels sit
              INSIDE the circle (not above/below it): the web hairline above
              the middle column runs straight down its centre-line, and the
              before/after connector below runs straight down every
              column's centre-line, so an above/below label would sit on
              top of those strokes. Inside the r=28 circle there's no
              artwork at all, so nothing collides. */}
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

          {after ? (
            <>
              {COLS.map((x) => (
                <line key={"ui" + x} className="connA" x1={x} y1="152" x2={x} y2="188" />
              ))}
              {COLS.map((x, i) => (
                <circle key={"pu" + x} className={"pkt pu" + i} cx={x} cy="158" r="3.5" />
              ))}
              <rect className="indexbox" x="70" y="188" width="500" height="62" rx="10" />
              <rect className="indexedge" x="70" y="188" width="500" height="62" rx="10" />
              <text className="t-shared" x="320" y="205" textAnchor="middle">
                SHARED LAYER
              </text>
              <text className="t-index" x="320" y="227" textAnchor="middle">
                The Follow Index
              </text>
              <text className="t-pillars" x="320" y="243" textAnchor="middle">
                {PILLARS}
              </text>
              {COLS.map((x) => (
                <line key={"du" + x} className="connA" x1={x} y1="250" x2={x} y2="290" />
              ))}
              {COLS.map((x, i) => (
                <circle key={"pd" + x} className={"pkt pd" + i} cx={x} cy="256" r="3.5" />
              ))}
              {COLS.map((x, i) => (
                <g key={"u" + x}>
                  <circle className="ring" cx={x} cy="306" r="17" />
                  <circle className="memA" cx={x} cy="306" r="12" />
                  <text className="t-memA" x={x} y="332" textAnchor="middle">
                    {TEAM[i]}
                  </text>
                </g>
              ))}
            </>
          ) : (
            <>
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
            </>
          )}
        </svg>
      </div>
      <figcaption className="cdSub">{COPY[variant].sub}</figcaption>
    </figure>
  );
}
