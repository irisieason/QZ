import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';
import { availableIcons } from './icon-list';

// Register ALL icons for Storybook (so any icon can be selected)
// Note: This loads all 1415+ icons, which is fine for Storybook but not recommended for production
addIcons(allIcons);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        component: `
按钮组件支持多种变体和状态：

**变体类型：**
- **Primary**: 主要按钮（UX 中的 Primary）
- **Primary outline**: 主要轮廓按钮（UX 中的 Secondary）
- **Primary ghost**: 主要幽灵按钮（UX 中的 Tertiary）
- **Secondary**: 次要按钮
- **Secondary outline**: 次要轮廓按钮
- **Secondary ghost**: 次要幽灵按钮
- **Danger**: 危险按钮
- **Danger outline**: 危险轮廓按钮
- **Danger ghost**: 危险幽灵按钮
- **Content action**: 内容操作按钮

**状态：**
- Default: 默认状态
- Hover: 悬停状态
- Active: 激活状态
- Loading: 加载状态

**图标：**
- 使用 \`showIcon\` 属性控制图标显示
- 使用 \`icon\` 属性指定图标名称
- 图标来自 @irisieason/ix-icons
- 支持的图标：check, close, add, edit-document, trashcan, download, upload, search, refresh, chevron-*

**文档：** [Siemens iX Button](https://ix.siemens.io/docs/controls/button)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // ========== 可控制的属性（设计师需要的） ==========
    variant: {
      control: 'select',
      options: [
        'Primary',
        'Primary outline',
        'Primary ghost',
        'Secondary',
        'Secondary outline',
        'Secondary ghost',
        'Danger',
        'Danger outline',
        'Danger ghost',
        'Content action',
      ],
      description: '按钮变体类型',
    },
    state: {
      control: 'select',
      options: ['Default', 'Hover', 'Active', 'Disabled', 'Loading'],
      description: '按钮状态',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用按钮（便捷属性，会自动设置 state="Disabled"）',
    },
    label: {
      control: 'text',
      description: '按钮文本内容',
    },
    showIcon: {
      control: 'boolean',
      description: '是否显示图标',
    },
    icon: {
      control: 'select',
      options: availableIcons,
      description: '图标名称（ix-icon name）- 共 1415 个图标可选',
    },
    focused: {
      control: 'boolean',
      description: '是否显示聚焦状态',
    },
    
    // ========== 隐藏的属性（开发者需要但设计师不需要） ==========
    onClick: { table: { disable: true } },
    type: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 默认按钮
export const Default: Story = {
  args: {
    label: 'Button',
    variant: 'Primary',
    state: 'Default',
    showIcon: false,
    focused: false,
  },
};

// Primary 变体
export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'Primary',
  },
};

export const PrimaryOutline: Story = {
  args: {
    label: 'Primary Outline',
    variant: 'Primary outline',
  },
};

export const PrimaryGhost: Story = {
  args: {
    label: 'Primary Ghost',
    variant: 'Primary ghost',
  },
};

// Secondary 变体
export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'Secondary',
  },
};

export const SecondaryOutline: Story = {
  args: {
    label: 'Secondary Outline',
    variant: 'Secondary outline',
  },
};

export const SecondaryGhost: Story = {
  args: {
    label: 'Secondary Ghost',
    variant: 'Secondary ghost',
  },
};

// Danger 变体
export const Danger: Story = {
  args: {
    label: 'Danger Button',
    variant: 'Danger',
  },
};

export const DangerOutline: Story = {
  args: {
    label: 'Danger Outline',
    variant: 'Danger outline',
  },
};

export const DangerGhost: Story = {
  args: {
    label: 'Danger Ghost',
    variant: 'Danger ghost',
  },
};

// Content Action
export const ContentAction: Story = {
  args: {
    label: 'Content Action',
    variant: '🔶 Content action',
  },
};

// 带图标的按钮
export const WithIcon: Story = {
  args: {
    label: 'Confirm',
    variant: 'Primary',
    showIcon: true,
    icon: 'check',
  },
};

export const IconExamples: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '16px',
      padding: '24px',
      background: '#0f1619'
    }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button variant="Primary" showIcon icon="check" label="Confirm" />
        <Button variant="Secondary" showIcon icon="add" label="Add" />
        <Button variant="Danger" showIcon icon="trashcan" label="Delete" />
      </div>
      
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button variant="Primary outline" showIcon icon="download" label="Download" />
        <Button variant="Secondary outline" showIcon icon="search" label="Search" />
      </div>
      
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button variant="🔶 Content action" showIcon icon="search" label="" />
        <Button variant="🔶 Content action" showIcon icon="edit-document" label="" />
        <Button variant="🔶 Content action" showIcon icon="close" label="" />
      </div>
    </div>
  ),
};

// 状态示例
export const LoadingState: Story = {
  args: {
    label: 'Loading',
    variant: 'Primary',
    state: 'Loading',
  },
};

export const DisabledState: Story = {
  args: {
    label: 'Disabled',
    variant: 'Primary',
    state: 'Disabled',
  },
};

export const FocusedState: Story = {
  args: {
    label: 'Focused',
    variant: 'Primary',
    focused: true,
  },
};

// 所有变体展示
export const AllVariants: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(5, 1fr)', 
      gap: '16px',
      padding: '24px',
      background: '#0f1619'
    }}>
      <Button variant="Primary" label="Primary" />
      <Button variant="Primary" state="Hover" label="Hover" />
      <Button variant="Primary" state="Active" label="Active" />
      <Button variant="Primary" state="Disabled" label="Disabled" />
      <Button variant="Primary" state="Loading" label="Loading" />
      
      <Button variant="Primary outline" label="Outline" />
      <Button variant="Primary outline" state="Hover" label="Hover" />
      <Button variant="Primary outline" state="Active" label="Active" />
      <Button variant="Primary outline" state="Disabled" label="Disabled" />
      <Button variant="Primary outline" state="Loading" label="Loading" />
      
      <Button variant="Primary ghost" label="Ghost" />
      <Button variant="Primary ghost" state="Hover" label="Hover" />
      <Button variant="Primary ghost" state="Active" label="Active" />
      <Button variant="Primary ghost" state="Disabled" label="Disabled" />
      <Button variant="Primary ghost" state="Loading" label="Loading" />
      
      <Button variant="Secondary" label="Secondary" />
      <Button variant="Secondary" state="Hover" label="Hover" />
      <Button variant="Secondary" state="Active" label="Active" />
      <Button variant="Secondary" state="Disabled" label="Disabled" />
      <Button variant="Secondary" state="Loading" label="Loading" />
      
      <Button variant="Secondary outline" label="Outline" />
      <Button variant="Secondary outline" state="Hover" label="Hover" />
      <Button variant="Secondary outline" state="Active" label="Active" />
      <Button variant="Secondary outline" state="Disabled" label="Disabled" />
      <Button variant="Secondary outline" state="Loading" label="Loading" />
      
      <Button variant="Secondary ghost" label="Ghost" />
      <Button variant="Secondary ghost" state="Hover" label="Hover" />
      <Button variant="Secondary ghost" state="Active" label="Active" />
      <Button variant="Secondary ghost" state="Disabled" label="Disabled" />
      <Button variant="Secondary ghost" state="Loading" label="Loading" />
      
      <Button variant="Danger" label="Danger" />
      <Button variant="Danger" state="Hover" label="Hover" />
      <Button variant="Danger" state="Active" label="Active" />
      <Button variant="Danger" state="Disabled" label="Disabled" />
      <Button variant="Danger" state="Loading" label="Loading" />
      
      <Button variant="Danger outline" label="Outline" />
      <Button variant="Danger outline" state="Hover" label="Hover" />
      <Button variant="Danger outline" state="Active" label="Active" />
      <Button variant="Danger outline" state="Disabled" label="Disabled" />
      <Button variant="Danger outline" state="Loading" label="Loading" />
      
      <Button variant="Danger ghost" label="Ghost" />
      <Button variant="Danger ghost" state="Hover" label="Hover" />
      <Button variant="Danger ghost" state="Active" label="Active" />
      <Button variant="Danger ghost" state="Disabled" label="Disabled" />
      <Button variant="Danger ghost" state="Loading" label="Loading" />
      
      <Button variant="🔶 Content action" label="Action" />
      <Button variant="🔶 Content action" state="Hover" label="Hover" />
      <Button variant="🔶 Content action" state="Active" label="Active" />
      <Button variant="🔶 Content action" state="Disabled" label="Disabled" />
      <Button variant="🔶 Content action" state="Loading" label="Loading" />
    </div>
  ),
};
