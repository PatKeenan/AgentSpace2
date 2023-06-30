import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { getAuth } from '@clerk/nextjs/server'
import jwt from "jsonwebtoken";

import { prisma } from "@/lib-server/db";

import type {  CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { SignedInAuthObject,SignedOutAuthObject } from "@clerk/nextjs/server";
import type { WorkspaceUser } from "@prisma/client";

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject;
  token: string | string[] | undefined
}


// eslint-disable-next-line @typescript-eslint/require-await
const createInnerTRPCContext = async ({auth, token}: AuthContext) => {
  return {
    auth,
    prisma,
    token
  };
};

const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const auth = getAuth(opts.req)
  const token = opts.req.headers['workspace-token']
  return await createInnerTRPCContext({
    auth,
    token
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const createTRPCRouter = t.router;
const publicProcedure = t.procedure;


const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

const enforcedWorkspaceAccess = t.middleware(({ctx, next}) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  if(!ctx.token){
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const decoded = jwt.verify(ctx.token as string, 'foo-bar') 

  if(!decoded){
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      auth: ctx.auth,
      token: decoded as unknown as {workspaceId: string,userId: string, role: WorkspaceUser['role'], status: WorkspaceUser['status'], iat: number, exp: string},
    },
  });
})



const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
const workspaceProcedure = t.procedure.use(enforcedWorkspaceAccess);

export {
  createTRPCContext,
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  workspaceProcedure,
}