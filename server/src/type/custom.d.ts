declare namespace Express {
    export interface Request {
        io: SocketIo;
        user: User;
    }
}
