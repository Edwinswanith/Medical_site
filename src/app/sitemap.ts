import type { MetadataRoute } from "next";
import { absolute } from "@/lib/site-url";
import { SERVICE_PAGES } from "@/content/services";

// Canonical, indexable pages only. Add each new page here when it ships.
const PAGES = [
  { path: "/", priority: 1 },
  { path: "/contact", priority: 0.6 },
  { path: "/privacy", priority: 0.2 },
  { path: "/about", priority: 0.5 },
  { path: "/services", priority: 0.8 },
  ...SERVICE_PAGES.map(service => ({ path: `/services/${service.slug}`, priority: 0.8 })),
  { path: "/work", priority: 0.7 },
  { path: "/work/prof-hemant-sheth", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({ url: absolute(p.path), priority: p.priority }));
}
