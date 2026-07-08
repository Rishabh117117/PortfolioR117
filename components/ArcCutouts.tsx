/* Cut-out "sticker" visuals for the home page's arc section — one per era.
   Bespoke cut-paper SVG (no photography: the archive imagery is slide crops,
   which the imagery rules exclude). Server components, aria-hidden, colored
   with the site palette: archive gold (objects), Persian Blue (interfaces),
   and the four flagship accents as the systems mesh. The die-cut white ring +
   soft shadow do the "cut out and stuck on" read; rotation happens at the
   usage site so the artwork stays upright here. */

const ringShadow = { filter: "drop-shadow(0 2px 5px rgba(23, 24, 26, 0.22))" };

/* Irregular heptagon-ish paper blob, roughly centered in a 120×120 box.
   Reused as the white die-cut ring (full) and the inner paper (scaled). */
const BLOB =
  "M60 6 C82 4 104 16 110 38 C116 60 112 86 94 102 C76 118 44 118 26 104 " +
  "C8 90 2 64 8 42 C14 20 38 8 60 6 Z";

function Sticker({
  paper,
  children,
}: {
  paper: string;
  children: React.ReactNode;
}) {
  return (
    <g style={ringShadow}>
      <path d={BLOB} fill="#fff" />
      <g transform="translate(60 60) scale(0.88) translate(-60 -60)">
        <path d={BLOB} fill={paper} />
      </g>
      {children}
    </g>
  );
}

/* OBJECTS — industrial-design era: a chunky cut-paper vessel (nod to the
   heater/product work), gold + cream papers. */
export function ObjectsCutout() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <Sticker paper="#f3ead9">
        {/* base shadow strip */}
        <rect x="34" y="90" width="52" height="6" rx="3" fill="#ddd1b8" />
        {/* body */}
        <rect x="32" y="46" width="56" height="44" rx="15" fill="#9a7b4f" />
        {/* torn paper highlight on the body */}
        <path d="M42 56 C52 53 66 53 76 56 L75 60 C66 57 52 57 43 60 Z" fill="#f7f1e4" opacity="0.4" />
        {/* spout hint */}
        <path d="M86 56 C94 58 97 64 95 70 L87 68 C89 64 88 60 85 59 Z" fill="#7a5f3c" />
        {/* lid + knob */}
        <ellipse cx="60" cy="46" rx="21" ry="7.5" fill="#7a5f3c" />
        <circle cx="60" cy="38" r="5.5" fill="#2a2620" />
      </Sticker>
    </svg>
  );
}

/* INTERFACES — product & UX era: a cut-paper phone with abstract blocks
   (bars, not text), Persian Blue papers. */
export function InterfacesCutout() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <Sticker paper="#e9edfb">
        {/* tilted card peeking behind */}
        <rect x="24" y="42" width="26" height="34" rx="5" fill="#c3cdf2" transform="rotate(-9 37 59)" />
        {/* phone */}
        <rect x="40" y="22" width="44" height="76" rx="11" fill="#1c39bb" />
        <rect x="45" y="31" width="34" height="58" rx="6" fill="#f6f7fd" />
        {/* screen blocks — image, two bars, action dot */}
        <rect x="49" y="36" width="26" height="18" rx="3" fill="#93a5e8" />
        <rect x="49" y="59" width="26" height="4.5" rx="2.25" fill="#c3cdf2" />
        <rect x="49" y="67" width="18" height="4.5" rx="2.25" fill="#c3cdf2" />
        <circle cx="70" cy="81" r="5" fill="#1c39bb" />
        {/* speaker dot */}
        <circle cx="62" cy="26.5" r="1.6" fill="#f6f7fd" />
      </Sticker>
    </svg>
  );
}

/* SYSTEMS — the AI-systems era: a cut-paper mesh, the four flagship accents
   wired to one hub (the four projects, one practice). */
export function SystemsCutout() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <Sticker paper="#eef0ea">
        {/* paper connectors */}
        <g stroke="#cfc9ba" strokeWidth="5" strokeLinecap="round">
          <line x1="60" y1="60" x2="33" y2="36" />
          <line x1="60" y1="60" x2="87" y2="34" />
          <line x1="60" y1="60" x2="33" y2="86" />
          <line x1="60" y1="60" x2="87" y2="84" />
        </g>
        {/* hub */}
        <circle cx="60" cy="60" r="11" fill="#fff" stroke="#2a2620" strokeWidth="3" />
        <circle cx="60" cy="60" r="3.5" fill="#2a2620" />
        {/* flagship nodes: Follow · Greener Hours · Healthy Materials · Housing Works */}
        <circle cx="33" cy="36" r="7" fill="#c2410c" stroke="#fff" strokeWidth="2.5" />
        <circle cx="87" cy="34" r="7" fill="#1c3b36" stroke="#fff" strokeWidth="2.5" />
        <circle cx="33" cy="86" r="7" fill="#4f6b33" stroke="#fff" strokeWidth="2.5" />
        <circle cx="87" cy="84" r="7" fill="#c0263b" stroke="#fff" strokeWidth="2.5" />
      </Sticker>
    </svg>
  );
}
