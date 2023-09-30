const Blog = require("../models/blog");
const PER_PAGE = 4;

exports.getBlogs = async (req, res, next) => {
  const path = req._parsedUrl.pathname;
  const page = +req.query.page || 1;
  const skip = path === "/home" ? 0 : (page - 1) * PER_PAGE;

  try {
    let findQuery = {};
    if (
      path !== "/all-categories" &&
      path !== "/home" &&
      path !== "/my-blogs" &&
      !path.includes("/search")
    ) {
      const pathArray = path.split("/");
      findQuery = {
        type: pathArray[1].charAt(0).toUpperCase() + pathArray[1].slice(1),
      };
    } else if (path === "/my-blogs") {
      findQuery = {
        userId: req.user.userId,
      };
    } else if (path.includes("/search")) {
      const searchText = req.params.searchValue;
      const regexSearch = new RegExp(searchText, "i");
      findQuery = { title: { $regex: regexSearch } };
    }
    const [blogs, blogsCount] = await Promise.all([
      Blog.find(findQuery)
        .skip(+skip)
        .limit(path === "/home" ? 10 : PER_PAGE)
        .sort({ createdAt: -1 })
        .populate("userId"),
      Blog.countDocuments(findQuery),
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

exports.getSingleBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("userId");
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};
