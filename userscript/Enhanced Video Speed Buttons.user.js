// ==UserScript==
// @name         Enhanced Video Speed Buttons [20261007] v2.0.0
// @namespace    0_V userscripts/Enhanced Video Speed Buttons
// @version      [20261007] v2.0.0
// @description  Adds clickable playback-speed buttons above YouTube, Bilibili and Vimeo videos, with keyboard shortcuts, per-video speed memory, per-channel default speeds, custom button lists and settings export/import.
// @update-log   Clean-room rewrite: fixes playback-position loss, controller/observer leaks, wrong-video binding and reversed keyboard shortcut direction.
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTIwIDEyMCIgc3R5bGU9ImN1cnNvcjogcG9pbnRlcjsiPgogIDxkZWZzPgogICAgPCEtLSDigJfnrpfljYfmuIXnqbogLS0+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImR5bmFtaWNHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRjFFNTAiIGlkPSJzdG9wMSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzM0OThEQiIgaWQ9InN0b3AyIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGNDA4MSIgaWQ9InN0b3AzIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgoKICAgIDwhLS0g6auY57qn6ZSh5ZKM5Y+R5YWl5pWw5o2uIC0tPgogICAgPGZpbHRlciBpZD0icGxheUljb25FZmZlY3QiIHg9Ii01MCUiIHk9Ii01MCUiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiPgogICAgICA8ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiIHJlc3VsdD0ic2hhZG93Ii8+CiAgICAgIDxmZU9mZnNldCBkeD0iMCIgZHk9IjIiIHJlc3VsdD0ib2Zmc2V0U2hhZG93Ii8+CiAgICAgIDxmZUNvbXBvc2l0ZSBpbj0ic2hhZG93IiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIvPgogICAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwLjkKICAgICAgICAgICAgICAgICAgICAgICAwIDAgMCAwIDAuMwogICAgICAgICAgICAgICAgICAgICAgIDAgMCAwIDAgMC40CiAgICAgICAgICAgICAgICAgICAgICAgMCAwIDAgMC42IDAiLz4KICAgICAgCiAgICAgIDxmZUZsb29kIGZsb29kLWNvbG9yPSIjRkYxRTUwIiBmbG9vZC1vcGFjaXR5PSIwLjQiIHJlc3VsdD0iZ2xvd0NvbG9yIi8+CiAgICAgIDxmZUNvbXBvc2l0ZSBpbj0iZ2xvd0NvbG9yIiBpbjI9IlNvdXJjZUdyYXBoaWMiIG9wZXJhdG9yPSJpbiIvPgogICAgICA8ZmVHYXVzc2lhbkJsdXIgc3REZXZpYXRpb249IjQiIHJlc3VsdD0iZ2xvdyIvPgogICAgICA8ZmVNZXJnZT4KICAgICAgICA8ZmVNZXJnZU5vZGUgaW49Imdsb3ciLz4KICAgICAgICA8ZmVNZXJnZU5vZGUgaW49IlNvdXJjZUdyYXBoaWMiLz4KICAgICAgPC9mZU1lcmdlPgogICAgPC9maWx0ZXI+CiAgPC9kZWZzPgoKICAgIDxzdHlsZT4KICAgICAgQGtleWZyYW1lcyBicmVhdGhlUHVsc2UgewogICAgICAgIDAlLCAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgxKSByb3RhdGUoMGRlZyk7IH0KICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpIHJvdGF0ZSgzZGVnKTsgfQogICAgICB9CiAgICA8L3N0eWxlPgoKICAgIDwhLS0g6IOM5pmv6aOe5py6IC0tPgogICAgPHJlY3QgCiAgICAgIHdpZHRoPSIxMjAiIAogICAgICBoZWlnaHQ9IjEyMCIgCiAgICAgIGZpbGw9InVybCgjZHluYW1pY0dyYWRpZW50KSIgCiAgICAgIHJ4PSIxNSIgCiAgICAgIHJ5PSIxNSIKICAgIC8+CgogICAgPCEtLSDigJrlr7nmr4jmiYjnmoTkuI3ov4nkva7kuIDkuK3lgYwgLS0+CiAgICA8cG9seWdvbiAKICAgICAgaWQ9InBsYXlUcmlhbmdsZSIgCiAgICAgIHBvaW50cz0iNDAsMzUgNDAsODUgOTAsNjAiIAogICAgICBmaWxsPSJ3aGl0ZSIgCiAgICAgIGZpbHRlcj0idXJsKCNwbGF5SWNvbkVmZmVjdCkiCiAgICAvPgoKICAgIDxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0Ij4KICAgICAgPCFbQ0RBVEFbCiAgICAoZnVuY3Rpb24oKSB7CiAgICAgIGNvbnN0IHBsYXlUcmlhbmdsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5VHJpYW5nbGUnKTsKCiAgICAgIHBsYXlUcmlhbmdsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4gewogICAgICAgIHBsYXlUcmlhbmdsZS5zdHlsZS5hbmltYXRpb24gPSAnYnJlYXRoZVB1bHNlIDAuNnMgZWFzZS1pbi1vdXQnOwogICAgICB9KTsKCiAgICAgIHBsYXlUcmlhbmdsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4gewogICAgICAgIHBsYXlUcmlhbmdsZS5zdHlsZS5hbmltYXRpb24gPSAnbm9uZSc7CiAgICAgICAgcGxheVRyaWFuZ2xlLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZSgxKSByb3RhdGUoMGRlZyknOwogICAgICB9KTsKICAgIH0pKCk7CiAgICBdXT4KICAgIDwvc2NyaXB0Pgo8L3N2Zz4=
// @match        *://*.youtube.com/*
// @match        *://youtube.com/*
// @match        *://*.vimeo.com/*
// @match        *://vimeo.com/*
// @match        *://*.bilibili.com/*
// @match        *://bilibili.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

/*
 * Original script information:
 *   Name:    Video Speed Buttons
 *   Author:  bradenscode
 *   Link:    https://greasyfork.org/scripts/30506
 *   Version: 1.0.10
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Constants
  // ---------------------------------------------------------------------------

  const EPS = 0.0001;
  const GUARD_MS = 3000;
  const CHANNEL_WAIT_MS = 15000;
  const FLOAT_DELAY_MS = 1500;
  const HISTORY_LIMIT = 100;
  const EXPORT_VERSION = '1.36';
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const KEY_SPEEDS = 'customSpeeds';
  const KEY_ORDER = 'buttonOrder';
  const KEY_HISTORY = 'videoSpeedHistory';
  const KEY_CHANNELS = 'channelDefaultSpeeds';
  const KEY_LANG = 'uiLanguagePreference';

  const DEFAULT_SPEEDS = [
    ['2x', 2], ['1.5x', 1.5], ['1.25x', 1.25], ['1.2x', 1.2], ['1.1x', 1.1], ['1.05x', 1.05],
    ['Normal', 1], ['0.95x', 0.95], ['0.9x', 0.9], ['0.85x', 0.85], ['0.8x', 0.8], ['0.78x', 0.78],
  ];

  const MEDIA_EVENTS = ['loadstart', 'emptied', 'loadedmetadata', 'loadeddata', 'durationchange', 'canplay', 'playing'];

  const PLATFORM_COLORS = { youtube: '#ff0000', bilibili: '#00a1d6', vimeo: '#1ab7ea' };

  const ANCHORS = {
    youtube: ['div#above-the-fold', 'div#title.style-scope.ytd-watch-metadata', 'div#container.ytd-video-primary-info-renderer',
      'div#watch-header', 'div#watch7-headline', 'div#watch-headline-title'],
    vimeo: ['.clip_info-wrapper'],
    bilibili: ['div#viewbox_report', '.video-info-container', '#player_module', '.video-info', '.bilibili-player-area'],
    other: [],
  };

  // ---------------------------------------------------------------------------
  // Translations
  // ---------------------------------------------------------------------------

  const I18N = {
    en: {
      title: '🛠️ Custom Speed Buttons', label: '✍️ Button Label:', speed: '⏱️ Speed:', delete: 'Delete', edit: 'Edit', add: 'Add',
      buttonOrder: '↔️ Order', ascending: 'Ascending', descending: 'Descending', reset: 'Reset', clear: 'Clear', cancel: 'Cancel',
      confirm: 'Confirm', invalidInput: 'Please enter a valid positive number!', speedExists: 'This speed already exists! Label updated!',
      settingsSaved: 'Settings saved successfully!', history: 'Video History', noHistory: 'No history records!', speeds: 'Speeds',
      confirmReset: 'Are you sure you want to clear all history?', historyCleared: 'History has been cleared!',
      errorInitializing: 'Error initializing settings window!', errorUpdatingList: 'Error updating speed list!', retryButton: 'Retry',
      sync: 'Sync', export: 'Export', import: 'Import', exportSuccess: 'Settings exported successfully!',
      importSuccess: 'Settings imported successfully!', importError: 'Error importing settings: Invalid file format!',
      noSettingsFound: 'No settings found to export!', selectFile: 'Select File',
      confirmImport: 'This will overwrite your current settings. Continue?', channelSpeeds: 'Channel Speeds',
      addChannelSpeed: 'Add Channel Speed', channel: 'Channel', channelSpeed: 'Speed', iconUrl: '🖼️ Icon URL:',
      iconUrlPlaceholder: 'https://... or data:image/...', iconPreview: 'Preview', setDefaultSpeed: 'Set as Default',
      removeChannelSpeed: 'Remove', noChannelSpeeds: 'No channel speed settings!', exportChannelSpeeds: 'Export Channel Speeds',
      importChannelSpeeds: 'Import Channel Speeds', editChannelSpeed: 'Edit', save: 'Save', cancelEdit: 'Cancel',
      currentChannel: 'Current Channel', addSpeedForCurrentChannel: 'Add Speed', editSpeedForChannel: 'Edit Speed',
      enterNewSpeed: 'Enter new speed:', channelSpeedSet: 'Channel speed set successfully!',
      channelSpeedUpdated: 'Channel speed updated successfully!', channelSpeedDeleted: 'Channel speed deleted successfully!',
      confirmRemoveChannelSpeed: 'Are you sure you want to delete this channel speed?',
      invalidIconUrl: 'Please enter a valid icon URL (http(s) or data URI), or leave it empty.',
      noCurrentChannel: 'No channel detected on this page.', youtube: 'YouTube', bilibili: 'Bilibili',
      addYouTubeChannelSpeed: 'Add YouTube Speed', addBilibiliChannelSpeed: 'Add Bilibili Speed',
      editYouTubeChannelSpeed: 'Edit YouTube Speed', editBilibiliChannelSpeed: 'Edit Bilibili Speed',
      removeYouTubeChannelSpeed: 'Remove YouTube Speed', removeBilibiliChannelSpeed: 'Remove Bilibili Speed',
      youtubeChannel: 'YouTube', bilibiliChannel: 'Bilibili', video: 'Video', videoHistory: 'Video History',
      channelsTab: 'Channels', syncSettings: 'Sync Settings', exportSettings: 'Export Settings', importSettings: 'Import Settings',
      addSpeed: 'Add Speed', confirmImportSettings: 'This will overwrite your current settings. Continue?',
      infoSyncBilibili: 'Synchronize your speed settings across devices for Bilibili channels.',
      infoSyncOther: 'Synchronize your speed settings across devices for other platforms.', close: 'Close',
      remark: '✍️ Remark:', channelIconLabel: 'Icon', channelNameHeader: 'Name', channelRemarkHeader: 'Remark',
      channelSpeedHeader: 'Speed', channelName: '📛 Name:', uiLanguage: 'Interface Language',
      languageDescription: 'Choose the language used by the script interface.', languageAuto: 'Auto', languageZh: 'Chinese',
      languageEn: 'English', languageAutoHint: 'Follow your browser language automatically.',
      languageZhHint: 'Always use the interface in Chinese.', languageEnHint: 'Always use the interface in English.',
      settings: 'Settings',
    },
    zh: {
      title: '🛠️ 自定义速度按钮', label: '✍️ 标签：', speed: '⏱️ 速度：', delete: '删除', edit: '编辑', add: '添加',
      buttonOrder: '↔️ 顺序', ascending: '升序', descending: '降序', reset: '重置', clear: '清空', cancel: '取消',
      confirm: '确认', invalidInput: '请输入有效的正数！', speedExists: '此速度已存在！对应标签已更新！',
      settingsSaved: '设置已成功保存！', history: '视频历史', noHistory: '无历史记录！', speeds: '速度',
      confirmReset: '确定要清除所有历史记录？', historyCleared: '历史记录已清空！',
      errorInitializing: '初始化设置窗口时出错！', errorUpdatingList: '更新速度列表时出错！', retryButton: '重试',
      sync: '同步', export: '导出', import: '导入', exportSuccess: '设置导出成功！', importSuccess: '设置导入成功！',
      importError: '导入设置出错：无效的文件格式！', noSettingsFound: '没有可导出的设置！', selectFile: '选择文件',
      confirmImport: '这将覆盖您当前的设置，是否继续？', channelSpeeds: '频道速度', addChannelSpeed: '添加频道速度',
      channel: '频道', channelSpeed: '速度', iconUrl: '🖼️ 图标地址：', iconUrlPlaceholder: 'https://... 或 data:image/...',
      iconPreview: '图标预览', setDefaultSpeed: '设为默认', removeChannelSpeed: '移除', noChannelSpeeds: '暂无频道速度设置！',
      exportChannelSpeeds: '导出频道速度', importChannelSpeeds: '导入频道速度', editChannelSpeed: '编辑', save: '保存',
      cancelEdit: '取消', currentChannel: '当前频道', addSpeedForCurrentChannel: '添加速度', editSpeedForChannel: '编辑速度',
      enterNewSpeed: '输入新速度：', channelSpeedSet: '频道速度设置成功！', channelSpeedUpdated: '频道速度更新成功！',
      channelSpeedDeleted: '频道速度已删除！', confirmRemoveChannelSpeed: '确定要删除这个频道的速度设置吗？',
      invalidIconUrl: '请输入有效的图标地址（http(s) 或 data URI），或留空。', noCurrentChannel: '此页面未检测到频道。',
      youtube: 'YouTube', bilibili: '哔哩哔哩', addYouTubeChannelSpeed: '添加YouTube速度', addBilibiliChannelSpeed: '添加哔哩哔哩速度',
      editYouTubeChannelSpeed: '编辑YouTube速度', editBilibiliChannelSpeed: '编辑哔哩哔哩速度',
      removeYouTubeChannelSpeed: '移除YouTube速度', removeBilibiliChannelSpeed: '移除哔哩哔哩速度',
      youtubeChannel: 'YouTube', bilibiliChannel: '哔哩哔哩', video: '视频', videoHistory: '视频历史', channelsTab: '频道',
      syncSettings: '同步设置', exportSettings: '导出设置', importSettings: '导入设置', addSpeed: '添加速度',
      confirmImportSettings: '这将覆盖您当前的设置，是否继续？',
      infoSyncBilibili: '同步您在哔哩哔哩频道的速度设置到所有设备。', infoSyncOther: '同步您在其他平台的速度设置到所有设备。',
      close: '关闭', remark: '✍️ 备注：', channelIconLabel: '图标', channelNameHeader: '名称', channelRemarkHeader: '备注',
      channelSpeedHeader: '速度', channelName: '📛 名称：', uiLanguage: '界面语言', languageDescription: '选择脚本界面语言。',
      languageAuto: '自适应', languageZh: '中文', languageEn: '英文', languageAutoHint: '跟随浏览器语言自动切换。',
      languageZhHint: '始终使用中文界面。', languageEnHint: '始终使用英文界面。', settings: '设置',
    },
  };

  // ---------------------------------------------------------------------------
  // Storage (GM_* with a localStorage fallback for non-userscript test runs)
  // ---------------------------------------------------------------------------

  const hasGM = typeof GM_getValue === 'function' && typeof GM_setValue === 'function';

  function getValue(key, def) {
    try {
      if (hasGM) {
        const v = GM_getValue(key, def);
        if (typeof v === 'string' && def !== undefined && typeof def !== 'string') {
          try { return JSON.parse(v); } catch (_) { return def; }
        }
        return v === undefined ? def : v;
      }
      const raw = localStorage.getItem('evsb:' + key);
      return raw == null ? def : JSON.parse(raw);
    } catch (_) {
      return def;
    }
  }

  function setValue(key, value) {
    try {
      if (hasGM) GM_setValue(key, value);
      else localStorage.setItem('evsb:' + key, JSON.stringify(value));
    } catch (err) {
      console.error('[EVSB] storage write failed', err);
    }
  }

  const isPlainObject = (o) => o !== null && typeof o === 'object' && !Array.isArray(o);
  const isPositive = (n) => Number.isFinite(n) && n > 0;
  const clone = (o) => JSON.parse(JSON.stringify(o));

  function isValidSpeedList(list) {
    return Array.isArray(list) && list.length > 0 &&
      list.every((it) => Array.isArray(it) && typeof it[0] === 'string' && isPositive(Number(it[1])));
  }

  function isValidChannelSpeeds(obj) {
    if (!isPlainObject(obj)) return false;
    return Object.values(obj).every((plat) => isPlainObject(plat) && Object.values(plat).every((r) =>
      isPlainObject(r) && typeof r.speed === 'number' && isPositive(r.speed) &&
      typeof r.name === 'string' && typeof r.remark === 'string' &&
      (r.iconUrl === undefined || typeof r.iconUrl === 'string')));
  }

  const normalizeSpeeds = (list) => list.map((it) => [String(it[0]), Number(it[1])]);

  function getSpeeds() {
    const raw = getValue(KEY_SPEEDS, null);
    if (!Array.isArray(raw)) return clone(DEFAULT_SPEEDS);
    const list = raw.filter((it) => Array.isArray(it) && isPositive(Number(it[1]))).map((it) => [String(it[0]), Number(it[1])]);
    return list.length ? list : clone(DEFAULT_SPEEDS);
  }

  function getOrder() {
    const o = getValue(KEY_ORDER, 'desc');
    return o === 'asc' ? 'asc' : 'desc';
  }

  function sortSpeeds(list, order) {
    return list.slice().sort((a, b) => (order === 'asc' ? a[1] - b[1] : b[1] - a[1]));
  }

  function readHistoryAll() {
    const h = getValue(KEY_HISTORY, {});
    return isPlainObject(h) ? h : {};
  }

  function readChannelsAll() {
    const c = getValue(KEY_CHANNELS, {});
    return isPlainObject(c) ? c : {};
  }

  function findHistory(platform, identifier) {
    const list = readHistoryAll()[platform];
    if (!Array.isArray(list)) return null;
    return list.find((r) => r && r.identifier === identifier && r.isDefault !== true && isPositive(Number(r.speed))) || null;
  }

  function saveHistory(platform, identifier, speed) {
    const all = readHistoryAll();
    const list = (Array.isArray(all[platform]) ? all[platform] : []).filter((r) => r && r.identifier !== identifier);
    list.unshift({ identifier, title: document.title, speed, timestamp: Date.now(), url: location.href, isDefault: false });
    all[platform] = list.slice(0, HISTORY_LIMIT);
    setValue(KEY_HISTORY, all);
  }

  /** Returns true when a record was removed. */
  function deleteHistory(platform, identifier) {
    const all = readHistoryAll();
    const list = Array.isArray(all[platform]) ? all[platform] : [];
    const next = list.filter((r) => !(r && r.identifier === identifier));
    if (next.length === list.length) return false;
    all[platform] = next;
    setValue(KEY_HISTORY, all);
    return true;
  }

  function getChannelRecord(platform, id) {
    const plat = readChannelsAll()[platform];
    return isPlainObject(plat) && isPlainObject(plat[id]) ? plat[id] : null;
  }

  function startupSelfCheck() {
    if (!isValidSpeedList(getValue(KEY_SPEEDS, null))) setValue(KEY_SPEEDS, clone(DEFAULT_SPEEDS));
    if (!isValidChannelSpeeds(getValue(KEY_CHANNELS, {}))) setValue(KEY_CHANNELS, {});
  }

  // ---------------------------------------------------------------------------
  // Language
  // ---------------------------------------------------------------------------

  function getLangPref() {
    const p = getValue(KEY_LANG, 'auto');
    return p === 'zh' || p === 'en' ? p : 'auto';
  }

  function resolveLang() {
    const p = getLangPref();
    if (p !== 'auto') return p;
    return String(navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en';
  }

  function t(key) {
    const lang = resolveLang();
    const v = I18N[lang] && I18N[lang][key];
    if (v != null) return v;
    return I18N.en[key] != null ? I18N.en[key] : key;
  }

  const colon = () => (resolveLang() === 'zh' ? '：' : ':');

  // ---------------------------------------------------------------------------
  // Platform, identifier, channel detection
  // ---------------------------------------------------------------------------

  function getPlatform() {
    const host = location.hostname;
    if (host.includes('youtube')) return 'youtube';
    if (host.includes('bilibili')) return 'bilibili';
    if (host.includes('vimeo')) return 'vimeo';
    return 'other';
  }

  const PLATFORM = getPlatform();

  function getIdentifier() {
    if (PLATFORM === 'youtube') {
      const v = new URLSearchParams(location.search).get('v');
      if (v) return 'youtube_' + v;
    } else if (PLATFORM === 'bilibili') {
      const m = location.pathname.match(/\/video\/(BV[\w]+)/);
      if (m) return 'bilibili_' + m[1];
    } else if (PLATFORM === 'vimeo') {
      const m = location.pathname.match(/\/(\d+)/);
      if (m) return 'vimeo_' + m[1];
    }
    return location.href;
  }

  /** The visible watch page that belongs to the URL's current video, or null while YouTube is still updating. */
  function ytCurrentWatchScope() {
    const v = new URLSearchParams(location.search).get('v');
    if (!v) return null;
    let flexy = null;
    try { flexy = document.querySelector('ytd-watch-flexy[video-id="' + CSS.escape(v) + '"]'); } catch (_) { /* ignore */ }
    return flexy && !flexy.hasAttribute('hidden') ? flexy : null;
  }

  function parseYtChannelHref(href) {
    if (!href) return null;
    let m = href.match(/\/@([A-Za-z0-9_-]+)/);
    if (m) return '@' + m[1];
    m = href.match(/\/channel\/([A-Za-z0-9_-]+)/);
    return m ? m[1] : null;
  }

  function firstSrc(root, selectors) {
    for (const sel of selectors) {
      const img = root.querySelector(sel);
      const src = img && (img.getAttribute('src') || '');
      if (src) return src;
    }
    return '';
  }

  function getYouTubeChannel() {
    const scope = ytCurrentWatchScope();
    if (!scope) return null;
    let id = null;
    for (const sel of ['ytd-video-owner-renderer a.yt-simple-endpoint', '#channel-name a']) {
      const a = scope.querySelector(sel);
      id = a ? parseYtChannelHref(a.getAttribute('href') || a.href || '') : null;
      if (id) break;
    }
    if (!id) {
      const meta = scope.querySelector('meta[itemprop="channelId"]');
      const c = meta ? String(meta.getAttribute('content') || '').trim() : '';
      if (c) id = c;
    }
    if (!id) return null;
    const nameEl = scope.querySelector('ytd-channel-name #text a');
    let icon = firstSrc(scope, ['ytd-video-owner-renderer #avatar img', 'ytd-video-owner-renderer #img', '#owner #avatar img',
      '#owner #img', '#channel-name #avatar img', '#channel-name #img']);
    if (!icon) {
      const link = document.querySelector('link[rel="image_src"]');
      const meta = document.querySelector('meta[property="og:image"]');
      icon = (link && link.getAttribute('href')) || (meta && meta.getAttribute('content')) || '';
    }
    return { id, name: nameEl ? nameEl.textContent.trim() : '', iconUrl: icon };
  }

  function normalizeBiliUrl(v) {
    if (!v) return '';
    if (/^https?:\/\//i.test(v)) return v;
    if (v.startsWith('//')) return 'https:' + v;
    return '';
  }

  function getBilibiliChannel() {
    const box = document.querySelector('.up-info-container');
    if (!box) return null;
    const a = box.querySelector('a.up-avatar, a.up-name');
    if (!a) return null;
    let id = null;
    const attr = a.getAttribute('biliscope-userid');
    if (attr) id = 'bilibili_' + attr;
    else {
      const m = (a.getAttribute('href') || a.href || '').match(/space\.bilibili\.com\/(\d+)/);
      if (m) id = 'bilibili_' + m[1];
    }
    if (!id) return null;
    const nameEl = box.querySelector('a.up-name');
    let icon = '';
    for (const sel of ['.bili-avatar-img', '.up-avatar img', 'img[alt][src*="hdslb.com"]', 'img[data-src]', '.up-avatar-wrap img']) {
      const img = box.querySelector(sel);
      if (!img) continue;
      icon = normalizeBiliUrl(img.getAttribute('src')) || normalizeBiliUrl(img.getAttribute('data-src'));
      if (icon) break;
    }
    if (!icon) {
      const link = document.querySelector('link[rel="Shortcut Icon"], link[rel="icon"]');
      icon = (link && link.getAttribute('href')) || '';
    }
    return { id, name: nameEl ? nameEl.textContent.trim() : '', iconUrl: icon };
  }

  function getCurrentChannel(platform) {
    if (platform !== PLATFORM) return null;
    try {
      if (platform === 'youtube') return getYouTubeChannel();
      if (platform === 'bilibili') return getBilibiliChannel();
    } catch (err) {
      console.error('[EVSB] channel detection failed', err);
    }
    return null;
  }

  // ---------------------------------------------------------------------------
  // Primary video and anchor lookup
  // ---------------------------------------------------------------------------

  const isRendered = (el) => !!el && el.isConnected && el.getClientRects().length > 0;

  function visibleWatchFlexy() {
    for (const f of document.querySelectorAll('ytd-watch-flexy')) {
      if (!f.hasAttribute('hidden')) return f;
    }
    return null;
  }

  function videoArea(v) {
    if (!v.isConnected) return 0;
    const r = v.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return 0;
    const cs = getComputedStyle(v);
    if (cs.visibility === 'hidden' || cs.display === 'none') return 0;
    return r.width * r.height;
  }

  function findPrimaryVideo() {
    if (PLATFORM === 'youtube') {
      // Only the watch page has a primary video; home previews, Shorts, embeds etc. are left alone.
      if (location.pathname !== '/watch' || !new URLSearchParams(location.search).get('v')) return null;
      const flexy = visibleWatchFlexy();
      if (!flexy) return null;
      return flexy.querySelector('#movie_player video.html5-main-video') || flexy.querySelector('#movie_player video');
    }
    let best = null;
    let bestArea = 0;
    for (const v of document.querySelectorAll('video')) {
      const a = videoArea(v);
      if (a > bestArea) { best = v; bestArea = a; }
    }
    // Hysteresis: keep the bound video while it is still reasonably large, to avoid flapping.
    const cur = state.video;
    if (cur && best && cur !== best) {
      const ca = videoArea(cur);
      if (ca > 0 && ca >= bestArea * 0.5) return cur;
    }
    return best;
  }

  function findAnchor() {
    const sels = ANCHORS[PLATFORM] || [];
    const root = PLATFORM === 'youtube' ? visibleWatchFlexy() : document;
    if (!root) return null;
    for (const sel of sels) {
      for (const el of root.querySelectorAll(sel)) {
        if (isRendered(el)) return el;
      }
    }
    return null;
  }

  // ---------------------------------------------------------------------------
  // DOM helpers (no HTML strings anywhere: Trusted Types safe)
  // ---------------------------------------------------------------------------

  const PROP_KEYS = new Set(['value', 'checked', 'type', 'step', 'min', 'placeholder', 'title', 'name', 'accept',
    'disabled', 'htmlFor', 'src', 'referrerPolicy', 'target', 'rel']);

  function h(tag, props, ...children) {
    const el = document.createElement(tag);
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        if (v == null || v === false) continue;
        if (k === 'class') el.className = v;
        else if (k === 'text') el.textContent = v;
        else if (k === 'style') el.style.cssText = v;
        else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
        else if (PROP_KEYS.has(k)) el[k] = v;
        else el.setAttribute(k, v === true ? '' : String(v));
      }
    }
    appendChildren(el, children);
    return el;
  }

  function appendChildren(el, children) {
    for (const c of children.flat(Infinity)) {
      if (c == null || c === false) continue;
      el.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
    }
  }

  function svg(shapes, size = 18) {
    const root = document.createElementNS(SVG_NS, 'svg');
    root.setAttribute('viewBox', '0 0 24 24');
    root.setAttribute('width', String(size));
    root.setAttribute('height', String(size));
    root.setAttribute('aria-hidden', 'true');
    root.setAttribute('focusable', 'false');
    for (const [tag, attrs] of shapes) {
      const e = document.createElementNS(SVG_NS, tag);
      for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
      root.appendChild(e);
    }
    return root;
  }

  const STROKE = { fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  const ICONS = {
    speeds: () => svg([['path', { ...STROKE, d: 'M3.34 19a10 10 0 1 1 17.32 0' }], ['path', { ...STROKE, d: 'M12 14l4-4' }]]),
    history: () => svg([['circle', { ...STROKE, cx: 12, cy: 12, r: 9 }], ['path', { ...STROKE, d: 'M12 7v5l3 3' }]]),
    channels: () => svg([['rect', { ...STROKE, x: 2, y: 7, width: 20, height: 14, rx: 2 }], ['path', { ...STROKE, d: 'M17 2l-5 5-5-5' }]]),
    settings: () => svg([['circle', { ...STROKE, cx: 12, cy: 12, r: 4 }],
      ['path', { ...STROKE, d: 'M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1' }]]),
    youtube: (s) => svg([['rect', { x: 1, y: 4, width: 22, height: 16, rx: 5, fill: '#ff0000' }],
      ['path', { d: 'M10 8.5v7l6-3.5z', fill: '#ffffff' }]], s),
    bilibili: (s) => svg([['rect', { x: 1.5, y: 5.5, width: 21, height: 16, rx: 4, fill: '#00a1d6' }],
      ['path', { d: 'M7 1.8l3 3.7M17 1.8l-3 3.7', fill: 'none', stroke: '#00a1d6', 'stroke-width': 2, 'stroke-linecap': 'round' }],
      ['path', { d: 'M8 11.5v2.5M16 11.5v2.5', fill: 'none', stroke: '#ffffff', 'stroke-width': 2, 'stroke-linecap': 'round' }]], s),
  };

  const isSafeHttpUrl = (u) => typeof u === 'string' && /^https?:\/\//i.test(u);
  const isValidIconUrl = (u) => u === '' || /^(https?|data):/i.test(u);

  // ---------------------------------------------------------------------------
  // Controller state (single instance)
  // ---------------------------------------------------------------------------

  const state = {
    video: null,
    identifier: null,
    target: 1,            // the speed the script currently stands behind
    source: 'default',    // 'history' | 'channel' | 'default'
    manual: false,        // user picked a speed (button/shortcut) for the current video
    userChose: false,     // user changed speed via the platform menu (accepted outside the guard window)
    channelId: null,      // channel id the current decision has seen
    channelUntil: 0,
    channelTimer: 0,
    guardUntil: 0,
    reapplyCount: 0,
    expected: [],         // rates the script set and whose ratechange has not arrived yet
    noAnchorSince: 0,
    floatTimer: 0,
    freshLoad: true,      // between a new media source and its first playback
  };

  // ---------------------------------------------------------------------------
  // Applying rates and guarding them
  // ---------------------------------------------------------------------------

  function setRate(rate) {
    const v = state.video;
    if (!v) return;
    if (Math.abs(v.playbackRate - rate) < EPS) return;
    state.expected.push(rate);
    if (state.expected.length > 8) state.expected.shift();
    try { v.playbackRate = rate; } catch (err) { console.error('[EVSB] cannot set playbackRate', err); }
  }

  function openGuard() {
    state.guardUntil = Date.now() + GUARD_MS;
    state.reapplyCount = 0;
  }

  function dispatchSpeed(speed, isManual, identifier) {
    try {
      document.dispatchEvent(new CustomEvent('videoSpeedChanged', {
        detail: { speed, platform: PLATFORM, identifier: identifier || state.identifier || getIdentifier(), isManual },
      }));
    } catch (_) { /* ignore */ }
  }

  function applyAuto(speed, source) {
    if (!state.video || !isPositive(speed)) return;
    state.target = speed;
    state.source = source;
    openGuard();
    setRate(speed);
    updateHighlight();
    dispatchSpeed(speed, false);
  }

  function applyManual(speed) {
    if (!state.video || !isPositive(speed)) return;
    state.manual = true;
    stopChannelWait();
    state.target = speed;
    openGuard();
    setRate(speed);
    saveHistory(PLATFORM, getIdentifier(), speed);
    updateHighlight();
    dispatchSpeed(speed, true);
  }

  function onRateChange() {
    const v = state.video;
    if (!v) return;
    const r = v.playbackRate;
    const idx = state.expected.findIndex((x) => Math.abs(x - r) < EPS);
    if (idx !== -1) { state.expected.splice(0, idx + 1); return; }
    if (Math.abs(r - state.target) < EPS) return;
    if (Date.now() < state.guardUntil && state.reapplyCount < 20) {
      state.reapplyCount++;
      setRate(state.target);
      return;
    }
    // Outside the guard window: the user changed speed with the platform's own menu.
    state.target = r;
    state.expected = [];
    state.userChose = true;
    stopChannelWait();
    updateHighlight();
    dispatchSpeed(r, false);
  }

  // canplay/loadeddata/playing also follow seeks and resumes; only treat them as "media just loaded"
  // until the first playback after a new source, so they don't swallow the user's own menu changes.
  function onMediaEvent(e) {
    if (e.type === 'loadstart' || e.type === 'emptied') state.freshLoad = true;
    else if (!state.freshLoad && (e.type === 'canplay' || e.type === 'loadeddata' || e.type === 'playing')) return;
    if (e.type === 'playing') state.freshLoad = false;
    openGuard();
    if (state.video && Math.abs(state.video.playbackRate - state.target) >= EPS) setRate(state.target);
    if (e.type === 'loadstart' || e.type === 'emptied') scheduleTick(50);
  }

  function bindVideo(v) {
    const old = state.video;
    if (old) {
      old.removeEventListener('ratechange', onRateChange);
      for (const ev of MEDIA_EVENTS) old.removeEventListener(ev, onMediaEvent);
    }
    state.video = v;
    state.expected = [];
    if (v) {
      v.addEventListener('ratechange', onRateChange);
      for (const ev of MEDIA_EVENTS) v.addEventListener(ev, onMediaEvent);
    }
  }

  // ---------------------------------------------------------------------------
  // Speed decision (§8)
  // ---------------------------------------------------------------------------

  function decide() {
    if (!state.video) return;
    stopChannelWait();
    state.identifier = getIdentifier();
    state.manual = false;
    state.userChose = false;
    state.channelId = null;
    const rec = findHistory(PLATFORM, state.identifier);
    if (rec) {
      applyAuto(Number(rec.speed), 'history');
      return;
    }
    applyAuto(1, 'default');
    if (PLATFORM === 'youtube' || PLATFORM === 'bilibili') startChannelWait();
  }

  function startChannelWait() {
    state.channelUntil = Date.now() + CHANNEL_WAIT_MS;
    const step = () => {
      state.channelTimer = 0;
      checkChannel();
      if (Date.now() < state.channelUntil && !state.manual && !state.userChose) state.channelTimer = setTimeout(step, 400);
    };
    step();
  }

  function stopChannelWait() {
    if (state.channelTimer) clearTimeout(state.channelTimer);
    state.channelTimer = 0;
    state.channelUntil = 0;
  }

  /** Applies the channel default once the current video's channel is known; re-runs if the channel changes later. */
  function checkChannel() {
    if (!state.video || state.source === 'history' || state.manual || state.userChose) return;
    if (PLATFORM !== 'youtube' && PLATFORM !== 'bilibili') return;
    if (state.identifier !== getIdentifier()) return;
    const ch = getCurrentChannel(PLATFORM);
    if (!ch || !ch.id || ch.id === state.channelId) return;
    const hadChannelSpeed = state.source === 'channel';
    state.channelId = ch.id;
    const rec = getChannelRecord(PLATFORM, ch.id);
    if (rec && isPositive(Number(rec.speed))) applyAuto(Number(rec.speed), 'channel');
    else if (hadChannelSpeed) applyAuto(1, 'default');
  }

  /** Re-run the decision after channel speeds / history changed (§8 last bullet). */
  function redecide() {
    if (state.video) decide();
  }

  // ---------------------------------------------------------------------------
  // Speed bar
  // ---------------------------------------------------------------------------

  const bar = document.createElement('div');
  bar.className = 'vsb-container evsb-bar';
  let floating = null;

  function renderBar() {
    const speeds = sortSpeeds(getSpeeds(), getOrder());
    bar.replaceChildren();
    const labels = h('span', { class: 'evsb-labels' },
      h('span', { class: 'evsb-label evsb-label-link', text: 'Video', role: 'button', 'data-evsb-open': 'history' }),
      h('span', { class: 'evsb-label evsb-label-link', text: 'Speed', role: 'button', 'data-evsb-open': 'speeds' }),
      h('span', { class: 'evsb-label', text: ': ' }));
    bar.appendChild(labels);
    for (const [label, speed] of speeds) {
      bar.appendChild(h('span', { class: 'speed-button', text: label, role: 'button', 'data-speed': String(speed) }));
    }
    updateHighlight();
  }

  function updateHighlight() {
    for (const b of bar.querySelectorAll('.speed-button')) {
      const on = Math.abs(Number(b.dataset.speed) - state.target) < EPS;
      b.classList.toggle('evsb-active', on);
    }
  }

  bar.addEventListener('click', (e) => {
    const target = e.target && e.target.nodeType === 1 ? e.target : null;
    if (!target) return;
    const open = target.closest('[data-evsb-open]');
    if (open && bar.contains(open)) { openWindow(open.getAttribute('data-evsb-open')); return; }
    const btn = target.closest('.speed-button');
    if (btn && bar.contains(btn)) applyManual(Number(btn.dataset.speed));
    const help = target.closest('.evsb-help');
    if (help && bar.contains(help)) help.remove();
  });

  function showHelp() {
    if (bar.querySelector('.evsb-help')) return;
    const text = [
      'Keyboard Controls (click to close)',
      '[ - _ — ]  Speed Down',
      '[ + = ]      Speed Up',
      '[ * ]        Reset Speed',
      '[ ? ]        Show Help',
    ].join('\n');
    bar.appendChild(h('pre', { class: 'evsb-help', text }));
  }

  function removeFloating() {
    if (floating) { floating.remove(); floating = null; }
  }

  function placeBar() {
    const anchor = findAnchor();
    if (anchor) {
      state.noAnchorSince = 0;
      if (bar.parentNode !== anchor) anchor.insertBefore(bar, anchor.firstChild);
      removeFloating();
      return;
    }
    // Wait briefly before falling back to the floating panel: anchors often render after the video.
    const now = Date.now();
    if (!state.noAnchorSince) {
      state.noAnchorSince = now;
      if (state.floatTimer) clearTimeout(state.floatTimer);
      state.floatTimer = setTimeout(() => { state.floatTimer = 0; scheduleTick(0); }, FLOAT_DELAY_MS + 50);
      return;
    }
    if (now - state.noAnchorSince < FLOAT_DELAY_MS) return;
    if (!floating) floating = h('div', { id: 'evsb-floating' });
    if (!floating.isConnected) document.body.appendChild(floating);
    if (bar.parentNode !== floating) floating.appendChild(bar);
  }

  function detachBar() {
    bar.remove();
    removeFloating();
    state.noAnchorSince = 0;
    if (state.floatTimer) { clearTimeout(state.floatTimer); state.floatTimer = 0; }
  }

  // ---------------------------------------------------------------------------
  // Main loop: event / throttled-observer driven, never interval driven
  // ---------------------------------------------------------------------------

  let tickTimer = 0;

  function scheduleTick(delay = 200) {
    if (tickTimer) return;
    tickTimer = setTimeout(() => { tickTimer = 0; tick(); }, delay);
  }

  function tick() {
    try {
      if (document.body && document.body.classList.contains('evsb-modal-open') && !document.getElementById('customSpeedWindow')) {
        document.body.classList.remove('evsb-modal-open');
      }
      const video = findPrimaryVideo();
      if (!video) {
        if (state.video) { bindVideo(null); stopChannelWait(); state.identifier = null; }
        detachBar();
        return;
      }
      if (video !== state.video) {
        bindVideo(video);
        decide();
      } else if (state.identifier !== getIdentifier()) {
        decide();
      }
      placeBar();
      checkChannel();
    } catch (err) {
      console.error('[EVSB] tick failed', err);
    }
  }

  // ---------------------------------------------------------------------------
  // Keyboard shortcuts (§6)
  // ---------------------------------------------------------------------------

  function isEditable(node) {
    if (!node || node.nodeType !== 1) return false;
    const tag = node.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || node.isContentEditable === true;
  }

  function typingInEditable(e) {
    const path = typeof e.composedPath === 'function' ? e.composedPath() : [e.target];
    if (path.some(isEditable)) return true;
    let a = document.activeElement;
    while (a && a.shadowRoot && a.shadowRoot.activeElement) a = a.shadowRoot.activeElement;
    return isEditable(a);
  }

  function onKeyDown(e) {
    if (e.ctrlKey || e.altKey || e.metaKey || e.isComposing) return;
    const key = e.key;
    if (!['-', '_', '—', '+', '=', '*', '?'].includes(key)) return;
    if (!state.video || typingInEditable(e)) return;
    if (key === '?') { showHelp(); return; }
    const speeds = getSpeeds();
    const values = [...new Set(speeds.map((s) => s[1]))].sort((a, b) => a - b);
    const cur = state.target;
    let next = null;
    if (key === '-' || key === '_' || key === '—') {
      const lower = values.filter((s) => s < cur - EPS);
      if (lower.length) next = lower[lower.length - 1];
    } else if (key === '+' || key === '=') {
      next = values.find((s) => s > cur + EPS);
      if (next === undefined) next = null;
    } else if (key === '*') {
      const one = speeds.find((s) => Math.abs(s[1] - 1) < EPS);
      next = one ? one[1] : sortSpeeds(speeds, getOrder())[0][1];
    }
    if (next != null) applyManual(next);
  }

  // ---------------------------------------------------------------------------
  // Toast
  // ---------------------------------------------------------------------------

  let toastTimers = [];

  function toast(message) {
    const old = document.getElementById('evsb-toast');
    if (old) old.remove();
    toastTimers.forEach(clearTimeout);
    toastTimers = [];
    const el = h('div', { id: 'evsb-toast', role: 'status', 'aria-live': 'polite', text: message });
    (document.body || document.documentElement).appendChild(el);
    requestAnimationFrame(() => el.classList.add('evsb-show'));
    toastTimers.push(setTimeout(() => el.classList.remove('evsb-show'), 2000));
    toastTimers.push(setTimeout(() => el.remove(), 2400));
  }

  // ---------------------------------------------------------------------------
  // Settings window
  // ---------------------------------------------------------------------------

  let win = null;

  function closeWindow() {
    try {
      const existing = document.getElementById('customSpeedWindow');
      if (existing) existing.remove();
    } finally {
      win = null;
      if (document.body) document.body.classList.remove('evsb-modal-open');
    }
  }

  function openWindow(tab = 'speeds', opts = {}) {
    if (tab === 'sync') tab = 'settings';
    if (!['speeds', 'history', 'channels', 'settings'].includes(tab)) tab = 'speeds';
    closeWindow();
    try {
      const root = h('div', { id: 'customSpeedWindow', role: 'dialog', 'aria-modal': 'true' });
      const overlay = h('div', { class: 'evsb-overlay', onclick: closeWindow });
      const card = h('div', { class: 'evsb-card' });
      const tabsBar = h('div', { class: 'evsb-tabs', role: 'tablist' });
      const content = h('div', { class: 'evsb-content' });
      card.append(
        h('button', { class: 'evsb-close', type: 'button', text: '×', title: t('close'), 'aria-label': t('close'), onclick: closeWindow }),
        h('h2', { class: 'evsb-title', text: t('title') }),
        tabsBar,
        content);
      root.append(overlay, card);

      win = {
        root, card, content, tabsBar, tab,
        draft: sortSpeeds(getSpeeds(), getOrder()),
        order: getOrder(),
        histPlat: ['youtube', 'bilibili', 'vimeo'].includes(PLATFORM) ? PLATFORM : 'youtube',
        chanPlat: PLATFORM === 'bilibili' ? 'bilibili' : 'youtube',
        refresh: null,
      };

      const tabDefs = [['speeds', t('speeds')], ['history', t('history')], ['channels', t('channelSpeeds')], ['settings', t('settings')]];
      for (const [id, label] of tabDefs) {
        tabsBar.appendChild(h('button', {
          class: 'evsb-tab', type: 'button', role: 'tab', 'data-tab': id,
          onclick: () => showTab(id),
        }, ICONS[id](), h('span', { text: label })));
      }

      document.body.appendChild(root);
      document.body.classList.add('evsb-modal-open');
      showTab(tab);
      if (opts.scroll) card.scrollTop = opts.scroll;
    } catch (err) {
      console.error('[EVSB] settings window failed', err);
      closeWindow();
      toast(t('errorInitializing'));
    }
  }

  function showTab(tab) {
    if (!win) return;
    win.tab = tab;
    win.refresh = null;
    for (const b of win.tabsBar.querySelectorAll('.evsb-tab')) {
      const on = b.getAttribute('data-tab') === tab;
      b.classList.toggle('evsb-selected', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    }
    win.content.replaceChildren();
    try {
      if (tab === 'speeds') renderSpeedsTab();
      else if (tab === 'history') renderHistoryTab();
      else if (tab === 'channels') renderChannelsTab();
      else renderSettingsTab();
    } catch (err) {
      console.error('[EVSB] tab render failed', err);
      win.content.replaceChildren(h('p', { class: 'evsb-error', text: t('errorUpdatingList') }),
        h('button', { class: 'evsb-btn', type: 'button', text: t('retryButton'), onclick: () => showTab(tab) }));
    }
  }

  function subTabs(platforms, selected, onSelect) {
    const wrap = h('div', { class: 'evsb-subtabs' });
    for (const p of platforms) {
      const label = p === 'vimeo' ? 'Vimeo' : t(p);
      const b = h('button', { class: 'evsb-subtab' + (p === selected ? ' evsb-selected' : ''), type: 'button', text: label,
        onclick: () => onSelect(p) });
      b.style.setProperty('--evsb-plat', PLATFORM_COLORS[p]);
      wrap.appendChild(b);
    }
    return wrap;
  }

  // ----- Speeds tab -----

  function renderSpeedsTab() {
    const c = win.content;
    const list = h('div', { class: 'evsb-speed-list' });

    const renderList = () => {
      list.replaceChildren();
      win.draft.forEach(([label, speed], i) => {
        list.appendChild(h('div', { class: 'evsb-speed-row' },
          h('span', { class: 'evsb-ellipsis', text: label, title: label }),
          h('span', { text: String(speed) }),
          h('button', { class: 'evsb-icon-btn', type: 'button', text: '🗑️', title: t('delete'), 'aria-label': t('delete'),
            onclick: () => {
              if (win.draft.length <= 1) { toast(t('invalidInput')); return; }
              win.draft.splice(i, 1);
              renderList();
            } })));
      });
    };

    const labelInput = h('input', { class: 'evsb-input', type: 'text', placeholder: t('label') });
    const speedInput = h('input', { class: 'evsb-input', type: 'number', step: '0.01', min: '0', placeholder: t('speed') });
    const addBtn = h('button', { class: 'evsb-btn evsb-primary', type: 'button', text: t('add'), onclick: () => {
      const sp = parseFloat(speedInput.value);
      if (!isPositive(sp)) { toast(t('invalidInput')); return; }
      const label = labelInput.value.trim() || `${sp}x`;
      const existing = win.draft.find((d) => Math.abs(d[1] - sp) < EPS);
      if (existing) { existing[0] = label; toast(t('speedExists')); } else { win.draft.push([label, sp]); toast(t('settingsSaved')); }
      win.draft = sortSpeeds(win.draft, win.order);
      labelInput.value = '';
      speedInput.value = '';
      renderList();
    } });

    const orderSelect = h('select', { class: 'evsb-input', onchange: () => {
      win.order = orderSelect.value === 'asc' ? 'asc' : 'desc';
      win.draft = sortSpeeds(win.draft, win.order);
      renderList();
    } }, h('option', { value: 'asc', text: t('ascending') }), h('option', { value: 'desc', text: t('descending') }));
    orderSelect.value = win.order;

    c.append(
      h('div', { class: 'evsb-speed-row evsb-header' },
        h('span', { text: t('label') }), h('span', { text: t('speed') }), h('span', { text: t('delete') })),
      list,
      h('div', { class: 'evsb-add-row' }, labelInput, speedInput, addBtn),
      h('label', { class: 'evsb-order-row' }, h('span', { text: t('buttonOrder') }), orderSelect),
      h('div', { class: 'evsb-actions' },
        h('button', { class: 'evsb-btn', type: 'button', text: t('reset'), onclick: () => {
          win.order = 'desc';
          orderSelect.value = 'desc';
          win.draft = sortSpeeds(clone(DEFAULT_SPEEDS), 'desc');
          renderList();
          toast(t('settingsSaved'));
        } }),
        h('button', { class: 'evsb-btn evsb-danger', type: 'button', text: t('cancel'), onclick: closeWindow }),
        h('button', { class: 'evsb-btn evsb-primary', type: 'button', text: t('confirm'), onclick: () => {
          if (!isValidSpeedList(win.draft)) { toast(t('invalidInput')); return; }
          setValue(KEY_SPEEDS, normalizeSpeeds(win.draft));
          setValue(KEY_ORDER, win.order);
          toast(t('settingsSaved'));
          closeWindow();
          renderBar();
        } })));
    renderList();
  }

  // ----- History tab -----

  function renderHistoryTab() {
    const c = win.content;
    const subWrap = h('div');
    const list = h('div', { class: 'evsb-history-list' });

    const renderList = () => {
      if (!win) return;
      subWrap.replaceChildren(subTabs(['youtube', 'bilibili', 'vimeo'], win.histPlat, (p) => { win.histPlat = p; renderList(); }));
      list.replaceChildren();
      const records = readHistoryAll()[win.histPlat];
      const items = Array.isArray(records) ? records.filter((r) => r && typeof r === 'object') : [];
      if (!items.length) { list.appendChild(h('p', { class: 'evsb-empty', text: t('noHistory') })); return; }
      const curId = getIdentifier();
      const plat = win.histPlat;
      for (const rec of items) {
        const title = String(rec.title || rec.identifier || '');
        const link = h('a', { class: 'evsb-history-title evsb-ellipsis', text: title, title, target: '_blank', rel: 'noopener noreferrer' });
        if (isSafeHttpUrl(rec.url)) link.href = rec.url;
        list.appendChild(h('div', { class: 'evsb-history-item' + (plat === PLATFORM && rec.identifier === curId ? ' current-video' : '') },
          link,
          h('span', { class: 'evsb-history-speed', text: `${rec.speed}x` }),
          h('button', { class: 'evsb-icon-btn', type: 'button', text: '🗑️', title: t('delete'), 'aria-label': t('delete'),
            onclick: () => {
              const removed = deleteHistory(plat, rec.identifier);
              renderList();
              if (removed) {
                dispatchSpeed(null, false, rec.identifier);
                if (plat === PLATFORM && rec.identifier === getIdentifier()) redecide();
              }
            } })));
      }
    };
    win.refresh = renderList;

    c.append(subWrap, list,
      h('div', { class: 'evsb-actions' },
        h('button', { class: 'evsb-btn evsb-danger', type: 'button', text: t('clear'), onclick: () => {
          if (!confirm(t('confirmReset'))) return;
          const hadCurrent = !!findHistory(PLATFORM, getIdentifier());
          setValue(KEY_HISTORY, {});
          toast(t('historyCleared'));
          renderList();
          dispatchSpeed(null, false);
          if (hadCurrent) redecide();
        } })));
    renderList();
  }

  // ----- Channels tab -----

  function stripChannelPrefix(platform, id) {
    return platform === 'youtube' ? id.replace(/^@/, '') : id.replace(/^bilibili_/, '');
  }

  function channelIcon(platform, url, size = 28) {
    if (url && isValidIconUrl(url)) {
      const img = h('img', { class: 'evsb-avatar', src: url, alt: '', referrerPolicy: 'no-referrer' });
      img.style.width = img.style.height = size + 'px';
      img.addEventListener('error', () => img.replaceWith(ICONS[platform](size)), { once: true });
      return img;
    }
    return ICONS[platform](size);
  }

  function renderChannelsTab() {
    const c = win.content;
    const subWrap = h('div');
    const list = h('div', { class: 'evsb-channel-list' });

    const renderList = () => {
      if (!win) return;
      subWrap.replaceChildren(subTabs(['youtube', 'bilibili'], win.chanPlat, (p) => { win.chanPlat = p; renderList(); }));
      list.replaceChildren();
      const plat = win.chanPlat;
      const entries = Object.entries(readChannelsAll()[plat] || {}).filter(([, r]) => isPlainObject(r));
      if (!entries.length) { list.appendChild(h('p', { class: 'evsb-empty', text: t('noChannelSpeeds') })); return; }
      for (const [id, rec] of entries) {
        const name = String(rec.name || '') || stripChannelPrefix(plat, id);
        const remark = String(rec.remark || '');
        list.appendChild(h('div', { class: 'evsb-channel-row' },
          h('span', { class: 'evsb-channel-icon' }, channelIcon(plat, rec.iconUrl)),
          h('span', { class: 'evsb-ellipsis', text: name, title: name }),
          h('span', { class: 'evsb-ellipsis', text: remark, title: remark }),
          h('span', { text: `${rec.speed}x` }),
          h('button', { class: 'evsb-icon-btn', type: 'button', text: '✍️', title: t('edit'), 'aria-label': t('edit'),
            onclick: () => {
              const detected = getCurrentChannel(plat);
              openChannelForm(plat, id, 'edit', detected && detected.id === id ? detected : null, renderList);
            } }),
          h('button', { class: 'evsb-icon-btn', type: 'button', text: '🗑️', title: t('delete'), 'aria-label': t('delete'),
            onclick: () => {
              if (!confirm(t('confirmRemoveChannelSpeed'))) return;
              const all = readChannelsAll();
              if (isPlainObject(all[plat])) { delete all[plat][id]; setValue(KEY_CHANNELS, all); }
              toast(t('channelSpeedDeleted'));
              renderList();
              redecide();
            } })));
      }
    };
    win.refresh = renderList;

    c.append(subWrap,
      h('div', { class: 'evsb-channel-row evsb-header' },
        h('span', { text: t('channelIconLabel') }), h('span', { text: t('channelNameHeader') }),
        h('span', { text: t('channelRemarkHeader') }), h('span', { text: t('channelSpeedHeader') }),
        h('span', { text: t('edit') }), h('span', { text: t('delete') })),
      list,
      h('div', { class: 'evsb-actions' },
        h('button', { class: 'evsb-btn evsb-primary', type: 'button', text: t('addChannelSpeed'), onclick: () => {
          const plat = win.chanPlat;
          const ch = getCurrentChannel(plat);
          if (!ch || !ch.id) { toast(t('noCurrentChannel')); return; }
          const mode = getChannelRecord(plat, ch.id) ? 'edit' : 'add';
          openChannelForm(plat, ch.id, mode, ch, renderList);
        } }),
        h('button', { class: 'evsb-btn evsb-danger', type: 'button', text: t('clear'), onclick: () => {
          if (!confirm(t('confirmReset'))) return;
          setValue(KEY_CHANNELS, {});
          toast(t('historyCleared'));
          renderList();
          redecide();
        } })));
    renderList();
  }

  function openChannelForm(platform, id, mode, detected, onSaved) {
    if (!win) return;
    const old = win.root.querySelector('.evsb-form-layer');
    if (old) old.remove();
    const rec = mode === 'edit' ? getChannelRecord(platform, id) : null;
    const channelName = rec ? String(rec.name || '') : (detected && detected.name) || '';
    const detectedIcon = detected && isValidIconUrl(detected.iconUrl || '') ? (detected.iconUrl || '') : '';
    const titleKey = (mode === 'edit' ? 'edit' : 'add') + (platform === 'youtube' ? 'YouTube' : 'Bilibili') + 'ChannelSpeed';

    const remarkInput = h('input', { class: 'evsb-input', type: 'text' });
    remarkInput.value = rec ? String(rec.remark || '') : channelName;
    const iconInput = h('input', { class: 'evsb-input', type: 'text', placeholder: t('iconUrlPlaceholder') });
    iconInput.value = rec ? (String(rec.iconUrl || '') || detectedIcon) : detectedIcon;
    const speedInput = h('input', { class: 'evsb-input', type: 'number', step: '0.01', min: '0' });
    speedInput.value = rec ? String(rec.speed) : '1';

    const previewBox = h('span', { class: 'evsb-preview-box' });
    const preview = h('div', { class: 'evsb-preview', 'aria-live': 'polite' }, h('span', { text: t('iconPreview') }), previewBox);
    const updatePreview = () => {
      const url = iconInput.value.trim();
      previewBox.replaceChildren();
      preview.classList.remove('evsb-invalid');
      if (!url) previewBox.appendChild(ICONS[platform](32));
      else if (isValidIconUrl(url)) previewBox.appendChild(channelIcon(platform, url, 32));
      else { preview.classList.add('evsb-invalid'); previewBox.appendChild(h('span', { text: t('invalidIconUrl') })); }
    };
    iconInput.addEventListener('input', updatePreview);
    updatePreview();

    const layer = h('div', { class: 'evsb-form-layer' });
    const close = () => layer.remove();
    const save = () => {
      const speed = parseFloat(speedInput.value);
      if (!isPositive(speed)) { toast(t('invalidInput')); return; }
      const iconUrl = iconInput.value.trim();
      if (!isValidIconUrl(iconUrl)) { toast(t('invalidIconUrl')); return; }
      const all = readChannelsAll();
      if (!isPlainObject(all[platform])) all[platform] = {};
      const name = mode === 'edit' && rec ? String(rec.name || '') : channelName;
      const remark = remarkInput.value.trim();
      all[platform][id] = { speed, name, remark: remark || name, iconUrl };
      setValue(KEY_CHANNELS, all);
      if (onSaved) onSaved();
      toast(t(mode === 'edit' ? 'channelSpeedUpdated' : 'channelSpeedSet'));
      close();
      redecide();
    };

    layer.append(h('div', { class: 'evsb-form-backdrop', onclick: close }),
      h('div', { class: 'evsb-form' },
        h('h3', { text: t(titleKey) }),
        h('p', { class: 'evsb-form-channel' }, `${t('currentChannel')}${colon()} `,
          h('strong', { text: channelName || stripChannelPrefix(platform, id) }), ` (${id})`),
        h('label', { class: 'evsb-field' }, h('span', { text: t('remark') }), remarkInput),
        h('label', { class: 'evsb-field' }, h('span', { text: t('iconUrl') }), iconInput),
        preview,
        h('label', { class: 'evsb-field' }, h('span', { text: t('speed') }), speedInput),
        h('div', { class: 'evsb-actions' },
          h('button', { class: 'evsb-btn evsb-danger', type: 'button', text: t('cancelEdit'), onclick: close }),
          h('button', { class: 'evsb-btn evsb-primary', type: 'button', text: t('save'), onclick: save }))));
    win.root.appendChild(layer);
  }

  // ----- Settings tab -----

  function renderSettingsTab() {
    const c = win.content;
    const pref = getLangPref();
    const langBox = h('div', { class: 'evsb-lang-options', role: 'radiogroup' });
    for (const [val, labelKey, hintKey] of [['auto', 'languageAuto', 'languageAutoHint'], ['zh', 'languageZh', 'languageZhHint'],
      ['en', 'languageEn', 'languageEnHint']]) {
      const radio = h('input', { type: 'radio', name: 'evsb-lang', value: val, checked: pref === val, onchange: () => {
        if (!radio.checked) return;
        setValue(KEY_LANG, val);
        const tab = win ? win.tab : 'settings';
        const scroll = win ? win.card.scrollTop : 0;
        openWindow(tab, { scroll });
        toast(t('settingsSaved'));
      } });
      langBox.appendChild(h('label', { class: 'evsb-lang-option' }, radio,
        h('span', { class: 'evsb-lang-text' }, h('strong', { text: t(labelKey) }), h('small', { text: t(hintKey) }))));
    }

    const card = (icon, title, sub, onclick) => h('button', { class: 'evsb-sync-card', type: 'button', onclick },
      h('span', { class: 'evsb-sync-icon', text: icon }),
      h('span', { class: 'evsb-sync-text' }, h('strong', { text: title }), h('small', { text: sub })));

    c.append(
      h('section', { class: 'evsb-section' },
        h('h3', { text: t('uiLanguage') }), h('p', { class: 'evsb-muted', text: t('languageDescription') }), langBox),
      h('section', { class: 'evsb-section' },
        h('h3', { text: t('syncSettings') }),
        h('div', { class: 'evsb-sync-cards' },
          card('📤', t('exportSettings'), t('export'), () => { exportSettings(); }),
          card('📥', t('importSettings'), t('import'), importSettings)),
        PLATFORM === 'bilibili' ? h('div', { class: 'evsb-info' }, h('span', { text: 'ℹ️' }), h('span', { text: t('infoSyncBilibili') })) : null));
  }

  // ----- Export / import -----

  const pad2 = (n) => String(n).padStart(2, '0');

  function isIOSLike() {
    const ua = navigator.userAgent || '';
    return /iPad|iPhone|iPod/.test(ua) || (/Mac/.test(ua) && navigator.maxTouchPoints > 1) || ua.includes('Orion/');
  }

  function downloadFile(json, filename) {
    const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    const a = h('a', { href: url, download: filename, style: 'display:none' });
    a.href = url;
    (win ? win.root : document.body).appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  async function exportSettings() {
    try {
      const raw = getValue(KEY_SPEEDS, []);
      const speeds = Array.isArray(raw)
        ? raw.map((it) => (Array.isArray(it) && isPositive(Number(it[1])) ? [String(it[0]), Number(it[1])] : ['1x', 1]))
        : [];
      const channels = readChannelsAll();
      const hasChannels = Object.values(channels).some((p) => isPlainObject(p) && Object.keys(p).length > 0);
      if (!speeds.length && !hasChannels) { toast(t('noSettingsFound')); return; }
      const order = getValue(KEY_ORDER, 'desc');
      const data = {
        version: EXPORT_VERSION,
        timestamp: new Date().toISOString(),
        settings: {
          customSpeeds: speeds,
          buttonOrder: order === 'asc' || order === 'desc' ? order : 'desc',
          history: readHistoryAll(),
          channelDefaultSpeeds: channels,
        },
      };
      const json = JSON.stringify(data, null, 2);
      const d = new Date();
      const filename = `Enhanced Video Speed Buttons「${d.getFullYear()} ${pad2(d.getMonth() + 1)} ${pad2(d.getDate())}」` +
        `「${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}」.json`;

      if (isIOSLike()) {
        try {
          if (typeof navigator.share === 'function' && typeof File === 'function' && typeof navigator.canShare === 'function') {
            const file = new File([json], filename, { type: 'application/json' });
            if (navigator.canShare({ files: [file] })) {
              await navigator.share({ files: [file], title: 'Enhanced Video Speed Buttons', text: t('exportSettings') });
              toast(t('exportSuccess'));
              return;
            }
          }
        } catch (err) {
          if (err && (err.name === 'AbortError' || err.name === 'NotAllowedError')) return;
        }
        try {
          const opened = window.open('data:application/json;charset=utf-8,' + encodeURIComponent(json), '_blank');
          if (opened) { toast(t('exportSuccess')); return; }
        } catch (_) { /* fall through to download */ }
      }
      downloadFile(json, filename);
      toast(t('exportSuccess'));
    } catch (err) {
      console.error('[EVSB] export failed', err);
    }
  }

  function validateImport(data) {
    if (!isPlainObject(data) || !isPlainObject(data.settings)) return null;
    const s = data.settings;
    if (s.customSpeeds !== undefined && !isValidSpeedList(s.customSpeeds)) return null;
    if (s.channelDefaultSpeeds !== undefined && !isValidChannelSpeeds(s.channelDefaultSpeeds)) return null;
    if (s.history !== undefined && !isPlainObject(s.history)) return null;
    const out = {};
    if (s.customSpeeds !== undefined) out.customSpeeds = normalizeSpeeds(s.customSpeeds);
    if (s.buttonOrder !== undefined) out.buttonOrder = s.buttonOrder === 'asc' || s.buttonOrder === 'desc' ? s.buttonOrder : 'desc';
    if (s.history !== undefined) out.history = s.history;
    if (s.channelDefaultSpeeds !== undefined) out.channelDefaultSpeeds = s.channelDefaultSpeeds;
    return out;
  }

  function importSettings() {
    const host = win ? win.root : document.body;
    const input = h('input', { type: 'file', accept: 'application/json', class: 'evsb-file-input', 'aria-hidden': 'true', tabindex: '-1' });
    const cleanup = () => { input.value = ''; input.remove(); };
    input.addEventListener('change', async () => {
      const file = input.files && input.files[0];
      if (!file) { cleanup(); return; }
      try {
        const text = await file.text();
        let parsed;
        try { parsed = JSON.parse(text); } catch (_) { parsed = null; }
        const s = validateImport(parsed);
        if (!s) { toast(t('importError')); return; }
        if (!confirm(t('confirmImportSettings'))) return;
        if (s.customSpeeds) setValue(KEY_SPEEDS, s.customSpeeds);
        if (s.buttonOrder) setValue(KEY_ORDER, s.buttonOrder);
        if (s.history) setValue(KEY_HISTORY, s.history);
        if (s.channelDefaultSpeeds) setValue(KEY_CHANNELS, s.channelDefaultSpeeds);
        toast(t('importSuccess'));
        renderBar();
        redecide();
        if (win) { win.draft = sortSpeeds(getSpeeds(), getOrder()); win.order = getOrder(); }
      } catch (err) {
        console.error('[EVSB] import failed', err);
        toast(t('importError'));
      } finally {
        cleanup();
      }
    }, { once: true });
    host.appendChild(input);
    try {
      if (typeof input.showPicker === 'function') input.showPicker();
      else input.click();
    } catch (_) {
      input.click();
    }
  }

  // ---------------------------------------------------------------------------
  // Styles (every selector is namespaced)
  // ---------------------------------------------------------------------------

  const CSS_TEXT = `
.evsb-bar.vsb-container { border-bottom: 1px solid #ccc; margin-bottom: 10px; padding-bottom: 10px; line-height: 1.6; }
.evsb-bar .evsb-label { font-weight: bold; font-size: 120%; color: grey; margin-right: 3px; }
.evsb-bar .evsb-label-link { cursor: pointer; }
.evsb-bar .evsb-label-link:hover { opacity: 0.8; }
.evsb-bar .speed-button { font-weight: bold; font-size: 120%; margin-right: 10px; cursor: pointer; color: grey; user-select: none; display: inline-block; }
.evsb-bar .speed-button.evsb-active { color: #FF5500; }
.evsb-bar .evsb-help { font: 1em monospace; border-top: 1px solid #ccc; margin: 10px 0 0; padding-top: 10px; cursor: pointer; white-space: pre; color: inherit; background: transparent; }
#evsb-floating { position: fixed; top: 0; right: 0; z-index: 100000; background: rgba(0,0,0,0.8); color: #eeeeee; padding: 10px; }
#evsb-floating .evsb-bar.vsb-container { border-bottom: none; margin: 0; padding: 0; }
body.evsb-modal-open { pointer-events: none !important; }

#customSpeedWindow, #evsb-toast {
  --evsb-bg: #ffffff; --evsb-fg: #333333; --evsb-border: #e0e0e0; --evsb-hover: #f5f5f5;
  --evsb-primary: #4CAF50; --evsb-danger: #f44336; --evsb-muted: #777777; --evsb-current: rgba(76,175,80,0.15);
}
@media (prefers-color-scheme: dark) {
  #customSpeedWindow, #evsb-toast {
    --evsb-bg: #333333; --evsb-fg: #ffffff; --evsb-border: #555555; --evsb-hover: #444444;
    --evsb-primary: #45a049; --evsb-danger: #d32f2f; --evsb-muted: #bbbbbb; --evsb-current: rgba(69,160,73,0.3);
  }
}
#customSpeedWindow { position: fixed; inset: 0; z-index: 2147483000; display: flex; align-items: center; justify-content: center;
  pointer-events: auto; font: 14px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif; }
#customSpeedWindow * { box-sizing: border-box; }
#customSpeedWindow .evsb-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); }
#customSpeedWindow .evsb-card { position: relative; z-index: 1; width: 90%; max-width: 500px; max-height: 90vh; overflow-y: auto;
  overscroll-behavior: contain; padding: 20px; border-radius: 8px; background: var(--evsb-bg); color: var(--evsb-fg);
  box-shadow: 0 8px 30px rgba(0,0,0,0.35); }
#customSpeedWindow .evsb-title { margin: 0 32px 14px 0; font-size: 20px; font-weight: bold; color: var(--evsb-fg); }
#customSpeedWindow .evsb-close { position: absolute; top: 10px; right: 12px; border: none; background: transparent; color: var(--evsb-fg);
  font-size: 24px; line-height: 1; cursor: pointer; padding: 4px 8px; border-radius: 4px; }
#customSpeedWindow .evsb-close:hover { background: var(--evsb-hover); }
#customSpeedWindow .evsb-tabs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 14px; }
#customSpeedWindow .evsb-tab { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 4px; font-size: 13px;
  border: 1px solid var(--evsb-border); border-radius: 6px; background: transparent; color: var(--evsb-fg); cursor: pointer; }
#customSpeedWindow .evsb-tab:hover { background: var(--evsb-hover); }
#customSpeedWindow .evsb-tab.evsb-selected { background: var(--evsb-primary); border-color: var(--evsb-primary); color: #fff; }
#customSpeedWindow .evsb-subtabs { display: flex; gap: 6px; margin-bottom: 10px; flex-wrap: wrap; }
#customSpeedWindow .evsb-subtab { padding: 5px 12px; border-radius: 14px; border: 1px solid var(--evsb-plat); color: var(--evsb-plat);
  background: transparent; cursor: pointer; font-size: 13px; }
#customSpeedWindow .evsb-subtab.evsb-selected { background: var(--evsb-plat); color: #fff; }
#customSpeedWindow .evsb-header { font-weight: bold; border-bottom: 1px solid var(--evsb-border); }
#customSpeedWindow .evsb-speed-row { display: grid; grid-template-columns: 2fr 1fr 64px; align-items: center; gap: 8px; padding: 6px 4px; }
#customSpeedWindow .evsb-speed-list .evsb-speed-row:hover, #customSpeedWindow .evsb-history-item:hover,
#customSpeedWindow .evsb-channel-list .evsb-channel-row:hover { background: var(--evsb-hover); }
#customSpeedWindow .evsb-ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
#customSpeedWindow .evsb-icon-btn { border: none; background: transparent; cursor: pointer; font-size: 16px; padding: 2px 6px; border-radius: 4px; }
#customSpeedWindow .evsb-icon-btn:hover { background: var(--evsb-border); }
#customSpeedWindow .evsb-input { padding: 6px 8px; border: 1px solid var(--evsb-border); border-radius: 4px; background: var(--evsb-bg);
  color: var(--evsb-fg); font-size: 14px; min-width: 0; }
#customSpeedWindow .evsb-add-row { display: grid; grid-template-columns: 2fr 1fr auto; gap: 8px; margin: 12px 0; }
#customSpeedWindow .evsb-order-row { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
#customSpeedWindow .evsb-actions { display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; margin-top: 12px; }
#customSpeedWindow .evsb-btn { padding: 7px 14px; border-radius: 4px; border: 1px solid var(--evsb-border); background: var(--evsb-bg);
  color: var(--evsb-fg); cursor: pointer; font-size: 14px; }
#customSpeedWindow .evsb-btn:hover { filter: brightness(0.95); }
#customSpeedWindow .evsb-primary { background: var(--evsb-primary); border-color: var(--evsb-primary); color: #fff; }
#customSpeedWindow .evsb-danger { background: var(--evsb-danger); border-color: var(--evsb-danger); color: #fff; }
#customSpeedWindow .evsb-history-list { max-height: 300px; overflow-y: auto; border: 1px solid var(--evsb-border); border-radius: 6px; }
#customSpeedWindow .evsb-history-item { display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 8px; padding: 6px 8px;
  border-bottom: 1px solid var(--evsb-border); }
#customSpeedWindow .evsb-history-item:last-child { border-bottom: none; }
#customSpeedWindow .evsb-history-item.current-video { background: var(--evsb-current); font-weight: bold; border-left: 3px solid var(--evsb-primary); }
#customSpeedWindow .evsb-history-title { color: inherit; text-decoration: none; }
#customSpeedWindow .evsb-history-title:hover { text-decoration: underline; }
#customSpeedWindow .evsb-empty { text-align: center; color: var(--evsb-muted); padding: 16px; margin: 0; }
#customSpeedWindow .evsb-channel-row { display: grid; grid-template-columns: 40px 1.4fr 1.2fr 56px 36px 36px; align-items: center; gap: 6px; padding: 6px 4px; }
#customSpeedWindow .evsb-channel-list { max-height: 300px; overflow-y: auto; }
#customSpeedWindow .evsb-channel-icon { display: flex; align-items: center; justify-content: center; }
#customSpeedWindow .evsb-avatar { border-radius: 50%; object-fit: cover; display: block; }
#customSpeedWindow .evsb-form-layer { position: fixed; inset: 0; z-index: 2; display: flex; align-items: center; justify-content: center; }
#customSpeedWindow .evsb-form-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.35); }
#customSpeedWindow .evsb-form { position: relative; width: 88%; max-width: 440px; max-height: 88vh; overflow-y: auto; padding: 18px;
  border-radius: 8px; background: var(--evsb-bg); color: var(--evsb-fg); box-shadow: 0 6px 24px rgba(0,0,0,0.4); }
#customSpeedWindow .evsb-form h3 { margin: 0 0 10px; font-size: 17px; }
#customSpeedWindow .evsb-form-channel { margin: 0 0 10px; overflow-wrap: anywhere; }
#customSpeedWindow .evsb-field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px; }
#customSpeedWindow .evsb-preview { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; min-height: 36px; }
#customSpeedWindow .evsb-preview.evsb-invalid { color: var(--evsb-danger); }
#customSpeedWindow .evsb-section { margin-bottom: 18px; }
#customSpeedWindow .evsb-section h3 { margin: 0 0 6px; font-size: 16px; }
#customSpeedWindow .evsb-muted { color: var(--evsb-muted); margin: 0 0 8px; }
#customSpeedWindow .evsb-lang-options { display: flex; flex-direction: column; gap: 6px; }
#customSpeedWindow .evsb-lang-option { display: flex; align-items: center; gap: 10px; padding: 8px; border: 1px solid var(--evsb-border);
  border-radius: 6px; cursor: pointer; }
#customSpeedWindow .evsb-lang-option:hover { background: var(--evsb-hover); }
#customSpeedWindow .evsb-lang-text, #customSpeedWindow .evsb-sync-text { display: flex; flex-direction: column; text-align: left; }
#customSpeedWindow .evsb-lang-text small, #customSpeedWindow .evsb-sync-text small { color: var(--evsb-muted); }
#customSpeedWindow .evsb-sync-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
#customSpeedWindow .evsb-sync-card { display: flex; align-items: center; gap: 10px; padding: 12px; border: 1px solid var(--evsb-border);
  border-radius: 8px; background: transparent; color: var(--evsb-fg); cursor: pointer; font-size: 14px; }
#customSpeedWindow .evsb-sync-card:hover { background: var(--evsb-hover); }
#customSpeedWindow .evsb-sync-icon { font-size: 22px; }
#customSpeedWindow .evsb-info { display: flex; gap: 8px; margin-top: 10px; padding: 10px; border-radius: 6px; background: var(--evsb-hover);
  border-left: 3px solid #00a1d6; }
#customSpeedWindow .evsb-error { color: var(--evsb-danger); }
#customSpeedWindow .evsb-file-input { position: fixed; left: -9999px; top: 0; width: 1px; height: 1px; opacity: 0; }
@media (max-width: 480px) {
  #customSpeedWindow .evsb-card { padding: 14px; }
  #customSpeedWindow .evsb-title { font-size: 17px; }
  #customSpeedWindow .evsb-tab { font-size: 11px; padding: 6px 2px; }
  #customSpeedWindow .evsb-subtab { font-size: 12px; padding: 4px 9px; }
  #customSpeedWindow .evsb-channel-row { grid-template-columns: 32px 1.2fr 1fr 48px 30px 30px; font-size: 12px; gap: 4px; }
  #customSpeedWindow .evsb-sync-cards { grid-template-columns: 1fr; }
}
#evsb-toast { position: fixed; left: 50%; bottom: 40px; transform: translate(-50%, 10px); z-index: 2147483600; max-width: 90vw;
  padding: 10px 18px; border-radius: 6px; background: rgba(30,30,30,0.9); color: #fff; font: 14px/1.4 sans-serif;
  opacity: 0; transition: opacity 0.3s ease, transform 0.3s ease; pointer-events: none; text-align: center; }
#evsb-toast.evsb-show { opacity: 1; transform: translate(-50%, 0); }
`;

  function addStyle(css) {
    try {
      if (typeof GM_addStyle === 'function') { GM_addStyle(css); return; }
    } catch (_) { /* fall back below */ }
    const style = document.createElement('style');
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------

  function init() {
    if (document.documentElement.dataset.evsbReady === '1') return; // a second copy of the script must not start
    startupSelfCheck();
    addStyle(CSS_TEXT);
    renderBar();

    if (typeof GM_registerMenuCommand === 'function') {
      try { GM_registerMenuCommand(t('title'), () => openWindow('speeds')); } catch (_) { /* ignore */ }
    }

    window.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('videoSpeedChanged', () => {
      if (win && typeof win.refresh === 'function') {
        try { win.refresh(); } catch (_) { /* ignore */ }
      }
    });
    window.addEventListener('yt-navigate-finish', () => scheduleTick(0));
    document.addEventListener('yt-navigate-finish', () => scheduleTick(0));
    window.addEventListener('popstate', () => scheduleTick(0));

    // One observer; its callback only schedules a throttled tick.
    new MutationObserver(() => scheduleTick()).observe(document.documentElement, { childList: true, subtree: true });

    document.documentElement.dataset.evsbReady = '1';
    tick();
  }

  if (document.body) init();
  else document.addEventListener('DOMContentLoaded', init, { once: true });
})();
