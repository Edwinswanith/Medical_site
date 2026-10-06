import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canonicalOrigin } from '../src/lib/canonical-origin.ts';

const primary = 'https://www.cogniversestudio.com';

test('an accidental preview or local origin cannot replace the public canonical', () => {
  for (const value of [undefined, '', 'http://localhost:3000', 'http://127.0.0.1:3102', 'http://[::1]:3000', 'https://preview.vercel.app']) {
    assert.equal(canonicalOrigin(value, primary), primary);
  }
});
test('normalises the known HTTP/apex host and keeps a legitimate custom HTTPS origin', () => {
  assert.equal(canonicalOrigin('http://cogniversestudio.com/services?utm_source=test', primary), primary);
  assert.equal(canonicalOrigin('https://studio.example.org/path?tracking=1', primary), 'https://studio.example.org');
});
test('rejects credentials and invalid or insecure custom canonical configurations', () => {
  for (const value of ['file:///private', 'https://user:password@example.com', 'http://example.com', 'not a URL']) {
    assert.throws(() => canonicalOrigin(value, primary));
  }
});
