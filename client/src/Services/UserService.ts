import instance, { baseURL } from "./AxiosConfig";

export interface IUserSearch {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    userDetail: {
        avatarUrl: string;
    }
    relationship: string;
}


function getUserHasNameLike(name: string) {
    return instance.get(baseURL + `/users/search?name=${name}`);
}

export default {
    getUserHasNameLike,
} as const;