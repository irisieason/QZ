import React, { useState, useRef, useEffect } from 'react';
import { AvatarButtonMenu } from './AvatarButtonMenu';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图�?
addIcons(allIcons);

export const AvatarButtonMenuExample: React.FC = () => {
  const [state, setState] = useState<'Default' | 'Hover' | 'Active'>('Default');
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setState('Default');
        setFocused(false);
      }
    };

    if (state === 'Active') {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [state]);

  const handleClick = () => {
    setState(state === 'Active' ? 'Default' : 'Active');
  };

  const handleMouseEnter = () => {
    if (state !== 'Active') {
      setState('Hover');
    }
  };

  const handleMouseLeave = () => {
    if (state !== 'Active') {
      setState('Default');
    }
  };

  const handleProfileClick = () => {
    console.log('Navigate to user profile');
    alert('Navigating to user profile...');
    setState('Default');
  };

  const handleLogoutClick = () => {
    console.log('User logged out');
    alert('Logging out...');
    setState('Default');
  };

  return (
    <div style={{ 
      padding: '40px',
      backgroundColor: '#000028',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    }}>
      <div>
        <h2 style={{ color: 'white', marginBottom: '16px' }}>Interactive Example</h2>
        <p style={{ color: '#9d9d96', marginBottom: '16px' }}>
          Click to toggle dropdown, hover to see hover state
        </p>
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AvatarButtonMenu
            focused={focused}
            state={state}
            email="john.doe@company.com"
            role="Administrator"
            onClick={handleClick}
            onProfileClick={handleProfileClick}
            onLogoutClick={handleLogoutClick}
          />
        </div>
      </div>

      <div>
        <h2 style={{ color: 'white', marginBottom: '16px' }}>Different Avatar Types</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ color: '#9d9d96', marginBottom: '8px', fontSize: '14px' }}>
              Placeholder (default)
            </p>
            <AvatarButtonMenu
              email="john.doe@company.com"
              role="Administrator"
            />
          </div>
          
          <div>
            <p style={{ color: '#9d9d96', marginBottom: '8px', fontSize: '14px' }}>
              With Initials
            </p>
            <AvatarButtonMenu
              email="jane.smith@company.com"
              role="Developer"
              avatarText="JS"
            />
          </div>
          
          <div>
            <p style={{ color: '#9d9d96', marginBottom: '8px', fontSize: '14px' }}>
              With Image
            </p>
            <AvatarButtonMenu
              email="alice.johnson@company.com"
              role="Designer"
              avatarSrc="https://i.pravatar.cc/150?img=1"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ color: 'white', marginBottom: '16px' }}>All States</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ color: '#9d9d96', marginBottom: '8px', fontSize: '14px' }}>
              Default State
            </p>
            <AvatarButtonMenu
              state="Default"
              email="john.doe@company.com"
              role="Administrator"
            />
          </div>
          
          <div>
            <p style={{ color: '#9d9d96', marginBottom: '8px', fontSize: '14px' }}>
              Hover State
            </p>
            <AvatarButtonMenu
              state="Hover"
              email="john.doe@company.com"
              role="Administrator"
            />
          </div>
          
          <div>
            <p style={{ color: '#9d9d96', marginBottom: '8px', fontSize: '14px' }}>
              Active State (with dropdown)
            </p>
            <AvatarButtonMenu
              state="Active"
              email="john.doe@company.com"
              role="Administrator"
            />
          </div>
          
          <div>
            <p style={{ color: '#9d9d96', marginBottom: '8px', fontSize: '14px' }}>
              Focused State
            </p>
            <AvatarButtonMenu
              focused={true}
              state="Default"
              email="john.doe@company.com"
              role="Administrator"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarButtonMenuExample;
