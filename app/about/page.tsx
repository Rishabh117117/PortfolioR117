import type { Metadata } from "next";
import Link from "next/link";
import AmbientField from "@/components/AmbientField/AmbientField";
import DriftGroup from "@/components/DriftGroup/DriftGroup";
import ContactScroll from "./ContactScroll";
import { SOCIALS } from "@/lib/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Industrial and product design, then UX, now AI-native products built end to end — the journey, the work, and what I work with.",
};

/**
 * ABOUT — ported from the approved sandbox build (about me page.html).
 * Resolves D-04 (bio, arc narrative, role/education timeline, skills, contact).
 * Photos stay as designed placeholders per Rishabh — swap when portraits land.
 * Accent = the global default Persian Blue (the person, not a project), so no
 * page-scoped accent override. Ambient = warm gold (objects / origin) → blue
 * (systems), the shared AmbientField engine.
 */
export default function AboutPage() {
  return (
    <div className={styles.page}>
      <AmbientField
        warm={[
          { color: "#9A7B4F", alpha: 0.4 },
          { color: "#9A7B4F", alpha: 0.34 },
        ]}
        cool={[
          { color: "#1C39BB", alpha: 0.38 },
          { color: "#1C39BB", alpha: 0.32 },
        ]}
        restWarm={0.9}
        restCool={0.65}
        dim={0.28}
      />

      <div className={styles.pageContent}>
        {/* Glides to #contact when arriving via /about#contact (nav + home CTA). */}
        <ContactScroll />

        {/* ============ INTRO ============ */}
        <header className={styles.hero}>
          <div className={styles.heroGrid}>
            <div>
              <p className="kicker">About</p>
              <h1 className={styles.heroThesis}>
                I build AI-native products <em>end to end</em>.
              </h1>
              <p className={styles.heroLede}>
                I started in industrial and product design and spent several
                years in UX — now I ship not just the design but the working
                software, by directing AI coding agents like Claude Code.
                I&rsquo;m completing an MS in Strategic Design &amp; Management
                at Parsons, where most of my current work lives. I care about
                clear thinking, honest craft, and building things that actually
                run.
              </p>
              <div className={styles.heroMeta}>
                <span className={styles.metaItem}>Brooklyn, NY</span>
                <span className={`${styles.metaItem} ${styles.metaItemLive}`}>
                  <span className={styles.liveDot} aria-hidden="true" />
                  Open to Design Engineer &amp; Product roles
                </span>
              </div>
            </div>

            {/* photo cluster — designed placeholders (labelled); the two small
                frames drift on scroll, rotation + hover live on the inner card */}
            <DriftGroup className={styles.cluster}>
              <div className={styles.mainSlot} data-depth="7">
                <div className={`${styles.frame} ${styles.frameMain}`}>
                  <span className={styles.frameMark}>RS</span>
                  <span className={`${styles.frameLabel} ${styles.frameLabelMain}`}>
                    Portrait — to come
                  </span>
                </div>
              </div>
              <div className={`${styles.smSlot} ${styles.smA}`} data-depth="-16">
                <div className={`${styles.frame} ${styles.frameSm} ${styles.rotA}`}>
                  <span className={styles.frameMark}>·</span>
                  <span className={styles.frameLabel}>Studio · NYC</span>
                </div>
              </div>
              <div className={`${styles.smSlot} ${styles.smB}`} data-depth="12">
                <div className={`${styles.frame} ${styles.frameSm} ${styles.rotB}`}>
                  <span className={styles.frameMark}>·</span>
                  <span className={styles.frameLabel}>Mumbai</span>
                </div>
              </div>
            </DriftGroup>
          </div>
        </header>

        {/* ============ JOURNEY (deck-style timeline) ============ */}
        <section className={`section ${styles.journeyBand}`}>
          <div className="container">
            <h2 className="kicker">The journey</h2>
            <p className="lede">
              Ten years, one move repeated: from the thing in your hand, to the
              thing on your screen, to the system running underneath it.
            </p>

            <div className={styles.tlLegend}>
              <span className={styles.tlIt}>
                <span className={`${styles.sw} ${styles.swHolo}`} />
                Education
              </span>
              <span className={styles.tlIt}>
                <span className={`${styles.sw} ${styles.swInk}`} />
                Studio &amp; agency roles
              </span>
              <span className={styles.tlIt}>
                <span className={`${styles.sw} ${styles.swAcc}`} />
                Parsons · systems era
              </span>
              <span className={styles.tlIt}>
                <span className={`${styles.sw} ${styles.swPiv}`} />
                Arc pivot
              </span>
            </div>

            <div
              className={styles.tlScroll}
              tabIndex={0}
              role="group"
              aria-label="Career timeline (scroll horizontally)"
            >
              <svg
                viewBox="0 0 1120 300"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="Journey timeline, 2016 to now: A Levels, ISDI product design, YAAP internship, Think Design research, pivot one from objects to interfaces in 2021, YAAP art direction, Mindseye UX, freelance, pivot two — the move from Mumbai to New York in 2024 — then Parsons studios and Follow, the working prototype, now."
              >
                {/* PIVOT 1 · 2021 — objects → interfaces */}
                <rect x="468.5" y="22" width="3" height="248" fill="var(--accent)" opacity=".85" />
                <rect x="393" y="22" width="155" height="34" rx="4" fill="var(--accent)" />
                <text x="470" y="40" textAnchor="middle" className={styles.tMono} fontSize="10.5" fontWeight="700" fill="#fff" letterSpacing="1.2">
                  PIVOT 1 · 2021
                </text>
                <text x="470" y="52" textAnchor="middle" className={styles.tMono} fontSize="9.5" fill="#fff" opacity=".92">
                  objects → interfaces
                </text>

                {/* PIVOT 2 · 2024 — the move */}
                <rect x="813.5" y="22" width="3" height="248" fill="var(--accent)" opacity=".85" />
                <rect x="738" y="22" width="155" height="34" rx="4" fill="var(--accent)" />
                <text x="815" y="40" textAnchor="middle" className={styles.tMono} fontSize="10.5" fontWeight="700" fill="#fff" letterSpacing="1.2">
                  PIVOT 2 · 2024
                </text>
                <text x="815" y="52" textAnchor="middle" className={styles.tMono} fontSize="9.5" fill="#fff" opacity=".92">
                  Mumbai → New York
                </text>

                {/* axis */}
                <line x1="50" y1="150" x2="1070" y2="150" stroke="var(--ink)" strokeWidth="2" />
                <g className={styles.tMono} fontSize="10" fill="var(--soft)" letterSpacing="1">
                  <line x1="95" y1="150" x2="95" y2="156" stroke="var(--soft)" />
                  <text x="95" y="172" textAnchor="middle">2016</text>
                  <line x1="320" y1="150" x2="320" y2="156" stroke="var(--soft)" />
                  <text x="320" y="172" textAnchor="middle">2019</text>
                  <line x1="620" y1="150" x2="620" y2="156" stroke="var(--soft)" />
                  <text x="620" y="172" textAnchor="middle">2022</text>
                  <line x1="890" y1="150" x2="890" y2="156" stroke="var(--soft)" />
                  <text x="890" y="172" textAnchor="middle">2025</text>
                  <line x1="1040" y1="150" x2="1040" y2="156" stroke="var(--soft)" />
                  <text x="1040" y="172" textAnchor="middle">NOW</text>
                </g>

                {/* 2016 · A Levels (below, holo) */}
                <line x1="95" y1="150" x2="95" y2="196" stroke="var(--soft)" strokeDasharray="2 3" />
                <circle cx="95" cy="150" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
                <text x="95" y="214" textAnchor="middle" fontSize="13.5" fontWeight="700" fill="var(--ink)">CIE A Levels</text>
                <text x="95" y="230" textAnchor="middle" fontSize="11" fontStyle="italic" fill="var(--soft)">Vibgyor High</text>

                {/* 2017 · ISDI begins (above, holo) */}
                <line x1="200" y1="150" x2="200" y2="108" stroke="var(--soft)" strokeDasharray="2 3" />
                <circle cx="200" cy="150" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
                <text x="200" y="98" textAnchor="middle" fontSize="13.5" fontWeight="700" fill="var(--ink)">ISDI · 2017</text>
                <text x="200" y="82" textAnchor="middle" fontSize="11" fontStyle="italic" fill="var(--soft)">4-yr product design begins</text>

                {/* 2019 · YAAP internship (below, ink) */}
                <line x1="320" y1="150" x2="320" y2="196" stroke="var(--soft)" strokeDasharray="2 3" />
                <circle cx="320" cy="150" r="6" fill="var(--ink)" />
                <text x="320" y="214" textAnchor="middle" fontSize="13.5" fontWeight="700" fill="var(--ink)">YAAP Digital</text>
                <text x="320" y="230" textAnchor="middle" fontSize="11" fontStyle="italic" fill="var(--soft)">design intern · first studio</text>

                {/* 2020 · Think Design (above, ink) */}
                <line x1="412" y1="150" x2="412" y2="108" stroke="var(--soft)" strokeDasharray="2 3" />
                <circle cx="412" cy="150" r="6" fill="var(--ink)" />
                <text x="412" y="98" textAnchor="middle" fontSize="13.5" fontWeight="700" fill="var(--ink)">Think Design</text>
                <text x="412" y="82" textAnchor="middle" fontSize="11" fontStyle="italic" fill="var(--soft)">research intern</text>

                {/* 2021–22 · YAAP JAD (below, ink) */}
                <line x1="566" y1="150" x2="566" y2="196" stroke="var(--soft)" strokeDasharray="2 3" />
                <circle cx="566" cy="150" r="6" fill="var(--ink)" />
                <text x="566" y="214" textAnchor="middle" fontSize="13.5" fontWeight="700" fill="var(--ink)">YAAP Digital</text>
                <text x="566" y="230" textAnchor="middle" fontSize="11" fontStyle="italic" fill="var(--soft)">junior art director · ’21–22</text>

                {/* 2022–23 · Mindseye (above, ink) */}
                <line x1="655" y1="150" x2="655" y2="108" stroke="var(--soft)" strokeDasharray="2 3" />
                <circle cx="655" cy="150" r="6" fill="var(--ink)" />
                <text x="655" y="98" textAnchor="middle" fontSize="13.5" fontWeight="700" fill="var(--ink)">Mindseye Creative</text>
                <text x="655" y="82" textAnchor="middle" fontSize="11" fontStyle="italic" fill="var(--soft)">UX designer · ’22–23</text>

                {/* 2023 · Freelance (below, ink) */}
                <line x1="736" y1="150" x2="736" y2="196" stroke="var(--soft)" strokeDasharray="2 3" />
                <circle cx="736" cy="150" r="6" fill="var(--ink)" />
                <text x="736" y="214" textAnchor="middle" fontSize="13.5" fontWeight="700" fill="var(--ink)">Freelance</text>
                <text x="736" y="230" textAnchor="middle" fontSize="11" fontStyle="italic" fill="var(--soft)">product &amp; UX · ’23–24</text>

                {/* 2025 · Parsons studios (above, accent) */}
                <line x1="925" y1="150" x2="925" y2="108" stroke="var(--soft)" strokeDasharray="2 3" />
                <circle cx="925" cy="150" r="6" fill="var(--accent)" />
                <text x="925" y="98" textAnchor="middle" fontSize="13.5" fontWeight="700" fill="var(--ink)">Housing Works</text>
                <text x="925" y="82" textAnchor="middle" fontSize="11" fontStyle="italic" fill="var(--accent)">+ Healthy Materials · ’25</text>

                {/* 2025–26 · Follow → now (below, accent) */}
                <line x1="980" y1="150" x2="980" y2="196" stroke="var(--soft)" strokeDasharray="2 3" />
                <circle cx="980" cy="150" r="6" fill="var(--accent)" />
                <text x="980" y="214" textAnchor="middle" fontSize="13.5" fontWeight="700" fill="var(--ink)">Follow</text>
                <text x="980" y="230" textAnchor="middle" fontSize="11" fontStyle="italic" fill="var(--accent)">working prototype · now</text>
              </svg>
            </div>

            <p className={styles.tlFoot}>
              <strong>The two pivots are the arc.</strong> 2021 — trained on
              objects, moved into interfaces. 2024 — moved to New York, and from
              designing interfaces to building the systems underneath them.
            </p>
          </div>
        </section>

        {/* ============ THE WORK (CV as a list, newest era first) ============ */}
        <section className="section">
          <div className="container" data-ambient-dim>
            <h2 className="kicker">The work</h2>
            <p className="lede">
              Where I&rsquo;ve worked, and where each era&rsquo;s work lives on
              this site.
            </p>

            <div className={styles.workList}>
              {/* 2024–26 · The New School — the anchor row */}
              <div className={`${styles.wrow} ${styles.now}`}>
                <p className={styles.wEra}>2024–26</p>
                <div>
                  <p className={styles.wTitle}>
                    Parsons School of Design{" "}
                    <span className={styles.org}>· The New School, NYC</span>
                  </p>
                  <p className={styles.wDesc}>
                    MS, Strategic Design &amp; Management — the systems era.
                    Client work, graduate research, and Follow: designed and
                    shipped end to end by directing AI coding agents.
                  </p>
                  <div className={styles.wCtas}>
                    <Link className={styles.wLink} href="/work/follow">
                      Follow <span className={styles.arr}>→</span>
                    </Link>
                    <Link className={styles.wLink} href="/work/greener-hours">
                      Greener Hours <span className={styles.arr}>→</span>
                    </Link>
                    <Link className={styles.wLink} href="/work/healthy-materials">
                      Healthy Materials <span className={styles.arr}>→</span>
                    </Link>
                    <Link className={styles.wLink} href="/work/housing-works">
                      Housing Works <span className={styles.arr}>→</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className={styles.wrow}>
                <p className={styles.wEra}>2023–24</p>
                <div>
                  <p className={styles.wTitle}>
                    Freelance{" "}
                    <span className={styles.org}>· product, UX &amp; graphic design</span>
                  </p>
                  <p className={styles.wDesc}>
                    Research, personas, flows, wireframes, and UI for websites
                    and apps — working with clients and developers through to
                    launch.
                  </p>
                  <div className={styles.wCtas}>
                    <Link className={styles.wLink} href="/archive">
                      Browse the archive <span className={styles.arr}>→</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className={styles.wrow}>
                <p className={styles.wEra}>2022–23</p>
                <div>
                  <p className={styles.wTitle}>
                    Mindseye Creative{" "}
                    <span className={styles.org}>· UX Designer</span>
                  </p>
                  <p className={styles.wDesc}>
                    Led UX research and design for websites and apps — guiding
                    UI designers and staying with each project through
                    development and launch.
                  </p>
                  <div className={styles.wCtas}>
                    <Link className={styles.wLink} href="/archive/vsg">
                      VSG case <span className={styles.arr}>→</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className={styles.wrow}>
                <p className={styles.wEra}>2021–22</p>
                <div>
                  <p className={styles.wTitle}>
                    YAAP Digital{" "}
                    <span className={styles.org}>· Junior Art Director</span>
                  </p>
                  <p className={styles.wDesc}>
                    Social and brand creative for a range of businesses — and
                    the agency&rsquo;s own Instagram presence.
                  </p>
                  <div className={styles.wCtas}>
                    <Link className={styles.wLink} href="/archive/yaap">
                      YAAP creatives <span className={styles.arr}>→</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className={styles.wrow}>
                <p className={styles.wEra}>2020</p>
                <div>
                  <p className={styles.wTitle}>
                    Think Design{" "}
                    <span className={styles.org}>· Design Research Intern</span>
                  </p>
                  <p className={styles.wDesc}>
                    User interviews, synthesis, and a findings report.
                  </p>
                </div>
              </div>

              <div className={styles.wrow}>
                <p className={styles.wEra}>2019</p>
                <div>
                  <p className={styles.wTitle}>
                    YAAP Digital{" "}
                    <span className={styles.org}>· Design Intern</span>
                  </p>
                  <p className={styles.wDesc}>
                    Concept and creative support across design projects.
                  </p>
                  <div className={styles.wCtas}>
                    <Link className={styles.wLink} href="/archive/yaap">
                      YAAP creatives <span className={styles.arr}>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.edu}>
              <span className={styles.eduLabel}>Education</span>
              <span className={styles.eduItem}>
                <strong>Parsons</strong> MS · exp. 2026
              </span>
              <span className={styles.eduItem}>
                <strong>ISDI</strong> Product Design · 2021
              </span>
              <span className={styles.eduItem}>
                <strong>University of Mumbai</strong> BA Sociology · 2021
              </span>
              <span className={styles.eduItem}>
                <strong>Vibgyor High</strong> A Levels · 2016
              </span>
            </div>
          </div>
        </section>

        {/* ============ SKILLS ============ */}
        <section className="section">
          <div className="container">
            <h2 className="kicker">What I work with</h2>
            <div className={styles.skills}>
              <div className={`${styles.skillGroup} lift`}>
                <p className={styles.skillLabel}>Design</p>
                <ul className={styles.skillList}>
                  <li>Product &amp; UX design</li>
                  <li>Design research &amp; synthesis</li>
                  <li>Systems &amp; strategic design</li>
                  <li>Interaction &amp; visual design</li>
                  <li>Figma</li>
                  <li>Photoshop &amp; Illustrator</li>
                  <li>3D modeling</li>
                </ul>
              </div>
              <div className={`${styles.skillGroup} lift`}>
                <p className={styles.skillLabel}>AI &amp; Build</p>
                <ul className={styles.skillList}>
                  <li>End-to-end apps with Claude &amp; Claude Code</li>
                  <li>MCP (servers + tools)</li>
                  <li>Anthropic API &amp; agentic architectures</li>
                  <li>Prompt &amp; agent design</li>
                  <li>Next.js</li>
                  <li>React / React Native</li>
                  <li>TypeScript</li>
                  <li>Python / FastAPI</li>
                  <li>Git &amp; GitHub</li>
                  <li>Railway</li>
                </ul>
              </div>
              <div className={`${styles.skillGroup} lift`}>
                <p className={styles.skillLabel}>Ways of working</p>
                <ul className={styles.skillList}>
                  <li>Systems thinking</li>
                  <li>Clear writing</li>
                  <li>Cross-functional collaboration</li>
                  <li>Shipping under constraint</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CONTACT (owns the #contact anchor — nav + home CTA land here) ============ */}
        <section id="contact" className={`section ${styles.contact}`}>
          <div className="container">
            <h2 className="kicker">Contact</h2>
            <p className={styles.contactText}>
              Let&rsquo;s build something that <em>runs</em>.
            </p>
            <p className={styles.contactSub}>
              Brooklyn, NY — open to Design Engineer and Product roles at
              AI-native teams, and to conversations about Follow.
            </p>
            <div className={styles.ctaRow}>
              <a className="btn primary" href={`mailto:${SOCIALS.email}`}>
                Email me
              </a>
              <a
                className="btn ghost"
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="btn ghost"
                href={SOCIALS.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="btn ghost"
                href={SOCIALS.behance}
                target="_blank"
                rel="noreferrer"
              >
                Behance
              </a>
              <a className="btn ghost" href="/Rishabh-Salian-CV.pdf" download>
                Download CV · PDF
              </a>
            </div>
            <p className={`mono ${styles.contactFoot}`}>
              <a href={`mailto:${SOCIALS.email}`}>{SOCIALS.email}</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
