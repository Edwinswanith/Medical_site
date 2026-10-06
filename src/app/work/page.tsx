import { PageJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TLink } from "@/components/TLink";
import { WorkCaseCard } from "@/components/WorkCaseCard";
import { WorkTemplates } from "@/components/WorkTemplates";
import { SEO } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const path = "/work";
const { title, description } = SEO.work;
export const metadata = pageMetadata({ path, title, description });

export default function WorkIndexPage() {
  return (
    <>
      <PageJsonLd path={path} type="CollectionPage" name={title} description={description} />
      <section className="phero wrap editorial-hero">
        <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Work", path }]} />
        <h1 className="display-xl">
          Built, launched, <em>in use.</em>
        </h1>
        <p className="phero__intro lede">Real client work, and the 12 specialty templates we use as starting points.</p>
      </section>
      <WorkCaseCard />
      <WorkTemplates />
      <section className="sp-index-close wrap">
        <p>The scope, budget and timing are agreed in your proposal.</p>
        <TLink className="btn btn--signal" href="/contact">
          Tell us what you need <span aria-hidden>→</span>
        </TLink>
      </section>
    </>
  );
}
