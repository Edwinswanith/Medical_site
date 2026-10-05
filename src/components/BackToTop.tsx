"use client";

import { getLenis, prefersReducedMotion } from "@/lib/motion";

export function BackToTop() {
  return (
    <button
      className="ulink"
      onClick={() => {
        const l = getLenis();
        if (l) l.scrollTo(0, { duration: 1.6 });
        else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "instant" : "smooth" });
      }}
    >
      Back to top ↑
    </button>
  );
}
