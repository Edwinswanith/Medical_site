import { BRAND, CASE, HERO, PROCESS, SEO } from "@/content/site";
import { SERVICE_PAGES } from "@/content/services";
import { absolute } from "@/lib/site-url";

/**
 * /llms.txt (llmstxt.org): a plain-text map of the site for AI assistants, the same file the
 * studio builds for clients. Generated from the site's own content so it never drifts from the pages.
 */
export const dynamic = "force-static";

const link = (label: string, path: string, note: string) => `- [${label}](${absolute(path)}): ${note}`;

function llms(): string {
  return [
    `# ${BRAND.name}`,
    "",
    `> ${HERO.intro}`,
    "",
    `How we work: ${PROCESS.safeguards.join(". ")}.`,
    "",
    `Contact: ${BRAND.email} · ${BRAND.phone.display} · ${BRAND.responseTime}.`,
    "",
    "## Services",
    "",
    link("All services", "/services", "Websites, patient education films, AI presenters and social content, and three ways to begin."),
    ...SERVICE_PAGES.map((s) => link(s.label, `/services/${s.slug}`, s.description)),
    "",
    "## Work",
    "",
    link("Client work and specialty templates", "/work", SEO.work.description),
    link(`${CASE.name} website project`, "/work/prof-hemant-sheth", `${CASE.client}. ${CASE.summary}`),
    "",
    "## About and contact",
    "",
    link("About the studio", "/about", SEO.about.description),
    link("Book a call", "/contact", SEO.contact.description),
    "",
    "## Optional",
    "",
    link("Privacy notice", "/privacy", SEO.privacy.description),
    "",
  ].join("\n");
}

export function GET() {
  return new Response(llms(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
