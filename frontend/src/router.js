import { createBrowserRouter } from "react-router-dom";
import ParentElements from "./components/ParentElements";
import BlogPost from "./pages/PostBlog";
import Home from "./pages/Home";
import postBlogAction from "./actions/post-blog";
import GenericCategory from "./pages/GenericCategory";
import categoriesLoader from "./loaders/categoriesLoader";
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
      {
        path: "/all-categories",
        element: <GenericCategory />,
        loader: categoriesLoader,
      },
    ],
  },
]);
export default router;
