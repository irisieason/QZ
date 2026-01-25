# CategoryFilter 最终属性定义

## Figma 设计属性（完全遵循）

根据 Figma 设计，CategoryFilter 组件有以下属性：

### 1. `placeholderText` (string)
- **作用：** 占位符显示的文本内容
- **默认值：** `"Search"`
- **示例：**
  ```tsx
  <CategoryFilter placeholderText="Search categories..." />
  ```

### 2. `showplaceholder` (boolean)
- **作用：** 控制是否显示占位符
- **默认值：** `true`
- **用途：** 在 Figma 中用于切换不同的展示状态
- **示例：**
  ```tsx
  // 显示占位符
  <CategoryFilter showplaceholder={true} placeholderText="Search" />
  
  // 隐藏占位符（用于展示已输入内容的状态）
  <CategoryFilter showplaceholder={false} placeholderText="Search" />
  ```

### 3. `searchIcon` (boolean)
- **作用：** 控制是否显示搜索图标
- **默认值：** `true`
- **示例：**
  ```tsx
  // 显示搜索图标
  <CategoryFilter searchIcon={true} />
  
  // 不显示搜索图标
  <CategoryFilter searchIcon={false} />
  ```

## 扩展属性（React 特定）

### 状态属性

#### `disabled` (boolean)
- **作用：** 是否禁用输入框
- **默认值：** `false`
- **示例：**
  ```tsx
  <CategoryFilter disabled={true} />
  ```

#### `readOnly` (boolean)
- **作用：** 是否只读
- **默认值：** `false`
- **示例：**
  ```tsx
  <CategoryFilter readOnly={true} />
  ```

### 数据属性（受控/非受控）

#### `value` (string)
- **作用：** 输入值（受控模式）
- **示例：**
  ```tsx
  const [value, setValue] = useState('');
  <CategoryFilter 
    value={value} 
    onChange={(newValue) => setValue(newValue)} 
  />
  ```

#### `defaultValue` (string)
- **作用：** 默认值（非受控模式）
- **示例：**
  ```tsx
  <CategoryFilter defaultValue="initial value" />
  ```

### 功能属性

#### `clearable` (boolean)
- **作用：** 是否显示清除按钮
- **默认值：** `true`
- **示例：**
  ```tsx
  <CategoryFilter clearable={true} />
  ```

### 事件回调

#### `onChange` (function)
- **签名：** `(value: string, event: ChangeEvent) => void`
- **作用：** 值变化时触发
- **示例：**
  ```tsx
  <CategoryFilter onChange={(value) => console.log(value)} />
  ```

#### `onSearch` (function)
- **签名：** `(value: string) => void`
- **作用：** 按 Enter 键时触发
- **示例：**
  ```tsx
  <CategoryFilter onSearch={(value) => handleSearch(value)} />
  ```

#### `onClear` (function)
- **签名：** `() => void`
- **作用：** 点击清除按钮或按 ESC 键时触发
- **示例：**
  ```tsx
  <CategoryFilter onClear={() => console.log('cleared')} />
  ```

#### `onFocus` (function)
- **签名：** `(event: FocusEvent) => void`
- **作用：** 输入框聚焦时触发

#### `onBlur` (function)
- **签名：** `(event: FocusEvent) => void`
- **作用：** 输入框失焦时触发

#### `onKeyDown` (function)
- **签名：** `(event: KeyboardEvent) => void`
- **作用：** 键盘按下时触发

### 技术属性

#### `className` (string)
- **作用：** 自定义 CSS 类名

#### `style` (CSSProperties)
- **作用：** 自定义内联样式

#### `id` (string)
- **作用：** 输入框 ID

#### `aria-label` (string)
- **作用：** 可访问性标签

## 完整类型定义

```typescript
interface CategoryFilterProps {
  // Figma 设计属性
  placeholderText?: string;
  showplaceholder?: boolean;
  searchIcon?: boolean;
  
  // 状态属性
  disabled?: boolean;
  readOnly?: boolean;
  
  // 数据属性
  value?: string;
  defaultValue?: string;
  
  // 功能属性
  clearable?: boolean;
  
  // 事件回调
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  
  // 技术属性
  className?: string;
  style?: CSSProperties;
  id?: string;
  'aria-label'?: string;
}
```

## 使用示例

### 基础用法
```tsx
<CategoryFilter 
  placeholderText="Search"
  showplaceholder={true}
  searchIcon={true}
/>
```

### 自定义占位符
```tsx
<CategoryFilter 
  placeholderText="Filter categories..."
  showplaceholder={true}
  searchIcon={true}
/>
```

### 隐藏占位符（Figma 展示状态）
```tsx
<CategoryFilter 
  placeholderText="Search"
  showplaceholder={false}
  searchIcon={true}
/>
```

### 无搜索图标
```tsx
<CategoryFilter 
  placeholderText="Search"
  showplaceholder={true}
  searchIcon={false}
/>
```

### 禁用状态
```tsx
<CategoryFilter 
  placeholderText="Search"
  disabled={true}
/>
```

### 只读状态
```tsx
<CategoryFilter 
  placeholderText="Search"
  readOnly={true}
/>
```

### 受控模式
```tsx
const [value, setValue] = useState('');

<CategoryFilter 
  value={value}
  onChange={(newValue) => setValue(newValue)}
  onSearch={(searchValue) => console.log('Search:', searchValue)}
/>
```

### 非受控模式
```tsx
<CategoryFilter 
  defaultValue="initial"
  onSearch={(value) => console.log('Search:', value)}
/>
```

## 重要说明

### 没有 `placeholder` 布尔属性
- ❌ **不存在** `placeholder` 布尔属性
- ✅ **正确的是** `showplaceholder` 布尔属性（控制是否显示）
- ✅ **正确的是** `placeholderText` 字符串属性（控制显示什么）

### 属性命名规则
- `showplaceholder` - 小写，与 Figma 完全一致
- `placeholderText` - 驼峰命名，与 Figma 完全一致
- `searchIcon` - 驼峰命名，与 Figma 完全一致

### 实现逻辑
```typescript
// 组件内部实现
const actualPlaceholder = showplaceholder ? placeholderText : '';

<input placeholder={actualPlaceholder} />
```

当 `showplaceholder={false}` 时，`placeholder` 属性会被设置为空字符串，从而隐藏占位符。

## Storybook 控制面板

在 Storybook 中，你可以看到以下可控制的属性：

**Figma 设计属性：**
- `placeholderText` (text input) - 修改占位符文本
- `showplaceholder` (boolean toggle) - 显示/隐藏占位符
- `searchIcon` (boolean toggle) - 显示/隐藏搜索图标

**状态：**
- `disabled` (boolean toggle)
- `readOnly` (boolean toggle)

**功能：**
- `clearable` (boolean toggle)

切换这些属性应该会立即看到效果！
