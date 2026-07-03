/* Healthy Materials page accent + page-scoped atmosphere vars (spec §6).
   Shared by /work/healthy-materials and its /prototype route so the app
   renders identically in both mounts. Additive and page-local — never
   touches global tokens. */
export const HM_ROOT_STYLE = {
  // accent — Healthy Materials sage (DESIGN.md §8) + derived shades.
  // #5C7A3A was 4.36:1 on paper (AA fail for the links that inherit accent);
  // this deeper sage clears 4.5:1 with the same hue.
  "--accent": "#4F6B33",
  "--accent-deep": "#47602D",
  "--accent-wash": "#DCE6CE",
  "--accent-tint": "#EFF3E7",
  // page-scoped atmosphere (NOT global tokens)
  "--teal": "#15302B",
  "--panel": "#1E3A33",
  "--sage-light": "#8FB06A",
  "--clay": "#B0763F",
  "--clay-deep": "#8A5A2E",
  "--clay-light": "#C99A6A",
} as React.CSSProperties;
