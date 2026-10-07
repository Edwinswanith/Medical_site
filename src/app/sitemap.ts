import type { MetadataRoute } from "next";
import { absolute } from "@/lib/site-url";
import { PUBLIC_PAGES } from "@/content/pages";
import { CASE, TEMPLATES } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Original project/template imagery only; no decorative concept videos or invented dates.
  return PUBLIC_PAGES.map(page => ({
    url: absolute(page.path),
    ...(page.path === "/work/prof-hemant-sheth" ? { images: [absolute(CASE.shot.webp)] } : {}),
    ...(page.path === "/work" ? { images: [absolute(CASE.shot.webp), ...TEMPLATES.map(template => absolute(template.img.webp))] } : {}),
  }));
}
