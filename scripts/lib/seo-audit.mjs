import { load } from 'cheerio';

export function inspectPage(html, canonical) {
  const $ = load(html), issues = [];
  const visibleBody = $('body').clone().find('script, style, template').remove().end().text();
  const visibleMain = $('main').clone().find('script, style, template').remove().end().text();
  const check = (name, pass, detail = '') => issues.push({ name, pass: !!pass, detail });
  check('language', $('html').attr('lang') === 'en-GB');
  check('title', $('title').length === 1 && $('title').text().trim());
  check('description', $('meta[name="description"]').length === 1 && $('meta[name="description"]').attr('content'));
  check('canonical', $('link[rel="canonical"]').length === 1 && $('link[rel="canonical"]').attr('href') === canonical, $('link[rel="canonical"]').attr('href'));
  check('indexable', !$('meta[name="robots"]').attr('content')?.includes('noindex'));
  for (const property of ['og:title', 'og:description', 'og:image', 'og:site_name', 'og:locale', 'og:type']) check(property, $(`meta[property="${property}"]`).attr('content'));
  check('og:url', $('meta[property="og:url"]').attr('content') === canonical);
  check('twitter card', $('meta[name="twitter:card"]').attr('content') === 'summary_large_image');
  check('social titles match page title', $('meta[property="og:title"]').attr('content') === $('title').text() && $('meta[name="twitter:title"]').attr('content') === $('title').text());
  check('social descriptions match page description', ['meta[property="og:description"]', 'meta[name="twitter:description"]'].every(selector => $(selector).attr('content') === $('meta[name="description"]').attr('content')));
  for (const property of ['twitter:image', 'twitter:image:alt']) check(property, $(`meta[name="${property}"]`).attr('content'));
  const headings = $('main h1, main h2, main h3, main h4, main h5, main h6').toArray();
  check('one H1', $('main h1').length === 1);
  check('heading levels', headings.every((el, i) => !i || Number(el.tagName.slice(1)) <= Number(headings[i - 1].tagName.slice(1)) + 1));
  check('image alt attributes', $('img').toArray().every(el => $(el).attr('alt') !== undefined));
  check('image dimensions', $('img').toArray().every(el => Number($(el).attr('width')) > 0 && Number($(el).attr('height')) > 0));
  check('video posters and dimensions', $('video').toArray().every(el => ($(el).attr('poster') || $(el).attr('data-poster')) && Number($(el).attr('width')) > 0 && Number($(el).attr('height')) > 0));
  check('HTML service content', visibleMain.trim().length > 150);
  check('no placeholder public copy', !/lorem ipsum|\[insert (?:company|keyword|description)|your company name/i.test(visibleMain));
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
  check('organization facts match HTML', organization?.name && visibleBody.includes(organization.name) && $(`a[href="mailto:${organization.email}"]`).length && $(`a[href="tel:${organization.telephone}"]`).length);
  check('legal name visible', organization?.legalName && visibleBody.includes(organization.legalName));
  check('no unsupported business schema', entities.every(entity => !['Physician', 'MedicalBusiness', 'LocalBusiness', 'Review', 'AggregateRating'].includes(entity['@type'])));
  const page = definitions.get(`${canonical}#webpage`);
  check('page entity matches canonical and metadata', page?.url === canonical && page?.description === $('meta[name="description"]').attr('content'));
  check('page connected to website and organization', page?.isPartOf?.['@id'] === `${origin}/#website` && page?.about?.['@id'] === organization?.['@id']);
  if (new URL(canonical).pathname !== '/') check('page connected to visible breadcrumbs', page?.breadcrumb?.['@id'] === `${canonical}#breadcrumbs` && $('nav[aria-label="Breadcrumb"]').length === 1);
  for (const entity of entities.filter(entity => entity['@type'] === 'Service')) {
    check('service connected to provider', entity.provider?.['@id'] === organization?.['@id']);
    check('service description visible', visibleMain.includes(entity.description));
    check('service type matches primary heading', entity.serviceType === $('main h1').text().trim());
    check('service UK coverage', entity.areaServed?.name === 'United Kingdom');
  }
  for (const entity of entities.filter(entity => entity['@type'] === 'BreadcrumbList')) {
    const crumbs = $('nav[aria-label="Breadcrumb"]');
    check('visible breadcrumbs match schema', entity.itemListElement.every((item, i) => item.position === i + 1 && crumbs.text().includes(item.name)));
  }
  for (const entity of entities.filter(entity => entity['@type'] === 'ItemList')) {
    check('directory schema matches visible links', entity.numberOfItems === entity.itemListElement.length && entity.itemListElement.every((item, index) => {
      const url = new URL(item.url);
      return item.position === index + 1 && visibleMain.includes(item.name) && $('main a[href]').toArray().some(link => new URL($(link).attr('href'), canonical).href === url.href);
    }));
  }
  return { $, issues, title: $('title').text(), description: $('meta[name="description"]').attr('content'), organizationId: organization?.['@id'] };
}

export function hasFragment(html, fragment) {
  const $ = load(html);
  return $('[id], a[name]').toArray().some(el => $(el).attr('id') === decodeURIComponent(fragment) || $(el).attr('name') === decodeURIComponent(fragment));
}
