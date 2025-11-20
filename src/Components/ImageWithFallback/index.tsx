import { useState, useCallback, memo } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const ImageWithFallback = memo(function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackSrc = '/default-image.jpg',
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  const handleError = useCallback(() => {
    setError(true);
  }, []);

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
});