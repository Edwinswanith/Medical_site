"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Project } from "@/content/projects";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * A project's full page strip in a browser frame (the same frame as the Hemant page).
 * It peeks down the page once when it first comes into view and scrolls on hover or
 * keyboard focus; how far depends on the strip's length (--peek). Still with reduced motion.
 */
export function ProjectFrame({ project }: { project: Project }) {
  const frame = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        el.dataset.peek = "";
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { page, live } = project;
  return (
    <figure ref={frame} className="pg-work__frame pg-work__frame--long" style={{ ["--peek" as string]: project.peek }}>
      <div className="pg-work__window notch">
        <div className="chrome" aria-hidden>
          <span />
          <span />
          <span />
          <i>{live.label}</i>
        </div>
        <a className="pg-work__viewport" href={live.href} target="_blank" rel="noreferrer">
          <picture>
            <source media="(max-width: 899px)" srcSet={page.srcSmall} type="image/webp" />
            <Image src={page.src} alt={page.alt} width={page.w} height={page.h} sizes="(max-width: 899px) 90vw, 48vw" loading="eager" fetchPriority="high" unoptimized />
          </picture>
          <span className="sr-only"> Visit the live website (opens in a new tab)</span>
        </a>
      </div>
      <figcaption>The live website, top to bottom. Hover to scroll it, or visit the site.</figcaption>
    </figure>
  );
}
