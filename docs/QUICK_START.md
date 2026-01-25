# Button 组件快速入门

## 🚀 快速开始

### 1. 查看组件

```bash
# 启动 Storybook 查看所有变体
npm run storybook
```

### 2. 在项目中使用

```tsx
import { Button } from './components/Button';

function App() {
  return (
    <div>
      <Button variant="Primary" onClick={() => alert('Clicked!')}>
        点击我
      </Button>
    </div>
  );
}
```

### 3. 常用示例

#### 主要操作按钮
```tsx
<Button variant="Primary">保存</Button>
<Button variant="Primary outline">取消</Button>
<Button variant="Primary ghost">了解更多</Button>
```

#### 危险操作按钮
```tsx
<Button variant="Danger">删除</Button>
<Button variant="Danger outline">确认删除</Button>
```

#### 带图标的按钮
```tsx
const SaveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M15 2H5C3.9 2 3 2.9 3 4V16C3 17.1 3.9 18 5 18H15C16.1 18 17 17.1 17 16V4C17 2.9 16.1 2 15 2ZM14 16H6V4H14V16Z"/>
  </svg>
);

<Button variant="Primary" showIcon icon={<SaveIcon />}>
  保存
</Button>
```

#### 加载状态
```tsx
const [loading, setLoading] = useState(false);

<Button 
  variant="Primary" 
  state={loading ? 'Loading' : 'Default'}
  onClick={async () => {
    setLoading(true);
    await saveData();
    setLoading(false);
  }}
>
  {loading ? '保存中...' : '保存'}
</Button>
```

#### 表单按钮
```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit" variant="Primary">
    提交
  </Button>
  <Button type="reset" variant="Secondary outline">
    重置
  </Button>
  <Button type="button" variant="Primary ghost" onClick={handleCancel}>
    取消
  </Button>
</form>
```

## 📁 文件位置

- **组件**: `src/components/Button/Button.tsx`
- **样式**: `src/components/Button/Button.css`
- **文档**: `src/components/Button/README.md`
- **示例**: `src/components/Button/Button.example.tsx`
- **Storybook**: `src/components/Button/Button.stories.tsx`

## 🎨 所有变体一览

| 变体 | UX 对应 | 使用场景 |
|------|---------|----------|
| Primary | Primary | 最重要的操作 |
| Primary outline | Secondary | 次要但重要的操作 |
| Primary ghost | Tertiary | 第三级操作 |
| Secondary | - | 特殊场景 |
| Secondary outline | - | 特殊场景 |
| Secondary ghost | - | 特殊场景 |
| Danger | - | 危险操作 |
| Danger outline | - | 危险操作确认 |
| Danger ghost | - | 轻量危险操作 |
| Content action | - | 内容区域操作 |

## 🎯 Props 速查

```typescript
<Button
  variant="Primary"              // 变体类型
  state="Default"                // 状态：Default | Hover | Active | Loading
  disabled={false}               // 是否禁用
  showIcon={false}               // 显示前置图标
  icon={<Icon />}                // 前置图标
  iconAfter={false}              // 显示后置图标
  afterIcon={<Icon />}           // 后置图标
  focused={false}                // 聚焦状态
  onClick={(e) => {}}            // 点击事件
  type="button"                  // 按钮类型：button | submit | reset
  className=""                   // 自定义类名
>
  按钮文本
</Button>
```

## 💡 最佳实践

### 1. 按钮层级
- 每个页面/区域只有一个 Primary 按钮
- 使用 Primary outline 作为次要操作
- 使用 Primary ghost 作为第三级操作

### 2. 危险操作
- 删除操作使用 Danger 变体
- 考虑添加二次确认
- 使用清晰的文案（如"删除"而不是"确定"）

### 3. 加载状态
- 异步操作时显示 Loading 状态
- 保持按钮文本的语义性
- 避免在加载时改变按钮尺寸

### 4. 图标使用
- 图标应该增强而不是替代文本
- 保持图标简洁清晰
- 确保图标与操作相关

### 5. 无障碍访问
- 使用语义化的 type 属性
- 提供清晰的按钮文本
- 避免仅使用图标的按钮

## 🐛 常见问题

### Q: 如何改变按钮颜色？
A: 使用不同的 variant 属性，或通过 className 添加自定义样式。

### Q: 如何让按钮占满容器宽度？
A: 添加自定义样式：
```tsx
<Button className="full-width" variant="Primary">
  全宽按钮
</Button>

// CSS
.full-width {
  width: 100%;
}
```

### Q: 如何禁用按钮的点击事件？
A: 使用 disabled 属性：
```tsx
<Button disabled variant="Primary">
  禁用按钮
</Button>
```

### Q: 加载状态下按钮还能点击吗？
A: 不能，Loading 状态会自动禁用按钮。

### Q: 如何自定义加载动画？
A: 可以通过修改 Button.css 中的 `.button__spinner` 样式。

## 📚 更多资源

- [完整文档](src/components/Button/README.md)
- [组件总结](BUTTON_COMPONENT.md)
- [Figma 设计](https://figma.com/design/e6oyye9F4VSzvI5wvo1GL4/Test?node-id=225-5535)
- [Siemens iX 文档](https://ix.siemens.io/docs/controls/button)

## 🎉 开始使用

现在你已经了解了 Button 组件的基本用法，可以开始在项目中使用了！

如有问题，请查看完整文档或参考示例代码。
