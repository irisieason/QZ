import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuItem } from './MenuItem';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

describe('MenuItem', () => {
  describe('Figma Props', () => {
    it('renders with default props', () => {
      render(<MenuItem />);
      expect(screen.getByRole('menuitem')).toBeInTheDocument();
      expect(screen.getByText('Item')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      render(<MenuItem label="Dashboard" />);
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('applies Main Item variant', () => {
      const { container } = render(<MenuItem variant="Main Item" />);
      const menuItem = container.querySelector('.menu-item');
      expect(menuItem).toHaveClass('menu-item--main-item');
    });

    it('applies selected state', () => {
      const { container } = render(<MenuItem selected={true} />);
      const menuItem = container.querySelector('.menu-item');
      expect(menuItem).toHaveClass('menu-item--selected');
      expect(screen.getByRole('menuitem')).toHaveAttribute('aria-selected', 'true');
    });

    it('applies focused state', () => {
      const { container } = render(<MenuItem focused={true} />);
      const menuItem = container.querySelector('.menu-item');
      expect(menuItem).toHaveClass('menu-item--focused');
    });

    it('applies expanded state', () => {
      const { container } = render(<MenuItem expanded={true} />);
      const menuItem = container.querySelector('.menu-item');
      expect(menuItem).not.toHaveClass('menu-item--collapsed');
    });

    it('applies collapsed state', () => {
      const { container } = render(<MenuItem expanded={false} />);
      const menuItem = container.querySelector('.menu-item');
      expect(menuItem).toHaveClass('menu-item--collapsed');
    });

    it('applies hover state', () => {
      const { container } = render(<MenuItem state="Hover" />);
      const menuItem = container.querySelector('.menu-item');
      expect(menuItem).toHaveClass('menu-item--hover');
    });

    it('applies active state', () => {
      const { container } = render(<MenuItem state="Active" />);
      const menuItem = container.querySelector('.menu-item');
      expect(menuItem).toHaveClass('menu-item--active');
    });

    it('shows notification badge when notification is true', () => {
      const { container } = render(<MenuItem notification={true} notificationCount={5} />);
      const badge = container.querySelector('.menu-item__notification-badge');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('5');
    });

    it('hides notification badge when notification is false', () => {
      const { container } = render(<MenuItem notification={false} />);
      const badge = container.querySelector('.menu-item__notification-badge');
      expect(badge).not.toBeInTheDocument();
    });
  });

  describe('Extended Props', () => {
    it('renders with custom icon', () => {
      const { container } = render(<MenuItem icon="dashboard" />);
      const icon = container.querySelector('ix-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('name', 'dashboard');
    });

    it('handles click events', async () => {
      const handleClick = vi.fn();
      render(<MenuItem onClick={handleClick} />);
      
      const menuItem = screen.getByRole('menuitem');
      await userEvent.click(menuItem);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies custom className', () => {
      const { container } = render(<MenuItem className="custom-class" />);
      const menuItem = container.querySelector('.menu-item');
      expect(menuItem).toHaveClass('custom-class');
    });

    it('applies custom aria-label', () => {
      render(<MenuItem aria-label="Custom Label" />);
      expect(screen.getByRole('menuitem')).toHaveAttribute('aria-label', 'Custom Label');
    });
  });

  describe('Tooltip', () => {
    it('shows tooltip when collapsed and hovered', () => {
      const { container } = render(<MenuItem expanded={false} label="Dashboard" />);
      const menuItem = container.querySelector('.menu-item');
      
      // Simulate mouse enter
      fireEvent.mouseEnter(menuItem!);
      
      const tooltip = container.querySelector('.menu-item__tooltip-wrapper');
      expect(tooltip).toBeInTheDocument();
    });

    it('hides tooltip when expanded', () => {
      const { container } = render(<MenuItem expanded={true} label="Dashboard" />);
      const menuItem = container.querySelector('.menu-item');
      
      // Simulate mouse enter
      fireEvent.mouseEnter(menuItem!);
      
      const tooltip = container.querySelector('.menu-item__tooltip-wrapper');
      // Tooltip is not rendered when expanded
      expect(tooltip).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA role', () => {
      render(<MenuItem />);
      expect(screen.getByRole('menuitem')).toBeInTheDocument();
    });

    it('has correct ARIA attributes', () => {
      render(<MenuItem selected={true} label="Dashboard" />);
      const menuItem = screen.getByRole('menuitem');
      
      expect(menuItem).toHaveAttribute('aria-label', 'Dashboard');
      expect(menuItem).toHaveAttribute('aria-selected', 'true');
    });

    it('has correct data attributes', () => {
      render(<MenuItem variant="Main Item" state="Hover" expanded={true} selected={true} />);
      const menuItem = screen.getByRole('menuitem');
      
      expect(menuItem).toHaveAttribute('data-variant', 'Main Item');
      expect(menuItem).toHaveAttribute('data-state', 'Hover');
      expect(menuItem).toHaveAttribute('data-expanded', 'true');
      expect(menuItem).toHaveAttribute('data-selected', 'true');
    });
  });
});
