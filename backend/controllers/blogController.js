const Blog = require("../models/blog");
const PER_PAGE = 4;
exports.getBlogs = async (req, res, next) => {
  const page = req.query.page || 1;
  const skip = (page - 1) * PER_PAGE;
  if (req.originalUrl === "/all-categories") {
    const blogs = await Blog
      .find()
      .skip(skip)
      .limit(PER_PAGE)
      .sort({ createdAt: -1 });
    const blogsCount = await Blog.countDocuments();
    setTimeout(() => {
      res.status(200).json({
        blogs,
        blogsCount
      });
    }, 1000);
  }
}
