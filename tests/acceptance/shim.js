// Userscript-manager shim + instrumentation. Injected before any page script.
(() => {
  const KEY = '__gm_store__';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } };
  const clone = (v) => (v === undefined ? v : JSON.parse(JSON.stringify(v)));
  window.GM_getValue = (k, d) => { const s = load(); return Object.prototype.hasOwnProperty.call(s, k) ? clone(s[k]) : d; };
  window.GM_setValue = (k, v) => { const s = load(); s[k] = clone(v); localStorage.setItem(KEY, JSON.stringify(s)); };
  window.GM_addStyle = (css) => { const st = document.createElement('style'); st.textContent = css; (document.head || document.documentElement).appendChild(st); return st; };
  window.__gmMenu = [];
  window.GM_registerMenuCommand = (name, fn) => { window.__gmMenu.push({ name, fn }); return window.__gmMenu.length; };

  const fromUS = () => (new Error().stack || '').includes('userscript.js');
  const S = window.__us = {
    listeners: new Map(), observers: new Set(), intervals: new Set(),
    rateWrites: [], timeWrites: [], mediaCalls: [], errors: [], tt: [],
  };
  const lkey = (t, type, fn, cap) => { if (!S._ids) S._ids = new WeakMap(); for (const o of [t, fn]) if (!S._ids.has(o)) S._ids.set(o, Math.random()); return S._ids.get(t) + '|' + type + '|' + S._ids.get(fn) + '|' + !!cap; };
  const capOf = (o) => (typeof o === 'boolean' ? o : !!(o && o.capture));
  const add = EventTarget.prototype.addEventListener, rem = EventTarget.prototype.removeEventListener;
  EventTarget.prototype.addEventListener = function (type, fn, opts) {
    if (fn && fromUS()) S.listeners.set(lkey(this, type, fn, capOf(opts)), type);
    return add.call(this, type, fn, opts);
  };
  EventTarget.prototype.removeEventListener = function (type, fn, opts) {
    if (fn) S.listeners.delete(lkey(this, type, fn, capOf(opts)));
    return rem.call(this, type, fn, opts);
  };
  const MO = window.MutationObserver;
  window.MutationObserver = class extends MO {
    observe(t, o) { if (fromUS()) S.observers.add(this); return super.observe(t, o); }
    disconnect() { S.observers.delete(this); return super.disconnect(); }
  };
  const si = window.setInterval, ci = window.clearInterval;
  window.setInterval = function (...a) { const id = si.apply(this, a); if (fromUS()) S.intervals.add(id); return id; };
  window.clearInterval = function (id) { S.intervals.delete(id); return ci.call(this, id); };

  const P = HTMLMediaElement.prototype;
  const rd = Object.getOwnPropertyDescriptor(P, 'playbackRate');
  Object.defineProperty(P, 'playbackRate', { configurable: true, get: rd.get, set(v) {
    if (fromUS()) S.rateWrites.push({ v, id: this.id || this.className, t: performance.now() });
    return rd.set.call(this, v);
  } });
  const td = Object.getOwnPropertyDescriptor(P, 'currentTime');
  Object.defineProperty(P, 'currentTime', { configurable: true, get: td.get, set(v) {
    if (fromUS()) S.timeWrites.push({ v, id: this.id, t: performance.now() });
    return td.set.call(this, v);
  } });
  for (const m of ['load', 'play', 'pause', 'fastSeek']) {
    const orig = P[m];
    if (orig) P[m] = function (...a) { if (fromUS()) S.mediaCalls.push({ m, id: this.id }); return orig.apply(this, a); };
  }
  window.addEventListener('error', (e) => {
    const where = (e.filename || '') + ' ' + ((e.error && e.error.stack) || '');
    if (where.includes('userscript.js')) S.errors.push(String(e.message));
  });
  window.addEventListener('unhandledrejection', (e) => {
    const st = (e.reason && e.reason.stack) || '';
    if (st.includes('userscript.js')) S.errors.push('rejection: ' + String(e.reason));
  });
  document.addEventListener('securitypolicyviolation', (e) => S.tt.push(e.violatedDirective + ' ' + e.sample));
  const origErr = console.error;
  console.error = function (...a) { if (fromUS()) S.errors.push('console.error: ' + a.map(String).join(' ')); return origErr.apply(this, a); };

  const run = () => {
    const pol = window.trustedTypes.createPolicy('harness-loader', { createScript: (s) => s });
    try { (0, eval)(pol.createScript(window.__US_SRC)); } catch (e) { S.errors.push('load: ' + e); }
  };
  // @run-at document-end (real-youtube.js injects the script itself instead)
  if (!window.__US_SRC) return;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
})();
