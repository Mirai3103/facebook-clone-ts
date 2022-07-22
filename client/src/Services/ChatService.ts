import instance from "./AxiosConfig";

function getMessages(toUserId: string) {
    return instance.get(`/chat/message/${toUserId}`);
}

export default {
    getMessages,
} as const;