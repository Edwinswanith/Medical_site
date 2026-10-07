"use client";

import { useEffect, useRef, useState } from "react";
import { GEO } from "@/content/site";
import { prefersReducedMotion } from "@/lib/motion";

const QUESTIONS = [GEO.demo, ...GEO.more];

/**
 * Scene 4 (light). Found by AI assistants. A sticky heading, five pillars, and an
 * illustrated assistant exchange: pick a patient question and the answer types
 * itself out, with the page it was quoted from. The first answer is in the HTML.
 */
export function Geo() {
  const demo = useRef<HTMLDivElement>(null);
  const [asked, setAsked] = useState(0);
  const [typed, setTyped] = useState(QUESTIONS[0].answer);
  const current = QUESTIONS[asked];

  // Choosing a question clears the answer so it can type in again (or shows it whole with reduced motion).
  const ask = (i: number) => {
    if (i === asked) return;
    setAsked(i);
    setTyped(prefersReducedMotion() ? QUESTIONS[i].answer : "");
  };

  useEffect(() => {
    const el = demo.current;
    if (!el || prefersReducedMotion()) return;
    const { answer } = current;
    // The first answer ships in the HTML; hide it until it can type in view.
    let raf = requestAnimationFrame(() => setTyped((t) => (t === answer ? "" : t)));
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const n = Math.min(answer.length, Math.floor((now - start) / 22));
          setTyped(answer.slice(0, n));
          if (n < answer.length) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [current]);

  return (
    <section id="geo" className="geo" data-chapter="Found" aria-labelledby="geo-h">
      <div className="geo__head">
        <p className="label">GEO-friendly, in plain words</p>
        <h2 id="geo-h" className="mid" data-reveal>
          {GEO.title} <em>{GEO.titleEm}</em>
        </h2>
        <p className="geo__intro">{GEO.intro}</p>
        <div ref={demo} className="geo__demo notch" aria-label="Illustration of an AI assistant quoting a practice website">
          <p className="label">A patient asks</p>
          <div className="geo__asks" role="group" aria-label="Patient questions">
            {QUESTIONS.map((q, i) => (
              <button key={q.ask} type="button" className="geo__ask" aria-pressed={asked === i} onClick={() => ask(i)}>
                {q.ask}
              </button>
            ))}
          </div>
          <p className="label">The assistant answers</p>
          <p className="geo__answer" aria-live="polite" aria-busy={typed !== current.answer}>
            {typed}
            <span className="geo__caret" aria-hidden />
          </p>
          <p className="geo__cite">{current.cite}</p>
          <p className="geo__ill label">Illustration</p>
        </div>
      </div>
      <ol className="geo__list">
        {GEO.pillars.map((p, i) => (
          <li key={p.name} data-reveal style={{ ["--i" as string]: i }}>
            <span className="geo__n">0{i + 1}</span>
            <h3>{p.name}</h3>
            <p>{p.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
