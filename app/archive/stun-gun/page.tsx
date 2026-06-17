import type { Metadata } from "next";
import Link from "next/link";
import { Tinos } from "next/font/google";
import OffsetCard from "@/components/OffsetCard/OffsetCard";
import Parallax from "@/components/Parallax/Parallax";
import styles from "./stun-gun.module.css";

// Page-local serif (Times-compatible). Google Fonts, not an npm dep.
const serif = Tinos({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stun Gun — Rishabh Salian",
  description:
    "A self-defence stun gun for women, styled from Lockheed Martin's aircraft aesthetics. A product-design case study.",
};

const IMG = "/images/stun-gun";

export default function StunGunPage() {
  return (
    <div className={`${serif.variable} ${styles.page}`}>
      {/* ============ 3.1 HERO — white ground ============ */}
      <section className={`${styles.section} ${styles.hero}`}>
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>Stun Gun For Women</h1>
            <p className={styles.subtitle}>Inspired by Lockheed Martin</p>
            <p className={styles.body}>
              A Stun Gun specifically tailored for women’s safety, drawing
              inspiration from the sleek and advanced aesthetics of Lockheed
              Martin’s aircraft. This innovative self-defence device aims to
              provide a powerful yet elegant solution that empowers women to
              protect themselves effectively in various situations.
            </p>
            <p className={styles.credit}>
              Product Design Project By Rishabh Salian
            </p>
          </div>
          <div className={styles.heroCardWrap}>
            <OffsetCard
              src={`${IMG}/hero-3q.jpg`}
              alt="Rose-gold stun gun, three-quarter hero view — body, fins and Lockheed Martin mark."
              intensity={1.1}
            />
          </div>
        </div>
      </section>

      {/* ============ 3.2 CONTEXT + INSPIRATION — vertical half-split ====== */}
      <section className={styles.split}>
        <div className={`${styles.splitLeft} ${styles.padBlock}`}>
          <Parallax offset={8}>
            <img
              className={styles.plainImg}
              src={`${IMG}/context-old-gun.jpg`}
              alt="A conventional black stun gun."
              loading="lazy"
            />
          </Parallax>
          <h2 className={styles.h2}>Context Analysis</h2>
          <p className={styles.body}>
            Enter the realm of conventional Stun Guns, where functionality often
            overshadows aesthetics. These safety devices, while effective, lack
            the visual appeal that resonates with women. Bulky frames, harsh
            lines, and an overall lack of finesse characterize the status quo.
            It’s time to challenge this norm and redefine what safety means for
            the modern woman.
          </p>
        </div>

        <div className={`${styles.splitRight} ${styles.padBlock}`}>
          <div className={styles.f22Grid}>
            <img
              className={styles.gridImg}
              src={`${IMG}/inspiration-f22-1.jpg`}
              alt="Lockheed Martin F-22 in flight."
              loading="lazy"
            />
            <img
              className={styles.gridImg}
              src={`${IMG}/inspiration-f22-2.jpg`}
              alt="Lockheed Martin F-22, front view."
              loading="lazy"
            />
            <img
              className={`${styles.gridImg} ${styles.gridWide}`}
              src={`${IMG}/inspiration-f22-3.jpg`}
              alt="Lockheed Martin F-22, side profile."
              loading="lazy"
            />
          </div>
          <div className={styles.whiteCard}>
            <img
              className={styles.plainImg}
              src={`${IMG}/inspiration-wireframe.jpg`}
              alt="Grey wireframe form-study sketches of the stun gun."
              loading="lazy"
            />
          </div>
          <h2 className={styles.h2}>Design inspiration</h2>
          <p className={styles.body}>
            In my quest for a design revolution, I turn to the unexpected muse —
            Lockheed Martin’s aircraft aesthetics. The marriage of form and
            function in their designs becomes my guiding principle. By infusing
            the smooth organic shapes and aerodynamic elegance reminiscent of
            Lockheed Martin, I aim to redefine the visual language of the Stun
            Gun.
          </p>
        </div>
      </section>

      {/* ============ 3.3 CONCEPT — full dusty-rose ground ============ */}
      <section className={`${styles.section} ${styles.concept}`}>
        <div className={styles.conceptGrid}>
          <div className={styles.conceptLeft}>
            <div className={styles.whiteCard}>
              <Parallax offset={8}>
                <img
                  className={styles.plainImg}
                  src={`${IMG}/concept-topdown.jpg`}
                  alt="Top-down interface view — the eye detail and buttons."
                  loading="lazy"
                />
              </Parallax>
            </div>
            <h2 className={styles.h2}>Stun Gun Concept</h2>
            <p className={styles.body}>
              The Stun Gun takes form, a testament to the marriage of Lockheed
              Martin’s aviation aesthetics and women’s safety. The design
              process prioritizes sleekness and finesse, ensuring that every
              curve serves a purpose. The Stun Gun transcends the conventional,
              presenting a smooth and spellbinding form that resonates with the
              feminine aesthetic without compromising on power.
            </p>
          </div>
          <div className={styles.conceptRight}>
            <OffsetCard
              className={styles.stackTop}
              src={`${IMG}/concept-front.jpg`}
              alt="Front / face view of the stun gun — the eye detail with fins beneath."
            />
            <OffsetCard
              className={styles.stackBottom}
              src={`${IMG}/concept-side.jpg`}
              alt="Side profile of the stun gun."
            />
          </div>
        </div>
      </section>

      {/* ============ 3.4 FEATURES — white ground, right rose strip ====== */}
      <section className={`${styles.section} ${styles.features}`}>
        <div className={styles.featGrid}>
          <div className={styles.featText}>
            <h2 className={styles.h2}>Features</h2>
            <p className={styles.body}>
              Equipped with a multifunctional interface, the device features an
              intuitive <strong className={styles.callout}>SOS button</strong>{" "}
              for immediate assistance and a{" "}
              <strong className={styles.callout}>powerful built-in torch</strong>{" "}
              for added visibility in low-light conditions. The smart design
              extends beyond aesthetics, incorporating user-friendly controls
              and a rechargeable battery for sustainable use. The Stun Gun is a
              comprehensive self-defense solution that seamlessly integrates
              technology and design to empower women in the modern world.
            </p>
          </div>
          <div className={styles.featCenter}>
            <Parallax offset={10}>
              <img
                className={styles.plainImg}
                src={`${IMG}/features-buttons.jpg`}
                alt="Button-detail render — SOS button, torch and the female mark close up."
                loading="lazy"
              />
            </Parallax>
          </div>
          <div className={styles.featRight}>
            <div className={styles.foamCard}>
              <Parallax offset={8}>
                <img
                  className={styles.plainImg}
                  src={`${IMG}/features-foam.jpg`}
                  alt="White ergonomic foam model held in hand."
                  loading="lazy"
                />
              </Parallax>
            </div>
            <p className={styles.body}>
              Crafted for ergonomic excellence, the device ensures a comfortable
              and secure grip, empowering women with confidence in any
              situation. This stun gun is not just a safety tool; it’s a
              statement of strength and empowerment.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 3.5 CONCLUSION — left rose strip ============ */}
      <section className={`${styles.section} ${styles.conclusion}`}>
        <div className={styles.conclGrid}>
          <div className={styles.conclLeft}>
            <h2 className={styles.h2}>Conclusion</h2>
            <p className={styles.body}>
              Beyond its stunning form, the Stun Gun embodies empowerment.
              Lockheed Martin’s influence permeates every inch, transforming a
              safety device into a statement of strength. With deliberate choices
              in materials, the seamless integration of cutting-edge technology,
              and the ergonomic design, this Gun caters specifically to the needs
              of women. The Stun Gun is not just a tool; it’s an extension of
              confidence.
            </p>
          </div>
          <div className={styles.conclRight}>
            <Parallax offset={10}>
              <img
                className={styles.plainImg}
                src={`${IMG}/conclusion-side.jpg`}
                alt="Side-profile render of the stun gun — rose-gold body, Lockheed mark, fins."
                loading="lazy"
              />
            </Parallax>
          </div>
        </div>
      </section>

      {/* ============ END NOTE + PAGER ============ */}
      <section className={`${styles.section} ${styles.endNote}`}>
        <p className={styles.note}>
          Original 2022 source files were lost; the imagery here is extracted
          from the portfolio archive.
        </p>
        <nav className={styles.pager} aria-label="Archive">
          <Link href="/archive" className={styles.pagerLink}>
            ← All archive
          </Link>
          <Link href="/archive" className={styles.pagerLink}>
            Lotus Heater →
          </Link>
        </nav>
      </section>
    </div>
  );
}
