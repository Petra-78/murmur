import { Router } from "express";
import {
  getPost,
  getPosts,
  getPostsOfFollowing,
  getUsersPosts,
} from "../controllers/postController.js";
const router = Router();

router.get("/", getPosts);
router.get("/following", getPostsOfFollowing);
router.get("/:postId", getPost);
router.get("/user/:username", getUsersPosts);

export { router as postRouter };
