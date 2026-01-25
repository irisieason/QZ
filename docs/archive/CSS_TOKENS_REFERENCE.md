# CSS Tokens 快速参考

## 如何使用 CSS Tokens

### 在组件中使用

```css
/* 导入 tokens (如果需要) */
@import '../../tokens/tokens.css';

/* 使用 CSS 变量 */
.my-component {
  background-color: var(--color-primary);
  color: var(--color-contrast-text);
  border: 1px solid var(--color-std-bdr);
}

.my-component:hover {
  background-color: var(--color-primary--hover);
}
```

## 常用 Token 速查

### 主色调
```css
--color-primary: #00bdff          /* 主色 */
--color-primary--hover: #1aecff   /* 主色悬停 */
--color-primary--active: #00eaff  /* 主色激活 */
--color-primary--contrast: #000000 /* 主色对比文字 */
--color-primary--disabled: rgba(0, 170, 204, 0.45) /* 主色禁用 */
```

### 状态颜色
```css
/* 警告/危险 */
--color-alarm: #ff2453
--color-alarm--hover: #ff577b
--color-alarm--active: #ff335f
--color-alarm--contrast: #000000
--color-alarm-text: #ff7694

/* 警告 */
--color-warning: #ffbb00
--color-warning--hover: #ffc533
--color-warning--active: #ffba0a

/* 成功 */
--color-success: #00cc5c
--color-success--hover: #4eeb00
--color-success--active: #47d700

/* 信息 */
--color-info: #357fff
--color-info--hover: #4d8eff
--color-info--active: #3d84ff
```

### 背景颜色
```css
--color-0: rgba(0, 0, 0, 0)      /* 透明 */
--color-1: #0f1619               /* 深色背景 1 */
--color-2: #283236               /* 深色背景 2 */
--color-3: #3c484d               /* 深色背景 3 */
--color-1--hover: #283236        /* 背景悬停 */
--color-1--active: #222b30       /* 背景激活 */
```

### 边框颜色
```css
--color-std-bdr: rgba(211, 237, 249, 0.55)    /* 标准边框 */
--color-soft-bdr: rgba(211, 237, 249, 0.4)    /* 柔和边框 */
--color-weak-bdr: rgba(224, 245, 255, 0.25)   /* 弱边框 */
--color-focus-bdr: #19a0ff                     /* 焦点边框 */
--color-contrast-bdr: #ffffff                  /* 对比边框 */
```

### 文字颜色
```css
--color-contrast-text: #ffffff                 /* 对比文字 (白色) */
--color-std-text: rgba(245, 252, 255, 0.9)    /* 标准文字 */
--color-soft-text: rgba(229, 247, 255, 0.65)  /* 柔和文字 */
--color-weak-text: rgba(219, 244, 255, 0.4)   /* 弱文字 */
--color-inv-contrast-text: #000000             /* 反转对比文字 (黑色) */
```

### Ghost 按钮颜色
```css
--color-ghost: rgba(166, 171, 140, 0)              /* Ghost 默认 */
--color-ghost--hover: rgba(140, 161, 171, 0.2)     /* Ghost 悬停 */
--color-ghost--active: rgba(166, 171, 140, 0.15)   /* Ghost 激活 */
--color-ghost-primary--hover: rgba(85, 255, 0, 0.15)   /* Primary Ghost 悬停 */
--color-ghost-primary--active: rgba(43, 128, 0, 0.2)   /* Primary Ghost 激活 */
```

### 组件颜色
```css
--color-component-1: rgba(140, 161, 171, 0.2)      /* 组件背景 1 */
--color-component-1--hover: rgba(140, 161, 171, 0.35)  /* 组件背景 1 悬停 */
--color-component-1--active: rgba(140, 161, 171, 0.25) /* 组件背景 1 激活 */
```

### 效果颜色
```css
--color-lightbox: rgba(0, 0, 0, 0.65)    /* 灯箱遮罩 */
--color-backdrop: rgba(0, 0, 0, 0.85)    /* 背景遮罩 */
--color-shadow-1: rgba(0, 0, 0, 0.6)     /* 阴影 1 */
```

## 按钮变体 Token 映射

### Primary Button
```css
.button--primary {
  background-color: var(--color-primary);
  color: var(--color-primary--contrast);
}
.button--primary:hover {
  background-color: var(--color-primary--hover);
}
.button--primary:active {
  background-color: var(--color-primary--active);
}
.button--primary:disabled {
  background-color: var(--color-primary--disabled);
}
```

### Danger Button
```css
.button--danger {
  background-color: var(--color-alarm);
  color: var(--color-alarm--contrast);
}
.button--danger:hover {
  background-color: var(--color-alarm--hover);
}
```

### Secondary Button
```css
.button--secondary {
  background-color: var(--color-component-1);
  color: var(--color-contrast-text);
}
.button--secondary:hover {
  background-color: var(--color-component-1--hover);
}
```

### Ghost Button
```css
.button--ghost {
  background-color: var(--color-ghost);
  color: var(--color-primary);
}
.button--ghost:hover {
  background-color: var(--color-ghost-primary--hover);
}
```

## 命名规范

### 状态后缀
- `--hover`: 悬停状态
- `--active`: 激活/按下状态
- `--disabled`: 禁用状态
- `--contrast`: 对比色 (通常用于文字)
- `--selected`: 选中状态

### 透明度后缀
- `-10`: 10% 不透明度
- `-20`: 20% 不透明度
- `-40`: 40% 不透明度

### 前缀
- `color-`: 颜色相关
- `chart-`: 图表颜色
- 无前缀数字 (`color-1`, `color-2`): 背景层级

## 更新流程

1. **更新 TypeScript tokens**
   ```bash
   # 编辑 src/tokens/colors.ts
   ```

2. **生成 CSS tokens**
   ```bash
   pnpm run generate-css-tokens
   ```

3. **验证**
   - Storybook 会自动热更新
   - 访问 http://localhost:6006/ 查看变化

## 浏览器支持

CSS 自定义属性支持所有现代浏览器：
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+

## 调试技巧

### 在浏览器开发者工具中查看
```javascript
// 获取 CSS 变量值
getComputedStyle(document.documentElement).getPropertyValue('--color-primary')

// 设置 CSS 变量值 (临时测试)
document.documentElement.style.setProperty('--color-primary', '#ff0000')
```

### 检查是否正确加载
在浏览器控制台运行：
```javascript
console.log(getComputedStyle(document.documentElement).getPropertyValue('--color-primary'))
// 应该输出: #00bdff
```
