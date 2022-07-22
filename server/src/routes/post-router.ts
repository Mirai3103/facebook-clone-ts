import { Router, RequestHandler } from "express";
import postService from "@services/post.service";
import { CustomRequest } from "./middleware";
import { PostCreator } from "@models/post.model";
import multer from 'multer';

import { BadRequestError } from "@shared/errors";
import { RemoteSocket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/', storage })

const router = Router();

router.get("/all", (async (req, res) => {
    const posts = await postService.getAllPosts();
    res.json({ posts });
}) as RequestHandler);



// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/add", upload.single('file'), async (req, res) => {
    const file = req.file;
    const content = req.body.content
    if (!file && !content) {
        throw new BadRequestError('No file or content')
    }
    const user = (req as CustomRequest).user
    const newPost = await postService.addPost(user, content as string, file)
    const io = req.app.get('io');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const clients: RemoteSocket<DefaultEventsMap, any>[] = await io.fetchSockets()

    clients.forEach((client) => {
        client.emit('new-post-added', newPost);
    }
    );
    res.status(201).json(newPost);
});

router.put("/update", (async (req, res) => {
    const { postId, post } = req.body;
    if (!postId || !post) {
        throw new Error("Missing postId or post");
    }

    await postService.updatePost(postId as number, post as PostCreator);
    return res.status(200).json({ message: "Post updated" });
}) as RequestHandler);

router.delete("/delete/:id", (async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new Error("Missing postId");
    }

    await postService.deletePost(Number(id));
    return res.status(200).json({ message: "Post deleted" });
}
) as RequestHandler);

export default router;