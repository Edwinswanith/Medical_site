import type { MetadataRoute } from "next";
import { absolute } from "@/lib/site-url";
import { PUBLIC_PAGES } from "@/content/pages";
import { CASE, TEMPLATES } from "@/content/site";
import { PROJECTS } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  // Original project/template imagery only; no decorative concept videos or invented dates.
  return PUBLIC_PAGES.map(page => ({
    url: absolute(page.path),
    ...(page.path === "/work/prof-hemant-sheth" ? { images: [absolute(CASE.shot.webp)] } : {}),
    ...(page.path === "/work" ? { images: [absolute(CASE.shot.webp), ...PROJECTS.map(project => absolute(project.hero.src)), ...TEMPLATES.map(template => absolute(template.img.webp))] } : {}),
    ...(PROJECTS.some(project => page.path === `/work/${project.slug}`)
      ? { images: [absolute(PROJECTS.find(project => page.path === `/work/${project.slug}`)!.hero.src)] }
      : {}),
  }));
}
