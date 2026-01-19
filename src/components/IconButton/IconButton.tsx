import React from 'react';
import './IconButton.css';

// Figma 定义的类型
export type IconButtonType =
  | 'Primary'
  | 'Primary outline'
  | 'Primary ghost'
  | 'Secondary'
  | 'Secondary outline'
  | 'Secondary ghost'
  | 'Danger'
  | 'Danger outline'
  | 'Danger ghost';

// Figma 定义的状态
export type IconButtonState = 'Default' | 'Hover' | 'Active' | 'Disabled' | 'Loading';

// Figma 定义的尺寸
export type IconButtonSize = '24' | '16' | '12';

// Figma 定义的属性（严格遵循 Figma 设计）
interface IconButtonFigmaProps {
  /** 按钮类型/变体 */
  type?: IconButtonType;
  
  /** 按钮状态 */
  state?: IconButtonState;
  
  /** 是否为圆形/椭圆形 */
  oval?: boolean;
  
  /** 按钮尺寸 */
  size?: IconButtonSize;
  
  /** 图标名称（ix-icon name） */
  icon?: string;
  
  /** 是否显示聚焦状态 */
  focused?: boolean;
}

// 扩展属性（React 特定，非 Figma 定义）
interface IconButtonExtendedProps {
  /** 点击事件处理 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** 按钮类型 */
  buttonType?: 'button' | 'submit' | 'reset';
  
  /** 自定义类名 */
  className?: string;
  
  /** 可访问性标签 */
  'aria-label'?: string;
  
  /** 是否禁用（便捷属性，会自动设置 state="Disabled"） */
  disabled?: boolean;
}

// 最终组件属性
export interface IconButtonProps extends IconButtonFigmaProps, IconButtonExtendedProps {}

export const IconButton: React.FC<IconButtonProps> = ({
  // Figma 属性
  type = 'Primary',
  state = 'Default',
  oval = false,
  size = '24',
  icon = 'about',
  focused = false,
  
  // 扩展属性
  onClick,
  buttonType = 'button',
  className = '',
  'aria-label': ariaLabel,
  disabled = false,
}) => {
  // 如果 disabled 为 true，自动设置 state 为 Disabled
  const effectiveState = disabled ? 'Disabled' : state;
  
  const getButtonClasses = () => {
    const classes = ['icon-button'];
    
    // 类型类名
    const typeClass = type.toLowerCase().replace(/\s+/g, '-');
    classes.push(`icon-button--${typeClass}`);
    
    // 状态类名
    if (effectiveState !== 'Default') {
      classes.push(`icon-button--${effectiveState.toLowerCase()}`);
    }
    
    // 形状类名
    if (oval) {
      classes.push('icon-button--oval');
    }
    
    // 尺寸类名
    classes.push(`icon-button--size-${size}`);
    
    // 聚焦状态
    if (focused) {
      classes.push('icon-button--focused');
    }
    
    // 自定义类名
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <span className="icon-button__icon">
        <ix-icon name={icon} size={size} />
      </span>
    );
  };

  const renderSpinner = () => {
    const spinnerSize = size === '24' ? 24 : size === '16' ? 16 : 12;
    const strokeWidth = size === '24' ? 2 : size === '16' ? 1.5 : 1;
    const radius = size === '24' ? 9 : size === '16' ? 6 : 4;
    const circumference = 2 * Math.PI * radius;
    
    return (
      <span className="icon-button__spinner" aria-label="Loading">
        <svg width={spinnerSize} height={spinnerSize} viewBox={`0 0 ${spinnerSize} ${spinnerSize}`} fill="none">
          <circle
            cx={spinnerSize / 2}
            cy={spinnerSize / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference / 4}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${spinnerSize / 2} ${spinnerSize / 2}`}
              to={`360 ${spinnerSize / 2} ${spinnerSize / 2}`}
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </span>
    );
  };

  const isDisabled = effectiveState === 'Disabled';
  const isLoading = effectiveState === 'Loading';

  return (
    <button
      type={buttonType}
      className={getButtonClasses()}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      aria-label={ariaLabel || `Icon button ${icon}`}
      data-type={type}
      data-state={effectiveState}
      data-oval={oval}
      data-size={size}
    >
      <span className="icon-button__content">
        {isLoading ? renderSpinner() : renderIcon()}
      </span>
      {focused && <span className="icon-button__focus-outline" />}
    </button>
  );
};

IconButton.displayName = 'IconButton';
