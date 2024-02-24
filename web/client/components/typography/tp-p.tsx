import React, { ReactNode } from "react";

interface TPPProps {
  children: ReactNode;
  className?: string;
}

export const TPP: React.FC<TPPProps> = ({ children, className }) => (
  <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>
    {children}
  </p>
);
