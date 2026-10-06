import { ItemListJsonLd, PageJsonLd } from "@/components/JsonLd";
import { absolute } from "@/lib/site-url";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TLink } from "@/components/TLink";
import { WorkCaseCard } from "@/components/WorkCaseCard";
import { WorkTemplates } from "@/components/WorkTemplates";
import { CASE, SEO } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const path = "/work";
const { title, description } = SEO.work;
export const metadata = pageMetadata({ path, title, description });

export default function WorkIndexPage() {
  return (
    <>
      <PageJsonLd path={path} type="CollectionPage" name={title} description={description} mainEntity={`${absolute(path)}#projects`} breadcrumbs />
      <ItemListJsonLd path={path} fragment="projects" name="Client website work" items={[{ name: CASE.name, path: "/work/prof-hemant-sheth" }]} />
      <section className="phero wrap editorial-hero">
        <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Work", path }]} />
        <h1 className="display-xl">
          Consultant website work and <em>specialty templates.</em>
        </h1>
        <p className="phero__intro lede">Explore the website CogniVerse Studio built for Prof. Hemant Sheth, and 12 specialty website templates for UK consultants and private practices. The templates are starting points, rather than completed client projects.</p>
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
