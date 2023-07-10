import { getWorkspacesAccess } from '@/lib-server/getWorkspacesAccess'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { workspaceUserDbService } from '@/lib-server/services/WorkspaceUserDbService'
import {z} from 'zod'

export const workspaceUserRouter =  createTRPCRouter({
    getWorkspacePermissions: protectedProcedure.input(z.object({
        workspaceId: z.string()})).query(async ({ ctx, input }) => workspaceUserDbService.getWorkspacePermissions(ctx.auth, input.workspaceId))
})
    