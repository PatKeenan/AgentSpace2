import React from "react";
import { WorkspaceLayout } from "@/components-common/WorkspaceLayout";
import { Button } from "@/components-common/ui/Button";
import { RoleHandler } from "@/components-common/RoleHandler";
import { trpcApi } from "@/lib-client/services/trpc-api";
import { useWorkspaceAuthStore } from "@/lib-client/hooks/useWorkspaceAuth";
import { useToast } from "@/lib-client/hooks/useToast";
import { ToastAction } from "@/components-common/ui/Toast";
import { useModal } from "@/lib-client/hooks/useModal";
import { H1 } from "@/components-common/ui/Typography";

export const DashboardScreen = () => {
  const { workspaceId } = useWorkspaceAuthStore();
  const { setModalState } = useModal();
  const { toast } = useToast();
  const { data, isLoading, refetch } = trpcApi.workspace.dashboard.useQuery(
    {
      workspaceId: workspaceId as string,
    },
    {
      enabled: !!workspaceId,
      retry: false,
      onError: (error) => {
        if (error.data?.code == "UNAUTHORIZED") {
          setModalState({
            open: true,
            modalContent: "Not authorized",
          });
        } else {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: (
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              <ToastAction altText="Try again" onClick={() => refetch()}>
                Try again
              </ToastAction>
            ),
          });
        }
      },
    }
  );

  return (
    <WorkspaceLayout activeNavItem="Dashboard">
      <H1 theme="pageTitle">Dashboard Screen!</H1>
      <div className="flex space-x-4">
        {/* <RoleHandler
          requires={["ADMIN", "OWNER"]}
          fallback={<div>You cant see this</div>}
        >
          <Button>Admin Button!</Button>
        </RoleHandler>
 */}
        <p>{data?.id}</p>
      </div>
    </WorkspaceLayout>
  );
};
