import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar 组件用于显示用户头像，支持占位符图标、用户首字母和用户照片三种模式。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Figma 定义的属性
    text: {
      control: 'text',
      description: '首字母文本',
      table: {
        category: 'Figma Props',
      },
    },
    image: {
      control: 'boolean',
      description: '是否显示图片',
      table: {
        category: 'Figma Props',
      },
    },
    initials: {
      control: 'boolean',
      description: '是否显示首字母',
      table: {
        category: 'Figma Props',
      },
    },
    // 扩展属性
    src: {
      control: 'text',
      description: '图片 URL - 扩展属性',
      table: {
        category: 'Extended Props',
      },
    },
    alt: {
      control: 'text',
      description: '图片 alt 文本 - 扩展属性',
      table: {
        category: 'Extended Props',
      },
    },
    className: {
      control: 'text',
      description: '自定义类名 - 扩展属性',
      table: {
        category: 'Extended Props',
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 占位符图标（默认）
export const Placeholder: Story = {
  args: {
    image: false,
    initials: false,
  },
};

// 首字母
export const Initials: Story = {
  args: {
    text: 'JD',
    image: false,
    initials: true,
  },
};

// 图片
export const Image: Story = {
  args: {
    image: true,
    initials: false,
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
  },
};

// 不同首字母示例
export const DifferentInitials: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar text="AB" initials={true} />
      <Avatar text="CD" initials={true} />
      <Avatar text="EF" initials={true} />
      <Avatar text="GH" initials={true} />
      <Avatar text="IJ" initials={true} />
    </div>
  ),
};

// 所有状态展示
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', backgroundColor: '#000028' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar image={false} initials={false} />
        <p style={{ marginTop: '8px', fontSize: '12px', color: 'white' }}>Placeholder</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar text="JD" image={false} initials={true} />
        <p style={{ marginTop: '8px', fontSize: '12px', color: 'white' }}>Initials</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar image={true} initials={false} src="https://i.pravatar.cc/150?img=2" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: 'white' }}>Image</p>
      </div>
    </div>
  ),
};

// 用户列表示例
export const UserList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px', backgroundColor: '#000028' }}>
      {[
        { name: 'John Doe', initials: 'JD', image: 'https://i.pravatar.cc/150?img=3' },
        { name: 'Jane Smith', initials: 'JS', image: 'https://i.pravatar.cc/150?img=4' },
        { name: 'Bob Wilson', initials: 'BW', image: null },
        { name: 'Alice Brown', initials: 'AB', image: null },
        { name: 'Unknown User', initials: null, image: null },
      ].map((user, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar
            text={user.initials || 'U'}
            image={!!user.image}
            initials={!user.image && !!user.initials}
            src={user.image || undefined}
            alt={user.name}
          />
          <span style={{ color: 'white', fontSize: '14px' }}>{user.name}</span>
        </div>
      ))}
    </div>
  ),
};
