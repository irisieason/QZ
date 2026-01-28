import type { Meta, StoryObj } from '@storybook/react';
import { ApplicationHeader } from './ApplicationHeader';
import { Avatar } from '../Avatar';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

const meta: Meta<typeof ApplicationHeader> = {
  title: 'Components/ApplicationHeader',
  component: ApplicationHeader,
  parameters: {
    layout: 'fullscreen', // Header 组件确实需要 fullscreen，因为它是页面级组件
    docs: {
      description: {
        component: '应用头部组件，用于显示应用名称、Logo、导航控制和用户头像。',
      },
    },
  },
  argTypes: {
    // ========== Figma Props（可控制的属性） ==========
    appName: {
      control: 'text',
      description: '应用名称',
      table: {
        category: 'Figma Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'Application name' },
      },
    },
    avatar: {
      control: 'boolean',
      description: '是否显示头像',
      table: {
        category: 'Figma Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    appSwitch: {
      control: 'boolean',
      description: '是否显示应用切换按钮',
      table: {
        category: 'Figma Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    
    // ========== Slot 属性（用于设计库绑定） ==========
    children: {
      name: 'avatarSlot (children)',
      control: false,
      description: '**Avatar 组件插槽**\n\n用于插入 Avatar 组件作为用户头像。\n\n使用方式：\n```tsx\n<ApplicationHeader appName="My App">\n  <Avatar text="JD" />\n</ApplicationHeader>\n```\n\n💡 用于 Figma Code Connect 设计库绑定。',
      table: {
        category: 'Slots',
        type: { summary: 'Avatar 组件' },
      },
    },
    
    // ========== 隐藏的属性（开发者需要但设计师不需要） ==========
    onAppSwitchClick: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ApplicationHeader>;

// 默认状态
export const Default: Story = {
  args: {
    appName: 'Application name',
    avatar: true,
    appSwitch: false,
  },
  render: (args) => (
    <ApplicationHeader {...args}>
      <Avatar text="JD" />
    </ApplicationHeader>
  ),
};

// 带应用切换按钮
export const WithAppSwitch: Story = {
  args: {
    appName: 'Application name',
    avatar: true,
    appSwitch: true,
  },
  render: (args) => (
    <ApplicationHeader {...args}>
      <Avatar text="JD" />
    </ApplicationHeader>
  ),
};

// 不显示头像
export const WithoutAvatar: Story = {
  args: {
    appName: 'Application name',
    avatar: false,
    appSwitch: false,
  },
};

// 长应用名称
export const LongAppName: Story = {
  args: {
    appName: 'Very Long Application Name That Should Be Truncated',
    avatar: true,
    appSwitch: true,
  },
  render: (args) => (
    <ApplicationHeader {...args}>
      <Avatar text="VL" />
    </ApplicationHeader>
  ),
};

// 不同的头像
export const DifferentAvatars: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ApplicationHeader appName="User 1" avatar={true} appSwitch={false}>
        <Avatar text="JD" />
      </ApplicationHeader>
      
      <ApplicationHeader appName="User 2" avatar={true} appSwitch={false}>
        <Avatar text="AM" />
      </ApplicationHeader>
      
      <ApplicationHeader appName="User 3" avatar={true} appSwitch={false}>
        <Avatar text="SK" />
      </ApplicationHeader>
    </div>
  ),
};

// 交互示例
export const Interactive: Story = {
  args: {
    appName: 'Interactive Demo',
    avatar: true,
    appSwitch: true,
  },
  render: (args) => (
    <ApplicationHeader
      {...args}
      onAppSwitchClick={() => console.log('App switch clicked')}
    >
      <Avatar text="ID" />
    </ApplicationHeader>
  ),
};

// 所有状态展示
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ color: '#fff', marginBottom: '8px', padding: '0 16px' }}>Default</h3>
        <ApplicationHeader appName="Application name" avatar={true} appSwitch={false}>
          <Avatar text="JD" />
        </ApplicationHeader>
      </div>
      
      <div>
        <h3 style={{ color: '#fff', marginBottom: '8px', padding: '0 16px' }}>With App Switch</h3>
        <ApplicationHeader appName="Application name" avatar={true} appSwitch={true}>
          <Avatar text="JD" />
        </ApplicationHeader>
      </div>
      
      <div>
        <h3 style={{ color: '#fff', marginBottom: '8px', padding: '0 16px' }}>Without Avatar</h3>
        <ApplicationHeader appName="Application name" avatar={false} appSwitch={false} />
      </div>
      
      <div>
        <h3 style={{ color: '#fff', marginBottom: '8px', padding: '0 16px' }}>All Features</h3>
        <ApplicationHeader appName="Full Featured App" avatar={true} appSwitch={true}>
          <Avatar text="FF" />
        </ApplicationHeader>
      </div>
    </div>
  ),
};
