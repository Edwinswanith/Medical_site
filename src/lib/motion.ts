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

/** Touch-first device (no hover). Phones and most tablets. */
export const isTouch = () => typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches;

/**
 * Whether decorative video may start by itself: not under reduced motion,
 * not when the visitor asked to save data, not on a slow connection.
 */
export const canAutoplay = () => {
  if (typeof window === "undefined" || prefersReducedMotion()) return false;
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !(c?.saveData || /(^|-)(2g|3g)$/.test(c?.effectiveType ?? ""));
};
