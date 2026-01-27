import { ToggleButton } from '../components/ToggleButton';
import figma from '@figma/code-connect';

/**
 * Figma Code Connect for ToggleButton component
 */

figma.connect(
  ToggleButton,
  'https://www.figma.com/design/AWJRWAHO9CrLLUQJzoN4xs/iX-Components---v3.0-Original?node-id=48305-556892',
  {
    props: {
      label: figma.string('Label'),
      showIcon: figma.boolean('Show icon'),
      type: figma.enum('Type', {
        'Primary outline': 'Primary outline',
        'Secondary outline': 'Secondary outline',
        'Primary ghost': 'Primary ghost',
        'Secondary': 'Secondary',
        'Secondary ghost': 'Secondary ghost',
      }),
      disabled: figma.enum('State', {
        Disabled: true
      }),
      loading: figma.enum('State', {
        Loading: true
      }),
      toggled: figma.boolean('Toggled'),
      nestedIcon: figma.nestedProps('Icon', {
        name: figma.string('Name')
      })
    },
    example: (props) => (
      <ToggleButton
        label={props.label}
        showIcon={props.showIcon}
        icon={props.nestedIcon.name}
        type={props.type}
        disabled={props.disabled}
        toggled={props.toggled}
        loading={props.loading}
      />
    ),
  }
);
