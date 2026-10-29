# 聚影 v78（自托管合并版）

把原来两套合并成一套：v77 的功能页 + 自托管仓库，源码/图标全部内置在规则里，**导入后打开一次就完成本地化，运行时不联网**。

## 导入

- 口令：`rules/juying.hiker`（`base64://@聚影@...`，约 950KB）
- 手机：海阔视界 → 我的 → 导入 → 粘贴口令
- 已有的 v77 会在进首页时收到「发现新版本 v78」，点确定自动下载安装

## 版本号

| 项目 | 值 | 说明 |
| --- | --- | --- |
| 规则 version | 78 | 壳规则/分享口令的编号，接续 v77 |
| 模块 BUILD | 78 | 更新检查用的构建号 |
| 模块版本 | SrcJuying 2.8 | 上游代码版本，没动 |

## 首页加速

1. **首帧不联网**：`downloadFiles()` 在源码为本地时直接返回，不再首帧下载 `img/聚影.png`。
2. **图标本地**：95 个内置文件里含 64 个 svg 图标，首页图标直接读 `hiker://files/rules/Src/Juying2/img/`；本地缺图（png/gif）自动回退仓库地址，不会白图。
3. **更新检查更快**：原来先请求 `raw.githubusercontent.com`（8 秒超时），现在直连 jsDelivr 两个源、3 秒超时，卡住也不拖首页。
4. **代码库校验缓存**：`find_rule` 本地优先，命中内置源码就不再走网络。

## 内置内容（95 个文件，解包到 `hiker://files/rules/Src/Juying2/`）

- 16 个模块（SrcJuying / SrcJyPublic / SrcJySet / SrcJyData / SrcJyMenu / …）
- drpy 引擎与依赖 9 个（drpy2 / jsencrypt / gbk / node-rsa / pako / json5 / jsonpathplus / jinja / 模板）
- plugins 5 个（globalmap / gzip / hikerPop / m3u8_ad_rule / pyDriver）
- 图标 64 个 svg

二进制（`聚影.png`、`Loading.gif`）不进内置包——解包走文本通道会破坏二进制，这部分仍从仓库取。

## 更新链路（全部指向自己的仓库）

- 版本信息：`rules/jy_version.json`（build 78）
- 规则本体：`rules/jy.txt`
- 旧版兼容：`y249376764/jy-update` 的 `version.json` 也升到 78，老 v77 用户能收到升级提示

## 验证

- 15 个页面 + find_rule 全部 `node --check` 通过
- 95 个内置文件 gzip→base64→gunzip 往返逐字节一致
- 仓库内容与本地文件 git blob sha 逐一致（99 个路径）
- jsDelivr 拉回的 `rules/jy.txt` 与本地 sha256 完全一致，解码为 v78 / 15 页

## 目录

```
rules/juying.hiker      分享口令（= jy.txt）
rules/jy.txt            更新下载用
rules/jy_version.json   版本信息
Juying/                 模块与图标镜像（远程回退用）
plugin/chaquopy/        Python 运行时
```
