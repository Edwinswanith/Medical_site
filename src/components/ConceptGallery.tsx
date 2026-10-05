"use client";

import { useRef } from "react";
import { CONCEPTS } from "@/content/site";
import { useHorizontal } from "@/lib/useHorizontal";
import { MediaSwap } from "./MediaSwap";

/**
 * Scene 5. Specialty concepts, clearly not client work. On wide screens the row
 * slides sideways as you scroll (CSS sticky + scrubbed translate); each card plays
 * its film on hover. Narrow screens get a native swipe row that plays the card in view.
 */
export function ConceptGallery() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useHorizontal(root, track);

  return (
    <section ref={root} id="concepts" className="cg" data-tone="dark" data-chapter="Concepts" aria-labelledby="cg-h">
      <div className="cg__stage" data-cursor="guide" data-cursor-label="Scroll">
        <div ref={track} className="cg__track">
          <div className="cg__intro">
            <p className="label">Specialty concepts</p>
            <h2 id="cg-h" className="display-l">
              Concepts, <em>not clients.</em>
            </h2>
            <p className="cg__note">
              Directions we would take for four specialities. Every film here is AI-generated to show a format. None of it
              is client work or clinical guidance.
            </p>
          </div>
          {CONCEPTS.map((c, i) => (
            <article key={c.name} className="cg__card" style={{ ["--i" as string]: i }}>
              <MediaSwap media={c.media} trigger="hover" />
              <div className="cg__meta">
                <span className="chip">Concept</span>
                <h3>{c.name}</h3>
                <p>{c.line}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="cg__progress" aria-hidden>
          <div />
        </div>
      </div>
    </section>
  );
}
