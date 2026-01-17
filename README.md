# Design System

React 组件设计系统

## 安装依赖

```bash
npm install
```

## 开发

启动 Storybook 开发服务器：

```bash
npm run storybook
```

启动 Vite 开发服务器：

```bash
npm run dev
```

## 构建

构建组件库：

```bash
npm run build
```

构建 Storybook 静态站点：

```bash
npm run build-storybook
```

## 项目结构

```
src/
├── tokens/          # 设计令牌（颜色、字体、间距等）
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── shadows.ts
├── components/      # React 组件
└── index.ts         # 入口文件
```

## 设计令牌

设计系统包含以下设计令牌：

- **colors**: 颜色系统（主色、辅助色、中性色、状态色）
- **typography**: 字体系统（字体族、大小、粗细、行高）
- **spacing**: 间距系统
- **shadows**: 阴影系统
