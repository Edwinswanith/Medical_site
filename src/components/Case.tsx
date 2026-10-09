"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { SHOWCASE } from "@/content/projects";
import { TLink } from "./TLink";

/**
 * Scene 8. Selected work: every project in one fixed-height stage, so adding a project adds a
 * tab, never page length.
 *
 * Desktop: a tab row, then the active project's details beside a live preview in its own
 * colours. Switching wipes the new preview in from the direction of travel. While the section
 * is on screen, the real page scrolls down and back up inside its frame on a loop (paused on
 * hover, reset when the section leaves). Tabs, arrows, keyboard and drag.
 * Mobile: the same panels as a native swipe carousel. Every project stays in the HTML, so
 * crawlers read all of them; each links to its full case study.
 * Reduced motion: no wipe, no scrolling preview.
 */
export function Case() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [desktop, setDesktop] = useState(true);
  const [inView, setInView] = useState(false);
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const drag = useRef<number | null>(null);
  const moved = useRef(false);
  const n = SHOWCASE.length;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const go = useCallback(
    (i: number, focus = false) => {
      const next = (i + n) % n;
      setDir(next >= active ? 1 : -1);
      setActive(next);
      if (focus) tabs.current[next]?.focus();
      // Phones: the carousel is the source of truth, so scroll it to the chosen panel.
      const el = track.current;
      if (el && !window.matchMedia("(min-width: 900px)").matches) {
        const panel = el.children[next] as HTMLElement | undefined;
        if (panel) el.scrollTo({ left: panel.offsetLeft - el.offsetLeft, behavior: "smooth" });
      }
    },
    [active, n],
  );

  // The previews scroll only while the section is on screen, so a visitor arriving by
  // scrolling sees them start; they stop and reset when the section leaves.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Phones: follow the swipe.
  useEffect(() => {
    const el = track.current;
    if (!el || desktop) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.intersectionRatio > 0.6) setActive(Number((e.target as HTMLElement).dataset.index));
        }),
      { root: el, threshold: [0.6] },
    );
    [...el.children].forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [desktop]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(active + 1, true);
    else if (e.key === "ArrowLeft") go(active - 1, true);
    else if (e.key === "Home") go(0, true);
    else if (e.key === "End") go(n - 1, true);
    else return;
    e.preventDefault();
  };

  // Desktop: drag the stage sideways to change project.
  const down = (e: PointerEvent) => {
    if (!desktop || e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const up = (e: PointerEvent) => {
    if (drag.current === null) return;
    const dx = e.clientX - drag.current;
    drag.current = null;
    if (Math.abs(dx) > 70) {
      moved.current = true;
      go(active + (dx < 0 ? 1 : -1));
    }
  };
  // A drag that changed project must not also open the preview link underneath.
  const swallowClick = (e: React.MouseEvent) => {
    if (!moved.current) return;
    moved.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  const pad = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <section ref={section} id="work" className="sc" data-chapter="Work" data-inview={inView || undefined} aria-labelledby="case-h">
      <div className="sc__head">
        <div>
          <p className="label">Built, launched, in use</p>
          <h2 id="case-h" className="mid" data-reveal>
            <span className="line">
              <span>
                Selected <em>work.</em>
              </span>
            </span>
          </h2>
        </div>
        <div className="sc__nav">
          <p className="sc__count" aria-live="polite">
            <span>{pad(active)}</span> / {pad(n - 1)}
          </p>
          <button className="sc__arrow" type="button" onClick={() => go(active - 1)} aria-label="Previous project">
            <span aria-hidden>←</span>
          </button>
          <button className="sc__arrow" type="button" onClick={() => go(active + 1)} aria-label="Next project">
            <span aria-hidden>→</span>
          </button>
          <TLink className="arrow-link sc__all" href="/work">
            All work <span aria-hidden>→</span>
          </TLink>
        </div>
      </div>

      <div className="sc__tabs" role="tablist" aria-label="Projects" onKeyDown={onKey}>
        {SHOWCASE.map((p, i) => (
          <button
            key={p.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            id={`sc-tab-${p.slug}`}
            className="sc__tab"
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`sc-panel-${p.slug}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => go(i)}
          >
            <span className="sc__tab-n">{pad(i)}</span>
            <span className="sc__tab-name">{p.name}</span>
            <span className="sc__tab-sector">{p.sector}</span>
          </button>
        ))}
      </div>

      <div ref={track} className="sc__stage" data-dir={dir} onPointerDown={down} onPointerUp={up} onPointerCancel={() => (drag.current = null)} onClickCapture={swallowClick}>
        {SHOWCASE.map((p, i) => {
          const on = i === active;
          return (
            <article
              key={p.slug}
              id={`sc-panel-${p.slug}`}
              className="sc__panel"
              role="tabpanel"
              aria-labelledby={`sc-tab-${p.slug}`}
              data-index={i}
              data-on={on || undefined}
              inert={desktop && !on ? true : undefined}
              style={
                {
                  "--p-bg": p.theme.bg,
                  "--p-ink": p.theme.ink,
                  "--p-muted": p.theme.muted,
                  "--p-accent": p.theme.accent,
                } as React.CSSProperties
              }
            >
              <div className="sc__info">
                <p className="sc__status">
                  <span>{p.status}</span>
                  <span>{p.sector}</span>
                </p>
                <h3 className="sc__name">
                  {p.name}, <em>{p.em}</em>
                </h3>
                <p className="sc__summary">{p.summary}</p>
                <dl className="sc__facts">
                  {p.facts.map((f) => (
                    <div key={f.label}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="sc__tags">
                  <p className="sc__tags-label">Skills</p>
                  <ul>
                    {p.skills.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                {p.tech.length > 0 && (
                  <div className="sc__tags sc__tags--tech">
                    <p className="sc__tags-label">Built with</p>
                    <ul>
                      {p.tech.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="sc__links">
                  <TLink className="btn btn--signal" href={`/work/${p.slug}`}>
                    Read the case study <span aria-hidden>→</span>
                  </TLink>
                  <a className="arrow-link" href={p.live.href} target="_blank" rel="noreferrer">
                    {p.live.label} <span aria-hidden>↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              </div>

              <div className="sc__preview">
                <a className="sc__frame" href={p.live.href} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden draggable={false} data-cursor="view" data-cursor-label="Visit">
                  <span className="sc__chrome">
                    <i />
                    <i />
                    <i />
                    <b>{p.live.label}</b>
                  </span>
                  <span className="sc__screen">
                    <picture>
                      {p.preview.srcSmall && <source media="(max-width: 899px)" srcSet={p.preview.srcSmall} type="image/webp" />}
                      <img src={p.preview.src} alt="" width={p.preview.w} height={p.preview.h} loading="lazy" decoding="async" draggable={false} />
                    </picture>
                  </span>
                </a>
                {p.phone && (
                  <span className="sc__phone" aria-hidden>
                    <span className="sc__phone-screen">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.phone.src} alt="" width={p.phone.w} height={p.phone.h} loading="lazy" decoding="async" draggable={false} />
                    </span>
                  </span>
                )}
                <p className="sr-only">{p.preview.alt}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
