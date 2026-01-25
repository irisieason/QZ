# CategoryFilter

A category filter component for tag-picker, multi-selection filter, and faceted search functionality.

## Features

- **Multiple States**: Default, Hover, ReadOnly, Disabled
- **Focus Management**: Visual focus indicators and keyboard navigation
- **Controlled/Uncontrolled**: Supports both controlled and uncontrolled usage patterns
- **Search Functionality**: Built-in search icon and Enter key handling
- **Clear Functionality**: Clear button appears when typing, supports ESC key clearing
- **Accessibility**: ARIA labels and keyboard navigation support
- **Interactive Feedback**: Hover and focus state visual feedback
- **Customizable**: Custom placeholder text, styling, and event handling

## Usage

### Basic Usage

```tsx
import { CategoryFilter } from '@/components/CategoryFilter';

function MyComponent() {
  return (
    <CategoryFilter 
      placeholderText="Search categories..."
      onSearch={(value) => console.log('Searching:', value)}
    />
  );
}
```

### Controlled Component

```tsx
import { useState } from 'react';
import { CategoryFilter } from '@/components/CategoryFilter';

function ControlledExample() {
  const [value, setValue] = useState('');

  return (
    <CategoryFilter
      value={value}
      onChange={(newValue) => setValue(newValue)}
      placeholderText="Type something..."
    />
  );
}
```

### Uncontrolled Component

```tsx
import { CategoryFilter } from '@/components/CategoryFilter';

function UncontrolledExample() {
  return (
    <CategoryFilter
      defaultValue="Initial value"
      placeholderText="Uncontrolled input"
    />
  );
}
```

### Different States

```tsx
import { CategoryFilter } from '@/components/CategoryFilter';

function StatesExample() {
  return (
    <div>
      <CategoryFilter state="Default" placeholderText="Default" />
      <CategoryFilter state="Hover" placeholderText="Hover" />
      <CategoryFilter state="ReadOnly" placeholderText="Read Only" />
      <CategoryFilter state="Disabled" placeholderText="Disabled" />
    </div>
  );
}
```

### Clear Functionality

```tsx
import { CategoryFilter } from '@/components/CategoryFilter';

function ClearExample() {
  const handleClear = () => {
    console.log('Input cleared!');
  };

  return (
    <CategoryFilter
      defaultValue="Some content"
      placeholderText="Type to see clear button..."
      clearable={true}
      onClear={handleClear}
    />
  );
}
```

**Note**: The clear button now uses the `IconButton` component for consistent styling and better interaction feedback.

### Keyboard Navigation

```tsx
import { CategoryFilter } from '@/components/CategoryFilter';

function KeyboardExample() {
  const handleSearch = (value: string) => {
    console.log('Search:', value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      console.log('Enter pressed');
    } else if (event.key === 'Escape') {
      console.log('Escape pressed - content cleared');
    }
  };

  return (
    <CategoryFilter
      placeholderText="Press Enter to search, Escape to clear"
      onSearch={handleSearch}
      onKeyDown={handleKeyDown}
      clearable={true}
    />
  );
}
```

## Props

### Figma Properties

These properties are defined in Figma and must be used exactly as specified:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholderText` | `string` | `"Search"` | Placeholder text displayed in the input |
| `showplaceholder` | `boolean` | `true` | Whether to show placeholder text |
| `searchIcon` | `boolean` | `true` | Whether to show the search icon |

### Extended Properties

These properties are added for React functionality:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readOnly` | `boolean` | `false` | Whether the input is read-only |
| `clearable` | `boolean` | `true` | Whether to show clear button when input has value |
| `value` | `string` | - | Input value (controlled component) |
| `defaultValue` | `string` | - | Default input value (uncontrolled component) |
| `onChange` | `(value: string, event: ChangeEvent) => void` | - | Value change callback |
| `onSearch` | `(value: string) => void` | - | Search callback (triggered on Enter key) |
| `onClear` | `() => void` | - | Clear callback |
| `onFocus` | `(event: FocusEvent) => void` | - | Focus event callback |
| `onBlur` | `(event: FocusEvent) => void` | - | Blur event callback |
| `onFocus` | `(event: FocusEvent) => void` | - | Focus event callback |
| `onBlur` | `(event: FocusEvent) => void` | - | Blur event callback |
| `onSearch` | `(value: string) => void` | - | Search callback (triggered on Enter) |
| `onClear` | `() => void` | - | Clear callback (triggered when clear button clicked) |
| `onKeyDown` | `(event: KeyboardEvent) => void` | - | Keyboard event callback |
| `clearable` | `boolean` | `true` | Whether to show clear button when input has content |
| `className` | `string` | - | Custom CSS class name |
| `id` | `string` | - | Input element ID |
| `aria-label` | `string` | - | Accessibility label |

## Styling

The component uses CSS custom properties (design tokens) for styling:

```css
.category-filter {
  --color-std-border: rgba(211, 236, 248, 0.55);
  --color-component-8: #00273b;
  --color-dynamic: #00eaff;
  --color-std-text: #00bddd;
  /* ... other tokens */
}
```

## States

### Default
- Standard appearance with border and background
- Search icon in standard color

### Hover
- Dynamic border color
- Highlighted search icon
- Darker background

### Focused
- Focus outline visible
- Dynamic border color
- Cursor visible when empty

### ReadOnly
- Bottom border only
- No background color
- Cannot be edited

### Disabled
- Weak color scheme
- Bottom border only
- Cannot be interacted with
- Clear button is hidden

## Clear Functionality

The clear functionality provides users with an easy way to reset the input:

### When Clear Button Appears
- Input has content (value length > 0)
- Component is not disabled or readonly
- `clearable` prop is true (default)

### Clear Triggers
- **Click**: Click the clear button (IconButton with "clear" icon)
- **Keyboard**: Press Escape key when input has content

### Clear Button Implementation
- Uses `IconButton` component with `type="Primary ghost"` and `size="16"`
- `size="16"` creates a 24x24px button with 16px icon, perfect for CategoryFilter
- Uses `ix-icon` with name "clear"
- Appears to the right of the input text
- Consistent hover and active states with other IconButtons
- Automatically hidden when input is empty
- Focuses back to input after clearing

### Cursor Behavior
- Custom cursor only appears when input is focused AND empty AND no clear button is visible
- Cursor position adjusts based on whether search icon is present
- No duplicate cursors - native browser cursor is used when typing

## Accessibility

- Supports keyboard navigation (Tab, Enter, Escape)
- ARIA labels for screen readers
- Clear button has proper aria-label
- Focus management and visual indicators
- Semantic HTML structure

## Examples

See `CategoryFilter.example.tsx` for comprehensive usage examples.

## Testing

The component includes comprehensive tests covering:
- Rendering with different props and states
- User interactions (typing, clicking, keyboard navigation)
- Event handling (onChange, onFocus, onBlur, onSearch, onClear)
- State management (controlled/uncontrolled modes)
- Clear functionality (button visibility, click behavior, ESC key)
- Accessibility features and ARIA attributes
- Edge cases and error conditions

Run tests with:
```bash
npx vitest run CategoryFilter
```

Current test coverage: **25 tests** covering all functionality including the new clear feature.