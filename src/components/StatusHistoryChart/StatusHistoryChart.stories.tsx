import type { Meta, StoryObj } from '@storybook/react';
import { StatusHistoryChart } from './StatusHistoryChart';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

const meta = {
  title: 'Components/StatusHistoryChart',
  component: StatusHistoryChart,
  parameters: {
    layout: 'fullscreen', // 改为 fullscreen，让组件填充整个浏览器窗口
  },
  tags: ['autodocs'],
  argTypes: {
    // Figma 属性
    chartTitle: {
      control: 'text',
      description: '图表标题（Figma 属性）',
      table: {
        category: 'Figma 属性',
        defaultValue: { summary: 'Status history' },
      },
    },
    
    // ========== 隐藏的属性（开发者需要但设计师不需要） ==========
    dataSeries: { table: { disable: true } },
    xAxisLabels: { table: { disable: true } },
    yMin: { table: { disable: true } },
    yMax: { table: { disable: true } },
    yTickCount: { table: { disable: true } },
    onPrevClick: { table: { disable: true } },
    onNextClick: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof StatusHistoryChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chartTitle: 'Status history',
    dataSeries: [
      {
        id: 'maintenance',
        name: 'Maintenance',
        type: 'maintenance',
        data: [
          { timestamp: 0, value: 0 },
          { timestamp: 1, value: 0 },
          { timestamp: 2, value: -60 },
          { timestamp: 3, value: -40 },
          { timestamp: 4, value: -10 },
          { timestamp: 5, value: 0 },
        ],
      },
      {
        id: 'errors',
        name: 'Errors',
        type: 'errors',
        data: [
          { timestamp: 0, value: 0 },
          { timestamp: 1, value: 10 },
          { timestamp: 2, value: -10 },
          { timestamp: 3, value: -20 },
          { timestamp: 4, value: -10 },
          { timestamp: 5, value: -10 },
        ],
      },
      {
        id: 'offline',
        name: 'Offline',
        type: 'offline',
        data: [
          { timestamp: 0, value: -20 },
          { timestamp: 1, value: -40 },
          { timestamp: 2, value: -20 },
          { timestamp: 3, value: -60 },
          { timestamp: 4, value: -40 },
          { timestamp: 5, value: -10 },
        ],
      },
    ],
    xAxisLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },
  parameters: {
    docs: {
      description: {
        story: `
默认示例展示了三条数据线：
- **Maintenance**（黄色）：维护状态数据
- **Errors**（红色）：错误状态数据  
- **Offline**（灰色）：离线状态数据

数据格式：
\`\`\`typescript
dataSeries: [
  {
    id: 'maintenance',
    name: 'Maintenance',
    type: 'maintenance',
    data: [
      { timestamp: 0, value: 0 },
      { timestamp: 1, value: 0 },
      { timestamp: 2, value: -60 },
      { timestamp: 3, value: -40 },
      { timestamp: 4, value: -10 },
      { timestamp: 5, value: 0 },
    ],
  },
  // ... 其他数据线
]
\`\`\`
        `,
      },
    },
  },
};

export const CustomData: Story = {
  args: {
    chartTitle: 'Custom Status History',
    dataSeries: [
      {
        id: 'maintenance',
        name: 'Maintenance',
        type: 'maintenance',
        data: [
          { timestamp: 0, value: 5 },
          { timestamp: 1, value: -5 },
          { timestamp: 2, value: -30 },
          { timestamp: 3, value: -50 },
          { timestamp: 4, value: -20 },
          { timestamp: 5, value: 0 },
        ],
      },
      {
        id: 'errors',
        name: 'Errors',
        type: 'errors',
        data: [
          { timestamp: 0, value: 0 },
          { timestamp: 1, value: 5 },
          { timestamp: 2, value: 0 },
          { timestamp: 3, value: -15 },
          { timestamp: 4, value: -5 },
          { timestamp: 5, value: -5 },
        ],
      },
      {
        id: 'offline',
        name: 'Offline',
        type: 'offline',
        data: [
          { timestamp: 0, value: -10 },
          { timestamp: 1, value: -30 },
          { timestamp: 2, value: -15 },
          { timestamp: 3, value: -45 },
          { timestamp: 4, value: -30 },
          { timestamp: 5, value: -5 },
        ],
      },
    ],
    xAxisLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },
  parameters: {
    docs: {
      description: {
        story: '自定义数据示例，展示不同的数据趋势。',
      },
    },
  },
};

export const WithFixedYAxisRange: Story = {
  args: {
    chartTitle: 'Fixed Y-Axis Range',
    dataSeries: [
      {
        id: 'maintenance',
        name: 'Maintenance',
        type: 'maintenance',
        data: [
          { timestamp: 0, value: 0 },
          { timestamp: 1, value: -10 },
          { timestamp: 2, value: -20 },
          { timestamp: 3, value: -15 },
          { timestamp: 4, value: -5 },
          { timestamp: 5, value: 0 },
        ],
      },
      {
        id: 'errors',
        name: 'Errors',
        type: 'errors',
        data: [
          { timestamp: 0, value: 0 },
          { timestamp: 1, value: 5 },
          { timestamp: 2, value: 3 },
          { timestamp: 3, value: -5 },
          { timestamp: 4, value: -2 },
          { timestamp: 5, value: 0 },
        ],
      },
      {
        id: 'offline',
        name: 'Offline',
        type: 'offline',
        data: [
          { timestamp: 0, value: -5 },
          { timestamp: 1, value: -15 },
          { timestamp: 2, value: -10 },
          { timestamp: 3, value: -20 },
          { timestamp: 4, value: -12 },
          { timestamp: 5, value: -3 },
        ],
      },
    ],
    xAxisLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    yMin: -100,
    yMax: 20,
  },
  parameters: {
    docs: {
      description: {
        story: '固定 Y 轴范围示例（yMin: -100, yMax: 20），适用于需要对比多个图表的场景。',
      },
    },
  },
};
