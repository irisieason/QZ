import type { Meta, StoryObj } from '@storybook/react';
import { Cardcontainer } from './Cardcontainer';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

const meta = {
  title: 'Components/Cardcontainer',
  component: Cardcontainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Abstract, empty variant of the card. Please also take a look at the Action card and Push card!',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    focused: {
      control: 'boolean',
      description: '是否显示聚焦状态',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    content: {
      control: false,
      description: '内容插槽',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    variant: {
      control: 'select',
      options: ['Outline'],
      description: '卡片变体',
      table: {
        type: { summary: '"Outline"' },
        defaultValue: { summary: '"Outline"' },
      },
    },
    state: {
      control: 'select',
      options: ['Default', 'Hover', 'Active'],
      description: '卡片状态',
      table: {
        type: { summary: '"Default" | "Hover" | "Active"' },
        defaultValue: { summary: '"Default"' },
      },
    },
    selected: {
      control: 'boolean',
      description: '是否选中',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    
    // ========== 隐藏的属性（开发者需要但设计师不需要） ==========
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
} satisfies Meta<typeof Cardcontainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// 占位符内容组件
const PlaceholderContent = () => (
  <div className="cardcontainer__placeholder">
    <div className="cardcontainer__placeholder-content">
      <ix-icon name="refresh" size="24" className="cardcontainer__placeholder-icon" />
      <div className="cardcontainer__placeholder-text">
        Use Swap Instance to replace content
      </div>
    </div>
  </div>
);

// 自定义内容示例
const CustomContent = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '16px',
    gap: '8px',
  }}>
    <ix-icon name="home" size="32" />
    <div style={{
      fontFamily: 'var(--typography-family-font-sans)',
      fontSize: '14px',
      fontWeight: 700,
      color: 'var(--color-std-text)',
      textAlign: 'center',
    }}>
      Custom Content
    </div>
    <div style={{
      fontFamily: 'var(--typography-family-font-sans)',
      fontSize: '12px',
      color: 'var(--color-soft-text)',
      textAlign: 'center',
    }}>
      Replace with your own
    </div>
  </div>
);

// 默认状态
export const Default: Story = {
  args: {
    variant: 'Outline',
    state: 'Default',
    selected: false,
    focused: false,
    content: <PlaceholderContent />,
  },
};

// Hover 状态
export const Hover: Story = {
  args: {
    variant: 'Outline',
    state: 'Hover',
    selected: false,
    focused: false,
    content: <PlaceholderContent />,
  },
};

// Active 状态
export const Active: Story = {
  args: {
    variant: 'Outline',
    state: 'Active',
    selected: false,
    focused: false,
    content: <PlaceholderContent />,
  },
};

// Selected 状态
export const Selected: Story = {
  args: {
    variant: 'Outline',
    state: 'Default',
    selected: true,
    focused: false,
    content: <PlaceholderContent />,
  },
};

// Focused 状态
export const Focused: Story = {
  args: {
    variant: 'Outline',
    state: 'Default',
    selected: false,
    focused: true,
    content: <PlaceholderContent />,
  },
};

// Selected + Focused
export const SelectedAndFocused: Story = {
  args: {
    variant: 'Outline',
    state: 'Default',
    selected: true,
    focused: true,
    content: <PlaceholderContent />,
  },
};

// 自定义内容
export const WithCustomContent: Story = {
  args: {
    variant: 'Outline',
    state: 'Default',
    selected: false,
    focused: false,
    content: <CustomContent />,
  },
};

// 所有状态展示
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--color-soft-text)' }}>Default</div>
          <Cardcontainer
            variant="Outline"
            state="Default"
            content={<PlaceholderContent />}
          />
        </div>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--color-soft-text)' }}>Hover</div>
          <Cardcontainer
            variant="Outline"
            state="Hover"
            content={<PlaceholderContent />}
          />
        </div>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--color-soft-text)' }}>Active</div>
          <Cardcontainer
            variant="Outline"
            state="Active"
            content={<PlaceholderContent />}
          />
        </div>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--color-soft-text)' }}>Selected</div>
          <Cardcontainer
            variant="Outline"
            state="Default"
            selected={true}
            content={<PlaceholderContent />}
          />
        </div>
      </div>
    </div>
  ),
};
