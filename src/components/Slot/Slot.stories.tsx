import type { Meta, StoryObj } from '@storybook/react';
import { Slot } from './Slot';
import { Button } from '../Button';

const meta: Meta<typeof Slot> = {
  title: 'Components/Slot',
  component: Slot,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      name: 'slot (children)',
      control: false,
      description: 'Child component slot - can contain any component',
      table: {
        category: 'Slots',
        type: { summary: 'React.ReactNode' },
      },
    },
    
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Slot>;

export const Default: Story = {
  render: () => (
    <Slot>
      <Button variant="Primary">Action</Button>
    </Slot>
  ),
};

export const WithMultipleChildren: Story = {
  render: () => (
    <Slot>
      <Button variant="Primary">Save</Button>
      <Button variant="Secondary">Cancel</Button>
    </Slot>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Slot>
      <div style={{ padding: '20px', background: '#1a1a1a', borderRadius: '4px' }}>
        <h3 style={{ color: '#fff', margin: '0 0 10px 0' }}>Custom Content</h3>
        <p style={{ color: '#ccc', margin: 0 }}>Any component can be placed in a Slot</p>
      </div>
    </Slot>
  ),
};
