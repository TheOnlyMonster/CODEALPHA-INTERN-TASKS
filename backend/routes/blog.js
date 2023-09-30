const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { param } = require("express-validator");
const validationResult = require("../middlewares/validationResult");
const Blog = require("../models/blog");
const pathsToHandle = [
  "/all-categories",
  "/travel",
  "/technology",
  "/food",
  "/my-blogs",
  "/business",
  "/home",
  "/search/:searchValue",
];
pathsToHandle.forEach((path) => {
  if (path === "/my-blogs") {
    router.get(path, isAuthenticated, blogController.getBlogs);
  } else if (path === "/search/:searchValue") {
    router.get(
      "/search/:searchValue",
      [
        param("searchValue")
          .not()
          .isEmpty()
          .withMessage("Search value is required"),
      ],
      validationResult,
      blogController.getBlogs
    );
  } else {
    router.get(path, blogController.getBlogs);
  }
});

router.get(
  "/blog/:id",
  param("id")
    .not()
    .isEmpty()
    .withMessage("Blog not found")
    .isMongoId()
    .withMessage("Blog not found")
    .custom(async (value) => {
      const blog = await Blog.findById(value);
      if (!blog) {
        throw new Error("Blog not found");
      }
      return true;
    }),
  validationResult,
  blogController.getSingleBlog
);
module.exports = router;
