import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MenuItemList } from './MenuItemList';
import { MenuItem } from '../MenuItem';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
// 所有使用的图标名称都来自 @irisieason/ix-icons 包
// 使用的图标: home, dashboard, cogwheel, user, alarm-bell, user-management, calendar, search
addIcons(allIcons);

const meta: Meta<typeof MenuItemList> = {
  title: 'Components/MenuItemList',
  component: MenuItemList,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0f1619' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // ========== 可控制的属性（视觉属性） ==========
    expanded: {
      control: 'boolean',
      description: '是否展开显示文本',
      table: {
        category: 'Visual Props',
      },
    },
    
    // ========== Slot 属性（插槽，用于插入子组件） ==========
    children: {
      name: 'menuItemsSlot (children)',
      control: false,
      description: '**MenuItem 组件插槽**\n\n必须传入一个或多个 MenuItem 组件。\n\n使用方式：\n```tsx\n<MenuItemList expanded={true}>\n  <MenuItem icon="home" label="Home" />\n  <MenuItem icon="cogwheel" label="Settings" />\n  <MenuItem icon="user" label="Profile" />\n</MenuItemList>\n```\n\n💡 用于 Figma Code Connect 设计库绑定。',
      table: {
        category: 'Slots',
        type: { summary: 'MenuItem 组件（多个）' },
        defaultValue: { summary: '必需' },
      },
    },
    
    // ========== 隐藏的属性（开发者需要但设计师不需要） ==========
    defaultSelectedIndex: { table: { disable: true } },
    selectedIndex: { table: { disable: true } },
    onSelectionChange: { table: { disable: true } },
    className: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof MenuItemList>;

// 默认状态（展开）
export const Default: Story = {
  args: {
    expanded: true,
    defaultSelectedIndex: 0,
  },
  render: (args) => (
    <MenuItemList {...args}>
      <MenuItem icon="home" label="Home" />
      <MenuItem icon="dashboard" label="Dashboard" />
      <MenuItem icon="cogwheel" label="Settings" />
      <MenuItem icon="user" label="Profile" />
    </MenuItemList>
  ),
};

// 收起状态（只显示图标）
export const Collapsed: Story = {
  args: {
    expanded: false,
    defaultSelectedIndex: 0,
  },
  render: (args) => (
    <MenuItemList {...args}>
      <MenuItem icon="home" label="Home" />
      <MenuItem icon="dashboard" label="Dashboard" />
      <MenuItem icon="cogwheel" label="Settings" />
      <MenuItem icon="user" label="Profile" />
    </MenuItemList>
  ),
};

// 带通知徽章
export const WithNotifications: Story = {
  args: {
    expanded: true,
    defaultSelectedIndex: 0,
  },
  render: (args) => (
    <MenuItemList {...args}>
      <MenuItem icon="home" label="Home" />
      <MenuItem 
        icon="alarm-bell" 
        label="Notifications" 
        notification={true}
        notificationCount={5}
      />
      <MenuItem icon="user-management" label="Messages" />
      <MenuItem icon="cogwheel" label="Settings" />
    </MenuItemList>
  ),
};

// 带选中状态
export const WithSelection: Story = {
  args: {
    expanded: true,
    defaultSelectedIndex: 0,
  },
  render: (args) => (
    <MenuItemList {...args}>
      <MenuItem icon="home" label="Home" />
      <MenuItem icon="dashboard" label="Dashboard" />
      <MenuItem icon="cogwheel" label="Settings" />
      <MenuItem icon="user" label="Profile" />
    </MenuItemList>
  ),
};

// 完整菜单示例
export const FullMenu: Story = {
  args: {
    expanded: true,
    defaultSelectedIndex: 0,
  },
  render: (args) => (
    <div style={{ width: '280px' }}>
      <MenuItemList {...args}>
        <MenuItem icon="home" label="Home" />
        <MenuItem icon="dashboard" label="Dashboard" />
        <MenuItem 
          icon="alarm-bell" 
          label="Notifications" 
          notification={true}
          notificationCount={12}
        />
        <MenuItem icon="user-management" label="Messages" />
        <MenuItem icon="calendar" label="Calendar" />
        <MenuItem icon="search" label="Files" />
        <MenuItem icon="cogwheel" label="Settings" />
        <MenuItem icon="user" label="Profile" />
      </MenuItemList>
    </div>
  ),
};

// 交互式示例
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expanded, setExpanded] = React.useState(true);

    const menuItems = [
      { icon: 'home', label: 'Home' },
      { icon: 'dashboard', label: 'Dashboard' },
      { icon: 'alarm-bell', label: 'Notifications', notification: true, count: 5 },
      { icon: 'user-management', label: 'Messages' },
      { icon: 'cogwheel', label: 'Settings' },
      { icon: 'user', label: 'Profile' },
    ];

    return (
      <div style={{ width: '280px' }}>
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2a3f4f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {expanded ? '收起菜单' : '展开菜单'}
          </button>
        </div>
        <MenuItemList 
          expanded={expanded}
          selectedIndex={selectedIndex}
          onSelectionChange={setSelectedIndex}
        >
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              label={item.label}
              notification={item.notification}
              notificationCount={item.count}
            />
          ))}
        </MenuItemList>
      </div>
    );
  },
};
