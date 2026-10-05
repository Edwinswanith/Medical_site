import { CASE } from "@/content/site";

/**
 * Scene 8. The one approved case: a giant name, the real home page in a browser
 * frame that pans as you look (CSS hover/focus), and what was built.
 */
export function Case() {
  return (
    <section id="work" className="case" data-tone="dark" data-chapter="Work" aria-labelledby="case-h">
      <p className="label">Built, launched, in use</p>
      <h2 id="case-h" className="case__name" data-reveal>
        <span className="line">
          <span>{CASE.name},</span>
        </span>
        <span className="line">
          <span>
            <em>{CASE.em}</em>
          </span>
        </span>
      </h2>

      <div className="case__grid">
        <a className="case__shot notch wipe" href={CASE.live.href} target="_blank" rel="noreferrer" data-reveal data-cursor="view" data-cursor-label="Visit">
          <div className="chrome" aria-hidden>
            <span />
            <span />
            <span />
            <i>{CASE.live.label}</i>
          </div>
          <div className="case__viewport">
            <picture>
              <source srcSet={CASE.shot.webp} type="image/webp" />
              <img src={CASE.shot.jpg} alt={CASE.shot.alt} width={CASE.shot.w} height={CASE.shot.h} loading="lazy" />
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
        </div>
      </div>
    </section>
  );
}
