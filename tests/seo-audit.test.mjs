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
