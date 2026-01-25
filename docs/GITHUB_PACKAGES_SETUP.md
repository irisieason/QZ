# GitHub Packages 配置指南

## 概述
本项目使用 GitHub Packages 中的 `@irisieason/ix-icons` 包。

## 配置步骤

### 1. 创建 GitHub Personal Access Token (PAT)

如果包是私有的，需要创建 GitHub Token：

1. 访问 GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 点击 "Generate new token (classic)"
3. 设置权限：
   - ✅ `read:packages` - 下载包
   - ✅ `write:packages` - 发布包（如果需要）
4. 生成并复制 token

### 2. 配置本地认证

#### 方法 A：使用环境变量（推荐）

在你的 shell 配置文件中添加：

**Windows PowerShell:**
```powershell
# 添加到 $PROFILE
$env:GITHUB_TOKEN="your_github_token_here"
```

**Windows CMD:**
```cmd
setx GITHUB_TOKEN "your_github_token_here"
```

**macOS/Linux (bash/zsh):**
```bash
# 添加到 ~/.bashrc 或 ~/.zshrc
export GITHUB_TOKEN="your_github_token_here"
```

#### 方法 B：直接在 .npmrc 中配置（不推荐提交到 Git）

编辑 `.npmrc` 文件：
```
@irisieason:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN_HERE
```

⚠️ **注意：** 如果使用方法 B，确保 `.npmrc` 在 `.gitignore` 中！

### 3. 安装依赖

```bash
# 使用 pnpm
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 4. 验证安装

```bash
# 检查包是否安装成功
pnpm list @irisieason/ix-icons
```

## 在代码中使用

### 基本用法

```typescript
// 导入图标组件
import { IconName } from '@irisieason/ix-icons';

// 在组件中使用
function MyComponent() {
  return (
    <button>
      <IconName />
      Click me
    </button>
  );
}
```

### 在 Button 组件中使用

```typescript
import { IconCheck, IconClose } from '@irisieason/ix-icons';

<Button 
  variant="primary"
  iconBefore={<IconCheck />}
>
  Confirm
</Button>

<Button 
  variant="danger"
  iconAfter={<IconClose />}
>
  Cancel
</Button>
```

## CI/CD 配置

### GitHub Actions

在 `.github/workflows/ci.yml` 中配置：

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@irisieason'
      
      - name: Install dependencies
        run: pnpm install
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 其他 CI 平台

设置环境变量：
- `GITHUB_TOKEN` 或 `NODE_AUTH_TOKEN`
- 值为你的 GitHub Personal Access Token

## 团队协作

### 方式 1：每个开发者配置自己的 Token

1. 每个团队成员创建自己的 GitHub PAT
2. 配置环境变量 `GITHUB_TOKEN`
3. 运行 `pnpm install`

### 方式 2：使用团队共享的 Token（不推荐）

创建一个服务账号的 Token，团队共享使用。

⚠️ **安全提示：** 不要将 Token 提交到 Git 仓库！

## 故障排查

### 错误：401 Unauthorized

**原因：** Token 未配置或已过期

**解决：**
1. 检查 `GITHUB_TOKEN` 环境变量是否设置
2. 验证 Token 是否有效
3. 确认 Token 有 `read:packages` 权限

### 错误：404 Not Found

**原因：** 包不存在或无权限访问

**解决：**
1. 确认包名拼写正确：`@irisieason/ix-icons`
2. 确认你有访问该包的权限
3. 检查包是否已发布到 GitHub Packages

### 错误：Registry 配置问题

**解决：**
```bash
# 清除 npm 缓存
pnpm store prune

# 或
npm cache clean --force

# 重新安装
pnpm install
```

## .gitignore 配置

确保以下内容在 `.gitignore` 中：

```gitignore
# 如果 .npmrc 包含 token，不要提交
.npmrc

# Node modules
node_modules/

# 环境变量文件
.env
.env.local
```

## 更新包版本

```bash
# 更新到最新版本
pnpm update @irisieason/ix-icons

# 或指定版本
pnpm add @irisieason/ix-icons@1.2.3
```

## 相关链接

- [GitHub Packages 文档](https://docs.github.com/en/packages)
- [npm 配置文档](https://docs.npmjs.com/cli/v9/configuring-npm/npmrc)
- [创建 Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

## 当前配置

- **包名**: `@irisieason/ix-icons`
- **Registry**: `https://npm.pkg.github.com`
- **Scope**: `@irisieason`
- **认证方式**: 环境变量 `GITHUB_TOKEN`
