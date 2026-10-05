import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

// Every public page is open to every crawler, search and AI alike. Policy for AI-training
// crawlers (GPTBot, Google-Extended, ClaudeBot) is a business decision: add rules here once made.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
