import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ className = '', ...props }) => {
  return (
    <button
      className={`bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};
