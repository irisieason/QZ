import React, { useCallback, useMemo } from 'react';
import { IconButton } from '../IconButton';
import './DeviceStatusChart.css';

// 图表数据类型
export type ChartDataItem = {
  label: string;
  green: number;
  yellow: number;
  red: number;
  critical: number;
};

// 图例项类型
export type LegendItem = {
  color: 'green' | 'yellow' | 'red' | 'critical';
  label: string;
};

// Figma 定义的属性（严格遵循 Figma 设计）
interface DeviceStatusChartFigmaProps {
  /** 图表标题 */
  chartTitle?: string;
  
  /** Y轴标签 */
  yAxisLabel?: string;
  
  /** X轴标签 */
  xAxisLabel?: string;
}

// 扩展属性（React 特定，非 Figma 定义）
interface DeviceStatusChartExtendedProps {
  /** 图表数据 - 扩展属性 */
  data?: ChartDataItem[];
  
  /** 图例配置 - 扩展属性 */
  legends?: LegendItem[];
  
  /** 左箭头点击事件 - 扩展属性 */
  onPrevClick?: () => void;
  
  /** 右箭头点击事件 - 扩展属性 */
  onNextClick?: () => void;
  
  /** 自定义类名 */
  className?: string;
}

// 最终组件属性
export interface DeviceStatusChartProps extends DeviceStatusChartFigmaProps, DeviceStatusChartExtendedProps {}

export const DeviceStatusChart: React.FC<DeviceStatusChartProps> = ({
  // Figma 属性
  chartTitle = 'Device status',
  yAxisLabel = 'IP Range',
  xAxisLabel = 'Device',
  
  // 扩展属性
  data = [
    { label: '10.x', green: 2, yellow: 0, red: 0, critical: 0 },
    { label: '192.x', green: 12, yellow: 0, red: 1, critical: 1 },
    { label: '172.x', green: 15, yellow: 2, red: 0, critical: 0 },
  ],
  legends = [
    { color: 'green', label: 'Label' },
    { color: 'yellow', label: 'Label' },
    { color: 'red', label: 'Label' },
    { color: 'critical', label: 'Label' },
  ],
  onPrevClick,
  onNextClick,
  className = '',
}) => {
  // ✅ 性能优化：使用 useMemo 缓存复杂计算
  const maxValue = useMemo(() => {
    return Math.max(
      ...data.map(item => item.green + item.yellow + item.red + item.critical)
    );
  }, [data]);
  
  // 动态生成X轴刻度：从0到最大值，间隔为3
  const xAxisTicks = useMemo(() => {
    if (maxValue === 0) return [0];
    
    // 向上取整到3的倍数
    const maxTick = Math.ceil(maxValue / 3) * 3;
    const ticks: number[] = [];
    
    for (let i = 0; i <= maxTick; i += 3) {
      ticks.push(i);
    }
    
    return ticks;
  }, [maxValue]);
  
  // ✅ 性能优化：使用 useMemo 缓存类名计算
  const chartClasses = useMemo(() => {
    const classes = ['device-status-chart'];
    if (className) {
      classes.push(className);
    }
    return classes.join(' ');
  }, [className]);

  // ✅ 性能优化：使用 useCallback 缓存事件处理器
  const handlePrevClick = useCallback(() => {
    onPrevClick?.();
  }, [onPrevClick]);

  const handleNextClick = useCallback(() => {
    onNextClick?.();
  }, [onNextClick]);

  return (
    <div className={chartClasses} role="img" aria-label={`${chartTitle} chart showing device status by IP range`}>
      {/* 标题栏 */}
      <div className="device-status-chart__header">
        <div className="device-status-chart__title">{chartTitle}</div>
        <div className="device-status-chart__buttons">
          <IconButton
            icon="chevron-left-small"
            type="Primary ghost"
            size="24"
            onClick={handlePrevClick}
            aria-label="Previous"
          />
          <IconButton
            icon="chevron-right-small"
            type="Primary ghost"
            size="24"
            onClick={handleNextClick}
            aria-label="Next"
          />
        </div>
      </div>

      {/* Y轴标签 */}
      <div className="device-status-chart__y-label">{yAxisLabel}</div>

      {/* 图表网格 */}
      <div className="device-status-chart__grid-container">
        {/* Y轴刻度 */}
        <div className="device-status-chart__y-axis">
          {data.map((item, index) => (
            <div key={index} className="device-status-chart__y-tick">
              {item.label}
            </div>
          ))}
        </div>

        {/* 图表区域 */}
        <div className="device-status-chart__chart-area">
          {/* 垂直网格线 */}
          <div className="device-status-chart__grid-lines">
            {xAxisTicks.map((tick, index) => (
              <div
                key={tick}
                className={`device-status-chart__grid-line ${
                  index === 0
                    ? 'device-status-chart__grid-line--bold'
                    : ''
                }`}
              />
            ))}
          </div>

          {/* 数据条 */}
          <div className="device-status-chart__bars">
            {data.map((item, index) => {
              const maxTick = xAxisTicks[xAxisTicks.length - 1];
              const greenWidth = maxTick > 0 ? (item.green / maxTick) * 100 : 0;
              const yellowWidth = maxTick > 0 ? (item.yellow / maxTick) * 100 : 0;
              const redWidth = maxTick > 0 ? (item.red / maxTick) * 100 : 0;
              const criticalWidth = maxTick > 0 ? (item.critical / maxTick) * 100 : 0;

              return (
                <div key={index} className="device-status-chart__bar-row">
                  {/* 水平分隔线 */}
                  <div className="device-status-chart__row-divider">
                    <div className="device-status-chart__row-divider-tick" />
                    <div className="device-status-chart__row-divider-line" />
                  </div>
                  
                  {/* 条形图 */}
                  <div className="device-status-chart__bar-container">
                    {item.green > 0 && (
                      <div
                        className="device-status-chart__bar device-status-chart__bar--green"
                        style={{ width: `${greenWidth}%` }}
                        title={`Green: ${item.green}`}
                      />
                    )}
                    {item.yellow > 0 && (
                      <div
                        className="device-status-chart__bar device-status-chart__bar--yellow"
                        style={{ width: `${yellowWidth}%` }}
                        title={`Yellow: ${item.yellow}`}
                      />
                    )}
                    {item.red > 0 && (
                      <div
                        className="device-status-chart__bar device-status-chart__bar--red"
                        style={{ width: `${redWidth}%` }}
                        title={`Red: ${item.red}`}
                      />
                    )}
                    {item.critical > 0 && (
                      <div
                        className="device-status-chart__bar device-status-chart__bar--critical"
                        style={{ width: `${criticalWidth}%` }}
                        title={`Critical: ${item.critical}`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 底部X轴线 */}
          <div className="device-status-chart__x-axis-line">
            {/* X轴 ticks */}
            {xAxisTicks.map((tick) => (
              <div
                key={tick}
                className="device-status-chart__x-axis-tick"
              />
            ))}
          </div>
        </div>
      </div>

      {/* X轴刻度 */}
      <div className="device-status-chart__x-axis">
        {xAxisTicks.map((tick, index) => {
          // 计算每个标签的位置，使其中心与垂直线对齐
          // 垂直线使用 justify-content: space-between 分布
          const position = (index / (xAxisTicks.length - 1)) * 100;
          return (
            <div
              key={tick}
              className="device-status-chart__x-tick"
              style={{ left: `calc(${position}% + 4px)` }}
            >
              {tick}
            </div>
          );
        })}
      </div>

      {/* X轴标签 */}
      <div className="device-status-chart__x-label">{xAxisLabel}</div>

      {/* 图例 */}
      <div className="device-status-chart__legend">
        {legends.map((legend, index) => (
          <div key={index} className="device-status-chart__legend-item">
            <div className={`device-status-chart__legend-color device-status-chart__legend-color--${legend.color}`} />
            <div className="device-status-chart__legend-label">{legend.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

DeviceStatusChart.displayName = 'DeviceStatusChart';
