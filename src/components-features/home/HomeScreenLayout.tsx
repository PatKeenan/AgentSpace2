import { Header } from "@/components-common/Header";
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
      <main className="mx-auto flex h-full w-full max-w-6xl flex-auto flex-grow flex-col p-8 sm:p-12">
        {children}
      </main>
    </Screen>
  );
};
