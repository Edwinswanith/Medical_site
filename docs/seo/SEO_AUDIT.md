# SEO and GEO audit

Site: Tech Cogniverse / cogniverseStudio healthcare media studio (`Edwinswanith/Medical_site`, branch `Light-Theme`).
Audited: 5 Oct 2026, against the repository and a local production build. The live domain was not available, so anything that depends on it is marked NOT TESTED.

## The core finding

The site sells "GEO-friendly websites" with structured data, crawl rules and an XML sitemap. Before this pass it had none of them: `robots.txt` and `sitemap.xml` returned 404, there was no JSON-LD, no canonical, no favicon, and only two indexable URLs. A prospect or an AI assistant checking the seller found it failing its own pitch. Phase A (see `IMPLEMENTATION_LOG.md`) fixes the technical part. The rest depends on business facts.

The second finding is identity. The site uses three names (Tech Cogniverse in the title, footer and copyright; cogniverseStudio in the header; Cogniverse in the loader). Plainsight Medical appears in the source notes. The only phone number is Indian (+91) and the email is Gmail, on a site selling to UK clinicians. No markup or copy fixes an unclear entity.

## Business understanding

| Question | Finding | Source |
|---|---|---|
| What it sells | Specialty websites for clinicians, patient education films (2 to 3 min, scripted from NHS/NICE guidance, clinician sign-off), an AI presenter (consented AI clone), social content (shorts plus channel management). Sold as 3 packages. | `src/content/site.ts` |
| Primary buyer | Clinicians in UK private practice: consultants (GMC references), private clinics, private GPs. | Inferred from copy, £ budgets, `.co.uk` examples |
| UK areas served | Not stated. Only geography: the case client works in London and Hertfordshire. | Unknown |
| Physical office | Not stated. | Unknown |
| Main revenue service | Probably "Website with films" (marked "Most complete start"); budget bands £5k to £35k+. | Inferred |
| Proof | Websites: 1 real case (22 pages, 10 procedure guides, live site) and 12 real template screenshots. Films: approved numbers (16 ready, 75 topics across 14 specialties) but every film shown is AI concept footage. AI presenter: no real example. Social: none. | `site.ts`, `assets-src/ASSETS.md` |
| Missing | Legal entity, UK presence, About, team, privacy policy, testimonials, real film samples. | |

## Scorecard (before phase A)

| Area | Score /10 | Evidence |
|---|---|---|
| Technical SEO | 3 | No robots, sitemap, canonical, icon; base URL fell back to localhost |
| On-page | 4 | Good copy, 1 H1, but titles without service terms; duplicate description on /contact; heading words glued in raw HTML |
| Local | 1 | No address, coverage or UK contact details |
| Content architecture | 2 | Four services on one URL, anchors only |
| Internal linking | 2 | Two pages; nav is hash links |
| Structured data | 0 | None |
| Image/video | 6 | Real alt text on meaningful images; decorative images correctly empty; AI media labelled; no transcripts (films are concept loops, so none needed yet) |
| Performance | 7 | Measured earlier: mobile LCP 0.8 s (throttled), ~2.2 MB. INP/CLS field data NOT TESTED |
| Crawlability | 5 | All copy server-rendered (about 1,100 to 1,500 words on /); works without JS |
| AI discoverability | 3 | Readable HTML, but no entity data, no per-service pages to cite |
| Conversion paths | 6 | Clear "Book a call" everywhere; form is honest about delivery; no privacy page |
| Trust / authority | 2 | Brand confusion, +91 phone, Gmail, no About, one case study |

## Issues

Severity: CRITICAL, HIGH, MEDIUM, LOW. "Direct" = can be implemented without new facts.

### A. Technical SEO

| ID | Sev | Problem | Evidence | Affected | Fix | Direct | Status |
|---|---|---|---|---|---|---|---|
| T1 | CRITICAL | No robots.txt or sitemap | Both returned 404 | site | `app/robots.ts`, `app/sitemap.ts` | Yes | Done |
| T2 | CRITICAL | Base URL fell back to `http://localhost:3000` | `layout.tsx` metadataBase; env unset | all absolute URLs | `lib/site-url.ts`: env, then Vercel production domain | Yes | Done; set `NEXT_PUBLIC_SITE_URL` at launch |
| T3 | HIGH | Heading lines glued for non-CSS parsers | Raw text "Your practice’smedia partner", "plainEnglish", "We dothe rest" (7 headings) | Hero, Templates, FilmGrid, Social, Case, Process, Footer | Real space between line spans | Yes | Done |
| T4 | HIGH | Duplicate meta description | /contact reused the home description | /contact | Per-page metadata | Yes | Done |
| T5 | HIGH | No Open Graph / Twitter tags or image | No og:* tags | all | `lib/seo.ts`, `app/opengraph-image.tsx` | Yes | Done |
| T6 | MEDIUM | No favicon / app icon | /favicon.ico 404 | all | `app/favicon.ico`, `icon.svg`, `apple-icon.png` | Yes | Done |
| T7 | MEDIUM | Home title had no service terms | "Tech Cogniverse: your practice’s media partner" | / | "Websites and patient films for clinicians" | Yes | Done; add "UK" only if coverage confirmed |
| T8 | LOW | `html lang="en"` on British-English copy | layout | all | `en-GB` | Yes | Done |
| T9 | NOT TESTED | Vercel bot protection may 403 crawlers | No live URL | live | Check after launch | No | Open |

### B. On-page

| ID | Sev | Problem | Fix | Status |
|---|---|---|---|---|
| O1 | HIGH | Four services share one H1 and one title, so no page can match a service query | Service pages (needs approval) | Open |
| O2 | MEDIUM | H1 "Your practice’s media partner" says nothing about websites, films or clinicians | Keep it as the brand line (design); the title tag and service pages carry the terms | Decided: keep |
| O3 | LOW | Contact page is thin (about 150 words) | Fine for a form page; add what happens after you enquire once the process is confirmed | Open |

### C. Local SEO

| ID | Sev | Problem | Fix | Status |
|---|---|---|---|---|
| L1 | CRITICAL | Only contact is +91 phone and Gmail | Real UK number and domain email, if they exist. Never invented. | Done: +44 (0)7436 194150, info@cogniversestudio.com |
| L2 | CRITICAL | No address, company details or stated coverage | See `LOCAL_SEO.md` decision tree | Blocked: facts |
| L3 | HIGH | Three brand names | One name everywhere; `BRAND` in `site.ts` drives it | Done: CogniVerse Studio |
| L4 | MEDIUM | Location pages | Not justified (no offices, one London-area client) | Decided: none |

### D to F. Architecture, linking, structured data

| ID | Sev | Problem | Fix | Status |
|---|---|---|---|---|
| D1 | HIGH | One URL for four services | `/services/*` pages, see `KEYWORD_MAP.md` | Awaiting approval |
| D2 | HIGH | Case study only on the homepage, linking out | `/work/prof-hemant-sheth` | Awaiting approval |
| D3 | HIGH | No About page | `/about` with real facts | Blocked: facts |
| E1 | MEDIUM | Nav is hash anchors only | Point nav to service pages once they exist | Awaiting approval |
| F1 | CRITICAL | No JSON-LD | Organization + WebSite + WebPage/ContactPage with stable `@id`s | Done |
| F2 | HIGH | No Service / Breadcrumb schema | Add with the service pages | Awaiting pages |

### G. Image and video

| ID | Sev | Problem | Status |
|---|---|---|---|
| G-img1 | LOW | Audit draft said the 12 template images lack alt. **Correction:** the thumbnails carry alt ("Cardiology website template"); the empty-alt copies are duplicate hover previews, where empty alt is right. No change needed. | Closed |
| G-vid1 | INFO | All videos are AI concept loops, labelled. No VideoObject: marking concept footage as patient films would misrepresent it. Add VideoObject when a real, approved client film is published with a transcript. | Decided |

### H. Performance

Measured earlier this session on the dark theme (the light theme changed colours only): mobile LCP 0.8 s on a throttled profile, about 2.2 MB transferred, no horizontal overflow. The 2 s intro on every load is a UX cost; it does not hide content from crawlers (the HTML is complete) and is skipped under reduced motion. Field INP/CLS: NOT TESTED (needs CrUX or Search Console after launch).

### I to J. Crawlability and AI discoverability

- All copy is in the server HTML and visible without JS (tested). PASS.
- No per-service URLs to cite. Open (D1).
- The sales copy presents `llms.txt` as a pillar ("Open"). Google states AI Overviews / AI Mode need no special AI text file; no major engine has confirmed using it. Recommend rewording (business decision). See `GEO_AI_SEARCH.md`.

### K to L. Conversion and trust

| ID | Sev | Problem | Status |
|---|---|---|---|
| K1 | HIGH | Form collects name, email, phone with no privacy notice (UK GDPR transparency, and a trust signal) | Blocked: controller details |
| L-t1 | HIGH | No About, team or company registration | Blocked: facts |
| L-t2 | MEDIUM | Film and AI presenter proof is concept-only | One real approved client film would outweigh every technical fix here |

## Top 10, in order

1. No robots, sitemap, schema, canonical (done).
2. Entity confusion: three names, no legal entity, no About.
3. +91 phone and Gmail as the only contact.
4. One URL for four services.
5. No privacy notice on a form that collects personal data.
6. Case study has no page of its own.
7. Headings glued for non-rendering crawlers (done).
8. No share previews for LinkedIn and WhatsApp (done).
9. `llms.txt` overclaimed in sales copy.
10. Proof for films and AI presenter is concept-only.
