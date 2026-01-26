import React, { useState, useCallback } from 'react';
import './MenuItemList.css';

// Figma 定义的属性（严格遵循 Figma 设计）
interface MenuItemListFigmaProps {
  /** 是否展开（显示文本） */
  expanded?: boolean;
}

// 扩展属性（React 特定，非 Figma 定义）
interface MenuItemListExtendedProps {
  /** MenuItem 子组件插槽 - 从外部传入多个 MenuItem 组件 */
  children: React.ReactNode;
  
  /** 当前选中的菜单项索引（受控模式） */
  selectedIndex?: number;
  
  /** 默认选中的菜单项索引（非受控模式） */
  defaultSelectedIndex?: number;
  
  /** 选中项变化回调 */
  onSelectionChange?: (index: number) => void;
  
  /** 自定义类名 */
  className?: string;
  
  /** 可访问性标签 */
  'aria-label'?: string;
}

// 最终组件属性
export interface MenuItemListProps extends MenuItemListFigmaProps, MenuItemListExtendedProps {}

export const MenuItemList: React.FC<MenuItemListProps> = ({
  // Figma 属性
  expanded = true,
  
  // 扩展属性
  children,
  selectedIndex: controlledSelectedIndex,
  defaultSelectedIndex = -1,
  onSelectionChange,
  className = '',
  'aria-label': ariaLabel,
}) => {
  // 内部状态管理（非受控模式）
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(defaultSelectedIndex);
  
  // 使用受控状态或内部状态
  const isControlled = controlledSelectedIndex !== undefined;
  const selectedIndex = isControlled ? controlledSelectedIndex : internalSelectedIndex;

  // ✅ 性能优化：使用 useCallback 缓存事件处理器
  const handleItemClick = useCallback((index: number) => {
    // 只在非受控模式下更新内部状态
    if (!isControlled) {
      setInternalSelectedIndex(index);
    }
    
    // 触发外部回调
    onSelectionChange?.(index);
  }, [isControlled, onSelectionChange]);

  const containerClasses = [
    'menu-item-list',
    expanded ? 'menu-item-list--expanded' : 'menu-item-list--collapsed',
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav
      className={containerClasses}
      role="navigation"
      aria-label={ariaLabel || 'Menu'}
      data-expanded={expanded}
    >
      <ul className="menu-item-list__items">
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return (
              <li key={index} className="menu-item-list__item">
                {child}
              </li>
            );
          }

          // 克隆子组件，注入 expanded、selected 和 onClick 属性
          const isSelected = selectedIndex === index;
          const clonedChild = React.cloneElement(child, {
            // 强制使用父组件的 expanded 状态
            expanded,
            // 排他选择：只有当前索引的项被选中
            selected: isSelected,
            // 注入点击处理器
            onClick: (event: React.MouseEvent) => {
              // 调用原有的 onClick（如果有）
              if (child.props.onClick) {
                child.props.onClick(event);
              }
              // 触发选择变化
              handleItemClick(index);
            },
          } as any);

          return (
            <li key={index} className="menu-item-list__item">
              {clonedChild}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

MenuItemList.displayName = 'MenuItemList';
