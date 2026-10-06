"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TLink } from "./TLink";

/**
 * Phones only (CSS hides it from 900px): a "Book a call" bar that rises once the
 * hero has scrolled away, so the next step is always in thumb reach on a long page.
 * It steps aside while the footer's own call to action is on screen, while the
 * menu is open and while a form field has focus (the keyboard needs the room).
 * Not rendered on /contact, where the form is the page.
 */
export function StickyCta() {
  const onContact = usePathname() === "/contact";
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (onContact) return;
    const header = document.querySelector<HTMLElement>(".header");
    const footer = document.querySelector(".foot__panel");
    let past = false;
    let footerInView = false;
    let typing = false;
    let raf = 0;

    const update = () => setShow(past && !footerInView && !typing && header?.dataset.open !== "true");
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        past = window.scrollY > window.innerHeight * 0.9;
        update();
      });
    };
    const io = new IntersectionObserver(([e]) => {
      footerInView = e.isIntersecting;
      update();
    });
    if (footer) io.observe(footer);
    const menu = new MutationObserver(update);
    if (header) menu.observe(header, { attributes: true, attributeFilter: ["data-open"] });
    const isField = (t: EventTarget | null) => t instanceof HTMLElement && t.matches("input, textarea, select");
    const onFocusIn = (e: FocusEvent) => {
      typing = isField(e.target);
      update();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("focusin", onFocusIn);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      menu.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [onContact]);

  if (onContact) return null;
  return (
    <div className="sticky-cta" data-show={show || undefined} inert={!show}>
      <TLink href="/contact" className="btn btn--signal">
        Book a call <span aria-hidden>→</span>
      </TLink>
    </div>
  );
}
