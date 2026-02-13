import { Router } from "express";
import {
  getChats,
  getMessages,
  sendMessage,
} from "../controllers/chatController.js";
const router = Router();

router.get("/", getChats);
router.get("/messages/:selectedUserId", getMessages);

router.post("/messages", sendMessage);

export { router as chatRouter };
