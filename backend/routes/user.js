const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const userController = require("../controllers/userController");
const validationResult = require("../middlewares/validationResult");
const isAuthenticated = require("../middlewares/isAuthenticated");
const Blog = require("../models/blog");
router.post(
  "/post-blog",
  isAuthenticated,
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
      .withMessage("Content must be a string")
      .custom((value, { req }) => {
        if (value === "<p><br></p>") {
          throw new Error("Content cannot be empty");
        }
        return true;
      }),
  ],
  validationResult,
  userController.postBlog
);
router.put(
  "/update-blog/:id",
  isAuthenticated,
  [
    param("id")
      .not()
      .isEmpty()
      .withMessage("Blog not found")
      .custom((value, { req }) => {
        const blog = Blog.findById(req.params.id);
        if (!blog) {
          throw new Error("Blog not found");
        }
        return true;
      }),
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
    body("content")
      .not()
      .isEmpty()
      .withMessage("Content is required")
      .isString()
      .withMessage("Content must be a string")
      .custom((value, { req }) => {
        if (value === "<p><br></p>") {
          throw new Error("Content cannot be empty");
        }
        return true;
      }),
  ],
  validationResult,
  userController.putBlog
);
router.delete(
  "/delete-blog/:id",
  isAuthenticated,
  param("id")
    .not()
    .isEmpty()
    .withMessage("Blog not found")
    .custom((value, { req }) => {
      const blog = Blog.findById(value);
      if (!blog) {
        throw new Error("Blog not found");
      }
      return true;
    }),
  validationResult,
  userController.deleteBlog
);
module.exports = router;
