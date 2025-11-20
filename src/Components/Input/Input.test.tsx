import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './index';

describe('Input', () => {
  it('renders with default type', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);

    const input = screen.getByPlaceholderText(/type here/i);
    await user.type(input, 'Hello World');

    expect(input).toHaveValue('Hello World');
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Test" />);
    const input = screen.getByPlaceholderText(/test/i);
    expect(input).toHaveClass('custom-class');
  });

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText(/disabled input/i);
    expect(input).toBeDisabled();
  });

  it('respects placeholder text', () => {
    const placeholderText = 'Enter your name';
    render(<Input placeholder={placeholderText} />);
    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });
});
