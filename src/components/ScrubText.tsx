"use client";

import { useEffect, useRef, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * A statement whose words light up one by one as it crosses the screen.
 * One variable (--s, 0..1) drives every word in CSS; reduced motion and no-JS
 * show it fully lit. `em` is the closing phrase, set in the serif italic.
 */
export function ScrubText({ as: Tag = "h2", text, em, className = "" }: { as?: ElementType; text: string; em?: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(/\s+/).filter(Boolean);
  const all = em ? [...words, ...em.split(/\s+/)] : words;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    el.style.setProperty("--s", "0");
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "bottom 40%",
      scrub: 0.4,
      onUpdate: (s) => el.style.setProperty("--s", s.progress.toFixed(4)),
    });
    return () => {
      st.kill();
      el.style.removeProperty("--s");
    };
  }, []);

  return (
    <Tag ref={ref} className={`scrub ${className}`} style={{ ["--n" as string]: all.length }}>
      {all.map((w, i) => {
        const isEm = i >= words.length;
        return (
          <span key={i} className="scrub__w" style={{ ["--i" as string]: i }}>
            {isEm ? <em>{w}</em> : w}{" "}
          </span>
        );
      })}
    </Tag>
  );
}
