# 部署指南

## 📋 部署前检查清单

在部署之前，请确认以下事项：

- ✅ 所有代码已通过TypeScript编译
- ✅ 生产构建成功（`npm run build`）
- ✅ 所有功能已测试验证
- ✅ 环境变量已正确配置（如需要）
- ✅ 文档已更新

## 🚀 快速部署

### 1. 查看更改

```bash
# 查看所有更改的文件
git status

# 查看具体更改内容
git diff
```

### 2. 暂存更改

```bash
# 暂存所有更改
git add .

# 或者选择性暂存
git add src/views/Profile.vue
git add src/services/favorites.ts
# ... 添加其他文件
```

### 3. 提交更改

```bash
git commit -m "feat: 添加个人中心、简历导出、职位收藏和邮件服务功能

主要更新：
- 新增个人中心页面，支持简历和收藏管理
- 完善简历导出功能（PDF和Word格式）
- 实现职位收藏功能
- 集成EmailJS真实邮件发送服务
- 修复页面遮挡问题（z-index优化）
- 优化用户体验和导航流程

详细内容请查看 CHANGELOG.md"
```

### 4. 推送到远程仓库

```bash
# 推送到main分支
git push origin main

# 或推送到当前分支
git push
```

### 5. 自动部署

推送后，GitHub Actions会自动：
1. 检出代码
2. 安装依赖
3. 构建生产版本
4. 部署到GitHub Pages

查看部署状态：
- 访问仓库的 Actions 标签页
- 查看最新的工作流运行状态

## 🔧 环境变量配置

### 生产环境

如果需要启用额外功能，请在GitHub仓库设置中配置环境变量：

1. 进入仓库 Settings -> Secrets and variables -> Actions
2. 添加以下变量（可选）：

```
VITE_API_BASE_URL          # 后端API地址（如有）
VITE_EMAILJS_SERVICE_ID    # EmailJS服务ID
VITE_EMAILJS_TEMPLATE_ID   # EmailJS模板ID
VITE_EMAILJS_PUBLIC_KEY    # EmailJS公钥
```

3. 修改 `.github/workflows/deploy.yml` 使用这些变量

### 本地开发

在项目根目录创建 `.env` 文件：

```bash
# 复制示例文件
cp .env.example .env

# 编辑配置
nano .env
```

## 📊 部署验证

部署完成后，请验证以下功能：

### 基本功能
- [ ] 首页正常加载
- [ ] 职位列表正常显示
- [ ] 职位详情页面正常
- [ ] 用户注册和登录正常

### 新功能
- [ ] 个人中心页面正常访问
- [ ] 简历导出功能正常（PDF和Word）
- [ ] 职位收藏功能正常
- [ ] 导航栏用户入口正常
- [ ] 页面无遮挡问题

### 性能检查
- [ ] 页面加载速度正常
- [ ] 无JavaScript错误
- [ ] 移动端显示正常
- [ ] 各浏览器兼容性正常

## 🐛 常见问题

### 问题1：构建失败

**现象**：GitHub Actions构建失败

**解决方案**：
```bash
# 本地测试构建
npm run build

# 检查错误并修复
# 然后重新提交和推送
```

### 问题2：部署成功但页面空白

**原因**：可能是路由配置问题

**解决方案**：
- 检查 `vite.config.ts` 中的 `base` 配置
- 确保与GitHub Pages的仓库名匹配

### 问题3：环境变量未生效

**原因**：构建时未注入环境变量

**解决方案**：
- 确保在GitHub Actions工作流中设置了环境变量
- 或者在构建时使用 `--mode production`

### 问题4：邮件发送失败

**原因**：EmailJS配置不正确

**解决方案**：
- 检查EmailJS配置是否正确
- 确认EmailJS账户状态正常
- 查看浏览器控制台错误信息

## 📈 性能优化建议

### 代码分割

当前构建包含一些大文件，建议：

```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
          'element-plus': ['element-plus'],
          'export': ['jspdf', 'docx', 'file-saver']
        }
      }
    }
  }
})
```

### 图片优化

- 使用WebP格式
- 启用懒加载
- 压缩图片资源

### CDN加速

考虑将静态资源托管到CDN：
- Cloudflare
- AWS CloudFront
- 阿里云CDN

## 🔐 安全检查

部署前请确认：

- [ ] 没有硬编码的敏感信息
- [ ] API密钥通过环境变量配置
- [ ] CORS策略正确配置
- [ ] 依赖包无已知漏洞

```bash
# 检查依赖安全性
npm audit

# 修复已知漏洞
npm audit fix
```

## 📞 获取帮助

如遇到问题：

1. 查看 [CHANGELOG.md](./CHANGELOG.md) 了解最新更新
2. 查看 [FEATURES_UPDATE.md](./FEATURES_UPDATE.md) 了解功能详情
3. 检查GitHub Actions日志
4. 查看浏览器控制台错误

## 🎉 部署成功

部署成功后，你的应用将具备以下功能：

- ✅ 完整的用户认证系统
- ✅ 个人中心和数据管理
- ✅ 专业简历生成和导出
- ✅ 职位浏览和收藏
- ✅ 真实邮件验证服务
- ✅ 精美的UI和流畅动画

恭喜！🎊
