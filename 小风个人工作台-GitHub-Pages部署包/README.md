# 小风的个人工作台 · GitHub Pages 部署版

纯静态 PWA，无需 npm、Python、后端或外部 CDN。原有雾蓝面板、全页视频、六个业务模块和设置均保留。

## 第一次部署（电脑操作）

1. 解压部署包。在 GitHub 新建一个 Public 仓库，例如 `xiaofeng-workbench`。GitHub Free 使用公开仓库部署 Pages。
2. 在仓库选择 **Add file → Upload files**，将解压目录内的所有文件和 `assets`、`icons` 两个文件夹一起上传，提交到 `main` 分支。**不是上传 ZIP，也不要把外层文件夹一起套进仓库。**
3. 确认仓库首页直接能看到 `index.html`、`app.js`、`config.js`、`styles.css`、`sw.js`、`manifest.webmanifest`、`assets/`、`icons/`；保留 `.nojekyll`。
4. 打开 **Settings → Pages**。Source 选 **Deploy from a branch**；Branch 选 **main**，目录选 **/(root)**，点击 **Save**。
5. 等待 Pages 部署完成，再从该页面点击 **Visit site**。网址形式通常为 `https://你的用户名.github.io/仓库名/`，以 GitHub 实际给出的地址为准。
6. 若能设置 **Enforce HTTPS**，请开启。发布不是即时完成的；查看仓库 Actions 中 `pages build and deployment` 的结果，不要一直访问电脑上的 `127.0.0.1`。

官方步骤：[创建 Pages 网站](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)、[选择发布分支与目录](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

## 手机打开和安装

- 把 Pages 设置里给出的 **HTTPS 网站链接**发送到手机，不是 GitHub 仓库的代码页面链接。
- 安卓：在 Chrome 中打开，使用页面安装按钮或浏览器菜单里的“安装应用 / 添加到主屏幕”；具体名称随浏览器而异。
- iPhone/iPad：在 Safari 中打开，使用“分享 → 添加到主屏幕”。
- 先完整打开一次，等待页面及背景视频加载。支持的浏览器会缓存页面、代码、图标和视频，之后离线也能进入。系统限制自动播放时可点右上角播放壁纸。
- 微信、QQ 等内置浏览器可能不提供安装入口，使用手机系统浏览器打开。

这是从网站安装的 PWA，没有 APK 文件。本次只提供部署文件，尚未替你发布到 GitHub，也没有已验证的公网地址。

## 以后怎么修改

仓库里的这些文件就是可编辑源码，保存并提交到发布分支后由 GitHub Pages 重新发布，不需要另外生成或打包。

| 想修改什么 | 编辑哪里 |
| --- | --- |
| 首次使用的称呼、身份、长期目标、任务快捷填写、默认主题 | `config.js` |
| 布局、字体、间距、颜色、透明度、手机样式 | `styles.css` |
| 任务、灵感、内容看板、Skill 卡、复盘等交互 | `app.js` |
| 页面结构、标题、引入文件 | `index.html` |
| 安装名称、主题色、图标声明 | `manifest.webmanifest` |
| 动态背景、封面 | `assets/wallpaper.mp4`、`assets/wallpaper-poster.jpg` |
| App 图标 | `icons/` 中的 PNG |
| 离线缓存策略及资源版本 | `sw.js` |

`config.js` 的 `instanceId` 请保留。已有浏览器数据会优先读取之前保存的个人资料、主题和模块设置；修改默认配置不会覆盖它们。想调整当前设备的身份/主题，直接用 App 的设置；不要为了应用新默认值清除数据。长期目标及任务方向仍由配置提供。

普通页面、CSS、JavaScript 和配置在线刷新时优先读取网络，断网时读取缓存。页面已经打开时不会强制中断工作；等 GitHub 部署完成后刷新页面即可。**替换视频、封面、图标，或新增离线文件时，请同时改 `sw.js` 的 `CACHE_VERSION` 为新值**，必要时将新增文件补进 `APP_SHELL`。更新完成后重新打开，浏览器会准备新版缓存。

## 数据与公开范围

部署会公开这套界面源码、称呼/身份配置、视频和图标。任务、灵感、内容进度、Skill 卡和复盘仍保存在各自浏览器的 localStorage 中，不会自动写入 GitHub，也不会在电脑与手机间自动同步。

本机版与 Pages 版是不同地址，数据不会自动搬过去。迁移方法：在原工作台“设置 → 导出 JSON”，把文件传到手机，在 Pages 工作台“设置 → 导入 JSON”。不要把导出的私人备份提交到公开仓库。更换域名、浏览器或清理站点数据前也请先导出。

## 常见问题

- **404**：检查 Pages 是否部署成功、分支是否为 main、目录是否为 /(root)、index.html 是否直接位于仓库根目录。
- **手机无法安装**：使用 HTTPS 网站地址和支持安装的手机浏览器；不要打开 GitHub 文件预览或仓库首页。
- **仓库子路径**：本包全部使用相对资源路径，支持 `https://用户名.github.io/仓库名/` 以及域名根目录部署，不用修改成绝对路径。
- **上线后没变化**：先确认 Actions 部署成功；刷新页面。替换媒体/图标后务必修改 CACHE_VERSION；不要用“清除站点数据”来解决缓存问题，否则本地任务可能一起清除。
- **国内网络访问不稳定**：GitHub Pages 的可访问性取决于手机网络；本文件包无法保证所有网络下都能访问。
