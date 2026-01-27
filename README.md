# Design System

React 组件设计系统

## 安装

```bash
npm install @irisieason/qz-react
# 或
pnpm install @irisieason/qz-react
```

## 快速开始

### 1. 注册图标

在应用入口文件（如 `main.tsx` 或 `App.tsx`）中注册你需要的图标：

```tsx
import { addIcons } from '@irisieason/qz-react';
import { iconHome, iconSettings, iconUser } from '@irisieason/ix-icons/icons';

// 注册图标
addIcons({
  home: iconHome,
  settings: iconSettings,
  user: iconUser,
});
```

### 2. 使用组件

```tsx
import { Button, MenuItem, CategoryFilter } from '@irisieason/qz-react';

function App() {
  return (
    <div>
      {/* 组件内部图标自动工作 */}
      <CategoryFilter searchIcon={true} clearable={true} />
      
      {/* 用户传入的图标需要先注册 */}
      <Button icon="home" showIcon={true}>Home</Button>
      <MenuItem icon="settings" label="Settings" />
    </div>
  );
}
```

📖 **详细说明：** [图标注册指南](docs/ICON_REGISTRATION_GUIDE.md)

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
└── index.ts         # 入口文件
```

## 设计令牌

设计系统包含以下设计令牌：

- **colors**: 颜色系统（主色、辅助色、中性色、状态色）
- **typography**: 字体系统（字体族、大小、粗细、行高）
- **spacing**: 间距系统
- **shadows**: 阴影系统
