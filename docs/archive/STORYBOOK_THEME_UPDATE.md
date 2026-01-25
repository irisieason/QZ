# Storybook 深色主题配置完成 ✅

## 🎨 更新内容

已将 Storybook 从默认的白色主题更新为 Siemens iX 深色主题。

## 📝 配置文件更新

### 1. `.storybook/preview.ts`
- ✅ 添加深色背景配置
- ✅ 设置默认背景为 `#000028`（Siemens iX 深色背景）
- ✅ 提供 4 种背景选项（dark, darker, light, gray）
- ✅ 导入 Button 组件样式

### 2. `.storybook/manager.ts` (新建)
- ✅ 配置管理界面使用深色主题
- ✅ 应用自定义主题

### 3. `.storybook/theme.ts` (新建)
- ✅ 创建自定义 Siemens iX 深色主题
- ✅ 配置品牌颜色（#00cccc, #00ffb9）
- ✅ 配置 UI 颜色（背景、边框、文本）
- ✅ 配置工具栏和表单颜色

### 4. `src/components/Button/Button.stories.tsx`
- ✅ 设置 Button 组件默认使用深色背景

## 🎨 主题颜色

| 元素 | 颜色 | 值 |
|------|------|-----|
| 主色 | Cyan | `#00cccc` |
| 次要色 | Mint Green | `#00ffb9` |
| 背景色 | Dark Blue | `#000028` |
| 次级背景 | Dark Gray | `#23233c` |
| 文本色 | White | `#ffffff` |
| 边框色 | Gray | `#37374d` |

## 🚀 查看效果

1. **刷新浏览器** - 访问 http://localhost:6006
2. **查看深色主题** - 整个界面现在是深色的
3. **切换背景** - 点击工具栏的背景图标可以切换不同背景

## 🎯 背景选项

在 Storybook 工具栏中可以切换：

1. **dark** (默认) - `#000028` - Siemens iX 主背景
2. **darker** - `#000000` - 纯黑色
3. **light** - `#ffffff` - 白色（对比测试）
4. **gray** - `#23233c` - 深灰色

## 📊 效果对比

### 之前（白色主题）
- ❌ 白色背景不适合深色按钮
- ❌ 对比度不够
- ❌ 与设计系统不一致

### 现在（深色主题）
- ✅ 深色背景完美展示按钮
- ✅ 高对比度，视觉效果好
- ✅ 与 Siemens iX 设计系统一致
- ✅ 更好的用户体验

## 🎨 设计系统一致性

所有颜色值都来自项目的设计令牌：
- `src/tokens/colors.ts` - 颜色系统
- 确保 Storybook 与实际应用保持一致

## 💡 使用提示

### 切换背景
1. 打开 Storybook
2. 点击工具栏中的 🎨 背景图标
3. 选择不同的背景颜色进行对比

### 查看所有变体
1. 导航到 "Components/Button"
2. 选择 "All Variants" 故事
3. 查看所有 50 种按钮状态的完整展示

### 调整 Props
1. 选择任意按钮故事
2. 使用底部的 "Controls" 面板
3. 实时调整 variant、state、disabled 等属性

## 🔧 自定义主题

如需进一步自定义主题，编辑以下文件：

### 修改颜色
编辑 `.storybook/theme.ts`:
```typescript
export default create({
  base: 'dark',
  colorPrimary: '#00cccc',    // 修改主色
  colorSecondary: '#00ffb9',  // 修改次要色
  appBg: '#000028',           // 修改背景色
  // ...
});
```

### 添加背景选项
编辑 `.storybook/preview.ts`:
```typescript
backgrounds: {
  values: [
    {
      name: 'custom',
      value: '#your-color',
    },
    // ...
  ],
}
```

## 📚 相关文档

- [Storybook 主题配置](.storybook/README.md)
- [Button 组件文档](src/components/Button/README.md)
- [设计令牌](src/tokens/colors.ts)

## ✅ 完成状态

- [x] 配置深色主题
- [x] 设置默认背景为 #000028
- [x] 创建自定义主题
- [x] 添加多种背景选项
- [x] 更新 Button 组件故事
- [x] 创建主题文档
- [x] 自动热重载生效

## 🎉 结果

现在 Storybook 完美展示了 Siemens iX 深色主题的 Button 组件！

刷新浏览器 (http://localhost:6006) 即可看到深色主题效果。

---

**更新时间**: 2025-01-16  
**Storybook 版本**: 7.6.21  
**主题**: Siemens iX Dark Theme
