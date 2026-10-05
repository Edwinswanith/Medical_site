"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { isTouch, lockScroll, prefersReducedMotion } from "@/lib/motion";
import { Mark } from "./Mark";

/**
 * Intro panel, played on every full page load: the mark settles, the name rises, the
 * count runs to 100, then the panel lifts away (about 2 s) while the hero rises beneath it.
 * A refresh or back/forward visit plays the same intro at about three times the speed,
 * so returning visitors are not kept waiting. Read from the browser, nothing is stored.
 * Client-side page changes keep it hidden (it lives in the layout, which stays mounted).
 * Sets html[data-ready] as the lift begins, which starts the hero entrance.
 */
export function Preloader({ name }: { name: string }) {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    const ready = () => (html.dataset.ready = "");
    const finish = () => {
      ready();
      html.dataset.introDone = "";
      lockScroll(false);
    };
    if (html.dataset.introDone !== undefined || !el) return;
    if (prefersReducedMotion()) return finish();

    // Always open at the top: the intro hands over to the hero.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    lockScroll(true);

    const q = gsap.utils.selector(el);
    const n = { v: 0 };
    const tl = gsap.timeline();
    // ~2 s total: in (0.1–1.2 s), brief hold, out and lift (1.3–2.05 s).
    tl.from(q(".loader__mark"), { scale: 0.5, rotation: -12, opacity: 0, duration: 0.5, ease: "expo.out" }, 0)
      .from(q(".loader__word span"), { yPercent: 110, duration: 0.6, stagger: 0.03, ease: "expo.out" }, 0.1)
      .to(
        n,
        {
          v: 100,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(n.v)).padStart(3, "0");
          },
        },
        0.1,
      )
      .to(q(".loader__bar"), { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0.1)
      .to({}, { duration: 0.1 })
      .to(q(".loader__word span"), { yPercent: -110, duration: 0.4, stagger: 0.015, ease: "power3.in" })
      .to(q(".loader__mark, .loader__count, .loader__bar"), { opacity: 0, duration: 0.3, ease: "power2.out" }, "<")
      .add(ready, "-=0.3")
      .to(el, { yPercent: -100, duration: 0.6, ease: "power4.inOut" }, "-=0.3")
      .add(finish);
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav && nav.type !== "navigate") tl.timeScale(3);
    else if (isTouch()) tl.timeScale(2); // retain the intro, with a shorter wait on phones

    // React dev mode runs effects twice: on cleanup, rewind instead of finishing,
    // so the second run plays the whole intro again.
    return () => {
      tl.kill();
      gsap.set([el, ...q(".loader__mark, .loader__word span, .loader__count, .loader__bar")], { clearProps: "all" });
      lockScroll(false);
    };
  }, []);

  return (
    <div ref={root} className="loader" aria-hidden>
      <Mark className="loader__mark" />
      <div className="loader__word">
        {name.split("").map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </div>
      <span className="loader__bar" />
      <span ref={count} className="loader__count">
        000
      </span>
    </div>
  );
}
