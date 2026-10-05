"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND, HERO_FILM } from "@/content/site";
import { prefersReducedMotion } from "@/lib/motion";
import { TLink } from "./TLink";
import { Magnetic } from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scene 1. The film starts framed as a website preview beside the offer, and
 * opens to full screen as you scroll: a website becoming a film.
 *
 * One CSS variable (--p, 0..1) drives the whole handoff, so the resting state
 * (p = 0) is also the reduced-motion and no-JS state. The section uses CSS
 * sticky, not a GSAP pin, so React keeps ownership of every node.
 * Below 900px there is no scroll scene: frame and text simply stack.
 */
export function FilmHero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  // Scroll-driven handoff (wide screens, motion allowed).
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (s) => el.style.setProperty("--p", s.progress.toFixed(4)),
      });
      return () => {
        st.kill();
        el.style.removeProperty("--p");
      };
    });
    return () => mm.revert();
  }, []);

  // Film playback: muted, only while on screen and the tab is visible, never under reduced motion.
  useEffect(() => {
    const v = video.current;
    if (!v || prefersReducedMotion()) return;
    const small = window.matchMedia("(max-width: 899px)").matches;
    const set = small ? HERO_FILM.sources.small : HERO_FILM.sources.large;
    v.src = v.canPlayType('video/mp4; codecs="avc1.640028"') ? set.mp4 : set.webm;
    let inView = false;
    const sync = () => {
      if (inView && !document.hidden) v.play().catch(() => {}); // blocked autoplay: the poster stays
      else v.pause();
    };
    // Ratio, not isIntersecting: an element touching the viewport edge "intersects" with zero area.
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.intersectionRatio > 0;
        sync();
      },
      { threshold: [0, 0.01] },
    );
    io.observe(v);
    document.addEventListener("visibilitychange", sync);
    const failed = () => v.closest(".film")?.setAttribute("data-failed", "");
    const playing = () => v.setAttribute("data-on", ""); // fade the film in over the poster
    v.addEventListener("error", failed);
    v.addEventListener("playing", playing);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      v.removeEventListener("error", failed);
      v.removeEventListener("playing", playing);
      v.pause();
    };
  }, []);

  return (
    <section ref={root} id="intro" className="fh" data-tone="dark" data-chapter="Intro" aria-labelledby="fh-h">
      <div className="fh__stage" data-cursor="guide" data-cursor-label="Scroll">
        <div className="fh__copy">
          <p className="label fh__label">{BRAND.name} · Healthcare media studio</p>
          <h1 id="fh-h" className="fh__title">
            {BRAND.offer.replace(BRAND.offerEm, "")}
            <em>{BRAND.offerEm}</em>
          </h1>
          <p className="fh__intro">{BRAND.intro}</p>
          <div className="fh__cta">
            <Magnetic>
              <TLink href="/contact" className="blob" data-cursor="hide">
                Start a project
              </TLink>
            </Magnetic>
            <a href="#work" className="ulink">
              See the work
            </a>
          </div>
        </div>

        <figure className="film" aria-label={HERO_FILM.alt}>
          <div className="film__chrome" aria-hidden>
            <span />
            <span />
            <span />
            <i>your-practice.co.uk</i>
          </div>
          <div className="film__media">
            <picture>
              <source srcSet={HERO_FILM.poster.webp} type="image/webp" />
              <img src={HERO_FILM.poster.jpg} alt="" width={1920} height={1080} fetchPriority="high" />
            </picture>
            <video ref={video} muted loop playsInline preload="none" aria-hidden poster={HERO_FILM.poster.webp} />
          </div>
          <figcaption className="film__caption">{HERO_FILM.caption}</figcaption>
        </figure>

        <p className="fh__handoff" aria-hidden>
          From website <em>to film.</em>
        </p>
      </div>
    </section>
  );
}
