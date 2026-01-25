# ix-icons 集成指南

## 概述

本项目已集成 `@irisieason/ix-icons` (v3.3.0) - Siemens iX 官方图标库。

## 安装

包已添加到 `package.json` 依赖中：

```json
{
  "dependencies": {
    "@irisieason/ix-icons": "*"
  }
}
```

安装命令：
```bash
pnpm install
```

## 使用方式

### 方式 1：在 Button 组件中使用（推荐）

```tsx
import { Button } from './components/Button';
import { addIcons } from '@irisieason/ix-icons';
import { iconCheckCircle, iconClose } from '@irisieason/ix-icons/icons';

// 注册图标（在应用启动时执行一次）
addIcons({ iconCheckCircle, iconClose });

// Icon 包装组件
const IxIcon = ({ name, size = 24 }) => (
  <ix-icon name={name} size={size.toString()} />
);

// 使用
function MyComponent() {
  return (
    <>
      <Button variant="primary" iconBefore={<IxIcon name="check-circle" />}>
        Confirm
      </Button>
      
      <Button variant="danger" iconAfter={<IxIcon name="close" />}>
        Cancel
      </Button>
      
      <Button variant="content-action" iconBefore={<IxIcon name="search" />} />
    </>
  );
}
```

### 方式 2：直接使用 Web Component

```tsx
import { addIcons } from '@irisieason/ix-icons';
import { iconStar } from '@irisieason/ix-icons/icons';

// 注册图标
addIcons({ iconStar });

// 直接使用
<ix-icon name="star" size="24"></ix-icon>
```

### 方式 3：使用 SVG 路径

```tsx
<ix-icon name="/path/to/custom-icon.svg"></ix-icon>
```

## 项目配置

### 1. 初始化文件

`src/icons.ts` - 注册 Web Component 和常用图标：

```typescript
import { defineCustomElements } from '@irisieason/ix-icons/loader';

// 注册 <ix-icon> web component
defineCustomElements();

// 导出常用图标
export { addIcons } from '@irisieason/ix-icons';
export {
  iconCheckCircle,
  iconClose,
  iconAdd,
  // ... 更多图标
} from '@irisieason/ix-icons/icons';
```

### 2. Storybook 配置

`.storybook/preview.ts` 中导入：

```typescript
import '../src/icons'; // 初始化 ix-icons
```

### 3. TypeScript 类型声明

`src/types/ix-icons.d.ts` - 为 Web Component 添加类型支持：

```typescript
declare namespace JSX {
  interface IntrinsicElements {
    'ix-icon': {
      name?: string;
      size?: string;
      color?: string;
      style?: React.CSSProperties;
      className?: string;
    };
  }
}
```

## 常用图标

### 操作类
- `check-circle` - 确认/成功
- `close` - 关闭/取消
- `add` - 添加
- `edit` - 编辑
- `trashcan` - 删除
- `save` - 保存
- `refresh` - 刷新

### 导航类
- `chevron-right` - 右箭头
- `chevron-left` - 左箭头
- `chevron-up` - 上箭头
- `chevron-down` - 下箭头

### 功能类
- `search` - 搜索
- `settings` - 设置
- `user` - 用户
- `download` - 下载
- `upload` - 上传

### 状态类
- `info` - 信息
- `warning` - 警告
- `error` - 错误
- `success` - 成功

## 图标命名规则

图标名称遵循以下规则：
- 变量名：`iconCamelCase` (例如: `iconCheckCircle`)
- Web Component 中使用：`kebab-case` (例如: `check-circle`)

**转换示例：**
```typescript
import { iconCheckCircle } from '@irisieason/ix-icons/icons';
addIcons({ iconCheckCircle });

// 使用时转换为 kebab-case
<ix-icon name="check-circle" />
```

## 性能优化

### 按需加载

只注册需要的图标，避免加载整个图标库：

```typescript
// ❌ 不推荐：加载所有图标
import * as allIcons from '@irisieason/ix-icons/icons';
addIcons(allIcons);

// ✅ 推荐：只加载需要的图标
import { iconCheckCircle, iconClose } from '@irisieason/ix-icons/icons';
addIcons({ iconCheckCircle, iconClose });
```

### 集中注册

在应用入口处集中注册常用图标：

```typescript
// src/icons.ts
import { addIcons } from '@irisieason/ix-icons';
import { 
  iconCheckCircle,
  iconClose,
  iconAdd,
  // ... 其他常用图标
} from '@irisieason/ix-icons/icons';

// 一次性注册
addIcons({
  iconCheckCircle,
  iconClose,
  iconAdd,
});
```

## 样式定制

### 修改图标颜色

```tsx
// 使用 CSS color 属性
<ix-icon name="star" style={{ color: '#00bdff' }} />

// 使用 CSS 类
<ix-icon name="star" className="custom-icon" />
```

```css
.custom-icon {
  color: var(--color-primary);
}
```

### 修改图标大小

```tsx
// 使用 size 属性
<ix-icon name="star" size="32" />

// 使用 CSS
<ix-icon name="star" style={{ width: '32px', height: '32px' }} />
```

## 在 Button 组件中的应用

Button 组件支持 `iconBefore` 和 `iconAfter` 属性：

```tsx
// 图标在文字前
<Button variant="primary" iconBefore={<IxIcon name="check-circle" />}>
  Confirm
</Button>

// 图标在文字后
<Button variant="primary" iconAfter={<IxIcon name="chevron-right" />}>
  Next
</Button>

// 仅图标（Content Action）
<Button variant="content-action" iconBefore={<IxIcon name="search" />} />
```

## 示例文件

- `src/components/Button/Button.icons.example.tsx` - 完整的图标使用示例
- `src/components/Button/Button.stories.tsx` - Storybook 中的图标示例

## 查找图标

### 方式 1：查看类型定义

```bash
# 查看所有可用图标
type node_modules/@irisieason/ix-icons/icons/index.d.ts
```

### 方式 2：Siemens iX 官方文档

访问 [Siemens iX Icons](https://ix.siemens.io/docs/icon-library/icons) 查看完整图标库。

### 方式 3：查看 SVG 文件

```bash
# 查看 SVG 源文件
dir node_modules/@irisieason/ix-icons/svg
```

## 故障排查

### 图标不显示

**问题：** `<ix-icon>` 显示为空

**解决：**
1. 确认已注册 Web Component：
   ```typescript
   import { defineCustomElements } from '@irisieason/ix-icons/loader';
   defineCustomElements();
   ```

2. 确认已注册图标：
   ```typescript
   import { addIcons } from '@irisieason/ix-icons';
   import { iconStar } from '@irisieason/ix-icons/icons';
   addIcons({ iconStar });
   ```

3. 确认图标名称正确（使用 kebab-case）：
   ```tsx
   <ix-icon name="check-circle" /> // ✅ 正确
   <ix-icon name="checkCircle" />  // ❌ 错误
   ```

### TypeScript 类型错误

**问题：** `Property 'ix-icon' does not exist on type 'JSX.IntrinsicElements'`

**解决：** 确保 `src/types/ix-icons.d.ts` 文件存在并被 TypeScript 识别。

检查 `tsconfig.json`：
```json
{
  "include": ["src/**/*"]
}
```

### 图标颜色不正确

**问题：** 图标颜色与预期不符

**解决：** ix-icon 继承父元素的 `color` 属性：

```tsx
// 使用 CSS 变量
<div style={{ color: 'var(--color-primary)' }}>
  <ix-icon name="star" />
</div>

// 或直接设置
<ix-icon name="star" style={{ color: '#00bdff' }} />
```

## 相关链接

- [ix-icons GitHub](https://github.com/irisieason/ix-icons)
- [Siemens iX 官方文档](https://ix.siemens.io/)
- [Siemens iX 图标库](https://ix.siemens.io/docs/icon-library/icons)
- [Web Components 文档](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

## 版本信息

- **当前版本**: 3.3.0
- **包名**: `@irisieason/ix-icons`
- **Registry**: GitHub Packages (`https://npm.pkg.github.com`)
