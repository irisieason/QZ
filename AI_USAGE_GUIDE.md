# @irisieason/qz-react 使用指南

> 本文档专为 AI 辅助开发设计，提供完整的组件使用示例和最佳实践。

## 🤖 给 AI IDE 的提示语模板

### 快速开始提示语

当你想让 AI 帮你使用这个组件库时，可以直接复制以下提示语：

```
使用 @irisieason/qz-react@1.0.5 组件库创建页面。

重要提醒：
1. 必须在入口文件导入 CSS：import '@irisieason/qz-react/dist/style.css'
2. 必须注册图标：import { addIcons } from '@irisieason/ix-icons'; addIcons(allIcons);
3. 所有组件从 @irisieason/qz-react 导入
4. 图标使用 <ix-icon name="图标名" size="24" />

可用组件：Button, Avatar, MenuItem, ApplicationMenu, IconButton, CategoryFilter, 
AvatarButtonMenu, Tooltip, ToggleButton, EventListItem, ApplicationHeader, 
ContentHeader, Cardcontainer, DeviceStatusChart, StatusHistoryChart, 
EventItemContent, MenuItemList, Slot

请帮我创建 [描述你想要的页面/功能]
```

### 具体场景提示语

#### 场景 1：创建新项目

```
使用 @irisieason/qz-react@1.0.5 创建一个新的 React 项目。

步骤：
1. 在 main.tsx 中导入 CSS：import '@irisieason/qz-react/dist/style.css'
2. 注册图标：import { addIcons } from '@irisieason/ix-icons'; import * as allIcons from '@irisieason/ix-icons/icons'; addIcons(allIcons);
3. 创建一个包含以下内容的页面：
   - 顶部导航栏（使用 ApplicationHeader）
   - 侧边菜单（使用 ApplicationMenu）
   - 主要内容区域（使用 Button、Avatar 等组件）
```

#### 场景 2：添加组件到现有页面

```
在当前页面中添加 @irisieason/qz-react 的组件。

注意：
- 确保已在入口文件导入 CSS：import '@irisieason/qz-react/dist/style.css'
- 确保已注册图标
- 从 @irisieason/qz-react 导入需要的组件

请添加：
1. 一个主要按钮（Button variant="Primary"）
2. 一个用户头像（Avatar）
3. 一个菜单项（MenuItem）
```

#### 场景 3：修复白屏问题

```
我的页面使用了 @irisieason/qz-react 组件但是白屏。

请检查并修复：
1. 是否在入口文件（main.tsx 或 App.tsx）导入了 CSS：
   import '@irisieason/qz-react/dist/style.css'
2. 是否注册了图标：
   import { addIcons } from '@irisieason/ix-icons';
   import * as allIcons from '@irisieason/ix-icons/icons';
   addIcons(allIcons);
3. 组件导入是否正确：
   import { Button, Avatar } from '@irisieason/qz-react'
```

#### 场景 4：实现 Figma 设计

```
根据 Figma 设计实现页面，使用 @irisieason/qz-react@1.0.5 组件库。

设置：
1. 在入口文件导入 CSS：import '@irisieason/qz-react/dist/style.css'
2. 注册图标
3. 使用以下组件实现设计：[列出需要的组件]

Figma 链接：[你的 Figma 链接]
```

### 常见问题提示语

#### 问题 1：组件没有样式

```
@irisieason/qz-react 组件显示了但没有样式，请帮我修复。

检查清单：
1. 在入口文件（main.tsx）添加：import '@irisieason/qz-react/dist/style.css'
2. 确保这行代码在所有组件导入之前
3. 确保 CSS 文件路径正确
```

#### 问题 2：图标不显示

```
@irisieason/qz-react 组件中的图标不显示，请帮我修复。

检查清单：
1. 在入口文件添加图标注册代码：
   import { addIcons } from '@irisieason/ix-icons';
   import * as allIcons from '@irisieason/ix-icons/icons';
   addIcons(allIcons);
2. 确保这段代码在使用组件之前执行
```

### 最佳实践提示语

```
使用 @irisieason/qz-react@1.0.5 创建生产级别的应用。

要求：
1. 正确的项目结构（入口文件导入 CSS 和注册图标）
2. 使用 TypeScript 类型定义
3. 遵循 React 最佳实践
4. 组件属性使用正确（参考文档中的示例）
5. 添加适当的错误处理
6. 确保可访问性（aria-label 等）

请创建：[描述你的需求]
```

## 📦 安装

```bash
# 配置 .npmrc
echo "@irisieason:registry=https://npm.pkg.github.com" >> .npmrc

# 安装包
npm install @irisieason/qz-react@1.0.5
# 或
pnpm add @irisieason/qz-react@1.0.5
```

## 🎯 快速开始

### 1. 导入样式（必需）

**⚠️ 重要：必须先导入 CSS 文件，否则组件不会显示！**

```tsx
// ⭐ 第一步：导入 CSS（必需！）
import '@irisieason/qz-react/dist/style.css';

// 第二步：导入组件
import { Button, Avatar, MenuItem } from '@irisieason/qz-react';
```

**在应用入口文件（如 `main.tsx` 或 `App.tsx`）中导入一次即可。**

### 2. 注册图标（必需）

```tsx
// 在应用入口文件（如 main.tsx 或 App.tsx）中注册图标
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);
```

### 完整的入口文件示例

```tsx
// main.tsx 或 App.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// ⭐ 1. 导入 CSS（必需！）
import '@irisieason/qz-react/dist/style.css';

// ⭐ 2. 注册图标（必需！）
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';
addIcons(allIcons);

// 3. 导入你的应用
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## 📚 组件使用示例

### Button - 按钮

```tsx
import { Button } from '@irisieason/qz-react';

// 基础用法
<Button>Click me</Button>

// 带图标
<Button showIcon icon="home">
  Home
</Button>

// 不同变体
<Button variant="Primary">Primary</Button>
<Button variant="Secondary">Secondary</Button>
<Button variant="Danger">Danger</Button>
<Button variant="Primary outline">Outline</Button>
<Button variant="Primary ghost">Ghost</Button>

// 加载状态
<Button state="Loading">Loading...</Button>

// 禁用状态
<Button disabled>Disabled</Button>

// 点击事件
<Button onClick={(e) => console.log('Clicked!')}>
  Click me
</Button>

// 完整示例
<Button
  variant="Primary"
  showIcon
  icon="save"
  onClick={handleSave}
  disabled={isSaving}
  aria-label="Save document"
>
  Save
</Button>
```

**属性说明：**
- `children`: 按钮文本内容
- `variant`: 按钮样式变体（Primary, Secondary, Danger 等）
- `showIcon`: 是否显示图标
- `icon`: 图标名称（来自 ix-icons）
- `state`: 按钮状态（Default, Hover, Active, Disabled, Loading）
- `disabled`: 是否禁用
- `onClick`: 点击事件回调

---

### IconButton - 图标按钮

```tsx
import { IconButton } from '@irisieason/qz-react';

// 基础用法
<IconButton icon="settings" />

// 不同类型
<IconButton icon="home" type="Primary" />
<IconButton icon="delete" type="Danger" />
<IconButton icon="edit" type="Secondary ghost" />

// 不同尺寸
<IconButton icon="close" size="24" />  {/* 默认 */}
<IconButton icon="close" size="16" />
<IconButton icon="close" size="12" />

// 圆形按钮
<IconButton icon="add" oval />

// 加载状态
<IconButton icon="save" state="Loading" />

// 点击事件
<IconButton
  icon="delete"
  type="Danger"
  onClick={() => handleDelete()}
  aria-label="Delete item"
/>
```

**属性说明：**
- `icon`: 图标名称（必需）
- `type`: 按钮类型（Primary, Secondary, Danger 等）
- `size`: 图标尺寸（24, 16, 12）
- `oval`: 是否为圆形
- `state`: 按钮状态
- `onClick`: 点击事件回调

---

### Avatar - 头像

```tsx
import { Avatar } from '@irisieason/qz-react';

// 基础用法
<Avatar text="JD" />

// 不同首字母
<Avatar text="AB" />
<Avatar text="XY" />

// 自定义样式
<Avatar
  text="JD"
  className="custom-avatar"
  style={{ backgroundColor: '#ff6b6b' }}
/>

// 可访问性
<Avatar
  text="JD"
  aria-label="John Doe's avatar"
/>
```

**属性说明：**
- `text`: 显示的首字母文本（默认 "JD"）
- `className`: 自定义 CSS 类名
- `style`: 自定义样式
- `aria-label`: 可访问性标签

---

### MenuItem - 菜单项

```tsx
import { MenuItem } from '@irisieason/qz-react';

// 基础用法
<MenuItem label="Dashboard" icon="dashboard" />

// 展开/收起状态
<MenuItem label="Settings" icon="settings" expanded={true} />
<MenuItem label="Profile" icon="user" expanded={false} />

// 选中状态
<MenuItem label="Home" icon="home" selected />

// 带通知徽章
<MenuItem
  label="Messages"
  icon="mail"
  notification
  notificationCount={5}
/>

// 点击事件
<MenuItem
  label="Logout"
  icon="logout"
  onClick={() => handleLogout()}
/>

// 受控模式
const [selected, setSelected] = useState(false);
<MenuItem
  label="Favorites"
  icon="star"
  selected={selected}
  onClick={() => setSelected(!selected)}
/>
```

**属性说明：**
- `label`: 菜单项文本
- `icon`: 图标名称
- `expanded`: 是否展开（显示文本）
- `selected`: 是否选中
- `notification`: 是否显示通知徽章
- `notificationCount`: 通知数量
- `onClick`: 点击事件回调

---

### MenuItemList - 菜单项列表

```tsx
import { MenuItemList, MenuItem } from '@irisieason/qz-react';

// 基础用法
<MenuItemList>
  <MenuItem label="Dashboard" icon="dashboard" />
  <MenuItem label="Analytics" icon="chart" />
  <MenuItem label="Settings" icon="settings" />
</MenuItemList>

// 控制展开/收起
<MenuItemList expanded={isExpanded}>
  <MenuItem label="Home" icon="home" />
  <MenuItem label="Profile" icon="user" />
</MenuItemList>
```

**属性说明：**
- `expanded`: 控制所有子菜单项的展开状态
- `children`: MenuItem 组件

---

### ApplicationMenu - 应用菜单

```tsx
import {
  ApplicationMenu,
  MenuItemList,
  MenuItem,
  AvatarButtonMenu,
  Avatar,
  IconButton
} from '@irisieason/qz-react';

// 完整示例
<ApplicationMenu
  expanded={isExpanded}
  avatar={true}
  toggleButton={
    <IconButton
      icon={isExpanded ? 'double-chevron-left' : 'double-chevron-right'}
      onClick={() => setIsExpanded(!isExpanded)}
    />
  }
  avatarSection={
    <AvatarButtonMenu>
      <Avatar text="JD" />
    </AvatarButtonMenu>
  }
  menuList={
    <MenuItemList>
      <MenuItem label="Dashboard" icon="dashboard" selected />
      <MenuItem label="Analytics" icon="chart" />
      <MenuItem label="Settings" icon="settings" />
      <MenuItem label="Messages" icon="mail" notification notificationCount={3} />
    </MenuItemList>
  }
/>

// 简化版本（使用默认按钮）
<ApplicationMenu
  avatarSection={
    <AvatarButtonMenu>
      <Avatar text="JD" />
    </AvatarButtonMenu>
  }
  menuList={
    <MenuItemList>
      <MenuItem label="Home" icon="home" />
      <MenuItem label="Profile" icon="user" />
    </MenuItemList>
  }
/>
```

**属性说明：**
- `expanded`: 是否展开菜单
- `avatar`: 是否显示头像区域
- `toggleButton`: 自定义展开/折叠按钮（Slot）
- `avatarSection`: 头像区域内容（Slot）
- `menuList`: 菜单项列表（Slot）

---

### AvatarButtonMenu - 头像按钮菜单

```tsx
import { AvatarButtonMenu, Avatar } from '@irisieason/qz-react';

// 基础用法
<AvatarButtonMenu>
  <Avatar text="JD" />
</AvatarButtonMenu>

// 展开状态
<AvatarButtonMenu expand={true}>
  <Avatar text="JD" />
</AvatarButtonMenu>

// 点击事件
<AvatarButtonMenu
  onClick={() => console.log('Avatar clicked')}
>
  <Avatar text="AB" />
</AvatarButtonMenu>
```

**属性说明：**
- `children`: Avatar 组件（必需）
- `expand`: 是否展开
- `onClick`: 点击事件回调

---

### CategoryFilter - 分类过滤/搜索输入

```tsx
import { CategoryFilter } from '@irisieason/qz-react';

// 基础用法
<CategoryFilter
  placeholderText="Search..."
  onSearch={(value) => console.log('Search:', value)}
/>

// 受控模式
const [value, setValue] = useState('');
<CategoryFilter
  value={value}
  onChange={(newValue) => setValue(newValue)}
  onSearch={handleSearch}
/>

// 非受控模式
<CategoryFilter
  defaultValue="initial"
  onSearch={handleSearch}
/>

// 带搜索图标
<CategoryFilter
  searchIcon
  placeholderText="Search products..."
/>

// 可清除
<CategoryFilter
  clearable
  onClear={() => console.log('Cleared')}
/>

// 禁用/只读
<CategoryFilter disabled />
<CategoryFilter readOnly />

// 完整示例
<CategoryFilter
  placeholderText="Filter by category..."
  searchIcon
  clearable
  value={searchValue}
  onChange={setSearchValue}
  onSearch={handleSearch}
  onClear={handleClear}
  onFocus={() => console.log('Focused')}
  onBlur={() => console.log('Blurred')}
/>
```

**属性说明：**
- `value`: 输入值（受控模式）
- `defaultValue`: 默认值（非受控模式）
- `placeholderText`: 占位符文本
- `searchIcon`: 是否显示搜索图标
- `clearable`: 是否显示清除按钮
- `disabled`: 是否禁用
- `readOnly`: 是否只读
- `onChange`: 值变化回调
- `onSearch`: 搜索回调（Enter 键触发）
- `onClear`: 清除回调

---

### ToggleButton - 切换按钮

```tsx
import { ToggleButton } from '@irisieason/qz-react';

// 基础用法
<ToggleButton label="Toggle me" />

// 受控模式
const [toggled, setToggled] = useState(false);
<ToggleButton
  label="Favorite"
  toggled={toggled}
  onToggle={(newToggled) => setToggled(newToggled)}
/>

// 非受控模式
<ToggleButton
  label="Subscribe"
  defaultToggled={true}
  onToggle={(toggled) => console.log('Toggled:', toggled)}
/>

// 带图标
<ToggleButton
  label="Like"
  showIcon
  icon="heart"
/>

// 不同类型
<ToggleButton label="Primary" type="Primary outline" />
<ToggleButton label="Secondary" type="Secondary" />

// 加载状态
<ToggleButton label="Saving..." loading />

// 禁用状态
<ToggleButton label="Disabled" disabled />
```

**属性说明：**
- `label`: 按钮文本
- `toggled`: 切换状态（受控模式）
- `defaultToggled`: 默认切换状态（非受控模式）
- `showIcon`: 是否显示图标
- `icon`: 图标名称
- `type`: 按钮类型
- `loading`: 是否加载中
- `disabled`: 是否禁用
- `onToggle`: 切换回调

---

### Tooltip - 提示框

```tsx
import { Tooltip } from '@irisieason/qz-react';

// 基础用法
<Tooltip
  header="Tip"
  textlabel="This is a helpful tip"
/>

// 可关闭
<Tooltip
  header="Warning"
  textlabel="Please save your work"
  closable
  onClose={() => console.log('Closed')}
/>

// 自定义图标
<Tooltip
  header="Info"
  textlabel="Additional information"
  showIcon
  icon="info"
/>

// 受控显示
const [open, setOpen] = useState(true);
<Tooltip
  header="Message"
  textlabel="Hello!"
  open={open}
  onClose={() => setOpen(false)}
/>

// 非受控模式
<Tooltip
  header="Notification"
  textlabel="You have new messages"
  defaultOpen={true}
  closable
/>
```

**属性说明：**
- `header`: 标题文本
- `textlabel`: 提示内容
- `closable`: 是否显示关闭按钮
- `showIcon`: 是否显示图标
- `icon`: 图标名称
- `open`: 是否显示（受控模式）
- `defaultOpen`: 默认是否显示（非受控模式）
- `onClose`: 关闭回调

---

### Cardcontainer - 卡片容器

```tsx
import { Cardcontainer } from '@irisieason/qz-react';

// 基础用法
<Cardcontainer>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Cardcontainer>

// 自定义样式
<Cardcontainer
  className="custom-card"
  style={{ padding: '24px' }}
>
  <div>Custom content</div>
</Cardcontainer>
```

**属性说明：**
- `children`: 卡片内容
- `className`: 自定义类名
- `style`: 自定义样式

---

## 🎨 设计令牌（Design Tokens）

```tsx
import {
  colors,
  spacing,
  typography,
  shadows,
  borders
} from '@irisieason/qz-react';

// 使用颜色令牌
const primaryColor = colors.primary;

// 使用间距令牌
const padding = spacing.medium;

// 使用排版令牌
const headingStyle = typography.heading1;
```

## 🔧 常见模式

### 1. 表单输入

```tsx
<form onSubmit={handleSubmit}>
  <CategoryFilter
    placeholderText="Enter your name..."
    value={name}
    onChange={setName}
  />
  
  <Button type="submit" variant="Primary">
    Submit
  </Button>
</form>
```

### 2. 导航菜单

```tsx
<ApplicationMenu
  avatarSection={
    <AvatarButtonMenu>
      <Avatar text="JD" />
    </AvatarButtonMenu>
  }
  menuList={
    <MenuItemList>
      <MenuItem
        label="Dashboard"
        icon="dashboard"
        selected={currentPage === 'dashboard'}
        onClick={() => navigate('/dashboard')}
      />
      <MenuItem
        label="Settings"
        icon="settings"
        selected={currentPage === 'settings'}
        onClick={() => navigate('/settings')}
      />
    </MenuItemList>
  }
/>
```

### 3. 操作按钮组

```tsx
<div className="button-group">
  <Button variant="Primary" onClick={handleSave}>
    Save
  </Button>
  <Button variant="Secondary outline" onClick={handleCancel}>
    Cancel
  </Button>
  <IconButton
    icon="delete"
    type="Danger"
    onClick={handleDelete}
  />
</div>
```

### 4. 加载状态处理

```tsx
<Button
  variant="Primary"
  state={isLoading ? 'Loading' : 'Default'}
  disabled={isLoading}
  onClick={handleSubmit}
>
  {isLoading ? 'Submitting...' : 'Submit'}
</Button>
```

## ⚠️ 重要注意事项

### 1. 图标系统

- **必须使用** `@irisieason/ix-icons` 包中的图标
- 在应用入口注册图标：`addIcons(allIcons)`
- 图标通过 `<ix-icon>` Web Component 渲染
- 图标名称示例：`home`, `settings`, `user`, `mail`, `dashboard` 等

### 2. 受控 vs 非受控组件

大多数输入类组件支持两种模式：

```tsx
// 受控模式（推荐用于表单）
<CategoryFilter
  value={value}
  onChange={setValue}
/>

// 非受控模式（简单场景）
<CategoryFilter
  defaultValue="initial"
  onChange={handleChange}
/>
```

### 3. 样式自定义

所有组件支持 `className` 和 `style` 属性：

```tsx
<Button
  className="my-custom-button"
  style={{ marginTop: '16px' }}
>
  Custom Button
</Button>
```

### 4. 可访问性

组件内置可访问性支持，但建议添加 `aria-label`：

```tsx
<IconButton
  icon="delete"
  aria-label="Delete item"
  onClick={handleDelete}
/>
```

## 📖 TypeScript 支持

所有组件都有完整的 TypeScript 类型定义：

```tsx
import type {
  ButtonProps,
  IconButtonProps,
  MenuItemProps,
  CategoryFilterProps
} from '@irisieason/qz-react';

// 使用类型
const buttonProps: ButtonProps = {
  variant: 'Primary',
  showIcon: true,
  icon: 'home',
  onClick: handleClick
};
```

## 🐛 故障排除

### 组件不显示 / 页面白屏

**原因：** 忘记导入 CSS 文件

**解决方案：**
```tsx
// ⭐ 在应用入口文件中添加这一行
import '@irisieason/qz-react/dist/style.css';
```

### 图标不显示

```tsx
// ❌ 错误：忘记注册图标
import { Button } from '@irisieason/qz-react';
<Button showIcon icon="home">Home</Button>

// ✅ 正确：先注册图标
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';
addIcons(allIcons);

import { Button } from '@irisieason/qz-react';
<Button showIcon icon="home">Home</Button>
```

### 样式不生效

样式已自动导入，如果样式不生效，检查：
1. 是否正确安装了包
2. 是否有 CSS 冲突
3. 是否使用了正确的类名

### 组件不响应点击

检查是否设置了 `disabled` 或 `state="Disabled"`：

```tsx
// ❌ 按钮被禁用
<Button disabled onClick={handleClick}>Click</Button>

// ✅ 移除 disabled
<Button onClick={handleClick}>Click</Button>
```

## 📚 更多资源

- **Storybook 文档**: 运行 `pnpm run storybook` 查看所有组件的交互式文档
- **GitHub 仓库**: https://github.com/irisieason/QZ
- **包地址**: https://github.com/irisieason/QZ/packages

---

**版本**: 1.0.5  
**最后更新**: 2025-01-28
