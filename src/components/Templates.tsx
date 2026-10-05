"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { TEMPLATES } from "@/content/site";
import { TLink } from "./TLink";

/**
 * Scene 3. Twelve real specialty templates as a results table. Hovering a row
 * fills it with the signal colour and lifts that template's screenshot beside
 * the cursor. Touch: each row shows its own thumbnail.
 */
export function Templates() {
  const table = useRef<HTMLOListElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const t = table.current;
    const c = card.current;
    if (!t || !c || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = gsap.quickTo(c, "x", { duration: 0.6, ease: "power3" });
    const y = gsap.quickTo(c, "y", { duration: 0.6, ease: "power3" });
    const r = gsap.quickTo(c, "rotation", { duration: 0.8, ease: "power3" });
    let lx = 0;
    const enter = (e: PointerEvent) => {
      gsap.set(c, { x: e.clientX, y: e.clientY });
      lx = e.clientX;
    };
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      r(gsap.utils.clamp(-5, 5, (e.clientX - lx) * 0.5));
      lx = e.clientX;
    };
    t.addEventListener("pointerenter", enter);
    t.addEventListener("pointermove", move);
    return () => {
      t.removeEventListener("pointerenter", enter);
      t.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <section id="websites" className="tpl" data-chapter="Websites" aria-labelledby="tpl-h">
      <div className="tpl__head">
        <p className="label">Websites</p>
        <h2 id="tpl-h" className="big" data-reveal>
          <span className="line">
            <span>Websites that</span>
          </span>
          {" "}
          <span className="line">
            <span>
              get <em>found.</em>
            </span>
          </span>
        </h2>
        <p className="tpl__intro">
          Pick your specialty. Each site is organised around the conditions you treat, with a film on the page that explains each one.
        </p>
      </div>

      <p className="tpl__swipe label" aria-hidden>
        Swipe to browse 12 specialties <span>→</span>
      </p>
      <div className="tpl__cols label" aria-hidden>
        <span>No.</span>
        <span>Specialty</span>
        <span>Opens with</span>
        <span>Template</span>
      </div>
      <ol ref={table} className="tpl__table" onPointerLeave={() => setActive(null)}>
        {TEMPLATES.map((t, i) => (
          <li
            key={t.slug}
            className="tpl__row"
            data-active={active === i}
            data-dim={active !== null && active !== i}
            onPointerMove={() => active !== i && setActive(i)}
          >
            <span className="tpl__n">{String(i + 1).padStart(2, "0")}</span>
            <span className="tpl__name">{t.name}</span>
            <span className="tpl__line">“{t.line}”</span>
            <span className="tpl__tag label">Concept</span>
            <Image className="tpl__thumb" src={t.img.webp} alt={`${t.name} website template`} width={1200} height={750} sizes="(max-width: 899px) 80vw, 1px" />
          </li>
        ))}
      </ol>

      <div ref={card} className="tpl__card" data-on={active !== null} aria-hidden>
        {TEMPLATES.map((t, i) => (
          <Image key={t.slug} src={t.img.webp} alt="" data-active={active === i} width={1200} height={750} sizes="32vw" />
        ))}
        <span className="tpl__card-url">yourname.co.uk</span>
      </div>
      <p><TLink className="arrow-link" href="/services/medical-websites">Explore websites for your specialty <span aria-hidden>→</span></TLink></p>
    </section>
  );
}
