# SEO and GEO implementation audit

6 October 2026. Repository: `Edwinswanith/Medical_site`, baseline `a6577c1`. This records implemented repository changes and local production validation. It does not report a deployment, search ranking, AI citation or measured business uplift. The current audit supersedes older page counts and implementation descriptions in `docs/seo/`.

## 1. Website understanding

**Business:** CogniVerse Studio, with the approved legal name CogniVerse Ltd. This is a healthcare media supplier, not a medical practice or a provider of personal medical advice.

**Audience:** clinicians, consultants, private clinics and practice teams. **Market:** United Kingdom; existing content confirms UK-wide service coverage. London and Hertfordshire describe the case-study client's practice, not a studio office.

**Services:** specialty medical website design; patient education films; optional, consent-based AI presenters; and patient films adapted into social content for Instagram, TikTok, YouTube and Facebook. The three approved package options are Films for your site, Website with films and Full media partner.

**Architecture:** Next.js 16.3.8 App Router, React 19.3, TypeScript, server-rendered page content, GSAP/Lenis motion and framework image/font handling. Eleven public HTML pages; most are prerendered, while contact and the enquiry API run on the server. No published articles, CMS, database or analytics tag was found.

**Evidence:** one approved client website project, Prof. Hemant Sheth, with 22 pages, 10 procedure guides and four treatment groups; twelve specialty template screenshots. Approved offer figures include 16 films ready and 75 topics across 14 specialties. Public film/presenter/social footage is labelled AI-generated concept footage. No public project traffic, ranking, lead or clinical outcome measurements are available.

**Source boundary:** business facts come from `src/content/site.ts`, `src/content/services.ts` and the existing approved case-study components. No team names, credentials, offices, reviews, social profiles, prices or turnaround promises have been invented.

## 2. Problems discovered

The initial eleven-page crawl passed 887 existing checks. There was no demonstrated critical robots, sitemap, canonical or public-link failure in the local baseline. Existing SEO work was retained.

| Severity | Evidence and implication | Resolution |
|---|---|---|
| Critical | No current critical crawl/indexing failure found by the baseline checks | Preserve public crawl access, canonical paths, redirects and preview noindex |
| High | Mobile production homepage LCP exceeded the 2.5-second good threshold in the isolated baseline | Correct image delivery and measure again; final lab result is recorded below, field CWV remains unmeasured |
| High, owner dependency | Company registration/office details, privacy recipients, retention arrangements and accountable team identities are incomplete | Explicit manual TODOs; no fabricated schema or privacy assurances |
| Medium | Service/hub/work headings included vague slogans such as “Your face and voice” and “Built, launched, in use” | Use clear service and portfolio subjects while keeping typography and layouts |
| Medium | `NEXT_PUBLIC_SITE_URL` could accidentally point canonical URLs at localhost or a Vercel preview | Pure canonical-origin guard, known apex/HTTP normalisation and regression tests |
| Medium | Page entities did not reference their breadcrumb entities; service/work directories lacked structured lists; project/image relationships were implicit | Connected page/breadcrumb/list/project/image data, matched to visible content |
| Medium | Existing checks could count JSON-LD text as visible business evidence; they did not validate llms.txt, Twitter image delivery, crawler requests or sensitive-file URLs | Expanded HTTP/HTML checks and regression cases |
| Medium | No optional Google/Bing ownership-verification configuration existed | Emit tags only when real environment values are supplied |
| Medium | Homepage service cards downloaded images sized for 90vw on phones despite displaying in two columns | Context-specific `sizes`; priority handling for actual service hero imagery |
| Low | Raw brand images and deprecated Next Image `priority` usage remained | Optimised logo/intro images and eager/high-priority handling without changing artwork |
| Low | Documentation described ten pages and incorrectly stated that no studio llms.txt existed | Shared page inventory and current documentation |

## 3. Changes implemented

| Files | Change and purpose |
|---|---|
| `src/content/pages.ts`, `src/app/sitemap.ts`, `src/app/llms.txt/route.ts` | One inventory for all eleven canonical HTML pages; image sitemap entries for genuine project/template imagery; public AI directory with explicit business/audience/proof facts. No invented lastmod dates or change frequencies |
| `src/lib/canonical-origin.ts`, `src/lib/site-url.ts`, `tests/canonical-origin.test.mjs` | Protect the canonical origin from local/preview settings, credentials and insecure custom configurations; preserve a legitimate custom HTTPS origin |
| `src/lib/social-image.ts`, `src/lib/seo.ts`, `src/app/opengraph-image.tsx` | Separate social-image metadata from the renderer; explicit Twitter images/alt text, consistent canonical URLs and complete per-page sharing metadata |
| `src/app/layout.tsx`, `.env.example` | Optional real Google/Bing verification tags; no fabricated tokens, analytics or duplicated tags |
| `src/content/site.ts`, `src/content/services.ts` | Centralised hub/project metadata, explicit homepage entity description, precise service headings and useful service-fit/scope questions; privacy description no longer implies a published retention period |
| `src/components/JsonLd.tsx`, `src/components/ServicePage.tsx` | Visible legal identity and current brand mark in Organization data; reusable ItemList; page-to-breadcrumb links and accurate project image relationship |
| `src/app/services/page.tsx`, `src/app/work/page.tsx` | Clear directory H1s and connected CollectionPage/ItemList entities; template work distinguished from delivered client work |
| `src/app/about/page.tsx`, `src/components/AboutHero.tsx`, `src/app/contact/page.tsx`, `src/app/privacy/page.tsx` | Clearer About subject; consistent visible and structured breadcrumbs across every non-home page |
| `src/app/work/prof-hemant-sheth/page.tsx`, `src/components/WorkScreenshot.tsx` | Factual website-purpose/deliverable explanation and CreativeWork/ImageObject relationships; no invented results; efficient screenshot priority handling |
| `src/components/Footer.tsx` | Visible studio name, UK coverage, email, telephone and the existing approved legal name on every page |
| `src/components/MediaSwap.tsx`, `src/components/Services.tsx`, `src/components/BrowserFrame.tsx`, `src/components/Logo.tsx`, `src/components/Mark.tsx` | Context-specific responsive images, appropriate eager/high-priority hero images, smaller optimised brand downloads; existing decorative video deferral remains |
| `scripts/lib/seo-audit.mjs`, `scripts/seo-check.mjs`, `tests/seo-audit.test.mjs` | More complete social/entity/link/crawler/private-file checks; script-free visible-text evidence; optional JSON evidence report; nonzero failure exits retained |
| `scripts/browser-check.mjs` | Add 320px hub/work/presenter/social/privacy scenarios and keyboard operation of customer questions |
| `README.md`, `docs/seo/GEO_AI_SEARCH.md`, `docs/seo/SEO_AUDIT.md`, `docs/seo/IMPLEMENTATION_LOG.md`, `docs/seo/KEYWORD_MAP.md`, this audit, `SEO-CHECKLIST.md`, `SEO-CONTENT-OPPORTUNITIES.md`, `docs/seo/validation-2026-10-06.json` | Current architecture, technical decisions, source boundaries, validation and actionable next work; historical evidence clearly marked |

No established URL or homepage chapter anchor was removed. No location doorway pages, unsupported service lines, mass articles, star ratings or customer testimonials were added. The public design, intro, scroll motion, curtain navigation and concept labels remain.

## 4. Keyword and search-intent map

These are qualitative concepts inferred from the approved offer, not keyword-volume or ranking estimates. Each important page owns one primary intent. Budget questions refer to proposals, not the enquiry form's buyer budget bands as advertised prices.

| Page | Primary intent / query concept | Secondary intent / conversational question | Audience |
|---|---|---|---|
| `/` | Healthcare media partner UK; branded studio discovery | “What does CogniVerse Studio do for a practice?” | UK clinicians and practice teams |
| `/services` | Compare healthcare website/film/social support | “Should I add films to our website or commission a new site?” | Practice buyers deciding scope |
| `/services/medical-websites` | Medical website design UK | Consultant/private clinic websites; “What does a specialty website include, cost and require before launch?” | Consultants and private clinics |
| `/services/patient-films` | Patient education film production | Procedure films, transcripts; “Can films work with our existing website?” | Clinicians selecting procedure topics |
| `/services/ai-presenter` | AI presenter for UK clinicians | Consent-based face/voice avatar; “How is a presenter different from film production?” | Clinicians considering an optional presenter |
| `/services/social-content` | Social content for medical practices | Patient film shorts, captions and formats; “Do we need every platform?” | Practice teams planning channels |
| `/work` | Consultant website portfolio and specialty templates | “What real work can I assess, and what is a template?” | Buyers assessing fit and proof |
| `/work/prof-hemant-sheth` | Prof. Hemant Sheth website project | Treatment directory, procedure guides and factual delivered scope | Consultants assessing website experience |
| `/about` | CogniVerse Studio identity and process | “Who do you help, where do you work and who approves content?” | Buyers evaluating the supplier |
| `/contact` | Contact CogniVerse Studio / request proposal | Email, telephone, website/sample requests | Buyers ready to enquire |
| `/privacy` | CogniVerse Studio enquiry privacy | “What details does the form collect and how do I contact you about them?” | Visitors assessing data use |

No independent hospital service line or physical city office is established by the source material. Informational and comparison queries are answered where useful on service pages, with deeper original-content opportunities documented separately.

## 5. Structured data implemented

- **Organization, WebSite, ContactPoint:** consistent studio name, approved legal name, real email/telephone, UK service area, current brand mark and language. No unverified address, founder, credentials or sameAs profile.
- **WebPage, AboutPage, ContactPage:** canonical page IDs, page descriptions, language, website/organisation relationships and visible breadcrumbs.
- **CollectionPage and ItemList:** the services hub lists four visible services; the work directory lists the one actual client project. Twelve templates are not represented as twelve client cases.
- **Service:** each of four service pages describes its actual offer, visible introductory copy, provider, UK coverage, current H1 and page relationship.
- **BreadcrumbList:** visible breadcrumbs on every non-home HTML page, connected to the page entity and canonical destinations.
- **CreativeWork and ImageObject:** the actual Prof. Hemant Sheth website project, creator relationship, live URL and screenshot. No invented author credentials, dates, measured outcomes or reviews.

Local validation checks JSON syntax, stable/unique IDs, resolved references and correspondence to visible content. It is not a substitute for Google's Rich Results Test or the Schema.org validator on deployed URLs.

Useful visible customer questions use native disclosures. FAQPage was not added: Google retired FAQ rich results in May 2026. Decorative concept loops are not educational client videos, so no VideoObject, video sitemap or fabricated upload dates were added. Organization is appropriate to the supplied facts; eligibility for LocalBusiness/Google Business Profile requires real operational information.

## 6. GEO strategy

Important page content is returned in HTML and explains the studio, services, intended buyers, UK coverage, deliverables, reviews and next action. The first service paragraph states the answer directly. Visible questions explain real buying decisions without promising rankings, referrals, fixed prices or clinical outcomes.

Proof remains specific: an actual website project and clearly labelled specialty templates/concept media. The project explains the treatment-directory structure and distinguishes delivered content from unmeasured outcomes. Company identity and contact information are consistent across copy, metadata, footer, schema and the optional directory.

`/llms.txt` is a concise public directory derived from the page registry. It is supplementary: Google's guidance explicitly says Google Search does not use llms.txt for ranking or visibility. Readable pages, factual content, normal crawl access and consistent canonicals remain the implementation foundation.

**Crawler policy:** retain `User-Agent: *`, allow `/`, disallow `/api/`, with the canonical sitemap. This does not block Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, ClaudeBot, GPTBot or Google-Extended. No additional training or search restrictions were introduced. OAI-SearchBot search discovery and GPTBot model training are separate permissions. Local user-agent tests show no application-level block; genuine crawler IP/CDN/firewall access requires deployment logs.

No mass city pages, invented “best/leading” claims, keyword stuffing, hidden keyword copy, fabricated medical advice or speculative AI recommendations were added. No claim is made about current AI citations.

## 7. Validation and remaining opportunities

The production build, lint, type checking, fifteen regression tests, twenty-one final browser scenarios and 1,544 production HTTP/HTML checks passed. Both isolated enquiry-provider integration scenarios passed. Final browser/performance evidence is recorded in `docs/seo/validation-2026-10-06.json`; generated screenshots and full local audit output are under `.tmp/`.

Mobile Lighthouse on the production homepage used its 412×823 profile, simulated 150ms RTT, approximately 1.6Mbps throughput and 4× CPU slowdown. These are individual lab runs, not statistically established changes or field results.

| Mobile lab metric | Isolated baseline | Optimised implementation |
|---|---|---|
| LCP | 4.28 seconds | 4.07 seconds; still above the 2.5-second good threshold |
| CLS | 0 | 0 |
| Total blocking time | 4.5ms | 9.5ms; not a measurement of field INP |
| Transferred payload | 1,162,651 bytes | 1,117,793 bytes |
| Estimated image-delivery waste | About 59KB | About 13KB |

The measurable image-delivery issue was reduced. Font-preload experimentation did not improve paint timing and introduced a small layout shift, so the existing font preload configuration was retained. Further mobile LCP work needs production traces/device evidence before changing the font family or signature intro. Desktop measurements and environment details are in the validation JSON.

HTTP validation covers eleven unique pages, metadata/canonical/schema consistency, sitemap images, internal/external links and fragments, clean query canonicals, one-hop trailing-slash redirects, correct 404/noindex behaviour, preview noindex headers, share-image responses, crawler user-agent requests and private-file 404s. The initial development-browser readiness check timed out; production is the validated browser environment.

Direct live HTTP probes on 6 October observed the current public homepage, robots and sitemap returning 200. HTTP apex redirects to HTTPS apex, then to HTTPS www in two 308 hops. These observations concern the existing deployment, not the un-deployed implementation in this audit; hosting-level redirect consolidation remains a manual opportunity.

No field INP, Search Console query data, indexed-page count, qualified lead change or AI citation measurement is available. Lab measurements cannot establish field CWV or ranking improvements. Continue performance work only from real production/device evidence, preserving the functioning visual experience.

The highest-value content opportunity is original, approved film/presenter/social work with its actual production process and accountable review. Informational publishing should wait for first-hand evidence and responsible authorship rather than filling a blog with generic articles. See `SEO-CONTENT-OPPORTUNITIES.md`.

## 8. Manual actions required

1. **TODO — launch:** deploy the reviewed changes to the existing host, then repeat the crawl/bot/header checks against the canonical HTTPS domain. Check apex/www and HTTP/HTTPS redirect chains in the hosting configuration.
2. **TODO — Google:** verify the real Search Console property through DNS or the supplied public verification value, submit `/sitemap.xml`, inspect representative URLs and confirm the current generative-AI inclusion controls available to the property.
3. **TODO — Bing:** verify Bing Webmaster Tools with its real value and submit the sitemap. IndexNow may be reconsidered when publication frequency justifies maintaining a real key and update notifications.
4. **TODO — business identity:** supply the company registration number, registered jurisdiction/office, genuine team/founder biographies and verified company-owned profile URLs before displaying or marking them up.
5. **TODO — enquiry privacy:** confirm the actual controller details, receiving provider, retention period and any international processing arrangements; complete the existing notice before enabling real delivery.
6. **TODO — proof:** approve genuine film/presenter/social samples and usage permissions. Add outcomes only when they have actual measurements and publication permission.
7. **TODO — local listings:** assess Google Business Profile eligibility from genuine customer-contact/operational facts; a UK telephone and a UK target market do not establish a physical office.
8. **TODO — measurement:** monitor indexing, relevant UK query impressions/clicks, qualified enquiries, real AI citations and field CWV. Do not add analytics without the required business/privacy decisions.
9. **TODO — authority:** pursue genuine partner/client credits and relevant citations; request reviews only from actual customers, without manufactured backlinks or testimonials.

## Sources checked

- [Google's generative AI search optimisation guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): ordinary search fundamentals, useful original content and the limits of llms.txt.
- [Google Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization): real organisation identity and applicable properties.
- [Google documentation updates](https://developers.google.com/search/updates): FAQ rich-result retirement in May 2026.
- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots): independent search-discovery and training permissions.
- [Schema.org Service](https://schema.org/Service) and [CollectionPage](https://schema.org/CollectionPage): page/service relationships.
- The installed Next.js guides in `node_modules/next/dist/docs/` were read for metadata, JSON-LD, robots, sitemap, route handlers, fonts and current Image priority conventions before editing.
