import type { Meta, StoryObj } from '@storybook/react';
import { Slot } from './Slot';
import { Button } from '../Button/Button';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

const meta: Meta<typeof Slot> = {
  title: 'Components/Slot',
  component: Slot,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Slot 是一个通用的插槽容器组件，可以作为任何组件的 children 使用。尺寸由父组件决定，自动适应父容器。',
      },
    },
  },
  argTypes: {
    // ========== Slot 属性（显示在文档中，用于设计库绑定） ==========
    children: {
      name: 'slot (children)',
      control: false,
      description: '**子组件插槽**\n\n可以包含任意组件。\n\n使用方式：\n```tsx\n<Slot>\n  <Button label="Action" />\n  <AnyComponent />\n</Slot>\n```\n\n💡 用于 Figma Code Connect 设计库绑定。',
      table: {
        category: 'Slots',
        type: { summary: 'React.ReactNode' },
      },
    },
    
    // ========== 隐藏的属性（开发者属性） ==========
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Slot>;

// 默认故事 - 带两个按钮
export const Default: Story = {
  render: () => (
    <div style={{ width: '300px', height: '50px', border: '1px dashed #666', padding: '8px' }}>
      <Slot>
        <Button label="Edit" variant="Secondary" showIcon={false} />
        <Button label="Save" variant="Primary" showIcon={false} />
      </Slot>
    </div>
  ),
};

// 单个按钮
export const SingleButton: Story = {
  render: () => (
    <div style={{ width: '200px', height: '50px', border: '1px dashed #666', padding: '8px' }}>
      <Slot>
        <Button label="Save" variant="Primary" showIcon={false} />
      </Slot>
    </div>
  ),
};

// 多个按钮
export const MultipleButtons: Story = {
  render: () => (
    <div style={{ width: '400px', height: '50px', border: '1px dashed #666', padding: '8px' }}>
      <Slot>
        <Button label="Cancel" variant="Secondary ghost" showIcon={false} />
        <Button label="Reset" variant="Danger outline" showIcon={false} />
        <Button label="Apply" variant="Primary" showIcon={false} />
      </Slot>
    </div>
  ),
};

// 带图标的按钮
export const WithIcons: Story = {
  render: () => (
    <div style={{ width: '300px', height: '50px', border: '1px dashed #666', padding: '8px' }}>
      <Slot>
        <Button label="Edit" variant="Secondary" showIcon={true} icon="edit" />
        <Button label="Save" variant="Primary" showIcon={true} icon="save" />
      </Slot>
    </div>
  ),
};

// 在 ContentHeader 中使用
export const InContentHeader: Story = {
  render: () => {
    const { ContentHeader } = require('../ContentHeader');
    
    return (
      <div style={{ width: '800px', background: '#1a1a1a', padding: '24px' }}>
        <ContentHeader
          headerTitle="User Profile"
          headerSubtitle="Manage your account settings"
          showHeaderSubtitle={true}
          hasBackButton={true}
          buttonSlot={true}
          variant="Primary"
        >
          <Slot>
            <Button label="Cancel" variant="Secondary ghost" showIcon={false} />
            <Button label="Save Changes" variant="Primary" showIcon={false} />
          </Slot>
        </ContentHeader>
      </div>
    );
  },
};

// 不同尺寸的父容器
export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p style={{ color: '#fff', marginBottom: '8px' }}>小容器 (200x40)</p>
        <div style={{ width: '200px', height: '40px', border: '1px dashed #666', padding: '4px' }}>
          <Slot>
            <Button label="Save" variant="Primary" showIcon={false} />
          </Slot>
        </div>
      </div>
      
      <div>
        <p style={{ color: '#fff', marginBottom: '8px' }}>中等容器 (300x50)</p>
        <div style={{ width: '300px', height: '50px', border: '1px dashed #666', padding: '8px' }}>
          <Slot>
            <Button label="Edit" variant="Secondary" showIcon={false} />
            <Button label="Save" variant="Primary" showIcon={false} />
          </Slot>
        </div>
      </div>
      
      <div>
        <p style={{ color: '#fff', marginBottom: '8px' }}>大容器 (500x60)</p>
        <div style={{ width: '500px', height: '60px', border: '1px dashed #666', padding: '12px' }}>
          <Slot>
            <Button label="Delete" variant="Danger" showIcon={false} />
            <Button label="Edit" variant="Secondary outline" showIcon={false} />
            <Button label="Save" variant="Primary" showIcon={false} />
          </Slot>
        </div>
      </div>
    </div>
  ),
};

// 自定义样式
export const CustomStyle: Story = {
  render: () => (
    <div style={{ width: '400px', height: '60px', border: '1px dashed #666', padding: '8px' }}>
      <Slot 
        style={{ 
          gap: '16px',
          justifyContent: 'flex-start',
          padding: '0 16px'
        }}
      >
        <Button label="Action 1" variant="Primary" showIcon={false} />
        <Button label="Action 2" variant="Secondary" showIcon={false} />
      </Slot>
    </div>
  ),
};
