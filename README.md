# Design System

React 组件设计系统

## 安装

```bash
npm install @irisieason/qz-react
# 或
pnpm install @irisieason/qz-react
```

## 快速开始

### 1. 导入样式（重要！）

在应用入口文件（如 `main.tsx` 或 `App.tsx`）的**最顶部**导入样式：

```tsx
// ⚠️ 必须在最顶部导入样式
import '@irisieason/qz-react';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**为什么要导入？**
- 组件的样式（包括 Tooltip、MenuItem 等）需要被加载
- 设计令牌（颜色、字体等）需要被注册
- 只需要导入一次，所有组件的样式都会生效

### 2. 注册图标

在应用入口文件中注册你需要的图标：

```tsx
import '@irisieason/qz-react';  // 先导入样式
import { addIcons } from '@irisieason/qz-react';
import { iconHome, iconSettings, iconUser } from '@irisieason/ix-icons/icons';

// 注册图标
addIcons({
  home: iconHome,
  settings: iconSettings,
  user: iconUser,
});
```

### 3. 使用组件

```tsx
import { Button, MenuItem, CategoryFilter, ApplicationMenu } from '@irisieason/qz-react';

function App() {
  return (
    <div>
      {/* 组件内部图标自动工作 */}
      <CategoryFilter searchIcon={true} clearable={true} />
      
      {/* 用户传入的图标需要先注册 */}
      <Button icon="home" showIcon={true}>Home</Button>
      <MenuItem icon="settings" label="Settings" />
      
      {/* ApplicationMenu 中的 MenuItem tooltip 会正常显示 */}
      <ApplicationMenu>
        <MenuItem icon="home" label="Home" />
        <MenuItem icon="settings" label="Settings" />
      </ApplicationMenu>
    </div>
  );
}
```

## 完整示例

```tsx
// main.tsx 或 App.tsx
import '@irisieason/qz-react';  // ⚠️ 第一步：导入样式
import { addIcons } from '@irisieason/qz-react';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标（或只注册需要的图标）
addIcons(allIcons);

// 然后使用组件
import { ApplicationMenu, MenuItem } from '@irisieason/qz-react';

function App() {
  return (
    <ApplicationMenu>
      <MenuItem icon="home" label="Home" />
      <MenuItem icon="dashboard" label="Dashboard" />
      <MenuItem icon="settings" label="Settings" />
    </ApplicationMenu>
  );
}
```

📖 **详细说明：** [图标注册指南](docs/ICON_REGISTRATION_GUIDE.md)

## 常见问题

### Q: MenuItem 的 tooltip 不显示？

**A:** 确保在应用入口文件的最顶部导入了样式：

```tsx
import '@irisieason/qz-react';  // ⚠️ 必须导入
```

### Q: 组件样式不正确？

**A:** 同样需要导入样式。所有组件的样式都包含在主入口中。

### Q: 如何只导入需要的组件？

**A:** 可以按需导入组件，但样式必须全部导入：

```tsx
import '@irisieason/qz-react';  // 样式必须全部导入
import { Button, MenuItem } from '@irisieason/qz-react';  // 组件可以按需导入
```

## 开发

启动 Storybook 开发服务器：

```bash
npm run storybook
```

启动 Vite 开发服务器：

```bash
npm run dev
```

## 构建

构建组件库：

```bash
npm run build
```

构建 Storybook 静态站点：

```bash
npm run build-storybook
```

## 项目结构

```
src/
├── tokens/          # 设计令牌（颜色、字体、间距等）
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── shadows.ts
├── components/      # React 组件
└── index.ts         # 入口文件（包含样式导入）
```

## 设计令牌

设计系统包含以下设计令牌：

- **colors**: 颜色系统（主色、辅助色、中性色、状态色）
- **typography**: 字体系统（字体族、大小、粗细、行高）
- **spacing**: 间距系统
- **shadows**: 阴影系统
