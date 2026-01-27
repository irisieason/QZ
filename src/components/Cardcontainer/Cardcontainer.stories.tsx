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
    // ========== Figma Props（可控制的属性） ==========
    focused: {
      control: 'boolean',
      description: '是否显示聚焦状态',
      table: {
        category: 'Figma Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    selected: {
      control: 'boolean',
      description: '是否选中',
      table: {
        category: 'Figma Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    
    // ========== Slot 属性（用于设计库绑定） ==========
    children: {
      name: 'contentSlot (children)',
      control: false,
      description: '**内容插槽**\n\n用于插入卡片的自定义内容。\n\n使用方式：\n```tsx\n<Cardcontainer>\n  <YourContent />\n</Cardcontainer>\n```\n\n💡 用于 Figma Code Connect 设计库绑定。',
      table: {
        category: 'Slots',
        type: { summary: 'React.ReactNode' },
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

// 小内容示例
const SmallContent = () => (
  <div style={{
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }}>
    <ix-icon name="check" size="16" />
    <span style={{ fontSize: '12px' }}>Small</span>
  </div>
);

// 大内容示例
const LargeContent = () => (
  <div style={{
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '400px',
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      <ix-icon name="info" size="32" />
      <div style={{
        fontFamily: 'var(--typography-family-font-sans)',
        fontSize: '18px',
        fontWeight: 700,
        color: 'var(--color-std-text)',
      }}>
        Large Content Card
      </div>
    </div>
    <div style={{
      fontFamily: 'var(--typography-family-font-sans)',
      fontSize: '14px',
      color: 'var(--color-soft-text)',
      lineHeight: '1.5',
    }}>
      This card container automatically adjusts its size based on the content inside. 
      You can put any content here, and the container will expand to fit it perfectly.
    </div>
    <div style={{
      display: 'flex',
      gap: '8px',
      marginTop: '8px',
    }}>
      <div style={{
        padding: '6px 12px',
        borderRadius: '4px',
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        fontSize: '12px',
      }}>
        Action 1
      </div>
      <div style={{
        padding: '6px 12px',
        borderRadius: '4px',
        border: '1px solid var(--color-soft-bdr)',
        fontSize: '12px',
      }}>
        Action 2
      </div>
    </div>
  </div>
);

// 默认状态
export const Default: Story = {
  args: {
    selected: false,
    focused: false,
  },
  render: (args) => (
    <Cardcontainer {...args}>
      <PlaceholderContent />
    </Cardcontainer>
  ),
};

// Selected 状态
export const Selected: Story = {
  args: {
    selected: true,
    focused: false,
  },
  render: (args) => (
    <Cardcontainer {...args}>
      <PlaceholderContent />
    </Cardcontainer>
  ),
};

// Focused 状态
export const Focused: Story = {
  args: {
    selected: false,
    focused: true,
  },
  render: (args) => (
    <Cardcontainer {...args}>
      <PlaceholderContent />
    </Cardcontainer>
  ),
};

// Selected + Focused
export const SelectedAndFocused: Story = {
  args: {
    selected: true,
    focused: true,
  },
  render: (args) => (
    <Cardcontainer {...args}>
      <PlaceholderContent />
    </Cardcontainer>
  ),
};

// 自定义内容
export const WithCustomContent: Story = {
  args: {
    selected: false,
    focused: false,
  },
  render: (args) => (
    <Cardcontainer {...args}>
      <CustomContent />
    </Cardcontainer>
  ),
};

// 小内容 - 容器自适应
export const WithSmallContent: Story = {
  args: {
    selected: false,
    focused: false,
  },
  render: (args) => (
    <Cardcontainer {...args}>
      <SmallContent />
    </Cardcontainer>
  ),
};

// 大内容 - 容器自适应
export const WithLargeContent: Story = {
  args: {
    selected: false,
    focused: false,
  },
  render: (args) => (
    <Cardcontainer {...args}>
      <LargeContent />
    </Cardcontainer>
  ),
};

// 不同尺寸内容对比
export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--color-soft-text)' }}>Small Content</div>
        <Cardcontainer>
          <SmallContent />
        </Cardcontainer>
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--color-soft-text)' }}>Medium Content</div>
        <Cardcontainer>
          <CustomContent />
        </Cardcontainer>
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--color-soft-text)' }}>Large Content</div>
        <Cardcontainer>
          <LargeContent />
        </Cardcontainer>
      </div>
    </div>
  ),
};

// 所有状态展示
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--color-soft-text)' }}>Default</div>
          <Cardcontainer>
            <PlaceholderContent />
          </Cardcontainer>
        </div>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--color-soft-text)' }}>Selected</div>
          <Cardcontainer selected={true}>
            <PlaceholderContent />
          </Cardcontainer>
        </div>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--color-soft-text)' }}>Focused</div>
          <Cardcontainer focused={true}>
            <PlaceholderContent />
          </Cardcontainer>
        </div>
      </div>
    </div>
  ),
};
