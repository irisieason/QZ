import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BasicNavigation, MenuItem } from './BasicNavigation';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// Register ALL icons for Storybook
addIcons(allIcons);

// 默认菜单项
const defaultMenuItems: MenuItem[] = [
  {
    id: 'home',
    icon: 'home',
    label: 'Home',
    active: true,
    tooltip: 'Home',
  },
  {
    id: 'events',
    icon: 'alarm-bell',
    label: 'Event list',
    badge: 12,
    tooltip: 'Event list',
  },
  {
    id: 'dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
    tooltip: 'Dashboard',
  },
  {
    id: 'maintenance',
    icon: 'maintenance-info',
    label: 'Maintenance',
    tooltip: 'Maintenance',
  },
  {
    id: 'submenu',
    icon: 'apps',
    label: 'Submenu',
    tooltip: 'Submenu',
  },
  {
    id: 'scheduler',
    icon: 'scheduler',
    label: 'Scheduler',
    tooltip: 'Scheduler',
  },
  {
    id: 'users',
    icon: 'user-management',
    label: 'User management',
    tooltip: 'User management',
  },
];

const defaultBottomMenuItems: MenuItem[] = [
  {
    id: 'settings',
    icon: 'cogwheel',
    label: 'Settings',
    tooltip: 'Settings',
  },
  {
    id: 'analysis',
    icon: 'analyze',
    label: 'Analysis',
    tooltip: 'Analysis',
  },
  {
    id: 'about',
    icon: 'info',
    label: 'About & legal information',
    tooltip: 'About & legal information',
  },
];

const meta: Meta<typeof BasicNavigation> = {
  title: 'Components/BasicNavigation',
  component: BasicNavigation,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        component: `
基础导航布局组件，包含应用头部、侧边菜单和主内容区域。

**组件结构：**
- **Application Header**: 应用头部（Logo + 应用名称 + 用户头像）
- **Application Menu**: 侧边导航菜单（可折叠/展开）
- **Main Content**: 主内容区域

**Figma 属性：**
- \`header\`: 是否显示头部
- \`openOverlay\`: 是否打开覆盖层
- \`viewport\`: 视口尺寸
- \`applicationName\`: 应用名称
- \`userInitials\`: 用户缩写
- \`showLogo\`: 是否显示 Logo
- \`menuExpanded\`: 菜单是否展开

**扩展属性：**
- \`menuItems\`: 主菜单项配置
- \`bottomMenuItems\`: 底部菜单项配置
- \`onMenuToggle\`: 菜单切换事件
- \`onAvatarClick\`: 用户头像点击事件

**用途：** 应用主布局、导航系统
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: 'boolean',
      description: '是否显示头部（来自 Figma）',
    },
    openOverlay: {
      control: 'boolean',
      description: '是否打开覆盖层（来自 Figma）',
    },
    viewport: {
      control: 'select',
      options: ['lg - Desktop', 'md - Tablet', 'sm - Mobile', 'sm - Mobile (expded)'],
      description: '视口尺寸（来自 Figma）',
    },
    applicationName: {
      control: 'text',
      description: '应用名称',
    },
    userInitials: {
      control: 'text',
      description: '用户缩写（头像显示）',
    },
    showLogo: {
      control: 'boolean',
      description: '是否显示 Logo',
    },
    menuExpanded: {
      control: 'boolean',
      description: '菜单是否展开（来自 Figma）',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BasicNavigation>;

// 默认故事
export const Default: Story = {
  args: {
    header: true,
    openOverlay: false,
    viewport: 'lg - Desktop',
    applicationName: 'Application name',
    userInitials: 'JD',
    showLogo: true,
    menuExpanded: false,
    menuItems: defaultMenuItems,
    bottomMenuItems: defaultBottomMenuItems,
  },
  render: (args) => (
    <BasicNavigation {...args}>
      <div style={{ padding: '24px' }}>
        <h1 style={{ color: '#fff', marginBottom: '16px' }}>Main Content Area</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          This is the main content area. Add your application content here.
        </p>
      </div>
    </BasicNavigation>
  ),
};

// 菜单展开
export const MenuExpanded: Story = {
  args: {
    ...Default.args,
    menuExpanded: true,
  },
  render: Default.render,
};

// 无头部
export const NoHeader: Story = {
  args: {
    ...Default.args,
    header: false,
  },
  render: Default.render,
};

// 带覆盖层
export const WithOverlay: Story = {
  args: {
    ...Default.args,
    openOverlay: true,
  },
  render: Default.render,
};

// 平板视口
export const TabletViewport: Story = {
  args: {
    ...Default.args,
    viewport: 'md - Tablet',
  },
  render: Default.render,
};

// 移动视口
export const MobileViewport: Story = {
  args: {
    ...Default.args,
    viewport: 'sm - Mobile',
  },
  render: Default.render,
};

// 自定义菜单项
export const CustomMenuItems: Story = {
  args: {
    ...Default.args,
    menuItems: [
      {
        id: 'projects',
        icon: 'project',
        label: 'Projects',
        active: true,
        tooltip: 'Projects',
      },
      {
        id: 'tasks',
        icon: 'tasks-all',
        label: 'Tasks',
        badge: 5,
        tooltip: 'Tasks',
      },
      {
        id: 'calendar',
        icon: 'calendar',
        label: 'Calendar',
        tooltip: 'Calendar',
      },
    ],
    bottomMenuItems: [
      {
        id: 'settings',
        icon: 'cogwheel',
        label: 'Settings',
        tooltip: 'Settings',
      },
    ],
  },
  render: Default.render,
};

// 交互示例组件
const InteractiveExample: React.FC<any> = (args) => {
  const [activeItem, setActiveItem] = React.useState('home');
  
  const menuItems = defaultMenuItems.map(item => ({
    ...item,
    active: item.id === activeItem,
    onClick: () => setActiveItem(item.id),
  }));
  
  return (
    <BasicNavigation
      {...args}
      menuItems={menuItems}
      onAvatarClick={() => alert('Avatar clicked!')}
      onLogoClick={() => alert('Logo clicked!')}
      onMenuToggle={() => console.log('Menu toggled')}
    >
      <div style={{ padding: '24px' }}>
        <h1 style={{ color: '#fff', marginBottom: '16px' }}>
          Active Item: {activeItem}
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          Click on menu items to see the active state change.
        </p>
      </div>
    </BasicNavigation>
  );
};

// 交互示例
export const Interactive: Story = {
  args: {
    ...Default.args,
  },
  render: InteractiveExample,
};

// 完整示例组件
const FullExampleComponent: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState('home');
  const [menuExpanded, setMenuExpanded] = React.useState(false);
  
  const menuItems = defaultMenuItems.map(item => ({
    ...item,
    active: item.id === activeItem,
    onClick: () => setActiveItem(item.id),
  }));
  
  return (
    <BasicNavigation
      header={true}
      applicationName="My Application"
      userInitials="AB"
      menuExpanded={menuExpanded}
      menuItems={menuItems}
      bottomMenuItems={defaultBottomMenuItems}
      onMenuToggle={() => setMenuExpanded(!menuExpanded)}
      onAvatarClick={() => alert('User menu')}
      onLogoClick={() => alert('Go to home')}
    >
      <div style={{ padding: '40px', maxWidth: '1200px' }}>
        <h1 style={{ color: '#fff', fontSize: '32px', marginBottom: '24px' }}>
          Welcome to My Application
        </h1>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{ 
            padding: '24px', 
            background: 'var(--color-2)', 
            borderRadius: '8px' 
          }}>
            <h2 style={{ color: '#fff', marginBottom: '12px' }}>Card 1</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              This is a sample card in the main content area.
            </p>
          </div>
          <div style={{ 
            padding: '24px', 
            background: 'var(--color-2)', 
            borderRadius: '8px' 
          }}>
            <h2 style={{ color: '#fff', marginBottom: '12px' }}>Card 2</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Another sample card with some content.
            </p>
          </div>
          <div style={{ 
            padding: '24px', 
            background: 'var(--color-2)', 
            borderRadius: '8px' 
          }}>
            <h2 style={{ color: '#fff', marginBottom: '12px' }}>Card 3</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              More content in this card.
            </p>
          </div>
        </div>
        <p style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
          Active menu item: <strong style={{ color: '#00bdff' }}>{activeItem}</strong>
        </p>
      </div>
    </BasicNavigation>
  );
};

// 完整示例
export const FullExample: Story = {
  render: FullExampleComponent,
};
