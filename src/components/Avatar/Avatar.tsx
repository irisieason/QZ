import React from 'react';
import './Avatar.css';

// Figma 定义的视觉属性
interface AvatarVisualProps {
  /** 首字母文本（Figma 属性） */
  text?: string;
}

// React 扩展属性
interface AvatarExtendedProps {
  /** 自定义类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
  
  /** 可访问性标签 */
  'aria-label'?: string;
}

// 最终组件属性
export interface AvatarProps extends AvatarVisualProps, AvatarExtendedProps {}

export const Avatar: React.FC<AvatarProps> = ({
  // Figma 属性
  text = 'JD',
  
  // React 扩展属性
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  return (
    <div
      className={`avatar ${className}`}
      style={style}
      role="img"
      aria-label={ariaLabel || `Avatar with initials ${text}`}
    >
      <span className="avatar__text">
        {text}
      </span>
    </div>
  );
};

Avatar.displayName = 'Avatar';
