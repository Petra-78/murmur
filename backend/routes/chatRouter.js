import { Router } from "express";
import {
  getChats,
  getMessages,
  sendMessage,
} from "../controllers/chatController.js";
import { upload } from "../config/multer.js";
const router = Router();

router.get("/", getChats);
router.get("/messages/:selectedUserId", getMessages);

router.post("/messages", upload.single("file"), sendMessage);

export { router as chatRouter };
