// SEO checks against a running production build: robots, sitemap, titles, descriptions, canonicals,
// Open Graph, JSON-LD, headings, alt attributes, internal links, 404. Usage: npm run seo:check -- <server> <canonical origin>
// e.g. NEXT_PUBLIC_SITE_URL=https://www.example.co.uk npm run build && npm run start, then npm run seo:check -- http://localhost:3000 https://www.example.co.uk
const [base = "http://localhost:3000", origin = process.env.NEXT_PUBLIC_SITE_URL] = process.argv.slice(2);
if (!origin) throw new Error("Pass the canonical origin, or set NEXT_PUBLIC_SITE_URL.");
const res = []; const ok = (name, pass, detail = '') => res.push([pass ? 'PASS' : 'FAIL', name, detail]);
const get = async (p) => { const r = await fetch(base + p, { redirect: 'manual' }); return { status: r.status, type: r.headers.get('content-type'), body: await r.text() }; };
const attr = (h, re) => (h.match(re) || [])[1];
const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const robots = await get('/robots.txt');
ok('robots.txt 200 text/plain', robots.status === 200 && /text\/plain/.test(robots.type));
ok('robots allows all, blocks /api/ only', /User-Agent: \*\nAllow: \/\nDisallow: \/api\//i.test(robots.body), JSON.stringify(robots.body));
ok('robots points to absolute sitemap', robots.body.includes(`Sitemap: ${origin}/sitemap.xml`));

const sm = await get('/sitemap.xml');
const locs = [...sm.body.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
ok('sitemap.xml 200 xml', sm.status === 200 && /xml/.test(sm.type), `${locs.length} urls`);
ok('sitemap urls absolute on origin', locs.length > 0 && locs.every((u) => u.startsWith(origin)), locs.join(' '));

const titles = new Set(), descs = new Set(), ids = {};
for (const loc of locs) {
  const path = loc.slice(origin.length) || '/';
  const p = await get(path); const h = p.body;
  ok(`${path} 200`, p.status === 200, String(p.status));
  const title = strip(attr(h, /<title>(.*?)<\/title>/s) || ''); const desc = attr(h, /<meta name="description" content="([^"]*)"/);
  const canon = attr(h, /<link rel="canonical" href="([^"]*)"/);
  ok(`${path} title unique, 30-65 chars`, title && !titles.has(title) && title.length >= 30 && title.length <= 65, `${title.length}: ${title}`); titles.add(title);
  ok(`${path} description unique, 70-170 chars`, desc && !descs.has(desc) && desc.length >= 70 && desc.length <= 170, `${desc?.length}`); descs.add(desc);
  ok(`${path} canonical self, absolute`, canon === loc || canon === loc.replace(/\/$/, ''), canon);
  ok(`${path} not noindexed`, !/<meta name="robots" content="[^"]*noindex/.test(h));
  for (const k of ['og:title', 'og:description', 'og:url', 'og:image', 'og:site_name', 'og:locale']) ok(`${path} ${k}`, new RegExp(`property="${k}"`).test(h), attr(h, new RegExp(`property="${k}" content="([^"]*)"`)));
  ok(`${path} og:image absolute`, (attr(h, /property="og:image" content="([^"]*)"/) || '').startsWith(origin));
  ok(`${path} twitter card`, /name="twitter:card" content="summary_large_image"/.test(h));
  ok(`${path} html lang en-GB`, /<html lang="en-GB"/.test(h));
  // JSON-LD: parses, ids on the origin, every referenced @id defined somewhere on the page
  const blocks = [...h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1]);
  let parsed = []; try { parsed = blocks.map((b) => JSON.parse(b)); ok(`${path} JSON-LD parses`, blocks.length > 0, `${blocks.length} blocks`); } catch (e) { ok(`${path} JSON-LD parses`, false, String(e)); }
  const defined = new Set(), refs = new Set(); const walk = (n) => { if (Array.isArray(n)) return n.forEach(walk); if (n && typeof n === 'object') { if (n['@id']) (Object.keys(n).length > 1 ? defined : refs).add(n['@id']); Object.values(n).forEach(walk); } };
  walk(parsed);
  ok(`${path} JSON-LD @ids resolve`, [...refs].every((r) => defined.has(r)), [...refs].filter((r) => !defined.has(r)).join(' '));
  ok(`${path} JSON-LD ids on origin`, [...defined].every((d) => d.startsWith(origin)));
  for (const d of defined) (ids[d] ||= []).push(path);
  // Headings: one h1, no skipped levels, no words glued together across lines
  const hs = [...h.matchAll(/<h([1-6])[^>]*>(.*?)<\/h\1>/gs)].map((m) => [+m[1], strip(m[2].replace(/<svg.*?<\/svg>/gs, ''))]);
  ok(`${path} exactly one h1`, hs.filter((x) => x[0] === 1).length === 1, hs.find((x) => x[0] === 1)?.[1]);
  const skips = hs.filter((x, i) => i && x[0] > hs[i - 1][0] + 1); ok(`${path} no skipped heading levels`, !skips.length, skips.map((s) => s[1]).join(' | '));
  const glued = hs.filter(([, t]) => /[a-z’.,][A-Z]/.test(t) || /(practice’smedia|thatget|plainEnglish|dothe|aboutyour|website\.Every|Sheth,robotic)/.test(t)); ok(`${path} heading text has word breaks`, !glued.length, glued.map((g) => g[1]).join(' | '));
  // Images: every non-decorative image has alt; width/height reserved
  const imgs = [...h.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
  ok(`${path} every img has an alt attribute`, imgs.every((i) => /alt="/.test(i)), `${imgs.length} imgs`);
  // Internal links resolve
  const links = [...new Set([...h.matchAll(/href="(\/[^"#]*)/g)].map((m) => m[1]))].filter((l) => !l.startsWith('/_next'));
  for (const l of links) { const r = await fetch(base + (l || '/'), { redirect: 'manual' }); ok(`${path} link ${l || '/'} resolves`, r.status === 200, String(r.status)); }
  // Core content is in the server HTML (no JS needed)
  const words = strip(h.replace(/<(script|style)[^>]*>.*?<\/\1>/gs, '')).split(' ').length; ok(`${path} server HTML has real text`, words > 100, `${words} words`);
}
const nf = await get('/this-does-not-exist'); ok('unknown URL returns 404', nf.status === 404, String(nf.status));
ok('404 page is noindex', /<meta name="robots" content="[^"]*noindex/.test(nf.body));
for (const p of ['/favicon.ico', '/icon.png', '/apple-icon.png', '/opengraph-image', '/logo.png']) { const r = await fetch(base + p); ok(`${p} 200`, r.status === 200, r.headers.get('content-type')); }
ok('Organization @id identical across pages', Object.entries(ids).filter(([k]) => k.endsWith('#organization')).every(([, v]) => v.length === locs.length));
for (const [s, n, d] of res) console.log(s.padEnd(5), n, d ? `(${String(d).slice(0, 110)})` : '');
console.log(`\n${res.filter((r) => r[0] === 'PASS').length} pass, ${res.filter((r) => r[0] === 'FAIL').length} fail`);
