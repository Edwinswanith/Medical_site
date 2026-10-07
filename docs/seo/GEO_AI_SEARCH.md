# GEO and AI-search discoverability

Updated 6 October 2026. Objective: improve eligibility, understanding and verification of CogniVerse Studio. No ranking, citation or recommendation outcome is guaranteed. See the current root `SEO-GEO-AUDIT.md` for implementation and validation.

## Implemented

Four server-rendered service pages state the provider, offer, buyer, UK coverage, deliverables, review process, proof limitations and next action. The website service links to a real client project. The other services label public previews as AI-generated concepts and invite relevant samples. Text remains actual HTML; it is not hidden in video, canvas or imagery.

Organization, WebSite, WebPage, Service and visible BreadcrumbList entities use stable www IDs. Each Service connects to the same Organization and its page. The studio has no invented office, credentials, review rating or medical-provider type. Buyer questions are visible content without speculative FAQ rich-result markup. Concept loops are not marked VideoObject or described as delivered client films.

The homepage now explains GEO as helping systems understand, retrieve and verify a practice, with an explicit statement that rankings and recommendations are not guaranteed. A hypothetical assistant exchange remains labelled Illustration.

## Crawler policy

robots.txt allows public content through User-Agent: * and excludes /api/. This permits Googlebot, Bingbot and OAI-SearchBot unless deployment-level controls intervene. The existing policy also allows training crawlers; it has not been changed by this work.

OAI-SearchBot is used for search discovery; GPTBot concerns model-training access. They can be controlled separately. Changing the GPTBot policy requires an explicit business decision after explaining that distinction. A search permission is not a promise that a page will be indexed or cited. User-agent probes cannot prove access from genuine crawler IPs; verify server/firewall logs after launch.

## llms.txt and IndexNow decisions

The studio now has an optional `/llms.txt` directory, generated from the same eleven-page inventory as the sitemap. It states the services, UK audience, approval process, contact details and distinction between real website work and concept footage. It is available to tools that choose to use it. [Google's AI optimisation guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) says Google Search does not use llms.txt for visibility or rankings; this file supplements readable public pages and has no claimed ranking benefit.

IndexNow is not implemented. The current eleven-page site changes through deployments rather than a publishing feed; sitemap submission and webmaster monitoring are the first operational steps. Reconsider for frequent additions/updates. A future implementation must follow the [official protocol](https://www.indexnow.org/documentation), use a real verification key file on the canonical host and submit only added, materially updated or removed URLs. Do not ping unchanged pages, and do not claim faster notification guarantees indexing.

## Next authority work

Acquire approved first-hand film/presenter/social examples and accountable author/reviewer attribution. Explain actual methodology with original examples, not generated testimonials. Use the content roadmap for useful comparisons only when supporting evidence exists. Check a small consistent set of buyer prompts across search/answer tools and record dates, sources and observed responses. Actual citations, search account data and post-launch field performance remain NOT TESTED.
