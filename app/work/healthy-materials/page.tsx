import type { Metadata } from "next";
import AmbientField from "./AmbientField";
import Timeline from "./Timeline";
import MaterialDeck from "@/components/MaterialDeck/MaterialDeck";
import MaterialRail from "./MaterialRail";
import PackagesApp from "./PackagesApp";
import Link from "next/link";
import ProjectPager from "@/components/ProjectPager/ProjectPager";
import Reveal from "@/components/Reveal/Reveal";
import { FIELD_FOOTNOTE } from "@/lib/healthyMaterials";
import { HM_ROOT_STYLE } from "./theme";
import styles from "./healthy-materials.module.css";

export const metadata: Metadata = {
  title: "Healthy Materials",
  description:
    "Graduate capstone with the Healthy Materials Lab at Parsons (with Henry Schroder): mixed-methods research on why healthier, lower-carbon building materials fall out of construction — four barriers, the leverage points, and three interventions, led by the one I'd build first: Healthy Materials Packages.",
};

/* §6 / spec — the project accent (sage) + page-scoped forest-teal atmosphere
   live in ./theme.ts (shared with the /prototype route). Additive and
   page-local; they never touch the global tokens. Everything inherits. */

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

export default function HealthyMaterialsPage() {
  return (
    <div style={HM_ROOT_STYLE} className={styles.page}>
      {/* page-wide soft background layer — light sections float over this */}
      <AmbientField />
      {/* site-wide scroll-reveal: fades section content up as it enters view */}
      <Reveal />

      <div className={styles.pageContent}>
        {/* ============ 1 — HERO (photo-overlay, Housing-Works treatment) ===== */}
        <header className={styles.hero}>
          <div
            className={styles.heroBg}
            aria-hidden="true"
            style={{ backgroundImage: "url(/images/healthy-materials/library-wall.jpg)" }}
          />
          <div className={styles.heroScrim} aria-hidden="true" />
          <div className={styles.heroInner}>
            <div className={styles.heroCard}>
              <p className={styles.heroEyebrow}>
                graduate design research · healthy materials lab, parsons
              </p>
              <span className={styles.badge}>Graduate research · Concept</span>
              <h1 className={styles.heroTitle}>
                Healthy, low-carbon materials are{" "}
                <em className={styles.heroAccent}>already</em> here.
                <span className={styles.heroLine2}>
                  The question is whether our processes will let them in.
                </span>
              </h1>
              <p className={styles.heroAuthors}>
                Research capstone · Fall 2025 · Rishabh Salian &amp; Henry
                Schroder
              </p>
            </div>
            <div className={styles.scrollCue} aria-hidden="true">
              <span>scroll</span>
              <span />
            </div>
          </div>
        </header>

        {/* ============ 2 — THE FRAME + THE MATERIALS (paper) ============ */}
        <section className={styles.scene} data-ambient-dim>
          <div className={styles.wrapWide} data-reveal>
            <p className={`mono ${styles.kicker}`}>the frame</p>
            <p className={styles.frameHook}>
              We have so many exciting materials. Why do they rarely make it past
              the exhibition wall?
            </p>

            {/* the materials, right under the hook — the "exciting materials" */}
            <p className={`mono ${styles.railCaption}`}>Already real, already buyable</p>
            <MaterialRail />

            <p className={styles.body}>
              Buildings and construction are responsible for around 37% of global
              energy-related CO₂ emissions.<sup className={styles.fnref}>1</sup>{" "}
              Affordable housing is where healthier, lower-carbon materials could
              do the most good — and where cost pressure makes them hardest to
              keep. I spent a semester with the Healthy Materials Lab at Parsons,
              a research and education center that promotes healthier building
              materials through its materials library, partnerships, and training.
            </p>
            <p className={styles.body}>
              This was a two-person capstone with{" "}
              <strong>Henry Schroder</strong> — the field visit, interviews, and
              synthesis were shared. My focus, and the part I&apos;d build first,
              is the intervention this page ends on:{" "}
              <strong>Healthy Materials Packages</strong>.
            </p>

            <div className={styles.question}>
              <p className={styles.questionLabel}>Research question</p>
              <p className={styles.questionText}>
                How might we increase the adoption of innovative low-carbon
                materials in construction?
              </p>
            </div>

            <div className={styles.spectrum}>
              <div className={styles.spectrumEnd}>
                <span className={`mono ${styles.spectrumLabel}`}>Mineral / technical</span>
                <span className={styles.spectrumItems}>
                  clay · mineral coatings · carbon-cured concrete
                </span>
              </div>
              <div className={styles.spectrumArrow} aria-hidden="true">
                <svg viewBox="0 0 40 12" fill="none">
                  <path d="M0 6h36M30 1l6 5-6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className={styles.spectrumEnd}>
                <span className={`mono ${styles.spectrumLabel}`}>Non-standard bio-based</span>
                <span className={styles.spectrumItems}>
                  hemp · straw · cellulose · mycelium
                </span>
              </div>
            </div>
            <p className={styles.spectrumNote}>
              Not lab prototypes — materials that meaningfully cut embodied carbon
              and can already be specified and bought today.
            </p>
            <p className={styles.footnote}>
              <span className={styles.fnnum}>1</span> UN Environment Programme,
              Global Status Report for Buildings and Construction. · Material
              close-ups via Wikimedia Commons (CC BY / CC0); field photos are the
              author&apos;s.
            </p>
          </div>
        </section>

        {/* ============ 4 — THE JOURNEY (paper) → TIMELINE ============ */}
        <section className={styles.scene}>
          <div className={styles.wrapWide} data-reveal>
            <p className={`mono ${styles.kicker}`}>the timeline</p>
            <p className={styles.lede}>Fall 2025, start to finish.</p>
            <Timeline />

            {/* the research — clubbed under the timeline (Follow pattern) */}
            <div className={styles.clubbed}>
              <h3 className={`mono ${styles.kicker}`}>The research</h3>
              <p className="lede">
                Mixed-methods, and honest about scope: a desk-research spine plus
                four primary engagements — a materials-library field visit and
                three practitioner interviews — read for where adoption stalls,
                not to measure attitudes.
              </p>
              <div className={styles.rcols}>
                <div className={styles.rcol}>
                  <p className={styles.rlabel}>Primary · field engagements</p>
                  <div className={styles.rlist}>
                    <div className={styles.r}>
                      <strong>Healthy Materials Lab</strong>
                      <span className={styles.kind}>Field visit · Parsons</span>
                    </div>
                    <div className={styles.r}>
                      <strong>Alison Mears</strong>
                      <span className={styles.kind}>Director, HML</span>
                    </div>
                    <div className={styles.r}>
                      <strong>Omir Majeed</strong>
                      <span className={styles.kind}>Project manager, CBRE</span>
                    </div>
                    <div className={styles.r}>
                      <strong>Ricardo Ortiz</strong>
                      <span className={styles.kind}>Regenerative architect</span>
                    </div>
                  </div>
                </div>
                <div className={styles.rcol}>
                  <p className={styles.rlabel}>Secondary · desk research</p>
                  <div className={styles.rlist}>
                    <div className={styles.r}>
                      <strong>Embodied carbon in buildings</strong>
                      <span className={styles.kind}>UNEP · GlobalABC</span>
                    </div>
                    <div className={styles.r}>
                      <strong>Building codes &amp; standards</strong>
                      <span className={styles.kind}>where novel materials stall</span>
                    </div>
                    <div className={styles.r}>
                      <strong>Enterprise Green Communities</strong>
                      <span className={styles.kind}>NYC affordable-housing specs</span>
                    </div>
                    <div className={styles.r}>
                      <strong>mindful MATERIALS · HPD</strong>
                      <span className={styles.kind}>material-health frameworks</span>
                    </div>
                    <div className={styles.r}>
                      <strong>BioFabricate</strong>
                      <span className={styles.kind}>biomaterial classification</span>
                    </div>
                    <div className={styles.r}>
                      <strong>LEED · USGBC</strong>
                      <span className={styles.kind}>low-emitting materials</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 5 — INSIDE THE HML (teal) → FIELD-VISIT CAROUSEL ====== */}
        <section className={`${styles.teal} ${styles.field}`}>
          <div className={styles.fieldHead} data-reveal>
            <p className={`mono ${styles.kicker}`}>field visit</p>
            <h2 className={styles.fieldTitle}>Inside the Healthy Materials Lab</h2>
            <p className={styles.fieldIntro}>
              A library you pull open drawer by drawer — every material catalogued,
              tagged, and ranked for health and carbon.
            </p>
          </div>
          <MaterialDeck />
          <p className={`mono ${styles.fieldFoot}`}>{FIELD_FOOTNOTE}</p>
        </section>

        {/* ============ 6 — THE CONSTRUCTION JOURNEY (band) [§7 merged in; the
            old 5-point leverage-cascade section is gone, folded into "the
            turn" sub-blocks below] ============ */}
        <section className={`${styles.scene} ${styles.band}`} data-ambient-dim>
          <div className={styles.wrapWide} data-reveal>
            <p className={`mono ${styles.kicker}`}>where adoption breaks — and where it turns</p>
            <p className={styles.lede}>
              The four blocking patterns and five leverage points from the
              research, mapped onto the life of a project — before, during, and
              after construction. The quotes are the evidence.
            </p>

            <ol className={styles.journey}>
              <li className={styles.stage}>
                <div className={styles.stageHead}>
                  <span className={styles.stageNo}>Stage 01</span>
                  <div>
                    <h3 className={styles.stageTitle}>Before construction — design &amp; spec</h3>
                    <p className={styles.stagePhase}>owner goals · RFPs · specification</p>
                  </div>
                </div>

                <ul className={styles.frictionList}>
                  <li className={styles.friction}>
                    Owners don&apos;t ask. If healthy materials aren&apos;t in the
                    RFP or the project goals, the team never gets permission — or
                    pressure — to prioritize them.
                  </li>
                  <li className={styles.friction}>
                    Nothing to spec against. Without recognized codes or testing
                    pathways, insurers won&apos;t insure, approvers default to the
                    familiar.
                  </li>
                  <li className={styles.friction}>
                    PMs can&apos;t plan for the unfamiliar. Unknown details and
                    lead times mean healthier options never make it into schedule
                    or budget.
                  </li>
                </ul>

                <div className={styles.turn}>
                  <p className={styles.turnLabel}>the turn</p>
                  <ol className={styles.leverage}>
                    <li className={styles.lp}>
                      <span className={styles.lpNum}>01</span>
                      <p className={styles.lpBody}>
                        <strong>Owner awareness &amp; priorities</strong> — healthy
                        materials asked for early, in RFPs, standards, and goals.
                      </p>
                    </li>
                    <li className={styles.lp}>
                      <span className={styles.lpNum}>02</span>
                      <p className={styles.lpBody}>
                        <strong>Standard creation &amp; testing</strong> — shared
                        tests and spec language make &quot;experimental&quot;
                        materials normal options.
                      </p>
                    </li>
                    <li className={styles.lp}>
                      <span className={styles.lpNum}>03</span>
                      <p className={styles.lpBody}>
                        <strong>PM training &amp; planning</strong> — simple tools
                        let PMs plan for healthy materials from the start.
                      </p>
                    </li>
                  </ol>
                </div>

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

              <li className={styles.stageArrow} aria-hidden="true">
                <svg viewBox="0 0 22 22" fill="none">
                  <path d="M11 2v18M4 13l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>

              <li className={styles.stage}>
                <div className={styles.stageHead}>
                  <span className={styles.stageNo}>Stage 02</span>
                  <div>
                    <h3 className={styles.stageTitle}>During construction — procurement &amp; build</h3>
                    <p className={styles.stagePhase}>bidding · procurement · substitution</p>
                  </div>
                </div>

                <ul className={styles.frictionList}>
                  <li className={styles.friction}>
                    Cost overrides almost everything. Low-bid procurement and
                    contingency fear make unfamiliar materials read as financial
                    risk.
                  </li>
                  <li className={styles.friction}>
                    Supply is thin and fragile. Often a single supplier and long
                    lead times — when the timeline slips, teams revert to
                    whatever is available.
                  </li>
                  <li className={styles.friction}>
                    Contractors pick the final products. Substitution happens on
                    the job site, after the spec has left the designer&apos;s
                    hands.
                  </li>
                </ul>

                <div className={styles.turn}>
                  <p className={styles.turnLabel}>the turn</p>
                  <ol className={styles.leverage} start={4}>
                    <li className={styles.lp}>
                      <span className={styles.lpNum}>04</span>
                      <p className={styles.lpBody}>
                        <strong>Contractor-controlled decisions</strong> —
                        training and substitution guidance flip a common blocker
                        into a key driver.
                      </p>
                    </li>
                    <li className={styles.lp}>
                      <span className={styles.lpNum}>05</span>
                      <p className={styles.lpBody}>
                        <strong>Supply transparency</strong> — quick, trusted
                        information on available, tested products makes healthier
                        picks feel less risky.
                      </p>
                    </li>
                  </ol>
                </div>

                <blockquote className={styles.quote}>
                  <p className={styles.quoteText}>
                    “It&apos;s the cold truth of construction. They will never
                    spend more; they will only do it if they have to.”
                  </p>
                  <cite className={styles.quoteAttr}>
                    Omir Majeed, Project Manager, CBRE
                  </cite>
                </blockquote>
              </li>

              <li className={styles.stageArrow} aria-hidden="true">
                <svg viewBox="0 0 22 22" fill="none">
                  <path d="M11 2v18M4 13l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>

              <li className={styles.stage}>
                <div className={styles.stageHead}>
                  <span className={styles.stageNo}>Stage 03</span>
                  <div>
                    <h3 className={styles.stageTitle}>After construction — occupancy &amp; proof</h3>
                    <p className={styles.stagePhase}>occupancy · outcomes · the next project</p>
                  </div>
                </div>

                <ul className={styles.frictionList}>
                  <li className={styles.friction}>
                    Results stay invisible. Nobody measures what the healthier
                    building did for the people inside it.
                  </li>
                  <li className={styles.friction}>
                    No feedback loop. Without documented outcomes, the next
                    project starts the argument from zero.
                  </li>
                  <li className={styles.friction}>
                    &quot;Experimental&quot; never expires. Absent proof, healthy
                    materials stay perpetually novel — and perpetually first to be
                    cut.
                  </li>
                </ul>

                <div className={styles.turn}>
                  <p className={styles.turnLabel}>the turn</p>
                  <p className={styles.turnClose}>
                    Proof compounds awareness — every project that documents its
                    materials and outcomes creates the market force that makes the
                    next owner ask. The cascade loops back to the start.
                  </p>
                </div>

                <blockquote className={styles.quote}>
                  <p className={styles.quoteText}>
                    “If I&apos;m not aware, I don&apos;t know to ask. If I&apos;m
                    aware, I create a market force that encourages better
                    materials.”
                  </p>
                  <cite className={styles.quoteAttr}>
                    Alison Mears, Director, Healthy Materials Lab
                  </cite>
                </blockquote>
              </li>
            </ol>
          </div>
        </section>

        {/* ============ 8 — THREE INTERVENTIONS (band) ============ */}
        <section className={`${styles.scene} ${styles.band}`}>
          <div className={styles.wrapWide} data-reveal>
            <p className={`mono ${styles.kicker}`}>from insight to intervention</p>
            <p className={styles.bridge}>
              Three concepts came out of this — each attacking a different point
              where healthy materials fall out.
            </p>

            <ul className={styles.concepts}>
              <li className={`${styles.concept} ${styles.conceptFirst}`}>
                <div className={styles.conceptHead}>
                  {ICONS.package}
                  <div>
                    <h3 className={styles.conceptName}>Healthy Materials Packages</h3>
                    <span className={styles.firstFlag}>my focus · the one I&apos;d build first</span>
                  </div>
                </div>
                <p className={styles.conceptBody}>
                  Pre-assembled spec packages for common NYC interior scopes (unit
                  renovation, corridor, lobby, bathroom) that swap in vetted
                  healthier / lower-carbon materials, with a simple cost +
                  maintenance + carbon comparison to “business-as-usual.” It
                  attacks cost fear at the earliest spec stage and keeps healthy
                  options as the default instead of being value-engineered out.
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

        {/* ============ 9 — MADE TANGIBLE (paper) → THE WORKING PROTOTYPE ===== */}
        <section className={styles.scene}>
          <div className={styles.wrapWide} data-reveal>
            <p className={`mono ${styles.kicker}`}>the intervention, made tangible</p>
            <div className={styles.tangibleIntro}>
              <p className={styles.lede}>Healthy Materials Packages — a working slice.</p>
              <p className={styles.body}>
                The product I&apos;d build first, running on illustrative data.
                Pick a scope, accept or reject each vetted swap, and watch cost,
                carbon, and health totals recompute. Flip on the cost-pressure
                lens to see which lines a value-engineering pass would attack —
                and the defense each one carries. The built-in assistant answers
                from the package you&apos;ve configured, over a real model API.
              </p>
            </div>
          </div>

          <div className={styles.appBleed}>
            <div className={styles.appBleedInner}>
              <PackagesApp />
            </div>
          </div>

          <div className={styles.wrapWide} data-reveal>
            <p className={`mono ${styles.demoFoot}`}>
              <Link href="/work/healthy-materials/prototype">open the prototype full-screen ↗</Link>
            </p>
          </div>
        </section>

        {/* ============ 10 — CLOSE + REFLECTION (teal) ============ */}
        <section className={`${styles.teal} ${styles.close}`}>
          <div className={styles.closeInner} data-reveal>
            <p className={styles.closeLine}>
              Healthy, low-carbon materials are here. The question is whether our
              processes will let them in.
            </p>
            <p className={styles.reflection}>
              A personal lesson from this one: stick to what you&apos;re good at,
              and focus on practical improvements rather than industry-wide
              disruption. If I take it further, I start with the packages — the
              smallest intervention aimed at the biggest blocker, cost fear, at the
              exact moment specs get written. Next: the contractor and
              manufacturer interviews, then the final affinity mapping.
            </p>
            <p className={styles.credit}>
              With Henry Schroder · Healthy Materials Lab, Parsons School of Design.
            </p>
          </div>
        </section>

        {/* ============ PROJECT PAGER ============ */}
        <ProjectPager slug="healthy-materials" />
      </div>
    </div>
  );
}
