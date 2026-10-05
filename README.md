# Tech Cogniverse: healthcare media studio site

Next.js 16 (App Router, TypeScript), GSAP + Lenis for motion. No CMS, no database.

```bash
npm install
npm run dev        # localhost:3000
npm run build      # production build (also typechecks)
npm run start
```

## Content and assets

Every fact lives in **`src/content/site.ts`**, copied with its source from Tech Cogniverse's own
content. Do not add a client, metric or testimonial without a source. Generated media and its
approval status are tracked in **`assets-src/ASSETS.md`**; raw masters stay in the gitignored
`assets-src/gen/`. Anything AI-generated is captioned as such on the page.

## Enquiry form

`/api/enquiry` delivers through the provider named in `.env` (see `.env.example`):
`CONTACT_PROVIDER=resend` (email) or `webhook` (Make, Zapier, Slack…). Unconfigured, it
returns 503 and the form tells people to call. It never shows success without a real 2xx.
It is a business enquiry and asks for no patient information.

## Structure

- `src/content/site.ts`: all content
- `src/app/page.tsx`: the home page, in Plainsight's section order (hero, services, websites,
  GEO, numbers, films, AI presenter, social, work, process, packages)
- `src/components/`: one component per scene; `MediaSwap` turns a still into its film,
  `ScrubText` lights a statement word by word, `useHorizontal` slides a row sideways on scroll
- `src/components/Motion.tsx`: smooth scroll, curtain page transitions, scroll reveals
- `src/components/Header.tsx`: header + full-screen circular-reveal menu
- `src/app/globals.css`: tokens (bone, ink, mint), type, every component

Reduced motion is respected throughout (no intro, no smooth scroll, no autoplay, static hero).
Without JavaScript the site shows its finished state.
