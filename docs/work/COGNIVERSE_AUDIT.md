# Cogniverse (cogniversetech.com): live-site audit

Audited 8 Oct 2026 at https://cogniversetech.com/ (desktop 1440x900, mobile 390x844 at 2x, Chromium).
Captures: `review/ctech/` (gitignored) and `assets-src/work/cogniverse/` (masters, not committed).

## Access

| Check | Result |
|---|---|
| Home page | 200; 68 requests, all from the site's own host |
| `www.cogniversetech.com` | Blocked by this environment's egress policy; the bare domain serves the site |
| `/media/team.webp` | One 502 during the browser pass; three direct retries returned 200 (transient) |
| robots.txt, sitemap.xml | **404**. No structured data (JSON-LD) on the home page |
| Crawlers | 200 for browser, Googlebot and OAI-SearchBot user agents |

## What the site is (observed)

- Cogniverse, a healthcare technology company. Two VR products: **Incisio** (surgical training in a virtual operating theatre) and **HalaraXR** (VR-based behavioural assessment for neurodevelopmental needs in children).
- One long single page (about 23,000 px tall on desktop) with anchored sections: the problem, the answer, Incisio (four steps, from headset on to feedback), HalaraXR (four short activities and a report, one playable in about 20 seconds), what the team builds (six capabilities), track record, demo request (opens a ready-to-send email).
- Built with Next.js. Type: IBM Plex Sans and Mono, Sora, Fredoka, Poppins. Colour: white and pale blue-grey, ink `#030f18`, teal `#1186c2`, indigo `#4e51bf`, particle-cloud graphics. Imagery labelled "Concept visual"; sample data labelled "Sample data".
- Footer: Cogniverse Limited, UCL BaseKX, 103c Camley St, London N1C 4PF; +44 (0) 7436 194150; founders@cogniversetech.com.

## Facts used on our site

2 products explained; 4 steps in an Incisio session; 6 capabilities set out; audiences quoted from the site's "Who it is for" lines. Company claims (UCL origin, NIHR funding, UCLH pilot) are the company's own and are not restated as studio achievements.

## Relationship and labelling

The user describes it as a separate website to showcase like the client projects, and confirmed scope: design, build, copy, imagery. Its footer company name and phone number match CogniVerse Studio's own, so it is labelled **"Built by CogniVerse Studio"**, not "Client work", until a separate commissioning company is confirmed. SEO is left off its scope because the live site has no robots.txt, sitemap or structured data.
