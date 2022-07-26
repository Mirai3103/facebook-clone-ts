import instance, { baseURL } from "./AxiosConfig";

function getMessages(toUserId: string) {
    return instance.get(baseURL + `/chat/message/${toUserId}`);
}

export default {
    getMessages,
} as const;