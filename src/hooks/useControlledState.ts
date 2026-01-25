import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * 受控/非受控状态管理 Hook
 * 
 * 统一处理组件的受控和非受控模式，避免重复代码
 * 
 * @template T - 状态值的类型
 * @param controlledValue - 外部传入的受控值
 * @param defaultValue - 默认值（非受控模式使用）
 * @param onChange - 值变化回调
 * 
 * @returns [value, setValue, isControlled] - 当前值、设置值函数、是否受控
 * 
 * @example
 * ```tsx
 * const [value, setValue, isControlled] = useControlledState(
 *   props.value,
 *   props.defaultValue || '',
 *   props.onChange
 * );
 * 
 * // 使用 setValue 更新值（自动处理受控/非受控）
 * setValue('new value');
 * ```
 */
export function useControlledState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): readonly [T, (value: T) => void, boolean] {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  
  // 使用 ref 存储 onChange，避免依赖变化
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  
  const setValue = useCallback((newValue: T) => {
    // 非受控模式：更新内部状态
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    // 调用外部 onChange
    onChangeRef.current?.(newValue);
  }, [isControlled]);
  
  return [value, setValue, isControlled] as const;
}

/**
 * 布尔值受控/非受控状态管理 Hook
 * 
 * 专门用于布尔值状态的简化版本
 * 
 * @param controlledValue - 外部传入的受控值
 * @param defaultValue - 默认值（非受控模式使用）
 * @param onChange - 值变化回调
 * 
 * @returns [value, toggle, setValue, isControlled]
 * 
 * @example
 * ```tsx
 * const [expanded, toggleExpanded] = useControlledBoolean(
 *   props.expanded,
 *   true,
 *   props.onExpandedChange
 * );
 * 
 * // 切换状态
 * toggleExpanded();
 * ```
 */
export function useControlledBoolean(
  controlledValue: boolean | undefined,
  defaultValue: boolean,
  onChange?: (value: boolean) => void
): readonly [boolean, () => void, (value: boolean) => void, boolean] {
  const [value, setValue, isControlled] = useControlledState(
    controlledValue,
    defaultValue,
    onChange
  );
  
  const toggle = useCallback(() => {
    setValue(!value);
  }, [value, setValue]);
  
  return [value, toggle, setValue, isControlled] as const;
}
