import { SignedInAuthObject } from "@clerk/nextjs/dist/types/server";
import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { prisma } from "../db";
import { clerkClient } from "@clerk/nextjs";

class WorkspaceUserDbService {
    db: PrismaClient
    constructor(){
        this.db = prisma 
    }
    async getWorkspacePermissions(auth: SignedInAuthObject,workspaceId: string){
        const userPrimaryEmail = await clerkClient.users.getUser(auth.userId).then((user) => user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress)
        const workspaceUser = await this.db.workspaceUser.findFirst({
            where: {    
                'OR': [{
                    workspaceId: workspaceId,
                    userId: auth.userId
                },
                {
                    workspaceId: workspaceId,
                    email: userPrimaryEmail
                }
            ]
            }
        })

        if(workspaceUser && !workspaceUser.email && userPrimaryEmail){
            await this.db.workspaceUser.update({
                where: {
                   id: workspaceUser.id
                },
                data: {
                    email: userPrimaryEmail
                }
            })
        }

        if(!workspaceUser || ['BANNED', "REMOVED"].includes(workspaceUser.status )){
            throw new TRPCError({code: 'UNAUTHORIZED'})
        }

        if(!workspaceUser.userId){
            await this.db.workspaceUser.update({
                where: {
                    workspaceId_userId:{
                        workspaceId: workspaceId,
                        userId: auth.userId
                    }
                },
                data: {
                    userId: auth.userId
                }
            })
        }
        return workspaceUser
    }

}

export const workspaceUserDbService = new WorkspaceUserDbService()
