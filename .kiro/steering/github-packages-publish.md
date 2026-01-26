---
inclusion: manual
---

# GitHub Packages 发布流程规则

## 触发提示词

当用户说以下任何一种表达时，触发此流程：
- "发布包" ⭐ 推荐（最简短）
- "发布"
- "publish"
- "发布包到 GitHub Packages"
- "发布包到 GitHub Packages，交互式引导我提供内容" ⭐ 明确要求交互式
- "发布包到 GitHub Packages，请使用交互式配置来发布"
- "发布新包"

**重要：无论用户使用哪种提示词，都必须执行交互式引导流程，绝不允许直接报错！**

## 核心原则

**互动式发布流程 - 绝对不允许直接报错！**

⚠️ **关键规则：**
1. **禁止直接报错** - 即使配置缺失，也不能直接报错退出
2. **必须交互引导** - 发现缺失配置时，必须友好地引导用户提供
3. **逐步收集信息** - 一次问一个问题，不要一次性要求所有信息
4. **提供详细步骤** - 每个配置项都要给出获取方法
5. **确认后执行** - 收集完所有信息后，显示配置摘要，确认后再执行

**错误示例（禁止）：**
```
❌ 错误：未找到 NODE_AUTH_TOKEN，发布失败
❌ 错误：缺少配置，请先配置后再发布
❌ 错误：Token 无效
```

**正确示例（必须）：**
```
✅ 正确：检测到缺少 GitHub Token，让我帮你配置...
✅ 正确：需要你的 GitHub Token，获取步骤如下...
✅ 正确：请提供你的 Token，我会帮你保存...
```

## 发布流程步骤

### 步骤 1: 检查配置文件

在执行任何发布操作前，先检查以下配置：

#### 1.1 检查 `.env` 文件

```bash
# 读取 .env 文件
# 检查是否存在 NODE_AUTH_TOKEN
```

**需要检查的内容：**
- [ ] `.env` 文件是否存在
- [ ] `NODE_AUTH_TOKEN` 是否已配置
- [ ] Token 格式是否正确（以 `ghp_` 开头）

#### 1.2 检查 `package.json` 配置

```json
{
  "name": "@irisieason/qz-react",
  "version": "x.x.x",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/irisieason/QZ.git"
  }
}
```

**需要检查的内容：**
- [ ] `name` 字段格式正确（`@username/package-name`）
- [ ] `publishConfig.registry` 指向 GitHub Packages
- [ ] `repository.url` 配置正确

#### 1.3 检查 `.npmrc` 配置

```
@irisieason:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

**需要检查的内容：**
- [ ] `.npmrc` 文件是否存在
- [ ] Registry 配置是否正确
- [ ] Auth token 配置是否正确

### 步骤 2: 生成配置检查报告

如果配置完整，显示：

```
✅ 配置检查完成

已配置项：
✓ GitHub Token (NODE_AUTH_TOKEN)
✓ 包名称 (@irisieason/qz-react)
✓ Registry 配置
✓ 仓库地址

当前版本: 1.0.2
准备发布到: https://npm.pkg.github.com
```

如果配置缺失，显示：

```
⚠️ 配置检查 - 需要补充以下信息

缺失项：
❌ GitHub Token (NODE_AUTH_TOKEN)
   → 需要在 .env 文件中配置
   → 创建 Token: https://github.com/settings/tokens
   → 需要权限: write:packages, read:packages, repo

已配置项：
✓ 包名称 (@irisieason/qz-react)
✓ Registry 配置

请提供缺失的配置信息，我会帮你更新配置文件。
```

### 步骤 3: 引导用户提供缺失信息

根据缺失项，提供具体的引导：

#### 3.1 缺少 GitHub Token

```
需要 GitHub Personal Access Token：

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 选择权限：
   - ✅ write:packages
   - ✅ read:packages
   - ✅ repo
4. 生成后复制 Token（格式：ghp_xxxxx）

请提供你的 GitHub Token，我会将其添加到 .env 文件中。
```

#### 3.2 缺少包名称配置

```
需要配置包名称：

GitHub Packages 的包名格式：@username/package-name

请提供：
1. GitHub 用户名或组织名
2. 包名称

示例：@irisieason/qz-react
```

#### 3.3 缺少仓库地址

```
需要配置 Git 仓库地址：

请提供 GitHub 仓库的完整 URL：
示例：https://github.com/irisieason/QZ.git
```

### 步骤 4: 更新配置文件

用户提供信息后，自动更新相应的配置文件：

```typescript
// 更新 .env
NODE_AUTH_TOKEN=用户提供的token

// 更新 package.json
{
  "name": "用户提供的包名",
  "repository": {
    "url": "用户提供的仓库地址"
  }
}

// 更新 .npmrc（如果需要）
```

### 步骤 5: 询问版本更新

配置完成后，询问版本更新：

```
当前版本: 1.0.2

请选择版本更新类型：
1. patch (1.0.2 → 1.0.3) - 修复 bug
2. minor (1.0.2 → 1.1.0) - 新功能
3. major (1.0.2 → 2.0.0) - 破坏性更改
4. 不更新版本（使用当前版本 1.0.2）

请输入选项 (1-4):
```

### 步骤 6: 执行发布

确认所有配置后，执行发布流程：

```bash
# 1. 更新版本（如果需要）
npm version patch/minor/major

# 2. 构建项目
pnpm run build

# 3. 发布到 GitHub Packages
pnpm publish --no-git-checks
```

### 步骤 7: 发布结果反馈

发布成功后，提供清晰的反馈：

```
✅ 发布成功！

包信息：
- 包名: @irisieason/qz-react
- 版本: 1.0.3
- Registry: GitHub Packages

查看包：
https://github.com/irisieason/qz-react/packages

安装命令：
npm install @irisieason/qz-react
```

发布失败时，提供详细的错误信息和解决方案：

```
❌ 发布失败

错误信息：
[错误详情]

可能的原因：
1. Token 权限不足
2. 包名已存在
3. 网络连接问题

建议解决方案：
[具体建议]
```

## 完整交互示例

### 示例 1: 配置完整的情况

```
用户: 发布包到 GitHub Packages，需要我提供内容请告诉我

AI: 正在检查发布配置...

✅ 配置检查完成

已配置项：
✓ GitHub Token (NODE_AUTH_TOKEN)
✓ 包名称 (@irisieason/qz-react)
✓ Registry 配置 (https://npm.pkg.github.com)
✓ 仓库地址 (https://github.com/irisieason/QZ.git)

当前版本: 1.0.2

请选择版本更新类型：
1. patch (1.0.2 → 1.0.3) - 修复 bug
2. minor (1.0.2 → 1.1.0) - 新功能
3. major (1.0.2 → 2.0.0) - 破坏性更改
4. 不更新版本（使用当前版本 1.0.2）

请输入选项 (1-4):

用户: 1

AI: 好的，将更新为 patch 版本 (1.0.2 → 1.0.3)

开始发布流程：
1. 更新版本号...
2. 构建项目...
3. 发布到 GitHub Packages...

✅ 发布成功！

包信息：
- 包名: @irisieason/qz-react
- 版本: 1.0.3
- Registry: GitHub Packages

查看包：
https://github.com/irisieason/qz-react/packages
```

### 示例 2: 缺少 Token 的情况

```
用户: 发布包到 GitHub Packages，需要我提供内容请告诉我

AI: 正在检查发布配置...

⚠️ 配置检查 - 需要补充以下信息

缺失项：
❌ GitHub Token (NODE_AUTH_TOKEN)
   → 需要在 .env 文件中配置
   → 创建 Token: https://github.com/settings/tokens
   → 需要权限: write:packages, read:packages, repo

已配置项：
✓ 包名称 (@irisieason/qz-react)
✓ Registry 配置
✓ 仓库地址

请按以下步骤创建 GitHub Token：

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 设置 Token 名称（如：npm-publish-qz-react）
4. 选择权限：
   - ✅ write:packages
   - ✅ read:packages
   - ✅ repo
5. 点击 "Generate token"
6. 复制生成的 Token（格式：ghp_xxxxx）

请提供你的 GitHub Token，我会将其添加到 .env 文件中。

用户: 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

AI: 收到 Token，正在更新配置...

✅ 配置已更新

已将 Token 添加到 .env 文件中。

现在配置完整，可以继续发布流程。

当前版本: 1.0.2

请选择版本更新类型：
1. patch (1.0.2 → 1.0.3) - 修复 bug
2. minor (1.0.2 → 1.1.0) - 新功能
3. major (1.0.2 → 2.0.0) - 破坏性更改
4. 不更新版本（使用当前版本 1.0.2）

请输入选项 (1-4):
```

## 错误处理

### 常见错误和解决方案

#### 1. 401 Unauthorized

```
❌ 发布失败：401 Unauthorized

原因：GitHub Token 无效或权限不足

解决方案：
1. 检查 Token 是否正确复制（完整的 ghp_xxxxx）
2. 确认 Token 具有以下权限：
   - write:packages
   - read:packages
   - repo
3. 如果 Token 已过期，需要重新生成

是否需要重新配置 Token？
```

#### 2. 404 Not Found

```
❌ 发布失败：404 Not Found

原因：Registry 配置错误或包名不正确

解决方案：
1. 确认包名格式：@username/package-name
2. 确认 publishConfig.registry 为：https://npm.pkg.github.com
3. 确认 .npmrc 中的 registry 配置正确

当前配置：
- 包名: @irisieason/qz-react
- Registry: https://npm.pkg.github.com

是否需要检查配置？
```

#### 3. 构建失败

```
❌ 构建失败

错误信息：
[构建错误详情]

解决方案：
1. 检查 TypeScript 类型错误
2. 检查依赖是否安装完整
3. 运行 pnpm install 重新安装依赖

是否需要查看详细错误信息？
```

## 检查清单

在执行发布前，确认以下项目：

### 配置检查
- [ ] `.env` 文件存在且包含 `NODE_AUTH_TOKEN`
- [ ] Token 格式正确（ghp_xxxxx）
- [ ] `package.json` 中的 `name` 格式正确
- [ ] `publishConfig.registry` 配置正确
- [ ] `.npmrc` 配置正确

### 代码检查
- [ ] 所有代码已提交到 Git
- [ ] 没有 TypeScript 类型错误
- [ ] 项目可以成功构建

### 版本检查
- [ ] 版本号已更新（如果需要）
- [ ] CHANGELOG 已更新（如果有）

## 自动化脚本

项目中已提供自动化发布脚本：

### Windows (PowerShell)
```powershell
.\scripts\publish.ps1
```

### Mac/Linux (Bash)
```bash
./scripts/publish.sh
```

这些脚本会自动执行所有检查和发布步骤。

## 总结

**核心原则：互动式、引导式、友好的发布流程**

1. **先检查配置** - 不要直接报错
2. **列出缺失项** - 清晰告知需要什么
3. **提供引导** - 告诉用户如何获取信息
4. **自动更新** - 用户提供信息后自动配置
5. **确认执行** - 配置完成后再执行发布
6. **清晰反馈** - 成功或失败都提供详细信息

这样的流程对非技术用户更友好，减少了出错的可能性。
