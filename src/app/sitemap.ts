import type { MetadataRoute } from "next";
import { absolute } from "@/lib/site-url";

// Canonical, indexable pages only. Add each new page here when it ships.
const PAGES = [
  { path: "/", priority: 1 },
  { path: "/contact", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({ url: absolute(p.path), priority: p.priority }));
}
