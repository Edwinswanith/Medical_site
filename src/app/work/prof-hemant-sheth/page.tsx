import Image from "next/image";
import { CASE } from "@/content/site";
import { PageJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TLink } from "@/components/TLink";
import { pageMetadata } from "@/lib/seo";

const path = "/work/prof-hemant-sheth";
const title = "Prof. Hemant Sheth website project";
const description = "Explore the consultant website built for Prof. Hemant Sheth: 22 pages, 10 procedure guides, four treatment groups and a clear route through his surgical services.";
export const metadata = pageMetadata({ path, title, description });

export default function WorkPage() {
  return <>
    <PageJsonLd path={path} name={title} description={description} />
    <section className="phero wrap editorial-hero"><Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Prof. Hemant Sheth project", path }]} /><p className="label">Client website project</p><h1 className="display-xl">Prof. Hemant Sheth: <em>a specialty website.</em></h1><p className="phero__intro lede">{CASE.client}. {CASE.summary}</p><a className="arrow-link" href={CASE.live.href} target="_blank" rel="noreferrer">Visit the live website <span aria-hidden>↗</span><span className="sr-only"> (opens in a new tab)</span></a></section>
    <div className="wrap section editorial-grid"><div className="editorial-copy">
      <section><h2>A directory built around treatment</h2><p>The project organises the surgeon&apos;s work into four treatment groups: upper GI, hepatobiliary, hernia and appendicectomy. Ten procedure guides give patients a route from a treatment category to information about an operation.</p><p>The 22-page website also includes a robotic surgery explainer and a comparison page for patients considering their options.</p></section>
      <figure className="work-detail-shot"><Image src={CASE.shot.webp} alt={CASE.shot.alt} width={CASE.shot.w} height={CASE.shot.h} sizes="(max-width: 899px) 90vw, 60vw" /><figcaption>The live project homepage. View the website to explore the procedure guides.</figcaption></figure>
      <section><h2>What we built</h2><ul>{CASE.built.map(line => <li key={line}>{line}</li>)}</ul><p>The structured content, crawl rules and sitemap support discovery. They are project deliverables; we have not published measured traffic, ranking or enquiry results for this project.</p></section>
      <section><h2>A useful example for your own practice</h2><p>If you explain several procedures, a treatment directory can help patients find the relevant guide without reading every page. We agree the structure around your specialty and your actual services.</p><TLink className="arrow-link" href="/services/medical-websites">See how our medical websites are planned <span aria-hidden>→</span></TLink></section>
      <section><h2>Discuss your website</h2><p>We build websites for consultants and practices across the UK. Share your specialty, current site and what patients need to understand so we can agree an appropriate scope.</p><TLink className="btn btn--signal" href="/contact">Discuss your project <span aria-hidden>→</span></TLink></section>
    </div><aside className="editorial-aside"><p className="label">Project scope</p><dl>{CASE.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd className="display-m">{fact.value}</dd></div>)}</dl><TLink className="ulink" href="/services/medical-websites">Medical websites</TLink></aside></div>
  </>;
}
