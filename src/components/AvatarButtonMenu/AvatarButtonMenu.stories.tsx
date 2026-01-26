import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AvatarButtonMenu } from './AvatarButtonMenu';
import { Avatar } from '../Avatar';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

const meta: Meta<typeof AvatarButtonMenu> = {
  title: 'Components/AvatarButtonMenu',
  component: AvatarButtonMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // ========== 可控制的属性（视觉属性） ==========
    focused: {
      control: 'boolean',
      description: '是否显示聚焦状态',
      table: {
        category: 'Visual Props',
      },
    },
    state: {
      control: 'select',
      options: ['Default', 'Hover', 'Active'],
      description: '组件状态',
      table: {
        category: 'Visual Props',
      },
    },
    expand: {
      control: 'boolean',
      description: '是否展开显示完整信息',
      table: {
        category: 'Visual Props',
      },
    },
    email: {
      control: 'text',
      description: '用户邮箱',
      table: {
        category: 'Visual Props',
      },
    },
    role: {
      control: 'text',
      description: '用户角色',
      table: {
        category: 'Visual Props',
      },
    },
    
    // ========== Slot 属性（插槽，用于插入子组件） ==========
    children: {
      name: 'avatarSlot (children)',
      control: false,
      description: '**Avatar 组件插槽**\n\n必须传入一个 Avatar 组件作为用户头像。\n\n使用方式：\n```tsx\n<AvatarButtonMenu\n  email="john.doe@company.com"\n  role="Administrator"\n>\n  <Avatar text="JD" />\n</AvatarButtonMenu>\n```\n\n💡 这是一个插槽（Slot），用于 Figma Code Connect 设计库绑定。',
      table: {
        category: 'Slots',
        type: { summary: 'Avatar 组件' },
        defaultValue: { summary: '必需' },
      },
    },
    
    // ========== 隐藏的属性（开发者需要但设计师不需要） ==========
    onClick: { table: { disable: true } },
    onProfileClick: { table: { disable: true } },
    onLogoutClick: { table: { disable: true } },
    className: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarButtonMenu>;

// 默认状态（展开）
export const Default: Story = {
  args: {
    focused: false,
    expand: true,
    email: 'john.doe@company.com',
    role: 'Administrator',
  },
  render: (args) => (
    <AvatarButtonMenu {...args}>
      <Avatar text="JD" />
    </AvatarButtonMenu>
  ),
};

// 收起状态（只显示头像）
export const Collapsed: Story = {
  args: {
    focused: false,
    expand: false,
    email: 'john.doe@company.com',
    role: 'Administrator',
  },
  render: (args) => (
    <AvatarButtonMenu {...args}>
      <Avatar text="JD" />
    </AvatarButtonMenu>
  ),
};

// 非受控模式（自动交互）
export const Uncontrolled: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <p style={{ color: 'white', marginBottom: '16px' }}>
        自动交互：鼠标悬停显示 hover 状态，点击展开/关闭下拉菜单
      </p>
      <AvatarButtonMenu
        email="john.doe@company.com"
        role="Administrator"
        onProfileClick={() => console.log('Profile clicked')}
        onLogoutClick={() => console.log('Logout clicked')}
      >
        <Avatar text="JD" />
      </AvatarButtonMenu>
    </div>
  ),
};

// 悬停状态（展开）
export const HoverExpanded: Story = {
  args: {
    focused: false,
    state: 'Hover',
    expand: true,
    email: 'john.doe@company.com',
    role: 'Administrator',
  },
  render: (args) => (
    <AvatarButtonMenu {...args}>
      <Avatar text="JD" />
    </AvatarButtonMenu>
  ),
};

// 悬停状态（收起）
export const HoverCollapsed: Story = {
  args: {
    focused: false,
    state: 'Hover',
    expand: false,
    email: 'john.doe@company.com',
    role: 'Administrator',
  },
  render: (args) => (
    <AvatarButtonMenu {...args}>
      <Avatar text="JD" />
    </AvatarButtonMenu>
  ),
};

// 激活状态（展开，显示下拉菜单）
export const ActiveExpanded: Story = {
  args: {
    focused: false,
    state: 'Active',
    expand: true,
    email: 'john.doe@company.com',
    role: 'Administrator',
  },
  render: (args) => (
    <AvatarButtonMenu {...args}>
      <Avatar text="JD" />
    </AvatarButtonMenu>
  ),
};

// 激活状态（收起，显示下拉菜单）
export const ActiveCollapsed: Story = {
  args: {
    focused: false,
    state: 'Active',
    expand: false,
    email: 'john.doe@company.com',
    role: 'Administrator',
  },
  render: (args) => (
    <AvatarButtonMenu {...args}>
      <Avatar text="JD" />
    </AvatarButtonMenu>
  ),
};

// 聚焦状态
export const Focused: Story = {
  args: {
    focused: true,
    state: 'Default',
    email: 'john.doe@company.com',
    role: 'Administrator',
  },
  render: (args) => (
    <AvatarButtonMenu {...args}>
      <Avatar text="JD" />
    </AvatarButtonMenu>
  ),
};

// 不同首字母
export const DifferentInitials: Story = {
  args: {
    focused: false,
    state: 'Default',
    email: 'jane.smith@company.com',
    role: 'Developer',
  },
  render: (args) => (
    <AvatarButtonMenu {...args}>
      <Avatar text="JS" />
    </AvatarButtonMenu>
  ),
};

// 交互式示例（受控模式）
export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, setState] = React.useState<'Default' | 'Hover' | 'Active'>('Default');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const containerRef = React.useRef<HTMLDivElement>(null);

    // 点击外部关闭下拉菜单
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setState('Default');
        }
      };

      if (state === 'Active') {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [state]);

    const handleClick = () => {
      setState(state === 'Active' ? 'Default' : 'Active');
    };

    const handleMouseEnter = () => {
      if (state !== 'Active') {
        setState('Hover');
      }
    };

    const handleMouseLeave = () => {
      if (state !== 'Active') {
        setState('Default');
      }
    };

    const handleProfileClick = () => {
      console.log('Profile clicked');
      setState('Default');
    };

    const handleLogoutClick = () => {
      console.log('Logout clicked');
      setState('Default');
    };

    return (
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ padding: '20px' }}
      >
        <AvatarButtonMenu
          state={state}
          email="john.doe@company.com"
          role="Administrator"
          onClick={handleClick}
          onProfileClick={handleProfileClick}
          onLogoutClick={handleLogoutClick}
        >
          <Avatar text="JD" />
        </AvatarButtonMenu>
      </div>
    );
  },
};

// 不同用户信息
export const DifferentUsers: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <AvatarButtonMenu
        email="john.doe@company.com"
        role="Administrator"
      >
        <Avatar text="JD" />
      </AvatarButtonMenu>
      <AvatarButtonMenu
        email="jane.smith@company.com"
        role="Developer"
      >
        <Avatar text="JS" />
      </AvatarButtonMenu>
      <AvatarButtonMenu
        email="alice.johnson@company.com"
        role="Designer"
      >
        <Avatar text="AJ" />
      </AvatarButtonMenu>
      <AvatarButtonMenu
        email="bob.wilson@company.com"
        role="Manager"
      >
        <Avatar text="BW" />
      </AvatarButtonMenu>
    </div>
  ),
};

// 使用自定义 children（从外部传入 Avatar）
export const WithCustomChildren: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <p style={{ color: 'white', marginBottom: '16px' }}>
        使用 children 属性从外部传入 Avatar 组件
      </p>
      <AvatarButtonMenu
        email="jane.smith@company.com"
        role="Designer"
      >
        <Avatar text="JS" />
      </AvatarButtonMenu>
    </div>
  ),
};

// 所有状态展示
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
      <div>
        <h3 style={{ color: 'white', marginBottom: '8px' }}>Default (Expanded)</h3>
        <AvatarButtonMenu
          state="Default"
          expand={true}
          email="john.doe@company.com"
          role="Administrator"
        >
          <Avatar text="JD" />
        </AvatarButtonMenu>
      </div>
      <div>
        <h3 style={{ color: 'white', marginBottom: '8px' }}>Default (Collapsed)</h3>
        <AvatarButtonMenu
          state="Default"
          expand={false}
          email="john.doe@company.com"
          role="Administrator"
        >
          <Avatar text="JD" />
        </AvatarButtonMenu>
      </div>
      <div>
        <h3 style={{ color: 'white', marginBottom: '8px' }}>Hover (Expanded)</h3>
        <AvatarButtonMenu
          state="Hover"
          expand={true}
          email="john.doe@company.com"
          role="Administrator"
        >
          <Avatar text="JD" />
        </AvatarButtonMenu>
      </div>
      <div>
        <h3 style={{ color: 'white', marginBottom: '8px' }}>Hover (Collapsed)</h3>
        <AvatarButtonMenu
          state="Hover"
          expand={false}
          email="john.doe@company.com"
          role="Administrator"
        >
          <Avatar text="JD" />
        </AvatarButtonMenu>
      </div>
      <div>
        <h3 style={{ color: 'white', marginBottom: '8px' }}>Active (Expanded with dropdown)</h3>
        <AvatarButtonMenu
          state="Active"
          expand={true}
          email="john.doe@company.com"
          role="Administrator"
        >
          <Avatar text="JD" />
        </AvatarButtonMenu>
      </div>
      <div>
        <h3 style={{ color: 'white', marginBottom: '8px' }}>Active (Collapsed with dropdown)</h3>
        <AvatarButtonMenu
          state="Active"
          expand={false}
          email="john.doe@company.com"
          role="Administrator"
        >
          <Avatar text="JD" />
        </AvatarButtonMenu>
      </div>
      <div>
        <h3 style={{ color: 'white', marginBottom: '8px' }}>Focused (Expanded)</h3>
        <AvatarButtonMenu
          focused={true}
          state="Default"
          expand={true}
          email="john.doe@company.com"
          role="Administrator"
        >
          <Avatar text="JD" />
        </AvatarButtonMenu>
      </div>
    </div>
  ),
};
