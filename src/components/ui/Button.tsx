import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ className = '', ...props }) => {
  return (
    <button
      className={`bg-[#26201E] text-white px-4 py-2 hover:bg-[#5A554C] disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};
