import { Router } from "express";
import {
  deleteComment,
  getComments,
  likeComment,
  postComment,
  replyToComment,
} from "../controllers/commentController.js";
const router = Router();

router.get("/:postId", getComments);

router.post("/:postId", postComment);
router.post("/:commentId/like", likeComment);
router.post("/reply/:postId/:parentId", replyToComment);

router.delete("/:commentId", deleteComment);

export { router as commentRouter };
