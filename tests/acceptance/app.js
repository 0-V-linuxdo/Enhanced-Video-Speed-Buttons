// Simulates the parts of YouTube's watch page that matter to the userscript.
(function () {
  const VIDEOS = {
    vidAAAAAAA: { title: 'Alpha video one', ch: '@alphaChan', chName: 'Alpha Channel' },
    vidBBBBBBB: { title: 'Beta video', ch: '@betaChan', chName: 'Beta Channel' },
    vidCCCCCCC: { title: 'Alpha video two', ch: '@alphaChan', chName: 'Alpha Channel' },
    vidXSSXSSX: { title: '<b>bold</b> "quote" & co', ch: '@betaChan', chName: 'Beta Channel' },
  };
  const lag = { flexy: 50, owner: 600, title: 800, finish: 700 };
  const $ = (s) => document.querySelector(s);
  const video = $('#main-video');
  const flexy = $('#flexy');
  let current = null;       // current video id
  let ytPref = 1;           // the player's own remembered rate (YouTube remembers the user's menu choice)
  let inAd = false;
  const resume = JSON.parse(sessionStorage.getItem('resume') || '{}');
  const events = [];
  const timers = [];
  const later = (ms, fn) => timers.push(setTimeout(fn, ms));

  // shadow DOM input, like some YouTube widgets
  const host = $('#shadow-host');
  const sr = host.attachShadow({ mode: 'open' });
  const shadowInput = document.createElement('input');
  shadowInput.id = 'shadow-input';
  sr.appendChild(shadowInput);

  ['loadstart', 'emptied', 'loadedmetadata', 'seeking', 'ratechange'].forEach((ev) =>
    video.addEventListener(ev, () => events.push({ ev, t: performance.now(), ct: video.currentTime, rate: video.playbackRate, ad: inAd })));

  // Player behaviour: on every new source, reset to its own rate and resume the saved position.
  video.addEventListener('loadedmetadata', () => {
    video.playbackRate = ytPref;
    if (!inAd && current && resume[current] > 1) video.currentTime = resume[current];
  });
  // ...and once more shortly after it can play (YouTube re-applies its rate a bit later too).
  video.addEventListener('canplay', () => { setTimeout(() => { video.playbackRate = ytPref; }, 300); }, { once: false });
  video.addEventListener('ended', () => { if (inAd) { inAd = false; loadContent(current); } });
  setInterval(() => {
    if (!inAd && current && !video.paused && video.currentTime > 0) {
      resume[current] = video.currentTime;
      sessionStorage.setItem('resume', JSON.stringify(resume));
    }
  }, 500);

  function loadContent(v) {
    video.src = '/media/content.wav?v=' + v;
    video.play().catch(() => {});
  }

  function renderMeta(v) {
    const d = VIDEOS[v];
    $('#vtitle').textContent = d.title;
    $('#owner-link').setAttribute('href', '/' + d.ch);
    $('#owner-name').setAttribute('href', '/' + d.ch);
    $('#owner-name').textContent = d.chName;
    $('#img').setAttribute('src', 'https://yt3.example/' + d.ch.slice(1) + '.jpg');
  }

  function showPage(which) {
    flexy.hidden = which !== 'watch';
    $('#home').hidden = which !== 'home';
    if ($('#shorts')) $('#shorts').hidden = which !== 'shorts';
  }

  function navigate(v, push = true) {
    if (push) history.pushState({ v }, '', '/watch?v=' + v);
    showPage('watch');
    current = v;
    later(lag.flexy, () => flexy.setAttribute('video-id', v));
    loadContent(v);
    later(lag.owner, () => renderMeta(v));
    later(lag.title, () => { document.title = VIDEOS[v].title + ' - YouTube'; });
    later(lag.finish, () => document.dispatchEvent(new CustomEvent('yt-navigate-finish')));
  }

  function goHome(push = true) {
    if (push) history.pushState({}, '', '/');
    video.pause();
    showPage('home');
    document.title = 'YouTube';
    document.dispatchEvent(new CustomEvent('yt-navigate-finish'));
  }

  function openShorts(id, push = true) {
    if (push) history.pushState({}, '', '/shorts/' + id);
    video.pause();
    if (!$('#shorts')) {
      const sh = document.createElement('ytd-shorts'); sh.id = 'shorts';
      const pl = document.createElement('div'); pl.id = 'shorts-player';
      const v = document.createElement('video'); v.id = 'shorts-video'; v.loop = true; v.muted = true;
      pl.appendChild(v); sh.appendChild(pl); flexy.after(sh);
    }
    showPage('shorts');
    const sv = $('#shorts-video');
    sv.src = '/media/content.wav?shorts=' + id;
    sv.play().catch(() => {});
    document.dispatchEvent(new CustomEvent('yt-navigate-finish'));
  }

  // Hover preview on the home feed: YouTube inserts an inline player before the watch page in the DOM.
  function hoverPreview() {
    let p = document.querySelector('ytd-video-preview');
    if (!p) {
      p = document.createElement('ytd-video-preview');
      const pv = document.createElement('video');
      pv.id = 'preview-video';
      pv.muted = true; pv.loop = true;
      p.appendChild(pv);
      $('#preview-slot').appendChild(p);
    }
    const pv = p.querySelector('video');
    pv.src = '/media/content.wav?preview=1';
    pv.play().catch(() => {});
    return pv;
  }

  function playAd() {
    inAd = true;
    video.src = '/media/ad.wav';
    video.play().catch(() => {});
  }

  function nativeSetRate(r) { ytPref = r; video.playbackRate = r; }

  // Polymer-style re-render that throws away foreign children of #above-the-fold.
  function rerenderMetadata() {
    const atf = $('#above-the-fold');
    const keep = [$('#title'), $('#owner')];
    atf.replaceChildren(...keep);
  }

  window.addEventListener('popstate', () => {
    const u = new URL(location.href);
    if (u.pathname === '/watch') navigate(u.searchParams.get('v'), false);
    else if (u.pathname.startsWith('/shorts/')) openShorts(u.pathname.split('/')[2], false);
    else goHome(false);
  });

  window.__yt = {
    navigate, goHome, openShorts, hoverPreview, playAd, nativeSetRate, rerenderMetadata,
    setLag: (o) => Object.assign(lag, o), events, resume,
    get current() { return current; }, get inAd() { return inAd; },
  };

  const u = new URL(location.href);
  if (u.pathname === '/watch') {
    // initial page load: everything already rendered (server side), like a full YouTube load
    current = u.searchParams.get('v');
    flexy.setAttribute('video-id', current);
    renderMeta(current);
    document.title = VIDEOS[current].title + ' - YouTube';
    showPage('watch');
    loadContent(current);
  } else if (u.pathname.startsWith('/shorts/')) openShorts(u.pathname.split('/')[2], false);
  else goHome(false);
})();
