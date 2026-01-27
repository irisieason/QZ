import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';
import { availableIcons } from './icon-list';

addIcons(allIcons);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  tags: ['autodocs'],
  argTypes: {
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
      description: 'Button variant type',
      table: {
        category: 'Figma Props',
      },
    },
    state: {
      control: 'select',
      options: ['Default', 'Hover', 'Active', 'Disabled', 'Loading'],
      description: 'Button state',
      table: {
        category: 'Figma Props',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether to disable the button',
      table: {
        category: 'Figma Props',
      },
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show icon',
      table: {
        category: 'Figma Props',
      },
    },
    icon: {
      control: 'select',
      options: availableIcons,
      description: 'Icon name (from ix-icons)',
      table: {
        category: 'Figma Props',
      },
    },
    focused: {
      control: 'boolean',
      description: 'Whether to show focus state',
      table: {
        category: 'Figma Props',
      },
    },
    
    children: {
      name: 'defaultSlot (children)',
      control: 'text',
      description: 'Button content slot',
      table: {
        category: 'Slots',
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Button' },
      },
    },
    
    onClick: { table: { disable: true } },
    type: { table: { disable: true } },
    className: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'Primary',
    state: 'Default',
    showIcon: false,
    focused: false,
  },
};

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

export const ContentAction: Story = {
  args: {
    children: 'Content Action',
    variant: '🔶 Content action',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Confirm',
    variant: 'Primary',
    showIcon: true,
    icon: 'check',
  },
};

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
