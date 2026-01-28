import React, { useMemo, useCallback } from 'react';
import { IconButton } from '../IconButton';
import './StatusHistoryChart.css';

// 数据点类型
export type DataPoint = {
  timestamp: string | number;  // 时间戳或索引
  value: number;               // 实际数值
};

// 数据线类型
export type DataSeries = {
  id: string;
  name: string;
  type: 'maintenance' | 'errors' | 'offline';
  data: DataPoint[];
};

// Figma 定义的属性（严格遵循 Figma 设计）
interface StatusHistoryChartFigmaProps {
  /** 图表标题 */
  chartTitle?: string;
}

// 扩展属性（React 特定，非 Figma 定义）
interface StatusHistoryChartExtendedProps {
  /** 数据系列数组 - 扩展属性 */
  dataSeries?: DataSeries[];
  
  /** X轴标签 - 扩展属性 */
  xAxisLabels?: string[];
  
  /** Y轴最小值 - 扩展属性（不设置则自动计算） */
  yMin?: number;
  
  /** Y轴最大值 - 扩展属性（不设置则自动计算） */
  yMax?: number;
  
  /** Y轴刻度数量 - 扩展属性 */
  yTickCount?: number;
  
  /** 左箭头点击事件 - 扩展属性 */
  onPrevClick?: () => void;
  
  /** 右箭头点击事件 - 扩展属性 */
  onNextClick?: () => void;
  
  /** 自定义类名 */
  className?: string;
}

// 最终组件属性
export interface StatusHistoryChartProps extends StatusHistoryChartFigmaProps, StatusHistoryChartExtendedProps {}

export const StatusHistoryChart: React.FC<StatusHistoryChartProps> = ({
  // Figma 属性
  chartTitle = 'Status history',
  
  // 扩展属性
  dataSeries = [
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
  xAxisLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  yMin,
  yMax,
  yTickCount = 7,
  onPrevClick,
  onNextClick,
  className = '',
}) => {
  // 计算Y轴范围和刻度
  const { yAxisTicks, yAxisMin, yAxisMax } = useMemo(() => {
    // 确保 dataSeries 是数组
    if (!Array.isArray(dataSeries) || dataSeries.length === 0) {
      return { yAxisTicks: [0], yAxisMin: 0, yAxisMax: 0 };
    }
    
    // 收集所有数据值
    const allValues = dataSeries.flatMap(series => series.data.map(d => d.value));
    
    if (allValues.length === 0) {
      return { yAxisTicks: [0], yAxisMin: 0, yAxisMax: 0 };
    }
    
    // 计算范围
    const dataMin = yMin !== undefined ? yMin : Math.min(...allValues);
    const dataMax = yMax !== undefined ? yMax : Math.max(...allValues);
    
    // 生成刻度
    const range = dataMax - dataMin;
    const step = range / (yTickCount - 1);
    const ticks: number[] = [];
    
    for (let i = 0; i < yTickCount; i++) {
      const value = dataMax - (step * i);
      ticks.push(Math.round(value));
    }
    
    return {
      yAxisTicks: ticks,
      yAxisMin: dataMin,
      yAxisMax: dataMax,
    };
  }, [dataSeries, yMin, yMax, yTickCount]);
  
  // 图表尺寸 - 使用相对单位，让 SVG 自动缩放
  const chartWidth = 100;  // 使用相对单位
  const chartHeight = 100; // 使用相对单位
  
  // ✅ 性能优化：使用 useCallback 缓存坐标转换函数
  const dataToSvg = useCallback((point: DataPoint, maxTimestamp: number): { x: number; y: number } => {
    // X: 根据timestamp映射
    const svgX = maxTimestamp > 0 ? (Number(point.timestamp) / maxTimestamp) * chartWidth : 0;
    
    // Y: 根据值范围映射
    const yRange = yAxisMax - yAxisMin;
    const svgY = yRange > 0 ? ((yAxisMax - point.value) / yRange) * chartHeight : chartHeight / 2;
    
    return { x: svgX, y: svgY };
  }, [yAxisMax, yAxisMin, chartWidth, chartHeight]);
  
  // ✅ 性能优化：使用 useCallback 缓存路径生成函数
  const generatePath = useCallback((data: DataPoint[], maxTimestamp: number): string => {
    if (data.length === 0) return '';
    
    const points = data.map(d => dataToSvg(d, maxTimestamp));
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    
    return path;
  }, [dataToSvg]);
  
  // 计算最大timestamp
  const maxTimestamp = useMemo(() => {
    if (!Array.isArray(dataSeries) || dataSeries.length === 0) {
      return 0;
    }
    const allTimestamps = dataSeries.flatMap(series => 
      series.data.map(d => Number(d.timestamp))
    );
    return allTimestamps.length > 0 ? Math.max(...allTimestamps) : 0;
  }, [dataSeries]);
  
  // ✅ 性能优化：使用 useMemo 缓存类名计算
  const chartClasses = useMemo(() => {
    const classes = ['status-history-chart'];
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
    <div className={chartClasses} role="img" aria-label={`${chartTitle} chart showing maintenance, errors, and offline status over time`}>
      {/* 标题栏 */}
      <div className="status-history-chart__header">
        <div className="status-history-chart__title">{chartTitle}</div>
        <div className="status-history-chart__buttons">
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

      {/* 图表区域 */}
      <div className="status-history-chart__chart">
        {/* Y轴刻度 */}
        <div className="status-history-chart__y-axis">
          {yAxisTicks.map((tick) => (
            <div key={tick} className="status-history-chart__y-tick">
              {tick}
            </div>
          ))}
        </div>

        {/* 图表画布 */}
        <div className="status-history-chart__canvas">
          <svg
            className="status-history-chart__svg"
            viewBox={`-4 0 ${chartWidth + 4} ${chartHeight + 4}`}
            preserveAspectRatio="none"
          >
            {/* 垂直网格线 */}
            <g className="status-history-chart__grid-lines-vertical">
              {xAxisLabels.map((_, index) => {
                const x = (index / (xAxisLabels.length - 1)) * chartWidth;
                const isAxis = index === 0 || index === xAxisLabels.length - 1;
                return (
                  <g key={index}>
                    <line
                      x1={x}
                      y1={0}
                      x2={x}
                      y2={chartHeight}
                      className={`status-history-chart__grid-line ${
                        isAxis ? 'status-history-chart__grid-line--bold' : ''
                      }`}
                    />
                    {/* X轴刻度标记: 1px宽 × 4px高，在底部向下 */}
                    <rect
                      x={x - 0.5}
                      y={chartHeight}
                      width={1}
                      height={4}
                      className="status-history-chart__x-tick-mark"
                    />
                  </g>
                );
              })}
            </g>

            {/* 水平网格线 */}
            <g className="status-history-chart__grid-lines-horizontal">
              {yAxisTicks.map((tick, index) => {
                // 平均分布：7个刻度，6个间隔
                const y = (index / (yAxisTicks.length - 1)) * chartHeight;
                return (
                  <g key={tick}>
                    <line
                      x1={0}
                      y1={y}
                      x2={chartWidth}
                      y2={y}
                      className="status-history-chart__grid-line"
                    />
                    {/* Y轴刻度标记: 4px宽 × 1px高 */}
                    <rect
                      x={-4}
                      y={y - 0.5}
                      width={4}
                      height={1}
                      className="status-history-chart__y-tick-mark"
                    />
                  </g>
                );
              })}
            </g>

            {/* X轴底部线 */}
            <line
              x1={0}
              y1={chartHeight}
              x2={chartWidth}
              y2={chartHeight}
              className="status-history-chart__grid-line status-history-chart__grid-line--bold"
            />

            {/* 数据线 */}
            {Array.isArray(dataSeries) && dataSeries.map((series) => (
              <g key={series.id}>
                {/* 折线 */}
                <path
                  d={generatePath(series.data, maxTimestamp)}
                  className={`status-history-chart__line status-history-chart__line--${series.type}`}
                  fill="none"
                  strokeWidth="2"
                />
                
                {/* 数据点 */}
                {series.data.map((point, index) => {
                  const svgPoint = dataToSvg(point, maxTimestamp);
                  return (
                    <circle
                      key={index}
                      cx={svgPoint.x}
                      cy={svgPoint.y}
                      r="1.5"
                      className={`status-history-chart__point status-history-chart__point--${series.type}`}
                    />
                  );
                })}
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* X轴刻度 */}
      <div className="status-history-chart__x-axis">
        {xAxisLabels.map((label) => (
          <div key={label} className="status-history-chart__x-tick">
            {label}
          </div>
        ))}
      </div>

      {/* 图例 */}
      <div className="status-history-chart__legend">
        {Array.isArray(dataSeries) && dataSeries.map((series) => (
          <div key={series.id} className="status-history-chart__legend-item">
            <div className={`status-history-chart__legend-color status-history-chart__legend-color--${series.type}`} />
            <div className="status-history-chart__legend-label">{series.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

StatusHistoryChart.displayName = 'StatusHistoryChart';
