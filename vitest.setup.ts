import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock ix-icons
vi.mock('@irisieason/ix-icons', () => ({
  addIcons: vi.fn(),
}));
