import Message from "@models/message.model";

async function getMessages(userId1: string, userId2: string) {
    return await Message.find({
        $or: [
            {
                $and: [
                    { fromUserId: userId1 },
                    { toUserId: userId2 }
                ]
            }, {
                $and: [
                    { fromUserId: userId2 },
                    { toUserId: userId1 }
                ]
            }

        ],
    }).exec();
}

async function sendMessage(fromUser: string,
    toUser: string,
    message: string) {
    return await Message.create({
        fromUser,
        toUser,
        message,
    });
}

export default {
    getMessages,
    sendMessage,
}