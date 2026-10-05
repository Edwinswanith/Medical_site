"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** A dot that trails the pointer and swells over anything interactive. Fine pointers only. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || !dot.current) return;
    const el = dot.current;
    document.documentElement.classList.add("has-cursor");
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });

    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const t = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor], input, textarea, select, label");
      el.dataset.state = t ? t.dataset.cursor ?? "link" : "";
      el.dataset.label = t?.dataset.cursorLabel ?? "";
    };
    const leave = () => (el.dataset.state = "hidden");
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return <div ref={dot} className="cursor" aria-hidden />;
}
