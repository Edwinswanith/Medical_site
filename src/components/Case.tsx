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
        <a className="case__shot notch" href={CASE.live.href} target="_blank" rel="noreferrer" data-reveal data-cursor="view" data-cursor-label="Visit">
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
          <dl className="case__facts">
            {CASE.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
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
