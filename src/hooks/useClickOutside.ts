import { useEffect, type RefObject } from 'react';

/**
 * Hook to detect clicks outside of a specified element
 * 
 * @param ref - React ref object pointing to the element
 * @param callback - Function to call when click outside is detected
 * 
 * @example
 * ```tsx
 * const dropdownRef = useRef<HTMLDivElement>(null);
 * 
 * useClickOutside(dropdownRef, () => {
 *   setIsOpen(false);
 * });
 * 
 * return <div ref={dropdownRef}>...</div>
 * ```
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
