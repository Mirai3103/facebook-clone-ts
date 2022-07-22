import { Router, RequestHandler } from "express";
import chatService from "@services/chat.service";
import User from "@models/user.model";

const router = Router();

router.get("/message/:id", (async (req, res) => {
    const id = req.params.id;
    const user: User = req.user;
    const messages = await chatService.getMessages(user.id, id);
    res.status(200).json({ messages });

}) as RequestHandler);

export default router;