"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { BRAND, NAV } from "@/content/site";
import { lockScroll, prefersReducedMotion } from "@/lib/motion";
import { TLink } from "./TLink";

const LOGO_NAME = "cogniverseStudio";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const panel = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // The header stays put so "Book a call" is always one click away; it gains a backdrop once scrolled.
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Match the tone of the section under the header: observe a 1px line at y = 36.
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    const under = new Set<Element>();
    const setup = () => {
      io?.disconnect();
      under.clear();
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => (e.isIntersecting ? under.add(e.target) : under.delete(e.target)));
          setTone(under.size ? "dark" : "light");
        },
        { rootMargin: `-36px 0px -${Math.max(0, window.innerHeight - 37)}px 0px` },
      );
      document.querySelectorAll("main [data-tone='dark'], footer[data-tone='dark']").forEach((el) => io!.observe(el));
    };
    setup();
    window.addEventListener("resize", setup);
    return () => {
      io?.disconnect();
      window.removeEventListener("resize", setup);
    };
  }, [pathname]);

  // Menu reveal: a circle grows out of the menu button, then the links rise.
  useEffect(() => {
    const p = panel.current;
    const b = button.current;
    if (!p || !b) return;
    const r = b.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const reduce = prefersReducedMotion();
    tl.current?.kill();
    if (open) {
      lockScroll(true);
      tl.current = gsap
        .timeline()
        .set(p, { visibility: "visible" })
        .call(() => p.querySelector<HTMLElement>("a")?.focus({ preventScroll: true }))
        .fromTo(
          p,
          { clipPath: `circle(0px at ${cx}px ${cy}px)` },
          { clipPath: `circle(150% at ${cx}px ${cy}px)`, duration: reduce ? 0 : 0.9, ease: "expo.inOut" },
        )
        .fromTo(
          p.querySelectorAll(".menu__link-inner, .menu__aside > *"),
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: reduce ? 0 : 0.8, stagger: 0.05, ease: "expo.out" },
          "-=0.45",
        );
    } else if (p.style.visibility === "visible") {
      tl.current = gsap
        .timeline({
          onComplete: () => {
            gsap.set(p, { visibility: "hidden" });
            lockScroll(false);
            // Return focus to the trigger, unless focus already moved on (e.g. a route change).
            if (!document.activeElement || document.activeElement === document.body || p.contains(document.activeElement)) {
              b.focus({ preventScroll: true });
            }
          },
        })
        .to(p, { clipPath: `circle(0px at ${cx}px ${cy}px)`, duration: reduce ? 0 : 0.7, ease: "expo.inOut" });
    }
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      <header className="header" data-scrolled={scrolled} data-tone={tone} data-open={open}>
        <TLink href="/" className="header__brand" aria-label={`${LOGO_NAME} home`}>
          <Mark />
          <span>{LOGO_NAME}</span>
        </TLink>
        <nav className="header__nav" aria-label="Primary">
          {NAV.map((n) => (
            <TLink key={n.href} href={n.href} data-active={pathname === n.href}>
              {n.label}
            </TLink>
          ))}
        </nav>
        <div className="header__actions">
          <TLink href="/contact" className="pill pill--signal">
            Book a call
          </TLink>
          <button
            ref={button}
            className="burger"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="menu" ref={panel} className="menu" role="dialog" aria-modal="true" aria-label="Menu" inert={!open}>
        <nav className="menu__links">
          {[{ href: "/", label: "Home" }, ...NAV, { href: "/contact", label: "Book a call" }].map((n, i) => (
            <TLink key={n.href} href={n.href} className="menu__link" data-active={pathname === n.href}>
              <span className="menu__link-inner">
                <span className="menu__num">{String(i + 1).padStart(2, "0")}</span>
                {n.label}
              </span>
            </TLink>
          ))}
        </nav>
        <aside className="menu__aside">
          <div>
            <p className="label">Email</p>
            <a className="menu__phone" href={`mailto:${BRAND.email}`}>
              {BRAND.email}
            </a>
          </div>
          <div>
            <p className="label">Call</p>
            <a href={`tel:${BRAND.phone.tel}`}>{BRAND.phone.display}</a>
            <p className="muted">{BRAND.responseTime}</p>
          </div>
        </aside>
      </div>
    </>
  );
}

export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 32 32" aria-hidden>
      <rect x="1" y="1" width="30" height="30" rx="9" />
      <path d="M13 10.5v11l9-5.5z" />
    </svg>
  );
}
