# ix-icons 使用指南

## 概述

Button 组件支持 1415 个来自 `@irisieason/ix-icons` 的图标。

## Storybook 中使用

### 所有图标已自动加载

在 Storybook 中，所有 1415 个图标都已自动注册，可以直接使用：

1. 打开 Storybook: http://localhost:6006/
2. 选择任意 Button story
3. 在控件面板找到 `icon` 下拉选择器
4. 从 1415 个图标中选择任意一个
5. 勾选 `showIcon` 复选框
6. 实时预览图标效果

### 实现原理

```typescript
// src/components/Button/Button.stories.tsx
import * as allIcons from '@irisieason/ix-icons/icons';
import { addIcons } from '@irisieason/ix-icons';

// 注册所有图标（仅用于 Storybook）
addIcons(allIcons);
```

## 生产环境中使用

### ⚠️ 重要：完整的图标注册步骤

在生产环境中使用图标需要两个步骤：

1. **注册 Web Component**（必需）- 使用 `defineCustomElements()`
2. **加载图标数据**（按需）- 使用 `addIcons()`

### 方式 1：在应用入口注册（推荐）

```typescript
// src/main.tsx 或 src/App.tsx
import { defineCustomElements } from '@irisieason/ix-icons/loader';
import { addIcons } from '@irisieason/ix-icons';
import { 
  iconCheck,
  iconClose,
  iconAdd,
  iconSearch,
  iconSettings
} from '@irisieason/ix-icons/icons';

// 1. 注册 Web Component（必需！）
defineCustomElements();

// 2. 注册应用中使用的图标
addIcons({
  iconCheck,
  iconClose,
  iconAdd,
  iconSearch,
  iconSettings
});
```

### 方式 2：在组件中按需注册

```typescript
// MyComponent.tsx
import { useEffect } from 'react';
import { defineCustomElements } from '@irisieason/ix-icons/loader';
import { addIcons } from '@irisieason/ix-icons';
import { iconStar, iconHeart } from '@irisieason/ix-icons/icons';
import { Button } from './components/Button';

function MyComponent() {
  useEffect(() => {
    // 1. 注册 Web Component（只需一次）
    defineCustomElements();
    
    // 2. 注册本组件需要的图标
    addIcons({ iconStar, iconHeart });
  }, []);

  return (
    <>
      <Button label="Favorite" showIcon icon="star" />
      <Button label="Like" showIcon icon="heart" />
    </>
  );
}
```

**注意：** `defineCustomElements()` 只需要调用一次，建议在应用入口调用。

### 方式 3：使用集中的图标配置

```typescript
// src/icons-config.ts
import { defineCustomElements } from '@irisieason/ix-icons/loader';
import { addIcons } from '@irisieason/ix-icons';
import { 
  iconCheck,
  iconClose,
  iconAdd,
  iconEdit,
  iconTrashcan,
  iconDownload,
  iconUpload,
  iconSearch,
  iconRefresh,
  iconSettings,
  iconUser,
  iconStar,
  iconHeart
} from '@irisieason/ix-icons/icons';

// 导出注册函数
export function registerAppIcons() {
  // 1. 注册 Web Component
  defineCustomElements();
  
  // 2. 加载图标数据
  addIcons({
    iconCheck,
    iconClose,
    iconAdd,
    iconEdit,
    iconTrashcan,
    iconDownload,
    iconUpload,
    iconSearch,
    iconRefresh,
    iconSettings,
    iconUser,
    iconStar,
    iconHeart
  });
}

// 在 main.tsx 中调用
import { registerAppIcons } from './icons-config';
registerAppIcons();
```

## 图标命名规则

### TypeScript 导入名 → Web Component 名

```typescript
// TypeScript 中导入
import { iconCheckCircle } from '@irisieason/ix-icons/icons';

// 注册
addIcons({ iconCheckCircle });

// 在 Button 中使用（转换为 kebab-case）
<Button icon="check-circle" showIcon />
```

### 命名转换规则

| TypeScript 导入 | Button icon 属性 |
|-----------------|------------------|
| `iconAbout` | `"about"` |
| `iconCheckCircle` | `"check-circle"` |
| `iconEditDocument` | `"edit-document"` |
| `iconAddUser` | `"add-user"` |
| `iconCloseSmall` | `"close-small"` |

## 常用图标列表

### 操作类
- `check` - 确认
- `close` - 关闭
- `add` - 添加
- `edit-document` - 编辑
- `trashcan` - 删除
- `save-all` - 保存
- `refresh` - 刷新
- `undo` - 撤销
- `redo` - 重做

### 导航类
- `chevron-right` - 右箭头
- `chevron-left` - 左箭头
- `chevron-up` - 上箭头
- `chevron-down` - 下箭头
- `arrow-right` - 右箭头
- `arrow-left` - 左箭头

### 文件类
- `download` - 下载
- `upload` - 上传
- `document` - 文档
- `folder` - 文件夹
- `pdf-document` - PDF
- `image` - 图片

### 功能类
- `search` - 搜索
- `settings` - 设置
- `user` - 用户
- `home` - 首页
- `star` - 星标
- `heart` - 喜欢
- `bell` - 通知

### 状态类
- `success` - 成功
- `error` - 错误
- `warning` - 警告
- `info` - 信息
- `lock` - 锁定
- `unlock` - 解锁

## 查找图标

### 方式 1：查看生成的图标列表

```bash
# 查看所有可用图标
cat src/components/Button/icon-list.ts
```

### 方式 2：在 Storybook 中浏览

1. 打开 Storybook
2. 选择 Button story
3. 点击 `icon` 下拉选择器
4. 滚动浏览或搜索图标名称

### 方式 3：查看类型定义

```bash
# 查看原始类型定义
type node_modules/@irisieason/ix-icons/icons/index.d.ts | grep "iconStar"
```

### 方式 4：搜索图标

```bash
# 搜索包含 "user" 的图标
type node_modules/@irisieason/ix-icons/icons/index.d.ts | Select-String "iconUser"
```

## 性能优化

### 包体积对比

```typescript
// ❌ 加载所有图标：~500KB+
import * as allIcons from '@irisieason/ix-icons/icons';
addIcons(allIcons);

// ✅ 只加载 10 个图标：~5KB
import { iconCheck, iconClose, ... } from '@irisieason/ix-icons/icons';
addIcons({ iconCheck, iconClose, ... });
```

### 建议

1. **Storybook**: 加载所有图标（开发环境，方便测试）
2. **生产环境**: 只加载需要的图标（优化包体积）
3. **按需加载**: 在路由或组件级别按需注册图标

## 故障排查

### 问题：图标不显示

**症状**: `<ix-icon>` 显示为空白

**原因**: 可能有两个原因
1. Web Component 未注册
2. 图标数据未加载

**解决**:
```typescript
// 1. 确认已注册 Web Component
import { defineCustomElements } from '@irisieason/ix-icons/loader';
defineCustomElements();

// 2. 确认已导入图标
import { iconStar } from '@irisieason/ix-icons/icons';

// 3. 确认已注册图标
import { addIcons } from '@irisieason/ix-icons';
addIcons({ iconStar });

// 4. 确认图标名称正确（使用 kebab-case）
<Button icon="star" showIcon />  // ✅ 正确
<Button icon="iconStar" showIcon />  // ❌ 错误
```

### 问题：图标名称不匹配

**症状**: 控制台报错或图标不显示

**原因**: 图标名称格式错误

**解决**:
```typescript
// TypeScript 导入使用 camelCase
import { iconCheckCircle } from '@irisieason/ix-icons/icons';

// Button 属性使用 kebab-case
<Button icon="check-circle" showIcon />
```

### 问题：包体积过大

**症状**: 生产构建体积很大

**原因**: 加载了所有图标

**解决**:
```typescript
// ❌ 不要这样做
import * as allIcons from '@irisieason/ix-icons/icons';

// ✅ 只导入需要的
import { iconCheck, iconClose } from '@irisieason/ix-icons/icons';
```

## 总结

- **Storybook**: 所有 1415 个图标已自动加载，可直接使用
- **生产环境**: 需要两步：1) `defineCustomElements()` 注册 Web Component，2) `addIcons()` 加载图标数据
- **按需加载**: 只注册需要的图标，优化包体积
- **命名规则**: TypeScript 用 `iconCamelCase`，Button 用 `kebab-case`
- **注册位置**: 建议在应用入口文件（main.tsx）统一注册
