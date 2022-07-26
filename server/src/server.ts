import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import 'reflect-metadata';
import http from 'http';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import { Server as SocketIo } from 'socket.io';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { corsOptions } from '@shared/configs';
import 'express-async-errors';
import { socketMw } from './routes/middleware';

import BaseRouter from './routes/api';
import logger, { LoggerModes } from 'jet-logger';
import { cookieProps } from '@shared/configs';
import { CustomError } from '@shared/errors';
import bodyParser from 'body-parser';
import RealTimeController from '@routes/realtime-controller';
import path from 'path';


const app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cors(corsOptions));


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookieProps.secret));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    const logFilePath = path.join(__dirname, './jet-logger.log');
    process.env.JET_LOGGER_MODE = LoggerModes.File; // Can also be Console, Custom, or Off
    process.env.JET_LOGGER_FILEPATH = logFilePath;

    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);
app.use((_: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', corsOptions.origin + "");
    next();
});

// Error handling
app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err, true);
    const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
    });
});



/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/



/************************************************************************************
 *                                   Setup Socket.io
 * Tutorial used for this: https://www.valentinog.com/blog/socket-react/
 ***********************************************************************************/

const server = http.createServer(app);
const io = new SocketIo(server, {
    path: '/realtime',
    cors: {
        origin: corsOptions.origin,
        allowedHeaders: '*',
    }


});




const realTimeController = new RealTimeController(io);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
io.use(socketMw);
io.on('connection', (socket) => realTimeController.handleSocket(socket));
app.set('io', io);







/************************************************************************************
 *                              Export Server
 ***********************************************************************************/

export default server;
