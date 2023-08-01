import React from "react";

// pt-16 is the height of the header
export const Screen = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex min-h-screen flex-col  pt-16">{children}</div>;
};
