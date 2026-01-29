# AppFrame 组件

AppFrame 是一个复合组件，组合了 ApplicationHeader 和 ApplicationMenu，提供完整的应用框架布局。

## 功能特性

- ✅ 组合 ApplicationHeader 和 ApplicationMenu
- ✅ 提供完整的应用框架布局
- ✅ 支持菜单展开/收起
- ✅ 支持应用切换按钮
- ✅ 支持头像显示
- ✅ 灵活的内容区域
- ✅ 响应式设计
- ✅ 完整的 TypeScript 类型支持

## 基础用法

```tsx
import { AppFrame } from '@irisieason/ix-components';
import { Avatar } from '@irisieason/ix-components';
import { AvatarButtonMenu } from '@irisieason/ix-components';
import { MenuItem, MenuItemList } from '@irisieason/ix-components';

function App() {
  return (
    <AppFrame
      appName="My Application"
      avatar={true}
      menuExpanded={false}
      headerAvatar={<Avatar text="JD" />}
      menuAvatarSection={
        <AvatarButtonMenu email="john.doe@company.com" role="Administrator">
          <Avatar text="JD" />
        </AvatarButtonMenu>
      }
      menuList={
        <MenuItemList>
          <MenuItem icon="home" label="Dashboard" />
          <MenuItem icon="bar-chart-2" label="Analytics" />
          <MenuItem icon="users" label="Users" />
          <MenuItem icon="settings" label="Settings" />
        </MenuItemList>
      }
    >
      <div>
        <h1>Main Content</h1>
        <p>Your application content goes here...</p>
      </div>
    </AppFrame>
  );
}
```

## 属性说明

### Figma 视觉属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `appName` | `string` | `'Application name'` | 应用名称 |
| `avatar` | `boolean` | `true` | 是否显示头像 |
| `appSwitch` | `boolean` | `false` | 是否显示应用切换按钮 |
| `menuExpanded` | `boolean` | `false` | 菜单是否展开 |

### Slot 插槽属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `headerAvatar` | `React.ReactNode` | Header 中的 Avatar 组件 |
| `menuAvatarSection` | `React.ReactNode` | Menu 中的 AvatarButtonMenu 组件 |
| `menuList` | `React.ReactNode` | Menu 中的菜单项列表 |
| `children` | `React.ReactNode` | 主内容区域 |

### 扩展属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `onAppSwitchClick` | `(event: MouseEvent) => void` | 应用切换按钮点击回调 |
| `onMenuToggle` | `(event: MouseEvent) => void` | 菜单展开/折叠切换回调 |
| `className` | `string` | 自定义 CSS 类名 |
| `style` | `CSSProperties` | 自定义样式 |
| `aria-label` | `string` | 可访问性标签 |

## 使用示例

### 基础布局

```tsx
<AppFrame
  appName="Dashboard"
  headerAvatar={<Avatar text="JD" />}
  menuAvatarSection={
    <AvatarButtonMenu email="user@example.com" role="User">
      <Avatar text="JD" />
    </AvatarButtonMenu>
  }
  menuList={
    <MenuItemList>
      <MenuItem icon="home" label="Home" />
      <MenuItem icon="settings" label="Settings" />
    </MenuItemList>
  }
>
  <h1>Welcome</h1>
</AppFrame>
```

### 展开菜单

```tsx
<AppFrame
  appName="Dashboard"
  menuExpanded={true}
  headerAvatar={<Avatar text="JD" />}
  menuAvatarSection={
    <AvatarButtonMenu email="user@example.com" role="User">
      <Avatar text="JD" />
    </AvatarButtonMenu>
  }
  menuList={
    <MenuItemList>
      <MenuItem icon="home" label="Home" />
      <MenuItem icon="settings" label="Settings" />
    </MenuItemList>
  }
>
  <h1>Welcome</h1>
</AppFrame>
```

### 带应用切换按钮

```tsx
<AppFrame
  appName="Dashboard"
  appSwitch={true}
  onAppSwitchClick={() => console.log('Switch app')}
  headerAvatar={<Avatar text="JD" />}
  menuAvatarSection={
    <AvatarButtonMenu email="user@example.com" role="User">
      <Avatar text="JD" />
    </AvatarButtonMenu>
  }
  menuList={
    <MenuItemList>
      <MenuItem icon="home" label="Home" />
      <MenuItem icon="settings" label="Settings" />
    </MenuItemList>
  }
>
  <h1>Welcome</h1>
</AppFrame>
```

### 带通知的菜单项

```tsx
<AppFrame
  appName="Dashboard"
  headerAvatar={<Avatar text="JD" />}
  menuAvatarSection={
    <AvatarButtonMenu email="user@example.com" role="User">
      <Avatar text="JD" />
    </AvatarButtonMenu>
  }
  menuList={
    <MenuItemList>
      <MenuItem icon="home" label="Home" />
      <MenuItem icon="bell" label="Notifications" notification notificationCount={5} />
      <MenuItem icon="mail" label="Messages" notification notificationCount={12} />
    </MenuItemList>
  }
>
  <h1>Welcome</h1>
</AppFrame>
```

### 完整功能

```tsx
<AppFrame
  appName="Full Featured App"
  avatar={true}
  appSwitch={true}
  menuExpanded={true}
  headerAvatar={<Avatar text="FF" />}
  menuAvatarSection={
    <AvatarButtonMenu 
      email="admin@company.com" 
      role="Administrator"
      onProfileClick={() => console.log('Profile')}
      onLogoutClick={() => console.log('Logout')}
    >
      <Avatar text="FF" />
    </AvatarButtonMenu>
  }
  menuList={
    <MenuItemList>
      <MenuItem icon="home" label="Dashboard" />
      <MenuItem icon="bar-chart-2" label="Analytics" />
      <MenuItem icon="users" label="Users" />
      <MenuItem icon="settings" label="Settings" />
      <MenuItem icon="bell" label="Notifications" notification notificationCount={7} />
    </MenuItemList>
  }
  onAppSwitchClick={() => console.log('App switch')}
  onMenuToggle={() => console.log('Menu toggle')}
>
  <div>
    <h1>Main Content</h1>
    <p>Your application content...</p>
  </div>
</AppFrame>
```

## 组件结构

```
AppFrame
├── ApplicationHeader (顶部)
│   ├── Logo
│   ├── App Name
│   └── Avatar (可选)
└── Body
    ├── ApplicationMenu (左侧)
    │   ├── Toggle Button
    │   ├── AvatarButtonMenu (可选)
    │   └── MenuItemList
    └── Content Area (主内容)
        └── children
```

## 样式定制

### 使用 className

```tsx
<AppFrame
  className="custom-app-frame"
  appName="Custom App"
  // ... 其他属性
>
  {/* 内容 */}
</AppFrame>
```

### 使用 style

```tsx
<AppFrame
  style={{ backgroundColor: '#000' }}
  appName="Custom App"
  // ... 其他属性
>
  {/* 内容 */}
</AppFrame>
```

## 可访问性

AppFrame 组件遵循 WCAG 2.1 标准：

- ✅ 使用语义化的 HTML 结构
- ✅ 支持键盘导航
- ✅ 提供 ARIA 标签
- ✅ 支持屏幕阅读器

## 响应式设计

AppFrame 组件支持响应式布局：

- **桌面设备** (>1024px): 完整布局
- **平板设备** (768px-1024px): 调整内边距
- **移动设备** (<768px): 菜单可能需要绝对定位

## 注意事项

1. **必需的子组件**: AppFrame 需要配合 Avatar、AvatarButtonMenu、MenuItem 和 MenuItemList 使用
2. **图标注册**: 使用前需要注册 ix-icons
3. **全屏布局**: AppFrame 默认占据整个视口高度 (100vh)
4. **内容滚动**: 主内容区域自动支持滚动

## 相关组件

- [ApplicationHeader](../ApplicationHeader/README.md) - 应用头部组件
- [ApplicationMenu](../ApplicationMenu/README.md) - 应用菜单组件
- [Avatar](../Avatar/README.md) - 头像组件
- [AvatarButtonMenu](../AvatarButtonMenu/README.md) - 头像按钮菜单组件
- [MenuItem](../MenuItem/README.md) - 菜单项组件
- [MenuItemList](../MenuItemList/README.md) - 菜单项列表组件
