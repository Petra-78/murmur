import { Router } from "express";
const router = Router();
import {
  getPopularUsers,
  getProfile,
  getRecentUsers,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";

router.get("/", getUsers);
router.get("/me", getProfile);
router.get("/recent", getRecentUsers);
router.get("/popular", getPopularUsers);
router.get("/:username", getUser);

router.put("/me/update", updateUser);

export { router as userRouter };
