import { Router, RequestHandler } from "express";
import chatService from "@services/chat.service";
import User, { IUserDocument } from "@models/user.model";

const router = Router();

router.get("/message/:id", (async (req, res) => {
    const id = req.params.id;
    const user: IUserDocument = req.user;
    const messages = await chatService.getMessages(user._id, id);
    res.status(200).json({ messages });

}) as RequestHandler);

export default router;