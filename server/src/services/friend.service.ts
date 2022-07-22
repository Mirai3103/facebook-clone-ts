import { NotFoundError } from '@shared/errors';
import { Op } from 'sequelize';
import User, { FriendRequest, FriendList, UserDetail, IUser } from '../models/user.model';

async function friendRequest(fromUserId: string, toUserId: string) {
    const newFriendRequest = new FriendRequest({
        fromUserId,
        toUserId,
    });
    await newFriendRequest.save();
}
async function getFriendRequest(userId: string) {
    const usersId = await FriendRequest.findAll({
        where: {
            toUserId: userId,
        }
    });
    const listUsers: IUser[] = [];
    for (const userId of usersId) {
        const user = await User.findByPk(userId.fromUserId, {
            attributes: ['firstName', 'gender', 'lastName', 'id'],
            include: [
                {
                    model: UserDetail,
                    attributes: ['avatarURL']
                }
            ]
        });
        if (user) {
            listUsers.push(user.toJSON());
        }
    }
    return listUsers;
}




async function acceptFriendRequest(fromUserId: string, toUserId: string) {
    const friendRequest = await FriendRequest.findOne({
        where: {
            fromUserId,
            toUserId,
        },
    });
    if (friendRequest) {
        await friendRequest.destroy();
        let friendList = new FriendList({
            userId1: fromUserId,
            userId2: toUserId,
        });
        await friendList.save();
        friendList = new FriendList({
            userId1: toUserId,
            userId2: fromUserId,
        });
        await friendList.save();
    }
    else {
        throw new NotFoundError("Friend request not found");
    }
}

async function refuseFriendRequest(fromUserId: string, toUserId: string) {
    const friendRequest = await FriendRequest.findOne({
        where: {
            fromUserId,
            toUserId,
        },
    });
    if (friendRequest) {
        await friendRequest.destroy();
    }
    else {
        throw new NotFoundError("Friend request not found");
    }
}

async function getAllFriends(user: User) {
    const listFriend = await user.$get('friends1', {
        attributes: ['firstName', 'gender', 'lastName', 'id'],
        include: [
            {
                model: UserDetail,
                attributes: ['avatarURL']
            }
        ]
    });
    return listFriend;
}

async function relationship(userId: string, friendId: string): Promise<relationship> {
    const friendRequest = await FriendRequest.findOne({
        where: {
            [Op.or]: [
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
    });
    if (friendRequest) {
        if (friendRequest.fromUserId === userId) {
            return "PENDING THEY ACCEPT"
        }
        else {
            return "PENDING YOU ACCEPT";
        }
    } else {
        const friendList = await FriendList.findOne({
            where: {
                userId1: userId,
                userId2: friendId,
            }
        });
        if (friendList) {
            return "FRIEND";
        }
        else {
            return "NOT FRIEND";
        }
    }

}

type relationship = "NOT FRIEND" | "PENDING THEY ACCEPT" | "FRIEND" | "PENDING YOU ACCEPT";

interface Relationship extends IUser {
    relationship: relationship;
}

async function addRelationshipToListUser(userId: string, listUser: User[]) {
    const listRelationship: Relationship[] = [];
    for (const user of listUser) {
        const quanhe = await relationship(userId, user.id);
        listRelationship.push({
            ...user.toJSON(),
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