import type { Meta, StoryObj } from '@storybook/react';
import { EventItemContent } from './EventItemContent';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';
// 使用 Button 组件的完整图标列表
import { availableIcons } from '../Button/icon-list';

// 注册所有图标
addIcons(allIcons);

const meta: Meta<typeof EventItemContent> = {
  title: 'Components/EventItemContent',
  component: EventItemContent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
EventItemContent 组件用于显示事件项的详细内容，包括图标、标题、副标题、子信息、时间戳和操作按钮。

**主要功能：**
- 左侧图标显示事件类型
- 主标题和副标题显示事件信息
- 子信息显示事件来源路径
- 时间戳显示事件发生时间
- 右上角图标按钮用于更多操作
- 右侧按钮用于主要操作

**使用场景：**
- 事件列表项内容
- 警报和通知详情
- 系统消息展示
        `,
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
  tags: ['autodocs'],
  argTypes: {
    // ========== Figma Props（可控制的属性） ==========
    icon: {
      control: 'select',
      options: availableIcons,
      description: '左侧图标名称（来自 ix-icons）',
      table: {
        category: 'Figma Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'alarm-bell' },
      },
    },
    header: {
      control: 'text',
      description: '主标题',
      table: {
        category: 'Figma Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'Alarm: High temperature' },
      },
    },
    subheader: {
      control: 'text',
      description: '副标题',
      table: {
        category: 'Figma Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'A1214-11241-101' },
      },
    },
    subInfo: {
      control: 'text',
      description: '子信息（事件来源路径）',
      table: {
        category: 'Figma Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'MyPlant › Cooling water circuit' },
      },
    },
    timestamp: {
      control: 'text',
      description: '时间戳',
      table: {
        category: 'Figma Props',
        type: { summary: 'string' },
        defaultValue: { summary: '2022-11-05, 08:51:21' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      table: {
        category: 'Figma Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    iconButton: {
      control: 'select',
      options: availableIcons,
      description: '右上角图标按钮的图标名称',
      table: {
        category: 'Figma Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'about' },
      },
    },
    buttonLabel: {
      control: 'text',
      description: '右侧按钮文本',
      table: {
        category: 'Figma Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'Button' },
      },
    },
    showButton: {
      control: 'boolean',
      description: '是否显示右侧按钮',
      table: {
        category: 'Figma Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    
    // ========== 隐藏的属性（开发者需要但设计师不需要） ==========
    onClick: { table: { disable: true } },
    onButtonClick: { table: { disable: true } },
    onIconButtonClick: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof EventItemContent>;

// 默认状态
export const Default: Story = {
  args: {
    icon: 'alarm-bell',
    header: 'Alarm: High temperature',
    subheader: 'A1214-11241-101',
    subInfo: 'MyPlant › Cooling water circuit',
    timestamp: '2022-11-05\n08:51:21',
    disabled: false,
    iconButton: 'about',
    buttonLabel: 'Button',
    showButton: true,
  },
};

// 禁用状态
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// 无按钮
export const WithoutButton: Story = {
  args: {
    ...Default.args,
    showButton: false,
  },
};

// 不同图标示例
export const WithWarningIcon: Story = {
  args: {
    ...Default.args,
    icon: 'warning',
    header: 'Warning: System overload',
    subheader: 'W5678-22334-202',
    subInfo: 'MainServer › Processing unit',
  },
};

export const WithInfoIcon: Story = {
  args: {
    ...Default.args,
    icon: 'info',
    header: 'Info: Maintenance scheduled',
    subheader: 'I9012-33445-303',
    subInfo: 'DataCenter › Cooling system',
  },
};

export const WithSuccessIcon: Story = {
  args: {
    ...Default.args,
    icon: 'checkmark',
    header: 'Success: Backup completed',
    subheader: 'S3456-44556-404',
    subInfo: 'BackupServer › Storage array',
  },
};

// 不同按钮文本
export const WithAcknowledgeButton: Story = {
  args: {
    ...Default.args,
    buttonLabel: 'Acknowledge',
  },
};

export const WithResolveButton: Story = {
  args: {
    ...Default.args,
    buttonLabel: 'Resolve',
  },
};

// 长文本示例
export const LongText: Story = {
  args: {
    ...Default.args,
    header: 'Critical Alarm: Temperature exceeds maximum threshold in cooling system',
    subheader: 'A1234567890-11223344556677-999888777',
    subInfo: 'MyPlant › Building A › Floor 3 › Room 301 › Cooling water circuit › Pump Station 1',
  },
};

// 多个事件内容展示
export const MultipleEvents: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '8px',
      backgroundColor: '#000028',
      padding: '16px',
      borderRadius: '8px',
    }}>
      <EventItemContent
        icon="alarm-bell"
        header="Alarm: High temperature"
        subheader="A1214-11241-101"
        subInfo="MyPlant › Cooling water circuit"
        timestamp="2022-11-05, 08:51:21"
        buttonLabel="Acknowledge"
      />
      <EventItemContent
        icon="warning"
        header="Warning: System overload"
        subheader="W5678-22334-202"
        subInfo="MainServer › Processing unit"
        timestamp="2022-11-05, 08:45:10"
        buttonLabel="Investigate"
      />
      <EventItemContent
        icon="info"
        header="Info: Maintenance scheduled"
        subheader="I9012-33445-303"
        subInfo="DataCenter › Cooling system"
        timestamp="2022-11-05, 08:30:00"
        buttonLabel="View Details"
      />
      <EventItemContent
        icon="checkmark"
        header="Success: Backup completed"
        subheader="S3456-44556-404"
        subInfo="BackupServer › Storage array"
        timestamp="2022-11-05, 08:15:45"
        showButton={false}
      />
    </div>
  ),
};

// 交互示例
export const Interactive: Story = {
  args: {
    ...Default.args,
    onClick: () => console.log('Content clicked'),
    onButtonClick: () => console.log('Button clicked'),
    onIconButtonClick: () => console.log('Icon button clicked'),
  },
};

