import React from 'react';
import { Button } from './Button';

/**
 * Button 组件使用示例
 * 
 * 注意：Button 组件遵循 React 最佳实践
 * - 使用 children 而不是 label 属性
 * - 使用 showIcon + icon 属性控制图标
 * - 使用 state="Disabled" 而不是 disabled 属性
 * - icon 是字符串（图标名称），来自 ix-icons
 */
export const ButtonExamples: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div style={{ padding: '24px', background: '#000028', minHeight: '100vh' }}>
      <h1 style={{ color: '#fff', marginBottom: '32px' }}>Button 组件示例</h1>

      {/* Primary 系列 */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#00cccc', marginBottom: '16px' }}>Primary 系列</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="Primary" onClick={handleClick}>Primary</Button>
          <Button variant="Primary outline" onClick={handleClick}>Primary Outline</Button>
          <Button variant="Primary ghost" onClick={handleClick}>Primary Ghost</Button>
        </div>
      </section>

      {/* Secondary 系列 */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#00cccc', marginBottom: '16px' }}>Secondary 系列</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="Secondary">Secondary</Button>
          <Button variant="Secondary outline">Secondary Outline</Button>
          <Button variant="Secondary ghost">Secondary Ghost</Button>
        </div>
      </section>

      {/* Danger 系列 */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#ff2640', marginBottom: '16px' }}>Danger 系列</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="Danger">Delete</Button>
          <Button variant="Danger outline">Cancel</Button>
          <Button variant="Danger ghost">Remove</Button>
        </div>
      </section>

      {/* 带图标的按钮 */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#00cccc', marginBottom: '16px' }}>带图标</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="Primary" showIcon icon="check">Confirm</Button>
          <Button variant="Primary outline" showIcon icon="add">Add Item</Button>
          <Button variant="Secondary" showIcon icon="download">Download</Button>
          <Button variant="Danger" showIcon icon="trashcan">Delete</Button>
          <Button variant="🔶 Content action" showIcon icon="search"></Button>
        </div>
      </section>

      {/* 状态示例 */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#00cccc', marginBottom: '16px' }}>状态</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="Primary" state="Default">Default</Button>
          <Button variant="Primary" state="Hover">Hover</Button>
          <Button variant="Primary" state="Active">Active</Button>
          <Button variant="Primary" state="Loading">Loading</Button>
          <Button variant="Primary" state="Disabled">Disabled</Button>
        </div>
      </section>

      {/* 聚焦状态 */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#00cccc', marginBottom: '16px' }}>聚焦状态</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="Primary" focused>Focused</Button>
          <Button variant="Primary outline" focused>Focused</Button>
          <Button variant="Primary ghost" focused>Focused</Button>
        </div>
      </section>

      {/* 表单按钮 */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#00cccc', marginBottom: '16px' }}>表单示例</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Form submitted!');
          }}
          style={{ display: 'flex', gap: '16px' }}
        >
          <Button type="submit" variant="Primary">Submit</Button>
          <Button type="reset" variant="Secondary outline">Reset</Button>
          <Button 
            type="button" 
            variant="Primary ghost" 
            onClick={() => alert('Cancelled')} 
          >
            Cancel
          </Button>
        </form>
      </section>
    </div>
  );
};

export default ButtonExamples;
