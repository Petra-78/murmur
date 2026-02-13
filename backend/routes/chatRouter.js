import { Router } from "express";
import { createChat, getChats } from "../controllers/chatController.js";
const router = Router();

router.get("/", getChats);
router.post("/", createChat);

export { router as chatRouter };
