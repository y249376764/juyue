# 聚影 · 自托管版

把「聚影」海阔视界小程序规则，连同它依赖的代码、图片、图标、播放器、Python 扩展，整体放进这一个仓库。
运行时只访问本仓库的地址，不依赖原作者（src48597962）的任何服务器或第三方镜像。

## 目录

```
Juying/     聚影小程序源码（入口 SrcJuying.js）
hk/         自托管加载器（JyRequire.js / require.js / verify）
assets/     静态资源
            ├── weisyr/    H5 播放器、二级样式、短剧页
            ├── tubiao/    各分类图标
            └── img/       图标（本项目自绘）
plugin/chaquopy/   Python 扩展（Chaquopy 运行时本体）
rules/      可直接导入的分享口令（juying.hiker）
```

## 首页加速（v18）

- 首次进入首页照常从仓库加载，**页面出屏之后**再把这些模块缓存到 `hiker://files/rules/Src/Juying2/`（23 个文件，约 700KB）
- 之后进入首页直接用本地副本，不再等 3 次远端模块请求
  （实测 cdn.jsdelivr.net 取 SrcJuying/SrcJyPublic/SrcJyMenu 单文件 1.5~3.7s，串行加起来 6~7s；本地读取基本为 0）
- 缓存不全会自动回退远程，打不开的风险为零；更新版本时自动清缓存重建
- 图标仍从仓库取，本地缺图自动回退远端，不会出现白图标
- 代码库地址校验结果缓存 6 小时，避免每次进首页都同步探测（原来单次最多 4s 超时）

## 已脱离的外部依赖

| 原来依赖 | 现在 |
| --- | --- |
| `http://123.56.105.145/...` 图片/播放器 | 仓库内 `assets/` |
| `hikerfans.com`、`img.vinua.cn` 图标 | 仓库内 `assets/img/`（自绘） |
| `src48597962` 的 codeberg / cnb.cool / gitcode / agit.ai / raw.github 多源拉代码 | `hk/` 里只列本仓库地址 |
| `github-mirrors.zone.id`、`github-mirror.xiaoxuan6.me` 镜像列表接口 | 已删除，改为本地候选列表 + 探测 |
| `ghproxy` 代理管理与探测 | `代码库·自托管` 页，只切换本仓库的地址 |
| drpy 依赖的 `hjdhnx/dr_py` 静态库 | 仓库内 `Juying/drpy/libs/` |
| Python 扩展（Chaquopy） | 仓库内 `plugin/chaquopy/`，规则内一键安装 |

仍保留的仅是「传输通道」：`cdn.jsdelivr.net`、`fastly.jsdelivr.net`、`raw.githubusercontent.com`，
以及 `gh-proxy.com` / `ghfast.top` 两个纯转发代理——它们只负责把**本仓库**的文件送到手机上，内容全部是自己的。

## 怎么用

1. 海阔视界 → 我的 → 导入 → 粘贴 `rules/juying.hiker` 的全部内容。
2. 首次进入会自动探测可用的代码库地址并缓存（6 小时内不再重复探测），失败时进入「代码库·自托管」页手动切换。
3. Python 源：进入小程序 → 管理 → 「Python扩展」页 → 一键安装（约 10MB，从本仓库下载）。

## Python 扩展说明

`plugin/chaquopy/` 内是完整可用的运行时：

- `chaquopy.apk`：Python 运行环境（含 3.8 stdlib）
- `classes.dex`：Chaquopy Java 桥
- `arm64-v8a/libpython3.8.so`、`arm64-v8a/libchaquopy_java.so`：arm64 原生库（取自 chaquopy 12.0.1 官方发布）
- `libs_py/`：hiker 侧基础库（`import hiker` 可用）
- `manifest.json`：安装清单，规则按此逐文件下载到 `hiker://files/plugins/Chaquopy/`

## 更新

改了代码直接推本仓库即可，手机端重启小程序就生效
（jsDelivr 有缓存，必要时在「代码库」页切到 `raw.githubusercontent.com` 通道）。
发布新版本时清空本地模块缓存再进首页，即可拿到新代码。
