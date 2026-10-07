// Acceptance run against the real www.youtube.com (FEATURES.md §13), in any Chromium-based browser.
// usage: BROWSER_PATH=/Applications/Helium.app/Contents/MacOS/Helium node real-youtube.js <userscript.js> [filter]
// Prints PASS/FAIL per check and writes a JSON report next to the script (OUT=... to override).
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('fs');
const path = require('path');

const SCRIPT = path.resolve(process.argv[2]);
const FILTER = process.argv[3] ? new RegExp(process.argv[3]) : null;
const SHIM = fs.readFileSync(path.join(__dirname, 'shim.js'), 'utf8');
const US = fs.readFileSync(SCRIPT, 'utf8');
// Same-channel pair (Blender) and a video from another channel.
const A = process.env.VID_A || 'aqz-KE-bpKQ';  // Big Buck Bunny
const B = process.env.VID_B || 'R6MlUcmOul8';  // Tears of Steel (same channel as A)
const C = process.env.VID_C || 'dQw4w9WgXcQ';  // different channel
const MAIN = '#movie_player video.html5-main-video';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const expect = (c, m) => { if (!c) throw new Error(m); };
const approx = (a, b) => Math.abs(a - b) < 0.001;

let browser;
async function newPage(seed) {
  const ctx = await browser.newContext({ locale: 'en-US', viewport: { width: 1400, height: 900 } });
  await ctx.addInitScript({ content: SHIM });
  if (seed) await ctx.addInitScript({ content: `if (location.hostname.includes('youtube') && !sessionStorage.getItem('__seeded')) { localStorage.setItem('__gm_store__', ${JSON.stringify(JSON.stringify(seed))}); sessionStorage.setItem('__seeded', '1'); }` });
  // The userscript itself, top frame of youtube.com only, at document-end; its own sourceURL lets the shim attribute calls.
  await ctx.addInitScript({ content: `if (window.top === window && location.hostname.includes('youtube')) { const __go = function () {\n${US}\n}; if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', __go, { once: true }); else __go(); }\n//# sourceURL=userscript.js` });
  const page = await ctx.newPage();
  page.on('dialog', (d) => d.accept());
  return page;
}

async function handleConsent(page) {
  if (!/consent\./.test(page.url())) return;
  const btn = page.locator('button:has-text("Accept all"), button:has-text("Reject all")').first();
  await btn.click({ timeout: 10000 }).catch(() => {});
  await page.waitForURL(/www\.youtube\.com/, { timeout: 15000 }).catch(() => {});
}

async function waitNoAd(page, timeout = 90000) {
  await page.waitForFunction(() => { const p = document.querySelector('#movie_player'); return p && !p.classList.contains('ad-showing') && !p.classList.contains('ad-interrupting'); }, null, { timeout });
}

async function openWatch(page, id) {
  await page.goto('https://www.youtube.com/watch?v=' + id, { waitUntil: 'domcontentloaded' });
  await handleConsent(page);
  await page.waitForSelector(MAIN, { timeout: 30000 });
  await page.evaluate((sel) => { const v = document.querySelector(sel); v.muted = true; v.play().catch(() => {}); }, MAIN);
  await waitNoAd(page);
  await page.waitForFunction((sel) => document.querySelector(sel).currentTime > 1, MAIN, { timeout: 30000 });
  await page.waitForSelector('.vsb-container .speed-button', { timeout: 20000 });
}

// SPA navigation the way YouTube's own links do it; falls back to a full load if the event is ignored.
async function spaNavigate(page, id) {
  await page.evaluate((id) => {
    document.querySelector('ytd-app').dispatchEvent(new CustomEvent('yt-navigate', { bubbles: true, composed: true, detail: { endpoint: {
      commandMetadata: { webCommandMetadata: { url: '/watch?v=' + id, webPageType: 'WEB_PAGE_TYPE_WATCH', rootVe: 3832 } },
      watchEndpoint: { videoId: id } } } }));
  }, id);
  const ok = await page.waitForFunction((id) => location.search.includes(id), id, { timeout: 8000 }).then(() => true, () => false);
  if (!ok) { await openWatch(page, id); return 'full-load'; }
  await page.waitForFunction((id) => { const f = document.querySelector('ytd-watch-flexy'); return f && f.getAttribute('video-id') === id; }, id, { timeout: 15000 }).catch(() => {});
  await waitNoAd(page).catch(() => {});
  return 'spa';
}

const rate = (page, sel = MAIN) => page.$eval(sel, (v) => v.playbackRate);
const ctime = (page) => page.$eval(MAIN, (v) => v.currentTime);
const store = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('__gm_store__') || '{}'));
const bars = (page) => page.evaluate(() => document.querySelectorAll('.vsb-container').length);
const visibleBars = (page) => page.evaluate(() => [...document.querySelectorAll('.vsb-container')].filter((e) => e.offsetParent !== null).length);
const stats = (page) => page.evaluate(() => { const S = window.__us; return { listeners: S.listeners.size, observers: S.observers.size, intervals: S.intervals.size, rateWrites: S.rateWrites.length, timeWrites: S.timeWrites.length, mediaCalls: S.mediaCalls.length, errors: S.errors.slice(), tt: S.tt.slice() }; });
const highlighted = (page) => page.evaluate(() => [...document.querySelectorAll('.vsb-container .speed-button')].filter((b) => b.offsetParent !== null && getComputedStyle(b).color === 'rgb(255, 85, 0)').map((b) => b.textContent.trim()));
async function clickSpeed(page, label) {
  const ok = await page.evaluate((label) => { const b = [...document.querySelectorAll('.vsb-container .speed-button')].find((e) => e.offsetParent !== null && e.textContent.trim() === label); if (b) b.click(); return !!b; }, label);
  expect(ok, 'no visible speed button ' + label);
}
async function pressKey(page, k) { await page.evaluate(() => document.activeElement && document.activeElement.blur && document.activeElement.blur()); await page.keyboard.press(k); }
const channelOfPage = (page) => page.evaluate(() => {
  const a = document.querySelector('ytd-watch-flexy:not([hidden]) ytd-video-owner-renderer a.yt-simple-endpoint') || document.querySelector('ytd-watch-flexy:not([hidden]) #channel-name a');
  const href = a ? a.getAttribute('href') || '' : '';
  const m = href.match(/\/@([A-Za-z0-9_-]+)/) || href.match(/\/channel\/([A-Za-z0-9_-]+)/);
  return m ? (href.includes('/@') ? '@' + m[1] : m[1]) : null;
});
// Records currentTime / reloads in the page so backward jumps between our checks are caught too.
const startRecorder = (page) => page.evaluate((sel) => {
  const v = document.querySelector(sel);
  const R = window.__rec = { jumps: [], reloads: 0, last: v.currentTime };
  v.addEventListener('emptied', () => R.reloads++);
  v.addEventListener('loadstart', () => R.reloads++);
  R.iv = setInterval(() => { const t = v.currentTime; if (t < R.last - 1) R.jumps.push([R.last, t]); R.last = t; }, 250);
}, MAIN);
const recorder = (page) => page.evaluate(() => ({ jumps: window.__rec.jumps, reloads: window.__rec.reloads,
  ytError: [...document.querySelectorAll('#movie_player .ytp-error')].map((e) => e.innerText.trim()).filter(Boolean).join(' / ') }));

const tests = [];
const test = (name, fn) => tests.push({ name, fn });

test('R1 one bar on the watch page, 1.0x by default', async () => {
  const p = await newPage(); await openWatch(p, C); await sleep(2000);
  expect((await visibleBars(p)) === 1, 'visible bars=' + (await visibleBars(p)) + ' total=' + (await bars(p)));
  expect(approx(await rate(p), 1), 'rate ' + (await rate(p)));
  expect(JSON.stringify(await highlighted(p)) === '["Normal"]', 'highlight ' + JSON.stringify(await highlighted(p)));
  await p.context().close();
});

test('R2 manual speed saved, restored on reload, record not rewritten', async () => {
  const p = await newPage(); await openWatch(p, C); await sleep(1500);
  await clickSpeed(p, '1.5x'); await sleep(800);
  expect(approx(await rate(p), 1.5), 'rate after click ' + (await rate(p)));
  const rec = ((await store(p)).videoSpeedHistory.youtube || []).find((r) => r.identifier === 'youtube_' + C);
  expect(rec && rec.speed === 1.5, 'history ' + JSON.stringify(rec));
  await p.reload(); await handleConsent(p); await p.waitForSelector(MAIN); await waitNoAd(p);
  await p.waitForSelector('.vsb-container .speed-button'); await sleep(4000);
  expect(approx(await rate(p), 1.5), 'rate after reload ' + (await rate(p)));
  const rec2 = (await store(p)).videoSpeedHistory.youtube.find((r) => r.identifier === 'youtube_' + C);
  expect(rec2.timestamp === rec.timestamp, 'record rewritten on restore');
  await p.context().close();
});

test('R3 playback position never moves backwards / no reload during script operations', async () => {
  const p = await newPage(); await openWatch(p, A);
  await p.waitForFunction((sel) => document.querySelector(sel).currentTime > 8, MAIN, { timeout: 30000 });
  await startRecorder(p);
  for (const s of ['2x', '1.25x', '0.8x', 'Normal', '1.5x']) { await clickSpeed(p, s); await sleep(700); }
  for (const k of ['-', '=', '+', '*', 'Shift+Slash']) { await pressKey(p, k); await sleep(700); }
  await p.evaluate(() => window.__gmMenu[0].fn()); await sleep(1000);
  await p.keyboard.press('Escape'); await p.evaluate(() => { const w = document.querySelector('#customSpeedWindow'); const x = w && [...w.querySelectorAll('button')].find((b) => b.textContent.trim() === '×'); if (x) x.click(); }); await sleep(800);
  // Signed-out automated sessions get cut off by YouTube ~1 min after load ("Something went wrong"), so keep this short.
  await sleep(15000);
  const r = await recorder(p); const s = await stats(p);
  expect(!r.ytError, 'YouTube player error (environment, not the script): ' + r.ytError + ' jumps ' + JSON.stringify(r.jumps));
  expect(r.jumps.length === 0, 'backward jumps: ' + JSON.stringify(r.jumps));
  expect(r.reloads === 0, 'video reloaded x' + r.reloads);
  expect(s.timeWrites === 0 && s.mediaCalls === 0, `script touched currentTime/load/play ${s.timeWrites}/${s.mediaCalls}`);
  await p.context().close();
});

test('R4 SPA navigation keeps one bar and the right speed per video', async () => {
  const p = await newPage(); await openWatch(p, C); await sleep(1000);
  await clickSpeed(p, '1.5x'); await sleep(800);
  const how = await spaNavigate(p, A); await sleep(5000);
  expect(approx(await rate(p), 1), `A (${how}) rate ` + (await rate(p)));
  expect((await visibleBars(p)) === 1, 'visible bars after nav=' + (await visibleBars(p)));
  await p.goBack(); await p.waitForFunction((id) => location.search.includes(id), C); await waitNoAd(p).catch(() => {}); await sleep(5000);
  expect(approx(await rate(p), 1.5), 'C after back rate ' + (await rate(p)));
  expect((await visibleBars(p)) === 1, 'visible bars after back=' + (await visibleBars(p)));
  await p.context().close();
});

test('R5 channel default, and no stale channel after SPA navigation', async () => {
  const probe = await newPage(); await openWatch(probe, A); const chA = await channelOfPage(probe); await probe.context().close();
  expect(chA, 'could not read channel of A');
  const seed = { channelDefaultSpeeds: { youtube: { [chA]: { speed: 1.25, name: 'test', remark: '', iconUrl: '' } } } };
  const p = await newPage(seed); await openWatch(p, B); await sleep(6000);
  expect(approx(await rate(p), 1.25), `B (same channel ${chA}) direct load rate ` + (await rate(p)));
  let how = await spaNavigate(p, C); await sleep(7000);
  expect(approx(await rate(p), 1), `C (other channel, ${how}) after nav from ${chA}: ` + (await rate(p)));
  how = await spaNavigate(p, A); await sleep(7000);
  expect(approx(await rate(p), 1.25), `A (${chA}, ${how}) after nav from C: ` + (await rate(p)));
  await p.context().close();
});

test('R6 shortcuts step by speed; typing in the search box is ignored', async () => {
  const p = await newPage(); await openWatch(p, C); await sleep(1500);
  await pressKey(p, '*'); await sleep(300); expect(approx(await rate(p), 1), '* -> ' + (await rate(p)));
  await pressKey(p, '-'); await sleep(300); expect(approx(await rate(p), 0.95), '- -> ' + (await rate(p)));
  await pressKey(p, '+'); await pressKey(p, '+'); await sleep(300); expect(approx(await rate(p), 1.05), '++ -> ' + (await rate(p)));
  await pressKey(p, '*'); await sleep(300);
  const search = p.locator('input[name="search_query"]').first();
  await search.click(); await p.keyboard.type('c++ -=*'); await sleep(500);
  expect(approx(await rate(p), 1), 'typing in search changed rate to ' + (await rate(p)));
  await p.context().close();
});

test('R7 YouTube own speed shortcut (Shift+.) is respected', async () => {
  const p = await newPage(); await openWatch(p, C); await sleep(6000);
  await p.evaluate(() => { const mp = document.querySelector('#movie_player'); mp.setAttribute('tabindex', mp.getAttribute('tabindex') || '-1'); mp.focus(); });
  await p.keyboard.press('Shift+Period'); await sleep(3000);
  const r = await rate(p);
  expect(r > 1.01, 'YouTube shortcut did not stick, rate ' + r);
  await p.context().close();
});

test('R8 no growth of listeners/observers/intervals over navigations; no idle rate writes', async () => {
  const p = await newPage(); await openWatch(p, A); await sleep(4000);
  const s0 = await stats(p);
  for (const id of [B, C, A, B, C, A]) { await spaNavigate(p, id); await sleep(3000); }
  await sleep(4000);
  const s1 = await stats(p);
  expect((await bars(p)) === 1, 'bars=' + (await bars(p)));
  expect(s1.listeners <= s0.listeners + 2 && s1.observers <= s0.observers && s1.intervals <= s0.intervals,
    `growth listeners ${s0.listeners}->${s1.listeners}, observers ${s0.observers}->${s1.observers}, intervals ${s0.intervals}->${s1.intervals}`);
  const w0 = s1.rateWrites; await sleep(8000); const w1 = (await stats(p)).rateWrites;
  expect(w1 === w0, `script wrote playbackRate ${w1 - w0}x while idle`);
  await p.context().close();
});

test('R9 home page hover previews untouched', async () => {
  const p = await newPage(); await p.goto('https://www.youtube.com/', { waitUntil: 'domcontentloaded' }); await handleConsent(p);
  await p.waitForSelector('ytd-rich-item-renderer a#thumbnail', { timeout: 30000 }).catch(() => {});
  const thumbs = p.locator('ytd-rich-item-renderer a#thumbnail');
  for (let i = 0; i < Math.min(3, await thumbs.count()); i++) { await thumbs.nth(i).hover().catch(() => {}); await sleep(3500); }
  const s = await stats(p);
  expect(s.rateWrites === 0, 'script wrote playbackRate x' + s.rateWrites + ' on the home page');
  const vis = await visibleBars(p);
  expect(vis === 0, 'visible bar/floating panel on home: ' + vis);
  await p.context().close();
});

test('R10 no script errors or Trusted Types violations', async () => {
  const p = await newPage(); await openWatch(p, C); await sleep(1500);
  await clickSpeed(p, '1.25x'); await pressKey(p, 'Shift+Slash');
  await p.evaluate(() => window.__gmMenu[0].fn()); await sleep(800);
  for (const label of ['Video History', 'Channel Speeds', 'Settings', 'Speeds']) {
    await p.evaluate((label) => { const w = document.querySelector('#customSpeedWindow'); const b = w && [...w.querySelectorAll('button')].find((e) => e.offsetParent !== null && e.textContent.trim().endsWith(label)); if (b) b.click(); }, label);
    await sleep(400);
  }
  const winOk = await p.evaluate(() => !!document.querySelector('#customSpeedWindow'));
  await spaNavigate(p, A); await sleep(3000);
  const s = await stats(p);
  expect(winOk, 'settings window did not open');
  expect(s.errors.length === 0, 'errors: ' + s.errors.join(' | ').slice(0, 500));
  expect(s.tt.length === 0, 'TT violations: ' + s.tt.join(' | ').slice(0, 300));
  await p.context().close();
});

(async () => {
  browser = await chromium.launch({
    executablePath: process.env.BROWSER_PATH || undefined,
    headless: process.env.HEADLESS === '1',
    args: ['--autoplay-policy=no-user-gesture-required'],
  });
  console.log('browser', browser.version(), '| script', path.basename(SCRIPT));
  const results = [];
  for (const t of tests) {
    if (FILTER && !FILTER.test(t.name)) continue;
    const t0 = Date.now();
    try { await t.fn(); results.push({ name: t.name, ok: true }); console.log('PASS', t.name, `(${((Date.now() - t0) / 1000).toFixed(0)}s)`); }
    catch (e) { const err = String(e.message || e).split('\n')[0]; results.push({ name: t.name, ok: false, err }); console.log('FAIL', t.name, '-', err); }
  }
  await browser.close();
  const out = process.env.OUT || path.join(__dirname, 'real-youtube-report.json');
  fs.writeFileSync(out, JSON.stringify({ browser: process.env.BROWSER_PATH || 'bundled', script: SCRIPT, results }, null, 2));
  console.log(`\n${results.filter((r) => r.ok).length}/${results.length} passed`);
})();
