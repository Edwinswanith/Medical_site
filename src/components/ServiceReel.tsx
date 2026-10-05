"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SERVICES } from "@/content/site";
import { MediaSwap } from "./MediaSwap";
import { TLink } from "./TLink";

/**
 * Scene 4. Big service rows. On a fine pointer a film card follows the cursor
 * and plays the hovered service; on touch each row carries its own clip that
 * plays when it is mostly on screen. Every row is a real link to the enquiry form.
 */
export function ServiceReel() {
  const list = useRef<HTMLUListElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const l = list.current;
    const c = card.current;
    if (!l || !c || !window.matchMedia("(pointer: fine)").matches) return;
    const x = gsap.quickTo(c, "x", { duration: 0.7, ease: "power3" });
    const y = gsap.quickTo(c, "y", { duration: 0.7, ease: "power3" });
    const r = gsap.quickTo(c, "rotation", { duration: 0.9, ease: "power3" });
    let lx = 0;
    const enter = (e: PointerEvent) => {
      gsap.set(c, { x: e.clientX, y: e.clientY });
      lx = e.clientX;
    };
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      r(gsap.utils.clamp(-6, 6, (e.clientX - lx) * 0.5));
      lx = e.clientX;
    };
    l.addEventListener("pointerenter", enter);
    l.addEventListener("pointermove", move);
    return () => {
      l.removeEventListener("pointerenter", enter);
      l.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <section id="services" className="sr wrap section" data-chapter="Services" aria-labelledby="sr-h">
      <div className="section__head section__head--row">
        <h2 id="sr-h" className="display-l" data-reveal>
          <span className="line">
            <span>What we</span>
          </span>
          <span className="line">
            <span>
              <em>make.</em>
            </span>
          </span>
        </h2>
        <p className="sr__hint label">Hover a row to play it</p>
      </div>

      <ul ref={list} className="sr__list" onPointerLeave={() => setActive(null)}>
        {SERVICES.map((s, i) => (
          <li key={s.slug} className="sr__row" data-reveal style={{ ["--i" as string]: i }}>
            <TLink
              href="/contact"
              className="sr__link"
              data-cursor="view"
              data-cursor-label="Enquire"
              data-dim={active !== null && active !== i}
              onPointerMove={() => active !== i && setActive(i)}
            >
              <span className="sr__n">0{i + 1}</span>
              <span className="sr__name">{s.name}</span>
              <span className="sr__line">
                {s.line}
                {s.evidence && <span className="sr__ev">{s.evidence}</span>}
              </span>
            </TLink>
            <MediaSwap media={s.media} trigger="view" className="sr__inline" />
          </li>
        ))}
      </ul>

      <div ref={card} className="sr__card" data-on={active !== null} aria-hidden>
        {SERVICES.map((s, i) => (
          <div key={s.slug} className="sr__card-item" data-active={active === i}>
            <MediaSwap media={s.media} trigger="manual" active={active === i} showAiLabel={false} />
          </div>
        ))}
        <span className="swap__ai">AI-generated</span>
      </div>
    </section>
  );
}
