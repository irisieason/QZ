/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * ix-icons initialization
 * 
 * This file registers the ix-icon web component and all icons used by components
 */

import { defineCustomElements } from '@irisieason/ix-icons/loader';
import { addIcons } from '@irisieason/ix-icons';

// Import all icons used by components
import {
  iconSearch,
  iconClose,
  iconClear,
  iconChevronRightSmall,
  iconArrowLeft,
  iconDoubleChevronLeft,
  iconDoubleChevronRight,
} from '@irisieason/ix-icons/icons';

// Register the <ix-icon> web component
defineCustomElements();

// Auto-register all icons used by components
// This ensures icons work out of the box without manual registration
addIcons({
  search: iconSearch,
  close: iconClose,
  clear: iconClear,
  'chevron-right-small': iconChevronRightSmall,
  'arrow-left': iconArrowLeft,
  'double-chevron-left': iconDoubleChevronLeft,
  'double-chevron-right': iconDoubleChevronRight,
});

// Export addIcons for registering additional icons
export { addIcons } from '@irisieason/ix-icons';

// Re-export commonly used icons for convenience
export {
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
  iconChevronLeft,
  iconChevronUp,
  iconChevronDown,
  iconInfo,
  iconWarning,
  iconError,
  iconSuccess
} from '@irisieason/ix-icons/icons';
