import Image from "next/image";
import { SERVICE_PAGES } from "@/content/services";
import { SERVICES } from "@/content/site";
import { Packages } from "@/components/Packages";
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
