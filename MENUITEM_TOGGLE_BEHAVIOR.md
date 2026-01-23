# MenuItem 切换选中行为说明

## 功能概述

MenuItem 组件现在支持**切换选中**功能：点击已选中的菜单项可以取消选中。

## 实现方式

### 代码实现

在 `MenuItem.tsx` 的 `handleClick` 函数中：

```typescript
const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
  // 只在非受控模式下更新内部状态（切换选中状态）
  if (controlledSelected === undefined) {
    setInternalSelected(!internalSelected);  // 切换状态
  }
  if (controlledState === undefined) {
    setInternalState('Default');
  }
  
  if (onClick) {
    onClick(event);
  }
};
```

关键点：`setInternalSelected(!internalSelected)` 实现了切换逻辑。

## 使用场景

### 1. 非受控模式（Uncontrolled Mode）

组件自动管理选中状态，支持切换：

```tsx
// 单个菜单项 - 点击选中，再次点击取消选中
<MenuItem 
  label="Dashboard" 
  icon="dashboard" 
  expanded={true}
/>
```

**行为：**
- 第一次点击 → 选中（显示蓝色边框和背景）
- 第二次点击 → 取消选中（恢复默认状态）
- 第三次点击 → 再次选中
- ...以此类推

**适用场景：**
- 单个独立的菜单项
- 多个可以同时选中的菜单项（如多选列表）
- 不需要互斥选择的场景

### 2. 受控模式（Controlled Mode）

父组件管理选中状态，切换逻辑由父组件决定：

```tsx
const [selectedItem, setSelectedItem] = useState('dashboard');

// 互斥选择 - 只能选中一个
<MenuItem 
  label="Dashboard" 
  icon="dashboard" 
  expanded={true}
  selected={selectedItem === 'dashboard'}
  onClick={() => setSelectedItem('dashboard')}
/>
<MenuItem 
  label="Analytics" 
  icon="chart" 
  expanded={true}
  selected={selectedItem === 'analytics'}
  onClick={() => setSelectedItem('analytics')}
/>
```

**行为：**
- 点击任意菜单项 → 该项选中，其他项取消选中
- 不支持点击取消选中（因为总有一个项被选中）

**如果需要切换行为，可以这样实现：**

```tsx
const [selectedItem, setSelectedItem] = useState<string>('');

<MenuItem 
  label="Dashboard" 
  icon="dashboard" 
  expanded={true}
  selected={selectedItem === 'dashboard'}
  onClick={() => setSelectedItem(
    selectedItem === 'dashboard' ? '' : 'dashboard'
  )}
/>
```

## Storybook 示例

### 1. ClickableItem Story

展示单个菜单项的切换行为：

```tsx
export const ClickableItem: Story = {
  render: () => (
    <MenuItem 
      label="Dashboard" 
      icon="dashboard" 
      variant="Main Item" 
      expanded={true}
    />
  ),
};
```

**测试步骤：**
1. 打开 Storybook → Components → MenuItem → ClickableItem
2. 点击菜单项 → 选中（蓝色边框）
3. 再次点击 → 取消选中（恢复默认）
4. 继续点击 → 持续切换

### 2. MultipleIndependentItems Story

展示多个独立菜单项，每个都可以独立切换：

```tsx
export const MultipleIndependentItems: Story = {
  render: () => (
    <>
      <MenuItem label="Dashboard" icon="dashboard" expanded={true} />
      <MenuItem label="Analytics" icon="chart" expanded={true} />
      <MenuItem label="Settings" icon="settings" expanded={true} />
    </>
  ),
};
```

**测试步骤：**
1. 打开 Storybook → Components → MenuItem → MultipleIndependentItems
2. 点击任意菜单项 → 该项选中
3. 点击其他菜单项 → 其他项也选中（可以多选）
4. 再次点击已选中的项 → 该项取消选中
5. 每个菜单项独立管理自己的状态

### 3. MenuList / InteractiveMenu Story

展示受控模式的互斥选择：

```tsx
export const MenuList: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState('dashboard');
    
    return (
      <>
        <MenuItem 
          label="Dashboard" 
          selected={selectedItem === 'dashboard'}
          onClick={() => setSelectedItem('dashboard')}
        />
        <MenuItem 
          label="Analytics" 
          selected={selectedItem === 'analytics'}
          onClick={() => setSelectedItem('analytics')}
        />
      </>
    );
  },
};
```

**测试步骤：**
1. 打开 Storybook → Components → MenuItem → MenuList
2. 点击任意菜单项 → 该项选中，原选中项取消
3. 只能有一个菜单项被选中（互斥）
4. 不支持点击取消选中（总有一个被选中）

## 对比总结

| 模式 | 选中方式 | 取消选中 | 多选 | 适用场景 |
|------|---------|---------|------|---------|
| **非受控模式** | 点击选中 | 再次点击取消 | ✅ 支持 | 独立菜单项、多选列表 |
| **受控模式（互斥）** | 点击选中 | 点击其他项 | ❌ 不支持 | 导航菜单、单选列表 |
| **受控模式（切换）** | 点击选中 | 再次点击取消 | ✅ 支持 | 需要自定义逻辑 |

## 技术细节

### 状态管理

```typescript
// 内部状态（非受控模式使用）
const [internalSelected, setInternalSelected] = useState(false);

// 使用受控或内部状态
const selected = controlledSelected !== undefined 
  ? controlledSelected 
  : internalSelected;
```

### 判断模式

- `controlledSelected === undefined` → 非受控模式
- `controlledSelected !== undefined` → 受控模式

### CSS 类名

```typescript
if (selected) {
  classes.push('menu-item--selected');
}
```

对应的 CSS：

```css
.menu-item--selected .menu-item__container {
  background-color: var(--color-1);
  border-left-color: var(--color-dynamic);
}
```

## 验证方法

### 在 Storybook 中测试

1. 启动 Storybook：
   ```bash
   npm run storybook
   ```

2. 导航到 MenuItem 组件

3. 测试以下 Stories：
   - **ClickableItem** - 单个切换
   - **MultipleIndependentItems** - 多个独立切换
   - **Default** - 默认状态（支持切换）
   - **MenuList** - 受控模式（互斥选择）

### 预期行为

✅ **非受控模式（ClickableItem, MultipleIndependentItems, Default）：**
- 点击未选中的项 → 选中
- 点击已选中的项 → 取消选中
- 可以同时选中多个项

✅ **受控模式（MenuList, InteractiveMenu）：**
- 点击任意项 → 该项选中，其他项取消
- 只能有一个项被选中
- 切换行为由父组件决定

## 总结

MenuItem 组件现在完全支持切换选中功能：

1. **非受控模式**：自动切换，点击选中，再次点击取消选中
2. **受控模式**：由父组件控制，可以实现互斥选择或自定义切换逻辑
3. **实现简洁**：只需一行代码 `setInternalSelected(!internalSelected)`
4. **向后兼容**：不影响现有的受控模式使用

用户可以在 Storybook 中直接测试切换行为，无需编写额外代码。
