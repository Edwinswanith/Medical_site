"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Service } from "@/content/site";
import { TLink } from "./TLink";

/**
 * Big service rows. On a fine pointer a card follows the cursor and swaps
 * to the hovered service; on touch the rows stand alone.
 */
export function ServiceList({ services }: { services: Service[] }) {
  const list = useRef<HTMLUListElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const l = list.current;
    const c = card.current;
    if (!l || !c || !window.matchMedia("(pointer: fine)").matches) return;
    const x = gsap.quickTo(c, "x", { duration: 0.6, ease: "power3" });
    const y = gsap.quickTo(c, "y", { duration: 0.6, ease: "power3" });
    const r = gsap.quickTo(c, "rotation", { duration: 0.8, ease: "power3" });
    let lx = 0;
    // Jump to the pointer on entry so the card never flies in from the corner.
    const enter = (e: PointerEvent) => {
      gsap.set(c, { x: e.clientX, y: e.clientY });
      lx = e.clientX;
    };
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      r(gsap.utils.clamp(-8, 8, (e.clientX - lx) * 0.6));
      lx = e.clientX;
    };
    l.addEventListener("pointerenter", enter);
    l.addEventListener("pointermove", move);
    return () => {
      l.removeEventListener("pointerenter", enter);
      l.removeEventListener("pointermove", move);
    };
  }, []);

  const s = active !== null ? services[active] : null;

  return (
    <div className="svc" onPointerLeave={() => setActive(null)}>
      <ul ref={list} className="svc__list">
        {services.map((sv, i) => (
          <li key={sv.slug} data-reveal className="svc__row" style={{ ["--i" as string]: i }}>
            <TLink
              href={`/services/${sv.slug}`}
              className="svc__link"
              data-cursor="view"
              data-cursor-label="Open"
              onPointerMove={() => active !== i && setActive(i)}
              data-dim={active !== null && active !== i}
            >
              <span className="svc__num">0{i + 1}</span>
              <span className="svc__name">{sv.name}</span>
              <span className="svc__short">{sv.short}</span>
              <span className="svc__arrow" aria-hidden>
                ↗
              </span>
            </TLink>
          </li>
        ))}
      </ul>
      <div ref={card} className="svc__card" data-on={!!s} data-tone={s?.tone} aria-hidden>
        {s && (
          <>
            <span className="label">{s.name}</span>
            <ul>
              {s.includes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
