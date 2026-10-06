"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CASE } from "@/content/site";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The live homepage in a browser frame. It peeks down the page once when it
 * first comes into view, and scrolls down on hover or keyboard focus, so the
 * visitor sees more of the real site than one screen. Still with reduced motion.
 */
export function WorkScreenshot() {
  const frame = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        el.dataset.peek = "";
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={frame} className="pg-work__frame">
      <div className="pg-work__window notch">
        <div className="chrome" aria-hidden>
          <span />
          <span />
          <span />
          <i>{CASE.live.label}</i>
        </div>
        <a className="pg-work__viewport" href={CASE.live.href} target="_blank" rel="noreferrer">
          <Image src={CASE.shot.webp} alt={CASE.shot.alt} width={CASE.shot.w} height={CASE.shot.h} sizes="(max-width: 899px) 90vw, 48vw" priority />
          <span className="sr-only"> Visit the live website (opens in a new tab)</span>
        </a>
      </div>
      <figcaption>The live project homepage. View the website to explore the procedure guides.</figcaption>
    </figure>
  );
}
