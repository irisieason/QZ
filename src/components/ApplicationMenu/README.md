# ApplicationMenu 组件

应用程序菜单容器组件，使用 Slot 模式提供可展开/折叠的侧边导航栏布局。

## Figma 设计

该组件严格遵循 Figma 设计规范实现。

### Figma 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `popoverNews` | `boolean` | `false` | 是否显示新闻弹窗 |
| `expanded` | `boolean` | - | 是否展开菜单 |
| `overflow` | `'False'` | `'False'` | 溢出处理 |

### 扩展属性（Slots）

以下属性为 React 实现特定的扩展属性（Slot 模式），非 Figma 定义：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `toggleButton` | `React.ReactNode` | - | 展开/折叠按钮插槽 |
| `avatarSection` | `React.ReactNode` | - | 用户头像区域插槽 |
| `menuList` | `React.ReactNode` | - | 菜单项列表插槽 |
| `children` | `React.ReactNode` | - | 子元素（作为 menuList 的替代） |
| `onToggleExpand` | `function` | - | 展开/折叠切换事件 |
| `className` | `string` | - | 自定义类名 |

## Slot 模式

ApplicationMenu 是一个容器组件，使用 Slot 模式：

- **expanded**: 唯一的 Figma 属性，控制展开/折叠状态
- **其他内容**: 都通过 Slot 传入，提供最大灵活性

这种设计让你可以：
- 自定义用户头像区域的内容
- 自定义菜单项列表
- 自定义切换按钮
- 完全控制子组件的属性和行为

## 使用示例

### 基础用法（使用 children）

```tsx
import { ApplicationMenu, AvatarButtonMenu, MenuItem } from '@irisieason/ix-react-components';

function App() {
  return (
    <ApplicationMenu>
      <AvatarButtonMenu
        email="john.doe@company.com"
        role="Administrator"
      />
      <MenuItem icon="home" label="Home" />
      <MenuItem icon="dashboard" label="Dashboard" />
      <MenuItem icon="settings" label="Settings" />
    </ApplicationMenu>
  );
}
```

### 使用 Slots

```tsx
<ApplicationMenu
  expanded={true}
  avatarSection={
    <AvatarButtonMenu
      email="jane.smith@company.com"
      role="Developer"
      avatarInitials={true}
      avatarText="JS"
    />
  }
  menuList={
    <>
      <MenuItem icon="home" label="Home" expanded={true} />
      <MenuItem icon="dashboard" label="Dashboard" expanded={true} />
    </>
  }
/>
```

### 受控模式

```tsx
import { ApplicationMenu, AvatarButtonMenu, MenuItem } from '@irisieason/ix-react-components';
import { useState } from 'react';

function App() {
  const [expanded, setExpanded] = useState(true);
  const [selectedItem, setSelectedItem] = useState('Home');

  return (
    <ApplicationMenu
      expanded={expanded}
      onToggleExpand={() => setExpanded(!expanded)}
    >
      <AvatarButtonMenu
        email="john.doe@company.com"
        role="Administrator"
      />
      <MenuItem
        icon="home"
        label="Home"
        expanded={expanded}
        selected={selectedItem === 'Home'}
        onClick={() => setSelectedItem('Home')}
      />
      <MenuItem
        icon="dashboard"
        label="Dashboard"
        expanded={expanded}
        selected={selectedItem === 'Dashboard'}
        onClick={() => setSelectedItem('Dashboard')}
      />
    </ApplicationMenu>
  );
}
```

### 自定义切换按钮

```tsx
<ApplicationMenu
  expanded={expanded}
  toggleButton={
    <button onClick={() => setExpanded(!expanded)}>
      {expanded ? '◀' : '▶'}
    </button>
  }
>
  {/* 内容 */}
</ApplicationMenu>
```

## 组件结构

ApplicationMenu 是一个容器组件，提供以下布局结构：

1. **切换按钮区域** - 通过 `toggleButton` slot 自定义，或使用默认按钮
2. **内容区域**
   - **用户头像区域** - 通过 `avatarSection` slot 传入
   - **菜单项列表** - 通过 `children` 或 `menuList` slot 传入

## 功能特性

### 展开/折叠

- **展开状态**：宽度 256px
- **折叠状态**：宽度 52px
- 平滑过渡动画
- 支持受控和非受控模式

### Slot 灵活性

- 完全控制子组件的属性
- 可以使用任何组件作为内容
- 不限制菜单项数量和类型
- 可以自定义切换按钮样式

### 默认切换按钮

如果不提供 `toggleButton` slot，组件会渲染默认按钮：
- 展开时显示左双箭头图标
- 折叠时显示右双箭头图标
- 自动处理点击事件

## 推荐子组件

虽然 ApplicationMenu 接受任何内容，但推荐使用以下组件：

- **AvatarButtonMenu** - 用户头像和信息
- **MenuItem** - 导航菜单项

这些组件已经过优化，可以很好地配合 ApplicationMenu 使用。

## 图标使用

默认切换按钮使用 `@irisieason/ix-icons` 包中的图标：

- `double-chevron-left` - 折叠图标
- `double-chevron-right` - 展开图标

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

- 默认切换按钮使用 `aria-label` 提供可访问性标签
- 使用 `data-expanded` 属性标识展开状态
- 所有交互元素支持键盘导航

## 设计令牌

组件使用以下设计令牌：

- `--color-2` - 菜单背景色
- `--color-ghost` - 按钮默认背景色
- `--color-ghost--hover` - 按钮悬停背景色
- `--color-ghost--active` - 按钮激活背景色
- `--color-std-text` - 标准文本颜色
- `--color-weak-text` - 弱文本颜色（滚动条）
- `--color-soft-text` - 柔和文本颜色（滚动条悬停）

## 响应式设计

- 在小屏幕（高度 < 600px）时，菜单高度自动调整为 100vh
- 菜单项列表支持垂直滚动
- 自定义滚动条样式

## 注意事项

1. **Slot 模式**：除了 `expanded` 属性，其他内容都通过 Slot 传入
2. **子组件控制**：需要手动传递 `expanded` 属性给 MenuItem 组件
3. **状态管理**：容器只管理 `expanded` 状态，其他状态（如选中项）由使用者管理
4. **图标注册**：使用默认切换按钮前必须注册 ix-icons
5. **Figma 一致性**：严格遵循 Figma 设计，扩展属性已明确标注为 Slot

## 相关组件

- [AvatarButtonMenu](../AvatarButtonMenu/README.md) - 用户头像按钮菜单
- [MenuItem](../MenuItem/README.md) - 菜单项组件
- [Avatar](../Avatar/README.md) - 头像组件
