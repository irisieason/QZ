# ApplicationMenu 互斥选择修复

## 问题描述

ApplicationMenu 组件中的 MenuItem 可以同时选中多个，不符合导航菜单的互斥选择要求。

## 根本原因

部分 Storybook Stories（Expanded 和 Collapsed）中的 MenuItem 使用了**非受控模式**，没有传递 `selected` 和 `onClick` props，导致每个 MenuItem 独立管理自己的选中状态。

### 问题代码示例

```tsx
// ❌ 错误：非受控模式，可以同时选中多个
<MenuItem icon="home" label="Home" expanded={true} />
<MenuItem icon="dashboard" label="Dashboard" expanded={true} />
<MenuItem icon="settings" label="Settings" expanded={true} />
```

在这种情况下：
- 点击 Home → Home 选中
- 点击 Dashboard → Dashboard 也选中
- 点击 Settings → Settings 也选中
- **结果：三个都选中了！** ❌

## 解决方案

将所有 ApplicationMenu Stories 中的 MenuItem 改为**受控模式**，由父组件统一管理选中状态。

### 修复后的代码

```tsx
// ✅ 正确：受控模式，互斥选择
const [selectedItem, setSelectedItem] = useState('Home');

<MenuItem 
  icon="home" 
  label="Home" 
  expanded={true}
  selected={selectedItem === 'Home'}
  onClick={() => setSelectedItem('Home')}
/>
<MenuItem 
  icon="dashboard" 
  label="Dashboard" 
  expanded={true}
  selected={selectedItem === 'Dashboard'}
  onClick={() => setSelectedItem('Dashboard')}
/>
<MenuItem 
  icon="settings" 
  label="Settings" 
  expanded={true}
  selected={selectedItem === 'Settings'}
  onClick={() => setSelectedItem('Settings')}
/>
```

在这种情况下：
- 点击 Home → `setSelectedItem('Home')` → 只有 Home 选中
- 点击 Dashboard → `setSelectedItem('Dashboard')` → 只有 Dashboard 选中
- 点击 Settings → `setSelectedItem('Settings')` → 只有 Settings 选中
- **结果：同一时间只有一个选中！** ✅

## 修复的 Stories

### 1. Expanded Story

**修改前：**
```tsx
<MenuItem icon="home" label="Home" expanded={true} />
<MenuItem icon="bell" label="Event list" expanded={true} notification={true} />
// ... 其他 MenuItem
```

**修改后：**
```tsx
const [selectedItem, setSelectedItem] = useState('Home');

<MenuItem 
  icon="home" 
  label="Home" 
  expanded={true}
  selected={selectedItem === 'Home'}
  onClick={() => setSelectedItem('Home')}
/>
<MenuItem 
  icon="bell" 
  label="Event list" 
  expanded={true}
  notification={true}
  selected={selectedItem === 'Event list'}
  onClick={() => setSelectedItem('Event list')}
/>
// ... 其他 MenuItem
```

### 2. Collapsed Story

**修改前：**
```tsx
<MenuItem icon="home" label="Home" expanded={false} />
<MenuItem icon="bell" label="Event list" expanded={false} notification={true} />
// ... 其他 MenuItem
```

**修改后：**
```tsx
const [selectedItem, setSelectedItem] = useState('Home');

<MenuItem 
  icon="home" 
  label="Home" 
  expanded={false}
  selected={selectedItem === 'Home'}
  onClick={() => setSelectedItem('Home')}
/>
<MenuItem 
  icon="bell" 
  label="Event list" 
  expanded={false}
  notification={true}
  selected={selectedItem === 'Event list'}
  onClick={() => setSelectedItem('Event list')}
/>
// ... 其他 MenuItem
```

## 已验证的 Stories

以下 Stories 已经正确使用受控模式，无需修改：

✅ **CustomToggleButton** - 已使用受控模式  
✅ **Interactive** - 已使用受控模式  
✅ **Controlled** - 已使用受控模式  
✅ **DifferentUsers** - 已使用受控模式  
✅ **AllStates** - 已使用受控模式  
✅ **SlotContent** - 已使用受控模式  

## 技术实现

### 受控模式的关键点

1. **父组件管理状态**
   ```tsx
   const [selectedItem, setSelectedItem] = useState('Home');
   ```

2. **传递 selected prop**
   ```tsx
   selected={selectedItem === 'Home'}
   ```
   - 当 `selectedItem === 'Home'` 时，Home MenuItem 显示选中状态
   - 其他 MenuItem 的 `selected` 为 `false`

3. **传递 onClick 回调**
   ```tsx
   onClick={() => setSelectedItem('Home')}
   ```
   - 点击时更新 `selectedItem` 状态
   - 触发重新渲染，更新所有 MenuItem 的选中状态

### 互斥选择的实现原理

```tsx
// 状态：selectedItem = 'Home'

<MenuItem selected={selectedItem === 'Home'} />      // true  ✓ 选中
<MenuItem selected={selectedItem === 'Dashboard'} /> // false ✗ 未选中
<MenuItem selected={selectedItem === 'Settings'} />  // false ✗ 未选中

// 点击 Dashboard
onClick={() => setSelectedItem('Dashboard')}

// 状态更新：selectedItem = 'Dashboard'

<MenuItem selected={selectedItem === 'Home'} />      // false ✗ 未选中
<MenuItem selected={selectedItem === 'Dashboard'} /> // true  ✓ 选中
<MenuItem selected={selectedItem === 'Settings'} />  // false ✗ 未选中
```

## 对比：受控模式 vs 非受控模式

| 特性 | 非受控模式 | 受控模式 |
|------|-----------|---------|
| **状态管理** | 每个 MenuItem 独立管理 | 父组件统一管理 |
| **选中行为** | 可以同时选中多个 | 只能选中一个（互斥） |
| **适用场景** | 多选列表、独立开关 | 导航菜单、单选列表 |
| **实现方式** | 不传 `selected` prop | 传递 `selected` 和 `onClick` |
| **ApplicationMenu** | ❌ 不适用 | ✅ 推荐使用 |

## 验证方法

### 在 Storybook 中测试

1. 启动 Storybook：
   ```bash
   npm run storybook
   ```

2. 导航到 ApplicationMenu 组件

3. 测试以下 Stories：
   - **Expanded** - 展开状态的互斥选择
   - **Collapsed** - 折叠状态的互斥选择
   - **Interactive** - 交互式示例
   - **Controlled** - 受控模式示例

### 预期行为

✅ **正确行为：**
- 点击任意 MenuItem → 该项选中，其他项取消选中
- 同一时间只有一个 MenuItem 被选中
- 选中的 MenuItem 显示蓝色左边框和背景色

❌ **错误行为（已修复）：**
- 点击多个 MenuItem → 多个同时选中
- 可以同时看到多个蓝色左边框

## 设计原则

### ApplicationMenu 的职责

根据 Figma 组件规则，ApplicationMenu 是一个**容器组件**：

1. **Figma 属性**：
   - `expanded` - 控制菜单展开/折叠
   - `popoverNews` - 控制新闻弹窗（待实现）
   - `overflow` - 溢出处理（待实现）

2. **Slot 属性**（扩展属性）：
   - `toggleButton` - 展开/折叠按钮插槽
   - `avatarSection` - 用户头像区域插槽
   - `menuList` - 菜单项列表插槽

3. **不负责的事情**：
   - ❌ 不管理 MenuItem 的选中状态
   - ❌ 不直接操作子组件
   - ✅ 只负责布局和展开/折叠

### MenuItem 的选中状态管理

MenuItem 的选中状态应该由**使用 ApplicationMenu 的父组件**管理：

```tsx
// ✅ 正确：父组件管理选中状态
function MyApp() {
  const [selectedItem, setSelectedItem] = useState('Home');
  
  return (
    <ApplicationMenu
      menuList={
        <>
          <MenuItem 
            selected={selectedItem === 'Home'}
            onClick={() => setSelectedItem('Home')}
          />
          <MenuItem 
            selected={selectedItem === 'Dashboard'}
            onClick={() => setSelectedItem('Dashboard')}
          />
        </>
      }
    />
  );
}
```

## 总结

### 修复内容

✅ 修复了 Expanded Story - 添加受控模式  
✅ 修复了 Collapsed Story - 添加受控模式  
✅ 验证了其他 6 个 Stories - 已正确使用受控模式  

### 修复效果

- ✅ ApplicationMenu 中的 MenuItem 现在是互斥选择
- ✅ 同一时间只能选中一个 MenuItem
- ✅ 点击其他 MenuItem 会自动取消当前选中项
- ✅ 符合导航菜单的标准交互行为

### 关键要点

1. **ApplicationMenu 使用 Slot 模式**，不直接管理 MenuItem 状态
2. **MenuItem 支持受控和非受控模式**，ApplicationMenu 中应使用受控模式
3. **受控模式通过父组件状态管理**，确保互斥选择
4. **所有 Storybook Stories 都应使用受控模式**，展示正确的交互行为

ApplicationMenu 组件现在完全符合导航菜单的互斥选择要求！
