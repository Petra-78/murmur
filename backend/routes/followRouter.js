import { Router } from "express";
import {
  followUser,
  getFollowers,
  getFollowing,
  unfollowUser,
} from "../controllers/followController.js";
const router = Router();

router.get("/:username/followers", getFollowers);
router.get("/:username/following", getFollowing);

router.post("/:username/follow", followUser);
router.delete("/:username/unfollow", unfollowUser);

export { router as followerRouter };
