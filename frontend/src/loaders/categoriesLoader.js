import { defer } from "react-router-dom";
import fetchData from "../utils/fetchData";
export default async function categoriesLoader({ request }) {
  const url = new URL(request.url);
  return defer({
    response: fetchData(null, "get", `${url.pathname}${url.search}`, "Blogs fetched successfully")
  })
}