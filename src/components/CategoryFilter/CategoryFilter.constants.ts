/**
 * CategoryFilter 组件常量定义
 */

/** 组件类名前缀 */
export const CLASS_PREFIX = 'category-filter';

/** CSS 类名 */
export const CLASSES = {
  ROOT: CLASS_PREFIX,
  FOCUS_OUTLINE: `${CLASS_PREFIX}__focus-outline`,
  CONTAINER: `${CLASS_PREFIX}__container`,
  ICON: `${CLASS_PREFIX}__icon`,
  INPUT: `${CLASS_PREFIX}__input`,
  CLEAR_BUTTON: `${CLASS_PREFIX}__clear-button`,
  CARET: `${CLASS_PREFIX}__caret`,
  SHADOW: `${CLASS_PREFIX}__shadow`,
} as const;

/** 状态类名修饰符 */
export const STATE_MODIFIERS = {
  DISABLED: 'disabled',
  READONLY: 'readonly',
  FOCUSED: 'focused',
  FILLED: 'filled',
  HAS_SEARCH_ICON: 'has-search-icon',
} as const;

/** 默认属性值 */
export const DEFAULTS = {
  PLACEHOLDER_TEXT: 'Search',
  SHOW_PLACEHOLDER: true,
  SEARCH_ICON: true,
  CLEARABLE: true,
  ICON_SIZE: '16' as const,
} as const;

/** 键盘按键 */
export const KEYS = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
} as const;

/** 图标名称 */
export const ICONS = {
  SEARCH: 'search',
  CLEAR: 'clear',
} as const;
