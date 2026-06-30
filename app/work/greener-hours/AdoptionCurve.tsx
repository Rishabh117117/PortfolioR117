import "./diagrams.css";

/**
 * §10 — HTTPS adoption 1994–2025 (deck slide 13). On a dark navy band: amber
 * curve + area fill, the 2018 "Chrome flags Not Secure" inflection marked in
 * amber. Paper-toned axes/labels via ghd-onDark + opacity.
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
      aria-label="HTTPS share of web traffic, 1994 to 2025: a flat line that bends sharply upward after 2018, when Chrome began flagging non-HTTPS pages as Not Secure — the inflection that moved providers, not users."
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <defs>
        <linearGradient id="ghHttpsFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" className="ghd-amberSoft" stopOpacity="0.45" />
          <stop offset="100%" className="ghd-amberSoft" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* axes */}
      <line className="ghs-amberSoft" x1="60" y1="380" x2="570" y2="380" strokeWidth="1" />
      <line className="ghs-amberSoft" x1="60" y1="50" x2="60" y2="380" strokeWidth="1" />
      {Y_LABELS.map(([y, t]) => (
        <text key={t} className="ghf-mono ghd-onDark" opacity="0.5" x="50" y={y} textAnchor="end" fontSize="13">
          {t}
        </text>
      ))}

      {/* area + curve */}
      <path d={AREA} fill="url(#ghHttpsFill)" />
      <path className="ghs-amberSoft ghd-none" d={CURVE} strokeWidth="2.5" />

      {/* inflection — marker stays amber (graphical); labels use amber-soft for
          AA contrast on the dark navy band */}
      <line className="ghs-amber" x1="350" y1="260" x2="350" y2="70" strokeWidth="1.5" strokeDasharray="5 4" />
      <circle className="ghd-amber" cx="350" cy="260" r="7" />
      <text className="ghf-mono ghd-amberSoft" x="360" y="95" fontSize="13">2018 · CHROME</text>
      <text className="ghf-mono ghd-amberSoft" x="360" y="115" fontSize="13">FLAGS “NOT SECURE”</text>
      <text className="ghf-mono ghd-amberSoft" x="360" y="135" fontSize="13">↓ THE INFLECTION</text>

      {/* x labels */}
      {X_LABELS.map(([x, t, bold]) => (
        <text
          key={t}
          className="ghf-mono ghd-onDark"
          opacity="0.5"
          x={x}
          y="410"
          fontSize="12"
          fontWeight={bold ? 600 : 400}
        >
          {t}
        </text>
      ))}

      <text className="ghf-serif ghd-onDark" x="60" y="30" fontSize="16" fontWeight="500">
        HTTPS share of web traffic · 1994–2025
      </text>
    </svg>
  );
}
