# Tooltip 组件

提示框组件，用于显示额外的信息提示。支持标题、文本、图标和关闭按钮。

## 功能特性

- ✅ 支持标题和文本内容
- ✅ 支持自定义图标（来自 ix-icons）
- ✅ 支持关闭按钮
- ✅ 带有尖角箭头指示
- ✅ 阴影效果
- ✅ 完整的 TypeScript 类型支持

## 基础用法

```tsx
import { Tooltip } from '@irisieason/ix-react-components';
import { useState } from 'react';

// 非受控模式（默认显示）
<Tooltip
  header="My tooltip"
  textlabel="This is my tooltips text"
  showIcon={true}
  icon="about"
/>

// 受控模式（可以控制显示/隐藏）
function MyComponent() {
  const [open, setOpen] = useState(true);
  
  return (
    <>
      <Tooltip
        header="Important"
        textlabel="Click X to close"
        closable={true}
        open={open}
        onClose={() => setOpen(false)}
      />
      {!open && (
        <button onClick={() => setOpen(true)}>
          Show Tooltip
        </button>
      )}
    </>
  );
}

// 只显示文本
<Tooltip
  textlabel="Simple tooltip message"
  showIcon={false}
/>
```

## 属性

### 视觉属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `header` | `string` | `'My tooltip'` | 标题文本 |
| `textlabel` | `string` | `'This is my tooltips text'` | 提示文本内容 |
| `closable` | `boolean` | `false` | 是否显示关闭按钮 |
| `showIcon` | `boolean` | `true` | 是否显示图标 |
| `icon` | `string` | `'about'` | 图标名称（ix-icon name） |
| `visible` | `boolean` | `true` | 是否可见 |

### 扩展属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `onClose` | `() => void` | 关闭按钮点击事件 |
| `className` | `string` | 自定义 CSS 类名 |
| `open` | `boolean` | 是否显示（受控模式） |
| `defaultOpen` | `boolean` | 默认是否显示（非受控模式，默认 `true`） |

## 受控 vs 非受控模式

### 非受控模式（默认）

组件内部管理显示状态，适合简单场景：

```tsx
<Tooltip
  header="My tooltip"
  textlabel="This is my tooltips text"
  closable={true}
  defaultOpen={true}
/>
```

### 受控模式

父组件控制显示状态，适合需要外部控制的场景：

```tsx
function MyComponent() {
  const [open, setOpen] = useState(true);
  
  return (
    <Tooltip
      header="My tooltip"
      textlabel="This is my tooltips text"
      closable={true}
      open={open}
      onClose={() => setOpen(false)}
    />
  );
}
```

## 使用场景

### 成功提示

```tsx
<Tooltip
  header="Success"
  textlabel="Operation completed successfully"
  icon="checkmark"
  closable={true}
/>
```

### 警告提示

```tsx
<Tooltip
  header="Warning"
  textlabel="Please check your input"
  icon="warning"
  closable={true}
/>
```

### 错误提示

```tsx
<Tooltip
  header="Error"
  textlabel="Something went wrong"
  icon="error"
  closable={true}
/>
```

### 信息提示

```tsx
<Tooltip
  header="Information"
  textlabel="Here is some helpful information"
  icon="info"
  closable={true}
/>
```

## 设计规范

- **背景色**: `var(--color-2)` (#23233C)
- **文字颜色**: `var(--color-std-text)` (白色)
- **字体**: Siemens Sans
- **字号**: 14px (var(--font-size-ms-0))
- **行高**: 1.429
- **圆角**: 4px
- **阴影**: shadow-4 (多层阴影效果)
- **最小高度**: 20px

## 可访问性

- 关闭按钮包含 `aria-label="Close tooltip"`
- 使用语义化的 HTML 结构
- 支持键盘操作（关闭按钮可通过 Tab 聚焦）

## 注意事项

1. **图标来源**: 所有图标必须来自 `@irisieason/ix-icons` 包
2. **位置控制**: 组件本身不包含定位逻辑，需要外部容器控制位置
3. **响应式**: 文本使用 `white-space: nowrap`，不会自动换行
4. **关闭事件**: 如果设置 `closable={true}`，建议提供 `onClose` 回调

## Storybook 示例

在 Storybook 中查看更多示例：

- Default - 默认提示框
- WithCloseButton - 带关闭按钮
- WithoutIcon - 不显示图标
- HeaderOnly - 只有标题
- TextOnly - 只有文本
- Success - 成功提示
- Warning - 警告提示
- Error - 错误提示
- Info - 信息提示
- LongText - 长文本提示
