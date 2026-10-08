import { notFound } from "next/navigation";
import { JsonLd, ORG_ID, PageJsonLd } from "./JsonLd";
import { ProjectPage } from "./ProjectPage";
import { projectBySlug } from "@/content/projects";
import { absolute } from "@/lib/site-url";
import { pageMetadata } from "@/lib/seo";

/** Metadata for a project page, from its content entry. */
export function projectMetadata(slug: string) {
  const p = projectBySlug(slug);
  if (!p) throw new Error(`Unknown project: ${slug}`);
  return pageMetadata({ path: `/work/${slug}`, ...p.seo });
}

/** A project page with the same structured data as the Prof. Hemant Sheth page: the page, and the website as a creative work. */
export function ProjectRoute({ slug }: { slug: string }) {
  const p = projectBySlug(slug);
  if (!p) notFound();
  const path = `/work/${slug}`;
  return (
    <>
      <PageJsonLd path={path} name={p.seo.title} description={p.seo.description} mainEntity={`${absolute(path)}#project`} image={{ webp: p.hero.src, w: p.hero.w, h: p.hero.h, alt: p.hero.alt }} breadcrumbs />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "@id": `${absolute(path)}#project`,
          name: `${p.name} website`,
          description: p.summary,
          url: p.live.href,
          creator: { "@id": ORG_ID },
          inLanguage: "en-GB",
          mainEntityOfPage: { "@id": `${absolute(path)}#webpage` },
          image: absolute(p.hero.src),
        }}
      />
      <ProjectPage project={p} />
    </>
  );
}
