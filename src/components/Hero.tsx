"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HERO, HERO_FILM, HERO_STATS, TEMPLATES } from "@/content/site";
import { canAutoplay, isTouch, prefersReducedMotion } from "@/lib/motion";
import { TLink } from "./TLink";
import { Magnetic } from "./Magnetic";

const canMp4 = (v: HTMLVideoElement) => v.canPlayType('video/mp4; codecs="avc1.640028"') !== "";

/**
 * Scene 1. The offer in giant type, beside the product itself: a real specialty
 * site, its film inside it, and the short cut for phones. The three layers drift
 * at different depths with the pointer. Touch and reduced motion: a still stack.
 */
export function Hero() {
  const stack = useRef<HTMLDivElement>(null);
  const film = useRef<HTMLVideoElement>(null);
  const phone = useRef<HTMLVideoElement>(null);
  const cardio = TEMPLATES[0];

  useEffect(() => {
    const s = stack.current;
    if (!s || prefersReducedMotion()) return;

    // Play the clips while the hero is on screen. Phones play only the film; the short stays a still.
    const vids = canAutoplay() ? (isTouch() ? [film.current!] : [film.current!, phone.current!]) : [];
    const filmSrc = isTouch() ? HERO_FILM.sources.phone : HERO_FILM.sources.small;
    if (vids[0]) vids[0].src = canMp4(vids[0]) ? filmSrc.mp4 : filmSrc.webm;
    if (vids[1]) vids[1].src = canMp4(vids[1]) ? HERO_FILM.vertical.video!.mp4 : HERO_FILM.vertical.video!.webm;
    const io = new IntersectionObserver(([e]) =>
      vids.forEach((v) => (e.intersectionRatio > 0 && !document.hidden ? v.play().catch(() => {}) : v.pause())),
    );
    io.observe(s);

    if (!window.matchMedia("(pointer: fine)").matches) return () => io.disconnect();
    const layers = [...s.querySelectorAll<HTMLElement>("[data-depth]")].map((el) => ({
      d: Number(el.dataset.depth),
      x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3" }),
    }));
    const move = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      layers.forEach((l) => {
        l.x(nx * l.d * 40);
        l.y(ny * l.d * 30);
      });
    };
    window.addEventListener("pointermove", move);
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", move);
      vids.forEach((v) => v.pause());
    };
  }, []);

  return (
    <section id="intro" className="hero" data-tone="dark" data-chapter="Intro" aria-labelledby="hero-h">
      <div className="hero__copy">
        <p className="hero__kicker label">
          {HERO.kicker.map((k, i) => (
            <span key={k}>
              {i > 0 && <i aria-hidden>·</i>}
              {k}
            </span>
          ))}
        </p>
        <h1 id="hero-h" className="hero__title" data-speed="0.18">
          <span className="line">
            <span>{HERO.titleA}</span>
          </span>
          <span className="line">
            <span>
              {HERO.titleB}{" "}
              <em className="hero__script">
                {HERO.titleEm}
                <svg className="scribble" viewBox="0 0 600 200" preserveAspectRatio="none" aria-hidden>
                  <path
                    pathLength={1}
                    d="M40 120 C 60 40, 380 10, 540 60 C 600 80, 590 150, 470 172 C 330 196, 90 190, 40 140 C 20 115, 70 85, 160 70"
                  />
                </svg>
              </em>
            </span>
          </span>
        </h1>
        <p className="hero__intro">{HERO.intro}</p>
        <div className="hero__cta">
          <Magnetic>
            <TLink href="/contact" className="btn btn--signal" data-cursor="hide">
              Book a call <span aria-hidden>→</span>
            </TLink>
          </Magnetic>
          <a href="#services" className="btn btn--ghost">
            See what we make
          </a>
        </div>
      </div>

      <ul className="hero__stats" aria-label="At a glance">
        {HERO_STATS.map((x, i) => (
          <li key={x.label} className="notch" style={{ ["--i" as string]: i }}>
            <span className="label">{x.label}</span>
            <strong>{x.value}</strong>
          </li>
        ))}
      </ul>

      <div ref={stack} data-speed="-0.12" className="hero__stack" aria-label="A specialty website with its patient film and a short for phones">
        <figure className="hs hs--site notch" data-depth="0.4">
          <div className="chrome" aria-hidden>
            <span />
            <span />
            <span />
            <i>yourname.co.uk</i>
          </div>
          <picture>
            <source srcSet={cardio.img.webp} type="image/webp" />
            <img src={cardio.img.jpg} alt="Cardiology website template" width={1200} height={750} fetchPriority="high" />
          </picture>
          <figcaption className="hs__tag label">Your website</figcaption>
        </figure>
        <figure className="hs hs--film notch" data-depth="1">
          <img src={HERO_FILM.poster.webp} alt="" />
          <video ref={film} muted loop playsInline preload="none" aria-hidden />
          <figcaption className="hs__tag label">Your film, inside it</figcaption>
          <span className="hs__play" aria-hidden>
            ▶ Play the film
          </span>
        </figure>
        <figure className="hs hs--phone" data-depth="1.6">
          <img src={HERO_FILM.vertical.still.webp} alt="" />
          <video ref={phone} muted loop playsInline preload="none" aria-hidden />
          <figcaption className="hs__tag label">Your shorts</figcaption>
        </figure>
        <p className="hs__ai label">Film frames: AI-generated concept footage</p>
      </div>
    </section>
  );
}
