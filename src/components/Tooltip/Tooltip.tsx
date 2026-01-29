import React, { useState } from 'react';
import { IconButton } from '../IconButton';
import './Tooltip.css';

// Figma 定义的属性
interface TooltipFigmaProps {
  /** 标题文本 */
  header?: string;
  
  /** 提示文本内容 */
  textlabel?: string;
  
  /** 是否显示关闭按钮 */
  closable?: boolean;
  
  /** 是否显示图标 */
  showIcon?: boolean;
  
  /** 图标名称（ix-icon name） */
  icon?: string;
}

// 扩展属性（React 特定）
interface TooltipExtendedProps {
  /** 关闭按钮点击事件 */
  onClose?: () => void;
  
  /** 自定义类名 */
  className?: string;
  
  /** 是否显示（受控模式） */
  open?: boolean;
  
  /** 默认是否显示（非受控模式） */
  defaultOpen?: boolean;
}

// 最终组件属性
export interface TooltipProps extends TooltipFigmaProps, TooltipExtendedProps {}

export const Tooltip: React.FC<TooltipProps> = ({
  // Figma 属性
  header = 'My tooltip',
  textlabel = 'This is my tooltips text',
  closable = false,
  showIcon = true,
  icon = 'about',
  
  // 扩展属性
  onClose,
  className = '',
  open: controlledOpen,
  defaultOpen = true,
}) => {
  // 支持受控/非受控模式
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  
  const handleClose = () => {
    if (!isControlled) {
      setInternalOpen(false);
    }
    onClose?.();
  };
  
  if (!isOpen) return null;
  
  const tooltipClasses = ['tooltip', className].filter(Boolean).join(' ');
  
  return (
    <div className={tooltipClasses}>
      {/* 尖角箭头 */}
      <div className="tooltip__spike-frame">
        <div className="tooltip__spike" />
      </div>
      
      {/* 提示框主体 */}
      <div className="tooltip__bubble">
        <div className="tooltip__content-frame">
          <div className="tooltip__content">
            {/* 最小高度占位 */}
            <div className="tooltip__min-height" />
            
            {/* 图标 */}
            {showIcon && (
              <div className="tooltip__icon-frame">
                <ix-icon name={icon} size="16" />
              </div>
            )}
            
            {/* 文本内容 */}
            <div className="tooltip__text-content">
              {header && <p className="tooltip__header">{header}</p>}
              {textlabel && <p className="tooltip__text">{textlabel}</p>}
            </div>
          </div>
        </div>
        
        {/* 关闭按钮 */}
        {closable && (
          <IconButton
            icon="close-small"
            type="Secondary ghost"
            size="16"
            onClick={handleClose}
            aria-label="Close tooltip"
          />
        )}
      </div>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';
