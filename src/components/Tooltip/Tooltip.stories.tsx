import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { availableIcons } from './icon-list';

// 注册图标
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';
addIcons(allIcons);

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '提示框组件，用于显示额外的信息提示。支持标题、文本、图标和关闭按钮。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // ========== 可控制的属性（设计师需要的） ==========
    header: {
      control: 'text',
      description: '标题文本',
      table: {
        category: 'Visual',
        type: { summary: 'string' },
        defaultValue: { summary: 'My tooltip' },
      },
    },
    textlabel: {
      control: 'text',
      description: '提示文本内容',
      table: {
        category: 'Visual',
        type: { summary: 'string' },
        defaultValue: { summary: 'This is my tooltips text' },
      },
    },
    closable: {
      control: 'boolean',
      description: '是否显示关闭按钮',
      table: {
        category: 'Visual',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showIcon: {
      control: 'boolean',
      description: '是否显示图标',
      table: {
        category: 'Visual',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    icon: {
      control: 'select',
      options: availableIcons,
      description: '图标名称（来自 ix-icons）',
      table: {
        category: 'Visual',
        type: { summary: 'string' },
        defaultValue: { summary: 'about' },
      },
    },
    
    // ========== 隐藏的属性（开发者需要但设计师不需要） ==========
    onClose: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 默认提示框，包含标题、文本和图标
 */
export const Default: Story = {
  args: {
    header: 'My tooltip',
    textlabel: 'This is my tooltips text',
    closable: false,
    showIcon: true,
    icon: 'about',
    visible: true,
  },
};

/**
 * 带关闭按钮的提示框（受控模式示例）
 */
export const WithCloseButton: Story = {
  render: function WithCloseButtonStory(args) {
    const [open, setOpen] = React.useState(true);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Tooltip
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        />
        {!open && (
          <button onClick={() => setOpen(true)} style={{ padding: '8px 16px' }}>
            重新显示 Tooltip
          </button>
        )}
      </div>
    );
  },
  args: {
    header: 'My tooltip',
    textlabel: 'This is my tooltips text',
    closable: true,
    showIcon: true,
    icon: 'about',
  },
};

/**
 * 不显示图标
 */
export const WithoutIcon: Story = {
  args: {
    header: 'My tooltip',
    textlabel: 'This is my tooltips text',
    closable: false,
    showIcon: false,
  },
};

/**
 * 只有标题
 */
export const HeaderOnly: Story = {
  args: {
    header: 'Important information',
    textlabel: '',
    closable: false,
    showIcon: true,
    icon: 'info',
  },
};

/**
 * 只有文本
 */
export const TextOnly: Story = {
  args: {
    header: '',
    textlabel: 'This is a simple tooltip message',
    closable: false,
    showIcon: false,
  },
};

/**
 * 成功提示
 */
export const Success: Story = {
  args: {
    header: 'Success',
    textlabel: 'Operation completed successfully',
    closable: true,
    showIcon: true,
    icon: 'checkmark',
  },
};

/**
 * 警告提示
 */
export const Warning: Story = {
  args: {
    header: 'Warning',
    textlabel: 'Please check your input',
    closable: true,
    showIcon: true,
    icon: 'warning',
  },
};

/**
 * 错误提示
 */
export const Error: Story = {
  args: {
    header: 'Error',
    textlabel: 'Something went wrong',
    closable: true,
    showIcon: true,
    icon: 'error',
  },
};

/**
 * 信息提示
 */
export const Info: Story = {
  args: {
    header: 'Information',
    textlabel: 'Here is some helpful information',
    closable: true,
    showIcon: true,
    icon: 'info',
  },
};

/**
 * 长文本提示
 */
export const LongText: Story = {
  args: {
    header: 'Long tooltip header',
    textlabel: 'This is a longer tooltip text that provides more detailed information',
    closable: true,
    showIcon: true,
    icon: 'about',
  },
};
