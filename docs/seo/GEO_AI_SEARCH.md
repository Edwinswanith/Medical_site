# GEO and AI search

GEO here means making the business easy for search and answer engines to understand, retrieve, verify and cite. There are no hacks. Eligibility improves; no placement is guaranteed in AI Overviews, AI Mode, Copilot, ChatGPT or Perplexity.

## Crawler access (robots.txt)

Current policy (`src/app/robots.ts`): every crawler may fetch every public page; `/api/` is blocked; the sitemap is declared.

| Crawler | Purpose | Status now |
|---|---|---|
| Googlebot, Bingbot | Search indexing (Bing also feeds Copilot) | Allowed |
| OAI-SearchBot | Appearing in ChatGPT Search results | Allowed |
| ChatGPT-User | Fetching a page when a ChatGPT user asks about it | Allowed |
| PerplexityBot | Perplexity search | Allowed |
| GPTBot | Collecting content to **train** OpenAI models | Allowed (default, no rule) |
| Google-Extended | Using content to train / ground Gemini models; does not affect Google Search | Allowed (default) |
| ClaudeBot | Collecting content to train Anthropic models | Allowed (default) |

**Search and training are separate permissions.** Blocking GPTBot, Google-Extended or ClaudeBot does not remove the site from ChatGPT Search, Google Search or AI Overviews. For a marketing site that wants to be known, allowing everything is a reasonable default, and it is the default now. It is still a business decision: **no training-crawler rule has been changed without your sign-off.**

Robots rules only work if the host lets crawlers through. Check after launch that Vercel's firewall or bot protection does not answer these user agents with 403 or a challenge (POST_LAUNCH_CHECKLIST).

## llms.txt

- The site does not serve one.
- Google says AI Overviews and AI Mode need no special AI text file or special schema. No major engine has confirmed using `llms.txt`.
- **The sales copy presents it as a pillar** ("Open: Crawl rules and an llms.txt file that let AI assistants in") and as a package item. That overclaims. Suggested wording: "Crawl rules that let AI search crawlers in, rather than blocking them by default." Keep offering `llms.txt` to clients who want it, without implying it changes visibility.
- No `llms.txt` was added here, so the site does not claim a benefit it cannot show.

## Entity clarity (what an engine needs to answer "who is this?")

| Question | Answered on the site? |
|---|---|
| Who are we? | Partly: three names, no About |
| What do we do? | Yes (four services, clear copy) |
| Who is it for? | Implied ("your practice"); state it plainly on service pages |
| Where? | No |
| What is included? | Partly (packages) |
| How does the process work? | Yes (five steps, safeguards) |
| What evidence? | One real case; concept media elsewhere |
| How to contact? | Yes |

Structured data now ties every page to one Organization `@id` (`/#organization`) and one WebSite `@id` (`/#website`). Service pages will add `Service` nodes with `provider` pointing at the same Organization.

## What actually moves citation potential

1. One unambiguous entity: one name, real company details, an About page.
2. One page per service, each answering who, what, how, how long and for whom in plain sentences that can be quoted.
3. Original, checkable material: the case study in detail, the scripting method, a real approved film with transcript, and (if run properly) the AI-assistant test in CONTENT_PLAN month 2.
4. Being mentioned elsewhere: the client's site credit, LinkedIn, interviews, directories that matter to UK healthcare buyers. No on-site change replaces this.

## IndexNow

Not implemented. The site has 2 URLs today and changes on deploys, not on a publishing schedule; the sitemap is enough. Revisit when the insights section publishes regularly: then ping IndexNow from the deploy, for changed URLs only, with the key file served from `public/`.
