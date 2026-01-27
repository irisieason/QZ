import { useState, useCallback, useRef, useEffect, type ChangeEvent, type FocusEvent, type KeyboardEvent } from 'react';
import { useControlledState } from '../../hooks/useControlledState';
import type { CategoryFilterProps } from './CategoryFilter.types';
import { KEYS } from './CategoryFilter.constants';

/**
 * CategoryFilter 组件的业务逻辑 Hook
 * 
 * 封装组件的所有状态管理和事件处理逻辑
 */
export function useCategoryFilter(props: CategoryFilterProps) {
  const {
    value,
    defaultValue,
    disabled = false,
    readOnly = false,
    clearable = true,
    onChange,
    onFocus,
    onBlur,
    onSearch,
    onClear,
    onKeyDown,
  } = props;
  
  // 受控/非受控值管理
  // 注意：不传 onChange 给 useControlledState，因为我们需要在 handleChange 中传递完整的 event 对象
  const [inputValue, setInputValue] = useControlledState(
    value,
    defaultValue || '',
    undefined
  );
  
  // 聚焦状态管理
  const [isFocused, setIsFocused] = useState(false);
  
  // 使用 ref 存储回调，避免依赖变化
  const onChangeRef = useRef(onChange);
  const onFocusRef = useRef(onFocus);
  const onBlurRef = useRef(onBlur);
  const onSearchRef = useRef(onSearch);
  const onClearRef = useRef(onClear);
  const onKeyDownRef = useRef(onKeyDown);
  
  useEffect(() => {
    onChangeRef.current = onChange;
    onFocusRef.current = onFocus;
    onBlurRef.current = onBlur;
    onSearchRef.current = onSearch;
    onClearRef.current = onClear;
    onKeyDownRef.current = onKeyDown;
  }, [onChange, onFocus, onBlur, onSearch, onClear, onKeyDown]);
  
  // 值变化处理
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) {
      return; // 禁用或只读时不处理输入
    }
    
    const newValue = event.target.value;
    
    // 先调用 onChange（让父组件更新 value）
    onChangeRef.current?.(newValue, event);
    
    // 然后更新内部状态（仅在非受控模式下生效）
    setInputValue(newValue);
  }, [setInputValue, disabled, readOnly]);
  
  // 聚焦处理
  const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocusRef.current?.(event);
  }, []);
  
  // 失焦处理
  const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlurRef.current?.(event);
  }, []);
  
  // 键盘事件处理
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KEYS.ENTER) {
      onSearchRef.current?.(inputValue);
    }
    if (event.key === KEYS.ESCAPE && clearable && inputValue) {
      // 创建一个模拟的 change 事件
      const mockEvent = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as ChangeEvent<HTMLInputElement>;
      
      setInputValue('');
      onChangeRef.current?.('', mockEvent);
      onClearRef.current?.();
    }
    onKeyDownRef.current?.(event);
  }, [inputValue, clearable, setInputValue]);
  
  // 清除处理
  const handleClear = useCallback(() => {
    // 创建一个模拟的 change 事件
    const mockEvent = {
      target: { value: '' },
      currentTarget: { value: '' },
    } as ChangeEvent<HTMLInputElement>;
    
    setInputValue('');
    onChangeRef.current?.('', mockEvent);
    onClearRef.current?.();
  }, [setInputValue]);
  
  // 是否显示清除按钮
  const showClearButton = clearable && 
    inputValue && 
    inputValue.length > 0 && 
    !disabled && 
    !readOnly;
  
  return {
    inputValue,
    isFocused,
    showClearButton,
    handleChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleClear,
  };
}
