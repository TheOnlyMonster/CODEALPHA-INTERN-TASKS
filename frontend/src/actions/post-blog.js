import fetchData from "../utils/fetchData";
export default async function postBlogAction({ request, params }) {
  const body = await request.formData();
  const response = await fetchData(body, "post", "/post-blog", "Blog created successfully");
  return response;
}

