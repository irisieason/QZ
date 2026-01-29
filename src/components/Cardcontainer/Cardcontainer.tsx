import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import './Cardcontainer.css';

// 内部状态类型（组件内部使用，不暴露给外部）
type InternalState = 'Default' | 'Hover' | 'Active';

// Figma 定义的属性（严格遵循 Figma 设计）
interface CardcontainerFigmaProps {
  /** 是否显示聚焦状态 */
  focused?: boolean;
  
  /** 是否选中 */
  selected?: boolean;
}

// 扩展属性（React 特定，非 Figma 定义）
interface CardcontainerExtendedProps {
  /** 内容插槽 */
  children?: React.ReactNode;
  
  /** 点击事件处理 */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 自定义类名 */
  className?: string;
  
  /** 可访问性标签 */
  'aria-label'?: string;
}

// 最终组件属性
export interface CardcontainerProps extends CardcontainerFigmaProps, CardcontainerExtendedProps {}

export const Cardcontainer: React.FC<CardcontainerProps> = ({
  // Figma 属性
  focused = false,
  selected: controlledSelected,
  
  // 扩展属性
  children,
  onClick,
  className = '',
  'aria-label': ariaLabel,
}) => {
  // 内部状态管理（Hover、Active 等交互状态）
  const [internalState, setInternalState] = useState<InternalState>('Default');
  // 内部选中状态管理（如果外部没有提供 selected）
  const [internalSelected, setInternalSelected] = useState<boolean>(false);
  
  // 引用当前元素
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 使用受控状态或内部状态
  const selected = controlledSelected !== undefined ? controlledSelected : internalSelected;
  const isSelectedControlled = controlledSelected !== undefined;

  // ✅ 使用 useClickOutside hook 处理点击外部取消选中
  useClickOutside(cardRef, useCallback(() => {
    if (!isSelectedControlled && internalSelected) {
      setInternalSelected(false);
    }
  }, [isSelectedControlled, internalSelected]));

  // ✅ 性能优化：使用 useMemo 缓存类名计算
  const cardClasses = useMemo(() => {
    const classes = ['cardcontainer'];
    
    // 内部交互状态类名
    if (internalState !== 'Default') {
      classes.push(`cardcontainer--${internalState.toLowerCase()}`);
    }
    
    // 选中状态
    if (selected) {
      classes.push('cardcontainer--selected');
    }
    
    // 聚焦状态
    if (focused) {
      classes.push('cardcontainer--focused');
    }
    
    // 自定义类名
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  }, [internalState, selected, focused, className]);

  // ✅ 性能优化：使用 useCallback 缓存事件处理器
  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    // 如果 selected 不是受控的，切换内部选中状态
    if (!isSelectedControlled) {
      setInternalSelected(!internalSelected);
    }
    
    onClick?.(event);
  }, [isSelectedControlled, internalSelected, onClick]);

  const handleMouseEnter = useCallback(() => {
    if (!selected) {
      setInternalState('Hover');
    }
  }, [selected]);

  const handleMouseLeave = useCallback(() => {
    if (!selected) {
      setInternalState('Default');
    }
  }, [selected]);

  const handleMouseDown = useCallback(() => {
    if (!selected) {
      setInternalState('Active');
    }
  }, [selected]);

  const handleMouseUp = useCallback(() => {
    if (!selected) {
      setInternalState('Hover');
    }
  }, [selected]);

  // 键盘支持
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      
      // 如果 selected 不是受控的，切换内部选中状态
      if (!isSelectedControlled) {
        setInternalSelected(!internalSelected);
      }
      
      // 键盘事件不调用 onClick，因为类型不兼容
      // onClick 期望 MouseEvent，这里是 KeyboardEvent
    }
  }, [isSelectedControlled, internalSelected]);

  return (
    <div
      ref={cardRef}
      className={cardClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-selected={selected}
      aria-pressed={selected}
      data-selected={selected}
    >
      {/* 聚焦轮廓 */}
      {focused && <div className="cardcontainer__focus-outline" />}
      
      {/* 选中内边框 */}
      {selected && <div className="cardcontainer__inner-border" />}
      
      {/* 内容区域 */}
      <div className="cardcontainer__content">
        {children}
      </div>
    </div>
  );
};

Cardcontainer.displayName = 'Cardcontainer';
