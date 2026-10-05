"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FORMATS, HERO_FILM } from "@/content/site";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const canMp4 = (v: HTMLVideoElement) => v.canPlayType('video/mp4; codecs="avc1.640028"') !== "";

/**
 * Scene 3. One explanation, three formats: a film block inside a website grows
 * to fill the frame, then the frame becomes a phone playing the vertical cut.
 *
 * Wide screens with motion: a scrubbed GSAP timeline over a CSS-sticky stage
 * (no pin, so React keeps its nodes). Everyone else gets the ordered static
 * list, which is also the version screen readers use.
 */
export function Formats() {
  const root = useRef<HTMLElement>(null);
  const device = useRef<HTMLDivElement>(null);
  const wide = useRef<HTMLVideoElement>(null);
  const tall = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      const d = device.current!;
      const w = wide.current!;
      const t = tall.current!;
      w.src = canMp4(w) ? HERO_FILM.sources.small.mp4 : HERO_FILM.sources.small.webm;
      t.src = canMp4(t) ? FORMATS.vertical.video!.mp4 : FORMATS.vertical.video!.webm;

      const vw = () => window.innerWidth;
      const vh = () => window.innerHeight;
      // Device sizes per beat, kept inside the viewport.
      const site = () => ({ w: Math.min(vw() * 0.5, vh() * 0.62 * 1.6), h: Math.min(vw() * 0.5, vh() * 0.62 * 1.6) / 1.6 });
      const film = () => ({ w: Math.min(vw() * 0.58, vh() * 0.62 * (16 / 9)), h: Math.min(vw() * 0.58, vh() * 0.62 * (16 / 9)) * (9 / 16) });
      const phone = () => ({ w: vh() * 0.7 * (9 / 19.5), h: vh() * 0.7 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (s) => {
            const beat = s.progress < 0.3 ? 0 : s.progress < 0.62 ? 1 : 2;
            el.dataset.beat = String(beat);
            const on = s.isActive;
            if (on && beat < 2) {
              t.pause();
              w.play().catch(() => {});
            } else if (on) {
              w.pause();
              t.play().catch(() => {});
            } else {
              w.pause();
              t.pause();
            }
          },
          onLeave: () => (w.pause(), t.pause()),
          onLeaveBack: () => (w.pause(), t.pause()),
        },
      });
      tl.set(d, { width: () => site().w, height: () => site().h, borderRadius: 16 })
        .to(".fmt__page", { opacity: 0, duration: 0.6 }, 0.25)
        .to(".fmt__chrome", { opacity: 0, duration: 0.4 }, 0.6)
        .fromTo(".fmt__slot", { top: "34%", left: "8%", width: "52%", height: "48%", borderRadius: 8 }, { top: "0%", left: "0%", width: "100%", height: "100%", borderRadius: 0, duration: 1 }, 0)
        .to(d, { width: () => film().w, height: () => film().h, borderRadius: 6, duration: 1 }, 0)
        .to({}, { duration: 0.5 })
        .to(d, { width: () => phone().w, height: () => phone().h, borderRadius: 38, duration: 1 })
        .to(".fmt__tall", { opacity: 1, duration: 0.5 }, "<0.35")
        .to(".fmt__notch", { opacity: 1, duration: 0.3 }, "<0.2")
        .to({}, { duration: 0.6 });
      return () => {
        w.pause();
        t.pause();
        w.removeAttribute("src");
        t.removeAttribute("src");
      };
    }, el); // scope: class selectors in the timeline resolve inside this section only
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="formats" className="fmt" data-tone="dark" data-chapter="Formats" data-beat="0" aria-labelledby="fmt-h">
      <div className="fmt__stage">
        <div className="fmt__copy">
          <p className="label">One story, three formats</p>
          <h2 id="fmt-h" className="display-m">
            Explain it once. <em>Use it everywhere.</em>
          </h2>
          <ol className="fmt__beats" aria-hidden>
            {FORMATS.beats.map((b, i) => (
              <li key={b.n} data-i={i}>
                <span className="fmt__n">{b.n}</span>
                <span>
                  <strong>{b.title}</strong>
                  <span className="fmt__body">{b.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="fmt__scene" aria-hidden>
          <div ref={device} className="fmt__device">
            <div className="fmt__chrome">
              <span />
              <span />
              <span />
              <i>your-practice.co.uk/treatments</i>
            </div>
            <div className="fmt__page">
              <b className="w60" />
              <b className="w40" />
              <b className="side" />
              <b className="w30 btn" />
            </div>
            <div className="fmt__slot">
              <img src={HERO_FILM.poster.webp} alt="" />
              <video ref={wide} muted loop playsInline preload="none" />
            </div>
            <div className="fmt__tall">
              <img src={FORMATS.vertical.still.webp} alt="" />
              <video ref={tall} muted loop playsInline preload="none" />
            </div>
            <span className="fmt__notch" />
          </div>
          <p className="fmt__ai">Concept footage · AI-generated</p>
        </div>
      </div>

      {/* Static version: narrow screens, reduced motion, and screen readers on all screens. */}
      <ol className="fmt__static">
        {FORMATS.beats.map((b, i) => (
          <li key={b.n}>
            <figure className={`fmt__fig fmt__fig--${i}`}>
              {i === 0 && (
                <div className="fmt__mini-site" aria-hidden>
                  <div className="fmt__chrome">
                    <span />
                    <span />
                    <span />
                  </div>
                  <img src={HERO_FILM.poster.webp} alt="" loading="lazy" />
                </div>
              )}
              {i === 1 && <img src={HERO_FILM.poster.webp} alt="" loading="lazy" />}
              {i === 2 && <img className="fmt__mini-phone" src={FORMATS.vertical.still.webp} alt="" loading="lazy" />}
              <figcaption>
                <span className="fmt__n">{b.n}</span> <strong>{b.title}.</strong> {b.body}
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </section>
  );
}
