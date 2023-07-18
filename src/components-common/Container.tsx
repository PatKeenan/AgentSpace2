import React from "react";
import { cn } from "@/lib-client/utils";

type ContainerProps = {
  children: React.ReactNode;
  as?: React.ElementType;
  width?: "site" | "full";
  pt?: string;
  pb?: string;
  pl?: string;
  pr?: string;
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  pt = "pt-8",
  pb = "pb-8",
  pl = "pl-8",
  pr = "pr-8",
  as: Tag = "div",
  width = "site",
}) => {
  return (
    <Tag
      className={cn(
        width === "site" ? "mx-auto w-full max-w-6xl" : "w-full",
        pt,
        pb,
        pl,
        pr,
        className
      )}
    >
      {children}
    </Tag>
  );
};
