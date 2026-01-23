import React from 'react';
import { AvatarButtonMenu } from './AvatarButtonMenu';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

/**
 * 简单使用示例
 * 
 * 组件会自动响应用户交互：
 * - 鼠标悬停 → 显示 hover 样式
 * - 点击 → 展开/关闭下拉菜单
 * - 点击外部 → 自动关闭菜单
 */
export const SimpleUsageExample: React.FC = () => {
  const handleProfileClick = () => {
    console.log('用户点击了"用户资料"');
    alert('跳转到用户资料页面');
  };

  const handleLogoutClick = () => {
    console.log('用户点击了"登出"');
    alert('用户已登出');
  };

  return (
    <div style={{ 
      padding: '40px',
      backgroundColor: '#000028',
      minHeight: '100vh',
    }}>
      <h1 style={{ color: 'white', marginBottom: '24px' }}>
        AvatarButtonMenu 简单使用示例
      </h1>
      
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: 'white', marginBottom: '16px' }}>
          基础用法（自动交互）
        </h2>
        <p style={{ color: '#9d9d96', marginBottom: '16px' }}>
          直接使用组件，它会自动响应鼠标交互：
        </p>
        <ul style={{ color: '#9d9d96', marginBottom: '16px', paddingLeft: '20px' }}>
          <li>鼠标悬停 → 显示 hover 样式（半透明背景）</li>
          <li>点击组件 → 展开下拉菜单</li>
          <li>再次点击 → 关闭下拉菜单</li>
          <li>点击外部区域 → 自动关闭菜单</li>
          <li>点击菜单项 → 触发回调并关闭菜单</li>
        </ul>
        
        <AvatarButtonMenu
          email="john.doe@company.com"
          role="Administrator"
          onProfileClick={handleProfileClick}
          onLogoutClick={handleLogoutClick}
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: 'white', marginBottom: '16px' }}>
          带首字母头像
        </h2>
        <AvatarButtonMenu
          email="jane.smith@company.com"
          role="Developer"
          avatarInitials={true}
          avatarText="JS"
          onProfileClick={handleProfileClick}
          onLogoutClick={handleLogoutClick}
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: 'white', marginBottom: '16px' }}>
          带图片头像
        </h2>
        <AvatarButtonMenu
          email="alice.johnson@company.com"
          role="Designer"
          avatarImage={true}
          avatarSrc="https://i.pravatar.cc/150?img=1"
          onProfileClick={handleProfileClick}
          onLogoutClick={handleLogoutClick}
        />
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
          组件已经内置了所有交互逻辑，你只需要：
        </p>
        <ol style={{ color: '#9d9d96', marginTop: '8px', paddingLeft: '20px' }}>
          <li>传入用户信息（email、role）</li>
          <li>提供回调函数（onProfileClick、onLogoutClick）</li>
          <li>就可以直接使用了！</li>
        </ol>
      </div>
    </div>
  );
};

export default SimpleUsageExample;
