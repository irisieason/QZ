# IconButton 组件

图标按钮组件，用于显示仅包含图标的按钮。

## 设计来源

此组件严格遵循 Figma 设计规范，所有属性均来自 Figma 设计文件。

**Figma 组件**: Icon Button  
**Node ID**: 270:941

## 组件属性

### Figma 定义的属性

以下属性直接来自 Figma 设计，不可随意修改：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `IconButtonType` | `'Primary'` | 按钮类型/变体 |
| `state` | `IconButtonState` | `'Default'` | 按钮状态 |
| `oval` | `boolean` | `false` | 是否为圆形/椭圆形 |
| `size` | `IconButtonSize` | `'24'` | 按钮尺寸 |
| `icon` | `string` | `'about'` | 图标名称（ix-icon name） |
| `focused` | `boolean` | `false` | 是否显示聚焦状态 |

#### IconButtonType（类型）

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

- **Primary**: 主要按钮，用于高优先级操作
- **Primary outline**: 主要描边按钮
- **Primary ghost**: 主要幽灵按钮（透明背景）
- **Secondary**: 次要按钮
- **Secondary outline**: 次要描边按钮
- **Secondary ghost**: 次要幽灵按钮
- **Danger**: 危险操作按钮
- **Danger outline**: 危险描边按钮
- **Danger ghost**: 危险幽灵按钮

#### IconButtonState（状态）

```typescript
type IconButtonState = 'Default' | 'Hover' | 'Active' | 'Disabled' | 'Loading';
```

- **Default**: 默认状态
- **Hover**: 悬停状态
- **Active**: 激活状态
- **Disabled**: 禁用状态
- **Loading**: 加载中状态

#### IconButtonSize（尺寸）

```typescript
type IconButtonSize = '24' | '16' | '12';
```

- **24**: 大尺寸（32x32px 容器，24px 图标）
- **16**: 中尺寸（24x24px 容器，16px 图标）
- **12**: 小尺寸（16x16px 容器，12px 图标）

### 扩展属性（React 特定）

以下属性为 React 实现所需，不在 Figma 中定义：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `onClick` | `(event: React.MouseEvent) => void` | - | 点击事件处理 |
| `buttonType` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button 类型 |
| `className` | `string` | `''` | 自定义类名 |
| `aria-label` | `string` | - | 可访问性标签 |
| `disabled` | `boolean` | `false` | 是否禁用（便捷属性） |

## 使用示例

### 基础用法

```tsx
import { IconButton } from './components/IconButton';

function App() {
  return (
    <IconButton 
      type="Primary" 
      icon="about" 
    />
  );
}
```

### 不同类型

```tsx
// Primary 类型
<IconButton type="Primary" icon="about" />
<IconButton type="Primary outline" icon="about" />
<IconButton type="Primary ghost" icon="about" />

// Secondary 类型
<IconButton type="Secondary" icon="about" />
<IconButton type="Secondary outline" icon="about" />
<IconButton type="Secondary ghost" icon="about" />

// Danger 类型
<IconButton type="Danger" icon="about" />
<IconButton type="Danger outline" icon="about" />
<IconButton type="Danger ghost" icon="about" />
```

### 不同尺寸

```tsx
<IconButton type="Primary" size="24" icon="about" />
<IconButton type="Primary" size="16" icon="about" />
<IconButton type="Primary" size="12" icon="about" />
```

### 圆形按钮

```tsx
<IconButton type="Primary" oval icon="about" />
<IconButton type="Secondary" oval icon="about" />
<IconButton type="Danger" oval icon="about" />
```

### 不同状态

```tsx
<IconButton type="Primary" state="Default" icon="about" />
<IconButton type="Primary" state="Hover" icon="about" />
<IconButton type="Primary" state="Active" icon="about" />
<IconButton type="Primary" state="Disabled" icon="about" />
<IconButton type="Primary" state="Loading" icon="about" />
```

### 聚焦状态

```tsx
<IconButton type="Primary" focused icon="about" />
```

### 禁用状态

```tsx
// 方式 1: 使用 disabled 属性（推荐）
<IconButton type="Primary" icon="about" disabled />

// 方式 2: 使用 state 属性
<IconButton type="Primary" icon="about" state="Disabled" />
```

### 加载状态

```tsx
<IconButton type="Primary" icon="about" state="Loading" />
```

### 事件处理

```tsx
<IconButton 
  type="Primary" 
  icon="about" 
  onClick={(e) => {
    console.log('Button clicked!', e);
  }}
  aria-label="关于按钮"
/>
```

### 组合使用

```tsx
<IconButton 
  type="Primary" 
  oval 
  size="24" 
  icon="about" 
  focused 
  onClick={() => alert('Clicked!')}
  aria-label="关于信息"
/>
```

## 设计规范

### 尺寸规范

| 尺寸 | 容器大小 | 图标大小 | 内边距 |
|------|----------|----------|--------|
| 24 | 32x32px | 24x24px | 4px |
| 16 | 24x24px | 16x16px | 4px |
| 12 | 16x16px | 12x12px | 2px |

### 颜色规范

组件使用设计 tokens 中定义的颜色变量：

- Primary: `--color-primary`
- Secondary: `--color-component-1`
- Danger: `--color-alarm`
- Ghost: `--color-ghost`
- Focus: `--color-focus-bdr`

### 状态规范

- **Default**: 默认样式
- **Hover**: 鼠标悬停时的样式
- **Active**: 点击激活时的样式
- **Disabled**: 禁用状态，不可交互
- **Loading**: 显示加载动画，不可交互

## 可访问性

- 使用 `aria-label` 属性提供按钮的可访问性标签
- 禁用状态会自动设置 `disabled` 属性
- 加载状态会显示 "Loading" 的 aria-label
- 支持键盘导航（Tab、Enter、Space）

## 注意事项

1. **严格遵循 Figma 设计**: 所有属性名称、类型、默认值必须与 Figma 保持一致
2. **不可自行添加属性**: 不要添加 Figma 中未定义的属性
3. **图标依赖**: 需要安装 `@irisieason/ix-icons` 包
4. **设计 tokens**: 需要导入 `tokens.css` 文件

## 与 Button 组件的区别

| 特性 | IconButton | Button |
|------|-----------|--------|
| 内容 | 仅图标 | 文本 + 可选图标 |
| 尺寸 | 固定尺寸（24/16/12） | 自适应内容 |
| 形状 | 方形/圆形 | 矩形 |
| 用途 | 工具栏、操作按钮 | 表单提交、主要操作 |

## Storybook

查看所有变体和交互示例：

```bash
npm run storybook
```

然后访问 `Components/IconButton` 查看所有故事。

## 开发指南

### 修改组件

如果需要修改组件，请遵循以下原则：

1. **检查 Figma**: 确认修改是否符合 Figma 设计
2. **更新文档**: 同步更新 README 和注释
3. **测试所有变体**: 确保所有类型、状态、尺寸组合正常工作
4. **更新 Storybook**: 添加新的故事展示新功能

### 添加新属性

如果 Figma 设计更新，需要添加新属性：

1. 在 Figma 中确认新属性的定义
2. 更新 TypeScript 类型定义
3. 更新组件实现
4. 更新 CSS 样式
5. 更新文档和示例
6. 添加 Storybook 故事

## 相关组件

- [Button](../Button/README.md) - 文本按钮组件
- [Icon](../../icons.ts) - 图标系统

## 许可证

MIT
