import Message from "@models/message.model";
import { Op } from "sequelize";

async function getMessages(userId1: string, userId2: string): Promise<Message[]> {
    return await Message.findAll({
        attributes: ["id", "fromUserId", "message", 'createdAt'],
        where: {
            [Op.or]: [
                {
                    [Op.and]: [
                        { fromUserId: userId1 },
                        { toUserId: userId2 }
                    ]
                }, {
                    [Op.and]: [
                        { fromUserId: userId2 },
                        { toUserId: userId1 }
                    ]
                }

            ],
        },
    });
}

async function sendMessage(fromUserId: string,
    toUserId: string,
    message: string): Promise<Message> {
    return await Message.create({
        fromUserId,
        toUserId,
        message,
    });
}

export default {
    getMessages,
    sendMessage,
}