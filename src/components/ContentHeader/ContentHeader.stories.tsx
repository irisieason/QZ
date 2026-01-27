import type { Meta, StoryObj } from '@storybook/react';
import { ContentHeader } from './ContentHeader';
import { Button } from '../Button';

const meta: Meta<typeof ContentHeader> = {
  title: 'Components/ContentHeader',
  component: ContentHeader,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    headerTitle: {
      control: 'text',
      description: 'Title text',
      table: {
        category: 'Visual Props',
      },
    },
    headerSubtitle: {
      control: 'text',
      description: 'Subtitle text',
      table: {
        category: 'Visual Props',
      },
    },
    showHeaderSubtitle: {
      control: 'boolean',
      description: 'Whether to show subtitle',
      table: {
        category: 'Visual Props',
      },
    },
    hasBackButton: {
      control: 'boolean',
      description: 'Whether to show back button',
      table: {
        category: 'Visual Props',
      },
    },
    buttonSlot: {
      control: 'boolean',
      description: 'Whether to show action buttons area',
      table: {
        category: 'Visual Props',
      },
    },
    variant: {
      control: 'select',
      options: ['Primary', 'Secondary'],
      description: 'Variant type',
      table: {
        category: 'Visual Props',
      },
    },
    
    children: {
      name: 'actionsSlot (children)',
      control: false,
      description: 'Action buttons area slot',
      table: {
        category: 'Slots',
        type: { summary: 'React.ReactNode' },
      },
    },
    
    onBackClick: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ContentHeader>;

export const Default: Story = {
  args: {
    headerTitle: 'Page Title',
    headerSubtitle: 'Page subtitle',
    showHeaderSubtitle: true,
    hasBackButton: true,
    buttonSlot: false,
    variant: 'Primary',
  },
};

export const WithActions: Story = {
  args: {
    headerTitle: 'Edit Profile',
    headerSubtitle: 'Update your information',
    showHeaderSubtitle: true,
    hasBackButton: true,
    buttonSlot: true,
    variant: 'Primary',
  },
  render: (args) => (
    <ContentHeader {...args}>
      <Button variant="Secondary">Cancel</Button>
      <Button variant="Primary">Save</Button>
    </ContentHeader>
  ),
};

export const NoSubtitle: Story = {
  args: {
    headerTitle: 'Simple Header',
    showHeaderSubtitle: false,
    hasBackButton: false,
    buttonSlot: false,
    variant: 'Primary',
  },
};

export const SecondaryVariant: Story = {
  args: {
    headerTitle: 'Secondary Header',
    headerSubtitle: 'With secondary styling',
    showHeaderSubtitle: true,
    hasBackButton: true,
    buttonSlot: false,
    variant: 'Secondary',
  },
};
