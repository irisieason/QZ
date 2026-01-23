// 可用图标列表（用于 Storybook）
export const availableIcons = [
  'chevron-right-small',
] as const;

export type AvailableIcon = typeof availableIcons[number];
