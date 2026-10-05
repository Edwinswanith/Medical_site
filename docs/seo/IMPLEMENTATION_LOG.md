# Implementation log

## Phase A: technical fixes that need no new business facts (5 Oct 2026, branch `Light-Theme`)

The design, motion and content are unchanged. No new claims, locations, reviews or clients.

| Change | Files | Why |
|---|---|---|
| Canonical origin helper: `NEXT_PUBLIC_SITE_URL`, else Vercel's production domain, else localhost | `src/lib/site-url.ts` | Canonicals, sitemap and OG URLs were resolving to `http://localhost:3000` |
| robots.txt: all crawlers allowed, `/api/` disallowed, sitemap declared. No AI-training rule changed. | `src/app/robots.ts` | Was 404 |
| sitemap.xml: canonical, indexable pages only (`/`, `/contact`). No `lastmod` (no reliable dates). | `src/app/sitemap.ts` | Was 404 |
| Per-page metadata helper: title, description, canonical, full Open Graph and Twitter (Next merges shallowly, so each page gets the whole object) | `src/lib/seo.ts`, `src/app/page.tsx`, `src/app/contact/page.tsx`, `src/app/layout.tsx` | Duplicate description on /contact; no OG tags; title without service terms |
| Titles and descriptions moved into content | `src/content/site.ts` (`SEO`) | Facts live in one file |
| Home title "Websites and patient films for clinicians \| Tech Cogniverse"; contact title "Book a call about your practice \| Tech Cogniverse" | `site.ts` | Service terms in the title; "UK" left out until coverage is confirmed |
| `html lang="en-GB"` | `layout.tsx` | British-English content |
| JSON-LD: Organization (`/#organization`) + WebSite (`/#website`) on every page; WebPage on `/`, ContactPage on `/contact`. Only visible facts: name, alternate name (header wordmark), logo, email, phone. No address, area served, sameAs, LocalBusiness, reviews or ratings. `<` escaped. | `src/components/JsonLd.tsx` | No structured data at all |
| Share image 1200x630 in the site's display face (Archivo 800, OFL, committed) | `src/app/opengraph-image.tsx`, `assets/fonts/` | No preview card on LinkedIn, WhatsApp, Slack |
| Favicon, SVG icon, Apple touch icon, 512px logo for schema | `src/app/favicon.ico`, `icon.svg`, `apple-icon.png`, `public/logo.png` | Favicon was 404 |
| Real space between split heading lines (no visual change: lines are block boxes) | Hero, Templates, FilmGrid, Social, Case, Process, Footer | Raw HTML read "Your practice’smedia partner", "plainEnglish", "We dothe rest" |
| Header wordmark read from `BRAND.logo` instead of a constant in the component | `site.ts`, `Header.tsx` | One source of truth for the name |
| `npm run seo:check` validator | `scripts/seo-check.mjs`, `package.json` | Repeatable checks |

### Corrected during the work

- Audit claimed 12 template images lacked alt text. They have it on the thumbnails; the empty-alt copies are duplicate hover previews. No change made.

### Not done, on purpose

- No `llms.txt` (see `GEO_AI_SEARCH.md`).
- No GPTBot / Google-Extended / ClaudeBot rules (business decision).
- No IndexNow (2 URLs, deploy-driven changes).
- No VideoObject (all video is AI concept footage).

## Validation (5 Oct 2026, local production build with `NEXT_PUBLIC_SITE_URL=https://www.example.co.uk`)

| Check | Result | How |
|---|---|---|
| Production build | PASS | `next build` |
| Typecheck | PASS | `tsc --noEmit` |
| Lint | NOT TESTED | No ESLint configured in this repo |
| Automated test suite | NOT TESTED | None exists |
| robots.txt (200, text/plain, rules, absolute sitemap) | PASS | `seo:check` |
| sitemap.xml (200, absolute URLs on origin, each URL 200 and self-canonical) | PASS | `seo:check` |
| Titles unique, 30 to 65 chars | PASS | `seo:check` |
| Descriptions unique, 70 to 170 chars | PASS | `seo:check` |
| Canonicals absolute and self-referencing | PASS | `seo:check` |
| OG / Twitter tags, exactly one absolute og:image per page | PASS | `seo:check` + tag count |
| JSON-LD parses, every referenced `@id` defined, ids on origin, same Organization id on every page | PASS | `seo:check` |
| JSON-LD against Google Rich Results / schema.org validator | NOT TESTED | No access to external validators from this environment. Run after launch. |
| One H1 per page, no skipped heading levels, no glued words | PASS | `seo:check` |
| Every `<img>` has an alt attribute | PASS | `seo:check` (empty alt only on decorative or duplicate images) |
| Internal links resolve (200) | PASS | `seo:check` |
| External link to londonroboticsurgeon.co.uk | NOT TESTED | Blocked by this environment's network policy |
| Unknown URL returns 404 with noindex | PASS | `seo:check` |
| Redirects | N/A | No URLs changed, so none needed |
| Content visible with JS disabled | PASS | Playwright, JS off |
| Reduced motion: intro skipped, content visible, no autoplay | PASS | Playwright |
| Keyboard: skip link first, nav and Book a call reachable, focus ring drawn | PASS | Playwright |
| Mobile 390px: no horizontal overflow | PASS | Playwright |
| Split headings: no layout change | PASS | Line boxes measured + screenshot |
| Existing regression (menu focus, scroll lock, form fallback, no console errors) | PASS | `review/reg.mjs` |
| Live domain: status codes, bot protection, Search Console | NOT TESTED | No live URL |
