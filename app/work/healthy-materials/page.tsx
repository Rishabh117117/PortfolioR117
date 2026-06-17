import type { Metadata } from "next";
import SwapCard from "./SwapCard";
import Motion from "./Motion";
import styles from "./healthy-materials.module.css";
import "./hm-motion.css";

export const metadata: Metadata = {
  title: "Healthy Materials — Rishabh Salian",
  description:
    "Graduate design research with the Healthy Materials Lab at Parsons: one semester of mixed-methods fieldwork on why healthier, lower-carbon building materials fall out of construction — ending in three intervention concepts and one I'd build first.",
};

/* §6 / spec — set the project accent (sage) PLUS the page-scoped forest-teal
   atmosphere here at the page root. The teal vars are additive and page-local;
   they never touch the global tokens. Everything inherits. */
const rootStyle = {
  // accent — Healthy Materials sage (DESIGN.md §8) + derived shades
  "--accent": "#5C7A3A",
  "--accent-deep": "#47602D",
  "--accent-wash": "#DCE6CE",
  "--accent-tint": "#EFF3E7",
  // page-scoped atmosphere (NOT global tokens)
  "--teal": "#15302B",
  "--panel": "#1E3A33",
  "--sage-light": "#8FB06A",
  "--clay": "#B0763F",
  "--clay-light": "#C99A6A",
} as React.CSSProperties;

// Photo slots (§9). Real frames drop into /public/images/healthy-materials/
// (see that README). Until then each slot renders a labeled placeholder so the
// page never looks broken.
function PhotoSlot({
  caption,
  ratio = "ratioWide",
  tone = "teal",
}: {
  caption: string;
  ratio?: "ratioWide" | "ratioTall" | "ratioSquare";
  tone?: "teal" | "paper";
}) {
  return (
    <div
      className={`${styles.slot} ${styles[ratio]} ${tone === "paper" ? styles.slotPaper : ""}`}
      role="img"
      aria-label={`Photo placeholder — ${caption}`}
    >
      <div className={styles.slotInner}>
        <svg className={styles.slotIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M21 16l-5-4-6 5-3-2-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className={styles.slotCaption}>{caption}</span>
      </div>
    </div>
  );
}

/* Tabler-style outline icons for the three concept cards (no emoji, no deps). */
const ICONS = {
  package: (
    <svg className={styles.conceptIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 7.5l8 4.5 8-4.5M12 12v9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  dashboard: (
    <svg className={styles.conceptIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18M8 4v5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 14h4M7 17h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  kit: (
    <svg className={styles.conceptIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="4" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 3h6v3H9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 11h6M9 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const ArrowDown = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 4v16M12 20l-6-6M12 20l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function HealthyMaterialsPage() {
  return (
    <div style={rootStyle} className={styles.page}>
      {/* Motion adds `.hm-js` after hydration to activate scroll reveals; with
          JS off the page is fully visible. Parallax is desktop-only. */}
      <Motion />

      {/* ============ 3.1 — HERO (teal gallery) ============ */}
      <header className={`${styles.teal} ${styles.hero}`}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>
            graduate design research · healthy materials lab, parsons
          </p>
          <h1 className={styles.heroTitle}>
            Healthy, low-carbon materials are{" "}
            <em className={styles.heroAccent}>already</em> here.
            <span className={styles.heroLine2}>
              The question is whether our processes will let them in.
            </span>
          </h1>

          <div className={styles.heroPhoto}>
            <PhotoSlot caption="hero · materials library shelves (full-bleed)" ratio="ratioWide" />
          </div>

          <div className={styles.scrollCue} aria-hidden="true">
            <span>scroll</span>
            <span />
          </div>
        </div>
      </header>

      {/* ============ 3.2 — THE FRAME (paper) ============ */}
      <section className={styles.scene}>
        <div className={`${styles.wrap} hm-reveal`}>
          <p className={`mono ${styles.kicker}`}>the frame</p>
          <p className={styles.body}>
            Affordable housing is where healthier, lower-carbon materials could
            do the most good — and where cost pressure makes them hardest to
            keep. I spent a semester with the Healthy Materials Lab at Parsons, a
            research and education center that promotes healthier building
            materials through its materials library, industry partnerships, and
            training programs.
          </p>

          <div className={styles.question}>
            <p className={styles.questionLabel}>Research question</p>
            <p className={styles.questionText}>
              How might we increase the adoption of innovative low-carbon
              materials in construction?
            </p>
          </div>
        </div>
      </section>

      {/* ============ 3.3 — MEET THE MATERIALS (teal gallery) ============ */}
      <section className={`${styles.teal} ${styles.materials}`}>
        <div className={`${styles.materialsHead} hm-reveal`}>
          <p className={`mono ${styles.kicker}`}>the materials</p>
        </div>
        <div className={styles.materialsGrid}>
          <article className={`${styles.material} hm-reveal`}>
            <PhotoSlot caption="mycelium composite sample" ratio="ratioTall" />
            <h3 className={styles.materialName}>Mycelium composite</h3>
            <p className={styles.materialDesc}>
              Grown, not extracted. Compostable, with low embodied carbon.
            </p>
          </article>

          <article className={`${styles.material} hm-reveal`}>
            <PhotoSlot caption="bloom foam · microalgae (in-hand)" ratio="ratioTall" />
            <h3 className={styles.materialName}>Bloom foam · microalgae</h3>
            <p className={styles.materialDesc}>
              A bio-based foam made from harvested algae blooms.
            </p>
          </article>

          <article className={`${styles.material} hm-reveal`}>
            <PhotoSlot caption="hempcrete sample" ratio="ratioTall" />
            <h3 className={styles.materialName}>Hempcrete</h3>
            <p className={styles.materialDesc}>
              Plant-based, breathable, and carbon-storing rather than
              carbon-emitting.
            </p>
          </article>

          <article className={`${styles.material} hm-reveal`}>
            <PhotoSlot caption="straw panel sample" ratio="ratioTall" />
            <h3 className={styles.materialName}>Straw panel</h3>
            <p className={styles.materialDesc}>
              An agricultural by-product turned into structural insulation.
            </p>
            <p className={styles.materialNote}>
              Availability is seasonal — a real adoption constraint (see the
              journey).
            </p>
          </article>
        </div>
      </section>

      {/* ============ 3.4 — HOW I RESEARCHED THIS (paper) ============ */}
      <section className={`${styles.scene} ${styles.band}`}>
        <div className={`${styles.wrap} hm-reveal`}>
          <p className={`mono ${styles.kicker}`}>how I researched this</p>
          <p className={styles.body}>
            Mixed methods, over one semester. I reviewed the literature on
            material innovation, construction process, policy, and performance;
            visited the Healthy Materials Lab and Ecovative; and interviewed
            architects, project managers, and material innovators about why the
            better material so often loses.
          </p>

          <ul className={styles.pillars}>
            <li className={styles.pillar}>
              <span className={styles.pillarNo}>01</span>
              <span className={styles.pillarName}>Literature review</span>
              <span className={styles.pillarDetail}>
                Material innovation, construction process, policy, performance.
              </span>
            </li>
            <li className={styles.pillar}>
              <span className={styles.pillarNo}>02</span>
              <span className={styles.pillarName}>Field visits</span>
              <span className={styles.pillarDetail}>HML and Ecovative.</span>
            </li>
            <li className={styles.pillar}>
              <span className={styles.pillarNo}>03</span>
              <span className={styles.pillarName}>Interviews</span>
              <span className={styles.pillarDetail}>
                Architects, project managers, material innovators.
              </span>
            </li>
            <li className={styles.pillar}>
              <span className={styles.pillarNo}>04</span>
              <span className={styles.pillarName}>Synthesis</span>
              <span className={styles.pillarDetail}>
                Clustering what I heard into a short set of findings.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ============ 3.5 — THE PROBLEM, MAPPED (paper) ============ */}
      <section className={styles.scene}>
        <div className={`${styles.wrapWide} hm-reveal`}>
          <p className={`mono ${styles.kicker}`}>the problem, mapped</p>
          <p className={styles.lede}>
            The procurement journey — and the points where healthy materials
            fall out.
          </p>

          <div className={styles.journey}>
            <div className={styles.stage}>
              <div className={styles.stageHead}>
                <span className={styles.stageNo}>01</span>
                <h3 className={styles.stageTitle}>Before construction</h3>
              </div>
              <ul className={styles.frictionList}>
                <li className={styles.friction}>Lack of awareness of alternatives</li>
                <li className={styles.friction}>Limited or outdated standards / codes</li>
                <li className={styles.friction}>Risk perception among owners and architects</li>
                <li className={styles.friction}>Unclear performance data for novel materials</li>
              </ul>
            </div>

            <div className={styles.stageArrow} aria-hidden="true">
              {ArrowDown}
            </div>

            <div className={styles.stage}>
              <div className={styles.stageHead}>
                <span className={styles.stageNo}>02</span>
                <h3 className={styles.stageTitle}>During construction</h3>
              </div>
              <ul className={styles.frictionList}>
                <li className={styles.friction}>Material availability and timing (e.g., straw is seasonal)</li>
                <li className={styles.friction}>Supply-chain scale-up issues</li>
                <li className={styles.friction}>Contractors substituting materials last minute</li>
              </ul>
            </div>

            <div className={styles.stageArrow} aria-hidden="true">
              {ArrowDown}
            </div>

            <div className={styles.stage}>
              <div className={styles.stageHead}>
                <span className={styles.stageNo}>03</span>
                <h3 className={styles.stageTitle}>After construction</h3>
              </div>
              <ul className={styles.frictionList}>
                <li className={styles.friction}>Unfamiliarity among maintenance teams</li>
                <li className={styles.friction}>Insurance hesitancy for nonstandard materials</li>
                <li className={styles.friction}>Limited long-term performance data</li>
                <li className={styles.friction}>Harder to replace or repair</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3.6 — FOUR INSIGHT THEMES (paper) ============ */}
      <section className={`${styles.scene} ${styles.band}`}>
        <div className={`${styles.wrapWide} hm-reveal`}>
          <p className={`mono ${styles.kicker}`}>four insight themes</p>
          <p className={styles.lede}>
            Four patterns came up again and again. The quotes are the evidence.
          </p>

          <ul className={styles.themes}>
            {/* Theme 1 */}
            <li className={styles.theme}>
              <span className={styles.themeNo}>Theme 1 · Policy, codes &amp; standards</span>
              <p className={styles.themeSynth}>
                Material choice is highly sensitive to the presence — or absence
                — of clear standards. Without recognized codes or testing
                pathways, insurers won&apos;t insure, contractors won&apos;t
                install, and project managers won&apos;t specify; so teams
                default back to the familiar.
              </p>
              <blockquote className={styles.quote}>
                <p className={styles.quoteText}>
                  “In more novel systems like in the hemp area, there
                  weren&apos;t any standard specifications in any of the building
                  codes.”
                </p>
                <cite className={styles.quoteAttr}>
                  Alison Mears, Director, Healthy Materials Lab
                </cite>
              </blockquote>
            </li>

            {/* Theme 2 */}
            <li className={styles.theme}>
              <span className={styles.themeNo}>Theme 2 · Cost &amp; market pressures</span>
              <p className={styles.themeSynth}>
                On most projects, cost overrides almost everything. Tight
                budgets, low-bid procurement, and contingency fears make
                unfamiliar materials read as financial risk — even when owners
                hold climate or health goals.
              </p>
              <blockquote className={styles.quote}>
                <p className={styles.quoteText}>
                  “It&apos;s the cold truth of construction. They will never
                  spend more; they will only do it if they have to. You&apos;re
                  working with trying to find the cheapest material.”
                </p>
                <cite className={styles.quoteAttr}>
                  Omir Majeed, Project Manager, CBRE
                </cite>
              </blockquote>
            </li>

            {/* Theme 3 — PLACEHOLDER (§12: Rishabh to supply title, synthesis, quote) */}
            <li className={`${styles.theme} ${styles.themePlaceholder}`}>
              <span className={styles.placeholderTag}>Theme 3 · awaiting content</span>
              <span className={styles.themeNo}>
                Likely “Supply chain &amp; construction process”
              </span>
              <p className={styles.themeSynth}>
                Title, synthesis, and a real attributed quote from the deck drop
                in here — most likely the supply-chain / construction-process
                theme suggested by the during- and after-construction findings.
                Not invented; left as a clearly-marked slot until supplied.
              </p>
            </li>

            {/* Theme 4 */}
            <li className={styles.theme}>
              <span className={styles.themeNo}>Theme 4 · Awareness &amp; education</span>
              <p className={styles.themeSynth}>
                Many decision-makers and workers simply don&apos;t know which
                healthy materials exist or how to use them. High-level
                intentions get lost between design, specification, procurement,
                and the job site.
              </p>
              <blockquote className={styles.quote}>
                <p className={styles.quoteText}>
                  “If I&apos;m not aware, I don&apos;t know to ask. If I&apos;m
                  aware, I make an impact in the marketplace — I&apos;m creating
                  a market force that encourages the production of better
                  materials.”
                </p>
                <cite className={styles.quoteAttr}>
                  Alison Mears, Director, Healthy Materials Lab
                </cite>
              </blockquote>
            </li>
          </ul>
        </div>
      </section>

      {/* ============ 3.7 — FROM INSIGHT TO INTERVENTION (paper) ============ */}
      <section className={styles.scene}>
        <div className={`${styles.wrapWide} hm-reveal`}>
          <p className={`mono ${styles.kicker}`}>from insight to intervention</p>
          <p className={styles.bridge}>
            Three concepts came out of this — each one attacking a different
            point where healthy materials fall out.
          </p>

          <ul className={styles.concepts}>
            <li className={`${styles.concept} ${styles.conceptFirst}`}>
              <div className={styles.conceptHead}>
                {ICONS.package}
                <div>
                  <h3 className={styles.conceptName}>Healthy Materials Packages</h3>
                  <span className={styles.firstFlag}>the one I&apos;d build first ↓</span>
                </div>
              </div>
              <p className={styles.conceptBody}>
                Pre-assembled spec packages for common NYC interior scopes (unit
                renovation, corridor, lobby, bathroom) that swap in vetted
                healthier / lower-carbon materials, with a simple cost +
                maintenance + carbon comparison to “business-as-usual.” Attacks
                cost fear at the earliest spec stage and keeps healthy options as
                the default instead of being value-engineered out.
              </p>
              <p className={styles.conceptBuilds}>
                Builds on HML&apos;s curated collections and NYC&apos;s
                Enterprise Green Communities Criteria.
              </p>
            </li>

            <li className={styles.concept}>
              <div className={styles.conceptHead}>
                {ICONS.dashboard}
                <div>
                  <h3 className={styles.conceptName}>
                    Supplier transparency &amp; vetting dashboard
                  </h3>
                </div>
              </div>
              <p className={styles.conceptBody}>
                A simple dashboard where project teams see approved suppliers,
                product health/carbon data, lead times, and safe substitutions
                per material category.
              </p>
              <p className={styles.conceptBuilds}>
                Builds on mindful MATERIALS&apos; Common Materials Framework and
                the HPD public repository.
              </p>
            </li>

            <li className={styles.concept}>
              <div className={styles.conceptHead}>
                {ICONS.kit}
                <div>
                  <h3 className={styles.conceptName}>
                    On-site contractor training &amp; material intro kit
                  </h3>
                </div>
              </div>
              <p className={styles.conceptBody}>
                Sample boards, step-by-step install cards, short safety videos,
                and a “substitution playbook” of pre-approved healthy
                alternatives for when something is out of stock.
              </p>
              <p className={styles.conceptBuilds}>
                Builds on HML&apos;s education programs and LEED
                low-emitting-materials guidance.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ============ 3.8 — THE INTERVENTION, MADE TANGIBLE (paper + teal card) === */}
      <section className={`${styles.scene} ${styles.band}`}>
        <div className={`${styles.wrap} hm-reveal`}>
          <p className={`mono ${styles.kicker}`}>the intervention, made tangible</p>
          <div className={styles.tangibleIntro}>
            <p className={styles.lede}>Healthy Materials Packages.</p>
            <p className={styles.body}>
              Pick a room scope and watch a conventional spec swap to a healthier
              one. The pitch the package makes: cost holds even while carbon
              drops and health improves. Direction only — never invented figures.
            </p>
          </div>

          <div className={styles.swapMount}>
            <SwapCard />
          </div>
        </div>
      </section>

      {/* ============ 3.9 — CLOSE + REFLECTION (teal gallery) ============ */}
      <section className={`${styles.teal} ${styles.close}`}>
        <div className={`${styles.closeInner} hm-reveal`}>
          <p className={styles.closeLine}>
            Healthy, low-carbon materials are here. The question is whether our
            processes will let them in.
          </p>
          <p className={styles.reflection}>
            This stayed a research project — three concepts I&apos;d build, not
            products I shipped. If I took it further, I&apos;d start with the
            packages: the smallest intervention aimed at the biggest blocker,
            cost fear, at the exact moment specs get written.
          </p>
          <p className={styles.credit}>
            With the Healthy Materials Lab at Parsons School of Design.
          </p>
        </div>
      </section>
    </div>
  );
}
