"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import gsap from "gsap";
import Image from "next/image";
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
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [picked, setPicked] = useState(false);
  const site = TEMPLATES[current];

  // Swap the site to the chosen specialty. The old screenshot stays underneath
  // until the new one has loaded and wiped in, so the frame never flashes empty.
  const pick = (e: ChangeEvent<HTMLSelectElement>) => {
    const next = TEMPLATES.findIndex((t) => t.slug === e.target.value);
    if (next < 0 || next === current) return;
    setPrevious(current);
    setCurrent(next);
    setPicked(true);
  };

  useEffect(() => {
    const s = stack.current;
    if (!s || prefersReducedMotion()) return;

    // Play the clips while the hero is on screen. Phones play only the film; the short stays a still.
    const vids = canAutoplay() ? (isTouch() ? [film.current!] : [film.current!, phone.current!]) : [];
    const filmSrc = isTouch() ? HERO_FILM.sources.phone : HERO_FILM.sources.small;
    let visible = false;
    const sync = () => vids.forEach((v, i) => {
      // Wait until the intro has lifted before downloading decorative clips.
      // Critical text, fonts and stills get the initial connection capacity.
      if (!visible || document.hidden || !document.documentElement.hasAttribute("data-intro-done")) return v.pause();
      if (!v.src) {
        const source = i === 0 ? filmSrc : HERO_FILM.vertical.video!;
        v.poster = v.parentElement?.querySelector("img")?.currentSrc || (i === 0 ? HERO_FILM.poster.webp : HERO_FILM.vertical.still.webp);
        v.src = canMp4(v) ? source.mp4 : source.webm;
      }
      v.play().catch(() => {});
    });
    const io = new IntersectionObserver(([e]) => { visible = e.intersectionRatio > 0; sync(); });
    io.observe(s);
    document.addEventListener("visibilitychange", sync);
    const intro = new MutationObserver(sync);
    intro.observe(document.documentElement, { attributes: true, attributeFilter: ["data-intro-done"] });
    const clean = () => { io.disconnect(); intro.disconnect(); document.removeEventListener("visibilitychange", sync); vids.forEach(v => v.pause()); };

    if (!window.matchMedia("(pointer: fine)").matches) return clean;
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
      clean();
      window.removeEventListener("pointermove", move);
      vids.forEach((v) => v.pause());
    };
  }, []);

  return (
    <section id="intro" className="hero" data-chapter="Intro" aria-labelledby="hero-h">
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
          {/* a real space, so crawlers that skip CSS don't read the lines as one word */}{" "}
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
          <div className="chrome hm-chrome">
            <span aria-hidden />
            <span aria-hidden />
            <span aria-hidden />
            <i aria-hidden>yourname.co.uk</i>
            <label className="hm-pick">
              <small className="sr-only">Preview the website for your specialty</small>
              <select value={site.slug} onChange={pick}>
                {TEMPLATES.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.name}
                  </option>
                ))}
              </select>
              <svg viewBox="0 0 10 6" aria-hidden>
                <path d="M1 1l4 4 4-4" />
              </svg>
            </label>
            <small className="hm-hint" data-hidden={picked || undefined} aria-hidden>
              ← Try your specialty
            </small>
          </div>
          <picture className="hm-site">
            {previous !== null && (
              <Image key={TEMPLATES[previous].slug} src={TEMPLATES[previous].img.webp} alt="" width={1200} height={750} sizes="(max-width: 899px) 90vw, 50vw" aria-hidden />
            )}
            <Image
              key={site.slug}
              src={site.img.webp}
              alt={`${site.name} website template`}
              width={1200}
              height={750}
              sizes="(max-width: 899px) 90vw, 50vw"
              loading="eager"
              fetchPriority={previous === null ? "high" : "auto"}
              className={previous === null ? undefined : "hm-site__in"}
              onLoad={(e) => e.currentTarget.setAttribute("data-loaded", "")}
              onAnimationEnd={() => setPrevious(null)}
            />
          </picture>
          <figcaption className="hs__tag label">Your website</figcaption>
        </figure>
        <figure className="hs hs--film notch" data-depth="1">
          <Image src={HERO_FILM.poster.webp} alt="" width={1920} height={1080} sizes="(max-width: 899px) 65vw, 35vw" loading="eager" />
          <video ref={film} muted loop playsInline preload="none" data-poster={HERO_FILM.poster.webp} width={1920} height={1080} aria-hidden />
          <figcaption className="hs__tag label">Your film, inside it</figcaption>
          <span className="hs__play" aria-hidden>
            ▶ Play the film
          </span>
        </figure>
        <figure className="hs hs--phone" data-depth="1.6">
          <Image src={HERO_FILM.vertical.still.webp} alt="" width={720} height={1280} sizes="(max-width: 899px) 20vw, 12vw" loading="eager" />
          <video ref={phone} muted loop playsInline preload="none" data-poster={HERO_FILM.vertical.still.webp} width={720} height={1280} aria-hidden />
          <figcaption className="hs__tag label">Your shorts</figcaption>
        </figure>
        <p className="hs__ai label">Film frames: AI-generated concept footage</p>
      </div>
    </section>
  );
}
