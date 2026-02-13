import { Router } from "express";
import {
  deleteComment,
  getComments,
  postComment,
  replyToComment,
} from "../controllers/commentController.js";
const router = Router();

router.get("/:postId", getComments);

router.post("/:postId", postComment);
router.post("/:postId/:parentId", replyToComment);
router.delete("/:commentId", deleteComment);

export { router as commentRouter };
