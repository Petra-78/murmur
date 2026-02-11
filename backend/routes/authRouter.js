import { Router } from "express";
const router = Router();
import { postLogin, postSignup } from "../controllers/authController.js";
import { signupValidator } from "../validators/validateSignup.js";

router.post("/login", postLogin);
router.post("/signup", signupValidator, postSignup);

export { router as authRouter };
