import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}

export function Input({ type = 'text', className = '', ...props }: InputProps) {
  const baseStyles = 'h-9 w-full rounded-md border px-3 py-1 text-sm outline-none transition';
  const focusStyles = 'focus:border-blue-500 focus:ring-2 focus:ring-blue-200';
  const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed';
  const placeholderStyles = 'placeholder:text-gray-400';
  const fileStyles = 'file:bg-transparent file:border-0 file:text-sm file:font-medium';

  return (
    <input
      type={type}
      className={`${baseStyles} ${focusStyles} ${disabledStyles} ${placeholderStyles} ${fileStyles} ${className}`}
      {...props}
    />
  );
}
