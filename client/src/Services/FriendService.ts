import instance, { baseURL } from "./AxiosConfig";
import { IUserSearch } from './UserService';

export type IUser = IUserSearch;

function sendFriendRequest(friendId: string) {
    return instance.get(baseURL + `/friend/add/${friendId}`);
}

function getAllFriendRequests() {
    return instance.get(baseURL + `/friend/requests`);
}
function acceptFriendRequest(friendId: string) {
    return instance.get(baseURL + `/friend/accept/${friendId}`);
}
function refuseFriendRequest(friendId: string) {
    return instance.get(baseURL + `/friend/decline/${friendId}`);
}
function getAllFriends() {
    return instance.get(baseURL + `/friend/all`);
}

export default {
    sendFriendRequest,
    getAllFriendRequests,
    acceptFriendRequest,
    refuseFriendRequest,
    getAllFriends,
} as const;