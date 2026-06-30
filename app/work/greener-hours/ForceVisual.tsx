import "./diagrams.css";

/**
 * §5 — the three converging forces (deck slide 6), one variant each.
 *   regulatory     — a mounting stack of disclosure mandates (newest = amber).
 *   procurement    — cloud has a per-service carbon dashboard; AI has none.
 *   infrastructure — three reusable layers exist; the fourth (amber) is the work.
 */

type Variant = "regulatory" | "procurement" | "infrastructure";

const REG_CHIPS = [
  { y: 230, rot: -3, era: "2024 · EU", title: "CSRD scope 3", hot: false },
  { y: 165, rot: 2, era: "2024 · US (SEC)", title: "SEC climate disclosure", hot: false },
  { y: 100, rot: -1.5, era: "2024 · EU", title: "EU AI Act", hot: false },
  { y: 35, rot: 1, era: "2026 · California", title: "SB 253 first reporting", hot: true },
];

const INFRA_LAYERS = [
  { y: 105, tag: "LAYER 03 · EXISTS", name: "API response headers · the plumbing" },
  { y: 170, tag: "LAYER 02 · EXISTS", name: "Cloud carbon SDKs · AWS, Azure, GCP" },
  { y: 235, tag: "LAYER 01 · EXISTS", name: "Grid intensity · WattTime, Electricity Maps" },
];

function Regulatory() {
  return (
    <>
      <line className="ghs-amber" x1="395" y1="270" x2="395" y2="50" strokeWidth="1.5" />
      <polygon className="ghd-amber" points="395,40 388,52 402,52" />
      <text className="ghf-mono ghd-amber" x="400" y="155" letterSpacing="2" fontSize="11">MOUNTING</text>
      {REG_CHIPS.map((c, i) => (
        <g key={i} transform={`translate(40, ${c.y}) rotate(${c.rot} 175 24)`}>
          <rect className={"ghd-paper " + (c.hot ? "ghs-amber" : "ghs-navy")} width="320" height="50" strokeWidth={c.hot ? 2 : 1.3} />
          <text className={"ghf-mono " + (c.hot ? "ghd-amber" : "ghd-soft")} x="22" y="22" letterSpacing="2" fontSize="11">{c.era}</text>
          <text className="ghf-serif ghd-ink" x="22" y="40" fontSize="17" fontWeight="500">{c.title}</text>
        </g>
      ))}
      <text className="ghf-mono ghd-soft" x="40" y="297" letterSpacing="2" fontSize="10">↑ EACH DEMANDS SCOPE 3 / VENDOR-LEVEL DATA</text>
    </>
  );
}

function Procurement() {
  return (
    <>
      <rect className="ghd-navy" x="0" y="0" width="420" height="28" />
      <text className="ghf-mono ghd-paper" x="210" y="19" textAnchor="middle" letterSpacing="2.5" fontSize="11">SAME BUYERS · SAME SCOPE 3 OBLIGATION</text>

      {/* cloud — has a dashboard */}
      <rect className="ghd-paper ghs-navy" x="10" y="50" width="190" height="200" strokeWidth="1.5" />
      <rect className="ghd-navy" x="10" y="50" width="190" height="32" />
      <text className="ghf-mono ghd-paper" x="22" y="71" letterSpacing="1.8" fontSize="11">CLOUD CARBON</text>
      <text className="ghf-serif ghd-amberSoft" x="180" y="74" textAnchor="end" fontSize="22" fontStyle="italic">✓</text>
      {[
        [30, 170, 58], [55, 155, 73], [80, 140, 88], [105, 160, 68], [130, 125, 103], [155, 148, 80],
      ].map(([x, y, h], i) => (
        <rect key={i} className="ghd-navy" x={x} y={y} width="18" height={h} opacity={0.6 + (i % 3) * 0.1} />
      ))}
      <line className="ghs-ink" x1="25" y1="228" x2="180" y2="228" strokeWidth="1" />
      <text className="ghf-mono ghd-soft" x="30" y="245" letterSpacing="1" fontSize="9">per-service · 2021–</text>
      <text className="ghf-serif ghd-ink" x="30" y="103" fontSize="14" fontWeight="500">AWS · Azure · GCP</text>

      {/* AI — empty */}
      <rect className="ghd-paper ghs-amber" x="220" y="50" width="190" height="200" strokeWidth="1.5" strokeDasharray="6 5" />
      <rect className="ghd-amber" x="220" y="50" width="190" height="32" />
      <text className="ghf-mono ghd-paper" x="232" y="71" letterSpacing="1.8" fontSize="11">AI CARBON</text>
      <text className="ghf-serif ghd-paper" x="390" y="74" textAnchor="end" fontSize="22" fontStyle="italic">✗</text>
      <text className="ghf-serif ghd-amber" x="315" y="180" textAnchor="middle" fontSize="86" fontStyle="italic" fontWeight="300">?</text>
      <text className="ghf-serif ghd-ink" x="315" y="220" textAnchor="middle" fontSize="13" fontWeight="500">no equivalent</text>
      <text className="ghf-mono ghd-soft" x="315" y="245" textAnchor="middle" letterSpacing="1" fontSize="9">no standard yet</text>

      <line className="ghs-amber" x1="125" y1="285" x2="295" y2="285" strokeWidth="1.5" strokeDasharray="3 3" />
      <polygon className="ghd-amber" points="305,285 295,280 295,290" />
      <text className="ghf-mono ghd-amber" x="210" y="280" textAnchor="middle" letterSpacing="1.5" fontSize="10">DEMAND TRANSFERS</text>
    </>
  );
}

function Infrastructure() {
  return (
    <>
      {/* the gap (top, amber) */}
      <rect className="ghd-amber ghs-amber" x="20" y="20" width="380" height="60" strokeWidth="1.5" />
      <text className="ghf-mono ghd-paper" opacity="0.75" x="38" y="44" letterSpacing="2" fontSize="10">LAYER 04 · MISSING — THE GAP</text>
      <text className="ghf-serif ghd-paper" x="38" y="68" fontSize="18" fontWeight="500">AI-specific stitching layer</text>
      <line className="ghs-amber" x1="210" y1="84" x2="210" y2="100" strokeWidth="1.5" strokeDasharray="3 3" />
      {INFRA_LAYERS.map((l, i) => (
        <g key={i}>
          <rect className="ghd-paper ghs-navy" x="20" y={l.y} width="380" height="55" strokeWidth="1.2" />
          <text className="ghf-mono ghd-soft" x="38" y={l.y + 22} letterSpacing="2" fontSize="10">{l.tag}</text>
          <text className="ghf-serif ghd-ink" x="38" y={l.y + 43} fontSize="16" fontWeight="500">{l.name}</text>
          <text className="ghf-serif ghd-navy" x="385" y={l.y + 30} textAnchor="end" fontSize="18" fontStyle="italic">✓</text>
        </g>
      ))}
    </>
  );
}

export default function ForceVisual({ variant }: { variant: Variant }) {
  return (
    <svg
      viewBox="0 0 420 300"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {variant === "regulatory" && <Regulatory />}
      {variant === "procurement" && <Procurement />}
      {variant === "infrastructure" && <Infrastructure />}
    </svg>
  );
}
