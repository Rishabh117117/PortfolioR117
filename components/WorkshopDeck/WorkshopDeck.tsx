"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { POSTER_DECK } from "@/lib/housingWorks";
import styles from "./WorkshopDeck.module.css";

const IMG = "/images/housing-works";
const SWIPE_THRESHOLD = 70; // px drag to commit a card
const VISIBLE = 3; // active + cards peeking behind

export default function WorkshopDeck() {
  const cards = POSTER_DECK;
  const n = cards.length;

  const [active, setActive] = useState(0);
  const [dx, setDx] = useState(0); // live drag offset on the front card
  const [exit, setExit] = useState<0 | 1 | -1>(0); // front card flying out: +1 next, -1 prev
  const dragging = useRef(false);
  const startX = useRef(0);
  const reduce = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduce.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reduce.current = e.matches;
    };
    mq.addEventListener("change", onChange);
    const t = timers.current;
    return () => {
      mq.removeEventListener("change", onChange);
      t.forEach(clearTimeout);
    };
  }, []);

  const commit = useCallback(
    (dir: 1 | -1) => {
      setActive((a) => (a + dir + n) % n);
      setExit(0);
      setDx(0);
    },
    [n],
  );

  const go = useCallback(
    (dir: 1 | -1) => {
      if (exit !== 0) return;
      if (reduce.current) {
        commit(dir);
        return;
      }
      setExit(dir);
      timers.current.push(setTimeout(() => commit(dir), 320));
    },
    [exit, commit],
  );

  // ---- pointer drag on the front card ----
  function onPointerDown(e: React.PointerEvent) {
    if (exit !== 0 || reduce.current) return;
    dragging.current = true;
    startX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    setDx(e.clientX - startX.current);
  }
  function onPointerUp() {
    if (!dragging.current) return;
    dragging.current = false;
    if (dx <= -SWIPE_THRESHOLD) go(1);
    else if (dx >= SWIPE_THRESHOLD) go(-1);
    else setDx(0); // snap back
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  }

  return (
    <div className={styles.deck}>
      <div
        className={styles.stage}
        role="group"
        aria-roledescription="carousel"
        aria-label="Campus survey posters"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {cards.map((card, i) => {
          // r = how far back in the stack this card sits from the active one
          const r = (i - active + n) % n;
          const isFront = r === 0;
          const hidden = r >= VISIBLE;

          let transform: string;
          let opacity = 1;
          let zIndex = n - r;

          if (isFront && exit !== 0) {
            // flying out in the swipe direction
            transform = `translateX(${exit * 130}%) rotate(${exit * 7}deg)`;
            opacity = 0;
          } else if (isFront) {
            // only reached when exit === 0 (the exit branch returns above)
            transform = `translateX(${dx}px) rotate(${dx * 0.04}deg)`;
          } else {
            // peek behind: shifted right + down, scaled down
            transform = `translate(${r * 16}px, ${r * 12}px) scale(${1 - r * 0.05})`;
            opacity = hidden ? 0 : 1 - r * 0.28;
            zIndex = n - r;
          }

          return (
            <article
              key={card.id}
              className={`${styles.card} ${dragging.current && isFront ? styles.grabbing : ""}`}
              style={{
                transform,
                opacity,
                zIndex,
                pointerEvents: isFront && exit === 0 ? "auto" : "none",
                transition:
                  dragging.current && isFront
                    ? "none"
                    : "transform .34s cubic-bezier(.2,.9,.25,1), opacity .34s ease",
              }}
              aria-hidden={!isFront}
              onPointerDown={isFront ? onPointerDown : undefined}
              onPointerMove={isFront ? onPointerMove : undefined}
              onPointerUp={isFront ? onPointerUp : undefined}
              onPointerCancel={isFront ? onPointerUp : undefined}
            >
              <img
                className={styles.cardImg}
                src={`${IMG}/${card.img}`}
                alt={`Campus poster: ${card.stat} — ${card.statText}.`}
                draggable={false}
                loading={i <= 1 ? "eager" : "lazy"}
                width="825"
                height="1100"
              />
              <div className={styles.cardCap}>
                <p className={`mono ${styles.cardQ}`}>{card.question}</p>
                <p className={styles.cardStat}>
                  <span className={styles.cardStatNum}>{card.stat}</span>{" "}
                  {card.statText}
                </p>
                <p className={styles.cardResp}>“{card.response}”</p>
              </div>
            </article>
          );
        })}
      </div>

      {/* controls */}
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navBtn}
          aria-label="Previous poster"
          onClick={() => go(-1)}
        >
          ←
        </button>
        <div className={styles.dots} role="group" aria-label="Choose a poster">
          {cards.map((card, i) => (
            <button
              key={card.id}
              type="button"
              aria-current={i === active ? "true" : undefined}
              aria-label={`Poster ${i + 1}: ${card.stat}`}
              className={`${styles.dot} ${i === active ? styles.dotOn : ""}`}
              onClick={() => {
                if (exit === 0) {
                  setActive(i);
                  setDx(0);
                }
              }}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.navBtn}
          aria-label="Next poster"
          onClick={() => go(1)}
        >
          →
        </button>
      </div>

      <p className={`mono ${styles.counter}`}>
        <span aria-live="polite">
          {active + 1} / {n}
        </span>
        <span aria-hidden="true"> · swipe or tap →</span>
      </p>
    </div>
  );
}
