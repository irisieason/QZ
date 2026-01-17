import React from 'react';
import { Button } from './Button';

/**
 * Button 组件使用示例
 * 
 * 注意：Button 组件严格遵循 Figma 设计规范
 * - 使用 label 属性而不是 children
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
          <Button variant="Primary" label="Primary" onClick={handleClick} />
          <Button variant="Primary outline" label="Primary Outline" onClick={handleClick} />
          <Button variant="Primary ghost" label="Primary Ghost" onClick={handleClick} />
        </div>
      </section>

      {/* Secondary 系列 */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#00cccc', marginBottom: '16px' }}>Secondary 系列</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="Secondary" label="Secondary" />
          <Button variant="Secondary outline" label="Secondary Outline" />
          <Button variant="Secondary ghost" label="Secondary Ghost" />
        </div>
      </section>

      {/* Danger 系列 */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#ff2640', marginBottom: '16px' }}>Danger 系列</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="Danger" label="Delete" />
          <Button variant="Danger outline" label="Cancel" />
          <Button variant="Danger ghost" label="Remove" />
        </div>
      </section>

      {/* 带图标的按钮 */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#00cccc', marginBottom: '16px' }}>带图标</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="Primary" label="Confirm" showIcon icon="check" />
          <Button variant="Primary outline" label="Add Item" showIcon icon="add" />
          <Button variant="Secondary" label="Download" showIcon icon="download" />
          <Button variant="Danger" label="Delete" showIcon icon="trashcan" />
          <Button variant="🔶 Content action" label="" showIcon icon="search" />
        </div>
      </section>

      {/* 状态示例 */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#00cccc', marginBottom: '16px' }}>状态</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="Primary" label="Default" state="Default" />
          <Button variant="Primary" label="Hover" state="Hover" />
          <Button variant="Primary" label="Active" state="Active" />
          <Button variant="Primary" label="Loading" state="Loading" />
          <Button variant="Primary" label="Disabled" state="Disabled" />
        </div>
      </section>

      {/* 聚焦状态 */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#00cccc', marginBottom: '16px' }}>聚焦状态</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="Primary" label="Focused" focused />
          <Button variant="Primary outline" label="Focused" focused />
          <Button variant="Primary ghost" label="Focused" focused />
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
          <Button type="submit" variant="Primary" label="Submit" />
          <Button type="reset" variant="Secondary outline" label="Reset" />
          <Button 
            type="button" 
            variant="Primary ghost" 
            label="Cancel" 
            onClick={() => alert('Cancelled')} 
          />
        </form>
      </section>
    </div>
  );
};

export default ButtonExamples;
