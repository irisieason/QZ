import type { CSSProperties, ChangeEvent, FocusEvent, KeyboardEvent } from 'react';

/**
 * CategoryFilter 组件属性
 * 
 * 基于 Figma 设计，结合 React 最佳实践
 */
export interface CategoryFilterProps {
  // ========== Figma 设计属性 ==========
  
  /** 占位符文本内容 @default "Search" */
  placeholderText?: string;
  
  /** 是否显示占位符（Figma 设计属性，用于控制占位符显示/隐藏） @default true */
  showplaceholder?: boolean;
  
  /** 是否显示搜索图标 @default true */
  searchIcon?: boolean;
  
  // ========== 状态属性 ==========
  
  /** 是否禁用 @default false */
  disabled?: boolean;
  
  /** 是否只读 @default false */
  readOnly?: boolean;
  
  // ========== 数据属性（受控/非受控） ==========
  
  /** 输入值（受控模式） */
  value?: string;
  
  /** 默认值（非受控模式） @default "" */
  defaultValue?: string;
  
  // ========== 功能属性 ==========
  
  /** 是否显示清除按钮 @default true */
  clearable?: boolean;
  
  // ========== 事件回调 ==========
  
  /** 值变化回调 */
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  
  /** 聚焦事件 */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  
  /** 失焦事件 */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  
  /** 搜索事件（按 Enter 键触发） */
  onSearch?: (value: string) => void;
  
  /** 清除事件（点击清除按钮或按 ESC 键触发） */
  onClear?: () => void;
  
  /** 键盘事件 */
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  
  // ========== 技术属性 ==========
  
  /** 自定义类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: CSSProperties;
  
  /** 输入框 ID */
  id?: string;
  
  /** 可访问性标签 */
  'aria-label'?: string;
}
