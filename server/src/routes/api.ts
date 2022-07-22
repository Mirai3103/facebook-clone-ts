import { Router } from 'express';
// import { authMw } from './middleware';
import authRouter from './auth-router';
import userRouter from './user-router';
import { authMw } from './middleware';
import postRouter from './post-router';
import friendRouter from './friend-router'
import chatRouter from './chat-router';
// import chatRouter from './chat-router';


// Init
const apiRouter = Router();

// Add api routes
// eslint-disable-next-line @typescript-eslint/no-misused-promises
apiRouter.use('/users', authMw, userRouter);
apiRouter.use('/auth', authRouter);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
apiRouter.use('/post', authMw, postRouter);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
apiRouter.use('/friend', authMw, friendRouter);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
apiRouter.use('/chat', authMw, chatRouter);


// Export default
export default apiRouter;
