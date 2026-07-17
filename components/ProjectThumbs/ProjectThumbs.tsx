/**
 * Bespoke inline-SVG thumbnails for the two flagship projects with no raster
 * assets (Follow, Greener Hours). Each is a simplified take on that case study's
 * own on-page artifact, so the home grid reads as one family with the
 * photo-backed cards. Pure markup (server components), decorative (aria-hidden),
 * no text — they fill a 16:9 media box and slice-crop gracefully in the featured
 * 2.3:1 slot.
 */

const fill = {
  display: "block",
  width: "100%",
  height: "100%",
} as const;

/**
 * Follow — the case study's own "With Follow" diagram (CompareDiagram, after
 * variant — the one that introduces the Follow Index), restated at thumbnail
 * scale: same layout, labels and palette, adapted to 16:9 with the pill/caption
 * chrome dropped and type sized up so it survives the card scale-down. Colors
 * are the Follow page accents (see app/work/follow/page.tsx rootStyle) +
 * CompareDiagram.css scoped values.
 */
export function FollowThumb() {
  const orange = "#C2410C"; // --accent
  const deep = "#9E340A"; // --accent-deep
  const wash = "#F7E0D4"; // --accent-wash
  const tint = "#FBEFE7"; // --accent-tint
  const navy = "#0a1f33"; // --cd-navy
  const slate = "#64748b"; // --cd-slate
  const ink = "#1a1a1a";
  const ink2 = "#46443f"; // --cd-ink2
  const mono = { fontFamily: "var(--font-label)" } as const;
  const COLS = [140, 320, 500];
  const TEAM = ["Maya", "Alex", "Sam"];
  const SUB = ["₁", "₂", "₃"];
  return (
    <svg
      viewBox="0 0 640 360"
      preserveAspectRatio="xMidYMid slice"
      style={fill}
      aria-hidden="true"
    >
      <rect width="640" height="360" fill={orange} opacity="0.04" />

      {/* web source (shared) */}
      <rect
        x="250"
        y="32"
        width="140"
        height="32"
        rx="16"
        fill="#fff"
        stroke={ink}
        strokeWidth="1.3"
      />
      <text x="320" y="53" textAnchor="middle" fontSize="15" fontWeight="600" fill={ink}>
        Web
      </text>
      <g stroke={slate} strokeWidth="1" opacity="0.5">
        <line x1="300" y1="64" x2="152" y2="100" />
        <line x1="320" y1="66" x2="320" y2="100" />
        <line x1="340" y1="64" x2="488" y2="100" />
      </g>

      {/* AI row — solid + connected (the after variant) */}
      {COLS.map((x, i) => (
        <g key={`ai${x}`}>
          <circle cx={x} cy="126" r="26" fill={tint} stroke={orange} strokeWidth="2" />
          <text
            x={x}
            y="131"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill={deep}
            style={mono}
          >
            AI{SUB[i]}
          </text>
        </g>
      ))}
      {COLS.map((x) => (
        <line
          key={`up${x}`}
          x1={x}
          y1="152"
          x2={x}
          y2="186"
          stroke={orange}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      ))}

      {/* the Follow Index (the shared layer) */}
      <rect x="70" y="186" width="500" height="62" rx="10" fill={wash} />
      <rect
        x="70"
        y="186"
        width="500"
        height="62"
        rx="10"
        fill="none"
        stroke={orange}
        strokeWidth="2.5"
      />
      <text
        x="320"
        y="204"
        textAnchor="middle"
        fontSize="10.5"
        fontWeight="600"
        letterSpacing="0.1em"
        fill={deep}
        style={mono}
      >
        SHARED LAYER
      </text>
      <text x="320" y="227" textAnchor="middle" fontSize="19" fontWeight="600" fill={ink}>
        The Follow Index
      </text>
      <text
        x="320"
        y="242"
        textAnchor="middle"
        fontSize="10.5"
        letterSpacing="0.04em"
        fill={ink2}
        style={mono}
      >
        shared memory · provenance · contradiction · directory
      </text>
      {COLS.map((x) => (
        <line
          key={`dn${x}`}
          x1={x}
          y1="248"
          x2={x}
          y2="278"
          stroke={orange}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      ))}

      {/* the team — in the loop */}
      {COLS.map((x, i) => (
        <g key={`u${x}`}>
          <circle cx={x} cy="294" r="16" fill="none" stroke={orange} strokeWidth="2" opacity="0.85" />
          <circle cx={x} cy="294" r="11.5" fill={navy} />
          <text x={x} y="330" textAnchor="middle" fontSize="12.5" fill={ink2}>
            {TEAM[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

/**
 * Greener Hours — a simplified version of the Tier-2 scheduler artifact: the 24h
 * grid-intensity forecast (clean hours forest, dirty hours amber) with a job
 * scheduled down into the cleanest window.
 */
export function GreenerHoursThumb() {
  const forest = "#1C3B36";
  const amber = "#C2410C";
  const amberSoft = "#E8A642";
  const N = 24;
  const baseY = 150;
  const maxH = 104;
  const x0 = 22;
  const x1 = 298;
  const step = (x1 - x0) / N;
  const bw = step - 3;
  // dirtier around midday, cleaner overnight — a clean valley left of centre
  const vals = Array.from({ length: N }, (_, h) => 0.5 + 0.42 * Math.sin(((h - 8) / N) * Math.PI * 2));
  const cleanIdx = vals.indexOf(Math.min(...vals));
  const tone = (v: number) => (v < 0.34 ? forest : v < 0.62 ? amberSoft : amber);
  const cx = x0 + cleanIdx * step + bw / 2;
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      style={fill}
      aria-hidden="true"
    >
      <rect width="320" height="180" fill={forest} opacity="0.05" />

      {/* 24h grid-intensity bars */}
      {vals.map((v, i) => {
        const h = Math.max(6, v * maxH);
        return (
          <rect
            key={i}
            x={x0 + i * step}
            y={baseY - h}
            width={bw}
            height={h}
            rx="1.5"
            fill={tone(v)}
            opacity="0.9"
          />
        );
      })}
      <line x1={x0} y1={baseY} x2={x1} y2={baseY} stroke={forest} strokeWidth="1.5" opacity="0.5" />

      {/* job scheduled into the cleanest (green) window */}
      <line x1={cx} y1="26" x2={cx} y2={baseY} stroke={forest} strokeWidth="1.5" strokeDasharray="2 3" />
      <path d={`M${cx} 40 l-5 -6 h10 z`} fill={forest} />
      <rect x={cx - 22} y="14" width="44" height="18" rx="9" fill={forest} />
      <path
        d={`M${cx - 6} 23 l4 4 l6 -8`}
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
