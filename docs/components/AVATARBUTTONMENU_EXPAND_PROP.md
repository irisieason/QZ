# AvatarButtonMenu expand 属性更新

## 更新日期
2026-01-23

## 更新内容

根据最新的 Figma 设计，AvatarButtonMenu 组件新增了 `expand` 属性（Figma 定义的属性）。

## Figma 设计变更

### 新增属性
- **expand** (boolean): 控制组件是否展开显示完整信息
  - `expand={true}`: 显示完整组件（avatar + email + role），宽度 230px
  - `expand={false}`: 仅显示头像，宽度 40px，padding 4px

### 状态组合
Figma 中定义了以下状态组合：
- State=Default, expand=true
- State=Default, expand=false
- State=Hover, expand=true
- State=Hover, expand=false
- State=Active, expand=true
- State=Active, expand=false

## 代码更新

### 1. AvatarButtonMenu.tsx
- 在 `AvatarButtonMenuFigmaProps` 接口中添加 `expand?: boolean` 属性
- 默认值设置为 `true`（展开状态）
- 根据 `expand` 属性条件渲染 email 和 role 信息
- 添加 `data-expand` 属性用于 CSS 选择器

### 2. AvatarButtonMenu.css
- 添加 `.avatar-button-menu--collapsed` 类
- 收起状态：width 40px, padding 0 4px
- 展开状态：width 230px, padding 0 8px 0 4px
- 添加 width 和 padding 的过渡动画（0.1s ease）

### 3. AvatarButtonMenu.stories.tsx
- 在 argTypes 中添加 `expand` 控制器
- 更新 Default Story，添加 Collapsed Story
- 将 Hover 和 Active Stories 拆分为 Expanded 和 Collapsed 版本
- 更新 AllStates Story，展示所有 expand 状态组合

### 4. ApplicationMenu.stories.tsx
- 移除 Avatar 组件的导入（不再需要）
- 所有 Stories 中使用 AvatarButtonMenu 的 `expand` 属性
- 将 `expand={expanded}` 传递给 AvatarButtonMenu
- 展开时：`<AvatarButtonMenu expand={true} />`
- 收起时：`<AvatarButtonMenu expand={false} />`

## 使用示例

### 基本用法

```tsx
// 展开状态（显示完整信息）
<AvatarButtonMenu
  expand={true}
  email="john.doe@company.com"
  role="Administrator"
/>

// 收起状态（仅显示头像）
<AvatarButtonMenu
  expand={false}
  email="john.doe@company.com"
  role="Administrator"
/>
```

### 在 ApplicationMenu 中使用

```tsx
const [expanded, setExpanded] = useState(true);

<ApplicationMenu
  expanded={expanded}
  onToggleExpand={() => setExpanded(!expanded)}
  avatarSection={
    <AvatarButtonMenu
      expand={expanded}  // 与菜单展开状态同步
      email="john.doe@company.com"
      role="Administrator"
    />
  }
  menuList={...}
/>
```

## 优势

### 1. 符合 Figma 设计规范
- `expand` 是 Figma 定义的属性，严格遵循设计规范
- 不再需要在 ApplicationMenu 中切换不同组件

### 2. 简化代码
**之前（切换组件）：**
```tsx
avatarSection={
  expanded ? (
    <AvatarButtonMenu email="..." role="..." />
  ) : (
    <Avatar image={false} initials={false} text="JD" />
  )
}
```

**现在（使用 expand 属性）：**
```tsx
avatarSection={
  <AvatarButtonMenu
    expand={expanded}
    email="..."
    role="..."
  />
}
```

### 3. 保持头像位置固定
- 展开和收起时，头像位置保持在左侧 10px（ApplicationMenu padding）+ 4px（AvatarButtonMenu padding）
- 不会出现水平位移
- 过渡动画流畅（100ms）

### 4. 更好的状态管理
- 单一组件，状态管理更简单
- 不需要在两个不同组件之间切换
- 所有交互逻辑（hover、active、dropdown）保持一致

## 视觉效果

### 展开状态 (expand=true)
```
┌────────────────────────────────┐
│  ●  john.doe@company.com       │
│     Administrator              │
└────────────────────────────────┘
     宽度: 230px
```

### 收起状态 (expand=false)
```
┌──────┐
│  ●   │
└──────┘
 宽度: 40px
```

## 测试要点

1. ✅ expand 属性正确控制显示/隐藏 email 和 role
2. ✅ 宽度在展开/收起时正确变化（230px ↔ 40px）
3. ✅ 头像位置在展开/收起时保持固定（不水平移动）
4. ✅ 过渡动画流畅（100ms）
5. ✅ 所有状态组合正常工作（Default/Hover/Active × expand true/false）
6. ✅ 下拉菜单在收起状态下仍然可以正常显示
7. ✅ TypeScript 类型检查通过
8. ✅ Storybook 中所有 Stories 正常显示

## 相关文件

- `src/components/AvatarButtonMenu/AvatarButtonMenu.tsx`
- `src/components/AvatarButtonMenu/AvatarButtonMenu.css`
- `src/components/AvatarButtonMenu/AvatarButtonMenu.stories.tsx`
- `src/components/ApplicationMenu/ApplicationMenu.stories.tsx`
- `src/components/ApplicationMenu/ApplicationMenu.css`

## 注意事项

1. **Figma 属性**：`expand` 是 Figma 定义的属性，不是自定义添加的
2. **默认值**：`expand` 默认为 `true`（展开状态）
3. **位置固定**：ApplicationMenu 的 avatar-section padding 保持 10px，确保头像位置固定
4. **动画时长**：与 ApplicationMenu 的展开/收起动画保持一致（100ms）
5. **向后兼容**：如果不传 `expand` 属性，默认显示展开状态

## 总结

通过添加 Figma 定义的 `expand` 属性，AvatarButtonMenu 组件现在可以在展开和收起状态之间平滑切换，无需在 ApplicationMenu 中切换不同的组件。这简化了代码，提高了可维护性，并确保了与 Figma 设计的完全一致性。
