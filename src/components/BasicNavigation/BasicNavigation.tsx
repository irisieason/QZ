import React from 'react';
import './BasicNavigation.css';

// Figma 定义的属性
interface BasicNavigationFigmaProps {
  /** 是否显示头部 */
  header?: boolean;
  
  /** 是否打开覆盖层 */
  openOverlay?: boolean;
  
  /** 视口尺寸 */
  viewport?: 'lg - Desktop' | 'md - Tablet' | 'sm - Mobile' | 'sm - Mobile (expded)';
  
  /** 应用名称 */
  applicationName?: string;
  
  /** 用户缩写（头像显示） */
  userInitials?: string;
  
  /** 是否显示 Logo */
  showLogo?: boolean;
  
  /** 菜单是否展开 */
  menuExpanded?: boolean;
}

// 扩展属性（React 特定）
interface BasicNavigationExtendedProps {
  /** 子内容 */
  children?: React.ReactNode;
  
  /** 自定义类名 */
  className?: string;
  
  /** Logo 点击事件 */
  onLogoClick?: () => void;
  
  /** 用户头像点击事件 */
  onAvatarClick?: () => void;
  
  /** 菜单切换事件 */
  onMenuToggle?: () => void;
  
  /** 菜单项配置 */
  menuItems?: MenuItem[];
  
  /** 底部菜单项配置 */
  bottomMenuItems?: MenuItem[];
}

// 菜单项接口
export interface MenuItem {
  id: string;
  icon: string;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
  tooltip?: string;
}

// 最终组件属性
export interface BasicNavigationProps extends BasicNavigationFigmaProps, BasicNavigationExtendedProps {}

export const BasicNavigation: React.FC<BasicNavigationProps> = ({
  // Figma 属性
  header = true,
  openOverlay = false,
  viewport = 'lg - Desktop',
  applicationName = 'Application name',
  userInitials = 'JD',
  showLogo = true,
  menuExpanded = false,
  
  // 扩展属性
  children,
  className = '',
  onLogoClick,
  onAvatarClick,
  onMenuToggle,
  menuItems = [],
  bottomMenuItems = [],
}) => {
  const [isMenuExpanded, setIsMenuExpanded] = React.useState(menuExpanded);

  const handleMenuToggle = () => {
    const newState = !isMenuExpanded;
    setIsMenuExpanded(newState);
    onMenuToggle?.();
  };

  const getNavigationClasses = () => {
    const classes = ['basic-navigation'];
    
    if (!header) {
      classes.push('basic-navigation--no-header');
    }
    
    if (openOverlay) {
      classes.push('basic-navigation--overlay-open');
    }
    
    if (isMenuExpanded) {
      classes.push('basic-navigation--menu-expanded');
    }
    
    // 视口类名
    const viewportClass = viewport.toLowerCase().replace(/\s+/g, '-');
    classes.push(`basic-navigation--${viewportClass}`);
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  const renderLogo = () => {
    if (!showLogo) return null;
    
    return (
      <div 
        className="basic-navigation__logo" 
        onClick={onLogoClick}
        role={onLogoClick ? 'button' : undefined}
        tabIndex={onLogoClick ? 0 : undefined}
      >
        <span className="basic-navigation__logo-text">LOGO</span>
      </div>
    );
  };

  const renderAvatar = () => {
    return (
      <button
        className="basic-navigation__avatar-button"
        onClick={onAvatarClick}
        aria-label="User menu"
      >
        <div className="basic-navigation__avatar">
          <span className="basic-navigation__avatar-initials">{userInitials}</span>
        </div>
      </button>
    );
  };

  const renderHeader = () => {
    if (!header) return null;
    
    return (
      <header className="basic-navigation__header">
        <div className="basic-navigation__header-content">
          <div className="basic-navigation__header-logo">
            {renderLogo()}
          </div>
          <div className="basic-navigation__header-name">
            <span className="basic-navigation__app-name">{applicationName}</span>
          </div>
          <div className="basic-navigation__header-tools">
            {renderAvatar()}
          </div>
        </div>
      </header>
    );
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    const itemClasses = ['basic-navigation__menu-item'];
    if (item.active) {
      itemClasses.push('basic-navigation__menu-item--active');
    }
    
    return (
      <div
        key={item.id || index}
        className={itemClasses.join(' ')}
        onClick={item.onClick}
        role="button"
        tabIndex={0}
        title={item.tooltip || item.label}
      >
        <div className="basic-navigation__menu-item-content">
          <span className="basic-navigation__menu-item-icon">
            <ix-icon name={item.icon} size="24" />
          </span>
          {item.badge !== undefined && item.badge > 0 && (
            <span className="basic-navigation__menu-item-badge">
              {item.badge}
            </span>
          )}
          <span className="basic-navigation__menu-item-label">
            {item.label}
          </span>
        </div>
        {!isMenuExpanded && item.tooltip && (
          <div className="basic-navigation__tooltip">
            <div className="basic-navigation__tooltip-spike" />
            <div className="basic-navigation__tooltip-bubble">
              {item.tooltip}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMenu = () => {
    return (
      <aside className="basic-navigation__menu">
        <div className="basic-navigation__menu-container">
          <button
            className="basic-navigation__menu-toggle"
            onClick={handleMenuToggle}
            aria-label={isMenuExpanded ? 'Collapse menu' : 'Expand menu'}
          >
            <ix-icon 
              name={isMenuExpanded ? 'double-chevron-left' : 'double-chevron-right'} 
              size="24" 
            />
          </button>
          
          <div className="basic-navigation__menu-content">
            <div className="basic-navigation__menu-main">
              <div className="basic-navigation__menu-avatar">
                <button className="basic-navigation__menu-avatar-button">
                  <div className="basic-navigation__avatar basic-navigation__avatar--menu">
                    <ix-icon name="user" size="24" />
                  </div>
                </button>
              </div>
              
              <div className="basic-navigation__menu-items">
                {menuItems.map((item, index) => renderMenuItem(item, index))}
              </div>
            </div>
            
            <div className="basic-navigation__menu-bottom">
              {bottomMenuItems.map((item, index) => renderMenuItem(item, index))}
            </div>
          </div>
        </div>
      </aside>
    );
  };

  return (
    <div 
      className={getNavigationClasses()}
      data-header={header}
      data-open-overlay={openOverlay}
      data-viewport={viewport}
    >
      {renderHeader()}
      <div className="basic-navigation__body">
        {renderMenu()}
        <main className="basic-navigation__content">
          {children}
        </main>
      </div>
    </div>
  );
};

BasicNavigation.displayName = 'BasicNavigation';
