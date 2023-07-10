import { useWorkspaceAuthStore } from "@/lib-client/hooks/useWorkspaceAuth";
import { WorkspaceUser } from "@prisma/client";
import React from "react";

type RoleHandlerProps = {
  requires: WorkspaceUser["role"][] | WorkspaceUser["role"];
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export const RoleHandler: React.FC<RoleHandlerProps> = ({
  requires,
  children,
  fallback,
}) => {
  const { user } = useWorkspaceAuthStore();

  if (!user?.role) {
    return fallback ? fallback : null;
  }
  const { role } = user;
  const requiredRoles = Array.isArray(requires) ? requires : [requires];

  const isAuthorized = requiredRoles.includes(role);

  return isAuthorized ? (
    <React.Fragment>{children}</React.Fragment>
  ) : fallback ? (
    fallback
  ) : null;
};
