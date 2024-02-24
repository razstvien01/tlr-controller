import React, { ReactNode } from 'react';

interface TPH1Props {
  children: ReactNode;
  className?: string;
}

export const TPH1: React.FC<TPH1Props> = ({ children, className }) => (
  <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}>
    {children}
  </h1>
);
