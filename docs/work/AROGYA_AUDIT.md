# Arogya Studio: live-site audit

Audited 7 Oct 2026 at https://arogya-studio-preview.vercel.app/ (desktop 1440x900, mobile 390x844 @2x, Chromium).
Captures: `review/arogya/` (gitignored): `d-*.png`, `m-*.png`, full-page `d-full.png` / `m-full.png`, `audit.json`, `network.json`.

Evidence classes: **Observed** (seen in the browser), **Unknown** (needs confirmation from the studio).

## Access

| Check | Result |
|---|---|
| Home page | Observed: 200, 57 requests, all 200/206 from the site's own host |
| Blocked host | Observed: `cdn1.treatwell.net` (one Treatwell image) still blocked by this environment's egress policy |
| Robots / sitemap | Observed: `Allow: /`; sitemap lists canonical URLs on **arogyastudio.com** (18 pages: home, 10 treatments, treatments index, membership, gift vouchers, about, contact, dosha quiz, retreat) |

## What the site is (observed)

- **Arogya Studio**, an Ayurvedic wellness and skin studio inside WOW Beauty & Wellness, Colindale, London NW9, run by Dr Priyanka Balachandar (BAMS; MSc Clinical Nutrition; APA-registered, as stated on the page).
- Footer disclaimer: "Treatments are traditional relaxation and wellbeing therapies, not medical treatment." **So it is a wellness / Ayurveda practice, not a medical provider.** Our portfolio must not call it a medical website.
- Footer credit: "Powered by CogniVerse Studio", linking to cogniversestudio.com.
- Page title: "Arogya Studio | Ayurvedic Head Spa & Massage, Colindale NW9". JSON-LD on the site: HealthAndBeautyBusiness + DaySpa, WebSite, FAQPage.

## Home page structure (observed, top to bottom)

1. Header: lotus-arch mark, "Arogya Studio / Ayurveda · Skin · Soul", gold "Book on WhatsApp" pill, Menu.
2. Hero: serif headline "Ancient wisdom, *gently translated* for modern life." (gold italic), arched image of a brass bowl of marigolds, rotating circular badge, "5.0 verified Treatwell reviews", See treatments / Take the dosha quiz.
3. Full-bleed image that scales into a dark panel: "Slow down. *Come back* to yourself." with a scrolling marquee of treatment names.
4. "What is *Ayurveda*?": paragraph lit word by word on scroll; arched spice-tray image; Body / Mind / Rhythm row.
5. "A quiet, personal place to *restore*.": three numbered service rows with prices.
6. Dark section "Treatments crafted to *slow you down*.": horizontal rail of 10 tall photo cards (number, price chip, title, line, Explore), then a "Most booked" price list.
7. "How Ayurveda helps in the world we live in *now*.": four cards stacking on scroll (Sleep and calm, Stress relief, Glow and energy, Whole-life balance).
8. Rust section "Vata, Pitta or Kapha: which are *you*?": three dosha cards, centre one raised; dosha quiz CTA.
9. "A gentle space for women, *through every season*.": arched portrait.
10. Dark "Dr Priyanka *Balachandar*": arched portrait, credentials list.
11. Testimonials "From people who've *sat with us*." (names as tabs).
12. Membership "Treatments *every month*, for one fixed price.": £129 / £269 cards.
13. Visit "Your quiet space in *Colindale*.": studio photos, address, hours.
14. FAQ accordion, "Not sure what to book?" WhatsApp CTA, dark green footer.

Mobile: same order, single column; sticky bottom bar "Book on WhatsApp / Treatments"; treatment cards as a horizontal swipe rail.

## Visual identity (observed)

| Element | Value |
|---|---|
| Canvas | cream `#f0ebe0` / `#e5ddcb` |
| Dark | forest black-green `#141a12`, `#1f2c1d`, `#0e150d` |
| Accent | gold `#e6c98c`, amber `#c08a3c`, bronze text `#7a5f33` |
| Feature colour | rust / terracotta (dosha section) |
| Type | Instrument Serif (headlines, gold italic accents), Hanken Grotesk (body, tracked small caps labels) |
| Signature shapes | **arched image masks** (hero, spices, portraits), rounded pill buttons, tall rounded photo cards |
| Imagery | warm, low-key still life (brass, marigolds, oils, spices) and treatment photography |
| Motion (observed in captures) | word-by-word text reveal, stacking cards, horizontal treatment rail, image-to-panel scale, marquee |

What makes it recognisable: cream and forest green with gold serif italics, the arch, warm brass-and-marigold still life.

## Unknown (needs the studio's confirmation)

- Relationship: client, own venture, concept.
- Scope actually delivered by CogniVerse Studio.
- Whether arogyastudio.com is live (the sitemap points there) and which URL the portfolio should link.
- Technology stack (no reliable markers in the HTML).
