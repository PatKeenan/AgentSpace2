import React from "react";
import Link from "next/link";

import { Card, CardContent } from "./ui/Card";
import { PlusIcon } from "lucide-react";
import {
  WorkspaceCard,
  WorkspaceCardContainer,
} from "@/components-common/WorkspaceCard";
import { trpcApi } from "@/lib-client/services/trpc-api";

type WorkspacesListProps = {
  handleNoWorkspaces?: () => void;
  handleHasWorkspaces?: () => void;
};
export const WorkspacesList: React.FC<WorkspacesListProps> = ({
  handleNoWorkspaces,
  handleHasWorkspaces,
}) => {
  const [hasWorkspaces, setHasWorkspaces] = React.useState(false);

  const { data, isLoading } = trpcApi.workspace.list.useQuery(undefined, {
    onSuccess: (d) => {
      if (d?.length > 0) {
        setHasWorkspaces(true);
        handleHasWorkspaces?.();
      } else {
        handleNoWorkspaces?.();
      }
    },
  });

  return !data && isLoading ? (
    <></>
  ) : hasWorkspaces ? (
    <div className="flex w-full flex-col-reverse gap-8 sm:flex-row sm:flex-wrap">
      <WorkspaceCardContainer>
        <Link href={`/workspaces/new`}>
          <Card className="group flex h-full w-full cursor-pointer flex-col justify-center overflow-hidden transition-shadow duration-200 ease-linear hover:shadow-xl">
            <CardContent className="grid h-full w-full place-items-center">
              <div className="-mb-6 text-center">
                <div className="flex flex-col text-center">
                  <PlusIcon
                    size={40}
                    className=" mx-auto mb-6 text-indigo-500 transition-colors duration-200 ease-in-out group-hover:text-indigo-600"
                  />
                  <span className="text-sm">Add workspace</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </WorkspaceCardContainer>

      {data?.map((workspace, idx) => (
        <WorkspaceCardContainer key={workspace.id}>
          <Link href={`/workspaces/${workspace.id}`}>
            <WorkspaceCard
              title={workspace.name}
              plan="team"
              updatedAt={new Date(workspace.updatedAt).toLocaleDateString()}
            />
          </Link>
        </WorkspaceCardContainer>
      ))}
    </div>
  ) : (
    <></>
  );
};
