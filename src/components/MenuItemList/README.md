# MenuItemList 组件

MenuItemList 是一个菜单项容器组件，用于包含多个 MenuItem 子组件，提供统一的布局和交互管理。

## 特性

- ✅ 支持展开/收起状态（由父组件控制）
- ✅ 排他选择（单选）- 同时只能有一个菜单项被选中
- ✅ 支持受控/非受控模式
- ✅ 自动管理子组件的 expanded 和 selected 状态
- ✅ 语义化 HTML 结构（`<nav>` + `<ul>/<li>`）
- ✅ 完整的 ARIA 可访问性属性

## 基础用法

```tsx
import { MenuItemList, MenuItem } from '@irisieason/qz-react';

// 非受控模式（组件内部管理选中状态）
function App() {
  return (
    <MenuItemList expanded={true} defaultSelectedIndex={0}>
      <MenuItem icon="home" label="Home" />
      <MenuItem icon="dashboard" label="Dashboard" />
      <MenuItem icon="cogwheel" label="Settings" />
      <MenuItem icon="user" label="Profile" />
    </MenuItemList>
  );
}
```

## 受控模式

```tsx
import { MenuItemList, MenuItem } from '@irisieason/qz-react';
import { useState } from 'react';

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expanded, setExpanded] = useState(true);

  return (
    <div>
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? '收起' : '展开'}
      </button>
      
      <MenuItemList
        expanded={expanded}
        selectedIndex={selectedIndex}
        onSelectionChange={setSelectedIndex}
      >
        <MenuItem icon="home" label="Home" />
        <MenuItem icon="dashboard" label="Dashboard" />
        <MenuItem icon="cogwheel" label="Settings" />
        <MenuItem icon="user" label="Profile" />
      </MenuItemList>
    </div>
  );
}
```

## 排他选择（单选）

MenuItemList 自动实现排他选择：

- 同时只能有一个 MenuItem 被选中
- 点击任意 MenuItem 会自动取消其他项的选中状态
- 子组件不需要手动管理 `selected` 属性

```tsx
// ✅ 正确：让 MenuItemList 管理选中状态
<MenuItemList defaultSelectedIndex={0}>
  <MenuItem icon="home" label="Home" />
  <MenuItem icon="dashboard" label="Dashboard" />
</MenuItemList>

// ❌ 错误：不要在子组件上设置 selected
<MenuItemList>
  <MenuItem icon="home" label="Home" selected={true} />
  <MenuItem icon="dashboard" label="Dashboard" selected={true} />
</MenuItemList>
```

## 展开/收起控制

展开状态由 MenuItemList 统一控制，会自动传递给所有子组件：

```tsx
// ✅ 正确：只在父组件设置 expanded
<MenuItemList expanded={false}>
  <MenuItem icon="home" label="Home" />
  <MenuItem icon="dashboard" label="Dashboard" />
</MenuItemList>

// ❌ 错误：不要在子组件上设置 expanded
<MenuItemList expanded={false}>
  <MenuItem icon="home" label="Home" expanded={true} />
  <MenuItem icon="dashboard" label="Dashboard" expanded={true} />
</MenuItemList>
```

## 属性

### MenuItemList Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `expanded` | `boolean` | `true` | 是否展开显示文本 |
| `children` | `React.ReactNode` | 必需 | MenuItem 子组件 |
| `selectedIndex` | `number` | - | 当前选中的菜单项索引（受控模式） |
| `defaultSelectedIndex` | `number` | `-1` | 默认选中的菜单项索引（非受控模式） |
| `onSelectionChange` | `(index: number) => void` | - | 选中项变化回调 |
| `className` | `string` | - | 自定义 CSS 类名 |
| `aria-label` | `string` | `'Menu'` | 可访问性标签 |

## 示例

### 带通知徽章

```tsx
<MenuItemList expanded={true} defaultSelectedIndex={0}>
  <MenuItem icon="home" label="Home" />
  <MenuItem 
    icon="alarm-bell" 
    label="Notifications" 
    notification={true}
    notificationCount={5}
  />
  <MenuItem icon="user-management" label="Messages" />
</MenuItemList>
```

### 完整菜单

```tsx
<MenuItemList expanded={true} defaultSelectedIndex={0}>
  <MenuItem icon="home" label="Home" />
  <MenuItem icon="dashboard" label="Dashboard" />
  <MenuItem 
    icon="alarm-bell" 
    label="Notifications" 
    notification={true}
    notificationCount={12}
  />
  <MenuItem icon="user-management" label="Messages" />
  <MenuItem icon="calendar" label="Calendar" />
  <MenuItem icon="search" label="Files" />
  <MenuItem icon="cogwheel" label="Settings" />
  <MenuItem icon="user" label="Profile" />
</MenuItemList>
```

## 可访问性

MenuItemList 组件遵循 WCAG 可访问性标准：

- 使用语义化的 `<nav>` 和 `<ul>/<li>` 结构
- 提供 `role="navigation"` 和 `role="menuitem"` 属性
- 支持 `aria-label` 自定义标签
- 自动管理 `aria-selected` 状态

## 注意事项

1. **排他选择**：MenuItemList 自动实现单选，不需要在子组件上设置 `selected`
2. **展开控制**：展开状态由父组件统一控制，不需要在子组件上设置 `expanded`
3. **索引从 0 开始**：`selectedIndex` 和 `defaultSelectedIndex` 从 0 开始计数
4. **-1 表示无选中**：设置为 -1 表示没有任何项被选中

## 相关组件

- [MenuItem](../MenuItem/README.md) - 单个菜单项组件
