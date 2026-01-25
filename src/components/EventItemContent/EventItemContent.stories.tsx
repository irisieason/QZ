import type { Meta, StoryObj } from '@storybook/react';
import { EventItemContent } from './EventItemContent';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

const meta: Meta<typeof EventItemContent> = {
  title: 'Components/EventItemContent',
  component: EventItemContent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'EventItemContent 组件用于显示事件列表项的详细内容，包含图标、标题、子信息、时间戳和操作按钮。',
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
      <div style={{ 
        width: '100%', 
        maxWidth: '100vw',
        padding: '20px', 
        backgroundColor: '#000028',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    // Figma 定义的属性
    header: {
      control: 'text',
      description: '主标题',
      table: {
        category: 'Figma Props',
      },
    },
    subheader: {
      control: 'text',
      description: '副标题',
      table: {
        category: 'Figma Props',
      },
    },
    subInfo: {
      control: 'text',
      description: '子信息',
      table: {
        category: 'Figma Props',
      },
    },
    timestamp: {
      control: 'text',
      description: '时间戳',
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
    
    // ========== 隐藏的属性（开发者需要但设计师不需要） ==========
    icon: { table: { disable: true } },
    actionIcon: { table: { disable: true } },
    buttonLabel: { table: { disable: true } },
    onButtonClick: { table: { disable: true } },
    onActionClick: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof EventItemContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// 默认状态
export const Default: Story = {
  args: {
    header: 'Alarm: High temperature',
    subheader: 'A1214-11241-101',
    subInfo: 'MyPlant › Cooling water circuit',
    timestamp: '2022-11-05\n08:51:21',
    disabled: false,
    icon: 'alarm-bell',
    actionIcon: 'about',
    buttonLabel: 'Button',
  },
};

// 禁用状态
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// 不同图标
export const WithWarningIcon: Story = {
  args: {
    ...Default.args,
    header: 'Warning: System performance',
    icon: 'warning',
  },
};

export const WithInfoIcon: Story = {
  args: {
    ...Default.args,
    header: 'Info: Update available',
    icon: 'info',
  },
};

// 长文本测试
export const LongText: Story = {
  args: {
    ...Default.args,
    header: 'Alarm: Very long temperature warning message that should be truncated with ellipsis',
    subheader: 'A1214-11241-101-VERY-LONG-IDENTIFIER-THAT-SHOULD-BE-TRUNCATED',
    subInfo: 'MyPlant › Cooling water circuit › Building A › Floor 3 › Room 301 › Equipment 12345',
  },
};

// 在 EventListItem 中使用
export const InEventListItem: Story = {
  render: () => {
    return (
      <div style={{ 
        backgroundColor: 'rgba(140, 161, 171, 0.2)', 
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <EventItemContent
          header="Alarm: High temperature"
          subheader="A1214-11241-101"
          subInfo="MyPlant › Cooling water circuit"
          timestamp="2022-11-05\n08:51:21"
          icon="alarm-bell"
          actionIcon="about"
          buttonLabel="Button"
        />
      </div>
    );
  },
};
