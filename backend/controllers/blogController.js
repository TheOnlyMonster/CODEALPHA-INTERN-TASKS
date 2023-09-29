const Blog = require("../models/blog");
const PER_PAGE = 4;

exports.getBlogs = async (req, res, next) => {
  const path = req._parsedUrl.pathname;
  const page = +req.query.page || 1;
  const skip = path === "/home" ? 0 : (page - 1) * PER_PAGE;
  try {
    let categoryQuery = {};
    if (path !== "/all-categories" && path !== "/home") {
      const pathArray = path.split("/");
      categoryQuery = {
        type: pathArray[1].charAt(0).toUpperCase() + pathArray[1].slice(1),
      };
    }
    const [blogs, blogsCount] = await Promise.all([
      Blog.find(categoryQuery)
        .skip(+skip)
        .limit(path === "/home" ? 10 : PER_PAGE)
        .sort({ createdAt: -1 }),
      Blog.countDocuments(categoryQuery),
    ]);
    if (path === "/home") {
      res.status(200).json({
        blogs,
      });
    } else {
      res.status(200).json({
        blogs,
        blogsCount,
        currentPage: page,
      });
    }
  } catch (error) {
    next(error);
  }
};
