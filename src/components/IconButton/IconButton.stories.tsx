import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';
import { availableIcons } from './icon-list';

// Register ALL icons for Storybook
addIcons(allIcons);

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        component: `
图标按钮组件，用于显示仅包含图标的按钮。

**类型（Type）：**
- **Primary**: 主要按钮
- **Primary outline**: 主要描边按钮
- **Primary ghost**: 主要幽灵按钮
- **Secondary**: 次要按钮
- **Secondary outline**: 次要描边按钮
- **Secondary ghost**: 次要幽灵按钮
- **Danger**: 危险按钮
- **Danger outline**: 危险描边按钮
- **Danger ghost**: 危险幽灵按钮

**状态（State）：**
- Default: 默认状态
- Hover: 悬停状态
- Active: 激活状态
- Disabled: 禁用状态
- Loading: 加载状态

**尺寸（Size）：**
- 24: 大尺寸（32x32px 容器，24px 图标）
- 16: 中尺寸（24x24px 容器，16px 图标）
- 12: 小尺寸（16x16px 容器，12px 图标）

**形状（Oval）：**
- false: 方形
- true: 圆形

**用途：** 工具栏、快捷操作、图标按钮
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
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
      ],
      description: '按钮类型/变体（来自 Figma）',
    },
    state: {
      control: 'select',
      options: ['Default', 'Hover', 'Active', 'Disabled', 'Loading'],
      description: '按钮状态（来自 Figma）',
    },
    oval: {
      control: 'boolean',
      description: '是否为圆形/椭圆形（来自 Figma）',
    },
    size: {
      control: 'select',
      options: ['24', '16', '12'],
      description: '按钮尺寸（来自 Figma）',
    },
    icon: {
      control: 'select',
      options: availableIcons,
      description: '图标名称（ix-icon name）- 共 1415+ 个图标可选',
    },
    focused: {
      control: 'boolean',
      description: '是否显示聚焦状态（来自 Figma）',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用（便捷属性）',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 默认故事
export const Default: Story = {
  args: {
    type: 'Primary',
    state: 'Default',
    oval: false,
    size: '24',
    icon: 'about',
    focused: false,
  },
};

// Primary 类型
export const Primary: Story = {
  args: {
    type: 'Primary',
    size: '24',
    icon: 'about',
  },
};

export const PrimaryOutline: Story = {
  args: {
    type: 'Primary outline',
    size: '24',
    icon: 'about',
  },
};

export const PrimaryGhost: Story = {
  args: {
    type: 'Primary ghost',
    size: '24',
    icon: 'about',
  },
};

// Secondary 类型
export const Secondary: Story = {
  args: {
    type: 'Secondary',
    size: '24',
    icon: 'about',
  },
};

export const SecondaryOutline: Story = {
  args: {
    type: 'Secondary outline',
    size: '24',
    icon: 'about',
  },
};

export const SecondaryGhost: Story = {
  args: {
    type: 'Secondary ghost',
    size: '24',
    icon: 'about',
  },
};

// Danger 类型
export const Danger: Story = {
  args: {
    type: 'Danger',
    size: '24',
    icon: 'about',
  },
};

export const DangerOutline: Story = {
  args: {
    type: 'Danger outline',
    size: '24',
    icon: 'about',
  },
};

export const DangerGhost: Story = {
  args: {
    type: 'Danger ghost',
    size: '24',
    icon: 'about',
  },
};

// 圆形变体
export const OvalPrimary: Story = {
  args: {
    type: 'Primary',
    oval: true,
    size: '24',
    icon: 'about',
  },
};

export const OvalSecondary: Story = {
  args: {
    type: 'Secondary',
    oval: true,
    size: '24',
    icon: 'about',
  },
};

export const OvalDanger: Story = {
  args: {
    type: 'Danger',
    oval: true,
    size: '24',
    icon: 'about',
  },
};

// 尺寸变体
export const Size24: Story = {
  args: {
    type: 'Primary',
    size: '24',
    icon: 'about',
  },
};

export const Size16: Story = {
  args: {
    type: 'Primary',
    size: '16',
    icon: 'about',
  },
};

export const Size12: Story = {
  args: {
    type: 'Primary',
    size: '12',
    icon: 'about',
  },
};

// 状态变体
export const StateDefault: Story = {
  args: {
    type: 'Primary',
    state: 'Default',
    size: '24',
    icon: 'about',
  },
};

export const StateHover: Story = {
  args: {
    type: 'Primary',
    state: 'Hover',
    size: '24',
    icon: 'about',
  },
};

export const StateActive: Story = {
  args: {
    type: 'Primary',
    state: 'Active',
    size: '24',
    icon: 'about',
  },
};

export const StateDisabled: Story = {
  args: {
    type: 'Primary',
    state: 'Disabled',
    size: '24',
    icon: 'about',
  },
};

export const StateLoading: Story = {
  args: {
    type: 'Primary',
    state: 'Loading',
    size: '24',
    icon: 'about',
  },
};

// 聚焦状态
export const Focused: Story = {
  args: {
    type: 'Primary',
    focused: true,
    size: '24',
    icon: 'about',
  },
};

// 所有类型组合展示
export const AllTypes: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '16px', 
      flexWrap: 'wrap', 
      alignItems: 'center',
      padding: '24px',
      background: '#0f1619'
    }}>
      <IconButton type="Primary" icon="about" />
      <IconButton type="Primary outline" icon="about" />
      <IconButton type="Primary ghost" icon="about" />
      <IconButton type="Secondary" icon="about" />
      <IconButton type="Secondary outline" icon="about" />
      <IconButton type="Secondary ghost" icon="about" />
      <IconButton type="Danger" icon="about" />
      <IconButton type="Danger outline" icon="about" />
      <IconButton type="Danger ghost" icon="about" />
    </div>
  ),
};

// 所有尺寸展示
export const AllSizes: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '16px', 
      alignItems: 'center',
      padding: '24px',
      background: '#0f1619'
    }}>
      <IconButton type="Primary" size="24" icon="about" />
      <IconButton type="Primary" size="16" icon="about" />
      <IconButton type="Primary" size="12" icon="about" />
    </div>
  ),
};

// 方形 vs 圆形
export const ShapeComparison: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '16px', 
      alignItems: 'center',
      padding: '24px',
      background: '#0f1619'
    }}>
      <div style={{ textAlign: 'center' }}>
        <IconButton type="Primary" oval={false} icon="about" />
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#fff' }}>方形</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <IconButton type="Primary" oval={true} icon="about" />
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#fff' }}>圆形</div>
      </div>
    </div>
  ),
};

// 所有状态展示
export const AllStates: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '16px', 
      alignItems: 'center',
      padding: '24px',
      background: '#0f1619'
    }}>
      <div style={{ textAlign: 'center' }}>
        <IconButton type="Primary" state="Default" icon="about" />
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#fff' }}>Default</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <IconButton type="Primary" state="Hover" icon="about" />
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#fff' }}>Hover</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <IconButton type="Primary" state="Active" icon="about" />
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#fff' }}>Active</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <IconButton type="Primary" state="Disabled" icon="about" />
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#fff' }}>Disabled</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <IconButton type="Primary" state="Loading" icon="about" />
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#fff' }}>Loading</div>
      </div>
    </div>
  ),
};
