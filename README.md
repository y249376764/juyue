# 聚阅 / 聚影 · 自托管版

把「聚阅」「聚影」两个海阔视界小程序规则，连同它们依赖的全部代码、图片、主题、播放器、Python 扩展，
整体搬进**这一个仓库**，运行时只访问本仓库的地址，不再依赖原作者（src48597962）的任何服务器或第三方代理。

## 目录

```
Juyue/      聚阅小程序源码（入口 SrcJu.js）
Juying/     聚影小程序源码（入口 SrcJuying.js）
hk/         自托管加载器（JuRequire.js / JyRequire.js / require.js / verify）
assets/     原先在自己服务器上的静态资源
            ├── weisyr/    H5 播放器、二级样式、短剧页
            ├── tubiao/    各分类图标
            ├── juyue/themes/078/  主题 svg
            └── img/       图标（本项目自绘）
plugin/chaquopy/   Python 扩展（Chaquopy 运行时本体）
rules/      可直接导入的分享口令（juyue.hiker / juying.hiker）
```

## 已脱离的外部依赖

| 原来依赖 | 现在 |
| --- | --- |
| `http://123.56.105.145/...` 图片/主题/播放器 | 仓库内 `assets/` |
| `hikerfans.com`、`img.vinua.cn` 图标 | 仓库内 `assets/img/`（自绘） |
| `src48597962` 的 codeberg / cnb.cool / gitcode / agit.ai / raw.github 多源拉代码 | `hk/` 里只列本仓库地址 |
| `github-mirrors.zone.id`、`github-mirror.xiaoxuan6.me` 镜像列表接口 | 已删除，改为本地候选列表 + 探测 |
| `ghproxy` 代理管理与探测 | `代码库·自托管` 页，只切换本仓库的地址 |
| 蓝奏云更新包 | 仓库内 `rules/` |
| drpy 依赖的 `hjdhnx/dr_py` 静态库 | 仓库内 `Juying/drpy/libs/` |
| Python 扩展（Chaquopy） | 仓库内 `plugin/chaquopy/`，规则内一键安装 |

仍保留的仅是「传输通道」：`cdn.jsdelivr.net`、`fastly.jsdelivr.net`、`raw.githubusercontent.com`，
以及 `gh-proxy.com` / `ghfast.top` 两个纯转发代理——它们只负责把**本仓库**的文件送到手机上，内容全部是自己的。

## 怎么用

1. 海阔视界 → 我的 → 导入 → 粘贴 `rules/juyue.hiker` 或 `rules/juying.hiker` 的全部内容。
2. 首次进入会自动探测可用的代码库地址并缓存，失败时进入「代码库·自托管」页手动切换。
3. Python 源：进入小程序 → 管理 → 「Python扩展」页 → 一键安装（约 10MB，从本仓库下载）。

## Python 扩展说明

`plugin/chaquopy/` 内是完整可用的运行时：

- `chaquopy.apk`：Python 运行环境（含 3.8 stdlib）
- `classes.dex`：Chaquopy Java 桥
- `arm64-v8a/libpython3.8.so`、`arm64-v8a/libchaquopy_java.so`：arm64 原生库（取自 chaquopy 12.0.1 官方发布）
- `libs_py/`：hiker 侧基础库（`import hiker` 可用）
- `manifest.json`：安装清单，规则按此逐文件下载到 `hiker://files/plugins/Chaquopy/`

`Juyue/plugins/PythonHiker.js` 启动时会自检，缺文件即自动从本仓库补齐；
聚影走的小写路径 `hiker://files/plugins/chaquopy/PythonHiker.js` 也会一并写入。

## 更新

改了代码直接推本仓库即可，手机端重启小程序就生效（jsDelivr 有缓存，必要时在「代码库」页切到 `raw.githubusercontent.com` 通道）。
