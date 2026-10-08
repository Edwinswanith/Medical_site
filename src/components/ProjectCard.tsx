import type { Project } from "@/content/projects";
import { BrowserFrame } from "./BrowserFrame";
import { TLink } from "./TLink";

/** One project on the work index, in the same card as the Prof. Hemant Sheth project. */
export function ProjectCard({ project: p }: { project: Project }) {
  const path = `/work/${p.slug}`;
  return (
    <article className="wk-case notch">
      <BrowserFrame url={p.live.label} src={p.hero.src} alt={p.hero.alt} w={p.hero.w} h={p.hero.h} sizes="(max-width: 899px) 90vw, 52vw" />
      <div className="wk-case__body">
        <p className="chips">
          {p.chips.map((c, i) => (
            <span key={c} className={i === 0 ? "chip chip--signal" : "chip"}>
              {c}
            </span>
          ))}
        </p>
        <h2 className="wk-case__title">
          <TLink href={path}>
            {p.name}, <em>{p.em}</em>
          </TLink>
        </h2>
        <p className="wk-case__client">{p.client}</p>
        <p className="wk-case__summary">{p.summary}</p>
        <dl className="sp-proof-facts">
          {p.facts.map((f) => (
            <div key={f.label} className="sp-proof-fact">
              <dt className="sp-proof-fact-label">{f.label}</dt>
              <dd className="sp-proof-fact-value">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="wk-case__links">
          <TLink className="btn btn--signal" href={path}>
            Read about the project <span aria-hidden>→</span>
          </TLink>
          <a className="arrow-link" href={p.live.href} target="_blank" rel="noreferrer">
            {p.live.label} <span aria-hidden>↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
