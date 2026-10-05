import { SERVICE_PAGES, type ServicePageContent } from "@/content/services";
import { ORG_ID, JsonLd, PageJsonLd } from "./JsonLd";
import { Breadcrumbs } from "./Breadcrumbs";
import { TLink } from "./TLink";
import { absolute } from "@/lib/site-url";

export function ServicePage({ service }: { service: ServicePageContent }) {
  const path = `/services/${service.slug}`;
  const serviceId = `${absolute(path)}#service`;
  return <>
    <PageJsonLd path={path} name={service.title} description={service.description} mainEntity={serviceId} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", "@id": serviceId, name: service.label, serviceType: service.heading, description: service.intro, url: absolute(path), provider: { "@id": ORG_ID }, areaServed: { "@type": "Country", name: "United Kingdom" }, mainEntityOfPage: { "@id": `${absolute(path)}#webpage` } }} />
    <section className="phero wrap editorial-hero">
      <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Services", path: "/services" }, { label: service.label, path }]} />
      <h1 className="display-xl">{service.heading}</h1>
      <p className="phero__intro lede">{service.intro}</p>
      <TLink className="btn btn--signal" href="/contact">Discuss your project <span aria-hidden>→</span></TLink>
    </section>
    <div className="wrap section editorial-grid">
      <div className="editorial-copy">
        {service.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
        <section><h2>What is included</h2><ul>{service.includes.map(item => <li key={item}>{item}</li>)}</ul></section>
        <section><h2>{service.slug === "medical-websites" ? "Real client work" : "See the approach before you commission"}</h2><p>{service.proof}</p><TLink className="arrow-link" href={service.proofHref}>{service.proofLabel} <span aria-hidden>→</span></TLink></section>
        <section><h2>Questions before you begin</h2>{service.questions.map(item => <div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</section>
      </div>
      <aside className="editorial-aside"><p className="label">Related services</p><nav aria-label="Related services">{service.related.map(slug => { const related = SERVICE_PAGES.find(item => item.slug === slug)!; return <p key={slug}><TLink className="ulink" href={`/services/${slug}`}>{related.label}</TLink></p>; })}</nav><p>Working with consultants and practices across the UK.</p><TLink className="arrow-link" href="/contact">Book a call <span aria-hidden>→</span></TLink></aside>
    </div>
  </>;
}
