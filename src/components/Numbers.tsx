"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NUMBERS } from "@/content/site";
import { prefersReducedMotion } from "@/lib/motion";
import { MediaSwap } from "./MediaSwap";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scene 5a. The approved figures as giant numerals with a film card set into
 * each one. Wide screens with motion: each numeral rises, holds and hands over
 * to the next on scroll (CSS sticky, per-layer --l and --o). Elsewhere: stacked.
 */
export function Numbers() {
  const root = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      const layers = [...el.querySelectorAll<HTMLElement>(".num__layer")];
      const n = layers.length;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (s) => {
          const a = Math.min(n - 1, Math.floor(s.progress * n));
          setActive((prev) => (prev === a ? prev : a));
          layers.forEach((l, k) => {
            const local = gsap.utils.clamp(0, 1, s.progress * n - k); // 0 → 1 across this layer's share
            const fadeIn = k === 0 ? 1 : gsap.utils.clamp(0, 1, local * 4);
            const fadeOut = k === n - 1 ? 1 : gsap.utils.clamp(0, 1, (1 - local) * 4);
            l.style.setProperty("--l", local.toFixed(4));
            l.style.setProperty("--o", Math.min(fadeIn, fadeOut).toFixed(3));
          });
        },
      });
      el.dataset.live = "";
      setLive(true);
      return () => {
        setLive(false);
        st.kill();
        delete el.dataset.live;
        layers.forEach((l) => (l.style.removeProperty("--l"), l.style.removeProperty("--o")));
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="num" data-tone="dark" aria-label="Film library in numbers">
      <div className="num__stage">
        {NUMBERS.map((x, i) => (
          <div key={x.value} className="num__layer" style={{ ["--k" as string]: i }}>
            <p className="num__value" aria-hidden>
              {x.value}
            </p>
            <div className="num__card notch">
              {/* In the scroll scene only the current numeral's film plays; stacked, each plays in view. */}
              <MediaSwap media={x.media} trigger={live ? "manual" : "view"} active={live && active === i} showAiLabel={false} />
            </div>
            <p className="num__label">
              <span className="sr-only">{x.value} </span>
              {x.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
