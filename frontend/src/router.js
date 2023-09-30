import {
  Navigate,
  createBrowserRouter,
  redirectDocument,
} from "react-router-dom";
import ParentElements from "./components/ParentElements";
import BlogPost from "./pages/PostBlog";
import Home from "./pages/Home";
import postBlogAction from "./actions/post-blog";
import GenericCategory from "./pages/GenericCategory";
import blogLoader from "./loaders/blogLoader";
import Error from "./pages/Error";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import signUpAction from "./actions/sign-up";
import signInAction from "./actions/sign-in";
import { isAuthenticated, isNotAuthenticated } from "./loaders/authLoaders";
import editBlogAction from "./actions/edit-blog";
import deleteBlogAction from "./actions/delete-blog";
import Blog from "./pages/Blog";
const categoryPaths = [
  "/all-categories",
  "/travel",
  "/technology",
  "/food",
  "/business",
  "/my-blogs",
  "/home",
  "/blog/:id",
  "/search/:searchValue",
];
const categoryRoutes = categoryPaths.map((path) => ({
  path,
  element:
    path === "/home" ? (
      <Home />
    ) : path === "/blog/:id" ? (
      <Blog />
    ) : (
      <GenericCategory url={path} />
    ),
  loader: blogLoader,
}));
const router = createBrowserRouter([
  {
    path: "/",
    element: <ParentElements />,
    loader: () => {
      const listItems = [
        "All Categories",
        "Travel",
        "Food",
        "Technology",
        "Business",
      ];
      if (isAuthenticated() === true) {
        listItems.push("Post Blog");
        listItems.push("My Blogs");
        listItems.push("Sign Out");
      } else {
        listItems.unshift("Sign In");
      }
      return listItems;
    },
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      {
        path: "post-blog",
        element: <BlogPost />,
        action: postBlogAction,
        loader: isAuthenticated,
      },
      {
        path: "sign-in",
        element: <SignIn />,
        action: signInAction,
        loader: isNotAuthenticated,
      },
      {
        path: "/update-blog/:id",
        action: editBlogAction,
      },
      {
        path: "/delete-blog/:id",
        action: deleteBlogAction,
      },
      {
        path: "sign-up",
        element: <SignUp />,
        action: signUpAction,
        loader: isNotAuthenticated,
      },
      {
        path: "sign-out",
        loader: () => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("firstName");
          localStorage.removeItem("lastName");
          return redirectDocument("/");
        },
      },
      ...categoryRoutes,
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default router;
