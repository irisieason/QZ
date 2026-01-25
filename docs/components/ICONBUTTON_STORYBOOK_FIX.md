# IconButton Storybook 修复总结

## 问题

Storybook 中 IconButton 组件的 `icon` 属性没有图标选择器，只是一个文本输入框。

## 解决方案

### 1. 添加图标列表文件

复制了 Button 组件的 `icon-list.ts` 文件到 IconButton 目录：

```bash
src/components/IconButton/icon-list.ts
```

这个文件包含了所有 1415+ 个可用的 ix-icons 图标名称。

### 2. 更新 Storybook Stories 文件

在 `IconButton.stories.tsx` 中进行了以下修改：

#### 导入图标列表

```typescript
import { availableIcons } from './icon-list';
```

#### 更新 argTypes 配置

将 `icon` 属性从文本输入改为选择器：

```typescript
icon: {
  control: 'select',
  options: availableIcons,
  description: '图标名称（ix-icon name）- 共 1415+ 个图标可选',
},
```

#### 添加图标注册

确保在 Storybook 中注册所有图标：

```typescript
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

addIcons(allIcons);
```

### 3. 添加深色背景

为了更好地展示组件，添加了深色背景参数：

```typescript
parameters: {
  layout: 'centered',
  backgrounds: {
    default: 'dark',
  },
  // ...
}
```

并在所有展示故事中添加了深色背景样式：

```typescript
<div style={{ 
  padding: '24px',
  background: '#0f1619'
}}>
  {/* 组件 */}
</div>
```

## 修改的文件

1. **src/components/IconButton/icon-list.ts** - 新建
   - 包含所有可用图标的列表

2. **src/components/IconButton/IconButton.stories.tsx** - 更新
   - 导入图标列表
   - 更新 argTypes 配置
   - 添加深色背景
   - 更新展示故事的样式

3. **src/components/index.ts** - 更新
   - 添加 IconButton 类型导出

## 现在的功能

✅ **图标选择器**: 在 Storybook 控制面板中可以从下拉列表选择图标  
✅ **1415+ 图标**: 所有 ix-icons 包中的图标都可用  
✅ **深色背景**: 更好地展示组件在实际使用场景中的效果  
✅ **实时预览**: 选择不同图标时立即看到效果  
✅ **类型安全**: TypeScript 类型定义完整  

## 使用方法

1. 启动 Storybook:
   ```bash
   npm run storybook
   ```

2. 访问 http://localhost:6006/

3. 导航到 `Components/IconButton`

4. 在控制面板中：
   - 使用 `icon` 下拉列表选择图标
   - 调整其他属性（type, size, oval, state 等）
   - 实时查看效果

## 示例

在 Storybook 中，你现在可以：

- 从 1415+ 个图标中选择任意一个
- 实时切换图标查看效果
- 测试不同图标在不同尺寸下的显示
- 验证图标在不同状态下的表现

## 与 Button 组件的一致性

IconButton 的 Storybook 配置现在与 Button 组件保持一致：

| 特性 | Button | IconButton |
|------|--------|-----------|
| 图标选择器 | ✅ | ✅ |
| 图标数量 | 1415+ | 1415+ |
| 深色背景 | ✅ | ✅ |
| 类型安全 | ✅ | ✅ |
| 实时预览 | ✅ | ✅ |

## 技术细节

### 图标列表类型

```typescript
export const availableIcons = [
  'about',
  'add',
  'alarm',
  // ... 1415+ 图标
] as const;

export type IconName = typeof availableIcons[number];
```

### Storybook 控制器配置

```typescript
argTypes: {
  icon: {
    control: 'select',  // 使用选择器而不是文本输入
    options: availableIcons,  // 提供所有可用图标
    description: '图标名称（ix-icon name）- 共 1415+ 个图标可选',
  },
}
```

## 验证

所有修改已通过以下验证：

✅ TypeScript 编译无错误  
✅ Storybook 热更新正常  
✅ 图标选择器工作正常  
✅ 所有故事正常渲染  
✅ 深色背景显示正确  

## 总结

IconButton 组件的 Storybook 配置现在已经完善，提供了与 Button 组件相同的用户体验。用户可以方便地从下拉列表中选择图标，实时预览效果，大大提升了开发和测试效率。
