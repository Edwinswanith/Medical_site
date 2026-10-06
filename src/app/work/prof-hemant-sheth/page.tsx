import { PageJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { WorkHero } from "@/components/WorkHero";
import { WorkScreenshot } from "@/components/WorkScreenshot";
import { WorkFacts } from "@/components/WorkFacts";
import { WorkDirectory } from "@/components/WorkDirectory";
import { WorkBuilt } from "@/components/WorkBuilt";
import { WorkCloser } from "@/components/WorkCloser";

const path = "/work/prof-hemant-sheth";
const title = "Prof. Hemant Sheth website project";
const description = "Explore the consultant website built for Prof. Hemant Sheth: 22 pages, 10 procedure guides, four treatment groups and a clear route through his surgical services.";
export const metadata = pageMetadata({ path, title, description });

export default function WorkPage() {
  return (
    <>
      <PageJsonLd path={path} name={title} description={description} />
      <section className="pg-work__hero-wrap">
        <WorkHero />
        <WorkScreenshot />
      </section>
      <div className="pg-work__body">
        <WorkFacts />
        <WorkDirectory />
        <WorkBuilt />
        <WorkCloser />
      </div>
    </>
  );
}
