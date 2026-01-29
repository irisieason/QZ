import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ToggleButton } from './ToggleButton';
import { availableIcons } from './icon-list';

// 注册图标
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';
addIcons(allIcons);

const meta = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a2e' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // ========== 可控制的属性（设计师需要的） ==========
    label: {
      control: 'text',
      description: '按钮文本',
      table: {
        category: 'Visual',
        type: { summary: 'string' },
        defaultValue: { summary: 'Toggle' },
      },
    },
    showIcon: {
      control: 'boolean',
      description: '是否显示图标',
      table: {
        category: 'Visual',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      control: 'select',
      options: availableIcons,
      description: '图标名称（来自 ix-icons）',
      table: {
        category: 'Visual',
        type: { summary: 'string' },
        defaultValue: { summary: 'checkmark' },
      },
    },
    type: {
      control: 'select',
      options: [
        'Primary outline',
        'Secondary outline',
        'Primary ghost',
        'Secondary',
        'Secondary ghost',
      ],
      description: '按钮类型',
      table: {
        category: 'Visual',
        type: { summary: 'string' },
        defaultValue: { summary: 'Secondary outline' },
      },
    },
    loading: {
      control: 'boolean',
      description: '是否显示加载状态',
      table: {
        category: 'Visual',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      table: {
        category: 'Visual',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    toggled: {
      control: 'boolean',
      description: '是否切换状态（受控模式）',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
      },
    },
    defaultToggled: {
      control: 'boolean',
      description: '默认切换状态（非受控模式）',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    
    // ========== 隐藏的属性（开发者需要但设计师不需要） ==========
    onToggle: { table: { disable: true } },
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
    buttonType: { table: { disable: true } },
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========== 基础示例 ==========
export const Default: Story = {
  args: {
    label: 'Toggle',
    type: 'Secondary outline',
    showIcon: false,
    defaultToggled: false,
    disabled: false,
    loading: false,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Toggle',
    type: 'Secondary outline',
    showIcon: true,
    icon: 'checkmark',
    defaultToggled: false,
  },
};

export const ToggledState: Story = {
  args: {
    label: 'Toggle',
    type: 'Secondary outline',
    showIcon: true,
    icon: 'checkmark',
    defaultToggled: true,
  },
};

export const LoadingState: Story = {
  args: {
    label: 'Loading',
    type: 'Secondary outline',
    loading: true,
  },
};

export const DisabledState: Story = {
  args: {
    label: 'Disabled',
    type: 'Secondary outline',
    disabled: true,
  },
};

// ========== 类型变体 ==========
export const PrimaryOutline: Story = {
  args: {
    label: 'Toggle',
    type: 'Primary outline',
    showIcon: true,
    icon: 'checkmark',
  },
};

export const SecondaryOutline: Story = {
  args: {
    label: 'Toggle',
    type: 'Secondary outline',
    showIcon: true,
    icon: 'checkmark',
  },
};

export const PrimaryGhost: Story = {
  args: {
    label: 'Toggle',
    type: 'Primary ghost',
    showIcon: true,
    icon: 'checkmark',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Toggle',
    type: 'Secondary',
    showIcon: true,
    icon: 'checkmark',
  },
};

export const SecondaryGhost: Story = {
  args: {
    label: 'Toggle',
    type: 'Secondary ghost',
    showIcon: true,
    icon: 'checkmark',
  },
};

// ========== 交互示例 ==========
export const Interactive: Story = {
  args: {
    label: 'Toggle',
    type: 'Secondary outline',
    showIcon: true,
    icon: 'checkmark',
  },
  render: function InteractiveStory(args) {
    const [toggled, setToggled] = React.useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <ToggleButton
          {...args}
          toggled={toggled}
          onToggle={(newToggled) => setToggled(newToggled)}
        />
        <p style={{ color: 'white', fontSize: '14px' }}>
          状态: {toggled ? '已切换' : '未切换'}
        </p>
      </div>
    );
  },
};

// ========== 所有类型对比 ==========
export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <ToggleButton label="Primary outline" type="Primary outline" showIcon icon="checkmark" />
        <ToggleButton label="Primary outline" type="Primary outline" showIcon icon="checkmark" defaultToggled />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <ToggleButton label="Secondary outline" type="Secondary outline" showIcon icon="checkmark" />
        <ToggleButton label="Secondary outline" type="Secondary outline" showIcon icon="checkmark" defaultToggled />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <ToggleButton label="Primary ghost" type="Primary ghost" showIcon icon="checkmark" />
        <ToggleButton label="Primary ghost" type="Primary ghost" showIcon icon="checkmark" defaultToggled />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <ToggleButton label="Secondary" type="Secondary" showIcon icon="checkmark" />
        <ToggleButton label="Secondary" type="Secondary" showIcon icon="checkmark" defaultToggled />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <ToggleButton label="Secondary ghost" type="Secondary ghost" showIcon icon="checkmark" />
        <ToggleButton label="Secondary ghost" type="Secondary ghost" showIcon icon="checkmark" defaultToggled />
      </div>
    </div>
  ),
};
