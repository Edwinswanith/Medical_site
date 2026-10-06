import { CASE } from "@/content/site";
import { BrowserFrame } from "./BrowserFrame";
import { TLink } from "./TLink";

/** The approved client project as one card on the work index: the live site, what it is, what was built. */
export function WorkCaseCard() {
  return (
    <section className="wk-section wrap" aria-labelledby="wk-client-h">
      <p id="wk-client-h" className="label">
        Client work
      </p>
      <article className="wk-case notch">
        <BrowserFrame url={CASE.live.label} src={CASE.shot.webp} alt={CASE.shot.alt} w={CASE.shot.w} h={CASE.shot.h} sizes="(max-width: 899px) 90vw, 52vw" priority />
        <div className="wk-case__body">
          <p className="chips">
            <span className="chip chip--signal">Client website</span>
            <span className="chip">Live</span>
          </p>
          <h2 className="wk-case__title">
            <TLink href="/work/prof-hemant-sheth">
              {CASE.name}, <em>{CASE.em}</em>
            </TLink>
          </h2>
          <p className="wk-case__client">{CASE.client}</p>
          <p className="wk-case__summary">{CASE.summary}</p>
          <dl className="sp-proof-facts">
            {CASE.facts.map((fact) => (
              <div key={fact.label} className="sp-proof-fact">
                <dt className="sp-proof-fact-label">{fact.label}</dt>
                <dd className="sp-proof-fact-value">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="wk-case__links">
            <TLink className="btn btn--signal" href="/work/prof-hemant-sheth">
              Read about the project <span aria-hidden>→</span>
            </TLink>
            <a className="arrow-link" href={CASE.live.href} target="_blank" rel="noreferrer">
              {CASE.live.label} <span aria-hidden>↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}
