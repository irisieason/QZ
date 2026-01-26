---
inclusion: always
---

# Storybook Controls 展示规则

## 核心原则

**Storybook 是展示工具，只展示视觉属性。组件本身应该有完整的、合理的属性和内置交互行为。**

## 关键理解

### Storybook 的作用

Storybook **不是**用来定义组件应该有什么属性，而是：
- ✅ 展示组件的视觉效果
- ✅ 让设计师调整视觉属性
- ✅ 预览不同状态和变体

### 组件的完整性

组件本身应该是**完整的、功能齐全的**：
- ✅ 有完整的视觉属性（来自 Figma）
- ✅ 有内置交互行为（hover、focus、click 等）
- ✅ 有数据属性（value、defaultValue）
- ✅ 有事件回调（onChange、onClick）
- ✅ 有技术属性（className、style、aria-*）

**Storybook 只是选择性地展示其中的视觉属性。**

## 两个不同的关注点

### 1. 组件本身（完整的功能组件）

组件应该遵循 React 最佳实践，具有完整的功能：

✅ **必须有的属性：**
- **视觉属性**（`label`, `placeholderText`, `variant`, `size`）- 来自 Figma
- **状态属性**（`disabled`, `readOnly`, `selected`）- 来自 Figma
- **数据属性**（`value`, `defaultValue`）- 支持受控/非受控
- **事件处理器**（`onChange`, `onClick`, `onFocus` 等）- 通知外部
- **技术属性**（`className`, `style`, `id`, `aria-*`）- 技术集成

✅ **必须有的内置行为：**
- **交互效果**（hover、focus、active）- CSS 自动实现
- **键盘操作**（Enter、Escape、方向键）- 组件内部实现
- **状态管理**（focused、filled）- 组件内部管理
- **自动功能**（显示清除按钮、加载动画）- 组件内部逻辑

✅ **组件设计原则：**
- 支持受控和非受控模式
- 提供完整的事件回调
- 支持自定义样式和类名
- 符合可访问性标准
- 遵循 React 最佳实践
- 自动支持必要的交互行为

**示例：完整的组件属性定义**
```typescript
interface CategoryFilterProps {
  // 视觉属性
  placeholderText?: string;
  showplaceholder?: boolean;
  searchIcon?: boolean;
  
  // 状态属性
  disabled?: boolean;
  readOnly?: boolean;
  
  // 数据属性（开发者需要）
  value?: string;
  defaultValue?: string;
  clearable?: boolean;
  
  // 事件处理器（开发者需要）
  onChange?: (value: string, event: ChangeEvent) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  
  // 技术属性（开发者需要）
  className?: string;
  style?: CSSProperties;
  id?: string;
  'aria-label'?: string;
}
```

### 2. Storybook 展示（只展示视觉属性）

Storybook Controls 面板**只展示设计师需要的视觉属性**，其他属性虽然存在于组件中，但在 Storybook 中隐藏：

✅ **应该展示：**
- 视觉属性（文本、图标、颜色）
- 状态属性（禁用、只读、选中）
- Figma 设计属性

❌ **应该隐藏（但组件中必须有）：**
- 数据属性（`value`, `defaultValue`）
- 事件处理器（`onChange`, `onClick` 等）
- 技术属性（`className`, `style`, `id`, `aria-*`）
- 内部状态（`focused`, `filled` - 组件自动管理）

**示例：Storybook 配置**
```typescript
argTypes: {
  // ========== 可控制的属性（设计师需要的） ==========
  placeholderText: {
    control: 'text',
    description: '占位符文本',
  },
  showplaceholder: {
    control: 'boolean',
    description: '是否显示占位符',
  },
  searchIcon: {
    control: 'boolean',
    description: '是否显示搜索图标',
  },
  disabled: {
    control: 'boolean',
    description: '是否禁用',
  },
  readOnly: {
    control: 'boolean',
    description: '是否只读',
  },
  clearable: {
    control: 'boolean',
    description: '是否显示清除按钮',
  },
  
  // ========== 隐藏的属性（开发者需要但设计师不需要） ==========
  value: { table: { disable: true } },
  defaultValue: { table: { disable: true } },
  onChange: { table: { disable: true } },
  onSearch: { table: { disable: true } },
  onClear: { table: { disable: true } },
  onFocus: { table: { disable: true } },
  onBlur: { table: { disable: true } },
  onKeyDown: { table: { disable: true } },
  className: { table: { disable: true } },
  style: { table: { disable: true } },
  id: { table: { disable: true } },
  'aria-label': { table: { disable: true } },
  
  // ========== Slot 属性（显示在文档中，用于设计库绑定） ==========
  // 注意：Slot 属性不隐藏，但设置 control: false
  // 示例：
  // avatarSection: {
  //   control: false,
  //   description: '用户头像区域插槽（Slot）\n\n插入组件：AvatarButtonMenu\n用于设计库绑定',
  //   table: {
  //     category: 'Slots',
  //     type: { summary: 'React.ReactNode' },
  //   },
  // },
}
```

## 目标用户

### 组件使用者（开发者）
- 需要完整的 API（包括视觉、数据、事件、技术属性）
- 需要内置交互行为（hover、focus、click 等）
- 通过 TypeScript 类型定义和文档了解所有属性
- 在代码中使用组件时需要所有功能

### Storybook 用户（设计师）
- 只需要预览和调整组件外观
- 不需要了解 React、TypeScript、事件处理等技术细节
- 不需要了解组件的内置交互行为（这些是自动的）
- 通过 Controls 面板调整视觉属性

## Storybook 展示规则

### ✅ 应该展示的属性（可在 Controls 面板控制）

1. **视觉属性** - 控制组件外观
   - 文本内容（如 `label`, `placeholderText`）
   - 布尔开关（如 `showIcon`, `searchIcon`, `notification`）
   - 选择器（如 `variant`, `size`, `type`）

2. **状态属性** - 控制组件状态
   - `disabled` - 是否禁用
   - `readOnly` - 是否只读
   - `selected` - 是否选中
   - `expanded` - 是否展开

3. **Figma 设计属性** - 来自 Figma 的设计规范
   - 所有 Figma 定义的可视化属性
   - 用于在 Storybook 中重现 Figma 设计

### 📋 Slot 属性（显示在文档中，用于设计库绑定）

**特殊处理：Slot 属性**

Slot 属性是用于插入子组件的插槽，需要在 Storybook 文档中显示，但不提供 Controls 控制器：

✅ **应该显示在文档表格中：**
- 让设计师了解组件的插槽结构
- 方便后续与设计库（Figma Code Connect）绑定
- 标注清楚插入的组件类型

❌ **不应该在 Controls 面板中控制：**
- Slot 属性接收的是 React 组件，无法通过简单的控制器编辑
- 设置 `control: false` 禁用控制器

**Slot 属性配置示例：**
```typescript
argTypes: {
  // ========== Slot 属性（用于设计库绑定） ==========
  avatarSection: {
    control: false,  // 禁用控制器
    description: '用户头像区域插槽（Slot）\n\n插入组件：AvatarButtonMenu\n用于设计库绑定',
    table: {
      category: 'Slots',  // 分类为 Slots
      type: { summary: 'React.ReactNode' },
      defaultValue: { summary: '<AvatarButtonMenu />' },
    },
  },
  menuList: {
    control: false,
    description: '菜单项列表插槽（Slot）\n\n插入组件：MenuItem（多个）\n用于设计库绑定',
    table: {
      category: 'Slots',
      type: { summary: 'React.ReactNode' },
      defaultValue: { summary: '<MenuItem /> × N' },
    },
  },
}
```

**Slot 属性的特点：**
- ✅ 显示在文档表格中（`table` 配置）
- ✅ 有清晰的分类（`category: 'Slots'`）
- ✅ 说明插入的组件类型
- ✅ 标注"用于设计库绑定"
- ❌ 不提供 Controls 控制器（`control: false`）

### ❌ 应该隐藏的属性（不在 Controls 面板显示）

1. **数据属性** - 开发用的数据绑定
   - `value` - 受控组件的值
   - `defaultValue` - 非受控组件的默认值
   - `data` - 数据源

2. **事件处理器** - 开发用的交互逻辑
   - `onChange` - 值变化回调
   - `onClick` - 点击回调
   - `onFocus`, `onBlur` - 聚焦/失焦回调
   - `onSearch`, `onClear` - 自定义事件回调
   - 所有 `on*` 开头的属性

3. **技术属性** - 开发用的技术配置
   - `className` - CSS 类名
   - `style` - 内联样式
   - `id` - DOM ID
   - `ref` - React ref
   - `aria-*` - 可访问性属性
   - `data-*` - 数据属性

4. **内部状态** - 组件内部管理的状态
   - `focused` - 聚焦状态（应由组件内部管理）
   - `filled` - 填充状态（应由组件内部管理）
   - `hover` - 悬停状态（应由 CSS 管理）

## 完整工作流程

### 步骤 1：设计组件（开发者视角）

```typescript
// 1. 定义完整的组件属性（包括所有开发者需要的属性）
interface ComponentProps {
  // Figma 设计属性
  label?: string;
  variant?: 'primary' | 'secondary';
  
  // 状态属性
  disabled?: boolean;
  
  // 数据属性
  value?: string;
  defaultValue?: string;
  
  // 事件处理器
  onChange?: (value: string) => void;
  onClick?: () => void;
  
  // 技术属性
  className?: string;
  style?: CSSProperties;
}

// 2. 实现组件（使用所有属性）
export const Component = ({ 
  label, 
  variant, 
  disabled, 
  value, 
  onChange, 
  onClick,
  className,
  style 
}: ComponentProps) => {
  // 完整的组件实现
};
```

### 步骤 2：配置 Storybook（设计师视角）

```typescript
// 只展示设计师需要的属性
const meta = {
  argTypes: {
    // 可见的属性
    label: { control: 'text' },
    variant: { control: 'select', options: ['primary', 'secondary'] },
    disabled: { control: 'boolean' },
    
    // 隐藏的属性
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
};
```

## 检查清单

创建或更新组件时，确认：

### 组件本身
- [ ] 支持受控和非受控模式（如果是输入组件）
- [ ] 提供完整的事件回调（`onChange`, `onClick` 等）
- [ ] 支持自定义样式（`className`, `style`）
- [ ] 符合可访问性标准（`aria-*` 属性）
- [ ] 遵循 React 最佳实践

### Storybook 配置
- [ ] Controls 面板只显示视觉和状态属性
- [ ] 所有 `on*` 事件处理器都已隐藏
- [ ] `className`, `style`, `id` 等技术属性都已隐藏
- [ ] `value`, `defaultValue` 等数据属性都已隐藏
- [ ] `aria-*`, `data-*` 等可访问性属性都已隐藏
- [ ] 内部状态属性（如 `focused`, `filled`）都已隐藏
- [ ] Slot 属性显示在文档中但设置 `control: false`
- [ ] Slot 属性有清晰的分类（`category: 'Slots'`）
- [ ] Slot 属性标注了插入的组件类型
- [ ] 每个可见属性都有清晰的中文描述

## 如何告诉 AI

当你需要创建或更新组件时，只需说：

> **"创建组件"** 或 **"按照组件规则创建"**

AI 会自动：
1. **设计完整的组件** - 包含所有必要的属性（视觉、数据、事件、技术）
2. **实现内置交互行为** - 自动支持 hover、focus、click 等交互
3. **配置简洁的 Storybook** - 只展示视觉属性
4. **隐藏技术属性** - 所有开发相关的属性都不在 Controls 面板显示
5. **添加清晰描述** - 为每个可见属性添加中文说明

**不要说"按照 Storybook 规则创建组件"** - 因为 Storybook 只是展示工具，不是组件设计的依据。

## 参考组件

以下组件是标准示例：
- `src/components/Button/Button.stories.tsx`
- `src/components/MenuItem/MenuItem.stories.tsx`
- `src/components/Avatar/Avatar.stories.tsx`
- `src/components/CategoryFilter/CategoryFilter.stories.tsx`

这些组件：
- ✅ 组件本身有完整的 API（包括视觉、数据、事件、技术属性）
- ✅ 组件本身有内置交互行为（hover、focus、click 等）
- ✅ Storybook 只展示视觉属性
- ✅ Controls 面板简洁易用

## 总结

**核心理解：**

1. **组件 ≠ Storybook**
   - 组件是完整的功能单元（有完整属性 + 内置交互行为）
   - Storybook 是展示工具（只展示视觉属性）

2. **创建组件的正确流程：**
   - 第一步：设计完整的组件（所有属性 + 内置行为）
   - 第二步：配置 Storybook（只展示视觉属性）

3. **不要混淆：**
   - ❌ 错误：根据 Storybook 需要什么来设计组件
   - ✅ 正确：设计完整的组件，然后在 Storybook 中选择性展示

4. **Slot 属性的特殊处理：**
   - ✅ 显示在文档表格中（方便设计库绑定）
   - ❌ 不提供 Controls 控制器（`control: false`）
   - ✅ 清晰标注插入的组件类型

**记住：Storybook 是展示工具，不是组件设计的依据。**
