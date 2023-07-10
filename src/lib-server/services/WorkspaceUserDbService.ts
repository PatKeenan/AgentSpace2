import { SignedInAuthObject } from "@clerk/nextjs/dist/types/server";
import type { PrismaClient } from "@prisma/client";

import { authService } from "./authService";
import { TRPCError } from "@trpc/server";
import { prisma } from "../db";


class WorkspaceUserDbService {
    db: PrismaClient
    constructor(){
        this.db = prisma 
    }
    async getWorkspacePermissions(auth: SignedInAuthObject,workspaceId: string){
        const userEmail = await authService.getUserPrimaryEmail(auth)
        if(!userEmail){
            throw new TRPCError({code: 'UNAUTHORIZED'})
        }

        const workspaceUser = await this.db.workspaceUser.findUnique({
            where: {
                email_workspaceId:{
                    email: userEmail,
                    workspaceId: workspaceId
                }
            }
        })

        if(!workspaceUser || ['BANNED', "REMOVED"].includes(workspaceUser.status )){
            throw new TRPCError({code: 'UNAUTHORIZED'})
        }
        return workspaceUser
    }

}

export const workspaceUserDbService = new WorkspaceUserDbService()
