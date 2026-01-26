# 快速发布指南

## 🎯 发布提示语

当你想发布包时，可以说：

```
发布包
```

**或者更详细的：**
```
发布包到 GitHub Packages，请使用交互式配置来发布
```

**效果完全一样！** 推荐用短的，更好记。

AI 会自动：
1. ✅ 检查所有配置（Token、包名、Registry）
2. ✅ 列出缺失的配置项
3. ✅ 引导你提供缺失信息
4. ✅ 自动更新配置文件
5. ✅ 询问版本更新类型
6. ✅ 执行构建和发布
7. ✅ 提供清晰的结果反馈

## 发布流程示例

### 场景 1: 配置完整（最常见）

```
你: 发布包

AI: 正在检查发布配置...

✅ 配置检查完成

已配置项：
✓ GitHub Token
✓ 包名称 (@irisieason/qz-react)
✓ Registry 配置
✓ 仓库地址

当前版本: 1.0.2

请选择版本更新类型：
1. patch (1.0.2 → 1.0.3) - 修复 bug
2. minor (1.0.2 → 1.1.0) - 新功能
3. major (1.0.2 → 2.0.0) - 破坏性更改
4. 不更新版本

你: 1

AI: [执行发布...]

✅ 发布成功！
版本: 1.0.3
查看: https://github.com/irisieason/qz-react/packages
```

### 场景 2: 缺少配置

```
你: 发布包到 GitHub Packages，需要我提供内容请告诉我

AI: 正在检查发布配置...

⚠️ 需要补充以下信息：

❌ GitHub Token (NODE_AUTH_TOKEN)
   → 创建 Token: https://github.com/settings/tokens
   → 需要权限: write:packages, read:packages, repo

请提供你的 GitHub Token

你: ghp_xxxxx

AI: ✅ 配置已更新

现在可以继续发布...
[后续流程同场景 1]
```

## 版本更新说明

### Patch (1.0.0 → 1.0.1)
- 修复 bug
- 小的改进
- 不影响 API

### Minor (1.0.0 → 1.1.0)
- 新功能
- 向后兼容
- 不破坏现有代码

### Major (1.0.0 → 2.0.0)
- 破坏性更改
- API 变更
- 需要用户更新代码

## 当前配置状态

### ✅ 已配置
- GitHub Token: 已设置
- 包名: @irisieason/qz-react
- Registry: https://npm.pkg.github.com
- 仓库: https://github.com/irisieason/QZ.git
- 当前版本: 1.0.2

### 📁 配置文件位置
- `.env` - GitHub Token
- `package.json` - 包配置
- `.npmrc` - Registry 配置

## 自动化脚本（可选）

如果你想手动执行发布脚本：

### Windows
```powershell
.\scripts\publish.ps1
```

### Mac/Linux
```bash
./scripts/publish.sh
```

## 常见问题

### Q: 如果 Token 过期了怎么办？
A: 说"发布包到 GitHub Packages，需要我提供内容请告诉我"，AI 会检测到 Token 失效并引导你更新。

### Q: 如何查看已发布的包？
A: 访问 https://github.com/irisieason/qz-react/packages

### Q: 如何安装已发布的包？
A: 
```bash
npm install @irisieason/qz-react
```

### Q: 发布失败怎么办？
A: AI 会提供详细的错误信息和解决方案，按照提示操作即可。

## 记住这一句话

```
发布包到 GitHub Packages，需要我提供内容请告诉我
```

这是你唯一需要记住的提示词！
