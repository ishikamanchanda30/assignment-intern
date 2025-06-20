import React from 'react';
type SelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
};
export const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  return <div className="relative">{children}</div>;
};

export const SelectTrigger: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => {
  return <div className={className}>{children}</div>;
};

export const SelectValue: React.FC<{ placeholder: string }> = ({ placeholder }) => {
  return <span>{placeholder}</span>;
};

export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};
