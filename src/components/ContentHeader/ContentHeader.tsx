import React, { useCallback, useMemo } from 'react';
import './ContentHeader.css';

// ========== 视觉属性（来自 Figma） ==========
interface ContentHeaderVisualProps {
  /** 标题文本 */
  headerTitle?: string;
  
  /** 副标题文本 */
  headerSubtitle?: string;
  
  /** 是否显示副标题 */
  showHeaderSubtitle?: boolean;
  
  /** 是否显示返回按钮 */
  hasBackButton?: boolean;
  
  /** 是否显示操作按钮区域 */
  buttonSlot?: boolean;
  
  /** 变体类型 */
  variant?: 'Primary' | 'Secondary';
}

// ========== 扩展属性（React 标准） ==========
interface ContentHeaderExtendedProps {
  /** 返回按钮点击回调 */
  onBackClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** 操作按钮插槽（Slot） */
  children?: React.ReactNode;
  
  /** 自定义 CSS 类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
  
  /** 可访问性标签 */
  'aria-label'?: string;
}

export interface ContentHeaderProps extends ContentHeaderVisualProps, ContentHeaderExtendedProps {}

export const ContentHeader: React.FC<ContentHeaderProps> = ({
  // Figma 属性
  headerTitle = 'Content header',
  headerSubtitle = 'Subtitle',
  showHeaderSubtitle = true,
  hasBackButton = false,
  buttonSlot = false,
  variant = 'Primary',
  
  // 扩展属性
  onBackClick,
  children,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  // 优化事件处理
  const handleBackClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onBackClick?.(event);
  }, [onBackClick]);
  
  // 优化类名计算
  const containerClass = useMemo(() => {
    return `content-header content-header--${variant.toLowerCase()} ${className}`.trim();
  }, [variant, className]);
  
  return (
    <div 
      className={containerClass}
      style={style}
      aria-label={ariaLabel || `${variant} content header`}
    >
      <div className="content-header__layout">
        {/* 返回按钮 */}
        {hasBackButton && (
          <button
            className="content-header__back-button"
            onClick={handleBackClick}
            aria-label="Go back"
            type="button"
          >
            <ix-icon name="arrow-left" size="24" />
          </button>
        )}
        
        {/* 内容区域 */}
        <div className="content-header__content">
          <div className="content-header__title-frame">
            <h1 className="content-header__title">
              {headerTitle}
            </h1>
          </div>
          
          {showHeaderSubtitle && (
            <p className="content-header__subtitle">
              {headerSubtitle}
            </p>
          )}
        </div>
        
        {/* 操作按钮区域 */}
        {buttonSlot && children && (
          <div className="content-header__actions">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

ContentHeader.displayName = 'ContentHeader';
