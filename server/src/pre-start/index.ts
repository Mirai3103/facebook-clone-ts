/**
 * Pre-start is where we want to place things that must run BEFORE the express server is started.
 * This is useful for environment variables, command-line arguments, and cron-jobs.
 */

import path from 'path';
import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';
import { Sequelize } from 'sequelize-typescript'
import Post from '../models/post.model'
import Message from '../models/message.model';
import logger from 'jet-logger';
import mongoose from 'mongoose';






(async () => {
    // Setup command line options
    const options = commandLineArgs([
        {
            name: 'env',
            alias: 'e',
            defaultValue: 'development',
            type: String,
        },
    ]);
    // Set the env file
    const result2 = dotenv.config({
        path: path.join(__dirname, `env/${options.env as string}.env`),
    });
    // const sequelize = new Sequelize({
    //     database: process.env.DB as string,
    //     dialect: 'postgres',
    //     username: process.env.USER as string,
    //     password: process.env.PASSWORD as string,
    //     host: process.env.HOST as string,
    //     port: process.env.DB_PORT as any as number,
    //     models: [User, UserDetail, Post, FriendList, FriendRequest, Message],
    //     logging: false,
    //     dialectOptions: {
    //         ssl: {
    //             require: true,
    //             rejectUnauthorized: false
    //         }
    //     },
    // });

    try {
        // await sequelize.sync();


        await mongoose.
            connect(process.env.MONGODB_CONNECT_STRING || "mongodb://localhost:27017/fb");
        logger.info('Database synced')


    } catch (error) {
        logger.err(error)
        process.exit(1)
    }

    if (result2.error) {
        throw result2.error;
    }
})();
