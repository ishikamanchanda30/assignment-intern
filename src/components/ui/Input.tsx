import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = '', ...props }, ref) => (
  <input
    ref={ref}
    className={`px-3 py-2 focus:outline-none ${className}`}
    {...props}
  />
));

Input.displayName = 'Input';
