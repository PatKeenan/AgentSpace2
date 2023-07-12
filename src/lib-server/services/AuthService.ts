import { clerkClient } from "@clerk/nextjs";
import { SignedInAuthObject } from "@clerk/nextjs/dist/types/server";




export class AuthServiceClass {
    constructor(){}

    async getUserData(auth: SignedInAuthObject){
        return await clerkClient.users.getUser(auth.userId)
    }

    async getUserPrimaryEmail(auth: SignedInAuthObject){
        const userData = await this.getUserData(auth)
        return userData.emailAddresses.find((email) => email.id === userData.primaryEmailAddressId)?.emailAddress
    }
    async getOrganizationMemberShip(auth: SignedInAuthObject, organizationId: string){
        const organizationMembers = await clerkClient.organizations.getOrganizationMembershipList({organizationId})

        if(!organizationMembers){
            return null
        }
        // TODO: Check if the user is a member of the organization
        return organizationMembers.find((member) => member.publicUserData?.userId === auth.userId)
    }
  
}
export const authService = new AuthServiceClass()


