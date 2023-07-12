import React from "react";

import { HomeScreenLayout } from "./HomeScreenLayout";
import { WorkspacesList } from "@/components-common/WorkspacesList";
import { useRouter } from "next/router";
/**
 *
 * The home screen is the first screen that a user sees when they visit the site.
 * Its is where they can see a list of all the workspaces they are a member of.
 * The layout of the home screen is different from the layout of the workspace screen.
 *
 */

export const HomeScreen = () => {
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  // Send the user directly to the new workspace screen if they have no workspaces
  const handleNoWorkspaces = () => {
    router.push("/workspaces/new");
  };

  const handleHasWorkspaces = () => {
    setLoading(false);
  };

  return (
    <HomeScreenLayout>
      {!loading && <h2 className="mb-8 text-3xl font-medium">Workspaces</h2>}
      <React.Suspense fallback="">
        <WorkspacesList
          handleNoWorkspaces={handleNoWorkspaces}
          handleHasWorkspaces={handleHasWorkspaces}
        />
      </React.Suspense>
    </HomeScreenLayout>
  );
};
