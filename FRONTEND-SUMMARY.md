# 三下乡成果展示网站 — 前端总结文档

> 本文档供 AI 模型（Gemini）优化前端使用，包含项目概况、文件清单、技术架构、模块说明、当前状态与待优化方向。

---

## 一、项目概况

**项目名称**：锦秀青年在秀山 · 三下乡实践成果展示网站
**所属活动**：西南大学地理科学学院 2026 年暑期"三下乡"社会实践
**团队名称**：重庆秀山锦秀小分队（13人）
**实践时间**：2026年7月16日 — 7月22日
**实践地点**：重庆市秀山土家族苗族自治县
**活动主题**：故土情怀弦歌不辍，科教赋能秀山振兴
**部署目标**：Cloudflare Pages（零成本静态部署）

---

## 二、文件清单与绝对路径

### 核心代码文件（需要优化的文件）

| 文件 | 绝对路径 | 行数 | 大小 | 说明 |
|------|----------|------|------|------|
| index.html | `D:\self-improvement\SelfStudy\CountrysideActivities\site\index.html` | 636 | 33KB | 主页面，10个全屏区块 |
| style.css | `D:\self-improvement\SelfStudy\CountrysideActivities\site\css\style.css` | 618 | 28KB | 完整样式，含CSS变量主题系统 |
| main.js | `D:\self-improvement\SelfStudy\CountrysideActivities\site\js\main.js` | 239 | 8KB | 导航/滚动动画/图表/视差/画廊筛选 |
| counter.js | `D:\self-improvement\SelfStudy\CountrysideActivities\site\js\counter.js` | 43 | 1KB | 数字计数器动画（Intersection Observer） |
| site-data.js | `D:\self-improvement\SelfStudy\CountrysideActivities\site\data\site-data.js` | 255 | 12KB | 集中管理所有可编辑内容（数据参考文件） |
| project-knowledge.json | `D:\self-improvement\SelfStudy\CountrysideActivities\site\data\project-knowledge.json` | 动态 | 动态 | 网站与未来AI问答共用的事实基线，含证据状态、否定事实和待核验项 |

### 3D 互动嵌入页面

| 文件 | 绝对路径 | 说明 |
|------|----------|------|
| diaojiaolou.html | `D:\self-improvement\SelfStudy\CountrysideActivities\site\assets\embed\diaojiaolou.html` | Three.js r128 吊脚楼3D互动模型（纯代码程序化建模，10个热点标注） |
| huadeng.html | `D:\self-improvement\SelfStudy\CountrysideActivities\site\assets\embed\huadeng.html` | Three.js r128 花灯3D互动模型（加载STL模型） |

### 配置与文档文件

| 文件 | 绝对路径 | 说明 |
|------|----------|------|
| _headers | `D:\self-improvement\SelfStudy\CountrysideActivities\site\_headers` | Cloudflare 安全头配置 |
| README.md | `D:\self-improvement\SelfStudy\CountrysideActivities\site\README.md` | 项目说明与修改指南 |
| DEPLOYMENT.md | `D:\self-improvement\SelfStudy\CountrysideActivities\site\DEPLOYMENT.md` | 三平台部署指南 |
| .gitignore | `D:\self-improvement\SelfStudy\CountrysideActivities\site\.gitignore` | Git 忽略规则 |

### 资源目录

| 目录 | 绝对路径 | 当前状态 |
|------|----------|----------|
| images/ | `D:\self-improvement\SelfStudy\CountrysideActivities\site\assets\images\` | 已配置网站实拍图片与媒体封面；具体数量以文件目录为准 |
| models/ | `D:\self-improvement\SelfStudy\CountrysideActivities\site\assets\models\` | 含花灯 STL 模型（515KB）+ Base64 版本 |
| embed/ | `D:\self-improvement\SelfStudy\CountrysideActivities\site\assets\embed\` | 2个 Three.js 3D 互动页面 |

---

## 三、技术栈

- **纯 HTML + CSS + JavaScript**，无任何框架依赖
- **字体**：Google Fonts（Noto Serif SC + Noto Sans SC）
- **动画**：Intersection Observer 实现滚动揭示动画
- **图表**：Canvas API 手绘电商数据柱状图（无第三方图表库）
- **3D**：Three.js r128（内联 OrbitControls，三级 CDN 降级）
- **响应式**：900px / 640px 两个断点
- **无障碍**：`prefers-reduced-motion` 媒体查询
- **SEO**：OG 标签 + Twitter Card + meta description + 语义化 HTML
- **Favicon**：内联 SVG（灯笼 emoji）

---

## 四、页面模块结构（10个区块）

### 导航栏（固定顶部）
- 毛玻璃效果（backdrop-filter: blur）
- 8个锚点链接：缘起 / 团队 / 文化调研 / 产业调研 / 支教纪实 / 光影 / 媒体 / 成果
- 手机端汉堡菜单折叠

### 区块 0：Hero 首屏
- 渐变背景 + SVG 纹理 + 视差滚动
- 活动名称、主题副标题、时间地点
- 两个 CTA 按钮："了解实践历程" / "查看调研成果"
- 底部"向下探索"箭头动画

### 区块 1：项目缘起（#about）
- 秀山地理介绍 + 团队简介（13人、7个小组）
- 4个数字高亮：7天 / 13人 / 7个小组 / 15处走访点位
- 7天时间线（Day1-Day7 每日行程）

### 区块 2：团队风采（#team）
- 7个工作组卡片：总统筹组 / 支教组 / 文化调研组 / 产业调研组 / 技术组 / 宣传组 / 后勤安全组
- 每张卡片含组名、emoji图标、职责描述、成员姓名标签

### 区块 3：文化调研（#culture）
- 4项非遗交替叙事布局（左图右文 / 右图左文）
- 秀山花灯（国家级非遗）/ 秀山民歌 / 吊脚楼建筑群 / 龙凤花烛
- 含何建勋老师访谈内容；其准确身份为“秀山民歌国家级非物质文化遗产代表性传承人”
- 底部数据：4个文化调研主题 / 1位国家级代表性传承人专访 / 6个走访村落与场馆 / 88份民众问卷（项目汇总）

### 区块 4：产业调研（#industry）
- 3张产业方向卡片：特色农业 / 电商产业 / 物流体系
- Canvas 柱状图：秀山电商销售额发展历程（2014-2020）
- 问卷回收记录：88份民众问卷 / 38份学生问卷 / 126份合计（原始数据表待归档复核）

### 区块 5：支教纪实（#teach）
- 4类课程卡片：红色文化 / 法治安全 / 地理科学 / 趣味科普
- 支教地点说明：微电影城托管班 + 党群服务中心托管班
- 6格课堂照片墙（placeholder）

### 区块 6：光影记录（#gallery）
- 5个分类筛选按钮：全部 / 文化调研 / 产业调研 / 支教纪实 / 团队
- 12格图片画廊（4列网格），每格含分类标签和说明文字
- 当前全部为 placeholder，待填入实拍照片

### 区块 7：媒体与传播（#media）
- 3张媒体卡片：抖音（可点击跳转）/ 微信公众号（可点击跳转）/ 中青网投稿（待发布占位）
- 抖音链接：`https://www.douyin.com/user/MS4wLjABAAAAOwQe6faum4K8Q2v7gs9tkUPmAWEM7ZGnoX7SsbBobYQOk0myyJBRoVQ6DsNQx9cA`
- 微信公众号链接：`https://mp.weixin.qq.com/cgi-bin/home?t=home/index&token=1684998895&lang=zh_CN`

### 区块 8：数字创新（#digital）
- 吊脚楼 3D 互动模型 iframe 嵌入
- 3张数字成果卡片：项目知识库（AI问答待接入） / 交互式文化地图（完善中） / 成果展示网站

### 区块 9：成果总览（#result）
- 6个成果数字：5调研报告 / 10推文 / 3短片 / 2个3D模型 / 1份项目事实库 / 383+照片；除3D模型与事实库外，其余数量仍需依据最终成果目录复核
- 团队合影 placeholder
- 致谢文字

### 页脚
- 学校/团队/时间/地点
- 快速导航（6个链接）
- 公众号信息 + 二维码 placeholder
- 版权说明 + "本网站为静态成果展示网站"

---

## 五、CSS 主题系统

每个区块有独立的配色变量，通过 `:root` CSS 变量管理：

```
--about-accent: #d4a040   (金色)
--team-accent: #1aab9a    (青色)
--culture-accent: #d4503a (红色)
--industry-accent: #38a858 (绿色)
--teach-accent: #e8a020   (橙色)
--gallery-accent: #8a5cbf (紫色)
--media-accent: #e06848   (橘色)
--digital-accent: #3a88e0 (蓝色)
--result-accent: #e07050  (珊瑚色)
```

全局主色调：`--c-accent: #c9a96e`（暖金色），背景 `--c-bg: #f8f6f2`（米白色）。

---

## 六、JavaScript 功能清单

| 功能 | 文件 | 实现方式 |
|------|------|----------|
| 导航栏滚动变色 | main.js | scroll 事件 + .scrolled 类切换 |
| 手机端汉堡菜单 | main.js | click 事件 + .open 类切换 |
| 滚动监听高亮导航 | main.js | IntersectionObserver (rootMargin: -40% 0px -60% 0px) |
| 滚动揭示动画 | main.js | IntersectionObserver (threshold: 0.12) + .reveal/.visible |
| Hero 视差效果 | main.js | scroll 事件 + translateY(scrollY * 0.35) |
| Canvas 柱状图 | main.js | Canvas 2D API + requestAnimationFrame 动画 |
| 画廊分类筛选 | main.js | click 事件 + .hidden 类切换 |
| 数字计数器 | counter.js | IntersectionObserver + requestAnimationFrame + ease-out cubic |

---

## 七、当前状态与待优化方向

### 已完成
- 完整的10区块页面骨架与视觉主题
- 响应式布局（桌面/平板/手机）
- 滚动动画与交互效果
- Canvas 数据图表
- 3D 模型嵌入
- 画廊分类筛选
- OG/SEO 标签
- 无障碍 prefers-reduced-motion
- 数据文件 site-data.js
- 部署文档

### 待优化（供 Gemini 参考）

1. **图片系统**：`assets/images/` 目录为空，所有图片位置是 placeholder。需要设计优雅的图片加载方案——用户只需把照片放入目录并修改 site-data.js 中的路径即可，不必改 HTML 结构。考虑用 JS 动态渲染图片。

2. **图片画廊增强**：当前只有分类筛选，缺少灯箱（Lightbox）放大查看功能。

3. **首屏主视觉图**：Hero 区域缺少一张代表性主视觉图片（目前纯渐变背景）。

4. **OG 封面图**：`og:image` 引用的 `assets/images/og-cover.jpg` 不存在。

5. **Google Fonts 国内加载**：Google Fonts 在中国大陆可能加载缓慢，可考虑替换为国内 CDN（fonts.loli.net 等）或添加 fallback。

6. **data-site-data.js 未实际驱动页面**：当前数据文件只是参考，页面内容仍硬编码在 HTML 中。理想方案是让 JS 从 site-data.js 读取数据动态渲染部分内容（如画廊图片、团队成员等）。

7. **视觉细节打磨**：卡片悬停效果、区块过渡动画、文字排版微调等。

8. **性能优化**：图片懒加载（当前无真实图片）、资源预加载策略、关键 CSS 内联。

9. **移动端体验**：导航栏交互优化、触摸手势支持、图片画廊的移动端浏览体验。

10. **代码组织**：CSS 618行单文件，可考虑拆分；JS 可考虑模块化。

---

## 八、本地预览方法

```bash
# 方式1：直接打开（双击 index.html）
# 方式2：本地服务器（推荐）
cd D:\self-improvement\SelfStudy\CountrysideActivities\site
python -m http.server 8080
# 浏览器打开 http://localhost:8080
```

---

## 九、项目目录中可用的照片素材

项目根目录 `D:\self-improvement\SelfStudy\CountrysideActivities\` 下已有 383+ 张实拍照片：

| 目录 | 照片数 | 内容 |
|------|--------|------|
| 产品调研组\产业调研组day1 | 131张 | Day1 产业调研全程照片 |
| 产品调研组\产业调研day2 | 135张 | Day2 全程照片 |
| 产品调研组\产业调研day2\day2产业部分 | 7张 | Day2 产业精选 |
| 产品调研组\产业调研day2\day2支教部分 | 36张 | Day2 支教精选 |
| 秀山三下乡\何建勋老师访谈\照片 | 27张 | 何建勋老师访谈照片 |
| 秀山三下乡\支教组 | 14张 | 支教课堂照片 |
| 秀山三下乡\文化组\古建筑走访\照片 | 20张 | 吊脚楼/古建筑照片 |
| 秀山三下乡\文化组\文化组第二天推文\照片 | 8张 | Day2 文化调研照片 |
| survey_covers | 4张 | 问卷封面图（AI生成） |

> 上表为既有素材盘点快照，不等同于最终成果统计。对外使用数量时，以 `data/project-knowledge.json` 的核验状态为准。
