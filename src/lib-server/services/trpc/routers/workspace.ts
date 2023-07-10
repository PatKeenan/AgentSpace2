import {
  createTRPCRouter,
  protectedProcedure,
} from "@/lib-server/services/trpc/trpc";
import { workspaceUserWrapper } from "@/lib-server/workspaceUserWrapper";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import {z} from 'zod'



export const workspaceRouter = createTRPCRouter({
    list: protectedProcedure.query(async ({ ctx }) => {
       const userData = await clerkClient.users.getUser(ctx.auth.userId)
       if(!userData || userData.banned){
           throw new TRPCError({"code": 'UNAUTHORIZED'}) 
        }
        const primaryEmail = userData.emailAddresses.find((email) => email.id === userData.primaryEmailAddressId)?.emailAddress || ''
        
        return ctx.prisma.workspaceUser.findMany({
            where: {
                email: primaryEmail,
                status: 'ACTIVE'
            },
            select: {
                workspace: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        securityPolicies: true
                    }
                }
            }
        });
    }),  
    getOwner: protectedProcedure.input(z.object({
        workspaceId: z.string()
    })).query(async ({ ctx, input }) => await workspaceUserWrapper(ctx.auth, input.workspaceId, undefined, async ({ workspaceUser }) => {
        return await ctx.prisma.workspace.findUnique({
            where: {
                id: input.workspaceId
            }
        })
    }))
})
