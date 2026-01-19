import React, { useState } from 'react';
import { BasicNavigation, MenuItem } from './BasicNavigation';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

/**
 * BasicNavigation 组件使用示例
 * 
 * 这个文件展示了如何在实际应用中使用 BasicNavigation 组件
 */

// 示例 1: 基础用法
export const BasicExample: React.FC = () => {
  const menuItems: MenuItem[] = [
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
  ];

  const bottomMenuItems: MenuItem[] = [
    {
      id: 'settings',
      icon: 'cogwheel',
      label: 'Settings',
      tooltip: 'Settings',
    },
  ];

  return (
    <BasicNavigation
      applicationName="My Application"
      userInitials="JD"
      menuItems={menuItems}
      bottomMenuItems={bottomMenuItems}
    >
      <div style={{ padding: '24px' }}>
        <h1 style={{ color: '#fff' }}>Welcome to My Application</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          This is the main content area.
        </p>
      </div>
    </BasicNavigation>
  );
};

// 示例 2: 交互式菜单
export const InteractiveExample: React.FC = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [menuExpanded, setMenuExpanded] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      icon: 'home',
      label: 'Home',
      active: activeItem === 'home',
      onClick: () => setActiveItem('home'),
      tooltip: 'Home',
    },
    {
      id: 'events',
      icon: 'alarm-bell',
      label: 'Event list',
      active: activeItem === 'events',
      badge: 12,
      onClick: () => setActiveItem('events'),
      tooltip: 'Event list',
    },
    {
      id: 'dashboard',
      icon: 'dashboard',
      label: 'Dashboard',
      active: activeItem === 'dashboard',
      onClick: () => setActiveItem('dashboard'),
      tooltip: 'Dashboard',
    },
    {
      id: 'maintenance',
      icon: 'maintenance-info',
      label: 'Maintenance',
      active: activeItem === 'maintenance',
      onClick: () => setActiveItem('maintenance'),
      tooltip: 'Maintenance',
    },
  ];

  const bottomMenuItems: MenuItem[] = [
    {
      id: 'settings',
      icon: 'cogwheel',
      label: 'Settings',
      active: activeItem === 'settings',
      onClick: () => setActiveItem('settings'),
      tooltip: 'Settings',
    },
    {
      id: 'about',
      icon: 'info',
      label: 'About',
      active: activeItem === 'about',
      onClick: () => setActiveItem('about'),
      tooltip: 'About',
    },
  ];

  return (
    <BasicNavigation
      applicationName="Interactive App"
      userInitials="AB"
      menuExpanded={menuExpanded}
      menuItems={menuItems}
      bottomMenuItems={bottomMenuItems}
      onMenuToggle={() => setMenuExpanded(!menuExpanded)}
      onAvatarClick={() => alert('User menu clicked')}
      onLogoClick={() => alert('Logo clicked')}
    >
      <div style={{ padding: '24px' }}>
        <h1 style={{ color: '#fff' }}>Active Item: {activeItem}</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          Click on menu items to change the active state.
        </p>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          Menu is {menuExpanded ? 'expanded' : 'collapsed'}.
        </p>
      </div>
    </BasicNavigation>
  );
};

// 示例 3: 无头部模式
export const NoHeaderExample: React.FC = () => {
  const menuItems: MenuItem[] = [
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
  ];

  return (
    <BasicNavigation
      header={false}
      menuItems={menuItems}
    >
      <div style={{ padding: '24px' }}>
        <h1 style={{ color: '#fff' }}>No Header Mode</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          This layout doesn't have a header.
        </p>
      </div>
    </BasicNavigation>
  );
};

// 示例 4: 菜单展开模式
export const ExpandedMenuExample: React.FC = () => {
  const menuItems: MenuItem[] = [
    {
      id: 'home',
      icon: 'home',
      label: 'Home',
      active: true,
      tooltip: 'Home',
    },
    {
      id: 'analytics',
      icon: 'analyze',
      label: 'Analytics',
      tooltip: 'Analytics',
    },
    {
      id: 'reports',
      icon: 'document',
      label: 'Reports',
      tooltip: 'Reports',
    },
  ];

  return (
    <BasicNavigation
      applicationName="Expanded Menu App"
      menuExpanded={true}
      menuItems={menuItems}
    >
      <div style={{ padding: '24px' }}>
        <h1 style={{ color: '#fff' }}>Expanded Menu</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          The menu is expanded by default.
        </p>
      </div>
    </BasicNavigation>
  );
};

// 示例 5: 完整应用示例
export const FullApplicationExample: React.FC = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [notifications, setNotifications] = useState(12);

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      icon: 'home',
      label: 'Home',
      active: activeItem === 'home',
      onClick: () => setActiveItem('home'),
      tooltip: 'Home',
    },
    {
      id: 'events',
      icon: 'alarm-bell',
      label: 'Event list',
      active: activeItem === 'events',
      badge: notifications,
      onClick: () => {
        setActiveItem('events');
        setNotifications(0);
      },
      tooltip: 'Event list',
    },
    {
      id: 'dashboard',
      icon: 'dashboard',
      label: 'Dashboard',
      active: activeItem === 'dashboard',
      onClick: () => setActiveItem('dashboard'),
      tooltip: 'Dashboard',
    },
    {
      id: 'maintenance',
      icon: 'maintenance-info',
      label: 'Maintenance',
      active: activeItem === 'maintenance',
      onClick: () => setActiveItem('maintenance'),
      tooltip: 'Maintenance',
    },
    {
      id: 'scheduler',
      icon: 'scheduler',
      label: 'Scheduler',
      active: activeItem === 'scheduler',
      onClick: () => setActiveItem('scheduler'),
      tooltip: 'Scheduler',
    },
    {
      id: 'users',
      icon: 'user-management',
      label: 'User management',
      active: activeItem === 'users',
      onClick: () => setActiveItem('users'),
      tooltip: 'User management',
    },
  ];

  const bottomMenuItems: MenuItem[] = [
    {
      id: 'settings',
      icon: 'cogwheel',
      label: 'Settings',
      active: activeItem === 'settings',
      onClick: () => setActiveItem('settings'),
      tooltip: 'Settings',
    },
    {
      id: 'analysis',
      icon: 'analyze',
      label: 'Analysis',
      active: activeItem === 'analysis',
      onClick: () => setActiveItem('analysis'),
      tooltip: 'Analysis',
    },
    {
      id: 'about',
      icon: 'info',
      label: 'About & legal information',
      active: activeItem === 'about',
      onClick: () => setActiveItem('about'),
      tooltip: 'About & legal information',
    },
  ];

  const renderContent = () => {
    switch (activeItem) {
      case 'home':
        return (
          <div>
            <h1 style={{ color: '#fff', fontSize: '32px', marginBottom: '24px' }}>
              Welcome Home
            </h1>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              <div style={{ 
                padding: '24px', 
                background: 'var(--color-2)', 
                borderRadius: '8px' 
              }}>
                <h2 style={{ color: '#fff', marginBottom: '12px' }}>Quick Stats</h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  View your application statistics here.
                </p>
              </div>
              <div style={{ 
                padding: '24px', 
                background: 'var(--color-2)', 
                borderRadius: '8px' 
              }}>
                <h2 style={{ color: '#fff', marginBottom: '12px' }}>Recent Activity</h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Latest updates and activities.
                </p>
              </div>
            </div>
          </div>
        );
      case 'events':
        return (
          <div>
            <h1 style={{ color: '#fff', fontSize: '32px', marginBottom: '24px' }}>
              Event List
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              You have cleared all notifications!
            </p>
          </div>
        );
      case 'dashboard':
        return (
          <div>
            <h1 style={{ color: '#fff', fontSize: '32px', marginBottom: '24px' }}>
              Dashboard
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              View your dashboard metrics and charts here.
            </p>
          </div>
        );
      default:
        return (
          <div>
            <h1 style={{ color: '#fff', fontSize: '32px', marginBottom: '24px' }}>
              {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Content for {activeItem} page.
            </p>
          </div>
        );
    }
  };

  return (
    <BasicNavigation
      applicationName="Full Application"
      userInitials="JD"
      menuExpanded={menuExpanded}
      menuItems={menuItems}
      bottomMenuItems={bottomMenuItems}
      onMenuToggle={() => setMenuExpanded(!menuExpanded)}
      onAvatarClick={() => alert('User profile')}
      onLogoClick={() => setActiveItem('home')}
    >
      <div style={{ padding: '40px', maxWidth: '1200px' }}>
        {renderContent()}
      </div>
    </BasicNavigation>
  );
};

// 默认导出
export default FullApplicationExample;
