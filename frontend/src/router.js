import { createBrowserRouter } from "react-router-dom";
import ParentElements from "./components/ParentElements";
import BlogPost from "./pages/PostBlog";
import Home from "./pages/Home";
import postBlogAction from "./actions/post-blog";
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
    ],
  },
]);
export default router;
