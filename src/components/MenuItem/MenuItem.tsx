import React, { useState, useCallback, useMemo } from 'react';
import './MenuItem.css';

// Figma 定义的变体类型
export type MenuItemVariant = 'Main Item';

// Figma 定义的状态类型
export type MenuItemState = 'Default' | 'Hover' | 'Active';

// Figma 定义的属性（严格遵循 Figma 设计）
interface MenuItemFigmaProps {
  /** 菜单项文本 */
  label?: string;
  
  /** 是否显示聚焦状态 */
  focused?: boolean;
  
  /** 是否显示通知徽章 */
  notification?: boolean;
  
  /** 菜单项变体 */
  variant?: MenuItemVariant;
  
  /** 是否展开（显示文本） */
  expanded?: boolean;
  
  /** 菜单项状态（可选，如果不提供则组件内部自动管理） */
  state?: MenuItemState;
  
  /** 是否选中（可选，如果不提供则组件内部自动管理） */
  selected?: boolean;
}

// 扩展属性（React 特定，非 Figma 定义）
interface MenuItemExtendedProps {
  /** 图标名称（ix-icon name）- 扩展属性，用于指定显示的图标 */
  icon?: string;
  
  /** 点击事件处理 */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 自定义类名 */
  className?: string;
  
  /** 可访问性标签 */
  'aria-label'?: string;
  
  /** 通知数量 - 扩展属性，用于显示具体数字 */
  notificationCount?: number;
}

// 最终组件属性
export interface MenuItemProps extends MenuItemFigmaProps, MenuItemExtendedProps {}

export const MenuItem: React.FC<MenuItemProps> = ({
  // Figma 属性
  label = 'Item',
  focused = false,
  notification = false,
  variant = 'Main Item',
  expanded = true,
  state: controlledState,
  selected: controlledSelected,
  icon = 'home',
  
  // 扩展属性
  onClick,
  className = '',
  'aria-label': ariaLabel,
  notificationCount = 12,
}) => {
  // 内部状态管理（如果外部没有提供 state）
  const [internalState, setInternalState] = useState<MenuItemState>('Default');
  const [internalSelected, setInternalSelected] = useState(false);
  
  // 使用受控状态或内部状态
  const state = controlledState !== undefined ? controlledState : internalState;
  const selected = controlledSelected !== undefined ? controlledSelected : internalSelected;

  // ✅ 性能优化：使用 useMemo 缓存类名计算
  const menuItemClasses = useMemo(() => {
    const classes = ['menu-item'];
    
    // 变体类名
    const variantClass = variant.toLowerCase().replace(/\s+/g, '-');
    classes.push(`menu-item--${variantClass}`);
    
    // 状态类名
    if (state !== 'Default') {
      classes.push(`menu-item--${state.toLowerCase()}`);
    }
    
    // 展开状态
    if (!expanded) {
      classes.push('menu-item--collapsed');
    }
    
    // 选中状态
    if (selected) {
      classes.push('menu-item--selected');
    }
    
    // 聚焦状态
    if (focused) {
      classes.push('menu-item--focused');
    }
    
    // 自定义类名
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  }, [variant, state, expanded, selected, focused, className]);

  // 渲染函数（不需要 useCallback，因为不传递给子组件）
  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <span className="menu-item__icon">
        <ix-icon name={icon} size="24" />
      </span>
    );
  };

  const renderNotification = () => {
    if (!notification) return null;
    
    return (
      <span className="menu-item__notification">
        <span className="menu-item__notification-badge">
          {notificationCount}
        </span>
      </span>
    );
  };

  const renderTooltip = () => {
    if (expanded) return null;
    
    return (
      <span className="menu-item__tooltip">
        <span className="menu-item__tooltip-spike" />
        <span className="menu-item__tooltip-bubble">
          {label}
        </span>
      </span>
    );
  };

  // ✅ 性能优化：使用 useCallback 缓存事件处理器
  const handleMouseEnter = useCallback(() => {
    // 只在非受控模式且未选中时更新 hover 状态
    if (controlledState === undefined && !selected) {
      setInternalState('Hover');
    }
  }, [controlledState, selected]);

  const handleMouseLeave = useCallback(() => {
    // 只在非受控模式且未选中时恢复默认状态
    if (controlledState === undefined && !selected) {
      setInternalState('Default');
    }
  }, [controlledState, selected]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    // 只在非受控模式下更新内部状态（切换选中状态）
    if (controlledSelected === undefined) {
      setInternalSelected(!internalSelected);
    }
    if (controlledState === undefined) {
      setInternalState('Default');
    }
    
    onClick?.(event);
  }, [controlledSelected, controlledState, internalSelected, onClick]);

  return (
    <div
      className={menuItemClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="menuitem"
      aria-label={ariaLabel || label}
      aria-selected={selected}
      aria-expanded={expanded}
      data-variant={variant}
      data-state={state}
      data-expanded={expanded}
      data-selected={selected}
    >
      <div className="menu-item__container">
        {renderIcon()}
        {renderNotification()}
        {expanded && <span className="menu-item__label">{label}</span>}
        {focused && <span className="menu-item__focus-outline" />}
      </div>
      {renderTooltip()}
    </div>
  );
};

MenuItem.displayName = 'MenuItem';
