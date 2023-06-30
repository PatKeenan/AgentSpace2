import React from "react";
import { useOrganizationList } from "@clerk/nextjs";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/Card";

import { PlusIcon } from "lucide-react";

export const WorkspacesList = () => {
  const { organizationList } = useOrganizationList();
  return (
    <div className="flex w-full flex-col-reverse gap-8 sm:flex-row sm:flex-wrap">
      <div className="h-[400px] w-full sm:h-[364px] sm:w-[292px]">
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
      </div>

      {organizationList?.map((workspace, idx) => (
        <div key={idx} className="h-[400px] w-full sm:h-[364px] sm:w-[292px]">
          <Link href={`/workspaces/${workspace.organization.id}`}>
            <WorkspaceCard
              title={workspace.organization.name}
              plan="team"
              updatedAt={new Date(
                workspace.organization.updatedAt
              ).toLocaleDateString()}
              members={workspace.organization.membersCount}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

type WorkspaceCardProps = {
  title: string;
  plan: "free" | "personal" | "team";
  updatedAt: string;
  members: number;
};
const WorkspaceCard: React.FC<WorkspaceCardProps> = ({
  title,
  plan,
  updatedAt,
  members,
}) => {
  return (
    <Card className="group flex h-full w-full cursor-pointer flex-col justify-center overflow-hidden transition-shadow duration-200 ease-linear hover:shadow-xl">
      <CardHeader className="h-[200px] p-0 sm:h-[160px]">
        <div className="grid h-full w-full place-items-center bg-indigo-500 transition-colors duration-200 ease-in-out group-hover:bg-indigo-600">
          <CardTitle className="text-sm font-normal text-background">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-5">
        <p className="text-sm font-medium capitalize">{title}</p>
        <p className="text-sm text-muted-foreground">Updated {updatedAt}</p>
      </CardContent>
      <CardFooter className="mt-auto block space-y-1">
        <p className="text-sm text-muted-foreground">Members: {members}</p>
        <div className="">
          <span className="-mx-1 rounded-md bg-indigo-50 px-2 py-1 text-sm capitalize text-muted-foreground shadow">
            {plan}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};
