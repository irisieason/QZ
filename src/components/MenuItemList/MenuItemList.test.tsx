import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MenuItemList } from './MenuItemList';
import { MenuItem } from '../MenuItem';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

describe('MenuItemList', () => {
  describe('Rendering', () => {
    it('renders with children', () => {
      const { container } = render(
        <MenuItemList>
          <MenuItem icon="home" label="Home" />
          <MenuItem icon="settings" label="Settings" />
        </MenuItemList>
      );
      
      const nav = container.querySelector('.menu-item-list');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('role', 'navigation');
    });

    it('renders multiple MenuItem children', () => {
      const { container } = render(
        <MenuItemList>
          <MenuItem icon="home" label="Home" />
          <MenuItem icon="grid" label="Dashboard" />
          <MenuItem icon="settings" label="Settings" />
        </MenuItemList>
      );
      
      const items = container.querySelectorAll('.menu-item-list__item');
      expect(items.length).toBe(3);
    });

    it('renders with custom className', () => {
      const { container } = render(
        <MenuItemList className="custom-menu">
          <MenuItem icon="home" label="Home" />
        </MenuItemList>
      );
      
      const nav = container.querySelector('.menu-item-list');
      expect(nav).toHaveClass('custom-menu');
    });
  });

  describe('Expanded State', () => {
    it('applies expanded class when expanded is true', () => {
      const { container } = render(
        <MenuItemList expanded={true}>
          <MenuItem icon="home" label="Home" />
        </MenuItemList>
      );
      
      const nav = container.querySelector('.menu-item-list');
      expect(nav).toHaveClass('menu-item-list--expanded');
      expect(nav).toHaveAttribute('data-expanded', 'true');
    });

    it('applies collapsed class when expanded is false', () => {
      const { container } = render(
        <MenuItemList expanded={false}>
          <MenuItem icon="home" label="Home" />
        </MenuItemList>
      );
      
      const nav = container.querySelector('.menu-item-list');
      expect(nav).toHaveClass('menu-item-list--collapsed');
      expect(nav).toHaveAttribute('data-expanded', 'false');
    });

    it('defaults to expanded when not specified', () => {
      const { container } = render(
        <MenuItemList>
          <MenuItem icon="home" label="Home" />
        </MenuItemList>
      );
      
      const nav = container.querySelector('.menu-item-list');
      expect(nav).toHaveClass('menu-item-list--expanded');
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA role', () => {
      const { container } = render(
        <MenuItemList>
          <MenuItem icon="home" label="Home" />
        </MenuItemList>
      );
      
      const nav = container.querySelector('.menu-item-list');
      expect(nav).toHaveAttribute('role', 'navigation');
    });

    it('has default aria-label', () => {
      const { container } = render(
        <MenuItemList>
          <MenuItem icon="home" label="Home" />
        </MenuItemList>
      );
      
      const nav = container.querySelector('.menu-item-list');
      expect(nav).toHaveAttribute('aria-label', 'Menu');
    });

    it('applies custom aria-label', () => {
      const { container } = render(
        <MenuItemList aria-label="Main Navigation">
          <MenuItem icon="home" label="Home" />
        </MenuItemList>
      );
      
      const nav = container.querySelector('.menu-item-list');
      expect(nav).toHaveAttribute('aria-label', 'Main Navigation');
    });

    it('renders as unordered list', () => {
      const { container } = render(
        <MenuItemList>
          <MenuItem icon="home" label="Home" />
        </MenuItemList>
      );
      
      const ul = container.querySelector('.menu-item-list__items');
      expect(ul?.tagName).toBe('UL');
    });

    it('wraps each child in list item', () => {
      const { container } = render(
        <MenuItemList>
          <MenuItem icon="home" label="Home" />
          <MenuItem icon="settings" label="Settings" />
        </MenuItemList>
      );
      
      const listItems = container.querySelectorAll('.menu-item-list__item');
      expect(listItems.length).toBe(2);
      listItems.forEach(item => {
        expect(item.tagName).toBe('LI');
      });
    });
  });

  describe('Children Handling', () => {
    it('handles single child', () => {
      const { container } = render(
        <MenuItemList>
          <MenuItem icon="home" label="Home" />
        </MenuItemList>
      );
      
      const items = container.querySelectorAll('.menu-item-list__item');
      expect(items.length).toBe(1);
    });

    it('handles multiple children', () => {
      const { container } = render(
        <MenuItemList>
          <MenuItem icon="home" label="Home" />
          <MenuItem icon="grid" label="Dashboard" />
          <MenuItem icon="settings" label="Settings" />
          <MenuItem icon="user" label="Profile" />
        </MenuItemList>
      );
      
      const items = container.querySelectorAll('.menu-item-list__item');
      expect(items.length).toBe(4);
    });

    it('preserves MenuItem props', () => {
      render(
        <MenuItemList>
          <MenuItem icon="home" label="Home" selected={true} />
          <MenuItem icon="settings" label="Settings" notification={true} />
        </MenuItemList>
      );
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });
  });
});
