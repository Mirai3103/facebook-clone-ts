import StatusCodes from 'http-status-codes';
import { Request, Response, Router, RequestHandler } from 'express';

import userService from '../services/user.service';
import { BadRequestError } from '@shared/errors';
import { IUser, IUserDocument } from '@models/user.model';
import friendService from '@services/friend.service';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
    search: '/search',
} as const;



/**
 * Get all users.
 */
router.get(p.get, (async (_: Request, res: Response) => {
    const users = await userService.getAll();
    return res.status(OK).json({ users });
}) as RequestHandler);


/**
 * Add one user.
 */
router.post(p.add, (async (req: Request, res: Response) => {
    const { user }: { user: IUserDocument } = req.body;
    // Check param
    if (!user) {
        throw new BadRequestError('User is required');
    }
    // Fetch data
    await userService.addOne(user);
    return res.status(CREATED).end();
}) as RequestHandler);


/**
 * Update one user.
 */
// router.put(p.update, (async (req: Request, res: Response) => {
//     const { id, email, user }: { id?: string, email?: string, user: IUser } = req.body;
//     // Check param
//     if (!user && !id && !email) {
//         throw new BadRequestError('User, id or email is required');
//     }
//     const identify: IdentifyUser = {};
//     if (id) {
//         identify.id = id;
//     }
//     if (email) {
//         identify.email = email;
//     }
//     await userService.updateOne(identify, user);
//     return res.status(OK).end();
// }) as RequestHandler);


/**
 * Delete one user.
 */
// router.delete(p.delete, ((req: Request, res: Response) => {

//     // Fetch data
//     const { id, email }: { id?: string, email?: string } = req.body;
//     // Check param
//     if (!id && !email) {
//         throw new BadRequestError('id or email is required');
//     }
//     const identify: IdentifyUser = {};
//     if (id) {
//         identify.id = id;
//     }
//     if (email) {
//         identify.email = email;
//     }
//     userService.delete(identify);
//     return res.status(OK).end();
// }) as RequestHandler);


router.get(p.search, (async (req: Request, res: Response) => {
    const { name }: { name?: string } = req.query;
    const { user }: { user: IUserDocument } = req;
    // Check param
    if (!name) {
        throw new BadRequestError('Name is required');
    }
    // Fetch data
    const users = await userService.findLikeName(name);
    const userWithRelationship = await friendService
        .addRelationshipToListUser(user._id, users);
    console.log(userWithRelationship);
    return res.status(OK).json({ users: userWithRelationship });
}) as RequestHandler);



// Export default
export default router;
