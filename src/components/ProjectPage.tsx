import Image from "next/image";
import type { Project } from "@/content/projects";
import { Breadcrumbs } from "./Breadcrumbs";
import { ProjectFrame } from "./ProjectFrame";
import { TLink } from "./TLink";

/**
 * A project page in the same editorial layout as the Prof. Hemant Sheth page: hero and
 * scrolling screenshot, purpose, facts, how the site is organised, a gallery of real
 * captures, what was built with its caveat, and the close. Everything comes from content.
 */
export function ProjectPage({ project: p }: { project: Project }) {
  const path = `/work/${p.slug}`;
  return (
    <>
      <section className="pg-work__hero-wrap">
        <div className="pg-work__hero editorial-hero">
          <Breadcrumbs
            items={[
              { label: "Home", path: "/" },
              { label: "Work", path: "/work" },
              { label: `${p.name} project`, path },
            ]}
          />
          <p className="label">{p.label}</p>
          <h1 className="display-xl">
            {p.name}: <em>{p.em}</em>
          </h1>
          <p className="phero__intro lede">
            {p.client}. {p.summary}
          </p>
          <a className="arrow-link" href={p.live.href} target="_blank" rel="noreferrer">
            Visit the live website <span aria-hidden>↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <ProjectFrame project={p} />
      </section>
      <div className="pg-work__body">
        <section className="pg-row pg-row--flush">
          <h2 className="display-m">
            {p.purpose.title} <em>{p.purpose.em}</em>
          </h2>
          <div className="pg-row__body">
            {p.purpose.body.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </section>
        <div className="pg-work__facts">
          {p.facts.map((f) => (
            <div key={f.label} className="pg-work__fact">
              <div className="pg-work__fact-value">{f.value}</div>
              <div className="pg-work__fact-label">{f.label}</div>
            </div>
          ))}
        </div>
        <section className="pg-row pg-row--flush">
          <h2 className="display-m">
            {p.structure.title} <em>{p.structure.em}</em>
          </h2>
          <div className="pg-row__body">
            {p.structure.body.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </section>
        <section className="pj-gallery" aria-label={`${p.name}: captures from the live website`}>
          {p.gallery.map((g) => (
            <figure key={g.src} className={`pj-gallery__item pj-gallery__item--${g.kind}`}>
              <div className="pj-gallery__media">
                <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes={g.kind === "phone" ? "(max-width: 899px) 60vw, 22vw" : "(max-width: 899px) 90vw, 38vw"} unoptimized />
              </div>
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </section>
        <section className="pg-work__built">
          <h2 className="display-m">
            What we <em>built.</em>
          </h2>
          <ol className="pg-work__built-cards">
            {p.built.map((line, i) => (
              <li key={line} className="pg-work__built-card notch">
                <span className="pg-work__built-num">0{i + 1}</span>
                <p>{line}</p>
              </li>
            ))}
          </ol>
          <p className="pg-work__caveat">{p.caveat}</p>
        </section>
        <section className="pg-row pg-row--flush">
          <h2 className="display-m">
            {p.closer.title} <em>{p.closer.em}</em>
          </h2>
          <div className="pg-row__body">
            <p>{p.closer.body}</p>
            <TLink className="arrow-link" href={p.closer.link.href}>
              {p.closer.link.label} <span aria-hidden>→</span>
            </TLink>
          </div>
        </section>
        <section className="pg-work__closer">
          <h2 className="display-m">
            Discuss your <em>website.</em>
          </h2>
          <div className="pg-work__closer-body">
            <p>We build websites for consultants, practices and health technology teams across the UK. Share what you do and what people need to understand, so we can agree an appropriate scope.</p>
            <TLink className="btn btn--signal" href="/contact">
              Discuss your project <span aria-hidden>→</span>
            </TLink>
          </div>
        </section>
      </div>
    </>
  );
}
