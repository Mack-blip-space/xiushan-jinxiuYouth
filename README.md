# 锦秀青年在秀山 · 三下乡实践成果展示网站

西南大学地理科学学院赴重庆秀山暑期"三下乡"社会实践成果展示网站。

## 技术栈

- 纯 HTML + CSS + JavaScript（无任何框架依赖）
- Google Fonts（Noto Serif SC + Noto Sans SC）
- Canvas API 绘制电商数据柱状图
- Intersection Observer 实现滚动动画
- Three.js r128 嵌入3D互动模型（吊脚楼、花灯）
- 响应式设计（支持手机/平板/桌面）

## 目录结构

```
site/
├── index.html              # 主页面（9个区块的沉浸式滚动网站）
├── _headers                # Cloudflare 安全头配置
├── css/
│   └── style.css           # 完整样式（含CSS变量主题系统）
├── js/
│   ├── main.js             # 导航/滚动动画/图表/视差/画廊筛选
│   └── counter.js          # 数字计数器动画
├── data/
│   └── site-data.js        # 集中管理所有可编辑内容
└── assets/
    ├── embed/
    │   ├── diaojiaolou.html    # Three.js 吊脚楼3D互动模型
    │   └── huadeng.html        # Three.js 花灯3D互动模型
    ├── images/                 # 图片资源（待填充实拍照片）
    └── models/
        ├── xiushan_huadeng.stl     # 花灯3D模型文件
        └── xiushan_huadeng_b64.txt # 模型Base64编码
```

## 本地运行

这是一个纯静态网站，无需构建工具。

```bash
# 方法1：直接打开
# 双击 index.html 即可在浏览器中打开

# 方法2：使用本地服务器（推荐，避免跨域问题）
# Python
cd site && python -m http.server 8080

# Node.js
npx serve site

# 然后访问 http://localhost:8080
```

## 如何修改文字

所有可编辑内容集中在 `data/site-data.js` 中。打开该文件，找到对应的字段修改即可。

### 修改活动基本信息

编辑 `data/site-data.js` 中的 `SITE_DATA.site` 对象：

```js
site: {
  title: '你的网站标题',
  teamName: '你的团队名称',
  // ...
}
```

### 修改团队成员

编辑 `SITE_DATA.team.groups` 数组，每个小组包含 `name`、`icon`、`desc`、`members` 字段。

### 修改时间线

编辑 `SITE_DATA.timeline` 数组，每项包含 `date`、`title`、`desc` 字段。

### 修改统计数据

编辑 `SITE_DATA.stats` 对象中的各个数组，每项包含 `target`（数字目标值）和 `label`（标签文字）。

## 如何更换图片

网站中的图片位置使用 placeholder 占位。替换步骤：

1. 将图片放入 `assets/images/` 目录
2. 建议命名格式：`category-name.jpg`（如 `culture-huadeng.jpg`）
3. 建议尺寸：宽度 800-1200px，质量 80%
4. 建议格式：WebP（优先）或压缩后的 JPG
5. 在 `index.html` 中将对应的 placeholder div 替换为 `<img>` 标签：

```html
<!-- 替换前 -->
<div class="culture-img placeholder"><span>秀山花灯 · 待替换</span></div>

<!-- 替换后 -->
<div class="culture-img">
  <img src="assets/images/culture-huadeng.jpg" alt="秀山花灯" width="800" height="600" loading="lazy">
</div>
```

## 如何添加新的时间线事件

在 `index.html` 的时间线区域（`<!-- 时间线：7天 -->`）添加新的 `tl-item`：

```html
<div class="tl-item">
  <div class="tl-dot active"></div>
  <div class="tl-info"><strong>Day X · X月X日</strong><span>主题</span></div>
  <p>活动描述</p>
</div>
```

## 部署

详见 [DEPLOYMENT.md](DEPLOYMENT.md)，支持以下平台：

- Cloudflare Pages（推荐，零成本）
- GitHub Pages
- Vercel
