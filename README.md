# AutoDrive Careers

专注于汽车智能驾驶领域的技术岗位招聘平台。

## 技术栈

- Vue 3 + TypeScript + Vite
- Tailwind CSS
- Element Plus
- Pinia
- Vue Router

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 部署

本项目配置了 GitHub Actions 自动部署。

1. **创建 GitHub 仓库**：在 GitHub 上创建一个新的空仓库。
2. **推送到 GitHub**：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <你的GitHub仓库地址>
   git push -u origin main
   ```
3. **配置 Pages**：
   - 进入仓库 Settings -> Pages
   - 在 "Build and deployment" 下，Source 选择 **GitHub Actions**
4. **自动部署**：推送到 `main` 分支后，Action 会自动运行并将网站部署到 GitHub Pages。
