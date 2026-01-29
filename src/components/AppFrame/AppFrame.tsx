import React from 'react';
import './AppFrame.css';

// ========== React 扩展属性 ==========
interface AppFrameExtendedProps {
  /** ApplicationHeader 组件插槽 */
  header?: React.ReactNode;
  
  /** ApplicationMenu 组件插槽 */
  menu?: React.ReactNode;
  
  /** 主内容区域插槽 */
  children?: React.ReactNode;
  
  /** 自定义 CSS 类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
  
  /** 可访问性标签 */
  'aria-label'?: string;
}

// ========== 最终组件属性 ==========
export interface AppFrameProps extends AppFrameExtendedProps {}

export const AppFrame: React.FC<AppFrameProps> = ({
  // React 扩展属性
  header,
  menu,
  children,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  return (
    <div
      className={`app-frame ${className}`.trim()}
      style={style}
      aria-label={ariaLabel || 'Application frame'}
    >
      {/* Application Header 插槽 */}
      {header && (
        <div className="app-frame__header">
          {header}
        </div>
      )}
      
      {/* Main Content Area */}
      <div className="app-frame__body">
        {/* Application Menu 插槽 */}
        {menu && (
          <div className="app-frame__menu">
            {menu}
          </div>
        )}
        
        {/* Content Area */}
        <div className="app-frame__content">
          {children}
        </div>
      </div>
    </div>
  );
};

AppFrame.displayName = 'AppFrame';
