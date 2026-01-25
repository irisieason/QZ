# 项目文档索引

本文档提供项目中所有文档的快速导航。

## 📋 文档结构

```
项目根目录/
├── .kiro/steering/          # Kiro AI 开发规则（自动应用）
├── docs/                    # 项目文档
│   ├── components/          # 组件开发文档
│   ├── archive/             # 历史文档归档
│   ├── ICON_USAGE_GUIDE.md
│   ├── QUICK_REFERENCE.md
│   ├── QUICK_START.md
│   └── ...
├── README.md                # 项目说明
├── CHANGELOG.md             # 变更日志
└── DOCS_INDEX.md            # 本文件
```

## 🎯 核心文档

### 开发规则（.kiro/steering/）

这些规则会自动应用到 Kiro AI 的开发过程中：

| 文档 | 用途 | 何时使用 |
|------|------|----------|
| [README.md](.kiro/steering/README.md) | 规则文档索引 | 了解所有规则 |
| [figma-component-rules.md](.kiro/steering/figma-component-rules.md) | Figma 组件开发规范 | 创建/更新组件 |
| [storybook-controls-rules.md](.kiro/steering/storybook-controls-rules.md) | Storybook 展示规范 | 配置 Storybook |
| [icon-usage-rules.md](.kiro/steering/icon-usage-rules.md) | 图标使用规范 | 使用图标 |
| [component-design-principles.md](.kiro/steering/component-design-principles.md) | 组件设计原则快速参考 | 快速查阅 |
| [best-practices-validation.md](.kiro/steering/best-practices-validation.md) | 最佳实践验证报告 | 验证规则正确性 |

### 项目文档（docs/）

| 文档 | 用途 |
|------|------|
| [QUICK_START.md](docs/QUICK_START.md) | 快速开始指南 |
| [QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md) | 快速参考 |
| [ICON_USAGE_GUIDE.md](docs/ICON_USAGE_GUIDE.md) | 图标使用指南 |
| [GITHUB_PACKAGES_SETUP.md](docs/GITHUB_PACKAGES_SETUP.md) | GitHub Packages 配置 |
| [QUICK_SETUP_GITHUB_TOKEN.md](docs/QUICK_SETUP_GITHUB_TOKEN.md) | GitHub Token 快速配置 |

### 组件文档（docs/components/）

记录各个组件的开发过程和特殊说明：

| 文档 | 组件 |
|------|------|
| [BUTTON_COMPONENT.md](docs/components/BUTTON_COMPONENT.md) | Button 组件 |
| [CATEGORYFILTER_FINAL_PROPS.md](docs/components/CATEGORYFILTER_FINAL_PROPS.md) | CategoryFilter 组件 |
| [MENUITEM_TOGGLE_BEHAVIOR.md](docs/components/MENUITEM_TOGGLE_BEHAVIOR.md) | MenuItem 组件 |
| [AVATARBUTTONMENU_COMPONENT.md](docs/components/AVATARBUTTONMENU_COMPONENT.md) | AvatarButtonMenu 组件 |
| [APPLICATIONMENU_EXCLUSIVE_SELECTION.md](docs/components/APPLICATIONMENU_EXCLUSIVE_SELECTION.md) | ApplicationMenu 组件 |
| [ICONBUTTON_COMPONENT.md](docs/components/ICONBUTTON_COMPONENT.md) | IconButton 组件 |

### 历史文档（docs/archive/）

项目开发过程中的历史记录和优化总结：

- 组件优化总结
- Storybook 优化记录
- 设计令牌更新记录
- 图标集成记录

## 🚀 快速开始

### 新手入门

1. 阅读 [README.md](README.md) 了解项目
2. 阅读 [QUICK_START.md](docs/QUICK_START.md) 快速开始
3. 查看 [.kiro/steering/README.md](.kiro/steering/README.md) 了解开发规则

### 开发组件

1. 查看 [figma-component-rules.md](.kiro/steering/figma-component-rules.md) 了解规范
2. 参考 [component-design-principles.md](.kiro/steering/component-design-principles.md) 快速查阅
3. 遵循 [icon-usage-rules.md](.kiro/steering/icon-usage-rules.md) 使用图标
4. 按照 [storybook-controls-rules.md](.kiro/steering/storybook-controls-rules.md) 配置 Storybook

### 使用 Kiro AI

只需说：
- **"创建组件"** - AI 会自动应用所有规则
- **"配置 Storybook"** - AI 会按照规范配置
- **"添加图标"** - AI 会使用正确的图标库

## 📚 参考组件

以下组件是标准实现示例：

- `src/components/Button/` - 按钮组件
- `src/components/CategoryFilter/` - 类别过滤器
- `src/components/MenuItem/` - 菜单项
- `src/components/Avatar/` - 头像组件

## 🔄 文档维护

### 添加新文档

1. **开发规则** → 放到 `.kiro/steering/`
2. **组件文档** → 放到 `docs/components/`
3. **参考文档** → 放到 `docs/`
4. **历史文档** → 放到 `docs/archive/`

### 更新索引

修改文档后，记得更新：
- 本文件（DOCS_INDEX.md）
- `.kiro/steering/README.md`（如果是规则文档）

## ✅ 文档质量保证

所有开发规则都已验证，符合：
- ✅ React 官方推荐
- ✅ Material UI (MUI) 设计模式
- ✅ Ant Design 设计模式
- ✅ 2024-2025 年最新 React 开发标准

详见 [best-practices-validation.md](.kiro/steering/best-practices-validation.md)。

## 💡 提示

- 使用 Ctrl+F 或 Cmd+F 在本文档中搜索
- 所有规则文档都有详细的代码示例
- 遇到问题时，先查阅相关规则文档
- Kiro AI 会自动应用 `.kiro/steering/` 中的规则

## 📞 需要帮助？

1. 查看 [.kiro/steering/README.md](.kiro/steering/README.md) 了解规则
2. 查看 [component-design-principles.md](.kiro/steering/component-design-principles.md) 快速参考
3. 参考现有组件的实现
4. 查阅 [best-practices-validation.md](.kiro/steering/best-practices-validation.md) 了解规则依据
