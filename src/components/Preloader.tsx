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
      .from(".loader__mark", { scale: 0.4, rotation: -90, opacity: 0, duration: 0.9, ease: "expo.out" }, 0)
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
      <svg className="loader__mark" viewBox="0 0 32 32" aria-hidden>
        <rect x="1" y="1" width="30" height="30" rx="9" />
        <path d="M13 10.5v11l9-5.5z" />
      </svg>
      <div className="loader__word">
        {name.split("").map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </div>
      <span ref={count} className="loader__count">000</span>
    </div>
  );
}
