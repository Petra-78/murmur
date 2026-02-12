import { Router } from "express";
const router = Router();
import {
  getProfile,
  getUser,
  getUsers,
} from "../controllers/userController.js";

router.get("/", getUsers);
router.get("/me", getProfile);
router.get("/:username", getUser);

export { router as userRouter };
