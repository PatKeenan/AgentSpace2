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
  
}
export const authService = new AuthServiceClass()


