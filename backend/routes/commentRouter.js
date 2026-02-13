import { Router } from "express";
import {
  getComments,
  postComment,
  replyToComment,
} from "../controllers/commentController.js";
const router = Router();

router.get("/:postId", getComments);

router.post("/:postId", postComment);
router.post("/:postId/:parentId", replyToComment);

export { router as commentRouter };
