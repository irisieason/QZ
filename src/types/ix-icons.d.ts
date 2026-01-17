/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * TypeScript declarations for ix-icon web component
 */

declare namespace JSX {
  interface IntrinsicElements {
    'ix-icon': {
      name?: string;
      size?: string;
      color?: string;
      style?: React.CSSProperties;
      className?: string;
    };
  }
}
