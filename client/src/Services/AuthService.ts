import instance, { baseURL } from "./AxiosConfig";


export enum Genders {
    MALE,
    FEMALE,
    OTHER
}

export interface IUser {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    pwdHash: string;
    gender: Genders;
    birthday: Date;
}


function register(user: IUser, file: File) {
    const data = new FormData();
    data.append('file', file);
    data.append('user', JSON.stringify(user));

    return instance.post(baseURL + '/auth/register', data);
}

function login(email: string, password: string) {
    return instance.post(baseURL + '/auth/login', { email, password });
}
function identify() {

    return instance.get(baseURL + '/auth/identify');
}

export default {
    register,
    login,
    identify
} as const;