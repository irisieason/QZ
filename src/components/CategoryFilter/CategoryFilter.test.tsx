import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { CategoryFilter } from './CategoryFilter';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

describe('CategoryFilter', () => {
  it('renders with default props', () => {
    render(<CategoryFilter />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search');
  });

  it('renders with custom placeholder text', () => {
    render(<CategoryFilter placeholderText="Filter categories..." />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Filter categories...');
  });

  it('shows search icon by default', () => {
    render(<CategoryFilter />);
    
    const icon = screen.getByRole('textbox').closest('.category-filter')?.querySelector('ix-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('name', 'search');
  });

  it('hides search icon when searchIcon is false', () => {
    render(<CategoryFilter searchIcon={false} />);
    
    const icon = screen.getByRole('textbox').closest('.category-filter')?.querySelector('ix-icon');
    expect(icon).not.toBeInTheDocument();
  });

  it('handles controlled input', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<CategoryFilter value="test" onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test');
    
    await user.type(input, 'ing');
    expect(handleChange).toHaveBeenCalledTimes(3);
  });

  it('handles uncontrolled input', async () => {
    const user = userEvent.setup();
    
    render(<CategoryFilter defaultValue="initial" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('initial');
    
    await user.clear(input);
    await user.type(input, 'new value');
    expect(input).toHaveValue('new value');
  });

  it('calls onFocus when input is focused', async () => {
    const user = userEvent.setup();
    const handleFocus = vi.fn();
    
    render(<CategoryFilter onFocus={handleFocus} />);
    
    const input = screen.getByRole('textbox');
    await user.click(input);
    
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when input loses focus', async () => {
    const user = userEvent.setup();
    const handleBlur = vi.fn();
    
    render(<CategoryFilter onBlur={handleBlur} />);
    
    const input = screen.getByRole('textbox');
    await user.click(input);
    await user.tab();
    
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();
    
    render(<CategoryFilter onSearch={handleSearch} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'search term');
    await user.keyboard('{Enter}');
    
    expect(handleSearch).toHaveBeenCalledWith('search term');
  });

  it('applies disabled state correctly', () => {
    render(<CategoryFilter disabled={true} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('applies readonly state correctly', () => {
    render(<CategoryFilter readOnly={true} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });

  it('applies custom className', () => {
    render(<CategoryFilter className="custom-class" />);
    
    const container = screen.getByRole('textbox').closest('.category-filter');
    expect(container).toHaveClass('custom-class');
  });

  it('supports aria-label', () => {
    render(<CategoryFilter aria-label="Search categories" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-label', 'Search categories');
  });

  it('shows focus outline when focused', async () => {
    const user = userEvent.setup();
    
    render(<CategoryFilter />);
    
    const input = screen.getByRole('textbox');
    await user.click(input);
    
    const container = input.closest('.category-filter');
    expect(container).toHaveClass('category-filter--focused');
  });

  it('shows filled state when input has value', async () => {
    const user = userEvent.setup();
    
    render(<CategoryFilter />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'test');
    
    const container = input.closest('.category-filter');
    expect(container).toHaveClass('category-filter--filled');
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    
    render(<CategoryFilter ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(screen.getByRole('textbox'));
  });

  it('shows clear button when input has value', async () => {
    render(<CategoryFilter defaultValue="test content" clearable={true} />);
    
    // 清除按钮应该显示（现在是 IconButton）
    const clearButton = screen.getByRole('button', { name: /clear input/i });
    expect(clearButton).toBeInTheDocument();
    expect(clearButton).toHaveClass('category-filter__clear-button');
  });

  it('hides clear button when input is empty', () => {
    render(<CategoryFilter clearable={true} />);
    
    // 清除按钮不应该显示
    const clearButton = screen.queryByRole('button', { name: /clear input/i });
    expect(clearButton).not.toBeInTheDocument();
  });

  it('clears input when clear button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    const mockOnClear = vi.fn();
    
    render(
      <CategoryFilter 
        defaultValue="test content" 
        clearable={true}
        onChange={mockOnChange}
        onClear={mockOnClear}
      />
    );
    
    const clearButton = screen.getByRole('button', { name: /clear input/i });
    
    await user.click(clearButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('', expect.any(Object));
    expect(mockOnClear).toHaveBeenCalled();
  });

  it('clears input when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    const mockOnClear = vi.fn();
    
    render(
      <CategoryFilter 
        defaultValue="test content" 
        clearable={true}
        onChange={mockOnChange}
        onClear={mockOnClear}
      />
    );
    
    const input = screen.getByRole('textbox');
    
    await user.type(input, '{Escape}');
    
    expect(mockOnChange).toHaveBeenCalledWith('', expect.any(Object));
    expect(mockOnClear).toHaveBeenCalled();
  });

  it('does not show clear button when clearable is false', () => {
    render(<CategoryFilter defaultValue="test content" clearable={false} />);
    
    // 清除按钮不应该显示
    const clearButton = screen.queryByRole('button', { name: /clear input/i });
    expect(clearButton).not.toBeInTheDocument();
  });

  it('does not show clear button in disabled state', () => {
    render(<CategoryFilter defaultValue="test content" disabled={true} clearable={true} />);
    
    // 清除按钮不应该显示
    const clearButton = screen.queryByRole('button', { name: /clear input/i });
    expect(clearButton).not.toBeInTheDocument();
  });

  it('does not show clear button in readonly state', () => {
    render(<CategoryFilter defaultValue="test content" readOnly={true} clearable={true} />);
    
    // 清除按钮不应该显示
    const clearButton = screen.queryByRole('button', { name: /clear input/i });
    expect(clearButton).not.toBeInTheDocument();
  });

  it('shows clear button when typing in input', async () => {
    const user = userEvent.setup();
    
    render(<CategoryFilter clearable={true} />);
    
    const input = screen.getByRole('textbox');
    
    // 初始状态不显示清除按钮
    expect(screen.queryByRole('button', { name: /clear input/i })).not.toBeInTheDocument();
    
    // 输入文字后显示清除按钮
    await user.type(input, 'test');
    
    const clearButton = screen.getByRole('button', { name: /clear input/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('does not clear on Escape when clearable is false', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    const mockOnClear = vi.fn();
    
    render(
      <CategoryFilter 
        defaultValue="test content" 
        clearable={false}
        onChange={mockOnChange}
        onClear={mockOnClear}
      />
    );
    
    const input = screen.getByRole('textbox');
    
    await user.type(input, '{Escape}');
    
    // 不应该触发清除
    expect(mockOnClear).not.toHaveBeenCalled();
    expect(input).toHaveValue('test content');
  });
});