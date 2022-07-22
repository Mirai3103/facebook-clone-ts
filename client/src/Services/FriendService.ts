import instance from "./AxiosConfig";
import { IUserSearch } from './UserService';

export type IUser = IUserSearch;

function sendFriendRequest(friendId: string) {
    return instance.get(`/friend/add/${friendId}`);
}

function getAllFriendRequests() {
    return instance.get(`/friend/requests`);
}
function acceptFriendRequest(friendId: string) {
    return instance.get(`/friend/accept/${friendId}`);
}
function refuseFriendRequest(friendId: string) {
    return instance.get(`/friend/decline/${friendId}`);
}
function getAllFriends() {
    return instance.get(`/friend/all`);
}

export default {
    sendFriendRequest,
    getAllFriendRequests,
    acceptFriendRequest,
    refuseFriendRequest,
    getAllFriends,
} as const;