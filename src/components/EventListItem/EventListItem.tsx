import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import './EventListItem.css';

// Figma 定义的状态类型
export type EventListItemState = 'Default' | 'Hover' | 'Active' | 'Disabled';

// Figma 定义的严重性颜色类型
export type SeverityColor = 
  | 'alarm' 
  | 'warning' 
  | 'critical' 
  | 'info' 
  | 'success' 
  | 'neutral';

// Figma 定义的属性（严格遵循 Figma 设计）
interface EventListItemFigmaProps {
  /** 是否显示右侧箭头 */
  chevron?: boolean;
  
  /** 是否显示聚焦状态 */
  focused?: boolean;
  
  /** 组件状态（可选，如果不提供则组件内部自动管理） */
  state?: EventListItemState;
  
  /** 是否选中 */
  selected?: boolean;
}

// 扩展属性（React 特定，非 Figma 定义）
interface EventListItemExtendedProps {
  /** 严重性指示器颜色 - 扩展属性 */
  severity?: SeverityColor;
  
  /** 内容插槽 - 扩展属性 */
  children?: React.ReactNode;
  
  /** 点击事件处理 */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 自定义类名 */
  className?: string;
  
  /** 可访问性标签 */
  'aria-label'?: string;
}

// 最终组件属性
export interface EventListItemProps extends EventListItemFigmaProps, EventListItemExtendedProps {}

export const EventListItem: React.FC<EventListItemProps> = ({
  // Figma 属性
  chevron = true,
  focused = false,
  state: controlledState,
  selected: controlledSelected,
  
  // 扩展属性
  severity = 'alarm',
  children,
  onClick,
  className = '',
  'aria-label': ariaLabel,
}) => {
  // 内部状态管理（如果外部没有提供 state）
  const [internalState, setInternalState] = useState<EventListItemState>('Default');
  // 内部选中状态管理（如果外部没有提供 selected）
  const [internalSelected, setInternalSelected] = useState<boolean>(false);
  
  // 引用当前元素
  const itemRef = useRef<HTMLDivElement>(null);
  
  // 使用受控状态或内部状态
  const state = controlledState !== undefined ? controlledState : internalState;
  const selected = controlledSelected !== undefined ? controlledSelected : internalSelected;
  const isControlled = controlledState !== undefined;
  const isSelectedControlled = controlledSelected !== undefined;

  // ✅ 使用 useClickOutside hook 处理点击外部取消选中
  useClickOutside(itemRef, useCallback(() => {
    if (!isSelectedControlled && internalSelected) {
      setInternalSelected(false);
    }
  }, [isSelectedControlled, internalSelected]));

  // ✅ 性能优化：使用 useMemo 缓存类名计算
  const itemClasses = useMemo(() => {
    const classes = ['event-list-item'];
    
    // 状态类名
    if (state !== 'Default') {
      classes.push(`event-list-item--${state.toLowerCase()}`);
    }
    
    // 选中状态
    if (selected) {
      classes.push('event-list-item--selected');
    }
    
    // 聚焦状态
    if (focused) {
      classes.push('event-list-item--focused');
    }
    
    // 自定义类名
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  }, [state, selected, focused, className]);

  // ✅ 性能优化：使用 useCallback 缓存事件处理器
  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (state === 'Disabled') return;
    
    // 如果 selected 不是受控的，切换内部选中状态
    if (!isSelectedControlled) {
      setInternalSelected(!internalSelected);
    }
    
    onClick?.(event);
  }, [state, isSelectedControlled, internalSelected, onClick]);

  const handleMouseEnter = useCallback(() => {
    if (!isControlled && state !== 'Disabled' && !selected) {
      setInternalState('Hover');
    }
  }, [isControlled, state, selected]);

  const handleMouseLeave = useCallback(() => {
    if (!isControlled && state !== 'Disabled' && !selected) {
      setInternalState('Default');
    }
  }, [isControlled, state, selected]);

  const handleMouseDown = useCallback(() => {
    if (!isControlled && state !== 'Disabled' && !selected) {
      setInternalState('Active');
    }
  }, [isControlled, state, selected]);

  const handleMouseUp = useCallback(() => {
    if (!isControlled && state !== 'Disabled' && !selected) {
      setInternalState('Hover');
    }
  }, [isControlled, state, selected]);

  return (
    <div
      ref={itemRef}
      className={itemClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      role="listitem"
      aria-label={ariaLabel}
      aria-selected={selected}
      aria-disabled={state === 'Disabled'}
      aria-expanded={selected}
      data-state={state}
      data-selected={selected}
    >
      {/* 严重性指示器容器 - 遵循 Figma 结构 */}
      <div className="event-list-item__severity-container">
        <div className={`event-list-item__severity event-list-item__severity--${severity}`} />
      </div>
      
      {/* 内容区域 */}
      <div className="event-list-item__content">
        {children}
      </div>
      
      {/* 右侧箭头 */}
      {chevron && (
        <div className="event-list-item__chevron">
          <ix-icon name="chevron-right-small" size="24" />
        </div>
      )}
      
      {/* 聚焦轮廓 */}
      {focused && <div className="event-list-item__focus-outline" />}
      
      {/* 选中边框 */}
      {selected && <div className="event-list-item__selection-border" />}
    </div>
  );
};

EventListItem.displayName = 'EventListItem';
