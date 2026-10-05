# Post-launch checklist

Nothing below has been configured. Each item needs your accounts. Tick only what you have actually done.

## Before deploy

- [ ] The canonical origin is `https://cogniversestudio.com` (non-www), built in. In Vercel Domains, add both `cogniversestudio.com` and `www.cogniversestudio.com` and redirect www to the apex (308). `NEXT_PUBLIC_SITE_URL` is only needed to override it.
- [ ] Redeploy, then run `npm run seo:check -- https://<domain> https://<domain>`: expect 0 fails.
- [ ] Open `https://<domain>/robots.txt` and `/sitemap.xml`: absolute URLs on the final domain, not `*.vercel.app`.
- [ ] Preview deployments: Vercel serves `X-Robots-Tag: noindex` on preview URLs by default. Confirm with `curl -I https://<preview>.vercel.app`.

## Crawler access

- [ ] Vercel Firewall / Bot Protection / Attack Challenge Mode: confirm they are off, or that verified search bots are allowed. Test: `curl -A "Mozilla/5.0 (compatible; Googlebot/2.1)" -I https://<domain>/` and the same with `OAI-SearchBot`, `bingbot`, `PerplexityBot`: expect 200, not 403 or a challenge page.

## Google Search Console

- [ ] Add a **Domain** property (DNS TXT record at your registrar).
- [ ] Submit `https://<domain>/sitemap.xml`.
- [ ] URL Inspection on `/` and `/contact`: "URL is available to Google", user-declared canonical = Google-selected canonical, rendered screenshot shows the content.
- [ ] Rich Results Test / Schema Markup Validator on `/`: Organization detected, no errors.
- [ ] After 28 days: Core Web Vitals report (mobile). Performance report filtered by query.
- [ ] Where the reports exist in your account: AI features / generative AI performance, and multimodal search reporting. Availability varies; don't assume.

## Bing Webmaster Tools

- [ ] Import the site from Search Console (fastest) or verify by DNS.
- [ ] Submit the sitemap. URL Inspection on `/`.
- [ ] IndexNow: not implemented (see `GEO_AI_SEARCH.md`).

## Google Business Profile

- [ ] **Only if** the business has a real UK location with in-person contact, or travels to clients. A remote studio is not eligible; a virtual office breaks the guidelines. See `LOCAL_SEO.md`.

## Consistency

- [ ] One brand name on the site, LinkedIn, Companies House, email signature and any directory.
- [ ] Add each real profile URL to `sameAs` in `src/components/JsonLd.tsx`.

## Social previews

- [ ] Paste the URL into LinkedIn Post Inspector and the Facebook Sharing Debugger: the card shows the share image and title.
