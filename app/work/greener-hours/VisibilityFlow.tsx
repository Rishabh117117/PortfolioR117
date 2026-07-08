import "./diagrams.css";

/**
 * §3 — "the dark matter of AI energy" (deck slide 4, re-themed for a dark navy
 * band). User (visible) → AI surface → the line of visibility → data center →
 * grid → fuel sources. Renewables read sky-blue, fossils amber. Paper-toned text
 * via ghd-onDark + opacity so it sits on var(--navy-deep).
 */

export default function VisibilityFlow() {
  return (
    <svg
      viewBox="0 0 1700 520"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="The user queries the AI — everything past the line of visibility is dark matter: the AI surface, the data center, the grid, and the fuel mix (renewable and fossil) that actually powers each request."
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <defs>
        <marker id="ghArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path className="ghd-amberSoft" d="M0 0 L10 5 L0 10 z" />
        </marker>
        <marker id="ghArrSoft" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path className="ghd-onDark" opacity="0.5" d="M0 0 L10 5 L0 10 z" />
        </marker>
      </defs>

      {/* VISIBLE side labels */}
      <text className="ghf-mono ghd-onDark" opacity="0.72" x="230" y="40" letterSpacing="3" textAnchor="middle" fontSize="14">VISIBLE</text>
      <text className="ghf-mono ghd-onDark" opacity="0.62" x="230" y="62" letterSpacing="2" textAnchor="middle" fontSize="11">— THE WHOLE INTERFACE —</text>

      {/* User */}
      <circle className="ghd-none ghs-onDark" cx="230" cy="270" r="78" strokeWidth="2.5" />
      <text className="ghf-serif ghd-onDark" x="230" y="278" textAnchor="middle" fontSize="26" fontWeight="500">User</text>

      {/* user → AI */}
      <line className="ghs-amberSoft" x1="312" y1="270" x2="780" y2="270" strokeWidth="2.5" markerEnd="url(#ghArr)" />
      <text className="ghf-mono ghd-amberSoft" x="540" y="252" letterSpacing="2" textAnchor="middle" fontSize="13">QUERIES THE MODEL</text>

      {/* line of visibility */}
      <line className="ghs-amberSoft" x1="640" y1="120" x2="640" y2="430" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
      <text className="ghf-mono ghd-amberSoft" opacity="0.85" x="640" y="465" letterSpacing="2.5" textAnchor="middle" fontSize="11">↑ THE LINE OF VISIBILITY ↑</text>

      {/* dark-matter sphere */}
      <ellipse className="ghd-none ghs-onDark" cx="1170" cy="270" rx="470" ry="240" strokeWidth="1.5" strokeDasharray="7 7" opacity="0.62" />
      <text className="ghf-mono ghd-onDark" opacity="0.72" x="1170" y="40" letterSpacing="3" textAnchor="middle" fontSize="14">DARK MATTER</text>
      <text className="ghf-mono ghd-onDark" opacity="0.62" x="1170" y="62" letterSpacing="2" textAnchor="middle" fontSize="11">— EVERYTHING THAT MAKES THE INTERFACE WORK —</text>

      {/* AI surface */}
      <circle className="ghd-amber" cx="830" cy="270" r="58" />
      <text className="ghf-serif ghd-onDark" x="830" y="278" textAnchor="middle" fontSize="22" fontWeight="500">AI</text>

      {/* AI → data center */}
      <line className="ghs-onDark" x1="888" y1="270" x2="1020" y2="270" strokeWidth="1.5" opacity="0.5" markerEnd="url(#ghArrSoft)" />
      <circle className="ghd-none ghs-onDark" cx="1090" cy="270" r="68" strokeWidth="1.5" opacity="0.6" />
      <text className="ghf-serif ghd-onDark" opacity="0.88" x="1090" y="265" textAnchor="middle" fontSize="19" fontWeight="500">Data</text>
      <text className="ghf-serif ghd-onDark" opacity="0.88" x="1090" y="288" textAnchor="middle" fontSize="19" fontWeight="500">center</text>

      {/* data center → grid */}
      <line className="ghs-onDark" x1="1158" y1="270" x2="1295" y2="270" strokeWidth="1.5" opacity="0.5" markerEnd="url(#ghArrSoft)" />
      <circle className="ghd-none ghs-onDark" cx="1360" cy="270" r="62" strokeWidth="1.5" opacity="0.6" />
      <text className="ghf-serif ghd-onDark" opacity="0.88" x="1360" y="278" textAnchor="middle" fontSize="22" fontWeight="500">Grid</text>

      {/* renewables (sky) */}
      <line className="ghs-sky" x1="1395" y1="218" x2="1465" y2="148" strokeWidth="1.2" opacity="0.7" />
      <rect className="ghd-sky ghs-sky" x="1455" y="118" width="120" height="42" opacity="0.18" />
      <text className="ghf-sans ghd-sky" x="1515" y="145" textAnchor="middle" fontSize="15" fontWeight="600">Solar</text>
      <line className="ghs-sky" x1="1415" y1="252" x2="1485" y2="215" strokeWidth="1.2" opacity="0.7" />
      <rect className="ghd-sky ghs-sky" x="1480" y="195" width="120" height="42" opacity="0.18" />
      <text className="ghf-sans ghd-sky" x="1540" y="222" textAnchor="middle" fontSize="15" fontWeight="600">Wind</text>

      {/* fossils (amber) */}
      <line className="ghs-amberSoft" x1="1415" y1="290" x2="1485" y2="325" strokeWidth="1.2" opacity="0.6" />
      <rect className="ghd-amberSoft ghs-amberSoft" x="1480" y="305" width="120" height="42" opacity="0.15" />
      <text className="ghf-sans ghd-amberSoft" x="1540" y="332" textAnchor="middle" fontSize="15" fontWeight="600">Gas</text>
      <line className="ghs-amberSoft" x1="1395" y1="322" x2="1465" y2="392" strokeWidth="1.2" opacity="0.6" />
      <rect className="ghd-amberSoft ghs-amberSoft" x="1455" y="380" width="120" height="42" opacity="0.15" />
      <text className="ghf-sans ghd-amberSoft" x="1515" y="407" textAnchor="middle" fontSize="15" fontWeight="600">Coal</text>
      <line className="ghs-amberSoft" x1="1360" y1="332" x2="1360" y2="440" strokeWidth="1.2" opacity="0.6" />
      <rect className="ghd-amberSoft ghs-amberSoft" x="1300" y="430" width="120" height="42" opacity="0.15" />
      <text className="ghf-sans ghd-amberSoft" x="1360" y="457" textAnchor="middle" fontSize="15" fontWeight="600">Oil</text>

      {/* legend */}
      <circle className="ghd-sky" cx="1622" cy="135" r="5" />
      <text className="ghf-mono ghd-onDark" opacity="0.72" x="1635" y="140" letterSpacing="1.5" fontSize="11">RENEWABLE</text>
      <circle className="ghd-amberSoft" cx="1622" cy="408" r="5" />
      <text className="ghf-mono ghd-onDark" opacity="0.72" x="1635" y="413" letterSpacing="1.5" fontSize="11">FOSSIL</text>
    </svg>
  );
}
