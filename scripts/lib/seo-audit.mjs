import { load } from 'cheerio';

export function inspectPage(html, canonical) {
  const $ = load(html), issues = [];
  const check = (name, pass, detail = '') => issues.push({ name, pass: !!pass, detail });
  check('language', $('html').attr('lang') === 'en-GB');
  check('title', $('title').length === 1 && $('title').text().trim());
  check('description', $('meta[name="description"]').length === 1 && $('meta[name="description"]').attr('content'));
  check('canonical', $('link[rel="canonical"]').length === 1 && $('link[rel="canonical"]').attr('href') === canonical, $('link[rel="canonical"]').attr('href'));
  check('indexable', !$('meta[name="robots"]').attr('content')?.includes('noindex'));
  for (const property of ['og:title', 'og:description', 'og:image', 'og:site_name', 'og:locale']) check(property, $(`meta[property="${property}"]`).attr('content'));
  check('og:url', $('meta[property="og:url"]').attr('content') === canonical);
  check('twitter card', $('meta[name="twitter:card"]').attr('content') === 'summary_large_image');
  const headings = $('main h1, main h2, main h3, main h4, main h5, main h6').toArray();
  check('one H1', $('main h1').length === 1);
  check('heading levels', headings.every((el, i) => !i || Number(el.tagName.slice(1)) <= Number(headings[i - 1].tagName.slice(1)) + 1));
  check('image alt attributes', $('img').toArray().every(el => $(el).attr('alt') !== undefined));
  check('image dimensions', $('img').toArray().every(el => Number($(el).attr('width')) > 0 && Number($(el).attr('height')) > 0));
  check('video posters and dimensions', $('video').toArray().every(el => ($(el).attr('poster') || $(el).attr('data-poster')) && Number($(el).attr('width')) > 0 && Number($(el).attr('height')) > 0));
  check('HTML service content', $('main').clone().find('script, style').remove().end().text().trim().length > 150);
  let schema = [];
  try {
    schema = $('script[type="application/ld+json"]').toArray().map(el => JSON.parse($(el).text()));
    check('JSON-LD parses', schema.length > 0);
  } catch (error) { check('JSON-LD parses', false, error.message); }
  const definitions = new Map(), references = new Set(), entities = [];
  const walk = value => {
    if (Array.isArray(value)) return value.forEach(walk);
    if (!value || typeof value !== 'object') return;
    if (value['@type']) entities.push(value);
    if (value['@id']) {
      if (Object.keys(value).length > 1) {
        check('unique schema entity ID', !definitions.has(value['@id']), value['@id']);
        definitions.set(value['@id'], value);
      } else references.add(value['@id']);
    }
    Object.values(value).forEach(walk);
  };
  walk(schema);
  check('schema references resolve', [...references].every(id => definitions.has(id)), [...references].filter(id => !definitions.has(id)).join(', '));
  const origin = new URL(canonical).origin;
  check('schema IDs on canonical origin', [...definitions.keys()].every(id => new URL(id).origin === origin));
  const organization = entities.find(entity => entity['@type'] === 'Organization');
  check('organization facts match HTML', organization?.name && $('body').text().includes(organization.name) && $(`a[href="mailto:${organization.email}"]`).length && $(`a[href="tel:${organization.telephone}"]`).length);
  check('no unsupported business schema', entities.every(entity => !['Physician', 'MedicalBusiness', 'LocalBusiness', 'Review', 'AggregateRating'].includes(entity['@type'])));
  for (const entity of entities.filter(entity => entity['@type'] === 'Service')) {
    check('service connected to provider', entity.provider?.['@id'] === organization?.['@id']);
    check('service description visible', $('main').text().includes(entity.description));
    check('service UK coverage', entity.areaServed?.name === 'United Kingdom');
  }
  for (const entity of entities.filter(entity => entity['@type'] === 'BreadcrumbList')) {
    const crumbs = $('nav[aria-label="Breadcrumb"]');
    check('visible breadcrumbs match schema', entity.itemListElement.every((item, i) => item.position === i + 1 && crumbs.text().includes(item.name)));
  }
  return { $, issues, title: $('title').text(), description: $('meta[name="description"]').attr('content'), organizationId: organization?.['@id'] };
}

export function hasFragment(html, fragment) {
  const $ = load(html);
  return $('[id], a[name]').toArray().some(el => $(el).attr('id') === decodeURIComponent(fragment) || $(el).attr('name') === decodeURIComponent(fragment));
}
