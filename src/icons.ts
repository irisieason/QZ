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
 * This file registers the ix-icon web component and commonly used icons
 */

import { defineCustomElements } from '@irisieason/ix-icons/loader';

// Register the <ix-icon> web component
defineCustomElements();

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
