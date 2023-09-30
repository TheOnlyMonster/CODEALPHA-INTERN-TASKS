const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const User = require("../models/user");
const validationResult = require("../middlewares/validationResult");
const authController = require("../controllers/authController");
router.post(
  "/sign-up",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail()
      .custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("Email is taken");
        }
        return true;
      }),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must contain at least 8 characters"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match");
      }
      return true;
    }),
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("First name must contain at least 3 characters")
      .isLength({ max: 20 })
      .withMessage("First name must contain at most 20 characters"),
    body("lastName")
      .isLength({ min: 3 })
      .withMessage("Last name must contain at least 3 characters")
      .isLength({ max: 20 })
      .withMessage("Last name must contain at most 20 characters"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true;
    }),
  ],
  validationResult,
  authController.signUp
);
router.post(
  "/sign-in",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail()
      .custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });
        if (!user) {
          throw new Error("User not found");
        }
        return true;
      }),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must contain at least 8 characters"),
  ],
  validationResult,
  authController.signIn
);

module.exports = router;
