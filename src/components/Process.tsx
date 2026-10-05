"use client";

import { useRef } from "react";
import { PROCESS, PROCESS_PROMISE } from "@/content/site";
import { useHorizontal } from "@/lib/useHorizontal";

/** Scene 7. How a project runs, slid sideways on wide screens. Source: /process. */
export function Process() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useHorizontal(root, track);

  return (
    <section ref={root} id="process" className="pr" data-tone="dark" data-chapter="Process" aria-labelledby="pr-h">
      <div className="pr__stage" data-cursor="guide" data-cursor-label="Scroll">
        <div className="pr__head">
          <p className="label">How a project runs</p>
          <h2 id="pr-h" className="display-m">
            Four steps. <em>Demo every Friday.</em>
          </h2>
          <div className="pr__progress" aria-hidden>
            <div />
          </div>
        </div>
        <div ref={track} className="pr__track">
          {PROCESS.map((p) => (
            <article key={p.step} className="pr__card">
              <span className="pr__n" aria-hidden>
                {p.step}
              </span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
          <p className="pr__promise">{PROCESS_PROMISE}</p>
        </div>
      </div>
    </section>
  );
}
