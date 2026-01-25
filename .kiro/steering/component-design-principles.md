# 组件设计原则 - 快速参考

## 核心理解

### 组件 vs Storybook

```
┌─────────────────────────────────────────────────────────────┐
│                      完整的组件                              │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ 视觉属性      │  │ 数据属性      │  │ 事件回调      │      │
│  │ label        │  │ value        │  │ onChange     │      │
│  │ variant      │  │ defaultValue │  │ onClick      │      │
│  │ disabled     │  │              │  │ onFocus      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────┐  ┌──────────────────────────────────┐    │
│  │ 技术属性      │  │ 内置交互行为（自动支持）          │    │
│  │ className    │  │ • hover 效果（CSS）              │    │
│  │ style        │  │ • focus 效果（CSS）              │    │
│  │ aria-*       │  │ • 键盘操作（组件内部）            │    │
│  └──────────────┘  │ • 状态管理（组件内部）            │    │
│                    └──────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Storybook 只展示
                              ▼
                    ┌──────────────┐
                    │ 视觉属性      │
                    │ label        │
                    │ variant      │
                    │ disabled     │
                    └──────────────┘
```

## 三个层次

### 1. 视觉属性（Figma + Storybook 展示）

**来源：** Figma 设计
**展示：** ✅ 在 Storybook 中展示
**作用：** 控制组件的外观

```typescript
interface ComponentVisualProps {
  label?: string;           // 显示的文字
  variant?: 'primary' | 'secondary';  // 样式变体
  disabled?: boolean;       // 是否禁用
  showIcon?: boolean;       // 是否显示图标
}
```

### 2. 内置交互行为（组件自动支持）

**来源：** 组件类型决定
**展示：** ❌ 不需要属性，自动支持
**作用：** 提供基础交互能力

```typescript
// 不需要属性，组件自动支持：
// - hover 效果（CSS :hover）
// - focus 效果（CSS :focus）
// - active 效果（CSS :active）
// - 键盘操作（组件内部实现）
// - 状态管理（组件内部实现）
```

### 3. 扩展属性（React 开发需要）

**来源：** React 最佳实践
**展示：** ❌ 在 Storybook 中隐藏
**作用：** 支持数据绑定、事件处理、技术集成

```typescript
interface ComponentExtendedProps {
  // 数据属性
  value?: string;
  defaultValue?: string;
  
  // 事件回调
  onChange?: (value: string) => void;
  onClick?: () => void;
  
  // 技术属性
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
}
```

## 实际例子

### 搜索输入组件

```typescript
// ========== 完整的组件定义 ==========
interface SearchInputProps {
  // 1. 视觉属性（Storybook 展示 ✅）
  placeholderText?: string;
  searchIcon?: boolean;
  disabled?: boolean;
  
  // 2. 内置行为（自动支持，不需要属性）
  // - hover: 鼠标悬停时边框变色
  // - focus: 点击时显示聚焦轮廓
  // - 输入: 可以直接打字
  // - 清除: 有内容时自动显示清除按钮
  
  // 3. 扩展属性（Storybook 隐藏 ❌）
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
}

// ========== 组件实现 ==========
const SearchInput = ({
  placeholderText,
  searchIcon,
  disabled,
  value,
  onChange,
  className
}: SearchInputProps) => {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // 内置行为：自动管理聚焦状态
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  // 内置行为：自动显示清除按钮
  const showClear = internalValue.length > 0;
  
  return (
    <div className={`search ${isFocused ? 'focused' : ''} ${className}`}>
      {searchIcon && <ix-icon name="search" />}
      <input
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholderText}
        disabled={disabled}
      />
      {showClear && (
        <button onClick={() => setInternalValue('')}>
          <ix-icon name="close" />
        </button>
      )}
    </div>
  );
};

// ========== Storybook 配置 ==========
export default {
  argTypes: {
    // 只展示视觉属性
    placeholderText: { control: 'text' },
    searchIcon: { control: 'boolean' },
    disabled: { control: 'boolean' },
    
    // 隐藏其他属性
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onSearch: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};
```

### 按钮组件

```typescript
// ========== 完整的组件定义 ==========
interface ButtonProps {
  // 1. 视觉属性（Storybook 展示 ✅）
  label?: string;
  variant?: 'Primary' | 'Secondary' | 'Danger';
  showIcon?: boolean;
  icon?: string;
  
  // 2. 内置行为（自动支持，不需要属性）
  // - hover: 鼠标悬停时背景色变化
  // - active: 鼠标按下时视觉反馈
  // - focus: 键盘聚焦时显示轮廓
  // - click: 可以点击
  
  // 3. 扩展属性（Storybook 隐藏 ❌）
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
}
```

## 常见误区

### ❌ 错误理解

```typescript
// 错误 1: 把内置行为当作属性
interface ButtonProps {
  hoverable?: boolean;    // ❌ hover 是自动的
  focusable?: boolean;    // ❌ focus 是自动的
  clickable?: boolean;    // ❌ click 是自动的
}

// 错误 2: 根据 Storybook 设计组件
// "Storybook 只需要展示 label，所以组件只有 label 属性"
interface ButtonProps {
  label?: string;         // ❌ 组件功能不完整
}

// 错误 3: 在 Storybook 中展示所有属性
argTypes: {
  label: { control: 'text' },
  onClick: { control: 'function' },  // ❌ 不应该展示
  className: { control: 'text' },    // ❌ 不应该展示
}
```

### ✅ 正确理解

```typescript
// 正确 1: 内置行为不需要属性
const Button = ({ label, onClick }) => {
  // hover、focus、click 都是自动支持的
  return <button onClick={onClick}>{label}</button>;
};

// 正确 2: 组件有完整的功能
interface ButtonProps {
  // 视觉属性
  label?: string;
  variant?: string;
  
  // 扩展属性（虽然 Storybook 不展示，但组件必须有）
  onClick?: () => void;
  className?: string;
}

// 正确 3: Storybook 只展示视觉属性
argTypes: {
  label: { control: 'text' },
  variant: { control: 'select' },
  
  // 隐藏其他属性
  onClick: { table: { disable: true } },
  className: { table: { disable: true } },
}
```

## 检查清单

创建组件时，确认：

### 组件本身
- [ ] 有完整的视觉属性（来自 Figma）
- [ ] 有内置交互行为（hover、focus、click 等）
- [ ] 有数据属性（value、defaultValue）
- [ ] 有事件回调（onChange、onClick）
- [ ] 有技术属性（className、style、aria-*）
- [ ] 支持受控/非受控模式（如果是输入组件）

### Storybook 配置
- [ ] 只展示视觉属性
- [ ] 隐藏所有数据属性
- [ ] 隐藏所有事件回调
- [ ] 隐藏所有技术属性
- [ ] 每个可见属性有中文描述

## 如何告诉 AI

只需说：

> **"创建组件"** 或 **"按照组件规则创建"**

AI 会自动：
1. 设计完整的组件（所有属性 + 内置行为）
2. 配置简洁的 Storybook（只展示视觉属性）

## 总结

**记住三句话：**

1. **组件是完整的** - 有所有必要的属性和内置行为
2. **Storybook 是展示工具** - 只展示视觉属性
3. **不要混淆** - 不要根据 Storybook 需要什么来设计组件

**核心公式：**

```
完整的组件 = Figma 视觉属性 + 内置交互行为 + React 扩展属性

Storybook 展示 = Figma 视觉属性（仅此而已）
```
