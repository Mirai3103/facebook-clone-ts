import instance from "./AxiosConfig";

export interface IUserSearch {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userDetail: {
        avatarURL: string;
    }
    relationship: string;
}


function getUserHasNameLike(name: string) {
    return instance.get(`/users/search?name=${name}`);
}

export default {
    getUserHasNameLike,
} as const;