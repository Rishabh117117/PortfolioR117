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
 * Follow — a simplified version of the deck's "with Follow" flow diagram
 * (CompareDiagram, after): the web feeds the AIs, which read/write one shared
 * Follow layer, which the whole team shares. Web → AI → Follow → humans.
 */
export function FollowThumb() {
  const orange = "#C2410C";
  const blue = "#1C39BB";
  const ink = "#2a2a28";
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      style={fill}
      aria-hidden="true"
    >
      <rect width="320" height="180" fill={orange} opacity="0.04" />

      {/* flow arrows: web → AI → Follow layer → team */}
      <g stroke={orange} strokeWidth="2" fill="none">
        <line x1="55" y1="90" x2="86" y2="90" />
        <line x1="118" y1="90" x2="150" y2="90" />
        <line x1="216" y1="90" x2="246" y2="90" />
      </g>
      <g fill={orange}>
        <path d="M86 90 l-7 -4 v8 z" />
        <path d="M150 90 l-7 -4 v8 z" />
        <path d="M246 90 l-7 -4 v8 z" />
      </g>

      {/* web (globe) */}
      <g stroke={blue} strokeWidth="2" fill="none">
        <circle cx="38" cy="90" r="15" />
        <line x1="23" y1="90" x2="53" y2="90" />
        <ellipse cx="38" cy="90" rx="6.5" ry="15" />
      </g>

      {/* AI — a cluster of assistants */}
      <g fill={orange}>
        <circle cx="103" cy="72" r="8" />
        <circle cx="103" cy="90" r="8" />
        <circle cx="103" cy="108" r="8" />
      </g>

      {/* the shared Follow layer (the differentiator) */}
      <rect x="158" y="58" width="54" height="64" rx="10" fill={blue} opacity="0.1" />
      <rect
        x="158"
        y="58"
        width="54"
        height="64"
        rx="10"
        fill="none"
        stroke={blue}
        strokeWidth="1.6"
      />
      <g fill={blue}>
        <rect x="168" y="72" width="34" height="5" rx="2.5" opacity="0.9" />
        <rect x="168" y="83" width="34" height="5" rx="2.5" opacity="0.6" />
        <rect x="168" y="94" width="34" height="5" rx="2.5" opacity="0.4" />
      </g>

      {/* the team (humans) */}
      <g fill={ink}>
        <g>
          <circle cx="272" cy="66" r="5" />
          <path d="M263 82 a9 8 0 0 1 18 0 z" />
        </g>
        <g>
          <circle cx="272" cy="90" r="5" />
          <path d="M263 106 a9 8 0 0 1 18 0 z" />
        </g>
        <g>
          <circle cx="272" cy="114" r="5" />
          <path d="M263 130 a9 8 0 0 1 18 0 z" />
        </g>
      </g>
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
