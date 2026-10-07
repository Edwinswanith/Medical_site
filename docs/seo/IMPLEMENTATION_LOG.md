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

## Brand pass: CogniVerse Studio (5 Oct 2026)

| Change | Files | Why |
|---|---|---|
| One name everywhere: "CogniVerse Studio" (title, header, share card, schema, footer) | `src/content/site.ts` (`BRAND`) | Brand kit tokens v1.1; resolves audit issue L3 |
| Canonical origin defaults to `https://cogniversestudio.com` (env override still possible) | `src/lib/site-url.ts` | Domain confirmed by the user; resolves T2 without a Vercel variable |
| Brand palette: paper `#f5f8fc`, navy text, slate muted, aqua-to-blue gradient for fills and strokes, accent ink `#0066b8` for small text | `src/app/globals.css` | Kit blue `#0299fa` is 2.8:1 on paper and aqua 1.3:1, so neither carries text on light |
| Navy sections (intro, curtain, presenter, footer, featured package) through a scoped token set; header turns light over them | `globals.css`, `Header.tsx`, `Presenter.tsx`, `Footer.tsx` | The cyan only reads on navy |
| Mobile: template thumbnails were 750px tall close-ups (the img height attribute overrode aspect-ratio); now 4:3 previews | `globals.css` | Bug from the earlier mobile pass, also on the dark build |
| Mobile: "Book a call" wrapped to two lines next to the longer wordmark | `globals.css` | Fits at 360px and 390px |

Validation after the pass: build PASS, typecheck PASS, `seo:check` 69/69 against `https://cogniversestudio.com`, JS off PASS, reduced motion PASS, keyboard PASS, mobile overflow PASS, existing regression PASS, no console errors.

## UI/UX fixes (5 Oct 2026)

| Change | Why |
|---|---|
| Contact details: +44 (0)7436 194150, info@cogniversestudio.com | Trust: replaced the +91 number and Gmail |
| Prof. Sheth case study moved to straight after Services; Work first in the nav and chapter rail | The only real proof sat 80% down the page, below all the concept footage |
| `/privacy` notice (UK GDPR), linked from the form consent and the footer; in the sitemap | The form collects personal data. Statements match the code: no cookies, no analytics, self-hosted fonts. **Confirm the retention wording and the delivery provider before launch.** |
| Labels 11px to 12px; every small text style raised about 1px (nothing under 10px) | Legibility for an older clinician audience |
| Muted text on the hover card tint back above 4.5:1 | Contrast |
| Numbers scene 320vh to 240vh, collage 150vh to 120vh, presenter 200vh | About 2 screens shorter; same choreography |
| Intro: full length on arrival, about 0.7 s on refresh or back/forward (read from the browser, nothing stored) | Returning visitors no longer wait 2 s every time |
| Footer on `/contact` drops "Book a call" (keeps the email) | It linked to the page you were on |
| Image reveal wipes in navy; the gradient kept for accents | Quieter scroll; the gradient stays special |
| AI-search demo question from orthopaedics (knee replacement) | The example now matches the 12 specialties |
| GEO "Open" pillar no longer claims llms.txt lets assistants in | Overclaim (see GEO_AI_SEARCH.md) |
| `.ulink` styled (contact and privacy links were unstyled) | Links looked like plain text |

Validation: build PASS, typecheck PASS, `seo:check` 99/99 (now with /privacy), JS off, reduced motion, keyboard, mobile overflow, existing regression, intro timing (2.2 s arrival, 0.77 s refresh), section order, footer per page, privacy render: all PASS. No console errors.

## Work: Arogya Studio added as a second featured case (7 Oct 2026)

| Change | Notes |
|---|---|
| Live-site audit | `docs/work/AROGYA_AUDIT.md`; captures in `review/arogya/` (gitignored). One host still blocked by this environment: `cdn1.treatwell.net` (a single Treatwell image). |
| Facts | Observed on the site: 18 pages (sitemap), 10 treatment pages, 7-question dosha quiz, structured data, WhatsApp booking. Confirmed by the user: client project; scope design, build, copy, imagery, SEO; described as a wellness practice (its own footer: not medical treatment). No results, traffic or testimonials claimed. |
| Hemant | Same wording, facts and image. The home page now scrolls inside its frame as you read (was hover-only); the case settles back as Arogya arrives; "01 / 02" index. |
| Hand-off | Arogya rises over Hemant through an arch (the shape that runs through Arogya's own site) that opens to full width. |
| Arogya | Its own palette (forest, cream, gold) via scoped tokens. Pinned stage (160vh, about 1.6 screens): real desktop page panning inside a browser frame, phone view, treatment-card and dosha details, layered with depth. Facts, built list, "View live website" (new tab, labelled) and an internal link to the websites section. |
| Exit | The Arogya panel's corners round off into "Websites that get found". |
| Motion | No new controller: everything reads the existing `[data-scrub]` --r and CSS sticky. Reduced motion and no-JS: finished, still composition, no pin. Mobile: no pin, deliberate crops. |
| Assets | About 440 KB on desktop, about 290 KB on mobile (640px page strip served below 900px), all lazy-loaded. |

QA (local production build, Chromium): desktop 1440 and 1180 sequences, mobile 390 and 360 sequences; fast, slow and reverse wheel scrolling; resize mid-pin (re-pins, re-measures); reduced motion; image decoding; external link opens the live site. Build, typecheck, `seo:check` 99/99, existing regression: PASS. Lint: NOT TESTED (no ESLint in this repo).
