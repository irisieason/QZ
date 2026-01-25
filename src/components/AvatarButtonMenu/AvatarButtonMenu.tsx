import React, { useRef, useState, useCallback, useMemo } from 'react';
import { Avatar } from '../Avatar';
import { useClickOutside } from '../../hooks/useClickOutside';
import './AvatarButtonMenu.css';

// Figma 定义的状态类型
export type AvatarButtonMenuState = 'Default' | 'Hover' | 'Active';

// Figma 定义的属性（严格遵循 Figma 设计）
interface AvatarButtonMenuFigmaProps {
  /** 是否显示聚焦状态 */
  focused?: boolean;
  
  /** 组件状态（可选，如果不提供则组件内部自动管理） */
  state?: AvatarButtonMenuState;
  
  /** 是否展开显示完整信息（Figma 属性） */
  expand?: boolean;
}

// 扩展属性（React 特定，非 Figma 定义）
interface AvatarButtonMenuExtendedProps {
  /** 用户邮箱 - 扩展属性，用于显示用户信息 */
  email?: string;
  
  /** 用户角色 - 扩展属性，用于显示用户信息 */
  role?: string;
  
  /** 用户头像 URL - 扩展属性，传递给 Avatar 组件 */
  avatarSrc?: string;
  
  /** 用户首字母 - 扩展属性，传递给 Avatar 组件 */
  avatarText?: string;
  
  /** 是否显示头像图片 - 扩展属性，传递给 Avatar 组件 */
  avatarImage?: boolean;
  
  /** 是否显示首字母 - 扩展属性，传递给 Avatar 组件 */
  avatarInitials?: boolean;
  
  /** 点击事件处理 */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 点击用户资料菜单项 */
  onProfileClick?: () => void;
  
  /** 点击登出菜单项 */
  onLogoutClick?: () => void;
  
  /** 自定义类名 */
  className?: string;
  
  /** 可访问性标签 */
  'aria-label'?: string;
}

// 最终组件属性
export interface AvatarButtonMenuProps extends AvatarButtonMenuFigmaProps, AvatarButtonMenuExtendedProps {}

export const AvatarButtonMenu: React.FC<AvatarButtonMenuProps> = ({
  // Figma 属性
  focused = false,
  state: controlledState,
  expand = true,
  
  // 扩展属性
  email = 'john.doe@company.com',
  role = 'Administrator',
  avatarSrc,
  avatarText = 'JD',
  avatarImage = false,
  avatarInitials = false,
  onClick,
  onProfileClick,
  onLogoutClick,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // 内部状态管理（如果外部没有提供 state）
  const [internalState, setInternalState] = useState<AvatarButtonMenuState>('Default');
  
  // 使用受控状态或内部状态
  const state = controlledState !== undefined ? controlledState : internalState;
  const isControlled = controlledState !== undefined;

  // ✅ 使用 useClickOutside hook 处理点击外部关闭
  useClickOutside(containerRef, useCallback(() => {
    if (!isControlled && state === 'Active') {
      setInternalState('Default');
    }
  }, [isControlled, state]));

  // ✅ 性能优化：使用 useMemo 缓存类名计算
  const buttonClasses = useMemo(() => {
    const classes = ['avatar-button-menu'];
    
    // 展开/收起状态
    if (!expand) {
      classes.push('avatar-button-menu--collapsed');
    }
    
    // 状态类名
    if (state !== 'Default') {
      classes.push(`avatar-button-menu--${state.toLowerCase()}`);
    }
    
    // 聚焦状态
    if (focused) {
      classes.push('avatar-button-menu--focused');
    }
    
    // 自定义类名
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  }, [expand, state, focused, className]);

  // ✅ 性能优化：使用 useCallback 缓存事件处理器
  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!isControlled) {
      // 非受控模式：组件内部管理状态
      setInternalState(state === 'Active' ? 'Default' : 'Active');
    }
    
    onClick?.(event);
  }, [isControlled, state, onClick]);

  const handleMouseEnter = useCallback(() => {
    if (!isControlled && state !== 'Active') {
      setInternalState('Hover');
    }
  }, [isControlled, state]);

  const handleMouseLeave = useCallback(() => {
    if (!isControlled && state !== 'Active') {
      setInternalState('Default');
    }
  }, [isControlled, state]);

  const handleProfileClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    
    if (!isControlled) {
      setInternalState('Default');
    }
    
    onProfileClick?.();
  }, [isControlled, onProfileClick]);

  const handleLogoutClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    
    if (!isControlled) {
      setInternalState('Default');
    }
    
    onLogoutClick?.();
  }, [isControlled, onLogoutClick]);

  return (
    <div
      ref={containerRef}
      className={buttonClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      aria-label={ariaLabel || `User menu: ${email}`}
      aria-expanded={state === 'Active'}
      aria-haspopup="menu"
      data-state={state}
      data-focused={focused}
      data-expand={expand}
    >
      <div className="avatar-button-menu__container">
        <Avatar
          image={avatarImage}
          initials={avatarInitials}
          text={avatarText}
          src={avatarSrc}
          className="avatar-button-menu__avatar"
        />
        
        {expand && (
          <div className="avatar-button-menu__info">
            <span className="avatar-button-menu__email">{email}</span>
            <span className="avatar-button-menu__role">{role}</span>
          </div>
        )}
        
        {focused && <span className="avatar-button-menu__focus-outline" />}
      </div>
      
      {state === 'Active' && (
        <div 
          ref={dropdownRef}
          className="avatar-button-menu__dropdown"
          role="menu"
        >
          <div className="avatar-button-menu__dropdown-content">
            <div
              className="avatar-button-menu__menu-item"
              onClick={handleProfileClick}
              role="menuitem"
              tabIndex={0}
            >
              <span className="avatar-button-menu__menu-item-check" />
              <span className="avatar-button-menu__menu-item-icon">
                <ix-icon name="user" size="24" />
              </span>
              <span className="avatar-button-menu__menu-item-label">
                User profile...
              </span>
            </div>
            
            <div
              className="avatar-button-menu__menu-item"
              onClick={handleLogoutClick}
              role="menuitem"
              tabIndex={0}
            >
              <span className="avatar-button-menu__menu-item-check" />
              <span className="avatar-button-menu__menu-item-icon">
                <ix-icon name="log-out" size="24" />
              </span>
              <span className="avatar-button-menu__menu-item-label">
                Logout
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

AvatarButtonMenu.displayName = 'AvatarButtonMenu';
