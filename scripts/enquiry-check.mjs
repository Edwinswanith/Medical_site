// Uses an isolated local webhook. Never sends test enquiries to an external service.
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';

let providerStatus = 200, deliveries = 0;
const webhook = createServer((req, res) => { req.resume(); deliveries++; res.writeHead(providerStatus); res.end('test provider'); });
await new Promise(resolve => webhook.listen(0, '127.0.0.1', resolve));
const port = Number(process.env.ENQUIRY_TEST_PORT || 3101);
const unconfigured = process.argv.includes('--unconfigured');
const app = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], {
  stdio: ['ignore', 'pipe', 'pipe'],
  env: { ...process.env, CONTACT_PROVIDER: unconfigured ? '' : 'webhook', CONTACT_WEBHOOK_URL: unconfigured ? '' : `http://127.0.0.1:${webhook.address().port}`, RESEND_API_KEY: '' },
});
let output = ''; app.stdout.on('data', chunk => output += chunk); app.stderr.on('data', chunk => output += chunk);
const base = `http://127.0.0.1:${port}`;
const valid = { name: 'Automated test', email: 'test@example.invalid', consent: true };
const json = body => fetch(`${base}/api/enquiry`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), redirect: 'manual' });
try {
  let ready = false;
  for (let i = 0; i < 80; i++) {
    if (app.exitCode !== null) throw new Error(output);
    try { ready = (await fetch(`${base}/contact`)).ok; } catch {}
    if (ready) break;
    await delay(250);
  }
  assert.ok(ready, 'isolated production server started');
  if (unconfigured) {
    assert.equal((await json(valid)).status, 503);
    const response = await fetch(`${base}/api/enquiry`, { method: 'POST', body: new URLSearchParams({ name: valid.name, email: valid.email, consent: 'on' }), redirect: 'manual' });
    assert.equal(response.status, 303); assert.equal(response.headers.get('location'), '/contact?enquiry=unavailable');
    assert.equal(deliveries, 0);
    console.log('PASS: unconfigured delivery returns JSON 503 or a native unavailable redirect, without contacting a provider.');
  } else {
  for (const body of [null, [], { ...valid, consent: false }, { ...valid, message: 'x'.repeat(2001) }, { ...valid, company: 'bot' }]) assert.equal((await json(body)).status, 400);
  assert.equal(deliveries, 0, 'invalid enquiries never reach the provider');
  assert.equal((await fetch(`${base}/api/enquiry`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{bad' })).status, 400);
  assert.equal((await json({ ...valid, message: 'x'.repeat(17000) })).status, 413);
  let response = await json(valid);
  assert.equal(response.status, 200); assert.deepEqual(await response.json(), { ok: true });
  const native = new URLSearchParams({ name: valid.name, email: valid.email, consent: 'on' });
  response = await fetch(`${base}/api/enquiry`, { method: 'POST', body: native, redirect: 'manual' });
  assert.equal(response.status, 303); assert.equal(response.headers.get('location'), '/contact?enquiry=sent');
  const multipart = new FormData(); Object.entries({ name: valid.name, email: valid.email, consent: 'on' }).forEach(([key, value]) => multipart.append(key, value));
  response = await fetch(`${base}/api/enquiry`, { method: 'POST', body: multipart, redirect: 'manual' });
  assert.equal(response.status, 303); assert.equal(response.headers.get('location'), '/contact?enquiry=sent');
  providerStatus = 500;
  assert.equal((await json(valid)).status, 502);
  response = await fetch(`${base}/api/enquiry`, { method: 'POST', body: native, redirect: 'manual' });
  assert.equal(response.status, 303); assert.equal(response.headers.get('location'), '/contact?enquiry=unavailable');
  assert.ok((await (await fetch(base + response.headers.get('location'))).text()).includes("couldn&#x27;t send this online"));
  native.delete('consent');
  response = await fetch(`${base}/api/enquiry`, { method: 'POST', body: native, redirect: 'manual' });
  assert.equal(response.headers.get('location'), '/contact?enquiry=invalid');
  console.log('PASS: JSON, native and multipart enquiries; invalid shapes, permission, length and bot checks; honest provider success/failure; readable redirects without personal data.');
  }
} finally {
  app.kill(); webhook.close(); webhook.closeAllConnections();
}
