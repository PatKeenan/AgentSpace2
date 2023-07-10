import React from "react";
import { useOrganization } from "@clerk/nextjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/Card";
import { clerkClient } from "@clerk/nextjs";

type WorkspaceCardProps = {
  title: string;
  plan?: string;
  updatedAt: string;
  memberCount?: number;
};
export const WorkspaceCard: React.FC<WorkspaceCardProps> = ({
  title,
  plan,
  updatedAt,
  memberCount,
}) => {
  const { organization } = useOrganization();
  return (
    <Card className="group flex h-full w-full cursor-pointer flex-col justify-center overflow-hidden transition-shadow duration-200 ease-linear hover:shadow-xl">
      <CardHeader className="h-[200px] p-0 sm:h-[160px]">
        <div className="grid h-full w-full place-items-center bg-indigo-500 transition-colors duration-200 ease-in-out">
          <CardTitle className="text-sm font-normal text-white">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-0.5 pt-5">
        <p className="text-sm font-medium capitalize">{title}</p>
        <p className="text-sm text-muted-foreground">
          Last updated {updatedAt}
        </p>
      </CardContent>
      <CardFooter className="mt-auto block space-y-1">
        <p className="text-sm text-muted-foreground">
          Members: {memberCount || "--"}
        </p>
        <div className="">
          <span className="-mx-1 rounded-md bg-indigo-50 px-2 py-1 text-sm capitalize text-muted-foreground shadow">
            {plan || "--"}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export const WorkspaceCardContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="h-[400px] w-full sm:h-[364px] sm:w-[292px]">{children}</div>
);
