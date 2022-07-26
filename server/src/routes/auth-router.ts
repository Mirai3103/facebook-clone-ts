
import { IUser, IUserDocument } from '@models/user.model';
import { BadRequestError, UnauthorizedError } from '@shared/errors';
import { Request, RequestHandler, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';
import authService from '../services/auth.service'
import { cookieProps } from '@shared/configs';
import { upload } from "@shared/configs";

// Constants
const router = Router();
const { OK } = StatusCodes;

// Paths
export const p = {
    login: '/login',
    logout: '/logout',
    register: '/register',
    identify: '/identify'

} as const;

// // Cookie Properties
// export const cookieProps = Object.freeze({
//     key: 'ExpressGeneratorTs',
//     secret: process.env.COOKIE_SECRET,
//     options: {
//         httpOnly: true,
//         signed: true,
//         path: (process.env.COOKIE_PATH),
//         maxAge: Number(process.env.COOKIE_EXP),
//         domain: (process.env.COOKIE_DOMAIN),
//         secure: (process.env.SECURE_COOKIE === 'true'),
//     },
// });

router.post(p.register, upload.single('file'), (async (req: Request, res: Response) => {
    const file = req.file;
    const user = JSON.parse(req.body.user as string);
    console.log(user);
    if (!user) {
        throw new BadRequestError('User is required');
    }
    const newUser = await authService.register(user as IUser, file);
    res.status(OK).json(newUser);
}
) as RequestHandler);

router.post(p.login, (async (req: Request, res: Response) => {


    const { email, password, id } = req.body;
    if (!email && !id) {
        throw new BadRequestError('Email or id is required');
    }
    if (!password) {
        throw new BadRequestError('Password is required');
    }
    const { token, user } = await authService.login({ email, password, id });
    res.cookie(cookieProps.keyAccess, token, cookieProps.options);
    res.status(OK).json({ token, user });
}) as RequestHandler);

router.get(p.identify, (async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) {
        throw new UnauthorizedError('Please login');
    }
    const user = await authService.identify(token);
    res.status(OK).json({ user, token });
}) as RequestHandler);

export default router;

