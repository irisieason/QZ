# 故障排查指南

## 常见问题和解决方案

### 问题 1: MenuItem 的 tooltip 不显示

**症状：**
- 在 Storybook 中 MenuItem hover 时 tooltip 正常显示
- 在实际项目中使用 `@irisieason/qz-react` 包时，tooltip 不显示
- ApplicationMenu 中的 MenuItem hover 时没有 tooltip

**原因：**
- 组件样式没有被导入
- Tooltip 使用 React Portal 渲染到 `document.body`，需要样式支持

**解决方案：**

在应用入口文件（`main.tsx` 或 `App.tsx`）的**最顶部**导入样式：

```tsx
// ⚠️ 必须在最顶部导入
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

**验证：**
1. 检查浏览器开发者工具的 Network 标签
2. 确认有加载 CSS 文件
3. 检查 `<head>` 中是否有 `<style>` 标签包含 `.tooltip` 样式

---

### 问题 2: 组件样式不正确或缺失

**症状：**
- 组件显示但样式不对
- 布局错乱
- 颜色、字体不正确

**原因：**
- 设计令牌（CSS 变量）没有被加载
- 组件样式没有被导入

**解决方案：**

确保导入了主入口文件：

```tsx
import '@irisieason/qz-react';
```

这会自动导入：
- 所有组件的 CSS
- 设计令牌（CSS 变量）
- 字体定义

---

### 问题 3: 图标不显示

**症状：**
- 组件显示但图标位置是空白
- 控制台可能有警告

**原因：**
- 图标没有注册
- `ix-icons` 包没有安装

**解决方案：**

1. **安装 ix-icons 包：**
   ```bash
   npm install @irisieason/ix-icons
   ```

2. **注册图标（两步）：**
   ```tsx
   import { defineCustomElements } from '@irisieason/ix-icons/loader';
   import { addIcons } from '@irisieason/ix-icons';
   import * as allIcons from '@irisieason/ix-icons/icons';
   
   // 1. 注册 Web Component（必需！）
   defineCustomElements();
   
   // 2. 加载图标数据（必需！）
   addIcons(allIcons);
   
   // 或只注册需要的图标
   import { iconHome, iconSettings } from '@irisieason/ix-icons/icons';
   addIcons({
     home: iconHome,
     settings: iconSettings,
   });
   ```

**参考：** [图标注册指南](ICON_REGISTRATION_GUIDE.md)

---

### 问题 4: TypeScript 类型错误

**症状：**
- TypeScript 报错找不到类型定义
- 组件属性类型不正确

**原因：**
- 包的类型定义没有被正确导出
- TypeScript 配置问题

**解决方案：**

1. **检查 package.json：**
   ```json
   {
     "types": "dist/index.d.ts"
   }
   ```

2. **检查 tsconfig.json：**
   ```json
   {
     "compilerOptions": {
       "moduleResolution": "node",
       "esModuleInterop": true
     }
   }
   ```

3. **重新安装包：**
   ```bash
   npm install @irisieason/qz-react --force
   ```

---

### 问题 5: Portal 相关的警告

**症状：**
- 控制台警告：`Warning: unstable_flushDiscreteUpdates`
- 控制台警告：`Warning: ReactDOM.render has been deprecated`

**原因：**
- React 版本不兼容
- Portal 使用方式问题

**解决方案：**

确保使用 React 18+：

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

---

### 问题 6: ApplicationMenu 滚动时 tooltip 位置不对

**症状：**
- ApplicationMenu 滚动时，tooltip 位置没有跟随
- tooltip 显示在错误的位置

**原因：**
- Tooltip 使用固定定位（`position: fixed`）
- 滚动时没有重新计算位置

**当前状态：**
- 这是已知的限制
- Tooltip 在 hover 时计算位置，滚动时不会更新

**临时解决方案：**
- 滚动时 tooltip 会自动隐藏（`onMouseLeave`）
- 重新 hover 会重新计算位置

**未来改进：**
- 监听滚动事件，动态更新 tooltip 位置
- 使用 `IntersectionObserver` 检测可见性

---

### 问题 7: 在 Next.js 中使用报错

**症状：**
- `ReferenceError: document is not defined`
- `ReferenceError: window is not defined`

**原因：**
- Next.js 服务端渲染（SSR）时没有 `document` 和 `window`
- Portal 需要 `document.body`

**解决方案：**

使用动态导入（dynamic import）：

```tsx
import dynamic from 'next/dynamic';

const ApplicationMenu = dynamic(
  () => import('@irisieason/qz-react').then(mod => mod.ApplicationMenu),
  { ssr: false }
);

const MenuItem = dynamic(
  () => import('@irisieason/qz-react').then(mod => mod.MenuItem),
  { ssr: false }
);
```

或在 `_app.tsx` 中只在客户端导入样式：

```tsx
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('@irisieason/qz-react');
  }, []);
  
  return <Component {...pageProps} />;
}
```

---

### 问题 8: CSS 变量不生效

**症状：**
- 组件显示但颜色是默认值
- 自定义主题不生效

**原因：**
- CSS 变量没有被定义
- `tokens.css` 没有被导入

**解决方案：**

确保导入了主入口：

```tsx
import '@irisieason/qz-react';
```

检查浏览器开发者工具，确认 `:root` 中有 CSS 变量：

```css
:root {
  --color-primary: #00897b;
  --color-secondary: #1e88e5;
  /* ... 更多变量 */
}
```

---

## 调试技巧

### 1. 检查样式是否加载

打开浏览器开发者工具：

1. **Network 标签**
   - 查看是否有 CSS 文件被加载
   - 检查 CSS 文件的内容

2. **Elements 标签**
   - 检查 `<head>` 中是否有 `<style>` 标签
   - 搜索 `.tooltip` 或 `.menu-item` 类名

3. **Console 标签**
   - 查看是否有 CSS 相关的错误或警告

### 2. 检查 Portal 是否工作

1. **Elements 标签**
   - 在 `<body>` 的最底部查找 `.menu-item__tooltip-portal`
   - hover MenuItem 时应该能看到 tooltip 元素被创建

2. **Console 标签**
   - 运行：`document.querySelectorAll('.menu-item__tooltip-portal')`
   - 应该返回 tooltip 元素（hover 时）

### 3. 检查图标是否注册

在浏览器 Console 中运行：

```javascript
// 检查 ix-icons 是否加载
console.log(window.customElements.get('ix-icon'));

// 应该返回 IxIcon 类定义
```

### 4. 检查 React 版本

```bash
npm list react react-dom
```

确保版本是 18.x：

```
├── react@18.2.0
└── react-dom@18.2.0
```

---

## 完整的设置检查清单

在使用 `@irisieason/qz-react` 包时，确认以下步骤：

- [ ] 安装了 `@irisieason/qz-react` 包
- [ ] 安装了 `@irisieason/ix-icons` 包
- [ ] 在入口文件顶部导入了 `import '@irisieason/qz-react'`
- [ ] 注册了需要的图标
- [ ] React 版本是 18.x
- [ ] 浏览器开发者工具中能看到 CSS 样式
- [ ] 浏览器开发者工具中能看到 CSS 变量

---

## 获取帮助

如果以上方案都无法解决问题：

1. **检查版本**
   ```bash
   npm list @irisieason/qz-react
   ```

2. **清除缓存并重新安装**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **创建最小复现示例**
   - 创建一个新的 React 项目
   - 只安装必要的依赖
   - 测试问题是否仍然存在

4. **提交 Issue**
   - 访问：https://github.com/irisieason/QZ/issues
   - 提供详细的错误信息和复现步骤

---

## 相关文档

- [快速开始](../README.md)
- [图标注册指南](ICON_REGISTRATION_GUIDE.md)
- [组件文档](QUICK_REFERENCE.md)
