import React, { forwardRef, useMemo } from 'react';
import { IconButton } from '../IconButton';
import { cn } from '../../utils/classnames';
import { useCategoryFilter } from './CategoryFilter.hooks';
import type { CategoryFilterProps } from './CategoryFilter.types';
import { CLASSES, STATE_MODIFIERS, DEFAULTS, ICONS } from './CategoryFilter.constants';
import './CategoryFilter.css';

// 导出类型供外部使用
export type { CategoryFilterProps } from './CategoryFilter.types';

/**
 * CategoryFilter 组件 - 用于标签选择、多选过滤和分面搜索
 * 
 * 支持受控和非受控两种模式，提供搜索、清除等功能
 * 
 * @example
 * ```tsx
 * // 受控模式
 * <CategoryFilter
 *   value={searchValue}
 *   onChange={(value) => setSearchValue(value)}
 *   onSearch={handleSearch}
 * />
 * 
 * // 非受控模式
 * <CategoryFilter
 *   defaultValue="initial"
 *   onSearch={handleSearch}
 * />
 * ```
 */
export const CategoryFilter = forwardRef<HTMLInputElement, CategoryFilterProps>((props, ref) => {
  const {
    // Figma 设计属性
    placeholderText = DEFAULTS.PLACEHOLDER_TEXT,
    showplaceholder = DEFAULTS.SHOW_PLACEHOLDER,
    searchIcon = DEFAULTS.SEARCH_ICON,
    
    // 状态属性
    disabled = false,
    readOnly = false,
    
    // 技术属性
    className,
    style,
    id,
    'aria-label': ariaLabel,
  } = props;
  
  // 使用自定义 Hook 管理业务逻辑
  const {
    inputValue,
    isFocused,
    showClearButton,
    handleChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleClear,
  } = useCategoryFilter(props);
  
  // 使用 useMemo 优化类名计算
  const containerClasses = useMemo(() => cn(
    CLASSES.ROOT,
    disabled && `${CLASSES.ROOT}--${STATE_MODIFIERS.DISABLED}`,
    readOnly && `${CLASSES.ROOT}--${STATE_MODIFIERS.READONLY}`,
    isFocused && `${CLASSES.ROOT}--${STATE_MODIFIERS.FOCUSED}`,
    inputValue && `${CLASSES.ROOT}--${STATE_MODIFIERS.FILLED}`,
    searchIcon && `${CLASSES.ROOT}--${STATE_MODIFIERS.HAS_SEARCH_ICON}`,
    className
  ), [disabled, readOnly, isFocused, inputValue, searchIcon, className]);
  
  // 计算实际的 placeholder（只有 showplaceholder 为 true 时才显示）
  const actualPlaceholder = showplaceholder ? placeholderText : '';
  
  // 使用 useMemo 优化输入框属性
  const inputProps = useMemo(() => ({
    ref,
    id,
    type: 'text' as const,
    className: CLASSES.INPUT,
    value: inputValue,
    placeholder: actualPlaceholder,
    disabled,
    readOnly,
    'aria-label': ariaLabel || placeholderText,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
  }), [
    ref, id, inputValue, actualPlaceholder, placeholderText,
    disabled, readOnly, ariaLabel, 
    handleChange, handleFocus, handleBlur, handleKeyDown
  ]);
  
  return (
    <div className={containerClasses} style={style}>
      {isFocused && (
        <div className={CLASSES.FOCUS_OUTLINE} />
      )}
      
      <div className={CLASSES.CONTAINER}>
        {searchIcon && (
          <div className={CLASSES.ICON} aria-hidden="true">
            <ix-icon name={ICONS.SEARCH} size={DEFAULTS.ICON_SIZE} />
          </div>
        )}
        
        <input {...inputProps} />
        
        {showClearButton && (
          <IconButton
            type="Primary ghost"
            size={DEFAULTS.ICON_SIZE}
            icon={ICONS.CLEAR}
            onClick={handleClear}
            aria-label="Clear input"
            className={CLASSES.CLEAR_BUTTON}
          />
        )}
        
        {isFocused && !inputValue && !showClearButton && (
          <div className={CLASSES.CARET} aria-hidden="true" />
        )}
      </div>
      
      <div className={CLASSES.SHADOW} aria-hidden="true" />
    </div>
  );
});

CategoryFilter.displayName = 'CategoryFilter';