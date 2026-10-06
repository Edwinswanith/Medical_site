import { load } from 'cheerio';
import { readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { get as httpGet } from 'node:http';
import { get as httpsGet } from 'node:https';
import { inspectPage, hasFragment } from './lib/seo-audit.mjs';

const [base = 'http://localhost:3100', origin = 'https://www.cogniversestudio.com'] = process.argv.slice(2);
const canonicalOrigin = new URL(origin).origin;
const results = [], cache = new Map(), publicPages = [];
const check = (name, pass, detail = '') => results.push({ name, pass: !!pass, detail });
const get = path => {
  if (!cache.has(path)) cache.set(path, (async () => {
    const response = await fetch(new URL(path, base), { redirect: 'manual', signal: AbortSignal.timeout(20000) });
    return { status: response.status, headers: response.headers, body: await response.text() };
  })());
  return cache.get(path);
};
const headersForHost = host => new Promise((resolve, reject) => {
  const url = new URL('/', base);
  // Fetch normalises Host; native HTTP is needed to test host-based Next headers.
  const request = (url.protocol === 'https:' ? httpsGet : httpGet)(url, { headers: { Host: host } }, response => { response.resume(); resolve(response.headers); });
  request.on('error', reject); request.setTimeout(20000, () => request.destroy(new Error('Host header check timed out')));
});
const sourceRoutes = async (directory, parts = []) => {
  const paths = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name !== 'api') paths.push(...await sourceRoutes(join(directory, entry.name), [...parts, entry.name]));
    else if (entry.name === 'page.tsx') paths.push('/' + parts.filter(part => !part.startsWith('(')).join('/'));
  }
  return paths;
};
try {
  const robots = await get('/robots.txt');
  check('robots: 200 text/plain', robots.status === 200 && robots.headers.get('content-type')?.includes('text/plain'));
  check('public crawlers allowed; API excluded', /User-Agent: \*/i.test(robots.body) && /^Allow: \/$/m.test(robots.body) && /^Disallow: \/api\/$/m.test(robots.body) && !/^Disallow: \/$/m.test(robots.body));
  check('robots canonical sitemap', robots.body.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
  const sitemap = await get('/sitemap.xml');
  const xml = load(sitemap.body, { xml: true });
  const locations = xml('url > loc').toArray().map(el => xml(el).text());
  check('sitemap 200 XML', sitemap.status === 200 && sitemap.headers.get('content-type')?.includes('xml') && xml('urlset').attr('xmlns') === 'http://www.sitemaps.org/schemas/sitemap/0.9');
  check('sitemap URLs canonical and unique', locations.length > 0 && new Set(locations).size === locations.length && locations.every(loc => { const url = new URL(loc); return url.origin === canonicalOrigin && !url.search && !url.hash && (url.pathname === '/' || !url.pathname.endsWith('/')); }));
  const paths = locations.map(loc => new URL(loc).pathname);
  publicPages.push(...paths);
  const inventory = await sourceRoutes('src/app');
  check('sitemap covers all public routes', inventory.every(path => paths.includes(path)) && paths.every(path => inventory.includes(path)), `${inventory.length} source routes, ${paths.length} sitemap URLs`);
  for (const image of xml('image\\:loc').toArray()) {
    const url = new URL(xml(image).text());
    check('sitemap image uses canonical origin', url.origin === canonicalOrigin);
    const response = await get(url.pathname);
    check(`sitemap image ${url.pathname}`, response.status === 200 && response.headers.get('content-type')?.startsWith('image/'));
  }
  const directory = await get('/llms.txt');
  check('llms.txt: 200 public plain text', directory.status === 200 && directory.headers.get('content-type')?.includes('text/plain') && directory.body.startsWith('# CogniVerse Studio'));
  const directoryUrls = [...directory.body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map(match => match[1]);
  check('llms.txt covers exactly the canonical public pages', directoryUrls.length === locations.length && new Set(directoryUrls).size === directoryUrls.length && locations.every(loc => directoryUrls.includes(loc)));
  check('llms.txt distinguishes concepts and service geography', directory.body.includes('United Kingdom') && directory.body.includes('AI-generated concepts') && directory.body.includes('not a healthcare provider'));
  const titles = new Set(), descriptions = new Set(), inbound = new Set(['/']), orgIds = new Set(), external = new Set();
  for (const loc of locations) {
    const path = new URL(loc).pathname;
    const page = await get(path);
    check(`${path}: HTTP 200 HTML`, page.status === 200 && page.headers.get('content-type')?.includes('text/html'));
    check(`${path}: indexing allowed by HTTP headers`, !page.headers.get('x-robots-tag')?.includes('noindex'));
    const audit = inspectPage(page.body, loc), $ = audit.$;
    audit.issues.forEach(issue => check(`${path}: ${issue.name}`, issue.pass, issue.detail));
    check(`${path}: unique title`, !titles.has(audit.title)); titles.add(audit.title);
    check(`${path}: unique description`, !descriptions.has(audit.description)); descriptions.add(audit.description);
    orgIds.add(audit.organizationId);
    for (const link of $('a[href]').toArray()) {
      const href = $(link).attr('href');
      const target = new URL(href, loc);
      if (!['http:', 'https:'].includes(target.protocol)) continue;
      check(`${path}: secure public link ${href}`, target.protocol === 'https:' || target.origin === new URL(base).origin);
      if (target.origin !== canonicalOrigin && target.origin !== new URL(base).origin) { external.add(target.href); continue; }
      inbound.add(target.pathname);
      const response = await get(target.pathname + target.search);
      check(`${path}: link ${href}`, response.status === 200, `HTTP ${response.status}`);
      if (target.hash) check(`${path}: fragment ${href}`, hasFragment(response.body, target.hash.slice(1)));
    }
    for (const image of $('img').toArray()) {
      const src = $(image).attr('src');
      if (!src || src.startsWith('data:')) continue;
      const response = await get(src);
      check(`${path}: image ${src}`, response.status === 200 && response.headers.get('content-type')?.startsWith('image/'));
    }
    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      const imageUrl = $(selector).attr('content');
      if (!imageUrl) continue;
      const image = new URL(imageUrl);
      check(`${path}: social image on canonical origin`, image.origin === canonicalOrigin);
      const response = await get(image.pathname + image.search);
      check(`${path}: social image responds`, response.status === 200 && response.headers.get('content-type')?.startsWith('image/'));
    }
    const query = await get(path + '?utm_source=seo-check');
    check(`${path}: query uses clean canonical`, load(query.body)('link[rel="canonical"]').attr('href') === loc);
    if (path !== '/') {
      const slash = await get(path + '/');
      check(`${path}: trailing slash redirects once`, [307, 308].includes(slash.status) && new URL(slash.headers.get('location'), base).pathname === path);
    }
  }
  check('no orphan public pages', paths.every(path => inbound.has(path)));
  check('one stable organization across pages', orgIds.size === 1 && orgIds.has(`${canonicalOrigin}/#organization`));
  for (const bot of ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot', 'GPTBot', 'Google-Extended']) {
    for (const path of paths) {
      const response = await fetch(new URL(path, base), { headers: { 'User-Agent': bot }, signal: AbortSignal.timeout(20000) });
      const html = load(await response.text());
      check(`${bot}: ${path} HTML and canonical`, response.status === 200 && html('main h1').length === 1 && html('link[rel="canonical"]').attr('href') === locations.find(loc => new URL(loc).pathname === path));
    }
  }
  for (const path of ['/.env', '/.env.local', '/.git/config', '/src/content/site.ts']) check(`private file ${path} not exposed`, (await get(path)).status === 404);
  for (const state of ['sent', 'invalid', 'unavailable']) {
    const response = await get(`/contact?enquiry=${state}`);
    const html = load(response.body);
    check(`contact ${state}: canonical and form state`, response.status === 200 && html('link[rel="canonical"]').attr('href') === `${canonicalOrigin}/contact` && (html('form').length === 0) === (state === 'sent'));
  }
  for (const url of external) {
    const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000) });
    check(`external link ${url}`, response.ok, `HTTP ${response.status}`);
  }
  const missing = await get('/this-does-not-exist');
  check('unknown URL: 404 and noindex', missing.status === 404 && load(missing.body)('meta[name="robots"]').attr('content')?.includes('noindex'));
  for (const path of ['/favicon.ico', '/icon.png', '/apple-icon.png', '/opengraph-image', '/logo.png']) check(`${path}: HTTP 200`, (await get(path)).status === 200);
  const preview = await headersForHost('medicalsite-two.vercel.app');
  check('Vercel alias excluded from indexing', preview['x-robots-tag']?.includes('noindex'));
  const primary = await headersForHost(new URL(origin).hostname);
  check('primary host remains indexable', !primary['x-robots-tag']?.includes('noindex'));
} catch (error) { check('audit completed', false, error.message); }
for (const result of results) if (!result.pass || process.env.SEO_VERBOSE) console.log(`${result.pass ? 'PASS' : 'FAIL'} ${result.name} ${result.detail || ''}`);
const failed = results.filter(result => !result.pass).length;
if (process.env.SEO_REPORT_PATH) await writeFile(process.env.SEO_REPORT_PATH, JSON.stringify({ base, canonicalOrigin, publicPages, passed: results.length - failed, failed, checks: results }, null, 2));
console.log(`${results.length - failed} PASS, ${failed} FAIL`);
process.exitCode = failed ? 1 : 0;
