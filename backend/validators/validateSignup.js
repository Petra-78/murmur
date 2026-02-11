import { body } from "express-validator";

export const signupValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .matches(/^[a-z0-9._-]+$/)
    .withMessage(
      "Username can only contain lowercase letters, numbers, '.', '_' and '-'",
    )
    .custom((value) => {
      if (value !== value.toLowerCase()) {
        throw new Error("Username must be lowercase");
      }
      if (value.includes(" ")) {
        throw new Error("Username cannot contain spaces");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/)
    .withMessage("Password must contain at least one special character"),
];
