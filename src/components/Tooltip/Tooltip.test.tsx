import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

// 注册图标
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';
addIcons(allIcons);

describe('Tooltip', () => {
  it('renders with default props', () => {
    render(<Tooltip />);
    expect(screen.getByText('My tooltip')).toBeInTheDocument();
    expect(screen.getByText('This is my tooltips text')).toBeInTheDocument();
  });

  it('renders with custom header and text', () => {
    render(
      <Tooltip
        header="Custom Header"
        textlabel="Custom text content"
      />
    );
    expect(screen.getByText('Custom Header')).toBeInTheDocument();
    expect(screen.getByText('Custom text content')).toBeInTheDocument();
  });

  it('renders close button when closable is true', () => {
    render(<Tooltip closable={true} />);
    const closeButton = screen.getByRole('button', { name: /close tooltip/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('does not render close button when closable is false', () => {
    render(<Tooltip closable={false} />);
    const closeButton = screen.queryByRole('button', { name: /close tooltip/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(<Tooltip closable={true} onClose={handleClose} />);
    
    const closeButton = screen.getByRole('button', { name: /close tooltip/i });
    await user.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders icon when showIcon is true', () => {
    const { container } = render(<Tooltip showIcon={true} icon="about" />);
    const icon = container.querySelector('ix-icon[name="about"]');
    expect(icon).toBeInTheDocument();
  });

  it('does not render icon when showIcon is false', () => {
    const { container } = render(<Tooltip showIcon={false} />);
    const iconFrame = container.querySelector('.tooltip__icon-frame');
    expect(iconFrame).not.toBeInTheDocument();
  });

  it('does not render when visible is false', () => {
    const { container } = render(<Tooltip visible={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders when visible is true', () => {
    render(<Tooltip visible={true} />);
    expect(screen.getByText('My tooltip')).toBeInTheDocument();
  });

  it('renders only header when textlabel is empty', () => {
    render(<Tooltip header="Only Header" textlabel="" />);
    expect(screen.getByText('Only Header')).toBeInTheDocument();
    expect(screen.queryByText('This is my tooltips text')).not.toBeInTheDocument();
  });

  it('renders only text when header is empty', () => {
    render(<Tooltip header="" textlabel="Only text content" />);
    expect(screen.getByText('Only text content')).toBeInTheDocument();
    expect(screen.queryByText('My tooltip')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Tooltip className="custom-tooltip" />);
    const tooltip = container.querySelector('.tooltip');
    expect(tooltip).toHaveClass('custom-tooltip');
  });

  it('renders with custom icon', () => {
    const { container } = render(<Tooltip icon="checkmark" />);
    const icon = container.querySelector('ix-icon[name="checkmark"]');
    expect(icon).toBeInTheDocument();
  });
});
