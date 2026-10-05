import { SERVICE_PAGES } from "@/content/services";
import { PACKAGES } from "@/content/site";
import { PageJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TLink } from "@/components/TLink";
import { pageMetadata } from "@/lib/seo";

const title = "Websites, films and content for UK practices";
const description = "Explore CogniVerse Studio's medical websites, patient films, consent-based AI presenters and social content for consultants and practices across the UK.";
export const metadata = pageMetadata({ path: "/services", title, description });

export default function ServicesPage() {
  return <>
    <PageJsonLd path="/services" name={title} description={description} />
    <section className="phero wrap editorial-hero"><Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Services", path: "/services" }]} /><h1 className="display-xl">One partner for your practice&apos;s <em>media.</em></h1><p className="phero__intro lede">Websites, patient education films, AI presenters and social content for consultants and practices across the UK. Choose the support you need, or bring the work together as one project.</p></section>
    <section className="wrap section service-index" aria-label="Our services">{SERVICE_PAGES.map(service => <article className="service-index__card notch" key={service.slug}><p className="label">{service.label}</p><h2 className="display-m"><TLink href={`/services/${service.slug}`}>{service.heading}</TLink></h2><p>{service.intro}</p><TLink className="arrow-link" href={`/services/${service.slug}`}>Explore {service.label.toLowerCase()} <span aria-hidden>→</span></TLink></article>)}</section>
    <section className="wrap section editorial-copy"><h2>Three ways to begin</h2>{PACKAGES.map(item => <section key={item.name}><h3>{item.name}</h3><p>{item.fit}</p><ul>{item.items.map(line => <li key={line}>{line}</li>)}</ul></section>)}<p>The scope, budget and timing are agreed in your proposal.</p><TLink className="btn btn--signal" href="/contact">Tell us what you need <span aria-hidden>→</span></TLink></section>
  </>;
}
