# 快速发布指南

## 🎯 触发发布（推荐方式）

当你想发布包时，对 AI 说：

```
发布包到 GitHub Packages，交互式引导我提供内容
```

AI 会自动执行完整的交互式发布流程！

---

## 📦 交互式发布流程

### 步骤 1: 检查当前版本
AI 会读取并显示当前版本号（如：1.0.9）

### 步骤 2: 选择版本类型
AI 会询问要发布的版本类型：
- **A: patch** (1.0.9 → 1.0.10) - 修复 bug
- **B: minor** (1.0.9 → 1.1.0) - 新功能
- **C: major** (1.0.9 → 2.0.0) - 破坏性更新
- **D: custom** - 自定义版本号

### 步骤 3: 更新版本号
AI 会自动更新 `package.json` 中的版本号

### 步骤 4: 确认发布
AI 会显示即将发布的版本，询问是否继续：
- **A: 确认发布**
- **B: 取消**

### 步骤 5: 执行发布
AI 会运行 `npm run release`（只执行一次）

### 步骤 6: 验证结果
AI 会检查发布是否成功并报告结果

---

## 🔧 核心脚本

### package.json 配置

```json
{
  "scripts": {
    "prepublishOnly": "npm run build",
    "release": "npx dotenv-cli npm publish"
  }
}
```

**说明：**
- `prepublishOnly`: 发布前自动构建（TypeScript + Vite）
- `release`: 使用 dotenv-cli 加载 `.env` 文件中的 token

---

## 🔐 认证配置

### .npmrc 配置

```properties
@irisieason:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

### .env 文件（本地，不提交）

```bash
NODE_AUTH_TOKEN=ghp_你的实际token
```

**重要：**
- ✅ `.env` 文件已在 `.gitignore` 中
- ✅ Token 永远不写入配置文件
- ✅ 使用环境变量传递敏感信息

---

## 🚀 手动发布（如果需要）

如果你想手动执行发布：

```bash
# 1. 更新版本号
npm version patch  # 或 minor / major

# 2. 发布（使用 dotenv-cli 加载 token）
npm run release

# 3. 推送到 GitHub
git push --follow-tags
```

---

## ⚠️ 重要注意事项

### ✅ 正确做法

1. **使用交互式流程**（推荐）
   ```
   对 AI 说："发布包到 GitHub Packages，交互式引导我提供内容"
   ```

2. **使用 npm run release**
   ```bash
   npm run release  # 自动加载 .env 中的 token
   ```

3. **只发布一次**
   - 如果出现 409 错误，说明已经发布成功
   - 不要重复执行发布命令

### ❌ 错误做法

1. **直接使用 npm publish**
   ```bash
   npm publish  # ❌ 错误！npm 不会自动读取 .env 文件
   ```

2. **在 .npmrc 中写 token**
   ```properties
   # ❌ 错误！会泄露 token
   //npm.pkg.github.com/:_authToken=ghp_xxxxx
   ```

3. **重复发布**
   ```bash
   npm run release
   npm run release  # ❌ 错误！会导致 409 冲突
   ```

---

## 🔍 故障排查

### 问题 1: 认证失败（401 Unauthorized）

**原因：** npm 没有读取到 `.env` 文件中的 token

**解决方案：**
```bash
# 使用 dotenv-cli 加载环境变量
npm run release
```

### 问题 2: 包已存在（409 Conflict）

**原因：** 该版本已经发布成功

**解决方案：**
- 不需要重复发布
- 如果需要发布新版本，先更新版本号

### 问题 3: 权限不足（403 Forbidden）

**原因：** Token 权限不足或已过期

**解决方案：**
1. 检查 token 是否有 `write:packages` 权限
2. 检查 token 是否过期
3. 重新生成 token 并更新 `.env` 文件

---

## 📊 查看已发布的包

访问：https://github.com/irisieason/QZ/packages

---

## ✨ 记住这一句话

```
发布包到 GitHub Packages，交互式引导我提供内容
```

这是你唯一需要记住的提示词！AI 会处理所有细节。
