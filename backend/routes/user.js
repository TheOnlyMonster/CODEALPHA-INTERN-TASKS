const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/userController");

router.post(
  "/post-blog",
  [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Description is required")
      .trim()
      .isLength({ min: 20 })
      .withMessage("Description must be at least 20 characters"),
    body("type")
      .not()
      .isEmpty()
      .withMessage("Category is required")
      .isString()
      .withMessage("Category must be a string")
      .custom((value) => {
        const categories = ["Travel", "Food", "Technology", "Business"];
        const valueArray = value.split(",");
        const valid = valueArray.every((category) =>
          categories.includes(category)
        );
        if (!valid) {
          throw new Error("Invalid category");
        }
        return true;
      }),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true;
    }),
    body("content")
      .not()
      .isEmpty()
      .withMessage("Content is required")
      .isString()
      .withMessage("Content must be a string"),
  ],
  userController.postBlog
);

module.exports = router;
