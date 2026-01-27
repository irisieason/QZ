# 组件修复文档 - v1.0.5

## 修复日期
2025-01-27

## 修复内容

### 1. CategoryFilter 受控模式修复

#### 问题描述
作为受控组件时，传入 `value` 和 `onChange` 会导致无法输入。

#### 根本原因
在 `CategoryFilter.hooks.ts` 的 `handleChange` 函数中，调用顺序不正确：
- 先调用 `setInputValue` 更新内部状态
- 后调用 `onChange` 通知父组件

这导致在受控模式下，父组件的 `value` 更新会被内部状态覆盖。

#### 修复方案
调整 `handleChange` 中的调用顺序：
1. 先调用 `onChange` 让父组件更新 `value`
2. 后调用 `setInputValue` 更新内部状态（仅在非受控模式下生效）
3. 添加 `disabled` 和 `readOnly` 检查，禁用或只读时不处理输入

```typescript
// 修复后的代码
const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
  if (disabled || readOnly) {
    return; // 禁用或只读时不处理输入
  }
  
  const newValue = event.target.value;
  
  // 先调用 onChange（让父组件更新 value）
  onChangeRef.current?.(newValue, event);
  
  // 然后更新内部状态（仅在非受控模式下生效）
  setInputValue(newValue);
}, [setInputValue, disabled, readOnly]);
```

#### 使用示例

**受控模式（现在可以正常工作）：**
```tsx
const [searchValue, setSearchValue] = useState('');

<CategoryFilter
  value={searchValue}
  onChange={(value) => setSearchValue(value)}
  onSearch={handleSearch}
/>
```

**非受控模式：**
```tsx
<CategoryFilter
  defaultValue="initial"
  onSearch={handleSearch}
/>
```

---

### 2. ApplicationMenu + AvatarButtonMenu 状态联动

#### 问题描述
ApplicationMenu 的展开状态无法自动传递给 AvatarButtonMenu，用户需要手动同步状态。

#### 根本原因
两个组件之间没有状态共享机制，AvatarButtonMenu 无法感知 ApplicationMenu 的 `expanded` 状态。

#### 修复方案
创建 React Context 用于状态共享：

1. **创建 ApplicationMenuContext**（`src/components/ApplicationMenu/ApplicationMenuContext.tsx`）：
   ```typescript
   interface ApplicationMenuContextValue {
     expanded: boolean;
   }
   
   const ApplicationMenuContext = createContext<ApplicationMenuContextValue | null>(null);
   
   export const ApplicationMenuProvider: React.FC<{
     expanded: boolean;
     children: React.ReactNode;
   }> = ({ expanded, children }) => {
     return (
       <ApplicationMenuContext.Provider value={{ expanded }}>
         {children}
       </ApplicationMenuContext.Provider>
     );
   };
   
   export function useApplicationMenuContext(): ApplicationMenuContextValue | null {
     return useContext(ApplicationMenuContext);
   }
   ```

2. **ApplicationMenu 提供 Context**：
   ```typescript
   return (
     <ApplicationMenuProvider expanded={expanded}>
       <div className={menuClasses}>
         {/* 菜单内容 */}
       </div>
     </ApplicationMenuProvider>
   );
   ```

3. **AvatarButtonMenu 消费 Context**：
   ```typescript
   export const AvatarButtonMenu: React.FC<AvatarButtonMenuProps> = ({
     expand: propExpand,
     // ... 其他属性
   }) => {
     // 尝试从 ApplicationMenu Context 获取 expanded 状态
     const menuContext = useApplicationMenuContext();
     
     // 优先使用 Context 中的 expanded，其次使用 prop，最后默认为 true
     const expand = menuContext?.expanded ?? propExpand ?? true;
     
     // ... 组件实现
   };
   ```

#### 使用示例

**自动联动（推荐）：**
```tsx
<ApplicationMenu expanded={isExpanded}>
  <AvatarButtonMenu>
    {/* AvatarButtonMenu 会自动使用 ApplicationMenu 的 expanded 状态 */}
    <Avatar text="JD" />
  </AvatarButtonMenu>
</ApplicationMenu>
```

**手动控制（仍然支持）：**
```tsx
<AvatarButtonMenu expand={false}>
  <Avatar text="JD" />
</AvatarButtonMenu>
```

#### 优先级规则
AvatarButtonMenu 的 `expand` 属性优先级：
1. **Context 中的 expanded**（如果在 ApplicationMenu 内）
2. **prop 中的 expand**（如果显式传入）
3. **默认值 true**（如果都没有）

---

### 3. 组件内部图标自动注册

#### 问题描述
组件内部使用的图标（如 CategoryFilter 的搜索图标和清除按钮）在用户项目中无法显示。

#### 根本原因
`ix-icons` 使用 Web Components，图标需要先注册才能使用。虽然组件内部使用了 `<ix-icon>`，但图标本身需要在应用启动时注册。

之前的 `src/icons.ts` 只注册了 Web Component，但没有注册组件内部使用的图标。

#### 修复方案
在 `src/icons.ts` 中自动注册所有组件使用的图标：

```typescript
import { defineCustomElements } from '@irisieason/ix-icons/loader';
import { addIcons } from '@irisieason/ix-icons';

// Import all icons used by components
import {
  iconSearch,
  iconClose,
  iconChevronRightSmall,
  iconArrowLeft,
} from '@irisieason/ix-icons/icons';

// Register the <ix-icon> web component
defineCustomElements();

// Auto-register all icons used by components
addIcons({
  search: iconSearch,
  close: iconClose,
  'chevron-right-small': iconChevronRightSmall,
  'arrow-left': iconArrowLeft,
});
```

#### 自动注册的图标

| Icon Name | Used In | Purpose |
|-----------|---------|---------|
| `search` | CategoryFilter | Search icon |
| `close` | CategoryFilter | Clear button |
| `chevron-right-small` | EventListItem | Navigation arrow |
| `arrow-left` | ContentHeader | Back button |
| `double-chevron-left` | ApplicationMenu | Collapse menu button |
| `double-chevron-right` | ApplicationMenu | Expand menu button |

#### 使用示例

**现在可以直接使用，无需手动注册：**
```tsx
import { CategoryFilter } from '@irisieason/qz-react';

// ✅ 图标自动工作
<CategoryFilter searchIcon={true} clearable={true} />
```

**用户提供的图标仍需注册：**
```tsx
import { addIcons } from '@irisieason/qz-react';
import { iconHome, iconSettings } from '@irisieason/ix-icons/icons';

// 注册用户使用的图标
addIcons({
  home: iconHome,
  settings: iconSettings,
});

// 现在可以使用
<Button icon="home" showIcon={true}>Home</Button>
<MenuItem icon="settings" label="Settings" />
```

---

### 4. Cardcontainer 自适应尺寸修复

#### 问题描述
Cardcontainer 组件使用了固定的宽度和高度（214px × 120px），导致内容无法完整展示。

#### 根本原因
CSS 中设置了固定尺寸：
```css
.cardcontainer {
  width: 214px;   /* 固定宽度 */
  height: 120px;  /* 固定高度 */
}
```

这导致：
- 大内容被裁剪
- 小内容浪费空间
- 无法根据实际内容动态调整

#### 修复方案
修改 CSS，使用 `fit-content` 让容器自适应内容：

```css
.cardcontainer {
  width: fit-content;   /* 自适应内容宽度 */
  height: fit-content;  /* 自适应内容高度 */
  min-width: 120px;     /* 最小宽度 */
  min-height: 80px;     /* 最小高度 */
}

.cardcontainer__content {
  flex: 1 0 auto;      /* 允许内容撑开 */
  overflow: visible;   /* 允许内容完整显示 */
}
```

#### 使用示例

**小内容 - 容器自动缩小：**
```tsx
<Cardcontainer>
  <div style={{ padding: '12px' }}>
    <ix-icon name="check" size="16" />
    <span>Small</span>
  </div>
</Cardcontainer>
```

**大内容 - 容器自动扩大：**
```tsx
<Cardcontainer>
  <div style={{ padding: '24px', maxWidth: '400px' }}>
    <h3>Large Content</h3>
    <p>This card automatically adjusts its size.</p>
    <button>Action</button>
  </div>
</Cardcontainer>
```

#### 效果
- ✅ 容器根据内容自动调整尺寸
- ✅ 所有内容完整显示
- ✅ 空间利用更合理
- ✅ 保持最小尺寸限制（120px × 80px）

---

## 影响的文件

### 修改的文件
- `src/components/CategoryFilter/CategoryFilter.hooks.ts` - 修复受控模式逻辑
- `src/components/ApplicationMenu/ApplicationMenu.tsx` - 添加 Context Provider
- `src/components/ApplicationMenu/index.ts` - 导出 Context
- `src/components/AvatarButtonMenu/AvatarButtonMenu.tsx` - 消费 Context
- `src/icons.ts` - 自动注册组件使用的图标

### 新增的文件
- `src/components/ApplicationMenu/ApplicationMenuContext.tsx` - Context 定义
- `docs/ICON_USAGE.md` - 图标使用文档

---

## 测试建议

### CategoryFilter 测试
1. **受控模式测试**：
   ```tsx
   const [value, setValue] = useState('');
   
   <CategoryFilter
     value={value}
     onChange={(v) => setValue(v)}
   />
   ```
   - 输入文字应该正常显示
   - 清除按钮应该正常工作
   - onChange 应该正确触发

2. **非受控模式测试**：
   ```tsx
   <CategoryFilter
     defaultValue="test"
     onChange={(v) => console.log(v)}
   />
   ```
   - 初始值应该显示
   - 输入应该正常工作

3. **禁用/只读测试**：
   ```tsx
   <CategoryFilter disabled={true} />
   <CategoryFilter readOnly={true} />
   ```
   - 禁用时不能输入
   - 只读时不能输入

### ApplicationMenu + AvatarButtonMenu 测试
1. **自动联动测试**：
   ```tsx
   const [expanded, setExpanded] = useState(true);
   
   <ApplicationMenu 
     expanded={expanded}
     onToggleExpand={() => setExpanded(!expanded)}
   >
     <AvatarButtonMenu>
       <Avatar text="JD" />
     </AvatarButtonMenu>
   </ApplicationMenu>
   ```
   - 切换 ApplicationMenu 展开状态
   - AvatarButtonMenu 应该自动跟随展开/收起

2. **独立使用测试**：
   ```tsx
   <AvatarButtonMenu expand={false}>
     <Avatar text="JD" />
   </AvatarButtonMenu>
   ```
   - 应该显示为收起状态
   - 不依赖 ApplicationMenu

---

## 版本更新

### 从 v1.0.4 升级到 v1.0.5

**无需修改现有代码**，这些修复是向后兼容的：

1. **CategoryFilter**：
   - 受控模式现在可以正常工作
   - 非受控模式保持不变
   - 所有现有用法都兼容

2. **ApplicationMenu + AvatarButtonMenu**：
   - 新增自动联动功能
   - 现有的手动控制方式仍然有效
   - 可以选择性地移除手动同步代码

---

## 发布说明

### v1.0.5 (2025-01-27)

**Bug Fixes:**
- 修复 CategoryFilter 受控模式无法输入的问题
- 修复 ApplicationMenu 和 AvatarButtonMenu 状态无法自动联动的问题
- 修复组件内部图标无法显示的问题（自动注册所有组件使用的图标）

**Features:**
- 新增 ApplicationMenuContext 用于组件间状态共享
- AvatarButtonMenu 现在可以自动感知 ApplicationMenu 的展开状态
- 组件内部使用的图标现在自动注册，无需用户手动注册

**Breaking Changes:**
- 无

---

## 相关文档

- [CategoryFilter 组件文档](../components/CategoryFilter/README.md)
- [ApplicationMenu 组件文档](../components/ApplicationMenu/README.md)
- [AvatarButtonMenu 组件文档](../components/AvatarButtonMenu/README.md)
- [React 受控/非受控组件最佳实践](https://react.dev/learn/sharing-state-between-components)
- [React Context 使用指南](https://react.dev/learn/passing-data-deeply-with-context)
