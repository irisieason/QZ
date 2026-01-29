import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { AppFrame } from './AppFrame';
import { ApplicationHeader } from '../ApplicationHeader';
import { ApplicationMenu } from '../ApplicationMenu';
import { Avatar } from '../Avatar';
import { AvatarButtonMenu } from '../AvatarButtonMenu';
import { MenuItem } from '../MenuItem';
import { MenuItemList } from '../MenuItemList';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

describe('AppFrame', () => {
  it('renders with header and menu', () => {
    render(
      <AppFrame
        header={
          <ApplicationHeader appName="Test App">
            <Avatar text="JD" />
          </ApplicationHeader>
        }
        menu={
          <ApplicationMenu
            avatarSection={
              <AvatarButtonMenu email="test@example.com" role="User">
                <Avatar text="JD" />
              </AvatarButtonMenu>
            }
            menuList={
              <MenuItemList>
                <MenuItem icon="home" label="Home" />
              </MenuItemList>
            }
          />
        }
      >
        <div>Test Content</div>
      </AppFrame>
    );

    expect(screen.getByText('Test App')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with only header', () => {
    render(
      <AppFrame
        header={
          <ApplicationHeader appName="Header Only">
            <Avatar text="HO" />
          </ApplicationHeader>
        }
      >
        <div>Content</div>
      </AppFrame>
    );

    expect(screen.getByText('Header Only')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with only menu', () => {
    render(
      <AppFrame
        menu={
          <ApplicationMenu
            avatarSection={
              <AvatarButtonMenu email="test@example.com" role="User">
                <Avatar text="MO" />
              </AvatarButtonMenu>
            }
            menuList={
              <MenuItemList>
                <MenuItem icon="home" label="Home" />
              </MenuItemList>
            }
          />
        }
      >
        <div>Content</div>
      </AppFrame>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with only content', () => {
    render(
      <AppFrame>
        <div>Only Content</div>
      </AppFrame>
    );

    expect(screen.getByText('Only Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <AppFrame className="custom-class">
        <div>Content</div>
      </AppFrame>
    );

    const appFrame = container.querySelector('.app-frame');
    expect(appFrame).toHaveClass('custom-class');
  });

  it('applies custom style', () => {
    const { container } = render(
      <AppFrame style={{ backgroundColor: 'red' }}>
        <div>Content</div>
      </AppFrame>
    );

    const appFrame = container.querySelector('.app-frame');
    expect(appFrame).toHaveAttribute('style');
  });

  it('has correct accessibility attributes', () => {
    render(
      <AppFrame aria-label="Main application frame">
        <div>Content</div>
      </AppFrame>
    );

    const appFrame = screen.getByLabelText('Main application frame');
    expect(appFrame).toBeInTheDocument();
  });

  it('renders complex content', () => {
    render(
      <AppFrame
        header={
          <ApplicationHeader appName="Complex App">
            <Avatar text="CA" />
          </ApplicationHeader>
        }
        menu={
          <ApplicationMenu
            avatarSection={
              <AvatarButtonMenu email="test@example.com" role="User">
                <Avatar text="CA" />
              </AvatarButtonMenu>
            }
            menuList={
              <MenuItemList>
                <MenuItem icon="home" label="Home" />
                <MenuItem icon="settings" label="Settings" />
              </MenuItemList>
            }
          />
        }
      >
        <div>
          <h1>Title</h1>
          <p>Paragraph</p>
          <button>Button</button>
        </div>
      </AppFrame>
    );

    expect(screen.getByText('Complex App')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });
});
