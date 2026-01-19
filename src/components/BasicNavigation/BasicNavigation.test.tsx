import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BasicNavigation, MenuItem } from './BasicNavigation';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册图标
addIcons(allIcons);

// 模拟菜单项
const mockMenuItems: MenuItem[] = [
  {
    id: 'home',
    icon: 'home',
    label: 'Home',
    active: true,
    tooltip: 'Home',
  },
  {
    id: 'events',
    icon: 'alarm-bell',
    label: 'Event list',
    badge: 12,
    tooltip: 'Event list',
  },
  {
    id: 'dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
    tooltip: 'Dashboard',
  },
];

const mockBottomMenuItems: MenuItem[] = [
  {
    id: 'settings',
    icon: 'cogwheel',
    label: 'Settings',
    tooltip: 'Settings',
  },
];

describe('BasicNavigation', () => {
  describe('渲染测试', () => {
    it('应该正确渲染组件', () => {
      render(
        <BasicNavigation
          applicationName="Test App"
          menuItems={mockMenuItems}
        >
          <div>Test Content</div>
        </BasicNavigation>
      );

      expect(screen.getByText('Test App')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('应该渲染所有菜单项', () => {
      render(
        <BasicNavigation
          menuItems={mockMenuItems}
          bottomMenuItems={mockBottomMenuItems}
        >
          <div>Content</div>
        </BasicNavigation>
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Event list')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('应该显示徽章', () => {
      render(
        <BasicNavigation menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(screen.getByText('12')).toBeInTheDocument();
    });

    it('应该显示用户缩写', () => {
      render(
        <BasicNavigation userInitials="AB" menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(screen.getByText('AB')).toBeInTheDocument();
    });
  });

  describe('Figma 属性测试', () => {
    it('应该支持 header 属性', () => {
      const { rerender } = render(
        <BasicNavigation header={true} menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(screen.getByRole('banner')).toBeInTheDocument();

      rerender(
        <BasicNavigation header={false} menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    });

    it('应该支持 showLogo 属性', () => {
      const { rerender } = render(
        <BasicNavigation showLogo={true} menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(screen.getByText('LOGO')).toBeInTheDocument();

      rerender(
        <BasicNavigation showLogo={false} menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(screen.queryByText('LOGO')).not.toBeInTheDocument();
    });

    it('应该支持 applicationName 属性', () => {
      render(
        <BasicNavigation applicationName="Custom App Name" menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(screen.getByText('Custom App Name')).toBeInTheDocument();
    });

    it('应该支持 menuExpanded 属性', () => {
      const { container } = render(
        <BasicNavigation menuExpanded={true} menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(container.querySelector('.basic-navigation--menu-expanded')).toBeInTheDocument();
    });

    it('应该支持 viewport 属性', () => {
      const { container } = render(
        <BasicNavigation viewport="md - Tablet" menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(container.querySelector('.basic-navigation--md-tablet')).toBeInTheDocument();
    });

    it('应该支持 openOverlay 属性', () => {
      const { container } = render(
        <BasicNavigation openOverlay={true} menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(container.querySelector('.basic-navigation--overlay-open')).toBeInTheDocument();
    });
  });

  describe('交互测试', () => {
    it('应该处理菜单切换', () => {
      const { container } = render(
        <BasicNavigation menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      const toggleButton = screen.getByLabelText('Expand menu');
      
      expect(container.querySelector('.basic-navigation--menu-expanded')).not.toBeInTheDocument();
      
      fireEvent.click(toggleButton);
      
      expect(container.querySelector('.basic-navigation--menu-expanded')).toBeInTheDocument();
      expect(screen.getByLabelText('Collapse menu')).toBeInTheDocument();
    });

    it('应该调用 onMenuToggle 回调', () => {
      const handleMenuToggle = vi.fn();
      
      render(
        <BasicNavigation
          menuItems={mockMenuItems}
          onMenuToggle={handleMenuToggle}
        >
          <div>Content</div>
        </BasicNavigation>
      );

      const toggleButton = screen.getByLabelText('Expand menu');
      fireEvent.click(toggleButton);

      expect(handleMenuToggle).toHaveBeenCalledTimes(1);
    });

    it('应该调用 onAvatarClick 回调', () => {
      const handleAvatarClick = vi.fn();
      
      render(
        <BasicNavigation
          menuItems={mockMenuItems}
          onAvatarClick={handleAvatarClick}
        >
          <div>Content</div>
        </BasicNavigation>
      );

      const avatarButton = screen.getByLabelText('User menu');
      fireEvent.click(avatarButton);

      expect(handleAvatarClick).toHaveBeenCalledTimes(1);
    });

    it('应该调用 onLogoClick 回调', () => {
      const handleLogoClick = vi.fn();
      
      render(
        <BasicNavigation
          menuItems={mockMenuItems}
          onLogoClick={handleLogoClick}
        >
          <div>Content</div>
        </BasicNavigation>
      );

      const logo = screen.getByText('LOGO');
      fireEvent.click(logo);

      expect(handleLogoClick).toHaveBeenCalledTimes(1);
    });

    it('应该调用菜单项的 onClick 回调', () => {
      const handleClick = vi.fn();
      const menuItemsWithClick: MenuItem[] = [
        {
          id: 'home',
          icon: 'home',
          label: 'Home',
          onClick: handleClick,
        },
      ];
      
      render(
        <BasicNavigation menuItems={menuItemsWithClick}>
          <div>Content</div>
        </BasicNavigation>
      );

      const menuItem = screen.getByText('Home');
      fireEvent.click(menuItem);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('菜单项状态测试', () => {
    it('应该显示激活状态', () => {
      render(
        <BasicNavigation menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      const activeItem = screen.getByText('Home').closest('.basic-navigation__menu-item');
      expect(activeItem).toHaveClass('basic-navigation__menu-item--active');
    });

    it('应该显示徽章数字', () => {
      render(
        <BasicNavigation menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(screen.getByText('12')).toBeInTheDocument();
    });

    it('不应该显示零徽章', () => {
      const menuItemsWithZeroBadge: MenuItem[] = [
        {
          id: 'home',
          icon: 'home',
          label: 'Home',
          badge: 0,
        },
      ];
      
      render(
        <BasicNavigation menuItems={menuItemsWithZeroBadge}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });
  });

  describe('可访问性测试', () => {
    it('应该有正确的 ARIA 标签', () => {
      render(
        <BasicNavigation menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(screen.getByLabelText('Expand menu')).toBeInTheDocument();
      expect(screen.getByLabelText('User menu')).toBeInTheDocument();
    });

    it('应该支持键盘导航', () => {
      render(
        <BasicNavigation menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      const menuItems = screen.getAllByRole('button');
      menuItems.forEach((item: HTMLElement) => {
        expect(item).toHaveAttribute('tabIndex');
      });
    });
  });

  describe('响应式测试', () => {
    it('应该应用桌面视口类名', () => {
      const { container } = render(
        <BasicNavigation viewport="lg - Desktop" menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(container.querySelector('.basic-navigation--lg-desktop')).toBeInTheDocument();
    });

    it('应该应用平板视口类名', () => {
      const { container } = render(
        <BasicNavigation viewport="md - Tablet" menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(container.querySelector('.basic-navigation--md-tablet')).toBeInTheDocument();
    });

    it('应该应用移动视口类名', () => {
      const { container } = render(
        <BasicNavigation viewport="sm - Mobile" menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(container.querySelector('.basic-navigation--sm-mobile')).toBeInTheDocument();
    });
  });

  describe('自定义类名测试', () => {
    it('应该应用自定义类名', () => {
      const { container } = render(
        <BasicNavigation className="custom-class" menuItems={mockMenuItems}>
          <div>Content</div>
        </BasicNavigation>
      );

      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('子内容测试', () => {
    it('应该渲染子内容', () => {
      render(
        <BasicNavigation menuItems={mockMenuItems}>
          <div data-testid="child-content">Child Content</div>
        </BasicNavigation>
      );

      expect(screen.getByTestId('child-content')).toBeInTheDocument();
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('应该在主内容区域渲染子内容', () => {
      const { container } = render(
        <BasicNavigation menuItems={mockMenuItems}>
          <div data-testid="child-content">Content</div>
        </BasicNavigation>
      );

      const mainContent = container.querySelector('.basic-navigation__content');
      expect(mainContent).toContainElement(screen.getByTestId('child-content'));
    });
  });
});
