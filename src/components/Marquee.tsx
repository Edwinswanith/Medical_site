"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

/** A band of words that drifts sideways and speeds up with scroll velocity. */
export function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    let x = 0, last = window.scrollY, boost = 0, visible = false;
    const dir = reverse ? 1 : -1;
    const tick = () => {
      if (!visible) return;
      const y = window.scrollY;
      boost += (Math.abs(y - last) * 0.25 - boost) * 0.1;
      last = y;
      const half = el.scrollWidth / 2;
      x += dir * (0.6 + boost);
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0) skewX(${dir * Math.min(boost, 12) * -0.6}deg)`;
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
    };
  }, [reverse]);

  const row = (p: string) =>
    items.flatMap((t, i) => [
      <span key={`${p}t${i}`}>{t}</span>,
      <span key={`${p}d${i}`} className="marquee__dot">
        ✚
      </span>,
    ]);
  return (
    <div className="marquee" role="marquee" aria-label={items.join(", ")}>
      <div ref={track} className="marquee__track" aria-hidden>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
