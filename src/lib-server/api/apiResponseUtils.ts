import { NextApiRequest, NextApiResponse } from "next";
import { ApiStatusCode } from "@/lib-common/api";

export function methodNotAllowedResponse(req: NextApiRequest, res: NextApiResponse): void {
    res.status(405).json({
        code: ApiStatusCode.MethodNotAllowed,
        message: `Method ${req.method} not allowed`,
    });
}

export function notAuthorized(res: NextApiResponse): void {
    res.status(401).json({
        code: ApiStatusCode.NotAuthorized,
        message: "Not authorized",
    });
}

export function notAuthenticated(res: NextApiResponse): void {
    res.status(401).json({
        code: ApiStatusCode.NotAuthenticated,
        message: "Not authenticated",
    });
}

export function sessionExpired(res: NextApiResponse): void {
    res.status(401).json({
        code: ApiStatusCode.SessionExpired,
        message: "Session expired",
    });
}

export function conflict(res: NextApiResponse, message: string): void {
    res.status(409).json({
        code: ApiStatusCode.Conflict,
        message,
    });
}

export function validationFailed(res: NextApiResponse, message: string): void {
    res.status(422).json({
        code: ApiStatusCode.ValidationError,
        message,
    });
}

export function invalidQuery(res: NextApiResponse, message: string): void {
    res.status(422).json({
        code: ApiStatusCode.ValidationError,
        message,
    });
}

export function missingQueryParam(res: NextApiResponse, message: string): void {
    res.status(422).json({
        code: ApiStatusCode.ValidationError,
        message,
    });
}

export function resourceNotFound(res: NextApiResponse, message: string): void {
    res.status(404).json({
        code: ApiStatusCode.ValidationError,
        message,
    });
}