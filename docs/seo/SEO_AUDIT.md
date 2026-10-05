# SEO and GEO audit

Audited 5 October 2026. Repository baseline: main at `8655bbc`, pulled from Edwinswanith/Medical_site. Implementation authorised by the user's “incorporate all the feedbacks”. UK-wide coverage was subsequently confirmed by the user.

Production addresses inspected: https://medicalsite-two.vercel.app/ and https://www.cogniversestudio.com/. The apex HTTPS and HTTP addresses redirect to the www host. New code has been validated locally; this is not a deployment report.

## Business understanding

CogniVerse Studio sells four services to consultants and private practices: specialty websites, patient education films, consent-based AI presenters and social content. Three package options combine them. The primary buyer is inferred from specialty templates, consultant/GMC references and the business enquiry form. UK-wide coverage is confirmed; a physical office, staffed opening hours, legal entity, team credentials and verified social profiles are not supplied.

Website proof: the approved Prof. Hemant Sheth project (22 pages, 10 procedure guides, four treatment groups), its live website and 12 specialty template screenshots. Film offer: approved figures of 16 films ready and 75 topics across 14 specialties. Public film, presenter and social previews are AI-generated concepts. No measured lead gains, rankings, testimonials or real presenter footage are authorised for this site.

## Scorecard

These are evidence statuses, not predictions of rankings. PASS means the stated repository check succeeded. External account configuration and business verification are separate.

| Area | Baseline finding | Current assessment |
|---|---|---|
| Technical SEO | Canonical host conflicted with the live redirect | PASS locally: www canonicals, metadata and sitemap |
| On-page SEO | Four services shared one URL | PASS locally: unique service introductions, titles, H1s and buyer questions |
| Local UK SEO | Coverage not established | UK coverage implemented; office/GBP eligibility NOT TESTED |
| Content architecture | Three public pages; service anchors | Ten public pages; four dedicated services, hub, About and project |
| Internal linking | No dedicated service destinations | PASS: navigation, homepage, related services, breadcrumbs; no orphans |
| Structured data | Organization, WebSite and WebPage only | PASS: connected Service entities and visible BreadcrumbList added |
| Image/video SEO | Fixed image sizes; no video poster metadata | PASS: responsive images, dimensions, contextual concept labels and deferred posters |
| Performance | No current reproducible production measurement | See final measured results in IMPLEMENTATION_LOG; field INP NOT TESTED |
| Crawlability | HTML present, delayed bundles could leave reveals hidden | PASS HTML checks; browser fallback results in IMPLEMENTATION_LOG |
| AI discovery | Some wording implied an assistant would name the clinician | Clear eligibility wording; crawler policy unchanged |
| Conversion | Form had no native POST path; null JSON could crash | PASS: JSON/native/multipart, validation and honest delivery outcomes |
| Trust | No About; approved project only on homepage | About and project added; provider/retention/legal identity still require owner confirmation |

## Prioritised findings and fixes

Each impact is an assessment based on observed implementation, not measured search performance.

| ID / severity | Problem and evidence | Affected URL or file | Impact | Fix / direct implementation | State |
|---|---|---|---|---|---|
| T1 HIGH | Live apex redirects, while canonicals and sitemap used apex | site-url.ts; all URLs | Search signals point at a redirect | Use www default; normalise legacy apex env; yes | Implemented |
| C1 HIGH | No landing page for any of four primary services | site.ts; / | Buyers cannot explore a service on its own URL | Four distinct service pages and hub; yes | Implemented |
| F1 HIGH | Form had no method/action; handler accepted JSON only | EnquiryForm.tsx; /api/enquiry | Failed/absent JS prevents enquiries and can expose default GET fields | Native POST, 303 state-only redirect and JSON enhancement; yes | Implemented |
| F2 HIGH | JSON null/arrays not validated before property access | /api/enquiry | Malformed requests can fail unpredictably | Typed shape, length, permission and honeypot checks; yes | Implemented |
| J1 HIGH | Watchdog marked intro ready but did not reset reveal transforms | layout.tsx; globals.css | Content can remain visually hidden when hydration fails | Static fallback and scroll unlock after 10 seconds; yes | Implemented |
| U1 HIGH | 390px screenshot clipped hero heading and CTA | Hero.tsx; globals.css | Mobile visitors miss content or action | Shrinkable grid track and bounded headline; yes | Implemented |
| E1 HIGH | No About page or confirmed service geography in visible copy | /; /contact | Unclear entity and market | Factual About plus user-confirmed UK coverage; yes | Implemented |
| W1 MEDIUM | Real project existed only inside the homepage | Case.tsx | Approved experience has no focused destination | Dedicated project page and links; yes | Implemented |
| G1 MEDIUM | GEO text described assistants naming the consultant | site.ts / GEO | Can imply a guaranteed outcome | Explain understanding/retrieval and state limits; yes | Implemented |
| V1 MEDIUM | Old checker printed failures but exited successfully | scripts/seo-check.mjs | Regressions can appear to pass | Nonzero failure exit, DOM parser, route inventory, fragments/assets/schema checks; yes | Implemented |
| S1 MEDIUM | No Service entities or visible breadcrumbs | new service routes | Weak relationship between offer, page and company | Stable provider/page IDs; accurate Service and BreadcrumbList; yes | Implemented |
| P1 MEDIUM | Fixed images and eagerly fetched full-size video posters | Hero, MediaSwap, Templates, Collage | Extra downloads on phones | next/image sizes; defer video poster until playback; yes | Implemented |
| A1 MEDIUM | Menu lacked a focus trap; pointer effects ignored reduced motion | Header, Cursor, Magnetic | Keyboard/motion preference barriers | Trap focus, inert background, Escape return, static reduced motion; yes | Implemented |
| A2 MEDIUM | Scrub text at 14% opacity failed contrast in Lighthouse | globals.css / scrub__w | Text difficult to read before animation | Readable minimum opacity while retaining motion; yes | Implemented |
| E2 HIGH | No named receiving provider, confirmed retention or full controller identity | /privacy; delivery env | Privacy information incomplete | Remove unsupported deletion/transfer assurances; owner must confirm real arrangements | Owner details pending |
| E3 MEDIUM | Film/presenter/social previews are concepts, not client proof | / and corresponding services | Buyers cannot verify delivery from public previews | Keep labels, invite relevant samples; real approved assets needed | Owner assets pending |
| L1 MEDIUM | No office or in-person service arrangement supplied | /contact | GBP/LocalBusiness eligibility unverified | Retain Organization; assess GBP only with real facts | NOT TESTED |
| X1 LOW | Sitemap/search accounts/CDN rules outside repo | production | Discovery requires operational checks | POST_LAUNCH_CHECKLIST; authorised account access needed | NOT TESTED |
| X2 MEDIUM | Vercel alias served 200 without indexing exclusion in baseline | alternate deployments; next.config.ts | Alternate deployment addresses may enter search | Host-based noindex, follow header; yes | Implemented and tested locally |

The first ten rows correspond to the highest-impact feedback; the remaining rows cover schema, media, performance, accessibility and owner dependencies. No existing public URL was removed. Homepage section anchors remain available; no speculative location pages were created.

## Validation and limitations

The production HTML checker verifies status, canonical origin, route inventory, unique metadata, heading levels, alt attributes, reserved dimensions, image responses, internal fragments, external links, JSON-LD parsing/references and unknown-URL behaviour. It is not Google's Rich Results Test and does not guarantee indexing. Browser and performance evidence, commands and outstanding actions are recorded in IMPLEMENTATION_LOG.

We did not configure Google Search Console, Google Business Profile, Bing Webmaster Tools or Vercel firewall rules. Ordinary requests with crawler user-agent strings can reveal an obvious block but cannot prove genuine crawler IP access.

## Reference policy

Readable original service information and consistent canonical URLs are the foundation. [Google's AI optimisation guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) applies normal search fundamentals and rejects the need for special AI files. [Organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization) supports clear business identity. [ICO transparency guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/) identifies retention and recipients as privacy information requiring real business confirmation.
