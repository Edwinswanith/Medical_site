# Local SEO (UK)

## Current state

| Item | On the site today | Verdict |
|---|---|---|
| Business name | Tech Cogniverse (title, footer), cogniverseStudio (header), Cogniverse (loader) | Inconsistent. Pick one. |
| Address | None | Nothing to mark up. Correct not to invent one. |
| Phone | +91 9003 020 030 (India) | Factual, but works against a UK buyer. |
| Email | edwinswanith006@gmail.com | A domain email is a stronger trust signal. |
| Coverage | Not stated | Must be stated, truthfully. |
| Opening hours | None | Not needed for a service business without walk-ins. |
| Google Business Profile | None supplied | See below. |
| Social profiles | None supplied | Add to `sameAs` once real. |

## Decision tree (answer, then implement)

1. **Is there a UK office where clients can meet you, staffed in business hours?**
   - Yes: add the full UK postal address (building, street, town, postcode) to the footer and contact page; add `PostalAddress` to Organization; a Google Business Profile becomes possible. Use `ProfessionalService` only if it truly fits; never `MedicalBusiness` (you are not a healthcare provider).
   - No: no address, no LocalBusiness schema, no GBP. Google's guidelines limit profiles to businesses with in-person contact at an address or that travel to customers. A remote studio does not qualify, and a virtual office address breaks the guidelines.
2. **Is there a UK registered company?** If yes, show the company name, number and registered office in the footer (also a UK legal requirement for company websites). Add `legalName` and `identifier` to the schema.
3. **Coverage.** Write one true sentence and use it in the footer, About and service pages. Options, only if true:
   - "Working with consultants and private clinics across the UK."
   - "Based in [place], working with clinicians across the UK."
   - Or the honest version if the team is outside the UK: "Working remotely with clinicians across the UK." This is fine. Clarity beats a vague location.
4. **Phone.** If a UK number exists, show it first and keep the +91 number as secondary if it is still used. Never invent a UK number.

## Location pages

Not justified. The evidence for local presence is one client in London and Hertfordshire. A London page would be a doorway page. Revisit only with several local projects, local proof or a local team.

## Consistency (NAP) once decided

The same name, phone and email everywhere: site footer, contact page, Organization schema, LinkedIn, Companies House record, email signature, any directory listing. `BRAND` in `src/content/site.ts` drives the site and the schema from one place.
