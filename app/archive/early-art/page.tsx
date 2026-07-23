import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AmbientField from "@/components/AmbientField/AmbientField";
import { ARCHIVE_PROJECTS } from "@/lib/archive";
import {
  EARLY_ART_BOARDS,
  EARLY_ART_CHARCOAL,
  EARLY_ART_CARD,
  type EarlyArtPiece,
} from "@/lib/earlyArt";
import styles from "./early-art.module.css";

export const metadata: Metadata = {
  title: "Early Art (2016)",
  description:
    "CIE A Level fine arts: mixed-media boards from the Analogies series and charcoal studies in portraiture, anatomy, and motion.",
};

/* collage spans for the boards grid — board 02 is the hero (Rishabh's call),
   the rest take varied smaller cells so the section reads as a loose collage */
const BOARD_LAYOUT: Record<number, { li?: string; sizes: string }> = {
  1: { li: "bWide", sizes: "50vw" },
  2: { li: "bHero", sizes: "(min-width: 768px) 50vw, 100vw" },
  3: { li: "bTall", sizes: "(min-width: 768px) 25vw, 50vw" },
  4: { li: "bSmall", sizes: "(min-width: 768px) 25vw, 50vw" },
  5: { li: "bWideTall", sizes: "50vw" },
  6: { li: "bTall", sizes: "(min-width: 768px) 25vw, 50vw" },
  7: { li: "bSmall", sizes: "(min-width: 768px) 25vw, 50vw" },
};

function Piece({
  piece,
  sizes,
  liClass,
}: {
  piece: EarlyArtPiece;
  sizes: string;
  liClass?: string;
}) {
  return (
    <li className={liClass}>
      {/* the figure IS the frame: fixed aspect, image cover-crops into it,
          caption overlays inside on a legibility scrim */}
      <figure className={styles.piece}>
        <Image
          className={styles.pieceImg}
          src={piece.src}
          alt={`${piece.title}: ${piece.medium.toLowerCase()}`}
          fill
          sizes={sizes}
        />
        <figcaption className={styles.pieceCap}>
          <span className={styles.pieceTitle}>{piece.title}</span>
          <span className={`mono ${styles.pieceMeta}`}>
            {piece.medium} · {piece.year}
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

export default function EarlyArtPage() {
  /* the deck's last project = the neighbour for the pager (this page sits
     after the whole 2019–23 deck: earliest work, last card) */
  const prev = ARCHIVE_PROJECTS[ARCHIVE_PROJECTS.length - 1];

  return (
    <div
      className={styles.page}
      style={{ "--accent": EARLY_ART_CARD.accent } as React.CSSProperties}
    >
      {/* per-project ambient, same recipe as the deck reader: the page accent
          leads, shell gold rises */}
      <AmbientField
        warm={[
          { color: EARLY_ART_CARD.accent, alpha: 0.54 },
          { color: EARLY_ART_CARD.accent, alpha: 0.43 },
        ]}
        cool={[
          { color: "#9A7B4F", alpha: 0.46 },
          { color: "#9A7B4F", alpha: 0.41 },
        ]}
        restWarm={0.88}
        restCool={0.6}
        dim={0.79}
      />

      <div className={styles.pageContent}>
        <header className="container pageHeader">
          <p className="pageEyebrow">
            <Link href="/archive" className={styles.crumb}>
              Archive
            </Link>{" "}
            · 2016
          </p>
          <h1 className="pageTitle">Early Art</h1>
          <p className={`mono ${styles.headMeta}`}>
            CIE A Level fine arts · Cubism, Surrealism, and the Analogies
            series
          </p>
          <p className="lede">
            Before product design, there was drawing. This work is from my CIE
            A Level years: mixed-media boards from a series on analogies
            between the man-made and the natural, alongside charcoal studies in
            portraiture, anatomy, and motion. One board from that series shows
            a robot standing in a field of leaves. I didn&rsquo;t know it yet,
            but the question those boards were asking is the one I still work
            on: where the human hand sits relative to the machine. The judgment
            stays with the person. The AI follows my lead.
          </p>
        </header>

        <section className="container section" aria-labelledby="boards">
          <div className={styles.secHead}>
            <h2 id="boards" className={styles.secTitle}>
              Analogies · coursework boards
            </h2>
            <p className={`mono ${styles.secCount}`}>7 boards</p>
          </div>
          <ul className={styles.boards}>
            {EARLY_ART_BOARDS.map((piece) => {
              const layout = BOARD_LAYOUT[piece.n];
              return (
                <Piece
                  key={piece.n}
                  piece={piece}
                  sizes={layout.sizes}
                  liClass={layout.li ? styles[layout.li] : undefined}
                />
              );
            })}
          </ul>
        </section>

        <section className="container section" aria-labelledby="charcoal">
          <div className={styles.secHead}>
            <h2 id="charcoal" className={styles.secTitle}>
              Charcoal works
            </h2>
            <p className={`mono ${styles.secCount}`}>8 studies</p>
          </div>
          <ul className={styles.charGrid}>
            {EARLY_ART_CHARCOAL.map((piece) => (
              <Piece
                key={piece.n}
                piece={piece}
                sizes="(min-width: 1024px) 33vw, 50vw"
              />
            ))}
          </ul>
        </section>

        <nav className="container" aria-label="More earlier work">
          <div className={styles.pager}>
            <Link href={`/archive/${prev.slug}`} className={styles.pagerLink}>
              <span className={styles.pagerKicker}>← Previous</span>
              <span className={styles.pagerName}>{prev.name}</span>
            </Link>
            <Link href="/archive" className={styles.pagerLink}>
              <span className={styles.pagerKicker}>→</span>
              <span className={styles.pagerName}>All earlier work</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
