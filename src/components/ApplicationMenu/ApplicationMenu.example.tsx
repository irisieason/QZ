import React, { useState } from 'react';
import { ApplicationMenu } from './ApplicationMenu';
import { AvatarButtonMenu } from '../AvatarButtonMenu';
import { MenuItem } from '../MenuItem';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

/**
 * ApplicationMenu 使用示例
 * 
 * 应用程序菜单容器组件，使用 Slot 模式：
 * - expanded: 控制展开/折叠状态（Figma 属性）
 * - toggleButton: 自定义切换按钮（Slot）
 * - avatarSection: 用户头像区域（Slot）
 * - menuList: 菜单项列表（Slot）
 */
export const ApplicationMenuExample: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const [selectedItem, setSelectedItem] = useState('Home');

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleMenuItemClick = (item: string) => {
    console.log(`导航到: ${item}`);
    setSelectedItem(item);
  };

  const handleProfileClick = () => {
    console.log('打开用户资料');
    alert('打开用户资料页面');
  };

  const handleLogoutClick = () => {
    console.log('用户登出');
    alert('用户已登出');
  };

  return (
    <div style={{ 
      display: 'flex',
      backgroundColor: '#000028',
      minHeight: '100vh',
    }}>
      {/* 应用程序菜单容器 */}
      <ApplicationMenu
        expanded={expanded}
        onToggleExpand={handleToggleExpand}
        avatarSection={
          <AvatarButtonMenu
            email="john.doe@company.com"
            role="Administrator"
            onProfileClick={handleProfileClick}
            onLogoutClick={handleLogoutClick}
          />
        }
        menuList={
          <>
            <MenuItem
              icon="home"
              label="Home"
              expanded={expanded}
              selected={selectedItem === 'Home'}
              onClick={() => handleMenuItemClick('Home')}
            />
            <MenuItem
              icon="bell"
              label="Event list"
              expanded={expanded}
              notification={true}
              notificationCount={12}
              selected={selectedItem === 'Event list'}
              onClick={() => handleMenuItemClick('Event list')}
            />
            <MenuItem
              icon="dashboard"
              label="Dashboard"
              expanded={expanded}
              selected={selectedItem === 'Dashboard'}
              onClick={() => handleMenuItemClick('Dashboard')}
            />
            <MenuItem
              icon="wrench"
              label="Maintenance"
              expanded={expanded}
              selected={selectedItem === 'Maintenance'}
              onClick={() => handleMenuItemClick('Maintenance')}
            />
            <MenuItem
              icon="calendar"
              label="Scheduler"
              expanded={expanded}
              selected={selectedItem === 'Scheduler'}
              onClick={() => handleMenuItemClick('Scheduler')}
            />
            <MenuItem
              icon="users"
              label="User management"
              expanded={expanded}
              selected={selectedItem === 'User management'}
              onClick={() => handleMenuItemClick('User management')}
            />
          </>
        }
      />

      {/* 主内容区域 */}
      <div style={{ 
        flex: 1,
        padding: '40px',
        color: 'white',
      }}>
        <h1 style={{ marginBottom: '24px' }}>
          ApplicationMenu 示例
        </h1>
        
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '16px' }}>当前状态</h2>
          <p style={{ color: '#9d9d96', marginBottom: '8px' }}>
            菜单状态: <strong style={{ color: 'white' }}>{expanded ? '展开' : '折叠'}</strong>
          </p>
          <p style={{ color: '#9d9d96', marginBottom: '8px' }}>
            当前选中: <strong style={{ color: 'white' }}>{selectedItem}</strong>
          </p>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '16px' }}>功能说明</h2>
          <ul style={{ color: '#9d9d96', paddingLeft: '20px' }}>
            <li>点击左上角按钮可以展开/折叠菜单</li>
            <li>折叠时只显示图标，悬停显示 tooltip</li>
            <li>展开时显示完整的菜单项文本</li>
            <li>点击菜单项会切换选中状态</li>
            <li>点击用户头像可以打开用户菜单</li>
            <li>"Event list" 菜单项显示通知徽章（12）</li>
          </ul>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '16px' }}>交互演示</h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={handleToggleExpand}
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
              onClick={() => handleMenuItemClick('Dashboard')}
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              跳转到 Dashboard
            </button>
            
            <button
              onClick={() => handleMenuItemClick('Scheduler')}
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              跳转到 Scheduler
            </button>
          </div>
        </div>

        <div style={{ 
          marginTop: '48px',
          padding: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
        }}>
          <h3 style={{ marginBottom: '8px' }}>
            💡 Slot 模式
          </h3>
          <p style={{ color: '#9d9d96', margin: 0 }}>
            ApplicationMenu 是一个容器组件，使用 Slot 模式。
            除了 expanded 属性（Figma 定义），其他内容都通过 Slot 传入：
            avatarSection（用户头像）、children/menuList（菜单项）、toggleButton（切换按钮）。
            这提供了最大的灵活性，让你可以自定义任何内容。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationMenuExample;
