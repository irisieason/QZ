# IconButton 组件创建总结

## 概述

已成功创建 IconButton（图标按钮）组件，严格遵循 Figma 设计规范。

## 组件信息

- **组件名称**: IconButton
- **Figma Node ID**: 270:941
- **组件类型**: 可复用组件（Reusable Component）
- **设计来源**: Figma Design System

## 创建的文件

### 1. 核心组件文件

```
src/components/IconButton/
├── IconButton.tsx          # 组件实现
├── IconButton.css          # 组件样式
├── index.ts                # 导出文件
├── IconButton.stories.tsx  # Storybook 故事
├── IconButton.example.tsx  # 使用示例
├── IconButton.test.tsx     # 单元测试
└── README.md               # 组件文档
```

### 2. 更新的文件

- `src/components/index.ts` - 添加了 IconButton 导出

## Figma 属性映射

### 组件属性（严格遵循 Figma）

| Figma 属性 | TypeScript 类型 | 默认值 | 说明 |
|-----------|----------------|--------|------|
| Type | `IconButtonType` | `'Primary'` | 按钮类型/变体（9种） |
| State | `IconButtonState` | `'Default'` | 按钮状态（5种） |
| Oval | `boolean` | `false` | 是否为圆形 |
| Size | `IconButtonSize` | `'24'` | 按钮尺寸（3种） |
| Icon | `string` | `'about'` | 图标名称 |
| Focused | `boolean` | `false` | 聚焦状态 |

### 类型定义

#### IconButtonType（9种变体）

```typescript
type IconButtonType =
  | 'Primary'
  | 'Primary outline'
  | 'Primary ghost'
  | 'Secondary'
  | 'Secondary outline'
  | 'Secondary ghost'
  | 'Danger'
  | 'Danger outline'
  | 'Danger ghost';
```

#### IconButtonState（5种状态）

```typescript
type IconButtonState = 
  | 'Default' 
  | 'Hover' 
  | 'Active' 
  | 'Disabled' 
  | 'Loading';
```

#### IconButtonSize（3种尺寸）

```typescript
type IconButtonSize = '24' | '16' | '12';
```

**尺寸规范**:
- `24`: 32x32px 容器，24px 图标
- `16`: 24x24px 容器，16px 图标
- `12`: 16x16px 容器，12px 图标

## 组件变体总数

**总计**: 9 类型 × 5 状态 × 2 形状 × 3 尺寸 = **270 种可能的组合**

Figma 设计中包含了 240 个具体变体。

## 设计规范遵循

### ✅ 严格遵循的规则

1. **属性名称**: 完全按照 Figma 定义
   - ✅ `type` (不是 `variant`)
   - ✅ `oval` (不是 `shape` 或 `rounded`)
   - ✅ `size` 使用字符串 `'24'` (不是数字 `24`)

2. **属性值**: 完全按照 Figma 定义
   - ✅ `'Primary'` (首字母大写)
   - ✅ `'Primary outline'` (带空格)
   - ✅ `'Primary ghost'` (不是 `'primary-ghost'`)

3. **没有添加 Figma 中不存在的属性**
   - ❌ 没有 `iconPosition` 属性
   - ❌ 没有 `tooltip` 属性
   - ❌ 没有 `badge` 属性

4. **扩展属性明确分离**
   - React 特定属性（`onClick`, `className` 等）在单独的接口中定义
   - 在代码注释中明确标注哪些是 Figma 属性，哪些是扩展属性

## 样式实现

### CSS 类命名规范

```css
.icon-button                    /* 基础类 */
.icon-button--primary           /* 类型变体 */
.icon-button--primary-outline   /* 类型变体（带连字符） */
.icon-button--hover             /* 状态 */
.icon-button--oval              /* 形状 */
.icon-button--size-24           /* 尺寸 */
.icon-button--focused           /* 聚焦 */
```

### 设计 Tokens 使用

所有颜色使用 CSS 变量（来自 `tokens.css`）：

```css
--color-primary
--color-primary--hover
--color-primary--active
--color-primary--disabled
--color-alarm
--color-component-1
--color-ghost
--color-focus-bdr
```

## 功能特性

### 1. 状态管理

- **Default**: 默认状态
- **Hover**: 悬停效果（CSS `:hover`）
- **Active**: 激活状态（CSS `:active`）
- **Disabled**: 禁用状态（`disabled` 属性）
- **Loading**: 显示加载动画，禁用交互

### 2. 加载动画

根据尺寸自适应的 SVG 加载动画：
- 24px: 半径 9px，线宽 2px
- 16px: 半径 6px，线宽 1.5px
- 12px: 半径 4px，线宽 1px

### 3. 聚焦指示器

- 3px 外边距的聚焦边框
- 使用 `--color-focus-bdr` 颜色
- 通过 `focused` 属性控制显示

### 4. 可访问性

- 支持 `aria-label` 属性
- 自动生成默认 aria-label
- 禁用状态正确设置 `disabled` 属性
- 加载动画包含 "Loading" aria-label
- 支持键盘导航

## 使用示例

### 基础用法

```tsx
import { IconButton } from './components/IconButton';

// 基础按钮
<IconButton type="Primary" icon="about" />

// 圆形按钮
<IconButton type="Primary" oval icon="about" />

// 不同尺寸
<IconButton type="Primary" size="24" icon="about" />
<IconButton type="Primary" size="16" icon="about" />
<IconButton type="Primary" size="12" icon="about" />

// 不同状态
<IconButton type="Primary" state="Loading" icon="about" />
<IconButton type="Primary" state="Disabled" icon="about" />

// 事件处理
<IconButton 
  type="Primary" 
  icon="about" 
  onClick={() => console.log('Clicked!')}
  aria-label="关于按钮"
/>
```

## Storybook 故事

创建了 20+ 个故事，涵盖：

1. **基础故事**: Default, Primary, Secondary, Danger
2. **类型变体**: 所有 9 种类型
3. **尺寸变体**: 24, 16, 12
4. **形状变体**: 方形 vs 圆形
5. **状态变体**: Default, Hover, Active, Disabled, Loading
6. **组合展示**: AllTypes, AllSizes, AllStates, ShapeComparison

## 测试覆盖

### 测试类别

1. **Figma 属性测试**
   - type, state, oval, size, icon, focused

2. **扩展属性测试**
   - onClick, disabled, className, aria-label, buttonType

3. **状态行为测试**
   - Disabled 禁用交互
   - Loading 显示动画
   - disabled 覆盖 state

4. **CSS 类名测试**
   - 类型、状态、尺寸、形状、聚焦类名

5. **图标渲染测试**
   - 图标显示
   - 尺寸适配
   - Loading 状态替换

6. **可访问性测试**
   - role, aria-label

## 与 Button 组件的对比

| 特性 | IconButton | Button |
|------|-----------|--------|
| **内容** | 仅图标 | 文本 + 可选图标 |
| **尺寸** | 固定尺寸（24/16/12） | 自适应内容 |
| **形状** | 方形/圆形 | 矩形 |
| **Figma 属性** | type, state, oval, size, icon, focused | variant, state, label, showIcon, icon, focused |
| **用途** | 工具栏、快捷操作 | 表单提交、主要操作 |
| **变体数量** | 270 种组合 | 50 种组合 |

## 依赖项

- `react` >= 18.0.0
- `@irisieason/ix-icons` - 图标库
- `../../tokens/tokens.css` - 设计 tokens

## 下一步建议

### 1. 测试

```bash
# 运行单元测试
npm test

# 查看 Storybook
npm run storybook
```

### 2. 集成到项目

```tsx
import { IconButton } from './components/IconButton';

function Toolbar() {
  return (
    <div className="toolbar">
      <IconButton type="Primary" icon="menu" aria-label="菜单" />
      <IconButton type="Secondary" icon="search" aria-label="搜索" />
      <IconButton type="Danger" icon="delete" aria-label="删除" />
    </div>
  );
}
```

### 3. 可能的扩展

如果 Figma 设计更新，可能需要添加：

- 新的类型变体
- 新的尺寸选项
- 新的状态
- 徽章支持（如果 Figma 添加）
- 工具提示支持（如果 Figma 添加）

**注意**: 任何扩展都必须先在 Figma 中定义！

## 设计规范文档

详细文档请查看：
- [README.md](src/components/IconButton/README.md) - 完整使用文档
- [IconButton.example.tsx](src/components/IconButton/IconButton.example.tsx) - 代码示例
- [IconButton.stories.tsx](src/components/IconButton/IconButton.stories.tsx) - Storybook 故事

## 遵循的开发规则

✅ **严格遵循 Figma 组件开发规则**:

1. 属性必须与 Figma 完全一致
2. 不添加 Figma 中不存在的属性
3. 保持属性名称、类型、默认值与 Figma 一致
4. 扩展属性明确标注和分离
5. 使用设计 tokens 中的颜色变量
6. 遵循项目的命名规范和代码风格

## 总结

IconButton 组件已成功创建，完全符合以下标准：

✅ 严格遵循 Figma 设计规范  
✅ 支持所有 Figma 定义的属性和变体  
✅ 完整的 TypeScript 类型定义  
✅ 响应式的 CSS 样式实现  
✅ 完善的 Storybook 文档  
✅ 全面的单元测试覆盖  
✅ 详细的使用文档和示例  
✅ 良好的可访问性支持  

组件已准备好在项目中使用！
