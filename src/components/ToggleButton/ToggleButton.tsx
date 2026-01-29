import React, { forwardRef, useState, useCallback, useMemo } from 'react';
import './ToggleButton.css';

// Figma 定义的类型
export type ToggleButtonType =
  | 'Primary outline'
  | 'Secondary outline'
  | 'Primary ghost'
  | 'Secondary'
  | 'Secondary ghost';

// Figma 定义的属性
interface ToggleButtonFigmaProps {
  /** 按钮文本 */
  label?: string;
  
  /** 是否显示图标 */
  showIcon?: boolean;
  
  /** 图标名称（ix-icon name） */
  icon?: string;
  
  /** 按钮类型 */
  type?: ToggleButtonType;
  
  /** 是否显示加载状态 */
  loading?: boolean;
}

// React 标准属性
interface ToggleButtonReactProps {
  /** 是否切换状态（受控模式） */
  toggled?: boolean;
  
  /** 默认切换状态（非受控模式） */
  defaultToggled?: boolean;
  
  /** 切换状态变化回调 */
  onToggle?: (toggled: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** 点击事件回调 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** 是否禁用 */
  disabled?: boolean;
  
  /** 自定义 CSS 类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
  
  /** 可访问性标签 */
  'aria-label'?: string;
  
  /** 按钮类型 */
  buttonType?: 'button' | 'submit' | 'reset';
}

export interface ToggleButtonProps extends ToggleButtonFigmaProps, ToggleButtonReactProps {}

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(({
  // Figma 属性
  label = 'Toggle',
  showIcon = false,
  icon = 'checkmark',
  type = 'Secondary outline',
  loading = false,
  
  // React 属性
  toggled: controlledToggled,
  defaultToggled = false,
  onToggle,
  onClick,
  disabled,
  className = '',
  style,
  'aria-label': ariaLabel,
  buttonType = 'button',
}, ref) => {
  // 受控/非受控模式
  const [internalToggled, setInternalToggled] = useState(defaultToggled);
  const isControlled = controlledToggled !== undefined;
  const isToggled = isControlled ? controlledToggled : internalToggled;
  
  // 状态判断
  const isDisabled = disabled || false;
  
  // 类名计算
  const buttonClasses = useMemo(() => {
    const classes = ['toggle-button'];
    
    // 类型类名
    const typeClass = type.toLowerCase().replace(/\s+/g, '-');
    classes.push(`toggle-button--${typeClass}`);
    
    // 切换状态
    if (isToggled) {
      classes.push('toggle-button--toggled');
    }
    
    // 加载状态
    if (loading) {
      classes.push('toggle-button--loading');
    }
    
    // 自定义类名
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  }, [type, isToggled, loading, className]);
  
  // 点击处理
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled || loading) return;
    
    const newToggled = !isToggled;
    
    if (!isControlled) {
      setInternalToggled(newToggled);
    }
    
    onToggle?.(newToggled, event);
    onClick?.(event);
  }, [isDisabled, loading, isToggled, isControlled, onToggle, onClick]);
  
  // 渲染加载动画
  const renderSpinner = () => (
    <span className="toggle-button__spinner" aria-label="Loading">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="56.5"
          strokeDashoffset="14"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </span>
  );
  
  return (
    <button
      ref={ref}
      type={buttonType}
      className={buttonClasses}
      disabled={isDisabled}
      onClick={handleClick}
      aria-label={ariaLabel || label}
      aria-pressed={isToggled}
      aria-busy={loading}
      style={style}
      data-type={type}
      data-toggled={isToggled}
    >
      <span className="toggle-button__content">
        {loading && renderSpinner()}
        {showIcon && !loading && (
          <span className="toggle-button__icon">
            <ix-icon name={icon} size="24" />
          </span>
        )}
        <span className="toggle-button__label">{label}</span>
      </span>
    </button>
  );
});

ToggleButton.displayName = 'ToggleButton';
