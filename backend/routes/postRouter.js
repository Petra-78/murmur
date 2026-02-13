import { Router } from "express";
import {
  getLikedPosts,
  getPost,
  getPosts,
  getPostsOfFollowing,
  getUsersPosts,
  likePost,
} from "../controllers/postController.js";
const router = Router();

router.get("/", getPosts);
router.get("/following", getPostsOfFollowing);
router.get("/liked", getLikedPosts);
router.get("/:postId", getPost);
router.post("/:postId/like", likePost);
router.get("/user/:username", getUsersPosts);

export { router as postRouter };
