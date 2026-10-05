# Post-launch checklist

5 October 2026. These are operational actions to perform after the tested code is deployed. No external account has been configured by this work.

## Before publishing

- [ ] Supply the legal/controller identity, actual enquiry receiver, retention period and international processing arrangements; finish the privacy notice. The current notice does not establish a complete business privacy policy.
- [ ] Configure the real Resend or webhook environment. Test a controlled enquiry and confirm receipt in the intended account, with authorisation to send that message.
- [ ] Keep NEXT_PUBLIC_SITE_URL set to https://www.cogniversestudio.com. Confirm the custom domain belongs to this production deployment.
- [ ] Keep Vercel aliases/previews noindexed; confirm the new host-based X-Robots-Tag header reaches the live alias. Noindex is not access control: use deployment protection for confidential previews.
- [ ] Request actual approved film/presenter/social samples and permission to publish them. Keep concept labels until real proof is available.

## Production URLs and redirects

- [ ] Run the build/lint/type/test checks and the HTTP audit again against the deployed version. Confirm all ten sitemap URLs return 200 on the canonical host.
- [ ] Check canonical and og:url on every page, robots sitemap URL, Service/provider IDs and visible breadcrumbs.
- [ ] Check apex HTTPS goes directly to www HTTPS. The inspected HTTP apex currently uses two hops (HTTP apex → HTTPS apex → HTTPS www). Review Vercel/domain redirect settings to shorten that chain; repository canonicals already point to the final host.
- [ ] Confirm trailing slashes resolve to the same clean URL without a chain; query parameters should not change canonical URLs.
- [ ] Check the alternate Vercel production address and preview deployments are noindexed, with primary-domain pages indexable. Verify there is no firewall challenge for legitimate crawlers using logs/real crawler-IP checks.
- [ ] Retest contact with JavaScript enabled and disabled, provider unavailable and provider failure; never count a screen message alone as proof of actual receipt.
- [ ] Run Google's Rich Results Test where applicable and Schema.org Validator for Service/WebPage relationships. Local parsing is already tested; external validators are NOT TESTED.

## Google Search Console

- [ ] Verify the domain property using the real account and DNS access.
- [ ] Submit https://www.cogniversestudio.com/sitemap.xml.
- [ ] Inspect homepage, four services, About and the project. Check user-declared versus Google-selected canonical, crawl response, rendered HTML and indexing status.
- [ ] Review page indexing and Core Web Vitals reports when enough data exists. Local Lighthouse cannot establish field INP or field CWV status.
- [ ] Review query relevance, UK impressions/clicks and qualified enquiries. Check generative-AI or multimodal reporting only if available in the account at that time; do not claim it is configured or available without checking.

## Google Business Profile

- [ ] Establish real storefront/in-person service arrangements and eligibility first. UK-wide digital service coverage does not itself establish eligibility.
- [ ] If eligible, verify the real business identity, address visibility, appropriate category, actual hours, permitted service areas, images and preferred website URL.
- [ ] Add verified profile/social URLs to sameAs only after their ownership and relevance are established. Publish only real reviews with appropriate permission.

## Bing and Copilot

- [ ] Verify the site in Bing Webmaster Tools and submit the canonical sitemap.
- [ ] Check canonical selection, crawl responses, indexing and query relevance.
- [ ] IndexNow is not implemented. Reassess only if publishing frequency makes notifications useful. Follow the official key-file protocol and submit only actual URL changes.

## Performance and content follow-up

- [ ] Monitor production mobile LCP: local lab LCP remains above 2.5 seconds despite responsive images and deferred clips. Preserve the signature motion while profiling actual device/network bottlenecks.
- [ ] Measure field INP/CLS/LCP when traffic supplies data; use lab TBT only as a diagnostic, not as an INP claim.
- [ ] Use the three-month roadmap to gather first-hand evidence before writing comparison guides. Identify real author/reviewer responsibility and truthful dates.
- [ ] Keep a small dated log of observed AI citations and prompts. A single answer or schema block is not a recommendation guarantee.
