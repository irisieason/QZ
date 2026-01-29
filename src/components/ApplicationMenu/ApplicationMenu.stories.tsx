import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ApplicationMenu } from './ApplicationMenu';
import { AvatarButtonMenu } from '../AvatarButtonMenu';
import { MenuItemList } from '../MenuItemList';
import { MenuItem } from '../MenuItem';
import { Avatar } from '../Avatar';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

const meta: Meta<typeof ApplicationMenu> = {
  title: 'Components/ApplicationMenu',
  component: ApplicationMenu,
  parameters: {
    layout: 'fullscreen', // Menu 组件确实需要 fullscreen，因为它是侧边栏组件
  },
  tags: ['autodocs'],
  argTypes: {
    expanded: {
      control: 'boolean',
      description: '是否展开菜单',
      table: {
        category: 'Visual Props',
      },
    },
    avatar: {
      control: 'boolean',
      description: '是否显示头像区域',
      table: {
        category: 'Visual Props',
        defaultValue: { summary: 'true' },
      },
    },
    // ========== Slot 属性（用于设计库绑定） ==========
    toggleButton: {
      control: false,
      description: '展开/折叠按钮插槽（Slot）\n\n用于自定义切换按钮\n用于设计库绑定',
      table: {
        category: 'Slots',
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '默认切换按钮' },
      },
    },
    avatarSection: {
      control: false,
      description: '用户头像区域插槽（Slot）\n\n插入组件：AvatarButtonMenu\n用于设计库绑定',
      table: {
        category: 'Slots',
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<AvatarButtonMenu><Avatar /></AvatarButtonMenu>' },
      },
    },
    menuList: {
      control: false,
      description: '菜单项列表插槽（Slot）\n\n插入组件：MenuItemList\n用于设计库绑定',
      table: {
        category: 'Slots',
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<MenuItemList><MenuItem />...</MenuItemList>' },
      },
    },
    
    // ========== 隐藏的属性（开发者需要但设计师不需要） ==========
    onToggleExpand: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ApplicationMenu>;

// 展开状态（可交互）
export const Expanded: Story = {
  args: {
    expanded: true,
    avatar: true,
    avatarSection: '<AvatarButtonMenu><Avatar text="JD" /></AvatarButtonMenu>',
    menuList: '<MenuItemList expanded={expanded}><MenuItem icon="home" label="Home" />...</MenuItemList>',
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expanded, setExpanded] = React.useState(true);

    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000028' }}>
        <ApplicationMenu
          expanded={expanded}
          avatar={args.avatar}
          onToggleExpand={() => setExpanded(!expanded)}
          avatarSection={
            <AvatarButtonMenu expand={expanded}>
              <Avatar text="JD" />
            </AvatarButtonMenu>
          }
          menuList={
            <MenuItemList expanded={expanded} defaultSelectedIndex={0}>
              <MenuItem icon="home" label="Home" />
              <MenuItem icon="alarm-bell" label="Event list" notification={true} notificationCount={12} />
              <MenuItem icon="dashboard" label="Dashboard" />
              <MenuItem icon="maintenance" label="Maintenance" />
              <MenuItem icon="calendar" label="Scheduler" />
              <MenuItem icon="user-management" label="User management" />
            </MenuItemList>
          }
        />
      </div>
    );
  },
};

// 折叠状态（可交互）
export const Collapsed: Story = {
  args: {
    expanded: false,
    avatar: true,
    avatarSection: '<AvatarButtonMenu expand={false}><Avatar text="JD" /></AvatarButtonMenu>',
    menuList: '<MenuItemList expanded={false}><MenuItem icon="home" label="Home" />...</MenuItemList>',
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expanded, setExpanded] = React.useState(false);

    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000028' }}>
        <ApplicationMenu
          expanded={expanded}
          avatar={args.avatar}
          onToggleExpand={() => setExpanded(!expanded)}
          avatarSection={
            <AvatarButtonMenu expand={expanded}>
              <Avatar text="JD" />
            </AvatarButtonMenu>
          }
          menuList={
            <MenuItemList expanded={expanded} defaultSelectedIndex={0}>
              <MenuItem icon="home" label="Home" />
              <MenuItem icon="alarm-bell" label="Event list" notification={true} notificationCount={12} />
              <MenuItem icon="dashboard" label="Dashboard" />
              <MenuItem icon="maintenance" label="Maintenance" />
              <MenuItem icon="calendar" label="Scheduler" />
              <MenuItem icon="user-management" label="User management" />
            </MenuItemList>
          }
        />
      </div>
    );
  },
};

// 布局验证示例（展开/收起时的布局行为）
export const LayoutValidation: Story = {
  args: {
    avatar: true,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expanded, setExpanded] = React.useState(false); // 默认收起

    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000028' }}>
        <ApplicationMenu
          expanded={expanded}
          avatar={args.avatar}
          onToggleExpand={() => setExpanded(!expanded)}
          avatarSection={
            <AvatarButtonMenu expand={expanded}>
              <Avatar text="JD" />
            </AvatarButtonMenu>
          }
          menuList={
            <MenuItemList expanded={expanded} defaultSelectedIndex={0}>
              <MenuItem icon="home" label="Home" />
              <MenuItem icon="alarm-bell" label="Event list" notification={true} notificationCount={12} />
              <MenuItem icon="dashboard" label="Dashboard" />
              <MenuItem icon="maintenance" label="Maintenance" />
              <MenuItem icon="calendar" label="Scheduler" />
              <MenuItem icon="user-management" label="User management" />
            </MenuItemList>
          }
        />
        
        {/* 色块区域 - 用于验证布局 */}
        <div style={{ 
          flex: 1, 
          padding: '40px', 
          backgroundColor: '#1a1a3e',
          color: 'white',
          minWidth: 0, // 防止 flex 子元素溢出
        }}>
          <div style={{
            padding: '24px',
            backgroundColor: '#ff6b6b',
            borderRadius: '8px',
            marginBottom: '24px',
          }}>
            <h2 style={{ margin: '0 0 16px 0', color: 'white' }}>🔴 红色验证区域</h2>
            <p style={{ margin: 0, color: 'white', fontSize: '14px' }}>
              这个红色区域用于验证菜单的布局行为
            </p>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: '#4ecdc4',
            borderRadius: '8px',
            marginBottom: '24px',
          }}>
            <h2 style={{ margin: '0 0 16px 0', color: 'white' }}>🟢 青色验证区域</h2>
            <p style={{ margin: 0, color: 'white', fontSize: '14px' }}>
              当前菜单状态: <strong>{expanded ? '展开 (256px)' : '收起 (52px)'}</strong>
            </p>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: '#ffd93d',
            borderRadius: '8px',
            marginBottom: '24px',
          }}>
            <h2 style={{ margin: '0 0 16px 0', color: '#000' }}>🟡 黄色验证区域</h2>
            <div style={{ color: '#000', fontSize: '14px' }}>
              <p style={{ margin: '0 0 12px 0' }}><strong>预期行为：</strong></p>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li><strong>收起时 (默认)</strong>: 菜单占据 52px，色块区域在右侧正常显示，不被遮挡</li>
                <li><strong>展开时</strong>: 菜单浮动覆盖，占据 256px，色块区域被部分遮挡（这是正确的）</li>
              </ul>
            </div>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: '#a29bfe',
            borderRadius: '8px',
          }}>
            <h2 style={{ margin: '0 0 16px 0', color: 'white' }}>🟣 紫色验证区域</h2>
            <div style={{ color: 'white', fontSize: '14px' }}>
              <p style={{ margin: '0 0 12px 0' }}><strong>测试步骤：</strong></p>
              <ol style={{ margin: 0, paddingLeft: '20px' }}>
                <li>初始状态：菜单收起，色块完全可见 ✓</li>
                <li>点击展开按钮：菜单展开并浮动覆盖，色块被部分遮挡 ✓</li>
                <li>点击收起按钮：菜单收起，色块恢复完全可见 ✓</li>
              </ol>
            </div>
          </div>

          <div style={{
            marginTop: '32px',
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            border: '2px solid #0cc',
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#0cc' }}>💡 布局说明</h3>
            <p style={{ margin: '0 0 8px 0', color: '#9d9d96', fontSize: '14px' }}>
              <strong style={{ color: 'white' }}>收起状态 (position: relative)</strong>
            </p>
            <p style={{ margin: '0 0 16px 0', color: '#9d9d96', fontSize: '13px', paddingLeft: '16px' }}>
              • 菜单在正常文档流中，占据 52px 宽度<br/>
              • 内容区域自动排列在菜单右侧<br/>
              • 不遮挡任何内容
            </p>
            <p style={{ margin: '0 0 8px 0', color: '#9d9d96', fontSize: '14px' }}>
              <strong style={{ color: 'white' }}>展开状态 (position: fixed)</strong>
            </p>
            <p style={{ margin: 0, color: '#9d9d96', fontSize: '13px', paddingLeft: '16px' }}>
              • 菜单浮动定位，固定在左侧<br/>
              • 占据 256px 宽度，覆盖在内容上层<br/>
              • z-index: 1000，确保在最上层
            </p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
布局验证示例，用于测试 ApplicationMenu 的展开/收起行为：

**收起状态 (默认)**：
- 菜单使用 \`position: relative\`，在正常文档流中
- 占据 52px 宽度
- 右侧色块区域完全可见，不被遮挡

**展开状态**：
- 菜单使用 \`position: fixed\`，浮动定位
- 占据 256px 宽度，覆盖在内容上层
- 右侧色块区域被部分遮挡（这是预期行为）

点击左上角的展开/收起按钮来测试布局行为。
        `,
      },
    },
  },
};

// 交互式示例（展示 MenuItemList 的排他选择功能）
export const Interactive: Story = {
  args: {
    avatar: true,
    avatarSection: '<AvatarButtonMenu expand={expanded}><Avatar text="JD" /></AvatarButtonMenu>',
    menuList: '<MenuItemList expanded={expanded} selectedIndex={selectedIndex} onSelectionChange={setSelectedIndex}><MenuItem icon="home" label="Home" />...</MenuItemList>',
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expanded, setExpanded] = React.useState(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const menuItems = [
      { icon: 'home', label: 'Home' },
      { icon: 'alarm-bell', label: 'Event list', notification: true, count: 12 },
      { icon: 'dashboard', label: 'Dashboard' },
      { icon: 'maintenance', label: 'Maintenance' },
      { icon: 'calendar', label: 'Scheduler' },
      { icon: 'user-management', label: 'User management' },
    ];

    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000028' }}>
        <ApplicationMenu
          expanded={expanded}
          avatar={args.avatar}
          onToggleExpand={() => setExpanded(!expanded)}
          avatarSection={
            <AvatarButtonMenu expand={expanded}>
              <Avatar text="JD" />
            </AvatarButtonMenu>
          }
          menuList={
            <MenuItemList 
              expanded={expanded}
              selectedIndex={selectedIndex}
              onSelectionChange={setSelectedIndex}
            >
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  notification={item.notification}
                  notificationCount={item.count}
                />
              ))}
            </MenuItemList>
          }
        />
        <div style={{ flex: 1, padding: '40px', color: 'white' }}>
          <h1>交互式示例</h1>
          <div style={{ marginBottom: '24px' }}>
            <p style={{ color: '#9d9d96', marginBottom: '8px' }}>
              菜单状态: <strong style={{ color: 'white' }}>{expanded ? '展开' : '折叠'}</strong>
            </p>
            <p style={{ color: '#9d9d96', marginBottom: '8px' }}>
              当前选中: <strong style={{ color: 'white' }}>{menuItems[selectedIndex]?.label || '无'}</strong>
            </p>
          </div>
          <p style={{ color: '#9d9d96', marginTop: '16px', marginBottom: '12px' }}>
            <strong style={{ color: '#0cc' }}>✨ 自动交互功能：</strong>
          </p>
          <ul style={{ color: '#9d9d96', paddingLeft: '20px', marginBottom: '24px' }}>
            <li><strong>点击左上角按钮</strong> → 自动展开/折叠菜单</li>
            <li><strong>点击任意菜单项</strong> → MenuItemList 自动排他选择（单选）</li>
            <li><strong>点击用户头像</strong> → 打开下拉菜单</li>
            <li><strong>折叠时悬停菜单项</strong> → 显示 tooltip</li>
          </ul>
          <div style={{ 
            padding: '16px',
            backgroundColor: 'rgba(0, 204, 204, 0.1)',
            borderLeft: '4px solid #0cc',
            borderRadius: '4px',
          }}>
            <p style={{ color: '#9d9d96', margin: 0 }}>
              💡 使用 <strong style={{ color: 'white' }}>MenuItemList</strong> 组件自动管理菜单项的排他选择。
              MenuItemList 会自动将 <code style={{ color: '#0cc' }}>expanded</code> 和 <code style={{ color: '#0cc' }}>selected</code> 
              状态传递给所有子 MenuItem，无需手动管理。
            </p>
          </div>
        </div>
      </div>
    );
  },
};

// 所有状态展示
export const AllStates: Story = {
  args: {
    avatar: true,
    avatarSection: '<AvatarButtonMenu expand={expanded}><Avatar text="JD" /></AvatarButtonMenu>',
    menuList: '<MenuItemList expanded={expanded}><MenuItem icon="home" label="Home" />...</MenuItemList>',
  },
  render: (args) => {
    return (
      <div style={{ display: 'flex', gap: '32px', padding: '40px', backgroundColor: '#000028', minHeight: '100vh' }}>
        <div>
          <h3 style={{ color: 'white', marginBottom: '16px' }}>展开状态</h3>
          <ApplicationMenu
            expanded={true}
            avatar={args.avatar}
            avatarSection={
              <AvatarButtonMenu expand={true}>
                <Avatar text="JD" />
              </AvatarButtonMenu>
            }
            menuList={
              <MenuItemList expanded={true} defaultSelectedIndex={0}>
                <MenuItem icon="home" label="Home" />
                <MenuItem icon="dashboard" label="Dashboard" />
                <MenuItem icon="cogwheel" label="Settings" />
              </MenuItemList>
            }
          />
        </div>
        <div>
          <h3 style={{ color: 'white', marginBottom: '16px' }}>折叠状态</h3>
          <ApplicationMenu
            expanded={false}
            avatar={args.avatar}
            avatarSection={
              <AvatarButtonMenu expand={false}>
                <Avatar text="JD" />
              </AvatarButtonMenu>
            }
            menuList={
              <MenuItemList expanded={false} defaultSelectedIndex={0}>
                <MenuItem icon="home" label="Home" />
                <MenuItem icon="dashboard" label="Dashboard" />
                <MenuItem icon="cogwheel" label="Settings" />
              </MenuItemList>
            }
          />
        </div>
      </div>
    );
  },
};

// Slot 内容展示
export const SlotContent: Story = {
  args: {
    expanded: true,
    avatar: true,
    avatarSection: '<AvatarButtonMenu><Avatar text="JD" /></AvatarButtonMenu>',
    menuList: '<MenuItemList expanded={true}><MenuItem icon="home" label="Home" />...</MenuItemList>',
  },
  render: (args) => {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000028' }}>
        <ApplicationMenu
          expanded={true}
          avatar={args.avatar}
          avatarSection={
            <AvatarButtonMenu expand={true}>
              <Avatar text="JD" />
            </AvatarButtonMenu>
          }
          menuList={
            <MenuItemList expanded={true} defaultSelectedIndex={0}>
              <MenuItem icon="home" label="Home" />
              <MenuItem icon="alarm-bell" label="Event list" notification={true} notificationCount={12} />
              <MenuItem icon="dashboard" label="Dashboard" />
              <MenuItem icon="maintenance" label="Maintenance" />
              <MenuItem icon="calendar" label="Scheduler" />
              <MenuItem icon="user-management" label="User management" />
            </MenuItemList>
          }
        />
        <div style={{ flex: 1, padding: '40px', color: 'white' }}>
          <h1 style={{ marginBottom: '24px' }}>Slot 内容说明</h1>
        
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ marginBottom: '16px', color: '#0cc' }}>组件结构</h2>
            <p style={{ color: '#9d9d96', marginBottom: '12px' }}>
              ApplicationMenu 使用 Slot 模式接收子组件。
            </p>
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.05)', 
              padding: '16px', 
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#0cc',
            }}>
              <div>{'<ApplicationMenu expanded={true}>'}</div>
              <div style={{ paddingLeft: '20px', marginTop: '8px', color: '#9d9d96' }}>
                {'// 1. AvatarButtonMenu（用户头像区域）'}
              </div>
              <div style={{ paddingLeft: '20px' }}>
                {'<AvatarButtonMenu expand={true}>'}
              </div>
              <div style={{ paddingLeft: '40px' }}>
                {'<Avatar text="JD" />'}
              </div>
              <div style={{ paddingLeft: '20px' }}>
                {'</AvatarButtonMenu>'}
              </div>
              <div style={{ paddingLeft: '20px', marginTop: '8px', color: '#9d9d96' }}>
                {'// 2. MenuItemList（菜单项容器）'}
              </div>
              <div style={{ paddingLeft: '20px' }}>
                {'<MenuItemList expanded={true}>'}
              </div>
              <div style={{ paddingLeft: '40px' }}>
                {'<MenuItem icon="home" label="Home" />'}
              </div>
              <div style={{ paddingLeft: '40px' }}>
                {'<MenuItem icon="alarm-bell" label="Event list" />'}
              </div>
              <div style={{ paddingLeft: '40px' }}>
                {'<MenuItem icon="dashboard" label="Dashboard" />'}
              </div>
              <div style={{ paddingLeft: '40px', color: '#9d9d96' }}>
                {'// ... 更多 MenuItem'}
              </div>
              <div style={{ paddingLeft: '20px' }}>
                {'</MenuItemList>'}
              </div>
              <div>{'</ApplicationMenu>'}</div>
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ marginBottom: '16px', color: '#0cc' }}>组件列表</h2>
            <ul style={{ color: '#9d9d96', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: 'white' }}>AvatarButtonMenu</strong> - 用户头像和下拉菜单
                <div style={{ fontSize: '13px', marginTop: '4px' }}>
                  包含 Avatar 组件作为子组件
                </div>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: 'white' }}>MenuItemList</strong> - 菜单项容器
                <div style={{ fontSize: '13px', marginTop: '4px' }}>
                  自动管理展开/收起和排他选择（单选）
                </div>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: 'white' }}>MenuItem × N</strong> - 导航菜单项
                <div style={{ fontSize: '13px', marginTop: '4px' }}>
                  数量不限，由 MenuItemList 统一管理
                </div>
              </li>
            </ul>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ marginBottom: '16px', color: '#0cc' }}>MenuItemList 优势</h2>
            <ul style={{ color: '#9d9d96', paddingLeft: '20px' }}>
              <li>✅ 自动排他选择（单选）- 同时只能有一个被选中</li>
              <li>✅ 统一管理展开/收起状态</li>
              <li>✅ 不限制菜单项数量</li>
              <li>✅ 支持受控/非受控模式</li>
              <li>✅ 简化代码，无需手动管理 selected 和 expanded</li>
            </ul>
          </div>

          <div style={{ 
            padding: '16px',
            backgroundColor: 'rgba(0, 204, 204, 0.1)',
            borderLeft: '4px solid #0cc',
            borderRadius: '4px',
          }}>
            <h3 style={{ marginBottom: '8px', color: '#0cc' }}>
              💡 提示
            </h3>
            <p style={{ color: '#9d9d96', margin: 0 }}>
              使用 MenuItemList 替代多个独立的 MenuItem，可以自动实现排他选择和统一的展开/收起控制。
              这是推荐的最佳实践。
            </p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '展示 ApplicationMenu 使用 MenuItemList 的 Slot 内容结构。',
      },
    },
  },
};

// 不显示头像
export const WithoutAvatar: Story = {
  args: {
    expanded: true,
    avatar: false,
    menuList: '<MenuItemList expanded={true}><MenuItem icon="home" label="Home" />...</MenuItemList>',
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expanded, setExpanded] = React.useState(true);

    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000028' }}>
        <ApplicationMenu
          expanded={expanded}
          avatar={args.avatar}
          onToggleExpand={() => setExpanded(!expanded)}
          menuList={
            <MenuItemList expanded={expanded} defaultSelectedIndex={0}>
              <MenuItem icon="home" label="Home" />
              <MenuItem icon="alarm-bell" label="Event list" notification={true} notificationCount={12} />
              <MenuItem icon="dashboard" label="Dashboard" />
              <MenuItem icon="maintenance" label="Maintenance" />
              <MenuItem icon="calendar" label="Scheduler" />
              <MenuItem icon="user-management" label="User management" />
            </MenuItemList>
          }
        />
        <div style={{ flex: 1, padding: '40px', color: 'white' }}>
          <h1>不显示头像</h1>
          <p style={{ color: '#9d9d96', marginTop: '16px' }}>
            通过设置 <code style={{ color: '#0cc' }}>avatar={'{false}'}</code> 可以隐藏头像区域。
          </p>
          <p style={{ color: '#9d9d96', marginTop: '12px' }}>
            这在某些场景下很有用，例如：
          </p>
          <ul style={{ color: '#9d9d96', paddingLeft: '20px', marginTop: '8px' }}>
            <li>公共终端或共享设备</li>
            <li>不需要用户身份的应用</li>
            <li>简化的导航菜单</li>
          </ul>
        </div>
      </div>
    );
  },
};

// Avatar 控制对比
export const AvatarComparison: Story = {
  args: {
    expanded: true,
    avatar: true,
    avatarSection: '<AvatarButtonMenu expand={expanded}><Avatar text="JD" /></AvatarButtonMenu>',
    menuList: '<MenuItemList expanded={expanded}><MenuItem icon="home" label="Home" />...</MenuItemList>',
  },
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '32px', padding: '40px', backgroundColor: '#000028', minHeight: '100vh' }}>
        <div>
          <h3 style={{ color: 'white', marginBottom: '16px' }}>显示头像 (avatar=true)</h3>
          <ApplicationMenu
            expanded={true}
            avatar={true}
            avatarSection={
              <AvatarButtonMenu expand={true}>
                <Avatar text="JD" />
              </AvatarButtonMenu>
            }
            menuList={
              <MenuItemList expanded={true} defaultSelectedIndex={0}>
                <MenuItem icon="home" label="Home" />
                <MenuItem icon="dashboard" label="Dashboard" />
                <MenuItem icon="cogwheel" label="Settings" />
              </MenuItemList>
            }
          />
        </div>
        <div>
          <h3 style={{ color: 'white', marginBottom: '16px' }}>隐藏头像 (avatar=false)</h3>
          <ApplicationMenu
            expanded={true}
            avatar={false}
            menuList={
              <MenuItemList expanded={true} defaultSelectedIndex={0}>
                <MenuItem icon="home" label="Home" />
                <MenuItem icon="dashboard" label="Dashboard" />
                <MenuItem icon="cogwheel" label="Settings" />
              </MenuItemList>
            }
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '对比显示和隐藏头像的效果。通过 avatar 属性控制头像区域的显示。',
      },
    },
  },
};
