# Button 组件

按钮组件，支持多种变体和状态。遵循 React 最佳实践，使用 children 作为按钮内容。

## 基本用法

### 使用 children（React 标准 ✅）

```tsx
import { Button } from '@your-package/components';

// 简单文本
<Button variant="Primary">Save</Button>

// 带前置图标
<Button 
  variant="Primary" 
  startIcon={<ix-icon name="check" size="24" />}
>
  Confirm
</Button>

// 带后置图标
<Button 
  variant="Primary" 
  endIcon={<ix-icon name="arrow-right" size="24" />}
>
  Next
</Button>

// 同时使用前置和后置图标
<Button 
  variant="Primary" 
  startIcon={<ix-icon name="upload" size="24" />}
  endIcon={<ix-icon name="chevron-right" size="24" />}
>
  Upload File
</Button>

// 复杂内容
<Button variant="Primary">
  <div>
    <span>Save Changes</span>
    <span style={{ fontSize: '11px' }}>Ctrl+S</span>
  </div>
</Button>
```

### 向后兼容（旧 API）

```tsx
// 带图标（旧 API，仍然有效）
<Button 
  variant="Primary" 
  showIcon 
  icon="check"
>
  Confirm
</Button>
```

## 属性

### 视觉属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `ButtonVariant` | `'Primary'` | 按钮变体类型 |
| `state` | `ButtonState` | `'Default'` | 按钮状态 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `focused` | `boolean` | `false` | 是否显示聚焦状态 |

### React 最佳实践属性（推荐 ✅）

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `React.ReactNode` | - | 按钮内容（优先级高于 label） |
| `startIcon` | `React.ReactNode` | - | 前置图标 |
| `endIcon` | `React.ReactNode` | - | 后置图标 |

### 向后兼容属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | `string` | `'Button'` | 按钮文本（如果提供了 children 则忽略） |
| `showIcon` | `boolean` | `false` | 是否显示图标（已废弃，推荐使用 startIcon） |
| `icon` | `string` | `'about'` | 图标名称（已废弃，推荐使用 startIcon） |

### 扩展属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `onClick` | `(event: MouseEvent) => void` | - | 点击事件处理 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 按钮类型 |
| `className` | `string` | - | 自定义 CSS 类名 |
| `aria-label` | `string` | - | 可访问性标签 |

## 变体类型

- `Primary` - 主要按钮（UX 中的 Primary）
- `Primary outline` - 主要轮廓按钮（UX 中的 Secondary）
- `Primary ghost` - 主要幽灵按钮（UX 中的 Tertiary）
- `Secondary` - 次要按钮
- `Secondary outline` - 次要轮廓按钮
- `Secondary ghost` - 次要幽灵按钮
- `Danger` - 危险按钮
- `Danger outline` - 危险轮廓按钮
- `Danger ghost` - 危险幽灵按钮
- `🔶 Content action` - 内容操作按钮

## 状态

- `Default` - 默认状态
- `Hover` - 悬停状态（通常由 CSS 自动处理）
- `Active` - 激活状态（通常由 CSS 自动处理）
- `Disabled` - 禁用状态
- `Loading` - 加载状态

## 示例

### 基础按钮

```tsx
<Button variant="Primary">Save</Button>
<Button variant="Secondary">Cancel</Button>
<Button variant="Danger">Delete</Button>
```

### 带图标的按钮

```tsx
<Button 
  variant="Primary" 
  startIcon={<ix-icon name="check" size="24" />}
>
  Confirm
</Button>

<Button 
  variant="Secondary" 
  startIcon={<ix-icon name="add" size="24" />}
>
  Add Item
</Button>

<Button 
  variant="Danger" 
  startIcon={<ix-icon name="trashcan" size="24" />}
>
  Delete
</Button>
```

### 加载状态

```tsx
<Button variant="Primary" state="Loading">
  Saving...
</Button>
```

### 禁用状态

```tsx
<Button variant="Primary" disabled>
  Disabled
</Button>
```

### 复杂内容

```tsx
<Button variant="Primary">
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <span>Save Changes</span>
    <span style={{ fontSize: '11px' }}>Ctrl+S</span>
  </div>
</Button>
```

## 迁移指南

### 从旧 API 迁移到新 API

**旧 API（仍然有效）：**
```tsx
<Button 
  variant="Primary" 
  label="Save" 
  showIcon 
  icon="check" 
/>
```

**新 API（推荐）：**
```tsx
<Button 
  variant="Primary" 
  startIcon={<ix-icon name="check" size="24" />}
>
  Save
</Button>
```

### 为什么使用新 API？

1. **符合 React 标准** - 使用 children 是 React 的标准做法
2. **更灵活** - 可以插入任意内容，不限于文本
3. **更强大** - 支持前置和后置图标，支持自定义图标样式
4. **类型安全** - TypeScript 类型检查更准确

## 可访问性

- 按钮自动支持键盘操作（Enter、Space）
- 禁用状态会自动设置 `aria-disabled`
- 加载状态会自动设置 `aria-busy`
- 建议为纯图标按钮提供 `aria-label`

```tsx
<Button 
  variant="Primary" 
  aria-label="Save document"
  startIcon={<ix-icon name="save" size="24" />}
/>
```

## 参考

- [Siemens iX Button 文档](https://ix.siemens.io/docs/controls/button)
- [Material UI Button](https://mui.com/material-ui/react-button/)
- [Ant Design Button](https://ant.design/components/button)
