import { createTRPCRouter, protectedProcedure } from '@/lib-server/services/trpc/trpc'
import { workspaceUserDbService } from '@/lib-server/services/WorkspaceUserDbService'
import { WorkspaceUserSchema } from '@/lib-common/schemas/WorkspaceUserSchema'

import {z} from 'zod'


export const workspaceUserRouter =  createTRPCRouter({
    getWorkspacePermissions: protectedProcedure.input(z.object({
        workspaceId: z.string()})).query(async ({ ctx, input }) => workspaceUserDbService.getWorkspacePermissions(ctx.auth, input.workspaceId)),
        addWorkspaceUser: protectedProcedure.input(WorkspaceUserSchema.addUser_Server).mutation(async ({ ctx, input }) => {
           
            return await ctx.prisma.workspaceUser.create({
                data: {
                    workspaceId: input.workspaceId,
                    email: input.email,
                    role: input.role,
                    status: 'ACTIVE',
                }
            })
        })
})
    