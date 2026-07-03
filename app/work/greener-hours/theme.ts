/* §8 — Greener Hours page-scoped tokens: Forest accent (matches the /work
   card) + the deck's amber/navy atmosphere. Shared by the /prototype route;
   the case-study page keeps its own copy (it derives the accent from
   lib/projects.ts). Never global. */
export const GH_ROOT_STYLE = {
  "--accent": "#1C3B36",
  "--accent-deep": "#142B27",
  "--accent-wash": "#D7E0DD",
  "--accent-tint": "#EAF0EE",
  "--amber": "#C2410C",
  "--amber-soft": "#E8A642",
  "--amber-wash": "#F7E4D6",
  "--navy": "#1E3A5F",
  "--navy-soft": "#3A5A82",
  "--navy-deep": "#15293F",
  "--sky": "#7A9BBE",
} as React.CSSProperties;
