const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/all-categories", blogController.getBlogs);

module.exports = router