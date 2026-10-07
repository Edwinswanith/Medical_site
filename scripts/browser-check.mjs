// Local Chrome checks for rendering, delayed hydration, reduced motion and keyboard navigation.
// Uses Chrome's debugging protocol; no external enquiry is submitted.
import { launch } from 'chrome-launcher';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import assert from 'node:assert/strict';

const [base = 'http://127.0.0.1:3100', folder = '.tmp/seo-browser'] = process.argv.slice(2);
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname), 'browser tests run locally only');
const output = resolve(folder); await mkdir(output, { recursive: true });
const chrome = await launch({ chromePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check'] });
const target = await (await fetch(`http://127.0.0.1:${chrome.port}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { ws.addEventListener('open', resolve, { once: true }); ws.addEventListener('error', reject, { once: true }); });
let id = 0; const pending = new Map(), errors = [], results = [];
ws.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (message.id) { const item = pending.get(message.id); pending.delete(message.id); clearTimeout(item.timer); if (message.error) item.reject(new Error(JSON.stringify(message.error))); else item.resolve(message.result); }
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const key = ++id; const timer = setTimeout(() => { pending.delete(key); reject(new Error(`Timed out: ${method}`)); }, 20000);
  pending.set(key, { resolve, reject, timer }); ws.send(JSON.stringify({ id: key, method, params }));
});
const evaluate = async expression => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
};
const waitFor = async expression => {
  for (let i = 0; i < 75; i++) { if (await evaluate(expression)) return; await delay(200); }
  throw new Error(`Condition not met: ${expression}`);
};
const shot = async name => { const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }); await writeFile(join(output, `${name}.png`), Buffer.from(data, 'base64')); };
const navigate = async path => {
  const previous = await evaluate('performance.timeOrigin');
  await send('Page.navigate', { url: base + path });
  await waitFor(`performance.timeOrigin !== ${previous} && location.href === ${JSON.stringify(base + path)} && document.readyState === 'complete'`);
};
const measure = () => evaluate(`(() => {
  const main = document.querySelector('main');
  const h1 = main.querySelector('h1');
  const bounds = h1.getBoundingClientRect();
  const hidden = [...main.querySelectorAll('[data-reveal]')].filter(el => getComputedStyle(el).opacity === '0').length;
  const cuts = [...h1.querySelectorAll('.line > span')].filter(el => { const r=el.getBoundingClientRect(); return r.right > innerWidth + 1 || r.left < -1; }).length;
  const clippedActions = [...document.querySelectorAll('.header a, .header button, .hero__cta a')].filter(el => { const r=el.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1); }).length;
  return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, hidden, cuts, clippedActions, heading: h1.innerText, headingRight: bounds.right, videoSources: [...document.querySelectorAll('video')].filter(v => v.getAttribute('src')).length };
})()`);
const key = async (key, code, virtualKey, modifiers = 0) => {
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode: virtualKey, modifiers, ...(key === 'Enter' ? { text: '\r' } : {}) });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: virtualKey, modifiers });
};
try {
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setFocusEmulationEnabled', { enabled: true });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  for (const [name, path, width, height] of [
    ['home-mobile', '/', 390, 844], ['home-small-mobile', '/', 320, 844], ['home-desktop', '/', 1440, 1000],
    ['service-mobile', '/services/medical-websites', 390, 844], ['service-desktop', '/services/patient-films', 1440, 1000],
    ['contact-mobile', '/contact', 390, 1000], ['about-mobile', '/about', 390, 844], ['work-mobile', '/work/prof-hemant-sheth', 390, 844],
    ['services-hub-small-mobile', '/services', 320, 844], ['work-index-small-mobile', '/work', 320, 844],
    ['ai-presenter-small-mobile', '/services/ai-presenter', 320, 844], ['social-content-small-mobile', '/services/social-content', 320, 844],
    ['privacy-small-mobile', '/privacy', 320, 844],
  ]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 900 });
    await navigate(path); await waitFor('document.documentElement.hasAttribute("data-motion-ready")');
    await evaluate('document.fonts.ready');
    const metrics = await measure();
    assert.equal(metrics.scrollWidth <= width + 1, true, `${name}: horizontal overflow`);
    assert.equal(metrics.hidden, 0, `${name}: hidden content under reduced motion`);
    assert.equal(metrics.cuts, 0, `${name}: clipped headline`);
    assert.equal(metrics.clippedActions, 0, `${name}: clipped navigation or CTA`);
    assert.equal(metrics.videoSources, 0, `${name}: autoplay under reduced motion`);
    await shot(name); results.push({ name, status: 'PASS', metrics });
  }
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 1000, deviceScaleFactor: 1, mobile: true });
  await navigate('/contact'); await waitFor('document.documentElement.hasAttribute("data-motion-ready")');
  await evaluate('document.querySelector(".burger").focus()');
  assert.equal(await evaluate('document.activeElement.classList.contains("burger")'), true, 'menu trigger has keyboard focus');
  await key('Enter', 'Enter', 13);
  await waitFor('document.querySelector(".burger").getAttribute("aria-expanded") === "true"');
  assert.equal(await evaluate('document.querySelector("main").inert'), true);
  const first = await evaluate('document.activeElement.textContent.trim()');
  await key('Tab', 'Tab', 9, 8);
  assert.equal(await evaluate('document.activeElement.classList.contains("burger")'), true, 'backwards tab wraps to close button');
  await key('Tab', 'Tab', 9);
  assert.equal(await evaluate('document.activeElement.textContent.trim()'), first, 'forwards tab returns to menu');
  await shot('keyboard-menu'); await key('Escape', 'Escape', 27);
  await waitFor('document.querySelector(".burger").getAttribute("aria-expanded") === "false"');
  assert.equal(await evaluate('document.querySelector("main").inert'), false);
  assert.equal(await evaluate('document.activeElement.classList.contains("burger")'), true);
  results.push({ name: 'keyboard menu: open, trap, Escape, focus return', status: 'PASS' });

  await navigate('/services/medical-websites'); await waitFor('document.documentElement.hasAttribute("data-motion-ready")');
  await evaluate('document.querySelector("details summary").focus()'); await key('Enter', 'Enter', 13);
  assert.equal(await evaluate('document.querySelector("details").open'), true, 'service question opens by keyboard');
  assert.ok(await evaluate('document.querySelector("details").innerText.includes("Films for your site")'));
  results.push({ name: 'service questions: keyboard disclosure exposes the answer', status: 'PASS' });

  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await navigate('/'); await waitFor('document.documentElement.hasAttribute("data-intro-done")');
  assert.equal(await evaluate('document.documentElement.classList.contains("is-locked")'), false);
  await shot('home-normal-motion');
  await evaluate(`document.querySelector('.header__nav a[href="/services/medical-websites"]').focus()`);
  await key('Enter', 'Enter', 13);
  await waitFor('location.pathname === "/services/medical-websites" && !document.documentElement.classList.contains("is-locked")');
  assert.ok((await evaluate('document.querySelector("main h1").innerText')).includes('CONSULTANTS'));
  results.push({ name: 'normal motion: intro and curtain navigation finish and unlock scrolling', status: 'PASS' });

  // Block the external bundles while letting the early inline watchdog run.
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 1000, deviceScaleFactor: 1, mobile: true });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await send('Network.setBlockedURLs', { urls: ['*.js'] });
  await navigate('/contact'); await waitFor('document.documentElement.hasAttribute("data-motion-fallback")');
  const delayed = await measure(); assert.equal(delayed.hidden, 0); assert.equal(await evaluate('document.documentElement.classList.contains("is-locked")'), false);
  assert.equal(await evaluate('getComputedStyle(document.querySelector("h1 .w > span")).transform'), 'none');
  await shot('contact-delayed-js'); results.push({ name: 'delayed JavaScript: content revealed after watchdog', status: 'PASS', metrics: delayed });
  await navigate('/'); await waitFor('document.documentElement.hasAttribute("data-motion-fallback")');
  const delayedHome = await measure(); assert.equal(delayedHome.hidden, 0); assert.equal(delayedHome.cuts, 0);
  await shot('home-delayed-js'); results.push({ name: 'delayed JavaScript: homepage sections and headline readable', status: 'PASS', metrics: delayedHome });

  await send('Emulation.setScriptExecutionDisabled', { value: true });
  await navigate('/contact');
  const noJs = await measure(); assert.equal(noJs.hidden, 0); assert.equal(await evaluate('document.documentElement.hasAttribute("data-js")'), false);
  assert.equal(await evaluate('document.querySelector("form").method'), 'post');
  assert.equal(await evaluate('new URL(document.querySelector("form").action).pathname'), '/api/enquiry');
  await shot('contact-no-js'); results.push({ name: 'no JavaScript: content and native form available', status: 'PASS', metrics: noJs });
  await navigate('/'); const noJsHome = await measure(); assert.equal(noJsHome.hidden, 0); assert.equal(noJsHome.cuts, 0);
  await shot('home-no-js'); results.push({ name: 'no JavaScript: homepage content readable', status: 'PASS', metrics: noJsHome });
  assert.equal(errors.length, 0, `uncaught browser errors: ${errors.join(', ')}`);
  results.push({ name: 'no uncaught JavaScript errors', status: 'PASS' });
  console.log(`${results.length} browser scenarios PASS. Evidence: ${output}`);
} catch (error) {
  results.push({ name: 'browser verification', status: 'FAIL', detail: error.message });
  await shot('failure'); console.error(error.message); process.exitCode = 1;
} finally {
  await writeFile(join(output, 'browser-results.json'), JSON.stringify(results, null, 2)); ws.close(); await chrome.kill();
}
