import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ApplicationMenu } from './ApplicationMenu';
import { AvatarButtonMenu } from '../AvatarButtonMenu';
import { MenuItem } from '../MenuItem';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

const meta: Meta<typeof ApplicationMenu> = {
  title: 'Components/ApplicationMenu',
  component: ApplicationMenu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    popoverNews: {
      control: 'boolean',
      description: '是否显示新闻弹窗（Figma 属性）',
      table: {
        category: 'Figma Props',
      },
    },
    expanded: {
      control: 'boolean',
      description: '是否展开菜单（Figma 属性）',
      table: {
        category: 'Figma Props',
      },
    },
    overflow: {
      control: 'select',
      options: ['False'],
      description: '溢出处理（Figma 属性）',
      table: {
        category: 'Figma Props',
      },
    },
    toggleButton: {
      control: 'text',
      description: '展开/折叠按钮插槽（扩展属性 - Slot）',
      table: {
        category: 'Slots',
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '默认切换按钮' },
      },
    },
    avatarSection: {
      control: 'text',
      description: '用户头像区域插槽（扩展属性 - Slot）\n\n插入组件：AvatarButtonMenu',
      table: {
        category: 'Slots',
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<AvatarButtonMenu />' },
      },
    },
    menuList: {
      control: 'text',
      description: '菜单项列表插槽（扩展属性 - Slot）\n\n插入组件：MenuItem（多个）',
      table: {
        category: 'Slots',
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<MenuItem /> × N' },
      },
    },
    onToggleExpand: {
      action: 'toggled',
      description: '展开/折叠切换事件（扩展属性）',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    className: {
      control: 'text',
      description: '自定义类名（扩展属性）',
      table: {
        category: 'Styling',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ApplicationMenu>;

// 展开状态（可交互）
export const Expanded: Story = {
  args: {
    expanded: true,
    avatarSection: '<AvatarButtonMenu email="john.doe@company.com" role="Administrator" />',
    menuList: '<MenuItem icon="home" label="Home" expanded={expanded} selected={selectedItem === "Home"} onClick={() => setSelectedItem("Home")} /><MenuItem icon="bell" label="Event list" expanded={expanded} notification={true} notificationCount={12} selected={selectedItem === "Event list"} onClick={() => setSelectedItem("Event list")} /><MenuItem icon="dashboard" label="Dashboard" expanded={expanded} selected={selectedItem === "Dashboard"} onClick={() => setSelectedItem("Dashboard")} /><MenuItem icon="wrench" label="Maintenance" expanded={expanded} selected={selectedItem === "Maintenance"} onClick={() => setSelectedItem("Maintenance")} /><MenuItem icon="calendar" label="Scheduler" expanded={expanded} selected={selectedItem === "Scheduler"} onClick={() => setSelectedItem("Scheduler")} /><MenuItem icon="users" label="User management" expanded={expanded} selected={selectedItem === "User management"} onClick={() => setSelectedItem("User management")} />',
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expanded, setExpanded] = React.useState(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedItem, setSelectedItem] = React.useState('Home');

    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000028' }}>
        <ApplicationMenu
          expanded={expanded}
          onToggleExpand={() => setExpanded(!expanded)}
          avatarSection={
            <AvatarButtonMenu
              expand={expanded}
              email="john.doe@company.com"
              role="Administrator"
            />
          }
          menuList={
            <>
              <MenuItem icon="home" label="Home" expanded={expanded} selected={selectedItem === 'Home'} onClick={() => setSelectedItem('Home')} />
              <MenuItem icon="bell" label="Event list" expanded={expanded} notification={true} notificationCount={12} selected={selectedItem === 'Event list'} onClick={() => setSelectedItem('Event list')} />
              <MenuItem icon="dashboard" label="Dashboard" expanded={expanded} selected={selectedItem === 'Dashboard'} onClick={() => setSelectedItem('Dashboard')} />
              <MenuItem icon="wrench" label="Maintenance" expanded={expanded} selected={selectedItem === 'Maintenance'} onClick={() => setSelectedItem('Maintenance')} />
              <MenuItem icon="calendar" label="Scheduler" expanded={expanded} selected={selectedItem === 'Scheduler'} onClick={() => setSelectedItem('Scheduler')} />
              <MenuItem icon="users" label="User management" expanded={expanded} selected={selectedItem === 'User management'} onClick={() => setSelectedItem('User management')} />
            </>
          }
        />
      </div>
    );
  },
};

// 折叠状态（可交互）
export const Collapsed: Story = {
  args: {
    expanded: false,
    avatarSection: '<AvatarButtonMenu expand={false} email="john.doe@company.com" role="Administrator" />',
    menuList: '<MenuItem icon="home" label="Home" expanded={expanded} selected={selectedItem === "Home"} onClick={() => setSelectedItem("Home")} /><MenuItem icon="bell" label="Event list" expanded={expanded} notification={true} notificationCount={12} selected={selectedItem === "Event list"} onClick={() => setSelectedItem("Event list")} /><MenuItem icon="dashboard" label="Dashboard" expanded={expanded} selected={selectedItem === "Dashboard"} onClick={() => setSelectedItem("Dashboard")} /><MenuItem icon="wrench" label="Maintenance" expanded={expanded} selected={selectedItem === "Maintenance"} onClick={() => setSelectedItem("Maintenance")} /><MenuItem icon="calendar" label="Scheduler" expanded={expanded} selected={selectedItem === "Scheduler"} onClick={() => setSelectedItem("Scheduler")} /><MenuItem icon="users" label="User management" expanded={expanded} selected={selectedItem === "User management"} onClick={() => setSelectedItem("User management")} />',
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expanded, setExpanded] = React.useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedItem, setSelectedItem] = React.useState('Home');

    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000028' }}>
        <ApplicationMenu
          expanded={expanded}
          onToggleExpand={() => setExpanded(!expanded)}
          avatarSection={
            <AvatarButtonMenu
              expand={expanded}
              email="john.doe@company.com"
              role="Administrator"
            />
          }
          menuList={
            <>
              <MenuItem icon="home" label="Home" expanded={expanded} selected={selectedItem === 'Home'} onClick={() => setSelectedItem('Home')} />
              <MenuItem icon="bell" label="Event list" expanded={expanded} notification={true} notificationCount={12} selected={selectedItem === 'Event list'} onClick={() => setSelectedItem('Event list')} />
              <MenuItem icon="dashboard" label="Dashboard" expanded={expanded} selected={selectedItem === 'Dashboard'} onClick={() => setSelectedItem('Dashboard')} />
              <MenuItem icon="wrench" label="Maintenance" expanded={expanded} selected={selectedItem === 'Maintenance'} onClick={() => setSelectedItem('Maintenance')} />
              <MenuItem icon="calendar" label="Scheduler" expanded={expanded} selected={selectedItem === 'Scheduler'} onClick={() => setSelectedItem('Scheduler')} />
              <MenuItem icon="users" label="User management" expanded={expanded} selected={selectedItem === 'User management'} onClick={() => setSelectedItem('User management')} />
            </>
          }
        />
      </div>
    );
  },
};

// 自定义切换按钮
export const CustomToggleButton: Story = {
  args: {
    toggleButton: '<button onClick={() => setExpanded(!expanded)} style={{...}}>◀/▶</button>',
    avatarSection: '<AvatarButtonMenu expand={expanded} email="john.doe@company.com" role="Administrator" />',
    menuList: '<MenuItem icon="home" label="Home" expanded={expanded} selected={selectedItem === "Home"} onClick={() => setSelectedItem("Home")} /><MenuItem icon="dashboard" label="Dashboard" expanded={expanded} selected={selectedItem === "Dashboard"} onClick={() => setSelectedItem("Dashboard")} />',
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expanded, setExpanded] = React.useState(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedItem, setSelectedItem] = React.useState('Home');

    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000028' }}>
        <ApplicationMenu
          expanded={expanded}
          toggleButton={
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#0cc',
                color: '#000028',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              {expanded ? '◀' : '▶'}
            </button>
          }
          avatarSection={
            <AvatarButtonMenu
              expand={expanded}
              email="john.doe@company.com"
              role="Administrator"
            />
          }
          menuList={
            <>
              <MenuItem icon="home" label="Home" expanded={expanded} selected={selectedItem === 'Home'} onClick={() => setSelectedItem('Home')} />
              <MenuItem icon="dashboard" label="Dashboard" expanded={expanded} selected={selectedItem === 'Dashboard'} onClick={() => setSelectedItem('Dashboard')} />
            </>
          }
        />
      </div>
    );
  },
};

// 交互式示例（非受控）
export const Interactive: Story = {
  args: {
    avatarSection: '<AvatarButtonMenu expand={expanded} email="john.doe@company.com" role="Administrator" onProfileClick={() => console.log("Open profile")} onLogoutClick={() => console.log("Logout")} />',
    menuList: '<MenuItem icon="home" label="Home" expanded={expanded} selected={selectedItem === "Home"} onClick={() => setSelectedItem("Home")} /><MenuItem icon="bell" label="Event list" expanded={expanded} notification={true} notificationCount={12} selected={selectedItem === "Event list"} onClick={() => setSelectedItem("Event list")} /><MenuItem icon="dashboard" label="Dashboard" expanded={expanded} selected={selectedItem === "Dashboard"} onClick={() => setSelectedItem("Dashboard")} /><MenuItem icon="wrench" label="Maintenance" expanded={expanded} selected={selectedItem === "Maintenance"} onClick={() => setSelectedItem("Maintenance")} /><MenuItem icon="calendar" label="Scheduler" expanded={expanded} selected={selectedItem === "Scheduler"} onClick={() => setSelectedItem("Scheduler")} /><MenuItem icon="users" label="User management" expanded={expanded} selected={selectedItem === "User management"} onClick={() => setSelectedItem("User management")} />',
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expanded, setExpanded] = React.useState(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedItem, setSelectedItem] = React.useState('Home');

    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000028' }}>
        <ApplicationMenu
          expanded={expanded}
          onToggleExpand={() => setExpanded(!expanded)}
          avatarSection={
            <AvatarButtonMenu
              expand={expanded}
              email="john.doe@company.com"
              role="Administrator"
              onProfileClick={() => console.log('Open profile')}
              onLogoutClick={() => console.log('Logout')}
            />
          }
          menuList={
            <>
              <MenuItem
                icon="home"
                label="Home"
                expanded={expanded}
                selected={selectedItem === 'Home'}
                onClick={() => setSelectedItem('Home')}
              />
              <MenuItem
                icon="bell"
                label="Event list"
                expanded={expanded}
                notification={true}
                notificationCount={12}
                selected={selectedItem === 'Event list'}
                onClick={() => setSelectedItem('Event list')}
              />
              <MenuItem
                icon="dashboard"
                label="Dashboard"
                expanded={expanded}
                selected={selectedItem === 'Dashboard'}
                onClick={() => setSelectedItem('Dashboard')}
              />
              <MenuItem
                icon="wrench"
                label="Maintenance"
                expanded={expanded}
                selected={selectedItem === 'Maintenance'}
                onClick={() => setSelectedItem('Maintenance')}
              />
              <MenuItem
                icon="calendar"
                label="Scheduler"
                expanded={expanded}
                selected={selectedItem === 'Scheduler'}
                onClick={() => setSelectedItem('Scheduler')}
              />
              <MenuItem
                icon="users"
                label="User management"
                expanded={expanded}
                selected={selectedItem === 'User management'}
                onClick={() => setSelectedItem('User management')}
              />
            </>
          }
        />
        <div style={{ flex: 1, padding: '40px', color: 'white' }}>
          <h1>交互式示例</h1>
          <div style={{ marginBottom: '24px' }}>
            <p style={{ color: '#9d9d96', marginBottom: '8px' }}>
              菜单状态: <strong style={{ color: 'white' }}>{expanded ? '展开' : '折叠'}</strong>
            </p>
            <p style={{ color: '#9d9d96', marginBottom: '8px' }}>
              当前选中: <strong style={{ color: 'white' }}>{selectedItem}</strong>
            </p>
          </div>
          <p style={{ color: '#9d9d96', marginTop: '16px', marginBottom: '12px' }}>
            <strong style={{ color: '#0cc' }}>✨ 自动交互功能：</strong>
          </p>
          <ul style={{ color: '#9d9d96', paddingLeft: '20px', marginBottom: '24px' }}>
            <li><strong>点击左上角按钮</strong> → 自动展开/折叠菜单</li>
            <li><strong>点击任意菜单项</strong> → 自动选中，原选中项取消</li>
            <li><strong>点击用户头像</strong> → 打开下拉菜单</li>
            <li><strong>折叠时悬停菜单项</strong> → 显示 tooltip</li>
          </ul>
          <div style={{ 
            padding: '16px',
            backgroundColor: 'rgba(0, 204, 204, 0.1)',
            borderLeft: '4px solid #0cc',
            borderRadius: '4px',
          }}>
            <p style={{ color: '#9d9d96', margin: 0 }}>
              💡 这是<strong style={{ color: 'white' }}>受控模式</strong>：
              组件通过 <code style={{ color: '#0cc' }}>expanded</code> 和 <code style={{ color: '#0cc' }}>onToggleExpand</code> 
              实现展开/折叠交互，通过 <code style={{ color: '#0cc' }}>selected</code> 和 <code style={{ color: '#0cc' }}>onClick</code> 
              实现 MenuItem 互斥选中。
            </p>
          </div>
        </div>
      </div>
    );
  },
};

// 受控模式示例
export const Controlled: Story = {
  args: {
    expanded: true,
    avatarSection: '<AvatarButtonMenu expand={expanded} email="john.doe@company.com" role="Administrator" onProfileClick={() => console.log("Open profile")} onLogoutClick={() => console.log("Logout")} />',
    menuList: '<MenuItem icon="home" label="Home" expanded={expanded} selected={selectedItem === "Home"} onClick={() => setSelectedItem("Home")} /><MenuItem icon="bell" label="Event list" expanded={expanded} notification={true} notificationCount={12} selected={selectedItem === "Event list"} onClick={() => setSelectedItem("Event list")} /><MenuItem icon="dashboard" label="Dashboard" expanded={expanded} selected={selectedItem === "Dashboard"} onClick={() => setSelectedItem("Dashboard")} /><MenuItem icon="wrench" label="Maintenance" expanded={expanded} selected={selectedItem === "Maintenance"} onClick={() => setSelectedItem("Maintenance")} /><MenuItem icon="calendar" label="Scheduler" expanded={expanded} selected={selectedItem === "Scheduler"} onClick={() => setSelectedItem("Scheduler")} /><MenuItem icon="users" label="User management" expanded={expanded} selected={selectedItem === "User management"} onClick={() => setSelectedItem("User management")} />',
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expanded, setExpanded] = React.useState(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedItem, setSelectedItem] = React.useState('Home');

    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000028' }}>
        <ApplicationMenu
          expanded={expanded}
          onToggleExpand={() => setExpanded(!expanded)}
          avatarSection={
            <AvatarButtonMenu
              expand={expanded}
              email="john.doe@company.com"
              role="Administrator"
              onProfileClick={() => console.log('Open profile')}
              onLogoutClick={() => console.log('Logout')}
            />
          }
          menuList={
            <>
              <MenuItem
                icon="home"
                label="Home"
                expanded={expanded}
                selected={selectedItem === 'Home'}
                onClick={() => setSelectedItem('Home')}
              />
              <MenuItem
                icon="bell"
                label="Event list"
                expanded={expanded}
                notification={true}
                notificationCount={12}
                selected={selectedItem === 'Event list'}
                onClick={() => setSelectedItem('Event list')}
              />
              <MenuItem
                icon="dashboard"
                label="Dashboard"
                expanded={expanded}
                selected={selectedItem === 'Dashboard'}
                onClick={() => setSelectedItem('Dashboard')}
              />
              <MenuItem
                icon="wrench"
                label="Maintenance"
                expanded={expanded}
                selected={selectedItem === 'Maintenance'}
                onClick={() => setSelectedItem('Maintenance')}
              />
              <MenuItem
                icon="calendar"
                label="Scheduler"
                expanded={expanded}
                selected={selectedItem === 'Scheduler'}
                onClick={() => setSelectedItem('Scheduler')}
              />
              <MenuItem
                icon="users"
                label="User management"
                expanded={expanded}
                selected={selectedItem === 'User management'}
                onClick={() => setSelectedItem('User management')}
              />
            </>
          }
        />
        <div style={{ flex: 1, padding: '40px', color: 'white' }}>
          <h1>受控模式示例</h1>
          <div style={{ marginBottom: '24px' }}>
            <p style={{ color: '#9d9d96', marginBottom: '8px' }}>
              菜单状态: <strong style={{ color: 'white' }}>{expanded ? '展开' : '折叠'}</strong>
            </p>
            <p style={{ color: '#9d9d96', marginBottom: '8px' }}>
              当前选中: <strong style={{ color: 'white' }}>{selectedItem}</strong>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#0cc',
                color: '#000028',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              {expanded ? '折叠菜单' : '展开菜单'}
            </button>
            <button
              onClick={() => setSelectedItem('Dashboard')}
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              选中 Dashboard
            </button>
            <button
              onClick={() => setSelectedItem('Event list')}
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              选中 Event list
            </button>
          </div>
        </div>
      </div>
    );
  },
};

// 不同用户
export const DifferentUsers: Story = {
  args: {
    expanded: true,
    avatarSection: '<AvatarButtonMenu expand={true} email={user.email} role={user.role} avatarInitials={user.avatarInitials} avatarImage={user.avatarImage} avatarSrc={user.avatarSrc} avatarText={user.avatarText} />',
    menuList: '<MenuItem icon="home" label="Home" expanded={true} selected={selectedItem === "Home"} onClick={() => setSelectedItem("Home")} /><MenuItem icon="dashboard" label="Dashboard" expanded={true} selected={selectedItem === "Dashboard"} onClick={() => setSelectedItem("Dashboard")} /><MenuItem icon="settings" label="Settings" expanded={true} selected={selectedItem === "Settings"} onClick={() => setSelectedItem("Settings")} />',
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentUser, setCurrentUser] = React.useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedItem, setSelectedItem] = React.useState('Home');
    
    const users = [
      {
        email: 'john.doe@company.com',
        role: 'Administrator',
        avatarInitials: false,
        avatarImage: false,
        avatarText: 'JD',
      },
      {
        email: 'jane.smith@company.com',
        role: 'Developer',
        avatarInitials: true,
        avatarImage: false,
        avatarText: 'JS',
      },
      {
        email: 'alice.johnson@company.com',
        role: 'Designer',
        avatarInitials: false,
        avatarImage: true,
        avatarSrc: 'https://i.pravatar.cc/150?img=1',
        avatarText: 'AJ',
      },
    ];

    const user = users[currentUser];

    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000028' }}>
        <ApplicationMenu
          expanded={true}
          avatarSection={
            <AvatarButtonMenu
              expand={true}
              email={user.email}
              role={user.role}
              avatarInitials={user.avatarInitials}
              avatarImage={user.avatarImage}
              avatarSrc={user.avatarSrc}
              avatarText={user.avatarText}
            />
          }
          menuList={
            <>
              <MenuItem icon="home" label="Home" expanded={true} selected={selectedItem === 'Home'} onClick={() => setSelectedItem('Home')} />
              <MenuItem icon="dashboard" label="Dashboard" expanded={true} selected={selectedItem === 'Dashboard'} onClick={() => setSelectedItem('Dashboard')} />
              <MenuItem icon="settings" label="Settings" expanded={true} selected={selectedItem === 'Settings'} onClick={() => setSelectedItem('Settings')} />
            </>
          }
        />
        <div style={{ flex: 1, padding: '40px', color: 'white' }}>
          <h1>不同用户示例</h1>
          <p style={{ color: '#9d9d96', marginBottom: '16px' }}>
            切换不同用户查看头像显示效果：
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {users.map((u, index) => (
              <button
                key={index}
                onClick={() => setCurrentUser(index)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: currentUser === index ? '#0cc' : 'rgba(255, 255, 255, 0.1)',
                  color: currentUser === index ? '#000028' : 'white',
                  border: currentUser === index ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: currentUser === index ? 'bold' : 'normal',
                }}
              >
                {u.email}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// 所有状态展示
export const AllStates: Story = {
  args: {
    avatarSection: '<AvatarButtonMenu expand={expanded} email="john.doe@company.com" role="Administrator" />',
    menuList: '<MenuItem icon="home" label="Home" expanded={expanded} selected={selectedItem === "Home"} onClick={() => setSelectedItem("Home")} /><MenuItem icon="dashboard" label="Dashboard" expanded={expanded} selected={selectedItem === "Dashboard"} onClick={() => setSelectedItem("Dashboard")} />',
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedItem, setSelectedItem] = React.useState('Home');

    return (
      <div style={{ display: 'flex', gap: '32px', padding: '40px', backgroundColor: '#000028', minHeight: '100vh' }}>
        <div>
          <h3 style={{ color: 'white', marginBottom: '16px' }}>展开状态</h3>
          <ApplicationMenu
            expanded={true}
            avatarSection={
              <AvatarButtonMenu
                expand={true}
                email="john.doe@company.com"
                role="Administrator"
              />
            }
            menuList={
              <>
                <MenuItem icon="home" label="Home" expanded={true} selected={selectedItem === 'Home'} onClick={() => setSelectedItem('Home')} />
                <MenuItem icon="dashboard" label="Dashboard" expanded={true} selected={selectedItem === 'Dashboard'} onClick={() => setSelectedItem('Dashboard')} />
              </>
            }
          />
        </div>
        <div>
          <h3 style={{ color: 'white', marginBottom: '16px' }}>折叠状态</h3>
          <ApplicationMenu
            expanded={false}
            avatarSection={
              <AvatarButtonMenu
                expand={false}
                email="john.doe@company.com"
                role="Administrator"
              />
            }
            menuList={
              <>
                <MenuItem icon="home" label="Home" expanded={false} selected={selectedItem === 'Home'} onClick={() => setSelectedItem('Home')} />
                <MenuItem icon="dashboard" label="Dashboard" expanded={false} selected={selectedItem === 'Dashboard'} onClick={() => setSelectedItem('Dashboard')} />
              </>
            }
          />
        </div>
      </div>
    );
  },
};

// Slot 内容展示
export const SlotContent: Story = {
  args: {
    expanded: true,
    avatarSection: '<AvatarButtonMenu email="john.doe@company.com" role="Administrator" />',
    menuList: '<MenuItem icon="home" label="Home" expanded={true} selected={selectedItem === "Home"} onClick={() => setSelectedItem("Home")} /><MenuItem icon="bell" label="Event list" expanded={true} notification={true} notificationCount={12} selected={selectedItem === "Event list"} onClick={() => setSelectedItem("Event list")} /><MenuItem icon="dashboard" label="Dashboard" expanded={true} selected={selectedItem === "Dashboard"} onClick={() => setSelectedItem("Dashboard")} /><MenuItem icon="wrench" label="Maintenance" expanded={true} selected={selectedItem === "Maintenance"} onClick={() => setSelectedItem("Maintenance")} /><MenuItem icon="calendar" label="Scheduler" expanded={true} selected={selectedItem === "Scheduler"} onClick={() => setSelectedItem("Scheduler")} /><MenuItem icon="users" label="User management" expanded={true} selected={selectedItem === "User management"} onClick={() => setSelectedItem("User management")} />',
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedItem, setSelectedItem] = React.useState('Home');

    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000028' }}>
        <ApplicationMenu
          expanded={true}
          avatarSection={
            <AvatarButtonMenu
              expand={true}
              email="john.doe@company.com"
              role="Administrator"
            />
          }
          menuList={
            <>
              <MenuItem icon="home" label="Home" expanded={true} selected={selectedItem === 'Home'} onClick={() => setSelectedItem('Home')} />
              <MenuItem icon="bell" label="Event list" expanded={true} notification={true} notificationCount={12} selected={selectedItem === 'Event list'} onClick={() => setSelectedItem('Event list')} />
              <MenuItem icon="dashboard" label="Dashboard" expanded={true} selected={selectedItem === 'Dashboard'} onClick={() => setSelectedItem('Dashboard')} />
              <MenuItem icon="wrench" label="Maintenance" expanded={true} selected={selectedItem === 'Maintenance'} onClick={() => setSelectedItem('Maintenance')} />
              <MenuItem icon="calendar" label="Scheduler" expanded={true} selected={selectedItem === 'Scheduler'} onClick={() => setSelectedItem('Scheduler')} />
              <MenuItem icon="users" label="User management" expanded={true} selected={selectedItem === 'User management'} onClick={() => setSelectedItem('User management')} />
            </>
          }
        />
      <div style={{ flex: 1, padding: '40px', color: 'white' }}>
        <h1 style={{ marginBottom: '24px' }}>Slot 内容说明</h1>
        
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '16px', color: '#0cc' }}>children Slot</h2>
          <p style={{ color: '#9d9d96', marginBottom: '12px' }}>
            ApplicationMenu 使用 children slot 接收所有子组件：
          </p>
          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.05)', 
            padding: '16px', 
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#0cc',
          }}>
            <div>{'<ApplicationMenu>'}</div>
            <div style={{ paddingLeft: '20px', color: '#9d9d96' }}>
              {'// 1. AvatarButtonMenu（用户头像区域）'}
            </div>
            <div style={{ paddingLeft: '20px' }}>
              {'<AvatarButtonMenu email="..." role="..." />'}
            </div>
            <div style={{ paddingLeft: '20px', marginTop: '8px', color: '#9d9d96' }}>
              {'// 2. MenuItem × 6（菜单项列表）'}
            </div>
            <div style={{ paddingLeft: '20px' }}>
              {'<MenuItem icon="home" label="Home" />'}
            </div>
            <div style={{ paddingLeft: '20px' }}>
              {'<MenuItem icon="bell" label="Event list" notification />'}
            </div>
            <div style={{ paddingLeft: '20px' }}>
              {'<MenuItem icon="dashboard" label="Dashboard" />'}
            </div>
            <div style={{ paddingLeft: '20px' }}>
              {'<MenuItem icon="wrench" label="Maintenance" />'}
            </div>
            <div style={{ paddingLeft: '20px' }}>
              {'<MenuItem icon="calendar" label="Scheduler" />'}
            </div>
            <div style={{ paddingLeft: '20px' }}>
              {'<MenuItem icon="users" label="User management" />'}
            </div>
            <div>{'</ApplicationMenu>'}</div>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '16px', color: '#0cc' }}>组件列表</h2>
          <ul style={{ color: '#9d9d96', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong style={{ color: 'white' }}>AvatarButtonMenu</strong> - 用户头像和信息
              <div style={{ fontSize: '13px', marginTop: '4px' }}>
                Props: email, role, avatarSrc, avatarText, avatarImage, avatarInitials
              </div>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong style={{ color: 'white' }}>MenuItem × 6</strong> - 导航菜单项
              <div style={{ fontSize: '13px', marginTop: '4px' }}>
                Props: icon, label, expanded, selected, notification, notificationCount
              </div>
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '16px', color: '#0cc' }}>Slot 模式优势</h2>
          <ul style={{ color: '#9d9d96', paddingLeft: '20px' }}>
            <li>完全控制子组件的属性和行为</li>
            <li>可以添加、删除或替换任何组件</li>
            <li>不限制菜单项数量</li>
            <li>可以使用自定义组件</li>
            <li>容器只负责布局，不关心内容</li>
          </ul>
        </div>

        <div style={{ 
          padding: '16px',
          backgroundColor: 'rgba(0, 204, 204, 0.1)',
          borderLeft: '4px solid #0cc',
          borderRadius: '4px',
        }}>
          <h3 style={{ marginBottom: '8px', color: '#0cc' }}>
            💡 提示
          </h3>
          <p style={{ color: '#9d9d96', margin: 0 }}>
            除了 expanded 属性（Figma 定义），其他所有内容都通过 Slot 传入。
            这提供了最大的灵活性，让你可以完全自定义菜单内容。
          </p>
        </div>
      </div>
    </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '展示 ApplicationMenu 的 Slot 内容结构和使用的组件列表。',
      },
    },
  },
};
