"use client";

import { useRef } from "react";
import StunGunStage, {
  type StageFrame,
} from "@/components/StunGunStage/StunGunStage";
import Parallax from "@/components/Parallax/Parallax";
import styles from "./stun-gun.module.css";

const IMG = "/images/stun-gun";

// Ordered angle sequence. Order = scroll order, so each angle lands on the
// content beat it illustrates (§4 mapping). Real transparent PNGs are registered
// to a common 1100² canvas (extracted from the portfolio PDF) — see the folder
// README to swap or add intermediate angles.
const FRAMES: StageFrame[] = [
  {
    angleId: "hero",
    src: `${IMG}/frame-01-hero.png`,
    alt: "Rose-gold stun gun, three-quarter hero view — body, fins and Lockheed Martin mark visible.",
    caption: "01 · FORM",
  },
  {
    angleId: "side",
    src: `${IMG}/frame-02-side.png`,
    alt: "Side profile of the stun gun, showing the full curved silhouette.",
    caption: "— · CONTEXT",
  },
  {
    angleId: "front",
    src: `${IMG}/frame-03-front.png`,
    alt: "Front face view of the stun gun — the eye detail with fins underneath.",
    caption: "03 · SILHOUETTE",
  },
  {
    angleId: "interface",
    src: `${IMG}/frame-04-interface.png`,
    alt: "Top-down interface view — SOS button, torch, and logo button.",
    caption: "04 · INTERFACE",
  },
];

export default function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.pin} aria-label="The stun gun, angle by angle">
      <div className={styles.pinGrid} ref={trackRef}>
        {/* ---- pinned render (DOM-first so it pins at the top on mobile;
             placed to the right on desktop via grid). It's a DIRECT child of
             the track so it sticks within the full track height. ---- */}
        <StunGunStage
          frames={FRAMES}
          trackRef={trackRef}
          idleBob
          className={styles.stageCol}
        />

        {/* ---- content column (scrolls, parallax) ---- */}
        <div className={styles.content}>
          <Parallax offset={26} className={styles.block}>
            <p className={`mono ${styles.kicker}`}>Context analysis</p>
            <h2 className={styles.h2}>
              The category looked like a <em>weapon</em>. It needed to look like
              safety.
            </h2>
            <p className={styles.body}>
              Conventional self-defence stun guns are styled like blunt black
              tools — intimidating to carry and easy to forget at the bottom of
              a bag. The brief was a device a woman would actually keep within
              reach: calm, considered, unmistakably an everyday object rather
              than a threat.
            </p>
            <figure className={styles.figure}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${IMG}/context-old-gun.jpg`}
                alt="A conventional black stun gun for comparison."
                loading="lazy"
              />
              <figcaption className={`mono ${styles.cap}`}>
                The conventional form — the thing we were designing away from.
              </figcaption>
            </figure>
          </Parallax>

          <Parallax offset={40} className={styles.block}>
            <p className={`mono ${styles.kicker}`}>Design inspiration</p>
            <h2 className={styles.h2}>Borrowed from aircraft, not arms.</h2>
            <p className={styles.body}>
              The surface language comes from the Lockheed&nbsp;Martin F-22 —
              faceted, purposeful, fast-reading — reframing the device as
              precision equipment. Grey wireframe form-studies worked the
              silhouette and the way the fins resolve into the body before any
              render existed.
            </p>
            <div className={styles.pairGrid}>
              <figure className={styles.figure}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${IMG}/inspiration-f22.jpg`}
                  alt="Lockheed Martin F-22 reference imagery."
                  loading="lazy"
                />
                <figcaption className={`mono ${styles.cap}`}>
                  F-22 reference — the faceted surface language.
                </figcaption>
              </figure>
              <figure className={styles.figure}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${IMG}/inspiration-wireframe.jpg`}
                  alt="Grey wireframe form-study sketches of the stun gun."
                  loading="lazy"
                />
                <figcaption className={`mono ${styles.cap}`}>
                  Form-study wireframes — thinking in 3D before the render.
                </figcaption>
              </figure>
            </div>
          </Parallax>

          <Parallax offset={26} className={styles.block}>
            <p className={`mono ${styles.kicker}`}>Concept</p>
            <h2 className={styles.h2}>One silhouette, read from the front.</h2>
            <p className={styles.body}>
              Face-on, the device resolves into a single calm form — the “eye”
              detail centred, the fins tucked beneath. Rose-gold carries the
              whole colour story; the body stays quiet so the one warm material
              does the talking.
            </p>
          </Parallax>

          <Parallax offset={14} className={styles.block}>
            <p className={`mono ${styles.kicker}`}>Features</p>
            <h2 className={styles.h2}>Everything for the hand, on top.</h2>
            <p className={styles.body}>
              Seen from above, the interface lays itself out: a recessed SOS
              button, an integrated torch, and the logo button, all reachable
              without looking. The ergonomic foam model below tested the grip in
              the hand before the surfaces were finalised.
            </p>
            <figure className={styles.figure}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${IMG}/features-foam.jpg`}
                alt="White ergonomic foam model of the stun gun held in hand."
                loading="lazy"
              />
              <figcaption className={`mono ${styles.cap}`}>
                Foam ergonomic model — grip tested in the hand.
              </figcaption>
            </figure>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
