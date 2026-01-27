# Icon Auto-Registration Test

## How to Test

Create a simple test project to verify icons work automatically:

### 1. Create Test Project

```bash
npm create vite@latest test-qz-react -- --template react-ts
cd test-qz-react
npm install
```

### 2. Install qz-react

```bash
npm install @irisieason/qz-react@1.0.5
```

### 3. Test Component Icons

Replace `src/App.tsx` with:

```tsx
import { CategoryFilter } from '@irisieason/qz-react';
import '@irisieason/qz-react/dist/style.css';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Icon Auto-Registration Test</h1>
      
      {/* Test 1: Search icon should show automatically */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Test 1: Search Icon (Auto-registered)</h2>
        <CategoryFilter 
          searchIcon={true} 
          placeholderText="Search with icon..."
        />
      </div>
      
      {/* Test 2: Clear button icon should show when typing */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Test 2: Clear Icon (Auto-registered)</h2>
        <CategoryFilter 
          clearable={true}
          placeholderText="Type to see clear button..."
        />
        <p style={{ fontSize: '12px', color: '#666' }}>
          Type something to see the clear button with icon
        </p>
      </div>
    </div>
  );
}

export default App;
```

### 4. Run Test

```bash
npm run dev
```

### Expected Results

✅ **Search icon** should display in the first CategoryFilter
✅ **Clear icon** (X) should display when you type in the second CategoryFilter
✅ No console errors about missing icons
✅ No need to manually call `addIcons()`

### If Icons Don't Show

Check these:

1. **Verify import path:**
   ```tsx
   // ✅ Correct
   import { CategoryFilter } from '@irisieason/qz-react';
   
   // ❌ Wrong - bypasses auto-registration
   import { CategoryFilter } from '@irisieason/qz-react/dist/index.esm.js';
   ```

2. **Check CSS is imported:**
   ```tsx
   import '@irisieason/qz-react/dist/style.css';
   ```

3. **Check browser console** for errors

4. **Verify package version:**
   ```bash
   npm list @irisieason/qz-react
   # Should show 1.0.5 or higher
   ```

## What Gets Auto-Registered

When you import from `@irisieason/qz-react`, these icons are automatically registered:

- `search` - CategoryFilter search icon
- `close` - CategoryFilter clear button
- `chevron-right-small` - EventListItem arrow
- `arrow-left` - ContentHeader back button

## User-Provided Icons

Icons you pass as props still need manual registration:

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

## Troubleshooting

### Icons Show as Empty Space

**Cause:** Icons not registered

**Solution:** Make sure you're importing from the main package entry:
```tsx
import { CategoryFilter } from '@irisieason/qz-react';
```

### Icons Show as Text

**Cause:** Web Component not loaded

**Solution:** This should not happen with v1.0.5+. If it does, check:
1. Package version is 1.0.5 or higher
2. No conflicting ix-icons imports
3. Browser console for errors

### Some Icons Work, Others Don't

**Cause:** User-provided icons not registered

**Solution:** Register icons you pass as props:
```tsx
import { addIcons } from '@irisieason/qz-react';
import { iconDashboard } from '@irisieason/ix-icons/icons';

addIcons({ dashboard: iconDashboard });
```

## Success Criteria

✅ CategoryFilter search icon displays without manual registration
✅ CategoryFilter clear button icon displays without manual registration
✅ No console errors
✅ Icons render correctly in all browsers
✅ Bundle size is reasonable (only 4 icons auto-registered)
