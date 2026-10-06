# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

CogniVerse Studio marketing site (healthcare media services, UK). Next.js 16 App Router, React 19, TypeScript, GSAP + Lenis. No CMS, no database, no analytics. Deployed on Vercel. Requires Node 22.23+.

## Commands

```sh
npm run dev                 # dev server
npm run lint                # eslint (next core-web-vitals + typescript)
npm run typecheck           # tsc --noEmit
npm test                    # node:test with --experimental-strip-types over tests/*.test.mjs
node --experimental-strip-types --test tests/enquiry.test.mjs   # single test file
npm run build && npm run start -- --port 3100
npm run seo:check -- http://localhost:3100            # HTTP SEO audit (SEO_REPORT_PATH=.tmp/seo-results.json saves the report)
npm run enquiry:check       # spins up an isolated prod server + mock webhook on port 3101 (ENQUIRY_TEST_PORT); build first
npm run browser:check -- http://localhost:3100        # needs local Chrome (CHROME_PATH on non-Windows); screenshots to .tmp/seo-browser
```

TypeScript is aliased: `@typescript/native` is the real TS 7 compiler; the `typescript` package name points at TS 6 only because typescript-eslint needs its API. Don't "fix" these aliases.

## Architecture

- **Content is data, not CMS.** All approved facts, contacts, packages and homepage scenes are in [src/content/site.ts](src/content/site.ts); service-page copy is in [src/content/services.ts](src/content/services.ts). [src/content/pages.ts](src/content/pages.ts) (`PUBLIC_PAGES`) is the single page inventory that feeds both [sitemap.ts](src/app/sitemap.ts) and [llms.txt/route.ts](src/app/llms.txt/route.ts). Adding a page means adding it there too.
- **Content rules:** do not invent clients, outcomes, testimonials, team members, offices or credentials. Media approval and AI-generated status is tracked in [assets-src/ASSETS.md](assets-src/ASSETS.md). AI-generated media must stay labelled on the page. Served media lives in `public/media/`; `tests/assets.test.mjs` checks that every `/media/...` path referenced in `site.ts` exists.
- **SEO/metadata:** use `pageMetadata()` from [src/lib/seo.ts](src/lib/seo.ts) for every page. Next merges metadata shallowly, so each page needs the full openGraph object. The canonical origin comes from [src/lib/site-url.ts](src/lib/site-url.ts) (`SITE_URL`, `absolute()`). It never resolves to localhost or `*.vercel.app`. [next.config.ts](next.config.ts) adds `X-Robots-Tag: noindex` on vercel.app hosts. JSON-LD is in [src/components/JsonLd.tsx](src/components/JsonLd.tsx). Locale is en-GB throughout.
- **Motion system:** [src/components/Motion.tsx](src/components/Motion.tsx) wraps the app (in [layout.tsx](src/app/layout.tsx)). It owns a single Lenis instance driven by the GSAP ticker, curtain page transitions (`useTransitionNav`, used by `TLink`) and attribute-driven effects: `[data-reveal]`, `[data-speed]` (parallax), `[data-scrub]` (sets `--r` 0→1 for CSS). Shared helpers are in [src/lib/motion.ts](src/lib/motion.ts) (`lockScroll`, `prefersReducedMotion`, `isTouch`). An inline boot script in `layout.tsx` sets `data-js` / `data-ready` / `data-intro-done` on `<html>` and has a 10 s watchdog that reveals content if JS stalls. Everything must degrade: reduced motion means static content with no autoplay or pointer effects, and no JS means content is visible and forms still post.
- **Styles:** plain CSS, with global files imported in `layout.tsx` (`globals.css` plus `src/app/styles/*.css` split by area). No Tailwind/CSS modules.
- **Enquiries:** [src/app/api/enquiry/route.ts](src/app/api/enquiry/route.ts) reads a size-bounded body, validates with [src/lib/enquiry.ts](src/lib/enquiry.ts) (the same `fieldError` rules are shared with the client form) and delivers via [src/lib/contact.ts](src/lib/contact.ts) (`server-only`). `CONTACT_PROVIDER=resend|webhook` is configured with env vars (see `.env.example`). It supports native form POST, which redirects to a contact-page status without personal data in the URL, as well as JS enhancement. When delivery is unconfigured it must return an honest "unavailable" response.
- **Tests import TS source directly** using Node type stripping, with relative `.ts` paths. Modules under test (`src/lib/enquiry.ts`, `src/lib/canonical-origin.ts`, `src/content/site.ts`) must not use the `@/` alias or framework imports, or the tests break.

## Docs

The current SEO/GEO state is in `SEO-GEO-AUDIT.md`, `SEO-CHECKLIST.md` and `SEO-CONTENT-OPPORTUNITIES.md`. Older evidence and local SEO guidance are in `docs/seo/`.
