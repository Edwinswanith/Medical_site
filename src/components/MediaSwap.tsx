"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Media } from "@/content/site";
import { canAutoplay, isTouch, prefersReducedMotion } from "@/lib/motion";

// At most one decorative preview plays at a time across the whole page.
let current: HTMLVideoElement | null = null;

const pick = (v: HTMLVideoElement, m: NonNullable<Media["video"]>) =>
  v.canPlayType('video/mp4; codecs="avc1.640028"') ? m.mp4 : m.webm;

/**
 * A still that becomes its film. The video opens through a circle that grows from
 * the pointer (or the centre on touch), and closes back to the still.
 *
 * trigger "hover": fine pointers play on hover. On touch it becomes tap-to-play,
 *                  or still-only when the frame sits inside a link (the tap navigates).
 * trigger "view":  plays while at least 60% of it is on screen (not on save-data / slow connections).
 * trigger "manual": the parent decides through `active`.
 * Reduced motion: the still only. A failed video leaves the still in place.
 */
export function MediaSwap({
  media,
  trigger = "hover",
  active,
  className = "",
  priority = false,
  showAiLabel = true,
  sizes = "(max-width: 640px) 90vw, (max-width: 899px) 45vw, 35vw",
}: {
  media: Media;
  trigger?: "hover" | "view" | "manual";
  active?: boolean;
  className?: string;
  priority?: boolean;
  showAiLabel?: boolean;
  sizes?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const visible = useRef(false);
  const wants = useRef(false);

  const sync = () => {
    const v = video.current;
    if (!v || !media.video) return;
    const go = wants.current && visible.current && !document.hidden && !prefersReducedMotion();
    if (go) {
      if (!v.src) {
        // Reuse the responsive still already selected by the browser; don't fetch every
        // below-fold video's full-size poster during the initial page load.
        v.poster = root.current?.querySelector("img")?.currentSrc || media.still.webp;
        v.src = pick(v, media.video);
      }
      if (current && current !== v) current.pause();
      current = v;
      v.play().catch(() => {});
    } else {
      v.pause();
      v.removeAttribute("data-on");
    }
  };

  useEffect(() => {
    const el = root.current;
    const v = video.current;
    if (!el || !v) return;
    const inLink = !!el.closest("a");
    const mode =
      trigger === "hover" && isTouch() ? (inLink ? "none" : "tap") : trigger === "view" && !canAutoplay() ? "tap" : trigger;
    if (mode === "tap" && !inLink) el.dataset.tap = "";

    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.intersectionRatio > 0;
        if (mode === "view") wants.current = e.intersectionRatio >= 0.6;
        sync();
      },
      { threshold: [0, 0.6] },
    );
    io.observe(el);

    const enter = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--y", `${((e.clientY - r.top) / r.height) * 100}%`);
      wants.current = true;
      sync();
    };
    const leave = () => {
      wants.current = false;
      sync();
    };
    if (mode === "hover") {
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
    }
    const tap = () => {
      wants.current = !wants.current;
      el.toggleAttribute("data-playing", wants.current);
      sync();
    };
    if (mode === "tap") el.addEventListener("click", tap);
    const playing = () => v.setAttribute("data-on", "");
    const failed = () => el.setAttribute("data-failed", "");
    const pause = () => v.removeAttribute("data-on");
    v.addEventListener("playing", playing);
    v.addEventListener("pause", pause);
    v.addEventListener("error", failed);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("click", tap);
      v.removeEventListener("playing", playing);
      v.removeEventListener("pause", pause);
      v.removeEventListener("error", failed);
      document.removeEventListener("visibilitychange", sync);
      v.pause();
      if (current === v) current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  useEffect(() => {
    if (trigger !== "manual") return;
    wants.current = !!active;
    sync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, trigger]);

  return (
    <div ref={root} className={`swap ${className}`} style={{ aspectRatio: `${media.still.w} / ${media.still.h}` }}>
      <picture>
        <Image
          src={media.still.webp}
          alt={media.alt}
          width={media.still.w}
          height={media.still.h}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
        />
      </picture>
      {media.video && <video ref={video} muted loop playsInline preload="none" data-poster={media.still.webp} width={media.still.w} height={media.still.h} aria-hidden />}
      {media.video && <span className="swap__play" aria-hidden />}
      {media.ai && showAiLabel && <span className="swap__ai">AI-generated</span>}
    </div>
  );
}
