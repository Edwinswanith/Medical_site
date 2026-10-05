"use client";

import { useEffect, useRef, useState } from "react";
import { GEO } from "@/content/site";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Scene 4 (light). Found by AI assistants. A sticky heading, five pillars, and an
 * illustrated assistant exchange that types itself out once, when it comes into view.
 */
export function Geo() {
  const demo = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState(GEO.demo.answer);

  useEffect(() => {
    const el = demo.current;
    if (!el || prefersReducedMotion()) return;
    setTyped("");
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const n = Math.min(GEO.demo.answer.length, Math.floor((now - start) / 22));
          setTyped(GEO.demo.answer.slice(0, n));
          if (n < GEO.demo.answer.length) raf = requestAnimationFrame(tick);
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
  }, []);

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
          <p className="geo__ask">{GEO.demo.ask}</p>
          <p className="label">The assistant answers</p>
          <p className="geo__answer" aria-live="off">
            {typed}
            <span className="geo__caret" aria-hidden />
          </p>
          <p className="geo__cite">{GEO.demo.cite}</p>
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
