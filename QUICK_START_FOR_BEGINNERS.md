# 新手快速开始指南 - 避免白屏问题

> 这是给不懂技术的小白用户准备的超简单指南

## 🚨 重要：避免白屏的唯一规则

**在项目的 `main.tsx` 或 `index.tsx` 文件的第一行，必须写上：**

```tsx
import '@irisieason/qz-react/dist/style.css';
```

**就这一行！** 如果没有这一行，页面就会白屏。

## 📋 给 AI 的标准提示语

### 创建新项目时

复制这段话给 AI：

```
使用 @irisieason/qz-react@1.0.5 组件库创建项目。

⚠️ 重要：在 main.tsx 文件的第一行必须添加：
import '@irisieason/qz-react/dist/style.css'

然后在 main.tsx 中注册图标：
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';
addIcons(allIcons);

请帮我创建 [你想要的功能]
```

### 修复白屏时

复制这段话给 AI：

```
页面白屏了，请帮我修复。

检查清单：
1. 打开 main.tsx 或 index.tsx 文件
2. 确保第一行是：import '@irisieason/qz-react/dist/style.css'
3. 如果没有，请添加这一行
4. 确保注册了图标
```

## 🎯 完整的 main.tsx 模板

让 AI 按照这个模板创建 `main.tsx` 文件：

```tsx
// ⭐ 第一行：导入 CSS（必需！）
import '@irisieason/qz-react/dist/style.css';

// 第二步：注册图标
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';
addIcons(allIcons);

// 第三步：导入 React
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 第四步：渲染应用
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## ✅ 检查清单

在让 AI 开发之前，确保告诉 AI：

- [ ] 在 main.tsx 第一行导入 CSS
- [ ] 注册图标
- [ ] 然后才能使用组件

## 🆘 如果还是白屏

对 AI 说：

```
请打开 main.tsx 文件，检查是否有这一行：
import '@irisieason/qz-react/dist/style.css'

如果没有，请在文件的第一行添加。
如果有，请检查路径是否正确。
```

## 💡 记住这一句话

**"在 main.tsx 第一行导入 CSS"**

这是避免白屏的唯一关键！

## 📞 常见问题

### Q: 我不知道什么是 main.tsx？

**A:** 告诉 AI："请在项目的入口文件（main.tsx 或 index.tsx）添加 CSS 导入"

### Q: 我不知道怎么找到 main.tsx？

**A:** 告诉 AI："请帮我找到并打开 main.tsx 文件，然后添加 CSS 导入"

### Q: 我不确定是否添加了？

**A:** 告诉 AI："请检查 main.tsx 文件，确认是否已经导入了 CSS"

## 🎉 总结

作为小白用户，你只需要记住：

1. **告诉 AI 使用 @irisieason/qz-react@1.0.5**
2. **提醒 AI 在 main.tsx 第一行导入 CSS**
3. **其他的让 AI 自己处理**

就这么简单！
