# 发布工作流程详细文档

## 📋 目录

1. [快速开始](#快速开始)
2. [交互式发布流程](#交互式发布流程)
3. [技术实现细节](#技术实现细节)
4. [配置文件说明](#配置文件说明)
5. [故障排查](#故障排查)
6. [最佳实践](#最佳实践)

---

## 快速开始

### 唯一需要记住的命令

对 AI 说：

```
发布包到 GitHub Packages，交互式引导我提供内容
```

AI 会自动处理所有细节！

---

## 交互式发布流程

### 流程图

```
开始
  ↓
检查当前版本 (读取 package.json)
  ↓
询问版本类型 (A: patch / B: minor / C: major / D: custom)
  ↓
更新版本号 (修改 package.json)
  ↓
确认发布 (A: 确认 / B: 取消)
  ↓
执行发布 (npm run release)
  ↓
验证结果 (检查是否成功)
  ↓
结束
```

### 详细步骤

#### 步骤 1: 检查当前版本

AI 会读取 `package.json` 并显示：
```
当前版本: 1.0.9
```

#### 步骤 2: 选择版本类型

AI 会提供选项：
```
请选择要发布的版本类型：
A. patch (1.0.9 → 1.0.10) - 修复 bug
B. minor (1.0.9 → 1.1.0) - 新功能
C. major (1.0.9 → 2.0.0) - 破坏性更新
D. custom - 自定义版本号
```

**用户回复：** `A` 或 `B` 或 `C` 或 `D`

#### 步骤 3: 更新版本号

AI 会自动修改 `package.json`：
```json
{
  "version": "1.0.10"  // 从 1.0.9 更新
}
```

#### 步骤 4: 确认发布

AI 会显示发布信息并询问：
```
✅ 版本号已更新为 1.0.10

即将发布版本: 1.0.10
包名: @irisieason/qz-react
Registry: https://npm.pkg.github.com

是否继续发布？
A. 确认发布
B. 取消
```

**用户回复：** `A` 或 `B`

#### 步骤 5: 执行发布

AI 会运行：
```bash
npm run release
```

**等价于：**
```bash
npx dotenv-cli npm publish
```

#### 步骤 6: 验证结果

AI 会检查发布结果并报告：
```
✅ 发布成功！

版本: 1.0.10
包名: @irisieason/qz-react
查看: https://github.com/irisieason/QZ/packages
```

---

## 技术实现细节

### 核心脚本

#### package.json 配置

```json
{
  "name": "@irisieason/qz-react",
  "version": "1.0.9",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "scripts": {
    "prepublishOnly": "npm run build",
    "release": "npx dotenv-cli npm publish"
  }
}
```

**脚本说明：**

1. **`prepublishOnly`**
   - 在 `npm publish` 之前自动运行
   - 执行 `npm run build` 构建项目
   - 确保发布的是最新的构建产物

2. **`release`**
   - 使用 `dotenv-cli` 加载 `.env` 文件
   - 将 `NODE_AUTH_TOKEN` 加载到环境变量
   - 执行 `npm publish` 发布到 GitHub Packages

### 执行流程

```
npm run release
  ↓
npx dotenv-cli npm publish
  ↓
dotenv-cli 读取 .env 文件
  ↓
加载 NODE_AUTH_TOKEN 到环境变量
  ↓
触发 prepublishOnly 钩子
  ↓
执行 npm run build
  ↓
TypeScript 编译 (tsc)
  ↓
Vite 构建 (vite build)
  ↓
生成 dist/ 目录
  ↓
执行 npm publish
  ↓
读取 .npmrc 配置
  ↓
使用 NODE_AUTH_TOKEN 认证
  ↓
上传到 GitHub Packages
  ↓
发布成功
```

---

## 配置文件说明

### 1. .env 文件

**位置：** 项目根目录 `.env`

**内容：**
```bash
NODE_AUTH_TOKEN=ghp_你的实际token
```

**说明：**
- 存储 GitHub Personal Access Token
- **不提交到 Git**（已在 `.gitignore` 中）
- Token 需要 `write:packages` 权限

**如何获取 Token：**
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 选择权限：
   - ✅ `write:packages`
   - ✅ `read:packages`
   - ✅ `repo`
4. 生成并复制 token
5. 粘贴到 `.env` 文件

### 2. .npmrc 文件

**位置：** 项目根目录 `.npmrc`

**内容：**
```properties
@irisieason:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

**说明：**
- 指定 `@irisieason` 作用域的包发布到 GitHub Packages
- 使用环境变量 `${NODE_AUTH_TOKEN}` 进行认证
- **不直接写 token**，保证安全性
- **不提交到 Git**（已在 `.gitignore` 中）

### 3. package.json 配置

**关键字段：**

```json
{
  "name": "@irisieason/qz-react",
  "version": "1.0.9",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/irisieason/QZ.git"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ]
}
```

**字段说明：**
- `name`: 包名，必须以 `@username/` 开头
- `version`: 当前版本号
- `publishConfig.registry`: 发布到 GitHub Packages
- `repository.url`: 仓库地址
- `files`: 发布时包含的文件

---

## 故障排查

### 问题 1: 401 Unauthorized

**错误信息：**
```
npm ERR! code E401
npm ERR! 401 Unauthorized - PUT https://npm.pkg.github.com/@irisieason%2fqz-react
```

**原因：**
- npm 没有读取到 `.env` 文件中的 token
- 直接使用 `npm publish` 而不是 `npm run release`

**解决方案：**
```bash
# ✅ 正确：使用 dotenv-cli 加载环境变量
npm run release

# ❌ 错误：npm 不会自动读取 .env
npm publish
```

### 问题 2: 409 Conflict

**错误信息：**
```
npm ERR! code E409
npm ERR! 409 Conflict - PUT https://npm.pkg.github.com/@irisieason%2fqz-react
npm ERR! You cannot publish over the previously published versions: 1.0.9
```

**原因：**
- 该版本已经发布成功
- 重复执行发布命令

**解决方案：**
- 不需要重复发布
- 如果需要发布新版本，先更新版本号：
  ```bash
  npm version patch  # 或 minor / major
  npm run release
  ```

### 问题 3: 403 Forbidden

**错误信息：**
```
npm ERR! code E403
npm ERR! 403 Forbidden - PUT https://npm.pkg.github.com/@irisieason%2fqz-react
```

**原因：**
- Token 权限不足
- Token 已过期
- Token 无效

**解决方案：**
1. 访问 https://github.com/settings/tokens
2. 检查 token 是否有 `write:packages` 权限
3. 如果过期，重新生成 token
4. 更新 `.env` 文件中的 token

### 问题 4: 构建失败

**错误信息：**
```
npm ERR! prepublishOnly: npm run build
npm ERR! Exit status 1
```

**原因：**
- TypeScript 编译错误
- Vite 构建失败

**解决方案：**
1. 检查 TypeScript 错误：
   ```bash
   npm run build
   ```
2. 修复错误后重新发布

---

## 最佳实践

### 1. 版本号管理

遵循 [语义化版本](https://semver.org/lang/zh-CN/)：

- **Patch (1.0.0 → 1.0.1)**
  - 修复 bug
  - 小的改进
  - 不影响 API
  - **最常用**

- **Minor (1.0.0 → 1.1.0)**
  - 新功能
  - 向后兼容
  - 不破坏现有代码

- **Major (1.0.0 → 2.0.0)**
  - 破坏性更改
  - API 变更
  - 需要用户更新代码

### 2. 发布前检查清单

- [ ] 代码已提交到 Git
- [ ] 所有测试通过
- [ ] TypeScript 编译无错误
- [ ] 更新了 CHANGELOG.md
- [ ] 版本号已更新
- [ ] `.env` 文件中的 token 有效

### 3. 发布后操作

```bash
# 1. 推送代码和标签到 GitHub
git push
git push --tags

# 2. 验证发布
# 访问 https://github.com/irisieason/QZ/packages

# 3. 测试安装
npm install @irisieason/qz-react@latest
```

### 4. 安全性建议

- ✅ **永远不要**在配置文件中直接写 token
- ✅ **永远不要**提交 `.env` 文件到 Git
- ✅ **定期更新** GitHub token
- ✅ **使用最小权限**原则（只给必要的权限）
- ✅ **定期检查** token 的使用情况

### 5. 团队协作

如果多人发布包：

1. **共享 token**（不推荐）
   - 每个人在本地创建自己的 `.env` 文件
   - 使用相同的 token

2. **各自 token**（推荐）
   - 每个人创建自己的 token
   - 在本地 `.env` 文件中配置
   - 确保所有 token 都有 `write:packages` 权限

---

## 附录

### A. 完整的 .gitignore 配置

确保以下文件不被提交：

```gitignore
# 环境变量
.env
.env.local
.env.*.local

# npm 配置
.npmrc

# 构建产物
dist/
node_modules/
```

### B. 查看已发布的包

**GitHub 页面：**
https://github.com/irisieason/QZ/packages

**npm 命令：**
```bash
npm view @irisieason/qz-react
```

### C. 安装已发布的包

**在其他项目中使用：**

1. 配置 `.npmrc`：
   ```properties
   @irisieason:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=YOUR_TOKEN
   ```

2. 安装包：
   ```bash
   npm install @irisieason/qz-react
   ```

3. 使用组件：
   ```typescript
   import { Button, MenuItem } from '@irisieason/qz-react';
   import '@irisieason/qz-react/dist/style.css';
   ```

---

## 总结

### 核心要点

1. ✅ 使用交互式流程发布（对 AI 说触发词）
2. ✅ Token 存储在 `.env` 文件（不提交到 Git）
3. ✅ 使用 `npm run release`（自动加载 token）
4. ✅ 只发布一次（避免 409 错误）
5. ✅ 遵循语义化版本规范

### 唯一需要记住的

```
发布包到 GitHub Packages，交互式引导我提供内容
```

AI 会处理所有细节！
