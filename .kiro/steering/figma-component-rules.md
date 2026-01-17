---
inclusion: always
---

# Figma 组件开发规则

## 核心原则

**严格遵循 Figma 设计规范，不可自行添加或修改属性。**

## 组件属性规则

### 1. 属性必须与 Figma 完全一致

从 Figma 获取组件属性后，**必须严格按照 Figma 定义的属性来实现**：

✅ **允许的操作：**
- 使用 Figma 中定义的所有属性
- 保持属性名称、类型、默认值与 Figma 一致
- 实现 Figma 中定义的所有变体和状态

❌ **禁止的操作：**
- 添加 Figma 中不存在的属性
- 修改 Figma 属性的名称
- 更改属性的类型或默认值
- 合并或拆分 Figma 属性
- 自行创造新的变体或状态

### 2. Button 组件属性规范

根据 Figma 设计，Button 组件的属性定义为：

```typescript
interface ButtonProps {
  /** 按钮文本 */
  label?: string;
  
  /** 是否显示图标 */
  showIcon?: boolean;
  
  /** 是否显示聚焦状态 */
  focused?: boolean;
  
  /** 按钮变体 */
  variant?: 
    | "Primary" 
    | "Primary outline" 
    | "Primary ghost" 
    | "Secondary" 
    | "Secondary outline" 
    | "Secondary ghost" 
    | "Danger" 
    | "Danger outline" 
    | "Danger ghost" 
    | "🔶 Content action";
  
  /** 按钮状态 */
  state?: 
    | "Default" 
    | "Hover" 
    | "Active" 
    | "Disabled" 
    | "Loading";
}
```

**注意：**
- ❌ 不应该有 `iconBefore` 属性（Figma 中没有定义）
- ❌ 不应该有 `iconAfter` 属性（Figma 中没有定义）
- ❌ 不应该有 `loading` 属性（应使用 `state="Loading"`）
- ✅ 应该使用 `showIcon` 布尔属性控制图标显示
- ✅ 应该使用 `label` 属性设置按钮文本

### 3. 图标处理规则

根据 Figma Code Connect 示例：

```tsx
<IxButton icon="about" variant="primary">
  Button
</IxButton>
```

Button 组件应该：
- 使用 `icon` 属性指定图标名称（字符串）
- 使用 `showIcon` 属性控制图标是否显示
- 图标位置由组件内部决定，不暴露位置控制属性

### 4. 开发流程

1. **获取 Figma 设计**
   ```bash
   # 使用 mcp_figma_get_design_context 获取组件定义
   ```

2. **分析属性定义**
   - 记录所有 Figma 定义的属性
   - 记录属性类型、默认值、可选值
   - 记录 Code Connect 示例（如果有）

3. **实现组件**
   - 严格按照 Figma 属性定义创建 TypeScript 接口
   - 不添加任何 Figma 中未定义的属性
   - 保持属性名称、类型完全一致

4. **验证一致性**
   - 对比 Figma 属性列表
   - 确保没有额外属性
   - 确保所有 Figma 属性都已实现

## 属性映射规则

### React Props 命名

Figma 属性名 → React Props 名：
- 保持完全一致（包括大小写）
- 布尔属性使用 `is/has/show` 前缀（如 Figma 中定义）
- 枚举属性使用字符串字面量类型

### 示例对比

**❌ 错误示例（自行添加属性）：**
```typescript
interface ButtonProps {
  children?: React.ReactNode;  // ❌ Figma 中是 label
  iconBefore?: string;          // ❌ Figma 中没有此属性
  iconAfter?: string;           // ❌ Figma 中没有此属性
  loading?: boolean;            // ❌ 应使用 state="Loading"
}
```

**✅ 正确示例（严格遵循 Figma）：**
```typescript
interface ButtonProps {
  label?: string;               // ✅ 与 Figma 一致
  showIcon?: boolean;           // ✅ 与 Figma 一致
  focused?: boolean;            // ✅ 与 Figma 一致
  variant?: "Primary" | ...;    // ✅ 与 Figma 一致
  state?: "Default" | ...;      // ✅ 与 Figma 一致
}
```

## 扩展属性规则

如果需要添加 Figma 中未定义的属性（如事件处理、可访问性），应该：

1. **分离关注点**
   - 将 Figma 属性和扩展属性明确分开
   - 在注释中标注哪些是扩展属性

2. **使用继承**
   ```typescript
   // Figma 定义的属性
   interface ButtonFigmaProps {
     label?: string;
     showIcon?: boolean;
     variant?: ButtonVariant;
     state?: ButtonState;
   }
   
   // 扩展属性（React 特定）
   interface ButtonExtendedProps {
     onClick?: (event: React.MouseEvent) => void;
     className?: string;
     'aria-label'?: string;
   }
   
   // 最终组件属性
   interface ButtonProps extends ButtonFigmaProps, ButtonExtendedProps {}
   ```

3. **文档说明**
   - 在代码注释中说明哪些属性来自 Figma
   - 哪些是为了技术实现添加的扩展属性

## 检查清单

在提交代码前，确认：

- [ ] 所有属性都来自 Figma 设计
- [ ] 属性名称与 Figma 完全一致
- [ ] 属性类型与 Figma 定义匹配
- [ ] 没有添加 Figma 中不存在的属性
- [ ] 变体和状态值与 Figma 一致
- [ ] 默认值与 Figma 设计一致
- [ ] 如有扩展属性，已明确标注和分离

## 违规示例

以下是常见的违规情况：

### 违规 1: 自行添加属性
```typescript
// ❌ 错误
interface ButtonProps {
  label?: string;
  iconBefore?: string;  // Figma 中没有定义
  size?: 'small' | 'medium' | 'large';  // Figma 中没有定义
}
```

### 违规 2: 修改属性名称
```typescript
// ❌ 错误
interface ButtonProps {
  text?: string;  // Figma 中是 label，不是 text
  icon?: boolean;  // Figma 中是 showIcon，不是 icon
}
```

### 违规 3: 更改属性类型
```typescript
// ❌ 错误
interface ButtonProps {
  showIcon?: 'yes' | 'no';  // Figma 中是 boolean，不是字符串
  variant?: number;  // Figma 中是字符串枚举，不是数字
}
```

## 总结

**核心原则：Figma 是唯一的设计真相来源（Single Source of Truth）。**

所有组件实现必须严格遵循 Figma 设计，不得擅自修改或添加属性。如需扩展，必须明确标注并与 Figma 属性分离。
