import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock ix-icons
vi.mock('@irisieason/ix-icons', () => ({
  addIcons: vi.fn(),
}));

// 添加自定义 DOM 元素类型声明
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ix-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
          size?: string;
        },
        HTMLElement
      >;
    }
  }
}
