# Storybook 最佳实践指南

## 核心原则

**Storybook 是用来展示组件视觉效果和交互行为的，不是用来测试所有技术属性的。**

## 属性展示规则

### ✅ 应该在 Controls 面板展示的属性

#### 1. 视觉属性
用户能直接看到变化的属性：
- `variant` - 组件变体（Primary、Secondary 等）
- `state` - 组件状态（Default、Hover、Active 等）
- `size` - 组件尺寸（Small、Medium、Large 等）
- `color` - 颜色相关属性

**示例**：
```typescript
variant: {
  control: 'select',
  options: ['Primary', 'Secondary', 'Danger'],
  description: '按钮变体',
  table: {
    category: '外观',
    type: { summary: '"Primary" | "Secondary" | "Danger"' },
    defaultValue: { summary: 'Primary' },
  },
},
```

#### 2. 内容属性
影响显示内容的属性：
- `label` - 文本标签
- `placeholderText` - 占位符文本
- `title` - 标题
- `description` - 描述

**示例**：
```typescript
label: {
  control: 'text',
  description: '按钮文本',
  table: {
    category: '内容',
    type: { summary: 'string' },
    defaultValue: { summary: 'Button' },
  },
},
```

#### 3. 功能开关
控制功能显示的布尔值：
- `showIcon` - 是否显示图标
- `clearable` - 是否可清除
- `disabled` - 是否禁用（如果是便捷属性）
- `loading` - 是否加载中（如果是便捷属性）

**示例**：
```typescript
showIcon: {
  control: 'boolean',
  description: '是否显示图标',
  table: {
    category: '功能',
    type: { summary: 'boolean' },
    defaultValue: { summary: 'false' },
  },
},
```

#### 4. 图标选择
如果组件支持图标：
- `icon` - 图标名称（使用 select 控件）

**示例**：
```typescript
import { availableIcons } from './icon-list';

icon: {
  control: 'select',
  options: availableIcons,
  description: '图标名称（来自 ix-icons）',
  table: {
    category: '内容',
    type: { summary: 'string' },
  },
},
```

### ❌ 不应该在 Controls 面板展示的属性

#### 1. 受控属性
会与 Storybook 交互冲突的属性：
- `value` - 输入值（受控模式）
- `checked` - 选中状态（受控模式）
- `selected` - 选中项（受控模式）
- `expanded` - 展开状态（受控模式）

**原因**：用户可以直接在组件上交互（输入、点击等），不需要通过 Controls 控制。

**配置**：
```typescript
value: {
  control: false,  // 禁用控件
  description: '输入值（受控模式）- 在 Storybook 中不可用，请直接在输入框中输入',
  table: {
    category: '技术属性（不可控制）',
    type: { summary: 'string' },
  },
},
```

#### 2. 默认值属性
非受控模式的默认值：
- `defaultValue` - 默认输入值
- `defaultChecked` - 默认选中状态
- `defaultSelected` - 默认选中项

**原因**：在 Storybook 中不直观，应该在 Story 代码中设置。

**配置**：
```typescript
defaultValue: {
  control: false,
  description: '默认值（非受控模式）- 在 Storybook 中不可用，请使用 Story 代码设置',
  table: {
    category: '技术属性（不可控制）',
    type: { summary: 'string' },
  },
},
```

#### 3. 事件回调
所有事件处理函数：
- `onClick` - 点击事件
- `onChange` - 变化事件
- `onFocus` - 聚焦事件
- `onBlur` - 失焦事件
- 等等...

**原因**：应该使用 Actions 面板查看事件触发。

**配置**：
```typescript
onClick: {
  action: 'clicked',  // 在 Actions 面板显示
  control: false,     // 不在 Controls 显示
  description: '点击事件 - 查看 Actions 面板',
  table: {
    category: '事件（查看 Actions 面板）',
    type: { summary: '(event: MouseEvent) => void' },
  },
},
```

#### 4. 技术属性
用于样式扩展和技术实现的属性：
- `className` - 自定义类名
- `style` - 自定义样式
- `id` - 元素 ID
- `aria-label` - 可访问性标签
- `data-testid` - 测试 ID

**原因**：这些属性是给开发者用的，不是给设计师或产品经理看的。

**配置**：
```typescript
className: {
  control: false,
  description: '自定义类名 - 用于样式扩展',
  table: {
    category: '技术属性（不可控制）',
    type: { summary: 'string' },
  },
},
```

#### 5. Figma 内部属性
Figma 设计工具的内部属性：
- `placeholder` - 是否显示占位符（通常总是 true）
- `filled` - 填充状态（通常由组件内部管理）
- `placeholder1` - 占位符状态（Figma 内部属性）

**原因**：这些属性是 Figma 设计工具的实现细节，用户不需要关心。

**配置**：
```typescript
placeholder: {
  control: false,
  description: '是否显示占位符（Figma 内部属性）',
  table: {
    category: 'Figma 内部属性（不可控制）',
    type: { summary: 'boolean' },
    defaultValue: { summary: 'true' },
  },
},
```

## 属性分类建议

使用 `table.category` 对属性进行分类：

### 可控制的属性（显示在 Controls）
- **外观** - 视觉相关属性（variant、size、color）
- **内容** - 文本和内容属性（label、title、icon）
- **状态** - 状态相关属性（state、focused）
- **功能** - 功能开关（showIcon、clearable）

### 不可控制的属性（仅在文档中显示）
- **事件（查看 Actions 面板）** - 所有事件回调
- **技术属性（不可控制）** - className、style、id 等
- **Figma 内部属性（不可控制）** - Figma 设计工具的内部属性

## Story 编写规则

### 1. 基础展示 Story

展示组件的基本用法：

```typescript
export const Default: Story = {
  args: {
    label: 'Button',
    variant: 'Primary',
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: '默认按钮样式，最常用的配置。',
      },
    },
  },
};
```

### 2. 状态展示 Story

展示不同状态的样式：

```typescript
export const StateHover: Story = {
  args: {
    label: 'Button',
    variant: 'Primary',
    state: 'Hover',
  },
  parameters: {
    docs: {
      description: {
        story: '悬停状态。注意：在实际使用中，悬停状态会自动触发，这里仅用于展示样式。',
      },
    },
  },
};
```

### 3. 功能展示 Story

展示特定功能：

```typescript
export const WithIcon: Story = {
  args: {
    label: 'Button',
    variant: 'Primary',
    showIcon: true,
    icon: 'home',
  },
  parameters: {
    docs: {
      description: {
        story: '带图标的按钮。图标显示在文本左侧。',
      },
    },
  },
};
```

### 4. 交互演示 Story

展示组件的交互行为：

```typescript
export const InteractiveDemo: Story = {
  args: {
    label: 'Click me',
    variant: 'Primary',
  },
  parameters: {
    docs: {
      description: {
        story: `
**交互演示**：
- 点击按钮查看 Actions 面板中的事件
- 鼠标悬停查看悬停效果
- 使用 Tab 键导航查看聚焦效果

**提示**：所有事件回调可以在 Actions 面板中查看。
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
};
```

### 5. 避免的 Story 类型

❌ **不要创建受控/非受控 Story**：
```typescript
// ❌ 错误：在 Storybook 中展示受控模式没有意义
export const Controlled: Story = {
  args: {
    value: 'React',  // 用户无法修改
    onChange: () => {},
  },
};

// ❌ 错误：defaultValue 在 Storybook 中不直观
export const Uncontrolled: Story = {
  args: {
    defaultValue: 'TypeScript',
  },
};
```

✅ **正确做法**：
- 让用户直接在组件上交互
- 在文档中说明受控/非受控的用法
- 在 example 文件中提供代码示例

## 完整示例

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';
import { availableIcons } from './icon-list';

addIcons(allIcons);

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button component with multiple variants and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // ========== 可控制的属性 ==========
    
    // 外观
    variant: {
      control: 'select',
      options: ['Primary', 'Secondary', 'Danger'],
      description: '按钮变体',
      table: {
        category: '外观',
        type: { summary: '"Primary" | "Secondary" | "Danger"' },
        defaultValue: { summary: 'Primary' },
      },
    },
    state: {
      control: 'select',
      options: ['Default', 'Hover', 'Active', 'Disabled', 'Loading'],
      description: '按钮状态',
      table: {
        category: '状态',
        type: { summary: '"Default" | "Hover" | "Active" | "Disabled" | "Loading"' },
        defaultValue: { summary: 'Default' },
      },
    },
    
    // 内容
    label: {
      control: 'text',
      description: '按钮文本',
      table: {
        category: '内容',
        type: { summary: 'string' },
        defaultValue: { summary: 'Button' },
      },
    },
    icon: {
      control: 'select',
      options: availableIcons,
      description: '图标名称（来自 ix-icons）',
      table: {
        category: '内容',
        type: { summary: 'string' },
      },
    },
    
    // 功能
    showIcon: {
      control: 'boolean',
      description: '是否显示图标',
      table: {
        category: '功能',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    focused: {
      control: 'boolean',
      description: '是否显示聚焦状态（用于展示聚焦样式）',
      table: {
        category: '状态',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    
    // ========== 不可控制的属性 ==========
    
    // 事件
    onClick: {
      action: 'clicked',
      control: false,
      description: '点击事件 - 查看 Actions 面板',
      table: {
        category: '事件（查看 Actions 面板）',
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
    
    // 技术属性
    className: {
      control: false,
      description: '自定义类名 - 用于样式扩展',
      table: {
        category: '技术属性（不可控制）',
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: false,
      description: '是否禁用 - 请使用 state="Disabled"',
      table: {
        category: '技术属性（不可控制）',
        type: { summary: 'boolean' },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础展示
export const Default: Story = {
  args: {
    label: 'Button',
    variant: 'Primary',
  },
};

// 状态展示
export const StateHover: Story = {
  args: {
    label: 'Button',
    variant: 'Primary',
    state: 'Hover',
  },
};

// 功能展示
export const WithIcon: Story = {
  args: {
    label: 'Button',
    variant: 'Primary',
    showIcon: true,
    icon: 'home',
  },
};

// 交互演示
export const InteractiveDemo: Story = {
  args: {
    label: 'Click me',
    variant: 'Primary',
  },
  parameters: {
    docs: {
      description: {
        story: '点击按钮查看 Actions 面板中的事件。',
      },
    },
  },
};
```

## 检查清单

在创建 Storybook 配置时，确认：

- [ ] 只展示用户能直观看到效果的属性
- [ ] 受控属性（value、checked 等）设置为 `control: false`
- [ ] 事件回调使用 `action` 而不是 `control`
- [ ] 技术属性（className、style 等）设置为 `control: false`
- [ ] 使用 `table.category` 对属性进行分类
- [ ] Story 名称清晰描述展示内容
- [ ] Story 描述说明用途和注意事项
- [ ] 避免创建受控/非受控 Story
- [ ] 交互演示 Story 提示用户查看 Actions 面板

## 总结

**Storybook 的目的是让设计师、产品经理和开发者能够快速预览组件的视觉效果和交互行为。**

- ✅ 展示视觉属性、内容属性、功能开关
- ❌ 不展示受控属性、事件回调、技术属性
- 📝 使用 Actions 面板查看事件
- 💡 让用户直接在组件上交互，而不是通过 Controls 控制
