/**
 * The canonical origin, no trailing slash. Set NEXT_PUBLIC_SITE_URL to the production
 * domain (e.g. https://www.example.co.uk). On Vercel it falls back to the project's
 * production domain, so canonicals and the sitemap never point at a preview or localhost.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/+$/, "");

export const absolute = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;
