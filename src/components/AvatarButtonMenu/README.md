# AvatarButtonMenu 组件

用户头像按钮菜单组件，显示用户头像、邮箱、角色信息，点击后展开下拉菜单。

## Figma 设计

该组件严格遵循 Figma 设计规范实现。

### Figma 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `focused` | `boolean` | `false` | 是否显示聚焦状态 |
| `state` | `'Default' \| 'Hover' \| 'Active'` | `'Default'` | 组件状态 |

### 扩展属性

以下属性为 React 实现特定的扩展属性，非 Figma 定义：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `email` | `string` | `'john.doe@company.com'` | 用户邮箱 |
| `role` | `string` | `'Administrator'` | 用户角色 |
| `avatarSrc` | `string` | - | 用户头像 URL |
| `avatarText` | `string` | `'JD'` | 用户首字母 |
| `avatarImage` | `boolean` | `false` | 是否显示头像图片 |
| `avatarInitials` | `boolean` | `false` | 是否显示首字母 |
| `onClick` | `function` | - | 点击事件处理 |
| `onProfileClick` | `function` | - | 点击用户资料菜单项 |
| `onLogoutClick` | `function` | - | 点击登出菜单项 |
| `className` | `string` | - | 自定义类名 |
| `aria-label` | `string` | - | 可访问性标签 |

## 使用示例

### 基础用法（自动交互）

组件默认会自动管理交互状态，无需手动控制：

```tsx
import { AvatarButtonMenu } from '@irisieason/ix-react-components';

function App() {
  const handleProfileClick = () => {
    console.log('Navigate to profile');
  };

  const handleLogoutClick = () => {
    console.log('Logout');
  };

  return (
    <AvatarButtonMenu
      email="john.doe@company.com"
      role="Administrator"
      onProfileClick={handleProfileClick}
      onLogoutClick={handleLogoutClick}
    />
  );
}
```

**自动交互行为：**
- 鼠标悬停 → 自动显示 Hover 状态
- 点击组件 → 自动切换到 Active 状态（展开下拉菜单）
- 再次点击 → 自动关闭下拉菜单
- 点击外部区域 → 自动关闭下拉菜单
- 点击菜单项 → 自动关闭下拉菜单并触发回调

### 受控模式（手动控制状态）

如果需要完全控制组件状态，可以传入 `state` 属性：

### 受控模式（手动控制状态）

如果需要完全控制组件状态，可以传入 `state` 属性：

```tsx
import { AvatarButtonMenu } from '@irisieason/ix-react-components';
import { useState } from 'react';

function App() {
  const [state, setState] = useState<'Default' | 'Hover' | 'Active'>('Default');

  const handleClick = () => {
    setState(state === 'Active' ? 'Default' : 'Active');
  };

  const handleProfileClick = () => {
    console.log('Navigate to profile');
    setState('Default');
  };

  const handleLogoutClick = () => {
    console.log('Logout');
    setState('Default');
  };

  return (
    <AvatarButtonMenu
      state={state}
      email="john.doe@company.com"
      role="Administrator"
      onClick={handleClick}
      onProfileClick={handleProfileClick}
      onLogoutClick={handleLogoutClick}
    />
  );
}
```

### 带首字母头像

```tsx
<AvatarButtonMenu
  email="jane.smith@company.com"
  role="Developer"
  avatarInitials={true}
  avatarText="JS"
/>
```

### 带图片头像

```tsx
<AvatarButtonMenu
  email="alice.johnson@company.com"
  role="Designer"
  avatarImage={true}
  avatarSrc="https://example.com/avatar.jpg"
/>
```

## 状态说明

### Default（默认）
- 默认状态，无背景色
- 鼠标未悬停，下拉菜单隐藏

### Hover（悬停）
- 鼠标悬停时的状态
- 显示半透明背景色
- 下拉菜单仍然隐藏

### Active（激活）
- 点击后的激活状态
- 显示更深的背景色
- 展开下拉菜单，显示"User profile..."和"Logout"选项

## 下拉菜单

当 `state="Active"` 时，组件会显示下拉菜单，包含以下菜单项：

1. **User profile...** - 用户资料
   - 图标：`user`
   - 点击触发 `onProfileClick` 回调

2. **Logout** - 登出
   - 图标：`log-out`
   - 点击触发 `onLogoutClick` 回调

## 图标使用

该组件使用 `@irisieason/ix-icons` 包中的图标：

- `user` - 用户资料图标
- `log-out` - 登出图标

在使用前需要完整注册图标（两步）：

```tsx
import { defineCustomElements } from '@irisieason/ix-icons/loader';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 1. 注册 Web Component（必需！）
defineCustomElements();

// 2. 加载图标数据（必需！）
addIcons(allIcons);
```

## 可访问性

- 使用 `role="button"` 标识为按钮
- 使用 `aria-label` 提供可访问性标签
- 使用 `aria-expanded` 标识下拉菜单展开状态
- 下拉菜单使用 `role="menu"`
- 菜单项使用 `role="menuitem"` 和 `tabIndex="0"` 支持键盘导航

## 设计令牌

组件使用以下设计令牌：

- `--color-ghost` - 默认背景色
- `--color-ghost--hover` - 悬停背景色
- `--color-ghost--active` - 激活背景色
- `--color-focus-bdr` - 聚焦边框颜色
- `--color-std-text` - 标准文本颜色
- `--color-2` - 下拉菜单背景色
- `--color-shadow-1` / `--color-shadow-2` - 阴影颜色
- `--font-sans` - 字体
- `--font-size-ms-0` - 字体大小

## 注意事项

1. **Figma 属性一致性**：组件严格遵循 Figma 设计，所有核心属性与 Figma 完全一致
2. **图标来源**：所有图标必须来自 `@irisieason/ix-icons` 包
3. **状态管理**：建议在父组件中管理 `state` 状态，实现完整的交互逻辑
4. **点击外部关闭**：建议实现点击外部区域关闭下拉菜单的逻辑
5. **头像类型**：支持三种头像类型（占位符、首字母、图片），通过 `avatarImage` 和 `avatarInitials` 控制

## 相关组件

- [Avatar](../Avatar/README.md) - 头像组件（内部使用）
- [MenuItem](../MenuItem/README.md) - 菜单项组件（参考）
