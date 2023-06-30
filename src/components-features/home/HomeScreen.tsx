import React from "react";

import { HomeScreenLayout } from "./HomeScreenLayout";
import { WorkspacesList } from "@/components-common/WorkspacesList";
/**
 *
 * The home screen is the first screen that a user sees when they visit the site.
 * Its is where they can see a list of all the workspaces they are a member of.
 * The layout of the home screen is different from the layout of the workspace screen.
 *
 */

export const HomeScreen = () => {
  return (
    <HomeScreenLayout>
      <h2 className="mb-8 text-3xl font-medium">Workspaces</h2>
      <React.Suspense fallback="Loading...">
        <WorkspacesList />
      </React.Suspense>
    </HomeScreenLayout>
  );
};
