import { Header, Screen } from "@/components-common";
import { Container } from "@/components-common/Container";
import { H1 } from "@/components-common/ui/Typography";
import React from "react";

export const SettingsScreen = () => {
  return (
    <Screen>
      <Header location="workspaceScreen" />
      <Container width="site">
        <div className="">
          <H1>Workspace Settings</H1>
        </div>
      </Container>
    </Screen>
  );
};
