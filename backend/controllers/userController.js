const isValidationError = require("../utils/validationResult");
const Blog = require("../models/blog");
exports.postBlog = async (req, res, next) => {
  const error = isValidationError(req);
  if (error) {
    return next(error);
  }
  const image = req.file.path;
  const { title, description, type, content } = req.body;
  const categories = type.split(",");
  const blog = new Blog({
    title,
    description,
    type: categories,
    content,
    image,
  });
  await blog.save();
  res.status(201).json(blog.id);
};
