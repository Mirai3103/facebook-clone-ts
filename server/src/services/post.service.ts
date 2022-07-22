import Post, { PostCreator } from "@models/post.model";
import User, { UserDetail } from "@models/user.model";
import { NotFoundError } from "@shared/errors";
import { upload } from './googledriver'


async function addPost(user: User, content: string,
    file: Express.Multer.File | undefined): Promise<Post> {

    const newPostCreator: PostCreator = {
        content,
        userId: user.id,
        likes: 0,
    };
    if (file) {
        const imageUrl = await upload(file.originalname, file.buffer);
        newPostCreator.imageUrl = imageUrl as string;
    }
    const newPost = await Post.create(newPostCreator);
    await newPost.save();
    return newPost;
}

async function getAllPosts(): Promise<Post[]> {
    return await Post.findAll({
        include: [{
            model: User, attributes: ['firstName', 'lastName'],
            include: [{
                model: UserDetail, attributes: ['avatarUrl']
            }]
        }],
        order: [
            ['createdAt', 'DESC']
        ]
    });
}

async function getPostByPk(id: string): Promise<Post> {
    const post = await Post.findByPk(id);
    if (!post) {
        throw new NotFoundError("Post not found");
    }
    return post;
}

async function updatePost(postId: number, post: PostCreator): Promise<void> {
    await Post.update({
        ...post,
    }, {
        where: { id: postId },
    });
}

async function deletePost(postId: number): Promise<void> {
    await Post.destroy({
        where: { id: postId },
    });
}

export default {
    addPost,
    getAllPosts,
    getPostByPk,
    updatePost,
    deletePost,
} as const;