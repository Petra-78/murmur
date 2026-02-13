import { Router } from "express";
import { getChats } from "../controllers/chatController.js";
const router = Router();

router.get("/", getChats);

export { router as chatRouter };
