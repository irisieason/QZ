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
    layout: 'centered',
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
    // 扩展属性
    dataSeries: {
      control: false,
      description: '数据系列数组 - 扩展属性，用于接入真实数据。每个数据系列包含 id、name、type 和 data 数组。',
      table: {
        category: '扩展属性',
        type: { 
          summary: 'DataSeries[]',
          detail: `[
  {
    id: string,
    name: string,
    type: 'maintenance' | 'errors' | 'offline',
    data: [
      { timestamp: number, value: number },
      ...
    ]
  }
]`
        },
        defaultValue: { 
          summary: '3条数据线',
          detail: 'Maintenance（黄色）、Errors（红色）、Offline（灰色）'
        },
      },
    },
    xAxisLabels: {
      control: false,
      description: 'X轴标签数组 - 扩展属性',
      table: {
        category: '扩展属性',
        type: { summary: 'string[]' },
        defaultValue: { summary: "['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']" },
      },
    },
    yMin: {
      control: 'number',
      description: 'Y轴最小值 - 扩展属性（不设置则自动计算）',
      table: {
        category: '扩展属性',
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined（自动计算）' },
      },
    },
    yMax: {
      control: 'number',
      description: 'Y轴最大值 - 扩展属性（不设置则自动计算）',
      table: {
        category: '扩展属性',
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined（自动计算）' },
      },
    },
    yTickCount: {
      control: 'number',
      description: 'Y轴刻度数量 - 扩展属性',
      table: {
        category: '扩展属性',
        type: { summary: 'number' },
        defaultValue: { summary: '7' },
      },
    },
    onPrevClick: {
      action: 'prev clicked',
      description: '左箭头点击事件 - 扩展属性',
      table: {
        category: '扩展属性',
        type: { summary: '() => void' },
      },
    },
    onNextClick: {
      action: 'next clicked',
      description: '右箭头点击事件 - 扩展属性',
      table: {
        category: '扩展属性',
        type: { summary: '() => void' },
      },
    },
    className: {
      control: 'text',
      description: '自定义类名 - 扩展属性',
      table: {
        category: '扩展属性',
        type: { summary: 'string' },
      },
    },
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
