import instance from "./AxiosConfig";



export interface IPost {
    id?: number;
    content?: string;
    imageUrl?: string;
    likes?: number;
    userId?: string;
    createdAt?: Date;
    user: {
        firstName: string;
        lastName: string;
        userDetail: {
            avatarUrl: string;
        };
    }
}


function addPost(content: string, file: File) {
    const data = new FormData();
    data.append('file', file);
    data.append('content', content);

    return instance.post('/post/add', data);
}

function getAllPosts() {
    return instance.get('/post/all');
}

function updatePost(postId: number, post: IPost) {
    return instance.put('/post/update', { postId, post });
}
function deletePost(postId: number) {
    return instance.delete('/post/delete/' + postId);
}

export default {
    addPost,
    getAllPosts,
    updatePost,
    deletePost,
} as const;
