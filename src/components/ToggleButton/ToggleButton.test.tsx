import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToggleButton } from './ToggleButton';

// 注册图标
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';
addIcons(allIcons);

describe('ToggleButton', () => {
  it('renders with default props', () => {
    render(<ToggleButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Toggle');
  });

  it('renders with custom label', () => {
    render(<ToggleButton label="Custom Toggle" />);
    expect(screen.getByText('Custom Toggle')).toBeInTheDocument();
  });

  it('toggles state on click (uncontrolled)', () => {
    const handleToggle = vi.fn();
    render(<ToggleButton onToggle={handleToggle} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    
    fireEvent.click(button);
    expect(handleToggle).toHaveBeenCalledWith(true, expect.any(Object));
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('works in controlled mode', () => {
    const handleToggle = vi.fn();
    const { rerender } = render(
      <ToggleButton toggled={false} onToggle={handleToggle} />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    
    fireEvent.click(button);
    expect(handleToggle).toHaveBeenCalledWith(true, expect.any(Object));
    
    rerender(<ToggleButton toggled={true} onToggle={handleToggle} />);
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('is disabled when disabled prop is true', () => {
    render(<ToggleButton disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('does not toggle when disabled', () => {
    const handleToggle = vi.fn();
    render(<ToggleButton disabled onToggle={handleToggle} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleToggle).not.toHaveBeenCalled();
  });
});
