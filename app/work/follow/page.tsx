import type { Metadata } from "next";
import DemoCallout from "@/components/DemoCallout/DemoCallout";
import FollowReel from "./FollowReel";
import styles from "./follow.module.css";

export const metadata: Metadata = {
  title: "Follow — Rishabh Salian",
  description:
    "Follow — a shared, trackable memory layer that sits between a team’s AI tools. The capstone: the pipeline, the research, and the two pivots to a team-memory layer.",
};

// §4.1 — Follow accent (burnt orange #C2410C, overriding Persian Blue) + derived
// shades, set at the page root; everything inherits. --navy (the dark band) is
// declared on styles.page so it stays scoped to this route.
const rootStyle = {
  "--accent": "#C2410C",
  "--accent-deep": "#9E340A",
  "--accent-wash": "#F7E0D4",
  "--accent-tint": "#FBEFE7",
} as React.CSSProperties;

export default function FollowPage() {
  return (
    <div style={rootStyle} className={styles.page}>
      {/* ============ HERO ============ */}
      <header className={styles.hero}>
        <div className={styles.dotsmark}>
          <span className={styles.dots}>
            <span className={styles.d} />
            <span className={styles.d} />
            <span className={styles.d} />
            <span className={`${styles.d} ${styles.ai}`} />
          </span>
          <span className={styles.ml}>
            the invisible <em>teammate</em>
          </span>
        </div>
        <p className={styles.heroEyebrow}>
          Capstone · PGDM Design Strategy, Parsons · 2025–26
        </p>
        <h1 className={styles.heroTitle}>
          AI made everyone faster. Follow makes teams <em>smarter</em>.
        </h1>
        <p className={styles.heroSub}>
          Follow is a shared, trackable memory layer that sits <em>between</em>{" "}
          your team’s AI tools — so what one person works out with their AI, the
          whole team can find, trust, and build on.
        </p>
      </header>

      {/* ============ PROJECT TIMELINE (deck-style, at the start) ============ */}
      <section className="section">
        <div className="container">
          <p className={`mono ${styles.kicker}`}>Project timeline</p>
          <p className="lede">
            Spring 2025 → May 2026 — field research, expert interviews, and the
            two pivots that turned Follow from an AI-native document tool into a
            team-memory layer.
          </p>
          <div className={styles.tlLegend}>
            <span className={styles.it}>
              <span className={`${styles.sw} ${styles.ink}`} />
              Field research
            </span>
            <span className={styles.it}>
              <span className={`${styles.sw} ${styles.acc}`} />
              Expert interview
            </span>
            <span className={styles.it}>
              <span className={`${styles.sw} ${styles.holo}`} />
              Product moment
            </span>
            <span className={styles.it}>
              <span className={`${styles.sw} ${styles.piv}`} />
              Pivot
            </span>
          </div>
          <div className={styles.tlScroll}>
            <svg
              viewBox="0 0 1120 300"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Project timeline, Spring 2025 to May 2026: Housing Works origin, concept v1, peer tests, pivot to a workspace extension, interviews with Alexandra Becker, Andy and Atanu Sinha, build sprints, pivot to teams-first, and the v6 capstone."
            >
              <rect x="453.5" y="22" width="3" height="248" fill="var(--accent)" opacity=".85" />
              <rect x="378" y="22" width="155" height="34" rx="4" fill="var(--accent)" />
              <text x="455" y="40" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="10.5" fontWeight="700" fill="#fff" letterSpacing="1.2">
                PIVOT 1 · MAR 17
              </text>
              <text x="455" y="52" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="9.5" fill="#fff" opacity=".92">
                doc editor → workspace ext.
              </text>
              <rect x="863.5" y="22" width="3" height="248" fill="var(--accent)" opacity=".85" />
              <rect x="788" y="22" width="155" height="34" rx="4" fill="var(--accent)" />
              <text x="865" y="40" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="10.5" fontWeight="700" fill="#fff" letterSpacing="1.2">
                PIVOT 2 · LATE APR
              </text>
              <text x="865" y="52" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="9.5" fill="#fff" opacity=".92">
                individuals → teams-first
              </text>

              <line x1="50" y1="150" x2="1070" y2="150" stroke="var(--ink)" strokeWidth="2" />
              <g fontFamily="IBM Plex Mono,monospace" fontSize="10" fill="var(--soft)" letterSpacing="1">
                <line x1="95" y1="150" x2="95" y2="156" stroke="var(--soft)" />
                <text x="95" y="172" textAnchor="middle">SPRING ’25</text>
                <line x1="300" y1="150" x2="300" y2="156" stroke="var(--soft)" />
                <text x="300" y="172" textAnchor="middle">FEB ’26</text>
                <line x1="430" y1="150" x2="430" y2="156" stroke="var(--soft)" />
                <text x="430" y="172" textAnchor="middle">MAR ’26</text>
                <line x1="700" y1="150" x2="700" y2="156" stroke="var(--soft)" />
                <text x="700" y="172" textAnchor="middle">APR ’26</text>
                <line x1="1010" y1="150" x2="1010" y2="156" stroke="var(--soft)" />
                <text x="1010" y="172" textAnchor="middle">MAY ’26</text>
              </g>

              <line x1="95" y1="150" x2="95" y2="196" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="95" cy="150" r="6" fill="var(--ink)" />
              <text x="95" y="214" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                Housing Works
              </text>
              <text x="95" y="230" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--soft)">
                3-person team · the origin
              </text>

              <line x1="250" y1="150" x2="250" y2="108" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="250" cy="150" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
              <text x="250" y="98" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                Concept v1
              </text>
              <text x="250" y="82" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--soft)">
                cognitive debt · AI-native doc
              </text>

              <line x1="375" y1="150" x2="375" y2="196" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="375" cy="150" r="6" fill="var(--ink)" />
              <text x="375" y="214" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                Peer tests
              </text>
              <text x="375" y="230" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--soft)">
                5 peers · early wireframe
              </text>

              <line x1="540" y1="150" x2="540" y2="108" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="540" cy="150" r="6" fill="var(--ink)" />
              <text x="540" y="98" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                Alexandra Becker
              </text>
              <text x="540" y="82" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--soft)">
                outside perspective · Mar 31
              </text>

              <line x1="620" y1="150" x2="620" y2="196" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="620" cy="150" r="6" fill="var(--ink)" />
              <text x="620" y="214" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                Workshop
              </text>
              <text x="620" y="230" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--soft)">
                Intelligence Gap · 4 teams
              </text>

              <line x1="705" y1="150" x2="705" y2="108" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="705" cy="150" r="6" fill="var(--accent)" />
              <text x="705" y="98" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                Andy
              </text>
              <text x="705" y="82" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--accent)">
                expert · agentic systems
              </text>

              <line x1="785" y1="150" x2="785" y2="196" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="785" cy="150" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
              <text x="785" y="214" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                Build sprints
              </text>
              <text x="785" y="230" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--soft)">
                MCP tools · the pipeline
              </text>

              <line x1="945" y1="150" x2="945" y2="108" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="945" cy="150" r="6" fill="var(--accent)" />
              <text x="945" y="98" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                Atanu Sinha
              </text>
              <text x="945" y="82" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--accent)">
                expert · 25-yr operator
              </text>

              <line x1="1025" y1="150" x2="1025" y2="196" stroke="var(--soft)" strokeDasharray="2 3" />
              <circle cx="1025" cy="150" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
              <text x="1025" y="214" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="13.5" fontWeight="700" fill="var(--ink)">
                v6 capstone
              </text>
              <text x="1025" y="230" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="11" fontStyle="italic" fill="var(--soft)">
                teams-first · this artifact
              </text>
            </svg>
          </div>
          <p className={styles.tlFoot}>
            <strong>What this is not:</strong> a longitudinal deployment study.
            The peer tests informed a pivot, not a validation — the longitudinal
            pilot ahead is the move from modeled to measured.
          </p>
        </div>
      </section>

      {/* ============ THE PROBLEM ============ */}
      <section className={`section ${styles.band}`}>
        <div className="containerText">
          <p className={`mono ${styles.kicker}`}>The problem</p>
          <p className="lede">
            Work isn’t written alone anymore. Almost every decision now passes
            through someone’s AI chat — the constraints, the rejected options,
            the reasoning — and then stays locked in that one private thread.
          </p>
          <p className={styles.body}>
            Teams already run as a transactive memory system with each other:
            everyone keeps a rough map of who knows what. But they don’t have
            that with their AI tools. The context that actually shaped the work
            scatters across separate chats and disappears. When we tested the
            idea, six of eight people volunteered the same feeling before seeing
            anything — that their AI-assisted work didn’t quite feel like theirs.
          </p>
        </div>
      </section>

      {/* ============ RESEARCH & INTERVIEWS ============ */}
      <section className="section">
        <div className="container">
          <p className={`mono ${styles.kicker}`}>Research &amp; interviews</p>
          <p className="lede">
            Mixed-methods, and honest about scope: a theoretical spine, plus six
            primary engagements — from lived experience to expert interviews.
          </p>
          <div className={styles.rcols}>
            <div className={styles.rcol}>
              <p className={styles.rlabel}>Secondary · the theoretical spine</p>
              <div className={styles.rlist}>
                <div className={styles.r}>
                  <strong>Wegner</strong> — transactive memory systems
                </div>
                <div className={styles.r}>
                  <strong>Clark &amp; Chalmers</strong> — the extended mind
                </div>
                <div className={styles.r}>
                  <strong>Sweller</strong> — cognitive load theory
                </div>
                <div className={styles.r}>
                  <strong>Bienefeld et al.</strong> — TMS in human–AI teams
                </div>
                <div className={styles.r}>
                  <strong>Kosmyna et al. (MIT)</strong> — cognitive debt
                </div>
                <div className={styles.r}>
                  <strong>Doshi &amp; Hauser</strong> — homogenization risk
                </div>
              </div>
            </div>
            <div className={styles.rcol}>
              <p className={styles.rlabel}>Primary · six engagements</p>
              <div className={styles.rlist}>
                <div className={styles.r}>
                  <strong>Housing Works NYC</strong>
                  <span className={styles.kind}>Lived experience</span>
                </div>
                <div className={styles.r}>
                  <strong>Intelligence Gap workshop</strong>
                  <span className={styles.kind}>4 teams · 12 participants</span>
                </div>
                <div className={styles.r}>
                  <strong>Peer concept tests</strong>
                  <span className={styles.kind}>5 participants · early wireframe</span>
                </div>
                <div className={styles.r}>
                  <strong>Andy</strong>
                  <span className={styles.kind}>Expert · agentic systems</span>
                </div>
                <div className={styles.r}>
                  <strong>Alexandra Becker</strong>
                  <span className={styles.kind}>Outside perspective</span>
                </div>
                <div className={styles.r}>
                  <strong>Atanu Sinha</strong>
                  <span className={styles.kind}>Expert · 25-year operator</span>
                </div>
              </div>
            </div>
          </div>

          <p className={styles.rlabel} style={{ marginTop: "34px" }}>
            What we heard
          </p>
          <div className={styles.insights}>
            <div className={styles.ins}>
              <span className={styles.num}>01</span>
              <h3>AI is the invisible teammate.</h3>
              <p>
                Teams already run as transactive memory systems with each other —
                but not with their AI, because its contributions were never
                captured in a form the team could route to.
              </p>
            </div>
            <div className={styles.ins}>
              <span className={styles.num}>02</span>
              <h3>Cross-tool memory is structurally vacant.</h3>
              <p>
                Native memory inside one AI tool is solved by vendors. Cross-tool,
                cross-contributor memory is empty — no vendor with the surface to
                build it has a reason to make it cross-vendor.
              </p>
            </div>
            <div className={styles.ins}>
              <span className={styles.num}>03</span>
              <h3>Provenance matters where stakes are high.</h3>
              <p>
                The strongest signal for value comes where the cost of being wrong
                is asymmetric — legal review, regulated work, compliance. That’s
                also where pricing tolerance is highest.
              </p>
            </div>
          </div>

          <div className={styles.guilt}>
            <p>
              “The deliverable shipped — we didn’t fail. But I could have done
              better work if I’d known how my teammates got where they got.”
            </p>
            <p className={styles.src}>
              From the Housing Works experience — and six of eight concept-test
              participants named the same feeling, unprompted.
            </p>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS — intro, then full-screen scroll-pinned reel ============ */}
      <section className="section">
        <div className="container">
          <div className={styles.reelHead}>
            <p className={`mono ${styles.kicker}`}>How it works</p>
            <h2 className={styles.reelTitle}>
              From conversation to <em>queryable</em> memory.
            </h2>
            <p className={styles.reelNote} style={{ marginTop: "10px" }}>
              Scroll to play — the pipeline builds beat by beat as you move
              through it.
            </p>
          </div>
        </div>
      </section>

      <FollowReel />

      <section className="section">
        <div className="container">
          <p className={styles.reelNote}>
            Illustrative animation of the live pipeline — three teammates and
            their AIs, five LLM roles, three tensors, five typed edges, and
            supersession chains that are never overwritten.
          </p>
        </div>
      </section>

      {/* ============ DARK STAT STRIP ============ */}
      <section className={styles.strip} aria-label="Follow by the numbers">
        <div className={`container ${styles.stripInner}`}>
          <div className={styles.stat}>
            <span className={styles.statNum}>5</span>
            <span className={styles.statLabel}>LLM roles</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>3</span>
            <span className={styles.statLabel}>tensors</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>5</span>
            <span className={styles.statLabel}>edge types</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>12</span>
            <span className={styles.statLabel}>MCP tools</span>
          </div>
        </div>
      </section>

      {/* ============ DIFFERENTIATORS ============ */}
      <section className="section">
        <div className="container">
          <p className={`mono ${styles.kicker}`}>What makes it different</p>
          <p className="lede">
            Three things vendor share-links and document search can’t do.
          </p>
          <div className={styles.cards}>
            <div className={styles.card}>
              <span className={styles.no}>01</span>
              <h3>Shared AI memory</h3>
              <p>
                One team memory across collaborators — and across whichever AI
                tool each of them uses. Not a link you send; a layer you all
                query.
              </p>
            </div>
            <div className={styles.card}>
              <span className={styles.no}>02</span>
              <h3>Per-paragraph provenance</h3>
              <p>
                Every fact carries who said it, in which chat, and when. Answers
                come back attributed, so you can see and trust where they came
                from.
              </p>
            </div>
            <div className={styles.card}>
              <span className={styles.no}>03</span>
              <h3>Contradiction detection</h3>
              <p>
                When two teammates’ AIs disagree, Follow surfaces the conflict
                instead of silently picking one — the contested points stay
                visible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE FOUR QUESTIONS ============ */}
      <section className={`section ${styles.band}`}>
        <div className="container">
          <p className={`mono ${styles.kicker}`}>
            The four questions it answers
          </p>
          <p className="lede">
            These are routing and surfacing moves — the things a pile of separate
            chats can never do for you.
          </p>
          <div className={styles.queries}>
            <div className={styles.q}>
              <div className={styles.dot} />
              <p>What’s contested?</p>
            </div>
            <div className={styles.q}>
              <div className={styles.dot} />
              <p>Who should I ask?</p>
            </div>
            <div className={styles.q}>
              <div className={styles.dot} />
              <p>What changed?</p>
            </div>
            <div className={styles.q}>
              <div className={styles.dot} />
              <p>What’s been superseded?</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHERE IT SITS ============ */}
      <section className="section">
        <div className="containerText">
          <p className={`mono ${styles.kicker}`}>Where it sits</p>
          <p className="lede">
            Tools like Glean index your team’s documents. Follow indexes the{" "}
            <em>reasoning</em> — the live, contested, evolving memory your team
            builds with AI.
          </p>
          <p className={styles.body}>
            It sits between your AI tools rather than inside any one of them, and
            it’s queryable from any of them through MCP. The shared, scoped,
            conflict-aware memory is the product — your team’s transactive
            memory, finally made computational.
          </p>
        </div>
      </section>

      {/* ============ DEMO CALLOUT (honest badge — D-03 default: SIMULATED) ============ */}
      <section className="section">
        <div className="container">
          <DemoCallout
            name="Follow"
            status="SIMULATED"
            title="Query a shared team memory."
            body="Step into a small, pre-loaded team workspace and ask it the four questions above — watch answers come back with provenance and contested points flagged. Runs on sample data; the live MCP product connects to your real AI tools."
            buttonLabel="Open the team-memory sandbox"
            href="#"
          />
        </div>
      </section>
    </div>
  );
}
