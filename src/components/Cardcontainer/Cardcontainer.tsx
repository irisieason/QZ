import React from 'react';
import './Cardcontainer.css';

// Figma 定义的状态类型
export type CardcontainerState = 'Default' | 'Hover' | 'Active';

// Figma 定义的变体类型
export type CardcontainerVariant = 'Outline';

// Figma 定义的属性（严格遵循 Figma 设计）
interface CardcontainerFigmaProps {
  /** 是否显示聚焦状态 */
  focused?: boolean;
  
  /** 内容插槽 */
  content?: React.ReactNode;
  
  /** 卡片变体 */
  variant?: CardcontainerVariant;
  
  /** 卡片状态 */
  state?: CardcontainerState;
  
  /** 是否选中 */
  selected?: boolean;
}

// 扩展属性（React 特定，非 Figma 定义）
interface CardcontainerExtendedProps {
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
  content,
  variant = 'Outline',
  state = 'Default',
  selected = false,
  
  // 扩展属性
  onClick,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const getCardClasses = () => {
    const classes = ['cardcontainer'];
    
    // 变体类名
    classes.push(`cardcontainer--${variant.toLowerCase()}`);
    
    // 状态类名
    if (state !== 'Default') {
      classes.push(`cardcontainer--${state.toLowerCase()}`);
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
  };

  return (
    <div
      className={getCardClasses()}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-selected={selected}
      data-state={state}
      data-selected={selected}
    >
      {/* 聚焦轮廓 */}
      {focused && <div className="cardcontainer__focus-outline" />}
      
      {/* 选中内边框 */}
      {selected && <div className="cardcontainer__inner-border" />}
      
      {/* 内容区域 */}
      <div className="cardcontainer__content">
        {content}
      </div>
    </div>
  );
};

Cardcontainer.displayName = 'Cardcontainer';
