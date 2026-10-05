"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * First-visit intro: a count to 100 beside a heartbeat, then the panel lifts.
 * Shown once per session. Sets html[data-ready], which starts the hero entrance.
 */
export function Preloader({ name }: { name: string }) {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const done = () => {
      html.dataset.ready = "";
      try {
        sessionStorage.setItem("seen-intro", "1");
      } catch {}
    };
    const finish = () => {
      done();
      html.dataset.introDone = "";
    };
    if (html.dataset.introDone !== undefined || !root.current) return;
    if (prefersReducedMotion()) return finish();

    const n = { v: 0 };
    const tl = gsap.timeline();
    tl.from(".loader__word span", { yPercent: 110, duration: 0.9, stagger: 0.04, ease: "expo.out" })
      .to(n, {
        v: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          if (count.current) count.current.textContent = String(Math.round(n.v)).padStart(3, "0");
        },
      }, 0.1)
      .to(".loader__trace path", { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0.1)
      .to(".loader__word span", { yPercent: -110, duration: 0.6, stagger: 0.02, ease: "expo.in" })
      .add(done, "-=0.2")
      .to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.35")
      .add(finish);
    return () => {
      tl.kill();
      finish();
    };
  }, []);

  return (
    <div ref={root} className="loader" aria-hidden>
      <div className="loader__word">
        {name.split("").map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </div>
      <svg className="loader__trace" viewBox="0 0 400 80" preserveAspectRatio="none">
        <path
          d="M0 40 H150 L162 34 L172 40 L182 40 L190 8 L200 72 L208 40 L240 40 L252 30 L266 40 H400"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
        />
      </svg>
      <span ref={count} className="loader__count">000</span>
    </div>
  );
}
