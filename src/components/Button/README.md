# Button 组件

基于 Siemens iX 设计系统的按钮组件，支持多种变体、状态和配置选项。

## 功能特性

- ✅ 10 种按钮变体（Primary、Secondary、Danger 及其变体）
- ✅ 4 种状态（Default、Hover、Active、Loading）
- ✅ 支持禁用状态
- ✅ 支持前置和后置图标
- ✅ 支持聚焦状态显示
- ✅ 完整的 TypeScript 类型支持
- ✅ 响应式设计
- ✅ 无障碍访问支持

## 安装

```bash
npm install design-system
```

## 基本使用

```tsx
import { Button } from 'design-system';

function App() {
  return (
    <div>
      <Button variant="Primary">Primary Button</Button>
      <Button variant="Primary outline">Secondary Button</Button>
      <Button variant="Primary ghost">Tertiary Button</Button>
    </div>
  );
}
```

## 变体类型

### Primary 系列（主要操作）

```tsx
// Primary - UX 中的主要按钮
<Button variant="Primary">Primary</Button>

// Primary outline - UX 中的次要按钮
<Button variant="Primary outline">Secondary</Button>

// Primary ghost - UX 中的第三级按钮
<Button variant="Primary ghost">Tertiary</Button>
```

### Secondary 系列（次要操作）

```tsx
// 用于特殊场景，当其他按钮类型过于突出时使用
<Button variant="Secondary">Secondary</Button>
<Button variant="Secondary outline">Secondary Outline</Button>
<Button variant="Secondary ghost">Secondary Ghost</Button>
```

### Danger 系列（危险操作）

```tsx
// 用于删除、取消等危险操作
<Button variant="Danger">Delete</Button>
<Button variant="Danger outline">Cancel</Button>
<Button variant="Danger ghost">Remove</Button>
```

### Content Action（内容操作）

```tsx
// 用于内容区域的操作按钮
<Button variant="Content action">Learn More</Button>
```

## 状态

```tsx
// 默认状态
<Button state="Default">Default</Button>

// 悬停状态（通常由 CSS 自动处理）
<Button state="Hover">Hover</Button>

// 激活状态
<Button state="Active">Active</Button>

// 加载状态
<Button state="Loading">Loading</Button>

// 禁用状态
<Button disabled>Disabled</Button>
```

## 图标

```tsx
import { Button } from 'design-system';

const Icon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="..." />
  </svg>
);

// 前置图标
<Button showIcon icon={<Icon />}>
  With Icon
</Button>

// 后置图标
<Button iconAfter afterIcon={<Icon />}>
  With After Icon
</Button>
```

## 聚焦状态

```tsx
// 显示聚焦边框
<Button focused>Focused Button</Button>
```

## 事件处理

```tsx
<Button 
  variant="Primary"
  onClick={(e) => {
    console.log('Button clicked!', e);
  }}
>
  Click Me
</Button>
```

## Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `children` | `React.ReactNode` | `'Button'` | 按钮文本内容 |
| `variant` | `ButtonVariant` | `'Primary'` | 按钮变体类型 |
| `state` | `ButtonState` | `'Default'` | 按钮状态 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `showIcon` | `boolean` | `false` | 是否显示前置图标 |
| `icon` | `React.ReactNode` | - | 前置图标 |
| `iconAfter` | `boolean` | `false` | 是否显示后置图标 |
| `afterIcon` | `React.ReactNode` | - | 后置图标 |
| `focused` | `boolean` | `false` | 是否显示聚焦状态 |
| `onClick` | `(event: MouseEvent) => void` | - | 点击事件处理 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 按钮类型 |
| `className` | `string` | `''` | 自定义类名 |

## ButtonVariant 类型

```typescript
type ButtonVariant =
  | 'Primary'
  | 'Primary outline'
  | 'Primary ghost'
  | 'Secondary'
  | 'Secondary outline'
  | 'Secondary ghost'
  | 'Danger'
  | 'Danger outline'
  | 'Danger ghost'
  | 'Content action';
```

## ButtonState 类型

```typescript
type ButtonState = 'Default' | 'Hover' | 'Active' | 'Loading';
```

## 设计规范

### UX 映射关系

- **UX Primary** = `variant="Primary"`
- **UX Secondary** = `variant="Primary outline"`
- **UX Tertiary** = `variant="Primary ghost"`

### 使用建议

1. **Primary**: 用于页面中最重要的操作（如"保存"、"提交"）
2. **Primary outline**: 用于次要但仍然重要的操作（如"取消"、"返回"）
3. **Primary ghost**: 用于第三级操作（如"了解更多"、"查看详情"）
4. **Secondary 系列**: 用于特殊场景，当其他按钮类型过于突出时
5. **Danger 系列**: 用于危险操作，需要用户谨慎考虑
6. **Content action**: 用于内容区域的操作按钮

### 无障碍访问

- 按钮使用语义化的 `<button>` 元素
- 加载状态包含 `aria-label="Loading"` 属性
- 禁用状态使用原生 `disabled` 属性
- 支持键盘导航（Enter 和 Space 键）

## 参考文档

- [Siemens iX Button Documentation](https://ix.siemens.io/docs/controls/button)
- [Figma 设计文件](https://figma.com/design/e6oyye9F4VSzvI5wvo1GL4/Test?node-id=225-5535)

## 许可证

MIT License - Copyright (c) 2025 Siemens AG
