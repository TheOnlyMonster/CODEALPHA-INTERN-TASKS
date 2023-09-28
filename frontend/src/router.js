import { createBrowserRouter } from "react-router-dom";
import ParentElements from "./components/ParentElements";
import BlogPost from "./pages/PostBlog";
import Home from "./pages/Home";
import postBlogAction from "./actions/post-blog";
import GenericCategory from "./pages/GenericCategory";
import categoriesLoader from "./loaders/categoriesLoader";
const categoryPaths = ["/all-categories", "/travel", "/technology", "/food", "/business"];
const categoryRoutes = categoryPaths.map(path => ({
  path,
  element: <GenericCategory url={path} />,
  loader: categoriesLoader,
}));
const router = createBrowserRouter([
  {
    path: "/",
    element: <ParentElements />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "post-blog",
        element: <BlogPost />,
        action: postBlogAction,
      },
      ...categoryRoutes,
    ],
  },
]);

export default router;
