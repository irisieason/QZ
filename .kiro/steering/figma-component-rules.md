---
inclusion: always
---

# Figma 组件开发规则

## 核心原则

**参考 Figma 视觉设计，遵循 React 最佳实践，构建可维护、可测试、高性能的组件。**

## 第一部分：Figma 设计规范

### 组件属性规则

#### 1. 视觉属性参考 Figma，技术实现遵循 React 标准

从 Figma 获取组件设计后，应该：

✅ **视觉属性（参考 Figma）：**
- 使用 Figma 中定义的视觉属性（label、variant、size 等）
- 保持视觉效果与 Figma 设计一致
- 实现 Figma 中定义的所有变体和状态

✅ **技术实现（遵循 React 标准）：**
- 添加必要的 React 标准属性（onChange、onClick、className 等）
- 使用 React 标准命名约定（即使 Figma 使用不同名称）
- 支持受控/非受控模式（如果是输入组件）
- 提供完整的事件回调
- 支持可访问性属性（aria-*）

❌ **应该避免：**
- 忽略 Figma 的视觉设计
- 自行创造 Figma 中不存在的视觉变体
- 不遵循 React 标准命名约定

#### 2. 属性设计示例

根据 Figma 设计和 React 标准，Button 组件的完整属性定义：

```typescript
interface ButtonProps {
  // ========== 视觉属性（来自 Figma） ==========
  /** 按钮文本 */
  label?: string;
  
  /** 是否显示图标 */
  showIcon?: boolean;
  
  /** 图标名称 */
  icon?: string;
  
  /** 按钮变体 */
  variant?: 
    | "Primary" 
    | "Primary outline" 
    | "Primary ghost" 
    | "Secondary" 
    | "Secondary outline" 
    | "Secondary ghost" 
    | "Danger" 
    | "Danger outline" 
    | "Danger ghost" 
    | "🔶 Content action";
  
  /** 按钮状态 */
  state?: 
    | "Default" 
    | "Hover" 
    | "Active" 
    | "Disabled" 
    | "Loading";
  
  /** 是否显示聚焦状态（Figma 展示用） */
  focused?: boolean;
  
  // ========== React 标准属性（技术实现） ==========
  /** 点击事件回调 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** 是否禁用（便捷属性） */
  disabled?: boolean;
  
  /** 自定义 CSS 类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
  
  /** 可访问性标签 */
  'aria-label'?: string;
  
  /** 按钮类型 */
  type?: 'button' | 'submit' | 'reset';
}
```

**说明：**
- ✅ 视觉属性来自 Figma，保持设计一致性
- ✅ React 属性遵循标准，确保技术规范性
- ✅ 两者结合，创建完整、可用的组件

#### 3. 开发流程

1. **获取 Figma 设计**
   ```bash
   # 使用 Figma MCP 工具获取组件定义
   ```

2. **分析设计属性**
   - 记录所有 Figma 定义的视觉属性
   - 记录属性类型、默认值、可选值
   - 记录 Code Connect 示例（如果有）

3. **设计组件属性**
   - 保留 Figma 的视觉属性
   - 添加必要的 React 标准属性
   - 确保命名遵循 React 约定

4. **实现组件**
   - 实现所有视觉效果（与 Figma 一致）
   - 实现内置交互行为（hover、focus 等）
   - 实现事件处理和数据绑定

5. **验证一致性**
   - 视觉效果与 Figma 设计一致
   - 技术实现符合 React 标准
   - 所有功能完整可用

### 属性设计模式

#### 分层属性结构

组件属性应该按照来源和用途分层：

```typescript
// ✅ 正确：清晰的属性分层

// 1. Figma 视觉属性
interface ComponentVisualProps {
  label?: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

// 2. React 标准属性
interface ComponentReactProps {
  // 数据属性
  value?: string;
  defaultValue?: string;
  
  // 事件属性
  onChange?: (value: string, event: ChangeEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onClick?: (event: MouseEvent) => void;
  
  // 技术属性
  className?: string;
  style?: CSSProperties;
  id?: string;
  'aria-label'?: string;
}

// 3. 最终组件属性
interface ComponentProps extends ComponentVisualProps, ComponentReactProps {}
```

#### React 标准命名约定

即使 Figma 使用不同的名称，也应该遵循 React 标准：

```typescript
// ✅ 正确：遵循 React 标准
interface InputProps {
  value?: string;              // React 标准，不是 Figma 的 "text"
  onChange?: (value) => void;  // React 标准，不是 Figma 的 "onTextChange"
  disabled?: boolean;          // React 标准，不是 Figma 的 "isDisabled"
}
```

#### 示例对比

**❌ 错误示例（忽略 React 标准）：**
```typescript
interface ButtonProps {
  text?: string;               // ❌ 应该用 label 或 children
  isClickable?: boolean;       // ❌ 按钮本来就可点击
  onPress?: () => void;        // ❌ React 标准是 onClick
}
```

**✅ 正确示例（Figma 视觉 + React 标准）：**
```typescript
interface ButtonProps {
  // Figma 视觉属性
  label?: string;              // ✅ 来自 Figma
  variant?: "Primary" | ...;   // ✅ 来自 Figma
  showIcon?: boolean;          // ✅ 来自 Figma
  
  // React 标准属性
  onClick?: () => void;        // ✅ React 标准
  disabled?: boolean;          // ✅ React 标准
  className?: string;          // ✅ React 标准
}
```

### 扩展属性规则

React 标准属性是必需的，应该与 Figma 视觉属性一起定义：

```typescript
// ✅ 正确：完整的组件属性定义
interface ButtonProps {
  // ========== Figma 视觉属性 ==========
  label?: string;
  variant?: 'primary' | 'secondary';
  showIcon?: boolean;
  
  // ========== React 标准属性 ==========
  // 事件属性
  onClick?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  
  // 技术属性
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  
  // 数据属性（如果是输入组件）
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}
```

**说明：**
- Figma 视觉属性控制外观
- React 标准属性提供功能
- 两者结合创建完整组件

## 第二部分：内置交互行为

### 组件必须实现的内置交互行为

组件应该根据其类型自动支持相应的交互行为，**不需要通过属性控制**，这些是组件的基础能力：

#### 输入类组件（Input、SearchInput、CategoryFilter 等）

**必须自动支持：**
- ✅ **Hover 效果** - 鼠标悬停时边框/背景色变化（CSS 实现）
- ✅ **Focus 效果** - 点击聚焦时显示聚焦轮廓（CSS `:focus` 实现）
- ✅ **输入功能** - 可以直接输入文字（原生 input 行为）
- ✅ **光标显示** - 聚焦时显示闪烁光标（原生行为）
- ✅ **文本选择** - 可以选中文字（原生行为）
- ✅ **键盘操作** - 支持 Backspace、Delete、方向键等（原生行为）
- ✅ **清除功能** - 有内容时自动显示清除按钮（组件内部逻辑）
- ✅ **占位符** - 无内容时显示占位符文本（原生 placeholder）

**实现示例：**
```typescript
// ✅ 正确：组件内部实现交互行为
const SearchInput = ({ value, onChange, placeholderText, clearable }) => {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // 自动管理聚焦状态
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  // 自动显示/隐藏清除按钮
  const showClearButton = clearable && internalValue.length > 0;
  
  return (
    <div className={`search-input ${isFocused ? 'focused' : ''}`}>
      <input
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholderText}
      />
      {showClearButton && (
        <button onClick={() => setInternalValue('')}>
          <ix-icon name="close" />
        </button>
      )}
    </div>
  );
};
```

#### 按钮类组件（Button、IconButton 等）

**必须自动支持：**
- ✅ **Hover 效果** - 鼠标悬停时背景色/边框变化（CSS `:hover` 实现）
- ✅ **Active 效果** - 鼠标按下时的视觉反馈（CSS `:active` 实现）
- ✅ **Focus 效果** - 键盘聚焦时显示聚焦轮廓（CSS `:focus-visible` 实现）
- ✅ **点击功能** - 可以点击触发事件（原生 button 行为）
- ✅ **键盘操作** - 支持 Enter/Space 键触发（原生 button 行为）
- ✅ **禁用状态** - disabled 时自动阻止交互（原生 disabled 属性）
- ✅ **加载状态** - loading 时显示加载动画（组件内部逻辑）

**实现示例：**
```typescript
// ✅ 正确：组件内部实现交互行为
const Button = ({ label, variant, state, onClick }) => {
  const isDisabled = state === 'Disabled';
  const isLoading = state === 'Loading';
  
  return (
    <button
      className={`button button--${variant} button--${state}`}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      type="button"
    >
      {isLoading ? <LoadingSpinner /> : label}
    </button>
  );
};
```

**CSS 实现交互效果：**
```css
/* Hover 效果 - 自动触发 */
.button:hover:not(:disabled) {
  background-color: var(--color-hover);
}

/* Active 效果 - 自动触发 */
.button:active:not(:disabled) {
  background-color: var(--color-active);
}

/* Focus 效果 - 自动触发 */
.button:focus-visible {
  outline: 2px solid var(--color-focus);
}
```

#### 菜单类组件（MenuItem、ApplicationMenu 等）

**必须自动支持：**
- ✅ **Hover 效果** - 鼠标悬停时背景色变化
- ✅ **选中状态** - 点击后自动切换选中状态（如果是可选菜单项）
- ✅ **键盘导航** - 支持方向键上下移动、Enter 选择
- ✅ **展开/收起** - 子菜单自动展开收起（如果有子菜单）
- ✅ **Focus 管理** - 自动管理焦点移动

#### 切换类组件（Toggle、Checkbox、Radio 等）

**必须自动支持：**
- ✅ **Hover 效果** - 鼠标悬停时视觉反馈
- ✅ **切换动画** - 状态切换时的过渡动画
- ✅ **键盘操作** - 支持 Space 键切换
- ✅ **Focus 效果** - 键盘聚焦时的视觉反馈

### 内置行为 vs 属性控制

**内置行为（组件自动支持）：**
```typescript
// ❌ 错误：不需要这些属性
interface ButtonProps {
  hoverable?: boolean;      // 错误！hover 是自动的
  focusable?: boolean;      // 错误！focus 是自动的
  clickable?: boolean;      // 错误！点击是自动的
}

// ✅ 正确：这些是内置行为，不需要属性
const Button = ({ label, onClick }) => {
  // hover、focus、click 都是自动支持的
  return <button onClick={onClick}>{label}</button>;
};
```

**属性控制（需要外部配置）：**
```typescript
// ✅ 正确：这些需要属性控制
interface ButtonProps {
  label?: string;           // 显示什么文字
  variant?: string;         // 什么样式
  disabled?: boolean;       // 是否禁用
  showIcon?: boolean;       // 是否显示图标
  onClick?: () => void;     // 点击时做什么
}
```

### 检查清单：内置交互行为

创建组件时，确认已实现：

#### 输入类组件
- [ ] CSS hover 效果（边框/背景色变化）
- [ ] CSS focus 效果（聚焦轮廓）
- [ ] 原生输入功能（可以打字）
- [ ] 自动显示/隐藏清除按钮
- [ ] 键盘操作支持（Enter、Escape 等）

#### 按钮类组件
- [ ] CSS hover 效果（背景色变化）
- [ ] CSS active 效果（按下反馈）
- [ ] CSS focus 效果（聚焦轮廓）
- [ ] 原生点击功能
- [ ] 禁用状态自动阻止交互
- [ ] 加载状态显示动画

#### 菜单类组件
- [ ] CSS hover 效果
- [ ] 键盘导航（方向键、Enter）
- [ ] 自动管理焦点
- [ ] 选中状态切换

## 第三部分：React 最佳实践

### 1. 组件属性设计

#### 属性分层结构

组件属性应该按照关注点分离原则进行分层设计：

```typescript
// ✅ 正确：分层属性设计
// 设计系统属性（来自 Figma）
interface ComponentFigmaProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

// 扩展属性（React 特定）
interface ComponentExtendedProps {
  // 数据属性
  value?: string;
  defaultValue?: string;
  
  // 事件属性
  onChange?: (value: string, event: ChangeEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  
  // 技术属性
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
}

// 最终组件属性
interface ComponentProps extends ComponentFigmaProps, ComponentExtendedProps {}
```

#### 受控/非受控组件模式

所有输入类组件都应该支持受控和非受控两种模式：

```typescript
// ✅ 正确：支持受控/非受控
interface InputProps {
  // 受控模式
  value?: string;
  onChange?: (value: string) => void;
  
  // 非受控模式
  defaultValue?: string;
}

// 实现示例
const [internalValue, setInternalValue] = useState(defaultValue || '');
const isControlled = value !== undefined;
const inputValue = isControlled ? value : internalValue;
```

#### 事件处理规范

```typescript
// ✅ 正确：事件处理命名和类型
interface ComponentProps {
  // 基础事件 - 使用原生事件类型
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  
  // 自定义事件 - 提供业务数据
  onValueChange?: (value: string, event: React.ChangeEvent) => void;
  onSelectionChange?: (selectedItems: string[]) => void;
  
  // 异步事件 - 支持 Promise
  onSubmit?: (data: FormData) => Promise<void> | void;
}
```

### 2. 组件实现模式

#### forwardRef 使用

所有可聚焦的组件都应该使用 forwardRef：

```typescript
// ✅ 正确：使用 forwardRef
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  value,
  onChange,
  ...props
}, ref) => {
  return <input ref={ref} value={value} onChange={onChange} {...props} />;
});

Input.displayName = 'Input';
```

#### Hook 使用最佳实践

```typescript
// ✅ 正确：Hook 使用模式
const Component = ({ value, onChange, onFocus }) => {
  // 1. 使用 useCallback 优化事件处理
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange?.(newValue, event);
  }, [onChange]);
  
  // 2. 使用 useMemo 优化计算
  const computedValue = useMemo(() => {
    return expensiveCalculation(value);
  }, [value]);
  
  // 3. 使用 useEffect 处理副作用
  useEffect(() => {
    // 副作用逻辑
    return () => {
      // 清理逻辑
    };
  }, [dependency]);
};
```

### 3. 性能优化

#### 防抖和节流

```typescript
// ✅ 正确：防抖实现
const SearchInput = ({ onSearch, debounceMs = 300 }) => {
  const [value, setValue] = useState('');
  
  const debouncedSearch = useMemo(
    () => debounce((searchValue: string) => {
      onSearch?.(searchValue);
    }, debounceMs),
    [onSearch, debounceMs]
  );
  
  useEffect(() => {
    debouncedSearch(value);
    return () => debouncedSearch.cancel();
  }, [value, debouncedSearch]);
};
```

#### 条件渲染优化

```typescript
// ✅ 正确：条件渲染
const Component = ({ showIcon, items }) => {
  return (
    <div>
      {/* 简单条件 */}
      {showIcon && <Icon />}
      
      {/* 复杂条件 - 使用函数 */}
      {items.length > 0 ? (
        <ItemList items={items} />
      ) : (
        <EmptyState />
      )}
      
      {/* 避免创建不必要的元素 */}
      {items.map(item => (
        <Item key={item.id} data={item} />
      ))}
    </div>
  );
};
```

### 4. 可访问性 (A11y)

#### 基础可访问性

```typescript
// ✅ 正确：可访问性实现
const Button = ({ children, disabled, onClick, 'aria-label': ariaLabel }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};
```

#### 键盘导航

```typescript
// ✅ 正确：键盘导航
const SearchInput = ({ onSearch, onEscape }) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        onSearch?.(event.currentTarget.value);
        break;
      case 'Escape':
        event.preventDefault();
        onEscape?.();
        break;
    }
  }, [onSearch, onEscape]);
  
  return (
    <input
      onKeyDown={handleKeyDown}
      role="searchbox"
      aria-label="Search input"
    />
  );
};
```

### 5. 类型安全

#### 严格的 TypeScript 类型

```typescript
// ✅ 正确：严格类型定义
interface StrictComponentProps {
  // 使用字面量类型而不是 string
  variant: 'primary' | 'secondary' | 'danger';
  
  // 使用泛型提高复用性
  data: Array<{ id: string; name: string }>;
  
  // 事件处理器类型要精确
  onSelect: (item: { id: string; name: string }) => void;
  
  // 可选属性要明确
  className?: string;
  
  // 联合类型要完整
  status: 'loading' | 'success' | 'error' | 'idle';
}
```

### 6. 测试友好设计

#### 测试属性

```typescript
// ✅ 正确：测试友好的属性
interface ComponentProps {
  // 业务属性
  title: string;
  items: Item[];
  
  // 测试属性（仅在测试环境使用）
  'data-testid'?: string;
  'data-test-state'?: string;
}

const Component = ({ title, items, 'data-testid': testId }) => {
  return (
    <div data-testid={testId}>
      <h1>{title}</h1>
      {items.map(item => (
        <div key={item.id} data-testid={`item-${item.id}`}>
          {item.name}
        </div>
      ))}
    </div>
  );
};
```

### 7. 文档和注释

#### JSDoc 注释

```typescript
/**
 * 搜索输入组件，支持防抖和建议功能
 * 
 * @example
 * ```tsx
 * <SearchInput
 *   placeholder="Search products..."
 *   onSearch={handleSearch}
 *   debounceMs={300}
 * />
 * ```
 */
interface SearchInputProps {
  /** 占位符文本 */
  placeholder?: string;
  
  /** 搜索回调，会在用户输入后触发（支持防抖） */
  onSearch?: (query: string) => void;
  
  /** 防抖延迟时间，单位毫秒 @default 300 */
  debounceMs?: number;
}
```

## 综合检查清单

在开发组��时，确认以下要点：

### Figma 设计规范
- [ ] 视觉效果与 Figma 设计一致
- [ ] 实现了所有 Figma 定义的视觉属性
- [ ] 实现了所有 Figma 定义的变体和状态
- [ ] 添加了必要的 React 标准属性
- [ ] 属性命名遵循 React 约定

### 内置交互行为
- [ ] 实现了所有必需的内置交互行为（hover、focus、click 等）
- [ ] 交互行为通过 CSS 和组件内部逻辑实现，不暴露为属性
- [ ] 支持键盘操作（如果适用）
- [ ] 自动管理内部状态（如 focused、filled）

### React 最佳实践
- [ ] 使用 TypeScript 并提供完整类型定义
- [ ] 支持 forwardRef（如果组件可聚焦）
- [ ] 实现受控/非受控模式（如果是输入组件）
- [ ] 使用 useCallback 优化事件处理器
- [ ] 使用 useMemo 优化计算密集型操作

### 可访问性
- [ ] 提供适当的 ARIA 属性
- [ ] 支持键盘导航
- [ ] 提供语义化的 HTML 结构
- [ ] 支持屏幕阅读器

### 性能优化
- [ ] 避免不必要的重渲染
- [ ] 使用防抖/节流（如果需要）
- [ ] 优化条件渲染
- [ ] 合理使用 React.memo（如果需要）

### 测试和维护
- [ ] 提供 data-testid 属性
- [ ] 编写单元测试
- [ ] 提供使用示例和文档
- [ ] 处理边界情况和错误状态

### 代码质量
- [ ] 遵循一致的命名约定
- [ ] 提供 JSDoc 注释
- [ ] 使用 ESLint 和 Prettier
- [ ] 避免 any 类型

## 违规示例

以下是常见的违规情况：

### 违规 1: 忽略 Figma 视觉设计
```typescript
// ❌ 错误：自行创造视觉变体
interface ButtonProps {
  variant?: 'small' | 'medium' | 'large';  // Figma 中没有定义
  color?: 'red' | 'blue' | 'green';        // Figma 中没有定义
}

// ✅ 正确：使用 Figma 定义的变体
interface ButtonProps {
  variant?: 'Primary' | 'Secondary' | 'Danger';  // 来自 Figma
}
```

### 违规 2: 不遵循 React 标准
```typescript
// ❌ 错误：使用非标准命名
interface ButtonProps {
  onPress?: () => void;        // 应该用 onClick
  isDisabled?: boolean;        // 应该用 disabled
  customClass?: string;        // 应该用 className
}

// ✅ 正确：使用 React 标准命名
interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
```

### 违规 3: 缺少必要的 React 属性
```typescript
// ❌ 错误：只有 Figma 属性，缺少 React 属性
interface ButtonProps {
  label?: string;
  variant?: string;
  // 缺少 onClick、className 等
}

// ✅ 正确：Figma 属性 + React 属性
interface ButtonProps {
  // Figma 属性
  label?: string;
  variant?: string;
  
  // React 属性
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
```

## 总结

**核心原则：**
1. **Figma 视觉设计** - 参考 Figma 的视觉属性和设计规范
2. **React 标准实现** - 遵循 React 最佳实践和标准约定
3. **内置交互行为** - 组件自动支持必要的交互（hover、focus、click 等）
4. **完整功能** - 提供完整的数据、事件、技术属性

遵循这些规则可以确保组件：

1. **视觉一致性** - 与 Figma 设计保持一致
2. **技术规范性** - 符合 React 和业界最佳实践
3. **交互完整性** - 自动支持所有必要的用户交互
4. **功能完整性** - 提供完整的 API 供开发者使用
5. **可维护性** - 清晰的结构和类型定义
6. **可复用性** - 灵活的属性设计和组合模式
7. **可测试性** - 测试友好的设计和属性
8. **可访问性** - 符合 WCAG 标准的实现
9. **高性能** - 优化的渲染和更新机制
10. **类型安全** - 完整的 TypeScript 支持

**组件开发流程：**
1. 从 Figma 获取视觉设计和属性
2. 保留 Figma 的视觉属性
3. 添加必要的 React 标准属性
4. 实现内置交互行为（hover、focus、click 等）
5. 遵循 React 最佳实践
6. 配置 Storybook 只展示视觉属性

**这些规则符合业界最佳实践，包括：**
- React 官方推荐
- Material UI (MUI) 设计模式
- Ant Design 设计模式
- 现代 React 开发标准（2024-2025）
