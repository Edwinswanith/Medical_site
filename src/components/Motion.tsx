"use client";

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lockScroll, prefersReducedMotion, setLenis } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Ctx = { navigate: (href: string) => void };
const TransitionCtx = createContext<Ctx>({ navigate: () => {} });
export const useTransitionNav = () => useContext(TransitionCtx);

/**
 * App-wide motion: smooth scroll, curtain page transitions, scroll reveals.
 * Everything degrades to plain navigation and static content under reduced motion.
 */
export function Motion({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const first = useRef(true);

  // Smooth scroll, driven by GSAP's ticker so ScrollTrigger and Lenis share one frame.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (busy.current || href === pathname) return;
      if (prefersReducedMotion() || !curtain.current) {
        router.push(href);
        return;
      }
      busy.current = true;
      router.prefetch(href);
      const name = href === "/" ? "Home" : href.split("/").filter(Boolean).pop()!.replace(/-/g, " ");
      if (label.current) label.current.textContent = name;
      lockScroll(true);
      gsap
        .timeline({ onComplete: () => router.push(href) })
        .set(curtain.current, { yPercent: 100, visibility: "visible" })
        .to(curtain.current, { yPercent: 0, duration: 0.65, ease: "expo.inOut" })
        .fromTo(label.current, { yPercent: 120 }, { yPercent: 0, duration: 0.5, ease: "expo.out" }, "-=0.25");
    },
    [pathname, router],
  );

  // New route mounted: reset scroll, lift the curtain, re-arm reveals.
  useEffect(() => {
    window.scrollTo(0, 0);
    if (first.current) {
      first.current = false;
    } else if (busy.current && curtain.current) {
      document.documentElement.dataset.entering = "";
      gsap
        .timeline({
          onComplete: () => {
            busy.current = false;
            lockScroll(false);
            gsap.set(curtain.current, { visibility: "hidden" });
            delete document.documentElement.dataset.entering;
          },
        })
        .to(label.current, { yPercent: -120, duration: 0.4, ease: "expo.in" })
        .to(curtain.current, { yPercent: -100, duration: 0.75, ease: "expo.inOut" }, "-=0.1");
    }

    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (prefersReducedMotion()) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -12% 0px" },
    );
    els.forEach((el) => io.observe(el));

    // Parallax: [data-speed] drifts against the scroll (positive = slower than the page).
    // Scrub: [data-scrub] gets --r from 0 to 1 while it crosses the screen; CSS decides what --r does.
    // data-scrub-start / data-scrub-end override the default range ("top bottom" → "bottom top").
    const triggers: ScrollTrigger[] = [];
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      document.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
        const s = Number(el.dataset.speed) || 0;
        const t = gsap.fromTo(
          el,
          { y: () => s * window.innerHeight * 0.35 },
          { y: () => -s * window.innerHeight * 0.35, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true } },
        );
        triggers.push(t.scrollTrigger!);
      });
    });
    document.querySelectorAll<HTMLElement>("[data-scrub]").forEach((el) => {
      el.style.setProperty("--r", "0");
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: el.dataset.scrubStart || "top bottom",
          end: el.dataset.scrubEnd || "bottom top",
          scrub: 0.4,
          onUpdate: (st) => el.style.setProperty("--r", st.progress.toFixed(4)),
        }),
      );
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      io.disconnect();
      triggers.forEach((t) => t.kill());
      mm.revert();
      document.querySelectorAll<HTMLElement>("[data-scrub]").forEach((el) => el.style.removeProperty("--r"));
    };
  }, [pathname]);

  return (
    <TransitionCtx.Provider value={{ navigate }}>
      {children}
      <div ref={curtain} className="curtain" aria-hidden>
        <span className="curtain__mask">
          <span ref={label} className="curtain__label" />
        </span>
      </div>
    </TransitionCtx.Provider>
  );
}
