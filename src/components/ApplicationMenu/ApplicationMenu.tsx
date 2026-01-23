import React, { useState } from 'react';
import './ApplicationMenu.css';

// Figma 定义的属性（严格遵循 Figma 设计）
interface ApplicationMenuFigmaProps {
  /** 是否显示新闻弹窗 */
  popoverNews?: boolean;
  
  /** 是否展开菜单 */
  expanded?: boolean;
  
  /** 溢出处理 */
  overflow?: 'False';
}

// 扩展属性（React 特定，非 Figma 定义）
interface ApplicationMenuExtendedProps {
  /** 展开/折叠按钮插槽 - 扩展属性 */
  toggleButton?: React.ReactNode;
  
  /** 用户头像区域插槽 - 扩展属性 */
  avatarSection?: React.ReactNode;
  
  /** 菜单项列表插槽 - 扩展属性 */
  menuList?: React.ReactNode;
  
  /** 展开/折叠切换事件 - 扩展属性 */
  onToggleExpand?: () => void;
  
  /** 自定义类名 */
  className?: string;
}

// 最终组件属性
export interface ApplicationMenuProps extends ApplicationMenuFigmaProps, ApplicationMenuExtendedProps {}

export const ApplicationMenu: React.FC<ApplicationMenuProps> = ({
  // Figma 属性
  popoverNews = false, // TODO: 实现新闻弹窗功能
  expanded: controlledExpanded,
  overflow = 'False', // TODO: 实现溢出处理
  
  // 扩展属性（Slots）
  toggleButton,
  avatarSection,
  menuList,
  onToggleExpand,
  className = '',
}) => {
  // 内部状态管理
  const [internalExpanded, setInternalExpanded] = useState(true);
  
  // 使用受控或内部状态
  const expanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const handleToggleExpand = () => {
    if (controlledExpanded === undefined) {
      setInternalExpanded(!expanded);
    }
    if (onToggleExpand) {
      onToggleExpand();
    }
  };

  const getMenuClasses = () => {
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
  };

  // 默认的展开/折叠按钮
  const defaultToggleButton = (
    <button
      className="application-menu__toggle-button"
      onClick={handleToggleExpand}
      aria-label={expanded ? 'Collapse menu' : 'Expand menu'}
    >
      <ix-icon 
        name={expanded ? 'double-chevron-left' : 'double-chevron-right'} 
        size="24" 
      />
    </button>
  );

  return (
    <div className={getMenuClasses()} data-expanded={expanded}>
      <div className="application-menu__container">
        {/* 展开/折叠按钮插槽 */}
        {toggleButton || defaultToggleButton}

        {/* 内容区域 */}
        <div className="application-menu__content">
          {/* 用户头像区域插槽 */}
          {avatarSection && (
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
  );
};

ApplicationMenu.displayName = 'ApplicationMenu';
