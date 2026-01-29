import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AppFrame } from './AppFrame';
import { ApplicationHeader } from '../ApplicationHeader';
import { ApplicationMenu } from '../ApplicationMenu';
import { Avatar } from '../Avatar';
import { AvatarButtonMenu } from '../AvatarButtonMenu';
import { MenuItem } from '../MenuItem';
import { MenuItemList } from '../MenuItemList';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

const meta: Meta<typeof AppFrame> = {
  title: 'Components/AppFrame',
  component: AppFrame,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'AppFrame 是一个容器组件，通过插槽接收 ApplicationHeader 和 ApplicationMenu 子组件，提供完整的应用框架布局。',
      },
    },
  },
  argTypes: {
    // ========== Slot 属性（用于设计库绑定） ==========
    header: {
      name: 'headerSlot',
      control: false,
      description: '**ApplicationHeader 组件插槽**\n\n用于插入 ApplicationHeader 组件。\n\n使用方式：\n```tsx\n<AppFrame\n  header={\n    <ApplicationHeader appName="My App">\n      <Avatar text="JD" />\n    </ApplicationHeader>\n  }\n>\n  ...\n</AppFrame>\n```\n\n💡 用于 Figma Code Connect 设计库绑定。',
      table: {
        category: 'Slots',
        type: { summary: 'ApplicationHeader 组件' },
      },
    },
    menu: {
      name: 'menuSlot',
      control: false,
      description: '**ApplicationMenu 组件插槽**\n\n用于插入 ApplicationMenu 组件。\n\n使用方式：\n```tsx\n<AppFrame\n  menu={\n    <ApplicationMenu\n      avatarSection={<AvatarButtonMenu>...</AvatarButtonMenu>}\n      menuList={<MenuItemList>...</MenuItemList>}\n    />\n  }\n>\n  ...\n</AppFrame>\n```\n\n💡 用于 Figma Code Connect 设计库绑定。',
      table: {
        category: 'Slots',
        type: { summary: 'ApplicationMenu 组件' },
      },
    },
    children: {
      name: 'contentSlot (children)',
      control: false,
      description: '**主内容区域插槽**\n\n用于插入应用的主要内容。\n\n使用方式：\n```tsx\n<AppFrame>\n  <div>\n    <h1>Main Content</h1>\n    <p>Your application content goes here...</p>\n  </div>\n</AppFrame>\n```\n\n💡 用于 Figma Code Connect 设计库绑定。',
      table: {
        category: 'Slots',
        type: { summary: 'React.ReactNode' },
      },
    },
    
    // ========== 隐藏的属性（开发者需要但设计师不需要） ==========
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof AppFrame>;

// 默认状态 - 菜单收起，带交互
export const Default: Story = {
  render: () => {
    const [menuExpanded, setMenuExpanded] = useState(false);
    
    return (
      <AppFrame
        header={
          <ApplicationHeader appName="Application name">
            <Avatar text="JD" />
          </ApplicationHeader>
        }
        menu={
          <ApplicationMenu
            expanded={menuExpanded}
            onToggleExpand={() => setMenuExpanded(!menuExpanded)}
            avatarSection={
              <AvatarButtonMenu expand={menuExpanded} email="john.doe@company.com" role="Administrator">
                <Avatar text="JD" />
              </AvatarButtonMenu>
            }
            menuList={
              <MenuItemList expanded={menuExpanded}>
                <MenuItem icon="home" label="Dashboard" />
                <MenuItem icon="dashboard" label="Analytics" />
                <MenuItem icon="user-management" label="Users" />
                <MenuItem icon="cogwheel" label="Settings" />
                <MenuItem icon="edit-document" label="Documents" />
                <MenuItem icon="alarm-bell" label="Notifications" notification notificationCount={5} />
              </MenuItemList>
            }
          />
        }
      >
        <div style={{ color: 'var(--text-color-std-text, #F5FCFF)' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Welcome to the Application</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '24px' }}>
            This is the main content area. Click the menu toggle button to expand/collapse the menu.
          </p>
          <div style={{ 
            padding: '24px', 
            backgroundColor: 'var(--background-color-2, #23233C)', 
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Content Section 1</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </AppFrame>
    );
  },
};

// 菜单展开状态 - 带交互
export const MenuExpanded: Story = {
  render: () => {
    const [menuExpanded, setMenuExpanded] = useState(true);
    
    return (
      <AppFrame
        header={
          <ApplicationHeader appName="Application name">
            <Avatar text="JD" />
          </ApplicationHeader>
        }
        menu={
          <ApplicationMenu
            expanded={menuExpanded}
            onToggleExpand={() => setMenuExpanded(!menuExpanded)}
            avatarSection={
              <AvatarButtonMenu expand={menuExpanded} email="john.doe@company.com" role="Administrator">
                <Avatar text="JD" />
              </AvatarButtonMenu>
            }
            menuList={
              <MenuItemList expanded={menuExpanded}>
                <MenuItem icon="home" label="Dashboard" />
                <MenuItem icon="dashboard" label="Analytics" />
                <MenuItem icon="user-management" label="Users" />
                <MenuItem icon="cogwheel" label="Settings" />
              </MenuItemList>
            }
          />
        }
      >
        <div style={{ color: 'var(--text-color-std-text, #F5FCFF)' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Expanded Menu</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Menu starts expanded. Click the toggle button to collapse it.
          </p>
        </div>
      </AppFrame>
    );
  },
};

// 带应用切换按钮 - 带交互
export const WithAppSwitch: Story = {
  render: () => {
    const [menuExpanded, setMenuExpanded] = useState(false);
    
    return (
      <AppFrame
        header={
          <ApplicationHeader 
            appName="Application name" 
            appSwitch={true}
            onAppSwitchClick={() => alert('App switcher clicked! You can switch between applications here.')}
          >
            <Avatar text="JD" />
          </ApplicationHeader>
        }
        menu={
          <ApplicationMenu
            expanded={menuExpanded}
            onToggleExpand={() => setMenuExpanded(!menuExpanded)}
            avatarSection={
              <AvatarButtonMenu expand={menuExpanded} email="john.doe@company.com" role="Administrator">
                <Avatar text="JD" />
              </AvatarButtonMenu>
            }
            menuList={
              <MenuItemList expanded={menuExpanded}>
                <MenuItem icon="home" label="Dashboard" />
                <MenuItem icon="cogwheel" label="Settings" />
              </MenuItemList>
            }
          />
        }
      >
        <div style={{ color: 'var(--text-color-std-text, #F5FCFF)' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>With App Switcher</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Click the app switcher button (grid icon) in the header to see the interaction.
          </p>
        </div>
      </AppFrame>
    );
  },
};

// 完整功能展示 - 所有交互都可用
export const FullFeatured: Story = {
  render: () => {
    const [menuExpanded, setMenuExpanded] = useState(true);
    
    return (
      <AppFrame
        header={
          <ApplicationHeader 
            appName="Full Featured App" 
            appSwitch={true}
            onAppSwitchClick={() => alert('App switcher clicked!')}
          >
            <Avatar text="FF" />
          </ApplicationHeader>
        }
        menu={
          <ApplicationMenu
            expanded={menuExpanded}
            onToggleExpand={() => setMenuExpanded(!menuExpanded)}
            avatarSection={
              <AvatarButtonMenu 
                expand={menuExpanded}
                email="admin@company.com" 
                role="Administrator"
                onProfileClick={() => alert('Profile clicked!')}
                onLogoutClick={() => alert('Logout clicked!')}
              >
                <Avatar text="FF" />
              </AvatarButtonMenu>
            }
            menuList={
              <MenuItemList expanded={menuExpanded}>
                <MenuItem icon="home" label="Dashboard" />
                <MenuItem icon="dashboard" label="Analytics" />
                <MenuItem icon="user-management" label="Users" />
                <MenuItem icon="cogwheel" label="Settings" />
                <MenuItem icon="alarm-bell" label="Notifications" notification notificationCount={12} />
              </MenuItemList>
            }
          />
        }
      >
        <div style={{ color: 'var(--text-color-std-text, #F5FCFF)' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Full Featured Application</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '16px' }}>
            All interactive features are enabled:
          </p>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px', paddingLeft: '24px' }}>
            <li>Click the app switcher button (grid icon) in the header</li>
            <li>Click the menu toggle button to expand/collapse the menu</li>
            <li>Click the avatar in the menu to see user menu options</li>
            <li>Hover over menu items to see hover effects</li>
            <li>Click menu items to select them</li>
          </ul>
        </div>
      </AppFrame>
    );
  },
};

// 只有 Header
export const HeaderOnly: Story = {
  render: () => (
    <AppFrame
      header={
        <ApplicationHeader appName="Header Only App">
          <Avatar text="HO" />
        </ApplicationHeader>
      }
    >
      <div style={{ color: 'var(--text-color-std-text, #F5FCFF)', padding: '24px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Header Only</h1>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
          This layout only has a header, no side menu.
        </p>
      </div>
    </AppFrame>
  ),
};

// 只有 Menu
export const MenuOnly: Story = {
  render: () => {
    const [menuExpanded, setMenuExpanded] = useState(false);
    
    return (
      <AppFrame
        menu={
          <ApplicationMenu
            expanded={menuExpanded}
            onToggleExpand={() => setMenuExpanded(!menuExpanded)}
            avatarSection={
              <AvatarButtonMenu expand={menuExpanded} email="user@example.com" role="User">
                <Avatar text="MO" />
              </AvatarButtonMenu>
            }
            menuList={
              <MenuItemList expanded={menuExpanded}>
                <MenuItem icon="home" label="Home" />
                <MenuItem icon="cogwheel" label="Settings" />
              </MenuItemList>
            }
          />
        }
      >
        <div style={{ color: 'var(--text-color-std-text, #F5FCFF)', padding: '24px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Menu Only</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            This layout only has a side menu, no header.
          </p>
        </div>
      </AppFrame>
    );
  },
};
