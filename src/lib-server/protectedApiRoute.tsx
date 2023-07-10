import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";

type NextApiHandlerExtended<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  userId: string
) => unknown | Promise<unknown>;

const handler =
  async (handler: NextApiHandlerExtended) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    const auth = getAuth(req);
    if (!auth.userId || auth.user?.banned) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return handler(req, res, auth.userId);
  };

export default handler;
