# Slot 组件

Slot 是一个通用的插槽容器组件，可以作为任何组件的 children 使用。尺寸由父组件决定，自动适应父容器。

## 特点

- ✅ **通用容器** - 可以包含任意子组件
- ✅ **自适应尺寸** - 尺寸由父组件决定
- ✅ **灵活布局** - 自动处理子组件的间距和对齐
- ✅ **简洁 API** - 只需要传入 children

## 基础用法

### 在 ContentHeader 中使用

```tsx
import { ContentHeader, Slot, Button } from '@irisieason/qz-react';

function MyPage() {
  return (
    <ContentHeader
      headerTitle="User Profile"
      buttonSlot={true}
    >
      <Slot>
        <Button label="Cancel" variant="Secondary ghost" />
        <Button label="Save" variant="Primary" />
      </Slot>
    </ContentHeader>
  );
}
```

### 在其他组件中使用

```tsx
// Slot 可以在任何需要插槽的地方使用
<SomeComponent>
  <Slot>
    <Button label="Action 1" />
    <Button label="Action 2" />
  </Slot>
</SomeComponent>
```

### 包含多个按钮

```tsx
<Slot>
  <Button label="Delete" variant="Danger" />
  <Button label="Edit" variant="Secondary outline" />
  <Button label="Save" variant="Primary" />
</Slot>
```

## 属性

### SlotProps

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| children | `React.ReactNode` | - | 子组件（任意组件） |
| className | `string` | `''` | 自定义 CSS 类名 |
| style | `React.CSSProperties` | - | 自定义样式 |
| aria-label | `string` | - | 可访问性标签 |

## 设计说明

### 布局规则

- **尺寸**：由父组件决定（width: 100%, height: 100%）
- **子组件间距**：8px（可通过 style 自定义）
- **水平对齐**：居中（可通过 style 自定义）
- **垂直对齐**：居中

### 样式定制

```tsx
// 自定义间距
<Slot style={{ gap: '16px' }}>
  <Button label="Action 1" />
  <Button label="Action 2" />
</Slot>

// 自定义对齐方式
<Slot style={{ justifyContent: 'flex-start' }}>
  <Button label="Action 1" />
  <Button label="Action 2" />
</Slot>

// 添加内边距
<Slot style={{ padding: '0 16px' }}>
  <Button label="Action 1" />
  <Button label="Action 2" />
</Slot>
```

## 最佳实践

### ✅ 推荐做法

```tsx
// 1. 作为通用容器使用
<Slot>
  <Button label="Action" />
</Slot>

// 2. 让父组件控制尺寸
<div style={{ width: '300px', height: '50px' }}>
  <Slot>
    <Button label="Save" />
  </Slot>
</div>

// 3. 保持子组件数量合理
<Slot>
  <Button label="Cancel" />
  <Button label="Save" />
</Slot>
```

### ❌ 不推荐做法

```tsx
// 1. 不要在 Slot 上设置固定尺寸
<Slot style={{ width: '300px', height: '50px' }}>  {/* 应该由父组件控制 */}
  <Button label="Save" />
</Slot>

// 2. 避免放置过多子组件
<Slot>
  <Button label="1" />
  <Button label="2" />
  <Button label="3" />
  <Button label="4" />
  <Button label="5" />  {/* 太多了 */}
</Slot>
```

## 使用场景

### 1. ContentHeader 操作按钮区域

```tsx
<ContentHeader buttonSlot={true}>
  <Slot>
    <Button label="Edit" />
    <Button label="Save" />
  </Slot>
</ContentHeader>
```

### 2. 自定义工具栏

```tsx
<Toolbar>
  <Slot>
    <Button label="New" icon="add" />
    <Button label="Delete" icon="trash" />
  </Slot>
</Toolbar>
```

### 3. 对话框按钮区域

```tsx
<Dialog>
  <DialogContent>...</DialogContent>
  <DialogActions>
    <Slot>
      <Button label="Cancel" />
      <Button label="Confirm" />
    </Slot>
  </DialogActions>
</Dialog>
```

## 尺寸适应示例

```tsx
// 小容器
<div style={{ width: '200px', height: '40px' }}>
  <Slot>
    <Button label="Save" />
  </Slot>
</div>

// 中等容器
<div style={{ width: '300px', height: '50px' }}>
  <Slot>
    <Button label="Edit" />
    <Button label="Save" />
  </Slot>
</div>

// 大容器
<div style={{ width: '500px', height: '60px' }}>
  <Slot>
    <Button label="Delete" />
    <Button label="Edit" />
    <Button label="Save" />
  </Slot>
</div>
```

## 可访问性

```tsx
// 提供可访问性标签
<Slot aria-label="Action buttons">
  <Button label="Save" aria-label="Save changes" />
  <Button label="Cancel" aria-label="Cancel editing" />
</Slot>
```

## TypeScript 支持

```typescript
import type { SlotProps } from '@irisieason/qz-react';

const MySlot: React.FC<SlotProps> = ({ children }) => {
  return (
    <Slot>
      {children}
    </Slot>
  );
};
```

## 与其他组件的关系

Slot 是一个通用容器，可以与任何组件配合使用：

- **ContentHeader** - 作为操作按钮区域
- **Toolbar** - 作为工具栏按钮容器
- **Dialog** - 作为对话框按钮区域
- **任何自定义组件** - 作为通用插槽容器

## 相关组件

- [ContentHeader](../ContentHeader/README.md) - 页面头部组件
- [Button](../Button/README.md) - 按钮组件
- [IconButton](../IconButton/README.md) - 图标按钮组件
