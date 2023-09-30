import fetchData from "../utils/fetchData";
export default async function deleteBlogAction({ request, params }) {
  const body = await request.formData();
  return await fetchData(body, "delete", `/delete-blog/${params.id}`, "Blog deleted successfully");
}