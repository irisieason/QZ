# Avatar Component

Avatar 组件用于显示用户头像，支持占位符图标、用户首字母和用户照片三种模式。

## Figma 设计

此组件严格遵循 Figma 设计规范实现。所有属性都来自 Figma 定义。

## 属性

### Figma 定义的属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `text` | `string` | `'JD'` | 首字母文本 |
| `image` | `boolean` | `false` | 是否显示图片 |
| `initials` | `boolean` | `false` | 是否显示首字母 |

### 扩展属性（非 Figma 定义）

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `src` | `string` | - | 图片 URL |
| `alt` | `string` | `'User avatar'` | 图片 alt 文本 |
| `className` | `string` | `''` | 自定义类名 |
| `aria-label` | `string` | - | 可访问性标签 |

## 使用示例

### 基础用法

```tsx
import { Avatar } from '@your-org/component-library';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册图标
addIcons(allIcons);

function App() {
  return (
    <Avatar />
  );
}
```

### 占位符模式（默认）

```tsx
<Avatar />
// 或
<Avatar image={false} initials={false} />
```

### 首字母模式

```tsx
<Avatar text="JD" initials={true} />
```

### 图片模式

```tsx
<Avatar 
  image={true} 
  src="https://example.com/avatar.jpg"
  alt="John Doe"
/>
```

### 用户列表示例

```tsx
import { Avatar } from '@your-org/component-library';

function UserList() {
  const users = [
    { id: 1, name: 'John Doe', initials: 'JD', photo: 'https://example.com/john.jpg' },
    { id: 2, name: 'Jane Smith', initials: 'JS', photo: null },
    { id: 3, name: 'Unknown User', initials: null, photo: null },
  ];

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar
            text={user.initials || 'U'}
            image={!!user.photo}
            initials={!user.photo && !!user.initials}
            src={user.photo || undefined}
            alt={user.name}
          />
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
}
```

## 模式说明

### 1. 占位符模式（Placeholder）

当用户未登录或无法获取用户信息时使用。显示一个用户图标。

```tsx
<Avatar />
```

**使用场景：**
- 未登录用户
- 无法获取用户信息
- 默认状态

### 2. 首字母模式（Initials）

显示用户姓名的首字母（通常是名和姓的首字母）。

```tsx
<Avatar text="JD" initials={true} />
```

**使用场景：**
- 用户已登录但没有头像照片
- 需要快速识别用户
- 轻量级用户标识

### 3. 图片模式（Image）

显示用户上传的头像照片。

```tsx
<Avatar 
  image={true} 
  src="https://example.com/avatar.jpg"
/>
```

**使用场景：**
- 用户已上传头像照片
- ID 提供商提供用户照片
- 需要真实用户头像

## 优先级规则

当多个属性同时设置时，遵循以下优先级：

1. **图片模式** (`image={true}`) - 最高优先级
2. **首字母模式** (`initials={true}`)
3. **占位符模式** - 默认

```tsx
// 即使设置了 initials，也会显示图片
<Avatar text="JD" image={true} initials={true} src="..." />
```

## 图标使用

Avatar 组件使用 `@irisieason/ix-icons` 包提供的 `user` 图标作为占位符。使用前需要注册图标：

```tsx
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

addIcons(allIcons);
```

## 可访问性

Avatar 组件遵循 WAI-ARIA 规范：

- 使用 `role="img"` 标识为图片
- 使用 `aria-label` 提供可访问性标签
- 图片模式下使用 `alt` 属性

```tsx
<Avatar 
  image={true} 
  src="..." 
  alt="John Doe's avatar"
  aria-label="John Doe"
/>
```

## 样式定制

Avatar 组件使用 CSS 变量进行样式定制，可以通过覆盖以下变量来自定义样式：

```css
:root {
  --color-component-3: rgba(255, 255, 255, 0.3);
  --color-std-text: #ffffff;
  --font-sans: 'Siemens Sans', sans-serif;
}
```

## 尺寸

当前 Avatar 组件固定尺寸为 32x32px，符合 Figma 设计规范。

## 注意事项

1. **图标注册**：使用前必须先注册 ix-icons 图标
2. **Figma 一致性**：所有 Figma 定义的属性都已实现，不要自行添加或修改
3. **扩展属性**：`src`、`alt`、`className`、`aria-label` 是扩展属性，用于技术实现
4. **图片加载**：确保提供的图片 URL 可访问，否则会显示占位符背景
5. **首字母长度**：建议首字母文本不超过 2 个字符
6. **ID 提供商**：使用图片模式时，确保 ID 提供商能够提供用户照片

## 相关组件

- [Button](../Button/README.md) - 按钮组件
- [IconButton](../IconButton/README.md) - 图标按钮组件
- [MenuItem](../MenuItem/README.md) - 菜单项组件
