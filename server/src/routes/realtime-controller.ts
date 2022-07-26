/* eslint-disable max-len */


import { Server as SocketIo, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import logger from 'jet-logger';
import User, { IUserDocument } from '@models/user.model';
import chatService from '@services/chat.service';




class RealTimeController {
    private io: SocketIo<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
    constructor(io: SocketIo<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        this.io = io;
    }

    public handleSocket(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        (socket as any).user = (socket.request as any).user;
        logger.info(`New client connected [id=${socket.id}]`);
        this.handleDisconnect(socket);
        this.handleMessage(socket);
        this.io.sockets.sockets.forEach((s: any) => {
            logger.err((s.user as IUserDocument).email);
        });
    }
    private handleDisconnect(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        socket.on('disconnect', () => {
            logger.info(`Client gone [id=${socket.id}]`);
            this.io.sockets.sockets.forEach((s) => {

                if (s.id === socket.id) {
                    s.disconnect();
                }
            }
            );
        });
    }
    private handleMessage(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        socket.on('message', async (data: {
            fromUserId: string;
            toUserId: string;
            message: string;
        }) => {
            const message = await chatService.sendMessage(data.fromUserId, data.toUserId, data.message);
            (data as any).id = message.id;
            this.io.sockets.sockets.forEach((s: any) => {
                if ((s.user as IUserDocument)._id === data.toUserId || (s.user as IUserDocument)._id === data.fromUserId) {
                    (s as Socket).emit('message', data);
                }
            });
        }
        );
    }


}


export default RealTimeController;