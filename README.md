# @irisieason/qz-react

React 组件设计系统 - 基于 Figma 设计的企业级组件库

---

## 🚨 新手必读：避免白屏问题

**如果你是小白用户，只需要记住一句话：**

> 在 `main.tsx` 文件的第一行添加：`import '@irisieason/qz-react/dist/style.css'`

**给 AI 的完整防错提示语（直接复制）：**

```
使用 @irisieason/qz-react@1.0.5 组件库开发。

========== 必须遵守的规则（防止出错）==========

1. 【防止白屏】在 main.tsx 第一行添加：
   import '@irisieason/qz-react/dist/style.css'

2. 【防止图标不显示】在 main.tsx 注册图标：
   import { addIcons } from '@irisieason/ix-icons';
   import * as allIcons from '@irisieason/ix-icons/icons';
   addIcons(allIcons);

3. 【防止导入错误】组件导入方式：
   import { Button, Avatar } from '@irisieason/qz-react';

4. 【防止图标错误】使用存在的图标名称：
   home, settings, user, search, close, menu, add, delete

5. 【防止属性错误】参考 TypeScript 类型定义

6. 【防止交互问题】为交互组件提供事件处理器

========== 请创建 ==========
[你想要的功能]
```

📖 **详细指南：**
- 查看下方的快速开始和常见问题章节
- [组件文档](docs/components/) - 各组件的详细说明

---

## 📦 安装

```bash
# 使用 npm
npm install @irisieason/qz-react

# 使用 pnpm
pnpm add @irisieason/qz-react

# 使用 yarn
yarn add @irisieason/qz-react
```

## 🚀 快速开始

### 第一步：导入 CSS 样式（必需！）

**⚠️ 重要：必须在应用入口文件中导入 CSS，否则组件不会显示样式！**

在你的应用入口文件（通常是 `main.tsx`、`index.tsx` 或 `App.tsx`）的**最顶部**添加：

```tsx
// ⭐ 第一步：导入 CSS（必需！）
import '@irisieason/qz-react/dist/style.css';

// 第二步：导入 React 和其他依赖
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 第三步：渲染应用
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 第二步：注册图标（必需！）

在应用入口文件中注册图标：

```tsx
// 导入 CSS
import '@irisieason/qz-react/dist/style.css';

// 导入图标注册函数
import { defineCustomElements } from '@irisieason/ix-icons/loader';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 1. 注册 Web Component（必需！）
defineCustomElements();

// 2. 加载图标数据（必需！）
addIcons(allIcons);
```

### 第三步：使用组件

在其他文件中，直接导入和使用组件：

```tsx
// 在任何组件文件中（不需要再导入 CSS）
import { Button, Avatar, MenuItem } from '@irisieason/qz-react';

function MyComponent() {
  return (
    <div>
      <Button 
        label="点击我" 
        variant="Primary" 
        onClick={() => alert('Hello!')}
      />
      <Avatar text="张三" />
      <MenuItem icon="home" label="首页" />
    </div>
  );
}
```

## 📝 完整示例

### Vite + React 项目

**文件：`src/main.tsx`**

```tsx
// ========== 第一步：导入 CSS（必需！）==========
import '@irisieason/qz-react/dist/style.css';

// ========== 第二步：注册图标 ==========
import { defineCustomElements } from '@irisieason/ix-icons/loader';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册 Web Component
defineCustomElements();
// 加载图标数据
addIcons(allIcons);

// ========== 第三步：导入 React ==========
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ========== 第四步：渲染应用 ==========
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**文件：`src/App.tsx`**

```tsx
// 在其他文件中，只需要导入组件
import { 
  Button, 
  Avatar, 
  ApplicationMenu, 
  MenuItem,
  ApplicationHeader 
} from '@irisieason/qz-react';

function App() {
  return (
    <div className="app">
      <ApplicationHeader>
        <h1>我的应用</h1>
      </ApplicationHeader>
      
      <ApplicationMenu>
        <MenuItem icon="home" label="首页" />
        <MenuItem icon="dashboard" label="仪表盘" />
        <MenuItem icon="settings" label="设置" />
      </ApplicationMenu>
      
      <main>
        <Button 
          label="主要按钮" 
          variant="Primary" 
          onClick={() => console.log('点击了')}
        />
        <Avatar text="用户" />
      </main>
    </div>
  );
}

export default App;
```

### Next.js 项目

**文件：`pages/_app.tsx`**

```tsx
// ========== 在 _app.tsx 中导入 CSS 和注册图标 ==========
import '@irisieason/qz-react/dist/style.css';
import { defineCustomElements } from '@irisieason/ix-icons/loader';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';
import type { AppProps } from 'next/app';

// 注册 Web Component
defineCustomElements();
// 加载图标数据
addIcons(allIcons);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

**文件：`pages/index.tsx`**

```tsx
// 在页面中直接使用组件
import { Button, Avatar, MenuItem } from '@irisieason/qz-react';

export default function Home() {
  return (
    <div>
      <h1>首页</h1>
      <Button label="点击我" variant="Primary" />
      <Avatar text="用户" />
    </div>
  );
}
```

## 🎯 可用组件

### 基础组件
- **Button** - 按钮组件（支持多种变体：Primary、Secondary、Danger 等）
- **IconButton** - 图标按钮
- **Avatar** - 头像组件
- **Tooltip** - 工具提示
- **ToggleButton** - 切换按钮

### 导航组件
- **ApplicationHeader** - 应用头部
- **ApplicationMenu** - 应用菜单
- **MenuItem** - 菜单项
- **MenuItemList** - 菜单项列表

### 输入组件
- **CategoryFilter** - 分类筛选器（带搜索功能）

### 布局组件
- **ContentHeader** - 内容头部
- **Cardcontainer** - 卡片容器
- **Slot** - 插槽组件

### 数据展示组件
- **EventListItem** - 事件列表项
- **EventItemContent** - 事件项内容
- **DeviceStatusChart** - 设备状态图表
- **StatusHistoryChart** - 状态历史图表

### 复合组件
- **AvatarButtonMenu** - 头像按钮菜单（头像 + 下拉菜单）

## 🤖 AI 辅助开发

如果你使用 AI IDE（如 Cursor、GitHub Copilot、Kiro 等），可以使用以下提示语：

### 快速开始提示语

```
使用 @irisieason/qz-react@1.0.5 组件库创建页面。

重要提醒：
1. 必须在入口文件导入 CSS：import '@irisieason/qz-react/dist/style.css'
2. 必须注册图标（两步）：
   - defineCustomElements() // 注册 Web Component
   - addIcons(allIcons) // 加载图标数据
3. 所有组件从 @irisieason/qz-react 导入
4. 图标使用 <ix-icon name="图标名" size="24" />

可用组件：Button, Avatar, MenuItem, ApplicationMenu, IconButton, CategoryFilter, 
AvatarButtonMenu, Tooltip, ToggleButton, EventListItem, ApplicationHeader, 
ContentHeader, Cardcontainer, DeviceStatusChart, StatusHistoryChart, 
EventItemContent, MenuItemList, Slot

请帮我创建 [描述你想要的页面/功能]
```

### 修复白屏问题提示语

```
我的页面使用了 @irisieason/qz-react 组件但是白屏。

请检查并修复：
1. 是否在入口文件（main.tsx 或 App.tsx）导入了 CSS：
   import '@irisieason/qz-react/dist/style.css'
2. 是否完整注册了图标（两步）：
   import { defineCustomElements } from '@irisieason/ix-icons/loader';
   import { addIcons } from '@irisieason/ix-icons';
   import * as allIcons from '@irisieason/ix-icons/icons';
   defineCustomElements(); // 第一步：注册 Web Component
   addIcons(allIcons); // 第二步：加载图标数据
3. 组件导入是否正确：
   import { Button, Avatar } from '@irisieason/qz-react'
```

📖 **更多 AI 提示语模板：** [AI 使用指南](AI_USAGE_GUIDE.md)

## ❓ 常见问题

### Q1: 组件显示但没有样式（白屏）？

**A:** 确保在入口文件导入了 CSS：

```tsx
// ⚠️ 必须在入口文件（main.tsx 或 App.tsx）添加这一行
import '@irisieason/qz-react/dist/style.css';
```

### Q2: 图标不显示？

**A:** 确保完整注册了图标（需要两步）：

```tsx
// 第一步：注册 Web Component
import { defineCustomElements } from '@irisieason/ix-icons/loader';
defineCustomElements();

// 第二步：加载图标数据
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';
addIcons(allIcons);
```

### Q3: 需要在每个文件中都导入 CSS 吗？

**A:** 不需要！只需要在入口文件（`main.tsx` 或 `App.tsx`）导入一次即可。

```tsx
// ✅ 正确：在入口文件导入一次
// main.tsx
import '@irisieason/qz-react/dist/style.css';

// ❌ 错误：不需要在每个文件中导入
// MyComponent.tsx
import '@irisieason/qz-react/dist/style.css';  // 不需要！
```

### Q4: 为什么要手动导入 CSS？

**A:** 这是 Vite 库模式的标准做法，与 Material UI、Ant Design 等主流组件库一致。这样做的好处：
- CSS 可以被浏览器单独缓存
- 构建产物更小
- 性能更好

### Q5: 如何只导入需要的组件？

**A:** 可以按需导入组件，但 CSS 必须全部导入：

```tsx
// CSS 必须全部导入
import '@irisieason/qz-react/dist/style.css';

// 组件可以按需导入
import { Button, Avatar } from '@irisieason/qz-react';
```


## 📚 文档

- **[快速开始](#-快速开始)** - 5 分钟上手指南
- **[AI 辅助开发](#-ai-辅助开发)** - AI IDE 提示语模板和完整示例
- **[常见问题](#-常见问题)** - 常见问题解决方案
- **[组件列表](#-可用组件)** - 所有可用组件
- **[组件详细文档](docs/components/)** - 各组件的详细 API 文档
- **[图标使用指南](docs/ICON_USAGE_GUIDE.md)** - 图标注册和使用说明
- **[发布指南](docs/PUBLISH_GUIDE.md)** - 开发者发布流程
- **[项目结构](docs/PROJECT_STRUCTURE.md)** - 项目目录结构说明

## 🛠️ 开发

启动 Storybook 开发服务器：

```bash
npm run storybook
```

启动 Vite 开发服务器：

```bash
npm run dev
```

## 📦 构建

构建组件库：

```bash
npm run build
```

构建 Storybook 静态站点：

```bash
npm run build-storybook
```

## 📁 项目结构

```
src/
├── tokens/          # 设计令牌（颜色、字体、间距等）
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── shadows.ts
├── components/      # React 组件
│   ├── Button/
│   ├── Avatar/
│   ├── MenuItem/
│   └── ...
├── icons.ts         # 图标自动注册
└── index.ts         # 入口文件
```

## 🎨 设计令牌

设计系统包含以下设计令牌：

- **colors** - 颜色系统（主色、辅助色、中性色、状态色）
- **typography** - 字体系统（字体族、大小、粗细、行高）
- **spacing** - 间距系统
- **shadows** - 阴影系统
- **borders** - 边框系统

## 📄 许可证

MIT License

## 🤝 贡献

欢迎贡献！请查看 [贡献指南](CONTRIBUTING.md)。

## 📞 支持

如果遇到问题，请：

1. 查看 [常见问题](#-常见问题) 章节
2. 查看 [组件文档](docs/components/)
3. 提交 [Issue](https://github.com/irisieason/QZ/issues)
