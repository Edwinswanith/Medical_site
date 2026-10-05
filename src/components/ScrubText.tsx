"use client";

import { Fragment, useEffect, useRef, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * A statement whose words light up one by one as it crosses the screen.
 * Words wrapped in *asterisks* are set in upright serif capitals, mixed into the
 * condensed sans. One variable (--s, 0..1) drives every word in CSS; reduced
 * motion and no-JS show it fully lit.
 */
export function ScrubText({ as: Tag = "h2", text, className = "" }: { as?: ElementType; text: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(/\s+/).filter(Boolean).map((w) => ({ w: w.replace(/\*/g, ""), serif: w.startsWith("*") }));

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    el.style.setProperty("--s", "0");
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "bottom 35%",
      scrub: 0.4,
      onUpdate: (s) => el.style.setProperty("--s", s.progress.toFixed(4)),
    });
    return () => {
      st.kill();
      el.style.removeProperty("--s");
    };
  }, []);

  return (
    <Tag ref={ref} className={`scrub ${className}`} style={{ ["--n" as string]: words.length }}>
      {words.map(({ w, serif }, i) => (
        // The space sits outside the inline-block, or it collapses.
        <Fragment key={i}>
          <span className={`scrub__w${serif ? " scrub__w--serif" : ""}`} style={{ ["--i" as string]: i }}>
            {w}
          </span>{" "}
        </Fragment>
      ))}
    </Tag>
  );
}
