import { BRAND, PROCESS } from "@/content/site";
import { PUBLIC_PAGES } from "@/content/pages";
import { absolute } from "@/lib/site-url";

/**
 * Optional public directory for tools that choose to read it. It is not an indexing requirement
 * or a promise of AI citations. Generated from the same published-page inventory as the sitemap.
 */
export const dynamic = "force-static";

const link = (label: string, path: string, note: string) => `- [${label}](${absolute(path)}): ${note}`;
const section = (name: string) => PUBLIC_PAGES.filter(page => page.section === name)
  .map(page => link(page.label, page.path, page.description));

function llms(): string {
  return [
    `# ${BRAND.name}`,
    "",
    `> ${BRAND.name} makes medical websites, patient education films, consent-based AI presenters and social content for clinicians and private practices across the United Kingdom.`,
    "",
    "This is a healthcare media studio, not a healthcare provider. Its website describes business services, not personal medical advice. Film and presenter previews are labelled AI-generated concepts; the Prof. Hemant Sheth website is approved client work.",
    "",
    `How we work: ${PROCESS.safeguards.join(". ")}. Scope, price and timing are agreed in a project proposal.`,
    "",
    `Contact: ${BRAND.email} · ${BRAND.phone.display} · ${BRAND.responseTime}.`,
    "",
    "## Overview",
    "",
    ...section("overview"),
    "",
    "## Services",
    "",
    ...section("services"),
    "",
    "## Work",
    "",
    ...section("work"),
    "",
    "## About and contact",
    "",
    ...section("about"),
    "",
    "## Optional",
    "",
    ...section("optional"),
    "",
  ].join("\n");
}

export function GET() {
  return new Response(llms(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
