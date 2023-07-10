import React from "react";
import { useOrganizationList } from "@clerk/nextjs";
import Link from "next/link";

import { Card, CardContent } from "./ui/Card";

import { PlusIcon } from "lucide-react";
import { WorkspaceCard, WorkspaceCardContainer } from "./WorkspaceCard";

export const WorkspacesList = () => {
  const { organizationList } = useOrganizationList();
  return (
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

      {organizationList?.map((workspace, idx) => (
        <WorkspaceCardContainer key={workspace.organization.id}>
          <Link href={`/workspaces/${workspace.organization.id}`}>
            <WorkspaceCard
              title={workspace.organization.name}
              plan="team"
              updatedAt={new Date(
                workspace.organization.updatedAt
              ).toLocaleDateString()}
              memberCount={workspace.organization.membersCount}
            />
          </Link>
        </WorkspaceCardContainer>
      ))}
    </div>
  );
};
