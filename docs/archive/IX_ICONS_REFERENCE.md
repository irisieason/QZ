# ix-icons 图标名称参考

## 重要提示

⚠️ **图标命名规则：**
- TypeScript 导入使用：`iconCamelCase` (例如: `iconCheck`)
- Web Component 中使用：`kebab-case` (例如: `check`)

## 常用图标列表

### 操作类图标

| TypeScript 导入 | Web Component 名称 | 说明 |
|----------------|-------------------|------|
| `iconCheck` | `check` | 确认/勾选 |
| `iconClose` | `close` | 关闭 |
| `iconAdd` | `add` | 添加 |
| `iconTrashcan` | `trashcan` | 删除 |
| `iconEditDocument` | `edit-document` | 编辑文档 |
| `iconRefresh` | `refresh` | 刷新 |
| `iconDownload` | `download` | 下载 |
| `iconUpload` | `upload` | 上传 |
| `iconSearch` | `search` | 搜索 |

### 导航类图标

| TypeScript 导入 | Web Component 名称 | 说明 |
|----------------|-------------------|------|
| `iconChevronRight` | `chevron-right` | 右箭头 |
| `iconChevronLeft` | `chevron-left` | 左箭头 |
| `iconChevronUp` | `chevron-up` | 上箭头 |
| `iconChevronDown` | `chevron-down` | 下箭头 |

### 状态类图标

| TypeScript 导入 | Web Component 名称 | 说明 |
|----------------|-------------------|------|
| `iconInfo` | `info` | 信息 |
| `iconWarning` | `warning` | 警告 |
| `iconError` | `error` | 错误 |
| `iconSuccess` | `success` | 成功 |

### 其他常用图标

| TypeScript 导入 | Web Component 名称 | 说明 |
|----------------|-------------------|------|
| `iconCheckbox` | `checkbox` | 复选框 |
| `iconCheckboxEmpty` | `checkbox-empty` | 空复选框 |
| `iconCloseSmall` | `close-small` | 小关闭图标 |
| `iconAddCircle` | `add-circle` | 圆形添加 |

## 使用示例

### 正确的使用方式 ✅

```typescript
// 1. 导入图标
import { addIcons } from '@irisieason/ix-icons';
import { iconCheck, iconClose } from '@irisieason/ix-icons/icons';

// 2. 注册图标
addIcons({ iconCheck, iconClose });

// 3. 使用时转换为 kebab-case
<ix-icon name="check" />      // ✅ 正确
<ix-icon name="close" />      // ✅ 正确
```

### 错误的使用方式 ❌

```typescript
// ❌ 错误：使用了不存在的图标名
import { iconCheckCircle } from '@irisieason/ix-icons/icons';
// Error: iconCheckCircle 不存在

// ❌ 错误：Web Component 中使用 camelCase
<ix-icon name="checkCircle" />
// 应该使用: <ix-icon name="check" />

// ❌ 错误：Web Component 中使用 TypeScript 变量名
<ix-icon name="iconCheck" />
// 应该使用: <ix-icon name="check" />
```

## 如何查找图标

### 方法 1：查看类型定义文件

```bash
# Windows
type node_modules\@irisieason\ix-icons\icons\index.d.ts

# macOS/Linux
cat node_modules/@irisieason/ix-icons/icons/index.d.ts
```

### 方法 2：搜索特定图标

```bash
# Windows PowerShell
type node_modules\@irisieason\ix-icons\icons\index.d.ts | Select-String -Pattern "iconCheck"

# macOS/Linux
grep "iconCheck" node_modules/@irisieason/ix-icons/icons/index.d.ts
```

### 方法 3：查看 SVG 文件

```bash
# Windows
dir node_modules\@irisieason\ix-icons\svg

# macOS/Linux
ls node_modules/@irisieason/ix-icons/svg
```

## 命名转换规则

### TypeScript → Web Component

```
iconCheckCircle  →  check-circle
iconEditDocument →  edit-document
iconAddUser      →  add-user
iconCloseSmall   →  close-small
```

**规则：**
1. 移除 `icon` 前缀
2. 将 camelCase 转换为 kebab-case

### 实用转换函数

```typescript
// 将 TypeScript 图标名转换为 Web Component 名称
function iconNameToKebab(iconName: string): string {
  return iconName
    .replace(/^icon/, '')  // 移除 icon 前缀
    .replace(/([A-Z])/g, '-$1')  // 在大写字母前添加 -
    .toLowerCase()  // 转小写
    .replace(/^-/, '');  // 移除开头的 -
}

// 示例
iconNameToKebab('iconCheckCircle')  // → 'check-circle'
iconNameToKebab('iconEditDocument') // → 'edit-document'
```

## 完整图标列表

查看完整的图标列表，请访问：
- [Siemens iX 图标库](https://ix.siemens.io/docs/icon-library/icons)
- 或查看本地文件：`node_modules/@irisieason/ix-icons/icons/index.d.ts`

## 常见错误及解决方案

### 错误 1: 图标不存在

```
Error: The requested module does not provide an export named 'iconCheckCircle'
```

**原因：** 图标名称拼写错误或不存在

**解决：** 
1. 检查类型定义文件确认正确的图标名
2. 使用搜索功能查找相似的图标名

### 错误 2: 图标不显示

```tsx
<ix-icon name="checkCircle" />  // 不显示
```

**原因：** Web Component 中使用了错误的命名格式

**解决：** 使用 kebab-case
```tsx
<ix-icon name="check-circle" />  // ✅ 正确
```

### 错误 3: 图标未注册

**原因：** 忘记调用 `addIcons()`

**解决：**
```typescript
import { addIcons } from '@irisieason/ix-icons';
import { iconCheck } from '@irisieason/ix-icons/icons';

// 必须先注册
addIcons({ iconCheck });

// 然后才能使用
<ix-icon name="check" />
```

## 项目中已注册的图标

当前在 `src/icons.ts` 中已注册的图标：

- `iconCheck` → `check`
- `iconClose` → `close`
- `iconAdd` → `add`
- `iconEditDocument` → `edit-document`
- `iconTrashcan` → `trashcan`
- `iconDownload` → `download`
- `iconUpload` → `upload`
- `iconSearch` → `search`
- `iconRefresh` → `refresh`
- `iconChevronRight` → `chevron-right`
- `iconChevronLeft` → `chevron-left`
- `iconChevronUp` → `chevron-up`
- `iconChevronDown` → `chevron-down`
- `iconInfo` → `info`
- `iconWarning` → `warning`
- `iconError` → `error`
- `iconSuccess` → `success`

如需使用其他图标，请在使用前先注册。
