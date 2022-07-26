import { NotFoundError } from '@shared/errors';
import { Op } from 'sequelize';
import Friend, { IFriend } from '@models/friend.model';
import { IUser, IUserDocument } from '@models/user.model';

async function friendRequest(fromUser: string, toUser: string) {
    const newFriendRequest = new Friend({
        fromUser,
        toUser,
    });
    await newFriendRequest.save();
}
async function getFriendRequest(userId: string) {


    const raw = await Friend.aggregate([
        {
            $match: {
                toUser: userId,
                status: "PENDING"
            }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "fromUser",
                "foreignField": "_id",
                "as": "from"
            }
        },
        { "$unwind": "$from" },
        {
            "$project": {
                "firstName": "$from.firstName",
                "lastName": "$from.lastName",
                "_id": "$from._id",
                "userDetail": "$from.userDetail",
            }
        }

    ]).exec();



    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return raw;
}




async function acceptFriendRequest(fromUser: string, toUser: string) {
    const friendRequest = await Friend.findOne({
        fromUser,
        toUser,
    }).exec();
    if (friendRequest) {
        await friendRequest.updateOne({
            status: "ACCEPTED",
        }).exec();
    }
    else {
        throw new NotFoundError("Friend request not found");
    }
}

async function refuseFriendRequest(fromUserId: string, toUserId: string) {
    await Friend.deleteOne({
        fromUserId,
        toUserId,
    });
}

async function getAllFriends(user: IUserDocument) {
    const friends1 = await Friend.aggregate([
        {
            $match: {
                fromUser: user._id,
                status: "ACCEPTED"
            }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "toUser",
                "foreignField": "_id",
                "as": "from"
            }
        },
        { "$unwind": "$from" },
        {
            "$project": {
                "firstName": "$from.firstName",
                "lastName": "$from.lastName",
                "_id": "$from._id",
                "userDetail": "$from.userDetail",
            }
        }

    ]).exec();
    const friends2 = await Friend.aggregate([
        {
            $match: {
                toUser: user._id,
                status: "ACCEPTED"
            }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "fromUser",
                "foreignField": "_id",
                "as": "from"
            }
        },
        { "$unwind": "$from" },
        {
            "$project": {
                "firstName": "$from.firstName",
                "lastName": "$from.lastName",
                "_id": "$from._id",
                "userDetail": "$from.userDetail",
            }
        }

    ]).exec();
    const friends = friends1.concat(friends2);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return friends;
}

async function relationship(userId: string, friendId: string): Promise<relationship> {
    const friendRequest = await Friend.findOne({
        $or: [
            {
                fromUserId: userId,
                toUserId: friendId,
            },
            {
                fromUserId: friendId,
                toUserId: userId,
            }
        ]
    }
    ).exec();
    if (friendRequest) {
        if (friendRequest.status === 'ACCEPTED') {
            return "FRIEND";
        } else if (friendRequest.status === 'PENDING') {
            if (friendRequest.fromUser === userId) {
                return "PENDING THEY ACCEPT";
            } else {
                return "PENDING YOU ACCEPT";
            }
        } else {
            return "NOT FRIEND";
        }
    }
    else {
        return "NOT FRIEND";
    }

}

type relationship = "NOT FRIEND" | "PENDING THEY ACCEPT" | "FRIEND" | "PENDING YOU ACCEPT";

interface Relationship {
    _id: string;
    firstName: string;
    lastName: string;
    userDetail: {
        avatarUrl: string;
    }
    relationship: relationship;
}

async function addRelationshipToListUser(userId: string, listUser: IUserDocument[]) {
    const listRelationship: Relationship[] = [];
    for (const user of listUser) {

        const quanhe = await relationship(userId, user._id);

        listRelationship.push({
            firstName: user.firstName,
            lastName: user.lastName,
            userDetail: {
                avatarUrl: (user.userDetail as any).avatarUrl,
            },
            _id: user._id,
            relationship: quanhe,
        });

    }
    return listRelationship;
}




export default {
    friendRequest,
    getFriendRequest,
    acceptFriendRequest,
    refuseFriendRequest,
    getAllFriends,
    addRelationshipToListUser
} as const;