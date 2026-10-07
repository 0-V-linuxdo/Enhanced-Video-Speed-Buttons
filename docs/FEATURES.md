# Enhanced Video Speed Buttons 功能规格说明

> 本文件是对 `userscript/Enhanced Video Speed Buttons.user.js` v1.0.1（[20251117]）的完整功能抽取，
> 同时也是 v2 净室重写（clean-room rewrite）的**唯一需求来源**。
> 第 1–11 章描述"应该具备的功能"；第 12 章记录旧实现中的缺陷（包括"播放进度丢失"），
> 并给出重写必须满足的正确行为；第 13 章是验收标准。
>
> 约定：`必须` = 硬性要求；`应` = 强烈建议；"旧版"指 v1.0.1 的行为。
> 带 **[兼容]** 标记的条目涉及存储格式或对外可见的接口，重写时不得改变。

---

## 1. 概述

一个用户脚本（Tampermonkey / Violentmonkey / Orion 等），在 YouTube、Bilibili、Vimeo 视频页面的标题区域上方插入一排可点击的倍速按钮，并提供：

- 一键切换播放倍速、键盘快捷键；
- 按视频记住手动选择的倍速（"视频历史"）；
- 按频道（YouTube 频道 / B 站 UP 主）设置默认倍速；
- 自定义倍速按钮列表及排序；
- 中/英文界面；
- 设置的导出 / 导入（含 iOS 分享面板支持）。

所有改动即时生效，无需刷新页面。

## 2. 脚本元数据 **[兼容]**

| 字段 | 值 |
|---|---|
| `@name` | `Enhanced Video Speed Buttons [YYYYMMDD] vX.Y.Z`（作者惯例：名称内带发布日期和版本，每次发布同步更新） |
| `@namespace` | `0_V userscripts/Enhanced Video Speed Buttons`（不得改变） |
| `@version` | `[YYYYMMDD] vX.Y.Z`，与名称一致 |
| `@description` | 英文一句话描述功能 |
| `@update-log` | 本次版本的一句话更新说明 |
| `@run-at` | `document-end` |
| `@grant` | `GM_registerMenuCommand`、`GM_getValue`、`GM_setValue`、`GM_addStyle` |
| `@match` | `*://*.youtube.com/*`、`*://youtube.com/*`、`*://*.vimeo.com/*`、`*://vimeo.com/*`、`*://*.bilibili.com/*`、`*://bilibili.com/*` |
| `@icon` | 沿用旧版的 base64 SVG（渐变圆角方块 + 白色播放三角），原样保留 |

脚本必须整体包在一个 IIFE 中并使用 `'use strict'`，不向页面泄漏全局变量。
文件头部保留"原脚本信息"注释：原名 Video Speed Buttons，作者 bradenscode，链接 https://greasyfork.org/scripts/30506，版本 1.0.10。

## 3. 平台识别与标识符

### 3.1 平台

按 `location.hostname` 判断（子串匹配）：

| hostname 包含 | 平台 id |
|---|---|
| `youtube` | `youtube` |
| `bilibili` | `bilibili` |
| `vimeo` | `vimeo` |
| 其他 | `other` |

### 3.2 视频标识符（identifier） **[兼容]**

用于"视频历史"中区分视频：

| 平台 | 规则 | 示例 |
|---|---|---|
| youtube | URL 查询参数 `v` 存在时为 `youtube_<v>` | `youtube_dQw4w9WgXcQ` |
| bilibili | `location.pathname` 匹配 `/video/(BV[\w]+)` 时为 `bilibili_<BV号>` | `bilibili_BV1xx411c7mD` |
| vimeo | `location.pathname` 匹配首个 `/(\d+)` 时为 `vimeo_<数字>` | `vimeo_76979871` |
| 其他 / 未匹配 | 完整 `location.href` | |

### 3.3 频道识别

#### YouTube 频道 id **[兼容]**

按顺序尝试，取第一个成功的结果：

1. `ytd-video-owner-renderer a.yt-simple-endpoint` 的 `href`；
2. `#channel-name a` 的 `href`；
3. `meta[itemprop="channelId"]` 的 `content`（去空白）。

对 1、2 的 `href`：匹配 `/@([A-Za-z0-9_-]+)` → 返回 `@<handle>`；否则匹配 `/channel/([A-Za-z0-9_-]+)` → 返回裸 `UC...` id。都失败返回 `null`。

- 频道名称：`ytd-channel-name #text a` 的文本（trim）。
- 频道头像 URL：依次尝试 `ytd-video-owner-renderer #avatar img`、`ytd-video-owner-renderer #img`、`#owner #avatar img`、`#owner #img`、`#channel-name #avatar img`、`#channel-name #img` 的 `src`；再退回 `link[rel="image_src"]` 的 href、`meta[property="og:image"]` 的 content；都没有返回空串。

> 重写要求（见 §12 D6）：YouTube 是单页应用，跳转到新视频后频道区 DOM 会滞后更新。读取频道信息时必须确认它属于**当前**视频（例如限定在 `ytd-watch-flexy[video-id="<当前 v>"]` 之内查找，或等待其更新），不得把上一个视频的频道当作当前频道。

#### Bilibili UP 主 id **[兼容]**

在 `.up-info-container` 内找 `a.up-avatar, a.up-name`：

1. 若有属性 `biliscope-userid` → `bilibili_<该值>`；
2. 否则从 `href` 匹配 `space\.bilibili\.com/(\d+)` → `bilibili_<uid>`；
3. 否则 `null`。

- 名称：`.up-info-container a.up-name` 的文本（trim）。
- 头像 URL：依次尝试 `.up-info-container .bili-avatar-img`、`.up-info-container .up-avatar img`、`.up-info-container img[alt][src*="hdslb.com"]`、`.up-info-container img[data-src]`、`.up-info-container .up-avatar-wrap img`，取 `src` 或 `data-src`；只接受 `http(s)://` 或 `//` 开头的值，`//` 开头的补全为 `https:`；全部失败时退回 `link[rel="Shortcut Icon"], link[rel="icon"]` 的 href；都没有返回空串。

Vimeo 与其他平台没有频道功能。

## 4. 存储（GM_getValue / GM_setValue） **[兼容]**

| 键 | 类型 | 默认值 | 含义 |
|---|---|---|---|
| `customSpeeds` | `Array<[label: string, speed: number]>` | 见下 | 倍速按钮列表 |
| `buttonOrder` | `'asc' \| 'desc'` | `'desc'` | 按钮排序方向 |
| `videoSpeedHistory` | `{ [platform]: HistoryRecord[] }` | `{}` | 按视频记住的倍速 |
| `channelDefaultSpeeds` | `{ [platform]: { [channelId]: ChannelRecord } }` | `{}` | 频道默认倍速 |
| `uiLanguagePreference` | `'auto' \| 'zh' \| 'en'` | `'auto'` | 界面语言 |

默认按钮列表：

```
[["2x",2],["1.5x",1.5],["1.25x",1.25],["1.2x",1.2],["1.1x",1.1],["1.05x",1.05],
 ["Normal",1],["0.95x",0.95],["0.9x",0.9],["0.85x",0.85],["0.8x",0.8],["0.78x",0.78]]
```

`HistoryRecord`：

```js
{
  identifier: string,   // §3.2
  title: string,        // 保存时的 document.title
  speed: number,
  timestamp: number,    // Date.now()
  url: string,          // 保存时的 location.href
  isDefault: boolean    // 旧版：false = 手动选择；true = 非手动（读取时忽略 isDefault===true 的记录）
}
```

- 每个平台的数组按最近在前排列，最多 100 条，超出截断尾部。
- 同一 identifier 只保留一条（写入前先移除旧的）。

`ChannelRecord`：

```js
{ speed: number, name: string, remark: string, iconUrl?: string }
```

### 4.1 启动时的数据自检

脚本启动时：

- 若 `customSpeeds` 不是"非空数组，且每项都是 `[string, 可转为正数的值]`"，则写回默认列表；
- 若 `channelDefaultSpeeds` 不合法（见 §10.3 的校验规则），则写回 `{}`。

### 4.2 写入原则

- 每次写入前必须重新读取最新值再修改（read-modify-write 紧邻进行），不得用很久以前读到的快照整体覆盖，以减少多标签页互相覆盖。

## 5. 倍速按钮条（Speed Bar）

### 5.1 结构与外观

一个 `div.vsb-container`，内容依次为：

1. 标签区（`span`）：三个子 `span`，文本依次为 `Video`、`Speed`、`: `，均为粗体、字号 `120%`、颜色 `grey`、右外边距 `3px`；
   - `Video` 可点击（`cursor:pointer`，悬停时 `opacity:0.8`）→ 打开设置窗口的"视频历史"标签页；
   - `Speed` 可点击（同上）→ 打开设置窗口的"速度"标签页；
   - `: ` 不可点击。
   这三个文字固定为英文，不随界面语言变化。
2. 每个倍速一个按钮：`span.speed-button`，文本为按钮标签，粗体、字号 `120%`、右外边距 `10px`、`cursor:pointer`；未选中颜色 `grey`，选中颜色 `#FF5500`。

容器样式（嵌入模式）：`border-bottom: 1px solid #ccc; margin-bottom: 10px; padding-bottom: 10px`。

### 5.2 按钮顺序

按 `buttonOrder` 对 `customSpeeds` 按速度数值排序：`desc` 从快到慢，`asc` 从慢到快。

### 5.3 放置位置

依次查找下列选择器，插入到第一个存在的元素的**最前面**（作为第一个子节点）：

| 平台 | 选择器（按优先级） |
|---|---|
| YouTube | `div#above-the-fold`、`div#title.style-scope.ytd-watch-metadata`、`div#container.ytd-video-primary-info-renderer`、`div#watch-header`、`div#watch7-headline`、`div#watch-headline-title` |
| Vimeo | `.clip_info-wrapper` |
| Bilibili | `div#viewbox_report`、`.video-info-container`、`#player_module`、`.video-info`、`.bilibili-player-area` |

（旧版把所有平台的选择器放在一个列表里按上表顺序统一查找。重写时可按平台分组，但同一平台内的优先级不变。）

在 YouTube 上，必须选择**当前可见的**观看页里的锚点（YouTube 会在 DOM 中保留隐藏的旧页面）。

若页面有主视频但找不到任何锚点：创建一个悬浮面板放置按钮条——`position:fixed; top:0; right:0; z-index:100000; background:rgba(0,0,0,0.8); color:#eeeeee; padding:10px`，此时按钮条容器去掉下边框、外边距和内边距。（旧版这一回退逻辑因 bug 从未生效，见 §12 D3。）

### 5.4 选中状态

- 按钮条始终高亮与当前生效倍速相等（误差 < 0.0001）的按钮；
- 若当前倍速不在按钮列表中，则不高亮任何按钮（旧版会残留上一次的高亮）。

### 5.5 点击按钮

把主视频的 `playbackRate` 设为该倍速，作为**手动选择**：写入视频历史（§7）、更新高亮、派发 `videoSpeedChanged` 事件（§11）。

### 5.6 生命周期

- 页面上同一时刻最多只有一个按钮条、一个控制器实例。
- 平台重新渲染导致按钮条被移除时，应把**同一个**按钮条重新挂回锚点，而不是新建控制器；重新挂载不得改变当前倍速。
- 设置变化（按钮列表、排序、导入）时，按钮条就地重建内容，当前倍速保持不变（只更新高亮）。

## 6. 键盘快捷键

在页面上按下以下按键时生效（匹配 `KeyboardEvent.key`）：

| 按键 | 功能 |
|---|---|
| `-`、`_`、`—`（U+2014） | Speed Down：切换到按钮列表中**比当前倍速慢的下一档** |
| `+`、`=` | Speed Up：切换到**比当前倍速快的下一档** |
| `*` | Reset Speed：切到速度为 `1` 的按钮；没有则切到排序后第一个按钮 |
| `?` | Show Help：在按钮条下方显示一个快捷键说明框，点击说明框关闭 |

规则：

- 按下 Ctrl / Alt / Meta 任一修饰键时不响应；
- 焦点在可输入元素中（`input`、`textarea`、`select`、任何 `contenteditable` 元素，包括 Shadow DOM 内的）时不响应；
- 已在最慢 / 最快一档时保持不变；
- 当前倍速不在列表中时，Speed Down 取小于当前值的最大档，Speed Up 取大于当前值的最小档；
- 快捷键切换等同于点击对应按钮（属于手动选择，写入历史）；
- 不调用 `preventDefault`，不影响平台自身的快捷键；
- 页面上没有主视频时不响应。

帮助框：`pre` 元素，等宽字体 `1em monospace`，`border-top:1px solid #ccc; margin-top:10px; padding-top:10px`。第一行 `Keyboard Controls (click to close)`，随后每行一个"按键 — 说明"（例如 `[ - _ — ]  Speed Down`），以纯文本写入。

## 7. 视频历史（按视频记忆倍速）

- 只有**手动选择**（点击按钮、快捷键）才写入。写入内容见 §4 的 `HistoryRecord`，`isDefault:false`，并移到该平台列表最前。
- 页面加载或切换到新视频时，若当前 identifier 有记录且 `isDefault !== true`，就恢复该倍速。恢复本身**不**改写记录（旧版会在恢复时重写记录、可能写入上一个视频的标题，见 §12 D8）。
- 在设置窗口中删除某条记录后，若删的是当前视频，当前视频立即按 §8 的优先级重新决定倍速。

## 8. 倍速决策优先级

每当"当前视频"发生变化（首次加载、站内跳转到另一个视频、平台替换了 video 元素或其媒体源）时，按以下顺序决定倍速：

1. 该视频的历史记录（`isDefault !== true`）；
2. 当前频道的默认倍速（仅 YouTube、Bilibili）；
3. `1.0`。

细则：

- 频道信息通常比视频晚出现。没有视频历史时，先应用 1.0，同时持续等待频道信息（至少 8 秒）；拿到频道 id 后若存在频道默认倍速就应用。
- 等待期间若用户手动选择了倍速，则放弃本次频道默认倍速的应用（旧版会在几秒后用频道默认值覆盖用户刚选的倍速，见 §12 D7）。
- 以上应用都是**自动**应用，不写入视频历史。
- 频道默认倍速被新增 / 修改 / 删除 / 清空，或视频历史被删除后，对当前视频重新执行本决策（若用户在当前视频上已有手动记录，则手动记录优先）。

## 9. 倍速保持（防止平台重置）

平台播放器会在加载新视频、切换清晰度、广告与正片切换等时机把 `playbackRate` 改回它自己的值。脚本必须保持自己决定的倍速，但不能和用户对抗：

- **保护窗口**：在脚本应用倍速后，以及每当主视频触发表示"媒体源刚加载/刚开始"的事件后，开启约 3 秒的保护窗口：`loadstart`、`emptied`、`loadedmetadata`、`durationchange` 每次都算；`loadeddata`、`canplay`、`playing` 只在新媒体源之后、首次开始播放之前算（它们在用户拖动进度条、暂停后继续时也会触发，不能因此吞掉用户紧接着在平台菜单里改的倍速）。窗口内若 `playbackRate` 被脚本以外的代码改变（`ratechange` 事件），立即改回脚本的倍速。
- **窗口外**：脚本以外的倍速变化视为用户通过平台自带菜单做出的选择——接受它，作为当前倍速，并更新按钮条高亮；不写入历史，不改回。
- 不得使用固定间隔的轮询强制改写 `playbackRate`（旧版每 500ms 强制一次，会让平台自带的倍速菜单失效，并在多实例泄漏后持续抢写，见 §12 D2）。

## 10. 设置窗口

### 10.1 打开方式与通用行为

- 打开方式：油猴菜单命令（标题为 `t('title')`，打开"速度"标签页）；按钮条上的 `Speed`（"速度"标签页）和 `Video`（"视频历史"标签页）。
- 结构：`#customSpeedWindow` 全屏固定层，内含半透明遮罩（`rgba(0,0,0,0.5)`）和居中的内容卡片（最大宽度 500px，宽 90%，圆角 8px，padding 20px，背景/文字随明暗主题）。内容卡片高度超出视口时必须可滚动。
- 右上角 `×` 关闭按钮；点击遮罩关闭；同一时刻只存在一个窗口（再次打开时先移除旧窗口）。
- 打开期间页面其余部分不可交互（旧版通过 `body { pointer-events:none }` 实现，卡片 `pointer-events:auto`）；关闭时必须恢复，任何异常路径下也必须恢复。
- 标题：`<h2>` = `t('title')`。
- 顶部四个标签按钮（带图标）：速度 `speeds`、视频历史 `history`、频道速度 `channels`、设置 `settings`。传入 `'sync'` 视为 `'settings'`。
- 所有用户可见文本使用 §14 的翻译表；所有来自用户或页面的文本（标题、URL、频道名、备注等）必须作为文本节点插入或经过转义，**不得**拼接进 HTML（旧版视频标题未转义，见 §12 D11）。
- 必须兼容 YouTube 的 Trusted Types 策略（YouTube 禁止直接给 `innerHTML` 赋普通字符串）。推荐全部用 DOM API 构建；SVG 图标可用 `DOMParser`（`image/svg+xml`）解析或 `createElementNS` 构建。
- 窗口打开期间，若 `videoSpeedChanged` 事件触发，刷新当前可见的历史/频道列表。

### 10.2 "速度"标签页

- 表头三列：`t('label')`、`t('speed')`、`t('delete')`。
- 列表：每行显示标签、速度数值和一个 🗑️ 删除按钮（`aria-label`/`title` = `t('delete')`）。
- 新增区：标签输入框（文本，placeholder `t('label')`）、速度输入框（数字，step 0.01，placeholder `t('speed')`）、`t('add')` 按钮。
  - 速度必须是正数，否则提示 `t('invalidInput')`；
  - 标签为空时用 `${speed}x`；
  - 已存在相同速度时只更新其标签，提示 `t('speedExists')`；否则追加，提示 `t('settingsSaved')`；
  - 之后按当前排序选择重新排序并清空输入框。
- 排序下拉：`t('buttonOrder')`（文本中含 `↔️` 图标）+ 选项 `asc` = `t('ascending')`、`desc` = `t('descending')`，初始值为已存的 `buttonOrder`；改变时立即重排草稿列表。
- 按钮：`t('reset')`（草稿恢复默认列表、排序设为 desc，提示 `t('settingsSaved')`）、`t('cancel')`（丢弃草稿并关闭窗口）、`t('confirm')`（保存草稿与排序，提示 `t('settingsSaved')`，关闭窗口，按钮条就地刷新）。
- 本页的增删、重置、排序都是**草稿**，只有点"确认"才保存。草稿编辑不得改变当前视频的倍速。
- 不允许保存空列表：删除最后一个按钮时拒绝并提示 `t('invalidInput')`（旧版允许，导致键盘操作报错）。

### 10.3 "视频历史"标签页

- 子标签：YouTube、Bilibili（`t('bilibili')`）、Vimeo，带平台主题色（YouTube `#ff0000`、Bilibili `#00a1d6`、Vimeo `#1ab7ea`；选中时实底白字，未选中为对应色描边和文字）。打开时自动选中当前平台；当前平台不在其中时选中 YouTube。
- 列表（最大高度 300px，可滚动）：每条显示标题（链接到记录的 `url`，新标签页打开，`title` 属性为完整标题，单行省略）、`${speed}x`、🗑️ 删除按钮。当前视频对应的条目加 `current-video` 类以突出显示。
- 无记录时显示 `t('noHistory')`。
- 删除单条：立即删除并刷新列表；若是当前视频则按 §8 重新决定倍速。
- `t('clear')` 按钮：`confirm(t('confirmReset'))` 后清空**所有平台**的历史，提示 `t('historyCleared')`。

### 10.4 "频道速度"标签页

- 子标签：YouTube、Bilibili（同上主题色）。打开时自动选中当前平台；当前平台不是 Bilibili 时选中 YouTube。
- 表头（6 列网格）：`t('channelIconLabel')`、`t('channelNameHeader')`、`t('channelRemarkHeader')`、`t('channelSpeedHeader')`、`t('edit')`、`t('delete')`。
- 每行：图标（有自定义 `iconUrl` 时显示圆形 `img`，否则显示平台默认 SVG 图标）、名称（`name`，为空时显示去前缀的 id：YouTube 去掉开头的 `@`，Bilibili 去掉 `bilibili_`）、备注、`${speed}x`、✍️ 编辑按钮、🗑️ 删除按钮。名称和备注单行省略并带 `title` 提示。
- 无记录时显示 `t('noChannelSpeeds')`。
- 删除：`confirm(t('confirmRemoveChannelSpeed'))` 后删除，提示 `t('channelSpeedDeleted')`，按 §8 重新决定当前视频倍速。
- `t('clear')`：`confirm(t('confirmReset'))` 后清空所有平台的频道速度，提示 `t('historyCleared')`（沿用旧版文案），重新决定当前视频倍速。
- `t('addChannelSpeed')`：取当前选中子标签对应平台，在页面上识别当前频道（§3.3）：
  - 识别不到 → 提示 `t('noCurrentChannel')`；
  - 该频道已有记录 → 打开编辑表单；
  - 否则打开新增表单。

**新增表单**（覆盖在内容卡片上的浮层）：

- 标题：YouTube `t('addYouTubeChannelSpeed')` / Bilibili `t('addBilibiliChannelSpeed')`；
- 一行"`t('currentChannel')`：名称（显示 id）"，冒号在中文界面用 `：`，英文用 `:`；
- 备注输入框 `t('remark')`，默认值为频道名称；
- 图标地址输入框 `t('iconUrl')`（placeholder `t('iconUrlPlaceholder')`），默认值为在页面上识别到的头像 URL（合法时）；
- 图标预览区（`aria-live="polite"`）：标签 `t('iconPreview')` + 图标；输入非法时显示 `t('invalidIconUrl')` 并标红；为空时显示平台默认图标；
- 速度输入框（数字，step 0.01，默认 `1`）；
- `t('cancelEdit')`、`t('save')` 按钮。
- 保存校验：速度为正数（否则 `t('invalidInput')`）；图标为空或以 `http:`、`https:`、`data:` 开头（否则 `t('invalidIconUrl')`）。
- 保存内容：`{ speed, name: 频道名称, remark: 备注 || 频道名称, iconUrl }`，刷新列表，提示 `t('channelSpeedSet')`，关闭浮层，按 §8 重新决定当前视频倍速。

**编辑表单**：同新增表单，标题为 `t('editYouTubeChannelSpeed')` / `t('editBilibiliChannelSpeed')`；各项默认值取已存记录（已存图标为空时用页面上识别到的头像）；保存时 `name` 保持原值，提示 `t('channelSpeedUpdated')`。

### 10.5 "设置"标签页

**界面语言**（小节标题 `t('uiLanguage')`）：三个单选项 `auto`（`t('languageAuto')`）、`zh`（`t('languageZh')`）、`en`（`t('languageEn')`），初始选中已存偏好。切换后：保存偏好，提示 `t('settingsSaved')`，以新语言重新打开窗口并停留在当前标签页、恢复滚动位置。

语言解析：偏好为 `auto` 时，`navigator.language` 以 `zh` 开头则用中文，否则英文。翻译缺失时退回英文，再退回键名本身。

**同步设置**（小节标题 `t('syncSettings')`）：两个卡片按钮——📤 `t('exportSettings')`（副标题 `t('export')`）与 📥 `t('importSettings')`（副标题 `t('import')`）。在 Bilibili 上额外显示一个 ℹ️ 提示框，文字 `t('infoSyncBilibili')`。

**导出**：

- 若 `customSpeeds` 为空且没有任何频道速度 → 提示 `t('noSettingsFound')`。
- 导出 JSON（2 空格缩进） **[兼容]**：

  ```json
  {
    "version": "1.36",
    "timestamp": "<ISO 8601>",
    "settings": {
      "customSpeeds": [["2x", 2], ...],
      "buttonOrder": "desc",
      "history": { ... },
      "channelDefaultSpeeds": { ... }
    }
  }
  ```

  `customSpeeds` 每项规范化为 `[String(label), Number(speed)]`（不合规的项变成 `["1x",1]`）；`buttonOrder` 非法时写 `desc`。界面语言不导出。
- 文件名：`Enhanced Video Speed Buttons「YYYY MM DD」「HH:MM:SS」.json`（本地时间，两位补零）。
- iOS 类设备（UA 含 iPad/iPhone/iPod，或含 Mac 且 `maxTouchPoints > 1`，或 UA 含 `Orion/`）：
  1. 若支持 `navigator.share` + `File` 且 `navigator.canShare({files})` 为真 → 用系统分享面板分享该文件（title `Enhanced Video Speed Buttons`，text `t('exportSettings')`）；成功提示 `t('exportSuccess')`；用户取消（`AbortError` / `NotAllowedError`）则静默结束；
  2. 否则（或分享失败）→ 在新标签页打开 `data:application/json;charset=utf-8,<编码后的 JSON>`，成功提示 `t('exportSuccess')`；
  3. 再失败则走普通下载。
- 其他设备：Blob + `<a download>` 下载，提示 `t('exportSuccess')`。
- 一次点击只能导出一次。

**导入**：

- 点击后弹出文件选择（`accept="application/json"`）。文件输入框不能用 `display:none`（iOS 不允许），应放在屏幕外并透明；优先调用 `showPicker()`，失败退回 `click()`。选择同一文件可重复导入。
- 校验（任一失败即提示 `t('importError')`）：
  - 必须是对象且有 `settings`；
  - `settings.customSpeeds` 若存在：非空数组，每项为 `[string, 可转为正数]`；
  - `settings.channelDefaultSpeeds` 若存在：是对象；每个平台值是对象；每条记录 `speed` 为正数（number），`name`、`remark` 为字符串，`iconUrl` 缺省或为字符串；
  - `settings.history` 若存在：是对象；
  - `settings.buttonOrder` 若存在但不是 `asc`/`desc`：改为 `desc`（不报错）。
- 校验通过后 `confirm(t('confirmImportSettings'))`，确认后写入存在的各项（`customSpeeds` 规范化为 `[String, Number]`），提示 `t('importSuccess')`，按钮条就地刷新，并按 §8 重新决定当前视频倍速。

### 10.6 Toast

- 页面底部居中的提示条（深色半透明背景、白字、圆角、`z-index` 高于设置窗口），同一时刻只有一个，新的替换旧的；约 2 秒后消失，带淡入淡出动画。

### 10.7 主题

- 使用 CSS 变量，随 `prefers-color-scheme` 切换明 / 暗色。浅色：背景 `#ffffff`、文字 `#333333`、边框 `#e0e0e0`、悬停 `#f5f5f5`；深色：背景 `#333333`、文字 `#ffffff`、边框 `#555555`、悬停 `#444444`。主按钮绿色（`#4CAF50` / 暗色 `#45a049`），删除/取消红色（`#f44336` / 暗色 `#d32f2f`）。
- 宽度 ≤ 480px 时缩小标签按钮、子标签、卡片的尺寸和字号。
- 所有样式选择器必须以脚本自有的类名 / id 为前缀，避免影响页面（旧版使用了 `.tab`、`.toast-message`、`.overlay` 这类通用全局类名）。

## 11. 对外事件

每次倍速生效（手动或自动）后，在 `document` 上派发：

```js
new CustomEvent('videoSpeedChanged', {
  detail: { speed, platform, identifier, isManual }
})
```

删除历史记录时派发 `detail.speed = null`。

---

## 12. 旧版缺陷与正确行为（含"播放进度丢失"）

用户反馈：**使用当前脚本时，有时会丢失播放进度。**

旧版代码中没有任何地方直接修改 `currentTime`，所以进度丢失不是某一行代码"主动跳转"造成的，而是下面几类缺陷叠加的结果：脚本在页面生命周期里反复销毁/新建控制器、每秒都在改写播放器状态、监听器和定时器无限累积，并且常常绑定到错误的 `<video>` 上。这些都会干扰平台播放器（尤其是 YouTube 的 MSE 播放器）在加载、广告切换、站内跳转时的状态恢复，表现为视频跳回开头、续播位置没有被记住或播放器报错重载。

### D1 控制器每次重挂都把倍速强制改回 1.0（高）

`video_speed_buttons()` 内的 `initializePlaybackSpeed()` 每次构建按钮条都会执行 `video.playbackRate = 1`，随后异步流程再改成历史/频道倍速；没有视频历史时还会先 `applyPlaybackRate(video, 1)`，最多等 4.5 秒频道信息再改。触发重挂的时机很多：每秒一次的加载器轮询、整页 `MutationObserver`、URL 变化（延迟 1.2 秒）、任何设置改动（包括"速度"页草稿编辑、删历史等）。
**正确行为**：重挂按钮条、修改设置都不得改变当前倍速（§5.6、§10.2）。

### D2 定时器与观察者无限泄漏，持续抢写播放器（高）

- `loader_loop()` 每次运行都 `new MutationObserver` 观察 video 父节点，从不 `disconnect`；
- 每个控制器都有 500ms 的强制回写 `setInterval`，旧控制器 `kill()` 时不清除，只靠 token 让部分回调空转；
- 结果是页面停留越久，观察者和定时器越多，主线程负担越重，并且 500ms 轮询让 YouTube 自带的倍速菜单失效。
**正确行为**：全局只有一个控制器；所有监听器/观察者/定时器都可追踪并在不需要时释放；不用轮询强制回写（§9）。

### D3 找不到锚点时每秒新建一个控制器（高）

`loader_loop()` 用 `candidate === null` 判断"没有锚点"，但 `Array.prototype.find` 返回的是 `undefined`，所以悬浮面板回退从未生效：控制器被挂在一个脱离文档的 `div` 上，`.vsb-container` 永远查不到，于是**每秒**都会再建一个控制器——每次都把 `playbackRate` 改成 1、再改回去，并在 `body` 上多注册一个 `keydown` 监听。在 YouTube 首页（悬停预览视频）、Shorts、Vimeo/Bilibili 新版页面等没有锚点的场景下持续发生。
**正确行为**：锚点缺失时使用悬浮面板（§5.3）；不论什么情况都不得重复创建控制器（§5.6）。

### D4 用 `document.querySelector('video')` 选视频，常常选错（高）

YouTube 页面上同时可能存在首页悬停预览播放器、隐藏的旧观看页、迷你播放器等多个 `<video>`。旧版总是取文档中的第一个，可能把倍速作用到隐藏/预览视频上，而当"第一个 video"在这些元素间来回变化时，整页 `MutationObserver` 会不断地 `kill()` + 重建（又触发 D1）。
**正确行为**：按平台选择**主视频**——YouTube 观看页为可见的 `ytd-watch-flexy` 内 `#movie_player` 下的 `video.html5-main-video`（或 `#movie_player video`）；YouTube 非观看页（首页、搜索、频道页、Shorts 等）没有主视频，控制器处于非激活状态，不改任何视频的倍速；其他平台取可见且面积最大的 `<video>`。

### D5 整页观察者在每条 mutation 上做重活（中）

`document`/`body` 级别的 `MutationObserver` 在**每一条** mutation 记录上都执行 `querySelector('video')` 和 `querySelector('.vsb-container')`；YouTube 的进度条、弹幕/聊天、评论加载都会产生大量 mutation。
**正确行为**：观察者回调必须节流（例如合并到下一帧或 ≥100ms 防抖），一次回调只检查一次；能用平台事件时优先用事件（YouTube 的 `yt-navigate-finish`、`popstate` 等）。

### D6 站内跳转后读到上一个视频的频道（中）

YouTube 跳转到新视频时，频道区 DOM 会晚于 URL 更新。旧版只要读到"任意"频道 id 就采用，可能把上一个视频频道的默认倍速套用到新视频上。
**正确行为**：见 §3.3 的重写要求；频道信息稍后变化时（同一视频、用户未手动选择）应重新决策。

### D7 用户手动选择被迟到的频道默认值覆盖（中）

没有视频历史时，旧版先设 1.0，然后最多等 4.5 秒频道信息；这期间用户点了某个倍速，等频道信息出现后仍会被频道默认值覆盖。
**正确行为**：§8——手动选择后放弃本次自动应用。

### D8 恢复历史倍速时重写历史记录（低）

恢复历史倍速时以 `isManual=true` 调用保存，会把记录的 `title` 改成**当时**的 `document.title`（站内跳转后 1.2 秒，标题可能还是上一个视频），并改变排序。
**正确行为**：恢复不写历史（§7）。

### D9 快捷键方向取决于排序（中）

Speed Down 实际执行的是"移到列表中的上一个按钮"。默认降序排列时，上一个按钮更快——按 `-` 反而加速。
**正确行为**：按速度数值决定方向（§6）。

### D10 输入框判断错误 / 快捷键监听叠加（中）

`is_comment_box()` 只把文档中**第一个** `textarea` / `.comment-simplebox-text` 当作输入框；在 YouTube 搜索框、评论编辑器（`contenteditable`）、直播聊天中输入 `-`、`+`、`=`、`*`、`?` 都会改倍速。再加上 D3 的监听叠加，一次按键可能连跳多档。
**正确行为**：§6 的输入元素判断；全局只注册一次键盘监听。

### D11 历史列表未转义（低，安全）

视频历史的标题和 URL 直接拼接进 HTML（只有频道列表做了转义），标题含 `<`、`"` 等字符时会破坏界面或注入标签。
**正确行为**：§10.1——用户/页面文本一律作为文本插入。

### D12 其他

- 频道子标签在非 YouTube/Bilibili 页面没有选中项，点"添加频道速度"会抛错（§10.4 已规定默认选 YouTube）。
- 允许把按钮列表删空并保存，之后键盘操作报错（§10.2 已禁止）。
- 设置窗口内容过高时无法滚动（§10.1 已要求可滚动）。
- 全局 CSS 使用通用类名，可能影响宿主页面（§10.7）。

### 12.1 重写的硬性约束（针对进度丢失）

1. 脚本**只能**修改主视频的 `playbackRate`。不得读写 `currentTime`、`src`、`srcObject`，不得调用 `load()`、`play()`、`pause()`、`fastSeek()`，不得移动、替换或删除任何 `<video>` 元素或播放器 DOM。
2. 按钮条只能插入到 §5.3 规定的锚点或自己的悬浮面板中，不得插入播放器容器内部。
3. 控制器、键盘监听、`MutationObserver`、事件监听全局各只有一份；长时间停留和多次站内跳转后数量保持不变。
4. 不使用固定间隔轮询改写 `playbackRate`。
5. 在 YouTube 非观看页（首页悬停预览、Shorts 等）不改任何视频的倍速。

---

## 13. 验收标准

在真实 YouTube 页面（以及能访问时的 Bilibili / Vimeo）上逐条验证：

| 编号 | 场景 | 期望 |
|---|---|---|
| A1 | 打开观看页 | 标题区上方出现唯一一个按钮条（`Video Speed :` + 按钮），默认高亮 Normal，倍速 1.0 |
| A2 | 点击 1.5x | `video.playbackRate === 1.5`，1.5x 高亮，历史中新增该视频记录 |
| A3 | 刷新页面 | 自动恢复 1.5x；历史记录未被改写（时间戳不变） |
| A4 | 播放到 T 秒后：点击各倍速、按快捷键、打开/关闭设置窗口、修改并确认按钮列表、切换语言、导入设置、等待 30 秒 | 每一步后 `currentTime` 都在 T 附近连续前进，从未回退或跳到 0；视频不重载（不出现新的 `loadstart`/`emptied`） |
| A5 | 站内跳转到另一个视频，再按浏览器后退 | 每个视频按 §8 得到正确倍速；按钮条始终只有一个；后退后原视频从 YouTube 记录的位置继续 |
| A6 | 在频道 X 设置默认 1.25x 后打开该频道另一个无历史的视频 | 自动 1.25x；从频道 Y 的视频站内跳转到频道 X 的视频也正确（不会套用 Y 的值） |
| A7 | 新视频加载后、频道信息出现前立即点 0.9x | 最终保持 0.9x，不被频道默认值覆盖 |
| A8 | 降序排列下按 `-` / `+` / `*` | `-` 变慢一档、`+` 变快一档、`*` 回到 1.0；在搜索框或评论框输入这些字符时倍速不变 |
| A9 | 用 YouTube 自带菜单把倍速改成 1.75 | 保持 1.75，不被脚本改回；按钮条不残留错误高亮 |
| A10 | 广告结束切到正片 / 切换清晰度 | 倍速保持为脚本决定的值 |
| A11 | 在页面停留 5 分钟并站内跳转 10 次 | 页面上 `.vsb-container` 只有 1 个；脚本注册的监听器/观察者数量不增长；倍速不出现周期性跳变 |
| A12 | YouTube 首页悬停预览、Shorts | 脚本不改变这些视频的倍速，不出现悬浮面板 |
| A13 | 视频历史 / 频道速度的增删改清空 | 符合 §10.3、§10.4；标题含 `<b>` 时原样显示为文本 |
| A14 | 导出再导入 | 文件名、JSON 结构符合 §10.5；一次点击只导出一份；导入后数据一致 |
| A15 | 切换界面语言 | 窗口以新语言重开并停留在原标签页 |
| A16 | 控制台 | 无脚本抛出的错误，无 Trusted Types 违规 |

---

## 14. 附录：界面文本翻译表 **[兼容]**

| 键 | en | zh |
|---|---|---|
| title | 🛠️ Custom Speed Buttons | 🛠️ 自定义速度按钮 |
| label | ✍️ Button Label: | ✍️ 标签： |
| speed | ⏱️ Speed: | ⏱️ 速度： |
| delete | Delete | 删除 |
| edit | Edit | 编辑 |
| add | Add | 添加 |
| buttonOrder | ↔️ Order | ↔️ 顺序 |
| ascending | Ascending | 升序 |
| descending | Descending | 降序 |
| reset | Reset | 重置 |
| clear | Clear | 清空 |
| cancel | Cancel | 取消 |
| confirm | Confirm | 确认 |
| invalidInput | Please enter a valid positive number! | 请输入有效的正数！ |
| speedExists | This speed already exists! Label updated! | 此速度已存在！对应标签已更新！ |
| settingsSaved | Settings saved successfully! | 设置已成功保存！ |
| history | Video History | 视频历史 |
| noHistory | No history records! | 无历史记录！ |
| speeds | Speeds | 速度 |
| confirmReset | Are you sure you want to clear all history? | 确定要清除所有历史记录？ |
| historyCleared | History has been cleared! | 历史记录已清空！ |
| errorInitializing | Error initializing settings window! | 初始化设置窗口时出错！ |
| errorUpdatingList | Error updating speed list! | 更新速度列表时出错！ |
| retryButton | Retry | 重试 |
| sync | Sync | 同步 |
| export | Export | 导出 |
| import | Import | 导入 |
| exportSuccess | Settings exported successfully! | 设置导出成功！ |
| importSuccess | Settings imported successfully! | 设置导入成功！ |
| importError | Error importing settings: Invalid file format! | 导入设置出错：无效的文件格式！ |
| noSettingsFound | No settings found to export! | 没有可导出的设置！ |
| selectFile | Select File | 选择文件 |
| confirmImport | This will overwrite your current settings. Continue? | 这将覆盖您当前的设置，是否继续？ |
| channelSpeeds | Channel Speeds | 频道速度 |
| addChannelSpeed | Add Channel Speed | 添加频道速度 |
| channel | Channel | 频道 |
| channelSpeed | Speed | 速度 |
| iconUrl | 🖼️ Icon URL: | 🖼️ 图标地址： |
| iconUrlPlaceholder | https://... or data:image/... | https://... 或 data:image/... |
| iconPreview | Preview | 图标预览 |
| setDefaultSpeed | Set as Default | 设为默认 |
| removeChannelSpeed | Remove | 移除 |
| noChannelSpeeds | No channel speed settings! | 暂无频道速度设置！ |
| exportChannelSpeeds | Export Channel Speeds | 导出频道速度 |
| importChannelSpeeds | Import Channel Speeds | 导入频道速度 |
| editChannelSpeed | Edit | 编辑 |
| save | Save | 保存 |
| cancelEdit | Cancel | 取消 |
| currentChannel | Current Channel | 当前频道 |
| addSpeedForCurrentChannel | Add Speed | 添加速度 |
| editSpeedForChannel | Edit Speed | 编辑速度 |
| enterNewSpeed | Enter new speed: | 输入新速度： |
| channelSpeedSet | Channel speed set successfully! | 频道速度设置成功！ |
| channelSpeedUpdated | Channel speed updated successfully! | 频道速度更新成功！ |
| channelSpeedDeleted | Channel speed deleted successfully! | 频道速度已删除！ |
| confirmRemoveChannelSpeed | Are you sure you want to delete this channel speed? | 确定要删除这个频道的速度设置吗？ |
| invalidIconUrl | Please enter a valid icon URL (http(s) or data URI), or leave it empty. | 请输入有效的图标地址（http(s) 或 data URI），或留空。 |
| noCurrentChannel | No channel detected on this page. | 此页面未检测到频道。 |
| youtube | YouTube | YouTube |
| bilibili | Bilibili | 哔哩哔哩 |
| addYouTubeChannelSpeed | Add YouTube Speed | 添加YouTube速度 |
| addBilibiliChannelSpeed | Add Bilibili Speed | 添加哔哩哔哩速度 |
| editYouTubeChannelSpeed | Edit YouTube Speed | 编辑YouTube速度 |
| editBilibiliChannelSpeed | Edit Bilibili Speed | 编辑哔哩哔哩速度 |
| removeYouTubeChannelSpeed | Remove YouTube Speed | 移除YouTube速度 |
| removeBilibiliChannelSpeed | Remove Bilibili Speed | 移除哔哩哔哩速度 |
| youtubeChannel | YouTube | YouTube |
| bilibiliChannel | Bilibili | 哔哩哔哩 |
| video | Video | 视频 |
| videoHistory | Video History | 视频历史 |
| channelsTab | Channels | 频道 |
| syncSettings | Sync Settings | 同步设置 |
| exportSettings | Export Settings | 导出设置 |
| importSettings | Import Settings | 导入设置 |
| addSpeed | Add Speed | 添加速度 |
| confirmImportSettings | This will overwrite your current settings. Continue? | 这将覆盖您当前的设置，是否继续？ |
| infoSyncBilibili | Synchronize your speed settings across devices for Bilibili channels. | 同步您在哔哩哔哩频道的速度设置到所有设备。 |
| infoSyncOther | Synchronize your speed settings across devices for other platforms. | 同步您在其他平台的速度设置到所有设备。 |
| close | Close | 关闭 |
| remark | ✍️ Remark: | ✍️ 备注： |
| channelIconLabel | Icon | 图标 |
| channelNameHeader | Name | 名称 |
| channelRemarkHeader | Remark | 备注 |
| channelSpeedHeader | Speed | 速度 |
| channelName | 📛 Name: | 📛 名称： |
| uiLanguage | Interface Language | 界面语言 |
| languageDescription | Choose the language used by the script interface. | 选择脚本界面语言。 |
| languageAuto | Auto | 自适应 |
| languageZh | Chinese | 中文 |
| languageEn | English | 英文 |
| languageAutoHint | Follow your browser language automatically. | 跟随浏览器语言自动切换。 |
| languageZhHint | Always use the interface in Chinese. | 始终使用中文界面。 |
| languageEnHint | Always use the interface in English. | 始终使用英文界面。 |
| settings | Settings | 设置 |

（`buttonOrder` 的原始值为 HTML 实体 `&harr;️`，即 `↔️`；重写用纯文本时直接写字符。）
