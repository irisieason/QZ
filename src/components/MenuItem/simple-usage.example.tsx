import React from 'react';
import { MenuItem } from './MenuItem';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

/**
 * MenuItem 简单使用示例
 * 
 * 组件会自动响应用户交互：
 * - 鼠标悬停 → 显示 hover 样式
 * - 点击 → 设置为选中状态
 * - 选中后保持选中，直到点击其他菜单项
 */
export const MenuItemSimpleUsageExample: React.FC = () => {
  const [selectedItem, setSelectedItem] = React.useState<string>('Dashboard');

  const handleClick = (label: string) => {
    console.log(`点击了菜单项: ${label}`);
    setSelectedItem(label);
  };

  return (
    <div style={{ 
      padding: '40px',
      backgroundColor: '#000028',
      minHeight: '100vh',
    }}>
      <h1 style={{ color: 'white', marginBottom: '24px' }}>
        MenuItem 简单使用示例
      </h1>
      
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: 'white', marginBottom: '16px' }}>
          基础用法（自动交互 + 选中状态管理）
        </h2>
        <p style={{ color: '#9d9d96', marginBottom: '16px' }}>
          组件会自动响应鼠标交互：
        </p>
        <ul style={{ color: '#9d9d96', marginBottom: '16px', paddingLeft: '20px' }}>
          <li>鼠标悬停 → 显示 hover 样式（半透明背景）</li>
          <li>点击 → 设置为选中状态</li>
          <li>选中后保持选中，直到点击其他菜单项</li>
          <li>鼠标离开 → 如果已选中，保持选中样式</li>
        </ul>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '240px' }}>
          <MenuItem
            icon="home"
            label="Dashboard"
            selected={selectedItem === 'Dashboard'}
            onClick={() => handleClick('Dashboard')}
          />
          <MenuItem
            icon="user"
            label="Profile"
            selected={selectedItem === 'Profile'}
            onClick={() => handleClick('Profile')}
          />
          <MenuItem
            icon="settings"
            label="Settings"
            selected={selectedItem === 'Settings'}
            onClick={() => handleClick('Settings')}
          />
          <MenuItem
            icon="help-circle"
            label="Help"
            selected={selectedItem === 'Help'}
            onClick={() => handleClick('Help')}
          />
        </div>
        <p style={{ color: '#9d9d96', marginTop: '16px', fontSize: '14px' }}>
          当前选中: <strong style={{ color: 'white' }}>{selectedItem}</strong>
        </p>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: 'white', marginBottom: '16px' }}>
          带通知徽章
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '240px' }}>
          <MenuItem
            icon="mail"
            label="Messages"
            notification={true}
            notificationCount={5}
            selected={selectedItem === 'Messages'}
            onClick={() => handleClick('Messages')}
          />
          <MenuItem
            icon="bell"
            label="Notifications"
            notification={true}
            notificationCount={12}
            selected={selectedItem === 'Notifications'}
            onClick={() => handleClick('Notifications')}
          />
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: 'white', marginBottom: '16px' }}>
          折叠状态（仅显示图标）
        </h2>
        <p style={{ color: '#9d9d96', marginBottom: '16px' }}>
          鼠标悬停时会显示 tooltip
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '56px' }}>
          <MenuItem
            icon="home"
            label="Dashboard"
            expanded={false}
            selected={selectedItem === 'Dashboard'}
            onClick={() => handleClick('Dashboard')}
          />
          <MenuItem
            icon="user"
            label="Profile"
            expanded={false}
            selected={selectedItem === 'Profile'}
            onClick={() => handleClick('Profile')}
          />
          <MenuItem
            icon="settings"
            label="Settings"
            expanded={false}
            selected={selectedItem === 'Settings'}
            onClick={() => handleClick('Settings')}
          />
          <MenuItem
            icon="help-circle"
            label="Help"
            expanded={false}
            selected={selectedItem === 'Help'}
            onClick={() => handleClick('Help')}
          />
        </div>
      </div>

      <div style={{ 
        marginTop: '48px',
        padding: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '4px',
      }}>
        <h3 style={{ color: 'white', marginBottom: '8px' }}>
          💡 使用提示
        </h3>
        <p style={{ color: '#9d9d96', margin: 0 }}>
          要实现选中状态管理，需要在父组件中：
        </p>
        <ol style={{ color: '#9d9d96', marginTop: '8px', paddingLeft: '20px' }}>
          <li>使用 useState 管理当前选中的菜单项</li>
          <li>通过 selected 属性传递选中状态</li>
          <li>在 onClick 回调中更新选中状态</li>
          <li>这样点击一个菜单项时，其他菜单项会自动取消选中</li>
        </ol>
      </div>
    </div>
  );
};

export default MenuItemSimpleUsageExample;
