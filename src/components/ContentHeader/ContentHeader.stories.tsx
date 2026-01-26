import type { Meta, StoryObj } from '@storybook/react';
import { ContentHeader } from './ContentHeader';
import { Button } from '../Button/Button';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

const meta: Meta<typeof ContentHeader> = {
  title: 'Components/ContentHeader',
  component: ContentHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '页面头部组件，用于显示页面标题、副标题和操作按钮。支持 Primary 和 Secondary 两种变体。',
      },
    },
  },
  argTypes: {
    // ========== 可控制的属性（视觉属性） ==========
    headerTitle: {
      control: 'text',
      description: '标题文本',
      table: {
        category: '视觉属性',
        defaultValue: { summary: 'Content header' },
      },
    },
    headerSubtitle: {
      control: 'text',
      description: '副标题文本',
      table: {
        category: '视觉属性',
        defaultValue: { summary: 'Subtitle' },
      },
    },
    showHeaderSubtitle: {
      control: 'boolean',
      description: '是否显示副标题',
      table: {
        category: '视觉属性',
        defaultValue: { summary: true },
      },
    },
    hasBackButton: {
      control: 'boolean',
      description: '是否显示返回按钮',
      table: {
        category: '视觉属性',
        defaultValue: { summary: false },
      },
    },
    variant: {
      control: 'select',
      options: ['Primary', 'Secondary'],
      description: '变体类型：Primary 用于主要内容，Secondary 用于次要内容',
      table: {
        category: '视觉属性',
        defaultValue: { summary: 'Primary' },
      },
    },
    
    // ========== Slot 属性（显示在文档中，用于设计库绑定） ==========
    actions: {
      control: false,
      description: '操作按钮区域插槽（Slot）\n\n用于插入操作按钮（如 Button 组件）\n用于设计库绑定',
      table: {
        category: 'Slots',
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<Button /> × N' },
      },
    },
    
    // ========== 隐藏的属性（开发者属性） ==========
    onBackClick: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ContentHeader>;

// 默认故事
export const Default: Story = {
  args: {
    headerTitle: 'Content header',
    headerSubtitle: 'Subtitle',
    showHeaderSubtitle: true,
    hasBackButton: false,
    variant: 'Primary',
  },
};

// Primary 变体
export const Primary: Story = {
  args: {
    headerTitle: 'Dashboard',
    headerSubtitle: 'Overview of your system',
    showHeaderSubtitle: true,
    hasBackButton: false,
    variant: 'Primary',
  },
};

// Secondary 变体
export const Secondary: Story = {
  args: {
    headerTitle: 'Device Details',
    headerSubtitle: 'Device ID: 12345',
    showHeaderSubtitle: true,
    hasBackButton: false,
    variant: 'Secondary',
  },
};

// 带返回按钮
export const WithBackButton: Story = {
  args: {
    headerTitle: 'Settings',
    headerSubtitle: 'Configure your preferences',
    showHeaderSubtitle: true,
    hasBackButton: true,
    variant: 'Primary',
  },
};

// 不显示副标题
export const WithoutSubtitle: Story = {
  args: {
    headerTitle: 'Reports',
    showHeaderSubtitle: false,
    hasBackButton: false,
    variant: 'Primary',
  },
};

// 带操作按钮
export const WithActions: Story = {
  args: {
    headerTitle: 'User Profile',
    headerSubtitle: 'Manage your account',
    showHeaderSubtitle: true,
    hasBackButton: true,
    variant: 'Primary',
  },
  render: (args) => (
    <ContentHeader
      {...args}
      actions={
        <>
          <Button label="Edit" variant="Secondary" showIcon={false} />
          <Button label="Save" variant="Primary" showIcon={false} />
        </>
      }
      onBackClick={() => console.log('Back clicked')}
    />
  ),
};

// 完整示例
export const FullExample: Story = {
  args: {
    headerTitle: 'Project Management',
    headerSubtitle: 'Active projects: 12',
    showHeaderSubtitle: true,
    hasBackButton: true,
    variant: 'Primary',
  },
  render: (args) => (
    <div style={{ padding: '24px', background: '#1a1a1a', minHeight: '200px' }}>
      <ContentHeader
        {...args}
        actions={
          <>
            <Button label="Filter" variant="Secondary outline" showIcon={false} />
            <Button label="New Project" variant="Primary" showIcon={false} />
          </>
        }
        onBackClick={() => console.log('Back to home')}
      />
      <div style={{ marginTop: '24px', color: '#fff', opacity: 0.6 }}>
        Page content goes here...
      </div>
    </div>
  ),
};

// Secondary 带操作按钮
export const SecondaryWithActions: Story = {
  args: {
    headerTitle: 'Device Configuration',
    headerSubtitle: 'Last updated: 2 hours ago',
    showHeaderSubtitle: true,
    hasBackButton: true,
    variant: 'Secondary',
  },
  render: (args) => (
    <div style={{ padding: '24px', background: '#1a1a1a', minHeight: '200px' }}>
      <ContentHeader
        {...args}
        actions={
          <>
            <Button label="Reset" variant="Danger outline" showIcon={false} />
            <Button label="Apply" variant="Primary" showIcon={false} />
          </>
        }
        onBackClick={() => console.log('Back to devices')}
      />
    </div>
  ),
};
