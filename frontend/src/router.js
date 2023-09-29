import { Navigate, createBrowserRouter } from "react-router-dom";
import ParentElements from "./components/ParentElements";
import BlogPost from "./pages/PostBlog";
import Home from "./pages/Home";
import postBlogAction from "./actions/post-blog";
import GenericCategory from "./pages/GenericCategory";
import categoriesLoader from "./loaders/categoriesLoader";
import Error from "./pages/Error";
const categoryPaths = [
  "/all-categories",
  "/travel",
  "/technology",
  "/food",
  "/business",
  "/home",
];
const categoryRoutes = categoryPaths.map((path) => ({
  path,
  element: path === "/home" ? <Home /> : <GenericCategory url={path} />,
  loader: categoriesLoader,
}));
const router = createBrowserRouter([
  {
    path: "/",
    element: <ParentElements />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
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
