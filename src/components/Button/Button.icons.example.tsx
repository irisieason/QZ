/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Button with Icons Example
 * 
 * This example demonstrates how to use @irisieason/ix-icons with Button component
 */

import React, { useEffect } from 'react';
import { Button } from './Button';
import { addIcons } from '@irisieason/ix-icons';
import { 
  iconCheck,
  iconClose,
  iconAdd,
  iconEditDocument,
  iconTrashcan,
  iconDownload,
  iconUpload,
  iconSearch,
  iconRefresh,
  iconChevronRight,
  iconChevronLeft
} from '@irisieason/ix-icons/icons';

export const ButtonWithIconsExample: React.FC = () => {
  // Register icons on component mount
  useEffect(() => {
    addIcons({
      iconCheck,
      iconClose,
      iconAdd,
      iconEditDocument,
      iconTrashcan,
      iconDownload,
      iconUpload,
      iconSearch,
      iconRefresh,
      iconChevronRight,
      iconChevronLeft
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
      <h2>Buttons with ix-icons</h2>
      
      <section>
        <h3>Icon Before Text</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="Primary" showIcon icon="check"  >Confirm</Button>
          
          <Button variant="Secondary" showIcon icon="add"  >Add Item</Button>
          
          <Button variant="Danger" showIcon icon="trashcan"  >Delete</Button>

          <Button variant="Primary outline" showIcon icon="refresh"  >Refresh</Button>
        </div>
      </section>

      <section>
        <h3>Icon After Text</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="Primary" showIcon icon="download"  >Download</Button>
          
          <Button variant="Secondary" showIcon icon="upload"  >Upload</Button>
          
          <Button variant="Primary outline" showIcon icon="chevron-right"  >Next</Button>

          <Button variant="Secondary outline" showIcon icon="chevron-left"  >Back</Button>
        </div>
      </section>

      <section>
        <h3>Icon Only (Content Action)</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="🔶 Content action" showIcon icon="search"  ></Button>
          <Button variant="🔶 Content action" showIcon icon="edit-document"  ></Button>
          <Button variant="🔶 Content action" showIcon icon="refresh"  ></Button>
        </div>
      </section>

      <section>
        <h3>Ghost Buttons with Icons</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="Primary ghost" showIcon icon="edit-document"  >Edit</Button>
          
          <Button variant="Secondary ghost" showIcon icon="refresh"  >Refresh</Button>
          
          <Button variant="Danger ghost" showIcon icon="close"  >Remove</Button>
        </div>
      </section>

      <section>
        <h3>Disabled State with Icons</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="Primary" showIcon icon="check"  state="Disabled" >Disabled</Button>
          
          <Button variant="Secondary" showIcon icon="download"  state="Disabled" >Disabled</Button>
        </div>
      </section>

      <section>
        <h3>Loading State with Icons</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="Primary" showIcon icon="refresh"  state="Loading" >Saving</Button>
          
          <Button variant="Secondary" showIcon icon="upload"  state="Loading" >Uploading</Button>
        </div>
      </section>

      <div style={{ marginTop: '20px', padding: '16px', background: 'var(--color-1)', borderRadius: '4px' }}>
        <h4>Usage with @irisieason/ix-icons:</h4>
        <pre style={{ background: 'var(--color-2)', padding: '12px', borderRadius: '4px', overflow: 'auto', color: 'var(--color-std-text)' }}>
{`import { addIcons } from '@irisieason/ix-icons';
import { iconCheck, iconClose } from '@irisieason/ix-icons/icons';
import { Button } from './Button';

// Register icons (do this once in your app)
addIcons({ iconCheck, iconClose });

// Use icon names directly in Button props
<Button variant="primary" iconBefore="check">
  Confirm
</Button>

<Button variant="danger" iconAfter="close">
  Cancel
</Button>

// Icon only
<Button variant="content-action" iconBefore="search" />
`}
        </pre>
      </div>
    </div>
  );
};

export default ButtonWithIconsExample;
