import "./FollowSystem.css";

/**
 * Before Follow — the problem picture, in the SAME design language as
 * FollowSystem (person·tool chips · dashed wires · a slab), but grey and
 * broken: each chat's context falls and evaporates mid-wire (no shared
 * memory between the three), and the only place anything converges is THE
 * MEETING — a navy slab that forgets. The slab geometry deliberately rhymes
 * with the response section's Follow-index slab: same shape, opposite fate.
 * Static server component; shares FollowSystem.css (`.fsys.fsysBefore`).
 */

const PAIRS = [
  { name: "Maya", tool: "Claude", av: "fsysAvClaude" },
  { name: "Alex", tool: "ChatGPT", av: "fsysAvChatGPT" },
  { name: "Sam", tool: "Gemini", av: "fsysAvGemini" },
] as const;

const WIRE_X = ["16.667%", "50%", "83.333%"] as const;

export default function BeforeSystem() {
  return (
    <figure
      className="fsys fsysBefore"
      role="img"
      aria-label="Before Follow: Maya with Claude, Alex with ChatGPT, and Sam with Gemini each work in a private thread. The context evaporates between them — no shared memory — and the only place it all meets is the meeting, which forgets what it doesn’t know."
    >
      <div className="fsysStage">
        <div className="fsysTeam">
          {PAIRS.map((p, i) => (
            <span
              key={p.name}
              className="fsysPair"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={`fsysAv ${p.av}`} aria-hidden="true">
                {p.name[0]}
              </span>
              <span className="fsysWho">
                <span className="fsysName">{p.name}</span>
                <span className="fsysTool">{p.tool}</span>
              </span>
            </span>
          ))}
        </div>

        <div className="fsysFlow">
          <svg className="fsysWires" width="100%" height="100%" aria-hidden="true">
            {WIRE_X.map((x, i) => (
              <g key={x} style={{ "--i": i } as React.CSSProperties}>
                <line className="fsysLine" x1={x} y1="0" x2={x} y2="100%" />
                {/* context drops out of each chat… and evaporates mid-wire */}
                <circle className="fsysPkt fsysPktLost" cx={x} cy="0" r="3.6" />
              </g>
            ))}
          </svg>
          <span className="fsysPill fsysPillNo" aria-hidden="true">
            <span className="fsysPillArrow">✕</span>
            no shared memory
          </span>
        </div>

        <div className="fsysMeet">
          <span className="fsysMeetTag">the only place it meets</span>
          <span className="fsysMeetName">
            The meeting<span className="fsysMeetDot">.</span>
          </span>
          <span className="fsysMeetPillars">
            partial recaps · no sources · forgets what it doesn’t know
          </span>
        </div>
      </div>

      <figcaption className="fsysSub">
        Each teammate works with their own AI in a private thread; the only
        place it all meets is a meeting — which forgets what it doesn’t know.
      </figcaption>
    </figure>
  );
}
