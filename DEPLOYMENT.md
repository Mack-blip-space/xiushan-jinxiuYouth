# 部署指南

本网站主体仍为纯静态项目，支持多种免费部署平台。“锦秀问答”当前使用 Coze 历史版 Chat SDK 的免鉴权基础能力按需加载，因此仓库中不保存 PAT、OAuth Token 等访问密钥，也无需租用传统服务器。该方案适合比赛演示；正式长期运营时应升级为 OAuth 鉴权。

> 安全提示：不要把扣子安装代码中的 `pat_...` 令牌提交到 GitHub。正式上线若改用鉴权模式，应通过 OAuth/SAT 和 Serverless 函数获取短期访问令牌。

## Cloudflare Pages（推荐）

### 步骤

1. 将 `site/` 目录内容推送到 GitHub 仓库
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → Create → Pages → Connect to Git
3. 选择你的仓库
4. 配置构建设置：
   - **Framework preset**: None
   - **Build command**: 留空（纯静态，无需构建）
   - **Build output directory**: `/`（根目录）
   - **Root directory**: `/`（或你的子目录路径）
5. 点击 Save and Deploy

### 自定义域名

1. Pages 项目 → Custom domains → Set up a custom domain
2. 输入你的域名，按提示添加 DNS 记录
3. 等待 SSL 证书自动签发

### 安全头

`_headers` 文件已配置以下安全头：
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()

---

## GitHub Pages

### 步骤

1. 创建 GitHub 仓库，将 `site/` 目录内容推送上去：

```bash
cd site
git init
git add .
git commit -m "init: 三下乡成果展示网站"
git remote add origin https://github.com/你的用户名/你的仓库.git
git push -u origin main
```

2. 进入仓库 → Settings → Pages
3. Source 选择 **Deploy from a branch**
4. Branch 选择 `main`，文件夹选择 `/ (root)`
5. 点击 Save

### 子路径处理

如果部署在 `https://用户名.github.io/仓库名/` 下，资源路径需要调整。当前网站使用相对路径，通常无需修改。如果出现资源加载失败，在 `index.html` 的 `<head>` 中添加：

```html
<base href="/仓库名/">
```

### 使用 GitHub Actions 自动部署

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./
      - uses: actions/deploy-pages@v4
```

然后在仓库 Settings → Pages → Source 改为 **GitHub Actions**。

### 自定义域名

1. Settings → Pages → Custom domain
2. 输入你的域名
3. 在域名 DNS 中添加 CNAME 记录指向 `用户名.github.io`
4. 勾选 Enforce HTTPS

---

## Vercel

### 步骤

1. 登录 [Vercel](https://vercel.com) → New Project
2. Import 你的 GitHub 仓库
3. 配置：
   - **Framework Preset**: Other
   - **Root Directory**: `./`（或 `site/` 如果仓库根目录不是 site）
   - **Build Command**: 留空
   - **Output Directory**: `./`（即根目录）
   - **Install Command**: 留空
4. 点击 Deploy

### 环境变量

无需任何环境变量。

### 重新部署

推送代码到 GitHub 后，Vercel 会自动重新部署。

### 自定义域名

1. Vercel 项目 → Settings → Domains
2. 添加你的域名
3. 按提示配置 DNS 记录

---

## 通用注意事项

- 所有资源路径使用相对路径，兼容任意子路径部署
- 3D 模型嵌入使用 iframe 相对路径，无需额外配置
- Google Fonts 在中国大陆可能加载较慢，可考虑替换为国内 CDN（如 fonts.loli.net）
- 部署后建议用 Ctrl+Shift+R 强制刷新确认页面更新
