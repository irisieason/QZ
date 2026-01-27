import type { Meta, StoryObj } from '@storybook/react';
import { CategoryFilter } from './CategoryFilter';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

const meta = {
  title: 'Components/CategoryFilter',
  component: CategoryFilter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Category filter component for tag-picker, multi-selection filter, and faceted search functionality. Based on Figma design with full-width responsive layout.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // ========== 状态属性（互斥） ==========
    disabled: {
      control: 'boolean',
      description: '是否禁用（与 readOnly 互斥，disabled 优先）',
      table: {
        category: '状态',
      },
    },
    readOnly: {
      control: 'boolean',
      description: '是否只读（与 disabled 互斥，disabled 优先）',
      table: {
        category: '状态',
      },
    },
    
    // ========== 视觉属性 ==========
    searchIcon: {
      control: 'boolean',
      description: '是否显示搜索图标',
      table: {
        category: '视觉属性',
      },
    },
    clearable: {
      control: 'boolean',
      description: '是否显示清除按钮（输入内容后）',
      table: {
        category: '视觉属性',
      },
    },
    
    // ========== 占位符设置（仅在非禁用且非只读时显示） ==========
    placeholderText: {
      control: 'text',
      description: '占位符文本内容\n\n⚠️ 当 disabled=true 或 readOnly=true 时，组件不会显示占位符',
      table: {
        category: '占位符设置',
      },
    },
    showplaceholder: {
      control: 'boolean',
      description: '是否显示占位符\n\n⚠️ 当 disabled=true 或 readOnly=true 时，组件不会显示占位符',
      table: {
        category: '占位符设置',
      },
    },
    
    // ========== 隐藏的属性（不在 Controls 显示） ==========
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onFocus: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    onSearch: { table: { disable: true } },
    onClear: { table: { disable: true } },
    onKeyDown: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    id: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
} satisfies Meta<typeof CategoryFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========== 基础展示 Story ==========

export const Default: Story = {
  args: {
    placeholderText: 'Search',
    showplaceholder: true,
    searchIcon: true,
    clearable: true,
    disabled: false,
    readOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: '默认状态的类别过滤器，包含搜索图标和占位符文本。可以直接在输入框中输入文字进行交互。',
      },
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    placeholderText: 'Search',
    showplaceholder: true,
    searchIcon: false,
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '不显示搜索图标的版本。',
      },
    },
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholderText: 'Filter categories...',
    showplaceholder: true,
    searchIcon: true,
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '自定义占位符文本的示例。',
      },
    },
  },
};

export const HiddenPlaceholder: Story = {
  args: {
    placeholderText: 'Search',
    showplaceholder: false,
    searchIcon: true,
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '隐藏占位符的示例。这在 Figma 中用于展示已输入内容的状态。',
      },
    },
  },
};

// ========== 状态展示 Story ==========

export const ReadOnly: Story = {
  args: {
    searchIcon: true,
    readOnly: true,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '只读状态，只显示底部边框，无背景色，不可编辑。占位符不会显示。\n\n⚠️ readOnly 和 disabled 互斥，disabled 优先。',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    searchIcon: true,
    disabled: true,
    readOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: '禁用状态，使用弱色调显示，无法交互。占位符不会显示。\n\n⚠️ disabled 和 readOnly 互斥，disabled 优先。',
      },
    },
  },
};

// ========== 功能展示 Story ==========

export const WithClearButton: Story = {
  args: {
    placeholderText: 'Search',
    showplaceholder: true,
    searchIcon: true,
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '带清除按钮的示例。在输入框中输入文字后，会显示清除图标，点击可清空内容。也可以按 ESC 键清空。',
      },
    },
  },
};

export const NoClearButton: Story = {
  args: {
    placeholderText: 'Search',
    showplaceholder: true,
    searchIcon: true,
    clearable: false,
  },
  parameters: {
    docs: {
      description: {
        story: '禁用清除功能的示例。即使输入文字也不会显示清除按钮。',
      },
    },
  },
};

// ========== 响应式展示 Story ==========

export const FullWidth: Story = {
  args: {
    placeholderText: 'Search categories, tags, or filters...',
    showplaceholder: true,
    searchIcon: true,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '全宽布局示例，展示组件在不同容器宽度下的响应式行为。',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

// ========== 交互演示 Story ==========

export const InteractiveDemo: Story = {
  args: {
    placeholderText: 'Try typing and clearing...',
    showplaceholder: true,
    searchIcon: true,
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
**交互演示**：
- 鼠标悬停时边框和图标颜色会变化
- 点击聚焦时会显示聚焦轮廓
- 输入文字时会显示清除按钮
- 点击清除按钮或按 ESC 键可清空内容
- 按 Enter 键触发搜索事件（查看 Actions 面板）

**提示**：所有事件回调可以在 Actions 面板中查看。
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '40px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#fff' }}>交互反馈演示</h4>
          <p style={{ margin: '0 0 20px 0', color: '#ccc', fontSize: '14px' }}>
            • 鼠标悬停：边框和图标颜色变为动态色<br/>
            • 点击聚焦：显示聚焦轮廓，边框高亮<br/>
            • 输入文字：显示光标动画和清除按钮<br/>
            • 清除功能：点击清除图标或按 ESC 键清空内容<br/>
            • 搜索功能：按 Enter 键触发搜索（查看 Actions 面板）
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};