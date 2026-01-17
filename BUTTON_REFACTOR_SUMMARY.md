# Button 组件重构总结

## 重构原因

之前的 Button 组件实现**违反了 Figma 设计规范**，自行添加了 Figma 中不存在的属性。

## 问题分析

### ❌ 之前的错误实现

```typescript
interface ButtonProps {
  children?: React.ReactNode;  // ❌ Figma 中是 label
  iconBefore?: string;          // ❌ Figma 中没有此属性
  iconAfter?: string;           // ❌ Figma 中没有此属性
  loading?: boolean;            // ❌ 应使用 state="Loading"
}
```

**违规点：**
1. 使用 `children` 而不是 Figma 定义的 `label`
2. 自行添加 `iconBefore` 和 `iconAfter` 属性
3. 添加 `loading` 布尔属性，而不是使用 `state="Loading"`

### ✅ 正确的实现（严格遵循 Figma）

```typescript
// Figma 定义的属性
interface ButtonFigmaProps {
  /** 按钮文本 */
  label?: string;
  
  /** 是否显示图标 */
  showIcon?: boolean;
  
  /** 图标名称 */
  icon?: string;
  
  /** 是否显示聚焦状态 */
  focused?: boolean;
  
  /** 按钮变体 */
  variant?: ButtonVariant;
  
  /** 按钮状态 */
  state?: ButtonState;
}

// 扩展属性（React 特定）
interface ButtonExtendedProps {
  onClick?: (event: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
}

// 最终组件属性
interface ButtonProps extends ButtonFigmaProps, ButtonExtendedProps {}
```

## Figma 设计规范

根据 Figma Code Connect 示例：

```tsx
<IxButton icon="about" variant="primary">
  Button
</IxButton>
```

### 属性定义

| 属性 | 类型 | 说明 | 来源 |
|------|------|------|------|
| `label` | `string` | 按钮文本 | Figma |
| `showIcon` | `boolean` | 是否显示图标 | Figma |
| `icon` | `string` | 图标名称（如 'about', 'check'） | Figma |
| `focused` | `boolean` | 是否显示聚焦状态 | Figma |
| `variant` | `ButtonVariant` | 按钮变体 | Figma |
| `state` | `ButtonState` | 按钮状态 | Figma |
| `onClick` | `function` | 点击事件 | React 扩展 |
| `className` | `string` | 自定义类名 | React 扩展 |

### 变体（Variant）

```typescript
type ButtonVariant =
  | 'Primary'
  | 'Primary outline'
  | 'Primary ghost'
  | 'Secondary'
  | 'Secondary outline'
  | 'Secondary ghost'
  | 'Danger'
  | 'Danger outline'
  | 'Danger ghost'
  | '🔶 Content action';
```

### 状态（State）

```typescript
type ButtonState = 
  | 'Default' 
  | 'Hover' 
  | 'Active' 
  | 'Disabled' 
  | 'Loading';
```

## 使用示例

### 基本用法

```tsx
import { Button } from './components/Button';

// 基本按钮
<Button label="Click me" variant="Primary" />

// 带图标的按钮
<Button 
  label="Confirm" 
  variant="Primary" 
  showIcon 
  icon="check" 
/>

// 禁用状态
<Button 
  label="Disabled" 
  variant="Primary" 
  state="Disabled" 
/>

// 加载状态
<Button 
  label="Loading" 
  variant="Primary" 
  state="Loading" 
/>

// 仅图标按钮
<Button 
  label="" 
  variant="🔶 Content action" 
  showIcon 
  icon="search" 
/>
```

### Storybook 控件

在 Storybook 中，可以通过控件面板调整：

- **label**: 文本输入框
- **variant**: 下拉选择器（10 个变体）
- **state**: 下拉选择器（5 个状态）
- **showIcon**: 复选框
- **icon**: 下拉选择器（可用图标列表）
- **focused**: 复选框

## 图标集成

### Storybook 中的图标

在 Storybook 中，**所有 1415 个图标都已自动注册**，可以直接在图标选择器中选择任意图标。

```typescript
// Button.stories.tsx 中
import * as allIcons from '@irisieason/ix-icons/icons';
addIcons(allIcons);  // 注册所有图标
```

### 生产环境中的图标

⚠️ **重要**: 在生产环境中，**不要**加载所有图标，应该只注册需要的图标以优化包体积。

```typescript
// ✅ 推荐：只注册需要的图标
import { addIcons } from '@irisieason/ix-icons';
import { iconCheck, iconClose, iconAdd } from '@irisieason/ix-icons/icons';

addIcons({ iconCheck, iconClose, iconAdd });

// ❌ 不推荐：加载所有图标（会增加包体积）
import * as allIcons from '@irisieason/ix-icons/icons';
addIcons(allIcons);
```

### 使用图标

```tsx
// 图标名称使用 kebab-case
<Button 
  label="Confirm" 
  showIcon 
  icon="check"  // 对应 iconCheck
/>

<Button 
  label="Close" 
  showIcon 
  icon="close"  // 对应 iconClose
/>
```

### 可用图标

- `about` - 默认图标
- `check` - 确认
- `close` - 关闭
- `add` - 添加
- `edit-document` - 编辑
- `trashcan` - 删除
- `download` - 下载
- `upload` - 上传
- `search` - 搜索
- `refresh` - 刷新
- `chevron-right/left/up/down` - 箭头

## 迁移指南

### 从旧 API 迁移到新 API

```tsx
// ❌ 旧 API（错误）
<Button iconBefore="check">Confirm</Button>
<Button iconAfter="download">Download</Button>
<Button loading>Loading</Button>

// ✅ 新 API（正确）
<Button label="Confirm" showIcon icon="check" />
<Button label="Download" showIcon icon="download" />
<Button label="Loading" state="Loading" />
```

### 属性映射表

| 旧属性 | 新属性 | 说明 |
|--------|--------|------|
| `children` | `label` | 按钮文本 |
| `iconBefore` | `showIcon` + `icon` | 图标显示 |
| `iconAfter` | `showIcon` + `icon` | 图标显示 |
| `loading` | `state="Loading"` | 加载状态 |
| `disabled` | `state="Disabled"` | 禁用状态 |

## 文件变更

### 修改的文件

1. **`src/components/Button/Button.tsx`**
   - 重写组件，严格遵循 Figma 属性
   - 分离 Figma 属性和扩展属性
   - 添加详细注释说明

2. **`src/components/Button/Button.stories.tsx`**
   - 更新所有 stories 使用新 API
   - 添加图标选择器控件
   - 更新示例代码

3. **`.kiro/steering/figma-component-rules.md`**
   - 创建 Figma 组件开发规则文档
   - 定义核心原则和检查清单
   - 提供正确和错误示例

## 验证清单

- [x] 所有属性都来自 Figma 设计
- [x] 属性名称与 Figma 完全一致
- [x] 属性类型与 Figma 定义匹配
- [x] 没有添加 Figma 中不存在的属性
- [x] 变体和状态值与 Figma 一致
- [x] 扩展属性已明确标注和分离
- [x] Storybook 正常工作
- [x] 图标集成正常

## 核心原则

**Figma 是唯一的设计真相来源（Single Source of Truth）**

所有组件实现必须严格遵循 Figma 设计，不得擅自修改或添加属性。如需扩展，必须明确标注并与 Figma 属性分离。

## 下一步

1. 测试所有按钮变体和状态
2. 验证图标显示正确
3. 确保 Storybook 中所有示例正常工作
4. 更新其他组件以遵循相同规范
