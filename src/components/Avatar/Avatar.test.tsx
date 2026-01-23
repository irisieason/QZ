import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

describe('Avatar', () => {
  describe('Figma Props', () => {
    it('renders placeholder by default', () => {
      const { container } = render(<Avatar />);
      const avatar = container.querySelector('.avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass('avatar--placeholder');
    });

    it('renders with initials when initials=true', () => {
      const { container } = render(<Avatar text="JD" initials={true} />);
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveClass('avatar--initials');
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders with image when image=true', () => {
      const { container } = render(<Avatar image={true} src="https://example.com/avatar.jpg" />);
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveClass('avatar--image');
      
      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('renders custom initials text', () => {
      render(<Avatar text="AB" initials={true} />);
      expect(screen.getByText('AB')).toBeInTheDocument();
    });

    it('prioritizes image over initials', () => {
      const { container } = render(<Avatar text="JD" image={true} initials={true} src="https://example.com/avatar.jpg" />);
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveClass('avatar--image');
      expect(screen.queryByText('JD')).not.toBeInTheDocument();
    });
  });

  describe('Extended Props', () => {
    it('renders with custom src', () => {
      const { container } = render(<Avatar image={true} src="https://example.com/custom.jpg" />);
      const img = container.querySelector('img');
      expect(img).toHaveAttribute('src', 'https://example.com/custom.jpg');
    });

    it('renders with custom alt text', () => {
      const { container } = render(<Avatar image={true} src="https://example.com/avatar.jpg" alt="Custom alt" />);
      const img = container.querySelector('img');
      expect(img).toHaveAttribute('alt', 'Custom alt');
    });

    it('applies custom className', () => {
      const { container } = render(<Avatar className="custom-class" />);
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveClass('custom-class');
    });

    it('applies custom aria-label', () => {
      const { container } = render(<Avatar aria-label="Custom Label" />);
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveAttribute('aria-label', 'Custom Label');
    });

    it('renders placeholder when image=true but no src provided', () => {
      const { container } = render(<Avatar image={true} />);
      const placeholder = container.querySelector('.avatar__image-placeholder');
      expect(placeholder).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA role', () => {
      const { container } = render(<Avatar />);
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveAttribute('role', 'img');
    });

    it('has correct data attributes', () => {
      const { container } = render(<Avatar image={true} initials={false} />);
      const avatar = container.querySelector('.avatar');
      
      expect(avatar).toHaveAttribute('data-image', 'true');
      expect(avatar).toHaveAttribute('data-initials', 'false');
    });

    it('uses alt text as aria-label when no aria-label provided', () => {
      const { container } = render(<Avatar image={true} alt="User avatar" />);
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveAttribute('aria-label', 'User avatar');
    });
  });

  describe('Icon rendering', () => {
    it('renders user icon in placeholder mode', () => {
      const { container } = render(<Avatar />);
      const icon = container.querySelector('ix-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('name', 'user');
      expect(icon).toHaveAttribute('size', '24');
    });

    it('does not render icon when showing initials', () => {
      const { container } = render(<Avatar text="JD" initials={true} />);
      const icon = container.querySelector('ix-icon');
      expect(icon).not.toBeInTheDocument();
    });

    it('does not render icon when showing image', () => {
      const { container } = render(<Avatar image={true} src="https://example.com/avatar.jpg" />);
      const icon = container.querySelector('ix-icon');
      expect(icon).not.toBeInTheDocument();
    });
  });
});
