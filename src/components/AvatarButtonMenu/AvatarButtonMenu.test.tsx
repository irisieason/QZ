import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AvatarButtonMenu } from './AvatarButtonMenu';
import { Avatar } from '../Avatar';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

describe('AvatarButtonMenu', () => {
  describe('Figma Props', () => {
    it('renders with default props', () => {
      render(
        <AvatarButtonMenu>
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('john.doe@company.com')).toBeInTheDocument();
      expect(screen.getByText('Administrator')).toBeInTheDocument();
    });

    it('applies default state', () => {
      const { container } = render(
        <AvatarButtonMenu state="Default">
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      const button = container.querySelector('.avatar-button-menu');
      expect(button).not.toHaveClass('avatar-button-menu--hover');
      expect(button).not.toHaveClass('avatar-button-menu--active');
    });

    it('applies hover state', () => {
      const { container } = render(
        <AvatarButtonMenu state="Hover">
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      const button = container.querySelector('.avatar-button-menu');
      expect(button).toHaveClass('avatar-button-menu--hover');
    });

    it('applies active state', () => {
      const { container } = render(
        <AvatarButtonMenu state="Active">
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      const button = container.querySelector('.avatar-button-menu');
      expect(button).toHaveClass('avatar-button-menu--active');
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('applies focused state', () => {
      const { container } = render(
        <AvatarButtonMenu focused={true}>
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      const button = container.querySelector('.avatar-button-menu');
      expect(button).toHaveClass('avatar-button-menu--focused');
      const outline = container.querySelector('.avatar-button-menu__focus-outline');
      expect(outline).toBeInTheDocument();
    });

    it('shows dropdown when state is Active', () => {
      const { container } = render(
        <AvatarButtonMenu state="Active">
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      const dropdown = container.querySelector('.avatar-button-menu__dropdown');
      expect(dropdown).toBeInTheDocument();
      expect(dropdown).toHaveAttribute('role', 'menu');
    });

    it('hides dropdown when state is not Active', () => {
      const { container } = render(
        <AvatarButtonMenu state="Default">
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      const dropdown = container.querySelector('.avatar-button-menu__dropdown');
      expect(dropdown).not.toBeInTheDocument();
    });
  });

  describe('Extended Props', () => {
    it('renders with custom email', () => {
      render(
        <AvatarButtonMenu email="custom@example.com">
          <Avatar text="CE" />
        </AvatarButtonMenu>
      );
      expect(screen.getByText('custom@example.com')).toBeInTheDocument();
    });

    it('renders with custom role', () => {
      render(
        <AvatarButtonMenu role="Developer">
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      expect(screen.getByText('Developer')).toBeInTheDocument();
    });

    it('renders with children Avatar', () => {
      const { container } = render(
        <AvatarButtonMenu>
          <Avatar text="AB" />
        </AvatarButtonMenu>
      );
      const avatar = container.querySelector('.avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveTextContent('AB');
    });

    it('renders with custom children component', () => {
      const { container } = render(
        <AvatarButtonMenu>
          <div className="custom-avatar">Custom Avatar</div>
        </AvatarButtonMenu>
      );
      const customAvatar = container.querySelector('.custom-avatar');
      expect(customAvatar).toBeInTheDocument();
      expect(customAvatar).toHaveTextContent('Custom Avatar');
    });

    it('applies custom className', () => {
      const { container } = render(
        <AvatarButtonMenu className="custom-class">
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      const button = container.querySelector('.avatar-button-menu');
      expect(button).toHaveClass('custom-class');
    });

    it('applies custom aria-label', () => {
      render(
        <AvatarButtonMenu aria-label="Custom Label">
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom Label');
    });
  });

  describe('Dropdown Menu Items', () => {
    it('renders profile menu item when active', () => {
      render(
        <AvatarButtonMenu state="Active">
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      expect(screen.getByText('User profile...')).toBeInTheDocument();
    });

    it('renders logout menu item when active', () => {
      render(
        <AvatarButtonMenu state="Active">
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('renders menu item icons', () => {
      const { container } = render(
        <AvatarButtonMenu state="Active">
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      const icons = container.querySelectorAll('.avatar-button-menu__menu-item-icon ix-icon');
      expect(icons.length).toBe(2);
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA role', () => {
      render(
        <AvatarButtonMenu>
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has correct ARIA attributes', () => {
      render(
        <AvatarButtonMenu state="Active" email="test@example.com">
          <Avatar text="TE" />
        </AvatarButtonMenu>
      );
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('aria-label', 'User menu: test@example.com');
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('has correct data attributes', () => {
      render(
        <AvatarButtonMenu state="Hover" focused={true}>
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('data-state', 'Hover');
      expect(button).toHaveAttribute('data-focused', 'true');
    });

    it('menu items have correct role', () => {
      render(
        <AvatarButtonMenu state="Active">
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems.length).toBe(2);
    });

    it('menu items are keyboard accessible', () => {
      render(
        <AvatarButtonMenu state="Active">
          <Avatar text="JD" />
        </AvatarButtonMenu>
      );
      const menuItems = screen.getAllByRole('menuitem');
      menuItems.forEach(item => {
        expect(item).toHaveAttribute('tabIndex', '0');
      });
    });
  });
});
