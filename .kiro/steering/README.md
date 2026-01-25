---
inclusion: manual
---

# Kiro 开发规则文档

本目录包含所有 Kiro AI 在开发过程中需要遵循的规则和最佳实践。

## 📋 规则文档列表

### 核心规则（Always Included）

这些规则会自动应用到所有开发任务中：

#### 1. **figma-component-rules.md** - Figma 组件开发规则
- **用途：** 定义如何从 Figma 设计创建 React 组件
- **包含：**
  - Figma 视觉属性的使用规范
  - 内置交互行为的实现标准
  - React 最佳实践
  - 完整的组件属性设计模式
- **何时使用：** 创建或更新任何组件时

#### 2. **storybook-controls-rules.md** - Storybook 展示规则
- **用途：** 定义 Storybook 中应该展示哪些属性
- **包含：**
  - 视觉属性展示规则
  - 技术属性隐藏规则
  - argTypes 配置标准
- **何时使用：** 配置组件的 Storybook stories 时

#### 3. **icon-usage-rules.md** - 图标使用规则
- **用途：** 规范图标的使用方式
- **包含：**
  - 必须使用 `@irisieason/ix-icons` 包
  - 图标注册和使用方法
  - Storybook 中的图标选择器配置
- **何时使用：** 组件中需要使用图标时

### 参考文档（Manual Inclusion）

这些文档提供额外的指导和说明，可以手动引用：

#### 4. **component-design-principles.md** - 组件设计原则快速参考
- **用途：** 快速理解组件设计的核心概念
- **包含：**
  - 可视化的组件结构图
  - 实际代码示例
  - 常见误区对比
  - 检查清单
- **何时使用：** 需要快速查阅组件设计原则时

#### 5. **best-practices-validation.md** - 最佳实践验证报告
- **用途：** 验证我们的规则符合业界标准
- **包含：**
  - 与 Material UI、Ant Design 的对比
  - React 官方推荐的验证
  - 业界标准的引用
- **何时使用：** 需要确认规则的正确性时

## 🎯 如何使用这些规则

### 对于 AI 开发助手

当用户说以下指令时，自动应用相应规则：

- **"创建组件"** → 应用 `figma-component-rules.md` + `icon-usage-rules.md`
- **"配置 Storybook"** → 应用 `storybook-controls-rules.md`
- **"添加图标"** → 应用 `icon-usage-rules.md`

### 对于开发者

1. **创建新组件时：**
   - 阅读 `figma-component-rules.md` 了解完整规范
   - 参考 `component-design-principles.md` 快速查阅
   - 遵循 `icon-usage-rules.md` 使用图标

2. **配置 Storybook 时：**
   - 遵循 `storybook-controls-rules.md`
   - 只展示视觉属性，隐藏技术属性

3. **验证规则正确性时：**
   - 查阅 `best-practices-validation.md`
   - 对比业界标准

## 📁 文档结构

```
.kiro/steering/
├── README.md                           # 本文件
├── figma-component-rules.md           # Figma 组件开发规则（核心）
├── storybook-controls-rules.md        # Storybook 展示规则（核心）
├── icon-usage-rules.md                # 图标使用规则（核心）
├── component-design-principles.md     # 组件设计原则（参考）
└── best-practices-validation.md       # 最佳实践验证（参考）
```

## 🔄 规则更新

当需要更新规则时：

1. 修改相应的规则文档
2. 更新本 README 的说明
3. 确保所有规则之间保持一致性

## ✅ 规则验证

所有规则都已经过验证，符合：
- ✅ React 官方推荐
- ✅ Material UI (MUI) 设计模式
- ✅ Ant Design 设计模式
- ✅ 2024-2025 年最新 React 开发标准

详见 `best-practices-validation.md`。

## 💡 快速参考

### 组件属性结构

```typescript
interface ComponentProps {
  // 1. 视觉属性（来自 Figma，Storybook 展示）
  label?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  
  // 2. 数据属性（React 标准，Storybook 隐藏）
  value?: string;
  defaultValue?: string;
  
  // 3. 事件属性（React 标准，Storybook 隐藏）
  onChange?: (value: string) => void;
  onClick?: () => void;
  
  // 4. 技术属性（React 标准，Storybook 隐藏）
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
}
```

### Storybook 配置

```typescript
export default {
  argTypes: {
    // 展示视觉属性
    label: { control: 'text' },
    variant: { control: 'select' },
    disabled: { control: 'boolean' },
    
    // 隐藏其他属性
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};
```

### 图标使用

```typescript
// 1. 注册图标
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';
addIcons(allIcons);

// 2. 使用图标
<ix-icon name="home" size="24" />

// 3. 组件属性
interface ComponentProps {
  icon?: string;  // 图标名称
}
```

## 📞 需要帮助？

如果对规则有疑问：
1. 先查阅 `component-design-principles.md` 快速参考
2. 查看 `best-practices-validation.md` 了解规则依据
3. 参考现有组件的实现（如 Button、CategoryFilter）
