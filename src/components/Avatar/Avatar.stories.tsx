import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar 组件用于显示用户头像，显示用户首字母。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // ========== Figma 视觉属性 ==========
    text: {
      control: 'text',
      description: '首字母文本（Figma 属性）',
    },
    
    // ========== 隐藏的属性（开发者需要但设计师不需要） ==========
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 默认状态
export const Default: Story = {
  args: {
    text: 'JD',
  },
};

// 不同首字母示例
export const DifferentInitials: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar text="AB" />
      <Avatar text="CD" />
      <Avatar text="EF" />
      <Avatar text="GH" />
      <Avatar text="IJ" />
    </div>
  ),
};

// 用户列表示例
export const UserList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px', backgroundColor: '#000028' }}>
      {[
        { name: 'John Doe', initials: 'JD' },
        { name: 'Jane Smith', initials: 'JS' },
        { name: 'Bob Wilson', initials: 'BW' },
        { name: 'Alice Brown', initials: 'AB' },
        { name: 'Charlie Davis', initials: 'CD' },
      ].map((user, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar text={user.initials} />
          <span style={{ color: 'white', fontSize: '14px' }}>{user.name}</span>
        </div>
      ))}
    </div>
  ),
};

// 单字母
export const SingleLetter: Story = {
  args: {
    text: 'A',
  },
};

// 三字母
export const ThreeLetters: Story = {
  args: {
    text: 'ABC',
  },
};
