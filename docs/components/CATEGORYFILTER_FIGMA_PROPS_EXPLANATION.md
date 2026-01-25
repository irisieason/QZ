# CategoryFilter Figma 属性说明

## 问题理解

之前我误解了 Figma 设计中的属性含义。现在已经修正。

## Figma 设计属性

根据 Figma 设计，CategoryFilter 有以下属性：

### 1. `showplaceholder` (boolean)

**作用：** 控制是否显示占位符文本

**用途：**
- 在 Figma 中用于切换不同的展示状态
- `true` - 显示占位符（空输入框状态）
- `false` - 隐藏占位符（用于展示已输入内容的状态）

**示例：**
```tsx
// 显示占位符
<CategoryFilter 
  showplaceholder={true}
  placeholderText="Search"
/>
// 输入框显示：Search（灰色占位符）

// 隐藏占位符
<CategoryFilter 
  showplaceholder={false}
  placeholderText="Search"
/>
// 输入框显示：（空白，无占位符）
```

### 2. `placeholderText` (string)

**作用：** 占位符显示的具体文本内容

**用途：**
- 设置占位符的文字
- 只有当 `showplaceholder={true}` 时才会显示

**示例：**
```tsx
<CategoryFilter 
  showplaceholder={true}
  placeholderText="Search categories..."
/>
// 输入框显示：Search categories...（灰色占位符）

<CategoryFilter 
  showplaceholder={true}
  placeholderText="Filter items..."
/>
// 输入框显示：Filter items...（灰色占位符）
```

### 3. `searchIcon` (boolean)

**作用：** 控制是否显示搜索图标

**示例：**
```tsx
// 显示搜索图标
<CategoryFilter searchIcon={true} />
// 🔍 Search

// 不显示搜索图标
<CategoryFilter searchIcon={false} />
// Search
```

## 属性组合示例

### 示例 1：默认状态（显示占位符）
```tsx
<CategoryFilter 
  showplaceholder={true}
  placeholderText="Search"
  searchIcon={true}
/>
```
**效果：** 🔍 Search（灰色占位符）

### 示例 2：隐藏占位符（Figma 用于展示已输入状态）
```tsx
<CategoryFilter 
  showplaceholder={false}
  placeholderText="Search"
  searchIcon={true}
/>
```
**效果：** 🔍 （无占位符，输入框为空）

### 示例 3：自定义占位符文本
```tsx
<CategoryFilter 
  showplaceholder={true}
  placeholderText="Filter categories, tags, or items..."
  searchIcon={true}
/>
```
**效果：** 🔍 Filter categories, tags, or items...（灰色占位符）

### 示例 4：无图标 + 自定义占位符
```tsx
<CategoryFilter 
  showplaceholder={true}
  placeholderText="Type to search..."
  searchIcon={false}
/>
```
**效果：** Type to search...（灰色占位符，无图标）

## 实际使用场景

### 在 Figma 中
设计师使用 `showplaceholder` 来切换不同的展示状态：
- `showplaceholder={true}` - 展示空输入框状态（有占位符）
- `showplaceholder={false}` - 展示已输入内容状态（无占位符，可能有实际文本）

### 在代码中
开发者通常不需要手动控制 `showplaceholder`，因为：
- 当输入框为空时，浏览器会自动显示 `placeholder`
- 当输入框有内容时，浏览器会自动隐藏 `placeholder`

但是，保留这个属性可以让组件与 Figma 设计保持一致，并且在某些特殊场景下可能有用（比如强制隐藏占位符）。

## 实现逻辑

在组件内部：

```typescript
// 计算实际的 placeholder（只有 showplaceholder 为 true 时才显示）
const actualPlaceholder = showplaceholder ? placeholderText : '';

// 传递给 input 元素
<input placeholder={actualPlaceholder} />
```

**逻辑：**
- 如果 `showplaceholder={true}`，则 `placeholder="Search"`
- 如果 `showplaceholder={false}`，则 `placeholder=""`（空字符串，不显示占位符）

## 总结

| 属性 | 类型 | 作用 | 默认值 |
|------|------|------|--------|
| `showplaceholder` | boolean | 控制是否显示占位符 | `true` |
| `placeholderText` | string | 占位符的文本内容 | `"Search"` |
| `searchIcon` | boolean | 控制是否显示搜索图标 | `true` |

**关键理解：**
- `showplaceholder` 是开关（显示/隐藏）
- `placeholderText` 是内容（显示什么文字）
- 只有当 `showplaceholder={true}` 时，`placeholderText` 才会显示

这样的设计符合 Figma 的设计思路，让设计师可以在 Figma 中灵活控制组件的展示状态。
