import React, { ReactNode } from "react";

interface TPH2Props {
  children: ReactNode;
  className?: string;
}

export const TPH2: React.FC<TPH2Props> = ({ children, className }) => (
  <h2
    className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
  >
    {children}
  </h2>
);
