import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MenuItem } from './MenuItem';
import { availableIcons } from './icon-list';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

const meta = {
  title: 'Components/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'MenuItem 组件用于导航菜单中的菜单项，支持展开/折叠、选中状态、通知徽章等功能。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Figma 定义的属性
    label: {
      control: 'text',
      description: '菜单项文本',
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
    notification: {
      control: 'boolean',
      description: '是否显示通知徽章',
      table: {
        category: 'Figma Props',
      },
    },
    variant: {
      control: 'select',
      options: ['Main Item'],
      description: '菜单项变体',
      table: {
        category: 'Figma Props',
      },
    },
    expanded: {
      control: 'boolean',
      description: '是否展开（显示文本）',
      table: {
        category: 'Figma Props',
      },
    },
    state: {
      control: 'select',
      options: ['Default', 'Hover', 'Active'],
      description: '菜单项状态',
      table: {
        category: 'Figma Props',
      },
    },
    selected: {
      control: 'boolean',
      description: '是否选中',
      table: {
        category: 'Figma Props',
      },
    },
    // 扩展属性
    icon: {
      control: 'select',
      options: availableIcons,
      description: '图标名称（来自 ix-icons）- 扩展属性',
      table: {
        category: 'Extended Props',
      },
    },
    notificationCount: {
      control: 'number',
      description: '通知数量 - 扩展属性',
      table: {
        category: 'Extended Props',
      },
    },
    
    // ========== 隐藏的属性（开发者需要但设计师不需要） ==========
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// 默认状态 - Main Item 展开
export const Default: Story = {
  args: {
    label: 'Dashboard',
    icon: 'dashboard',
    variant: 'Main Item',
    expanded: true,
    state: 'Default',
    focused: false,
    notification: false,
  },
};

// 选中状态
export const Selected: Story = {
  args: {
    label: 'Dashboard',
    icon: 'dashboard',
    variant: 'Main Item',
    expanded: true,
    state: 'Default',
    selected: true,
    focused: false,
    notification: false,
  },
};

// 带通知徽章
export const WithNotification: Story = {
  args: {
    label: 'Messages',
    icon: 'mail',
    variant: 'Main Item',
    expanded: true,
    state: 'Default',
    focused: false,
    notification: true,
    notificationCount: 12,
  },
};

// Hover 状态
export const Hover: Story = {
  args: {
    label: 'Settings',
    icon: 'settings',
    variant: 'Main Item',
    expanded: true,
    state: 'Hover',
    focused: false,
    notification: false,
  },
};

// Active 状态
export const Active: Story = {
  args: {
    label: 'Settings',
    icon: 'settings',
    variant: 'Main Item',
    expanded: true,
    state: 'Active',
    focused: false,
    notification: false,
  },
};

// 聚焦状态
export const Focused: Story = {
  args: {
    label: 'Dashboard',
    icon: 'dashboard',
    variant: 'Main Item',
    expanded: true,
    state: 'Default',
    focused: true,
    notification: false,
  },
};

// 折叠状态
export const Collapsed: Story = {
  args: {
    label: 'Dashboard',
    icon: 'dashboard',
    variant: 'Main Item',
    expanded: false,
    state: 'Default',
    focused: false,
    notification: false,
  },
};

// 折叠 + 选中
export const CollapsedSelected: Story = {
  args: {
    label: 'Dashboard',
    icon: 'dashboard',
    variant: 'Main Item',
    expanded: false,
    state: 'Default',
    selected: true,
    focused: false,
    notification: false,
  },
};

// 折叠 + 通知
export const CollapsedWithNotification: Story = {
  args: {
    label: 'Messages',
    icon: 'mail',
    variant: 'Main Item',
    expanded: false,
    state: 'Default',
    focused: false,
    notification: true,
    notificationCount: 5,
  },
};

// 菜单列表示例
export const MenuList: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = React.useState<string>('dashboard');
    const menuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setSelectedItem('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div ref={menuRef} style={{ display: 'flex', flexDirection: 'column', gap: '0', backgroundColor: '#000028', padding: '8px 0' }}>
        <MenuItem 
          label="Dashboard" 
          icon="dashboard" 
          variant="Main Item" 
          expanded={true} 
          selected={selectedItem === 'dashboard'}
          onClick={() => setSelectedItem('dashboard')}
        />
        <MenuItem 
          label="Analytics" 
          icon="chart" 
          variant="Main Item" 
          expanded={true}
          selected={selectedItem === 'analytics'}
          onClick={() => setSelectedItem('analytics')}
        />
        <MenuItem 
          label="Messages" 
          icon="mail" 
          variant="Main Item" 
          expanded={true} 
          notification={true} 
          notificationCount={12}
          selected={selectedItem === 'messages'}
          onClick={() => setSelectedItem('messages')}
        />
        <MenuItem 
          label="Calendar" 
          icon="calendar" 
          variant="Main Item" 
          expanded={true}
          selected={selectedItem === 'calendar'}
          onClick={() => setSelectedItem('calendar')}
        />
        <MenuItem 
          label="Settings" 
          icon="settings" 
          variant="Main Item" 
          expanded={true}
          selected={selectedItem === 'settings'}
          onClick={() => setSelectedItem('settings')}
        />
        <MenuItem 
          label="Help" 
          icon="help" 
          variant="Main Item" 
          expanded={true}
          selected={selectedItem === 'help'}
          onClick={() => setSelectedItem('help')}
        />
      </div>
    );
  },
};

// 折叠菜单列表示例
export const CollapsedMenuList: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = React.useState<string>('dashboard');
    const menuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setSelectedItem('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div ref={menuRef} style={{ display: 'flex', flexDirection: 'column', gap: '0', backgroundColor: '#000028', padding: '8px 0' }}>
        <MenuItem 
          label="Dashboard" 
          icon="dashboard" 
          variant="Main Item" 
          expanded={false} 
          selected={selectedItem === 'dashboard'}
          onClick={() => setSelectedItem('dashboard')}
        />
        <MenuItem 
          label="Analytics" 
          icon="chart" 
          variant="Main Item" 
          expanded={false}
          selected={selectedItem === 'analytics'}
          onClick={() => setSelectedItem('analytics')}
        />
        <MenuItem 
          label="Messages" 
          icon="mail" 
          variant="Main Item" 
          expanded={false} 
          notification={true} 
          notificationCount={12}
          selected={selectedItem === 'messages'}
          onClick={() => setSelectedItem('messages')}
        />
        <MenuItem 
          label="Calendar" 
          icon="calendar" 
          variant="Main Item" 
          expanded={false}
          selected={selectedItem === 'calendar'}
          onClick={() => setSelectedItem('calendar')}
        />
        <MenuItem 
          label="Settings" 
          icon="settings" 
          variant="Main Item" 
          expanded={false}
          selected={selectedItem === 'settings'}
          onClick={() => setSelectedItem('settings')}
        />
        <MenuItem 
          label="Help" 
          icon="help" 
          variant="Main Item" 
          expanded={false}
          selected={selectedItem === 'help'}
          onClick={() => setSelectedItem('help')}
        />
      </div>
    );
  },
};

// 交互式菜单示例（点击选中，点击外部取消选中）
export const InteractiveMenu: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = React.useState<string>('dashboard');
    const [expanded, setExpanded] = React.useState<boolean>(true);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'analytics', label: 'Analytics', icon: 'chart' },
      { id: 'messages', label: 'Messages', icon: 'mail', notification: true, count: 12 },
      { id: 'calendar', label: 'Calendar', icon: 'calendar' },
      { id: 'settings', label: 'Settings', icon: 'settings' },
    ];

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setSelectedItem('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div style={{ display: 'flex', gap: '20px' }}>
        <div ref={menuRef} style={{ backgroundColor: '#000028', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              {expanded ? '← Collapse' : '→ Expand'}
            </button>
          </div>
          <div style={{ padding: '8px 0' }}>
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                label={item.label}
                icon={item.icon}
                variant="Main Item"
                expanded={expanded}
                selected={selectedItem === item.id}
                notification={item.notification}
                notificationCount={item.count}
                onClick={() => setSelectedItem(item.id)}
              />
            ))}
          </div>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', minWidth: '200px' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 'bold' }}>
            Selected: {selectedItem || 'None'}
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
            💡 点击菜单项选中，点击外部取消选中
          </p>
        </div>
      </div>
    );
  },
};

// 单个可点击的 MenuItem（非受控模式 - 支持切换选中）
export const ClickableItem: Story = {
  render: () => {
    return (
      <div style={{ backgroundColor: '#000028', padding: '8px 0', width: '256px' }}>
        <MenuItem 
          label="Dashboard" 
          icon="dashboard" 
          variant="Main Item" 
          expanded={true}
        />
        <div style={{ padding: '16px', color: '#9d9d96', fontSize: '12px' }}>
          💡 点击菜单项选中，再次点击取消选中（切换模式）
        </div>
      </div>
    );
  },
};

// 多个独立的 MenuItem（非受控模式 - 每个独立切换）
export const MultipleIndependentItems: Story = {
  render: () => {
    return (
      <div>
        <div style={{ backgroundColor: '#000028', padding: '8px 0', width: '256px' }}>
          <MenuItem 
            label="Dashboard" 
            icon="dashboard" 
            variant="Main Item" 
            expanded={true}
          />
          <MenuItem 
            label="Analytics" 
            icon="chart" 
            variant="Main Item" 
            expanded={true}
          />
          <MenuItem 
            label="Settings" 
            icon="settings" 
            variant="Main Item" 
            expanded={true}
          />
        </div>
        <div style={{ padding: '16px', color: '#666', fontSize: '12px', maxWidth: '256px' }}>
          💡 <strong>非受控模式</strong>：每个菜单项独立管理自己的选中状态。
          点击任意菜单项可以选中，再次点击取消选中。
          可以同时选中多个项（因为它们各自独立）。
        </div>
      </div>
    );
  },
};
