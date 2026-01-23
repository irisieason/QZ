# EventListItem 组件

EventListItem 组件用于显示事件列表项，支持不同的严重性级别、状态和选中效果。

## 功能特性

- ✅ 支持多种严重性级别（alarm、warning、critical、info、success、neutral）
- ✅ 支持多种状态（Default、Hover、Active、Disabled）
- ✅ 支持选中状态和聚焦状态
- ✅ 可选的右侧箭头图标
- ✅ 灵活的内容插槽
- ✅ 完整的可访问性支持

## 基本用法

```tsx
import { EventListItem } from '@irisieason/ix-react';

function App() {
  return (
    <EventListItem severity="alarm">
      <div>
        <div>System Alert</div>
        <div>Critical system error detected</div>
      </div>
    </EventListItem>
  );
}
```

## Figma 定义的属性

以下属性严格遵循 Figma 设计规范：

### chevron

- 类型: `boolean`
- 默认值: `true`
- 描述: 是否显示右侧箭头图标

```tsx
<EventListItem chevron={true}>Content</EventListItem>
<EventListItem chevron={false}>Content</EventListItem>
```

### focused

- 类型: `boolean`
- 默认值: `false`
- 描述: 是否显示聚焦状态（蓝色轮廓）

```tsx
<EventListItem focused={true}>Content</EventListItem>
```

### state

- 类型: `'Default' | 'Hover' | 'Active' | 'Disabled'`
- 默认值: `'Default'`
- 描述: 组件状态（可选，如果不提供则组件内部自动管理）

```tsx
<EventListItem state="Hover">Content</EventListItem>
<EventListItem state="Disabled">Content</EventListItem>
```

### selected

- 类型: `boolean`
- 默认值: `false`
- 描述: 是否选中（显示蓝色边框）

```tsx
<EventListItem selected={true}>Content</EventListItem>
```

## 扩展属性

以下属性为 React 实现的扩展属性，非 Figma 定义：

### severity

- 类型: `'alarm' | 'warning' | 'critical' | 'info' | 'success' | 'neutral'`
- 默认值: `'alarm'`
- 描述: 严重性指示器颜色

```tsx
<EventListItem severity="alarm">Critical Error</EventListItem>
<EventListItem severity="warning">Warning Message</EventListItem>
<EventListItem severity="info">Information</EventListItem>
<EventListItem severity="success">Success Message</EventListItem>
```

### children

- 类型: `React.ReactNode`
- 描述: 内容插槽，可以放置任意 React 元素

```tsx
<EventListItem>
  <div>
    <h3>Event Title</h3>
    <p>Event description</p>
  </div>
</EventListItem>
```

### onClick

- 类型: `(event: React.MouseEvent<HTMLDivElement>) => void`
- 描述: 点击事件处理函数

```tsx
<EventListItem onClick={() => console.log('Clicked')}>
  Content
</EventListItem>
```

## 使用示例

### 基本事件列表

```tsx
import { EventListItem } from '@irisieason/ix-react';

function EventList() {
  const [selectedId, setSelectedId] = useState('event-1');

  const events = [
    { id: 'event-1', severity: 'alarm', title: 'Critical Error', description: 'System failure' },
    { id: 'event-2', severity: 'warning', title: 'Warning', description: 'High CPU usage' },
    { id: 'event-3', severity: 'info', title: 'Information', description: 'Update available' },
  ];

  return (
    <div>
      {events.map((event) => (
        <EventListItem
          key={event.id}
          severity={event.severity}
          selected={selectedId === event.id}
          onClick={() => setSelectedId(event.id)}
        >
          <div>
            <div>{event.title}</div>
            <div>{event.description}</div>
          </div>
        </EventListItem>
      ))}
    </div>
  );
}
```

### 无箭头的事件项

```tsx
<EventListItem chevron={false} severity="info">
  <div>Simple event without chevron</div>
</EventListItem>
```

### 禁用状态

```tsx
<EventListItem state="Disabled" severity="warning">
  <div>Disabled event item</div>
</EventListItem>
```

### 聚焦状态

```tsx
<EventListItem focused={true} severity="success">
  <div>Focused event item</div>
</EventListItem>
```

## 样式定制

组件使用 CSS 变量进行样式定制，可以通过覆盖以下变量来自定义外观：

```css
.event-list-item {
  --color-component-1: /* 背景色 */
  --color-component-1--hover: /* Hover 背景色 */
  --color-component-1--active: /* Active 背景色 */
  --color-alarm: /* 告警颜色 */
  --color-warning: /* 警告颜色 */
  --color-critical: /* 严重颜色 */
  --color-info: /* 信息颜色 */
  --color-success: /* 成功颜色 */
  --color-neutral: /* 中性颜色 */
  --color-focus-bdr: /* 聚焦边框颜色 */
  --color-dynamic: /* 选中边框颜色 */
}
```

## 可访问性

组件内置了完整的可访问性支持：

- 使用 `role="listitem"` 标识列表项
- 支持 `aria-label` 属性
- 自动设置 `aria-selected` 和 `aria-disabled` 状态
- 支持键盘导航和焦点管理

```tsx
<EventListItem aria-label="Critical system alert">
  Content
</EventListItem>
```

## 设计规范

- 最小高度: 80px
- 严重性指示器宽度: 8px
- 内容区域内边距: 16px
- 箭头图标尺寸: 24px
- 边框圆角: 4px

## 注意事项

1. **Figma 属性优先**: 组件严格遵循 Figma 设计规范，所有核心属性都来自 Figma 定义
2. **图标使用**: 箭头图标使用 `@irisieason/ix-icons` 包的 `chevron-right-small` 图标
3. **状态管理**: 如果不提供 `state` 属性，组件会自动管理内部状态（Hover、Active）
4. **选中状态**: `selected` 状态会显示蓝色边框，并保持 Hover 背景色
5. **响应式**: 在小屏幕（< 768px）上，最小高度调整为 64px

## TypeScript 类型

```typescript
// Figma 定义的状态类型
export type EventListItemState = 'Default' | 'Hover' | 'Active' | 'Disabled';

// 严重性颜色类型
export type SeverityColor = 
  | 'alarm' 
  | 'warning' 
  | 'critical' 
  | 'info' 
  | 'success' 
  | 'neutral';

// 组件属性
export interface EventListItemProps {
  // Figma 定义的属性
  chevron?: boolean;
  focused?: boolean;
  state?: EventListItemState;
  selected?: boolean;
  
  // 扩展属性
  severity?: SeverityColor;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  'aria-label'?: string;
}
```
