"use client";

import { getLenis } from "@/lib/motion";

export function BackToTop() {
  return (
    <button
      className="ulink"
      onClick={() => {
        const l = getLenis();
        if (l) l.scrollTo(0, { duration: 1.6 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      Back to top ↑
    </button>
  );
}
