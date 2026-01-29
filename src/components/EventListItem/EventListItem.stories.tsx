import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EventListItem } from './EventListItem';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

const meta: Meta<typeof EventListItem> = {
  title: 'Components/EventListItem',
  component: EventListItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'EventListItem 组件用于显示事件列表项，支持不同的严重性级别、状态和选中效果。',
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000028' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '432px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    // Figma 定义的属性
    chevron: {
      control: 'boolean',
      description: '是否显示右侧箭头',
      table: {
        category: 'Figma Props',
      },
    },
    focused: {
      control: 'boolean',
      description: '是否显示聚焦状态',
      table: {
        category: 'Figma Props',
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      table: {
        category: 'Figma Props',
      },
    },
    selected: {
      control: false, // 禁用控制，通过点击交互
      description: '是否选中（通过点击交互控制，点击组件选中，点击外部取消选中）',
      table: {
        category: 'Figma Props',
      },
    },
    // 扩展属性
    severity: {
      control: 'select',
      options: ['alarm', 'warning', 'critical', 'info', 'success', 'neutral'],
      description: '严重性指示器颜色 - 扩展属性',
      table: {
        category: 'Extended Props',
      },
    },
    
    // ========== Slot 属性（用于设计库绑定） ==========
    children: {
      name: 'contentSlot (children)',
      control: false,
      description: '**EventItemContent 组件插槽**\n\n用于插入事件内容组件（EventItemContent）。\n\n使用方式：\n```tsx\n<EventListItem severity="alarm">\n  <EventItemContent\n    title="System Alert"\n    description="Critical error"\n    time="10:30 AM"\n  />\n</EventListItem>\n```\n\n💡 用于 Figma Code Connect 设计库绑定。',
      table: {
        category: 'Slots',
        type: { summary: 'EventItemContent 组件' },
        defaultValue: { summary: '必需' },
      },
    },
    
    // ========== 隐藏的属性（开发者需要但设计师不需要） ==========
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
} satisfies Meta<typeof EventListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// 默认状态 - 非受控模式，点击交互
export const Default: Story = {
  args: {
    chevron: true,
    focused: false,
    disabled: false,
    // 不设置 selected，让组件自动管理
    severity: 'alarm',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>
          System Alert (点击选中，点击外部取消)
        </div>
        <div style={{ fontSize: '12px', color: '#9d9d96' }}>
          Critical system error detected at 10:30 AM
        </div>
      </div>
    ),
  },
};

// Disabled 状态
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>
          Disabled Event (无法交互)
        </div>
        <div style={{ fontSize: '12px', color: '#9d9d96' }}>
          This event item is disabled
        </div>
      </div>
    ),
  },
};

// 选中状态 - 受控模式示例
export const SelectedControlled: Story = {
  args: {
    ...Default.args,
    selected: true,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>
          受控模式 - 始终选中
        </div>
        <div style={{ fontSize: '12px', color: '#9d9d96' }}>
          通过 selected prop 控制
        </div>
      </div>
    ),
  },
};

// 聚焦状态
export const Focused: Story = {
  args: {
    ...Default.args,
    focused: true,
  },
};

// 无箭头
export const NoChevron: Story = {
  args: {
    ...Default.args,
    chevron: false,
  },
};

// 不同严重性级别
export const Warning: Story = {
  args: {
    ...Default.args,
    severity: 'warning',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>
          Warning Message
        </div>
        <div style={{ fontSize: '12px', color: '#9d9d96' }}>
          System performance degraded
        </div>
      </div>
    ),
  },
};

export const Info: Story = {
  args: {
    ...Default.args,
    severity: 'info',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>
          Information
        </div>
        <div style={{ fontSize: '12px', color: '#9d9d96' }}>
          System update available
        </div>
      </div>
    ),
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    severity: 'success',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>
          Success
        </div>
        <div style={{ fontSize: '12px', color: '#9d9d96' }}>
          Operation completed successfully
        </div>
      </div>
    ),
  },
};

// 事件列表示例
export const EventList: Story = {
  render: function EventListStory() {
    const [selectedId, setSelectedId] = React.useState<string>('event-1');

    const events = [
      { id: 'event-1', severity: 'alarm' as const, title: 'Critical Error', description: 'System failure detected', time: '10:30 AM' },
      { id: 'event-2', severity: 'warning' as const, title: 'Warning', description: 'High CPU usage', time: '10:25 AM' },
      { id: 'event-3', severity: 'info' as const, title: 'Information', description: 'Update available', time: '10:20 AM' },
      { id: 'event-4', severity: 'success' as const, title: 'Success', description: 'Backup completed', time: '10:15 AM' },
    ];

    return (
      <div style={{ width: '432px', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#000028', padding: '16px', borderRadius: '8px' }}>
        {events.map((event) => (
          <EventListItem
            key={event.id}
            severity={event.severity}
            selected={selectedId === event.id}
            onClick={() => setSelectedId(event.id)}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>
                  {event.title}
                </div>
                <div style={{ fontSize: '12px', color: '#9d9d96' }}>
                  {event.time}
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#9d9d96' }}>
                {event.description}
              </div>
            </div>
          </EventListItem>
        ))}
      </div>
    );
  },
};
