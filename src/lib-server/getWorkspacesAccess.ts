import { prisma } from "@/lib-server/db";
import { clerkClient } from "@clerk/nextjs";

import type {
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/dist/types/server";

// Used to get workspace access info for the current user
export async function getWorkspacesAccess(
  auth: SignedInAuthObject | SignedOutAuthObject
) {
  if (auth && auth.userId) {
    const userInfo = await clerkClient.users.getUser(auth.userId);
    const emails = userInfo.emailAddresses.map((email) => email.emailAddress);
    if (emails.length > 0) {
      return await prisma.workspaceUser.findMany({
        where: {
          email: {
            in: emails,
          },
        },
        select: {
          workspaceId: true,
          role: true,
          status: true,
        },
      });
    }
  }
  return undefined;
}
