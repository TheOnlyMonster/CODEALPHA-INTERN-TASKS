import { defer, redirect } from "react-router-dom";
import fetchData from "../utils/fetchData";
import { isAuthenticated } from "./authLoaders";
export default async function blogLoader({ request }) {
  const url = new URL(request.url);
  if (`${url.pathname}${url.search}` === "/my-blogs") {
    return isAuthenticated() === true
      ? defer({
          response: fetchData(
            null,
            "get",
            `${url.pathname}${url.search}`,
            "Blogs fetched successfully"
          ),
        })
      : redirect("/sign-in");
  }
  return defer({
    response: fetchData(
      null,
      "get",
      `${url.pathname}${url.search}`,
      "Blogs fetched successfully"
    ),
  });
}
