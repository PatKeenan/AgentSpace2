
import getStripe from "@/lib-server/utils/getStripe";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const stripe = getStripe()

    
}