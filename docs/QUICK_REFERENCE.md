# React 组件优化快速参考

## 🚀 快速开始

### 1. 使用通用 Hook

#### useControlledState - 受控/非受控状态管理

```tsx
import { useControlledState } from '@/hooks/useControlledState';

const MyComponent = ({ value, defaultValue, onChange }) => {
  const [inputValue, setInputValue] = useControlledState(
    value,
    defaultValue || '',
    onChange
  );
  
  // 使用 setInputValue 更新值（自动处理受控/非受控）
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
};
```

#### useControlledBoolean - 布尔值状态管理

```tsx
import { useControlledBoolean } from '@/hooks/useControlledState';

const MyComponent = ({ expanded, onExpandedChange }) => {
  const [isExpanded, toggleExpanded] = useControlledBoolean(
    expanded,
    true,
    onExpandedChange
  );
  
  // 切换状态
  <button onClick={toggleExpanded}>Toggle</button>
};
```

### 2. 使用类名工具

#### cn - 条件性组合类名

```tsx
import { cn } from '@/utils/classnames';

const classes = cn(
  'button',                          // 基础类名
  'button--primary',                 // 固定类名
  isActive && 'button--active',      // 条件类名
  { 'button--disabled': disabled },  // 对象形式
  className                          // 外部类名
);
```

#### normalizeVariant - 规范化变体名称

```tsx
import { normalizeVariant } from '@/utils/classnames';

normalizeVariant('Primary')           // 'primary'
normalizeVariant('Primary outline')   // 'primary-outline'
normalizeVariant('🔶 Content action') // 'content-action'
```

#### createBEM - BEM 类名生成器

```tsx
import { createBEM } from '@/utils/classnames';

const bem = createBEM('button');
bem.block()                    // 'button'
bem.element('icon')            // 'button__icon'
bem.modifier('primary')        // 'button--primary'
bem.elementModifier('icon', 'large') // 'button__icon--large'
```

## 📁 组件文件结构

```
ComponentName/
├── ComponentName.tsx          # 组件实现（渲染逻辑）
├── ComponentName.types.ts     # 类型定义
├── ComponentName.constants.ts # 常量定义
├── ComponentName.hooks.ts     # 业务逻辑 Hook
├── ComponentName.css          # 样式
├── ComponentName.stories.tsx  # Storybook
├── ComponentName.test.tsx     # 测试
├── ComponentName.example.tsx  # 示例
├── README.md                  # 文档
└── index.ts                   # 导出
```

## 📝 组件模板

### ComponentName.types.ts

```typescript
import type { CSSProperties, MouseEvent } from 'react';

// Figma 定义的类型
export type ComponentVariant = 'Primary' | 'Secondary';
export type ComponentState = 'Default' | 'Hover' | 'Active';

// Figma 定义的属性
export interface ComponentFigmaProps {
  /** 组件变体 */
  variant?: ComponentVariant;
  
  /** 组件状态 */
  state?: ComponentState;
}

// 扩展属性（React 特定）
export interface ComponentExtendedProps {
  /** 点击事件 */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  
  /** 自定义类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: CSSProperties;
}

// 最终组件属性
export interface ComponentProps 
  extends ComponentFigmaProps, 
          ComponentExtendedProps {}
```

### ComponentName.constants.ts

```typescript
/** 组件类名前缀 */
export const CLASS_PREFIX = 'component-name';

/** CSS 类名 */
export const CLASSES = {
  ROOT: CLASS_PREFIX,
  ELEMENT: `${CLASS_PREFIX}__element`,
  ICON: `${CLASS_PREFIX}__icon`,
} as const;

/** 状态类名修饰符 */
export const STATE_MODIFIERS = {
  ACTIVE: 'active',
  DISABLED: 'disabled',
} as const;

/** 默认属性值 */
export const DEFAULTS = {
  VARIANT: 'Primary' as const,
  STATE: 'Default' as const,
} as const;
```

### ComponentName.hooks.ts

```typescript
import { useState, useCallback, useRef, useEffect } from 'react';
import type { ComponentProps } from './ComponentName.types';

export function useComponentName(props: ComponentProps) {
  const { onClick } = props;
  
  // 状态管理
  const [internalState, setInternalState] = useState('Default');
  
  // 使用 ref 存储回调
  const onClickRef = useRef(onClick);
  useEffect(() => {
    onClickRef.current = onClick;
  }, [onClick]);
  
  // 事件处理
  const handleClick = useCallback((event) => {
    onClickRef.current?.(event);
  }, []);
  
  return {
    internalState,
    handleClick,
  };
}
```

### ComponentName.tsx

```typescript
import React, { useMemo } from 'react';
import { cn, normalizeVariant, normalizeState } from '@/utils/classnames';
import { useComponentName } from './ComponentName.hooks';
import type { ComponentProps } from './ComponentName.types';
import { CLASSES, DEFAULTS } from './ComponentName.constants';
import './ComponentName.css';

export type { ComponentProps } from './ComponentName.types';

/**
 * ComponentName 组件
 * 
 * @example
 * ```tsx
 * <ComponentName variant="Primary" onClick={handleClick} />
 * ```
 */
export const ComponentName: React.FC<ComponentProps> = (props) => {
  const {
    variant = DEFAULTS.VARIANT,
    state = DEFAULTS.STATE,
    className,
    style,
  } = props;
  
  const { handleClick } = useComponentName(props);
  
  const classes = useMemo(() => cn(
    CLASSES.ROOT,
    `${CLASSES.ROOT}--${normalizeVariant(variant)}`,
    `${CLASSES.ROOT}--${normalizeState(state)}`,
    className
  ), [variant, state, className]);
  
  return (
    <div className={classes} style={style} onClick={handleClick}>
      {/* 组件内容 */}
    </div>
  );
};

ComponentName.displayName = 'ComponentName';
```

### ComponentName.test.tsx

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('...')).toBeInTheDocument();
  });
  
  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<ComponentName onClick={handleClick} />);
    await user.click(screen.getByRole('...'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### index.ts

```typescript
export { ComponentName } from './ComponentName';
export type { 
  ComponentProps,
  ComponentVariant,
  ComponentState,
  ComponentFigmaProps,
  ComponentExtendedProps,
} from './ComponentName.types';
```

## ⚡ 性能优化清单

### useMemo 使用场景

```tsx
// ✅ 类名计算
const classes = useMemo(() => cn(...), [dependencies]);

// ✅ 复杂对象
const inputProps = useMemo(() => ({ ... }), [dependencies]);

// ✅ 数组过滤/映射
const filteredItems = useMemo(() => 
  items.filter(item => item.active),
  [items]
);

// ❌ 简单值（不需要）
const isActive = useMemo(() => state === 'Active', [state]); // 过度优化
```

### useCallback 使用场景

```tsx
// ✅ 事件处理器
const handleClick = useCallback((event) => {
  onClick?.(event);
}, [onClick]);

// ✅ 传递给子组件的函数
const handleChange = useCallback((value) => {
  setValue(value);
}, [setValue]);

// ❌ 不传递给子组件的简单函数（不需要）
const getValue = useCallback(() => value, [value]); // 过度优化
```

### useRef 使用场景

```tsx
// ✅ 存储回调，避免依赖变化
const onChangeRef = useRef(onChange);
useEffect(() => {
  onChangeRef.current = onChange;
}, [onChange]);

// ✅ DOM 引用
const inputRef = useRef<HTMLInputElement>(null);

// ✅ 存储可变值（不触发重渲染）
const timerRef = useRef<number>();
```

## 🧪 测试最佳实践

### 使用 Vitest

```tsx
import { vi } from 'vitest';

// ✅ 创建 mock 函数
const handleClick = vi.fn();

// ✅ 断言调用
expect(handleClick).toHaveBeenCalled();
expect(handleClick).toHaveBeenCalledTimes(1);
expect(handleClick).toHaveBeenCalledWith('arg1', 'arg2');

// ✅ 清除 mock
handleClick.mockClear();
```

### 用户交互测试

```tsx
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

// ✅ 点击
await user.click(element);

// ✅ 输入
await user.type(input, 'text');

// ✅ 键盘
await user.keyboard('{Enter}');
await user.keyboard('{Escape}');

// ✅ Tab 导航
await user.tab();
```

## 📚 文档规范

### JSDoc 注释

```typescript
/**
 * 组件简短描述
 * 
 * 详细说明组件的功能和用途
 * 
 * @example
 * ```tsx
 * <Component
 *   prop1="value1"
 *   prop2="value2"
 * />
 * ```
 * 
 * @see {@link ComponentProps} 完整属性列表
 */
export const Component: React.FC<ComponentProps> = (props) => {
  // ...
};
```

### 属性注释

```typescript
interface ComponentProps {
  /** 
   * 属性简短描述
   * 
   * @default 'default value'
   */
  prop1?: string;
  
  /**
   * 回调函数描述
   * 
   * @param value - 参数描述
   * @returns 返回值描述
   */
  onChange?: (value: string) => void;
}
```

## 🎯 常见模式

### 受控/非受控组件

```tsx
const [value, setValue] = useControlledState(
  props.value,
  props.defaultValue || '',
  props.onChange
);
```

### 条件渲染

```tsx
{showIcon && <Icon />}
{items.length > 0 ? <List /> : <EmptyState />}
```

### 事件处理

```tsx
const handleClick = useCallback((event: MouseEvent) => {
  if (disabled) return;
  onClick?.(event);
}, [disabled, onClick]);
```

### 类名生成

```tsx
const classes = useMemo(() => cn(
  'component',
  `component--${variant}`,
  isActive && 'component--active',
  className
), [variant, isActive, className]);
```

## ✅ 优化检查清单

- [ ] 类型定义独立到 `.types.ts`
- [ ] 常量定义独立到 `.constants.ts`
- [ ] 业务逻辑提取到 `.hooks.ts`
- [ ] 使用 `useControlledState` 处理受控/非受控
- [ ] 使用 `useMemo` 优化类名和对象
- [ ] 使用 `useCallback` 优化事件处理
- [ ] 使用 `useRef` 存储回调
- [ ] 测试使用 `vi.fn()`
- [ ] 添加完整的 JSDoc 注释
- [ ] 导出所有相关类型
- [ ] 所有测试通过
- [ ] 无 TypeScript 错误
- [ ] 遵循 Figma 规范

## 🔗 相关文档

- [完整优化方案](./COMPONENT_OPTIMIZATION_PLAN.md)
- [优化总结](./OPTIMIZATION_SUMMARY.md)
- [CategoryFilter 优化示例](./src/components/CategoryFilter/)
