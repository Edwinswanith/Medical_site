import Image from "next/image";
import { SERVICE_PAGES } from "@/content/services";
import { SERVICES, SEO } from "@/content/site";
import { Packages } from "@/components/Packages";
import { ItemListJsonLd, PageJsonLd } from "@/components/JsonLd";
import { absolute } from "@/lib/site-url";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TLink } from "@/components/TLink";
import { pageMetadata } from "@/lib/seo";

const { title, description } = SEO.services;
export const metadata = pageMetadata({ path: "/services", title, description });

export default function ServicesPage() {
  return <>
    <PageJsonLd path="/services" type="CollectionPage" name={title} description={description} mainEntity={`${absolute("/services")}#services`} breadcrumbs />
    <ItemListJsonLd path="/services" fragment="services" name="Healthcare media services" items={SERVICE_PAGES.map(service => ({ name: service.label, path: `/services/${service.slug}` }))} />
    <section className="phero wrap editorial-hero"><Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Services", path: "/services" }]} /><h1 className="display-xl">Healthcare websites, films and <em>social content.</em></h1><p className="phero__intro lede">Websites, patient education films, AI presenters and social content for consultants and practices across the UK. Choose the support you need, or bring the work together as one project.</p></section>
    <ul className="sp-index wrap" aria-label="Our services">
      {SERVICE_PAGES.map((service) => {
        const card = SERVICES.find((s) => s.href === `/services/${service.slug}`);
        return (
          <li className="sp-index-card notch" key={service.slug}>
            {card && (
              <div className="sp-index-media">
                <Image src={card.media.still.webp} alt="" width={card.media.still.w} height={card.media.still.h} sizes="(max-width: 899px) 90vw, 45vw" />
                {card.media.ai && <span className="sp-index-ai label">AI-generated</span>}
              </div>
            )}
            <div className="sp-index-body">
              <p className="sp-index-label label">{service.label}</p>
              <h2 className="sp-index-title"><TLink href={`/services/${service.slug}`}>{service.heading}</TLink></h2>
              <p className="sp-index-intro">{service.intro}</p>
              <span className="sp-index-cta arrow-link" aria-hidden>Explore {service.label.toLowerCase()} →</span>
            </div>
          </li>
        );
      })}
    </ul>
    <Packages />
    <section className="sp-index-close wrap">
      <p>The scope, budget and timing are agreed in your proposal.</p>
      <TLink className="btn btn--signal" href="/contact">Tell us what you need <span aria-hidden>→</span></TLink>
    </section>
  </>;
}
