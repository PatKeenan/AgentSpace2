import React from "react";

import { Screen, Header, Main } from "@/components-common";

import { useRouter } from "next/router";
import { trpcApi } from "@/lib-client/services/trpc-api";
import { useWorkspaceAuthStore } from "@/lib-client/hooks/useWorkspaceAuth";
import { RootModal } from "@/components-common/modals/RootModal";
import Link from "next/link";
import { LockIcon } from "lucide-react";
import { Button } from "./ui/Button";
import { type NavItemOptions, WorkspaceSidebar } from "./WorkspaceSidebar";

type WorkspaceLayoutProps = {
  children: React.ReactNode;
  activeNavItem?: NavItemOptions;
};

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  children,
  activeNavItem,
}) => {
  const { setState, user } = useWorkspaceAuthStore();

  const router = useRouter();
  const workspaceId = router.query.workspaceId;

  const { data, isLoading } =
    trpcApi.workspaceUser.getWorkspacePermissions.useQuery(
      {
        workspaceId: workspaceId as string,
      },
      {
        retry(failureCount, error) {
          if (failureCount > 1 && error.data?.code === "UNAUTHORIZED") {
            return false;
          }
          return true;
        },
        refetchOnMount: user?.role !== "OWNER",
        enabled: typeof workspaceId === "string" && user?.role !== "OWNER",
        onSuccess: (data) => {
          if (data.workspaceId && data.userId) {
            setState({ workspaceId: data.workspaceId, user: data });
          }
        },
      }
    );

  React.useEffect(() => {
    return () => {
      setState({
        user: undefined,
        workspaceId: undefined,
      });
    };
  }, [setState]);

  return typeof workspaceId !== "string" || (!data && isLoading) ? (
    <div className="grid h-screen w-screen place-items-center">
      <div className="animate-pulse text-2xl">Loading...</div>
    </div>
  ) : data && !isLoading ? (
    <Screen>
      <Header location="workspaceScreen" />
      <div className="flex h-full min-h-full min-w-full flex-auto">
        <WorkspaceSidebar activeItem={activeNavItem} />
        <Main fullWidth className="ml-60">
          <RootModal />
          {children}
        </Main>
      </div>
    </Screen>
  ) : (
    <div className="grid h-screen w-screen place-items-center text-center">
      <div>
        <LockIcon className="mx-auto -mt-2 mb-1 h-20 w-20 text-center text-gray-400" />
        <div className="text-2xl font-bold">Not Authorized</div>
        <p className="mb-2 text-sm text-muted-foreground">
          Contact your workspace administrator for access
        </p>
        <Button asChild>
          <Link href="/">Return to home</Link>
        </Button>
      </div>
    </div>
  );
};
