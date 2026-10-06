import Image from "next/image";
import { SERVICE_PAGES, type ServicePageContent } from "@/content/services";
import { CASE, HERO_FILM, SERVICES, TEMPLATES } from "@/content/site";
import { absolute } from "@/lib/site-url";
import { ORG_ID, JsonLd, PageJsonLd } from "./JsonLd";
import { Breadcrumbs } from "./Breadcrumbs";
import { TLink } from "./TLink";
import { MediaSwap } from "./MediaSwap";
import { BrowserFrame } from "./BrowserFrame";
import { Included, Narrative } from "./ServiceSections";

const serviceCard = (slug: string) => SERVICES.find((s) => s.href === `/services/${slug}`);

/** Each service shows its own product: a site, a film, the presenter, a short on a phone. */
function HeroVisual({ slug }: { slug: string }) {
  if (slug === "medical-websites") {
    const t = TEMPLATES[0];
    return <BrowserFrame url="yourname.co.uk" src={t.img.webp} alt={`${t.name} website template`} w={1200} h={750} priority />;
  }
  if (slug === "social-content") {
    return (
      <div className="sp-phone">
        <MediaSwap media={HERO_FILM.vertical} trigger="view" priority />
      </div>
    );
  }
  const card = serviceCard(slug);
  if (!card) return null;
  return (
    <figure className="sp-film notch">
      <MediaSwap media={card.media} trigger="view" priority showAiLabel={slug !== "ai-presenter"} />
      {slug === "ai-presenter" && <figcaption className="sp-film__ai label">AI-generated person. Not a client or a clinician.</figcaption>}
    </figure>
  );
}

function Proof({ service }: { service: ServicePageContent }) {
  if (service.slug === "medical-websites") {
    return (
      <section className="sp-proof wrap">
        <div className="sp-proof-copy">
          <p className="label">Prof. Hemant Sheth project</p>
          <h2 className="display-m">
            Real client <em>work.</em>
          </h2>
          <p className="sp-proof-desc">{service.proof}</p>
          <dl className="sp-proof-facts">
            {CASE.facts.map((fact) => (
              <div key={fact.label} className="sp-proof-fact">
                <dt className="sp-proof-fact-label">{fact.label}</dt>
                <dd className="sp-proof-fact-value">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <TLink className="arrow-link" href={service.proofHref}>
            {service.proofLabel} <span aria-hidden>→</span>
          </TLink>
        </div>
        <BrowserFrame url={CASE.live.label} src={CASE.shot.webp} alt={CASE.shot.alt} w={CASE.shot.w} h={CASE.shot.h} />
      </section>
    );
  }
  return (
    <section className="sp-proof sp-proof--statement wrap">
      <h2 className="display-m">
        See the approach before <em>you commission.</em>
      </h2>
      <div className="sp-proof-copy">
        <p className="sp-proof-desc">{service.proof}</p>
        <TLink className="btn btn--signal" href={service.proofHref}>
          {service.proofLabel} <span aria-hidden>→</span>
        </TLink>
      </div>
    </section>
  );
}

export function ServicePage({ service }: { service: ServicePageContent }) {
  const path = `/services/${service.slug}`;
  const serviceId = `${absolute(path)}#service`;
  return (
    <>
      <PageJsonLd path={path} name={service.title} description={service.description} mainEntity={serviceId} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", "@id": serviceId, name: service.label, serviceType: service.heading, description: service.intro, url: absolute(path), provider: { "@id": ORG_ID }, areaServed: { "@type": "Country", name: "United Kingdom" }, mainEntityOfPage: { "@id": `${absolute(path)}#webpage` } }} />

      <section className="sp-hero editorial-hero" data-service={service.slug}>
        <div className="sp-hero__copy">
          <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Services", path: "/services" }, { label: service.label, path }]} />
          <h1 className="display-xl">{service.heading}</h1>
          <p className="sp-hero__intro">{service.intro}</p>
          <TLink className="btn btn--signal" href="/contact">
            Discuss your project <span aria-hidden>→</span>
          </TLink>
        </div>
        <div className="sp-hero__visual">
          <HeroVisual slug={service.slug} />
        </div>
      </section>

      <Narrative service={service} />
      <Included service={service} />

      <Proof service={service} />

      <section className="sp-accordion wrap">
        <h2 className="display-m">Questions before you begin</h2>
        <div className="sp-accordion-list">
          {service.questions.map((item) => (
            <details key={item.question} className="sp-accordion-item">
              <summary className="sp-accordion-trigger">
                <h3>{item.question}</h3>
                <span className="sp-accordion-icon" aria-hidden />
              </summary>
              <p className="sp-accordion-answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="sp-related-section wrap" aria-labelledby="sp-related-h">
        <h2 id="sp-related-h" className="display-m">
          Other <em>services.</em>
        </h2>
        <ul className="sp-related-cards">
          {service.related.map((slug) => {
            const related = SERVICE_PAGES.find((item) => item.slug === slug)!;
            const card = serviceCard(slug);
            return (
              <li key={slug} className="sp-related-card notch">
                {card && (
                  <Image className="sp-related-card__img" src={card.media.still.webp} alt="" width={card.media.still.w} height={card.media.still.h} sizes="(max-width: 899px) 90vw, 30vw" />
                )}
                <p className="label">{related.label}</p>
                <h3>
                  <TLink href={`/services/${slug}`}>{related.heading}</TLink>
                </h3>
                <span className="arrow-link" aria-hidden>
                  Explore →
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
