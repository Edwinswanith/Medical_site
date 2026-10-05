"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { CLINIC, NAV, SERVICES } from "@/content/site";
import { lockScroll, prefersReducedMotion } from "@/lib/motion";
import { TLink } from "./TLink";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Hide on scroll down, return on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) > 6) setHidden(y > last && y > 240);
      last = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

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
      p.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    } else if (p.style.visibility === "visible") {
      tl.current = gsap
        .timeline({
          onComplete: () => {
            gsap.set(p, { visibility: "hidden" });
            lockScroll(false);
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
      <header className="header" data-hidden={hidden && !open} data-scrolled={scrolled} data-open={open}>
        <TLink href="/" className="header__brand" aria-label={`${CLINIC.fullName} home`}>
          <Mark />
          <span>{CLINIC.name}</span>
        </TLink>
        <nav className="header__nav" aria-label="Primary">
          {NAV.slice(1).map((n) => (
            <TLink key={n.href} href={n.href} data-active={pathname.startsWith(n.href)}>
              {n.label}
            </TLink>
          ))}
        </nav>
        <div className="header__actions">
          <TLink href="/contact" className="pill pill--mint">
            Book a visit
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
          {NAV.map((n, i) => (
            <TLink key={n.href} href={n.href} className="menu__link" data-active={pathname === n.href}>
              <span className="menu__link-inner">
                <span className="menu__num">0{i + 1}</span>
                {n.label}
              </span>
            </TLink>
          ))}
        </nav>
        <aside className="menu__aside">
          <div>
            <p className="label">Specialities</p>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <TLink href={`/services/${s.slug}`}>{s.name}</TLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label">Call the desk</p>
            <a className="menu__phone" href={`tel:${CLINIC.phone.replace(/\s/g, "")}`}>
              {CLINIC.phone}
            </a>
          </div>
          <div>
            <p className="label">Hours</p>
            {CLINIC.hours.map((h) => (
              <p key={h.days}>
                {h.days} <span className="muted">{h.time}</span>
              </p>
            ))}
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
      <path d="M5 17h6l2.5-6 4 11 2.5-5H27" />
    </svg>
  );
}
