# ToggleButton 组件

切换按钮组件，支持多种类型和状态，用于开关、选择等场景。

## 功能特性

- ✅ 支持受控和非受控模式
- ✅ 5 种按钮类型
- ✅ 支持图标显示
- ✅ 支持禁用和加载状态
- ✅ 内置交互行为（hover、focus、active 通过 CSS 自动实现）
- ✅ 完整的键盘导航支持
- ✅ 可访问性支持（ARIA 属性）
- ✅ TypeScript 类型支持

## 设计原则

### 内置交互行为

组件自动支持以下交互行为，**无需通过属性控制**：

- **Hover 效果** - 鼠标悬停时自动显示（CSS `:hover`）
- **Active 效果** - 鼠标按下时自动显示（CSS `:active`）
- **Focus 效果** - 键盘聚焦时自动显示（CSS `:focus-visible`）

这些是组件的基础能力，遵循 React 和业界最佳实践。

## 基础用法

### 非受控模式

```tsx
import { ToggleButton } from '@irisieason/ix-ui';

<ToggleButton
  label="Toggle"
  defaultToggled={false}
  onToggle={(toggled) => console.log('Toggled:', toggled)}
/>
```

### 受控模式

```tsx
const [toggled, setToggled] = useState(false);

<ToggleButton
  label="Toggle"
  toggled={toggled}
  onToggle={(newToggled) => setToggled(newToggled)}
/>
```

### 带图标

```tsx
<ToggleButton
  label="Favorite"
  showIcon
  icon="star"
  onToggle={(toggled) => console.log('Favorite:', toggled)}
/>
```

### 禁用状态

```tsx
<ToggleButton
  label="Disabled"
  disabled
/>
```

### 加载状态

```tsx
<ToggleButton
  label="Loading"
  loading
/>
```

## 按钮类型

- Primary outline
- Secondary outline
- Primary ghost
- Secondary
- Secondary ghost

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | `string` | `'Toggle'` | 按钮文本 |
| `showIcon` | `boolean` | `false` | 是否显示图标 |
| `icon` | `string` | `'checkmark'` | 图标名称 |
| `type` | `ToggleButtonType` | `'Secondary outline'` | 按钮类型 |
| `toggled` | `boolean` | - | 是否切换状态（受控） |
| `defaultToggled` | `boolean` | `false` | 默认切换状态（非受控） |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `onToggle` | `function` | - | 切换状态变化回调 |
| `onClick` | `function` | - | 点击事件回调 |
| `className` | `string` | - | 自定义 CSS 类名 |
| `style` | `CSSProperties` | - | 自定义样式 |

## 相关组件

- [Button](../Button/README.md) - 普通按钮
- [IconButton](../IconButton/README.md) - 图标按钮
