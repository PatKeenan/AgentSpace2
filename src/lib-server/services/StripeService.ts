export class StripeDbService {
    
    static getSubscription(subscriptionId: string) {
        return console.log("getSubscription")
    }
    static createCustomer(email: string, name: string) {
        return console.log("createCustomer")
    }
    static createSubscription(customerId: string, priceId: string) {
        return console.log("createSubscription")
    }
    static  cancelSubscription(subscriptionId: string) {
        return console.log("cancelSubscription")
    }
    
}