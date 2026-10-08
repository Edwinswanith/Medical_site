import Image from "next/image";
import { AROGYA, CASE } from "@/content/site";
import { TLink } from "./TLink";

/**
 * Scene 8. Two client sites, one continuous chapter, all driven by the shared --r scrub.
 *
 * 01 Hemant: a giant name, the real home page scrolling inside a browser frame as you
 *    read, and what was built. As Arogya arrives, the whole case settles back.
 * 02 Arogya: rises over it through an arch (the shape that runs through Arogya's own
 *    site), then a one-screen stage layers the real desktop page, the phone view and two
 *    details as it scrolls past (no pin). Its closing corners round off into the next section.
 *
 * Reduced motion and no-JS read every --r fallback as the finished state.
 */
export function Case() {
  return (
    <section id="work" className="work" data-chapter="Work" aria-labelledby="case-h">
      <article className="case case--hemant" data-scrub="" data-scrub-start="bottom bottom" data-scrub-end="bottom top">
        <p className="label proj__meta">
          <span>Built, launched, in use</span>
          <span aria-hidden>01 / 02</span>
        </p>
        <h2 id="case-h" className="case__name" data-reveal>
          <span className="line">
            <span>{CASE.name},</span>
          </span>
          {" "}
          <span className="line">
            <span>
              <em>{CASE.em}</em>
            </span>
          </span>
        </h2>

        <div className="case__grid">
          <a
            className="case__shot notch wipe"
            href={CASE.live.href}
            target="_blank"
            rel="noreferrer"
            data-reveal
            data-scrub=""
            data-scrub-start="top 80%"
            data-scrub-end="bottom 20%"
            data-cursor="view"
            data-cursor-label="Visit"
          >
            <div className="chrome" aria-hidden>
              <span />
              <span />
              <span />
              <i>{CASE.live.label}</i>
            </div>
            <div className="case__viewport">
              <picture>
                <Image src={CASE.shot.webp} alt={CASE.shot.alt} width={CASE.shot.w} height={CASE.shot.h} sizes="(max-width: 899px) 90vw, 55vw" />
              </picture>
            </div>
            <span className="sr-only">Visit {CASE.live.label} (opens in a new tab)</span>
          </a>

          <div className="case__body">
            <p className="chips">
              <span className="chip chip--signal">Client work</span>
              <span className="chip">Live</span>
            </p>
            <p className="case__client">{CASE.client}</p>
            <p className="case__summary">{CASE.summary}</p>
            <dl className="case__facts" data-scrub="" data-scrub-start="top 85%" data-scrub-end="top 40%">
              {CASE.facts.map((f, i) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>
                    {f.value}
                    {i === 0 && (
                      <svg className="scribble scribble--ring" viewBox="0 0 200 160" preserveAspectRatio="none" aria-hidden>
                        <path pathLength={1} d="M30 90 C 20 40, 110 10, 165 40 C 200 65, 185 130, 110 145 C 50 155, 15 120, 35 80 C 45 62, 70 50, 95 46" />
                      </svg>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="case__built">
              {CASE.built.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <a className="arrow-link" href={CASE.live.href} target="_blank" rel="noreferrer">
              {CASE.live.label} <span aria-hidden>↗</span>
            </a>
            <p>
              <TLink className="arrow-link" href="/work/prof-hemant-sheth">
                Read about the project <span aria-hidden>→</span>
              </TLink>
            </p>
          </div>
        </div>
      </article>

      <article
        className="case case--arogya"
        data-tone="dark"
        data-scrub=""
        data-scrub-start="top bottom"
        data-scrub-end="top 15%"
        aria-labelledby="arogya-h"
      >
        <div className="arg__inner" data-scrub="" data-scrub-start="bottom 85%" data-scrub-end="bottom 25%">
          <p className="label proj__meta">
            <span>Client work · Colindale, London</span>
            <span aria-hidden>02 / 02</span>
          </p>
          <h2 id="arogya-h" className="case__name arg__name" data-reveal>
            <span className="line">
              <span>{AROGYA.name}</span>
            </span>
            {" "}
            <span className="line">
              <span>
                <em>{AROGYA.em}</em>
              </span>
            </span>
          </h2>

          <div className="arg__pin" data-scrub="" data-scrub-start="top 85%" data-scrub-end="bottom 15%">
            <div className="arg__stage">
              <a className="arg__desk" href={AROGYA.live.href} target="_blank" rel="noreferrer" data-cursor="view" data-cursor-label="Visit">
                <div className="chrome" aria-hidden>
                  <span />
                  <span />
                  <span />
                  <i>{AROGYA.live.label}</i>
                </div>
                <div className="arg__screen">
                  <picture>
                    <source media="(max-width: 899px)" srcSet={AROGYA.page.webpSmall} type="image/webp" />
                    <source srcSet={AROGYA.page.webp} type="image/webp" />
                    <img src={AROGYA.page.jpg} alt={AROGYA.page.alt} width={AROGYA.page.w} height={AROGYA.page.h} loading="lazy" decoding="async" />
                  </picture>
                </div>
                <span className="sr-only">Visit the Arogya Studio website (opens in a new tab)</span>
              </a>
              {AROGYA.details.map((d) => (
                <figure key={d.key} className={`arg__detail arg__detail--${d.key}`}>
                  <picture>
                    <source srcSet={d.webp} type="image/webp" />
                    <img src={d.jpg} alt={d.alt} width={d.w} height={d.h} loading="lazy" decoding="async" />
                  </picture>
                </figure>
              ))}
              <figure className="arg__phone">
                <div className="arg__phone-screen">
                  <picture>
                    <source srcSet={AROGYA.phone.webp} type="image/webp" />
                    <img src={AROGYA.phone.jpg} alt={AROGYA.phone.alt} width={AROGYA.phone.w} height={AROGYA.phone.h} loading="lazy" decoding="async" />
                  </picture>
                </div>
              </figure>
            </div>
          </div>

          <div className="arg__body">
            <div className="arg__intro">
              <p className="chips">
                <span className="chip chip--signal">Client work</span>
                <span className="chip">Live preview</span>
              </p>
              <p className="case__client">{AROGYA.client}</p>
              <p className="case__summary">{AROGYA.summary}</p>
              <p className="arg__links">
                <a className="btn btn--signal" href={AROGYA.live.href} target="_blank" rel="noreferrer" aria-label="View the live Arogya Studio website (opens in a new tab)">
                  View live website <span aria-hidden>↗</span>
                </a>
                <TLink className="arrow-link" href="/work/arogya-studio">
                  Read about the project <span aria-hidden>→</span>
                </TLink>
                <TLink className="arrow-link" href="/work">
                  See all our work <span aria-hidden>→</span>
                </TLink>
              </p>
            </div>
            <div>
              <dl className="case__facts" data-scrub="" data-scrub-start="top 85%" data-scrub-end="top 40%">
                {AROGYA.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="case__built">
                {AROGYA.built.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
