import React from 'react';
import './Slot.css';

// ========== 视觉属性（来自 Figma） ==========
interface SlotVisualProps {
  // 这个组件主要作为容器，没有特定的视觉属性
  // 尺寸由父组件决定
}

// ========== 扩展属性（React 标准） ==========
interface SlotExtendedProps {
  /** 子组件插槽 - 可以是任意组件 */
  children?: React.ReactNode;
  
  /** 自定义 CSS 类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
  
  /** 可访问性标签 */
  'aria-label'?: string;
}

export interface SlotProps 
  extends SlotVisualProps, 
          SlotExtendedProps {}

/**
 * Slot 组件
 * 
 * 通用的插槽容器组件，可以作为任何组件的 children 使用。
 * 尺寸由父组件决定，自动适应父容器。
 * 
 * @example
 * ```tsx
 * // 在 ContentHeader 中使用
 * <ContentHeader buttonSlot={true}>
 *   <Slot>
 *     <Button label="Edit" />
 *     <Button label="Save" />
 *   </Slot>
 * </ContentHeader>
 * 
 * // 在其他组件中使用
 * <SomeComponent>
 *   <Slot>
 *     <AnyComponent />
 *   </Slot>
 * </SomeComponent>
 * ```
 */
export const Slot: React.FC<SlotProps> = ({
  children,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  return (
    <div 
      className={`slot ${className}`.trim()}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};

Slot.displayName = 'Slot';
