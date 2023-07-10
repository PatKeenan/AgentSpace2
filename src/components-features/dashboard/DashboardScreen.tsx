import React from "react";
import { WorkspaceLayout } from "@/components-common/WorkspaceLayout";
import { Button } from "@/components-common/ui/Button";
import { RoleHandler } from "@/components-common/RoleHandler";
import { trpcApi } from "@/lib-client/services/trpc-api";
import { useWorkspaceAuthStore } from "@/lib-client/hooks/useWorkspaceAuth";

export const DashboardScreen = () => {
  const { workspaceId } = useWorkspaceAuthStore();

  const { data, isLoading } = trpcApi.workspace.getOwner.useQuery(
    {
      workspaceId: workspaceId as string,
    },
    {
      enabled: !!workspaceId,
      retry: false,
    }
  );

  return (
    <WorkspaceLayout>
      <div>Dashboard Screen!</div>
      <div className="flex space-x-4">
        <RoleHandler
          requires={["ADMIN"]}
          fallback={<div>You cant see this</div>}
        >
          <Button>Admin Button!</Button>
        </RoleHandler>

        <p>{data?.id}</p>
      </div>
    </WorkspaceLayout>
  );
};
