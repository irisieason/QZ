# MenuItem Component

MenuItem 组件用于导航菜单中的菜单项，支持展开/折叠、选中状态、通知徽章等功能。

## Figma 设计

此组件严格遵循 Figma 设计规范实现。所有属性都来自 Figma 定义。

## 属性

### Figma 定义的属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `label` | `string` | `'Item'` | 菜单项文本 |
| `focused` | `boolean` | `false` | 是否显示聚焦状态 |
| `notification` | `boolean` | `false` | 是否显示通知徽章 |
| `variant` | `'Main Item'` | `'Main Item'` | 菜单项变体 |
| `expanded` | `boolean` | `true` | 是否展开（显示文本） |
| `state` | `'Default' \| 'Hover' \| 'Active'` | `'Default'` | 菜单项状态 |
| `selected` | `boolean` | `false` | 是否选中 |

### 扩展属性（非 Figma 定义）

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `icon` | `string` | `'home'` | 图标名称（ix-icon name） |
| `onClick` | `(event: React.MouseEvent) => void` | - | 点击事件处理 |
| `className` | `string` | `''` | 自定义类名 |
| `aria-label` | `string` | - | 可访问性标签 |
| `notificationCount` | `number` | `12` | 通知数量 |

## 使用示例

### 基础用法

```tsx
import { MenuItem } from '@your-org/component-library';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册图标
addIcons(allIcons);

function App() {
  return (
    <MenuItem
      label="Dashboard"
      icon="dashboard"
      variant="Main Item"
      expanded={true}
    />
  );
}
```

### 选中状态

```tsx
<MenuItem
  label="Dashboard"
  icon="dashboard"
  selected={true}
/>
```

### 带通知徽章

```tsx
<MenuItem
  label="Messages"
  icon="mail"
  notification={true}
  notificationCount={12}
/>
```

### 折叠状态

```tsx
<MenuItem
  label="Dashboard"
  icon="dashboard"
  expanded={false}
/>
```

### 完整菜单示例

```tsx
import { useState } from 'react';
import { MenuItem } from '@your-org/component-library';

function NavigationMenu() {
  const [selectedItem, setSelectedItem] = useState('dashboard');
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{ backgroundColor: '#000028' }}>
      {/* Main Items */}
      <MenuItem
        label="Dashboard"
        icon="dashboard"
        variant="Main Item"
        expanded={expanded}
        selected={selectedItem === 'dashboard'}
        onClick={() => setSelectedItem('dashboard')}
      />
      <MenuItem
        label="Analytics"
        icon="chart"
        variant="Main Item"
        expanded={expanded}
        selected={selectedItem === 'analytics'}
        onClick={() => setSelectedItem('analytics')}
      />
      <MenuItem
        label="Messages"
        icon="mail"
        variant="Main Item"
        expanded={expanded}
        selected={selectedItem === 'messages'}
        notification={true}
        notificationCount={12}
        onClick={() => setSelectedItem('messages')}
      />
      <MenuItem
        label="Settings"
        icon="settings"
        variant="Main Item"
        expanded={expanded}
        selected={selectedItem === 'settings'}
        onClick={() => setSelectedItem('settings')}
      />
    </div>
  );
}
```

## 变体

### Main Item

主要菜单项，高度为 48px，用于所有导航菜单项。

## 状态

### Default

默认状态，无特殊样式。

### Hover

鼠标悬停状态，背景色变化。

### Active

激活状态（鼠标按下），背景色更深。

## 图标使用

MenuItem 组件使用 `@irisieason/ix-icons` 包提供的图标。使用前需要注册图标：

```tsx
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

addIcons(allIcons);
```

常用图标：
- `home` - 首页
- `dashboard` - 仪表板
- `settings` - 设置
- `user` - 用户
- `mail` - 邮件
- `calendar` - 日历
- `help` - 帮助

## 可访问性

MenuItem 组件遵循 WAI-ARIA 规范：

- 使用 `role="menuitem"` 标识菜单项
- 使用 `aria-selected` 标识选中状态
- 使用 `aria-disabled` 标识禁用状态
- 使用 `aria-label` 提供可访问性标签

## 样式定制

MenuItem 组件使用 CSS 变量进行样式定制，可以通过覆盖以下变量来自定义样式：

```css
:root {
  --color-ghost: rgba(255, 255, 255, 0);
  --color-ghost--hover: rgba(157, 157, 150, 0.15);
  --color-ghost--active: rgba(105, 105, 99, 0.15);
  --color-std-text: #ffffff;
  --color-weak-text: rgba(255, 255, 255, 0.45);
  --color-primary: #00cccc;
  --color-primary--contrast: #000028;
  --color-dynamic: #00ffb9;
  --color-focus-bdr: #1491eb;
  --color-1: #000028;
  --color-2: #23233c;
  --color-3: #37374d;
}
```

## 注意事项

1. **图标注册**：使用前必须先注册 ix-icons 图标
2. **Figma 一致性**：所有 Figma 定义的属性都已实现，不要自行添加或修改
3. **扩展属性**：`icon`、`onClick`、`notificationCount` 等是扩展属性，用于技术实现
4. **折叠状态**：折叠时会显示 Tooltip，需要鼠标悬停才能看到
5. **通知徽章**：只有当 `notification={true}` 时才会显示
6. **变体限制**：当前只支持 "Main Item" 变体
7. **状态限制**：支持 Default、Hover、Active 三种状态

## 相关组件

- [Button](../Button/README.md) - 按钮组件
- [IconButton](../IconButton/README.md) - 图标按钮组件
