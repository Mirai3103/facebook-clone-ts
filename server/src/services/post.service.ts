import Post, { IPost } from "@models/post.model";
import User, { IUser, IUserDocument } from "@models/user.model";
import { NotFoundError } from "@shared/errors";
import { upload } from './googledriver'


async function addPost(user: IUserDocument, content: string,
    file: Express.Multer.File | undefined) {

    const newPostCreator: IPost = {
        content,
        user,
        likes: 0,
        imageUrl: '',
    };

    if (file) {
        const imageUrl = await upload(file.originalname, file.buffer);
        newPostCreator.imageUrl = imageUrl as string;
    }
    const newPost = await Post.create(newPostCreator);
    return newPost;
}

async function getAllPosts() {

    return await Post.find()
        .populate('user', 'firstName lastName userDetail')
        .sort({ createdAt: 'desc' })
        .exec();
}



async function getPostByPk(id: string) {
    const post = await Post.findOne({ id }).exec();
    if (!post) {
        throw new NotFoundError("Post not found");
    }
    return post;
}

async function updatePost(postId: string, post: IPost): Promise<void> {
    await Post.update({ id: postId }, post).exec();
}

async function deletePost(postId: string): Promise<void> {
    await Post.deleteOne({ id: postId }).exec();
}

export default {
    addPost,
    getAllPosts,
    getPostByPk,
    updatePost,
    deletePost,
} as const;