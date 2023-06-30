import React from "react";

export const Screen = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex min-h-screen flex-col">{children}</div>;
};
