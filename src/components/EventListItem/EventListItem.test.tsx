import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EventListItem } from './EventListItem';
import { addIcons } from '@irisieason/ix-icons';
import * as allIcons from '@irisieason/ix-icons/icons';

// 注册所有图标
addIcons(allIcons);

describe('EventListItem', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<EventListItem>Test Content</EventListItem>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <EventListItem>
          <div>Title</div>
          <div>Description</div>
        </EventListItem>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(
        <EventListItem className="custom-class">Content</EventListItem>
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('Figma Props - chevron', () => {
    it('renders chevron by default', () => {
      const { container } = render(<EventListItem>Content</EventListItem>);
      const chevron = container.querySelector('.event-list-item__chevron');
      expect(chevron).toBeInTheDocument();
    });

    it('hides chevron when chevron=false', () => {
      const { container } = render(
        <EventListItem chevron={false}>Content</EventListItem>
      );
      const chevron = container.querySelector('.event-list-item__chevron');
      expect(chevron).not.toBeInTheDocument();
    });
  });

  describe('Figma Props - focused', () => {
    it('does not show focus outline by default', () => {
      const { container } = render(<EventListItem>Content</EventListItem>);
      const outline = container.querySelector('.event-list-item__focus-outline');
      expect(outline).not.toBeInTheDocument();
    });

    it('shows focus outline when focused=true', () => {
      const { container } = render(
        <EventListItem focused={true}>Content</EventListItem>
      );
      const outline = container.querySelector('.event-list-item__focus-outline');
      expect(outline).toBeInTheDocument();
    });

    it('applies focused class', () => {
      const { container } = render(
        <EventListItem focused={true}>Content</EventListItem>
      );
      expect(container.querySelector('.event-list-item--focused')).toBeInTheDocument();
    });
  });

  describe('Figma Props - state', () => {
    it('renders Default state by default', () => {
      const { container } = render(<EventListItem>Content</EventListItem>);
      const item = container.querySelector('.event-list-item');
      expect(item?.getAttribute('data-state')).toBe('Default');
    });

    it('renders Hover state', () => {
      const { container } = render(
        <EventListItem state="Hover">Content</EventListItem>
      );
      expect(container.querySelector('.event-list-item--hover')).toBeInTheDocument();
    });

    it('renders Active state', () => {
      const { container } = render(
        <EventListItem state="Active">Content</EventListItem>
      );
      expect(container.querySelector('.event-list-item--active')).toBeInTheDocument();
    });

    it('renders Disabled state', () => {
      const { container } = render(
        <EventListItem state="Disabled">Content</EventListItem>
      );
      expect(container.querySelector('.event-list-item--disabled')).toBeInTheDocument();
    });
  });

  describe('Figma Props - selected', () => {
    it('is not selected by default', () => {
      const { container } = render(<EventListItem>Content</EventListItem>);
      expect(container.querySelector('.event-list-item--selected')).not.toBeInTheDocument();
    });

    it('shows selection border when selected=true', () => {
      const { container } = render(
        <EventListItem selected={true}>Content</EventListItem>
      );
      const border = container.querySelector('.event-list-item__selection-border');
      expect(border).toBeInTheDocument();
    });

    it('applies selected class', () => {
      const { container } = render(
        <EventListItem selected={true}>Content</EventListItem>
      );
      expect(container.querySelector('.event-list-item--selected')).toBeInTheDocument();
    });
  });

  describe('Extended Props - severity', () => {
    it('renders alarm severity by default', () => {
      const { container } = render(<EventListItem>Content</EventListItem>);
      expect(container.querySelector('.event-list-item__severity--alarm')).toBeInTheDocument();
    });

    it('renders warning severity', () => {
      const { container } = render(
        <EventListItem severity="warning">Content</EventListItem>
      );
      expect(container.querySelector('.event-list-item__severity--warning')).toBeInTheDocument();
    });

    it('renders critical severity', () => {
      const { container } = render(
        <EventListItem severity="critical">Content</EventListItem>
      );
      expect(container.querySelector('.event-list-item__severity--critical')).toBeInTheDocument();
    });

    it('renders info severity', () => {
      const { container } = render(
        <EventListItem severity="info">Content</EventListItem>
      );
      expect(container.querySelector('.event-list-item__severity--info')).toBeInTheDocument();
    });

    it('renders success severity', () => {
      const { container } = render(
        <EventListItem severity="success">Content</EventListItem>
      );
      expect(container.querySelector('.event-list-item__severity--success')).toBeInTheDocument();
    });

    it('renders neutral severity', () => {
      const { container } = render(
        <EventListItem severity="neutral">Content</EventListItem>
      );
      expect(container.querySelector('.event-list-item__severity--neutral')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<EventListItem onClick={handleClick}>Content</EventListItem>);
      
      const item = screen.getByRole('listitem');
      fireEvent.click(item);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <EventListItem state="Disabled" onClick={handleClick}>
          Content
        </EventListItem>
      );
      
      const item = screen.getByRole('listitem');
      fireEvent.click(item);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('changes to hover state on mouse enter', () => {
      const { container } = render(<EventListItem>Content</EventListItem>);
      const item = screen.getByRole('listitem');
      
      fireEvent.mouseEnter(item);
      
      expect(container.querySelector('.event-list-item--hover')).toBeInTheDocument();
    });

    it('changes to default state on mouse leave', () => {
      const { container } = render(<EventListItem>Content</EventListItem>);
      const item = screen.getByRole('listitem');
      
      fireEvent.mouseEnter(item);
      fireEvent.mouseLeave(item);
      
      expect(container.querySelector('.event-list-item--hover')).not.toBeInTheDocument();
    });

    it('changes to active state on mouse down', () => {
      const { container } = render(<EventListItem>Content</EventListItem>);
      const item = screen.getByRole('listitem');
      
      fireEvent.mouseDown(item);
      
      expect(container.querySelector('.event-list-item--active')).toBeInTheDocument();
    });

    it('does not change state when controlled', () => {
      const { container } = render(
        <EventListItem state="Default">Content</EventListItem>
      );
      const item = screen.getByRole('listitem');
      
      fireEvent.mouseEnter(item);
      
      expect(container.querySelector('.event-list-item--hover')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has listitem role', () => {
      render(<EventListItem>Content</EventListItem>);
      expect(screen.getByRole('listitem')).toBeInTheDocument();
    });

    it('sets aria-label', () => {
      render(<EventListItem aria-label="Test Label">Content</EventListItem>);
      expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });

    it('sets aria-selected when selected', () => {
      render(<EventListItem selected={true}>Content</EventListItem>);
      const item = screen.getByRole('listitem');
      expect(item).toHaveAttribute('aria-selected', 'true');
    });

    it('sets aria-disabled when disabled', () => {
      render(<EventListItem state="Disabled">Content</EventListItem>);
      const item = screen.getByRole('listitem');
      expect(item).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Combined States', () => {
    it('renders selected and focused together', () => {
      const { container } = render(
        <EventListItem selected={true} focused={true}>
          Content
        </EventListItem>
      );
      expect(container.querySelector('.event-list-item--selected')).toBeInTheDocument();
      expect(container.querySelector('.event-list-item--focused')).toBeInTheDocument();
      expect(container.querySelector('.event-list-item__selection-border')).toBeInTheDocument();
      expect(container.querySelector('.event-list-item__focus-outline')).toBeInTheDocument();
    });

    it('renders disabled and selected together', () => {
      const { container } = render(
        <EventListItem state="Disabled" selected={true}>
          Content
        </EventListItem>
      );
      expect(container.querySelector('.event-list-item--disabled')).toBeInTheDocument();
      expect(container.querySelector('.event-list-item--selected')).toBeInTheDocument();
    });
  });
});
