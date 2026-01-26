import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  describe('Figma Props', () => {
    it('renders with default text "JD"', () => {
      const { container } = render(<Avatar />);
      const avatar = container.querySelector('.avatar');
      expect(avatar).toBeInTheDocument();
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders with custom text', () => {
      render(<Avatar text="AB" />);
      expect(screen.getByText('AB')).toBeInTheDocument();
    });

    it('renders single letter', () => {
      render(<Avatar text="A" />);
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('renders three letters', () => {
      render(<Avatar text="ABC" />);
      expect(screen.getByText('ABC')).toBeInTheDocument();
    });
  });

  describe('Extended Props', () => {
    it('applies custom className', () => {
      const { container } = render(<Avatar className="custom-class" />);
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveClass('avatar');
      expect(avatar).toHaveClass('custom-class');
    });

    it('applies custom style', () => {
      const { container } = render(<Avatar style={{ width: '48px', height: '48px' }} />);
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveStyle({ width: '48px', height: '48px' });
    });

    it('applies custom aria-label', () => {
      const { container } = render(<Avatar aria-label="Custom Label" />);
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveAttribute('aria-label', 'Custom Label');
    });

    it('uses default aria-label when not provided', () => {
      const { container } = render(<Avatar text="JD" />);
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveAttribute('aria-label', 'Avatar with initials JD');
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA role', () => {
      const { container } = render(<Avatar />);
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveAttribute('role', 'img');
    });

    it('has accessible label', () => {
      const { container } = render(<Avatar text="AB" />);
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveAttribute('aria-label', 'Avatar with initials AB');
    });
  });

  describe('Styling', () => {
    it('has correct base classes', () => {
      const { container } = render(<Avatar />);
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveClass('avatar');
    });

    it('renders text with correct class', () => {
      const { container } = render(<Avatar text="JD" />);
      const text = container.querySelector('.avatar__text');
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent('JD');
    });
  });
});
