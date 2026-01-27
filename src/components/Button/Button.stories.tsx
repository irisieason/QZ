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
    // ========== 可控制的属性（Figma 设计属性） ==========
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
      table: {
        category: 'Figma 属性',
      },
    },
    state: {
      control: 'select',
      options: ['Default', 'Hover', 'Active', 'Disabled', 'Loading'],
      description: '按钮状态',
      table: {
        category: 'Figma 属性',
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用按钮（便捷属性，会自动设置 state="Disabled"）',
      table: {
        category: 'Figma 属性',
      },
    },
    showIcon: {
      control: 'boolean',
      description: '是否显示图标',
      table: {
        category: 'Figma 属性',
      },
    },
    icon: {
      control: 'select',
      options: availableIcons,
      description: '图标名称（ix-icon name）',
      table: {
        category: 'Figma 属性',
      },
    },
    focused: {
      control: 'boolean',
      description: '是否显示聚焦状态',
      table: {
        category: 'Figma 属性',
      },
    },
    
    // ========== Slot 属性 ==========
    children: {
      name: 'defaultSlot (children)',
      control: 'text',
      description: '**按钮内容插槽（defaultSlot）**\n\n按钮上显示的文本或任意 React 元素。\n\n使用方式：\n```tsx\n<Button variant="Primary">Save</Button>\n```\n\n💡 这是 React 标准做法。',
      table: {
        category: 'Slots',
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Button' },
      },
    },
    
    // ========== 隐藏的属性（开发者属性） ==========
    onClick: { table: { disable: true } },
    type: { table: { disable: true } },
    className: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
    
    // ========== 隐藏误识别的内部属性 ==========
    label: { table: { disable: true } },  // CSS 类名，不是属性
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 默认按钮
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'Primary',
    state: 'Default',
    showIcon: false,
    focused: false,
  },
};

// Primary 变体
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'Primary',
  },
};

export const PrimaryOutline: Story = {
  args: {
    children: 'Primary Outline',
    variant: 'Primary outline',
  },
};

export const PrimaryGhost: Story = {
  args: {
    children: 'Primary Ghost',
    variant: 'Primary ghost',
  },
};

// Secondary 变体
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'Secondary',
  },
};

export const SecondaryOutline: Story = {
  args: {
    children: 'Secondary Outline',
    variant: 'Secondary outline',
  },
};

export const SecondaryGhost: Story = {
  args: {
    children: 'Secondary Ghost',
    variant: 'Secondary ghost',
  },
};

// Danger 变体
export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'Danger',
  },
};

export const DangerOutline: Story = {
  args: {
    children: 'Danger Outline',
    variant: 'Danger outline',
  },
};

export const DangerGhost: Story = {
  args: {
    children: 'Danger Ghost',
    variant: 'Danger ghost',
  },
};

// Content Action
export const ContentAction: Story = {
  args: {
    children: 'Content Action',
    variant: '🔶 Content action',
  },
};

// 带图标的按钮
export const WithIcon: Story = {
  args: {
    children: 'Confirm',
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
        <Button variant="Primary" showIcon icon="check">Confirm</Button>
        <Button variant="Secondary" showIcon icon="add">Add</Button>
        <Button variant="Danger" showIcon icon="trashcan">Delete</Button>
      </div>
      
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button variant="Primary outline" showIcon icon="download">Download</Button>
        <Button variant="Secondary outline" showIcon icon="search">Search</Button>
      </div>
      
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button variant="🔶 Content action" showIcon icon="search"></Button>
        <Button variant="🔶 Content action" showIcon icon="edit-document"></Button>
        <Button variant="🔶 Content action" showIcon icon="close"></Button>
      </div>
    </div>
  ),
};

// 状态示例
export const LoadingState: Story = {
  args: {
    children: 'Loading',
    variant: 'Primary',
    state: 'Loading',
  },
};

export const DisabledState: Story = {
  args: {
    children: 'Disabled',
    variant: 'Primary',
    state: 'Disabled',
  },
};

export const FocusedState: Story = {
  args: {
    children: 'Focused',
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
      <Button variant="Primary">Primary</Button>
      <Button variant="Primary" state="Hover">Hover</Button>
      <Button variant="Primary" state="Active">Active</Button>
      <Button variant="Primary" state="Disabled">Disabled</Button>
      <Button variant="Primary" state="Loading">Loading</Button>
      
      <Button variant="Primary outline">Outline</Button>
      <Button variant="Primary outline" state="Hover">Hover</Button>
      <Button variant="Primary outline" state="Active">Active</Button>
      <Button variant="Primary outline" state="Disabled">Disabled</Button>
      <Button variant="Primary outline" state="Loading">Loading</Button>
      
      <Button variant="Primary ghost">Ghost</Button>
      <Button variant="Primary ghost" state="Hover">Hover</Button>
      <Button variant="Primary ghost" state="Active">Active</Button>
      <Button variant="Primary ghost" state="Disabled">Disabled</Button>
      <Button variant="Primary ghost" state="Loading">Loading</Button>
      
      <Button variant="Secondary">Secondary</Button>
      <Button variant="Secondary" state="Hover">Hover</Button>
      <Button variant="Secondary" state="Active">Active</Button>
      <Button variant="Secondary" state="Disabled">Disabled</Button>
      <Button variant="Secondary" state="Loading">Loading</Button>
      
      <Button variant="Secondary outline">Outline</Button>
      <Button variant="Secondary outline" state="Hover">Hover</Button>
      <Button variant="Secondary outline" state="Active">Active</Button>
      <Button variant="Secondary outline" state="Disabled">Disabled</Button>
      <Button variant="Secondary outline" state="Loading">Loading</Button>
      
      <Button variant="Secondary ghost">Ghost</Button>
      <Button variant="Secondary ghost" state="Hover">Hover</Button>
      <Button variant="Secondary ghost" state="Active">Active</Button>
      <Button variant="Secondary ghost" state="Disabled">Disabled</Button>
      <Button variant="Secondary ghost" state="Loading">Loading</Button>
      
      <Button variant="Danger">Danger</Button>
      <Button variant="Danger" state="Hover">Hover</Button>
      <Button variant="Danger" state="Active">Active</Button>
      <Button variant="Danger" state="Disabled">Disabled</Button>
      <Button variant="Danger" state="Loading">Loading</Button>
      
      <Button variant="Danger outline">Outline</Button>
      <Button variant="Danger outline" state="Hover">Hover</Button>
      <Button variant="Danger outline" state="Active">Active</Button>
      <Button variant="Danger outline" state="Disabled">Disabled</Button>
      <Button variant="Danger outline" state="Loading">Loading</Button>
      
      <Button variant="Danger ghost">Ghost</Button>
      <Button variant="Danger ghost" state="Hover">Hover</Button>
      <Button variant="Danger ghost" state="Active">Active</Button>
      <Button variant="Danger ghost" state="Disabled">Disabled</Button>
      <Button variant="Danger ghost" state="Loading">Loading</Button>
      
      <Button variant="🔶 Content action">Action</Button>
      <Button variant="🔶 Content action" state="Hover">Hover</Button>
      <Button variant="🔶 Content action" state="Active">Active</Button>
      <Button variant="🔶 Content action" state="Disabled">Disabled</Button>
      <Button variant="🔶 Content action" state="Loading">Loading</Button>
    </div>
  ),
};

// ========== React 最佳实践示例 ==========

// 使用 children（推荐）
export const WithChildren: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '16px',
      padding: '24px',
      background: '#0f1619'
    }}>
      <Button variant="Primary">Save</Button>
      <Button variant="Secondary">Cancel</Button>
      <Button variant="Danger">Delete</Button>
    </div>
  ),
};

// 使用 showIcon + icon（Figma 标准）
export const WithIconFromFigma: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '16px',
      padding: '24px',
      background: '#0f1619'
    }}>
      <Button variant="Primary" showIcon icon="check">
        Confirm
      </Button>
      <Button variant="Secondary" showIcon icon="add">
        Add Item
      </Button>
      <Button variant="Danger" showIcon icon="trashcan">
        Delete
      </Button>
    </div>
  ),
};

// 复杂内容示例
export const WithComplexContent: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '16px',
      padding: '24px',
      background: '#0f1619'
    }}>
      <Button variant="Primary">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Save Changes</span>
          <span style={{ fontSize: '11px', opacity: 0.8 }}>Ctrl+S</span>
        </div>
      </Button>
      <Button variant="Secondary" showIcon icon="download">
        <span>Download <strong>PDF</strong></span>
      </Button>
    </div>
  ),
};


// 向后兼容示例（旧 API 仍然有效）
export const BackwardCompatible: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '16px',
      padding: '24px',
      background: '#0f1619'
    }}>
      <div>
        <h3 style={{ color: '#fff', marginBottom: '8px' }}>旧 API（仍然有效）</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="Primary" showIcon icon="check">Save</Button>
          <Button variant="Secondary" showIcon icon="add">Add</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ color: '#fff', marginBottom: '8px' }}>新 API（推荐）</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="Primary" startIcon={<ix-icon name="check" size="24" />}>
            Save
          </Button>
          <Button variant="Secondary" startIcon={<ix-icon name="add" size="24" />}>
            Add
          </Button>
        </div>
      </div>
    </div>
  ),
};
