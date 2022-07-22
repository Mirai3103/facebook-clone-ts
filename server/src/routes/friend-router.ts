import { Router, Request, Response, RequestHandler } from "express";
import logger from 'jet-logger';
import friendService from "@services/friend.service";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import User, { UserDetail } from "@models/user.model";
import { RemoteSocket } from "socket.io";


const router = Router();

async function addFriend(req: Request, res: Response) {
    const id = req.params.id;
    console.log(id);
    const { user }: { user: User } = req;
    const userId = user.id;

    await friendService.friendRequest(userId, id);
    const io = req.app.get('io');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const clients: RemoteSocket<DefaultEventsMap, any>[] = await io.fetchSockets()

    clients.forEach((client) => {

        if ((client as any).user.id === id) {
            client.emit('new-friend-request', {
                userId: {
                    id: userId,
                    fullName: user.firstName + " " + user.lastName,
                    avatarURL: user.userDetail.avatarURL
                },
                message: 'You have a new friend request!'
            });
        }
    }
    );
    res.status(201).end();
}
router.get("/add/:id", addFriend as RequestHandler);

router.get('/requests', (async (req: Request, res: Response) => {
    const { user }: { user: User } = req;
    const listFriendRequests = await friendService.getFriendRequest(user.id);
    res.status(200).json(listFriendRequests);
}) as RequestHandler);


router.get('/accept/:id', (async (req: Request, res: Response) => {
    const { user }: { user: User } = req;
    const id = req.params.id;
    await friendService.acceptFriendRequest(id, user.id);
    const io = req.app.get('io');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const clients: RemoteSocket<DefaultEventsMap, any>[] = await io.fetchSockets()

    clients.forEach((client) => {
        if ((client as any).user.id === id) {
            client.emit('friend-request-accepted', {
                userId: {
                    id: user.id,
                    fullName: user.firstName + " " + user.lastName,
                    avatarURL: user.userDetail.avatarURL
                },
                message: 'Your friend request has been accepted!'
            });
        }
    }
    );
    res.status(200).end();
}) as RequestHandler);

router.get('/decline/:id', (async (req: Request, res: Response) => {
    const { user }: { user: User } = req;
    const id = req.params.id;
    await friendService.refuseFriendRequest(id, user.id);
    const io = req.app.get('io');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const clients: RemoteSocket<DefaultEventsMap, any>[] = await io.fetchSockets()

    clients.forEach((client) => {
        if ((client as any).user.id === id) {
            client.emit('friend-request-declined', {
                userId: {
                    id: user.id,
                    fullName: user.firstName + " " + user.lastName,
                    avatarURL: user.userDetail.avatarURL
                },
                message: 'Your friend request has been declined!'
            });
        }
    }
    );
    res.status(200).end();
}) as RequestHandler);

router.get('/all', (async (req: Request, res: Response) => {
    const { user }: { user: User } = req;
    const listFriends = await friendService.getAllFriends(user);
    res.status(200).json(listFriends);
}) as RequestHandler);


export default router;
