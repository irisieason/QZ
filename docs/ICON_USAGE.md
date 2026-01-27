# Icon Usage in qz-react

## Overview

The `qz-react` package uses `@irisieason/ix-icons` for all icons. Icons are implemented as Web Components and require registration before use.

## Automatic Icon Registration

### ✅ Component Internal Icons (Auto-registered)

**Good news!** Icons used internally by components are automatically registered when you import from `@irisieason/qz-react`.

```tsx
// Simply import the package - internal icons are auto-registered
import { CategoryFilter, ApplicationMenu } from '@irisieason/qz-react';

// Component internal icons work automatically
<CategoryFilter searchIcon={true} />     // ✅ Search icon works
<CategoryFilter clearable={true} />      // ✅ Clear icon works
<ApplicationMenu expanded={true} />      // ✅ Chevron icons work
```

### ⚠️ User-Provided Icons (Manual Registration Required)

**Important!** Icons you pass as props need to be registered manually:

```tsx
import { addIcons } from '@irisieason/qz-react';
import { iconHome, iconSettings } from '@irisieason/ix-icons/icons';

// ⚠️ You must register icons before using them
addIcons({
  home: iconHome,
  settings: iconSettings,
});

// Now you can use them
<Button icon="home" showIcon={true}>Home</Button>        // ✅ Works after registration
<MenuItem icon="settings" label="Settings" />            // ✅ Works after registration
```

**Why?** To keep the bundle size small, we only auto-register icons that components use internally. Icons you choose to use are registered on-demand.

## How It Works

When you import from `@irisieason/qz-react`, the package automatically:

1. Registers the `<ix-icon>` Web Component
2. Registers all icons used by components:
   - `search` - Used in CategoryFilter
   - `close` - Used in CategoryFilter clear button
   - `chevron-right-small` - Used in EventListItem
   - `arrow-left` - Used in ContentHeader back button

This happens in `src/icons.ts` which is imported by the main entry point.

## Icons Used by Components

### Built-in Icons (Auto-registered)

These icons are automatically available:

| Icon Name | Used In | Purpose |
|-----------|---------|---------|
| `search` | CategoryFilter | Search icon |
| `close` | CategoryFilter | Clear button |
| `chevron-right-small` | EventListItem | Navigation arrow |
| `arrow-left` | ContentHeader | Back button |

### User-Provided Icons

Some components accept icon names as props. You need to register these icons yourself:

```tsx
import { addIcons } from '@irisieason/qz-react';
import { iconHome, iconSettings } from '@irisieason/ix-icons/icons';

// Register icons you want to use
addIcons({
  home: iconHome,
  settings: iconSettings,
});

// Now you can use them
<Button icon="home" showIcon={true}>Home</Button>
<MenuItem icon="settings" label="Settings" />
```

## Registering Additional Icons

If you need icons beyond what's auto-registered:

### Option 1: Register Specific Icons (Recommended)

```tsx
import { addIcons } from '@irisieason/qz-react';
import { 
  iconHome, 
  iconSettings, 
  iconUser 
} from '@irisieason/ix-icons/icons';

addIcons({
  home: iconHome,
  settings: iconSettings,
  user: iconUser,
});
```

### Option 2: Register All Icons (Not Recommended for Production)

```tsx
import { addIcons } from '@irisieason/qz-react';
import * as allIcons from '@irisieason/ix-icons/icons';

// ⚠️ This loads 1400+ icons - only use for development/prototyping
addIcons(allIcons);
```

## Best Practices

### ✅ Do

- Let the package auto-register component icons
- Register only the icons you actually use
- Register icons at app startup (e.g., in `main.tsx` or `App.tsx`)

```tsx
// main.tsx
import { addIcons } from '@irisieason/qz-react';
import { iconHome, iconSettings } from '@irisieason/ix-icons/icons';

addIcons({
  home: iconHome,
  settings: iconSettings,
});

// Now icons work throughout your app
```

### ❌ Don't

- Don't register all icons in production (impacts bundle size)
- Don't register icons multiple times
- Don't forget to register icons before using them in components

## Troubleshooting

### Icon Not Showing

**Problem:** Icon appears as empty space or shows icon name as text

**Solution:** Register the icon before use

```tsx
import { addIcons } from '@irisieason/qz-react';
import { iconDashboard } from '@irisieason/ix-icons/icons';

addIcons({
  dashboard: iconDashboard,
});
```

### Component Icons Not Working

**Problem:** Icons in CategoryFilter, ContentHeader, etc. not showing

**Solution:** Make sure you're importing from `@irisieason/qz-react`:

```tsx
// ✅ Correct - auto-registers component icons
import { CategoryFilter } from '@irisieason/qz-react';

// ❌ Wrong - doesn't auto-register
import { CategoryFilter } from '@irisieason/qz-react/dist/index.esm.js';
```

## Available Icons

The `ix-icons` package provides 1400+ icons. Browse available icons:

- Online: https://www.npmjs.com/package/@irisieason/ix-icons
- In your project: Check `node_modules/@irisieason/ix-icons/icons/index.d.ts`

Common icon names:
- Navigation: `home`, `menu`, `arrow-left`, `arrow-right`, `chevron-*`
- Actions: `add`, `edit`, `delete`, `save`, `close`
- Status: `check`, `info`, `warning`, `error`, `success`
- UI: `search`, `settings`, `user`, `calendar`, `clock`

## Example: Complete Setup

```tsx
// main.tsx or App.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { addIcons } from '@irisieason/qz-react';
import { 
  iconHome,
  iconSettings,
  iconUser,
  iconDashboard,
} from '@irisieason/ix-icons/icons';

// Register icons used in your app
addIcons({
  home: iconHome,
  settings: iconSettings,
  user: iconUser,
  dashboard: iconDashboard,
});

// Now all components and icons work
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```tsx
// App.tsx
import { CategoryFilter, Button, MenuItem } from '@irisieason/qz-react';

function App() {
  return (
    <div>
      {/* Component icons work automatically */}
      <CategoryFilter searchIcon={true} clearable={true} />
      
      {/* User-provided icons work after registration */}
      <Button icon="home" showIcon={true}>Home</Button>
      <MenuItem icon="settings" label="Settings" />
    </div>
  );
}
```

## Summary

- ✅ Component icons are auto-registered
- ✅ User-provided icons need manual registration
- ✅ Register icons at app startup
- ✅ Only register icons you actually use
- ✅ Import from `@irisieason/qz-react` for auto-registration
