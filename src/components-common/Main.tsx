import { cn } from "@/lib-client/utils";
import React from "react";

type MainProps = {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
};
export const Main: React.FC<MainProps> = ({
  children,
  className,
  fullWidth = false,
}) => {
  return (
    <main
      className={cn(
        !fullWidth && "mx-auto max-w-6xl",
        "flex h-full w-full flex-auto flex-grow flex-col p-8 sm:p-12",
        className
      )}
    >
      {children}
    </main>
  );
};
