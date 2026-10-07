# 离线验收测试

`docs/FEATURES.md` §13 的自动化版本，跑在一个模拟 YouTube 观看页行为的本地站点上
（站内跳转、频道信息滞后、播放器重置倍速、广告切换、元数据重渲染、首页悬停预览、Shorts、
Trusted Types CSP）。它不能替代真实 YouTube 上的验收，但能稳定复现旧版的大部分缺陷。

```sh
python3 tests/acceptance/gen-media.py
node tests/acceptance/server.js &          # http://127.0.0.1:8765
node tests/acceptance/run.js "userscript/Enhanced Video Speed Buttons.user.js"
```

`run.js` 通过 Chromium 的 `--host-resolver-rules` 把 `www.youtube.test` 指向本地服务，
让脚本把它识别为 YouTube。需要 `playwright`（或设置 `PLAYWRIGHT_MODULE` 指向它）。
