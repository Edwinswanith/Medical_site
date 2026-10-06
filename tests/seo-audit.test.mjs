import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspectPage, hasFragment } from '../scripts/lib/seo-audit.mjs';

test('detects a redirecting host, broken schema references and skipped headings', () => {
  const html = '<html lang="en-GB"><head><link rel="canonical" href="https://example.com/page"></head><body><main><h1>Service</h1><h3>Skipped</h3><script type="application/ld+json">{"@type":"Service","@id":"https://www.example.com/page#service","provider":{"@id":"https://www.example.com/#missing"}}</script></main></body></html>';
  const issues = inspectPage(html, 'https://www.example.com/page').issues;
  for (const name of ['canonical', 'schema references resolve', 'heading levels']) assert.equal(issues.find(item => item.name === name).pass, false);
});
test('recognises exact fragment IDs including encoded characters', () => {
  assert.equal(hasFragment('<main id="one & two"></main>', 'one%20%26%20two'), true);
  assert.equal(hasFragment('<main id="one"></main>', 'on'), false);
});
test('rejects malformed JSON-LD and missing alt or reserved dimensions', () => {
  const issues = inspectPage('<main><h1>Test</h1><img src="/photo.webp"><script type="application/ld+json">{bad}</script></main>', 'https://example.com').issues;
  for (const name of ['JSON-LD parses', 'image alt attributes', 'image dimensions']) assert.equal(issues.find(item => item.name === name).pass, false);
});

test('schema text alone cannot satisfy visible organization evidence', () => {
  const html = '<body><main><h1>Service</h1></main><a href="mailto:info@example.com">Email</a><a href="tel:+441234567890">Phone</a><script type="application/ld+json">{"@type":"Organization","@id":"https://example.com/#organization","name":"Invisible Studio","email":"info@example.com","telephone":"+441234567890"}</script></body>';
  assert.equal(inspectPage(html, 'https://example.com').issues.find(item => item.name === 'organization facts match HTML').pass, false);
});
test('rejects directory entries without corresponding visible links and mismatched social titles', () => {
  const html = '<head><title>Medical websites</title><meta property="og:title" content="Another page"><meta name="twitter:title" content="Another page"></head><body><main><h1>Medical websites</h1><p>Patient films</p></main><script type="application/ld+json">{"@type":"ItemList","@id":"https://example.com/services#list","numberOfItems":1,"itemListElement":[{"@type":"ListItem","position":1,"name":"Patient films","url":"https://example.com/services/patient-films"}]}</script></body>';
  const issues = inspectPage(html, 'https://example.com/services').issues;
  for (const name of ['directory schema matches visible links', 'social titles match page title']) assert.equal(issues.find(item => item.name === name).pass, false);
});
