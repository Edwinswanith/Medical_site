import { BRAND } from "@/content/site";

/**
 * The canonical origin, no trailing slash: https://www.cogniversestudio.com. NEXT_PUBLIC_SITE_URL
 * overrides it (e.g. to test a staging domain). Canonicals and the sitemap never point at a
 * preview deployment or localhost.
 */
const configured = new URL(process.env.NEXT_PUBLIC_SITE_URL || `https://www.${BRAND.domain}`);
// The live apex redirects to www. Normalize older environment values too.
if (configured.hostname === BRAND.domain) configured.hostname = `www.${BRAND.domain}`;
export const SITE_URL = configured.origin;

export const absolute = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;
