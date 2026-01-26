import type { Meta, StoryObj } from '@storybook/react';
import { ApplicationHeader } from './ApplicationHeader';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

const meta: Meta<typeof ApplicationHeader> = {
  title: 'Components/ApplicationHeader',
  component: ApplicationHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '应用头部组件，用于显示应用名称、Logo、导航控制和用户头像。支持多种视口尺寸的响应式布局。',
      },
    },
  },
  argTypes: {
    // ========== 可控制的属性（视觉属性） ==========
    appName: {
      control: 'text',
      description: '应用名称',
      table: {
        category: '视觉属性',
        defaultValue: { summary: 'Application name' },
      },
    },
    appSwitch: {
      control: 'boolean',
      description: '是否显示应用切换按钮',
      table: {
        category: '视觉属性',
        defaultValue: { summary: false },
      },
    },
    slot: {
      control: 'boolean',
      description: '是否显示内容插槽',
      table: {
        category: '视觉属性',
        defaultValue: { summary: false },
      },
    },
    avatar: {
      control: 'boolean',
      description: '是否显示头像按钮',
      table: {
        category: '视觉属性',
        defaultValue: { summary: true },
      },
    },
    viewport: {
      control: 'select',
      options: ['lg', 'md', 'sm', 'sm-slot-dropdown'],
      description: '视口尺寸：lg（大屏）、md（中屏）、sm（小屏）、sm-slot-dropdown（小屏带下拉）',
      table: {
        category: '视觉属性',
        defaultValue: { summary: 'lg' },
      },
    },
    avatarInitials: {
      control: 'text',
      description: '头像初始字母',
      table: {
        category: '视觉属性',
        defaultValue: { summary: 'JD' },
      },
    },
    
    // ========== Slot 属性（显示在文档中，用于设计库绑定） ==========
    logo: {
      control: false,
      description: 'Logo 区域插槽（Slot）\n\n用于自定义 Logo 内容\n用于设计库绑定',
      table: {
        category: 'Slots',
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<div>LOGO</div>' },
      },
    },
    slotContent: {
      control: false,
      description: '内容插槽（Slot）\n\n用于插入自定义内容（如按钮、菜单等）\n用于设计库绑定',
      table: {
        category: 'Slots',
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<button>...</button>' },
      },
    },
    
    // ========== 隐藏的属性（开发者属性） ==========
    avatarImage: { table: { disable: true } },
    onAppSwitchClick: { table: { disable: true } },
    onMenuClick: { table: { disable: true } },
    onAvatarClick: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ApplicationHeader>;

// 默认故事
export const Default: Story = {
  args: {
    appName: 'Application name',
    appSwitch: false,
    slot: false,
    avatar: true,
    viewport: 'lg',
    avatarInitials: 'JD',
  },
};

// 大屏视口（带 Logo）
export const LargeViewport: Story = {
  args: {
    appName: 'Dashboard',
    appSwitch: false,
    slot: false,
    avatar: true,
    viewport: 'lg',
    avatarInitials: 'JD',
  },
};

// 大屏视口（带应用切换）
export const LargeWithAppSwitch: Story = {
  args: {
    appName: 'Project Manager',
    appSwitch: true,
    slot: false,
    avatar: true,
    viewport: 'lg',
    avatarInitials: 'AM',
  },
};

// 中等视口（Siemens Logo）
export const MediumViewport: Story = {
  args: {
    appName: 'Analytics',
    appSwitch: false,
    slot: false,
    avatar: true,
    viewport: 'md',
    avatarInitials: 'JD',
  },
};

// 中等视口（带应用切换）
export const MediumWithAppSwitch: Story = {
  args: {
    appName: 'Settings',
    appSwitch: true,
    slot: false,
    avatar: true,
    viewport: 'md',
    avatarInitials: 'JD',
  },
};

// 小屏视口
export const SmallViewport: Story = {
  args: {
    appName: 'Mobile App',
    appSwitch: false,
    slot: false,
    avatar: true,
    viewport: 'sm',
    avatarInitials: 'MA',
  },
};

// 小屏视口（带内容插槽）
export const SmallWithSlot: Story = {
  args: {
    appName: 'Mobile Dashboard',
    appSwitch: false,
    slot: true,
    avatar: true,
    viewport: 'sm',
    avatarInitials: 'JD',
  },
};

// 小屏视口（带下拉菜单）
export const SmallWithDropdown: Story = {
  args: {
    appName: 'Mobile Settings',
    appSwitch: false,
    slot: true,
    avatar: true,
    viewport: 'sm-slot-dropdown',
    avatarInitials: 'JD',
  },
  render: (args) => (
    <ApplicationHeader
      {...args}
      slotContent={
        <div style={{ padding: '8px', color: '#fff' }}>
          <button style={{ 
            padding: '8px 12px', 
            background: 'transparent', 
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            MyTenant
          </button>
        </div>
      }
    />
  ),
};

// 带自定义内容插槽
export const WithCustomSlot: Story = {
  args: {
    appName: 'Enterprise Portal',
    appSwitch: true,
    slot: true,
    avatar: true,
    viewport: 'lg',
    avatarInitials: 'EP',
  },
  render: (args) => (
    <ApplicationHeader
      {...args}
      slotContent={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button style={{ 
            padding: '4px 12px', 
            background: 'transparent', 
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            Notifications
          </button>
          <button style={{ 
            padding: '4px 12px', 
            background: 'rgba(255,255,255,0.1)', 
            border: 'none',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            Help
          </button>
        </div>
      }
    />
  ),
};

// 带自定义 Logo
export const WithCustomLogo: Story = {
  args: {
    appName: 'Custom Brand',
    appSwitch: false,
    slot: false,
    avatar: true,
    viewport: 'lg',
    avatarInitials: 'CB',
  },
  render: (args) => (
    <ApplicationHeader
      {...args}
      logo={
        <div style={{ 
          padding: '4px 12px', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '4px',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          MY BRAND
        </div>
      }
    />
  ),
};

// 带头像图片
export const WithAvatarImage: Story = {
  args: {
    appName: 'User Profile',
    appSwitch: false,
    slot: false,
    avatar: true,
    viewport: 'lg',
  },
  render: (args) => (
    <ApplicationHeader
      {...args}
      avatarImage="https://i.pravatar.cc/150?img=1"
    />
  ),
};

// 交互示例
export const Interactive: Story = {
  args: {
    appName: 'Interactive Demo',
    appSwitch: true,
    slot: true,
    avatar: true,
    viewport: 'lg',
    avatarInitials: 'ID',
  },
  render: (args) => (
    <ApplicationHeader
      {...args}
      onAppSwitchClick={() => console.log('App switch clicked')}
      onMenuClick={() => console.log('Menu clicked')}
      onAvatarClick={() => console.log('Avatar clicked')}
      slotContent={
        <button 
          onClick={() => console.log('Custom button clicked')}
          style={{ 
            padding: '4px 12px', 
            background: 'transparent', 
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Settings
        </button>
      }
    />
  ),
};

// 所有视口对比
export const AllViewports: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', background: '#1a1a1a' }}>
      <div>
        <h3 style={{ color: '#fff', marginBottom: '8px' }}>Large Viewport</h3>
        <ApplicationHeader
          appName="Large Viewport Example"
          appSwitch={true}
          slot={true}
          avatar={true}
          viewport="lg"
          avatarInitials="LG"
        />
      </div>
      
      <div>
        <h3 style={{ color: '#fff', marginBottom: '8px' }}>Medium Viewport</h3>
        <ApplicationHeader
          appName="Medium Viewport Example"
          appSwitch={true}
          slot={true}
          avatar={true}
          viewport="md"
          avatarInitials="MD"
        />
      </div>
      
      <div>
        <h3 style={{ color: '#fff', marginBottom: '8px' }}>Small Viewport</h3>
        <ApplicationHeader
          appName="Small Viewport Example"
          appSwitch={false}
          slot={true}
          avatar={true}
          viewport="sm"
          avatarInitials="SM"
        />
      </div>
      
      <div>
        <h3 style={{ color: '#fff', marginBottom: '8px' }}>Small Viewport with Dropdown</h3>
        <ApplicationHeader
          appName="Small with Dropdown"
          appSwitch={false}
          slot={true}
          avatar={true}
          viewport="sm-slot-dropdown"
          avatarInitials="SD"
        />
      </div>
    </div>
  ),
};
