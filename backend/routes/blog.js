const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const pathsToHandle = ["/all-categories", "/travel", "/technology", "/food", "/business"];
pathsToHandle.forEach(path => {
  router.get(path, blogController.getBlogs);
});

module.exports = router;
