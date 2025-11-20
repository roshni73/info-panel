import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from './index';

describe('Alert', () => {
  it('renders with default variant', () => {
    render(
      <Alert>
        <AlertTitle>Test Title</AlertTitle>
        <AlertDescription>Test Description</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders with destructive variant', () => {
    render(<Alert variant="destructive">Destructive Alert</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-red-50');
  });

  it('renders AlertTitle correctly', () => {
    render(
      <Alert>
        <AlertTitle>Important Notice</AlertTitle>
      </Alert>
    );

    const title = screen.getByText('Important Notice');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('font-medium');
  });

  it('renders AlertDescription correctly', () => {
    render(
      <Alert>
        <AlertDescription>This is a description</AlertDescription>
      </Alert>
    );

    const description = screen.getByText('This is a description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-gray-600');
  });

  it('has proper ARIA role', () => {
    render(<Alert>Alert content</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
