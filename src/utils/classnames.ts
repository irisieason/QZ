/**
 * 类名工具函数
 * 
 * 用于条件性地组合类名，类似于 classnames 库但更轻量
 */

type ClassValue = string | number | boolean | undefined | null | ClassArray | ClassObject;
type ClassArray = ClassValue[];
type ClassObject = Record<string, boolean | undefined | null>;

/**
 * 组合类名
 * 
 * @param classes - 类名数组，支持字符串、对象、数组、条件表达式
 * @returns 组合后的类名字符串
 * 
 * @example
 * ```tsx
 * cn('button', 'button--primary') // 'button button--primary'
 * cn('button', isActive && 'button--active') // 'button button--active' 或 'button'
 * cn('button', { 'button--active': isActive }) // 'button button--active' 或 'button'
 * cn(['button', 'button--primary']) // 'button button--primary'
 * ```
 */
export function cn(...classes: ClassValue[]): string {
  const result: string[] = [];
  
  for (const cls of classes) {
    if (!cls) continue;
    
    if (typeof cls === 'string' || typeof cls === 'number') {
      result.push(String(cls));
    } else if (Array.isArray(cls)) {
      const nested = cn(...cls);
      if (nested) result.push(nested);
    } else if (typeof cls === 'object') {
      for (const [key, value] of Object.entries(cls)) {
        if (value) result.push(key);
      }
    }
  }
  
  return result.join(' ');
}

/**
 * 规范化变体名称
 * 
 * 将 Figma 变体名称转换为 CSS 类名格式
 * 
 * @param variant - 变体名称
 * @returns 规范化后的类名
 * 
 * @example
 * ```tsx
 * normalizeVariant('Primary') // 'primary'
 * normalizeVariant('Primary outline') // 'primary-outline'
 * normalizeVariant('🔶 Content action') // 'content-action'
 * ```
 */
export function normalizeVariant(variant: string): string {
  return variant
    .toLowerCase()
    .replace(/🔶\s*/g, '') // 移除 emoji
    .replace(/\s+/g, '-')  // 空格转连字符
    .trim();
}

/**
 * 规范化状态名称
 * 
 * 将状态名称转换为 CSS 类名格式
 * 
 * @param state - 状态名称
 * @returns 规范化后的类名
 * 
 * @example
 * ```tsx
 * normalizeState('Default') // 'default'
 * normalizeState('Hover') // 'hover'
 * ```
 */
export function normalizeState(state: string): string {
  return state.toLowerCase();
}

/**
 * 创建 BEM 风格的类名生成器
 * 
 * @param block - 块名称
 * @returns 类名生成器对象
 * 
 * @example
 * ```tsx
 * const bem = createBEM('button');
 * bem.block() // 'button'
 * bem.element('icon') // 'button__icon'
 * bem.modifier('primary') // 'button--primary'
 * bem.elementModifier('icon', 'large') // 'button__icon--large'
 * ```
 */
export function createBEM(block: string) {
  return {
    block: () => block,
    element: (element: string) => `${block}__${element}`,
    modifier: (modifier: string) => `${block}--${modifier}`,
    elementModifier: (element: string, modifier: string) => 
      `${block}__${element}--${modifier}`,
  };
}
