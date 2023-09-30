import { redirect } from "react-router-dom";
import fetchData from "../utils/fetchData";
export default async function signUpAction({ request, params }) {
  const body = await request.formData();
  await fetchData(body, "post", "/sign-up", "Account created successfully");
  return redirect("/sign-in");
}
