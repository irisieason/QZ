import React, { useState, useCallback, useMemo } from 'react';
import { ApplicationMenuProvider } from './ApplicationMenuContext';
import './ApplicationMenu.css';

// ========== 视觉属性（来自 Figma） ==========
interface ApplicationMenuVisualProps {
  /** 是否展开菜单 */
  expanded?: boolean;
  
  /** 是否显示头像区域 */
  avatar?: boolean;
}

// ========== 扩展属性（React 标准） ==========
interface ApplicationMenuExtendedProps {
  /** 展开/折叠按钮插槽（Slot） */
  toggleButton?: React.ReactNode;
  
  /** 用户头像区域插槽（Slot） */
  avatarSection?: React.ReactNode;
  
  /** 菜单项列表插槽（Slot） */
  menuList?: React.ReactNode;
  
  /** 展开/折叠切换事件回调 */
  onToggleExpand?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** 自定义 CSS 类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
  
  /** 可访问性标签 */
  'aria-label'?: string;
}

export interface ApplicationMenuProps extends ApplicationMenuVisualProps, ApplicationMenuExtendedProps {}

export const ApplicationMenu: React.FC<ApplicationMenuProps> = ({
  // 视觉属性
  expanded: controlledExpanded,
  avatar = true,
  
  // 扩展属性
  toggleButton,
  avatarSection,
  menuList,
  onToggleExpand,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  // 内部状态管理（默认收起）
  const [internalExpanded, setInternalExpanded] = useState(false);
  
  // 使用受控或内部状态
  const expanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  // ✅ 性能优化：使用 useCallback 缓存事件处理器
  const handleToggleExpand = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (controlledExpanded === undefined) {
      setInternalExpanded(!expanded);
    }
    onToggleExpand?.(event);
  }, [controlledExpanded, expanded, onToggleExpand]);

  // ✅ 性能优化：使用 useMemo 缓存类名计算
  const menuClasses = useMemo(() => {
    const classes = ['application-menu'];
    
    if (expanded) {
      classes.push('application-menu--expanded');
    } else {
      classes.push('application-menu--collapsed');
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  }, [expanded, className]);

  // 默认的展开/折叠按钮
  const defaultToggleButton = (
    <button
      className="application-menu__toggle-button"
      onClick={handleToggleExpand}
      aria-label={expanded ? 'Collapse menu' : 'Expand menu'}
      aria-expanded={expanded}
    >
      <ix-icon 
        name={expanded ? 'double-chevron-left' : 'double-chevron-right'} 
        size="24" 
      />
    </button>
  );

  return (
    <ApplicationMenuProvider expanded={expanded}>
      <div 
        className={menuClasses} 
        style={style}
        data-expanded={expanded}
        role="navigation"
        aria-label={ariaLabel || 'Application menu'}
      >
        <div className="application-menu__container">
          {/* 展开/折叠按钮插槽 */}
          {toggleButton || defaultToggleButton}

          {/* 内容区域 */}
          <div className="application-menu__content">
            {/* 用户头像区域插槽 */}
            {avatar && avatarSection && (
              <div className="application-menu__avatar-section">
                {avatarSection}
              </div>
            )}

            {/* 菜单项列表插槽 */}
            {menuList && (
              <div className="application-menu__menu-list">
                {menuList}
              </div>
            )}
          </div>
        </div>
      </div>
    </ApplicationMenuProvider>
  );
};

ApplicationMenu.displayName = 'ApplicationMenu';
