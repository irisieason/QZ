import React from 'react';
import './ApplicationHeader.css';

// Figma 定义的属性（严格遵循 Figma 设计）
interface ApplicationHeaderFigmaProps {
  /** 应用名称 */
  appName?: string;
  
  /** 是否显示头像 */
  avatar?: boolean;
  
  /** 是否显示应用切换按钮 */
  appSwitch?: boolean;
}

// 扩展属性（React 特定，非 Figma 定义）
interface ApplicationHeaderExtendedProps {
  /** Avatar 组件插槽 */
  children?: React.ReactNode;
  
  /** 应用切换按钮点击回调 */
  onAppSwitchClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** 自定义 CSS 类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
  
  /** 可访问性标签 */
  'aria-label'?: string;
}

// 最终组件属性
export interface ApplicationHeaderProps 
  extends ApplicationHeaderFigmaProps, 
          ApplicationHeaderExtendedProps {}

export const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({
  // Figma 属性
  appName = 'Application name',
  avatar = true,
  appSwitch = false,
  
  // 扩展属性
  children,
  onAppSwitchClick,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  return (
    <header 
      className={`application-header ${className}`.trim()}
      style={style}
      aria-label={ariaLabel || 'Application header'}
    >
      <div className="application-header__content">
        {/* 应用切换按钮 */}
        {appSwitch && (
          <div className="application-header__nav-control">
            <button
              className="application-header__icon-button"
              onClick={onAppSwitchClick}
              aria-label="Switch application"
              type="button"
            >
              <ix-icon name="apps" size="24" />
            </button>
          </div>
        )}
        
        {/* Logo */}
        <div className="application-header__logo-frame">
          <div className="application-header__logo">
            LOGO
          </div>
        </div>
        
        {/* 应用名称 */}
        <div className="application-header__name-frame">
          <p className="application-header__app-name">
            {appName}
          </p>
        </div>
        
        {/* 工具区域（Avatar） */}
        <div className="application-header__tools-frame">
          {avatar && children}
        </div>
      </div>
    </header>
  );
};

ApplicationHeader.displayName = 'ApplicationHeader';
