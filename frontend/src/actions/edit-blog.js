import fetchData from "../utils/fetchData";
export default async function editBlogAction({ request, params }) {
  const body = await request.formData();
  return await fetchData(body, "put", `/update-blog/${params.id}`, "Blog updated successfully");
}