import React from "react";

import { Screen, Header, Main } from "@/components-common";

import { useRouter } from "next/router";
import { trpcApi } from "@/lib-client/services/trpc-api";
import { useWorkspaceAuthStore } from "@/lib-client/hooks/useWorkspaceAuth";

type WorkspaceLayoutProps = {
  children: React.ReactNode;
};

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  children,
}) => {
  const { setState } = useWorkspaceAuthStore();

  const router = useRouter();
  const workspaceId = router.query.workspaceId;

  const { data, isLoading } =
    trpcApi.workspaceUser.getWorkspacePermissions.useQuery(
      {
        workspaceId: workspaceId as string,
      },
      {
        enabled: typeof workspaceId === "string",
      }
    );

  React.useEffect(() => {
    if (data && typeof workspaceId === "string") {
      setState({ workspaceId, user: data });
    }
    return () => {
      setState({ user: undefined, workspaceId: undefined });
    };
  }, [data, workspaceId]);

  return typeof workspaceId !== "string" || (!data && isLoading) ? (
    <div>Loading...</div>
  ) : data && !isLoading ? (
    <Screen>
      <Header location="workspaceScreen" />
      <Main fullWidth>{children}</Main>
    </Screen>
  ) : (
    <div>Not Authorized</div>
  );
};
