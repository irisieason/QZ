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
    chartTitle: {
      control: 'text',
      description: '图表标题',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"Device status"' },
      },
    },
    yAxisLabel: {
      control: 'text',
      description: 'Y轴标签',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"IP Range"' },
      },
    },
    xAxisLabel: {
      control: 'text',
      description: 'X轴标签',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"Device"' },
      },
    },
    data: {
      control: 'object',
      description: '图表数据',
      table: {
        type: { summary: 'ChartDataItem[]' },
      },
    },
    legends: {
      control: 'object',
      description: '图例配置',
      table: {
        type: { summary: 'LegendItem[]' },
      },
    },
    onPrevClick: {
      action: 'prev-clicked',
      description: '左箭头点击事件',
      table: {
        type: { summary: '() => void' },
      },
    },
    onNextClick: {
      action: 'next-clicked',
      description: '右箭头点击事件',
      table: {
        type: { summary: '() => void' },
      },
    },
    className: {
      control: 'text',
      description: '自定义类名',
      table: {
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
