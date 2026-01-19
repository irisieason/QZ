import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  describe('Figma 属性测试', () => {
    it('应该渲染默认的 IconButton', () => {
      render(<IconButton icon="about" aria-label="测试按钮" />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('data-type', 'Primary');
      expect(button).toHaveAttribute('data-state', 'Default');
      expect(button).toHaveAttribute('data-oval', 'false');
      expect(button).toHaveAttribute('data-size', '24');
    });

    it('应该正确应用 type 属性', () => {
      const { rerender } = render(<IconButton type="Primary" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveAttribute('data-type', 'Primary');

      rerender(<IconButton type="Secondary" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveAttribute('data-type', 'Secondary');

      rerender(<IconButton type="Danger" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveAttribute('data-type', 'Danger');
    });

    it('应该正确应用 state 属性', () => {
      const { rerender } = render(<IconButton state="Default" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveAttribute('data-state', 'Default');

      rerender(<IconButton state="Hover" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveAttribute('data-state', 'Hover');

      rerender(<IconButton state="Active" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveAttribute('data-state', 'Active');

      rerender(<IconButton state="Disabled" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveAttribute('data-state', 'Disabled');

      rerender(<IconButton state="Loading" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveAttribute('data-state', 'Loading');
    });

    it('应该正确应用 oval 属性', () => {
      const { rerender } = render(<IconButton oval={false} icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveAttribute('data-oval', 'false');

      rerender(<IconButton oval={true} icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveAttribute('data-oval', 'true');
    });

    it('应该正确应用 size 属性', () => {
      const { rerender } = render(<IconButton size="24" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveAttribute('data-size', '24');

      rerender(<IconButton size="16" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveAttribute('data-size', '16');

      rerender(<IconButton size="12" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveAttribute('data-size', '12');
    });

    it('应该正确应用 focused 属性', () => {
      const { container, rerender } = render(<IconButton focused={false} icon="about" aria-label="测试" />);
      expect(container.querySelector('.icon-button__focus-outline')).toBeInTheDocument();

      rerender(<IconButton focused={true} icon="about" aria-label="测试" />);
      expect(container.querySelector('.icon-button__focus-outline')).toBeInTheDocument();
    });
  });

  describe('扩展属性测试', () => {
    it('应该处理 onClick 事件', () => {
      const handleClick = vi.fn();
      render(<IconButton onClick={handleClick} icon="about" aria-label="测试" />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('应该正确应用 disabled 属性', () => {
      render(<IconButton disabled icon="about" aria-label="测试" />);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('data-state', 'Disabled');
    });

    it('应该正确应用 className', () => {
      render(<IconButton className="custom-class" icon="about" aria-label="测试" />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('icon-button');
    });

    it('应该正确应用 aria-label', () => {
      render(<IconButton aria-label="自定义标签" icon="about" />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('aria-label', '自定义标签');
    });

    it('应该正确应用 buttonType', () => {
      const { rerender } = render(<IconButton buttonType="button" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');

      rerender(<IconButton buttonType="submit" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

      rerender(<IconButton buttonType="reset" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });
  });

  describe('状态行为测试', () => {
    it('Disabled 状态应该禁用按钮', () => {
      render(<IconButton state="Disabled" icon="about" aria-label="测试" />);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
    });

    it('Loading 状态应该禁用按钮并显示加载动画', () => {
      const { container } = render(<IconButton state="Loading" icon="about" aria-label="测试" />);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
      expect(container.querySelector('.icon-button__spinner')).toBeInTheDocument();
    });

    it('disabled 属性应该覆盖 state 属性', () => {
      render(<IconButton state="Default" disabled icon="about" aria-label="测试" />);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('data-state', 'Disabled');
    });

    it('Disabled 和 Loading 状态不应该触发 onClick', () => {
      const handleClick = vi.fn();
      
      const { rerender } = render(
        <IconButton state="Disabled" onClick={handleClick} icon="about" aria-label="测试" />
      );
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();

      rerender(<IconButton state="Loading" onClick={handleClick} icon="about" aria-label="测试" />);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('CSS 类名测试', () => {
    it('应该应用正确的类型类名', () => {
      const { rerender } = render(<IconButton type="Primary" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveClass('icon-button--primary');

      rerender(<IconButton type="Primary outline" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveClass('icon-button--primary-outline');

      rerender(<IconButton type="Secondary ghost" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveClass('icon-button--secondary-ghost');
    });

    it('应该应用正确的状态类名', () => {
      const { rerender } = render(<IconButton state="Hover" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveClass('icon-button--hover');

      rerender(<IconButton state="Active" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveClass('icon-button--active');

      rerender(<IconButton state="Disabled" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveClass('icon-button--disabled');

      rerender(<IconButton state="Loading" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveClass('icon-button--loading');
    });

    it('应该应用正确的尺寸类名', () => {
      const { rerender } = render(<IconButton size="24" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveClass('icon-button--size-24');

      rerender(<IconButton size="16" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveClass('icon-button--size-16');

      rerender(<IconButton size="12" icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveClass('icon-button--size-12');
    });

    it('应该应用正确的形状类名', () => {
      const { rerender } = render(<IconButton oval={false} icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).not.toHaveClass('icon-button--oval');

      rerender(<IconButton oval={true} icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveClass('icon-button--oval');
    });

    it('应该应用正确的聚焦类名', () => {
      const { rerender } = render(<IconButton focused={false} icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).not.toHaveClass('icon-button--focused');

      rerender(<IconButton focused={true} icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toHaveClass('icon-button--focused');
    });
  });

  describe('图标渲染测试', () => {
    it('应该渲染图标', () => {
      const { container } = render(<IconButton icon="about" aria-label="测试" />);
      const icon = container.querySelector('ix-icon');
      
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('name', 'about');
    });

    it('应该根据尺寸渲染正确大小的图标', () => {
      const { container, rerender } = render(<IconButton size="24" icon="about" aria-label="测试" />);
      expect(container.querySelector('ix-icon')).toHaveAttribute('size', '24');

      rerender(<IconButton size="16" icon="about" aria-label="测试" />);
      expect(container.querySelector('ix-icon')).toHaveAttribute('size', '16');

      rerender(<IconButton size="12" icon="about" aria-label="测试" />);
      expect(container.querySelector('ix-icon')).toHaveAttribute('size', '12');
    });

    it('Loading 状态应该显示加载动画而不是图标', () => {
      const { container } = render(<IconButton state="Loading" icon="about" aria-label="测试" />);
      
      expect(container.querySelector('.icon-button__spinner')).toBeInTheDocument();
      expect(container.querySelector('ix-icon')).not.toBeInTheDocument();
    });
  });

  describe('可访问性测试', () => {
    it('应该有正确的 role', () => {
      render(<IconButton icon="about" aria-label="测试" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('应该有默认的 aria-label', () => {
      render(<IconButton icon="about" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Icon button about');
    });

    it('应该支持自定义 aria-label', () => {
      render(<IconButton icon="about" aria-label="关于按钮" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', '关于按钮');
    });

    it('Loading 状态的加载动画应该有 aria-label', () => {
      const { container } = render(<IconButton state="Loading" icon="about" aria-label="测试" />);
      const spinner = container.querySelector('.icon-button__spinner');
      expect(spinner).toHaveAttribute('aria-label', 'Loading');
    });
  });
});
