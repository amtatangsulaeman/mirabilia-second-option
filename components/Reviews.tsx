"use client";

import { useState } from "react";
import { REVIEWS, SETTINGS, centreBySlug, reviewsFor, type Centre, type ReviewKey } from "@/lib/data";
import { ArrowD, ArrowU } from "./Shapes";
import { Photo } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");
const BUBBLES = ["var(--lime)", "var(--sky)", "var(--rose)", "var(--butter)", "var(--mint)", "var(--lilac)"];

/**
 * Reviews as a one-at-a-time quote slider (reference style). Pass `centre` for a centre
 * page (follows SETTINGS.reviews) or `keys` for a hand-picked set.
 */
export default function Reviews({
  keys,
  centre,
  exclude,
  heading,
  lead = "A few words from happy parents about their experiences with us.",
  bg,
}: {
  keys?: ReviewKey[];
  centre?: Centre;
  /** A review already quoted higher up the page, so it isn't shown twice. */
  exclude?: ReviewKey;
  heading?: string;
  lead?: string;
  bg?: "sand";
}) {
  const list = (keys ?? reviewsFor(centre?.slug, 4)).filter((k) => k !== exclude).slice(0, keys ? keys.length : 3);
  const perCentre = centre && SETTINGS.reviews === "per-centre" && list.some((k) => REVIEWS[k].centre === centre.slug);
  const title = heading ?? (perCentre ? `What ${centre!.name} families say` : "What our families say");
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + list.length) % list.length);
  const r = REVIEWS[list[i]];
  const where = r.centre && centreBySlug(r.centre)?.name;

  return (
    <section className={`section${bg ? ` band band--${bg}` : ""}`} id="reviews" aria-labelledby="reviews-h">
      <div className="wrap">
        <div className="shead shead--center">
          <h2 className="h2" id="reviews-h">{title}</h2>
          <p className="muted shead__lead">{lead}</p>
          {centre?.rating && (
            <p className="rating-line">
              <a href={centre.rating.url} target="_blank" rel="noopener noreferrer">
                <strong>{centre.rating.score.toFixed(1)}</strong> on Google from {centre.rating.count} reviews
              </a>
            </p>
          )}
        </div>
        <div className="quotes reveal">
          {list.length > 1 && (
            <div className="quotes__ctrl">
              <button className="arrow" type="button" onClick={() => go(-1)} aria-label="Previous review"><ArrowU /></button>
              <button className="arrow" type="button" onClick={() => go(1)} aria-label="Next review"><ArrowD /></button>
            </div>
          )}
          <div className="qcard" aria-live="polite">
            <span className="qcard__count">{pad(i + 1)}/{pad(list.length)}</span>
            <div className="qslide is-active" key={list[i]}>
              <blockquote>“{r.text}”</blockquote>
              <div className="qcard__who">
                {r.photo ? (
                  <span className="avatar avatar--photo" aria-hidden="true"><Photo photo={[r.photo, ""]} sizes="48px" /></span>
                ) : (
                  <span className="avatar" style={{ background: BUBBLES[i % BUBBLES.length] }} aria-hidden="true">{r.name[0]}</span>
                )}
                <cite><b>{r.name}</b>Parent{where ? `, Mirabilia ${where}` : ""}</cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
