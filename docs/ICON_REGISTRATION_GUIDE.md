# 图标注册指南 - 用户手册

## 概述

`qz-react` 组件库使用 `@irisieason/ix-icons` 图标库。图标分为两类：

1. **组件内部图标**：自动注册 ✅（无需操作）
2. **用户传入图标**：需要手动注册 ⚠️（本指南说明）

## 快速开始

### 第一步：安装依赖

确保你的项目已安装 `qz-react`：

```bash
npm install @irisieason/qz-react
# 或
pnpm install @irisieason/qz-react
```

### 第二步：在应用入口注册图标

在你的应用入口文件（通常是 `main.tsx`、`App.tsx` 或 `index.tsx`）中注册图标：

```tsx
// main.tsx 或 App.tsx
import { addIcons } from '@irisieason/qz-react';
import { 
  iconHome,
  iconSettings,
  iconUser,
  iconDashboard,
  iconNotification,
} from '@irisieason/ix-icons/icons';

// 注册你需要使用的图标
addIcons({
  home: iconHome,
  settings: iconSettings,
  user: iconUser,
  dashboard: iconDashboard,
  notification: iconNotification,
});
```

### 第三步：在组件中使用图标

注册后，就可以在组件中使用这些图标了：

```tsx
import { Button, MenuItem, IconButton } from '@irisieason/qz-react';

function MyApp() {
  return (
    <div>
      {/* 使用已注册的图标 */}
      <Button icon="home" showIcon={true}>Home</Button>
      <MenuItem icon="settings" label="Settings" />
      <IconButton icon="notification" />
    </div>
  );
}
```

## 完整示例

### 示例 1：React + Vite 项目

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 1. 导入 addIcons 函数
import { addIcons } from '@irisieason/qz-react';

// 2. 导入需要的图标
import { 
  iconHome,
  iconSettings,
  iconUser,
  iconDashboard,
  iconNotification,
  iconSearch,
  iconAdd,
  iconEdit,
  iconDelete,
} from '@irisieason/ix-icons/icons';

// 3. 注册图标（在渲染应用之前）
addIcons({
  home: iconHome,
  settings: iconSettings,
  user: iconUser,
  dashboard: iconDashboard,
  notification: iconNotification,
  search: iconSearch,
  add: iconAdd,
  edit: iconEdit,
  delete: iconDelete,
});

// 4. 渲染应用
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```tsx
// src/App.tsx
import { Button, MenuItem, IconButton } from '@irisieason/qz-react';

function App() {
  return (
    <div className="app">
      <header>
        <Button icon="home" showIcon={true}>Home</Button>
        <IconButton icon="notification" />
        <IconButton icon="user" />
      </header>
      
      <nav>
        <MenuItem icon="dashboard" label="Dashboard" />
        <MenuItem icon="settings" label="Settings" />
      </nav>
      
      <main>
        <Button icon="add" showIcon={true}>Add Item</Button>
        <Button icon="edit" showIcon={true}>Edit</Button>
        <Button icon="delete" showIcon={true}>Delete</Button>
      </main>
    </div>
  );
}

export default App;
```

### 示例 2：Next.js 项目

```tsx
// app/layout.tsx 或 pages/_app.tsx
'use client'; // Next.js 13+ App Router

import { useEffect } from 'react';
import { addIcons } from '@irisieason/qz-react';
import { 
  iconHome,
  iconSettings,
  iconUser,
} from '@irisieason/ix-icons/icons';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // 在客户端注册图标
    addIcons({
      home: iconHome,
      settings: iconSettings,
      user: iconUser,
    });
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## 常见问题

### Q1: 图标不显示，显示为空白或图标名称

**原因：** 图标没有注册

**解决方法：**
```tsx
// 1. 检查是否导入了 addIcons
import { addIcons } from '@irisieason/qz-react';

// 2. 检查是否导入了图标
import { iconHome } from '@irisieason/ix-icons/icons';

// 3. 检查是否注册了图标
addIcons({
  home: iconHome,  // 注意：key 是 'home'，不是 'iconHome'
});

// 4. 检查组件中使用的名称是否匹配
<Button icon="home" />  // 使用 'home'，不是 'iconHome'
```

### Q2: 如何知道图标的正确名称？

**方法 1：查看 ix-icons 包的类型定义**
```bash
# 打开这个文件查看所有可用图标
node_modules/@irisieason/ix-icons/icons/index.d.ts
```

**方法 2：常用图标名称**

| 图标名称 | 导入名称 | 用途 |
|---------|---------|------|
| `home` | `iconHome` | 首页 |
| `settings` | `iconSettings` | 设置 |
| `user` | `iconUser` | 用户 |
| `dashboard` | `iconDashboard` | 仪表盘 |
| `notification` | `iconNotification` | 通知 |
| `search` | `iconSearch` | 搜索 |
| `add` | `iconAdd` | 添加 |
| `edit` | `iconEditDocument` | 编辑 |
| `delete` | `iconTrashcan` | 删除 |
| `save` | `iconSave` | 保存 |
| `close` | `iconClose` | 关闭 |
| `check` | `iconCheck` | 确认 |
| `info` | `iconInfo` | 信息 |
| `warning` | `iconWarning` | 警告 |
| `error` | `iconError` | 错误 |

**方法 3：在线文档**
- 访问：https://www.npmjs.com/package/@irisieason/ix-icons
- 查看所有 1400+ 可用图标

### Q3: 可以一次性注册所有图标吗？

**可以，但不推荐用于生产环境：**

```tsx
// ⚠️ 仅用于开发/原型，会增加包体积
import { addIcons } from '@irisieason/qz-react';
import * as allIcons from '@irisieason/ix-icons/icons';

addIcons(allIcons);
```

**推荐做法：** 只注册你实际使用的图标

```tsx
// ✅ 推荐：按需注册
import { addIcons } from '@irisieason/qz-react';
import { iconHome, iconSettings } from '@irisieason/ix-icons/icons';

addIcons({
  home: iconHome,
  settings: iconSettings,
});
```

### Q4: 组件内部的图标需要注册吗？

**不需要！** 组件内部使用的图标已经自动注册：

```tsx
// ✅ 这些图标自动工作，无需注册
<CategoryFilter searchIcon={true} />      // search 图标
<CategoryFilter clearable={true} />       // close 图标
<ApplicationMenu expanded={true} />       // double-chevron 图标
<ContentHeader showBackButton={true} />   // arrow-left 图标
```

**自动注册的图标列表：**
- `search` - CategoryFilter 搜索图标
- `close` - CategoryFilter 清除按钮
- `chevron-right-small` - EventListItem 箭头
- `arrow-left` - ContentHeader 返回按钮
- `double-chevron-left` - ApplicationMenu 收起按钮
- `double-chevron-right` - ApplicationMenu 展开按钮

### Q5: 在多个文件中使用图标，需要多次注册吗？

**不需要！** 只需要在应用入口注册一次：

```tsx
// main.tsx - 只在这里注册一次
addIcons({
  home: iconHome,
  settings: iconSettings,
});

// ComponentA.tsx - 直接使用，无需再次注册
<Button icon="home" />

// ComponentB.tsx - 直接使用，无需再次注册
<MenuItem icon="settings" />
```

### Q6: TypeScript 报错：找不到图标

**问题：**
```tsx
import { iconHome } from '@irisieason/ix-icons/icons';
// Error: Module '"@irisieason/ix-icons/icons"' has no exported member 'iconHome'
```

**解决方法：**
1. 确保安装了 `@irisieason/ix-icons` 包
2. 检查图标名称是否正确（注意大小写）
3. 尝试重启 TypeScript 服务器

### Q7: 图标名称和导入名称的对应关系

**规则：** 导入名称是 `icon` + 驼峰命名

```tsx
// 图标名称 -> 导入名称
'home'              -> iconHome
'settings'          -> iconSettings
'user'              -> iconUser
'arrow-left'        -> iconArrowLeft
'chevron-right'     -> iconChevronRight
'double-chevron-left' -> iconDoubleChevronLeft
'edit-document'     -> iconEditDocument
'trash-can'         -> iconTrashcan  // 注意：特殊情况
```

## 最佳实践

### 1. 集中管理图标注册

创建一个专门的文件来管理图标注册：

```tsx
// src/utils/icons.ts
import { addIcons } from '@irisieason/qz-react';
import { 
  iconHome,
  iconSettings,
  iconUser,
  iconDashboard,
  iconNotification,
} from '@irisieason/ix-icons/icons';

export function registerIcons() {
  addIcons({
    home: iconHome,
    settings: iconSettings,
    user: iconUser,
    dashboard: iconDashboard,
    notification: iconNotification,
  });
}
```

```tsx
// src/main.tsx
import { registerIcons } from './utils/icons';

registerIcons();

// ... 渲染应用
```

### 2. 按模块分组注册

```tsx
// src/utils/icons.ts
import { addIcons } from '@irisieason/qz-react';
import { 
  // 导航图标
  iconHome,
  iconDashboard,
  iconSettings,
  
  // 操作图标
  iconAdd,
  iconEdit,
  iconDelete,
  iconSave,
  
  // 状态图标
  iconCheck,
  iconWarning,
  iconError,
} from '@irisieason/ix-icons/icons';

export function registerIcons() {
  addIcons({
    // 导航
    home: iconHome,
    dashboard: iconDashboard,
    settings: iconSettings,
    
    // 操作
    add: iconAdd,
    edit: iconEdit,
    delete: iconDelete,
    save: iconSave,
    
    // 状态
    check: iconCheck,
    warning: iconWarning,
    error: iconError,
  });
}
```

### 3. 使用 TypeScript 类型安全

```tsx
// src/types/icons.ts
export type AppIconName = 
  | 'home'
  | 'settings'
  | 'user'
  | 'dashboard'
  | 'notification'
  | 'add'
  | 'edit'
  | 'delete';

// 在组件中使用
interface MyButtonProps {
  icon: AppIconName;
}

function MyButton({ icon }: MyButtonProps) {
  return <Button icon={icon} showIcon={true} />;
}

// ✅ 类型安全
<MyButton icon="home" />

// ❌ TypeScript 错误
<MyButton icon="unknown" />
```

## 总结

### 记住这三步：

1. **导入 addIcons 和图标**
   ```tsx
   import { addIcons } from '@irisieason/qz-react';
   import { iconHome, iconSettings } from '@irisieason/ix-icons/icons';
   ```

2. **在应用入口注册图标**
   ```tsx
   addIcons({
     home: iconHome,
     settings: iconSettings,
   });
   ```

3. **在组件中使用图标**
   ```tsx
   <Button icon="home" />
   <MenuItem icon="settings" />
   ```

### 关键点：

- ✅ 组件内部图标自动注册，无需操作
- ⚠️ 用户传入图标需要手动注册
- 📍 在应用入口注册一次即可
- 🎯 只注册实际使用的图标
- 💡 图标名称 = 导入名称去掉 `icon` 前缀并转小写

如有问题，请参考：
- [完整图标列表](https://www.npmjs.com/package/@irisieason/ix-icons)
- [组件文档](../README.md)
