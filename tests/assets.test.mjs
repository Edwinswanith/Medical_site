import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stat } from 'node:fs/promises';
import { join } from 'node:path';
import * as content from '../src/content/site.ts';

test('all local media in the published content exist and are nonempty', async () => {
  const assets = new Set();
  const walk = value => {
    if (typeof value === 'string' && /^\/media\/.*\.(webp|jpg|mp4|webm)$/.test(value)) assets.add(value);
    else if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === 'object') Object.values(value).forEach(walk);
  };
  walk(content);
  assert.ok(assets.size > 50);
  for (const asset of assets) assert.ok((await stat(join('public', asset))).size > 0, asset);
});
