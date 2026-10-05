"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CHAPTERS } from "@/content/site";
import { getLenis } from "@/lib/motion";

/**
 * A quiet chapter index on the right edge (wide screens only): where you are,
 * how far you have come, and a click to jump. It never replaces normal scrolling.
 */
export function ChapterRail() {
  const pathname = usePathname();
  const [active, setActive] = useState(0);
  const bar = useRef<HTMLDivElement>(null);

  // Wide screens only (the rail is hidden below 1180px). Progress is written straight
  // to the bar; React state changes only when the active chapter changes.
  useEffect(() => {
    if (pathname !== "/" || !window.matchMedia("(min-width: 1180px)").matches) return;
    const els = CHAPTERS.map((c) => document.getElementById(c.id));
    const on = () => {
      const mid = window.innerHeight * 0.45;
      let a = 0;
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= mid) a = i;
      });
      setActive((prev) => (prev === a ? prev : a));
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleY(${max > 0 ? window.scrollY / max : 0})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const l = getLenis();
    if (l) l.scrollTo(el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="rail" aria-label="Page chapters">
      <div className="rail__bar" aria-hidden>
        <div ref={bar} style={{ transform: "scaleY(0)" }} />
      </div>
      <ol>
        {CHAPTERS.map((c, i) => (
          <li key={c.id}>
            <button onClick={() => go(c.id)} aria-current={i === active ? "step" : undefined} data-active={i === active}>
              <span className="rail__n">0{i}</span>
              <span className="rail__label">{c.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
