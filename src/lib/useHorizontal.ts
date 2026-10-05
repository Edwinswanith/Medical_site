"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sideways scroll on wide screens: the section grows tall enough for its track,
 * a CSS-sticky stage holds it in view, and the track's x follows scroll.
 * No GSAP pin, so React keeps ownership of every node. Writes --g (0..1) on the
 * section for progress bars. Narrow screens and reduced motion: nothing happens,
 * and CSS lays the track out normally.
 */
export function useHorizontal(section: RefObject<HTMLElement | null>, track: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = section.current;
    const t = track.current;
    if (!el || !t || prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      const dist = () => Math.max(0, t.scrollWidth - window.innerWidth);
      const size = () => (el.style.height = `${window.innerHeight + dist()}px`);
      size();
      const tween = gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefreshInit: size,
          onUpdate: (s) => el.style.setProperty("--g", s.progress.toFixed(4)),
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        el.style.height = "";
        el.style.removeProperty("--g");
      };
    });
    return () => mm.revert();
  }, [section, track]);
}
