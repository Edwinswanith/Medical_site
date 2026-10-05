# Clinic website

Next.js 16 (App Router, TypeScript), GSAP + Lenis for motion. No CMS, no database.

```bash
npm install
npm run dev        # localhost:3000
npm run build      # production build (also typechecks)
npm run start
```

## Before launch: replace the placeholders

Every fact on the site lives in **`src/content/site.ts`**. Anything marked `PLACEHOLDER`
(clinic name, phone, address, hours, services, doctors) must be replaced with real details.
Do not invent doctors, credentials, patient numbers or reviews.

## Enquiry form

`/api/enquiry` delivers through the provider named in `.env` (see `.env.example`):
`CONTACT_PROVIDER=resend` (email) or `webhook` (Make, Zapier, Slack…). Unconfigured, it
returns 503 and the form tells people to call. It never shows success without a real 2xx.
The form deliberately asks for no medical history.

## Structure

- `src/content/site.ts`: all content
- `src/app/`: pages (`/`, `/services`, `/services/[slug]`, `/doctors`, `/about`, `/contact`)
- `src/components/Motion.tsx`: smooth scroll, curtain page transitions, scroll reveals
- `src/components/Pulse.tsx`: the hero heartbeat that follows the cursor
- `src/components/Header.tsx`: header + full-screen circular-reveal menu
- `src/app/globals.css`: tokens (bone, ink, mint), type, every component

Reduced motion is respected throughout (no intro, no smooth scroll, static pulse).
Without JavaScript the site shows its finished state.
