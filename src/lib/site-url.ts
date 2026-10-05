import { BRAND } from "@/content/site";

/**
 * The canonical origin, no trailing slash: https://cogniversestudio.com. NEXT_PUBLIC_SITE_URL
 * overrides it (e.g. to test a staging domain). Canonicals and the sitemap never point at a
 * preview deployment or localhost.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || `https://${BRAND.domain}`).replace(/\/+$/, "");

export const absolute = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;
