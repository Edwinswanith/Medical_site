"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JOURNEY } from "@/content/site";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** "How a visit works": pinned and scrolled sideways on wide screens, stacked on narrow ones. */
export function Journey() {
  const pinned = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      const t = track.current!;
      const dist = () => t.scrollWidth - window.innerWidth;
      gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: pinned.current,
          start: "top top",
          end: () => `+=${dist()}`,
          // Pin the inner div, not the section: GSAP wraps the pinned node,
          // and React must still find the section where it rendered it.
          pin: pinned.current,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (st) => bar.current && (bar.current.style.transform = `scaleX(${st.progress})`),
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="journey" aria-labelledby="journey-h">
      <div ref={pinned} className="journey__pin">
      <div className="journey__head">
        <p className="label">How a visit works</p>
        <h2 id="journey-h" className="display-m">
          Four steps. <em>No guesswork.</em>
        </h2>
        <div className="journey__progress">
          <div ref={bar} />
        </div>
      </div>
      <div ref={track} className="journey__track">
        {JOURNEY.map((j) => (
          <article key={j.n} className="journey__card">
            <span className="journey__n">{j.n}</span>
            <h3>{j.title}</h3>
            <p>{j.body}</p>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
