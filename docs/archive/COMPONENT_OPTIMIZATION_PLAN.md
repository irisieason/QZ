# React 组件优化方案

## 优化目标

按照最合理的 React 组件结构优化现有组件库，提升代码质量、可维护性和性能。

## 当前状态分析

### ✅ 已做得很好的地方

1. **Figma 设计规范遵循**：严格区分 Figma 属性和扩展属性
2. **TypeScript 类型安全**：完整的类型定义和接口
3. **受控/非受控模式**：支持双模式的输入组件
4. **可访问性**：良好的 ARIA 属性支持
5. **forwardRef 使用**：可聚焦组件正确使用 forwardRef
6. **图标使用规范**：统一使用 ix-icons

### 🔧 需要优化的地方

## 1. 文件结构优化

### 当前结构
```
ComponentName/
├── ComponentName.tsx          # 组件实现 + 类型定义
├── ComponentName.css          # 样式
├── ComponentName.stories.tsx  # Storybook
├── ComponentName.test.tsx     # 测试
├── ComponentName.example.tsx  # 示例
├── README.md                  # 文档
└── index.ts                   # 导出
```

### 优化后结构
```
ComponentName/
├── ComponentName.tsx          # 组件实现（纯逻辑）
├── ComponentName.types.ts     # 类型定义（独立）
├── ComponentName.constants.ts # 常量定义（独立）
├── ComponentName.hooks.ts     # 自定义 Hooks（如果需要）
├── ComponentName.utils.ts     # 工具函数（如果需要）
├── ComponentName.css          # 样式
├── ComponentName.stories.tsx  # Storybook
├── ComponentName.test.tsx     # 测试
├── ComponentName.example.tsx  # 示例
├── README.md                  # 文档
└── index.ts                   # 导出
```

**优势**：
- 关注点分离更清晰
- 类型定义可以被其他组件复用
- 常量集中管理，便于维护
- 组件文件更简洁，专注于渲染逻辑

## 2. 类型定义优化

### 当前方式
```typescript
// 所有类型定义都在组件文件中
interface ButtonFigmaProps { ... }
interface ButtonExtendedProps { ... }
export interface ButtonProps extends ButtonFigmaProps, ButtonExtendedProps {}
```

### 优化方式
```typescript
// ComponentName.types.ts
export type ButtonVariant = 'Primary' | 'Secondary' | ...;
export type ButtonState = 'Default' | 'Hover' | ...;

export interface ButtonFigmaProps { ... }
export interface ButtonExtendedProps { ... }
export interface ButtonProps extends ButtonFigmaProps, ButtonExtendedProps {}

// ComponentName.tsx
import type { ButtonProps, ButtonVariant, ButtonState } from './Button.types';
```

**优势**：
- 类型定义独立，便于复用和维护
- 组件文件更简洁
- 类型可以被测试文件、Storybook 等复用

## 3. 常量提取优化

### 当前方式
```typescript
const classes = ['button'];
classes.push(`button--${variant.toLowerCase()}`);
```

### 优化方式
```typescript
// ComponentName.constants.ts
export const BUTTON_CLASS_PREFIX = 'button';
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  // ...
} as const;

// ComponentName.tsx
import { BUTTON_CLASS_PREFIX } from './Button.constants';
const classes = [BUTTON_CLASS_PREFIX];
```

**优势**：
- 避免魔法字符串
- 便于统一修改
- 提高代码可读性

## 4. 自定义 Hook 提取

### 当前方式
```typescript
// 每个组件都重复实现受控/非受控逻辑
const [internalValue, setInternalValue] = useState(defaultValue || '');
const isControlled = value !== undefined;
const inputValue = isControlled ? value : internalValue;
```

### 优化方式
```typescript
// hooks/useControlledState.ts
export function useControlledState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  
  const setValue = useCallback((newValue: T) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [isControlled, onChange]);
  
  return [value, setValue, isControlled] as const;
}

// ComponentName.tsx
const [inputValue, setInputValue] = useControlledState(value, defaultValue || '', onChange);
```

**优势**：
- 复用逻辑，减少重复代码
- 统一行为，减少 bug
- 便于测试和维护

## 5. 性能优化

### 5.1 使用 React.memo

```typescript
// 对于纯展示组件，使用 memo 避免不必要的重渲染
export const Button = React.memo<ButtonProps>(({ ... }) => {
  // ...
});
```

### 5.2 使用 useCallback

```typescript
// 当前：每次渲染都创建新函数
const handleClick = (event) => {
  onClick?.(event);
};

// 优化：使用 useCallback 缓存函数
const handleClick = useCallback((event: React.MouseEvent) => {
  onClick?.(event);
}, [onClick]);
```

### 5.3 使用 useMemo

```typescript
// 当前：每次渲染都计算类名
const classes = getButtonClasses();

// 优化：使用 useMemo 缓存计算结果
const classes = useMemo(() => 
  getButtonClasses(variant, state, focused, className),
  [variant, state, focused, className]
);
```

## 6. 事件处理优化

### 当前方式
```typescript
const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  const newValue = event.target.value;
  if (!isControlled) {
    setInternalValue(newValue);
  }
  onChange?.(newValue, event);
}, [isControlled, onChange]);
```

### 优化方式
```typescript
// 使用自定义 Hook 统一处理
const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  const newValue = event.target.value;
  setInputValue(newValue); // Hook 内部处理受控/非受控
  onChange?.(newValue, event);
}, [setInputValue, onChange]);
```

## 7. 测试优化

### 当前方式
```typescript
// 自定义 mockFn
const mockFn = () => {
  let calls: any[] = [];
  const fn = (...args: any[]) => {
    calls.push(args);
  };
  fn.mock = { calls, get callCount() { return calls.length; } };
  return fn;
};
```

### 优化方式
```typescript
// 使用 Vitest 的 vi.fn()
import { vi } from 'vitest';

const handleChange = vi.fn();
expect(handleChange).toHaveBeenCalledWith('test', expect.any(Object));
expect(handleChange).toHaveBeenCalledTimes(1);
```

## 8. CSS 类名生成优化

### 当前方式
```typescript
const getButtonClasses = () => {
  const classes = ['button'];
  const variantClass = variant.toLowerCase().replace(/\s+/g, '-');
  classes.push(`button--${variantClass}`);
  if (state !== 'Default') {
    classes.push(`button--${state.toLowerCase()}`);
  }
  return classes.join(' ');
};
```

### 优化方式
```typescript
// 使用 classnames 库或自定义工具函数
import { cn } from '@/utils/classnames';

const classes = cn(
  'button',
  `button--${normalizeVariant(variant)}`,
  state !== 'Default' && `button--${state.toLowerCase()}`,
  focused && 'button--focused',
  className
);
```

## 9. 组件组合优化

### 当前方式
```typescript
// CategoryFilter 直接使用 IconButton
<IconButton
  type="Primary ghost"
  size="16"
  icon="clear"
  onClick={handleClear}
/>
```

### 优化方式
```typescript
// 提取为子组件，提高复用性
const ClearButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    type="Primary ghost"
    size="16"
    icon="clear"
    onClick={onClick}
    aria-label="Clear input"
    className="category-filter__clear-button"
  />
);
```

## 10. 文档优化

### 当前方式
- README.md 包含基本使用说明
- JSDoc 注释较少

### 优化方式
```typescript
/**
 * CategoryFilter 组件 - 用于标签选择、多选过滤和分面搜索
 * 
 * @example
 * ```tsx
 * // 受控模式
 * <CategoryFilter
 *   value={searchValue}
 *   onChange={(value) => setSearchValue(value)}
 *   onSearch={handleSearch}
 * />
 * 
 * // 非受控模式
 * <CategoryFilter
 *   defaultValue="initial"
 *   onSearch={handleSearch}
 * />
 * ```
 * 
 * @see {@link CategoryFilterProps} 完整属性列表
 */
export const CategoryFilter = forwardRef<HTMLInputElement, CategoryFilterProps>(...);
```

## 优化优先级

### 高优先级（立即优化）
1. ✅ 测试文件：使用 `vi.fn()` 替代自定义 `mockFn`
2. ✅ 性能优化：添加 `useCallback` 和 `useMemo`
3. ✅ 类型提取：将类型定义提取到独立文件

### 中优先级（逐步优化）
4. 自定义 Hook：提取 `useControlledState`
5. 常量提取：提取 CSS 类名常量
6. 工具函数：提取类名生成工具

### 低优先级（可选优化）
7. React.memo：对纯展示组件使用 memo
8. 组件拆分：提取可复用的子组件
9. 文档完善：添加更详细的 JSDoc

## 优化示例

我将为以下组件创建优化版本：

1. **CategoryFilter** - 完整优化示例（包含所有优化点）
2. **Button** - 类型和常量提取示例
3. **IconButton** - 性能优化示例

## 通用工具

创建以下通用工具供所有组件使用：

1. `hooks/useControlledState.ts` - 受控/非受控状态管理
2. `utils/classnames.ts` - 类名生成工具
3. `utils/normalize.ts` - 字符串规范化工具
4. `types/common.ts` - 通用类型定义

## 预期收益

1. **代码质量**：更清晰的结构，更少的重复代码
2. **可维护性**：独立的类型和常量，便于修改
3. **性能**：减少不必要的重渲染和计算
4. **开发体验**：更好的类型提示和代码补全
5. **测试**：更容易编写和维护测试
6. **文档**：更完善的代码文档和使用示例

## 实施计划

1. **第一阶段**：创建通用工具和 Hooks
2. **第二阶段**：优化 CategoryFilter（作为示例）
3. **第三阶段**：逐步优化其他组件
4. **第四阶段**：更新文档和测试

---

**注意**：所有优化都必须保持与 Figma 设计规范的一致性，不改变组件的外部 API 和行为。
