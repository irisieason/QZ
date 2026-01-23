import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ApplicationMenu } from './ApplicationMenu';
import { AvatarButtonMenu } from '../AvatarButtonMenu';
import { MenuItem } from '../MenuItem';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

describe('ApplicationMenu', () => {
  describe('Figma Props', () => {
    it('renders with default props', () => {
      render(
        <ApplicationMenu
          avatarSection={<AvatarButtonMenu email="test@example.com" role="Tester" />}
          menuList={<MenuItem icon="home" label="Home" />}
        />
      );
      
      const menu = document.querySelector('.application-menu');
      expect(menu).toBeInTheDocument();
    });

    it('renders in expanded state', () => {
      render(
        <ApplicationMenu
          expanded={true}
          avatarSection={<AvatarButtonMenu email="test@example.com" role="Tester" />}
          menuList={<MenuItem icon="home" label="Home" />}
        />
      );
      
      const menu = document.querySelector('.application-menu');
      expect(menu).toHaveClass('application-menu--expanded');
      expect(menu).toHaveAttribute('data-expanded', 'true');
    });

    it('renders in collapsed state', () => {
      render(
        <ApplicationMenu
          expanded={false}
          avatarSection={<AvatarButtonMenu email="test@example.com" role="Tester" />}
          menuList={<MenuItem icon="home" label="Home" />}
        />
      );
      
      const menu = document.querySelector('.application-menu');
      expect(menu).toHaveClass('application-menu--collapsed');
      expect(menu).toHaveAttribute('data-expanded', 'false');
    });
  });

  describe('Slot Props', () => {
    it('renders avatarSection slot', () => {
      render(
        <ApplicationMenu
          avatarSection={
            <AvatarButtonMenu
              email="test@example.com"
              role="Tester"
            />
          }
          menuList={
            <MenuItem icon="home" label="Home" />
          }
        />
      );
      
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText('Tester')).toBeInTheDocument();
    });

    it('renders menuList slot', () => {
      render(
        <ApplicationMenu
          avatarSection={
            <AvatarButtonMenu
              email="test@example.com"
              role="Tester"
            />
          }
          menuList={
            <>
              <MenuItem icon="home" label="Home" />
              <MenuItem icon="settings" label="Settings" />
            </>
          }
        />
      );
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('renders custom toggleButton slot', () => {
      render(
        <ApplicationMenu
          toggleButton={
            <button data-testid="custom-toggle">Custom Toggle</button>
          }
          avatarSection={
            <AvatarButtonMenu email="test@example.com" role="Tester" />
          }
          menuList={
            <MenuItem icon="home" label="Home" />
          }
        />
      );
      
      expect(screen.getByTestId('custom-toggle')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <ApplicationMenu
          className="custom-class"
          avatarSection={
            <AvatarButtonMenu email="test@example.com" role="Tester" />
          }
          menuList={
            <MenuItem icon="home" label="Home" />
          }
        />
      );
      
      const menu = document.querySelector('.application-menu');
      expect(menu).toHaveClass('custom-class');
    });
  });

  describe('Toggle Button', () => {
    it('renders default toggle button', () => {
      render(
        <ApplicationMenu
          avatarSection={<AvatarButtonMenu email="test@example.com" role="Tester" />}
          menuList={<MenuItem icon="home" label="Home" />}
        />
      );
      
      const toggleButton = document.querySelector('.application-menu__toggle-button');
      expect(toggleButton).toBeInTheDocument();
    });

    it('shows correct icon for expanded state', () => {
      render(
        <ApplicationMenu
          expanded={true}
          avatarSection={<AvatarButtonMenu email="test@example.com" role="Tester" />}
          menuList={<MenuItem icon="home" label="Home" />}
        />
      );
      
      const icon = document.querySelector('ix-icon');
      expect(icon).toHaveAttribute('name', 'double-chevron-left');
    });

    it('shows correct icon for collapsed state', () => {
      render(
        <ApplicationMenu
          expanded={false}
          avatarSection={<AvatarButtonMenu email="test@example.com" role="Tester" />}
          menuList={<MenuItem icon="home" label="Home" />}
        />
      );
      
      const icon = document.querySelector('ix-icon');
      expect(icon).toHaveAttribute('name', 'double-chevron-right');
    });

    it('calls onToggleExpand when clicked', () => {
      const handleToggle = vi.fn();
      
      render(
        <ApplicationMenu
          onToggleExpand={handleToggle}
          avatarSection={<AvatarButtonMenu email="test@example.com" role="Tester" />}
          menuList={<MenuItem icon="home" label="Home" />}
        />
      );
      
      const toggleButton = document.querySelector('.application-menu__toggle-button');
      fireEvent.click(toggleButton!);
      
      expect(handleToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('Internal State Management', () => {
    it('manages expanded state internally when not controlled', () => {
      render(
        <ApplicationMenu
          avatarSection={<AvatarButtonMenu email="test@example.com" role="Tester" />}
          menuList={<MenuItem icon="home" label="Home" />}
        />
      );
      
      const menu = document.querySelector('.application-menu');
      const toggleButton = document.querySelector('.application-menu__toggle-button');
      
      // Initially expanded (default internal state)
      expect(menu).toHaveClass('application-menu--expanded');
      
      // Click to collapse
      fireEvent.click(toggleButton!);
      expect(menu).toHaveClass('application-menu--collapsed');
      
      // Click to expand
      fireEvent.click(toggleButton!);
      expect(menu).toHaveClass('application-menu--expanded');
    });
  });

  describe('Accessibility', () => {
    it('has correct aria-label on toggle button', () => {
      const { rerender } = render(
        <ApplicationMenu
          expanded={true}
          avatarSection={<AvatarButtonMenu email="test@example.com" role="Tester" />}
          menuList={<MenuItem icon="home" label="Home" />}
        />
      );
      
      const toggleButton = document.querySelector('.application-menu__toggle-button');
      expect(toggleButton).toHaveAttribute('aria-label', 'Collapse menu');
      
      rerender(
        <ApplicationMenu
          expanded={false}
          avatarSection={<AvatarButtonMenu email="test@example.com" role="Tester" />}
          menuList={<MenuItem icon="home" label="Home" />}
        />
      );
      
      expect(toggleButton).toHaveAttribute('aria-label', 'Expand menu');
    });

    it('has correct data-expanded attribute', () => {
      const { rerender } = render(
        <ApplicationMenu
          expanded={true}
          avatarSection={<AvatarButtonMenu email="test@example.com" role="Tester" />}
          menuList={<MenuItem icon="home" label="Home" />}
        />
      );
      
      const menu = document.querySelector('.application-menu');
      expect(menu).toHaveAttribute('data-expanded', 'true');
      
      rerender(
        <ApplicationMenu
          expanded={false}
          avatarSection={<AvatarButtonMenu email="test@example.com" role="Tester" />}
          menuList={<MenuItem icon="home" label="Home" />}
        />
      );
      
      expect(menu).toHaveAttribute('data-expanded', 'false');
    });
  });
});
