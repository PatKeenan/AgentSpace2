import { Header } from "@/components-common/Header";
import { Main } from "@/components-common/Main";
import { Screen } from "@/components-common/Screen";
import React from "react";

export const HomeScreenLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Screen>
      <Header location="homeScreen" />
      <Main>{children}</Main>
    </Screen>
  );
};
