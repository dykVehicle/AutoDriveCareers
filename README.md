# AutoDrive Careers ✨

专注于汽车智能驾驶领域的技术岗位招聘平台。一个现代化、美观的招聘网站，具有出色的用户体验和视觉设计。

## ✨ 最新优化（2025年12月）

### 🎨 界面美化
- **渐变色彩方案**：采用现代化的蓝色-紫色-粉色渐变主题
- **玻璃态设计**：毛玻璃效果和半透明背景
- **流畅动画**：页面切换、卡片悬停、按钮交互等全方位动画优化
- **精致阴影**：多层次阴影效果，增强视觉深度

### 🚀 视觉增强
- **Hero区域**：动态渐变背景、悬浮卡片、视差效果
- **职位卡片**：悬停时的渐变背景、缩放效果、边框高亮
- **按钮设计**：渐变背景、光泽动画、悬停提升效果
- **输入框**：圆角设计、聚焦环效果、过渡动画

### 🎯 组件优化
- **导航栏**：毛玻璃效果、渐变Logo、活动状态指示器
- **搜索框**：增强型样式、渐变按钮、光泽效果
- **筛选器**：现代化卡片设计、交互式复选框
- **分页器**：自定义样式、悬停效果、圆角设计

### 🌟 特效组件
- **SensorCursor**：增强光晕效果和目标锁定提示
- **ScrollCar**：改进的汽车动画和语音气泡
- **ClickSpark**：更多颜色、更大粒子、发光效果
- **HolidayOverlay**：增强的雪花效果和节日装饰

### 🎨 全局样式系统
- **自定义滚动条**：渐变色彩的现代滚动条
- **实用工具类**：glass、gradient-text、hover-glow等
- **卡片系统**：统一的卡片样式和悬停效果
- **按钮系统**：btn-primary、btn-secondary等预设样式

## 技术栈

- Vue 3 + TypeScript + Vite
- Tailwind CSS（扩展配置）
- Element Plus（自定义主题）
- Pinia
- Vue Router
- Google Fonts（Inter & Poppins）

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

## 设计特色

### 配色方案
- **主色调**：蓝色（#3b82f6）- 代表科技与专业
- **辅助色**：紫色（#8b5cf6）- 代表创新与未来
- **点缀色**：粉色（#ec4899）- 增加活力与吸引力
- **中性色**：灰度系列 - 保持专业感

### 设计原则
1. **用户至上**：直观的导航和清晰的信息层级
2. **视觉一致性**：统一的设计语言和组件风格
3. **性能优化**：流畅的动画和快速的页面加载
4. **可访问性**：良好的对比度和键盘导航支持
5. **响应式设计**：完美适配桌面端和移动端

## 页面结构

- **首页（Home）**：Hero区域、热门领域、精选职位
- **职位列表（JobList）**：搜索、筛选、分页浏览
- **职位详情（JobDetail）**：完整信息、公司卡片、一键投递
- **登录页（Login）**：分屏设计、表单验证、视觉引导

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可

MIT License
