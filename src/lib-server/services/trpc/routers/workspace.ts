import { WorkspaceSchema } from "@/lib-server/schemas/WorkspaceSchemas";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/lib-server/services/trpc/trpc";
import { workspaceUserWrapper } from "@/lib-server/workspaceUserWrapper";
import { clerkClient } from "@clerk/nextjs";
import { z } from 'zod'

export const workspaceRouter = createTRPCRouter({
    list: protectedProcedure.query(async ({ ctx }) => {
        const userPrimaryEmail = await clerkClient.users.getUser(ctx.auth.userId).then((user) => user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress)
        const workspaceUserArray = await ctx.prisma.workspaceUser.findMany({
            where: { 
                OR: [
                    { userId: ctx.auth.userId
                    },
                    { email: userPrimaryEmail }
                ]
            },
            select: {
                workspace: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        name: true,
                    }
                },
                status: true,
            }
        });
       
        // Filter out any workspace the user is banned or removed from
        const workspaces = workspaceUserArray.filter((workspaceUser) => !['BANNED', "REMOVED"].includes(workspaceUser.status)).map((workspaceUser) => workspaceUser.workspace)
        return workspaces
    }), 
    create: protectedProcedure.input(WorkspaceSchema.create).mutation(async ({ ctx, input }) => {
        const userData = await clerkClient.users.getUser(ctx.auth.userId)
        const userEmail = userData.emailAddresses.find((email) => email.id === userData.primaryEmailAddressId)?.emailAddress
        
        return await ctx.prisma.workspace.create({
            data: {
                name: input.name,
                ownerId: ctx.auth.userId,
                users:{
                    create: {
                            userId: ctx.auth.userId,
                            role: 'OWNER',
                            status: 'ACTIVE',
                            email: userEmail || null
                    }
                }
            },
            include: {
                users: {
                    where: {
                        userId: ctx.auth.userId
                    }
                }
            }
            
        })
    }),
    dashboard: protectedProcedure.input(z.object({
        workspaceId: z.string()
    })).query(async ({ ctx, input }) => workspaceUserWrapper(ctx.auth, input.workspaceId, ['ADMIN', "OWNER"], async ({ workspaceUser }) => {
        return await ctx.prisma.workspace.findUnique({
            where: {
                id: input.workspaceId
            }
        })
    }))
})
