const Blog = require("../models/blog");
const User = require("../models/user");
exports.postBlog = async (req, res, next) => {
  const image = req.file.path;
  const { title, description, type, content } = req.body;
  const categories = type.split(",");
  const user = await User.findById(req.user.userId);
  user.publishedPost++;
  await user.save();
  const blog = new Blog({
    title,
    description,
    type: categories,
    content,
    image,
    userId: req.user.userId,
  });
  await blog.save();
  res.status(201).json(blog.id);
};

exports.getMyBlogs = async (req, res, next) => {
  const blogs = await Blog.find({ userId: req.user.userId }).populate("userId");
  res.status(200).json({ blogs });
};

exports.putBlog = async (req, res, next) => {
  const { title, description, content } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    blog.title = title;
    blog.description = description;
    blog.content = content;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.user.userId);
    user.publishedPost--;
    await user.save();
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};
