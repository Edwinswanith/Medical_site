# Implementation log

This records the 5 October 2026 implementation and its measurements. See the root `SEO-GEO-AUDIT.md` and `docs/seo/validation-2026-10-06.json` for the current eleven-page implementation and optional studio llms.txt directory.

5 October 2026. Latest main pulled to `8655bbc` before implementation. The user's “incorporate all the feedbacks” authorised the structural/content changes; “all area in UK” confirmed national coverage. Implementation was validated locally before the user's subsequent instruction to commit and push it to main. This log records local checks; deployment, external account configuration and real enquiry delivery are not verified.

## What changed

| Change | Main files | Purpose |
|---|---|---|
| Consistent www canonical origin, including legacy apex environment values | src/lib/site-url.ts; .env.example | Match the inspected live HTTPS redirect destination |
| Service hub and four distinct service pages | src/content/services.ts; src/components/ServicePage.tsx; src/app/services/* | Give each actual offer a useful commercial destination with deliverables, process, evidence limits and buyer questions |
| Factual About and approved website project | src/app/about/page.tsx; src/app/work/prof-hemant-sheth/page.tsx | Explain identity/process and show the existing client work without invented credentials or outcome metrics |
| Visible UK-wide coverage | site.ts; service content; About; contact; footer | Reflect the user's confirmation consistently |
| Connected Service and visible BreadcrumbList schema | JsonLd.tsx; Breadcrumbs.tsx; ServicePage.tsx | Tie the provider, offer and page together using stable IDs |
| Deliberate internal links and ten-page sitemap | NAV/SERVICES; Footer; Case; Templates; sitemap.ts | Connect services, project, About, contact and related services; preserve homepage anchors |
| Vercel aliases/previews receive noindex, follow | next.config.ts | Keep alternate deployment addresses out of search indexing while preserving the primary domain |
| GEO claims describe eligibility, not guaranteed recommendations | src/content/site.ts | Remove outcome implications; retain the labelled hypothetical illustration |
| Native POST enquiry fallback, safe state-only redirects and JSON support | EnquiryForm.tsx; api/enquiry/route.ts; contact/page.tsx | Support enquiries without JavaScript and keep personal details out of URLs |
| Shape/type/permission/length/honeypot validation; bounded body stream | src/lib/enquiry.ts; api/enquiry/route.ts | Reject malformed or oversized submissions before delivery |
| Provider timeout and honest result handling | src/lib/contact.ts | Only an actual provider 2xx counts as success; unavailable and failed delivery remain errors |
| Static watchdog fallback and scroll unlock | layout.tsx; Motion.tsx; globals.css | Reveal all content after a delayed/failed bundle or incomplete intro, without leaving CSS fade/reveal states active |
| Mobile grid/headline/header refinements | globals.css | Fit headline, enquiry CTA and navigation at 320px and 390px; the narrowest header uses the menu for its call link |
| Keyboard menu trap and background inert state | Header.tsx | Support Enter, forward/backward Tab, Escape and focus return |
| Reduced-motion pointer/scroll behaviour | Cursor; Magnetic; Templates; BackToTop; ChapterRail | Avoid pointer effects and smooth-scroll transitions under reduced motion |
| Responsive media, dimensions and deferred posters | Hero; MediaSwap; Templates; Collage; Case; project page | Reduce image downloads and reserve space without replacing approved visuals |
| Hero clips begin after the intro, pause when hidden; shorter phone intro | Hero.tsx; Preloader.tsx | Give critical content initial bandwidth while retaining the signature animation |
| Readable minimum contrast for scrub text | globals.css | Fix the measured accessibility failure while retaining text motion |
| Stronger HTTP/HTML audit and regression/integration/browser tooling | scripts/*; tests/*; eslint.config.mjs; package.json | Make checks repeatable and make failures return nonzero |
| Current documentation and roadmap | README.md; docs/seo/* | Replace stale brand/route/audit information with this implementation and factual owner dependencies |

No existing public URL was renamed or removed, so there are no new legacy-path redirects. The homepage section IDs remain. No location pages, generated articles, fabricated testimonials, unverified sameAs, ratings, priceRange or healthcare-provider schema were added. The original robots policy and its training-crawler permissions remain unchanged. No studio llms.txt or IndexNow key/notification system was added.

## Validation results

Results below were actually executed against the production build. PASS is scoped to the described check; it is not a ranking or legal-compliance claim.

| Check | Result | Evidence / limit |
|---|---|---|
| Production build | PASS | Next 16.3.8; all ten public pages generated; contact/API server-rendered |
| Lint | PASS | ESLint CLI; zero errors and warnings in the final run |
| Typecheck | PASS | tsc --noEmit |
| Automated regression tests | PASS | Eight tests: malformed enquiries, permission/contact data, bounds/bot checks, valid normalisation, missing media, canonical/schema/heading failures, fragments and bad JSON-LD/alt/dimensions |
| Internal/external links and fragments | PASS | Production HTTP audit, including real project and ICO links |
| Sitemap and robots | PASS | Ten canonical public routes; inventory coverage; wildcard public crawl and API exclusion |
| Metadata and canonicals | PASS | Unique title/description, absolute clean canonical and og:url, query canonical consistency |
| JSON-LD | PASS | Parses, unique IDs, references resolve, Service provider and visible description/UK coverage, visible breadcrumbs |
| Heading hierarchy and alt audit | PASS | One main H1, no skipped levels, alt attributes and media dimensions |
| Images and icon/share assets | PASS | Referenced images return image responses; all published local media exists and is nonempty |
| Redirects / unknown URL | PASS locally | Slash variants redirect to clean path; unknown path is 404/noindex |
| Primary and preview indexing headers | PASS locally | Native HTTP Host tests: Vercel alias noindex, primary host indexable |
| Aggregate HTTP/HTML checks | PASS | 766 PASS, 0 FAIL; failures were observed to exit nonzero during development |
| JSON/native/multipart enquiry delivery | PASS | Isolated local webhook: 2xx success, 500 failure; no external messages |
| Unconfigured enquiry provider | PASS | Isolated blank provider: JSON 503 and native unavailable redirect; zero provider calls |
| Mobile and desktop browser rendering | PASS | 320/390/1440px; no clipped headline, navigation or CTA; service, About, contact and project screenshots |
| Reduced motion | PASS | Static content, no decorative video source/autoplay, no hidden reveals |
| Keyboard navigation | PASS | Enter opens menu; Tab/Shift-Tab wrap; background inert; Escape closes and returns focus |
| Normal animation/navigation | PASS | Intro and curtain navigation finish and unlock scrolling |
| Delayed JavaScript | PASS | External bundles blocked; watchdog reveals contact and homepage immediately into static state after ten seconds |
| JavaScript disabled | PASS | Homepage/contact readable, boot marker absent, native method/action present |
| Browser errors | PASS | No uncaught page errors in the final 15-scenario run |
| Live redirect probes | PASS for observation | HTTP apex 308 → HTTPS apex 308 → HTTPS www 200; Vercel alias 200. Two-hop HTTP chain remains an operational refinement |
| Crawler user-agent probes | PASS for observation | Existing live homepage returned 200 for Googlebot, Bingbot and OAI-SearchBot strings; actual crawler IP/firewall access NOT TESTED |
| Production package audit | PASS | npm audit --omit=dev: zero reported vulnerabilities at check time |
| All dependency audit | FAIL / upstream tooling | Five high advisory entries in the dev-only Next ESLint → fast-glob/micromatch/braces chain. Registry's braces latest was 3.0.3; no patched version available. No forced framework/config downgrade was applied |
| Privacy/business fact completeness | NOT TESTED / owner confirmation needed | Provider identity, real retention, full controller/legal identity and international arrangements not supplied; unsupported deletion/transfer assurances removed |
| GBP, Search Console, Bing account setup | NOT TESTED | No authorised account access or changes |
| Google/Schema.org external validators | NOT TESTED | Local JSON-LD checks passed; external service-specific validation remains a launch action |
| Field CWV, indexing, rankings, leads and AI citations | NOT TESTED | No field/account data or post-deployment observations |

## Performance measurements

Lighthouse local production homepage, normal motion. Mobile uses simulated 150ms RTT, approximately 1.6Mbps throughput and 4× CPU slowdown, 412×823 at 1.75 device scale. Desktop uses the Lighthouse desktop preset. These are single lab runs, not field measurements or repeatable ranking scores. Mobile was measured after the media optimisations, before the final fallback-only CSS refinement; final desktop and browser checks include that refinement.

| Metric | Mobile | Desktop | Assessment |
|---|---|---|---|
| Performance score | 91/100 | 97/100 | Diagnostic only |
| Accessibility score | 100/100 | 100/100 | Automated scope; not a full accessibility certification |
| SEO score | 100/100 | 100/100 | Lighthouse checks; not a ranking score |
| LCP | 3.46s | 1.00s | Mobile FAIL against ≤2.5s target; desktop PASS in this run |
| CLS | 0 | 0.0027 | PASS against ≤0.1 lab target |
| Total blocking time | 8.5ms | 0ms | Low lab main-thread blocking; does not measure field INP |
| INP | NOT TESTED | NOT TESTED | Requires interaction/field evidence |
| Total transferred payload | 1,100,576 bytes | 3,644,179 bytes | Desktop retains two decorative clips; mobile loads the smaller single clip |

Mobile transfer breakdown: JavaScript 213,216 bytes, fonts 162,501 bytes, video 405,855 bytes, images 231,582 bytes. The first mobile run in this implementation pass transferred 1,441,237 bytes, had 4.21s LCP and accessibility 96; it is not a measurement of the untouched original site. Removing duplicate full-size posters, deferring hero clips and fixing contrast improved these measured values. No canvas/WebGL/3D runtime exists to profile.

Remaining performance work: profile real production devices and critical font/animation timing before changing the signature motion. Mobile lab LCP still exceeds the target; field status must remain unclaimed. See POST_LAUNCH_CHECKLIST.

Validation: build PASS, typecheck PASS, `seo:check` 99/99 (now with /privacy), JS off, reduced motion, keyboard, mobile overflow, existing regression, intro timing (2.2 s arrival, 0.77 s refresh), section order, footer per page, privacy render: all PASS. No console errors.

## Work: Arogya Studio added as a second featured case (7 Oct 2026)

| Change | Notes |
|---|---|
| Live-site audit | `docs/work/AROGYA_AUDIT.md`; captures in `review/arogya/` (gitignored). One host still blocked by this environment: `cdn1.treatwell.net` (a single Treatwell image). |
| Facts | Observed on the site: 18 pages (sitemap), 10 treatment pages, 7-question dosha quiz, structured data, WhatsApp booking. Confirmed by the user: client project; scope design, build, copy, imagery, SEO; described as a wellness practice (its own footer: not medical treatment). No results, traffic or testimonials claimed. |
| Hemant | Same wording, facts and image. The home page now scrolls inside its frame as you read (was hover-only); the case settles back as Arogya arrives; "01 / 02" index. |
| Hand-off | Arogya rises over Hemant through an arch (the shape that runs through Arogya's own site) that opens to full width. |
| Arogya | Its own palette (forest, cream, gold) via scoped tokens. One-screen stage, no pin (shortened at the user's request, 7 Oct 2026): real desktop page panning inside a browser frame, phone view, treatment-card and dosha details, layered with depth. Facts, built list, "View live website" (new tab, labelled) and an internal link to the websites section. |
| Exit | The Arogya panel's corners round off into "Websites that get found". |
| Motion | No new controller: everything reads the existing `[data-scrub]` --r and CSS sticky. Reduced motion and no-JS: finished, still composition. Mobile: no pin, deliberate crops. |
| Assets | About 440 KB on desktop, about 290 KB on mobile (640px page strip served below 900px), all lazy-loaded. |

QA (local production build, Chromium): desktop 1440 and 1180 sequences, mobile 390 and 360 sequences; fast, slow and reverse wheel scrolling; resize mid-pin (re-pins, re-measures); reduced motion; image decoding; external link opens the live site. Build, typecheck, `seo:check` 99/99, existing regression: PASS. Lint: NOT TESTED (no ESLint in this repo).

## Reproduce

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run start -- --port 3100
npm run seo:check -- http://localhost:3100 https://www.cogniversestudio.com
npm run enquiry:check
npm run browser:check -- http://localhost:3100
```

The in-app browser backend was unavailable; local Chrome's debugging protocol provided the browser checks and screenshots. The browser script uses no Playwright fallback. Evidence is saved in the Codex workspace's `seo-validation` visualisation folder; a compact durable result is saved as `docs/seo/validation-results.json`. `.tmp` is ignored for future local screenshots. Real external delivery, deployment and account setup are separate authorised actions.

## Outstanding owner and hosting work

Confirm provider/retention/controller details before enabling real form delivery and completing privacy information. Supply genuine film/presenter/social proof, office/in-person arrangements for any GBP decision, legal identity and verified profiles if applicable. Review Vercel's HTTP apex redirect chain. Deploy this code, rerun the live checks and use the launch checklist for search accounts. No ranking outcome is promised.

## Project pages: Arogya Studio and Cogniverse (8 Oct 2026)

| Change | Notes |
|---|---|
| `/work/arogya-studio`, `/work/cogniverse` | Same editorial layout as `/work/prof-hemant-sheth` (left untouched), driven by `src/content/projects.ts` through `ProjectPage`. Full page strip in the frame (peek on first view and hover), purpose, facts, structure, a gallery of real captures (phone view and two details), what we built with its caveat, close. |
| Structured data | WebPage with breadcrumbs, and the website as a CreativeWork with the studio as creator, as on the Hemant page. No results, reviews or ratings. |
| `/work` | Title and intro cover all three projects; Hemant card, then the two new cards; ItemList of three. |
| Homepage | Arogya links to its project page and to `/work`. Cogniverse is not on the homepage (project-pages layout chosen by the user). |
| Sitemap, llms.txt | Both new pages through `PUBLIC_PAGES`; sitemap images are the hero captures. |
| Labelling | Cogniverse: "Built by CogniVerse Studio", not "Client" (see `docs/work/COGNIVERSE_AUDIT.md`). |

Validation: build, typecheck, lint (0 errors), unit tests 15/15, `seo:check` 1,816 pass. 3 external-link fails are environment network blocks or proxy drops (londonroboticsurgeon.co.uk, ico.org.uk, and a dropped tunnel to cogniversetech.com, which answers 200 directly). Desktop and mobile captures of both pages and `/work`: no overflow, no broken images, no console errors.
