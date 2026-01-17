# Storybook 深色主题配置

## 🎨 主题说明

Storybook 已配置为 Siemens iX 深色主题，与设计系统保持一致。

## 📁 配置文件

- **preview.ts** - 预览区域配置（背景色、全局样式）
- **manager.ts** - 管理界面配置（侧边栏、工具栏主题）
- **theme.ts** - 自定义主题定义

## 🎨 背景颜色选项

在 Storybook 工具栏中可以切换以下背景：

1. **dark** (默认) - `#000028` - Siemens iX 主背景色
2. **darker** - `#000000` - 纯黑色
3. **light** - `#ffffff` - 白色（用于对比测试）
4. **gray** - `#23233c` - 深灰色

## 🎯 主题颜色

- **主色**: `#00cccc` (cyan)
- **次要色**: `#00ffb9` (mint green)
- **背景色**: `#000028` (dark blue)
- **文本色**: `#ffffff` (white)

## 🔧 如何切换背景

1. 打开 Storybook (http://localhost:6006)
2. 点击工具栏中的背景图标
3. 选择不同的背景颜色

## 📝 自定义主题

如需修改主题，编辑 `.storybook/theme.ts` 文件：

```typescript
export default create({
  base: 'dark',
  colorPrimary: '#00cccc',    // 主色
  colorSecondary: '#00ffb9',  // 次要色
  appBg: '#000028',           // 背景色
  // ... 更多配置
});
```

## 🎨 设计系统一致性

所有颜色值都来自 `src/tokens/colors.ts`，确保与设计系统保持一致。
