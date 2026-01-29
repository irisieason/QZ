import React, { useCallback, useMemo } from 'react';
import './Button.css';

// Figma 定义的变体类型
export type ButtonVariant =
  | 'Primary'
  | 'Primary outline'
  | 'Primary ghost'
  | 'Secondary'
  | 'Secondary outline'
  | 'Secondary ghost'
  | 'Danger'
  | 'Danger outline'
  | 'Danger ghost'
  | '🔶 Content action';

// Figma 定义的状态类型
export type ButtonState = 'Default' | 'Hover' | 'Active' | 'Disabled' | 'Loading';

// Figma 定义的属性（参考 Figma 设计）
interface ButtonFigmaProps {
  /** 是否显示图标 */
  showIcon?: boolean;
  
  /** 图标名称（ix-icon name） */
  icon?: string;
  
  /** 是否显示聚焦状态 */
  focused?: boolean;
  
  /** 按钮变体 */
  variant?: ButtonVariant;
  
  /** 按钮状态 */
  state?: ButtonState;
}

// React 最佳实践属性
interface ButtonReactProps {
  /** 按钮内容（React 标准） */
  children?: React.ReactNode;
  
  /** 点击事件处理 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** 按钮类型 */
  type?: 'button' | 'submit' | 'reset';
  
  /** 自定义类名 */
  className?: string;
  
  /** 可访问性标签 */
  'aria-label'?: string;
  
  /** 是否禁用（便捷属性，会自动设置 state="Disabled"） */
  disabled?: boolean;
}

// 最终组件属性
export interface ButtonProps extends ButtonFigmaProps, ButtonReactProps {}

export const Button: React.FC<ButtonProps> = ({
  // React 标准属性
  children,
  
  // Figma 属性
  showIcon = false,
  icon = 'about',
  focused = false,
  variant = 'Primary',
  state = 'Default',
  
  // 扩展属性
  onClick,
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
  disabled = false,
}) => {
  // 如果 disabled 为 true，自动设置 state 为 Disabled
  const effectiveState = disabled ? 'Disabled' : state;
  const isDisabled = effectiveState === 'Disabled';
  const isLoading = effectiveState === 'Loading';
  
  // ✅ React 最佳实践：使用 children 作为按钮内容
  const content = children || 'Button';
  
  // ✅ 图标渲染
  const renderIcon = () => {
    if (!showIcon || !icon) return null;
    return (
      <span className="button__icon">
        <ix-icon name={icon} size="24" />
      </span>
    );
  };
  
  // ✅ 性能优化：使用 useMemo 缓存类名计算
  const buttonClasses = useMemo(() => {
    const classes = ['button'];
    
    // 变体类名
    const variantClass = variant.toLowerCase().replace(/\s+/g, '-').replace('🔶-', '');
    classes.push(`button--${variantClass}`);
    
    // 状态类名
    if (effectiveState !== 'Default') {
      classes.push(`button--${effectiveState.toLowerCase()}`);
    }
    
    // 聚焦状态
    if (focused) {
      classes.push('button--focused');
    }
    
    // 自定义类名
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  }, [variant, effectiveState, focused, className]);

  // ✅ 性能优化：使用 useCallback 缓存事件处理器
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
  }, [onClick]);

  // 渲染加载动画
  const renderSpinner = () => (
    <span className="button__spinner" aria-label="Loading">
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
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={isDisabled || isLoading}
      aria-label={ariaLabel || (typeof content === 'string' ? content : undefined)}
      aria-busy={isLoading}
      aria-disabled={isDisabled}
      data-variant={variant}
      data-state={effectiveState}
    >
      <span className="button__content">
        {isLoading && renderSpinner()}
        {renderIcon()}
        <span className="button__label">{content}</span>
      </span>
      {focused && <span className="button__focus-outline" />}
    </button>
  );
};

Button.displayName = 'Button';
