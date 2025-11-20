import { render, screen, fireEvent } from '@testing-library/react';
import { ImageWithFallback } from './index';

describe('ImageWithFallback', () => {
  it('renders with provided src', () => {
    render(<ImageWithFallback src="/test-image.jpg" alt="Test image" />);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test-image.jpg');
  });

  it('shows fallback on image error', () => {
    const fallbackSrc = '/fallback.jpg';
    render(<ImageWithFallback src="/broken-image.jpg" alt="Test" fallbackSrc={fallbackSrc} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/broken-image.jpg');

    // Simulate image load error
    fireEvent.error(img);

    expect(img).toHaveAttribute('src', fallbackSrc);
  });

  it('applies custom className', () => {
    render(<ImageWithFallback src="/test.jpg" alt="Test" className="custom-image-class" />);

    const img = screen.getByRole('img');
    expect(img).toHaveClass('custom-image-class');
  });

  it('renders with correct alt text', () => {
    const altText = 'Descriptive alt text';
    render(<ImageWithFallback src="/test.jpg" alt={altText} />);

    expect(screen.getByAltText(altText)).toBeInTheDocument();
  });

  it('uses default fallback when not provided', () => {
    render(<ImageWithFallback src="/broken.jpg" alt="Test" />);

    const img = screen.getByRole('img');
    fireEvent.error(img);

    expect(img).toHaveAttribute('src', '/default-image.jpg');
  });
});
