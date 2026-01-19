import React from 'react';
import { IconButton } from './IconButton';

/**
 * IconButton 组件使用示例
 * 
 * 此组件严格遵循 Figma 设计规范
 */
export const IconButtonExample: React.FC = () => {
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <section>
        <h2>基础用法</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <IconButton type="Primary" icon="about" />
          <IconButton type="Secondary" icon="about" />
          <IconButton type="Danger" icon="about" />
        </div>
      </section>

      <section>
        <h2>不同类型（Type）</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <IconButton type="Primary" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Primary</p>
          </div>
          <div>
            <IconButton type="Primary outline" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Primary outline</p>
          </div>
          <div>
            <IconButton type="Primary ghost" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Primary ghost</p>
          </div>
          <div>
            <IconButton type="Secondary" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Secondary</p>
          </div>
          <div>
            <IconButton type="Secondary outline" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Secondary outline</p>
          </div>
          <div>
            <IconButton type="Secondary ghost" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Secondary ghost</p>
          </div>
          <div>
            <IconButton type="Danger" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Danger</p>
          </div>
          <div>
            <IconButton type="Danger outline" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Danger outline</p>
          </div>
          <div>
            <IconButton type="Danger ghost" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Danger ghost</p>
          </div>
        </div>
      </section>

      <section>
        <h2>不同尺寸（Size）</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div>
            <IconButton type="Primary" size="24" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>24px</p>
          </div>
          <div>
            <IconButton type="Primary" size="16" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>16px</p>
          </div>
          <div>
            <IconButton type="Primary" size="12" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>12px</p>
          </div>
        </div>
      </section>

      <section>
        <h2>形状（Oval）</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div>
            <IconButton type="Primary" oval={false} icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>方形</p>
          </div>
          <div>
            <IconButton type="Primary" oval={true} icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>圆形</p>
          </div>
        </div>
      </section>

      <section>
        <h2>状态（State）</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div>
            <IconButton type="Primary" state="Default" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Default</p>
          </div>
          <div>
            <IconButton type="Primary" state="Hover" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Hover</p>
          </div>
          <div>
            <IconButton type="Primary" state="Active" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Active</p>
          </div>
          <div>
            <IconButton type="Primary" state="Disabled" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Disabled</p>
          </div>
          <div>
            <IconButton type="Primary" state="Loading" icon="about" />
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Loading</p>
          </div>
        </div>
      </section>

      <section>
        <h2>聚焦状态（Focused）</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <IconButton type="Primary" focused={false} icon="about" />
          <IconButton type="Primary" focused={true} icon="about" />
        </div>
      </section>

      <section>
        <h2>交互示例</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <IconButton 
            type="Primary" 
            icon="about" 
            onClick={() => alert('Primary button clicked!')}
            aria-label="关于按钮"
          />
          <IconButton 
            type="Secondary" 
            icon="about" 
            onClick={() => alert('Secondary button clicked!')}
            aria-label="关于按钮"
          />
          <IconButton 
            type="Danger" 
            icon="about" 
            onClick={() => alert('Danger button clicked!')}
            aria-label="删除按钮"
          />
        </div>
      </section>

      <section>
        <h2>禁用状态</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <IconButton type="Primary" icon="about" disabled />
          <IconButton type="Secondary" icon="about" disabled />
          <IconButton type="Danger" icon="about" disabled />
        </div>
      </section>

      <section>
        <h2>组合示例：不同类型 + 圆形 + 不同尺寸</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <IconButton type="Primary" oval size="24" icon="about" />
          <IconButton type="Primary outline" oval size="24" icon="about" />
          <IconButton type="Primary ghost" oval size="24" icon="about" />
          <IconButton type="Secondary" oval size="16" icon="about" />
          <IconButton type="Secondary outline" oval size="16" icon="about" />
          <IconButton type="Secondary ghost" oval size="16" icon="about" />
          <IconButton type="Danger" oval size="12" icon="about" />
          <IconButton type="Danger outline" oval size="12" icon="about" />
          <IconButton type="Danger ghost" oval size="12" icon="about" />
        </div>
      </section>
    </div>
  );
};
