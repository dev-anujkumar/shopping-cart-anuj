import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/common/Button';

describe('Button Component', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  test('renders button with correct text', () => {
    render(<Button onClick={mockOnClick}>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    render(<Button onClick={mockOnClick}>Test Button</Button>);
    const button = screen.getByText('Test Button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    render(<Button onClick={mockOnClick} disabled={true}>Test Button</Button>);
    const button = screen.getByText('Test Button');
    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test('has disabled attribute when disabled', () => {
    render(<Button onClick={mockOnClick} disabled={true}>Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toBeDisabled();
  });

  test('applies custom className', () => {
    render(<Button onClick={mockOnClick} className="custom-class">Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toHaveClass('btn', 'custom-class');
  });

  test('applies btn-added class when provided', () => {
    render(<Button onClick={mockOnClick} className="btn-added">Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toHaveClass('btn', 'btn-added');
  });

  test('renders with default props', () => {
    render(<Button onClick={mockOnClick}>Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toHaveClass('btn');
    expect(button).not.toBeDisabled();
  });

  test('handles empty children', () => {
    render(<Button onClick={mockOnClick}></Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});