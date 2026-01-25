import React, { useCallback, useMemo } from 'react';
import './EventItemContent.css';

// Figma 定义的属性（严格遵循 Figma 设计）
interface EventItemContentFigmaProps {
  /** 主标题 */
  header?: string;
  
  /** 副标题 */
  subheader?: string;
  
  /** 子信息 */
  subInfo?: string;
  
  /** 时间戳 */
  timestamp?: string;
  
  /** 是否禁用 */
  disabled?: boolean;
}

// 扩展属性（React 特定，非 Figma 定义）
interface EventItemContentExtendedProps {
  /** 左侧图标名称 - 扩展属性 */
  icon?: string;
  
  /** 右侧图标按钮名称 - 扩展属性 */
  actionIcon?: string;
  
  /** 按钮文本 - 扩展属性 */
  buttonLabel?: string;
  
  /** 按钮点击事件 - 扩展属性 */
  onButtonClick?: () => void;
  
  /** 图标按钮点击事件 - 扩展属性 */
  onActionClick?: () => void;
  
  /** 自定义类名 */
  className?: string;
}

// 最终组件属性
export interface EventItemContentProps extends EventItemContentFigmaProps, EventItemContentExtendedProps {}

export const EventItemContent: React.FC<EventItemContentProps> = ({
  // Figma 属性
  header = 'Alarm: High temperature',
  subheader = 'A1214-11241-101',
  subInfo = 'MyPlant › Cooling water circuit',
  timestamp = '2022-11-05, 08:51:21',
  disabled = false,
  
  // 扩展属性
  icon = 'alarm-bell',
  actionIcon = 'about',
  buttonLabel = 'Button',
  onButtonClick,
  onActionClick,
  className = '',
}) => {
  // ✅ 性能优化：使用 useMemo 缓存类名计算
  const contentClasses = useMemo(() => {
    const classes = ['event-item-content'];
    
    if (disabled) {
      classes.push('event-item-content--disabled');
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  }, [disabled, className]);

  // ✅ 性能优化：使用 useCallback 缓存事件处理器
  const handleButtonClick = useCallback(() => {
    onButtonClick?.();
  }, [onButtonClick]);

  const handleActionClick = useCallback(() => {
    onActionClick?.();
  }, [onActionClick]);

  return (
    <div className={contentClasses}>
      {/* 图标列 */}
      <div className="event-item-content__icon-column">
        <ix-icon name={icon} size="24" aria-hidden="true" />
      </div>
      
      {/* 内容列 */}
      <div className="event-item-content__content-column">
        <div className="event-item-content__header" aria-label={`Event: ${header}`}>{header}</div>
        <div className="event-item-content__subheader">{subheader}</div>
        <div className="event-item-content__subinfo">{subInfo}</div>
      </div>
      
      {/* 附加列 */}
      <div className="event-item-content__additional-column">
        <button
          className="event-item-content__action-button"
          onClick={handleActionClick}
          disabled={disabled}
          aria-label="More actions"
        >
          <ix-icon name={actionIcon} size="24" />
        </button>
        
        <div className="event-item-content__timestamp" aria-label={`Time: ${timestamp}`}>
          {timestamp}
        </div>
      </div>
      
      {/* 按钮列 */}
      <div className="event-item-content__button-column">
        <button
          className="event-item-content__button"
          onClick={handleButtonClick}
          disabled={disabled}
        >
          <span className="event-item-content__button-label">{buttonLabel}</span>
        </button>
      </div>
    </div>
  );
};

EventItemContent.displayName = 'EventItemContent';
