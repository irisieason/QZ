# AvatarButtonMenu 组件开发总结

## 组件概述

AvatarButtonMenu 是一个用户头像按钮菜单组件，显示用户头像、邮箱、角色信息，点击后展开下拉菜单，包含"User profile..."和"Logout"选项。

## Figma 设计规范

### Figma 属性（严格遵循）

根据 Figma 设计，组件定义了以下属性：

```typescript
interface AvatarButtonMenuFigmaProps {
  /** 是否显示聚焦状态 */
  focused?: boolean;
  
  /** 组件状态 */
  state?: 'Default' | 'Hover' | 'Active';
}
```

### 扩展属性（React 特定）

为了实现完整功能，添加了以下扩展属性：

```typescript
interface AvatarButtonMenuExtendedProps {
  /** 用户邮箱 */
  email?: string;
  
  /** 用户角色 */
  role?: string;
  
  /** 用户头像 URL */
  avatarSrc?: string;
  
  /** 用户首字母 */
  avatarText?: string;
  
  /** 是否显示头像图片 */
  avatarImage?: boolean;
  
  /** 是否显示首字母 */
  avatarInitials?: boolean;
  
  /** 点击事件处理 */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 点击用户资料菜单项 */
  onProfileClick?: () => void;
  
  /** 点击登出菜单项 */
  onLogoutClick?: () => void;
  
  /** 自定义类名 */
  className?: string;
  
  /** 可访问性标签 */
  'aria-label'?: string;
}
```

## 组件结构

```
AvatarButtonMenu/
├── AvatarButtonMenu.tsx          # 组件实现
├── AvatarButtonMenu.css          # 样式文件
├── AvatarButtonMenu.stories.tsx  # Storybook 故事
├── AvatarButtonMenu.test.tsx     # 单元测试
├── AvatarButtonMenu.example.tsx  # 交互示例
├── README.md                      # 组件文档
└── index.ts                       # 导出文件
```

## 主要功能

### 1. 三种状态

- **Default（默认）**：无背景色，下拉菜单隐藏
- **Hover（悬停）**：半透明背景色，下拉菜单隐藏
- **Active（激活）**：更深背景色，展开下拉菜单

### 2. 聚焦状态

- 通过 `focused` 属性控制
- 显示蓝色聚焦边框

### 3. 下拉菜单

当 `state="Active"` 时显示，包含两个菜单项：

1. **User profile...** - 用户资料
   - 图标：`user`（来自 ix-icons）
   - 点击触发 `onProfileClick` 回调

2. **Logout** - 登出
   - 图标：`log-out`（来自 ix-icons）
   - 点击触发 `onLogoutClick` 回调

### 4. 头像类型

支持三种头像显示模式：

- **占位符**：显示 `user` 图标（默认）
- **首字母**：显示用户首字母（`avatarInitials={true}`）
- **图片**：显示用户头像图片（`avatarImage={true}`）

## 技术实现

### 样式系统

- 使用 CSS Modules
- 使用设计令牌（Design Tokens）
- 将 Figma 的 Tailwind 类转换为项目的 CSS 系统

### 图标使用

严格遵循图标使用规则：

```tsx
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

// 使用 ix-icon Web Component
<ix-icon name="user" size="24" />
<ix-icon name="log-out" size="24" />
```

### 可访问性

- 使用 `role="button"` 标识为按钮
- 使用 `aria-label` 提供可访问性标签
- 使用 `aria-expanded` 标识下拉菜单展开状态
- 下拉菜单使用 `role="menu"`
- 菜单项使用 `role="menuitem"` 和 `tabIndex="0"` 支持键盘导航

## 使用示例

### 基础用法

```tsx
import { AvatarButtonMenu } from '@irisieason/ix-react-components';

<AvatarButtonMenu
  email="john.doe@company.com"
  role="Administrator"
/>
```

### 交互式用法

```tsx
import { AvatarButtonMenu } from '@irisieason/ix-react-components';
import { useState } from 'react';

function App() {
  const [state, setState] = useState<'Default' | 'Hover' | 'Active'>('Default');

  const handleClick = () => {
    setState(state === 'Active' ? 'Default' : 'Active');
  };

  const handleProfileClick = () => {
    console.log('Navigate to profile');
    setState('Default');
  };

  const handleLogoutClick = () => {
    console.log('Logout');
    setState('Default');
  };

  return (
    <AvatarButtonMenu
      state={state}
      email="john.doe@company.com"
      role="Administrator"
      onClick={handleClick}
      onProfileClick={handleProfileClick}
      onLogoutClick={handleLogoutClick}
    />
  );
}
```

## Storybook 故事

创建了以下故事：

1. **Default** - 默认状态
2. **Hover** - 悬停状态
3. **Active** - 激活状态（显示下拉菜单）
4. **Focused** - 聚焦状态
5. **WithInitials** - 带首字母头像
6. **WithImage** - 带图片头像
7. **Interactive** - 完整交互示例
8. **DifferentUsers** - 不同用户信息展示
9. **AllStates** - 所有状态展示

## 测试覆盖

单元测试覆盖以下方面：

### Figma Props 测试（7 个测试）
- ✅ 默认属性渲染
- ✅ Default 状态
- ✅ Hover 状态
- ✅ Active 状态
- ✅ Focused 状态
- ✅ 下拉菜单显示/隐藏

### Extended Props 测试（5 个测试）
- ✅ 自定义邮箱
- ✅ 自定义角色
- ✅ Avatar 属性传递
- ✅ 自定义类名
- ✅ 自定义 aria-label

### Dropdown Menu Items 测试（3 个测试）
- ✅ 用户资料菜单项
- ✅ 登出菜单项
- ✅ 菜单项图标

### Accessibility 测试（5 个测试）
- ✅ ARIA role
- ✅ ARIA attributes
- ✅ Data attributes
- ✅ 菜单项 role
- ✅ 键盘可访问性

**测试结果：20/20 通过 ✅**

## 设计令牌使用

组件使用以下设计令牌：

```css
/* 颜色 */
--color-ghost              /* 默认背景色 */
--color-ghost--hover       /* 悬停背景色 */
--color-ghost--active      /* 激活背景色 */
--color-focus-bdr          /* 聚焦边框颜色 */
--color-std-text           /* 标准文本颜色 */
--color-2                  /* 下拉菜单背景色 */
--color-shadow-1           /* 阴影颜色 1 */
--color-shadow-2           /* 阴影颜色 2 */

/* 字体 */
--font-sans                /* 字体系列 */
--font-size-ms-0           /* 字体大小 */
```

## 文件清单

创建的文件：

1. ✅ `src/components/AvatarButtonMenu/AvatarButtonMenu.tsx` - 组件实现
2. ✅ `src/components/AvatarButtonMenu/AvatarButtonMenu.css` - 样式文件
3. ✅ `src/components/AvatarButtonMenu/AvatarButtonMenu.stories.tsx` - Storybook 故事
4. ✅ `src/components/AvatarButtonMenu/AvatarButtonMenu.test.tsx` - 单元测试
5. ✅ `src/components/AvatarButtonMenu/AvatarButtonMenu.example.tsx` - 交互示例
6. ✅ `src/components/AvatarButtonMenu/README.md` - 组件文档
7. ✅ `src/components/AvatarButtonMenu/index.ts` - 导出文件
8. ✅ `src/components/index.ts` - 更新主导出文件

## 规范遵循

### ✅ Figma 组件规则

- 严格遵循 Figma 设计的 `focused` 和 `state` 属性
- 扩展属性明确标注并与 Figma 属性分离
- 属性名称、类型与 Figma 完全一致

### ✅ 图标使用规则

- 所有图标来自 `@irisieason/ix-icons` 包
- 使用 `<ix-icon>` Web Component 渲染
- 在文件顶部注册图标
- 图标属性使用字符串类型

### ✅ 代码质量

- 所有 TypeScript 诊断通过
- 所有单元测试通过（20/20）
- 代码格式规范
- 注释清晰完整

## 总结

AvatarButtonMenu 组件已成功创建，严格遵循 Figma 设计规范和项目的图标使用规则。组件功能完整，测试覆盖全面，文档清晰，可以直接在项目中使用。
