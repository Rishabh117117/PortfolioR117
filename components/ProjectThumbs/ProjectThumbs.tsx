/**
 * Bespoke inline-SVG thumbnails for the two flagship projects with no raster
 * assets (Follow, Greener Hours). Each echoes its case-study page's diagram
 * language so the home grid reads as one family with the photo-backed cards.
 * Pure markup (server components), decorative (aria-hidden), no text — they
 * fill a 16:9 media box and slice-crop gracefully in the featured 2.3:1 slot.
 */

const fill = {
  display: "block",
  width: "100%",
  height: "100%",
} as const;

/** Follow — the pipeline motif: web → AI → shared memory → you. */
export function FollowThumb() {
  const orange = "#C2410C";
  const blue = "#1C39BB";
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      style={fill}
      aria-hidden="true"
    >
      <rect width="320" height="180" fill={blue} opacity="0.04" />

      {/* connectors */}
      <g stroke={orange} strokeWidth="2" fill="none">
        <line x1="66" y1="90" x2="102" y2="90" />
        <line x1="146" y1="90" x2="180" y2="90" />
        <line x1="222" y1="90" x2="258" y2="90" />
      </g>
      <g fill={orange}>
        <path d="M102 90 l-7 -4 v8 z" />
        <path d="M180 90 l-7 -4 v8 z" />
        <path d="M258 90 l-7 -4 v8 z" />
      </g>

      {/* web (globe) */}
      <g stroke={blue} strokeWidth="2" fill="none">
        <circle cx="44" cy="90" r="16" />
        <line x1="28" y1="90" x2="60" y2="90" />
        <ellipse cx="44" cy="90" rx="7" ry="16" />
      </g>

      {/* AI node */}
      <circle cx="124" cy="90" r="17" fill={orange} />
      <g stroke="#fff" strokeWidth="2" strokeLinecap="round">
        <line x1="124" y1="82" x2="124" y2="98" />
        <line x1="116" y1="90" x2="132" y2="90" />
        <line x1="118.5" y1="84.5" x2="129.5" y2="95.5" opacity="0.7" />
        <line x1="129.5" y1="84.5" x2="118.5" y2="95.5" opacity="0.7" />
      </g>

      {/* shared memory (stacked layers) */}
      <g fill={blue}>
        <rect x="184" y="79" width="32" height="6" rx="3" opacity="0.9" />
        <rect x="184" y="87" width="32" height="6" rx="3" opacity="0.6" />
        <rect x="184" y="95" width="32" height="6" rx="3" opacity="0.35" />
      </g>

      {/* you */}
      <g fill="#2a2a28">
        <circle cx="278" cy="83" r="6" />
        <path d="M266 102 a12 11 0 0 1 24 0 z" />
      </g>
    </svg>
  );
}

/** Greener Hours — a carbon-intensity day curve with the greener window shaded. */
export function GreenerHoursThumb() {
  const amber = "#C2410C";
  const forest = "#1C3B36";
  // one wave: dirtier at the ends, a low (greener) valley through the middle
  const curve =
    "M20 72 C60 52 104 58 138 118 C158 150 196 150 222 116 C252 78 282 62 300 66";
  const area = `${curve} L300 150 L20 150 Z`;
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      style={fill}
      aria-hidden="true"
    >
      <rect width="320" height="180" fill={forest} opacity="0.05" />

      {/* greener-hours window */}
      <rect x="150" y="30" width="70" height="120" fill={forest} opacity="0.14" />

      {/* carbon area + curve */}
      <path d={area} fill={amber} opacity="0.12" />
      <path d={curve} fill="none" stroke={amber} strokeWidth="2.5" />

      {/* baseline */}
      <line x1="20" y1="150" x2="300" y2="150" stroke={forest} strokeWidth="1.5" opacity="0.5" />

      {/* sun over the greener window */}
      <g stroke={forest} strokeWidth="2" strokeLinecap="round" fill="none">
        <circle cx="185" cy="58" r="8" fill={forest} fillOpacity="0.15" />
        <line x1="185" y1="42" x2="185" y2="47" />
        <line x1="185" y1="69" x2="185" y2="74" />
        <line x1="169" y1="58" x2="174" y2="58" />
        <line x1="196" y1="58" x2="201" y2="58" />
        <line x1="173.5" y1="46.5" x2="177" y2="50" />
        <line x1="193" y1="66" x2="196.5" y2="69.5" />
      </g>
    </svg>
  );
}
