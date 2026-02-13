import { Router } from "express";
import { upload } from "../config/multer.js";
import {
  deletePost,
  getLikedPosts,
  getPost,
  getPosts,
  getPostsOfFollowing,
  getUsersPosts,
  likePost,
  uploadPost,
} from "../controllers/postController.js";
const router = Router();

router.get("/", getPosts);
router.get("/following", getPostsOfFollowing);
router.get("/liked", getLikedPosts);
router.get("/:postId", getPost);
router.post("/:postId/like", likePost);
router.get("/user/:username", getUsersPosts);

router.post("/", upload.single("file"), uploadPost);

router.delete("/:postId", deletePost);

export { router as postRouter };
