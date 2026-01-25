# 发布到 GitHub Packages 指南

## 包信息

- **包名**: `@irisieason/qz-react`
- **当前版本**: `1.0.0`
- **Registry**: GitHub Packages (https://npm.pkg.github.com)

## 前置要求

### 1. GitHub Personal Access Token (PAT)

你需要一个具有以下权限的 GitHub Token：
- `write:packages` - 发布包
- `read:packages` - 读取包
- `delete:packages` - 删除包（可选）

#### 创建 Token 步骤：

1. 访问 GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 点击 "Generate new token (classic)"
3. 设置 Token 名称（如：`npm-publish-qz-react`）
4. 选择权限：
   - ✅ `write:packages`
   - ✅ `read:packages`
   - ✅ `repo`（如果仓库是私有的）
5. 点击 "Generate token"
6. **立即复制 Token**（只显示一次！）

### 2. 配置全局 .npmrc

在你的用户目录下创建或编辑 `~/.npmrc` 文件：

**Windows**: `C:\Users\你的用户名\.npmrc`
**Mac/Linux**: `~/.npmrc`

添加以下内容（替换 `YOUR_GITHUB_TOKEN`）：

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
@irisieason:registry=https://npm.pkg.github.com
```

## 发布步骤

### 方法 1: 使用 npm publish（推荐）

```bash
# 1. 确保代码已构建
npm run build

# 2. 发布到 GitHub Packages
npm publish
```

### 方法 2: 使用环境变量（临时）

如果不想配置全局 .npmrc，可以使用环境变量：

**Windows (PowerShell)**:
```powershell
$env:NODE_AUTH_TOKEN="your_github_token"
npm publish
```

**Mac/Linux (Bash)**:
```bash
export NODE_AUTH_TOKEN=your_github_token
npm publish
```

## 版本管理

### 更新版本号

发布新版本前，需要更新版本号：

```bash
# 补丁版本 (1.0.0 → 1.0.1)
npm version patch

# 次要版本 (1.0.0 → 1.1.0)
npm version minor

# 主要版本 (1.0.0 → 2.0.0)
npm version major
```

### 发布流程

```bash
# 1. 更新版本
npm version patch

# 2. 构建项目
npm run build

# 3. 发布
npm publish

# 4. 推送 tag 到 GitHub
git push --follow-tags
```

## 使用已发布的包

### 安装包

其他项目可以这样安装你的包：

```bash
npm install @irisieason/qz-react
```

### 配置 .npmrc

使用者也需要在项目根目录或全局配置 `.npmrc`：

```
@irisieason:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

### 在项目中使用

```typescript
// 导入组件
import { Button, MenuItem, Avatar } from '@irisieason/qz-react';

// 导入样式
import '@irisieason/qz-react/dist/style.css';

// 使用组件
function App() {
  return (
    <div>
      <Button label="Click me" variant="Primary" />
      <Avatar text="JD" initials={true} />
    </div>
  );
}
```

## 验证发布

发布成功后，你可以在以下位置查看：

1. **GitHub 仓库页面**
   - 访问: https://github.com/irisieason/qz-react
   - 点击右侧的 "Packages" 链接

2. **包详情页面**
   - 访问: https://github.com/irisieason/qz-react/packages

3. **命令行验证**
   ```bash
   npm view @irisieason/qz-react
   ```

## 常见问题

### 1. 401 Unauthorized

**原因**: Token 未配置或已过期

**解决**:
- 检查 `~/.npmrc` 中的 Token 是否正确
- 确认 Token 具有 `write:packages` 权限
- 重新生成 Token

### 2. 404 Not Found

**原因**: Registry 配置错误

**解决**:
- 确认 package.json 中的 `publishConfig.registry` 正确
- 确认 .npmrc 中的 registry 配置正确

### 3. 包名冲突

**原因**: 包名已被使用

**解决**:
- GitHub Packages 的包名必须以 `@username/` 开头
- 确认包名为 `@irisieason/qz-react`

### 4. 构建失败

**原因**: 构建产物不存在

**解决**:
```bash
# 先构建再发布
npm run build
npm publish
```

## 自动化发布（可选）

### 使用 GitHub Actions

创建 `.github/workflows/publish.yml`：

```yaml
name: Publish Package

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@irisieason'
      
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

这样每次创建 GitHub Release 时会自动发布包。

## 发布检查清单

发布前请确认：

- [ ] 代码已提交到 Git
- [ ] 版本号已更新（`npm version`）
- [ ] 项目已构建（`npm run build`）
- [ ] dist 目录存在且包含构建产物
- [ ] GitHub Token 已配置
- [ ] .npmrc 配置正确
- [ ] package.json 中的 name 为 `@irisieason/qz-react`
- [ ] package.json 中的 publishConfig 正确

## 相关文档

- [GitHub Packages 文档](https://docs.github.com/en/packages)
- [npm 发布文档](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- 项目文档: `docs/GITHUB_PACKAGES_SETUP.md`

## 支持

如有问题，请：
1. 查看本文档的"常见问题"部分
2. 查看 GitHub Packages 官方文档
3. 在项目中创建 Issue
