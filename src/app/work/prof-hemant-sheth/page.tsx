import { JsonLd, ORG_ID, PageJsonLd } from "@/components/JsonLd";
import { CASE, SEO } from "@/content/site";
import { absolute } from "@/lib/site-url";
import { pageMetadata } from "@/lib/seo";
import { WorkHero } from "@/components/WorkHero";
import { WorkScreenshot } from "@/components/WorkScreenshot";
import { WorkFacts } from "@/components/WorkFacts";
import { WorkDirectory } from "@/components/WorkDirectory";
import { WorkBuilt } from "@/components/WorkBuilt";
import { WorkCloser } from "@/components/WorkCloser";

const path = "/work/prof-hemant-sheth";
const { title, description } = SEO.project;
export const metadata = pageMetadata({ path, title, description });

export default function WorkPage() {
  return (
    <>
      <PageJsonLd path={path} name={title} description={description} mainEntity={`${absolute(path)}#project`} image={CASE.shot} breadcrumbs />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "CreativeWork", "@id": `${absolute(path)}#project`,
        name: "Prof. Hemant Sheth consultant website", description: CASE.summary,
        url: CASE.live.href, creator: { "@id": ORG_ID }, inLanguage: "en-GB",
        mainEntityOfPage: { "@id": `${absolute(path)}#webpage` }, image: absolute(CASE.shot.webp),
      }} />
      <section className="pg-work__hero-wrap">
        <WorkHero />
        <WorkScreenshot />
      </section>
      <div className="pg-work__body">
        <section className="pg-row pg-row--flush">
          <h2 className="display-m">The website&apos;s <em>purpose.</em></h2>
          <div className="pg-row__body">
            <p>The website brings Prof. Hemant Sheth&apos;s surgical services and procedure information into one clear structure. Patients can move from a treatment group to a relevant procedure guide, then find how to contact his practice.</p>
            <p>CogniVerse Studio&apos;s delivered work is the website and its content architecture. The project facts below describe what was built; they do not measure changes in clinical outcomes, search rankings or enquiries.</p>
          </div>
        </section>
        <WorkFacts />
        <WorkDirectory />
        <WorkBuilt />
        <WorkCloser />
      </div>
    </>
  );
}
