import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DeviceStatusChart } from './DeviceStatusChart';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

const meta = {
  title: 'Components/DeviceStatusChart',
  component: DeviceStatusChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Device status chart component showing horizontal bar chart with device status distribution across IP ranges.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Figma 属性
    chartTitle: {
      control: 'text',
      description: '图表标题（Figma 属性）',
      table: {
        category: 'Figma 属性',
        type: { summary: 'string' },
        defaultValue: { summary: 'Device status' },
      },
    },
    yAxisLabel: {
      control: 'text',
      description: 'Y轴标签（Figma 属性）',
      table: {
        category: 'Figma 属性',
        type: { summary: 'string' },
        defaultValue: { summary: 'IP Range' },
      },
    },
    xAxisLabel: {
      control: 'text',
      description: 'X轴标签（Figma 属性）',
      table: {
        category: 'Figma 属性',
        type: { summary: 'string' },
        defaultValue: { summary: 'Device' },
      },
    },
    // 扩展属性
    data: {
      control: 'object',
      description: '图表数据数组 - 扩展属性，用于接入真实数据。每个数据项包含 label 和各状态的设备数量。',
      table: {
        category: '扩展属性',
        type: { 
          summary: 'ChartDataItem[]',
          detail: `[
  {
    label: string,      // IP 范围标签
    green: number,      // 正常设备数
    yellow: number,     // 警告设备数
    red: number,        // 错误设备数
    critical: number    // 严重错误设备数
  }
]`
        },
        defaultValue: { 
          summary: '3行数据',
          detail: '10.x、192.x、172.x 三个 IP 范围的设备状态'
        },
      },
    },
    legends: {
      control: 'object',
      description: '图例配置数组 - 扩展属性，定义每种状态的颜色和标签。',
      table: {
        category: '扩展属性',
        type: { 
          summary: 'LegendItem[]',
          detail: `[
  {
    color: 'green' | 'yellow' | 'red' | 'critical',
    label: string
  }
]`
        },
        defaultValue: { 
          summary: '4个图例',
          detail: 'green、yellow、red、critical 四种状态'
        },
      },
    },
    onPrevClick: {
      action: 'prev-clicked',
      description: '左箭头点击事件 - 扩展属性',
      table: {
        category: '扩展属性',
        type: { summary: '() => void' },
      },
    },
    onNextClick: {
      action: 'next-clicked',
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
} satisfies Meta<typeof DeviceStatusChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// 默认数据
const defaultData = [
  { label: '10.x', green: 2, yellow: 0, red: 0, critical: 0 },
  { label: '192.x', green: 12, yellow: 0, red: 1, critical: 1 },
  { label: '172.x', green: 15, yellow: 2, red: 0, critical: 0 },
];

const defaultLegends = [
  { color: 'green' as const, label: 'Label' },
  { color: 'yellow' as const, label: 'Label' },
  { color: 'red' as const, label: 'Label' },
  { color: 'critical' as const, label: 'Label' },
];

// 默认状态
export const Default: Story = {
  args: {
    chartTitle: 'Device status',
    yAxisLabel: 'IP Range',
    xAxisLabel: 'Device',
    data: defaultData,
    legends: defaultLegends,
  },
  parameters: {
    docs: {
      description: {
        story: `
默认示例展示了三个 IP 范围的设备状态分布：
- **10.x**: 2台正常设备
- **192.x**: 12台正常、1台错误、1台严重错误
- **172.x**: 15台正常、2台警告

数据格式：
\`\`\`typescript
data: [
  { label: '10.x', green: 2, yellow: 0, red: 0, critical: 0 },
  { label: '192.x', green: 12, yellow: 0, red: 1, critical: 1 },
  { label: '172.x', green: 15, yellow: 2, red: 0, critical: 0 },
]

legends: [
  { color: 'green', label: 'Label' },
  { color: 'yellow', label: 'Label' },
  { color: 'red', label: 'Label' },
  { color: 'critical', label: 'Label' },
]
\`\`\`
        `,
      },
    },
  },
};

// 自定义标题
export const CustomTitle: Story = {
  args: {
    chartTitle: 'Network Device Status',
    yAxisLabel: 'IP Range',
    xAxisLabel: 'Device Count',
    data: defaultData,
    legends: defaultLegends,
  },
  parameters: {
    docs: {
      description: {
        story: '自定义图表标题和轴标签的示例。',
      },
    },
  },
};

// 自定义图例
export const CustomLegends: Story = {
  args: {
    chartTitle: 'Device status',
    yAxisLabel: 'IP Range',
    xAxisLabel: 'Device',
    data: defaultData,
    legends: [
      { color: 'green' as const, label: 'Online' },
      { color: 'yellow' as const, label: 'Warning' },
      { color: 'red' as const, label: 'Offline' },
      { color: 'critical' as const, label: 'Critical' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '自定义图例标签的示例，将默认的 "Label" 替换为更有意义的状态名称。',
      },
    },
  },
};

// 更多数据
export const MoreData: Story = {
  args: {
    chartTitle: 'Device status',
    yAxisLabel: 'IP Range',
    xAxisLabel: 'Device',
    data: [
      { label: '10.x', green: 5, yellow: 1, red: 0, critical: 0 },
      { label: '172.x', green: 8, yellow: 2, red: 1, critical: 0 },
      { label: '192.x', green: 12, yellow: 3, red: 2, critical: 1 },
      { label: '224.x', green: 6, yellow: 0, red: 0, critical: 0 },
    ],
    legends: [
      { color: 'green' as const, label: 'Online' },
      { color: 'yellow' as const, label: 'Warning' },
      { color: 'red' as const, label: 'Offline' },
      { color: 'critical' as const, label: 'Critical' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '展示更多数据行的示例（4个 IP 范围）。注意：如果数据超过3行，建议使用分页功能。',
      },
    },
  },
};

// 单一状态
export const SingleStatus: Story = {
  args: {
    chartTitle: 'All devices online',
    yAxisLabel: 'IP Range',
    xAxisLabel: 'Device',
    data: [
      { label: '10.x', green: 5, yellow: 0, red: 0, critical: 0 },
      { label: '192.x', green: 15, yellow: 0, red: 0, critical: 0 },
      { label: '172.x', green: 18, yellow: 0, red: 0, critical: 0 },
    ],
    legends: [
      { color: 'green' as const, label: 'Online' },
      { color: 'yellow' as const, label: 'Warning' },
      { color: 'red' as const, label: 'Offline' },
      { color: 'critical' as const, label: 'Critical' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '所有设备都处于正常状态的示例，展示单一状态的可视化效果。',
      },
    },
  },
};

// 混合状态
export const MixedStatus: Story = {
  args: {
    chartTitle: 'Device status',
    yAxisLabel: 'IP Range',
    xAxisLabel: 'Device',
    data: [
      { label: '10.x', green: 3, yellow: 2, red: 1, critical: 1 },
      { label: '192.x', green: 8, yellow: 3, red: 2, critical: 2 },
      { label: '172.x', green: 10, yellow: 4, red: 2, critical: 1 },
    ],
    legends: [
      { color: 'green' as const, label: 'Online' },
      { color: 'yellow' as const, label: 'Warning' },
      { color: 'red' as const, label: 'Offline' },
      { color: 'critical' as const, label: 'Critical' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '混合状态示例，每个 IP 范围都包含多种状态的设备，展示复杂场景下的可视化效果。',
      },
    },
  },
};

// 交互示例
export const WithInteraction: Story = {
  args: {
    chartTitle: 'Device status',
    yAxisLabel: 'IP Range',
    xAxisLabel: 'Device',
    data: defaultData,
    legends: defaultLegends,
  },
  parameters: {
    docs: {
      description: {
        story: '带分页交互的示例，点击左右箭头可以切换不同页面的数据。适用于数据量较大需要分页展示的场景。',
      },
    },
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = React.useState(0);
    
    const pages = [
      [
        { label: '10.x', green: 2, yellow: 0, red: 0, critical: 0 },
        { label: '192.x', green: 12, yellow: 0, red: 1, critical: 1 },
        { label: '172.x', green: 15, yellow: 2, red: 0, critical: 0 },
      ],
      [
        { label: '224.x', green: 8, yellow: 1, red: 0, critical: 0 },
        { label: '240.x', green: 5, yellow: 0, red: 1, critical: 0 },
        { label: '255.x', green: 3, yellow: 2, red: 1, critical: 1 },
      ],
    ];

    return (
      <div>
        <DeviceStatusChart
          {...args}
          data={pages[currentPage]}
          onPrevClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          onNextClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
        />
        <div style={{ 
          marginTop: '16px', 
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-soft-text)'
        }}>
          Page {currentPage + 1} of {pages.length}
        </div>
      </div>
    );
  },
};
