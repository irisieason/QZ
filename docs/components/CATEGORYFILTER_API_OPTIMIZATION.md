# CategoryFilter 组件 API 优化总结

## 优化目标

基于 Figma 设计，但转换为符合 React 最佳实践和实际使用场景的组件 API。

## 主要变更

### 1. 属性命名优化

#### 之前（Figma 风格）
```typescript
interface CategoryFilterProps {
  placeholderText?: string;
  searchIcon?: boolean;
  state?: 'Default' | 'Hover' | 'ReadOnly' | 'Disabled';
  focused?: boolean;
}
```

#### 之后（React 标准）
```typescript
interface CategoryFilterProps {
  // 内容属性
  placeholder?: string;              // 更简洁
  
  // 视觉属性
  showSearchIcon?: boolean;          // 更明确
  
  // 状态属性（转换为标准 HTML 属性）
  disabled?: boolean;                // 标准 HTML 属性
  readOnly?: boolean;                // 标准 HTML 属性
  
  // 数据属性
  value?: string;                    // 受控模式
  defaultValue?: string;             // 非受控模式
  
  // 功能属性
  clearable?: boolean;
  
  // 事件回调
  onChange?: (value: string, event: ChangeEvent) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  // ...
}
```

### 2. 状态管理优化

#### 移除的属性
- ❌ `state: 'Default' | 'Hover' | 'ReadOnly' | 'Disabled'` - 不符合 React 习惯
- ❌ `focused: boolean` - 应该由组件内部管理，不应作为 prop

#### 新增的属性
- ✅ `disabled: boolean` - 标准 HTML 属性
- ✅ `readOnly: boolean` - 标准 HTML 属性

#### 原理
- **Figma 的 `state`** 是为了设计展示，包含了 Hover 等 CSS 伪类状态
- **React 组件** 应该使用标准 HTML 属性，让浏览器自动处理交互状态
- **Hover 状态** 由 CSS `:hover` 伪类自动处理，不需要 prop
- **Focused 状态** 由组件内部 `useState` 管理，不需要外部控制

### 3. CSS 类名优化

#### 移除的类名
```css
/* ❌ 不再需要 */
.category-filter--default { }
.category-filter--hover { }
```

#### 保留的类名
```css
/* ✅ 保留 */
.category-filter--disabled { }
.category-filter--readonly { }
.category-filter--focused { }  /* 由组件内部管理 */
```

#### 自动交互反馈
```css
/* ✅ 使用 CSS 伪类自动处理 hover */
.category-filter__container:hover {
  border-color: var(--theme-color-dynamic);
  background-color: var(--theme-color-component-8--hover);
}

/* ✅ 使用 :focus-within 自动处理聚焦 */
.category-filter__container:focus-within {
  border-color: var(--theme-color-dynamic);
  background-color: var(--theme-color-component-8--hover);
}
```

### 4. 使用示例对比

#### 之前（Figma 风格）
```tsx
// ❌ 不符合 React 习惯
<CategoryFilter
  placeholderText="Search"
  searchIcon={true}
  state="Default"
  focused={false}
/>

// ❌ 需要手动管理 hover 状态
<CategoryFilter
  placeholderText="Search"
  searchIcon={true}
  state="Hover"  // 这不应该是 prop
/>
```

#### 之后（React 标准）
```tsx
// ✅ 简洁明了
<CategoryFilter
  placeholder="Search"
  showSearchIcon={true}
/>

// ✅ 使用标准 HTML 属性
<CategoryFilter
  placeholder="Search"
  disabled={true}
/>

<CategoryFilter
  placeholder="Search"
  readOnly={true}
/>

// ✅ 受控模式
<CategoryFilter
  value={searchValue}
  onChange={(value) => setSearchValue(value)}
  onSearch={handleSearch}
/>

// ✅ 非受控模式
<CategoryFilter
  defaultValue="initial"
  onSearch={handleSearch}
/>
```

## 设计原则总结

### Figma 设计 → React 组件的转换规则

1. **视觉属性** → 直接映射，但优化命名
   - `placeholderText` → `placeholder`
   - `searchIcon` → `showSearchIcon`

2. **状态属性** → 转换为标准 HTML 属性
   - `state="Disabled"` → `disabled={true}`
   - `state="ReadOnly"` → `readOnly={true}`
   - `state="Hover"` → 移除（CSS 自动处理）
   - `state="Default"` → 移除（默认状态）

3. **展示属性** → 移除或内部管理
   - `focused` → 移除（组件内部 useState 管理）
   - `showplaceholder` → 移除（由 placeholder 和 value 自动决定）

4. **添加交互属性** → Figma 没有但必需
   - `value`, `defaultValue` - 受控/非受控模式
   - `onChange`, `onSearch`, `onClear` - 事件处理
   - `clearable` - 功能开关

## 优势

### 1. 更符合 React 生态
- 使用标准 HTML 属性（`disabled`, `readOnly`）
- 支持受控/非受控模式
- 提供完整的事件回调

### 2. 更简洁的 API
- 移除了不必要的 `state` 枚举
- 移除了应该内部管理的 `focused` prop
- 属性命名更简洁（`placeholder` vs `placeholderText`）

### 3. 更好的开发体验
- TypeScript 类型更清晰
- Storybook 控制面板更简洁
- 符合开发者直觉

### 4. 更好的性能
- CSS 伪类自动处理 hover，无需 JavaScript
- 减少不必要的 prop 传递和状态更新

## 兼容性说明

### 破坏性变更
如果之前使用了旧 API，需要进行以下迁移：

```tsx
// 旧代码
<CategoryFilter
  placeholderText="Search"
  searchIcon={true}
  state="Disabled"
/>

// 新代码
<CategoryFilter
  placeholder="Search"
  showSearchIcon={true}
  disabled={true}
/>
```

### 迁移指南

| 旧属性 | 新属性 | 说明 |
|--------|--------|------|
| `placeholderText` | `placeholder` | 重命名 |
| `searchIcon` | `showSearchIcon` | 重命名 |
| `state="Disabled"` | `disabled={true}` | 转换为布尔属性 |
| `state="ReadOnly"` | `readOnly={true}` | 转换为布尔属性 |
| `state="Hover"` | 移除 | CSS 自动处理 |
| `state="Default"` | 移除 | 默认状态 |
| `focused` | 移除 | 内部管理 |

## 总结

这次优化遵循了"**Figma 是视觉设计的真相来源，但代码组件需要基于实际的交互行为和开发最佳实践来设计**"的原则。

- ✅ 保留了 Figma 的视觉设计规范
- ✅ 转换为符合 React 生态的 API
- ✅ 提供了更好的开发体验
- ✅ 支持实际使用场景（受控/非受控、事件处理等）

这样的设计既保持了设计一致性，又确保了组件的实用性和可维护性。
