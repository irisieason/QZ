import React, { useState, useRef, useEffect } from 'react';
import { MenuItem } from './MenuItem';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

export const MenuItemExample: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('dashboard');
  const [expanded, setExpanded] = useState<boolean>(true);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', variant: 'Main Item' as const },
    { id: 'analytics', label: 'Analytics', icon: 'chart', variant: 'Main Item' as const },
    { id: 'messages', label: 'Messages', icon: 'mail', variant: 'Main Item' as const, notification: true, count: 12 },
    { id: 'calendar', label: 'Calendar', icon: 'calendar', variant: 'Main Item' as const },
    { id: 'users', label: 'Users', icon: 'users', variant: 'Main Item' as const },
    { id: 'settings', label: 'Settings', icon: 'settings', variant: 'Main Item' as const },
    { id: 'help', label: 'Help', icon: 'help', variant: 'Main Item' as const },
  ];

  // 点击外部区域取消选中
  useEffect(() => {
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
    <div style={{ display: 'flex', gap: '32px', padding: '20px', backgroundColor: '#f5f5f5' }}>
      {/* 展开的菜单 */}
      <div ref={menuRef} style={{ backgroundColor: '#000028', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
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
              variant={item.variant}
              expanded={expanded}
              selected={selectedItem === item.id}
              notification={item.notification}
              notificationCount={item.count}
              onClick={() => setSelectedItem(item.id)}
            />
          ))}
        </div>
      </div>

      {/* 内容区域 */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>
          {selectedItem ? menuItems.find(item => item.id === selectedItem)?.label : 'No item selected'}
        </h2>
        <p>Selected menu item: <strong>{selectedItem || 'None'}</strong></p>
        <p>Menu is: <strong>{expanded ? 'Expanded' : 'Collapsed'}</strong></p>
        <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
          💡 提示：点击菜单项选中，点击菜单外部区域取消选中
        </p>
      </div>
    </div>
  );
};

export default MenuItemExample;
