import { Router } from "express";
import { getChats, sendMessage } from "../controllers/chatController.js";
const router = Router();

router.get("/", getChats);

router.post("/messages", sendMessage);

export { router as chatRouter };
