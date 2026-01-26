import React, { useCallback, useMemo } from 'react';
import './ApplicationHeader.css';

// ========== 视觉属性（来自 Figma） ==========
interface ApplicationHeaderVisualProps {
  /** 应用名称 */
  appName?: string;
  
  /** 是否显示应用切换按钮 */
  appSwitch?: boolean;
  
  /** 是否显示内容插槽 */
  slot?: boolean;
  
  /** 是否显示头像按钮 */
  avatar?: boolean;
  
  /** 视口尺寸 */
  viewport?: 'lg' | 'md' | 'sm' | 'sm-slot-dropdown';
  
  /** 头像初始字母 */
  avatarInitials?: string;
}

// ========== 扩展属性（React 标准） ==========
interface ApplicationHeaderExtendedProps {
  /** 自定义 Logo 内容（Slot） */
  logo?: React.ReactNode;
  
  /** 内容插槽内容（Slot） */
  slotContent?: React.ReactNode;
  
  /** 头像图片 URL */
  avatarImage?: string;
  
  /** 应用切换按钮点击回调 */
  onAppSwitchClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** 菜单按钮点击回调 */
  onMenuClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** 头像按钮点击回调 */
  onAvatarClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** 自定义 CSS 类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
  
  /** 可访问性标签 */
  'aria-label'?: string;
}

export interface ApplicationHeaderProps 
  extends ApplicationHeaderVisualProps, 
          ApplicationHeaderExtendedProps {}

export const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({
  // Figma 属性
  appName = 'Application name',
  appSwitch = false,
  slot = false,
  avatar = true,
  viewport = 'lg',
  
  // 扩展属性
  logo,
  slotContent,
  avatarInitials = 'JD',
  avatarImage,
  onAppSwitchClick,
  onMenuClick,
  onAvatarClick,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  // 优化事件处理
  const handleAppSwitchClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onAppSwitchClick?.(event);
  }, [onAppSwitchClick]);
  
  const handleMenuClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onMenuClick?.(event);
  }, [onMenuClick]);
  
  const handleAvatarClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onAvatarClick?.(event);
  }, [onAvatarClick]);
  
  // 优化类名计算
  const containerClass = useMemo(() => {
    return `application-header application-header--${viewport} ${className}`.trim();
  }, [viewport, className]);
  
  // 渲染 Logo
  const renderLogo = () => {
    if (logo) {
      return logo;
    }
    
    if (viewport === 'lg') {
      return (
        <div className="application-header__logo application-header__logo--custom">
          LOGO
        </div>
      );
    }
    
    return (
      <div className="application-header__logo application-header__logo--siemens">
        SIEMENS
      </div>
    );
  };
  
  // 渲染头像
  const renderAvatar = () => {
    if (!avatar) return null;
    
    return (
      <button
        className="application-header__avatar-button"
        onClick={handleAvatarClick}
        aria-label="User menu"
        type="button"
      >
        <div className="application-header__avatar">
          {avatarImage ? (
            <img 
              src={avatarImage} 
              alt={avatarInitials}
              className="application-header__avatar-image"
            />
          ) : (
            <span className="application-header__avatar-initials">
              {avatarInitials}
            </span>
          )}
        </div>
      </button>
    );
  };
  
  // 渲染应用切换按钮
  const renderAppSwitch = () => {
    if (!appSwitch) return null;
    
    return (
      <button
        className="application-header__app-switch"
        onClick={handleAppSwitchClick}
        aria-label="Switch application"
        type="button"
      >
        <ix-icon name="apps" size="24" />
      </button>
    );
  };
  
  // 渲染菜单按钮（小屏幕）
  const renderMenuButton = () => {
    if (viewport !== 'sm' && viewport !== 'sm-slot-dropdown') return null;
    
    return (
      <button
        className="application-header__menu-button"
        onClick={handleMenuClick}
        aria-label="Open menu"
        type="button"
      >
        <ix-icon name="menu" size="24" />
      </button>
    );
  };
  
  // 渲染内容插槽
  const renderSlot = () => {
    if (!slot) return null;
    
    return (
      <div className="application-header__slot">
        {slotContent || (
          <button className="application-header__slot-button" type="button">
            <ix-icon name="more-vertical" size="24" />
          </button>
        )}
      </div>
    );
  };
  
  return (
    <header 
      className={containerClass}
      style={style}
      aria-label={ariaLabel || 'Application header'}
    >
      <div className="application-header__content">
        {/* 左侧：菜单/应用切换 + Logo */}
        <div className="application-header__left">
          {renderMenuButton()}
          {renderAppSwitch()}
          
          {(viewport === 'lg' || viewport === 'md') && (
            <div className="application-header__logo-frame">
              {renderLogo()}
            </div>
          )}
        </div>
        
        {/* 中间：应用名称 */}
        <div className="application-header__center">
          <h1 className="application-header__app-name">
            {appName}
          </h1>
        </div>
        
        {/* 右侧：内容插槽 + 头像 */}
        <div className="application-header__right">
          {renderSlot()}
          {renderAvatar()}
        </div>
      </div>
      
      {/* 小屏幕下拉菜单 */}
      {viewport === 'sm-slot-dropdown' && slot && (
        <div className="application-header__dropdown">
          {slotContent}
        </div>
      )}
    </header>
  );
};

ApplicationHeader.displayName = 'ApplicationHeader';
