import { load } from 'cheerio';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { get as httpGet } from 'node:http';
import { get as httpsGet } from 'node:https';
import { inspectPage, hasFragment } from './lib/seo-audit.mjs';

const [base = 'http://localhost:3100', origin = 'https://www.cogniversestudio.com'] = process.argv.slice(2);
const canonicalOrigin = new URL(origin).origin;
const results = [], cache = new Map();
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
  const locations = xml('loc').toArray().map(el => xml(el).text());
  check('sitemap 200 XML', sitemap.status === 200 && sitemap.headers.get('content-type')?.includes('xml') && xml('urlset').attr('xmlns') === 'http://www.sitemaps.org/schemas/sitemap/0.9');
  check('sitemap URLs canonical and unique', locations.length > 0 && new Set(locations).size === locations.length && locations.every(loc => { const url = new URL(loc); return url.origin === canonicalOrigin && !url.search && !url.hash && (url.pathname === '/' || !url.pathname.endsWith('/')); }));
  const paths = locations.map(loc => new URL(loc).pathname);
  const inventory = await sourceRoutes('src/app');
  check('sitemap covers all public routes', inventory.every(path => paths.includes(path)) && paths.every(path => inventory.includes(path)), `${inventory.length} source routes, ${paths.length} sitemap URLs`);
  const titles = new Set(), descriptions = new Set(), inbound = new Set(['/']), orgIds = new Set(), external = new Set();
  for (const loc of locations) {
    const path = new URL(loc).pathname;
    const page = await get(path);
    check(`${path}: HTTP 200 HTML`, page.status === 200 && page.headers.get('content-type')?.includes('text/html'));
    const audit = inspectPage(page.body, loc), $ = audit.$;
    audit.issues.forEach(issue => check(`${path}: ${issue.name}`, issue.pass, issue.detail));
    check(`${path}: unique title`, !titles.has(audit.title)); titles.add(audit.title);
    check(`${path}: unique description`, !descriptions.has(audit.description)); descriptions.add(audit.description);
    orgIds.add(audit.organizationId);
    for (const link of $('a[href]').toArray()) {
      const href = $(link).attr('href');
      const target = new URL(href, loc);
      if (!['http:', 'https:'].includes(target.protocol)) continue;
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
    const query = await get(path + '?utm_source=seo-check');
    check(`${path}: query uses clean canonical`, load(query.body)('link[rel="canonical"]').attr('href') === loc);
    if (path !== '/') {
      const slash = await get(path + '/');
      check(`${path}: trailing slash redirects once`, [307, 308].includes(slash.status) && new URL(slash.headers.get('location'), base).pathname === path);
    }
  }
  check('no orphan public pages', paths.every(path => inbound.has(path)));
  check('one stable organization across pages', orgIds.size === 1 && orgIds.has(`${canonicalOrigin}/#organization`));
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
console.log(`${results.length - failed} PASS, ${failed} FAIL`);
process.exitCode = failed ? 1 : 0;
