// Acceptance tests (FEATURES.md §13) against the mock YouTube site.
// usage: node run.js <userscript.js> [testNameFilter]
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('fs');
const path = require('path');

const SCRIPT = path.resolve(process.argv[2]);
const FILTER = process.argv[3] ? new RegExp(process.argv[3]) : null;
const BASE = 'http://www.youtube.test:' + (process.env.PORT || 8765);
const SHIM = fs.readFileSync(path.join(__dirname, 'shim.js'), 'utf8');
const US_SRC = fs.readFileSync(SCRIPT, 'utf8') + '\n//# sourceURL=userscript.js';
const A = 'vidAAAAAAA', B = 'vidBBBBBBB', C = 'vidCCCCCCC', X = 'vidXSSXSSX';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let browser;
async function newPage(store) {
  const ctx = await browser.newContext({ acceptDownloads: true, locale: 'en-US' });
  await ctx.addInitScript({ content: `window.__US_SRC = ${JSON.stringify(US_SRC)};\n${SHIM}` });
  if (store) await ctx.addInitScript({ content: `if (!sessionStorage.getItem('__seeded')) { localStorage.setItem('__gm_store__', ${JSON.stringify(JSON.stringify(store))}); sessionStorage.setItem('__seeded','1'); }` });
  const page = await ctx.newPage();
  page.on('dialog', (d) => d.accept());
  page.on('pageerror', (e) => { page.__pageErrors = (page.__pageErrors || []).concat(String(e)); });
  return page;
}
async function open(page, p, waitBar = true) {
  await page.goto(BASE + p);
  if (waitBar) await page.waitForSelector('.vsb-container .speed-button', { timeout: 8000 });
  await page.waitForFunction(() => { const v = document.querySelector('#main-video'); return !v || v.currentTime > 0.2 || location.pathname !== '/watch'; }, null, { timeout: 8000 });
}
const rate = (page, sel = '#main-video') => page.$eval(sel, (v) => v.playbackRate);
const ctime = (page) => page.$eval('#main-video', (v) => v.currentTime);
const store = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('__gm_store__') || '{}'));
const stats = (page) => page.evaluate(() => {
  const S = window.__us;
  return { listeners: S.listeners.size, observers: S.observers.size, intervals: S.intervals.size,
    rateWrites: S.rateWrites.length, timeWrites: S.timeWrites.length, mediaCalls: S.mediaCalls.length,
    errors: S.errors.slice(), tt: S.tt.slice() };
});
const bars = (page) => page.evaluate(() => [...document.querySelectorAll('.vsb-container')].filter((e) => e.isConnected && e.offsetParent !== null).length);
const allBars = (page) => page.evaluate(() => document.querySelectorAll('.vsb-container').length);
const highlighted = (page) => page.evaluate(() => [...document.querySelectorAll('.vsb-container .speed-button')]
  .filter((b) => b.offsetParent !== null && getComputedStyle(b).color === 'rgb(255, 85, 0)').map((b) => b.textContent.trim()));
async function clickSpeed(page, label) {
  const ok = await page.evaluate((label) => {
    const b = [...document.querySelectorAll('.vsb-container .speed-button')].find((e) => e.offsetParent !== null && e.textContent.trim() === label);
    if (!b) return false; b.click(); return true;
  }, label);
  if (!ok) throw new Error('no visible speed button ' + label);
}
async function key(page, k, focusSel = 'body') {
  if (focusSel === 'body') await page.evaluate(() => { document.activeElement && document.activeElement.blur && document.activeElement.blur(); });
  await page.keyboard.press(k);
}
async function openMenu(page) { await page.evaluate(() => window.__gmMenu[0].fn()); await page.waitForSelector('#customSpeedWindow', { timeout: 3000 }); }
async function closeWindow(page) {
  await page.evaluate(() => { const w = document.querySelector('#customSpeedWindow'); const c = w && [...w.querySelectorAll('button')].find((b) => b.textContent.trim() === '×'); if (c) c.click(); });
  await sleep(200);
}
const winClick = (page, text) => page.evaluate((text) => {
  const w = document.querySelector('#customSpeedWindow');
  const els = [...w.querySelectorAll('button, [role=tab], label, a, span')].filter((e) => e.offsetParent !== null);
  const el = els.find((e) => e.textContent.trim() === text) || els.find((e) => e.textContent.trim().endsWith(text))
    || [...w.querySelectorAll('button')].filter((e) => e.offsetParent !== null).find((e) => e.textContent.includes(text));
  if (!el) throw new Error('window: no clickable ' + text);
  (el.closest('button') || el).click();
}, text);
function approx(a, b, eps = 0.001) { return Math.abs(a - b) < eps; }
function expect(cond, msg) { if (!cond) throw new Error(msg); }

const tests = [];
const test = (name, fn) => tests.push({ name, fn });

test('A1 bar on watch page', async () => {
  const p = await newPage(); await open(p, '/watch?v=' + A); await sleep(1500);
  expect((await bars(p)) === 1, 'visible bars=' + (await bars(p)));
  const txt = await p.$eval('.vsb-container', (e) => e.textContent);
  expect(/Video\s*Speed\s*:/.test(txt), 'label text: ' + txt.slice(0, 40));
  expect(JSON.stringify(await highlighted(p)) === '["Normal"]', 'highlight ' + JSON.stringify(await highlighted(p)));
  expect(approx(await rate(p), 1), 'rate ' + (await rate(p)));
  await p.context().close();
});

test('A2/A3 manual speed saved & restored on reload without rewriting record', async () => {
  const p = await newPage(); await open(p, '/watch?v=' + A); await sleep(800);
  await clickSpeed(p, '1.5x'); await sleep(500);
  expect(approx(await rate(p), 1.5), 'rate after click ' + (await rate(p)));
  expect(JSON.stringify(await highlighted(p)) === '["1.5x"]', 'highlight ' + JSON.stringify(await highlighted(p)));
  let st = await store(p); const rec = (st.videoSpeedHistory.youtube || []).find((r) => r.identifier === 'youtube_' + A);
  expect(rec && rec.speed === 1.5 && rec.isDefault === false && rec.url.includes(A) && rec.title.includes('Alpha video one'), 'history rec ' + JSON.stringify(rec));
  await sleep(300);
  await p.reload(); await p.waitForSelector('.vsb-container .speed-button'); await sleep(3000);
  expect(approx(await rate(p), 1.5), 'rate after reload ' + (await rate(p)));
  st = await store(p); const rec2 = st.videoSpeedHistory.youtube.find((r) => r.identifier === 'youtube_' + A);
  expect(rec2.timestamp === rec.timestamp, 'record rewritten on restore');
  await p.context().close();
});

test('A4 playback position never disturbed by script operations', async () => {
  const p = await newPage(); await open(p, '/watch?v=' + A);
  await p.waitForFunction(() => document.querySelector('#main-video').currentTime > 3, null, { timeout: 10000 });
  const loadsBefore = await p.evaluate(() => window.__yt.events.filter((e) => e.ev === 'loadstart').length);
  let last = await ctime(p);
  const check = async (step) => {
    await sleep(700);
    const t = await ctime(p);
    expect(t >= last - 0.05, `${step}: currentTime went back ${last.toFixed(2)} -> ${t.toFixed(2)}`);
    last = t;
  };
  for (const s of ['2x', '1.25x', '0.8x', 'Normal']) { await clickSpeed(p, s); await check('click ' + s); }
  for (const k of ['-', '=', '+', '*']) { await key(p, k); await check('key ' + k); }
  await key(p, 'Shift+Slash'); await check('help');
  await openMenu(p); await check('open settings'); await closeWindow(p); await check('close settings');
  await openMenu(p);
  await p.fill('#customSpeedWindow input[type=number]', '1.3'); await winClick(p, 'Add'); await sleep(200); await winClick(p, 'Confirm');
  await check('confirm speed list');
  expect(await p.evaluate(() => [...document.querySelectorAll('.vsb-container .speed-button')].some((b) => b.textContent.trim() === '1.3x')), 'new 1.3x button missing');
  await openMenu(p); await winClick(p, 'Settings'); await sleep(200);
  await p.evaluate(() => { const r = document.querySelector('#customSpeedWindow input[type=radio][value=zh]'); r.click(); });
  await check('language switch'); await closeWindow(p);
  for (let i = 0; i < 4; i++) await check('idle ' + i);
  await p.evaluate(() => window.__yt.rerenderMetadata()); await sleep(1200); await check('metadata re-render');
  expect((await bars(p)) === 1, 'bar not re-attached after re-render, bars=' + (await bars(p)));
  const loadsAfter = await p.evaluate(() => window.__yt.events.filter((e) => e.ev === 'loadstart').length);
  expect(loadsAfter === loadsBefore, 'video reloaded during operations');
  const s = await stats(p);
  expect(s.timeWrites === 0 && s.mediaCalls === 0, `script touched currentTime/load/play: ${s.timeWrites}/${s.mediaCalls}`);
  await p.context().close();
});

test('A4b re-render keeps current speed (no reset to 1.0)', async () => {
  const p = await newPage(); await open(p, '/watch?v=' + A); await sleep(800);
  await clickSpeed(p, '1.5x'); await sleep(4000);
  await p.evaluate(() => { window.__rs = []; const v = document.querySelector('#main-video'); v.addEventListener('ratechange', () => window.__rs.push(v.playbackRate)); });
  await p.evaluate(() => window.__yt.rerenderMetadata()); await sleep(2500);
  const rs = await p.evaluate(() => window.__rs);
  expect(!rs.some((r) => r !== 1.5), 'rate flapped during re-render: ' + JSON.stringify(rs));
  expect((await bars(p)) === 1, 'bars=' + (await bars(p)));
  await p.context().close();
});

test('A5 SPA navigation + back', async () => {
  const p = await newPage(); await open(p, '/watch?v=' + A); await sleep(800);
  await clickSpeed(p, '1.5x');
  await p.waitForFunction(() => document.querySelector('#main-video').currentTime > 4, null, { timeout: 10000 });
  const posA = await ctime(p);
  await p.evaluate((B) => window.__yt.navigate(B), B); await sleep(3500);
  expect(approx(await rate(p), 1), 'video B rate ' + (await rate(p)));
  expect((await allBars(p)) === 1, 'bars after nav=' + (await allBars(p)));
  await p.goBack(); await sleep(3500);
  expect(approx(await rate(p), 1.5), 'video A rate after back ' + (await rate(p)));
  const t = await ctime(p);
  expect(t >= posA - 0.6, `resume lost: was ${posA.toFixed(2)}, now ${t.toFixed(2)}`);
  expect((await allBars(p)) === 1, 'bars after back=' + (await allBars(p)));
  await p.context().close();
});

test('A6 channel default, including stale channel during SPA nav', async () => {
  const seed = { channelDefaultSpeeds: { youtube: { '@alphaChan': { speed: 1.25, name: 'Alpha Channel', remark: '', iconUrl: '' } } } };
  const p = await newPage(seed); await open(p, '/watch?v=' + C); await sleep(2500);
  expect(approx(await rate(p), 1.25), 'C (alpha) direct load rate ' + (await rate(p)));
  await p.evaluate(() => window.__yt.setLag({ owner: 2500, title: 2600, finish: 300 }));
  await p.evaluate((B) => window.__yt.navigate(B), B); await sleep(5000);
  expect(approx(await rate(p), 1), 'B (beta) after nav from alpha got ' + (await rate(p)));
  await p.evaluate((C) => window.__yt.navigate(C), C); await sleep(5000);
  expect(approx(await rate(p), 1.25), 'C (alpha) after nav from beta got ' + (await rate(p)));
  await p.context().close();
});

test('A7 manual choice not overridden by late channel default', async () => {
  const seed = { channelDefaultSpeeds: { youtube: { '@alphaChan': { speed: 1.25, name: 'Alpha Channel', remark: '', iconUrl: '' } } } };
  const p = await newPage(seed); await open(p, '/watch?v=' + B); await sleep(1500);
  await p.evaluate(() => window.__yt.setLag({ owner: 3000, title: 3000, finish: 200 }));
  await p.evaluate((C) => window.__yt.navigate(C), C); await sleep(1500);
  await clickSpeed(p, '0.9x'); await sleep(5000);
  expect(approx(await rate(p), 0.9), 'rate ' + (await rate(p)));
  await p.context().close();
});

test('A8 keyboard direction and inputs ignored', async () => {
  const p = await newPage(); await open(p, '/watch?v=' + A); await sleep(800);
  await key(p, '*'); await sleep(200); expect(approx(await rate(p), 1), '* -> ' + (await rate(p)));
  await key(p, '-'); await sleep(200); expect(approx(await rate(p), 0.95), '- -> ' + (await rate(p)));
  await key(p, '+'); await key(p, '+'); await sleep(200); expect(approx(await rate(p), 1.05), '++ -> ' + (await rate(p)));
  await key(p, '*'); await sleep(200); expect(approx(await rate(p), 1), '* -> ' + (await rate(p)));
  for (const sel of ['#search', '#contenteditable-root', '#other-textarea']) {
    await p.click(sel); await p.keyboard.type('a-+=*b'); await sleep(200);
    expect(approx(await rate(p), 1), `typing in ${sel} changed rate to ${await rate(p)}`);
  }
  await p.evaluate(() => document.querySelector('#shadow-host').shadowRoot.querySelector('input').focus());
  await p.keyboard.type('-+'); await sleep(200);
  expect(approx(await rate(p), 1), 'typing in shadow input changed rate ' + (await rate(p)));
  await p.context().close();
});

test('A9 native player menu change is respected', async () => {
  const p = await newPage(); await open(p, '/watch?v=' + A); await sleep(5000);
  await p.evaluate(() => window.__yt.nativeSetRate(1.75)); await sleep(2500);
  expect(approx(await rate(p), 1.75), 'rate reverted to ' + (await rate(p)));
  expect((await highlighted(p)).length === 0, 'stale highlight ' + JSON.stringify(await highlighted(p)));
  await p.context().close();
});

test('A10 speed survives ad -> content switch and platform resets', async () => {
  const p = await newPage(); await open(p, '/watch?v=' + A); await sleep(800);
  await clickSpeed(p, '1.5x'); await sleep(4000);
  await p.evaluate(() => window.__yt.playAd());
  await p.waitForFunction(() => !window.__yt.inAd, null, { timeout: 15000 });
  await sleep(2000);
  expect(approx(await rate(p), 1.5), 'rate after ad ' + (await rate(p)));
  await p.context().close();
});

test('A11 no leaks over navigations / re-renders', async () => {
  const p = await newPage(); await open(p, '/watch?v=' + A); await sleep(3000);
  const s0 = await stats(p);
  const vids = [B, C, A, X, B, C, A, B, C, A];
  for (const v of vids) { await p.evaluate((v) => window.__yt.navigate(v), v); await sleep(1600); }
  await p.evaluate(() => window.__yt.rerenderMetadata()); await sleep(1500);
  await sleep(4000);
  const s1 = await stats(p);
  expect((await allBars(p)) === 1, 'bars=' + (await allBars(p)));
  expect(s1.listeners <= s0.listeners && s1.observers <= s0.observers && s1.intervals <= s0.intervals,
    `growth listeners ${s0.listeners}->${s1.listeners}, observers ${s0.observers}->${s1.observers}, intervals ${s0.intervals}->${s1.intervals}`);
  const w0 = s1.rateWrites; await sleep(5000); const w1 = (await stats(p)).rateWrites;
  expect(w1 === w0, `script wrote playbackRate ${w1 - w0} times while idle`);
  await p.context().close();
});

test('A12 home preview and shorts untouched', async () => {
  const seed = { videoSpeedHistory: {}, channelDefaultSpeeds: {} };
  const p = await newPage(seed); await open(p, '/watch?v=' + A); await sleep(800);
  await clickSpeed(p, '1.5x'); await sleep(500);
  await p.evaluate(() => window.__yt.goHome()); await sleep(500);
  await p.evaluate(() => window.__yt.hoverPreview()); await sleep(4000);
  const writesPreview = await p.evaluate(() => window.__us.rateWrites.filter((w) => w.id === 'preview-video').length);
  expect(writesPreview === 0, 'script wrote preview rate x' + writesPreview);
  expect(approx(await rate(p, '#preview-video'), 1), 'preview rate ' + (await rate(p, '#preview-video')));
  const floating = await p.evaluate(() => [...document.querySelectorAll('.vsb-container')].filter((e) => e.offsetParent !== null).length);
  expect(floating === 0, 'visible bar on home: ' + floating);
  await p.evaluate(() => window.__yt.openShorts('sh1')); await sleep(4000);
  const writesShorts = await p.evaluate(() => window.__us.rateWrites.filter((w) => w.id === 'shorts-video').length);
  expect(writesShorts === 0, 'script wrote shorts rate x' + writesShorts);
  await p.context().close();
});

test('A13 history & channel UI', async () => {
  const p = await newPage(); await open(p, '/watch?v=' + X); await sleep(800);
  await clickSpeed(p, '1.25x'); await sleep(300);
  await openMenu(p); await winClick(p, 'Video History'); await sleep(300);
  const h = await p.evaluate(() => { const w = document.querySelector('#customSpeedWindow'); return { bold: w.querySelectorAll('b').length, text: w.textContent, cur: w.querySelectorAll('.current-video').length }; });
  expect(h.bold === 0 && h.text.includes('<b>bold</b>'), 'title not escaped');
  expect(h.cur === 1, 'current-video highlight count ' + h.cur);
  // channels: add for current channel
  await winClick(p, 'Channel Speeds'); await sleep(300);
  await winClick(p, 'Add Channel Speed'); await sleep(300);
  await p.evaluate(() => { const w = document.querySelector('#customSpeedWindow'); const nums = [...w.querySelectorAll('input[type=number]')].filter((e) => e.offsetParent !== null); const i = nums[nums.length - 1]; i.value = '1.1'; i.dispatchEvent(new Event('input', { bubbles: true })); });
  await winClick(p, 'Save'); await sleep(400);
  let st = await store(p);
  const ch = st.channelDefaultSpeeds && st.channelDefaultSpeeds.youtube && st.channelDefaultSpeeds.youtube['@betaChan'];
  expect(ch && ch.speed === 1.1 && ch.name === 'Beta Channel' && ch.iconUrl.includes('betaChan'), 'channel rec ' + JSON.stringify(ch));
  expect(approx(await rate(p), 1.25), 'manual per-video speed should still win, got ' + (await rate(p)));
  // delete history entry for current video -> falls back to channel default
  await winClick(p, 'Video History'); await sleep(300);
  await p.evaluate(() => { const w = document.querySelector('#customSpeedWindow'); const d = w.querySelector('.current-video button'); d.click(); });
  await sleep(1500);
  expect(approx(await rate(p), 1.1), 'after deleting history rate should be channel default, got ' + (await rate(p)));
  // delete channel -> 1.0
  await winClick(p, 'Channel Speeds'); await sleep(300);
  await p.evaluate(() => { const w = document.querySelector('#customSpeedWindow'); const btns = [...w.querySelectorAll('button')].filter((b) => b.offsetParent !== null && (b.getAttribute('aria-label') === 'Delete' || b.title === 'Delete')); btns[btns.length - 1].click(); });
  await sleep(1500);
  st = await store(p);
  expect(!st.channelDefaultSpeeds.youtube['@betaChan'], 'channel not deleted');
  expect(approx(await rate(p), 1), 'after deleting channel rate ' + (await rate(p)));
  await p.context().close();
});

test('A14 export once per click, import round-trip', async () => {
  const p = await newPage(); await open(p, '/watch?v=' + A); await sleep(800);
  await clickSpeed(p, '1.5x');
  await openMenu(p);
  for (const tab of ['Settings', 'Speeds', 'Settings', 'Video History', 'Settings']) { await winClick(p, tab); await sleep(150); }
  const downloads = []; p.on('download', (d) => downloads.push(d));
  // headless Chromium here rejects 「」 in download names (falls back to "download"), so read the requested name from the anchor
  await p.evaluate(() => { window.__dlNames = []; const c = HTMLAnchorElement.prototype.click; HTMLAnchorElement.prototype.click = function () { if (this.download) window.__dlNames.push(this.download); return c.call(this); };
    const de = EventTarget.prototype.dispatchEvent; EventTarget.prototype.dispatchEvent = function (e) { if (this instanceof HTMLAnchorElement && e.type === 'click' && this.download) window.__dlNames.push(this.download); return de.call(this, e); }; });
  await winClick(p, 'Export Settings'); await sleep(2000);
  expect(downloads.length === 1, 'downloads per click=' + downloads.length);
  const d = downloads[0];
  const names = await p.evaluate(() => window.__dlNames);
  expect(names.length === 1 && /^Enhanced Video Speed Buttons「\d{4} \d{2} \d{2}」「\d{2}:\d{2}:\d{2}」\.json$/.test(names[0]), 'filename ' + JSON.stringify(names));
  const file = await d.path(); const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  expect(data.version === '1.36' && data.settings && Array.isArray(data.settings.customSpeeds) && data.settings.buttonOrder && data.settings.history.youtube && data.settings.channelDefaultSpeeds, 'export structure');
  data.settings.customSpeeds = [['Turbo', 3], ['Normal', 1]];
  data.settings.channelDefaultSpeeds = { youtube: { '@alphaChan': { speed: 1.2, name: 'Alpha Channel', remark: 'r' } } };
  const imp = file + '.import.json'; fs.writeFileSync(imp, JSON.stringify(data));
  await (async () => { const [fc] = await Promise.all([p.waitForEvent('filechooser'), winClick(p, 'Import Settings')]); await fc.setFiles(imp); })(); await sleep(1500);
  const st = await store(p);
  expect(JSON.stringify(st.customSpeeds) === JSON.stringify([['Turbo', 3], ['Normal', 1]]), 'customSpeeds after import ' + JSON.stringify(st.customSpeeds));
  expect(st.channelDefaultSpeeds.youtube['@alphaChan'].speed === 1.2, 'channel after import');
  const labels = await p.evaluate(() => [...document.querySelectorAll('.vsb-container .speed-button')].map((b) => b.textContent.trim()));
  expect(labels.includes('Turbo'), 'bar not refreshed: ' + labels);
  // bad file
  fs.writeFileSync(imp, '{"settings":{"customSpeeds":[["x",-1]]}}');
  await (async () => { const [fc] = await Promise.all([p.waitForEvent('filechooser'), winClick(p, 'Import Settings')]); await fc.setFiles(imp); })(); await sleep(800);
  const st2 = await store(p);
  expect(JSON.stringify(st2.customSpeeds) === JSON.stringify([['Turbo', 3], ['Normal', 1]]), 'invalid import changed data');
  await p.context().close();
});

test('A15 language switch reopens on same tab', async () => {
  const p = await newPage(); await open(p, '/watch?v=' + A); await sleep(800);
  await openMenu(p); await winClick(p, 'Settings'); await sleep(200);
  await p.evaluate(() => document.querySelector('#customSpeedWindow input[type=radio][value=zh]').click()); await sleep(600);
  const r = await p.evaluate(() => { const w = document.querySelector('#customSpeedWindow'); const vis = [...w.querySelectorAll('h3')].filter((e) => e.offsetParent !== null).map((e) => e.textContent); return { n: document.querySelectorAll('#customSpeedWindow').length, title: w.querySelector('h2').textContent, vis }; });
  expect(r.n === 1 && r.title.includes('自定义速度按钮'), 'title ' + r.title);
  expect(r.vis.some((t) => t.includes('界面语言')), 'not on settings tab: ' + r.vis);
  expect(await p.evaluate(() => getComputedStyle(document.body).pointerEvents !== 'none' || !!document.querySelector('#customSpeedWindow')), 'pointer events');
  await closeWindow(p);
  expect(await p.evaluate(() => getComputedStyle(document.body).pointerEvents) !== 'none', 'body still not clickable after close');
  await p.context().close();
});

test('A16 no script errors / Trusted Types violations across a session', async () => {
  const p = await newPage(); await open(p, '/watch?v=' + A); await sleep(800);
  await clickSpeed(p, '1.5x'); await key(p, 'Shift+Slash');
  await openMenu(p);
  for (const tab of ['Video History', 'Channel Speeds', 'Settings', 'Speeds']) { await winClick(p, tab); await sleep(200); }
  await closeWindow(p);
  await p.evaluate((B) => window.__yt.navigate(B), B); await sleep(2500);
  await p.evaluate(() => window.__yt.goHome()); await sleep(1500);
  const s = await stats(p);
  expect(s.errors.length === 0, 'errors: ' + s.errors.join(' | ').slice(0, 400));
  expect(s.tt.length === 0, 'TT violations: ' + s.tt.join(' | ').slice(0, 300));
  expect(!(p.__pageErrors || []).length, 'page errors: ' + (p.__pageErrors || []).join(' | ').slice(0, 300));
  await p.context().close();
});

(async () => {
  browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--no-proxy-server', '--host-resolver-rules=MAP www.youtube.test 127.0.0.1'] });
  const results = [];
  for (const t of tests) {
    if (FILTER && !FILTER.test(t.name)) continue;
    const t0 = Date.now();
    try { await t.fn(); results.push({ name: t.name, ok: true }); console.log('PASS', t.name, `(${((Date.now() - t0) / 1000).toFixed(1)}s)`); }
    catch (e) { results.push({ name: t.name, ok: false, err: String(e.message || e).split('\n')[0] }); console.log('FAIL', t.name, '-', String(e.message || e).split('\n')[0]); }
  }
  await browser.close();
  const out = process.env.OUT; if (out) fs.writeFileSync(out, JSON.stringify(results, null, 2));
  console.log(`\n${results.filter((r) => r.ok).length}/${results.length} passed`);
})();
