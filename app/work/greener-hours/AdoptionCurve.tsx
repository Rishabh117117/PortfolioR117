import "./diagrams.css";

/**
 * §4 — HTTPS adoption 1994–2025 (deck slide 13). Now on the light reframe band:
 * amber curve + area, the 2018 "Chrome flags Not Secure" inflection in amber,
 * ink/soft axes + labels on paper.
 */

const CURVE = "M 60,370 Q 130,367 190,355 T 290,320 Q 330,295 350,260 Q 370,205 410,140 Q 460,90 570,75";
const AREA = CURVE + " L 570,380 L 60,380 Z";
const Y_LABELS: [number, string][] = [
  [385, "0%"],
  [305, "25"],
  [225, "50"],
  [145, "75"],
  [65, "100"],
];
const X_LABELS: [number, string, boolean][] = [
  [65, "'94", false],
  [200, "'10", false],
  [345, "'18", true],
  [565, "'25", false],
];

export default function AdoptionCurve() {
  return (
    <svg
      viewBox="0 0 600 460"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="HTTPS share of web traffic, 1994 to 2025: a flat line that bends sharply upward after 2018, when Chrome began flagging non-HTTPS pages as Not Secure. That inflection moved providers, not users."
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <defs>
        <linearGradient id="ghHttpsFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" className="ghd-amber" stopOpacity="0.28" />
          <stop offset="100%" className="ghd-amber" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {/* axes */}
      <line className="ghs-soft" x1="60" y1="380" x2="570" y2="380" strokeWidth="1" />
      <line className="ghs-soft" x1="60" y1="50" x2="60" y2="380" strokeWidth="1" />
      {Y_LABELS.map(([y, t]) => (
        <text key={t} className="ghf-mono ghd-soft" x="50" y={y} textAnchor="end" fontSize="13">
          {t}
        </text>
      ))}

      {/* area + curve */}
      <path d={AREA} fill="url(#ghHttpsFill)" />
      <path className="ghs-amber ghd-none" d={CURVE} strokeWidth="2.5" />

      {/* inflection */}
      <line className="ghs-amber" x1="350" y1="260" x2="350" y2="70" strokeWidth="1.5" strokeDasharray="5 4" />
      <circle className="ghd-amber" cx="350" cy="260" r="7" />
      <text className="ghf-mono ghd-amber" x="360" y="95" fontSize="13">2018 · CHROME</text>
      <text className="ghf-mono ghd-amber" x="360" y="115" fontSize="13">FLAGS “NOT SECURE”</text>
      <text className="ghf-mono ghd-amber" x="360" y="135" fontSize="13">↓ THE INFLECTION</text>

      {/* x labels */}
      {X_LABELS.map(([x, t, bold]) => (
        <text
          key={t}
          className="ghf-mono ghd-soft"
          x={x}
          y="410"
          fontSize="12"
          fontWeight={bold ? 600 : 400}
        >
          {t}
        </text>
      ))}

      <text className="ghf-serif ghd-ink" x="60" y="30" fontSize="16" fontWeight="500">
        HTTPS share of web traffic · 1994–2025
      </text>
    </svg>
  );
}
