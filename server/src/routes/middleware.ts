import User from "@models/user.model";
import { cookieProps } from "@shared/configs";
import { UnauthorizedError } from "@shared/errors";
import { NextFunction, Request, Response } from "express";
import { Socket } from "socket.io";
import authService from "../services/auth.service";


export interface CustomRequest extends Request {
    user: User;
}

export async function authMw(req: Request, res: Response, next: NextFunction) {

    const token = req.signedCookies[cookieProps.keyAccess];
    if (!token) {
        throw new UnauthorizedError("Please login");
    }
    const user = await authService.identify(token as string);

    if (!user) {
        throw new UnauthorizedError("Please login");
    }
    (req as CustomRequest).user = user;
    next();
}

export async function socketMw(socket: Socket, next: () => void) {
    const token = socket.handshake.auth.token;

    if (!token) {
        throw new UnauthorizedError("Please login");
    }
    const user = await authService.identify(token as string);
    if (!user) {
        throw new UnauthorizedError("Please login");
    }
    (socket.request as any).user = user;
    next();
}