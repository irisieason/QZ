# 更新日志

## [1.1.3] - 2025-01-29

### ✨ 新增功能

#### AppFrame 组件
- 🎨 创建了 AppFrame 复合组件（容器组件）
- 📦 使用插槽模式接收 ApplicationHeader 和 ApplicationMenu 子组件
- 🔧 提供完整的应用框架布局
- 📝 包含完整的 Storybook 示例和测试

### 🐛 问题修复

#### ApplicationMenu 组件
- 🔧 修复了展开/收起时的定位问题
- 🎯 统一了收起和展开状态的纵向位置（固定在 top: 44px）
- 🚀 移除了展开/收起的过渡动画，改为立即切换
- 💡 修复了展开时收起按钮消失的问题
- 🎨 优化了菜单覆盖行为（展开时覆盖内容，收起时不遮挡）

#### AppFrame Stories
- ✅ 为所有 stories 添加了正确的 `expand` 和 `expanded` 属性传递
- 🔄 添加了交互状态管理（useState）

#### 测试
- 🧪 修复了 AppFrame.test.tsx 的 TypeScript 类型问题
- ✅ 添加了 `@testing-library/jest-dom/vitest` 导入

### 📚 文档更新
- 📝 更新了 AppFrame 组件文档
- 📖 添加了使用示例和 API 说明

## [1.0.0] - 2025-01-16

### ✨ 新增功能

#### Button 组件
- 🎨 从 Figma 设计文件创建了完整的 Button 组件
- 📦 支持 10 种按钮变体
  - Primary（主要按钮）
  - Primary outline（主要轮廓按钮）
  - Primary ghost（主要幽灵按钮）
  - Secondary（次要按钮）
  - Secondary outline（次要轮廓按钮）
  - Secondary ghost（次要幽灵按钮）
  - Danger（危险按钮）
  - Danger outline（危险轮廓按钮）
  - Danger ghost（危险幽灵按钮）
  - Content action（内容操作按钮）

- 🎯 支持 4 种交互状态
  - Default（默认）
  - Hover（悬停）
  - Active（激活）
  - Loading（加载中）

- 🔧 核心功能
  - 禁用状态支持
  - 前置图标支持
  - 后置图标支持
  - 聚焦状态指示
  - 完整的 TypeScript 类型定义
  - 响应式设计
  - 无障碍访问支持

### 📁 新增文件

```
src/components/Button/
├── Button.tsx              # 主组件实现
├── Button.css              # 组件样式
├── Button.stories.tsx      # Storybook 故事
├── Button.example.tsx      # 使用示例
├── Button.test.tsx         # 测试模板
├── README.md               # 组件文档
└── index.ts                # 导出文件

根目录/
├── BUTTON_COMPONENT.md     # 组件开发总结
├── QUICK_START.md          # 快速入门指南
└── CHANGELOG.md            # 更新日志（本文件）
```

### 🎨 设计规范

- 基于 Siemens iX Design System
- 使用项目中的设计令牌（colors, typography, spacing）
- 符合 Figma 设计规范（node-id: 225-5535）
- 遵循 BEM CSS 命名规范

### 📚 文档

- ✅ 完整的组件 API 文档
- ✅ 使用示例和最佳实践
- ✅ Storybook 交互式文档
- ✅ 快速入门指南
- ✅ 测试模板

### 🔄 组件导出

更新了 `src/components/index.ts`：
```typescript
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonState } from './Button';
```

### 🎯 使用方式

```tsx
import { Button } from 'design-system';

// 基础使用
<Button variant="Primary">点击我</Button>

// 带图标
<Button variant="Primary" showIcon icon={<Icon />}>
  保存
</Button>

// 加载状态
<Button variant="Primary" state="Loading">
  加载中...
</Button>

// 禁用状态
<Button variant="Primary" disabled>
  禁用
</Button>
```

### 📊 技术细节

- **框架**: React 18.2.0
- **语言**: TypeScript 5.2.2
- **样式**: CSS Modules
- **构建工具**: Vite 5.0.8
- **文档工具**: Storybook 7.6.7

### 🎨 设计令牌使用

组件使用了以下设计令牌：
- `colors` - 颜色系统
- `typography` - 排版系统
- `spacing` - 间距系统

### ✅ 质量保证

- TypeScript 类型检查通过
- 符合 ESLint 规范
- 包含测试模板
- 完整的文档覆盖

### 🚀 后续计划

- [ ] 添加单元测试
- [ ] 添加 ButtonGroup 组件
- [ ] 支持不同尺寸（small, medium, large）
- [ ] 添加工具提示支持
- [ ] 性能优化（React.memo）

### 📖 参考资源

- [Figma 设计文件](https://figma.com/design/e6oyye9F4VSzvI5wvo1GL4/Test?node-id=225-5535)
- [Siemens iX Button 文档](https://ix.siemens.io/docs/controls/button)
- [组件完整文档](src/components/Button/README.md)
- [快速入门指南](QUICK_START.md)

---

**版本**: 1.0.0  
**发布日期**: 2025-01-16  
**作者**: Kiro AI Assistant  
**许可证**: MIT
