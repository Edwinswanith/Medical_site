"use client";

import { useRef } from "react";
import { FILMS } from "@/content/site";
import { useHorizontal } from "@/lib/useHorizontal";
import { MediaSwap } from "./MediaSwap";

/** Scene 5b. Patient films: a reel that slides sideways on scroll; each card plays on hover. */
export function FilmReel() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useHorizontal(root, track);

  return (
    <section ref={root} id="films" className="reel" data-tone="dark" data-chapter="Films" aria-labelledby="reel-h">
      <div className="reel__stage" data-cursor="guide" data-cursor-label="Scroll">
        <div ref={track} className="reel__track">
          <div className="reel__intro">
            <p className="label">Patient films</p>
            <h2 id="reel-h" className="mid">
              {FILMS.title} <em>{FILMS.titleEm}</em>
            </h2>
            <p className="reel__text">{FILMS.intro}</p>
            <p className="reel__note label">{FILMS.note}</p>
          </div>
          {FILMS.reel.map((f, i) => (
            <article key={f.title} className="reel__card" style={{ ["--i" as string]: i }} data-cursor="view" data-cursor-label="Play">
              <div className="notch">
                <MediaSwap media={f.media} trigger="hover" />
              </div>
              <p className="reel__tag label">
                {f.tag} · Concept
              </p>
              <h3>{f.title}</h3>
            </article>
          ))}
        </div>
        <div className="reel__progress" aria-hidden>
          <div />
        </div>
      </div>
    </section>
  );
}
