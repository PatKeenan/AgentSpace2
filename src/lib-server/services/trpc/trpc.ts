import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { getAuth } from '@clerk/nextjs/server'
import jwt from 'jsonwebtoken'

import { prisma } from "@/lib-server/db";

import type {  CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { SignedInAuthObject,SignedOutAuthObject } from "@clerk/nextjs/server";
import { env } from "@/env.mjs";
import { WorkspaceUser } from "@prisma/client";

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject;
  token: string | null
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
  const token = opts.req.headers['x-ws-access'] as string | null
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

const enforcedwsUser = t.middleware(({ ctx, next }) => {
 /*  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (!ctx.token) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }

  const decoded = jwt.verify(ctx.token, env.WS_TOKEN_SECRET) as {userId: string, workspaceId: string, role: WorkspaceUser['role']}
  if(!decoded){
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  if(decoded.role !=='ADMIN' ){
    throw new TRPCError({ code: "FORBIDDEN" });
  }
 */
  return next({
    ctx: {
      auth: ctx.auth,
      token: ctx.token
    },
  });
})



const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
const protectedWSProcedure = t.procedure.use(enforcedwsUser);
export {
  createTRPCContext,
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  protectedWSProcedure
}