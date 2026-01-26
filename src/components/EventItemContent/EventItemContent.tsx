import React from 'react';
import './EventItemContent.css';
import { IconButton } from '../IconButton';

// Figma 定义的属性
interface EventItemContentFigmaProps {
  /** 左侧图标名称 */
  icon?: string;
  
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
  
  /** 右上角图标按钮的图标名称 */
  iconButton?: string;
  
  /** 右侧按钮文本 */
  buttonLabel?: string;
  
  /** 是否显示右侧按钮 */
  showButton?: boolean;
}

// 扩展属性（React 特定）
interface EventItemContentExtendedProps {
  /** 点击事件 */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 按钮点击事件 */
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** 图标按钮点击事件 */
  onIconButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** 自定义类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
  
  /** 可访问性标签 */
  'aria-label'?: string;
}

export interface EventItemContentProps 
  extends EventItemContentFigmaProps, 
          EventItemContentExtendedProps {}

export const EventItemContent: React.FC<EventItemContentProps> = ({
  // Figma 属性
  icon = 'alarm-bell',
  header = 'Alarm: High temperature',
  subheader = 'A1214-11241-101',
  subInfo = 'MyPlant › Cooling water circuit',
  timestamp = '2022-11-05\n08:51:21',
  disabled = false,
  iconButton = 'about',
  buttonLabel = 'Button',
  showButton = true,
  
  // 扩展属性
  onClick,
  onButtonClick,
  onIconButtonClick,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const containerClasses = [
    'event-item-content',
    disabled ? 'event-item-content--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      style={style}
      onClick={onClick}
      role="article"
      aria-label={ariaLabel}
      data-disabled={disabled}
    >
      {/* Icon Column */}
      <div className="event-item-content__icon-column">
        <ix-icon name={icon} size="24" />
      </div>

      {/* Content Column */}
      <div className="event-item-content__content-column">
        <p className="event-item-content__header">{header}</p>
        <p className="event-item-content__subheader">{subheader}</p>
        <div className="event-item-content__sub-info">
          <p>{subInfo}</p>
        </div>
      </div>

      {/* Additional Column */}
      <div className="event-item-content__additional-column">
        <IconButton
          icon={iconButton}
          type="Secondary ghost"
          size="24"
          onClick={onIconButtonClick}
          aria-label="More information"
        />
        
        <div className="event-item-content__timestamp">
          <p>{timestamp}</p>
        </div>
      </div>

      {/* Button Column */}
      {showButton && (
        <div className="event-item-content__button-column">
          <button
            className="event-item-content__button"
            onClick={onButtonClick}
            disabled={disabled}
            type="button"
          >
            <span className="event-item-content__button-label">{buttonLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
};

EventItemContent.displayName = 'EventItemContent';
