import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AvatarButtonMenu } from './AvatarButtonMenu';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

describe('AvatarButtonMenu', () => {
  describe('Figma Props', () => {
    it('renders with default props', () => {
      render(<AvatarButtonMenu />);
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('john.doe@company.com')).toBeInTheDocument();
      expect(screen.getByText('Administrator')).toBeInTheDocument();
    });

    it('applies default state', () => {
      const { container } = render(<AvatarButtonMenu state="Default" />);
      const button = container.querySelector('.avatar-button-menu');
      expect(button).not.toHaveClass('avatar-button-menu--hover');
      expect(button).not.toHaveClass('avatar-button-menu--active');
    });

    it('applies hover state', () => {
      const { container } = render(<AvatarButtonMenu state="Hover" />);
      const button = container.querySelector('.avatar-button-menu');
      expect(button).toHaveClass('avatar-button-menu--hover');
    });

    it('applies active state', () => {
      const { container } = render(<AvatarButtonMenu state="Active" />);
      const button = container.querySelector('.avatar-button-menu');
      expect(button).toHaveClass('avatar-button-menu--active');
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('applies focused state', () => {
      const { container } = render(<AvatarButtonMenu focused={true} />);
      const button = container.querySelector('.avatar-button-menu');
      expect(button).toHaveClass('avatar-button-menu--focused');
      const outline = container.querySelector('.avatar-button-menu__focus-outline');
      expect(outline).toBeInTheDocument();
    });

    it('shows dropdown when state is Active', () => {
      const { container } = render(<AvatarButtonMenu state="Active" />);
      const dropdown = container.querySelector('.avatar-button-menu__dropdown');
      expect(dropdown).toBeInTheDocument();
      expect(dropdown).toHaveAttribute('role', 'menu');
    });

    it('hides dropdown when state is not Active', () => {
      const { container } = render(<AvatarButtonMenu state="Default" />);
      const dropdown = container.querySelector('.avatar-button-menu__dropdown');
      expect(dropdown).not.toBeInTheDocument();
    });
  });

  describe('Extended Props', () => {
    it('renders with custom email', () => {
      render(<AvatarButtonMenu email="custom@example.com" />);
      expect(screen.getByText('custom@example.com')).toBeInTheDocument();
    });

    it('renders with custom role', () => {
      render(<AvatarButtonMenu role="Developer" />);
      expect(screen.getByText('Developer')).toBeInTheDocument();
    });

    it('passes avatar props correctly', () => {
      const { container } = render(
        <AvatarButtonMenu
          avatarInitials={true}
          avatarText="AB"
        />
      );
      const avatar = container.querySelector('.avatar-button-menu__avatar');
      expect(avatar).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<AvatarButtonMenu className="custom-class" />);
      const button = container.querySelector('.avatar-button-menu');
      expect(button).toHaveClass('custom-class');
    });

    it('applies custom aria-label', () => {
      render(<AvatarButtonMenu aria-label="Custom Label" />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom Label');
    });
  });

  describe('Dropdown Menu Items', () => {
    it('renders profile menu item when active', () => {
      render(<AvatarButtonMenu state="Active" />);
      expect(screen.getByText('User profile...')).toBeInTheDocument();
    });

    it('renders logout menu item when active', () => {
      render(<AvatarButtonMenu state="Active" />);
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('renders menu item icons', () => {
      const { container } = render(<AvatarButtonMenu state="Active" />);
      const icons = container.querySelectorAll('.avatar-button-menu__menu-item-icon ix-icon');
      expect(icons.length).toBe(2);
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA role', () => {
      render(<AvatarButtonMenu />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has correct ARIA attributes', () => {
      render(<AvatarButtonMenu state="Active" email="test@example.com" />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('aria-label', 'User menu: test@example.com');
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('has correct data attributes', () => {
      render(<AvatarButtonMenu state="Hover" focused={true} />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('data-state', 'Hover');
      expect(button).toHaveAttribute('data-focused', 'true');
    });

    it('menu items have correct role', () => {
      render(<AvatarButtonMenu state="Active" />);
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems.length).toBe(2);
    });

    it('menu items are keyboard accessible', () => {
      render(<AvatarButtonMenu state="Active" />);
      const menuItems = screen.getAllByRole('menuitem');
      menuItems.forEach(item => {
        expect(item).toHaveAttribute('tabIndex', '0');
      });
    });
  });
});
