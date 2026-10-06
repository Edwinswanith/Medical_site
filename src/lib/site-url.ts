import { BRAND } from "@/content/site";
import { canonicalOrigin } from "./canonical-origin";

/**
 * The canonical origin, no trailing slash: https://www.cogniversestudio.com. NEXT_PUBLIC_SITE_URL
 * overrides it (e.g. to test a staging domain). Canonicals and the sitemap never point at a
 * preview deployment or localhost.
 */
export const SITE_URL = canonicalOrigin(process.env.NEXT_PUBLIC_SITE_URL, `https://www.${BRAND.domain}`);

export const absolute = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;
