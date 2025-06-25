import React from 'react';

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`bg-[#DFD6C2] border flex flex-col border-[#26201E] ${className}`}>
    {children}
  </div>
);

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={` flex flex-col ${className} `} style={{overflowY:'scroll', scrollbarWidth:'thin' , }}>{children}</div>
);
