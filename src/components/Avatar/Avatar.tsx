import React, { useState, useMemo } from 'react';
import './Avatar.css';

// Figma 定义的属性（严格遵循 Figma 设计）
interface AvatarFigmaProps {
  /** 首字母文本 */
  text?: string;
  
  /** 是否显示图片 */
  image?: boolean;
  
  /** 是否显示首字母 */
  initials?: boolean;
}

// 扩展属性（React 特定，非 Figma 定义）
interface AvatarExtendedProps {
  /** 图片 URL - 扩展属性，用于指定用户头像图片 */
  src?: string;
  
  /** 图片 alt 文本 - 扩展属性，用于可访问性 */
  alt?: string;
  
  /** 自定义类名 */
  className?: string;
  
  /** 可访问性标签 */
  'aria-label'?: string;
}

// 最终组件属性
export interface AvatarProps extends AvatarFigmaProps, AvatarExtendedProps {}

export const Avatar: React.FC<AvatarProps> = ({
  // Figma 属性
  text = 'JD',
  image = false,
  initials = false,
  
  // 扩展属性
  src,
  alt = 'User avatar',
  className = '',
  'aria-label': ariaLabel,
}) => {
  // 图片加载错误状态
  const [imageError, setImageError] = useState(false);
  
  // ✅ 性能优化：使用 useMemo 缓存类名计算
  const avatarClasses = useMemo(() => {
    const classes = ['avatar'];
    
    if (image) {
      classes.push('avatar--image');
    } else if (initials) {
      classes.push('avatar--initials');
    } else {
      classes.push('avatar--placeholder');
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  }, [image, initials, className]);

  // 渲染函数（不需要 useCallback，因为不传递给子组件）
  const renderContent = () => {
    // 显示图片
    if (image && !initials) {
      // 如果图片加载失败，显示占位符
      if (imageError || !src) {
        return (
          <div className="avatar__image-placeholder" />
        );
      }
      
      return (
        <div className="avatar__image-wrapper">
          <img 
            src={src} 
            alt={alt} 
            className="avatar__image"
            onError={() => setImageError(true)}
          />
        </div>
      );
    }
    
    // 显示首字母
    if (!image && initials) {
      return (
        <span className="avatar__initials">
          {text}
        </span>
      );
    }
    
    // 显示占位符图标（默认）
    return (
      <span className="avatar__placeholder">
        <ix-icon name="user" size="24" />
      </span>
    );
  };

  return (
    <div
      className={avatarClasses}
      role="img"
      aria-label={ariaLabel || alt}
      data-image={image}
      data-initials={initials}
    >
      {renderContent()}
    </div>
  );
};

Avatar.displayName = 'Avatar';
