import { Router } from "express";
const router = Router();
import { upload } from "../config/multer.js";
import {
  getPopularUsers,
  getProfile,
  getRecentUsers,
  getUser,
  getUsers,
  updateUser,
  uploadProfilePicture,
} from "../controllers/userController.js";

router.get("/", getUsers);
router.get("/me", getProfile);
router.get("/recent", getRecentUsers);
router.get("/popular", getPopularUsers);
router.get("/:username", getUser);

router.put("/me/update", updateUser);
router.put("/me/update/pfp", upload.single("file"), uploadProfilePicture);

export { router as userRouter };
