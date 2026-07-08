/* =========================================================================
   Healthy Materials Packages — data + math for the working prototype on
   /work/healthy-materials (and /work/healthy-materials/prototype).

   HONESTY: every figure is ILLUSTRATIVE — representative magnitudes chosen to
   behave like the real thing (installed $/unit, A1–A3 kgCO₂e/unit), NOT
   measured quotes or verified EPDs. The app surfaces this label everywhere.
   Cert names are real-world frameworks (HPD, Declare, GreenGuard Gold, NAF,
   CDPH v1.2, EGC) used the way the capstone's interventions reference them.
   ========================================================================= */

export type VocClass = "high" | "moderate" | "low" | "none";

export type SpecOption = {
  name: string;
  detail: string; // short spec descriptor shown under the name
  unitCost: number; // $ per unit, installed (illustrative)
  carbon: number; // kgCO₂e per unit, embodied A1–A3 (illustrative)
  voc: VocClass;
};

export type PackageLine = {
  id: string;
  category: string; // "Flooring"
  scopeNote: string; // "living + bedrooms"
  qty: number;
  unit: "sf" | "lf" | "lot" | "ea";
  bau: SpecOption; // business-as-usual spec
  swap: SpecOption; // the vetted healthier / lower-carbon swap
  certs: string[]; // transparency + health frameworks on the swap
  suppliers: number; // regional stocking suppliers (supply-fragility signal)
  lead: string; // lead time
  ve: "survives" | "watch"; // value-engineering survival read
  defense: string; // the pitch that keeps the swap in the spec
  egc: string; // Enterprise Green Communities tie-in
};

export type PackageScope = {
  id: string;
  label: string;
  areaNote: string;
  blurb: string; // one-line story for the scope
  lines: PackageLine[];
};

/* ---- fictional-but-plausible project context for the app chrome ---- */
export const PKG_PROJECT = {
  name: "Melrose Senior Apartments",
  meta: "Bronx, NY · 48-unit moderate rehab",
  standard: "Enterprise Green Communities aligned",
  url: "packages.healthymaterials.app/projects/melrose-senior",
};

export const PKG_HONESTY =
  "Concept prototype · illustrative data — representative magnitudes, not measured quotes or verified EPDs";

export const PKG_SCOPES: PackageScope[] = [
  /* ================= UNIT RENOVATION — the flagship scope ================ */
  {
    id: "unit",
    label: "Unit renovation",
    areaNote: "typical 1-BR unit · ~685 sf",
    blurb:
      "The flagship package: six swaps that hold first cost within ~3% while halving embodied carbon.",
    lines: [
      {
        id: "unit-floor",
        category: "Flooring",
        scopeNote: "living + bedrooms",
        qty: 585,
        unit: "sf",
        bau: {
          name: "Luxury vinyl plank (LVT)",
          detail: "6×48 glue-down plank · 20 mil wear layer",
          unitCost: 6.4,
          carbon: 1.25,
          voc: "moderate",
        },
        swap: {
          name: "Natural linoleum sheet",
          detail: "2.5 mm sheet · heat-welded seams · bio-based binder",
          unitCost: 6.75,
          carbon: 0.45,
          voc: "low",
        },
        certs: ["HPD published", "GreenGuard Gold"],
        suppliers: 3,
        lead: "2–3 wk",
        ve: "survives",
        defense:
          "Targets the same wear and damp-mop cleanability LVT is specced for, at a premium small enough to survive a value-engineering pass.",
        egc: "EGC · Healthy Living Environment — resilient flooring",
      },
      {
        id: "unit-paint",
        category: "Paint",
        scopeNote: "walls + ceilings, 2 coats",
        qty: 1850,
        unit: "sf",
        bau: {
          name: "Conventional interior acrylic",
          detail: "contractor grade · ~50 g/L VOC",
          unitCost: 2.1,
          carbon: 0.28,
          voc: "moderate",
        },
        swap: {
          name: "Zero-VOC acrylic",
          detail: "<5 g/L · scrubbable eggshell",
          unitCost: 2.16,
          carbon: 0.24,
          voc: "none",
        },
        certs: ["GreenGuard Gold", "CDPH v1.2 compliant"],
        suppliers: 6,
        lead: "stock",
        ve: "survives",
        defense:
          "Zero-VOC lines are cost-parity at contractor grade now — the spec holds even when the paint schedule gets rebid.",
        egc: "EGC · low-VOC paints and coatings",
      },
      {
        id: "unit-insul",
        category: "Insulation",
        scopeNote: "demising walls, thermal + acoustic",
        qty: 460,
        unit: "sf",
        bau: {
          name: "Closed-cell spray foam",
          detail: "2 lb ccSPF · HFO-blown",
          unitCost: 2.9,
          carbon: 5.8,
          voc: "high",
        },
        swap: {
          name: "Mineral wool batt",
          detail: '3.5" unfaced · friction-fit',
          unitCost: 2.35,
          carbon: 2.3,
          voc: "low",
        },
        certs: ["Formaldehyde-free", "HPD published"],
        suppliers: 4,
        lead: "stock",
        ve: "survives",
        defense:
          "The rare swap that is cheaper outright — and the fire and acoustic ratings come free.",
        egc: "EGC · envelope + healthy living",
      },
      {
        id: "unit-case",
        category: "Kitchen casework",
        scopeNote: "base + wall cabinet boxes",
        qty: 14,
        unit: "lf",
        bau: {
          name: "Particleboard boxes",
          detail: "melamine-faced PB · urea-formaldehyde binder",
          unitCost: 185,
          carbon: 26,
          voc: "high",
        },
        swap: {
          name: "NAF plywood boxes",
          detail: "no-added-formaldehyde ply · UV-cured finish",
          unitCost: 197,
          carbon: 21,
          voc: "low",
        },
        certs: ["NAF — CARB exempt", "FSC available"],
        suppliers: 2,
        lead: "4–6 wk",
        ve: "watch",
        defense:
          "Cabinet boxes are the unit's largest formaldehyde source; the ~6% premium is the package's most exposed line, so it is named as the health upgrade — not hidden in the millwork budget.",
        egc: "EGC · composite wood emissions",
      },
      {
        id: "unit-counter",
        category: "Countertop",
        scopeNote: "kitchen + bath vanity top",
        qty: 32,
        unit: "sf",
        bau: {
          name: "HPL laminate on particleboard",
          detail: "post-formed laminate top",
          unitCost: 46,
          carbon: 8.5,
          voc: "moderate",
        },
        swap: {
          name: "Paper-composite solid surface",
          detail: "FSC paper phenolic slab",
          unitCost: 51,
          carbon: 6.8,
          voc: "low",
        },
        certs: ["Declare label", "HPD published"],
        suppliers: 2,
        lead: "3–4 wk",
        ve: "watch",
        defense:
          "Same fabricators, same install day; the delta is one line in the kitchen budget and it removes the particleboard core.",
        egc: "EGC · healthy interior finishes",
      },
      {
        id: "unit-seal",
        category: "Adhesives & sealants",
        scopeNote: "whole-unit allowance",
        qty: 1,
        unit: "lot",
        bau: {
          name: "Solvent-based set",
          detail: "multi-purpose construction adhesive + acrylic caulks",
          unitCost: 420,
          carbon: 34,
          voc: "high",
        },
        swap: {
          name: "Low-VOC, SDS-screened set",
          detail: "SCAQMD 1168-compliant adhesives + sealants",
          unitCost: 440,
          carbon: 30,
          voc: "low",
        },
        certs: ["CDPH v1.2 compliant"],
        suppliers: 5,
        lead: "stock",
        ve: "survives",
        defense: "Invisible in the budget and the schedule — the cheapest health win in the package.",
        egc: "EGC · low-emitting materials",
      },
    ],
  },

  /* ======================= CORRIDOR — the hard one ======================= */
  {
    id: "corridor",
    label: "Corridor",
    areaNote: "double-loaded corridor · per floor · ~1,480 sf",
    blurb:
      "The toughest room for healthy specs — first-cost pressure peaks here, so the package argues lifecycle, not sticker.",
    lines: [
      {
        id: "cor-floor",
        category: "Flooring",
        scopeNote: "full corridor run",
        qty: 1480,
        unit: "sf",
        bau: {
          name: "Vinyl composition tile (VCT)",
          detail: "12×12 · strip-and-wax maintenance regime",
          unitCost: 4.3,
          carbon: 0.9,
          voc: "moderate",
        },
        swap: {
          name: "Linoleum sheet",
          detail: "2.5 mm · factory finish, no waxing",
          unitCost: 4.95,
          carbon: 0.45,
          voc: "low",
        },
        certs: ["HPD published", "GreenGuard Gold"],
        suppliers: 3,
        lead: "2–3 wk",
        ve: "watch",
        defense:
          "First cost loses to VCT, so this line is the corridor's VE target — the package defends it with the maintenance math: no strip-and-wax cycles means the delta pays back inside the first repaint cycle.",
        egc: "EGC · durable, low-maintenance flooring",
      },
      {
        id: "cor-guard",
        category: "Wall protection",
        scopeNote: "both walls, chair-rail height",
        qty: 640,
        unit: "sf",
        bau: {
          name: "PVC sheet wall guard",
          detail: '.060" rigid sheet + PVC trims',
          unitCost: 11.2,
          carbon: 3.2,
          voc: "moderate",
        },
        swap: {
          name: "Recycled-HDPE wall guard",
          detail: 'PVC-free · .060" · same profiles',
          unitCost: 11.8,
          carbon: 1.7,
          voc: "low",
        },
        certs: ["HPD published"],
        suppliers: 2,
        lead: "3–4 wk",
        ve: "watch",
        defense:
          "Same mounting details and cleanability; going PVC-free removes the corridor's largest vinyl surface in one line.",
        egc: "EGC · PVC reduction",
      },
      {
        id: "cor-paint",
        category: "Paint",
        scopeNote: "walls above guard + doors + frames",
        qty: 2100,
        unit: "sf",
        bau: {
          name: "Conventional acrylic",
          detail: "contractor grade · ~50 g/L VOC",
          unitCost: 2.1,
          carbon: 0.28,
          voc: "moderate",
        },
        swap: {
          name: "Zero-VOC acrylic",
          detail: "<5 g/L · scuff-resistant",
          unitCost: 2.16,
          carbon: 0.24,
          voc: "none",
        },
        certs: ["GreenGuard Gold", "CDPH v1.2 compliant"],
        suppliers: 6,
        lead: "stock",
        ve: "survives",
        defense: "Cost-parity swap; occupied-building repaints benefit most from zero-VOC.",
        egc: "EGC · low-VOC paints and coatings",
      },
      {
        id: "cor-base",
        category: "Wall base",
        scopeNote: "both sides, full run",
        qty: 590,
        unit: "lf",
        bau: {
          name: "Vinyl cove base",
          detail: '4" coved · PVC',
          unitCost: 3.6,
          carbon: 0.75,
          voc: "moderate",
        },
        swap: {
          name: "Rubber wall base",
          detail: '4" coved · PVC-free',
          unitCost: 4.05,
          carbon: 0.55,
          voc: "low",
        },
        certs: ["Declare label"],
        suppliers: 3,
        lead: "stock",
        ve: "survives",
        defense: "A cents-per-foot delta that removes another PVC line without touching the schedule.",
        egc: "EGC · PVC reduction",
      },
    ],
  },

  /* ========================= LOBBY — the showpiece ======================= */
  {
    id: "lobby",
    label: "Lobby",
    areaNote: "entry lobby + mail room · ~900 sf",
    blurb:
      "The showpiece scope: design value carries the healthy spec through the budget meeting.",
    lines: [
      {
        id: "lob-floor",
        category: "Flooring",
        scopeNote: "entry + mail room",
        qty: 900,
        unit: "sf",
        bau: {
          name: "Carpet tile, PVC-backed",
          detail: "24×24 · bitumen/PVC backing",
          unitCost: 7.1,
          carbon: 2.1,
          voc: "moderate",
        },
        swap: {
          name: "Carpet tile, PVC-free backing",
          detail: "24×24 · polyolefin backing · high recycled content",
          unitCost: 7.35,
          carbon: 1.15,
          voc: "low",
        },
        certs: ["CRI Green Label Plus", "HPD published"],
        suppliers: 3,
        lead: "2–3 wk",
        ve: "survives",
        defense: "Same tile format and installer; the backing swap is invisible to everyone but the EPD.",
        egc: "EGC · healthy interior finishes",
      },
      {
        id: "lob-wall",
        category: "Feature wall finish",
        scopeNote: "lobby walls",
        qty: 1100,
        unit: "sf",
        bau: {
          name: "Vinyl wallcovering",
          detail: "Type II · osnaburg backing",
          unitCost: 3.9,
          carbon: 1.55,
          voc: "moderate",
        },
        swap: {
          name: "Clay / mineral plaster",
          detail: "pigmented clay finish · vapor-open",
          unitCost: 4.3,
          carbon: 0.55,
          voc: "none",
        },
        certs: ["Natural material", "HPD published"],
        suppliers: 2,
        lead: "3–4 wk",
        ve: "watch",
        defense:
          "The one line specified as design, not compliance — clay plaster reads as value in the lobby, which is what carries it through the budget meeting.",
        egc: "EGC · low-emitting wall finishes",
      },
      {
        id: "lob-ceil",
        category: "Ceiling",
        scopeNote: "suspended grid",
        qty: 850,
        unit: "sf",
        bau: {
          name: "Standard mineral-fiber ACT",
          detail: "2×2 lay-in · standard recycled content",
          unitCost: 6.6,
          carbon: 2.1,
          voc: "low",
        },
        swap: {
          name: "High-recycled ACT with EPD",
          detail: "2×2 lay-in · 70%+ recycled · take-back program",
          unitCost: 6.8,
          carbon: 1.45,
          voc: "low",
        },
        certs: ["Declare label", "EPD published"],
        suppliers: 3,
        lead: "stock",
        ve: "survives",
        defense: "Same grid, same look; the EPD and take-back program come almost free.",
        egc: "EGC · materials transparency",
      },
      {
        id: "lob-mill",
        category: "Millwork",
        scopeNote: "mail/parcel counter + bench",
        qty: 22,
        unit: "lf",
        bau: {
          name: "Particleboard casework",
          detail: "plastic-laminate faced · UF binder",
          unitCost: 210,
          carbon: 26,
          voc: "high",
        },
        swap: {
          name: "NAF plywood casework",
          detail: "no-added-formaldehyde ply · FSC available",
          unitCost: 222,
          carbon: 21,
          voc: "low",
        },
        certs: ["NAF — CARB exempt", "FSC available"],
        suppliers: 2,
        lead: "4–6 wk",
        ve: "watch",
        defense:
          "Highest-touch millwork in the building; naming it the health upgrade protects the premium.",
        egc: "EGC · composite wood emissions",
      },
      {
        id: "lob-seal",
        category: "Adhesives & sealants",
        scopeNote: "lobby allowance",
        qty: 1,
        unit: "lot",
        bau: {
          name: "Solvent-based set",
          detail: "construction adhesive + acrylic caulks",
          unitCost: 260,
          carbon: 24,
          voc: "high",
        },
        swap: {
          name: "Low-VOC, SDS-screened set",
          detail: "SCAQMD 1168-compliant set",
          unitCost: 272,
          carbon: 21,
          voc: "low",
        },
        certs: ["CDPH v1.2 compliant"],
        suppliers: 5,
        lead: "stock",
        ve: "survives",
        defense: "Invisible in the budget; the cheapest health win in the scope.",
        egc: "EGC · low-emitting materials",
      },
    ],
  },

  /* ========================== BATHROOM — wet room ======================== */
  {
    id: "bathroom",
    label: "Bathroom",
    areaNote: "unit bathroom · ~40 sf floor · 310 sf wet wall",
    blurb:
      "Moisture is the excuse for vinyl everywhere — the package answers it with mineral assemblies instead.",
    lines: [
      {
        id: "bath-wall",
        category: "Wet-wall assembly",
        scopeNote: "tub surround + wet walls",
        qty: 310,
        unit: "sf",
        bau: {
          name: "MR gypsum + vinyl wrap",
          detail: "moisture-resistant board · vinyl wallcovering finish",
          unitCost: 5.2,
          carbon: 1.8,
          voc: "moderate",
        },
        swap: {
          name: "Fiber-cement + mineral coating",
          detail: "cement board · mineral paint finish",
          unitCost: 5.45,
          carbon: 1.3,
          voc: "low",
        },
        certs: ["HPD published"],
        suppliers: 3,
        lead: "2–3 wk",
        ve: "survives",
        defense:
          "Handles moisture without vinyl's off-gassing — and drops the hidden-mold risk vinyl wraps are known for.",
        egc: "EGC · moisture + mold prevention",
      },
      {
        id: "bath-floor",
        category: "Floor tile",
        scopeNote: "bath floor",
        qty: 40,
        unit: "sf",
        bau: {
          name: "Porcelain tile, standard set",
          detail: "standard porcelain · OPC mortar + grout",
          unitCost: 8.2,
          carbon: 1.6,
          voc: "low",
        },
        swap: {
          name: "Recycled porcelain, low-carbon set",
          detail: "recycled-content porcelain · low-carbon mortar + grout",
          unitCost: 8.5,
          carbon: 1.15,
          voc: "low",
        },
        certs: ["EPD published"],
        suppliers: 3,
        lead: "stock",
        ve: "survives",
        defense: "Same tile trade, same day — the mortar bag is where the carbon hides.",
        egc: "EGC · materials transparency",
      },
      {
        id: "bath-van",
        category: "Vanity",
        scopeNote: "vanity cabinet",
        qty: 1,
        unit: "ea",
        bau: {
          name: "Particleboard vanity",
          detail: "melamine-faced PB · UF binder",
          unitCost: 520,
          carbon: 68,
          voc: "high",
        },
        swap: {
          name: "NAF plywood vanity",
          detail: "no-added-formaldehyde ply",
          unitCost: 545,
          carbon: 55,
          voc: "low",
        },
        certs: ["NAF — CARB exempt"],
        suppliers: 2,
        lead: "3–4 wk",
        ve: "watch",
        defense:
          "Formaldehyde in the smallest, dampest, least-ventilated room — the swap the health argument wins on its own.",
        egc: "EGC · composite wood emissions",
      },
      {
        id: "bath-paint",
        category: "Paint",
        scopeNote: "ceiling + dry walls",
        qty: 220,
        unit: "sf",
        bau: {
          name: "Bath-grade acrylic",
          detail: "mildew-resistant · ~50 g/L VOC",
          unitCost: 2.3,
          carbon: 0.3,
          voc: "moderate",
        },
        swap: {
          name: "Zero-VOC bath-grade",
          detail: "mildew-resistant · <5 g/L",
          unitCost: 2.36,
          carbon: 0.26,
          voc: "none",
        },
        certs: ["GreenGuard Gold"],
        suppliers: 5,
        lead: "stock",
        ve: "survives",
        defense: "Cost-parity; the mildew-resistance spec carries over unchanged.",
        egc: "EGC · low-VOC paints and coatings",
      },
      {
        id: "bath-seal",
        category: "Caulks & waterproofing",
        scopeNote: "wet-room allowance",
        qty: 1,
        unit: "lot",
        bau: {
          name: "Standard set + membrane",
          detail: "acrylic/silicone caulks · liquid membrane",
          unitCost: 310,
          carbon: 26,
          voc: "high",
        },
        swap: {
          name: "Low-VOC set + membrane",
          detail: "CDPH-compliant caulks · low-VOC membrane",
          unitCost: 325,
          carbon: 23,
          voc: "low",
        },
        certs: ["CDPH v1.2 compliant"],
        suppliers: 4,
        lead: "stock",
        ve: "survives",
        defense: "Sealed rooms concentrate off-gassing; this is where low-VOC matters most per dollar.",
        egc: "EGC · low-emitting materials",
      },
    ],
  },
];

/* ------------------------------ totals math ---------------------------- */

export type PackageTotals = {
  bauCost: number;
  pkgCost: number;
  costDelta: number; // pkg − bau ($)
  costDeltaPct: number; // signed %
  bauCarbon: number; // kg
  pkgCarbon: number; // kg
  carbonDeltaPct: number; // signed % (negative = saving)
  swapsOn: number;
  lineCount: number;
  healthFlags: number; // lines whose BAU is a high/moderate VOC source
  healthCleared: number; // of those, how many are swapped to low/none
  veWatch: number; // active swaps flagged as VE-exposed
};

const BAD_VOC: VocClass[] = ["high", "moderate"];
const OK_VOC: VocClass[] = ["low", "none"];

/** Totals for a scope given which lines have the healthy swap active. */
export function packageTotals(scope: PackageScope, active: Record<string, boolean>): PackageTotals {
  let bauCost = 0;
  let pkgCost = 0;
  let bauCarbon = 0;
  let pkgCarbon = 0;
  let swapsOn = 0;
  let healthFlags = 0;
  let healthCleared = 0;
  let veWatch = 0;

  for (const line of scope.lines) {
    const on = active[line.id] !== false; // default: swap active
    const chosen = on ? line.swap : line.bau;
    bauCost += line.qty * line.bau.unitCost;
    bauCarbon += line.qty * line.bau.carbon;
    pkgCost += line.qty * chosen.unitCost;
    pkgCarbon += line.qty * chosen.carbon;
    if (on) swapsOn++;
    const flagged = BAD_VOC.includes(line.bau.voc);
    if (flagged) {
      healthFlags++;
      if (on && OK_VOC.includes(line.swap.voc)) healthCleared++;
    }
    if (on && line.ve === "watch") veWatch++;
  }

  const costDelta = pkgCost - bauCost;
  return {
    bauCost,
    pkgCost,
    costDelta,
    costDeltaPct: bauCost ? (costDelta / bauCost) * 100 : 0,
    bauCarbon,
    pkgCarbon,
    carbonDeltaPct: bauCarbon ? ((pkgCarbon - bauCarbon) / bauCarbon) * 100 : 0,
    swapsOn,
    lineCount: scope.lines.length,
    healthFlags,
    healthCleared,
    veWatch,
  };
}

export function fmtUSD(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export function fmtCarbon(kg: number): string {
  return kg >= 1000 ? (kg / 1000).toFixed(1) + " t" : Math.round(kg) + " kg";
}

/* Compact state string sent to the assistant as grounding context. */
export function assistantContext(scope: PackageScope, active: Record<string, boolean>): string {
  const t = packageTotals(scope, active);
  const lines = scope.lines
    .map((l) => {
      const on = active[l.id] !== false;
      return `- ${l.category} (${l.qty} ${l.unit}): ${on ? `SWAP ACTIVE → ${l.swap.name}` : `kept BAU → ${l.bau.name}`}; BAU=${l.bau.name} $${l.bau.unitCost}/${l.unit} ${l.bau.carbon}kgCO2e/${l.unit} VOC:${l.bau.voc}; swap=${l.swap.name} $${l.swap.unitCost}/${l.unit} ${l.swap.carbon}kgCO2e/${l.unit} VOC:${l.swap.voc}; VE:${l.ve}; suppliers:${l.suppliers}; lead:${l.lead}; defense:"${l.defense}"`;
    })
    .join("\n");
  return [
    `Project: ${PKG_PROJECT.name} (${PKG_PROJECT.meta}; ${PKG_PROJECT.standard}).`,
    `Scope: ${scope.label} (${scope.areaNote}). ${scope.blurb}`,
    `Totals with current toggles: package ${fmtUSD(t.pkgCost)} vs BAU ${fmtUSD(t.bauCost)} (${t.costDelta >= 0 ? "+" : ""}${t.costDeltaPct.toFixed(1)}% first cost); embodied carbon ${fmtCarbon(t.pkgCarbon)} vs ${fmtCarbon(t.bauCarbon)} (${t.carbonDeltaPct.toFixed(0)}%); ${t.swapsOn}/${t.lineCount} swaps active; ${t.healthCleared}/${t.healthFlags} VOC sources cleared; ${t.veWatch} active swaps on VE watch.`,
    `Lines:`,
    lines,
  ].join("\n");
}

/* Suggested questions surfaced as chips in the assistant. */
export const PKG_ASSISTANT_PROMPTS = [
  "Why linoleum instead of LVT?",
  "Which lines get value-engineered out first?",
  "What if the flooring supplier slips?",
  "Where does the carbon saving come from?",
];

/* =========================================================================
   "Start from your spec" — matching a pasted conventional finish schedule
   against the 20-line library (PackagesApp intake flow).

   HONESTY: this is keyword matching over an illustrative 20-line library, not
   real spec-document parsing — the app says so under the intake CTA. Every
   PackageLine below is reachable via at least one distinctive phrase (its
   bau.name, common trade synonyms, or a scope-qualifying phrase where the
   category repeats — e.g. "Paint" appears on three scopes, so every paint
   line's phrases are qualified enough — "interior acrylic", "corridor paint",
   "bathroom paint" — that none of them is a substring of another paint
   line's phrase; same treatment for the two Adhesives & sealants lines).
   Order matters: tables are scanned in PKG_SCOPES order (unit → corridor →
   lobby → bathroom), and the FIRST line whose table matches a given input
   segment wins — verified (see the reachability self-test run during
   development) that no line's own keyword is ever shadowed by an
   earlier-scanned line.
   ========================================================================= */

/** All 20 PackageLines, flattened once in PKG_SCOPES order (the matcher's
 * scan + tie-break order, and the order customScope lines fall back to). */
export const ALL_PACKAGE_LINES: PackageLine[] = PKG_SCOPES.flatMap((s) => s.lines);

/** Lowercase match phrases per PackageLine id. Built from bau.name + category
 * + common trade synonyms/abbreviations. Three categories repeat across
 * scopes (Paint on unit/corridor/bathroom; Adhesives & sealants on
 * unit/lobby; wall-base-style PVC lines on corridor) — every phrase below is
 * scope-qualified or otherwise line-distinctive on its own, specifically so
 * no line's own keywords get shadowed by a same-category line scanned
 * earlier (unit- lines are scanned first, so their table never uses a bare
 * generic word another scope's line would also need). */
const SPEC_KEYWORDS: Record<string, string[]> = {
  // ---- unit renovation ----
  "unit-floor": ["luxury vinyl plank", "lvt", "vinyl plank", "6x48 plank", "wear layer"],
  "unit-paint": ["interior acrylic", "unit paint", "wall paint", "contractor grade paint", "latex paint", "eggshell"],
  "unit-insul": ["spray foam", "closed-cell", "ccspf", "spray polyurethane", "insulation"],
  "unit-case": ["particleboard", "kitchen casework", "cabinet box", "cabinet boxes", "melamine", "kitchen cabinet"],
  "unit-counter": ["hpl laminate", "laminate countertop", "post-formed laminate", "countertop", "counter top"],
  "unit-seal": ["construction adhesive", "solvent-based set", "unit adhesive", "unit sealant", "unit caulk", "multi-purpose adhesive"],

  // ---- corridor ----
  "cor-floor": ["vinyl composition tile", "vct", "corridor flooring", "corridor floor"],
  "cor-guard": ["wall guard", "pvc sheet", "wall protection", "chair rail guard", "corner guard"],
  "cor-paint": ["corridor paint", "corridor walls", "hallway paint", "corridor acrylic"],
  "cor-base": ["vinyl cove base", "cove base", "wall base", "vinyl base", "corridor base"],

  // ---- lobby ----
  "lob-floor": ["carpet tile", "carpet squares", "pvc-backed carpet", "lobby carpet"],
  "lob-wall": ["vinyl wallcovering", "wallcovering", "wall covering", "vinyl wall covering", "lobby feature wall"],
  "lob-ceil": ["mineral-fiber", "act ceiling", "acoustic ceiling tile", "ceiling tile", "suspended ceiling", "2x2 lay-in"],
  "lob-mill": ["millwork", "mail counter", "parcel counter", "lobby casework", "reception counter"],
  "lob-seal": ["lobby adhesive", "lobby sealant", "lobby caulk", "lobby glue"],

  // ---- bathroom ----
  "bath-wall": ["mr gypsum", "moisture-resistant board", "tub surround", "wet wall", "wet-wall", "gypsum drywall"],
  "bath-floor": ["porcelain tile", "bathroom floor tile", "bath floor tile", "floor tile"],
  "bath-van": ["vanity", "bathroom vanity", "vanity cabinet"],
  "bath-paint": ["bath-grade", "bathroom paint", "mildew-resistant paint", "bath paint"],
  "bath-seal": ["waterproofing", "waterproof membrane", "liquid membrane", "bathroom caulk", "wet-room sealant", "bathroom glue"],
};

/** Resolve one input line's free text to a PackageLine via keyword match. */
function matchOneLine(text: string): PackageLine | null {
  const lower = text.toLowerCase();
  for (const line of ALL_PACKAGE_LINES) {
    const keywords = SPEC_KEYWORDS[line.id] ?? [];
    if (keywords.some((kw) => lower.includes(kw))) return line;
  }
  return null;
}

export type SpecMatchResult = {
  matches: { line: PackageLine; sourceText: string }[];
  unmatched: string[];
};

/**
 * Match a pasted finish schedule (one material per line, semicolons also
 * accepted as separators) against the 20-line library. First matching line
 * wins per input row; each PackageLine appears at most once in the result
 * even if the input names it twice. Rows with no match are returned verbatim
 * so the intake can show an honest "no match yet" list.
 */
export function matchSpecText(text: string): SpecMatchResult {
  const rows = text
    .split(/[\n;]+/)
    .map((r) => r.trim())
    .filter(Boolean);

  const matches: { line: PackageLine; sourceText: string }[] = [];
  const seen = new Set<string>();
  const unmatched: string[] = [];

  for (const row of rows) {
    const line = matchOneLine(row);
    if (line && !seen.has(line.id)) {
      seen.add(line.id);
      matches.push({ line, sourceText: row });
    } else if (!line) {
      unmatched.push(row);
    }
    // a row matching a line already captured is silently deduped (neither
    // added again nor reported unmatched — it was recognized, just repeated)
  }

  return { matches, unmatched };
}

/** A realistic 8-line conventional finish schedule for the "Use a sample
 * spec" ghost chip — each line matches a different PackageLine across
 * scopes, plus one deliberately unmatchable line so the honest no-match
 * path always shows in the demo. */
export const SAMPLE_SPEC = `Flooring: luxury vinyl plank, 6mil wear layer, living/bedrooms
Paint: conventional interior acrylic, walls + ceilings
Insulation: closed-cell spray foam, demising walls
Kitchen casework: particleboard boxes, melamine-faced
Corridor flooring: vinyl composition tile (VCT), 12x12
Wall protection: PVC sheet wall guard, corridor
Bathroom vanity cabinet, standard finish
Structural steel, W12 columns`;
