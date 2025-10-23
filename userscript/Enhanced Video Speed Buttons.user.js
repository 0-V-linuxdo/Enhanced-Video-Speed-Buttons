// ==UserScript==
// @name         Enhanced Video Speed Buttons [20251023] v1.0.7
// @namespace    0_V userscripts/Enhanced Video Speed Buttons
// @description  Add customizable speed buttons to any HTML5 <video> element with order and speed customization. Supports YouTube, Vimeo, and Bilibili. Now includes settings synchronization features like export and import, and per-channel default playback speeds for YouTube and Bilibili with improved UI. Changes take effect immediately without needing to refresh the page.
// @version      [20251023] v1.0.7
// @run-at       document-end
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @match        *://*.youtube.com/*
// @match        *://youtube.com/*
// @match        *://*.vimeo.com/*
// @match        *://vimeo.com/*
// @match        *://*.bilibili.com/*
// @match        *://bilibili.com/*
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTIwIDEyMCIgc3R5bGU9ImN1cnNvcjogcG9pbnRlcjsiPgogIDxkZWZzPgogICAgPCEtLSDigJfnrpfljYfmuIXnqbogLS0+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImR5bmFtaWNHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRjFFNTAiIGlkPSJzdG9wMSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzM0OThEQiIgaWQ9InN0b3AyIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGNDA4MSIgaWQ9InN0b3AzIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgoKICAgIDwhLS0g6auY57qn6ZSh5ZKM5Y+R5YWl5pWw5o2uIC0tPgogICAgPGZpbHRlciBpZD0icGxheUljb25FZmZlY3QiIHg9Ii01MCUiIHk9Ii01MCUiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiPgogICAgICA8ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiIHJlc3VsdD0ic2hhZG93Ii8+CiAgICAgIDxmZU9mZnNldCBkeD0iMCIgZHk9IjIiIHJlc3VsdD0ib2Zmc2V0U2hhZG93Ii8+CiAgICAgIDxmZUNvbXBvc2l0ZSBpbj0ic2hhZG93IiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIvPgogICAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwLjkKICAgICAgICAgICAgICAgICAgICAgICAwIDAgMCAwIDAuMwogICAgICAgICAgICAgICAgICAgICAgIDAgMCAwIDAgMC40CiAgICAgICAgICAgICAgICAgICAgICAgMCAwIDAgMC42IDAiLz4KICAgICAgCiAgICAgIDxmZUZsb29kIGZsb29kLWNvbG9yPSIjRkYxRTUwIiBmbG9vZC1vcGFjaXR5PSIwLjQiIHJlc3VsdD0iZ2xvd0NvbG9yIi8+CiAgICAgIDxmZUNvbXBvc2l0ZSBpbj0iZ2xvd0NvbG9yIiBpbjI9IlNvdXJjZUdyYXBoaWMiIG9wZXJhdG9yPSJpbiIvPgogICAgICA8ZmVHYXVzc2lhbkJsdXIgc3REZXZpYXRpb249IjQiIHJlc3VsdD0iZ2xvdyIvPgogICAgICA8ZmVNZXJnZT4KICAgICAgICA8ZmVNZXJnZU5vZGUgaW49Imdsb3ciLz4KICAgICAgICA8ZmVNZXJnZU5vZGUgaW49IlNvdXJjZUdyYXBoaWMiLz4KICAgICAgPC9mZU1lcmdlPgogICAgPC9maWx0ZXI+CiAgPC9kZWZzPgoKICAgIDxzdHlsZT4KICAgICAgQGtleWZyYW1lcyBicmVhdGhlUHVsc2UgewogICAgICAgIDAlLCAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgxKSByb3RhdGUoMGRlZyk7IH0KICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpIHJvdGF0ZSgzZGVnKTsgfQogICAgICB9CiAgICA8L3N0eWxlPgoKICAgIDwhLS0g6IOM5pmv6aOe5py6IC0tPgogICAgPHJlY3QgCiAgICAgIHdpZHRoPSIxMjAiIAogICAgICBoZWlnaHQ9IjEyMCIgCiAgICAgIGZpbGw9InVybCgjZHluYW1pY0dyYWRpZW50KSIgCiAgICAgIHJ4PSIxNSIgCiAgICAgIHJ5PSIxNSIKICAgIC8+CgogICAgPCEtLSDigJrlr7nmr4jmiYjnmoTkuI3ov4nkva7kuIDkuK3lgYwgLS0+CiAgICA8cG9seWdvbiAKICAgICAgaWQ9InBsYXlUcmlhbmdsZSIgCiAgICAgIHBvaW50cz0iNDAsMzUgNDAsODUgOTAsNjAiIAogICAgICBmaWxsPSJ3aGl0ZSIgCiAgICAgIGZpbHRlcj0idXJsKCNwbGF5SWNvbkVmZmVjdCkiCiAgICAvPgoKICAgIDxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0Ij4KICAgICAgPCFbQ0RBVEFbCiAgICAoZnVuY3Rpb24oKSB7CiAgICAgIGNvbnN0IHBsYXlUcmlhbmdsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5VHJpYW5nbGUnKTsKCiAgICAgIHBsYXlUcmlhbmdsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4gewogICAgICAgIHBsYXlUcmlhbmdsZS5zdHlsZS5hbmltYXRpb24gPSAnYnJlYXRoZVB1bHNlIDAuNnMgZWFzZS1pbi1vdXQnOwogICAgICB9KTsKCiAgICAgIHBsYXlUcmlhbmdsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4gewogICAgICAgIHBsYXlUcmlhbmdsZS5zdHlsZS5hbmltYXRpb24gPSAnbm9uZSc7CiAgICAgICAgcGxheVRyaWFuZ2xlLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZSgxKSByb3RhdGUoMGRlZyknOwogICAgICB9KTsKICAgIH0pKCk7CiAgICBdXT4KICAgIDwvc2NyaXB0Pgo8L3N2Zz4=
// ==/UserScript==

// ================================================
// 原脚本信息：
// 名称：Video Speed Buttons
// 作者：bradenscode
// 链接：https://greasyfork.org/scripts/30506
// 版本：1.0.10
// ================================================

/* ===================== IMPORTANT · NOTICE · START =====================
 *
 * 1. [编辑指引 | Edit Guidance]
 *    • ⚠️ 这是一个自动生成的文件：请在 `src/modules` 目录下的模块中进行修改，然后运行 `npm run build` 在 `dist/` 目录下重新生成。
 *    • ⚠️ This project bundles auto-generated artifacts. Make changes inside the modules under `src/modules`, then run `npm run build` to regenerate everything under `dist/`.
 *
 * ----------------------------------------------------------------------
 *
 * 2. [说明 | Notes]
 *    • 在提交前，务必重新运行构建流程，以确保 `dist/` 与源文件一致。
 *    • Always rebuild before sharing or committing so `dist/` stays in sync.
 *
 * ====================== IMPORTANT · NOTICE · END ======================
 */

/* -------------------------------------------------------------------------- *
 * Module 01 · IIFE bootstrap and shared controller constants
 * -------------------------------------------------------------------------- */
(function() {
    'use strict';

    const CONTROLLER_VSB = 0;
    const CONTROLLER_VSC = 1;
    const controller_type = CONTROLLER_VSB;
    const HISTORY_KEY = 'videoSpeedHistory';
    const CHANNEL_DEFAULT_SPEEDS_KEY = 'channelDefaultSpeeds';
    const LANGUAGE_PREFERENCE_KEY = 'uiLanguagePreference';
    const MAX_HISTORY_ITEMS = 100;
    /* ---------------------------------------------------------------------- *
     * Module 02 · Platform detection and video context utilities
     * ---------------------------------------------------------------------- */
    // 获取当前平台
    function getPlatform() {
        if (location.hostname.includes('youtube')) return 'youtube';
        if (location.hostname.includes('bilibili')) return 'bilibili';
        if (location.hostname.includes('vimeo')) return 'vimeo';
        return 'other';
    }

    // 获取视频标识符
    function getVideoIdentifier() {
        const platform = getPlatform();
        let identifier = location.href;
        if (platform === 'youtube') {
            const videoId = new URLSearchParams(location.search).get('v');
            if (videoId) identifier = `youtube_${videoId}`;
        } else if (platform === 'bilibili') {
            const match = location.pathname.match(/\/video\/(BV[\w]+)/);
            if (match) identifier = `bilibili_${match[1]}`;
        } else if (platform === 'vimeo') {
            const match = location.pathname.match(/\/(\d+)/);
            if (match) identifier = `vimeo_${match[1]}`;
        }
        return identifier;
    }

    // 获取当前YouTube频道ID（handle或唯一ID）
    function getCurrentYouTubeChannelId() {
        if (getPlatform() !== 'youtube') return null;

        // 1) 先尝试旧版选择器
        const channelLink = document.querySelector('ytd-video-owner-renderer a.yt-simple-endpoint');
        if (channelLink) {
            const href = channelLink.getAttribute('href');
            if (href) {
                // YouTube频道handle以'/@'开头
                const handleMatch = href.match(/\/@([A-Za-z0-9_-]+)/);
                if (handleMatch && handleMatch[1]) {
                    return `@${handleMatch[1]}`;
                }
                // 或者频道ID以'/channel/'开头
                const idMatch = href.match(/\/channel\/([A-Za-z0-9_-]+)/);
                if (idMatch && idMatch[1]) {
                    return idMatch[1];
                }
            }
        }

        // 2) 新版YouTube频道区域可能使用 #channel-name a
        const newChannelLink = document.querySelector('#channel-name a');
        if (newChannelLink) {
            const href2 = newChannelLink.getAttribute('href');
            if (href2) {
                const handleMatch2 = href2.match(/\/@([A-Za-z0-9_-]+)/);
                if (handleMatch2 && handleMatch2[1]) {
                    return `@${handleMatch2[1]}`;
                }
                const idMatch2 = href2.match(/\/channel\/([A-Za-z0-9_-]+)/);
                if (idMatch2 && idMatch2[1]) {
                    return idMatch2[1];
                }
            }
        }

        // 3) 备用：尝试从 meta 中读取 channelId
        const metaChannelId = document.querySelector('meta[itemprop="channelId"]');
        if (metaChannelId && metaChannelId.content) {
            return metaChannelId.content.trim();
        }

        // 如果实在没获取到，则返回 null
        return null;
    }

    // 获取当前YouTube频道名称
    function getCurrentYouTubeChannelName() {
        if (getPlatform() !== 'youtube') return null;
        const channelNameElement = document.querySelector('ytd-channel-name #text a');
        if (channelNameElement) {
            return channelNameElement.textContent.trim();
        }
        return null;
    }

    // 获取当前YouTube频道头像
    function getCurrentYouTubeChannelIconUrl() {
        if (getPlatform() !== 'youtube') return '';
        const selectors = [
            'ytd-video-owner-renderer #avatar img',
            'ytd-video-owner-renderer #img',
            '#owner #avatar img',
            '#owner #img',
            '#channel-name #avatar img',
            '#channel-name #img'
        ];
        for (const selector of selectors) {
            const img = document.querySelector(selector);
            if (img) {
                const src =
                    (typeof img.getAttribute === 'function' && img.getAttribute('src')) ||
                    (typeof img.src === 'string' ? img.src : '');
                if (src && src.trim()) {
                    return src.trim();
                }
            }
        }

        const linkIcon = document.querySelector('link[rel="image_src"]');
        if (linkIcon && typeof linkIcon.href === 'string' && linkIcon.href.trim()) {
            return linkIcon.href.trim();
        }

        const metaIcon = document.querySelector('meta[property="og:image"]');
        if (metaIcon && typeof metaIcon.content === 'string' && metaIcon.content.trim()) {
            return metaIcon.content.trim();
        }

        return '';
    }

    // 获取当前Bilibili频道ID
    function getCurrentBilibiliChannelId() {
        if (getPlatform() !== 'bilibili') return null;
        const upInfoContainer = document.querySelector('.up-info-container');
        if (upInfoContainer) {
            const userLink = upInfoContainer.querySelector('a.up-avatar, a.up-name');
            if (userLink) {
                const userId = userLink.getAttribute('biliscope-userid');
                if (userId) {
                    return `bilibili_${userId}`;
                }
                const href = userLink.getAttribute('href');
                if (href) {
                    const match = href.match(/space\.bilibili\.com\/(\d+)/);
                    if (match && match[1]) {
                        return `bilibili_${match[1]}`;
                    }
                }
            }
        }
        return null;
    }

    // 获取当前Bilibili频道名称
    function getCurrentBilibiliChannelName() {
        if (getPlatform() !== 'bilibili') return null;
        const upInfoContainer = document.querySelector('.up-info-container');
        if (upInfoContainer) {
            const userNameElement = upInfoContainer.querySelector('a.up-name');
            if (userNameElement) {
                return userNameElement.textContent.trim();
            }
        }
        return null;
    }

    // 获取当前Bilibili频道头像
    function getCurrentBilibiliChannelIconUrl() {
        if (getPlatform() !== 'bilibili') return '';

        const selectors = [
            '.up-info-container .bili-avatar-img',
            '.up-info-container .up-avatar img',
            '.up-info-container img[alt][src*="hdslb.com"]',
            '.up-info-container img[data-src]',
            '.up-info-container .up-avatar-wrap img'
        ];

        for (const selector of selectors) {
            const img = document.querySelector(selector);
            if (!img) continue;

            const candidateSrc =
                (typeof img.getAttribute === 'function' && (img.getAttribute('src') || img.getAttribute('data-src'))) ||
                (typeof img.src === 'string' ? img.src : '');

            if (candidateSrc && candidateSrc.trim()) {
                const normalized = candidateSrc.trim();
                if (/^(https?:)?\/\//i.test(normalized)) {
                    if (normalized.startsWith('//')) {
                        return `https:${normalized}`;
                    }
                    return normalized;
                }
            }
        }

        const fallbackLink = document.querySelector('link[rel="Shortcut Icon"], link[rel="icon"]');
        if (fallbackLink && typeof fallbackLink.href === 'string' && fallbackLink.href.trim()) {
            return fallbackLink.href.trim();
        }

        return '';
    }
    /* ---------------------------------------------------------------------- *
     * Module 03 · Playback history persistence and events
     * ---------------------------------------------------------------------- */
    // 保存视频速度历史
    function saveVideoSpeed(speed, isManual = true) {
        const platform = getPlatform();
        const identifier = getVideoIdentifier();
        const title = document.title;
        let history = GM_getValue(HISTORY_KEY, {});
        if (!history[platform]) history[platform] = [];
        // 移除已有记录
        history[platform] = history[platform].filter(item => item.identifier !== identifier);
        // 添加新记录（即使速度为1）
        const newRecord = {
            identifier,
            title,
            speed,
            timestamp: Date.now(),
            url: location.href,
            isDefault: !isManual // 如果不是手动设置，则为默认
        };
        history[platform].unshift(newRecord);
        // 限制历史记录数量
        if (history[platform].length > MAX_HISTORY_ITEMS) {
            history[platform] = history[platform].slice(0, MAX_HISTORY_ITEMS);
        }
        GM_setValue(HISTORY_KEY, history);
        // 触发更新事件
        document.dispatchEvent(new CustomEvent('videoSpeedChanged', {
            detail: {
                speed,
                platform,
                identifier,
                isManual
            }
        }));
    }

    // 从历史记录中获取视频速度
    function getVideoSpeed() {
        const history = GM_getValue(HISTORY_KEY, {});
        const platform = getPlatform();
        const identifier = getVideoIdentifier();
        if (history[platform]) {
            const record = history[platform].find(item => item.identifier === identifier);
            if (record && record.isDefault !== true) return record.speed;
        }
        return null;
    }

    // 删除视频速度记录
    function deleteVideoSpeed(platform, identifier) {
        let history = GM_getValue(HISTORY_KEY, {});
        if (history[platform]) {
            history[platform] = history[platform].filter(item => item.identifier !== identifier);
            GM_setValue(HISTORY_KEY, history);
            // 删除后触发更新事件
            document.dispatchEvent(new CustomEvent('videoSpeedChanged', {
                detail: {
                    speed: null,
                    platform,
                    identifier
                }
            }));
        }
    }
    /* ---------------------------------------------------------------------- *
     * Module 04 · Channel-level default speed storage
     * ---------------------------------------------------------------------- */
    // 获取频道默认速度
    function getChannelDefaultSpeeds() {
        return GM_getValue(CHANNEL_DEFAULT_SPEEDS_KEY, {});
    }

    // 设置频道默认速度，包括名称、备注和自定义图标
    function setChannelDefaultSpeed(platform, channelId, name, remark, speed, iconUrl = '') {
        let channelSpeeds = getChannelDefaultSpeeds();
        if (!channelSpeeds[platform]) channelSpeeds[platform] = {};
        channelSpeeds[platform][channelId] = { speed, name, remark, iconUrl };
        GM_setValue(CHANNEL_DEFAULT_SPEEDS_KEY, channelSpeeds);
    }

    // 删除频道默认速度
    function deleteChannelDefaultSpeed(platform, channelId) {
        let channelSpeeds = getChannelDefaultSpeeds();
        if (channelSpeeds[platform] && channelSpeeds[platform][channelId]) {
            delete channelSpeeds[platform][channelId];
            GM_setValue(CHANNEL_DEFAULT_SPEEDS_KEY, channelSpeeds);
            // 此处可加事件，如：
            // document.dispatchEvent(new CustomEvent('channelSpeedChanged',{...}));
        }
    }

    // 获取频道默认速度
    function getChannelDefaultSpeed(platform, channelId) {
        let channelSpeeds = getChannelDefaultSpeeds();
        return channelSpeeds[platform] && channelSpeeds[platform][channelId] ? channelSpeeds[platform][channelId].speed : null;
    }

    // 获取频道备注
    function getChannelRemark(platform, channelId) {
        let channelSpeeds = getChannelDefaultSpeeds();
        return channelSpeeds[platform] && channelSpeeds[platform][channelId] ? channelSpeeds[platform][channelId].remark : '';
    }

    // 获取频道名称
    function getChannelName(platform, channelId) {
        let channelSpeeds = getChannelDefaultSpeeds();
        return channelSpeeds[platform] && channelSpeeds[platform][channelId] ? channelSpeeds[platform][channelId].name : '';
    }

    // 获取频道自定义图标
    function getChannelIconUrl(platform, channelId) {
        let channelSpeeds = getChannelDefaultSpeeds();
        if (channelSpeeds[platform] && channelSpeeds[platform][channelId]) {
            const icon = channelSpeeds[platform][channelId].iconUrl;
            return typeof icon === 'string' ? icon : '';
        }
        return '';
    }
    /* ---------------------------------------------------------------------- *
     * Module 05 · Speed button UI, keyboard controls, and rate syncing
     * ---------------------------------------------------------------------- */
    function video_speed_buttons(anchor, video_el){
        if(!anchor || !video_el)
            return null;
        const COLOR_SELECTED = "#FF5500",
            COLOR_NORMAL = "grey",
            BUTTON_SIZE = "120%",
            DEFAULT_SPEED = 1.0,
            LABEL_TEXT = "Video Speed: ",
            ALLOW_EXTERNAL_ACCESS = false;
        let BUTTON_TEMPLATES = GM_getValue('customSpeeds', [
            ["2x",      2],
            ["1.5x",    1.5],
            ["1.25x",   1.25],
            ["1.2x",    1.2],
            ["1.1x",    1.1],
            ["1.05x",   1.05],
            ["Normal",  1],
            ["0.95x",   0.95],
            ["0.9x",    0.9],
            ["0.85x",   0.85],
            ["0.8x",    0.8],
            ["0.78x",   0.78]
        ]);
        let buttonOrder = GM_getValue('buttonOrder', 'desc');

        function sortButtons() {
            if (buttonOrder === 'desc') {
                BUTTON_TEMPLATES.sort((a, b) => b[1] - a[1]);
            } else {
                BUTTON_TEMPLATES.sort((a, b) => a[1] - b[1]);
            }
        }

        sortButtons();

        const buttons = {
            head:      null,
            selected:  null,
            last:      null
        };

        // 用于绑定事件后在 kill() 时去移除
        let eventBoundVideo = video_el;
        let handleAutoSetRateRef = null;

        function detachAutoRateHandler() {
            if (eventBoundVideo && handleAutoSetRateRef) {
                eventBoundVideo.removeEventListener('loadedmetadata', handleAutoSetRateRef);
                eventBoundVideo.removeEventListener('canplay', handleAutoSetRateRef);
            }
        }

        function bindAutoRateHandler(handler) {
            detachAutoRateHandler();
            handleAutoSetRateRef = typeof handler === 'function' ? handler : null;
            if (eventBoundVideo && handleAutoSetRateRef) {
                eventBoundVideo.addEventListener('loadedmetadata', handleAutoSetRateRef);
                eventBoundVideo.addEventListener('canplay', handleAutoSetRateRef);
            }
        }

        const keyboard_controls = [
            [/[-_\u2014]/, "Speed Down", function(ev){
                if(is_comment_box(ev.target) || ev.ctrlKey || ev.altKey || ev.metaKey)
                    return false;
                (buttons.selected || buttons.head)
                    .getprev()
                    .el
                    .dispatchEvent(new MouseEvent("click"));
            }],
            [/[\+=]/, "Speed Up", function(ev){
                if(is_comment_box(ev.target) || ev.ctrlKey || ev.altKey || ev.metaKey)
                    return false;
                (buttons.selected || buttons.head)
                    .getnext()
                    .el
                    .dispatchEvent(new MouseEvent("click"));
            }],
            [/[\*]/, "Reset Speed", function(ev){
                let selbtn = buttons.head;
                let result = null;
                if(is_comment_box(ev.target) || ev.ctrlKey || ev.altKey || ev.metaKey)
                    return false;
                while(selbtn !== null && result === null)
                    if(selbtn.speed === DEFAULT_SPEED)
                        result = selbtn;
                    else
                        selbtn = selbtn.next;
                if(result === null)
                    result = buttons.head;
                result.el.dispatchEvent(new MouseEvent("click"));
            }],
            [/[\?]/, "Show Help", function(ev){
                let infobox;
                if(is_comment_box(ev.target) || ev.ctrlKey || ev.altKey || ev.metaKey)
                    return false;
                (infobox = Infobox(container))
                    .log("Keyboard Controls (click to close)<br>");
                keyboard_controls.forEach(function([key, description]){
                    infobox.log(`[${key}]  ${description}<br>`);
                });
            }]
        ];

        let container;

        function createContainer() {
            container = document.createElement("div");
            let prev_node = null;
            container.className = "vsb-container";
            container.style.borderBottom = "1px solid #ccc";
            container.style.marginBottom = "10px";
            container.style.paddingBottom = "10px";

            // 添加新的“Speed”和“Video”标签
            container.appendChild(CustomSpeedLabel());

            BUTTON_TEMPLATES.forEach(function(button){
                let speedButton = SpeedButton(...button, container);
                if(buttons.head === null)
                    buttons.head = speedButton;
                if(prev_node !== null){
                    speedButton.prev = prev_node;
                    prev_node.next = speedButton;
                }
                prev_node = speedButton;
                if(speedButton.speed == DEFAULT_SPEED)
                    speedButton.select();
            });

            return container;
        }

        container = createContainer();

        function CustomSpeedLabel(){
            let el = document.createElement("span");

            // 创建“Speed”可点击的span
            const speedSpan = document.createElement("span");
            speedSpan.innerHTML = "Speed";
            speedSpan.style.cursor = "pointer";
            speedSpan.addEventListener("click", showSettingsWindow);

            // 创建“Video”可点击的span
            const videoSpan = document.createElement("span");
            videoSpan.innerHTML = "Video";
            videoSpan.style.cursor = "pointer";
            videoSpan.addEventListener("click", () => {
                createCustomSpeedWindow('history');
            });

            // 创建剩余的“: ”span
            const restSpan = document.createElement("span");
            restSpan.innerHTML = ": ";

            // 应用统一样式
            [speedSpan, videoSpan, restSpan].forEach(span => {
                span.style.marginRight = "3px";
                span.style.fontSize = BUTTON_SIZE;
                span.style.color = COLOR_NORMAL;
                span.style.fontWeight = "bold";
            });

            // 添加悬停效果
            [speedSpan, videoSpan].forEach(span => {
                span.addEventListener("mouseenter", () => {
                    span.style.opacity = "0.8";
                });
                span.addEventListener("mouseleave", () => {
                    span.style.opacity = "1";
                });
            });

            el.appendChild(videoSpan);
            el.appendChild(speedSpan);
            el.appendChild(restSpan);

            return el;
        }

        function is_comment_box(el){
            const candidate = [
                ".comment-simplebox-text",
                "textarea"
            ].map(c => document.querySelector(c))
             .find(el => el !== null);
            if(candidate === null){
                logvsb("video_speed_buttons::is_comment_box", "no candidate for comment box. Assuming false.");
                return false;
            }
            return el === candidate;
        }

        function Infobox(parent){
            let el = document.createElement("pre");
            el.style.font = "1em monospace";
            el.style.borderTop = "1px solid #ccc";
            el.style.marginTop = "10px";
            el.style.paddingTop = "10px";
            el.addEventListener("click", function(){
                parent.removeChild(el);
            });
            parent.appendChild(el);
            function log(msg){
                el.innerHTML += msg;
            }
            return {
                el,
                log
            };
        }

        let playbackRate_data = {
            rate: 1,
            video: video_el
        };

        function setPlaybackRate(el, rate, isManual = true){
            if(el) {
                el.playbackRate = rate;
                playbackRate_data.rate = rate;
                playbackRate_data.video = el;
                if (isManual) {
                    saveVideoSpeed(rate, true);
                }
                // 触发速度变化事件
                const event = new CustomEvent('videoSpeedChanged', {
                    detail: {
                        speed: rate,
                        platform: getPlatform(),
                        identifier: getVideoIdentifier(),
                        isManual: isManual
                    }
                });
                document.dispatchEvent(event);

                // 可选：在短延迟后再次核对，防止平台脚本抢先重置
                setTimeout(() => {
                    if (el.playbackRate !== rate) {
                        el.playbackRate = rate;
                    }
                }, 100);
            }
            else
                logvsb("video_speed_buttons::setPlaybackRate", "video element is null or undefined", 1);
        }

        function SpeedButtonLabel(text){
            let el = document.createElement("span");
            el.innerHTML = text;
            el.style.marginRight = "10px";
            el.style.fontWeight = "bold";
            el.style.fontSize = BUTTON_SIZE;
            el.style.color = COLOR_NORMAL;
            return el;
        }

        function SpeedButton(text, speed, parent){
            let el = SpeedButtonLabel(text);
            el.classList.add("speed-button"); // Add a class for potential future styling
            let self;
            el.style.cursor = "pointer";
            el.addEventListener("click", function(){
                setPlaybackRate(video_el, speed, true);
                self.select();
            });
            parent.appendChild(el);
            function select(){
                if(buttons.last !== null)
                    buttons.last.el.style.color = COLOR_NORMAL;
                buttons.last = self;
                buttons.selected = self;
                el.style.color = COLOR_SELECTED;
            }
            function getprev(){
                if(self.prev === null)
                    return self;
                return buttons.selected = self.prev;
            }
            function getnext(){
                if(self.next === null)
                    return self;
                return buttons.selected = self.next;
            }
            return self = {
                el,
                text,
                speed,
                prev:  null,
                next:  null,
                select,
                getprev,
                getnext
            };
        }

        function kill(){
            if(container.parentNode){
                container.parentNode.removeChild(container);
            }
            document.body.removeEventListener("keydown", ev_keyboard);

            // 如果已绑定 video 的事件，这里清理
            detachAutoRateHandler();
        }

        function set_video_el(new_video_el){
            if (new_video_el === eventBoundVideo) {
                video_el = new_video_el;
                playbackRate_data.video = new_video_el;
                return;
            }
            detachAutoRateHandler();
            video_el = new_video_el;
            playbackRate_data.video = new_video_el;
            eventBoundVideo = new_video_el;
            if (eventBoundVideo && handleAutoSetRateRef) {
                eventBoundVideo.addEventListener('loadedmetadata', handleAutoSetRateRef);
                eventBoundVideo.addEventListener('canplay', handleAutoSetRateRef);
            }
        }

        function ev_keyboard(ev){
            let match = keyboard_controls.find(([key, unused, callback]) => key.test(ev.key));
            let callbackFunc = (match || {2: ()=>null})[2];
            callbackFunc(ev);
        }

        function updateButtonOrder() {
            kill();
            sortButtons();
            container = createContainer();
            anchor.insertBefore(container, anchor.firstChild);
        }

        // 初始化视频速度为默认值，具体逻辑由后续初始化流程接管
        function initializePlaybackSpeed() {
            if (video_el) {
                video_el.playbackRate = DEFAULT_SPEED;
            }
            playbackRate_data.rate = DEFAULT_SPEED;
            playbackRate_data.video = video_el;
            let selbtn = buttons.head;
            while(selbtn !== null) {
                if(selbtn.speed === DEFAULT_SPEED) {
                    selbtn.select();
                    break;
                }
                selbtn = selbtn.next;
            }
        }

        initializePlaybackSpeed();
        anchor.insertBefore(container, anchor.firstChild);
        document.body.addEventListener("keydown", ev_keyboard);

        return {
            controls: keyboard_controls,
            buttons,
            kill,
            SpeedButton,
            Infobox,
            setPlaybackRate,
            is_comment_box,
            set_video_el,
            bindAutoRateHandler,
            detachAutoRateHandler,
            playbackRate_data,
            ALLOW_EXTERNAL_ACCESS,
            updateButtonOrder
        };
    }

    video_speed_buttons.from_query = function(anchor_q, video_q){
        return video_speed_buttons(
                document.querySelector(anchor_q),
                document.querySelector(video_q));
    };

    // 多用途加载器
    /* ---------------------------------------------------------------------- *
     * Module 06 · Loader routines for mounting controllers on each site
     * ---------------------------------------------------------------------- */
    const loader_data = {
        container_candidates: [
            // YouTube
            "div#above-the-fold",
            "div#title.style-scope.ytd-watch-metadata",
            "div#container.ytd-video-primary-info-renderer",
            "div#watch-header",
            "div#watch7-headline",
            "div#watch-headline-title",
            // Vimeo
            ".clip_info-wrapper",
            // Bilibili
            "div#viewbox_report",
            ".video-info-container",
            "#player_module",
            ".video-info",
            ".bilibili-player-area"
        ],
        css_div: [
            "position:    fixed",
            "top:         0",
            "right:       0",
            "zIndex:      100000",
            "background:  rgba(0, 0, 0, 0.8)",
            "color:       #eeeeee",
            "padding:     10px"
        ].map(rule => rule.split(/: */)),
        css_vsb_container: [
            "borderBottom:    none",
            "marginBottom:    0",
            "paddingBottom:   0",
        ].map(rule => rule.split(/: */))
    };

    function logvsb(where, msg, lvl = 0){
        let logf = (["info", "error"])[lvl];
        console[logf](`[vsb::${where}] ${msg}`);
    }

    let vsb_handle;

    function loader_loop(){
        let vsbc = () => document.querySelector(".vsb-container");
        let candidate;
        let default_candidate;
        if(vsbc() !== null)
            return;
        candidate = loader_data
            .container_candidates
            .map(selector => document.querySelector(selector))
            .find(el => el !== null);
        default_candidate = (function(){
            let el = document.createElement("div");
            loader_data.css_div.forEach(function([name, value]){
                el.style[name] = value;
            });
            return el;
        }());
        const videoElement = document.querySelector("video");
        vsb_handle = video_speed_buttons(candidate || default_candidate, videoElement);
        if(candidate === null){
            logvsb("loader_loop", "no candidates for title section. Defaulting to top of page.");
            document.body.appendChild(default_candidate);
            loader_data.css_vsb_container.forEach(function([name, value]){
                let vc = document.querySelector(".vsb-container");
                if (vc) vc.style[name] = value;
            });
        }
        if(videoElement){
            // 恢复并改进enforcer循环：定期检查并纠正播放速率
            if (vsb_handle.enforcer_loop_iid) {
                clearInterval(vsb_handle.enforcer_loop_iid);
            }
            vsb_handle.enforcer_loop_iid = setInterval(function(){
                let prdata = vsb_handle.playbackRate_data;
                if (prdata.video !== null && prdata.video.playbackRate !== prdata.rate) {
                    prdata.video.playbackRate = prdata.rate;
                }
            }, 500);
        }

        if (vsb_handle) {
            triggerPlaybackInitialization('loader:mount');
        }

        // 监听新的video出现后重新初始化
        const observer = new MutationObserver((mutationsList, observer) => {
            for(const mutation of mutationsList){
                if(mutation.type === 'childList'){
                    const newVideo = document.querySelector("video");
                    if(newVideo && newVideo !== (vsb_handle && vsb_handle.playbackRate_data.video)){
                        logvsb("MutationObserver", "New video element detected.");
                        if(vsb_handle){
                            vsb_handle.kill();
                        }
                        loader_loop();
                    }
                }
            }
        });
        if(videoElement && videoElement.parentNode){
            observer.observe(videoElement.parentNode, { childList: true, subtree: true });
        }
        if(vsb_handle && vsb_handle.ALLOW_EXTERNAL_ACCESS)
            window.vsb = vsb_handle;
    }
    /* ---------------------------------------------------------------------- *
     * Module 07 · Localization strings and language helpers
     * ---------------------------------------------------------------------- */
    const SUPPORTED_UI_LANGUAGES = ['auto', 'zh', 'en'];

    function detectBrowserLanguage() {
        return navigator.language.startsWith('zh') ? 'zh' : 'en';
    }

    function getLanguagePreference() {
        const preference = GM_getValue(LANGUAGE_PREFERENCE_KEY, 'auto');
        return SUPPORTED_UI_LANGUAGES.includes(preference) ? preference : 'auto';
    }

    function setLanguagePreference(preference) {
        const normalized = SUPPORTED_UI_LANGUAGES.includes(preference) ? preference : 'auto';
        GM_setValue(LANGUAGE_PREFERENCE_KEY, normalized);
    }

    // 语言检测
    function detectLanguage() {
        const preference = getLanguagePreference();
        return preference === 'auto' ? detectBrowserLanguage() : preference;
    }

    // 翻译文本
    const translations = {
        en: {
            title: "🛠️ Custom Speed Buttons",
            label: "✍️ Button Label:",
            speed: "⏱️ Speed:",
            delete: "Delete",
            edit: "Edit",
            add: "Add",
            buttonOrder: "&harr;️ Order",
            ascending: "Ascending",
            descending: "Descending",
            reset: "Reset",
            clear: "Clear",
            cancel: "Cancel",
            confirm: "Confirm",
            invalidInput: "Please enter a valid positive number!",
            speedExists: "This speed already exists! Label updated!",
            settingsSaved: "Settings saved successfully!",
            history: "Video History",
            noHistory: "No history records!",
            speeds: "Speeds",
            confirmReset: "Are you sure you want to clear all history?",
            historyCleared: "History has been cleared!",
            errorInitializing: "Error initializing settings window!",
            errorUpdatingList: "Error updating speed list!",
            retryButton: "Retry",
            sync: "Sync",
            export: "Export",
            import: "Import",
            exportSuccess: "Settings exported successfully!",
            importSuccess: "Settings imported successfully!",
            importError: "Error importing settings: Invalid file format!",
            noSettingsFound: "No settings found to export!",
            selectFile: "Select File",
            confirmImport: "This will overwrite your current settings. Continue?",
            channelSpeeds: "Channel Speeds",
            addChannelSpeed: "Add Channel Speed",
            channel: "Channel",
            channelSpeed: "Speed",
            iconUrl: "🖼️ Icon URL:",
            iconUrlPlaceholder: "https://... or data:image/...",
            iconPreview: "Preview",
            setDefaultSpeed: "Set as Default",
            removeChannelSpeed: "Remove",
            noChannelSpeeds: "No channel speed settings!",
            exportChannelSpeeds: "Export Channel Speeds",
            importChannelSpeeds: "Import Channel Speeds",
            editChannelSpeed: "Edit",
            save: "Save",
            cancelEdit: "Cancel",
            currentChannel: "Current Channel",
            addSpeedForCurrentChannel: "Add Speed",
            editSpeedForChannel: "Edit Speed",
            enterNewSpeed: "Enter new speed:",
            channelSpeedSet: "Channel speed set successfully!",
            channelSpeedUpdated: "Channel speed updated successfully!",
            channelSpeedDeleted: "Channel speed deleted successfully!",
            confirmRemoveChannelSpeed: "Are you sure you want to delete this channel speed?",
            invalidIconUrl: "Please enter a valid icon URL (http(s) or data URI), or leave it empty.",
            noCurrentChannel: "No channel detected on this page.",
            youtube: "YouTube",
            bilibili: "Bilibili",
            addYouTubeChannelSpeed: "Add YouTube Speed",
            addBilibiliChannelSpeed: "Add Bilibili Speed",
            editYouTubeChannelSpeed: "Edit YouTube Speed",
            editBilibiliChannelSpeed: "Edit Bilibili Speed",
            removeYouTubeChannelSpeed: "Remove YouTube Speed",
            removeBilibiliChannelSpeed: "Remove Bilibili Speed",
            youtubeChannel: "YouTube",
            bilibiliChannel: "Bilibili",
            video: "Video",
            videoHistory: "Video History",
            channelsTab: "Channels",
            syncSettings: "Sync Settings",
            exportSettings: "Export Settings",
            importSettings: "Import Settings",
            addSpeed: "Add Speed",
            confirmImportSettings: "This will overwrite your current settings. Continue?",
            infoSyncBilibili: "Synchronize your speed settings across devices for Bilibili channels.",
            infoSyncOther: "Synchronize your speed settings across devices for other platforms.",
            close: "Close",
            remark: "✍️ Remark:",
            channelIconLabel: "Icon",
            channelNameHeader: "Name",
            channelRemarkHeader: "Remark",
            channelSpeedHeader: "Speed",
            channelName: "📛 Name:",
            uiLanguage: "Interface Language",
            languageDescription: "Choose the language used by the script interface.",
            languageAuto: "Auto",
            languageZh: "Chinese",
            languageEn: "English",
            languageAutoHint: "Follow your browser language automatically.",
            languageZhHint: "Always use the interface in Chinese.",
            languageEnHint: "Always use the interface in English.",
            settings: "Settings"
        },
        zh: {
            title: "🛠️ 自定义速度按钮",
            label: "✍️ 标签：",
            speed: "⏱️ 速度：",
            delete: "删除",
            edit: "编辑",
            add: "添加",
            buttonOrder: "&harr;️ 顺序",
            ascending: "升序",
            descending: "降序",
            reset: "重置",
            clear: "清空",
            cancel: "取消",
            confirm: "确认",
            invalidInput: "请输入有效的正数！",
            speedExists: "此速度已存在！对应标签已更新！",
            settingsSaved: "设置已成功保存！",
            history: "视频历史",
            noHistory: "无历史记录！",
            speeds: "速度",
            confirmReset: "确定要清除所有历史记录？",
            historyCleared: "历史记录已清空！",
            errorInitializing: "初始化设置窗口时出错！",
            errorUpdatingList: "更新速度列表时出错！",
            retryButton: "重试",
            sync: "同步",
            export: "导出",
            import: "导入",
            exportSuccess: "设置导出成功！",
            importSuccess: "设置导入成功！",
            importError: "导入设置出错：无效的文件格式！",
            noSettingsFound: "没有可导出的设置！",
            selectFile: "选择文件",
            confirmImport: "这将覆盖您当前的设置，是否继续？",
            channelSpeeds: "频道速度",
            addChannelSpeed: "添加频道速度",
            channel: "频道",
            channelSpeed: "速度",
            iconUrl: "🖼️ 图标地址：",
            iconUrlPlaceholder: "https://... 或 data:image/...",
            iconPreview: "图标预览",
            setDefaultSpeed: "设为默认",
            removeChannelSpeed: "移除",
            noChannelSpeeds: "暂无频道速度设置！",
            exportChannelSpeeds: "导出频道速度",
            importChannelSpeeds: "导入频道速度",
            editChannelSpeed: "编辑",
            save: "保存",
            cancelEdit: "取消",
            currentChannel: "当前频道",
            addSpeedForCurrentChannel: "添加速度",
            editSpeedForChannel: "编辑速度",
            enterNewSpeed: "输入新速度：",
            channelSpeedSet: "频道速度设置成功！",
            channelSpeedUpdated: "频道速度更新成功！",
            channelSpeedDeleted: "频道速度已删除！",
            confirmRemoveChannelSpeed: "确定要删除这个频道的速度设置吗？",
            invalidIconUrl: "请输入有效的图标地址（http(s) 或 data URI），或留空。",
            noCurrentChannel: "此页面未检测到频道。",
            youtube: "YouTube",
            bilibili: "哔哩哔哩",
            addYouTubeChannelSpeed: "添加YouTube速度",
            addBilibiliChannelSpeed: "添加哔哩哔哩速度",
            editYouTubeChannelSpeed: "编辑YouTube速度",
            editBilibiliChannelSpeed: "编辑哔哩哔哩速度",
            removeYouTubeChannelSpeed: "移除YouTube速度",
            removeBilibiliChannelSpeed: "移除哔哩哔哩速度",
            youtubeChannel: "YouTube",
            bilibiliChannel: "哔哩哔哩",
            video: "视频",
            videoHistory: "视频历史",
            channelsTab: "频道",
            syncSettings: "同步设置",
            exportSettings: "导出设置",
            importSettings: "导入设置",
            addSpeed: "添加速度",
            confirmImportSettings: "这将覆盖您当前的设置，是否继续？",
            infoSyncBilibili: "同步您在哔哩哔哩频道的速度设置到所有设备。",
            infoSyncOther: "同步您在其他平台的速度设置到所有设备。",
            close: "关闭",
            remark: "✍️ 备注：",
            channelIconLabel: "图标",
            channelNameHeader: "名称",
            channelRemarkHeader: "备注",
            channelSpeedHeader: "速度",
            channelName: "📛 名称：",
            uiLanguage: "界面语言",
            languageDescription: "选择脚本界面语言。",
            languageAuto: "自适应",
            languageZh: "中文",
            languageEn: "英文",
            languageAutoHint: "跟随浏览器语言自动切换。",
            languageZhHint: "始终使用中文界面。",
            languageEnHint: "始终使用英文界面。",
            settings: "设置"
        }
    };

    function t(key) {
        const lang = detectLanguage();
        if (translations[lang] && translations[lang][key] !== undefined) {
            return translations[lang][key];
        }
        if (translations['en'] && translations['en'][key] !== undefined) {
            return translations['en'][key];
        }
        return key;
    }
    /* ---------------------------------------------------------------------- *
     * Module 08 · Shared UI helpers (toasts, dialogs, validation)
     * ---------------------------------------------------------------------- */
    function showToast(message) {
        const existingToast = document.querySelector('.toast-message');
        if (existingToast) {
            document.body.removeChild(existingToast);
        }
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 2000);
    }

    function closeWindow(div) {
        document.body.style.pointerEvents = 'auto';
        document.body.removeChild(div);
    }

    // 重试机制
    function retryOperation(operation, maxAttempts = 3, delay = 100) {
        return new Promise((resolve, reject) => {
            let attempts = 0;

            function attempt() {
                attempts++;
                try {
                    const result = operation();
                    resolve(result);
                } catch (error) {
                    if (attempts >= maxAttempts) {
                        reject(error);
                        return;
                    }
                    setTimeout(attempt, delay);
                }
            }

            attempt();
        });
    }

    // 验证速度数据
    function validateSpeedData(speeds) {
        if (!Array.isArray(speeds) || !speeds.length) {
            return false;
        }

        return speeds.every(speed =>
            Array.isArray(speed) &&
            speed.length === 2 &&
            typeof speed[0] === 'string' &&
            !isNaN(Number(speed[1])) &&
            Number(speed[1]) > 0
        );
    }

    // 验证频道速度数据
    function validateChannelSpeedData(channelSpeeds) {
        if (typeof channelSpeeds !== 'object' || channelSpeeds === null) {
            return false;
        }
        for (let platform in channelSpeeds) {
            if (typeof channelSpeeds[platform] !== 'object') return false;
            for (let channelId in channelSpeeds[platform]) {
                const data = channelSpeeds[platform][channelId];
                if (typeof data.speed !== 'number' || data.speed <= 0) return false;
                if (typeof data.name !== 'string') return false;
                if (typeof data.remark !== 'string') return false;
                if (data.iconUrl !== undefined && typeof data.iconUrl !== 'string') return false;
            }
        }
        return true;
    }

    // 重新初始化界面
    function reinitializeInterface() {
        const speeds = GM_getValue('customSpeeds', null);

        // 如果数据无效，恢复默认值
        if (!validateSpeedData(speeds)) {
            GM_setValue('customSpeeds', [
                ["2x", 2],
                ["1.5x", 1.5],
                ["1.25x", 1.25],
                ["1.2x", 1.2],
                ["1.1x", 1.1],
                ["1.05x", 1.05],
                ["Normal", 1],
                ["0.95x", 0.95],
                ["0.9x", 0.9],
                ["0.85x", 0.85],
                ["0.8x", 0.8],
                ["0.78x", 0.78]
            ]);
        }

        // 如果频道速度数据无效，恢复默认值
        const channelSpeeds = GM_getValue(CHANNEL_DEFAULT_SPEEDS_KEY, {});
        if (!validateChannelSpeedData(channelSpeeds)) {
            GM_setValue(CHANNEL_DEFAULT_SPEEDS_KEY, {});
        }

        // 确保界面重新初始化
        if (vsb_handle) {
            vsb_handle.kill();
        }
        setTimeout(loader_loop, 100);
    }
    /* ---------------------------------------------------------------------- *
     * Module 09 · Settings window creation and interaction wiring
     * ---------------------------------------------------------------------- */
    const TAB_ICONS = {
        speeds: '<svg class="tab-button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="4 3"></path><path d="M15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868L9 9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941Z" stroke="currentColor" stroke-width="1.5"></path></svg>',
        history: '<svg class="tab-button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8.76 1.487a11 11 0 11-7.54 12.706 1 1 0 011.96-.4 9 9 0 0014.254 5.38A9 9 0 0016.79 4.38 9 9 0 004.518 7H7a1 1 0 010 2H1V3a1 1 0 012 0v2.678a11 11 0 015.76-4.192ZM12 6a1 1 0 00-1 1v5.58l.504.288 3.5 2a1 1 0 10.992-1.736L13 11.42V7a1 1 0 00-1-1Z" fill="currentColor"></path></svg>',
        settings: '<svg class="tab-button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M12.844 1h-1.687a2 2 0 00-1.962 1.616 3 3 0 01-3.92 2.263 2 2 0 00-2.38.891l-.842 1.46a2 2 0 00.417 2.507 3 3 0 010 4.525 2 2 0 00-.417 2.507l.843 1.46a2 2 0 002.38.892 3.001 3.001 0 013.918 2.263A2 2 0 0011.157 23h1.686a2 2 0 001.963-1.615 3.002 3.002 0 013.92-2.263 2 2 0 002.38-.892l.842-1.46a2 2 0 00-.418-2.507 3 3 0 010-4.526 2 2 0 00.418-2.508l-.843-1.46a2 2 0 00-2.38-.891 3 3 0 01-3.919-2.263A2 2 0 0012.844 1Zm-1.767 2.347a6 6 0 00.08-.347h1.687a4.98 4.98 0 002.407 3.37 4.98 4.98 0 004.122.4l.843 1.46A4.98 4.98 0 0018.5 12a4.98 4.98 0 001.716 3.77l-.843 1.46a4.98 4.98 0 00-4.123.4A4.979 4.979 0 0012.843 21h-1.686a4.98 4.98 0 00-2.408-3.371 4.999 4.999 0 00-4.12-.399l-.844-1.46A4.979 4.979 0 005.5 12a4.98 4.98 0 00-1.715-3.77l.842-1.459a4.98 4.98 0 004.123-.399 4.981 4.981 0 002.327-3.025ZM16 12a4 4 0 11-7.999 0 4 4 0 018 0Zm-4 2a2 2 0 100-4 2 2 0 000 4Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
    };

    const CHANNEL_PLATFORM_ICONS = {
        youtube: '<svg viewBox="0 0 20 20" focusable="false" aria-hidden="true"><rect x="1" y="4" width="18" height="12" rx="3" fill="#ff0000"></rect><polygon points="8,7 14,10 8,13" fill="#ffffff"></polygon></svg>',
        bilibili: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000" aria-hidden="true"><path fill="none" d="M0 0h24v24H0z"></path><path d="M18.223 3.086a1.25 1.25 0 0 1 0 1.768L17.08 5.996h1.17A3.75 3.75 0 0 1 22 9.747v7.5a3.75 3.75 0 0 1-3.75 3.75H5.75A3.75 3.75 0 0 1 2 17.247v-7.5a3.75 3.75 0 0 1 3.75-3.75h1.166L5.775 4.855a1.25 1.25 0 1 1 1.767-1.768l2.652 2.652c.079.079.145.165.198.257h3.213c.053-.092.12-.18.199-.258l2.651-2.652a1.25 1.25 0 0 1 1.768 0zm.027 5.42H5.75a1.25 1.25 0 0 0-1.247 1.157l-.003.094v7.5c0 .659.51 1.199 1.157 1.246l.093.004h12.5a1.25 1.25 0 0 0 1.247-1.157l.003-.093v-7.5c0-.69-.56-1.25-1.25-1.25zm-10 2.5c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25zm7.5 0c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25z"></path></svg>',
        default: '<svg viewBox="0 0 20 20" focusable="false" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="#888888"></circle><circle cx="10" cy="10" r="4" fill="#ffffff"></circle></svg>'
    };

    // 修改后的 createCustomSpeedWindow 函数，增强了频道速度设置的标签页，并修复同步页面的问题
    function createCustomSpeedWindow(initialTab = 'speeds') {
        if (initialTab === 'sync') {
            initialTab = 'settings';
        }
        const languagePreference = getLanguagePreference();
        const platform = getPlatform();
        const syncInfoMarkup = platform === 'bilibili'
            ? `
                                    <div class="sync-description">
                                        <div class="info-box">
                                            <div class="info-icon">ℹ️</div>
                                            <p>${t('infoSyncBilibili')}</p>
                                        </div>
                                    </div>
                                `
            : '';
        const windowHtml = `
            <div id="customSpeedWindow">
                <div class="overlay"></div>
                <div class="content">
                    <button class="close-button">&times;</button>
                    <h2>${t('title')}</h2>
                    <div class="tab-buttons">
                        <button class="tab-button ${initialTab === 'speeds' ? 'active' : ''}" data-tab="speeds">
                            ${TAB_ICONS.speeds}
                            <span>${t('speeds')}</span>
                        </button>
                        <button class="tab-button ${initialTab === 'history' ? 'active' : ''}" data-tab="history">
                            ${TAB_ICONS.history}
                            <span>${t('history')}</span>
                        </button>
                        <button class="tab-button ${initialTab === 'channels' ? 'active' : ''}" data-tab="channels">
                            <svg class="tab-button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                                <path d="M18 1H6a2 2 0 0 0-2 2h16a2 2 0 0 0-2-2Zm3 4H3a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM3 20V7h18v13H3Zm13-6.5L10 10v7l6-3.5Z" fill="currentColor"></path>
                            </svg>
                            <span>${t('channelSpeeds')}</span>
                        </button>
                        <button class="tab-button ${initialTab === 'settings' ? 'active' : ''}" data-tab="settings">
                            ${TAB_ICONS.settings}
                            <span>${t('settings')}</span>
                        </button>
                    </div>
                    <div class="tab-content">
                        <div id="speedsTab" class="tab ${initialTab === 'speeds' ? 'active' : ''}">
                            <div id="speedListHeader">
                                <span>${t('label')}</span>
                                <span>${t('speed')}</span>
                                <span>${t('delete')}</span>
                            </div>
                            <div id="speedList"></div>

                            <div class="input-group">
                                <input type="text" id="newLabelInput" placeholder="${t('label')}" aria-label="${t('label')}">
                                <input type="number" step="0.01" id="newSpeedInput" placeholder="${t('speed')}" aria-label="${t('speed')}">
                                <button id="addSpeedBtn">${t('add')}</button>
                            </div>

                            <div class="select-group">
                                <label for="buttonOrder">${t('buttonOrder')}:</label>
                                <select id="buttonOrder">
                                    <option value="asc">${t('ascending')}</option>
                                    <option value="desc" selected>${t('descending')}</option>
                                </select>
                            </div>
                            <div class="button-group">
                                <button id="resetBtn">${t('reset')}</button>
                                <button id="cancelBtn">${t('cancel')}</button>
                                <button id="confirmBtn">${t('confirm')}</button>
                            </div>
                        </div>
                        <div id="historyTab" class="tab ${initialTab === 'history' ? 'active' : ''}">
                            <div class="history-tabs">
                                <button class="history-tab-button" data-platform="youtube">${t('youtube')}</button>
                                <button class="history-tab-button" data-platform="bilibili">${t('bilibili')}</button>
                                <button class="history-tab-button" data-platform="vimeo">Vimeo</button>
                            </div>
                            <div class="history-content"></div>
                            <div class="button-group history-buttons">
                                <button id="historyClearBtn">${t('clear')}</button>
                            </div>
                        </div>
                        <!-- 新增channels标签页 -->
                        <div id="channelsTab" class="tab ${initialTab === 'channels' ? 'active' : ''}">
                            <div class="channels-subtabs">
                                <button class="channels-subtab-button" data-platform="youtube">${t('youtube')}</button>
                                <button class="channels-subtab-button" data-platform="bilibili">${t('bilibili')}</button>
                            </div>
                             <div id="channelsListContainer">
                                <div class="channels-header-row">
                                    <span class="channels-header-icon">${t('channelIconLabel')}</span>
                                    <span>${t('channelNameHeader')}</span>
                                    <span>${t('channelRemarkHeader')}</span>
                                    <span>${t('channelSpeedHeader')}</span>
                                    <span>${t('edit')}</span>
                                    <span>${t('delete')}</span>
                                </div>
                                <div id="channelsList"></div>
                            </div>
                            <div class="button-group channels-buttons">
                                <button id="channelsClearBtn">${t('clear')}</button>
                                <button id="addChannelSpeedBtn">${t('addChannelSpeed')}</button>
                            </div>
                        </div>

                        <div id="settingsTab" class="tab ${initialTab === 'settings' ? 'active' : ''}">
                            <div class="settings-section settings-language-section">
                                <h3>${t('uiLanguage')}</h3>
                                <div class="language-options" role="radiogroup" aria-label="${t('uiLanguage')}">
                                    <label class="language-option">
                                        <input type="radio" name="languagePreference" value="auto" ${languagePreference === 'auto' ? 'checked' : ''}>
                                        <span class="language-option__text">${t('languageAuto')}</span>
                                    </label>
                                    <label class="language-option">
                                        <input type="radio" name="languagePreference" value="zh" ${languagePreference === 'zh' ? 'checked' : ''}>
                                        <span class="language-option__text">${t('languageZh')}</span>
                                    </label>
                                    <label class="language-option">
                                        <input type="radio" name="languagePreference" value="en" ${languagePreference === 'en' ? 'checked' : ''}>
                                        <span class="language-option__text">${t('languageEn')}</span>
                                    </label>
                                </div>
                            </div>
                            <div class="settings-section settings-sync-section">
                                <h3>${t('syncSettings')}</h3>
                                <div class="sync-container">
                                    <div class="sync-action-grid">
                                        <button id="exportBtn" type="button" class="sync-card sync-card--export" aria-label="${t('exportSettings')}">
                                            <span class="sync-card-icon" aria-hidden="true">📤</span>
                                            <span class="sync-card-text">
                                                <span class="sync-card-title">${t('exportSettings')}</span>
                                                <span class="sync-card-subtitle">${t('export')}</span>
                                            </span>
                                        </button>

                                        <button id="importBtn" type="button" class="sync-card sync-card--import" aria-label="${t('importSettings')}">
                                            <span class="sync-card-icon" aria-hidden="true">📥</span>
                                            <span class="sync-card-text">
                                                <span class="sync-card-title">${t('importSettings')}</span>
                                                <span class="sync-card-subtitle">${t('import')}</span>
                                            </span>
                                        </button>
                                    </div>

                                    ${syncInfoMarkup}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 如果已存在，先移除
        const existingWindow = document.getElementById('customSpeedWindow');
        if (existingWindow) {
            existingWindow.remove();
        }

        const div = document.createElement('div');
        div.innerHTML = windowHtml;

        // 确保元素先添加到DOM
        document.body.appendChild(div);

        // 获取必要的DOM元素
        const overlay = div.querySelector('.overlay');
        const content = div.querySelector('.content');
        const closeButton = div.querySelector('.close-button');
        const speedList = div.querySelector('#speedList');
        const newLabelInput = div.querySelector('#newLabelInput');
        const newSpeedInput = div.querySelector('#newSpeedInput');
        const addSpeedBtn = div.querySelector('#addSpeedBtn');
        const resetBtn = div.querySelector('#resetBtn');
        const cancelBtn = div.querySelector('#cancelBtn');
        const confirmBtn = div.querySelector('#confirmBtn');
        const buttonOrderSelect = div.querySelector('#buttonOrder');

        // 获取频道速度相关元素
        const channelsTab = div.querySelector('#channelsTab');
        const channelsList = div.querySelector('#channelsList');
        const addChannelSpeedBtn = div.querySelector('#addChannelSpeedBtn');
        const channelsClearBtn = div.querySelector('#channelsClearBtn');
        const channelsSubtabs = div.querySelectorAll('.channels-subtab-button');

        // 获取设置相关元素
        const settingsTab = div.querySelector('#settingsTab');
        const syncSection = div.querySelector('.settings-sync-section');
        const languagePreferenceInputs = div.querySelectorAll('input[name="languagePreference"]');

        // 获取历史记录相关元素
        const historyTab = div.querySelector('#historyTab');
        const historyTabButtons = div.querySelectorAll('.history-tab-button');
        const historyContent = div.querySelector('.history-content');
        const historyClearBtn = div.querySelector('#historyClearBtn');

        // 检查必要元素是否存在
        if (!speedList || !content || !buttonOrderSelect || !channelsList || !syncSection || languagePreferenceInputs.length === 0) {
            console.error('Speed list or other essential elements not found in speed settings window');
            showToast(t('errorInitializing'));
            closeWindow(div);
            return;
        }

        const escapeHtml = (value) => {
            const str = String(value ?? '');
            const entityMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
            return str.replace(/[&<>"']/g, char => entityMap[char]);
        };

        const normalizeIconUrl = (value) => typeof value === 'string' ? value.trim() : '';

        const isValidIconUrl = (value) => {
            const icon = normalizeIconUrl(value);
            if (!icon) return true;
            return /^(https?:|data:)/i.test(icon);
        };

        const resolveChannelIcon = (platform, iconUrl) => {
            const cleaned = normalizeIconUrl(iconUrl);
            if (cleaned) {
                return {
                    markup: `<img src="${escapeHtml(cleaned)}" alt="" class="channel-icon__img">`,
                    isCustom: true
                };
            }
            return {
                markup: CHANNEL_PLATFORM_ICONS[platform] || CHANNEL_PLATFORM_ICONS.default,
                isCustom: false
            };
        };

        const updateIconPreview = (previewElement, iconValue, platform) => {
            if (!previewElement) return;
            const labelMarkup = `<span class="channel-icon-preview__label">${escapeHtml(t('iconPreview'))}</span>`;
            const trimmed = normalizeIconUrl(iconValue);
            if (trimmed && !isValidIconUrl(trimmed)) {
                previewElement.innerHTML = `${labelMarkup}<span class="channel-icon-preview__message">${escapeHtml(t('invalidIconUrl'))}</span>`;
                previewElement.classList.add('channel-icon-preview--invalid');
                return;
            }
            previewElement.classList.remove('channel-icon-preview--invalid');
            const { markup, isCustom } = resolveChannelIcon(platform, trimmed);
            const customClass = isCustom ? ' channel-icon--custom' : '';
            const platformAttr = isCustom ? '' : ` data-platform="${platform}"`;
            previewElement.innerHTML = `${labelMarkup}<span class="channel-icon-preview__icon channel-icon${customClass}"${platformAttr} aria-hidden="true">${markup}</span>`;
        };

        try {
            let currentSpeeds = GM_getValue('customSpeeds', [
                ["2x", 2],
                ["1.5x", 1.5],
                ["1.25x", 1.25],
                ["1.2x", 1.2],
                ["1.1x", 1.1],
                ["1.05x", 1.05],
                ["Normal", 1],
                ["0.95x", 0.95],
                ["0.9x", 0.9],
                ["0.85x", 0.85],
                ["0.8x", 0.8],
                ["0.78x", 0.78]
            ]);

            let currentOrder = GM_getValue('buttonOrder', 'desc');
            buttonOrderSelect.value = currentOrder;

            // 初始化速度列表
            updateSpeedList();

            // 初始化频道速度列表
            updateChannelSpeedsList('youtube'); // 默认显示YouTube

            // 初始化频道子Tab自动选择
            autoSelectChannelsSubtab();

            // 初始化历史记录
            loadHistoryContent();

            // 初始化 importInput 并确保事件监听器只绑定一次
            let importInput = div.querySelector('#importInput');
            if (!importInput) {
                importInput = document.createElement('input');
                importInput.type = 'file';
                importInput.accept = 'application/json';
                importInput.id = 'importInput';
                importInput.style.display = 'none';
                div.appendChild(importInput);

                importInput.addEventListener('change', (e) => {
                    if (e.target.files.length > 0) {
                        handleImport(e.target.files[0]);
                        // 清除value以允许重复选择同一文件
                        e.target.value = '';
                    }
                });
            }

            const importBtn = div.querySelector('#importBtn');
            if (importBtn && importInput) {
                if (importBtn._importHandler) {
                    importBtn.removeEventListener('click', importBtn._importHandler);
                }
                importBtn._importHandler = () => { importInput.click(); };
                importBtn.addEventListener('click', importBtn._importHandler);
            }

            if (languagePreferenceInputs && languagePreferenceInputs.length) {
                languagePreferenceInputs.forEach(input => {
                    input.addEventListener('change', () => {
                        if (!input.checked) return;
                        const newPreference = input.value;
                        const activeTabButton = div.querySelector('.tab-button.active');
                        const activeTabName = activeTabButton ? activeTabButton.getAttribute('data-tab') : 'settings';
                        const previousScroll = content ? content.scrollTop : 0;
                        setLanguagePreference(newPreference);
                        showToast(t('settingsSaved'));
                        closeWindow(div);
                        createCustomSpeedWindow(activeTabName);
                        const newContent = document.querySelector('#customSpeedWindow .content');
                        if (newContent) {
                            newContent.scrollTop = previousScroll;
                        }
                    });
                });
            }

            // 更新速度列表函数
            function updateSpeedList() {
                if (!speedList) {
                    console.error('Speed list element not found');
                    return;
                }

                try {
                    speedList.innerHTML = '';
                    currentSpeeds.forEach((speed, index) => {
                        const speedItem = document.createElement("div");
                        speedItem.className = 'speed-item';
                        speedItem.innerHTML = `
                            <span>${speed[0]}</span>
                            <span>${speed[1]}</span>
                            <button class="delete-button" aria-label="${t('delete')}" title="${t('delete')}" data-index="${index}">🗑️</button>
                        `;
                        speedList.appendChild(speedItem);
                    });

                    const removeButtons = speedList.querySelectorAll('.delete-button');
                    removeButtons.forEach(btn => {
                        btn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            const index = parseInt(this.getAttribute('data-index'));
                            if (!isNaN(index) && index >= 0 && index < currentSpeeds.length) {
                                currentSpeeds.splice(index, 1);
                                updateSpeedList();
                                // Apply settings change
                                applySettingsChange();
                            }
                        });
                    });
                } catch (error) {
                    console.error('Error updating speed list:', error);
                    showToast(t('errorUpdatingList'));
                }
            }

            // 排序速度函数
            function sortSpeeds() {
                const order = buttonOrderSelect.value;
                if (order === 'desc') {
                    currentSpeeds.sort((a, b) => b[1] - a[1]);
                } else {
                    currentSpeeds.sort((a, b) => a[1] - b[1]);
                }
                updateSpeedList();
            }

            // 加载历史内容
            function loadHistoryContent() {
                const history = GM_getValue(HISTORY_KEY, {});
                const activeHistoryButton = div.querySelector('.history-tab-button.active');
                const platform = activeHistoryButton ? activeHistoryButton.getAttribute('data-platform') : 'youtube';
                const items = history[platform] || [];

                // 获取当前视频标识符
                const currentVideoId = getVideoIdentifier();

                historyContent.innerHTML = items.length ? items.map(item => {
                    const isCurrentVideo = item.identifier === currentVideoId;
                    return `
                        <div class="history-item ${isCurrentVideo ? 'current-video' : ''}">
                            <div class="history-item-title" title="${item.title}">
                                <a href="${item.url}" target="_blank">${item.title}</a>
                            </div>
                            <div class="history-item-speed">${item.speed}x</div>
                            <button class="delete-button history-item-delete" aria-label="${t('delete')}" title="${t('delete')}" data-platform="${platform}"
                                    data-id="${item.identifier}">🗑️</button>
                        </div>
                    `;
                }).join('') : `<div class="no-history">${t('noHistory')}</div>`;

                const deleteButtons = historyContent.querySelectorAll('.history-item-delete');
                deleteButtons.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const platform = e.target.getAttribute('data-platform');
                        const identifier = e.target.getAttribute('data-id');
                        deleteVideoSpeed(platform, identifier);
                        loadHistoryContent();
                        // 修复点：删除视频速度后，立即重新初始化，确保当前视频速度回退
                        applySettingsChange();  // <--- 新增
                    });
                });
            }

            // 更新频道速度列表
            function updateChannelSpeedsList(platform) {
                if (!channelsList) {
                    console.error('Channels list element not found');
                    return;
                }

                try {
                    const channelSpeeds = GM_getValue(CHANNEL_DEFAULT_SPEEDS_KEY, {});
                    channelsList.innerHTML = '';
                    if (platform !== 'youtube' && platform !== 'bilibili') {
                        channelsList.innerHTML = `<div class="no-channel-speeds">${t('noChannelSpeeds')}</div>`;
                        return;
                    }
                            if (channelSpeeds[platform] && Object.keys(channelSpeeds[platform]).length > 0) {
                                Object.entries(channelSpeeds[platform]).forEach(([channelId, data]) => {
                                    const channelItem = document.createElement('div');
                                    channelItem.className = 'channel-item';

                                    let displayChannelId = channelId;
                                    if (platform === 'bilibili') {
                                        displayChannelId = channelId.startsWith('bilibili_') ? channelId.slice('bilibili_'.length) : channelId;
                                    } else if (platform === 'youtube') {
                                        displayChannelId = channelId.startsWith('@') ? channelId.slice(1) : channelId;
                                    }

                                    const nameForDisplay = data.name || displayChannelId;
                                    const remarkForDisplay = data.remark || '';
                                    const iconUrl = normalizeIconUrl(data.iconUrl);
                                    const { markup: iconMarkup, isCustom } = resolveChannelIcon(platform, iconUrl);
                                    const customAttr = isCustom ? ' data-custom="true"' : '';
                                    const customClass = isCustom ? ' channel-icon--custom' : '';
                                    const safeName = escapeHtml(nameForDisplay);
                                    const safeRemark = escapeHtml(remarkForDisplay);
                                    const nameTitleAttr = nameForDisplay ? ` title="${escapeHtml(nameForDisplay)}"` : '';
                                    const remarkTitleAttr = remarkForDisplay ? ` title="${escapeHtml(remarkForDisplay)}"` : '';
                                    const iconDataAttr = customAttr;

                                    channelItem.innerHTML = `
                                <span class="channel-icon-cell">
                                    <span class="channel-icon${customClass}" data-platform="${platform}"${iconDataAttr} aria-hidden="true">${iconMarkup}</span>
                                </span>
                                <span class="channel-name"${nameTitleAttr}>${safeName}</span>
                                <span class="channel-remark"${remarkTitleAttr}>${safeRemark}</span>
                                <span class="channel-speed">${data.speed}x</span>
                                <button class="editChannelBtn" aria-label="${t('edit')}" title="${t('edit')}" data-platform="${platform}" data-channel="${channelId}">✍️</button>
                                <button class="delete-button removeChannelBtn" aria-label="${t('delete')}" title="${t('delete')}" data-platform="${platform}" data-channel="${channelId}">🗑️</button>
                            `;
                            channelsList.appendChild(channelItem);
                        });
                    }

                    if (!channelSpeeds[platform] || Object.keys(channelSpeeds[platform]).length === 0) {
                        channelsList.innerHTML = `<div class="no-channel-speeds">${t('noChannelSpeeds')}</div>`;
                        return;
                    }

                    const removeChannelButtons = channelsList.querySelectorAll('.removeChannelBtn');
                    removeChannelButtons.forEach(btn => {
                        btn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            const platform = this.getAttribute('data-platform');
                            const channelId = this.getAttribute('data-channel');
                            if (platform && channelId) {
                                if (!confirm(t('confirmRemoveChannelSpeed'))) {
                                    return;
                                }
                                deleteChannelDefaultSpeed(platform, channelId);
                                updateChannelSpeedsList(platform);
                                showToast(t('channelSpeedDeleted'));
                                // 修复点：删除频道速度后，立即重新初始化，确保当前视频速度回退
                                applySettingsChange();  // <--- 新增
                            }
                        });
                    });

                    const editChannelButtons = channelsList.querySelectorAll('.editChannelBtn');
                    editChannelButtons.forEach(btn => {
                        btn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            const platform = this.getAttribute('data-platform');
                            const channelId = this.getAttribute('data-channel');
                            if (platform && channelId) {
                                openEditChannelForm(platform, channelId);
                            }
                        });
                    });
                } catch (error) {
                    console.error('Error updating channel speeds list:', error);
                    showToast(t('errorUpdatingList'));
                }
            }

            // 排序频道速度
            function sortChannels() {
                const channelSpeeds = GM_getValue(CHANNEL_DEFAULT_SPEEDS_KEY, {});
                for (let platform in channelSpeeds) {
                    const sortedChannels = Object.keys(channelSpeeds[platform]).sort().reduce((obj, key) => {
                        obj[key] = channelSpeeds[platform][key];
                        return obj;
                    }, {});
                    channelSpeeds[platform] = sortedChannels;
                }
                GM_setValue(CHANNEL_DEFAULT_SPEEDS_KEY, channelSpeeds);
                const activePlatform = div.querySelector('.channels-subtab-button.active').getAttribute('data-platform');
                updateChannelSpeedsList(activePlatform);
            }

            // 加载频道内容
            function loadChannelsContent(platform) {
                updateChannelSpeedsList(platform);
            }

            // 自动选择频道子Tab
            function autoSelectChannelsSubtab() {
                const currentPlatform = getPlatform();
                channelsSubtabs.forEach(button => {
                    const plat = button.getAttribute('data-platform');
                    if (plat === currentPlatform) {
                        button.classList.add('active');
                    } else {
                        button.classList.remove('active');
                    }
                });
                loadChannelsContent(currentPlatform);
            }

            // 标签页切换逻辑
            const tabButtons = div.querySelectorAll('.tab-button');
            const tabs = div.querySelectorAll('.tab');

            function setHistorySubtabToCurrentPlatform() {
                const currentPlatform = getPlatform();
                historyTabButtons.forEach(button => {
                    if (button.getAttribute('data-platform') === currentPlatform) {
                        button.classList.add('active');
                    } else {
                        button.classList.remove('active');
                    }
                });
                loadHistoryContent();
            }

            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabs.forEach(tab => tab.classList.remove('active'));
                    button.classList.add('active');
                    const tabName = button.getAttribute('data-tab');
                    div.querySelector(`#${tabName}Tab`).classList.add('active');
                    if (tabName === 'history') {
                        setHistorySubtabToCurrentPlatform();
                    }
                    if (tabName === 'channels') {
                        autoSelectChannelsSubtab();
                    }
                    if (tabName === 'settings') {
                        loadSyncContent();
                    }
                });
            });

            // 历史记录子标签页切换逻辑
            historyTabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    historyTabButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    loadHistoryContent();
                });
            });

            // 频道子标签页切换逻辑
            channelsSubtabs.forEach(button => {
                button.addEventListener('click', () => {
                    channelsSubtabs.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    const platform = button.getAttribute('data-platform');
                    loadChannelSpeeds(platform);
                });
            });

            addChannelSpeedBtn.addEventListener('click', () => {
                const platform = div.querySelector('.channels-subtab-button.active').getAttribute('data-platform');
                let channelId = null;
                let channelName = '';
                if(platform === 'youtube'){
                    channelId = getCurrentYouTubeChannelId();
                    channelName = getCurrentYouTubeChannelName();
                } else if(platform === 'bilibili'){
                    channelId = getCurrentBilibiliChannelId();
                    channelName = getCurrentBilibiliChannelName();
                }
                if (!channelId) {
                    showToast(t('noCurrentChannel'));
                    return;
                }
                const existingSpeeds = getChannelDefaultSpeeds();
                if (existingSpeeds[platform] && existingSpeeds[platform][channelId]) {
                    openEditChannelForm(platform, channelId);
                    return;
                }
                openAddChannelForm(platform, channelId, channelName);
            });

            channelsClearBtn.addEventListener('click', function() {
                if (confirm(t('confirmReset'))) {
                    GM_setValue(CHANNEL_DEFAULT_SPEEDS_KEY, {});
                    const activePlatform = div.querySelector('.channels-subtab-button.active').getAttribute('data-platform');
                    updateChannelSpeedsList(activePlatform);
                    showToast(t('historyCleared'));
                    applySettingsChange();
                }
            });

            function sortChannelSpeeds() {
                sortChannels();
            }

            function loadChannelSpeeds(platform) {
                updateChannelSpeedsList(platform);
            }

            buttonOrderSelect.addEventListener('change', () => {
                sortSpeeds();
                applySettingsChange();
            });

            addSpeedBtn.addEventListener('click', function() {
                const newLabel = newLabelInput.value.trim();
                const newSpeed = parseFloat(newSpeedInput.value);
                if (!isNaN(newSpeed) && newSpeed > 0) {
                    const label = newLabel || `${newSpeed}x`;
                    const existingIndex = currentSpeeds.findIndex(item => item[1] === newSpeed);
                    if (existingIndex !== -1) {
                        currentSpeeds[existingIndex][0] = label;
                        showToast(t('speedExists'));
                    } else {
                        currentSpeeds.push([label, newSpeed]);
                        showToast(t('settingsSaved'));
                    }
                    sortSpeeds();
                    newLabelInput.value = '';
                    newSpeedInput.value = '';
                    applySettingsChange();
                } else {
                    showToast(t('invalidInput'));
                }
            });

            resetBtn.addEventListener('click', function() {
                currentSpeeds = [
                    ["2x", 2],
                    ["1.5x", 1.5],
                    ["1.25x", 1.25],
                    ["1.2x", 1.2],
                    ["1.1x", 1.1],
                    ["1.05x", 1.05],
                    ["Normal", 1],
                    ["0.95x", 0.95],
                    ["0.9x", 0.9],
                    ["0.85x", 0.85],
                    ["0.8x", 0.8],
                    ["0.78x", 0.78]
                ];
                buttonOrderSelect.value = 'desc';
                sortSpeeds();
                showToast(t('settingsSaved'));
                applySettingsChange();
            });

            cancelBtn.addEventListener('click', function() {
                closeWindow(div);
            });

            confirmBtn.addEventListener('click', function() {
                GM_setValue('customSpeeds', currentSpeeds);
                GM_setValue('buttonOrder', buttonOrderSelect.value);
                showToast(t('settingsSaved'));
                closeWindow(div);
                if (vsb_handle) {
                    vsb_handle.kill();
                    loader_loop();
                }
                triggerPlaybackInitialization('settings-confirm');
            });

            if (historyClearBtn) {
                historyClearBtn.addEventListener('click', function() {
                    if (confirm(t('confirmReset'))) {
                        GM_setValue(HISTORY_KEY, {});
                        loadHistoryContent();
                        showToast(t('historyCleared'));
                    }
                });
            }

            function speedChangeHandler(event) {
                if (div.querySelector('#historyTab').classList.contains('active')) {
                    loadHistoryContent();
                }
                if (div.querySelector('#channelsTab').classList.contains('active')) {
                    const activePlatform = div.querySelector('.channels-subtab-button.active').getAttribute('data-platform');
                    updateChannelSpeedsList(activePlatform);
                }
                if (settingsTab && settingsTab.classList.contains('active')) {
                    loadSyncContent();
                }
            }

            document.addEventListener('videoSpeedChanged', speedChangeHandler);

            const originalCloseWindow = closeWindow;
            closeWindow = (div) => {
                document.removeEventListener('videoSpeedChanged', speedChangeHandler);
                closeWindow = originalCloseWindow;
                originalCloseWindow(div);
            };

            overlay.addEventListener("click", function() {
                closeWindow(div);
            });

            if (closeButton) {
                closeButton.addEventListener("click", function() {
                    closeWindow(div);
                });
            }

            document.body.style.pointerEvents = 'none';
            content.style.pointerEvents = 'auto';

            if (initialTab === 'history') {
                setHistorySubtabToCurrentPlatform();
            }
            if (initialTab === 'channels') {
                autoSelectChannelsSubtab();
            }
            if (initialTab === 'settings') {
                loadSyncContent();
            }

            function loadSyncContent() {
                const syncSectionElement = syncSection || div.querySelector('.settings-sync-section');
                if (!syncSectionElement) {
                    return;
                }
                const infoBox = syncSectionElement.querySelector('.info-box p');
                if (infoBox) {
                    infoBox.textContent = t('infoSyncBilibili');
                }

                const exportBtn = div.querySelector('#exportBtn');
                const importBtn = div.querySelector('#importBtn');
                const importInputLocal = div.querySelector('#importInput');

                if (exportBtn) {
                    exportBtn.addEventListener('click', handleExport);
                }

                if (importBtn && importInputLocal) {
                    // 已在上面绑定事件监听器
                }
            }

            function handleExport() {
                const customSpeeds = GM_getValue('customSpeeds', []);
                const buttonOrder = GM_getValue('buttonOrder', 'desc');
                const history = GM_getValue(HISTORY_KEY, {});
                const channelDefaultSpeeds = GM_getValue(CHANNEL_DEFAULT_SPEEDS_KEY, {});

                if ((!Array.isArray(customSpeeds) || !customSpeeds.length) && Object.keys(channelDefaultSpeeds).length === 0) {
                    showToast(t('noSettingsFound'));
                    return;
                }

                const exportData = {
                    version: "1.36",
                    timestamp: new Date().toISOString(),
                    settings: {
                        customSpeeds: customSpeeds.map(speed =>
                            Array.isArray(speed) && speed.length === 2 ?
                            [String(speed[0]), Number(speed[1])] :
                            ["1x", 1]
                        ),
                        buttonOrder: ['asc', 'desc'].includes(buttonOrder) ? buttonOrder : 'desc',
                        history: history || {},
                        channelDefaultSpeeds: channelDefaultSpeeds || {}
                    }
                };

                const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                    type: 'application/json'
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                const date = new Date().toISOString().split('T')[0];
                a.href = url;
                a.download = `video_speed_buttons_${date}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                showToast(t('exportSuccess'));
            }

            function handleImport(file) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    try {
                        const importData = JSON.parse(e.target.result);
                        if (!importData || typeof importData !== 'object') {
                            throw new Error('Invalid file format');
                        }

                        if (!importData.settings) {
                            throw new Error('Invalid settings data');
                        }

                        if (importData.settings.customSpeeds &&
                            (!Array.isArray(importData.settings.customSpeeds) || !importData.settings.customSpeeds.length ||
                            !importData.settings.customSpeeds.every(speed =>
                                Array.isArray(speed) &&
                                speed.length === 2 &&
                                typeof speed[0] === 'string' &&
                                !isNaN(Number(speed[1])) &&
                                Number(speed[1]) > 0
                            ))) {
                            throw new Error('Invalid customSpeeds data');
                        }

                        if (importData.settings.channelDefaultSpeeds &&
                            !validateChannelSpeedData(importData.settings.channelDefaultSpeeds)) {
                            throw new Error('Invalid channelDefaultSpeeds data');
                        }

                        if (importData.settings.history &&
                            typeof importData.settings.history !== 'object') {
                            throw new Error('Invalid history data');
                        }

                        if (importData.settings.buttonOrder &&
                            !['asc', 'desc'].includes(importData.settings.buttonOrder)) {
                            importData.settings.buttonOrder = 'desc';
                        }

                        if (confirm(t('confirmImportSettings'))) {
                            if (importData.settings.customSpeeds) {
                                const normalizedSpeeds = importData.settings.customSpeeds.map(speed => [
                                    String(speed[0]),
                                    Number(speed[1])
                                ]);
                                GM_setValue('customSpeeds', normalizedSpeeds);
                            }

                            if (importData.settings.buttonOrder) {
                                GM_setValue('buttonOrder', importData.settings.buttonOrder);
                            }

                            if (importData.settings.history) {
                                GM_setValue(HISTORY_KEY, importData.settings.history);
                            }

                            if (importData.settings.channelDefaultSpeeds) {
                                GM_setValue(CHANNEL_DEFAULT_SPEEDS_KEY, importData.settings.channelDefaultSpeeds);
                            }

                            showToast(t('importSuccess'));

                            if (vsb_handle) {
                                vsb_handle.kill();
                            }
                            setTimeout(() => {
                                loader_loop();
                            }, 100);
                        }
                    } catch (error) {
                        console.error('Import error:', error);
                        showToast(t('importError'));
                    }
                };

                reader.onerror = function() {
                    showToast(t('importError'));
                };

                reader.readAsText(file);
            }

            function openAddChannelForm(platform, channelId, channelName) {
                const formOverlay = document.createElement('div');
                formOverlay.className = 'form-overlay';

                const formContainer = document.createElement('div');
                formContainer.className = 'form-container';

                let displayChannelId = platform === 'bilibili' ? channelId.slice('bilibili_'.length) : channelId;
                const heading = platform === 'youtube' ? t('addYouTubeChannelSpeed') : t('addBilibiliChannelSpeed');
                const colon = detectLanguage() === 'zh' ? '：' : ':';
                const displayChannelName = channelName || displayChannelId;
                let defaultIcon = '';
                if (platform === 'youtube') {
                    const detectedIcon = getCurrentYouTubeChannelIconUrl();
                    if (detectedIcon && isValidIconUrl(detectedIcon)) {
                        defaultIcon = normalizeIconUrl(detectedIcon);
                    }
                } else if (platform === 'bilibili') {
                    const detectedIcon = getCurrentBilibiliChannelIconUrl();
                    if (detectedIcon && isValidIconUrl(detectedIcon)) {
                        defaultIcon = normalizeIconUrl(detectedIcon);
                    }
                }
                formContainer.innerHTML = `
                    <h3>${escapeHtml(heading)}</h3>
                    <p><strong>${escapeHtml(t('currentChannel'))}${colon}</strong> <span>${escapeHtml(displayChannelName)}</span> (${escapeHtml(displayChannelId)})</p>
                    <label for="addRemarkInput">${t('remark')}</label>
                    <input type="text" id="addRemarkInput" placeholder="${t('remark')}" aria-label="${t('remark')}" value="${escapeHtml(channelName)}">
                    <label for="addIconInput">${t('iconUrl')}</label>
                    <input type="text" id="addIconInput" placeholder="${t('iconUrlPlaceholder')}" aria-label="${t('iconUrl')}" value="${escapeHtml(defaultIcon)}">
                    <div class="channel-icon-preview" id="addIconPreview" aria-live="polite"></div>
                    <label for="addSpeedInput">${t('channelSpeed')}:</label>
                    <input type="number" step="0.01" id="addSpeedInput" placeholder="${t('channelSpeed')}" aria-label="${t('channelSpeed')}" value="1">
                    <div class="form-buttons">
                        <button id="cancelAddBtn">${t('cancelEdit')}</button>
                        <button id="saveAddBtn">${t('save')}</button>
                    </div>
                `;

                formOverlay.appendChild(formContainer);
                div.querySelector('.content').appendChild(formOverlay);

                const addSpeedInput = formContainer.querySelector('#addSpeedInput');
                const addRemarkInput = formContainer.querySelector('#addRemarkInput');
                const addIconInput = formContainer.querySelector('#addIconInput');
                const addIconPreview = formContainer.querySelector('#addIconPreview');
                const saveAddBtn = formContainer.querySelector('#saveAddBtn');
                const cancelAddBtn = formContainer.querySelector('#cancelAddBtn');

                if (defaultIcon) {
                    addIconInput.value = defaultIcon;
                }

                const refreshAddPreview = () => updateIconPreview(addIconPreview, addIconInput.value, platform);
                refreshAddPreview();
                addIconInput.addEventListener('input', refreshAddPreview);

                saveAddBtn.addEventListener('click', () => {
                    const speed = parseFloat(addSpeedInput.value);
                    const remark = addRemarkInput.value.trim();
                    const icon = normalizeIconUrl(addIconInput.value);
                    if (!isNaN(speed) && speed > 0) {
                        if (!isValidIconUrl(icon)) {
                            showToast(t('invalidIconUrl'));
                            return;
                        }
                        setChannelDefaultSpeed(platform, channelId, channelName, remark || channelName, speed, icon);
                        const activePlatform = div.querySelector('.channels-subtab-button.active').getAttribute('data-platform');
                        updateChannelSpeedsList(activePlatform);
                        showToast(t('channelSpeedSet'));
                        formOverlay.remove();
                        applySettingsChange();
                    } else {
                        showToast(t('invalidInput'));
                    }
                });

                cancelAddBtn.addEventListener('click', () => {
                    formOverlay.remove();
                });
            }

            function openEditChannelForm(platform, channelId) {
                const currentSpeed = getChannelDefaultSpeed(platform, channelId);
                const currentRemark = getChannelRemark(platform, channelId);
                let currentIcon = normalizeIconUrl(getChannelIconUrl(platform, channelId));
                const currentName = getChannelName(platform, channelId);
                if (!currentIcon) {
                    let detectedIcon = '';
                    if (platform === 'youtube') {
                        detectedIcon = getCurrentYouTubeChannelIconUrl();
                    } else if (platform === 'bilibili') {
                        detectedIcon = getCurrentBilibiliChannelIconUrl();
                    }
                    if (detectedIcon && isValidIconUrl(detectedIcon)) {
                        currentIcon = normalizeIconUrl(detectedIcon);
                    }
                }
                const formOverlay = document.createElement('div');
                formOverlay.className = 'form-overlay';

                const formContainer = document.createElement('div');
                formContainer.className = 'form-container';

                let displayChannelId = platform === 'bilibili' ? channelId.slice('bilibili_'.length) : channelId;
                const heading = platform === 'youtube' ? t('editYouTubeChannelSpeed') : t('editBilibiliChannelSpeed');
                const colon = detectLanguage() === 'zh' ? '：' : ':';
                const displayChannelName = currentName || displayChannelId;
                formContainer.innerHTML = `
                    <h3>${escapeHtml(heading)}</h3>
                    <p><strong>${escapeHtml(t('currentChannel'))}${colon}</strong> <span>${escapeHtml(displayChannelName)}</span> (${escapeHtml(displayChannelId)})</p>
                    <label for="editRemarkInput">${t('remark')}</label>
                    <input type="text" id="editRemarkInput" placeholder="${t('remark')}" aria-label="${t('remark')}" value="${escapeHtml(currentRemark)}">
                    <label for="editIconInput">${t('iconUrl')}</label>
                    <input type="text" id="editIconInput" placeholder="${t('iconUrlPlaceholder')}" aria-label="${t('iconUrl')}" value="${escapeHtml(currentIcon)}">
                    <div class="channel-icon-preview" id="editIconPreview" aria-live="polite"></div>
                    <label for="editSpeedInput">${t('channelSpeed')}:</label>
                    <input type="number" step="0.01" id="editSpeedInput" value="${currentSpeed}" aria-label="${t('channelSpeed')}">
                    <div class="form-buttons">
                        <button id="cancelEditBtn">${t('cancelEdit')}</button>
                        <button id="saveEditBtn">${t('save')}</button>
                    </div>
                `;

                formOverlay.appendChild(formContainer);
                div.querySelector('.content').appendChild(formOverlay);

                const editSpeedInput = formContainer.querySelector('#editSpeedInput');
                const editRemarkInput = formContainer.querySelector('#editRemarkInput');
                const editIconInput = formContainer.querySelector('#editIconInput');
                const editIconPreview = formContainer.querySelector('#editIconPreview');
                const saveEditBtn = formContainer.querySelector('#saveEditBtn');
                const cancelEditBtn = formContainer.querySelector('#cancelEditBtn');

                const refreshEditPreview = () => updateIconPreview(editIconPreview, editIconInput.value, platform);
                refreshEditPreview();
                editIconInput.addEventListener('input', refreshEditPreview);

                saveEditBtn.addEventListener('click', () => {
                    const speed = parseFloat(editSpeedInput.value);
                    const remark = editRemarkInput.value.trim();
                    const icon = normalizeIconUrl(editIconInput.value);
                    if (!isNaN(speed) && speed > 0) {
                        if (!isValidIconUrl(icon)) {
                            showToast(t('invalidIconUrl'));
                            return;
                        }
                        setChannelDefaultSpeed(platform, channelId, currentName, remark || currentName, speed, icon);
                        const activePlatform = div.querySelector('.channels-subtab-button.active').getAttribute('data-platform');
                        updateChannelSpeedsList(activePlatform);
                        showToast(t('channelSpeedUpdated'));
                        formOverlay.remove();
                        applySettingsChange();
                    } else {
                        showToast(t('invalidInput'));
                    }
                });

                cancelEditBtn.addEventListener('click', () => {
                    formOverlay.remove();
                });
            }

            function applySettingsChange() {
                if (vsb_handle) {
                    vsb_handle.kill();
                    loader_loop();
                }
                triggerPlaybackInitialization('settings-apply');
            }

        } catch (error) {
            console.error('Error initializing speed settings window:', error);
            showToast(t('errorInitializing'));
            closeWindow(div);
        }
    }
    /* ---------------------------------------------------------------------- *
     * Module 10 · Menu command registration and injected styling
     * ---------------------------------------------------------------------- */
    function showSettingsWindow() {
        retryOperation(() => createCustomSpeedWindow(), 3, 100)
            .catch(error => {
                console.error('Failed to create settings window:', error);
                showToast(t('errorInitializing'));
                const retryButton = document.createElement('button');
                retryButton.textContent = t('retryButton');
                retryButton.className = 'retry-button';
                retryButton.onclick = showSettingsWindow;
                document.body.appendChild(retryButton);
            });
    }

    GM_registerMenuCommand(t('title'), function() {
        showSettingsWindow();
    });

    GM_addStyle(`
/* 主面板tab按钮容器 */
.tab-buttons {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    overflow-x: auto;
    overflow-y: visible;
    margin-bottom: 12px;
    gap: var(--tabbar-gap);
    padding: 4px 0;
    background: transparent;
    border: none;
    border-radius: 12px;
    box-shadow: none;
    backdrop-filter: none;
    width: 100%;
    max-width: 100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.tab-buttons::-webkit-scrollbar {
    display: none;
}

/* 主面板单个tab按钮 */
.tab-button {
    flex: 1 1 auto;
    padding: 6px 12px;
    border: 2px solid transparent;
    background: transparent;
    color: var(--tabbar-label-muted);
    cursor: pointer;
    position: relative;
    opacity: 1;
    transition: color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
    border-radius: 10px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-width: 60px;
    min-height: 30px;
    white-space: nowrap;
    font-size: 13px;
    line-height: 1.2;
}

.tab-button.active {
    opacity: 1;
    color: var(--tabbar-label-active);
    background: var(--tabbar-pill-active-bg);
    border-color: var(--tabbar-active-border);
}

.tab-button:hover:not(.active) {
    color: var(--tabbar-label-hover);
    background: var(--tabbar-pill-hover-bg);
    border-color: var(--tabbar-hover-border);
}

.tab-button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--tabbar-focus-ring);
}

.tab-button:active {
    transform: translateY(0) scale(0.97);
}

/* Tab图标 */
.tab-button .tab-button-icon {
    width: 16px;
    height: 16px;
    display: inline-block;
    flex-shrink: 0;
}

.tab-button .tab-button-icon path {
    transition: fill 0.25s ease, stroke 0.25s ease;
}

/* 历史记录子tab容器 */
.history-tabs {
    display: flex;
    margin: 0 0 15px;
    gap: 8px;
    padding: 4px;
    border: none;
}

/* 历史记录子tab按钮 */
.history-tab-button {
    flex: 1;
    padding: 6px 12px;
    border: 1px solid var(--border-color);
    background: transparent;
    color: var(--text-color);
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.2s ease;
    border-radius: 20px;
    font-size: 13px;
    min-width: 50px;
    text-align: center;
}

.history-tab-button.active {
    opacity: 1;
    border-color: var(--button-bg);
    background: var(--button-bg);
    color: white;
}

.history-tab-button:hover:not(.active) {
    opacity: 0.85;
    border-color: var(--button-bg);
}

/* Platform-themed history buttons */
.history-tab-button[data-platform="youtube"] {
    border-color: rgba(255, 0, 0, 0.35);
    color: #ff0000;
}

.history-tab-button[data-platform="youtube"]:hover:not(.active) {
    background: rgba(255, 0, 0, 0.12);
    border-color: #ff0000;
    color: #ff0000;
}

.history-tab-button[data-platform="youtube"].active {
    background: #ff0000;
    border-color: #ff0000;
    color: #ffffff;
}

.history-tab-button[data-platform="bilibili"] {
    border-color: rgba(0, 161, 214, 0.35);
    color: #00a1d6;
}

.history-tab-button[data-platform="bilibili"]:hover:not(.active) {
    background: rgba(0, 161, 214, 0.12);
    border-color: #00a1d6;
    color: #00a1d6;
}

.history-tab-button[data-platform="bilibili"].active {
    background: #00a1d6;
    border-color: #00a1d6;
    color: #ffffff;
}

.history-tab-button[data-platform="vimeo"] {
    border-color: rgba(26, 183, 234, 0.35);
    color: #1ab7ea;
}

.history-tab-button[data-platform="vimeo"]:hover:not(.active) {
    background: rgba(26, 183, 234, 0.12);
    border-color: #1ab7ea;
    color: #1ab7ea;
}

.history-tab-button[data-platform="vimeo"].active {
    background: #1ab7ea;
    border-color: #1ab7ea;
    color: #ffffff;
}

/* Channels subtabs */
.channels-subtab-button {
    flex: 0 0 33.33%;
    width: 33.33%;
    padding: 6px 12px;
    border: 1px solid var(--border-color);
    background: transparent;
    color: var(--text-color);
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.2s ease;
    border-radius: 20px;
    font-size: 13px;
    min-width: 50px;
    text-align: center;
    margin-bottom: 15px;
}

.channels-subtab-button.active {
    opacity: 1;
    border-color: var(--button-bg);
    background: var(--button-bg);
    color: white;
}

.channels-subtab-button:hover:not(.active) {
    opacity: 0.85;
    border-color: var(--button-bg);
}

/* Platform-themed channels subtabs */
.channels-subtab-button[data-platform="youtube"] {
    border-color: rgba(255, 0, 0, 0.35);
    color: #ff0000;
}

.channels-subtab-button[data-platform="youtube"]:hover:not(.active) {
    background: rgba(255, 0, 0, 0.12);
    border-color: #ff0000;
    color: #ff0000;
}

.channels-subtab-button[data-platform="youtube"].active {
    background: #ff0000;
    border-color: #ff0000;
    color: #ffffff;
}

.channels-subtab-button[data-platform="bilibili"] {
    border-color: rgba(0, 161, 214, 0.35);
    color: #00a1d6;
}

.channels-subtab-button[data-platform="bilibili"]:hover:not(.active) {
    background: rgba(0, 161, 214, 0.12);
    border-color: #00a1d6;
    color: #00a1d6;
}

.channels-subtab-button[data-platform="bilibili"].active {
    background: #00a1d6;
    border-color: #00a1d6;
    color: #ffffff;
}

/* Settings tab */
.settings-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background: var(--tabbar-pill-active-bg);
}

.settings-section + .settings-section {
    margin-top: 16px;
}

.settings-section h3 {
    margin: 0;
    font-size: 16px;
    color: var(--tabbar-label-active);
}

.settings-description {
    margin: 0;
    font-size: 14px;
    color: var(--tabbar-label-muted);
    line-height: 1.5;
}

.language-options {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
}

.language-option {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid var(--border-color);
    background: var(--bg-color);
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
}

.language-option:hover {
    background: var(--hover-color);
    border-color: var(--tabbar-hover-border);
}

.language-option input {
    margin: 0;
    accent-color: var(--tabbar-active-border);
}

.language-option__text {
    font-size: 14px;
    font-weight: 600;
    color: var(--tabbar-label-active);
}

.language-option input:checked + .language-option__text {
    color: var(--tabbar-active-border);
}

.language-option input:focus-visible + .language-option__text {
    outline: 2px solid var(--tabbar-active-border);
    outline-offset: 2px;
}

@media (max-width: 480px) {
    .tab-buttons {
        width: 100%;
        padding: 3px 0;
        gap: 4px;
        border-radius: 10px;
    }

    .tab-button {
        padding: 5px 8px;
        min-width: 50px;
        min-height: 28px;
        font-size: 12px;
        gap: 4px;
        border-radius: 9px;
    }

    .tab-button::before {
        font-size: 13px;
    }

    .history-tab-button {
        padding: 4px 8px;
        font-size: 12px;
        min-width: 45px;
    }

    .history-item-title {
        font-size: 16px;
        word-wrap: break-word;
        white-space: normal;
    }

    .channels-subtab-button {
        font-size: 12px;
        padding: 4px 8px;
        min-width: 45px;
    }

    .channel-item span {
        font-size: 16px;
    }

    .channel-item .channel-icon {
        background-color: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.18);
    }

    .channel-item .channel-icon[data-platform="youtube"] {
        background-color: rgba(255, 0, 0, 0.28);
        border-color: rgba(255, 84, 84, 0.55);
    }

    .channel-item .channel-icon[data-platform="bilibili"] {
        background-color: rgba(0, 161, 214, 0.28);
        border-color: rgba(88, 196, 232, 0.55);
    }

    .channel-item .channel-icon--custom,
    .channel-item .channel-icon[data-custom="true"] {
        background-color: transparent;
        border: none;
        box-shadow: none;
    }

    .settings-section {
        padding: 14px;
    }

    .language-options {
        gap: 8px;
    }

    .language-option {
        padding: 6px 8px;
    }

    .sync-container {
        gap: 14px;
    }

    .sync-action-grid {
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 10px;
    }

    .sync-card {
        padding: 10px 12px;
        gap: 8px;
    }

    .sync-card-icon {
        font-size: 18px;
    }

    .sync-card-title {
        font-size: 12px;
    }

    .sync-card-subtitle {
        font-size: 10px;
    }

    .sync-description {
        max-width: 320px;
        text-align: center;
    }

    .info-box {
        display: flex;
        align-items: center;
        gap: 8px;
        background-color: var(--hover-color);
        padding: 8px 10px;
        border-radius: 6px;
    }

    .info-icon {
        font-size: 18px;
    }

    .sync-card-text {
        align-items: flex-start;
    }
}

@media (prefers-color-scheme: dark) {
    .tab-buttons {
        background: transparent;
        border-color: transparent;
        box-shadow: none;
        backdrop-filter: none;
        overflow-y: visible;
    }

    .tab-button {
        color: var(--tabbar-label-muted);
    }

    .tab-button:hover:not(.active) {
        background: var(--tabbar-pill-hover-bg);
    }

    .tab-button.active {
        background: var(--tabbar-pill-active-bg);
        color: var(--tabbar-label-active);
    }

    .history-tab-button:not([data-platform]) {
        border-color: rgba(255, 255, 255, 0.2);
    }

    .history-tab-button:not([data-platform]).active {
        border-color: var(--button-bg);
    }

    .channel-item span {
        font-size: 16px;
    }

    .channel-item .channel-icon {
        background-color: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.18);
    }

    .channel-item .channel-icon[data-platform="youtube"] {
        background-color: rgba(255, 0, 0, 0.28);
        border-color: rgba(255, 84, 84, 0.55);
    }

    .channel-item .channel-icon[data-platform="bilibili"] {
        background-color: rgba(0, 161, 214, 0.28);
        border-color: rgba(88, 196, 232, 0.55);
    }

    .channel-item .channel-icon--custom,
    .channel-item .channel-icon[data-custom="true"] {
        background-color: transparent;
        border: none;
        box-shadow: none;
    }

    .settings-section {
        background: rgba(40, 42, 52, 0.92);
        border-color: rgba(255, 255, 255, 0.08);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
    }

    .settings-section h3 {
        color: rgba(255, 255, 255, 0.92);
    }

    .language-option {
        background: rgba(32, 34, 44, 0.92);
        border-color: rgba(255, 255, 255, 0.12);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
    }

    .language-option:hover {
        background: rgba(44, 48, 62, 0.94);
        border-color: rgba(140, 190, 255, 0.45);
    }

    .language-option input:checked + .language-option__text {
        color: rgba(160, 205, 255, 0.95);
    }

    .language-option input:focus-visible + .language-option__text {
        outline-color: rgba(140, 190, 255, 0.6);
    }

    .sync-container {
        background-color: transparent;
    }

    .sync-card {
        background-color: rgba(34, 36, 46, 0.95);
        border-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
    }

    .sync-card:hover {
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.55);
    }

    .sync-card--export {
        background: linear-gradient(135deg, rgba(66, 116, 84, 0.72), rgba(54, 90, 70, 0.6));
        border-color: rgba(118, 196, 138, 0.55);
    }

    .sync-card--export:hover {
        background: linear-gradient(135deg, rgba(74, 128, 94, 0.82), rgba(58, 98, 76, 0.7));
        border-color: rgba(138, 210, 152, 0.68);
    }

    .sync-card--import {
        background: linear-gradient(135deg, rgba(122, 88, 54, 0.72), rgba(102, 72, 46, 0.6));
        border-color: rgba(214, 166, 108, 0.55);
    }

    .sync-card--import:hover {
        background: linear-gradient(135deg, rgba(134, 98, 60, 0.82), rgba(112, 82, 52, 0.7));
        border-color: rgba(226, 180, 124, 0.68);
    }

    .sync-card-title,
    .sync-card-subtitle {
        color: rgba(255, 255, 255, 0.9);
    }

    .sync-card-subtitle {
        opacity: 0.85;
    }

    .sync-card-icon {
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.45));
    }

    .sync-description .info-box {
        background-color: rgba(255, 255, 255, 0.06);
        border-color: rgba(255, 255, 255, 0.12);
        padding: 12px 14px;
        border-radius: 10px;
    }

    .sync-description .info-box .info-icon {
        color: #ffffff;
    }
}

/* 通用根变量 */
:root {
    --bg-color: #ffffff;
    --text-color: #333333;
    --border-color: #e0e0e0;
    --hover-color: #f5f5f5;
    --tabbar-gap: 8px;
    --tabbar-rail-bg: rgba(255, 255, 255, 0.55);
    --tabbar-rail-border: rgba(0, 0, 0, 0.06);
    --tabbar-rail-shadow: 0 10px 24px rgba(15, 15, 20, 0.12);
    --tabbar-rail-backdrop: saturate(160%) blur(18px);
    --tabbar-label-muted: rgba(36, 39, 44, 0.62);
    --tabbar-label-hover: rgba(26, 28, 32, 0.82);
    --tabbar-label-active: rgba(14, 16, 20, 0.95);
    --tabbar-pill-hover-bg: rgba(255, 255, 255, 0.9);
    --tabbar-pill-active-bg: rgba(255, 255, 255, 1);
    --tabbar-hover-border: rgba(55, 132, 255, 0.25);
    --tabbar-active-border: rgba(45, 120, 255, 0.85);
    --tabbar-focus-ring: rgba(76, 175, 80, 0.18);
    --button-bg: #4CAF50;
    --button-text: white;
    --remove-button: #f44336;
}

@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: #333333;
        --text-color: #ffffff;
        --border-color: #555555;
        --hover-color: #444444;
        --tabbar-rail-bg: rgba(20, 20, 26, 0.7);
        --tabbar-rail-border: rgba(255, 255, 255, 0.08);
        --tabbar-rail-shadow: 0 18px 38px rgba(0, 0, 0, 0.6);
        --tabbar-rail-backdrop: saturate(180%) blur(20px);
        --tabbar-label-muted: rgba(255, 255, 255, 0.68);
        --tabbar-label-hover: rgba(255, 255, 255, 0.88);
        --tabbar-label-active: rgba(255, 255, 255, 0.96);
        --tabbar-pill-hover-bg: rgba(255, 255, 255, 0.08);
        --tabbar-pill-active-bg: rgba(255, 255, 255, 0.14);
        --tabbar-hover-border: rgba(120, 180, 255, 0.35);
        --tabbar-active-border: rgba(120, 185, 255, 0.85);
        --tabbar-focus-ring: rgba(79, 173, 93, 0.26);
        --button-bg: #45a049;
        --button-text: white;
        --remove-button: #d32f2f;
    }
}

.delete-button {
    background-color: transparent;
    color: inherit;
    border: none;
    padding: 2px;
    cursor: pointer;
    border-radius: 6px;
    font-size: 18px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, opacity 0.2s ease;
}

.delete-button:hover {
    opacity: 0.85;
    transform: scale(1.05);
}

.delete-button:focus-visible {
    outline: 2px solid var(--remove-button);
    outline-offset: 2px;
}

.control-buttons {
    display: inline-block;
    margin-right: 10px;
}

.control-button {
    cursor: pointer;
    margin-right: 8px;
    font-size: 16px;
    opacity: 0.7;
    transition: opacity 0.3s;
}

.control-button:hover {
    opacity: 1;
}

.toast-message {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    z-index: 10002;
    animation: fadeInOut 2s ease-in-out;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    font-size: 14px;
    min-width: 200px;
    text-align: center;
    max-width: 90%;
    word-wrap: break-word;
}

@keyframes fadeInOut {
    0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
    10% { opacity: 1; transform: translateX(-50%) translateY(0); }
    90% { opacity: 1; transform: translateX(-50%) translateY(0); }
    100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
}

.vsb-container button {
    margin-right: 5px;
    padding: 2px 5px;
    cursor: pointer;
}

#customSpeedWindow {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
}

#customSpeedWindow .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

#customSpeedWindow .content {
    background: var(--bg-color);
    color: var(--text-color);
    padding: 20px;
    border-radius: 8px;
    z-index: 10001;
    font-family: Arial, sans-serif;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
    max-width: 500px;
    width: 90%;
    position: relative;
}

#customSpeedWindow h2 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 20px;
    text-align: center;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--text-color);
    opacity: 0.7;
    transition: opacity 0.3s;
}

.close-button:hover {
    opacity: 1;
}

.tab-content {
    overflow: hidden;
}

.tab {
    display: none;
}

.tab.active {
    display: block;
}

.history-content {
    max-height: 300px;
    overflow-y: auto;
}

.history-item {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 10px;
    padding: 8px;
    border-bottom: 1px solid var(--border-color);
    align-items: center;
}

.history-item:hover {
    background-color: var(--hover-color);
}

.history-item-title {
    overflow: hidden;
    word-wrap: break-word;
    white-space: normal;
    font-size: 16px;
}

.history-item-title a {
    color: var(--text-color);
    text-decoration: none;
    display: block;
}

.history-item-title a:hover {
    text-decoration: underline;
}

.history-item-speed {
    color: var(--button-bg);
    font-weight: bold;
}

.no-history {
    text-align: center;
    padding: 20px;
    color: var(--text-color);
    opacity: 0.7;
}

#speedListHeader, #speedList {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 10px;
    align-items: center;
    margin-bottom: 15px;
    max-height: 150px;
    overflow-y: auto;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 5px;
}

#speedListHeader {
    font-weight: bold;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 5px;
    margin-bottom: 5px;
}

.speed-item {
    display: contents;
}

.speed-item span {
    padding: 5px;
    background-color: var(--hover-color);
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.input-group {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 10px;
    align-items: center;
    margin-top: 2px;
    margin-bottom: 12px;
    border-radius: 4px;
    border: none;
    padding: 0;
}

#customSpeedWindow #newLabelInput,
#customSpeedWindow #newSpeedInput,
#customSpeedWindow #addSpeedInput,
#customSpeedWindow #editSpeedInput,
#customSpeedWindow #addRemarkInput,
#customSpeedWindow #editRemarkInput {
    width: 90% !important;
    padding: 6px !important;
    border: 1px solid var(--border-color) !important;
    border-radius: 4px !important;
    font-size: 14px !important;
    background-color: var(--bg-color) !important;
    color: var(--text-color) !important;
    height: auto !important;
    line-height: normal !important;
}

#customSpeedWindow #newLabelInput::placeholder,
#customSpeedWindow #newSpeedInput::placeholder,
#customSpeedWindow #addSpeedInput::placeholder,
#customSpeedWindow #editSpeedInput::placeholder,
#customSpeedWindow #addRemarkInput::placeholder,
#customSpeedWindow #editRemarkInput::placeholder {
    color: var(--text-color) !important;
    opacity: 0.5 !important;
}

#addSpeedBtn {
    padding: 6px 10px;
    background-color: #ff9800;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    width: 100%;
}

.select-group {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
}

.select-group label {
    margin-right: 10px;
    font-size: 14px;
}

#buttonOrder {
    flex-grow: 1;
    padding: 6px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 14px;
    background-color: var(--bg-color);
    color: var(--text-color);
}

.button-group {
    display: flex;
    justify-content: space-between;
}

.button-group.history-buttons,
.button-group.channels-buttons {
    justify-content: flex-start;
}

.button-group button {
    padding: 6px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

#resetBtn {
    background-color: #6c757d;
    color: white;
}

#cancelBtn {
    background-color: var(--remove-button);
    color: white;
}

#confirmBtn {
    background-color: var(--button-bg);
    color: var(--button-text);
}

.history-buttons button,
.channels-buttons button {
    background-color: #008CBA;
    color: white;
}

.history-buttons button:hover,
.channels-buttons button:hover,
.delete-button:hover,
#addSpeedBtn:hover,
.editChannelBtn:hover,
.removeChannelBtn:hover {
    opacity: 0.9;
}

#historyClearBtn,
#channelsClearBtn {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

#channelsListContainer {
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0;
    overflow: hidden;
}

.channels-header-row {
    display: grid;
    grid-template-columns: auto 1.6fr 1.5fr 0.8fr 0.48fr 0.48fr;
    gap: 12px;
    padding: 10px 16px;
    align-items: center;
    background-color: var(--hover-color);
    border-bottom: 1px solid var(--border-color);
    font-weight: bold;
}

.channels-header-row span {
    padding: 0;
    background: none;
    border-radius: 0;
    font-size: 13px;
    color: var(--tabbar-label-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
}

.channels-header-row .channels-header-icon {
    justify-content: center;
}

.channels-header-row span:nth-child(5),
.channels-header-row span:nth-child(6) {
    justify-content: center;
}

.channel-item {
    display: grid;
    grid-template-columns: auto 1.6fr 1.5fr 0.8fr 0.48fr 0.48fr;
    gap: 12px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-color);
    align-items: center;
}

.channel-item:hover {
    background-color: var(--hover-color);
}

.channel-item .channel-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
}

.channel-item .channel-icon svg {
    width: 16px;
    height: 16px;
}

.channel-item .channel-icon__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
}

.channel-item .channel-icon[data-platform="youtube"] {
    background-color: rgba(255, 0, 0, 0.12);
    border-color: rgba(255, 0, 0, 0.28);
}

.channel-item .channel-icon[data-platform="bilibili"] {
    background-color: rgba(0, 161, 214, 0.12);
    border-color: rgba(0, 161, 214, 0.28);
}

.channel-item .channel-icon--custom,
.channel-item .channel-icon[data-custom="true"] {
    background-color: transparent;
    border: none;
    box-shadow: none;
}

.channel-item span {
    overflow: hidden;
    word-wrap: break-word;
    white-space: normal;
    font-size: 15px;
}

.channel-item .channel-icon-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    min-height: 32px;
}

.channel-item .channel-name,
.channel-item .channel-remark,
.channel-item .channel-speed {
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.channel-item button.editChannelBtn {
    background-color: transparent;
    color: #FFC107;
    border: none;
    padding: 2px;
    cursor: pointer;
    border-radius: 6px;
    font-size: 18px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, opacity 0.2s ease;
}

.channel-item button.editChannelBtn:hover {
    opacity: 0.85;
    transform: scale(1.05);
}

.channel-item button.editChannelBtn:focus-visible {
    outline: 2px solid #FFC107;
    outline-offset: 2px;
}

.channel-item .delete-button {
    justify-self: center;
}

.no-channel-speeds {
    text-align: center;
    padding: 20px;
    color: var(--text-color);
    opacity: 0.7;
}

#addChannelSpeedBtn {
    padding: 6px 10px;
    background-color: #ff9800;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-left: auto;
}

#addChannelSpeedBtn:hover {
    background-color: #ffb74d;
}

.channels-buttons {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid var(--border-color);
    width: 100%;
}

.channels-buttons button {
    padding: 6px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

/* 同步页样式修正 */
.sync-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
}

.sync-action-grid {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
}

.sync-card {
    background-color: var(--hover-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 12px 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
    text-align: left;
}

.sync-card:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.sync-card:focus-visible {
    outline: 2px solid rgba(76, 175, 80, 0.35);
    outline-offset: 2px;
}

.sync-card-icon {
    font-size: 20px;
}

.sync-card-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
}

.sync-card-title {
    font-weight: 600;
    font-size: 13px;
}

.sync-card-subtitle {
    font-size: 11px;
    opacity: 0.75;
}

.sync-card--export {
    background-color: #ecf7ed;
    border-color: #cde9d0;
}

.sync-card--export:hover {
    background-color: #ddeedf;
    border-color: #b6ddba;
}

.sync-card--import {
    background-color: #fff5e6;
    border-color: #ffe2bc;
}

.sync-card--import:hover {
    background-color: #ffe9d0;
    border-color: #ffd29a;
}

.sync-description {
    max-width: 360px;
    text-align: center;
}

.info-box {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: var(--hover-color);
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
}

.info-icon {
    font-size: 20px;
}

.form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10003;
}

.form-container {
    background: var(--bg-color);
    color: var(--text-color);
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.form-container h3 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 18px;
    text-align: center;
}

.form-container p {
    text-align: center;
    margin-bottom: 15px;
    font-size: 16px;
}

.form-container label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
}

.form-container input {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 14px;
    background-color: var(--bg-color);
    color: var(--text-color);
}

.channel-icon-preview {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    min-height: 32px;
}

.channel-icon-preview__label {
    font-size: 12px;
    color: var(--tabbar-label-muted);
    font-weight: 600;
}

.channel-icon-preview__icon {
    display: inline-flex;
}

.channel-icon-preview__message {
    font-size: 12px;
    color: var(--tabbar-label-muted);
    line-height: 1.4;
}

.channel-icon-preview--invalid .channel-icon-preview__message {
    color: var(--remove-button);
}

.form-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.form-buttons button {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

#saveAddBtn, #saveEditBtn {
    background-color: var(--button-bg);
    color: var(--button-text);
}

#cancelAddBtn, #cancelEditBtn {
    background-color: var(--remove-button);
    color: white;
}

.form-buttons button:hover {
    opacity: 0.9;
}

#customSpeedWindow h2 {
    color: var(--text-color);
}
    `);
    /* ---------------------------------------------------------------------- *
     * Module 11 · Playback initialization and enforcement helpers
     * ---------------------------------------------------------------------- */
    let playbackInitToken = 0;

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getChannelContext(platform) {
        if (platform === 'youtube') {
            return {
                platform,
                channelId: getCurrentYouTubeChannelId(),
                channelName: getCurrentYouTubeChannelName()
            };
        }
        if (platform === 'bilibili') {
            return {
                platform,
                channelId: getCurrentBilibiliChannelId(),
                channelName: getCurrentBilibiliChannelName()
            };
        }
        return { platform, channelId: null, channelName: null };
    }

    async function waitForVideoElement(initToken, { timeout = 4000, interval = 120 } = {}) {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            if (initToken !== playbackInitToken) {
                return null;
            }
            const candidate = document.querySelector("video");
            if (candidate) {
                return candidate;
            }
            await delay(interval);
        }
        return initToken === playbackInitToken ? document.querySelector("video") : null;
    }

    async function waitForChannelContext(platform, initToken, { timeout = 4500, interval = 150 } = {}) {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            if (initToken !== playbackInitToken) {
                return null;
            }
            const context = getChannelContext(platform);
            if (context.channelId) {
                return context;
            }
            await delay(interval);
        }
        if (initToken !== playbackInitToken) {
            return null;
        }
        const context = getChannelContext(platform);
        return context.channelId ? context : null;
    }

    function selectSpeedButton(rate) {
        if (!vsb_handle || !vsb_handle.buttons) return;
        let cursor = vsb_handle.buttons.head;
        while (cursor) {
            if (Math.abs(cursor.speed - rate) < 0.0001) {
                cursor.select();
                return;
            }
            cursor = cursor.next;
        }
    }

    function applyPlaybackRate(videoElement, rate, isManual) {
        if (!vsb_handle || !videoElement || typeof vsb_handle.setPlaybackRate !== 'function') return;
        vsb_handle.setPlaybackRate(videoElement, rate, isManual);
        selectSpeedButton(rate);
    }

    function resetPlaybackGuards() {
        if (!vsb_handle) return;
        if (typeof vsb_handle.detachAutoRateHandler === 'function') {
            vsb_handle.detachAutoRateHandler();
        } else if (typeof vsb_handle.bindAutoRateHandler === 'function') {
            vsb_handle.bindAutoRateHandler(null);
        }
        if (vsb_handle.enforcer_loop_iid) {
            clearInterval(vsb_handle.enforcer_loop_iid);
            vsb_handle.enforcer_loop_iid = null;
        }
    }

    async function initializePlaybackSpeedForNewVideo(reason = 'auto') {
        if (!vsb_handle) return;

        playbackInitToken += 1;
        const initToken = playbackInitToken;

        resetPlaybackGuards();

        let videoElement = (vsb_handle.playbackRate_data && vsb_handle.playbackRate_data.video) || document.querySelector("video");
        if (!videoElement) {
            videoElement = await waitForVideoElement(initToken);
        }
        if (!videoElement || initToken !== playbackInitToken) {
            return;
        }

        if (typeof vsb_handle.set_video_el === 'function') {
            vsb_handle.set_video_el(videoElement);
        }

        const platform = getPlatform();
        const historySpeed = getVideoSpeed();
        if (initToken !== playbackInitToken) return;

        if (historySpeed !== null) {
            applyPlaybackRate(videoElement, historySpeed, true);
        } else {
            applyPlaybackRate(videoElement, 1, false);
            const channelContext = await waitForChannelContext(platform, initToken);
            if (initToken !== playbackInitToken) return;

            if (channelContext && channelContext.channelId) {
                const defaultSpeed = getChannelDefaultSpeed(platform, channelContext.channelId);
                if (typeof defaultSpeed === 'number' && defaultSpeed > 0) {
                    applyPlaybackRate(videoElement, defaultSpeed, false);
                }
            }
        }

        const guardHandler = () => {
            if (initToken !== playbackInitToken) return;
            const pr = vsb_handle.playbackRate_data;
            if (!pr || pr.video !== videoElement) return;
            if (videoElement.playbackRate !== pr.rate) {
                videoElement.playbackRate = pr.rate;
            }
        };

        if (typeof vsb_handle.bindAutoRateHandler === 'function') {
            vsb_handle.bindAutoRateHandler(guardHandler);
        } else {
            videoElement.addEventListener('loadedmetadata', guardHandler);
            videoElement.addEventListener('canplay', guardHandler);
        }

        vsb_handle.enforcer_loop_iid = setInterval(function() {
            if (initToken !== playbackInitToken) return;
            let prdata = vsb_handle.playbackRate_data;
            if (prdata.video !== null && prdata.video.playbackRate !== prdata.rate) {
                prdata.video.playbackRate = prdata.rate;
            }
        }, 500);
    }

    function triggerPlaybackInitialization(reason = 'auto') {
        let maybePromise;
        try {
            maybePromise = initializePlaybackSpeedForNewVideo(reason);
            if (maybePromise && typeof maybePromise.catch === 'function') {
                maybePromise.catch(error => {
                    const message = (error && error.message) ? error.message : String(error);
                    logvsb("initializePlaybackSpeedForNewVideo", `${reason}: ${message}`, 1);
                });
            }
        } catch (error) {
            const message = (error && error.message) ? error.message : String(error);
            logvsb("initializePlaybackSpeedForNewVideo", `${reason}: ${message}`, 1);
            throw error;
        }
        return maybePromise;
    }
    /* ---------------------------------------------------------------------- *
     * Module 12 · Observers and timers that react to dynamic page changes
     * ---------------------------------------------------------------------- */
    // 设置 URL 变化检测（增加短延时，以确保新视频DOM加载完毕后再初始化）
    (function(){
        let lastUrl = location.href;
        new MutationObserver(() => {
            const url = location.href;
            if (url !== lastUrl) {
                lastUrl = url;
                logvsb("URL Change Observer", `URL changed to ${url}`);

                // 延时处理，防止DOM未准备好
                setTimeout(() => {
                    if(vsb_handle){
                        vsb_handle.kill();
                    }
                    loader_loop();
                    triggerPlaybackInitialization('url-change');
                }, 1200);
            }
        }).observe(document, {subtree: true, childList: true});
    })();

    // 初始化加载器轮询
    setInterval(function(){
        if(document.readyState === "complete")
            setTimeout(loader_loop, 1000);
    }, 1000);

    // 监控 body 变化，检测动态视频元素
    (function(){
        const targetNode = document.body;
        const config = { childList: true, subtree: true };
        const callback = function(mutationsList, observer) {
            for(const mutation of mutationsList){
                if(mutation.type === 'childList'){
                    const newVideo = document.querySelector("video");
                    const vsbContainer = document.querySelector(".vsb-container");
                    if(newVideo && vsbContainer && (!vsb_handle || vsb_handle.playbackRate_data.video !== newVideo)){
                        logvsb("MutationObserver", "New video element detected. Re-initializing speed buttons.");
                        if(vsb_handle){
                            vsb_handle.kill();
                        }
                        loader_loop();
                        triggerPlaybackInitialization('body-mutation');
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    })();

    reinitializeInterface();
})();
