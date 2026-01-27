# 图标使用快速参考

## 🎯 核心概念

### 两种图标

| 类型 | 是否需要注册 | 示例 |
|------|-------------|------|
| **组件内部图标** | ❌ 不需要（自动注册） | CategoryFilter 的搜索图标 |
| **用户传入图标** | ✅ 需要（手动注册） | `<Button icon="home" />` |

## 📝 三步使用用户图标

### 1️⃣ 导入

```tsx
import { addIcons } from '@irisieason/qz-react';
import { iconHome, iconSettings } from '@irisieason/ix-icons/icons';
```

### 2️⃣ 注册（在应用入口）

```tsx
// main.tsx 或 App.tsx
addIcons({
  home: iconHome,
  settings: iconSettings,
});
```

### 3️⃣ 使用

```tsx
<Button icon="home" showIcon={true}>Home</Button>
<MenuItem icon="settings" label="Settings" />
```

## 🔍 常用图标速查

| 图标名称 | 导入名称 | 用途 |
|---------|---------|------|
| `home` | `iconHome` | 首页 |
| `settings` | `iconSettings` | 设置 |
| `user` | `iconUser` | 用户 |
| `dashboard` | `iconDashboard` | 仪表盘 |
| `notification` | `iconNotification` | 通知 |
| `search` | `iconSearch` | 搜索 |
| `add` | `iconAdd` | 添加 |
| `edit` | `iconEditDocument` | 编辑 |
| `delete` | `iconTrashcan` | 删除 |
| `save` | `iconSave` | 保存 |
| `close` | `iconClose` | 关闭 |
| `check` | `iconCheck` | 确认 |

## ✅ 自动注册的图标（无需操作）

这些图标在组件内部使用，已自动注册：

- `search` - CategoryFilter 搜索图标
- `close` - CategoryFilter 清除按钮
- `chevron-right-small` - EventListItem 箭头
- `arrow-left` - ContentHeader 返回按钮
- `double-chevron-left` - ApplicationMenu 收起按钮
- `double-chevron-right` - ApplicationMenu 展开按钮

## 🚨 常见错误

### ❌ 错误：图标不显示

```tsx
// 忘记注册
<Button icon="home" />  // ❌ 图标不显示
```

### ✅ 正确：先注册再使用

```tsx
// main.tsx
import { addIcons } from '@irisieason/qz-react';
import { iconHome } from '@irisieason/ix-icons/icons';

addIcons({ home: iconHome });

// App.tsx
<Button icon="home" />  // ✅ 图标正常显示
```

## 📚 完整文档

详细说明请查看：
- [图标注册指南（用户手册）](./ICON_REGISTRATION_GUIDE.md)
- [图标使用说明（技术文档）](./ICON_USAGE.md)
