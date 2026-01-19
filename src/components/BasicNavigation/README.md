# BasicNavigation 组件

基础导航布局组件，提供完整的应用导航结构，包含应用头部、侧边菜单和主内容区域。

## 组件结构

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

## 功能特性

- ✅ **应用头部**: 显示 Logo、应用名称和用户头像
- ✅ **侧边菜单**: 可折叠/展开的导航菜单
- ✅ **菜单项**: 支持图标、标签、徽章和激活状态
- ✅ **工具提示**: 菜单折叠时显示工具提示
- ✅ **响应式**: 支持桌面、平板和移动端视口
- ✅ **主题支持**: 使用设计令牌，支持深色主题
- ✅ **可访问性**: 完整的键盘导航和 ARIA 支持

## 安装

```bash
npm install @irisieason/ix-icons
```

## 基础用法

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

const bottomMenuItems = [
  {
    id: 'settings',
    icon: 'cogwheel',
    label: 'Settings',
    tooltip: 'Settings',
  },
];

function App() {
  return (
    <BasicNavigation
      applicationName="My Application"
      userInitials="JD"
      menuItems={menuItems}
      bottomMenuItems={bottomMenuItems}
    >
      <div>
        <h1>Main Content</h1>
        <p>Your application content goes here.</p>
      </div>
    </BasicNavigation>
  );
}
```

## Figma 属性

这些属性严格遵循 Figma 设计规范：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `header` | `boolean` | `true` | 是否显示头部 |
| `openOverlay` | `boolean` | `false` | 是否打开覆盖层 |
| `viewport` | `'lg - Desktop' \| 'md - Tablet' \| 'sm - Mobile' \| 'sm - Mobile (expded)'` | `'lg - Desktop'` | 视口尺寸 |
| `applicationName` | `string` | `'Application name'` | 应用名称 |
| `userInitials` | `string` | `'JD'` | 用户缩写（头像显示） |
| `showLogo` | `boolean` | `true` | 是否显示 Logo |
| `menuExpanded` | `boolean` | `false` | 菜单是否展开 |

## 扩展属性

这些是为 React 实现添加的扩展属性：

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

## 使用示例

### 基础示例

```tsx
<BasicNavigation
  applicationName="Dashboard"
  userInitials="AB"
  menuItems={[
    { id: 'home', icon: 'home', label: 'Home', active: true },
    { id: 'tasks', icon: 'tasks-all', label: 'Tasks', badge: 5 },
  ]}
>
  <div>Content</div>
</BasicNavigation>
```

### 菜单展开

```tsx
<BasicNavigation
  menuExpanded={true}
  menuItems={menuItems}
>
  <div>Content</div>
</BasicNavigation>
```

### 无头部

```tsx
<BasicNavigation
  header={false}
  menuItems={menuItems}
>
  <div>Content</div>
</BasicNavigation>
```

### 交互示例

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

### 响应式视口

```tsx
// 桌面端
<BasicNavigation viewport="lg - Desktop" />

// 平板端
<BasicNavigation viewport="md - Tablet" />

// 移动端
<BasicNavigation viewport="sm - Mobile" />
```

## 样式定制

组件使用 CSS 模块和设计令牌，可以通过覆盖 CSS 变量来定制样式：

```css
.basic-navigation {
  --color-1: #1e1e1e;
  --color-2: #252525;
  --color-contrast-text: #ffffff;
  --color-std-text: rgba(255, 255, 255, 0.9);
}
```

## 可访问性

- 所有交互元素都支持键盘导航
- 使用语义化 HTML 标签（`<header>`, `<aside>`, `<main>`）
- 提供适当的 ARIA 标签和角色
- 支持屏幕阅读器

## 图标系统

组件使用 `@irisieason/ix-icons` 包提供的图标：

```tsx
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);
```

可用图标列表请参考 [IX Icons 文档](https://www.npmjs.com/package/@irisieason/ix-icons)。

## 注意事项

1. **Figma 一致性**: 所有 Figma 属性必须与设计保持一致，不可随意修改
2. **图标注册**: 使用前必须先注册图标
3. **菜单状态**: 菜单展开/折叠状态由组件内部管理，也可通过 `menuExpanded` 属性控制
4. **响应式**: 在移动端视口下，菜单会自动隐藏，需要手动展开

## TypeScript 支持

组件提供完整的 TypeScript 类型定义：

```typescript
import type { 
  BasicNavigationProps, 
  MenuItem 
} from '@your-package/components';
```

## 浏览器支持

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## 相关组件

- `Button` - 按钮组件
- `IconButton` - 图标按钮组件

## 许可证

MIT
