import React from "react";
import { Header } from "@/components-common/Header";
import { Screen } from "@/components-common/Screen";

export const WorkspaceLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Screen>
      <Header location="homeScreen" />
      {children}
    </Screen>
  );
};
