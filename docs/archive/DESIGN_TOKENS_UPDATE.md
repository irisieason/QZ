# Design Tokens 更新说明

## 概述
已将设计系统从硬编码颜色值迁移到基于 CSS 自定义属性（CSS Variables）的 token 系统。

## 更新内容

### 1. 创建 CSS Tokens 文件
- **文件**: `src/tokens/tokens.css`
- **内容**: 包含所有来自 Figma Theme Variables (Classic Dark) 的颜色 token
- **格式**: CSS 自定义属性 (CSS Variables)
- **数量**: 167 个颜色 token

### 2. 更新 Button 组件
- **文件**: `src/components/Button/Button.css`
- **变更**: 将所有硬编码的颜色值替换为 CSS 变量引用
- **示例**:
  ```css
  /* 之前 */
  background-color: #00bdff;
  
  /* 之后 */
  background-color: var(--color-primary);
  ```

### 3. 更新 Storybook 配置
- **文件**: `.storybook/preview.ts`
- **变更**: 导入 `tokens.css` 使 CSS 变量在 Storybook 中可用
- **效果**: Storybook 现在能正确显示 Classic Dark 主题的颜色

### 4. 创建自动化脚本
- **文件**: `scripts/generate-css-tokens.js`
- **功能**: 从 `src/tokens/colors.ts` 自动生成 `src/tokens/tokens.css`
- **命令**: `pnpm run generate-css-tokens`

## 使用的 Token 映射

### Primary 按钮
- 背景: `--color-primary` (#00bdff)
- Hover: `--color-primary--hover` (#1aecff)
- Active: `--color-primary--active` (#00eaff)
- Disabled: `--color-primary--disabled` (rgba(0, 170, 204, 0.45))
- 文字: `--color-primary--contrast` (#000000)

### Danger 按钮
- 背景: `--color-alarm` (#ff2453)
- Hover: `--color-alarm--hover` (#ff577b)
- Active: `--color-alarm--active` (#ff335f)
- Disabled: `--color-alarm-40` (rgba(255, 38, 85, 0.4))
- 文字: `--color-alarm--contrast` (#000000)

### Secondary 按钮
- 背景: `--color-component-1` (rgba(140, 161, 171, 0.2))
- Hover: `--color-component-1--hover` (rgba(140, 161, 171, 0.35))
- Active: `--color-component-1--active` (rgba(140, 161, 171, 0.25))
- 文字: `--color-contrast-text` (#ffffff)

### Ghost 按钮
- 背景: `--color-ghost` (transparent)
- Hover: `--color-ghost--hover` / `--color-ghost-primary--hover`
- Active: `--color-ghost--active` / `--color-ghost-primary--active`

### 其他通用 Token
- Focus 边框: `--color-focus-bdr` (#19a0ff)
- 禁用文字: `--color-weak-text` (rgba(219, 244, 255, 0.4))
- 标准边框: `--color-std-bdr` (rgba(211, 237, 249, 0.55))

## 优势

### 1. 易于维护
- 修改 token 值会自动更新所有使用该 token 的组件
- 集中管理颜色，避免重复定义

### 2. 支持主题切换
- 可以通过切换不同的 CSS 变量集来实现主题切换
- 为未来支持 Brand Dark/Light、Classic Light 主题做好准备

### 3. 与 Figma 同步
- Token 直接来自 Figma Theme Variables
- 使用脚本可以快速同步 Figma 的设计更新

### 4. 类型安全
- TypeScript tokens (`colors.ts`) 提供类型检查
- CSS tokens (`tokens.css`) 提供运行时样式

## 工作流程

### 更新 Figma 主题颜色
1. 更新 `src/tokens/colors.ts` (从 Figma Theme.json)
2. 运行 `pnpm run generate-css-tokens` 生成新的 CSS 文件
3. Storybook 会自动热更新显示新颜色

### 添加新组件
1. 在组件 CSS 中使用 `var(--token-name)` 引用 token
2. 确保在组件或全局导入 `tokens.css`

## 文件结构

```
src/
├── tokens/
│   ├── colors.ts          # TypeScript 颜色 tokens (源数据)
│   ├── tokens.css         # CSS 自定义属性 (自动生成)
│   └── index.ts           # Token 导出
├── components/
│   └── Button/
│       └── Button.css     # 使用 CSS 变量
└── ...

scripts/
├── generate-tokens.js      # 生成 TypeScript tokens
└── generate-css-tokens.js  # 生成 CSS tokens

.storybook/
└── preview.ts             # 导入 tokens.css
```

## 验证

在 Storybook (http://localhost:6006/) 中查看 Button 组件：
- ✅ Primary 按钮显示青色 (#00bdff)
- ✅ Danger 按钮显示红色 (#ff2453)
- ✅ Hover 状态颜色正确变化
- ✅ Disabled 状态显示半透明
- ✅ 深色背景 (#000028) 正确显示

## 下一步

1. 将其他组件迁移到 CSS 变量系统
2. 添加其他主题支持 (Brand Dark, Brand Light, Classic Light)
3. 考虑添加 spacing、typography 等其他 token 的 CSS 变量
