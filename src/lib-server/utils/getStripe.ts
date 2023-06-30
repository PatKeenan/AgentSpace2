import { env } from '@/env.mjs';

import Stripe from 'stripe';

let stripe: Stripe | null;

const getStripe =  () => {
    if (!stripe) {
        stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });
    }
    return stripe;
};

export default getStripe;

