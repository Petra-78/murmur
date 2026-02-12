import { Router } from "express";
import {
  getPost,
  getPosts,
  getPostsOfFollowing,
  getUsersPosts,
  likePost,
} from "../controllers/postController.js";
const router = Router();

router.get("/", getPosts);
router.get("/following", getPostsOfFollowing);
router.get("/:postId", getPost);
router.post("/:postId/like", likePost);
router.get("/user/:username", getUsersPosts);

export { router as postRouter };
