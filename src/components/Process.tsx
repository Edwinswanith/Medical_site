"use client";

import { useRef } from "react";
import { PROCESS } from "@/content/site";
import { useHorizontal } from "@/lib/useHorizontal";

/** Scene 9. How it works: five steps slid sideways on wide screens, then the safeguards. */
export function Process() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useHorizontal(root, track);

  return (
    <section ref={root} id="process" className="prc" data-tone="dark" data-chapter="Process" aria-labelledby="prc-h">
      <div className="prc__stage" data-cursor="guide" data-cursor-label="Scroll">
        <div className="prc__head">
          <p className="label">How it works</p>
          <h2 id="prc-h" className="mid">
            {PROCESS.title} <em>{PROCESS.titleEm}</em>
          </h2>
          <p className="prc__intro">{PROCESS.intro}</p>
        </div>
        <div ref={track} className="prc__track">
          {PROCESS.steps.map((s) => (
            <article key={s.n} className="prc__card notch">
              <span className="prc__n" aria-hidden>
                {s.n}
              </span>
              <p className="label">Step {s.n}</p>
              <h3>{s.name}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
        <ul className="prc__safe">
          {PROCESS.safeguards.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="prc__progress" aria-hidden>
          <div />
        </div>
      </div>
    </section>
  );
}
