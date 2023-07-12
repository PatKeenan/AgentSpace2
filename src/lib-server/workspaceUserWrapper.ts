// Wrap trpc function to check the user has permission to access the workspace and return a callback function that can be used as a middleware

import {
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/dist/types/server";
import { TRPCError } from "@trpc/server";
import { workspaceUserDbService } from "./services/WorkspaceUserDbService";
import { WorkspaceUser } from "@prisma/client";

// Middleware for trpc that checks if the user has permission to access the workspace or has the required role
// TODO: Make this into a session token or a cookie in the future

export async function workspaceUserWrapper<T extends (...args: any) => any>(
  auth: SignedInAuthObject | SignedOutAuthObject,
  workspaceId: string,
  requires: WorkspaceUser["role"][] | undefined,
  fn: T
) {
  // Check if the user is signed in
  if (!auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  // Check if the user has permission to access the workspace
  const workspaceUser = await workspaceUserDbService.getWorkspacePermissions(
    auth,
    workspaceId
  );



  // Check if the user has the required role
  if (requires && !requires.includes(workspaceUser.role)) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  // Call the callback function
  return (await fn({ workspaceUser })) as ReturnType<T>;
}
