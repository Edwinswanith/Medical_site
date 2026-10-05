"use client";

import type Lenis from "lenis";

// One Lenis instance for the whole app, shared by the menu (to lock scroll)
// and page transitions (to jump to top).
let lenis: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  lenis = l;
};
export const getLenis = () => lenis;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const lockScroll = (locked: boolean) => {
  if (lenis) (locked ? lenis.stop() : lenis.start());
  document.documentElement.classList.toggle("is-locked", locked);
};
