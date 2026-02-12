import { Router } from "express";
import { getPost, getPosts } from "../controllers/postController.js";
const router = Router();

router.get("/", getPosts);
router.get("/:postId", getPost);

export { router as postRouter };
