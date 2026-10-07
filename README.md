# CogniVerse Studio

Healthcare media services for consultants and practices across the UK. Next.js 16.3 App Router, React, TypeScript, GSAP and Lenis; no CMS or database.

## Run and validate

Use Node 22.23 or later (the regression tests use Node's TypeScript stripping).

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run start -- --port 3100
npm run seo:check -- http://localhost:3100 https://www.cogniversestudio.com
npm run enquiry:check
npm run browser:check -- http://localhost:3100
```

The browser check uses a local Chrome installation. On other operating systems set `CHROME_PATH` to its executable. Screenshots default to `.tmp/seo-browser`, which is ignored by Git. The enquiry integration check starts an isolated production server and a local mock webhook: it does not send external emails or messages. Build before running those integration checks. Port 3101 is the enquiry test default; change `ENQUIRY_TEST_PORT` if needed.

TypeScript 7 remains the compiler through the `@typescript/native` alias. The `typescript` alias supplies Microsoft's TypeScript 6 compatibility API required by typescript-eslint. See [Microsoft's compatibility guidance](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0).

## Content and routes

Approved facts, contacts, packages and homepage scenes live in `src/content/site.ts`; expanded service copy lives in `src/content/services.ts`. Asset approval status is recorded in `assets-src/ASSETS.md`. Do not add clients, outcomes, testimonials, team members, offices or credentials without verified source material. Public generated concept media is labelled as such.

Eleven public pages: home, service hub, four service pages, work directory, About, contact, privacy and the approved Prof. Hemant Sheth website project. The sitemap and optional `/llms.txt` directory share `src/content/pages.ts`. Existing homepage chapter anchors remain available.

The canonical host is `https://www.cogniversestudio.com`. `.env.example` documents the override; localhost and Vercel preview overrides fall back to the public host. Vercel aliases/previews receive `X-Robots-Tag: noindex, follow`; the primary custom domain remains indexable. No existing public path was removed or renamed.

Real Google Search Console and Bing Webmaster verification values can be supplied through `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION`. Blank values emit no verification tags. These are public ownership-verification values, not API credentials. No analytics tag is installed.

## Enquiries

Configure either `CONTACT_PROVIDER=resend` with `RESEND_API_KEY`, `CONTACT_TO` and `CONTACT_FROM`, or `CONTACT_PROVIDER=webhook` with `CONTACT_WEBHOOK_URL`. Keep secrets in the host environment, never in the repository. Delivery has a 15-second timeout and counts only a provider 2xx response as success.

The form uses native POST as well as its JavaScript enhancement. Native responses redirect to a contact-page status with no personal details in the URL. Unconfigured delivery returns an honest unavailable message and provides an email alternative. The enquiry is for business information only; do not include patient information.

Before enabling real delivery, confirm the receiving provider, legal/controller identity, retention period and any international processing arrangements, then complete the privacy notice. Current repository code does not establish those business policies.

## Motion and SEO notes

Normal intro, curtain navigation, pointer effects and scroll scenes remain. The phone intro is shorter; hero video waits until it finishes. Reduced motion uses static content and avoids autoplay/pointer effects. Without JavaScript, content remains visible and the form posts normally. If external scripts fail or are delayed, the 10-second watchdog reveals content and unlocks scrolling.

Responsive images reserve dimensions. Decorative video uses the existing responsive still before playback, then sets a poster without eagerly downloading full-size posters for every scene.

The current implementation is documented in `SEO-GEO-AUDIT.md`, `SEO-CHECKLIST.md` and `SEO-CONTENT-OPPORTUNITIES.md`. Earlier audit evidence and local/GEO guidance are in `docs/seo/`. The current audit supersedes historical page counts and measurements. No search account setup, deployment or ranking result is implied by passing local checks.

Set `SEO_REPORT_PATH=.tmp/seo-results.json` before `npm run seo:check` to save the complete HTTP audit. The checker includes canonical/query/slash variants, public page inventory, social images, schema relationships, crawler user-agent probes and private-file 404 checks. User-agent probes do not prove access from real crawler IPs at the hosting firewall.
