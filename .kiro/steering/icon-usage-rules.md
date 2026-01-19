# 图标使用规则

## 核心原则

**组件库中的所有图标必须使用 `@irisieason/ix-icons` 包，严禁自行绘制或使用其他图标库。**

## 图标使用规则

### 1. 唯一图标来源

✅ **允许的操作：**
- 使用 `@irisieason/ix-icons` 包中的图标
- 使用 `<ix-icon>` Web Component 渲染图标
- 通过 `name` 属性指定图标名称
- 使用 `size` 属性控制图标尺寸

❌ **禁止的操作：**
- 自行绘制 SVG 图标
- 使用其他图标库（如 Font Awesome、Material Icons 等）
- 内联 SVG 代码
- 使用图片文件（PNG、JPG 等）作为图标
- 复制粘贴 SVG 代码到组件中

### 2. 图标注册

在使用图标前，必须先注册图标：

```typescript
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);
```

**注册位置：**
- Storybook 文件：在 `.stories.tsx` 文件顶部注册
- 示例文件：在 `.example.tsx` 文件顶部注册
- 测试文件：在 `.test.tsx` 文件顶部注册
- 应用入口：在应用的主入口文件注册一次即可

### 3. 图标使用方式

#### 在 JSX 中使用

```tsx
// ✅ 正确：使用 ix-icon Web Component
<ix-icon name="home" size="24" />

// ✅ 正确：在 span 中包裹
<span className="icon-wrapper">
  <ix-icon name="settings" size="16" />
</span>

// ❌ 错误：自行绘制 SVG
<svg width="24" height="24">
  <path d="M..." />
</svg>

// ❌ 错误：使用其他图标库
<FontAwesomeIcon icon="home" />
<i className="material-icons">home</i>
```

#### 图标属性

```tsx
// name: 图标名称（必需）
<ix-icon name="home" />

// size: 图标尺寸（可选，默认 24）
<ix-icon name="home" size="16" />
<ix-icon name="home" size="24" />
<ix-icon name="home" size="32" />
```

### 4. 组件中的图标属性

当组件需要接收图标时，使用字符串类型的 `icon` 属性：

```typescript
// ✅ 正确：使用字符串类型
interface ComponentProps {
  /** 图标名称（ix-icon name） */
  icon?: string;
}

// 使用示例
<Button icon="home" showIcon={true} />
<IconButton icon="settings" />
<MenuItem icon="dashboard" label="Dashboard" />

// ❌ 错误：使用 React 组件类型
interface ComponentProps {
  icon?: React.ReactNode;  // 不要这样做
  icon?: JSX.Element;      // 不要这样做
}
```

### 5. Storybook 中的图标选择器

在 Storybook 中，图标属性必须使用下拉选择器：

```typescript
import { availableIcons } from './icon-list';

export default {
  argTypes: {
    icon: {
      control: 'select',
      options: availableIcons,
      description: '图标名称（来自 ix-icons）',
    },
  },
};
```

**不要使用文本输入：**
```typescript
// ❌ 错误
argTypes: {
  icon: {
    control: 'text',  // 不要使用 text
  },
}
```

### 6. 可用图标列表

ix-icons 包提供了 1400+ 个图标，常用图标包括：

**导航类：**
- `home` - 首页
- `menu` - 菜单
- `arrow-left`, `arrow-right` - 箭头
- `chevron-left`, `chevron-right` - 尖括号

**操作类：**
- `add`, `plus` - 添加
- `delete`, `trash` - 删除
- `edit`, `pencil` - 编辑
- `save`, `disk` - 保存
- `close`, `x` - 关闭

**状态类：**
- `check`, `checkmark` - 完成
- `info` - 信息
- `warning` - 警告
- `error` - 错误
- `success` - 成功

**功能类：**
- `search` - 搜索
- `settings`, `cogwheel` - 设置
- `user` - 用户
- `calendar` - 日历
- `clock` - 时钟

完整图标列表请参考：
- 在线文档：https://www.npmjs.com/package/@irisieason/ix-icons
- 本地文件：`src/components/*/icon-list.ts`

### 7. 图标尺寸规范

根据设计系统，图标尺寸应遵循以下规范：

```typescript
// 标准尺寸
size="12"  // 小图标（用于紧凑布局）
size="16"  // 中小图标（用于文本内联）
size="24"  // 标准图标（默认尺寸，最常用）
size="32"  // 大图标（用于突出显示）

// ✅ 正确：使用标准尺寸
<ix-icon name="home" size="24" />

// ❌ 错误：使用非标准尺寸
<ix-icon name="home" size="20" />  // 不推荐
<ix-icon name="home" size="28" />  // 不推荐
```

### 8. 图标样式控制

通过 CSS 控制图标颜色和其他样式：

```css
/* ✅ 正确：通过 color 属性控制颜色 */
.icon-wrapper {
  color: var(--color-primary);
}

.icon-wrapper ix-icon {
  color: inherit;
}

/* ✅ 正确：使用设计令牌 */
.button__icon {
  color: var(--color-contrast-text);
}

/* ❌ 错误：不要直接修改 SVG 内部 */
.icon-wrapper svg path {
  fill: red;  /* 避免这样做 */
}
```

### 9. 加载状态图标

对于加载状态，可以使用 ix-icons 的加载图标或自定义 SVG 动画：

```tsx
// ✅ 选项 1：使用 ix-icons 的加载图标
<ix-icon name="spinner" size="24" />

// ✅ 选项 2：自定义加载动画（仅限加载状态）
<span className="button__spinner">
  <svg width="24" height="24" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 12 12"
        to="360 12 12"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
</span>
```

**注意：** 加载动画是唯一允许自定义 SVG 的场景，因为它是动态效果而非静态图标。

### 10. TypeScript 类型定义

```typescript
// ✅ 正确：图标属性类型定义
interface ComponentProps {
  /** 图标名称（ix-icon name） */
  icon?: string;
  
  /** 图标尺寸 */
  iconSize?: '12' | '16' | '24' | '32';
}

// ❌ 错误：不要使用其他类型
interface ComponentProps {
  icon?: React.ReactNode;     // 错误
  icon?: JSX.Element;         // 错误
  icon?: React.ComponentType; // 错误
}
```

### 11. 图标可访问性

确保图标具有适当的可访问性：

```tsx
// ✅ 正确：提供 aria-label
<button aria-label="Settings">
  <ix-icon name="settings" size="24" />
</button>

// ✅ 正确：图标与文本一起使用
<button>
  <ix-icon name="save" size="24" />
  <span>Save</span>
</button>

// ❌ 错误：纯图标按钮没有标签
<button>
  <ix-icon name="settings" size="24" />
</button>
```

## 检查清单

在提交代码前，确认：

- [ ] 所有图标都来自 `@irisieason/ix-icons` 包
- [ ] 使用 `<ix-icon>` Web Component 渲染图标
- [ ] 已在文件顶部注册图标（Storybook/示例/测试）
- [ ] 图标属性使用字符串类型（`icon?: string`）
- [ ] Storybook 中使用下拉选择器而非文本输入
- [ ] 图标尺寸使用标准值（12/16/24/32）
- [ ] 没有自行绘制 SVG 图标
- [ ] 没有使用其他图标库
- [ ] 图标具有适当的可访问性标签

## 违规示例

### 违规 1: 自行绘制图标

```tsx
// ❌ 错误：自行绘制 SVG
const CustomIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
  </svg>
);

// ✅ 正确：使用 ix-icons
<ix-icon name="shield" size="24" />
```

### 违规 2: 使用其他图标库

```tsx
// ❌ 错误：使用 Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
<FontAwesomeIcon icon="home" />

// ❌ 错误：使用 Material Icons
<i className="material-icons">home</i>

// ✅ 正确：使用 ix-icons
<ix-icon name="home" size="24" />
```

### 违规 3: 错误的属性类型

```typescript
// ❌ 错误：使用 React 组件类型
interface ButtonProps {
  icon?: React.ReactNode;
}

<Button icon={<CustomIcon />} />

// ✅ 正确：使用字符串类型
interface ButtonProps {
  icon?: string;
}

<Button icon="home" />
```

### 违规 4: Storybook 使用文本输入

```typescript
// ❌ 错误：使用文本输入
argTypes: {
  icon: {
    control: 'text',
  },
}

// ✅ 正确：使用下拉选择器
import { availableIcons } from './icon-list';

argTypes: {
  icon: {
    control: 'select',
    options: availableIcons,
  },
}
```

## 异常情况

以下是唯一允许自定义 SVG 的场景：

1. **加载动画**：旋转的圆圈或其他加载指示器
2. **品牌 Logo**：公司或产品的特定 Logo（但应尽量使用 ix-icons 中的 logo 图标）

除此之外，所有图标都必须使用 ix-icons 包。

## 总结

**核心原则：ix-icons 是组件库中图标的唯一来源。**

所有组件必须使用 `@irisieason/ix-icons` 包提供的图标，通过 `<ix-icon>` Web Component 渲染。严禁自行绘制图标或使用其他图标库。这确保了：

1. **设计一致性**：所有图标风格统一
2. **维护性**：集中管理，易于更新
3. **性能优化**：图标库已优化
4. **可访问性**：图标库提供了良好的可访问性支持
