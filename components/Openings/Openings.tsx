"use client";

import { useState } from "react";
import styles from "./Openings.module.css";

type Opening = {
  n: string;
  title: string;
  insight: React.ReactNode;
  quote: string;
  hmw: string;
};

const OPENINGS: Opening[] = [
  {
    n: "01",
    title: "Hybrid Autonomy & Trust",
    insight: (
      <>
        Gen Z reads flexible scheduling as respect and trust. Housing Works
        applied hybrid inconsistently — one staffer reported{" "}
        <em>“one day a week… some weeks not at all,”</em> another was required{" "}
        <em>“in the office three days a week.”</em> The barrier was clarity and
        standardization, not technology.
      </>
    ),
    quote: "one day a week… some weeks not at all",
    hmw: "How might Housing Works write a hybrid charter so every employee feels understood and trusted?",
  },
  {
    n: "02",
    title: "Recognition & Community",
    insight: (
      <>
        Survey and workshop emphasized non-monetary recognition —{" "}
        <em>“Trust &amp; autonomy is motivating,” “Freedom to work in my way :)”.</em>{" "}
        One participant: <em>“It&apos;s not even just about the pay. It&apos;s also
        about being acknowledged.”</em> Soltis et al.: peer-recognition tokens
        lifted engagement ~15 points and cut absenteeism ~9%.
      </>
    ),
    quote: "It's not even just about the pay. It's also about being acknowledged.",
    hmw: "How might surplus stock become peer gifts that link every thank-you to the mission and improve job satisfaction?",
  },
  {
    n: "03",
    title: "Career Clarity & Trustee Expertise",
    insight: (
      <>
        Unclear career paths were a top barrier —{" "}
        <em>“what is the next position I can be?”</em> Staff wanted 1:1s
        clarifying expectations and the path. Housing Works lists trustees with
        deep industry expertise that staff never touch. Boardman &amp;
        Ponomariov: ~23-point gain in career clarity when trustees lead
        micro-workshops.
      </>
    ),
    quote: "what is the next position I can be?",
    hmw: "How might trustees teach short lessons that upskill staff while turning hidden paths into clear ladders?",
  },
];

export default function Openings() {
  const [open, setOpen] = useState(0);

  return (
    <div className={styles.list}>
      {OPENINGS.map((o, i) => {
        const isOpen = open === i;
        return (
          <div key={o.n} className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
            <button
              type="button"
              className={styles.head}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className={`mono ${styles.num}`}>{o.n}</span>
              <span className={styles.title}>{o.title}</span>
              <span className={styles.toggle} aria-hidden="true">
                {isOpen ? "–" : "+"}
              </span>
            </button>

            {isOpen && (
              <div className={styles.panel}>
                <p className={styles.insight}>{o.insight}</p>
                <blockquote className={styles.quote}>“{o.quote}”</blockquote>
                <p className={styles.hmw}>
                  <span className={`mono ${styles.hmwLabel}`}>How might we</span>
                  {o.hmw}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
