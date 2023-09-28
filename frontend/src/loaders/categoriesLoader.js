import { defer } from "react-router-dom";
import fetchData from "../utils/fetchData";
export default async function categoriesLoader({ params, request }) {
  const url = new URL(request.url);
  return defer({
    response: fetchData(null, "get", url.pathname, "Blogs fetched successfully")
  })
  //const response = await fetchData(null, "get", url.pathname, "Blogs fetched successfully");
  // if (response) {
  //   return response.data;
  // } else {
  //   return json({ error: "Something went wrong!" }, { status: 500 });
  // }
}