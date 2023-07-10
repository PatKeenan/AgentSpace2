import { WorkspaceUser } from "@prisma/client";

export type TokenShape = {
  workspaceId: string;
  userId: string;
  role: WorkspaceUser["role"];
  status: WorkspaceUser["status"];
};
