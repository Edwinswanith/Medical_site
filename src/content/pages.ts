import { SEO } from "./site";
import { SERVICE_PAGES } from "./services";

/** Published HTML pages only. Sitemap and llms.txt share this inventory. */
export const PUBLIC_PAGES = [
  { path: "/", label: "Home", ...SEO.home, section: "overview" },
  { path: "/services", label: "All services", ...SEO.services, section: "services" },
  ...SERVICE_PAGES.map(service => ({
    path: `/services/${service.slug}`, label: service.label,
    title: service.title, description: service.description, section: "services",
  })),
  { path: "/work", label: "Client work and specialty templates", ...SEO.work, section: "work" },
  { path: "/work/prof-hemant-sheth", label: "Prof. Hemant Sheth website project", ...SEO.project, section: "work" },
  { path: "/about", label: "About the studio", ...SEO.about, section: "about" },
  { path: "/contact", label: "Contact the studio", ...SEO.contact, section: "about" },
  { path: "/privacy", label: "Privacy notice", ...SEO.privacy, section: "optional" },
] as const;
