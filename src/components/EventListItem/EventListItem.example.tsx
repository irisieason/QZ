import React, { useState } from 'react';
import { EventListItem } from './EventListItem';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

/**
 * EventListItem 基本用法示例
 */
export function BasicExample() {
  return (
    <div style={{ width: '432px', padding: '16px', backgroundColor: '#000028' }}>
      <EventListItem severity="alarm">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>
            System Alert
          </div>
          <div style={{ fontSize: '12px', color: '#9d9d96' }}>
            Critical system error detected at 10:30 AM
          </div>
        </div>
      </EventListItem>
    </div>
  );
}

/**
 * 不同严重性级别示例
 */
export function SeverityExample() {
  return (
    <div style={{ width: '432px', padding: '16px', backgroundColor: '#000028', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <EventListItem severity="alarm">
        <div style={{ color: 'white' }}>Alarm - Critical system failure</div>
      </EventListItem>
      
      <EventListItem severity="warning">
        <div style={{ color: 'white' }}>Warning - High CPU usage detected</div>
      </EventListItem>
      
      <EventListItem severity="critical">
        <div style={{ color: 'white' }}>Critical - Database connection lost</div>
      </EventListItem>
      
      <EventListItem severity="info">
        <div style={{ color: 'white' }}>Info - System update available</div>
      </EventListItem>
      
      <EventListItem severity="success">
        <div style={{ color: 'white' }}>Success - Backup completed successfully</div>
      </EventListItem>
      
      <EventListItem severity="neutral">
        <div style={{ color: 'white' }}>Neutral - System status normal</div>
      </EventListItem>
    </div>
  );
}

/**
 * 不同状态示例
 */
export function StateExample() {
  return (
    <div style={{ width: '432px', padding: '16px', backgroundColor: '#000028', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <EventListItem state="Default" severity="info">
        <div style={{ color: 'white' }}>Default State</div>
      </EventListItem>
      
      <EventListItem state="Hover" severity="info">
        <div style={{ color: 'white' }}>Hover State</div>
      </EventListItem>
      
      <EventListItem state="Active" severity="info">
        <div style={{ color: 'white' }}>Active State</div>
      </EventListItem>
      
      <EventListItem state="Disabled" severity="info">
        <div style={{ color: 'white' }}>Disabled State</div>
      </EventListItem>
    </div>
  );
}

/**
 * 选中和聚焦状态示例
 */
export function SelectionExample() {
  return (
    <div style={{ width: '432px', padding: '16px', backgroundColor: '#000028', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <EventListItem selected={false} severity="info">
        <div style={{ color: 'white' }}>Not Selected</div>
      </EventListItem>
      
      <EventListItem selected={true} severity="info">
        <div style={{ color: 'white' }}>Selected</div>
      </EventListItem>
      
      <EventListItem focused={true} severity="info">
        <div style={{ color: 'white' }}>Focused</div>
      </EventListItem>
      
      <EventListItem selected={true} focused={true} severity="info">
        <div style={{ color: 'white' }}>Selected and Focused</div>
      </EventListItem>
    </div>
  );
}

/**
 * 无箭头示例
 */
export function NoChevronExample() {
  return (
    <div style={{ width: '432px', padding: '16px', backgroundColor: '#000028', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <EventListItem chevron={true} severity="info">
        <div style={{ color: 'white' }}>With Chevron (default)</div>
      </EventListItem>
      
      <EventListItem chevron={false} severity="info">
        <div style={{ color: 'white' }}>Without Chevron</div>
      </EventListItem>
    </div>
  );
}

/**
 * 交互式事件列表示例
 */
export function InteractiveListExample() {
  const [selectedId, setSelectedId] = useState<string>('event-2');

  const events = [
    {
      id: 'event-1',
      severity: 'alarm' as const,
      title: 'Critical System Error',
      description: 'Database connection failed. Immediate action required.',
      time: '10:30 AM',
    },
    {
      id: 'event-2',
      severity: 'warning' as const,
      title: 'High CPU Usage',
      description: 'CPU usage exceeded 90% threshold for 5 minutes.',
      time: '10:25 AM',
    },
    {
      id: 'event-3',
      severity: 'info' as const,
      title: 'System Update Available',
      description: 'A new version of the system is available for installation.',
      time: '10:20 AM',
    },
    {
      id: 'event-4',
      severity: 'success' as const,
      title: 'Backup Completed',
      description: 'Daily backup completed successfully at 10:15 AM.',
      time: '10:15 AM',
    },
    {
      id: 'event-5',
      severity: 'critical' as const,
      title: 'Security Alert',
      description: 'Multiple failed login attempts detected from unknown IP.',
      time: '10:10 AM',
    },
  ];

  return (
    <div style={{ width: '432px', padding: '16px', backgroundColor: '#000028', borderRadius: '8px' }}>
      <h3 style={{ color: 'white', marginBottom: '16px', fontSize: '16px' }}>
        Event List
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {events.map((event) => (
          <EventListItem
            key={event.id}
            severity={event.severity}
            selected={selectedId === event.id}
            onClick={() => setSelectedId(event.id)}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>
                  {event.title}
                </div>
                <div style={{ fontSize: '12px', color: '#9d9d96' }}>
                  {event.time}
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#9d9d96' }}>
                {event.description}
              </div>
            </div>
          </EventListItem>
        ))}
      </div>
    </div>
  );
}

/**
 * 复杂内容示例
 */
export function ComplexContentExample() {
  return (
    <div style={{ width: '432px', padding: '16px', backgroundColor: '#000028' }}>
      <EventListItem severity="alarm" selected={true}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>
              Critical System Alert
            </div>
            <div style={{ 
              fontSize: '10px', 
              color: 'white', 
              backgroundColor: '#ff4444', 
              padding: '2px 8px', 
              borderRadius: '4px' 
            }}>
              URGENT
            </div>
          </div>
          
          <div style={{ fontSize: '12px', color: '#9d9d96' }}>
            Multiple system components are experiencing failures. 
            Database connection lost, API gateway unreachable.
          </div>
          
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <div style={{ 
              fontSize: '11px', 
              color: '#9d9d96', 
              padding: '2px 6px', 
              border: '1px solid #444', 
              borderRadius: '3px' 
            }}>
              Database
            </div>
            <div style={{ 
              fontSize: '11px', 
              color: '#9d9d96', 
              padding: '2px 6px', 
              border: '1px solid #444', 
              borderRadius: '3px' 
            }}>
              API Gateway
            </div>
            <div style={{ 
              fontSize: '11px', 
              color: '#9d9d96', 
              padding: '2px 6px', 
              border: '1px solid #444', 
              borderRadius: '3px' 
            }}>
              Network
            </div>
          </div>
          
          <div style={{ 
            fontSize: '11px', 
            color: '#9d9d96', 
            marginTop: '4px',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>Detected: 10:30:45 AM</span>
            <span>Duration: 5m 23s</span>
          </div>
        </div>
      </EventListItem>
    </div>
  );
}

/**
 * 禁用状态示例
 */
export function DisabledExample() {
  const handleClick = () => {
    console.log('This should not be called');
  };

  return (
    <div style={{ width: '432px', padding: '16px', backgroundColor: '#000028', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <EventListItem severity="info" onClick={handleClick}>
        <div style={{ color: 'white' }}>Enabled - Click me</div>
      </EventListItem>
      
      <EventListItem state="Disabled" severity="info" onClick={handleClick}>
        <div style={{ color: 'white' }}>Disabled - Cannot click</div>
      </EventListItem>
    </div>
  );
}
