# BasicNavigation 组件开发总结

## 组件信息

**组件名称**: BasicNavigation  
**Figma 节点 ID**: 2544:75812  
**创建日期**: 2026-01-17  
**状态**: ✅ 完成

## 组件概述

BasicNavigation 是一个完整的应用导航布局组件，包含应用头部、侧边菜单和主内容区域。

### 组件结构

```
┌─────────────────────────────────────────┐
│  Application Header                     │
│  (Logo + 应用名称 + 用户头像)            │
├──────┬──────────────────────────────────┤
│      │                                  │
│ Menu │  Main Content Area               │
│      │                                  │
│      │                                  │
└──────┴──────────────────────────────────┘
```

## Figma 属性（严格遵循）

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `header` | `boolean` | `true` | 是否显示头部 |
| `openOverlay` | `boolean` | `false` | 是否打开覆盖层 |
| `viewport` | `'lg - Desktop' \| 'md - Tablet' \| 'sm - Mobile' \| 'sm - Mobile (expded)'` | `'lg - Desktop'` | 视口尺寸 |
| `applicationName` | `string` | `'Application name'` | 应用名称 |
| `userInitials` | `string` | `'JD'` | 用户缩写（头像显示） |
| `showLogo` | `boolean` | `true` | 是否显示 Logo |
| `menuExpanded` | `boolean` | `false` | 菜单是否展开 |

## 扩展属性（React 特定）

| 属性 | 类型 | 说明 |
|------|------|------|
| `children` | `React.ReactNode` | 主内容区域的子元素 |
| `className` | `string` | 自定义类名 |
| `onLogoClick` | `() => void` | Logo 点击事件 |
| `onAvatarClick` | `() => void` | 用户头像点击事件 |
| `onMenuToggle` | `() => void` | 菜单切换事件 |
| `menuItems` | `MenuItem[]` | 主菜单项配置 |
| `bottomMenuItems` | `MenuItem[]` | 底部菜单项配置 |

## MenuItem 接口

```typescript
interface MenuItem {
  id: string;           // 唯一标识符
  icon: string;         // ix-icon 图标名称
  label: string;        // 菜单项标签
  active?: boolean;     // 是否激活
  badge?: number;       // 徽章数字
  onClick?: () => void; // 点击事件
  tooltip?: string;     // 工具提示文本
}
```

## 功能特性

- ✅ **应用头部**: 显示 Logo、应用名称和用户头像
- ✅ **侧边菜单**: 可折叠/展开的导航菜单
- ✅ **菜单项**: 支持图标、标签、徽章和激活状态
- ✅ **工具提示**: 菜单折叠时显示工具提示
- ✅ **响应式**: 支持桌面、平板和移动端视口
- ✅ **主题支持**: 使用设计令牌，支持深色主题
- ✅ **可访问性**: 完整的键盘导航和 ARIA 支持

## 文件结构

```
src/components/BasicNavigation/
├── BasicNavigation.tsx           # 组件实现
├── BasicNavigation.css           # 组件样式（使用设计令牌）
├── BasicNavigation.stories.tsx   # Storybook 故事
├── BasicNavigation.example.tsx   # 使用示例
├── BasicNavigation.test.tsx      # 单元测试
├── README.md                     # 组件文档
└── index.ts                      # 导出文件
```

## 技术实现

### 样式系统
- ✅ 使用 CSS 模块
- ✅ 使用设计令牌（CSS 变量）
- ✅ 不使用 Tailwind CSS
- ✅ 响应式设计

### 图标系统
- ✅ 使用 `@irisieason/ix-icons` 包
- ✅ 通过 `<ix-icon>` Web Component 渲染
- ✅ 不自行绘制 SVG 图标

### 状态管理
- ✅ 使用 React Hooks（useState）
- ✅ 支持受控和非受控模式
- ✅ 菜单展开/折叠状态内部管理

## Storybook 故事

创建了 8 个故事展示不同用例：

1. **Default** - 默认状态
2. **MenuExpanded** - 菜单展开状态
3. **NoHeader** - 无头部模式
4. **WithOverlay** - 带覆盖层
5. **TabletViewport** - 平板视口
6. **MobileViewport** - 移动视口
7. **CustomMenuItems** - 自定义菜单项
8. **Interactive** - 交互示例
9. **FullExample** - 完整应用示例

## 测试覆盖

创建了全面的测试套件，包含 26 个测试用例：

### 渲染测试 (4 个)
- ✅ 正确渲染组件
- ✅ 渲染所有菜单项
- ✅ 显示徽章
- ✅ 显示用户缩写

### Figma 属性测试 (6 个)
- ✅ 支持 header 属性
- ✅ 支持 showLogo 属性
- ✅ 支持 applicationName 属性
- ✅ 支持 menuExpanded 属性
- ✅ 支持 viewport 属性
- ✅ 支持 openOverlay 属性

### 交互测试 (5 个)
- ✅ 处理菜单切换
- ✅ 调用 onMenuToggle 回调
- ✅ 调用 onAvatarClick 回调
- ✅ 调用 onLogoClick 回调
- ✅ 调用菜单项的 onClick 回调

### 菜单项状态测试 (3 个)
- ✅ 显示激活状态
- ✅ 显示徽章数字
- ✅ 不显示零徽章

### 可访问性测试 (2 个)
- ✅ 有正确的 ARIA 标签
- ✅ 支持键盘导航

### 响应式测试 (3 个)
- ✅ 应用桌面视口类名
- ✅ 应用平板视口类名
- ✅ 应用移动视口类名

### 其他测试 (3 个)
- ✅ 应用自定义类名
- ✅ 渲染子内容
- ✅ 在主内容区域渲染子内容

## 使用示例

### 基础用法

```tsx
import { BasicNavigation } from '@your-package/components';

const menuItems = [
  {
    id: 'home',
    icon: 'home',
    label: 'Home',
    active: true,
    tooltip: 'Home',
  },
  {
    id: 'events',
    icon: 'alarm-bell',
    label: 'Event list',
    badge: 12,
    tooltip: 'Event list',
  },
];

function App() {
  return (
    <BasicNavigation
      applicationName="My Application"
      userInitials="JD"
      menuItems={menuItems}
    >
      <div>
        <h1>Main Content</h1>
        <p>Your application content goes here.</p>
      </div>
    </BasicNavigation>
  );
}
```

### 交互式示例

```tsx
function App() {
  const [activeItem, setActiveItem] = useState('home');
  const [menuExpanded, setMenuExpanded] = useState(false);
  
  const menuItems = [
    {
      id: 'home',
      icon: 'home',
      label: 'Home',
      active: activeItem === 'home',
      onClick: () => setActiveItem('home'),
    },
    {
      id: 'dashboard',
      icon: 'dashboard',
      label: 'Dashboard',
      active: activeItem === 'dashboard',
      onClick: () => setActiveItem('dashboard'),
    },
  ];
  
  return (
    <BasicNavigation
      applicationName="My App"
      menuExpanded={menuExpanded}
      menuItems={menuItems}
      onMenuToggle={() => setMenuExpanded(!menuExpanded)}
      onAvatarClick={() => console.log('Avatar clicked')}
      onLogoClick={() => console.log('Logo clicked')}
    >
      <div>
        <h1>Active: {activeItem}</h1>
      </div>
    </BasicNavigation>
  );
}
```

## 设计规范遵循

### Figma 一致性 ✅
- 所有属性严格遵循 Figma 设计
- 属性名称、类型、默认值与 Figma 完全一致
- 扩展属性明确标注并与 Figma 属性分离

### 图标使用规范 ✅
- 只使用 `@irisieason/ix-icons` 包
- 通过 `<ix-icon>` Web Component 渲染
- 不自行绘制 SVG 图标

### 样式规范 ✅
- 使用 CSS 模块和设计令牌
- 不使用 Tailwind CSS
- 响应式设计

## 可访问性

- ✅ 语义化 HTML 标签（`<header>`, `<aside>`, `<main>`）
- ✅ 完整的键盘导航支持
- ✅ 适当的 ARIA 标签和角色
- ✅ 支持屏幕阅读器

## 浏览器支持

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## 相关组件

- `Button` - 按钮组件
- `IconButton` - 图标按钮组件

## 开发注意事项

1. **Figma 一致性**: 所有 Figma 属性必须与设计保持一致，不可随意修改
2. **图标注册**: 使用前必须先注册图标 `addIcons(allIcons)`
3. **菜单状态**: 菜单展开/折叠状态由组件内部管理，也可通过 `menuExpanded` 属性控制
4. **响应式**: 在移动端视口下，菜单会自动隐藏，需要手动展开

## 测试配置

项目已配置完整的测试环境：

### 测试依赖
- `vitest` - 测试框架
- `@testing-library/react` - React 测试工具
- `@testing-library/jest-dom` - DOM 断言扩展
- `jsdom` - DOM 环境模拟

### 测试脚本
```bash
pnpm test          # 运行测试（watch 模式）
pnpm test:ui       # 运行测试 UI
pnpm test:run      # 运行测试（单次）
```

### 测试配置文件
- `vitest.config.ts` - Vitest 配置
- `vitest.setup.ts` - 测试环境设置
- `tsconfig.json` - 包含 vitest 类型定义

## 总结

BasicNavigation 组件已完全实现，包括：

✅ 完整的组件实现（严格遵循 Figma 设计）  
✅ 响应式 CSS 样式（使用设计令牌）  
✅ 8 个 Storybook 故事  
✅ 5 个使用示例  
✅ 26 个单元测试  
✅ 完整的文档  
✅ TypeScript 类型定义  
✅ 可访问性支持  

组件已集成到项目中，可以通过 `import { BasicNavigation } from '@your-package/components'` 使用。
