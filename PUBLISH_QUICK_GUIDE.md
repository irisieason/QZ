# 快速发布指南

## 📦 发布到 GitHub Packages

### 前提条件

确保 `.env` 文件中已配置 GitHub Token：

```env
NODE_AUTH_TOKEN=ghp_你的token
```

### 发布步骤

1. **更新版本号**（可选）：
   ```bash
   npm version patch  # 1.0.4 -> 1.0.5
   # 或
   npm version minor  # 1.0.4 -> 1.1.0
   # 或
   npm version major  # 1.0.4 -> 2.0.0
   ```

2. **发布包**：
   ```bash
   npm run publish
   ```

就这么简单！✨

## 🔧 工作原理

- `npm run publish` 会自动：
  1. 使用 `dotenv-cli` 从 `.env` 文件读取 `NODE_AUTH_TOKEN`
  2. 将其加载到环境变量中
  3. 执行 `npm publish` 发布到 GitHub Packages

## 📝 注意事项

- ✅ `.env` 文件已在 `.gitignore` 中，不会被提交
- ✅ `.npmrc` 文件也在 `.gitignore` 中，不会泄露 token
- ✅ 不需要手动设置环境变量
- ✅ 跨平台兼容（Windows、Mac、Linux）

## 🚀 完整发布流程示例

```bash
# 1. 确保代码已提交
git add .
git commit -m "feat: add new feature"

# 2. 更新版本并发布
npm version patch
npm run publish

# 3. 推送到 GitHub
git push
git push --tags
```

## ❓ 常见问题

### Q: 发布失败，提示 401 Unauthorized？
A: 检查 `.env` 文件中的 `NODE_AUTH_TOKEN` 是否正确。

### Q: 发布失败，提示 409 Conflict？
A: 该版本已经发布过了，需要先更新版本号：`npm version patch`

### Q: 如何查看已发布的包？
A: 访问：https://github.com/irisieason/QZ/packages
