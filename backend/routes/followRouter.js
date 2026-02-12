import { Router } from "express";
import { getFollowers, getFollowing } from "../controllers/followController.js";
const router = Router();

router.get("/:username/followers", getFollowers);
router.get("/:username/following", getFollowing);

export { router as followerRouter };
